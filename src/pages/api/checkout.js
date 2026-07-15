export const prerender = false

// POST /api/checkout — crée une session Stripe Checkout EMBARQUÉE (ui_mode:
// embedded) à partir du panier + du mode de livraison choisi sur /commander.
// Le navigateur n'envoie que des identifiants, quantités et le _key du mode :
// prix, poids et tarifs de port sont relus depuis Sanity (jamais confiance au
// client). Pour un mode "relais", le point Mondial Relay choisi est joint et
// transmis au webhook via les metadata.

import { env } from 'cloudflare:workers'
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Repli si le document "parametresBoutique" n'existe pas encore dans Sanity.
const LIVRAISON_DEFAUT = {
  paysLivraison: ['FR'],
  francoSeuil: null,
  modes: [
    { _key: 'defaut-lettre', nom: 'Lettre suivie', delai: '2-3 jours ouvrés', prix: 4.99, poidsMax: 250, type: 'domicile' },
    { _key: 'defaut-colissimo', nom: 'Colissimo domicile', delai: '2-3 jours ouvrés', prix: 7.5, type: 'domicile' },
  ],
}

export async function POST({ request }) {
  const erreur = (statut, message) =>
    new Response(JSON.stringify({ erreur: message }), {
      status: statut,
      headers: { 'Content-Type': 'application/json' },
    })

  const cleStripe = env?.STRIPE_SECRET_KEY || import.meta.env.STRIPE_SECRET_KEY
  if (!cleStripe) return erreur(500, 'Paiement non configuré')

  let corps
  try {
    corps = await request.json()
  } catch {
    return erreur(400, 'Requête invalide')
  }

  const demandes = Array.isArray(corps?.items) ? corps.items.slice(0, 50) : []
  if (!demandes.length) return erreur(400, 'Panier vide')
  const modeKey = typeof corps?.modeKey === 'string' ? corps.modeKey : null
  if (!modeKey) return erreur(400, 'Choisissez un mode de livraison')

  // ── Relit les produits demandés + la config livraison dans Sanity ────────
  const ids = [...new Set(demandes.map((d) => String(d.produitId)))]
  const { produits, livraison } = await sanity.fetch(
    `{
      "produits": *[_type == "produit" && _id in $ids && disponible == true]{
        _id, title, prix, stock, poids, quantiteMin,
        "variantes": variantes[]{ nom, prix, stock, poids }
      },
      "livraison": *[_id == "parametresBoutique"][0]{
        paysLivraison, francoSeuil,
        "modes": modes[actif != false]{ _key, nom, delai, prix, poidsMax, type }
      }
    }`,
    { ids }
  )
  const parId = Object.fromEntries(produits.map((p) => [p._id, p]))

  const lignes = []
  const recap = [] // [produitId, variante|null, qty] — relu par le webhook
  let poidsTotal = 0

  for (const d of demandes) {
    const produit = parId[d.produitId]
    if (!produit) return erreur(400, 'Produit introuvable ou indisponible')

    const qty = Math.min(Math.max(1, Math.floor(Number(d.qty) || 1)), 50)

    // Quantité minimum de commande (ex : mouches vendues par 3)
    const qtyMin = Math.max(1, Math.floor(produit.quantiteMin ?? 1))
    if (qty < qtyMin)
      return erreur(400, `${produit.title} se commande par ${qtyMin} minimum`)

    let variante = null
    if (d.variante != null) {
      variante = (produit.variantes || []).find((v) => v.nom === d.variante)
      if (!variante) return erreur(400, `Option inconnue pour ${produit.title}`)
    }

    const stock = variante ? variante.stock : produit.stock
    if (stock === 0) return erreur(409, `Épuisé : ${produit.title}`)
    if (stock != null && qty > stock)
      return erreur(409, `Stock insuffisant : ${produit.title} (${stock} restant)`)

    const prix = variante?.prix ?? produit.prix
    if (prix == null || prix <= 0) return erreur(500, `Prix manquant : ${produit.title}`)

    poidsTotal += (variante?.poids ?? produit.poids ?? 50) * qty

    lignes.push({
      nom: variante ? `${produit.title} — ${variante.nom}` : produit.title,
      centimes: Math.round(prix * 100),
      qty,
    })
    recap.push([produit._id, variante ? variante.nom : null, qty])
  }

  // ── Mode de livraison : validé côté serveur (prix, poids, type) ──────────
  const config = livraison?.modes?.length ? livraison : LIVRAISON_DEFAUT
  const pays = config.paysLivraison?.length ? config.paysLivraison : ['FR']
  const sousTotal = lignes.reduce((s, l) => s + (l.centimes * l.qty) / 100, 0)
  const francoAtteint = config.francoSeuil != null && sousTotal >= config.francoSeuil

  const mode = config.modes.find((m) => m._key === modeKey)
  if (!mode || mode.prix == null) return erreur(400, 'Mode de livraison inconnu')
  if (mode.poidsMax != null && poidsTotal > mode.poidsMax)
    return erreur(400, `« ${mode.nom} » n'est pas disponible pour ce poids de panier`)

  // Point relais obligatoire pour un mode "relais"
  let relaisTexte = null
  if (mode.type === 'relais') {
    const r = corps?.pointRelais
    if (!r?.id || !r?.nom) return erreur(400, 'Choisissez votre point relais')
    relaisTexte = [
      `${String(r.id).slice(0, 20)} — ${String(r.nom).slice(0, 80)}`,
      String(r.adresse ?? '').slice(0, 120),
      `${String(r.cp ?? '').slice(0, 10)} ${String(r.ville ?? '').slice(0, 60)}`.trim(),
    ].filter(Boolean).join('\n')
  }

  const prixPort = francoAtteint ? 0 : mode.prix
  const libellePort = `${mode.nom}${mode.delai ? ` (${mode.delai})` : ''}${francoAtteint ? ' — offerte' : ''}`

  // ── Construit la requête Stripe (session embarquée) ──────────────────────
  const origine = new URL(request.url).origin

  const p = new URLSearchParams()
  p.set('mode', 'payment')
  p.set('ui_mode', 'embedded_page')
  p.set('locale', 'fr')
  p.set('return_url', `${origine}/merci?session_id={CHECKOUT_SESSION_ID}`)
  lignes.forEach((l, i) => {
    p.set(`line_items[${i}][quantity]`, String(l.qty))
    p.set(`line_items[${i}][price_data][currency]`, 'eur')
    p.set(`line_items[${i}][price_data][unit_amount]`, String(l.centimes))
    p.set(`line_items[${i}][price_data][product_data][name]`, l.nom)
  })
  pays.forEach((code, i) =>
    p.set(`shipping_address_collection[allowed_countries][${i}]`, code)
  )
  p.set('shipping_options[0][shipping_rate_data][type]', 'fixed_amount')
  p.set('shipping_options[0][shipping_rate_data][display_name]', libellePort.slice(0, 100))
  p.set('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(Math.round(prixPort * 100)))
  p.set('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'eur')
  p.set('phone_number_collection[enabled]', 'true')

  // Récapitulatif du panier pour le webhook (commande Sanity + stock).
  // Limite Stripe : 500 caractères par clé → découpage en panier0, panier1…
  const json = JSON.stringify(recap)
  for (let i = 0; i * 450 < json.length; i++) {
    p.set(`metadata[panier${i}]`, json.slice(i * 450, (i + 1) * 450))
  }
  if (relaisTexte) p.set('metadata[pointRelais]', relaisTexte.slice(0, 490))

  const reponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cleStripe}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: p.toString(),
  })

  const session = await reponse.json()
  if (!reponse.ok) {
    console.error('Stripe:', session?.error?.message)
    return erreur(502, 'Le paiement est momentanément indisponible')
  }

  return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
