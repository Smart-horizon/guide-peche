/**
 * Import voyage Mexique — Xcalak, Quintana Roo
 * Contenu calqué exactement sur la page hardcodée voyage-peche-mouche-mexique.astro
 * Images : F1–F28.avif
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

async function buildMexique() {
  console.log('🇲🇽 Import voyage Mexique — Xcalak...')

  const pagebuilder = []

  // 1. HERO
  console.log('  → Hero...')
  const heroImg = await uploadImage('images/F1.avif', 'Xcalak Mexique — flats permit')
  pagebuilder.push({
    _type: 'sectionHero', _key: key('hero'),
    eyebrow:          'Voyage · Mexique · Quintana Roo',
    titre:            'Mexique',
    sousTitre:        'Xcalak, la fièvre du permit',
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
      { _type: 'stat', _key: key('st'), nombre: 'Permit', label: 'Espèce star des Caraïbes' },
      { _type: 'stat', _key: key('st'), nombre: '4+',     label: 'Espèces au programme' },
      { _type: 'stat', _key: key('st'), nombre: '9 nuits', label: '8 jours de pêche' },
      { _type: 'stat', _key: key('st'), nombre: 'DIY+',   label: 'Wading & bateau possible' },
    ],
  })

  // 3. INTRO + INFO CARD
  console.log('  → Intro...')
  pagebuilder.push({
    _type: 'sectionIntro', _key: key('intro'),
    fond: 'white',
    texte: blocks(
      `Le Mexique est l'une des meilleures destinations mondiales pour la pêche du permit à la mouche. Si la Baie d'Ascencion est connue sur la planète entière, j'ai choisi une zone bien plus au sud, juste au-dessus du Belize, un secteur hors du commun, beaucoup moins fréquenté, qui offre pourtant toutes les espèces emblématiques des flats.

Le permit, la palometa, le bonefish, le tarpon, le snook, la baliste : tout est là. Les flats sont facilement accessibles à pied depuis la côte, les guides locaux connaissent les meilleures zones en bateau, et la possibilité de réaliser un Grand Slam (permit, bonefish, tarpon dans la même journée) est bien réelle.

Un séjour organisé en partenariat avec DHD LAIKA, au rapport qualité/prix remarquable par rapport aux autres destinations des Caraïbes.`
    ),
    showInfoCard: true,
    lignesSupp: [
      { _type: 'ligneInfo', _key: key('li'), label: 'Espèces cibles',   valeur: 'Permit ★ · Bonefish · Tarpon · Baliste · Snook · Carangues' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Saison optimale',  valeur: 'Nov – Mars (basse saison) · Avr – Juin (migration tarpons)' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Format',           valeur: '9 nuits / 8 jours de pêche' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Hébergement',      valeur: 'Location en bord de mer · Xcalak · Pension complète' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Encadrement',      valeur: 'JBV + guide local en bateau (pangas)' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Partenaire',       valeur: 'DHD LAIKA' },
      { _type: 'ligneInfo', _key: key('li'), label: 'Tarifs',           valeur: 'Sur demande' },
    ],
    boutons: [
      { _type: 'bouton', _key: key('btn'), texte: 'Demander un devis', lien: '/contact' },
    ],
  })

  // 4. TEXTE + IMAGE — Hébergement
  console.log('  → Hébergement...')
  const hebergImg = await uploadImage('images/F2.avif', 'Hébergement Xcalak Mexique — vue sur la mer')
  pagebuilder.push({
    _type: 'sectionTexteImage', _key: key('ti'),
    eyebrow: 'Xcalak · Village de pêcheurs',
    titre:   "L'hébergement : simple, authentique et bien situé",
    texte: blocks(
      `Nous avons trouvé une location en bord de mer, simple mais agréable, dans le village de Xcalak, à quelques minutes à pied des premiers flats et de la mise à l'eau des bateaux.

2 chambres · 3 lits · vue mer · terrasse · climatisé. Pension complète (sauf boissons) — Gabriela, notre hôte, cuisine pour vous le matin et le soir.

À 2 min des flats accessibles à pied · À 5 min de la mise à l'eau des pangas.`
    ),
    imagePosition: 'right',
    fond: 'sand',
    ...(hebergImg ? { image: hebergImg } : {}),
  })

  // 5. GALERIE hébergement (F2–F6)
  console.log('  → Galerie hébergement...')
  const hebergPhotos = []
  for (let n = 2; n <= 6; n++) {
    const img = await uploadImage(`images/F${n}.avif`, `Hébergement Xcalak — photo ${n}`)
    if (img) hebergPhotos.push({ ...img, _key: key('ph') })
  }
  pagebuilder.push({
    _type: 'sectionGalerie', _key: key('gal'),
    photos: hebergPhotos,
  })

  // 6. TEXTE + IMAGE — Spots / flats
  console.log('  → Spots...')
  const spotsImg = await uploadImage('images/F7.avif', 'Flats Xcalak Mexique — pêche du permit')
  pagebuilder.push({
    _type: 'sectionTexteImage', _key: key('ti'),
    eyebrow: 'Les zones de pêche',
    titre:   'Des spots variés, accessibles et poissonneux',
    texte: blocks(
      `Les secteurs de pêche sont d'une grande variété : plages de sable, flats sablo-limoneux, pointes rocheuses. Certains coins sont accessibles à pied depuis notre hébergement grâce à un chemin longeant la côte. D'autres ne sont accessibles qu'en bateau, notamment dans la baie de Chetumal, un territoire de pêche hors du commun.

Vous pêcherez du bateau sur certains endroits, mais descendrez aussi dans l'eau pour attaquer permits et bonefish en tailing et cruising dans très peu d'eau.

Les occasions sont nombreuses : les espèces viennent se nourrir de crabes et crevettes dans ces eaux riches des Caraïbes. Sur chaque pointe rocheuse, les balistes sont actives. Les carangues se trouvent partout.`
    ),
    imagePosition: 'left',
    fond: 'white',
    ...(spotsImg ? { image: spotsImg } : {}),
  })

  // 7. PROGRAMME CARTES — Les espèces (3 cols, dark)
  console.log('  → Espèces...')
  pagebuilder.push({
    _type: 'sectionProgrammeCartes', _key: key('progc'),
    eyebrow:  'Permit · Bonefish · Tarpon · Baliste · Carangues',
    titre:    'Une destination riche et diversifiée',
    colonnes: '3',
    fond:     'dark',
    items: [
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Le Permit',
        sousTitre:   'Espèce star · Nombreux et gros gabarits',
        description: "Certainement l'une des meilleures destinations au monde pour la pêche du permit. Ils sont présents en nombre avec de gros spécimens. Les flats permettent une approche à vue extrêmement technique et gratifiante.",
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Grand Slam',
        sousTitre:   'Permit · Bonefish · Tarpon',
        description: "La possibilité de réaliser un grand slam (permit, bonefish et tarpon dans la même journée) est bien réelle à Xcalak. De nombreux pêcheurs y vont dans ce but, et certains y parviennent.",
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Les Bonus',
        sousTitre:   'Baliste · Snook · Carangues · +',
        description: "Les balistes (trigger fish) sont très actives sur chaque pointe rocheuse. Les carangues se trouvent sur à peu près tous les spots. Snooks, barracudas et maquereaux complètent le tableau.",
      },
    ],
  })

  // 8. GALERIE poissons (F14–F28)
  console.log('  → Galerie poissons...')
  const fishPhotos = []
  for (let n = 14; n <= 28; n++) {
    const img = await uploadImage(`images/F${n}.avif`, `Pêche Mexique Xcalak — photo ${n}`)
    if (img) fishPhotos.push({ ...img, _key: key('ph') })
  }
  pagebuilder.push({
    _type: 'sectionGalerie', _key: key('gal'),
    photos: fishPhotos,
  })

  // 9. PROGRAMME (étapes du séjour)
  console.log('  → Programme...')
  pagebuilder.push({
    _type: 'sectionProgramme', _key: key('prog'),
    eyebrow: 'Programme',
    titre:   '9 nuits sur place, 8 jours de pêche',
    fond:    'sand',
    etapes: [
      {
        _type: 'etape', _key: key('etape'),
        titre: 'J1 — Départ de Paris',
        tag:   'J1',
        texte: blocks("Vol vers Cancun ou Chetumal. Transfert en voiture jusqu'à Xcalak (2 heures depuis Chetumal). Arrivée et installation dans notre hébergement en bord de mer."),
      },
      {
        _type: 'etape', _key: key('etape'),
        titre: 'J2 — Première journée',
        tag:   'J2',
        texte: blocks("Découverte des spots à pied avec JBV. Révision du matériel, perfectionnement du lancer et premiers poissons sur les flats accessibles à quelques minutes."),
      },
      {
        _type: 'etape', _key: key('etape'),
        titre: 'J3–8 — 6 jours de pêche guidée',
        tag:   'J3–8',
        texte: blocks("Alternance guide local en panga et wading accompagné par JBV. Chaque jour sur une zone différente : flats sableux, pointes rocheuses, baie de Chetumal. Recherche du Grand Slam."),
      },
      {
        _type: 'etape', _key: key('etape'),
        titre: 'J9 — Dernière demi-journée',
        tag:   'J9',
        texte: blocks("Pêche possible le matin selon les conditions. Transfert à l'aéroport en début d'après-midi."),
      },
      {
        _type: 'etape', _key: key('etape'),
        titre: 'J10 — Retour en France',
        tag:   'J10',
        texte: blocks("Arrivée le lendemain matin selon les correspondances."),
      },
    ],
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
        description: "Location d'une voiture pour le groupe · Transport aéroport Chetumal → Xcalak (2h de route) · 9 nuits dans notre hébergement en bord de mer · 8 jours de pêche, 1 guide pour 2 pêcheurs (alternance guide local / JBV) · Petit-déjeuner et dîner sur place (Gabriela) · Organisation, coordination et logistique par Jean-Baptiste Vidal · Guidage et conseils par JBV sur place (en plus du guide local)",
      },
      {
        _type: 'carte', _key: key('carte'),
        titre:       'Non inclus',
        sousTitre:   '',
        description: "Les vols internationaux (Paris–Cancun ou Paris–Chetumal) · Le visa et les formalités d'entrée · Les repas du midi (pris au bord de l'eau avec les guides) · Les pourboires aux guides · Les boissons (alcool, etc.) · L'assurance voyage et rapatriement",
      },
    ],
  })

  // 11. CTA FINAL
  console.log('  → CTA final...')
  pagebuilder.push({
    _type: 'sectionCta', _key: key('cta'),
    titre:     'Partir au Mexique',
    texte:     'Contactez-moi pour les prochaines dates de départ et un devis personnalisé.',
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
    const pagebuilder = await buildMexique()

    const doc = await client.fetch(
      `*[_type == 'voyage' && slug.current == 'voyage-peche-mouche-mexique'][0]{ _id }`
    )

    if (!doc?._id) {
      console.error('❌ Document voyage Mexique introuvable dans Sanity')
      process.exit(1)
    }

    console.log(`📝 Mise à jour du document ${doc._id}...`)

    await client.patch(doc._id).set({
      pays:        'Mexique',
      especes:     'Permit · Bonefish · Tarpon · Baliste · Carangues',
      periode:     'Novembre à juin',
      prix:        'Sur demande',
      seoTitle:    'Voyage de pêche au Mexique — Permit, Bonefish, Tarpon · Xcalak, Quintana Roo · Jean-Baptiste Vidal',
      seoDescription: "Xcalak, Quintana Roo — l'une des meilleures destinations mondiales pour la pêche du permit à la mouche. Jean-Baptiste Vidal vous accompagne dans ce bout du monde mexicain, loin des sentiers battus.",
      pagebuilder,
    }).commit()

    console.log('✅ Mexique importé avec succès !')
    console.log(`   → ${pagebuilder.length} sections créées`)

  } catch (err) {
    console.error('❌ Erreur :', err.message)
    console.error(err.stack)
    process.exit(1)
  }
}

main()
