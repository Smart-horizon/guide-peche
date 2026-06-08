/**
 * Import voyage Cuba — Cayo Cruz
 * Contenu calqué exactement sur la page hardcodée peche-mouche-cuba-cayo-cruz.astro
 * Images : C1–C23.avif
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

async function buildCayoCruz() {
  console.log('🇨🇺 Import voyage Cuba — Cayo Cruz...')

  const pagebuilder = []

  // 1. HERO
  console.log('  → Hero...')
  const heroImg = await uploadImage('images/C18.avif', 'Cayo Cruz Cuba — flats')
  pagebuilder.push({
    _type: 'sectionHero', _key: key('hero'),
    eyebrow:          'Voyage · Cuba · Cayo Cruz',
    titre:            'Cayo Cruz',
    sousTitre:        'La meilleure destination permit de Cuba',
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
      { _type: 'stat', _key: key('st'), nombre: '150+',      label: 'Permits capturés par an' },
      { _type: 'stat', _key: key('st'), nombre: 'Grand Slam', label: 'Permit · Bonefish · Tarpon' },
      { _type: 'stat', _key: key('st'), nombre: 'Janv – Juin', label: 'Saison de pêche' },
      { _type: 'stat', _key: key('st'), nombre: '8 nuits',    label: '6 jours de pêche exclusive' },
    ],
  })

  // 3. INTRO + INFO CARD
  console.log('  → Intro...')
  pagebuilder.push({
    _type: 'sectionIntro', _key: key('intro'),
    fond: 'white',
    texte: blocks(
      `Cuba est l'une des meilleures destinations de pêche en mer exotique du monde, grâce à la qualité de ses flats, de ses mangroves et à la migration des tarpons entre fin mars et fin juin. L'état exceptionnel de préservation des zones de pêche et une pêche commerciale peu développée offrent d'excellentes possibilités pour tenter les trois espèces emblématiques : le bonefish, le permit et le tarpon.

Cayo Cruz se situe sur la côte Nord de Cuba et est la destination incontournable pour la recherche du permit : plus de 150 capturés par an sur ce seul secteur. Les flats y sont répartis en 6 zones de pêche offrant des dizaines de kilomètres de flats réservés exclusivement à votre groupe, sans croiser d'autres pêcheurs.

J'ai accompagné un groupe pour la première fois en mars 2015, ramenant les 3 seuls permits du lodge cette semaine-là (sur 12 pêcheurs présents), dont un trophée estimé à plus de 35 livres.`
    ),
    showInfoCard: true,
    lignesSupp: [
      { _type: 'ligneInfo', _key: key('li'), label: 'Espèces cibles', valeur: 'Permit · Bonefish · Tarpon' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Saison',         valeur: 'Janvier à juin (tarpons : fin mars–juin)' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Format',         valeur: '8 nuits / 6 jours de pêche' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Lodge',          valeur: 'La Casona de Romano' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Encadrement',    valeur: '1 guide pour 2 pêcheurs (single possible)' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Partenaire',     valeur: 'Avalon Fishing Center' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Tarifs',         valeur: 'Sur demande' },
    ],
    boutons: [
      { _type: 'bouton', _key: key('btn'), texte: 'Demander un devis', lien: '/contact' },
    ],
  })

  // 4. TEXTE + IMAGE — Le lodge
  console.log('  → Section lodge...')
  const lodgeImg = await uploadImage('images/C2.avif', 'La Casona de Romano — Cayo Cruz')
  pagebuilder.push({
    _type: 'sectionTexteImage', _key: key('ti'),
    eyebrow: 'Avalon Fishing Center',
    titre:   'La Casona de Romano',
    texte: blocks(
      `Un lodge très typique installé dans un petit village cubain authentique. Jusqu'à 12 pêcheurs, tout le confort que l'on peut espérer : grandes chambres, bar, salon, salle à manger et jardin privatif.

Pension complète avec rhum et bière cubaine inclus. Un cadre authentique qui vous immerge totalement dans la culture cubaine.`
    ),
    imagePosition: 'right',
    fond: 'sand',
    ...(lodgeImg ? { image: lodgeImg } : {}),
  })

  // 5. GALERIE (C2–C6 pour le lodge)
  console.log('  → Galerie lodge...')
  const galeriePhotos = []
  for (let n = 2; n <= 6; n++) {
    const img = await uploadImage(`images/C${n}.avif`, `La Casona de Romano — Cayo Cruz ${n}`)
    if (img) galeriePhotos.push({ ...img, _key: key('ph') })
  }
  pagebuilder.push({
    _type: 'sectionGalerie', _key: key('gal'),
    photos: galeriePhotos,
  })

  // 6. TEXTE + IMAGE — Flats privés
  console.log('  → Flats section...')
  const flatsImg = await uploadImage('images/C7.avif', 'Flats de Cayo Cruz — pêche à vue')
  pagebuilder.push({
    _type: 'sectionTexteImage', _key: key('ti'),
    eyebrow: 'Organisation · Cayo Cruz',
    titre:   'Des flats privés rien que pour vous',
    texte: blocks(
      `Les secteurs de pêche sont répartis en 6 zones de pêche qui offrent une multitude de possibilités, dans les lagunes ou en pleine mer. Chaque jour, des dizaines de kilomètres de flats vous sont réservés exclusivement.

Vous pêcherez soit en bateau (permit et tarpon) soit du bord en wadding pour la recherche du bonefish. Cayo Cruz permet notamment d'avoir quotidiennement de nombreux shots sur le permit, présent en très bonne densité et de toutes tailles.

Il faut compter entre 15 et 45 minutes de bateau pour rejoindre les spots selon la zone attribuée. Les flats sont intacts, préservés, sans pression de pêche commerciale, une qualité rare dans les Caraïbes.`
    ),
    imagePosition: 'left',
    fond: 'white',
    ...(flatsImg ? { image: flatsImg } : {}),
  })

  // 7. PROGRAMME CARTES — Les espèces (3 cols, dark)
  console.log('  → Espèces...')
  pagebuilder.push({
    _type: 'sectionProgrammeCartes', _key: key('progc'),
    eyebrow:  'Permit · Bonefish · Tarpon',
    titre:    'Le Grand Slam de Cuba',
    colonnes: '3',
    fond:     'dark',
    items: [
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Le Permit',
        sousTitre:   'Espèce star · +150 capturés/an',
        description: "L'espèce la plus recherchée à Cayo Cruz, tout simplement la meilleure destination permit de l'île. Des spécimens de toutes tailles, jusqu'au trophée de plus de 35 lbs. Vous aurez chaque jour de nombreux shots.",
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Le Bonefish',
        sousTitre:   'Poids moyen 4-6 lbs',
        description: "Cayo Cruz dispose d'une taille moyenne très intéressante avec de nombreux poissons dans les 4 à 6 livres. Idéal en wadding depuis les flats peu profonds, aussi bien pour les débutants que les confirmés.",
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Le Tarpon',
        sousTitre:   'Migration · Fin mars – fin juin',
        description: "Lorsque permit et bonefish sont validés, votre guide vous emmène tenter le tarpon pour concrétiser le Grand Slam, la consécration pour tout moucheur en mer. Cayo Cruz est l'un des rares endroits où le Grand Slam reste accessible.",
      },
    ],
  })

  // 8. GALERIE (C14–C23 — poissons)
  console.log('  → Galerie poissons...')
  const fishPhotos = []
  for (let n = 14; n <= 23; n++) {
    const img = await uploadImage(`images/C${n}.avif`, `Pêche Cayo Cruz — capture`)
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
    eyebrow:  'Mars 2015 · Hosted Trip',
    titre:    'Une semaine très enrichissante',
    contexte: 'Mars 2015 · 12 pêcheurs · Conditions globalement ensoleillées',
    texte: blocks(
      `Lors de notre semaine à Cayo Cruz en mars 2015, nous avons connu de bonnes conditions globalement ensoleillées avec quelques passages nuageux, idéales pour la pêche à vue.

3 permits capturés — les 3 seuls du lodge cette semaine-là, sur 12 pêcheurs présents. Le permit trophée de Jean-Baptiste, estimé à plus de 35 livres, capturé le dernier jour après de nombreuses péripéties. Les bonefish ont tourné entre 4 et 6 livres en moyenne, une taille bien au-dessus de la moyenne caraïbe.

« Cayo Cruz en basse saison est une destination idéale tant pour le pêcheur débutant que le confirmé, un excellent rapport qualité/prix avec de réelles possibilités de prendre les 3 espèces et concrétiser un Grand Slam. »`
    ),
    resultats: [
      { _type: 'resultat', _key: key('res'), label: 'Permits capturés', valeur: '3' },
      { _type: 'resultat', _key: key('res'), label: 'Trophée (livres)',  valeur: '35+' },
      { _type: 'resultat', _key: key('res'), label: 'Bonefish (livres)', valeur: '4-6' },
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
        description: "Transferts (sauf aéroport-hôtel) et vols internes à Cayo Coco · 1 nuit à La Havane en hôtel 5 étoiles · 7 nuits à La Casona de Romano en pension complète, rhum et bière locales inclus · 6 jours de pêche, 1 guide pour 2 pêcheurs · Organisation, coordination et logistique par Jean-Baptiste Vidal · Conseils et guidage personnalisé de JBV en plus du guide local",
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
    titre:     'Partir à Cuba',
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
    const pagebuilder = await buildCayoCruz()

    const doc = await client.fetch(
      `*[_type == 'voyage' && slug.current == 'peche-mouche-cuba-cayo-cruz'][0]{ _id }`
    )

    if (!doc?._id) {
      console.error('❌ Document voyage Cuba Cayo Cruz introuvable dans Sanity')
      process.exit(1)
    }

    console.log(`📝 Mise à jour du document ${doc._id}...`)

    await client.patch(doc._id).set({
      pays:        'Cuba',
      especes:     'Permit · Bonefish · Tarpon',
      periode:     'Janvier à juin',
      prix:        'Sur demande',
      seoTitle:    'Voyage de pêche à Cuba — Cayo Cruz, Permit & Grand Slam · Jean-Baptiste Vidal',
      seoDescription: "Cayo Cruz est la meilleure destination permit de Cuba. Jean-Baptiste Vidal vous accompagne sur les flats de la Casona de Romano — permit, bonefish, tarpon et Grand Slam avec Avalon Fishing Center.",
      pagebuilder,
    }).commit()

    console.log('✅ Cuba Cayo Cruz importé avec succès !')
    console.log(`   → ${pagebuilder.length} sections créées`)

  } catch (err) {
    console.error('❌ Erreur :', err.message)
    console.error(err.stack)
    process.exit(1)
  }
}

main()
