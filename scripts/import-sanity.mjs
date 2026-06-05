/**
 * Import scraped Wix content into Sanity.
 * Run: node scripts/import-sanity.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import * as dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const data = JSON.parse(readFileSync(join(__dirname, '../scraped/contenu.json'), 'utf8'))

// Convertit un tableau de textes en Portable Text blocks
function toBlocks(textes = []) {
  return textes
    .map(t => (typeof t === 'string' ? t : '').trim())
    .filter(Boolean)
    .map((text, i) => ({
      _type: 'block',
      _key: `b${i}`,
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }],
    }))
}

// Extrait le slug depuis une URL Wix
function slug(url) {
  return url.replace(/^\//, '')
}

// Slugifie pour l'_id Sanity (pas de caractères spéciaux)
function sanityId(prefix, url) {
  return `${prefix}-${slug(url).replace(/[^a-zA-Z0-9]/g, '-')}`
}

// ─── Mapping des pages scrappées ──────────────────────────────────────────────

const PAGES = [
  // Clé dans contenu.json → slug Sanity (= URL sans /)
  { key: '1',  type: 'page' },   // /jean-baptiste-vidal-moniteur-guide-de-peche
  { key: '2',  type: 'page' },   // /temoignages-avis-jeanbaptiste-vidal
  { key: '5',  type: 'page' },   // /tarifs
  { key: '6',  type: 'page' },   // /disponibilites-guidages
  { key: '8',  type: 'page' },   // /peche-a-la-mouche-en-bretagne
  { key: '14', type: 'page' },   // /materiel-jeanbaptistevidal
  { key: '15', type: 'page' },   // /mouches-de-peche-jeanbaptiste-vidal
  { key: '22', type: 'page' },   // /bateau-bar-a-la-mouche
  { key: '29', type: 'page' },   // /voyages-peche-mouche
  { key: '36', type: 'page' },   // /partenaires-jeanbaptistevidal
  { key: '37', type: 'page' },   // /videos-jeanbaptiste-vidal-moniteur-guide-de-peche
]

const PRESTATIONS = [
  // Eau douce
  { key: '9',  categorie: 'eau-douce' },  // /initiation-peche-a-la-mouche
  { key: '10', categorie: 'eau-douce' },  // /peche-de-l-alose-a-la-mouche
  { key: '11', categorie: 'eau-douce' },  // /peche-de-la-truite-a-la-mouche-en-bretagne
  { key: '12', categorie: 'eau-douce' },  // /peche-de-la-truite-en-reservoir
  { key: '13', categorie: 'eau-douce' },  // /peche-du-brochet-a-la-mouche
  // Bar
  { key: '16', categorie: 'bar' },        // /peche-du-bar-a-la-mouche
  { key: '17', categorie: 'bar' },        // /initiation-peche-du-bar-a-la-mouche
  { key: '18', categorie: 'bar' },        // /peche-du-bar-perfectionnement
  { key: '19', categorie: 'bar' },        // /peche-mouche-bar-bateau-bretagne
  { key: '20', categorie: 'bar' },        // /peche-du-bar-a-vue-a-la-mouche
  { key: '21', categorie: 'bar' },        // /peche-du-bar-a-la-mouche-coaching
  // Masterclass
  { key: '23', categorie: 'masterclass' }, // /masterclass
  { key: '24', categorie: 'masterclass' }, // /master-class-peche-en-reservoir
  { key: '25', categorie: 'masterclass' }, // /master-class-nymphe-au-fil
  // Spey Cast
  { key: '4',  categorie: 'spey-cast' },  // /stage-peche-mouche
  { key: '26', categorie: 'spey-cast' },  // /stage-spey-cast-et-cours-de-lancer
  { key: '27', categorie: 'spey-cast' },  // /stage-spey-cast
  { key: '28', categorie: 'spey-cast' },  // /cours-de-lancer-peche-a-la-mouche
  // Bon cadeau
  { key: '7',  categorie: 'bon-cadeau' }, // /bon-cadeau-peche-mouche
]

const VOYAGES = [
  { key: '30', pays: 'Argentine' },       // /voyage-peche-argentine-rio-grande-truite-de-mer
  { key: '31', pays: 'Cuba' },            // /peche-mouche-cuba-cayo-cruz
  { key: '32', pays: 'Cuba' },            // /peche-mouche-cuba-cayo-santa-maria
  { key: '33', pays: 'Venezuela' },       // /los-roques-venezuela
  { key: '34', pays: 'Mexique' },         // /voyage-peche-mouche-mexique
]

// ─── Import ────────────────────────────────────────────────────────────────────

let created = 0
let errors = 0

async function upsert(doc) {
  try {
    await client.createOrReplace(doc)
    console.log(`✓ ${doc._type} — ${doc.slug.current}`)
    created++
  } catch (e) {
    console.error(`✗ ${doc._type} — ${doc.slug.current}: ${e.message}`)
    errors++
  }
}

// Pages
for (const { key, type } of PAGES) {
  const p = data[key]
  if (!p) continue
  await upsert({
    _id: sanityId(type, p.url),
    _type: type,
    title: p.title,
    slug: { _type: 'slug', current: slug(p.url) },
    contenu: toBlocks(p.textes),
    seoTitle: p.title,
    seoDescription: p.description || '',
  })
}

// Prestations
for (const { key, categorie } of PRESTATIONS) {
  const p = data[key]
  if (!p) continue
  await upsert({
    _id: sanityId('prestation', p.url),
    _type: 'prestation',
    title: p.title,
    slug: { _type: 'slug', current: slug(p.url) },
    categorie,
    description: toBlocks(p.textes),
    seoTitle: p.title,
    seoDescription: p.description || '',
  })
}

// Voyages
for (const { key, pays } of VOYAGES) {
  const p = data[key]
  if (!p) continue
  await upsert({
    _id: sanityId('voyage', p.url),
    _type: 'voyage',
    title: p.title,
    slug: { _type: 'slug', current: slug(p.url) },
    pays,
    description: toBlocks(p.textes),
    seoTitle: p.title,
    seoDescription: p.description || '',
  })
}

console.log(`\n✅ Import terminé — ${created} documents créés, ${errors} erreurs`)
