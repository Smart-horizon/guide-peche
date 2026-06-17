// migrate-voyages-hub.mjs
// Crée le document page /voyages-peche-mouche dans Sanity avec sections pagebuilder
// Usage: node scripts/migrate-voyages-hub.mjs

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envContent = readFileSync(join(__dirname, '../.env'), 'utf-8')
const env = {}
for (const line of envContent.split('\n')) {
  const t = line.trim()
  if (!t || t.startsWith('#')) continue
  const idx = t.indexOf('=')
  if (idx === -1) continue
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim()
}

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  token: env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ── Upload E16.avif comme image hero ───────────────────────────────────────
let heroImageRef = null
const heroFile = join(__dirname, '../public/images/E16.avif')
if (existsSync(heroFile)) {
  console.log('📸 Upload E16.avif vers Sanity...')
  const buffer = readFileSync(heroFile)
  const asset = await client.assets.upload('image', buffer, {
    filename: 'E16.avif',
    contentType: 'image/avif',
  })
  heroImageRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  console.log(`  ✅ Image uploadée : ${asset._id}`)
} else {
  console.warn('  ⚠️  E16.avif introuvable dans public/images/ — hero sans image')
}

// ── Document page ───────────────────────────────────────────────────────────
const doc = {
  _id: 'page-voyages-peche-mouche',
  _type: 'page',
  title: 'Voyages de pêche à la mouche',
  slug: { _type: 'slug', current: 'voyages-peche-mouche' },
  seoTitle: 'Voyages de pêche à la mouche — Jean-Baptiste Vidal, Guide accompagnateur',
  seoDescription: "Voyages de pêche à la mouche accompagnés par Jean-Baptiste Vidal : Argentine, Cuba, Venezuela, Mexique. Truite de mer, permit, bonefish et tarpon dans les plus beaux spots du monde.",
  pagebuilder: [
    {
      _type: 'sectionHero',
      _key: 'voy-hero',
      ...(heroImageRef && { image: heroImageRef }),
      eyebrow: 'Voyages accompagnés · Monde entier',
      titre: 'Voyages de pêche à la mouche',
      sousTitre: "Argentine, Cuba, Venezuela, Mexique : des destinations d'exception pour traquer le permit, le bonefish, le tarpon et la truite de mer dans des environnements sauvages préservés.",
      hauteur: 'full',
      btnReserverTexte: 'Me contacter',
      btnReserverLien: '/contact',
      btnTelTexte: '06 87 30 34 56',
    },
    {
      _type: 'sectionTexte',
      _key: 'voy-intro-text',
      texte: [
        {
          _type: 'block',
          _key: 'voy-h2',
          style: 'h2',
          markDefs: [],
          children: [{ _type: 'span', _key: 'voy-h2-s', text: 'Pêcher avec un guide qui connaît les spots', marks: [] }],
        },
        {
          _type: 'block',
          _key: 'voy-p1',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 'voy-p1-s', text: "Depuis 2005, Jean-Baptiste a parcouru les plus grandes destinations de pêche à la mouche au monde : Argentine, Bolivie, Russie, Islande, Cuba, Venezuela, Mexique. Ces voyages accompagnés, c'est l'assurance d'arriver sur des terrains connus, avec un guide qui a déjà pêché là-bas et qui connaît les spots, les guides locaux et les bonnes saisons.", marks: [] }],
        },
        {
          _type: 'block',
          _key: 'voy-p2',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 'voy-p2-s', text: "Petit groupe, rythme adapté, ambiance décontractée. On pêche, on rigole, on rentre avec des souvenirs.", marks: [] }],
        },
      ],
      largeur: 'normal',
      fond: 'sand',
    },
    {
      _type: 'sectionStats',
      _key: 'voy-stats',
      fond: 'sand',
      stats: [
        { _key: 'stat-dest', nombre: '5',   label: 'destinations' },
        { _key: 'stat-pays', nombre: '12+', label: 'pays de pêche' },
        { _key: 'stat-ans',  nombre: '20+', label: "ans d'expérience exotique" },
      ],
    },
    {
      _type: 'sectionAvantages',
      _key: 'voy-pourquoi',
      eyebrow: 'Hosted trips',
      titre: 'Pourquoi partir avec Jean-Baptiste ?',
      fond: 'white',
      items: [
        {
          _key: 'avt-1',
          icone: '🎯',
          titre: 'Destinations testées en avant-première',
          texte: "Jean-Baptiste effectue systématiquement un voyage de reconnaissance avant de proposer une destination. Vous arrivez sur des terrains connus, avec un guide qui a déjà pêché là-bas.",
        },
        {
          _key: 'avt-2',
          icone: '🤝',
          titre: 'Réseau international',
          texte: "Des partenariats établis de longue date avec Nervous Waters (Argentine), Avalon Fishing (Cuba Cruz), Fly Fish The Run (Cuba Santa Maria) et DHD Laika (Venezuela, Mexique).",
        },
        {
          _key: 'avt-3',
          icone: '🎣',
          titre: 'Guidage en plus du guide local',
          texte: "Jean-Baptiste est présent sur l'eau avec vous, en plus du guide local. Coaching technique, lecture de l'eau, adaptation des mouches — pour maximiser vos chances de capture.",
        },
        {
          _key: 'avt-4',
          icone: '🌎',
          titre: 'Tout géré pour vous',
          texte: "Organisation complète : vols internes, transferts, hébergement, guides, logistique sur place. Vous n'avez qu'à préparer vos cannes et partir l'esprit libre.",
        },
      ],
    },
    {
      _type: 'sectionVoyagesGrid',
      _key: 'voy-grid',
      eyebrow: 'Destinations',
      titre: 'Choisissez votre aventure',
      voyageFeaturedSlug: 'los-roques-venezuela',
    },
    {
      _type: 'sectionCta',
      _key: 'voy-cta',
      titre: 'Un projet de voyage ?',
      texte: "Parlez-moi de vos envies, je vous propose les dates et destinations disponibles.",
      btn1Texte: 'Me contacter',
      btn1Lien: '/contact',
      btn2Texte: '06 87 30 34 56',
      btn2Lien: 'tel:0687303456',
      style: 'dark',
    },
  ],
}

console.log('\n📄 Création du document voyages-peche-mouche...')
try {
  const result = await client.createOrReplace(doc)
  console.log(`✅ Page créée : ${result._id}`)
  console.log('   slug : /voyages-peche-mouche')
  console.log('\nSuite :')
  console.log('  1. cd studio && npx sanity deploy')
  console.log('  2. bash deploy.sh')
} catch (err) {
  console.error('❌ Erreur :', err.message)
}
