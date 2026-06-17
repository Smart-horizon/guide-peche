/**
 * migrate-tarifs.mjs
 * Peuple la page "tarifs" dans Sanity avec les données de tarifs.astro
 * Usage : node scripts/migrate-tarifs.mjs
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
function prix(val, lbl) { return { _type: 'object', _key: key(), valeur: val, label: lbl } }
function ligne(nom, lienUrl, format, statut, ...tarifs) {
  return { _type: 'object', _key: key(), nom, lienUrl: lienUrl || null, format, statut, prix: tarifs }
}

const pagebuilder = [

  // ─── 1. Hero ────────────────────────────────────────────────────────────────
  {
    _type: 'sectionHero',
    _key: key(),
    eyebrow:        'Bretagne-Sud · 2026',
    titre:          'Tarifs des stages & guidages',
    sousTitre:      'Enseignements et guidages pour pêcheurs débutants, confirmés et experts : eau douce, bar, migrateurs, technique.',
    btnReserverTexte: 'Demander un renseignement',
    btnReserverLien:  '/contact',
    btnTelTexte:    '06 87 30 34 56',
    hauteur:        'moyen',
  },

  // ─── 2. Intro ───────────────────────────────────────────────────────────────
  {
    _type: 'sectionIntro',
    _key: key(),
    eyebrow:      'Tarifs 2026',
    titre:        'Prix par personne',
    texte: [{
      _type: 'block', _key: key(), style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: key(), marks: [],
        text: "Sur cette page, vous trouverez le tarif de mes stages de pêche à la mouche et de mes prestations pour la pêche en Bretagne. N'hésitez pas à me contacter si vous souhaitez d'autres renseignements.",
      }],
    }],
    showInfoCard: true,
    duree:  '7 à 8 heures environ',
    lignesSupp: [
      { _type: 'object', _key: key(), label: 'Niveaux', valeur: 'Débutants · Confirmés · Experts' },
      { _type: 'object', _key: key(), label: 'Zone',    valeur: 'Bretagne-Sud, Finistère · Morbihan' },
      { _type: 'object', _key: key(), label: 'Contact', valeur: '06 87 30 34 56' },
    ],
    boutons: [
      { _type: 'object', _key: key(), texte: '06 87 30 34 56',          lien: 'tel:0687303456' },
      { _type: 'object', _key: key(), texte: 'enjoy.fishing@hotmail.fr', lien: 'mailto:enjoy.fishing@hotmail.fr' },
    ],
    fond: 'white',
  },

  // ─── 3. BAR À LA MOUCHE ─────────────────────────────────────────────────────
  {
    _type: 'sectionTarifs',
    _key: key(),
    eyebrow:      'Estuaires · Bretagne-Sud',
    titre:        'Bar à la mouche',
    description:  'Bar à vue, en bateau, en estuaire. Du débutant au pêcheur expert en quête des gros labrax.',
    lienUrl:      '/peche-du-bar-a-la-mouche',
    lienLabel:    'Découvrir les prestations →',
    couleurPanel: 'bar',
    fond:         'white',
    lignes: [
      ligne('Initiation bar à la mouche',           '/initiation-peche-du-bar-a-la-mouche',  '1 journée',                            'normal',   prix('320 €','1 pers.'), prix('225 €','2 pers.')),
      ligne('Perfectionnement bar',                 '/peche-du-bar-perfectionnement',        '1 journée',                            'normal',   prix('320 €','1 pers.'), prix('225 €','2 pers.')),
      ligne('Bar à vue en estuaire',                '/peche-du-bar-a-vue-a-la-mouche',       '1 session',                            'accentue', prix('320 €','1 pers.'), prix('225 €','2 pers.')),
      ligne('Bar en bateau « spécial mouche »',     '/peche-mouche-bar-bateau-bretagne',     '1 session · Carolina Skiff',           'accentue', prix('350 €','1 pers.'), prix('250 €','2 pers.')),
      ligne('Coaching bar à la mouche',             '/peche-du-bar-a-la-mouche-coaching',   'Journée · Sur vos spots · Sur votre bateau', 'normal', prix('320 €','1 pers.'), prix('225 €','2 pers.')),
    ],
    matrices: [],
  },

  // ─── 4. EAU DOUCE & MIGRATEURS ──────────────────────────────────────────────
  {
    _type: 'sectionTarifs',
    _key: key(),
    eyebrow:      'Rivières · Réservoirs',
    titre:        'Eau douce & migrateurs',
    description:  "Truite, alose, brochet et saumon : les rivières bretonnes et leurs secrets.",
    lienUrl:      '/peche-a-la-mouche-en-bretagne',
    lienLabel:    'Découvrir les prestations →',
    couleurPanel: 'eau',
    fond:         'sand',
    lignes: [
      ligne('Initiation pêche à la mouche',         '/peche-a-la-mouche-en-bretagne',              '1 journée',                       'normal',   prix('280 €','1 pers.'), prix('180 €','2 pers.'), prix('150 €','3 pers.')),
      ligne('Perfectionnement truite en rivière',   '/peche-de-la-truite-a-la-mouche-en-bretagne', '1 journée',                       'normal',   prix('300 €','1 pers.'), prix('200 €','2 pers.'), prix('160 €','3 pers.')),
      ligne('Truite en réservoir',                  '/peche-de-la-truite-en-reservoir',            '1 journée · permis non inclus',   'normal',   prix('320 €','1 pers.'), prix('200 €','2 pers.'), prix('150 €','3 pers.')),
      ligne('Brochet, du bord',                     '/peche-du-brochet-a-la-mouche',               '1 journée',                       'normal',   prix('300 €','1 pers.'), prix('200 €','2 pers.')),
      ligne('Brochet, en bateau',                   '/peche-du-brochet-a-la-mouche',               '1 journée',                       'normal',   prix('320 €','1 pers.'), prix('200 €','2 pers.')),
      ligne('Pêche du saumon (salmo salar)',         null,                                          'Fermée en 2026',                  'ferme',    prix('300 €','1 pers.'), prix('200 €','2 pers.'), prix('160 €','3 pers.')),
    ],
    matrices: [
      {
        _type: 'object', _key: key(),
        titre:    'Grande alose (alosa alosa)',
        titreUrl: '/peche-de-l-alose-a-la-mouche',
        note:     'tarif selon le format de sortie',
        colonnes: ['Coup du soir', '1 j. Aulne', '1 j. Blavet'],
        lignes: [
          { _type: 'object', _key: key(), label: '1 personne',   valeurs: ['200 €', '320 €', '350 €'] },
          { _type: 'object', _key: key(), label: '2 personnes',  valeurs: ['180 €', '200 €', '250 €'] },
          { _type: 'object', _key: key(), label: '3 personnes',  valeurs: ['150 €', '170 €', '180 €'] },
        ],
      },
    ],
  },

  // ─── 5. STAGES & TECHNIQUE ──────────────────────────────────────────────────
  {
    _type: 'sectionTarifs',
    _key: key(),
    eyebrow:      'Technique · Perfectionnement',
    titre:        'Stages & technique',
    description:  'Cours de lancer, Spey Cast, Masterclass : progressez avec des exercices ciblés.',
    lienUrl:      '/stage-spey-cast-et-cours-de-lancer',
    lienLabel:    'Découvrir les stages →',
    couleurPanel: 'stage',
    fond:         'white',
    lignes: [
      ligne('Cours de lancer dont Spey Cast',   '/stage-spey-cast-et-cours-de-lancer', '1 journée · canne une & deux mains', 'normal',  prix('300 €','1 pers.'), prix('200 €','2 pers.'), prix('160 €','3 pers.')),
      ligne('Masterclass réservoir',            '/master-class-peche-en-reservoir',    'Format sur mesure',                  'contact'),
      ligne('Masterclass nymphe au fil',        '/master-class-nymphe-au-fil',         'Format sur mesure',                  'contact'),
    ],
    matrices: [
      {
        _type: 'object', _key: key(),
        titre:    'Stage Père / enfant (– de 16 ans)',
        titreUrl: '/contact',
        note:     null,
        colonnes: ['½ journée', '1 journée'],
        lignes: [
          { _type: 'object', _key: key(), label: 'Père et 1 enfant',  valeurs: ['230 €', '350 €'] },
          { _type: 'object', _key: key(), label: 'Père et 2 enfants', valeurs: ['250 €', '400 €'] },
        ],
      },
    ],
  },

  // ─── 6. Inclus / Non inclus ─────────────────────────────────────────────────
  {
    _type: 'sectionCta',
    _key: key(),
    titre:   'Ce qui est inclus',
    texte:   "✓ Enseignement et guidage (7–8h) · Matériel haut de gamme si nécessaire · Mouches du guide · Matériel consommable · Boissons · Aide à l'organisation sur demande\n\n✗ Non inclus : permis de pêche · waders/bottes · repas · transport · hébergement",
    btn1Texte: 'Réserver',
    btn1Lien:  '/contact',
    btn2Texte: '06 87 30 34 56',
    btn2Lien:  'tel:0687303456',
    style:     'dark',
  },

  // ─── 7. CTA final ────────────────────────────────────────────────────────────
  {
    _type: 'sectionCta',
    _key: key(),
    titre:    'Réservez votre stage',
    texte:    'Disponibilités et informations complémentaires sur demande, réponse sous 24h.',
    btn1Texte: 'Me contacter',
    btn1Lien:  '/contact',
    btn2Texte: '06 87 30 34 56',
    btn2Lien:  'tel:0687303456',
    style:     'ocean',
  },
]

const doc = {
  _type: 'page',
  _id:   'page-tarifs',
  title: 'Tarifs',
  slug:  { _type: 'slug', current: 'tarifs' },
  seoTitle: 'Tarifs stages et guidages 2026 — Jean-Baptiste Vidal, Guide de pêche Bretagne',
  seoDescription: 'Tarifs 2026 des stages et guidages pêche à la mouche en Bretagne avec Jean-Baptiste Vidal : bar, truite, alose, brochet, réservoir, Spey Cast. À partir de 150 €/personne.',
  pagebuilder,
}

async function run() {
  console.log('🚀 Migration des tarifs vers Sanity...')
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
