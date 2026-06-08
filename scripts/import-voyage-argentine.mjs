/**
 * Import voyage Argentine — Rio Grande, Tierra del Fuego
 * Contenu calqué exactement sur la page hardcodée voyage-peche-argentine-rio-grande-truite-de-mer.astro
 * Images : A1–A18.avif + lodge-rg-*.png + B2.avif, B3.avif
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

// ── Helpers ──────────────────────────────────────────────────────────────────

let keyCounter = 0
const key = (prefix = 'k') => `${prefix}${Date.now()}${++keyCounter}`

function blocks(text) {
  return text.split('\n\n').filter(Boolean).map(para => ({
    _type: 'block', _key: key('bl'),
    style: 'normal',
    children: [{ _type: 'span', _key: key('sp'), text: para.trim(), marks: [] }],
    markDefs: [],
  }))
}

async function uploadImage(localPath, alt = '') {
  const fullPath = path.join(process.cwd(), 'public', localPath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠ Image introuvable : ${fullPath}`)
    return null
  }
  const data = fs.readFileSync(fullPath)
  const ext  = path.extname(localPath).slice(1).replace('avif', 'avif')
  const mimeMap = { avif: 'image/avif', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' }
  const mime = mimeMap[ext] || `image/${ext}`
  const asset = await client.assets.upload('image', data, { filename: path.basename(localPath), contentType: mime })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt }
}

// ── Construction du pagebuilder ──────────────────────────────────────────────

async function buildArgentine() {
  console.log('🇦🇷 Import voyage Argentine — Rio Grande...')

  const pagebuilder = []

  // 1. HERO
  console.log('  → Hero...')
  const heroImg = await uploadImage('images/B5.avif', 'Rio Grande Argentine — Terre de Feu')
  pagebuilder.push({
    _type: 'sectionHero', _key: key('hero'),
    eyebrow:          'Voyage · Terre de Feu · Argentine',
    titre:            'Rio Grande',
    sousTitre:        'La meilleure rivière du monde',
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
      { _type: 'stat', _key: key('st'), nombre: '+20 lbs',    label: 'Poids moyen des trophées' },
      { _type: 'stat', _key: key('st'), nombre: '5',          label: 'Records du monde enregistrés' },
      { _type: 'stat', _key: key('st'), nombre: '6',          label: 'Saisons de guidage de JBV' },
      { _type: 'stat', _key: key('st'), nombre: 'Janv – Mars', label: 'Saison de pêche' },
    ],
  })

  // 3. INTRO + INFO CARD
  console.log('  → Intro...')
  pagebuilder.push({
    _type: 'sectionIntro', _key: key('intro'),
    fond: 'white',
    texte: blocks(
      `Le Rio Grande en Argentine est reconnu de longue date comme la meilleure rivière du monde pour la pêche de la truite de mer migratrice (sea run brown trout). Les 5 derniers records du monde ont été enregistrés sur les parcours que je vous propose de découvrir.

Nervous Waters, compagnie argentine avec laquelle je travaille depuis 2006, est propriétaire des lodges les plus connus et renommés de la rivière. Après 6 saisons comme guide et manager sur les deux meilleurs lodges du Rio Grande, je vous propose de vous accompagner sur cette destination hors du commun.

Le run de truites de mer est estimé entre 50 000 et 80 000 individus sur cette rivière, un chiffre tout simplement colossal. Les poissons font un poids moyen de 4 à 5 kg, mais des monstres de plus de 15 kg se font capturer chaque année.`
    ),
    showInfoCard: true,
    lignesSupp: [
      { _type: 'ligneInfo', _key: key('li'), label: 'Espèce cible', valeur: 'Truite de mer (sea run brown)' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Saison',       valeur: 'Janvier à fin mars' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Format',       valeur: '7 nuits / 6 jours de pêche' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Lodges',       valeur: 'Villa Maria · Kau Tapen' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Encadrement',  valeur: '1 guide pour 2 pêcheurs + JBV' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Tarifs',       valeur: 'Sur demande, variable selon la saison' },
    ],
    boutons: [
      { _type: 'bouton', _key: key('btn'), texte: 'Demander un devis', lien: '/contact' },
    ],
  })

  // 4. GALERIE (B1–B6)
  console.log('  → Galerie principale...')
  const galeriePhotos = []
  for (let n = 1; n <= 6; n++) {
    const img = await uploadImage(`images/B${n}.avif`, `Rio Grande Argentine — photo ${n}`)
    if (img) galeriePhotos.push({ ...img, _key: key('ph') })
  }
  pagebuilder.push({
    _type: 'sectionGalerie', _key: key('gal'),
    photos: galeriePhotos,
  })

  // 5. SECTION CHOIX — Deux lodges d'exception
  console.log('  → Choix lodges...')
  const lodgeExtImg   = await uploadImage('images/lodge-rg-ext.png',   'Villa Maria Lodge — extérieur, Rio Grande')
  const lodgeLoungeImg = await uploadImage('images/lodge-rg-lounge.png', 'Kau Tapen Lodge — lounge au coucher de soleil')
  const lodgeDiningImg  = await uploadImage('images/lodge-rg-dining.png',  'Salle à manger lodge Rio Grande')
  const lodgeSalonImg   = await uploadImage('images/lodge-rg-salon.png',   'Salon du lodge Rio Grande')
  const lodgeChambreImg = await uploadImage('images/lodge-rg-chambre.png', 'Chambre lodge Rio Grande')

  const options = []
  if (lodgeExtImg) options.push({
    _type: 'option', _key: key('opt'),
    numero: '01',
    titre: 'Villa Maria Lodge',
    tag: 'Parcours aval · Proche de Rio Grande',
    description: `Situé sur les parcours aval du Rio Grande, à proximité de la ville. Les pools y sont plus larges et dégagés, idéaux pour le Spey casting et la recherche des grosses truites fraîches directement sorties de mer.\n\nLe cadre typique de la Terre de Feu, steppe patagonne infinie, ciel immense et vent, offre une expérience visuelle et sensorielle unique que les pêcheurs n'oublient jamais.`,
    image: lodgeExtImg,
  })
  if (lodgeLoungeImg) options.push({
    _type: 'option', _key: key('opt'),
    numero: '02',
    titre: 'Kau Tapen Lodge',
    tag: 'Partie moyenne · Pools intimes et nombreux',
    description: `Situé sur la partie moyenne de la rivière, Kau Tapen est réputé pour ses pools plus intimistes et nombreux. Les truites y sont souvent plus colorées et combatives, ayant séjourné plus longtemps dans la rivière.\n\nSéjour organisé en direct avec l'agence Nervous Waters, l'une des expériences lodge les plus abouties de Patagonie.`,
    image: lodgeLoungeImg,
  })

  const galerieChoix = []
  if (lodgeDiningImg)  galerieChoix.push({ ...lodgeDiningImg,  _key: key('gc') })
  if (lodgeSalonImg)   galerieChoix.push({ ...lodgeSalonImg,   _key: key('gc') })
  if (lodgeChambreImg) galerieChoix.push({ ...lodgeChambreImg, _key: key('gc') })

  pagebuilder.push({
    _type: 'sectionChoix', _key: key('choix'),
    eyebrow: 'Nervous Waters',
    titre:   "Deux lodges d'exception",
    intro:   "Ces deux lodges somptueux et très typiques de cette partie de l'Argentine vous combleront par la qualité du service à l'argentine, leur gastronomie, leur confort et leur personnel hautement qualifié parlant anglais.",
    fond:    'sand',
    options,
    galerie: galerieChoix,
  })

  // 6. TEXTE + IMAGE — Parcours privés
  console.log('  → Texte + image parcours...')
  const beatsImg1 = await uploadImage('images/B2.avif', 'Beat du Rio Grande — pêcheur en Terre de Feu')
  pagebuilder.push({
    _type: 'sectionTexteImage', _key: key('ti'),
    eyebrow: 'Organisation · Rio Grande',
    titre:   'Des parcours privés rien que pour vous',
    texte: blocks(
      `Les secteurs de pêche sont répartis en parcours ou « beats » qui offrent une multitude de possibilités. Chaque session, matin et après-midi, vous pêchez un parcours constitué de 3 à 6 pools, réservé exclusivement à 2 pêcheurs et votre guide.

Vous ne croiserez aucun autre pêcheur. La rotation mise en place tout au long de la semaine vous permet de pêcher chaque parcours et chaque pool de la rivière.

Comptez entre 10 et 30 minutes de transport en 4×4 à travers la steppe patagonne pour rejoindre les spots de pêche selon le parcours attribué. À 13h00, retour au lodge pour profiter de la gastronomie argentine, asado d'agneau, vins argentins, avant de repartir pêcher jusqu'à la nuit, la fameuse « magic hour ».

L'équipe est constituée de guides argentins et internationaux très professionnels, compétents et motivés. Ils parlent tous un bon anglais.`
    ),
    imagePosition: 'right',
    fond: 'white',
    ...(beatsImg1 ? { image: beatsImg1 } : {}),
  })

  // 7. PROGRAMME CARTES — Comment on pêche le Rio Grande (4 cols, sans image)
  console.log('  → Technique de pêche...')
  pagebuilder.push({
    _type: 'sectionProgrammeCartes', _key: key('progc'),
    eyebrow:  'Technique · Matériel',
    titre:    'Comment on pêche le Rio Grande',
    colonnes: '4',
    fond:     'dark',
    items: [
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Les cannes',
        sousTitre:   '',
        description: 'Canne à une main, switch ou deux mains selon les pools, la largeur de la rivière et la force du vent, qui peut souffler jusqu\'à plus de 100 km/h en Terre de Feu.',
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Les soies',
        sousTitre:   '',
        description: 'Pêche en soie flottante avec l\'utilisation de polyleaders pour atteindre la bonne couche d\'eau selon les conditions et la profondeur des pools.',
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Les mouches',
        sousTitre:   '',
        description: 'Le matin, on pêche surtout avec de grosses nymphes. Le soir et par eaux froides, les leeches et tubes prennent le relais, parfois avec des attaques spectaculaires en surface lors de la « magic hour ».',
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Le vent',
        sousTitre:   '',
        description: 'Le vent patagon est omniprésent et peut être violent. Jean-Baptiste vous conseille et adapte la technique selon les conditions du jour, c\'est une des clés du succès sur ce type de rivière exposée.',
      },
    ],
  })

  // 8. PROGRAMME CARTES — Truites de mer + calendrier des saisons (photo-gauche, 1 col)
  console.log('  → Truites + saisons...')
  const fishImg = await uploadImage('images/A10.avif', 'Truite de mer Rio Grande Argentine')
  pagebuilder.push({
    _type: 'sectionProgrammeCartes', _key: key('progc'),
    eyebrow:  'Truite de mer · Sea run brown',
    titre:    'Des truites comme nulle part ailleurs',
    colonnes: '1',
    fond:     'white',
    intro: "Le Rio Grande et son affluent principal le Ménendez sont peuplés exclusivement de truites fario résidentes et de truites de mer migratrices. Ces dernières font un poids moyen de 4 à 5 kg, les monstres de plus de 15 kg se font capturer chaque année.\n\nDe janvier à début mars, les truites sont blanches et fraîches, remontant directement de mer. Plus la saison avance, plus le stock se constitue et les poissons se colorent, ressemblant progressivement à de grosses truites fario.\n\nLors d'une semaine sur le Rio Grande, vous pouvez capturer entre 10 et 30 truites de mer. Il se prend chaque année plusieurs milliers de truites de mer sur les seuls parcours de Nervous Waters.",
    ...(fishImg ? { image: fishImg } : {}),
    items: [
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Janvier',
        sousTitre:   '',
        description: 'Truites fraîches de mer · Poissons argentés · Run en cours',
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Février',
        sousTitre:   '',
        description: 'Stock maximum · Monstres au fond · Conditions optimales',
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Mars',
        sousTitre:   '',
        description: 'Poissons colorés · Trophées fario · Magic hour intense',
      },
    ],
  })

  // 9. INCLUS / NON INCLUS — sectionProgrammeTexte avec check/cross
  console.log('  → Inclus / non inclus...')
  pagebuilder.push({
    _type: 'sectionProgrammeTexte', _key: key('progt'),
    fond: 'dark',
    colonnes: [
      {
        _type: 'colonne', _key: key('col'),
        label: 'Dans le séjour',
        style: 'check',
        items: [
          { _type: 'item', _key: key('it'), texte: "Transfert de l'aéroport de Rio Grande au lodge", inclus: true },
          { _type: 'item', _key: key('it'), texte: "7 nuits en pension complète, boissons incluses", inclus: true },
          { _type: 'item', _key: key('it'), texte: "6 jours de pêche, 1 guide pour 2 pêcheurs", inclus: true },
          { _type: 'item', _key: key('it'), texte: "Organisation, coordination et logistique par Jean-Baptiste Vidal", inclus: true },
          { _type: 'item', _key: key('it'), texte: "Conseils et guidage personnalisé de JBV en plus du guide local", inclus: true },
        ],
      },
      {
        _type: 'colonne', _key: key('col'),
        label: 'Hors séjour',
        style: 'check',
        items: [
          { _type: 'item', _key: key('it'), texte: "Les vols internationaux", inclus: false },
          { _type: 'item', _key: key('it'), texte: "Le visa et les formalités d'entrée", inclus: false },
          { _type: 'item', _key: key('it'), texte: "Les pourboires aux guides locaux", inclus: false },
          { _type: 'item', _key: key('it'), texte: "Les boissons supplémentaires", inclus: false },
          { _type: 'item', _key: key('it'), texte: "L'assurance voyage et rapatriement", inclus: false },
        ],
      },
    ],
  })

  // 10. RÉSERVATION & TARIFS — sectionTexte avec icône horloge
  console.log('  → Réservation & tarifs...')
  pagebuilder.push({
    _type: 'sectionTexte', _key: key('txt'),
    fond: 'sand',
    texte: [
      {
        _type: 'block', _key: key('bl'), style: 'h3',
        children: [{ _type: 'span', _key: key('sp'), text: 'Réservation & tarifs', marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block', _key: key('bl'), style: 'normal',
        children: [
          { _type: 'span', _key: key('sp'), text: 'Les tarifs sont variables selon la saison, le nombre de personnes et les disponibilités des lodges. ', marks: [] },
          { _type: 'span', _key: key('sp'), text: "Prévoir au minimum 6 mois à l'avance", marks: ['strong'] },
          { _type: 'span', _key: key('sp'), text: ' pour rejoindre un groupe organisé par mes soins.', marks: [] },
        ],
        markDefs: [],
      },
      {
        _type: 'block', _key: key('bl'), style: 'normal',
        children: [{ _type: 'span', _key: key('sp'), text: "Pour un séjour seul ou sans accompagnement de ma part, des places de dernière minute sont parfois disponibles entre 1 et 6 mois avant le départ.", marks: [] }],
        markDefs: [],
      },
      {
        _type: 'block', _key: key('bl'), style: 'normal',
        children: [{ _type: 'span', _key: key('sp'), text: "J'organise chaque année un ou plusieurs voyages sur le Rio Grande. Contactez-moi pour connaître les prochains départs.", marks: [] }],
        markDefs: [],
      },
    ],
  })

  // 11. CTA FINAL
  console.log('  → CTA final...')
  pagebuilder.push({
    _type: 'sectionCta', _key: key('cta'),
    titre:     'Partir en Argentine',
    texte:     'Contactez-moi pour les disponibilités, les dates et un devis personnalisé.',
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
    const pagebuilder = await buildArgentine()

    const doc = await client.fetch(
      `*[_type == 'voyage' && slug.current == 'voyage-peche-argentine-rio-grande-truite-de-mer'][0]{ _id }`
    )

    if (!doc?._id) {
      console.error('❌ Document voyage Argentine introuvable dans Sanity')
      process.exit(1)
    }

    console.log(`📝 Mise à jour du document ${doc._id}...`)

    await client.patch(doc._id).set({
      pays:        'Argentine',
      especes:     'Truite de mer (sea run brown)',
      periode:     'Janvier à fin mars',
      prix:        'Sur demande',
      seoTitle:    "Voyage de pêche en Argentine — Rio Grande, Terre de Feu · Jean-Baptiste Vidal",
      seoDescription: "Pêche de la truite de mer géante sur le Rio Grande en Argentine. Jean-Baptiste Vidal vous accompagne sur les lodges Villa Maria et Kau Tapen de Nervous Waters. 6 saisons de guidage, truites de mer jusqu'à 15 kg.",
      pagebuilder,
    }).commit()

    console.log('✅ Argentine importée avec succès !')
    console.log(`   → ${pagebuilder.length} sections créées`)

  } catch (err) {
    console.error('❌ Erreur :', err.message)
    console.error(err.stack)
    process.exit(1)
  }
}

main()
