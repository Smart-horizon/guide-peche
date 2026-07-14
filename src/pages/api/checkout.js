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

// Frais de port PROVISOIRES (mode test) — à remplacer par les tarifs postaux
// réels validés avec JBV avant le passage en production.
const PORT = {
  leger: { label: 'Lettre suivie (tarif provisoire)', montant: 400, maxGrammes: 100 },
  colis: { label: 'Colissimo (tarif provisoire)',     montant: 800 },
}

const PAYS_LIVRAISON = ['FR', 'BE', 'LU', 'CH', 'DE', 'NL', 'IT', 'ES', 'GB', 'IE']

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

  // ── Relit les produits demandés dans Sanity ───────────────────────────────
  const ids = [...new Set(demandes.map((d) => String(d.produitId)))]
  const produits = await sanity.fetch(
    `*[_type == "produit" && _id in $ids && disponible == true]{
      _id, title, prix, stock, poids,
      "variantes": variantes[]{ nom, prix, stock, poids }
    }`,
    { ids }
  )
  const parId = Object.fromEntries(produits.map((p) => [p._id, p]))

  const lignes = []
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
  }

  // ── Construit la requête Stripe (API REST, encodage formulaire) ──────────
  const origine = new URL(request.url).origin
  const port = poidsTotal <= PORT.leger.maxGrammes ? PORT.leger : PORT.colis

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
  PAYS_LIVRAISON.forEach((pays, i) =>
    p.set(`shipping_address_collection[allowed_countries][${i}]`, pays)
  )
  p.set('shipping_options[0][shipping_rate_data][type]', 'fixed_amount')
  p.set('shipping_options[0][shipping_rate_data][display_name]', port.label)
  p.set('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(port.montant))
  p.set('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'eur')
  p.set('phone_number_collection[enabled]', 'true')
  // Récapitulatif du panier pour le futur webhook (email + stock)
  p.set('metadata[panier]', JSON.stringify(demandes).slice(0, 480))

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
