/**
 * seed-page-temoignages.mjs
 * Crée et publie le document singleton pageTemoignages dans Sanity
 * avec les valeurs initiales (textes actuels du site).
 *
 * Usage : node seed-page-temoignages.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const doc = {
  _id: 'pageTemoignages',
  _type: 'pageTemoignages',

  // Hero
  heroEyebrow: '21 ans de guidage',
  heroTitre:   'Témoignages & Avis',
  heroIntro:   "Sur cette page vous pourrez trouver certains témoignages de personnes qui m'ont fait confiance et qui ont participé à une journée de pêche en France ou été guidé par mes soins lors d'un voyage à l'étranger :",

  // Section Bar
  barOnglet:    'Bar à la mouche',
  barTitre:     'Bar à la mouche',
  barSousTitre: 'Pêche du bar en Bretagne-Sud, bar à vue, en bateau, en estuaire',
  barCtaTexte:  'Découvrir la pêche du bar à la mouche →',
  barCtaUrl:    '/peche-du-bar-a-la-mouche',

  // Section Saumon
  saumonOnglet:    'Saumon & Spey Cast',
  saumonTitre:     'Saumon, Alose & Spey Cast',
  saumonSousTitre: 'Guidage migrateurs sur les rivières bretonnes : Ellé, Scorff, Aulne, Aven, Elorn',
  saumonCtaTexte:  'Découvrir le Spey Cast →',
  saumonCtaUrl:    '/stage-spey-cast-et-cours-de-lancer',

  // Section Truite
  truiteOnglet:    'Truite & Initiation',
  truiteTitre:     'Truite & Initiation',
  truiteSousTitre: 'Initiation, perfectionnement truite en rivière : Scorff, Ellé, Isole',
  truiteCtaTexte:  'Découvrir la pêche en eau douce →',
  truiteCtaUrl:    '/peche-a-la-mouche-en-bretagne',

  // Section Voyages
  voyagesOnglet:    'Voyages',
  voyagesTitre:     'Voyages internationaux',
  voyagesSousTitre: 'Argentine · Bolivie · Cuba · Venezuela · Mexique',
  voyagesCtaTexte:  'Découvrir les voyages →',
  voyagesCtaUrl:    '/voyages-peche-mouche',

  // CTA final
  ctaTitre:     'Prêt à vivre votre expérience ?',
  ctaTexte:     'Rejoignez les centaines de pêcheurs qui ont fait confiance à Jean-Baptiste depuis 2004.',
  ctaBtn1Texte: 'Réserver une sortie',
  ctaBtn1Url:   '/contact',
  ctaBtn2Texte: 'Voir les prestations',
  ctaBtn2Url:   '/stage-peche-mouche',
}

try {
  // createOrReplace crée ou écrase le document (version brouillon d'abord)
  await client.createOrReplace(doc)
  console.log('✅ Document pageTemoignages créé (brouillon)')

  // Publier immédiatement
  await client
    .patch('pageTemoignages')
    .set({ _id: 'pageTemoignages' })
    .commit()
  console.log('✅ Document pageTemoignages publié')
  console.log('👉 Rechargez l\'aperçu Studio — les overlays Visual Editing sont actifs sur /temoignages')
} catch (err) {
  console.error('❌ Erreur :', err.message)
}
