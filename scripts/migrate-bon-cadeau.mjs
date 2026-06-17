/**
 * migrate-bon-cadeau.mjs
 * Crée la page "Bon cadeau" dans Sanity avec sections pagebuilder complètes
 * Usage : node scripts/migrate-bon-cadeau.mjs
 */
import { createClient } from '@sanity/client'
import { config } from 'dotenv'

config()

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'uievv97s',
  dataset:   process.env.SANITY_DATASET    || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_TOKEN,
  useCdn:    false,
})

function key() { return Math.random().toString(36).slice(2, 10) }
function block(text) {
  return {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text }],
  }
}
function item(texte, inclus = true) {
  return { _type: 'object', _key: key(), texte, inclus }
}
function carte(titre, sousTitre, description) {
  return { _type: 'object', _key: key(), titre, sousTitre, description }
}

const pagebuilder = [

  // ─── 1. Hero ────────────────────────────────────────────────────────────────
  {
    _type: 'sectionHero',
    _key: key(),
    eyebrow:          'Idée cadeau originale · Bretagne-Sud',
    titre:            'Offrez une journée de pêche à la mouche en Bretagne',
    sousTitre:        'Bon cadeau personnalisé pour un anniversaire, Noël, un départ en retraite ou toute occasion spéciale. Pêcheurs débutants ou confirmés, Jean-Baptiste adapte chaque sortie.',
    btnReserverTexte: 'Demander mon bon cadeau',
    btnReserverLien:  '/contact',
    btnTelTexte:      '06 87 30 34 56',
    hauteur:          'moyen',
  },

  // ─── 2. Intro ───────────────────────────────────────────────────────────────
  {
    _type: 'sectionIntro',
    _key: key(),
    eyebrow:      'Bon cadeau 2026',
    titre:        'Un cadeau unique et sur mesure',
    texte: [
      block("Pour vos proches pêcheurs ou souhaitant découvrir la pêche à la mouche, le bon cadeau est la solution idéale. Une journée, un week-end ou un séjour sur plusieurs jours — tout peut être organisé selon vos souhaits."),
      block("Offrez une immersion dans les rivières, estuaires et côtes de Bretagne-Sud avec Jean-Baptiste Vidal, guide professionnel depuis 21 ans."),
    ],
    showInfoCard: true,
    duree:  '7 à 8 heures (journée complète)',
    lignesSupp: [
      { _type: 'object', _key: key(), label: 'Niveaux',  valeur: 'Débutants · Confirmés · Experts' },
      { _type: 'object', _key: key(), label: 'Espèces',  valeur: 'Bar · Truite · Alose · Brochet · Réservoir' },
      { _type: 'object', _key: key(), label: 'Zone',     valeur: 'Bretagne-Sud, Finistère · Morbihan' },
    ],
    boutons: [
      { _type: 'object', _key: key(), texte: '06 87 30 34 56',          lien: 'tel:0687303456' },
      { _type: 'object', _key: key(), texte: 'enjoy.fishing@hotmail.fr', lien: 'mailto:enjoy.fishing@hotmail.fr' },
    ],
    fond: 'white',
  },

  // ─── 3. Les 3 formules cadeaux ──────────────────────────────────────────────
  {
    _type: 'sectionProgrammeCartes',
    _key: key(),
    eyebrow:  'Les formules',
    titre:    'Choisissez votre bon cadeau',
    intro:    'Tous les bons cadeaux sont personnalisables selon vos envies et votre budget. Contactez Jean-Baptiste pour en discuter.',
    colonnes: '3',
    fond:     'sand',
    items: [
      carte(
        'Découverte & initiation',
        'Pour les débutants',
        'Idéal pour offrir une première expérience de la pêche à la mouche. Bar en estuaire, truite en rivière ou initiation technique sur un réservoir — à personnaliser selon le souhait du bénéficiaire.',
      ),
      carte(
        'Journée de guidage',
        'Pour les pêcheurs passionnés',
        'Une journée entière aux côtés de Jean-Baptiste sur ses spots secrets. Perfectionnement technique, pêche à vue, travail des postes... Une journée de pêche inoubliable.',
      ),
      carte(
        'Week-end ou séjour',
        "L'expérience complète",
        "Plusieurs jours de guidage avec organisation possible de l'hébergement et des activités pour les accompagnants. Bar en bateau, rivières de Bretagne, réservoir — le cadeau ultime pour un pêcheur.",
      ),
    ],
  },

  // ─── 4. Inclus / Non inclus ─────────────────────────────────────────────────
  {
    _type: 'sectionProgrammeTexte',
    _key: key(),
    eyebrow:  'Contenu du bon cadeau',
    titre:    'Ce qui est inclus',
    colonnes: [
      {
        _type: 'object', _key: key(),
        label: 'Inclus dans votre bon cadeau',
        style: 'check',
        items: [
          item('Encadrement et guidage professionnel (7-8h environ)'),
          item('Prêt de matériel haut de gamme si nécessaire (cannes, moulinets, soies)'),
          item('Mouches et matériel consommable'),
          item('Bon cadeau personnalisé au format JPEG imprimable, sous 24h'),
          item("Aide à l'organisation logistique sur demande (hébergement, restaurants…)"),
          item('Boissons'),
        ],
      },
      {
        _type: 'object', _key: key(),
        label: 'Non inclus',
        style: 'check',
        items: [
          item('Permis de pêche', false),
          item('Waders et bottes de pêche', false),
          item('Repas et restauration', false),
          item('Transport et hébergement', false),
        ],
      },
    ],
    fond: 'white',
  },

  // ─── 5. Comment commander — 6 étapes ────────────────────────────────────────
  {
    _type: 'sectionProgrammeCartes',
    _key: key(),
    eyebrow:  'Simple et rapide',
    titre:    'Comment commander ?',
    colonnes: '3',
    fond:     'sand',
    items: [
      carte(
        'Prenez contact',
        'Étape 1',
        'Contactez Jean-Baptiste par formulaire, mail ou téléphone pour lui décrire votre projet de cadeau.',
      ),
      carte(
        'Choisissez la prestation',
        'Étape 2',
        'Précisez la nature de la prestation (espèce, durée, nombre de personnes) et consultez les tarifs si besoin.',
      ),
      carte(
        'Personnalisez le bon',
        'Étape 3',
        "Donnez le nom du bénéficiaire et des offreurs. Le bon cadeau sera personnalisé à votre image.",
      ),
      carte(
        'Réglez le montant',
        'Étape 4',
        'Envoyez le règlement correspondant à la prestation choisie. Retrouvez les tarifs sur la page dédiée.',
      ),
      carte(
        'Recevez le document',
        'Étape 5',
        "Dès réception, Jean-Baptiste vous envoie le bon cadeau au format JPEG imprimable sous 24h (parfois avant si urgent).",
      ),
      carte(
        'Profitez !',
        'Étape 6',
        'Le bénéficiaire contacte le guide pour fixer la date ensemble. Le bon est valable pour toute la saison en cours.',
      ),
    ],
  },

  // ─── 6. Bannière récap ──────────────────────────────────────────────────────
  {
    _type: 'sectionBanniere',
    _key: key(),
    texte:  '🎁 Bon cadeau valable pour toute la saison en cours · Personnalisé aux noms des bénéficiaires · Format JPEG imprimable',
    style:  'ocean',
  },

  // ─── 7. CTA final ────────────────────────────────────────────────────────────
  {
    _type: 'sectionCta',
    _key: key(),
    titre:     'Commander votre bon cadeau',
    texte:     'Contactez Jean-Baptiste pour personnaliser votre bon cadeau et recevoir votre document. Réponse sous 24h.',
    btn1Texte: 'Me contacter',
    btn1Lien:  '/contact',
    btn2Texte: '06 87 30 34 56',
    btn2Lien:  'tel:0687303456',
    style:     'dark',
  },
]

const doc = {
  _type: 'page',
  _id:   'page-bon-cadeau',
  title: 'Bon cadeau',
  slug:  { _type: 'slug', current: 'bon-cadeau' },
  seoTitle:       'Bon cadeau pêche à la mouche en Bretagne — Jean-Baptiste Vidal',
  seoDescription: 'Offrez un bon cadeau de pêche à la mouche en Bretagne avec Jean-Baptiste Vidal, guide professionnel. Bar, truite, alose, brochet — stage personnalisé à partir de 150 €.',
  pagebuilder,
}

async function run() {
  console.log('🚀 Migration bon cadeau vers Sanity...')
  try {
    const result = await client.createOrReplace(doc)
    console.log(`✅ Page créée / mise à jour : ${result._id}`)
    console.log(`   ${pagebuilder.length} sections créées`)
  } catch (err) {
    console.error('❌ Erreur :', err.message)
    process.exit(1)
  }
}

run()
