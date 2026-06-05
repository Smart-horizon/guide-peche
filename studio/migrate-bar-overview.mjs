/**
 * migrate-bar-overview.mjs
 * Migre la page /peche-du-bar-a-la-mouche vers le Page Builder Sanity.
 *
 * Usage : node studio/migrate-bar-overview.mjs
 *
 * Ce que fait le script :
 * 1. Upload les 6 images vers le CDN Sanity
 * 2. Crée les 4 sections du pagebuilder (Hero, Intro, Cards, CTA)
 * 3. Patch le document Sanity existant
 */

import { createClient } from '@sanity/client'
import { createReadStream, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = resolve(__dirname, '..')

// ── Lecture du token depuis .env ──────────────────────────────────────────────
let SANITY_TOKEN = process.env.SANITY_TOKEN
if (!SANITY_TOKEN) {
  const env = readFileSync(resolve(ROOT, '.env'), 'utf8')
  SANITY_TOKEN = env.match(/SANITY_TOKEN=(.+)/)?.[1]?.trim()
}
if (!SANITY_TOKEN) { console.error('❌ SANITY_TOKEN introuvable'); process.exit(1) }

const client = createClient({
  projectId: 'uievv97s',
  dataset:   'production',
  apiVersion: '2024-01-01',
  token:     SANITY_TOKEN,
  useCdn:    false,
})

// ── Helpers ────────────────────────────────────────────────────────────────────
const uid  = () => Math.random().toString(36).slice(2, 10)
const para = (text) => ({
  _type: 'block', _key: uid(), style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: uid(), text, marks: [] }],
})

async function uploadImg(filename) {
  const path = resolve(ROOT, 'public', 'images', filename)
  console.log(`  ⬆️  ${filename}`)
  const asset = await client.assets.upload('image', createReadStream(path), { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// ── Migration ──────────────────────────────────────────────────────────────────
async function run() {
  console.log('\n🎣 Migration — Pêche du bar à la mouche\n')

  // 1. Upload des images
  console.log('📸 Upload des images vers Sanity CDN...')
  const [heroImg, initImg, perfImg, vueImg, bateauImg, coachingImg] = await Promise.all([
    uploadImg('bar-estuaire.jpg'),
    uploadImg('bar-initiation-6.jpg'),
    uploadImg('bar-perf-9.jpg'),
    uploadImg('bar-vue-hq.jpg'),
    uploadImg('bar-bateau-hq.jpg'),
    uploadImg('bar-coaching-6.jpg'),
  ])
  console.log('✅ 6 images uploadées\n')

  // 2. Construction du pagebuilder
  const pagebuilder = [

    // ── Section 1 : Hero ──────────────────────────────────────────────────────
    {
      _type: 'sectionHero',
      _key:  uid(),
      image:           heroImg,
      eyebrow:         'Bar à la mouche · Bretagne-Sud',
      titre:           'Pêche du bar à la mouche en Bretagne',
      sousTitre:       'Depuis 2000 en Bretagne-Sud : bar à vue, en bateau, en estuaire',
      hauteur:         'full',
      btnReserverTexte: 'Réserver une sortie',
      btnReserverLien:  '/contact',
      btnTelTexte:     '06 87 30 34 56',
      btnMaterielLien: '/materiel-mouche-bar',
    },

    // ── Section 2 : Intro + Info card ─────────────────────────────────────────
    {
      _type: 'sectionIntro',
      _key:  uid(),
      texte: [
        para('La France offre un linéaire de littoral conséquent, et la Bretagne parmi les côtes et les estuaires les plus prisés pour la pêche du bar. Souvent pratiqué en bateau dans les baies, et sur les pointes rocheuses, la pêche du bord est cependant possible, notamment en estuaire.'),
        para("Depuis mon arrivée en Bretagne en 2000, j'ai rapidement été attiré par la pêche du bar, poisson que je n'avais jamais eu l'occasion de prendre à la mouche auparavant. Traquer les labrax en estuaire devient rapidement une passion dévorante à l'instar de la pêche en exotique, mais demande une connaissance de terrain indéniable et une compréhension du fonctionnement de cet écosystème particulier."),
        para("Après une phase de prospection depuis plusieurs années, je propose mes services de guide de pêche à la mouche en Bretagne sur différents estuaires pour vous initier et vous perfectionner dans la pêche du bar à la mouche du bord et également en bateau à bord de mon Carolina Skiff."),
        para("Discrétion, approche à pas de loup, et précision sont de rigueur pour déjouer la méfiance des gros bars dans peu d'eau."),
      ],
      showInfoCard: true,
      niveau:  'Tous niveaux',
      format:  'Initiation · Perfectionnement · Bar à vue · Coaching · Bateau',
      fond:    'white',
    },

    // ── Section 3 : Grille de sous-prestations ────────────────────────────────
    {
      _type: 'sectionCards',
      _key:  uid(),
      cards: [
        {
          _key: uid(), _type: 'card',
          titre:     'Initiation bar à la mouche',
          sousTitre: 'Pour débuter et devenir autonome',
          lien:      '/initiation-peche-du-bar-a-la-mouche',
          image:     initImg,
        },
        {
          _key: uid(), _type: 'card',
          titre:     'Perfectionnement',
          sousTitre: 'Progresser et rechercher les gros poissons',
          lien:      '/peche-du-bar-perfectionnement',
          image:     perfImg,
        },
        {
          _key: uid(), _type: 'card',
          titre:     'Bar à vue en estuaire',
          sousTitre: 'Le graal du bar à la mouche',
          lien:      '/peche-du-bar-a-vue-a-la-mouche',
          image:     vueImg,
        },
        {
          _key: uid(), _type: 'card',
          titre:     'Pêche en bateau',
          sousTitre: 'Sur mon Carolina Skiff spécial mouche',
          lien:      '/peche-mouche-bar-bateau-bretagne',
          image:     bateauImg,
        },
        {
          _key: uid(), _type: 'card',
          titre:     'Coaching bar à la mouche',
          sousTitre: 'Analyse vidéo, débriefing technique, progression ciblée',
          lien:      '/peche-du-bar-a-la-mouche-coaching',
          image:     coachingImg,
        },
      ],
    },

    // ── Section 4 : CTA Final ────────────────────────────────────────────────
    {
      _type:    'sectionCta',
      _key:     uid(),
      titre:    'Réservez votre sortie',
      texte:    'Disponibilités et tarifs sur demande, réponse sous 24h.',
      btn1Texte: 'Me contacter',
      btn1Lien:  '/contact',
      btn2Texte: '06 87 30 34 56',
      btn2Lien:  'tel:0687303456',
      style:    'dark',
    },
  ]

  // 3. Trouver le document existant
  const existing = await client.fetch(
    `*[_type == "prestation" && slug.current == "peche-du-bar-a-la-mouche"][0]{ _id, title }`
  )
  if (!existing?._id) {
    console.error('❌ Document "peche-du-bar-a-la-mouche" introuvable dans Sanity.')
    console.error('   Vérifiez que la prestation existe dans le Studio.')
    process.exit(1)
  }
  console.log(`📄 Document trouvé : ${existing.title} (${existing._id})`)

  // 4. Patch
  console.log('🔧 Application du pagebuilder...')
  await client.patch(existing._id)
    .set({
      pagebuilder,
      seoTitle:       'Pêche du bar à la mouche en Bretagne — Jean-Baptiste Vidal, Guide',
      seoDescription: 'Pêche du bar à la mouche avec Jean-Baptiste Vidal, Moniteur-Guide de pêche. Initiation et perfectionnement à la pêche du bar. Pêche du bord et en bateau. Recherche de très gros bars à vue.',
    })
    .commit({ autoGenerateArrayKeys: true })

  console.log('\n✅ Migration terminée !')
  console.log('📋 4 sections créées : Hero · Intro+InfoCard · Grille 5 cartes · CTA')
  console.log('\n👉 Prochaines étapes :')
  console.log('   1. Ouvrir le Studio → Prestations → Pêche du bar')
  console.log('      → Vérifier les sections dans "Sections de la page"')
  console.log('   2. Publier le document dans Studio')
  console.log('   3. Vérifier la page sur : https://guide-peche.smart-horizon.workers.dev/peche-du-bar-a-la-mouche')
  console.log('      (après le rebuild GitHub Actions déclenché par la publication)\n')
}

run().catch(err => { console.error('❌', err.message); process.exit(1) })
