export const prerender = false

// POST /api/stripe-webhook — appelé par Stripe après un paiement confirmé
// (événement checkout.session.completed). Vérifie la signature, puis :
//   1. crée le document "commande" dans Sanity (statut 🆕 commandée)
//   2. décrémente les stocks des produits/variantes vendus
// Idempotent : un même paiement rejoué par Stripe ne crée rien en double.

import { env } from 'cloudflare:workers'
import { createClient } from '@sanity/client'

// ── Vérification de la signature Stripe (HMAC SHA-256, header Stripe-Signature)
async function signatureValide(corps, enTete, secret) {
  if (!enTete || !secret) return false
  const parties = Object.fromEntries(
    enTete.split(',').map((p) => p.split('=').map((s) => s.trim()))
  )
  const t = parties.t
  const v1 = parties.v1
  if (!t || !v1) return false
  // Tolérance 5 min contre le rejeu
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false

  const encodeur = new TextEncoder()
  const cle = await crypto.subtle.importKey(
    'raw', encodeur.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', cle, encodeur.encode(`${t}.${corps}`))
  const attendu = [...new Uint8Array(signature)]
    .map((o) => o.toString(16).padStart(2, '0')).join('')

  // Comparaison à temps constant
  if (attendu.length !== v1.length) return false
  let diff = 0
  for (let i = 0; i < attendu.length; i++) diff |= attendu.charCodeAt(i) ^ v1.charCodeAt(i)
  return diff === 0
}

export async function POST({ request }) {
  const secretWebhook = env?.STRIPE_WEBHOOK_SECRET || import.meta.env.STRIPE_WEBHOOK_SECRET
  const tokenSanity   = env?.SANITY_TOKEN         || import.meta.env.SANITY_TOKEN

  const corps = await request.text()
  const ok = await signatureValide(corps, request.headers.get('stripe-signature'), secretWebhook)
  if (!ok) return new Response('Signature invalide', { status: 400 })

  const evenement = JSON.parse(corps)
  if (evenement.type !== 'checkout.session.completed') {
    return new Response('Événement ignoré', { status: 200 })
  }

  const session = evenement.data.object
  if (session.payment_status !== 'paid') return new Response('Non payé', { status: 200 })

  const sanity = createClient({
    projectId: 'uievv97s',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: tokenSanity,
    useCdn: false,
  })

  // ── Idempotence : commande déjà enregistrée pour cette session ? ──────────
  const idCommande = `commande-${session.id.replace(/[^a-zA-Z0-9_-]/g, '')}`
  const existante = await sanity.fetch(`*[_id == $id][0]{_id}`, { id: idCommande })
  if (existante) return new Response('Déjà traité', { status: 200 })

  // ── Panier : réassemble metadata.panier0 + panier1 + … ───────────────────
  let recap = []
  try {
    const morceaux = Object.keys(session.metadata || {})
      .filter((c) => /^panier\d+$/.test(c))
      .sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)))
      .map((c) => session.metadata[c])
    recap = JSON.parse(morceaux.join('') || '[]')
  } catch (e) {
    console.error('Webhook : metadata panier illisible', e)
  }

  // ── Détails produits depuis Sanity (titres, prix, stocks actuels) ────────
  const ids = [...new Set(recap.map(([id]) => id))]
  const produits = ids.length
    ? await sanity.fetch(
        `*[_type == "produit" && _id in $ids]{
          _id, title, prix, stock,
          "variantes": variantes[]{ _key, nom, prix, stock }
        }`, { ids })
    : []
  const parId = Object.fromEntries(produits.map((p) => [p._id, p]))

  const lignes = recap.map(([id, nomVariante, qty], i) => {
    const produit = parId[id]
    const variante = nomVariante
      ? (produit?.variantes || []).find((v) => v.nom === nomVariante)
      : null
    return {
      _type: 'ligneCommande',
      _key: `ligne${i}`,
      titre: produit?.title ?? id,
      variante: nomVariante ?? undefined,
      quantite: qty,
      prix: variante?.prix ?? produit?.prix ?? undefined,
    }
  })

  // ── Adresse de livraison (l'emplacement varie selon la version d'API) ────
  const livraison = session.collected_information?.shipping_details
    || session.shipping_details || null
  const a = livraison?.address
  const adresseTexte = livraison
    ? [livraison.name, a?.line1, a?.line2, `${a?.postal_code ?? ''} ${a?.city ?? ''}`.trim(), a?.country]
        .filter(Boolean).join('\n')
    : null

  const dateCommande = new Date((session.created ?? evenement.created) * 1000)
  const numero = `CMD-${dateCommande.toISOString().slice(0, 10).replace(/-/g, '')}-${session.id.slice(-6).toUpperCase()}`

  // ── 1. Création de la commande ────────────────────────────────────────────
  await sanity.createIfNotExists({
    _id: idCommande,
    _type: 'commande',
    numero,
    date: dateCommande.toISOString(),
    statut: 'commandee',
    client: {
      nom:       session.customer_details?.name ?? livraison?.name ?? null,
      email:     session.customer_details?.email ?? null,
      telephone: session.customer_details?.phone ?? null,
    },
    adresseLivraison: adresseTexte,
    pointRelais: session.metadata?.pointRelais || undefined,
    lignes,
    totalArticles: session.amount_subtotal != null ? session.amount_subtotal / 100 : null,
    fraisPort:     session.shipping_cost?.amount_total != null ? session.shipping_cost.amount_total / 100 : null,
    totalPaye:     session.amount_total != null ? session.amount_total / 100 : null,
    stripeSessionId: session.id,
  })

  // ── 2. Décrément des stocks (uniquement les stocks suivis, jamais < 0) ───
  for (const [id, nomVariante, qty] of recap) {
    const produit = parId[id]
    if (!produit) continue
    const variante = nomVariante
      ? (produit.variantes || []).find((v) => v.nom === nomVariante)
      : null
    const stockActuel = variante ? variante.stock : produit.stock
    if (stockActuel == null) continue // stock illimité : rien à décrémenter

    const nouveau = Math.max(0, stockActuel - qty)
    const chemin = variante ? `variantes[_key=="${variante._key}"].stock` : 'stock'
    await sanity.patch(id).set({ [chemin]: nouveau }).commit()
    // Aligne le brouillon éventuel pour que le Studio reste cohérent
    try { await sanity.patch(`drafts.${id}`).set({ [chemin]: nouveau }).commit() } catch { /* pas de brouillon */ }
  }

  return new Response('OK', { status: 200 })
}
