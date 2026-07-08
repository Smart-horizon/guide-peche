/**
 * patch-spey-hero-image.mjs
 * Restaure l'image hero de l'article "Stage de Spey Cast en Bretagne au bord
 * de l'Ellé" — l'affiche du stage (og:image d'origine, jamais migrée car
 * absente du corps de l'article). Récupérée via la Wayback Machine :
 * web.archive.org/web/20260305142918im_/https://size.blogspirit.net/enjoyfishing.fr/www/773/media/00/01/2752630820.png
 *
 * Usage : node scripts/patch-spey-hero-image.mjs <chemin-image.png>
 */
import { createClient } from '@sanity/client'
import { readFile } from 'fs/promises'
import 'dotenv/config'

const SLUG = 'stage-de-spey-cast-en-bretagne-au-bord-de-l-elle-avec-jean-b-3137529'
const file = process.argv[2]
if (!file) { console.error('Usage: node scripts/patch-spey-hero-image.mjs <image.png>'); process.exit(1) }

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const doc = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{ _id, "hasImage": defined(image.asset) }`, { slug: SLUG })
if (!doc) { console.error('Article introuvable'); process.exit(1) }
if (doc.hasImage) { console.log('↷ Image hero déjà présente — rien à faire'); process.exit(0) }

const buf = await readFile(file)
const asset = await client.assets.upload('image', buf, { filename: 'stage-spey-cast-affiche-2019.png' })
console.log('✓ Asset uploadé:', asset._id)

await client.patch(doc._id).set({
  image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
}).commit()
console.log('✅ Image hero restaurée sur', SLUG)
