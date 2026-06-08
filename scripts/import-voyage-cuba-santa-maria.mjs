/**
 * Import voyage Cuba — Cayo Santa Maria
 * Contenu calqué exactement sur la page hardcodée peche-mouche-cuba-cayo-santa-maria.astro
 * Images : D1.png + D2–D21.avif
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN ||
    'skl1Jq1cu6ITb7XLmqhhExxPs49cBrlfmgynCLiVWj6a06hb09zCHnoaariWQdtgcTUzpyd9P3y5ocNpnUPYVOS863y3jY0rCxfIM2oAcfgPfaECJVFczkF1zzwztlb41HszbYACr8XRFzAxUqSLGyiba0KDzoA0g0m27TFwuniTC9BjMtPN',
})

let keyCounter = 0
const key = (p = 'k') => `${p}${Date.now()}${++keyCounter}`

function blocks(text) {
  return text.split('\n\n').filter(Boolean).map(para => ({
    _type: 'block', _key: key('bl'), style: 'normal',
    children: [{ _type: 'span', _key: key('sp'), text: para.trim(), marks: [] }],
    markDefs: [],
  }))
}

async function uploadImage(localPath, alt = '') {
  const fullPath = path.join(process.cwd(), 'public', localPath)
  if (!fs.existsSync(fullPath)) { console.warn(`⚠ Image introuvable : ${fullPath}`); return null }
  const data = fs.readFileSync(fullPath)
  const ext  = path.extname(localPath).slice(1)
  const mimeMap = { avif: 'image/avif', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' }
  const mime = mimeMap[ext] || `image/${ext}`
  const asset = await client.assets.upload('image', data, { filename: path.basename(localPath), contentType: mime })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt }
}

async function buildCayoSantaMaria() {
  console.log('🇨🇺 Import voyage Cuba — Cayo Santa Maria...')

  const pagebuilder = []

  // 1. HERO
  console.log('  → Hero...')
  const heroImg = await uploadImage('images/D17.avif', 'Cayo Santa Maria Cuba — Jardins du Roi')
  pagebuilder.push({
    _type: 'sectionHero', _key: key('hero'),
    eyebrow:          'Voyage · Cuba · Cayo Santa Maria',
    titre:            'Cayo Santa Maria',
    sousTitre:        'Les Jardins du Roi — destination tarpon',
    btnReserverTexte: 'Me contacter pour ce voyage',
    btnReserverLien:  '/contact',
    btnTelTexte:      '06 87 30 34 56',
    ...(heroImg ? { image: heroImg } : {}),
  })

  // 2. STATS
  console.log('  → Stats...')
  pagebuilder.push({
    _type: 'sectionStats', _key: key('stats'),
    fond: 'dark',
    stats: [
      { _type: 'stat', _key: key('st'), nombre: 'Tarpon',      label: "Espèce star · jusqu'à 40 lbs" },
      { _type: 'stat', _key: key('st'), nombre: 'Janv – Juin', label: 'Saison de pêche' },
      { _type: 'stat', _key: key('st'), nombre: '8 nuits',     label: '6 jours de pêche exclusive' },
      { _type: 'stat', _key: key('st'), nombre: '5★',          label: 'All inclusive · Iberostar' },
    ],
  })

  // 3. INTRO + INFO CARD
  console.log('  → Intro...')
  pagebuilder.push({
    _type: 'sectionIntro', _key: key('intro'),
    fond: 'white',
    texte: blocks(
      `Cuba est l'une des meilleures destinations de pêche en mer exotique du monde, grâce à la qualité de ses flats, de ses mangroves et à la migration des tarpons entre fin mars et fin juin. L'état exceptionnel de préservation des zones de pêche et une pêche commerciale peu développée offrent d'excellentes possibilités pour tenter les trois espèces emblématiques : le bonefish, le permit et le tarpon.

Cayo Santa Maria se situe sur la côte Nord de Cuba, dans le secteur des Jardins du Roi. Destination très prisée pour le tarpon de fin avril à fin juin, la période de février-mars est également très intéressante pour les pêcheurs souhaitant s'échapper de l'hiver avec un excellent rapport qualité-prix.

J'ai accompagné Olivier, Philippe et Michaël du 28 février au 5 mars 2016 — chacun capturant de beaux tarpons jusqu'à 20 kg malgré des conditions difficiles, Michaël en piquant 3 dans la même journée !`
    ),
    showInfoCard: true,
    lignesSupp: [
      { _type: 'ligneInfo', _key: key('li'), label: 'Espèces cibles', valeur: 'Tarpon · Bonefish · Permit · Snook' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Saison',         valeur: 'Janvier à juin (tarpon peak : fin avr–juin)' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Format',         valeur: '8 nuits / 6 jours de pêche' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Hôtel',          valeur: 'Iberostar Ensenachos ★★★★★' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Encadrement',    valeur: '1 guide pour 2 pêcheurs (single possible)' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Partenaire',     valeur: 'Fly Fish The Run' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Tarifs',         valeur: 'Sur demande' },
    ],
    boutons: [
      { _type: 'bouton', _key: key('btn'), texte: 'Demander un devis', lien: '/contact' },
    ],
  })

  // 4. TEXTE + IMAGE — L'hôtel
  console.log('  → Section hôtel...')
  const hotelImg = await uploadImage('images/D1.png', 'Iberostar Ensenachos — Cayo Santa Maria')
  pagebuilder.push({
    _type: 'sectionTexteImage', _key: key('ti'),
    eyebrow: 'Fly Fish The Run',
    titre:   'Iberostar Ensenachos',
    texte: blocks(
      `Un resort hôtel 5 étoiles all inclusive à seulement 20 minutes de la marina privée. Piscines, 5 restaurants à thème, bars en bord de mer, SPA — tout le confort pour se ressourcer après les longues journées de pêche.

Rhum et bière locales inclus. Un cadre luxueux qui vous permettra de récupérer après chaque longue journée de pêche intensive sur les flats des Jardins du Roi.`
    ),
    imagePosition: 'right',
    fond: 'sand',
    ...(hotelImg ? { image: hotelImg } : {}),
  })

  // 5. GALERIE (D1–D5 — hôtel)
  console.log('  → Galerie hôtel...')
  const hotelPhotos = []
  const d1 = await uploadImage('images/D1.png', 'Iberostar Ensenachos — Cayo Santa Maria')
  if (d1) hotelPhotos.push({ ...d1, _key: key('ph') })
  for (let n = 2; n <= 5; n++) {
    const img = await uploadImage(`images/D${n}.avif`, `Iberostar Ensenachos — photo ${n}`)
    if (img) hotelPhotos.push({ ...img, _key: key('ph') })
  }
  pagebuilder.push({
    _type: 'sectionGalerie', _key: key('gal'),
    photos: hotelPhotos,
  })

  // 6. TEXTE + IMAGE — Les Jardins du Roi / flats
  console.log('  → Jardins du Roi...')
  const flatsImg = await uploadImage('images/D6.avif', 'Jardins du Roi — flats de Cayo Santa Maria')
  pagebuilder.push({
    _type: 'sectionTexteImage', _key: key('ti'),
    eyebrow: 'Organisation · Cayo Santa Maria',
    titre:   'Les Jardins du Roi, flats variés et préservés',
    texte: blocks(
      `Les secteurs de pêche sont variés et permettent de s'adapter aux conditions tout au long de l'année. Cayo Santa Maria offre des flats peu profonds, des chenaux plus profonds qui tiennent du tarpon toute l'année, et des lagunes intérieures.

Tarpons, bonefish, permits et snooks peuplent ce secteur exceptionnel. Il faut compter entre 15 et 30 minutes de bateau pour rejoindre les spots selon la zone attribuée, depuis la marina privée réservée aux clients de Fly Fish The Run.

Chaque matin, une navette privée vous accompagne à la marina où votre guide vous accueille personnellement pour vous guider toute la journée.`
    ),
    imagePosition: 'left',
    fond: 'white',
    ...(flatsImg ? { image: flatsImg } : {}),
  })

  // 7. PROGRAMME CARTES — Les espèces (3 cols, dark)
  console.log('  → Espèces...')
  pagebuilder.push({
    _type: 'sectionProgrammeCartes', _key: key('progc'),
    eyebrow:  'Tarpon · Bonefish · Permit · Snook',
    titre:    'Les espèces des Jardins du Roi',
    colonnes: '3',
    fond:     'dark',
    items: [
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Le Tarpon',
        sousTitre:   "Espèce star · jusqu'à 40 lbs",
        description: "L'espèce la plus recherchée à Cayo Santa Maria. Des chenaux profonds tiennent du tarpon toute l'année, avec un pic migratoire de fin avril à fin juin. Des combats phénoménaux sur des poissons de 15 à 40+ livres.",
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Le Bonefish',
        sousTitre:   'En wadding depuis les flats',
        description: "Cayo Santa Maria offre d'excellents flats pour la pêche du bonefish, depuis le bateau ou en wadding avec votre guide. Une espèce idéale pour varier les plaisirs entre deux sessions tarpon.",
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Permit & Snook',
        sousTitre:   'Espèces bonus',
        description: "Le permit est présent sur les flats et le snook dans les lagunes et mangroves. D'autres espèces bonus comme le barracuda complètent un tableau de pêche déjà très riche aux Jardins du Roi.",
      },
    ],
  })

  // 8. GALERIE (D13–D21 — poissons)
  console.log('  → Galerie poissons...')
  const fishPhotos = []
  for (let n = 13; n <= 21; n++) {
    const img = await uploadImage(`images/D${n}.avif`, `Pêche Cayo Santa Maria — capture`)
    if (img) fishPhotos.push({ ...img, _key: key('ph') })
  }
  pagebuilder.push({
    _type: 'sectionGalerie', _key: key('gal'),
    photos: fishPhotos,
  })

  // 9. BILAN (sectionBilan)
  console.log('  → Bilan...')
  pagebuilder.push({
    _type: 'sectionBilan', _key: key('bilan'),
    eyebrow:  '28 Fév – 5 Mars 2016 · Hosted Trip',
    titre:    'Une semaine intense malgré la météo',
    contexte: '28 fév — 5 mars 2016 · 4 pêcheurs · Conditions difficiles (front froid)',
    texte: blocks(
      `Un front froid présent presque toute la semaine, conditions difficiles, mais chacun est reparti avec de superbes combats de tarpon gravés dans la mémoire.

Des tarpons entre 15 et 40 livres, avec des spécimens jusqu'à 20 kg. Michaël a piqué 3 tarpons dans la même journée, une performance exceptionnelle dans ces conditions.

« En basse saison, Cayo Santa Maria est une destination idéale autant pour le pêcheur débutant que le confirmé, un excellent rapport qualité/prix avec de réelles possibilités de prendre de beaux tarpons. »`
    ),
    resultats: [
      { _type: 'resultat', _key: key('res'), label: 'Taille des tarpons (lbs)',             valeur: '15–40' },
      { _type: 'resultat', _key: key('res'), label: 'Tarpons piqués par Michaël en 1 jour', valeur: '3'    },
      { _type: 'resultat', _key: key('res'), label: 'Cannes recommandées',                  valeur: '9/10' },
    ],
    fond: 'white',
  })

  // 10. PROGRAMME CARTES — Inclus / non inclus (2 cols, dark)
  console.log('  → Inclus / non inclus...')
  pagebuilder.push({
    _type: 'sectionProgrammeCartes', _key: key('progc'),
    eyebrow:  'Dans le séjour',
    titre:    'Ce qui est inclus',
    colonnes: '2',
    fond:     'dark',
    items: [
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Inclus ✓',
        sousTitre:   '',
        description: "Transferts (sauf aéroport-hôtel) et vols internes à Cayo Las Brujas · 1 nuit à La Havane en hôtel 5 étoiles · 7 nuits à l'Hôtel Iberostar Ensenachos en pension complète, rhum et bière locales inclus · 6 jours de pêche, 1 guide pour 2 pêcheurs · Organisation, coordination et logistique par Jean-Baptiste Vidal · Conseils et guidage personnalisé de JBV en plus du guide local",
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Non inclus',
        sousTitre:   '',
        description: "Les vols internationaux · Le visa et les formalités d'entrée · Les pourboires aux guides cubains · Les boissons supplémentaires · L'assurance voyage et rapatriement",
      },
    ],
  })

  // 11. CTA FINAL
  console.log('  → CTA final...')
  pagebuilder.push({
    _type: 'sectionCta', _key: key('cta'),
    titre:     'Partir à Cayo Santa Maria',
    texte:     'Contactez-moi pour les disponibilités, les dates de départ et un devis personnalisé.',
    btn1Texte: 'Me contacter',
    btn1Lien:  '/contact',
    btn2Texte: '06 87 30 34 56',
    btn2Lien:  'tel:0687303456',
    style:     'dark',
  })

  return pagebuilder
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  try {
    const pagebuilder = await buildCayoSantaMaria()

    const doc = await client.fetch(
      `*[_type == 'voyage' && slug.current == 'peche-mouche-cuba-cayo-santa-maria'][0]{ _id }`
    )

    if (!doc?._id) {
      console.error('❌ Document voyage Cuba Cayo Santa Maria introuvable dans Sanity')
      process.exit(1)
    }

    console.log(`📝 Mise à jour du document ${doc._id}...`)

    await client.patch(doc._id).set({
      pays:        'Cuba',
      especes:     'Tarpon · Bonefish · Permit · Snook',
      periode:     'Janvier à juin',
      prix:        'Sur demande',
      seoTitle:    'Voyage de pêche à Cuba — Cayo Santa Maria, Tarpon & Jardins du Roi · Jean-Baptiste Vidal',
      seoDescription: "Cayo Santa Maria, les Jardins du Roi — une destination d'exception pour la pêche du tarpon à la mouche. Jean-Baptiste Vidal vous accompagne avec Fly Fish The Run.",
      pagebuilder,
    }).commit()

    console.log('✅ Cuba Cayo Santa Maria importé avec succès !')
    console.log(`   → ${pagebuilder.length} sections créées`)

  } catch (err) {
    console.error('❌ Erreur :', err.message)
    console.error(err.stack)
    process.exit(1)
  }
}

main()
