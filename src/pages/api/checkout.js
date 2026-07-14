export const prerender = false

// POST /api/checkout — crée une session Stripe Checkout à partir du panier.
// Le navigateur n'envoie QUE des identifiants et quantités : les prix, noms
// et poids sont relus depuis Sanity côté serveur (jamais confiance au client).

import { env } from 'cloudflare:workers'
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Repli si le document "parametresBoutique" n'existe pas encore dans Sanity.
// La vraie configuration (pays, tarifs, poids max, franco) est éditée par JBV
// dans le Studio : Boutique → 🚚 Livraison.
const LIVRAISON_DEFAUT = {
  paysLivraison: ['FR'],
  francoSeuil: null,
  modes: [
    { nom: 'Lettre suivie', delai: '2-3 jours ouvrés', prix: 4.99, poidsMax: 250, actif: true },
    { nom: 'Colissimo domicile', delai: '2-3 jours ouvrés', prix: 7.5, actif: true },
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

  // ── Relit les produits demandés + la config livraison dans Sanity ────────
  const ids = [...new Set(demandes.map((d) => String(d.produitId)))]
  const { produits, livraison } = await sanity.fetch(
    `{
      "produits": *[_type == "produit" && _id in $ids && disponible == true]{
        _id, title, prix, stock, poids,
        "variantes": variantes[]{ nom, prix, stock, poids }
      },
      "livraison": *[_id == "parametresBoutique"][0]{
        paysLivraison, francoSeuil,
        "modes": modes[actif != false]{ nom, delai, prix, poidsMax }
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

  // ── Options d'expédition depuis la config Sanity ──────────────────────────
  const config = livraison?.modes?.length ? livraison : LIVRAISON_DEFAUT
  const pays = config.paysLivraison?.length ? config.paysLivraison : ['FR']
  const sousTotal = lignes.reduce((s, l) => s + (l.centimes * l.qty) / 100, 0)
  const francoAtteint = config.francoSeuil != null && sousTotal >= config.francoSeuil

  // Modes compatibles avec le poids du panier (vide = tous poids)
  let modes = config.modes.filter(
    (m) => m.prix != null && (m.poidsMax == null || poidsTotal <= m.poidsMax)
  )
  if (!modes.length) modes = config.modes.filter((m) => m.poidsMax == null)
  if (!modes.length) modes = [LIVRAISON_DEFAUT.modes[1]]
  // Livraison offerte : le mode le moins cher passe à 0 €
  if (francoAtteint) {
    const moinsCher = modes.reduce((a, b) => (a.prix <= b.prix ? a : b))
    modes = [{ ...moinsCher, nom: `${moinsCher.nom} — offerte`, prix: 0 }]
  }

  // ── Construit la requête Stripe (API REST, encodage formulaire) ──────────
  const origine = new URL(request.url).origin

  const p = new URLSearchParams()
  p.set('mode', 'payment')
  p.set('locale', 'fr')
  p.set('success_url', `${origine}/merci?session_id={CHECKOUT_SESSION_ID}`)
  p.set('cancel_url', `${origine}/panier`)
  lignes.forEach((l, i) => {
    p.set(`line_items[${i}][quantity]`, String(l.qty))
    p.set(`line_items[${i}][price_data][currency]`, 'eur')
    p.set(`line_items[${i}][price_data][unit_amount]`, String(l.centimes))
    p.set(`line_items[${i}][price_data][product_data][name]`, l.nom)
  })
  pays.forEach((code, i) =>
    p.set(`shipping_address_collection[allowed_countries][${i}]`, code)
  )
  modes.slice(0, 5).forEach((m, i) => {
    const libelle = m.delai ? `${m.nom} (${m.delai})` : m.nom
    p.set(`shipping_options[${i}][shipping_rate_data][type]`, 'fixed_amount')
    p.set(`shipping_options[${i}][shipping_rate_data][display_name]`, libelle.slice(0, 100))
    p.set(`shipping_options[${i}][shipping_rate_data][fixed_amount][amount]`, String(Math.round(m.prix * 100)))
    p.set(`shipping_options[${i}][shipping_rate_data][fixed_amount][currency]`, 'eur')
  })
  p.set('phone_number_collection[enabled]', 'true')
  // Récapitulatif du panier pour le webhook (commande Sanity + stock).
  // Limite Stripe : 500 caractères par clé → découpage en panier0, panier1…
  const json = JSON.stringify(recap)
  for (let i = 0; i * 450 < json.length; i++) {
    p.set(`metadata[panier${i}]`, json.slice(i * 450, (i + 1) * 450))
  }

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

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
