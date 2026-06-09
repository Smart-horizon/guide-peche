/**
 * patch-intro-complet.mjs
 * Complète toutes les sectionIntro des prestations :
 * - Patch des champs manquants sur les pages avec sectionIntro existante
 * - Création de sectionIntro complète pour les pages qui n'en ont pas
 * - Création d'un pagebuilder minimal pour les pages vides
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'uievv97s', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN ||
    'skl1Jq1cu6ITb7XLmqhhExxPs49cBrlfmgynCLiVWj6a06hb09zCHnoaariWQdtgcTUzpyd9P3y5ocNpnUPYVOS863y3jY0rCxfIM2oAcfgPfaECJVFczkF1zzwztlb41HszbYACr8XRFzAxUqSLGyiba0KDzoA0g0m27TFwuniTC9BjMtPN',
})

let _k = 0
const key = (p = 'k') => `${p}${Date.now()}${++_k}`

function blocks(text) {
  return text.split('\n\n').filter(Boolean).map(para => ({
    _type: 'block', _key: key('bl'), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key('sp'), text: para.trim(), marks: [] }],
  }))
}

function intro(fields) {
  return {
    _type: 'sectionIntro', _key: key('intro'),
    fond: 'white',
    showInfoCard: true,
    ...fields,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PATCHES — champs manquants sur sectionIntro existante
// ─────────────────────────────────────────────────────────────────────────────

const PATCHES = [
  {
    slug: 'master-class-peche-en-reservoir',
    fields: {
      niveau: 'Débutants et confirmés',
      format: 'Stage 2 jours',
      saison: 'Janvier 2026 (16 & 17)',
    },
  },
  {
    slug: 'master-class-nymphe-au-fil',
    fields: {
      niveau: 'Débutants et confirmés',
      format: 'Stage 2 jours',
      saison: 'Mars 2026 (deux sessions de 2 jours)',
    },
  },
  {
    slug: 'peche-de-la-truite-en-reservoir',
    fields: {
      format: 'Journée 7 à 8 h de guidage',
    },
  },
  {
    slug: 'stage-spey-cast-et-cours-de-lancer',
    fields: {
      saison: 'Toute l\'année',
    },
  },
  {
    // Page overview bar — pas de tarif global, on précise le format
    slug: 'peche-du-bar-a-la-mouche',
    fields: {
      saison: 'Mi-avril à fin novembre',
      tarif:  'À partir de 225 € / pers. · Voir tarifs par prestation',
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 2. NOUVELLES SECTIONS — pages sans sectionIntro (mais pagebuilder existant)
// ─────────────────────────────────────────────────────────────────────────────

const NEW_SECTIONS = [
  // Rien dans cette catégorie après vérification
]

// ─────────────────────────────────────────────────────────────────────────────
// 3. PAGEBUILDERS COMPLETS — pages entièrement vides
// ─────────────────────────────────────────────────────────────────────────────

const NEW_PAGEBUILDERS = [
  {
    slug: 'stage-spey-cast',
    pagebuilder: [
      intro({
        eyebrow: 'Stage Spey Cast',
        titre:   'Maîtrisez le Spey Cast avec Jean-Baptiste',
        texte: blocks(
          `Stage intensif dédié aux techniques de Spey Cast : Single Spey, Double Spey, Snap T, Snake Roll. Jean-Baptiste pratique intensément ces lancers depuis ses nombreuses saisons en Argentine et en Russie sur des rivières à saumons.\n\nQue vous soyez débutant ou que vous souhaitiez perfectionner vos acquis, ce stage en petits groupes (2 à 4 personnes max.) vous permettra de progresser rapidement dans un cadre convivial et pédagogique.\n\nLes stages se déroulent sur rivière, en conditions réelles, avec les cannes et soies adaptées à chaque niveau.`
        ),
        niveau: 'Débutants et confirmés',
        format: 'Stage 1 jour · Week-end · En groupe ou particulier',
        saison: 'Toute l\'année',
        tarif:  '300 € · 1 pers. / 200 € · 2 pers. / 160 € · 3 pers.',
        boutons: [{ _type: 'bouton', _key: key('btn'), texte: 'Réserver ce stage', lien: '/contact' }],
      }),
    ],
  },
  {
    slug: 'cours-de-lancer-peche-a-la-mouche',
    pagebuilder: [
      intro({
        eyebrow: 'Cours de lancer · Pêche à la mouche',
        titre:   'Un lancer précis et élégant, ça s\'apprend',
        texte: blocks(
          `Un bon lancer est la base de tout en pêche à la mouche. Que vous débutiez ou que vous cherchiez à corriger de mauvaises habitudes, ces cours de lancer sont conçus pour vous faire progresser rapidement.\n\nNous travaillons les fondamentaux : timing, boucle, double traction, distance et précision. Les séances peuvent se dérouler sur pelouse, au bord de l'eau ou directement sur votre rivière habituelle.\n\nJean-Baptiste adapte son enseignement à votre niveau et à vos objectifs : sèche à distance, nymphe au fil, pêche en aval ou lancer en espace restreint.`
        ),
        niveau: 'Débutants et confirmés',
        format: 'Cours particulier · Demi-journée ou journée',
        saison: 'Toute l\'année',
        tarif:  '280 € · 1 pers. / 180 € · 2 pers.',
        boutons: [{ _type: 'bouton', _key: key('btn'), texte: 'Réserver un cours', lien: '/contact' }],
      }),
    ],
  },
  {
    slug: 'bon-cadeau-peche-mouche',
    pagebuilder: [
      intro({
        eyebrow: 'Bon cadeau · Pêche à la mouche',
        titre:   'Offrez une expérience unique sur les rivières bretonnes',
        texte: blocks(
          `Un bon cadeau pour offrir une sortie guidée à la mouche : la truite, le bar, l'alose, le brochet ou le saumon — le destinataire choisit la prestation qui lui correspond.\n\nLe bon cadeau est valable 1 an à compter de sa date d'achat. Il est nominatif et peut être utilisé pour n'importe quelle prestation de guidage proposée par Jean-Baptiste Vidal.\n\nContactez Jean-Baptiste pour établir votre bon cadeau personnalisé, préciser le montant souhaité et recevoir un document imprimable.`
        ),
        niveau: 'Tous niveaux · Idéal pour débuter',
        format: 'Valable pour toutes les prestations',
        saison: 'Valable 1 an',
        tarif:  'Selon prestation choisie · À partir de 180 €',
        boutons: [{ _type: 'bouton', _key: key('btn'), texte: 'Commander un bon cadeau', lien: '/contact' }],
      }),
    ],
  },
  {
    slug: 'masterclass',
    pagebuilder: [
      intro({
        eyebrow: 'Masterclass · Techniques avancées',
        titre:   'Des stages techniques animés par des experts',
        texte: blocks(
          `Les Masterclass proposées par Jean-Baptiste réunissent ses compétences de guide professionnel et l'expertise de champions pour vous offrir un contenu d'une densité exceptionnelle.\n\nDeux masterclass sont disponibles : la pêche en réservoir avec Grégoire Juglaret (Champion du Monde 2025) et la nymphe au fil. Ces stages en petits groupes (4 à 6 pers.) garantissent un suivi individualisé et une progression rapide.\n\nChaque masterclass se déroule sur 2 jours consécutifs, avec théorie et pratique sur le terrain.`
        ),
        niveau: 'Initiés et confirmés',
        format: 'Stage 2 jours · Petits groupes (4–6 pers.)',
        saison: 'Printemps 2026',
        tarif:  '700 à 800 € / pers. selon la masterclass',
        boutons: [{ _type: 'bouton', _key: key('btn'), texte: 'Voir les masterclass', lien: '/contact' }],
      }),
    ],
  },
  {
    slug: 'stage-peche-mouche',
    pagebuilder: [
      intro({
        eyebrow: 'Stages · Pêche à la mouche',
        titre:   'Progressez en conditions réelles avec un professionnel',
        texte: blocks(
          `Jean-Baptiste propose différentes formules de stages adaptées à tous les niveaux et toutes les espèces : truite, bar, alose, brochet, migrateurs. Chaque stage se déroule en conditions réelles sur rivière ou en mer, avec un suivi technique personnalisé.\n\nLes groupes sont volontairement limités à 2–3 personnes pour garantir un enseignement de qualité. Vous repartez avec des techniques maîtrisées et des repères concrets pour progresser en autonomie.\n\nInitiation, perfectionnement, cours de lancer, Spey Cast ou Masterclass — une formule pour chaque objectif.`
        ),
        niveau: 'Tous niveaux · Du débutant à l\'expert',
        format: 'Journée · Week-end · Sur mesure',
        saison: 'Toute l\'année',
        tarif:  'À partir de 160 € / pers.',
        boutons: [{ _type: 'bouton', _key: key('btn'), texte: 'Réserver un stage', lien: '/contact' }],
      }),
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  let ok = 0, skip = 0, err = 0

  // ── 1. Patches champs manquants ──────────────────────────────────────────
  console.log('\n━━━ 1. Patches champs manquants ━━━')
  for (const { slug, fields } of PATCHES) {
    try {
      const doc = await client.fetch(
        `*[_type == "prestation" && slug.current == $slug][0]{ _id, "introKey": pagebuilder[_type == "sectionIntro"][0]._key }`,
        { slug }
      )
      if (!doc?._id || !doc.introKey) { console.log(`  ⚠  ${slug} — intro introuvable`); skip++; continue }

      const set = {}
      for (const [k, v] of Object.entries(fields)) {
        set[`pagebuilder[_key=="${doc.introKey}"].${k}`] = v
      }
      await client.patch(doc._id).set(set).commit()
      console.log(`  ✅ ${slug} →`, Object.keys(fields).join(', '))
      ok++
    } catch (e) { console.error(`  ❌ ${slug}`, e.message); err++ }
  }

  // ── 2. Ajout de pagebuilders complets ────────────────────────────────────
  console.log('\n━━━ 2. Création pagebuilders complets ━━━')
  for (const { slug, pagebuilder } of NEW_PAGEBUILDERS) {
    try {
      const doc = await client.fetch(
        `*[_type == "prestation" && slug.current == $slug][0]{ _id }`,
        { slug }
      )
      if (!doc?._id) { console.log(`  ⚠  ${slug} — document introuvable`); skip++; continue }

      await client.patch(doc._id).set({ pagebuilder }).commit()
      console.log(`  ✅ ${slug} — pagebuilder créé (${pagebuilder.length} section(s))`)
      ok++
    } catch (e) { console.error(`  ❌ ${slug}`, e.message); err++ }
  }

  console.log(`\n✨ Terminé : ${ok} mis à jour, ${skip} ignorés, ${err} erreurs\n`)
}

main()
