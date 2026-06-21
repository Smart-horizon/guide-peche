import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// Patch les deux documents : brouillon ET publié
const DOC_IDS = ['drafts.page-accueil', 'page-accueil']

const pagebuilderEn = [
  {
    _key: 'hero-090cea7d',
    _type: 'sectionHero',
    hauteur: 'full',
    eyebrow: 'Licensed Guide · South Brittany',
    titre: 'Fly Fishing in Brittany',
    sousTitre: 'Guided fishing for sea bass, trout, shad and pike. Courses and coaching from beginner to masterclass level.',
    btnReserverTexte: 'Book a session',
    btnReserverLien: '/contact',
    btnTelTexte: '06 87 30 34 56',
    videoYoutubeUrl: 'https://www.youtube.com/watch?v=iq9lzlg3__I&t=4s',
    videoYoutubeDebut: 0,
    videoYoutubeFin: 26,
  },
  {
    _key: 'cards3-prestations-hp',
    _type: 'sectionCards3',
    eyebrow: 'What I offer',
    titre: 'Courses & guided fishing',
    cartes: [
      {
        _key: 'card-eau-douce',
        isLarge: true,
        label: 'Freshwater',
        sousTitre: 'Trout · Shad · Pike',
        lien: '/peche-a-la-mouche-en-bretagne',
        image: {
          _type: 'image',
          asset: { _ref: 'image-144b96e29f05f582272fae0a1ec3aab8629f1732-1400x900-jpg', _type: 'reference' },
        },
      },
      {
        _key: 'card-bar',
        isLarge: false,
        label: 'Sea Bass',
        sousTitre: 'Sight fishing · Boat',
        lien: '/peche-du-bar-a-la-mouche',
        image: {
          _type: 'image',
          asset: { _ref: 'image-edf09320535d3efd05f34c98a0b605d360473478-1400x1050-jpg', _type: 'reference' },
        },
      },
      {
        _key: 'card-masterclass',
        isLarge: false,
        label: 'MasterClass',
        sousTitre: 'Reservoir · Czech Nymph',
        lien: '/masterclass',
        image: {
          _type: 'image',
          asset: { _ref: 'image-08ac153c41c35cb285d33c28b45bef14464785f9-998x748-avif', _type: 'reference' },
          crop: { _type: 'sanity.imageCrop', bottom: 0, left: 0, right: 0, top: 0 },
          hotspot: { _type: 'sanity.imageHotspot', height: 0.633700646646248, width: 0.4762576960864287, x: 0.46939256914430894, y: 0.3801034996663105 },
        },
      },
      {
        _key: 'card-spey',
        isLarge: false,
        label: 'Spey Cast & Casting',
        sousTitre: 'Single-hand · Switch · Spey',
        lien: '/stage-spey-cast-et-cours-de-lancer',
        image: {
          _type: 'image',
          asset: { _ref: 'image-197decd28a77a8fb83e95f08ff3740186e82a64f-816x592-avif', _type: 'reference' },
          crop: { _type: 'sanity.imageCrop', bottom: 0, left: 0, right: 0, top: 0 },
          hotspot: { _type: 'sanity.imageHotspot', height: 0.716554289645903, width: 0.3435576061836135, x: 0.2698497873476236, y: 0.6002961168510833 },
        },
      },
      {
        _key: 'card-cadeau',
        isLarge: false,
        label: 'Gift Voucher',
        sousTitre: "Give a day's fishing",
        lien: '/bon-cadeau-peche-mouche',
        image: {
          _type: 'image',
          asset: { _ref: 'image-15d99f85e68a03a4b9a16d784cc8bab695474756-686x522-avif', _type: 'reference' },
          crop: { _type: 'sanity.imageCrop', bottom: 0, left: 0, right: 0, top: 0 },
          hotspot: { _type: 'sanity.imageHotspot', height: 0.3271280894044785, width: 0.47806700373217415, x: 0.5020768262537764, y: 0.1935648969991795 },
        },
      },
    ],
  },
  {
    _key: 'guide-42e3407d',
    _type: 'sectionGuideHP',
    eyebrow: 'Your guide',
    nom: 'Jean-Baptiste Vidal',
    accroche: '33 years of fly fishing and experience at your service, including 21 years of professional guiding in France and abroad.',
    bio: 'After studies in environmental science and 5 years at the Finistère Fishing Federation, Jean-Baptiste guided 6 seasons on the Rio Grande (Argentina) for Nervous Waters, then in Ireland, Russia and Bolivia. Since 2014, he has offered his services as a licensed fly fishing guide in South Brittany, year-round.',
    boutonTexte: 'Your guide',
    boutonLien: '/jean-baptiste-vidal-moniteur-guide-de-peche',
    stats: [
      { _key: 'stat1', _type: 'object', valeur: '33 years', label: 'of fly fishing' },
      { _key: 'stat2', _type: 'object', valeur: '21 years', label: 'of guiding' },
      { _key: 'stat3', _type: 'object', valeur: '8 years', label: 'guiding abroad' },
      { _key: 'stat4', _type: 'object', valeur: 'Trips', label: 'Fishing travel organisation' },
    ],
    photo: {
      _type: 'image',
      asset: { _ref: 'image-747bb7980ac5b59035182f4c8439fba359ff5f58-1225x695-avif', _type: 'reference' },
      crop: { _type: 'sanity.imageCrop', bottom: 0, left: 0, right: 0, top: 0 },
      hotspot: { _type: 'sanity.imageHotspot', height: 0.7600938909495517, width: 0.36729563077248784, x: 0.6048376425754889, y: 0.5291777700196492 },
    },
  },
  {
    _key: 'materiel-hp-1781510394394',
    _type: 'sectionMaterielHP',
    eyebrow: 'Gear · Resources',
    titre: 'Tackle & universe',
    featuredEyebrow: 'Rods · Lines · Reels · Accessories',
    featuredTitre: 'My gear',
    featuredLien: '/materiel-jeanbaptistevidal',
    featuredImage: {
      _type: 'image',
      asset: { _ref: 'image-14106cb0a0bc96157cb14c711567f16a097f5a61-1600x1067-jpg', _type: 'reference' },
    },
    sousLiens: [
      { _key: 'sl1', href: '/materiel-mouche-migrateur', label: 'Migratory fly gear' },
      { _key: 'sl2', href: '/materiel-mouche-truite', label: 'Trout fly gear' },
      { _key: 'sl3', href: '/materiel-mouche-bar', label: 'Sea bass fly gear' },
      { _key: 'sl4', href: '/materiel-mouche-reservoir', label: 'Stillwater fly gear' },
      { _key: 'sl5', href: '/materiel-mouche-brochet', label: 'Pike fly gear' },
      { _key: 'sl6', href: '/materiel-mouche-peche-exotique', label: 'Saltwater fly gear' },
    ],
    cardsSecondaires: [
      {
        _key: 'cs1',
        eyebrow: 'Streamers · Nymphs · Dry flies',
        titre: 'My flies',
        lien: '/mouches-de-peche-jeanbaptiste-vidal',
      },
      {
        _key: 'cs2',
        eyebrow: 'Carolina Skiff · Flat-bottomed',
        titre: 'The boat',
        lien: '/bateau-bar-a-la-mouche',
        image: {
          _type: 'image',
          asset: { _ref: 'image-f2053b3ff3d662e6efc79a1bbbaa3e21f6ec9397-1116x743-avif', _type: 'reference' },
          crop: { _type: 'sanity.imageCrop', bottom: 0, left: 0, right: 0, top: 0 },
          hotspot: { _type: 'sanity.imageHotspot', height: 0.8142790379437925, width: 0.50904765867053, x: 0.48363492195568436, y: 0.4781504750522109 },
        },
      },
    ],
  },
  {
    _key: 'e17c5637d9cd',
    _type: 'sectionBanniereCard',
    eyebrow: '🎁 Gift idea',
    titre: 'Give an unforgettable experience',
    texte: 'Give a loved one a day of fly fishing in Brittany. Introduction, advanced coaching, or guided fishing — the gift voucher is valid for all sessions, freshwater or sea bass.',
    boutons: [
      { _key: '20cb8b585fd5', _type: 'bouton', texte: 'Discover the gift voucher', lien: '/bon-cadeau-peche-mouche', style: 'primaire' },
      { _key: 'b67f244612e8', _type: 'bouton', texte: 'Ask a question', lien: '/contact', style: 'ghost' },
    ],
    image: {
      _type: 'image',
      asset: { _ref: 'image-144b96e29f05f582272fae0a1ec3aab8629f1732-1400x900-jpg', _type: 'reference' },
    },
    infocard: {
      afficher: true,
      ctaTexte: 'Order →',
      ctaLien: '/contact',
      lignes: [
        { _key: '5cc15695aea8', _type: 'ligne', label: 'Format', valeur: 'Full day · Half day' },
        { _key: 'e92b57e4cf7f', _type: 'ligne', label: 'Valid for', valeur: 'All sessions · Freshwater & Sea bass' },
        { _key: '3931ae7e92fb', _type: 'ligne', label: 'Validity', valeur: '1 year from purchase date' },
        { _key: 'aa2fc83045be', _type: 'ligne', label: 'Delivery', valeur: 'By e-mail or post · Personalised' },
      ],
    },
  },
  {
    _key: 'temoignages-b9c8cbb7',
    _type: 'sectionTemoignagesHP',
    eyebrow: 'What they say',
    pitch: 'Anglers from across France and Europe have trusted Jean-Baptiste since 2004.',
    ctaTexte: 'Read all reviews',
    ctaLien: '/temoignages-avis-jeanbaptiste-vidal',
    nombreTemoignages: 5,
  },
]

for (const DOC_ID of DOC_IDS) {
  try {
    const result = await client
      .patch(DOC_ID)
      .set({ pagebuilderEn })
      .commit()
    console.log('✅ pagebuilderEn patched on', result._id, '— Sections:', result.pagebuilderEn?.length)
  } catch (e) {
    console.warn('⚠️  Impossible de patcher', DOC_ID, '—', e.message)
  }
}
