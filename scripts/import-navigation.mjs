/**
 * import-navigation.mjs
 * Importe le menu de navigation courant dans Sanity
 * (document singleton _id: "navigation")
 *
 * Usage : node scripts/import-navigation.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Charger le .env depuis la racine du projet
const __dir = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dir, '../.env') })

const client = createClient({
  projectId: 'uievv97s',
  dataset:   'production',
  useCdn:    false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// ── Menu à importer (copie exacte du Header.astro) ──────────────────────────
const items = [
  {
    _key: 'nav-accueil',
    _type: 'navItem',
    label: 'Accueil',
    href: '/',
  },
  {
    _key: 'nav-guide',
    _type: 'navItem',
    label: 'Le guide',
    href: '/jean-baptiste-vidal-moniteur-guide-de-peche',
  },
  {
    _key: 'nav-eau-douce',
    _type: 'navItem',
    label: 'Eau douce',
    href: '/peche-a-la-mouche-en-bretagne',
    activePrefix: '/peche-a-la-mouche-en-bretagne',
    children: [
      { _key: 'ed-1', _type: 'navChild', label: "Stage d'initiation",         href: '/initiation-peche-a-la-mouche' },
      { _key: 'ed-2', _type: 'navChild', label: 'Perfectionnement truite',     href: '/peche-de-la-truite-a-la-mouche-en-bretagne' },
      { _key: 'ed-3', _type: 'navChild', label: 'Réservoir',                   href: '/peche-de-la-truite-en-reservoir' },
      { _key: 'ed-4', _type: 'navChild', label: 'Alose',                       href: '/peche-de-l-alose-a-la-mouche' },
      { _key: 'ed-5', _type: 'navChild', label: 'Brochet',                     href: '/peche-du-brochet-a-la-mouche' },
    ],
  },
  {
    _key: 'nav-mer',
    _type: 'navItem',
    label: 'Mer',
    href: '/peche-du-bar-a-la-mouche',
    activePrefix: '/peche-du-bar',
    children: [
      { _key: 'mer-1', _type: 'navChild', label: 'Initiation bar',             href: '/initiation-peche-du-bar-a-la-mouche' },
      { _key: 'mer-2', _type: 'navChild', label: 'Perfectionnement bar',       href: '/peche-du-bar-perfectionnement' },
      { _key: 'mer-3', _type: 'navChild', label: 'Bar à vue en estuaire',      href: '/peche-du-bar-a-vue-a-la-mouche' },
      { _key: 'mer-4', _type: 'navChild', label: 'Bar en bateau',              href: '/peche-mouche-bar-bateau-bretagne' },
      { _key: 'mer-5', _type: 'navChild', label: 'Coaching bar',               href: '/peche-du-bar-a-la-mouche-coaching' },
      { _key: 'mer-6', _type: 'navChild', label: 'Le bateau',                  href: '/bateau-bar-a-la-mouche' },
    ],
  },
  {
    _key: 'nav-masterclass',
    _type: 'navItem',
    label: 'MasterClass',
    href: '/masterclass',
    activePrefix: '/master-class',
    children: [
      { _key: 'mc-1', _type: 'navChild', label: 'Nymphe au fil',               href: '/master-class-nymphe-au-fil' },
      { _key: 'mc-2', _type: 'navChild', label: 'Réservoir',                   href: '/master-class-peche-en-reservoir' },
    ],
  },
  {
    _key: 'nav-voyages',
    _type: 'navItem',
    label: 'Voyages',
    href: '/voyages-peche-mouche',
    activePrefix: '/voyage',
    children: [
      { _key: 'voy-0', _type: 'navChild', label: 'Tous les voyages',           href: '/voyages-peche-mouche' },
      { _key: 'voy-1', _type: 'navChild', label: 'Argentine — Rio Grande',     href: '/voyage-peche-argentine-rio-grande-truite-de-mer' },
      { _key: 'voy-2', _type: 'navChild', label: 'Cuba — Cayo Cruz',           href: '/peche-mouche-cuba-cayo-cruz' },
      { _key: 'voy-3', _type: 'navChild', label: 'Cuba — Santa Maria',         href: '/peche-mouche-cuba-cayo-santa-maria' },
      { _key: 'voy-4', _type: 'navChild', label: 'Venezuela — Los Roques',     href: '/los-roques-venezuela' },
      { _key: 'voy-5', _type: 'navChild', label: 'Mexique',                    href: '/voyage-peche-mouche-mexique' },
    ],
  },
  {
    _key: 'nav-divers',
    _type: 'navItem',
    label: 'Divers',
    href: '/partenaires-jeanbaptistevidal',
    children: [
      { _key: 'div-1', _type: 'navChild', label: 'Partenaires',                href: '/partenaires-jeanbaptistevidal' },
      { _key: 'div-2', _type: 'navChild', label: 'Revue de presse',            href: '/revue-de-presse-jeanbaptiste-vidal-moniteur-guide-de-peche' },
      { _key: 'div-3', _type: 'navChild', label: 'Vidéos',                     href: '/videos-jeanbaptiste-vidal-moniteur-guide-de-peche' },
      { _key: 'div-4', _type: 'navChild', label: 'Mon matériel',               href: '/materiel-jeanbaptistevidal' },
      { _key: 'div-5', _type: 'navChild', label: 'Mes mouches',                href: '/mouches-de-peche-jeanbaptiste-vidal' },
    ],
  },
  {
    _key: 'nav-blog',
    _type: 'navItem',
    label: 'Blog',
    href: '/blog',
  },
  {
    _key: 'nav-contact',
    _type: 'navItem',
    label: 'Contact',
    href: '/contact',
    children: [
      { _key: 'ct-1', _type: 'navChild', label: 'Contact',                     href: '/contact' },
      { _key: 'ct-2', _type: 'navChild', label: 'Bon cadeau',                  href: '/bon-cadeau-peche-mouche' },
      { _key: 'ct-3', _type: 'navChild', label: 'Tarifs',                      href: '/tarifs' },
      { _key: 'ct-4', _type: 'navChild', label: 'Calendrier des disponibilités', href: '/disponibilites-guidages' },
    ],
  },
]

async function run() {
  console.log('📡 Connexion à Sanity (uievv97s / production)…')

  // createOrReplace : crée le document s'il n'existe pas, le remplace sinon
  const result = await client.createOrReplace({
    _type: 'navigation',
    _id:   'navigation',
    items,
  })

  console.log('✅ Document navigation créé/mis à jour :', result._id)

  // Publier immédiatement (patch du document publié)
  await client
    .patch('navigation')
    .set({ items })
    .commit({ autoGenerateArrayKeys: true })

  console.log('🚀 Publié dans Sanity — le menu est maintenant éditable depuis le Studio.')
  console.log('   → https://jbvidal.sanity.studio')
}

run().catch(err => {
  console.error('❌ Erreur :', err.message)
  process.exit(1)
})
