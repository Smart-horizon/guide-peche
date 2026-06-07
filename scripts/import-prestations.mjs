/**
 * import-prestations.mjs
 * Importe le pagebuilder de toutes les pages prestation dans Sanity.
 * Les images sont uploadées depuis public/images/ et référencées via asset ID.
 *
 * Usage : node scripts/import-prestations.mjs
 */

import { createClient } from '@sanity/client'
import { promises as fs } from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
  projectId: 'uievv97s',
  dataset:   'production',
  useCdn:    false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const IMAGES_DIR = path.resolve(process.cwd(), 'public', 'images')

// ── Utilitaires ───────────────────────────────────────────────────────────────
let _k = 0
const key = (p = 'k') => `${p}${++_k}`

const imageCache = new Map()
async function img(localPath, alt = '') {
  if (!localPath) return null
  const name = localPath.replace(/^\/images\//, '')
  const fullPath = path.join(IMAGES_DIR, name)
  if (imageCache.has(fullPath)) {
    const ref = imageCache.get(fullPath)
    return alt ? { ...ref, alt } : ref
  }
  try {
    const buffer = await fs.readFile(fullPath)
    const ext = path.extname(fullPath).slice(1).toLowerCase()
    const mime = { avif:'image/avif', jpg:'image/jpeg', jpeg:'image/jpeg', png:'image/png', webp:'image/webp' }[ext] || 'image/jpeg'
    const asset = await client.assets.upload('image', buffer, { filename: path.basename(fullPath), contentType: mime })
    const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    imageCache.set(fullPath, ref)
    console.log(`  ✓ img ${name}`)
    return alt ? { ...ref, alt } : ref
  } catch (e) {
    console.warn(`  ⚠️  image introuvable : ${fullPath}`)
    return null
  }
}

function blocks(text) {
  if (!text) return []
  return text.split(/\n\n+/).filter(p => p.trim()).map(p => ({
    _type: 'block', _key: key('b'), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key('s'), text: p.trim(), marks: [] }],
  }))
}

function hero(d) {
  return {
    _type: 'sectionHero', _key: key('hero'),
    eyebrow: d.eyebrow || '',
    titre: d.titre,
    sousTitre: d.sousTitre || '',
    hauteur: d.hauteur || 'full',
    btnReserverTexte: d.btnReserverTexte || 'Réserver une sortie',
    btnReserverLien:  d.btnReserverLien  || '/contact',
    btnTelTexte:      d.btnTelTexte      || '06 87 30 34 56',
    ...(d.btnMaterielLien ? { btnMaterielLien: d.btnMaterielLien, btnMaterielLabel: d.btnMaterielLabel || 'Matériel' } : {}),
  }
}

function stats(items) {
  return {
    _type: 'sectionStats', _key: key('stats'), fond: 'dark',
    stats: items.map(s => ({ _type: 'stat', _key: key('st'), nombre: s.num, label: s.label })),
  }
}

function intro(d) {
  const sec = {
    _type: 'sectionIntro', _key: key('intro'), fond: 'white',
    texte: blocks(d.texte),
    showInfoCard: true,
    niveau: d.niveau || '',
    format: d.format || '',
    saison: d.saison || '',
    tarif:  d.tarif  || '',
    duree:  d.duree  || '',
    lignesSupp: (d.lignesSupp || []).map(l => ({ _type: 'ligneInfo', _key: key('li'), label: l.label, valeur: l.valeur })),
    boutons: (d.boutons || [{ texte: 'Réserver', lien: '/contact' }]).map(b => ({ _type: 'bouton', _key: key('btn'), texte: b.texte, lien: b.lien })),
  }
  if (d.intervenant) {
    sec.intervenant = {
      avatar: d.intervenant.avatar || '',
      nom:    d.intervenant.nom    || '',
      titre:  d.intervenant.titre  || '',
      bio:    d.intervenant.bio    || '',
    }
  }
  return sec
}

async function programme(d) {
  const etapes = await Promise.all((d.etapes || []).map(async (e, i) => ({
    _type: 'etape', _key: key('etape'),
    titre: e.titre,
    tag:   e.tag || '',
    texte: blocks(e.texte),
    image: e.img ? await img(e.img, e.alt || e.titre) : null,
  })))
  return {
    _type: 'sectionProgramme', _key: key('prog'),
    eyebrow: d.eyebrow || 'Programme',
    titre:   d.titre   || '',
    intro:   d.intro   || '',
    etapes,
    fond: 'sand',
  }
}

function progCartes(d) {
  return {
    _type: 'sectionProgrammeCartes', _key: key('progc'),
    eyebrow: d.eyebrow || 'Programme',
    titre:   d.titre   || '',
    intro:   d.intro   || '',
    colonnes: d.colonnes || '3',
    items: (d.items || []).map(item => ({
      _type: 'carte', _key: key('carte'),
      titre: item.titre,
      description: item.description || '',
    })),
    fond: 'sand',
  }
}

function progTexte(d) {
  return {
    _type: 'sectionProgrammeTexte', _key: key('progt'),
    eyebrow: d.eyebrow || 'Programme',
    titre:   d.titre   || '',
    intro:   d.intro   || '',
    colonnes: (d.colonnes || []).map(col => ({
      _type: 'colonne', _key: key('col'),
      label:  col.label,
      style:  col.style || 'normal',
      items: (col.items || []).map(item => ({
        _type: 'item', _key: key('item'),
        texte:  item.texte || item,
        inclus: item.inclus !== false,
      })),
    })),
    fond: 'sand',
  }
}

async function cards2(d) {
  const cards = await Promise.all((d.cards || []).map(async c => ({
    _type: 'card', _key: key('card'),
    titre:     c.titre,
    sousTitre: c.sousTitre || '',
    lien:      c.lien,
    image:     c.img ? await img(c.img) : null,
    positionPhoto: c.position || 'center center',
  })))
  return {
    _type: 'sectionCards2', _key: key('cards2'),
    eyebrow:  d.eyebrow  || 'Découvrez aussi',
    titre:    d.titre    || '',
    colonnes: d.colonnes || '4',
    fond:     d.fond     || 'white',
    cards,
  }
}

async function galerie(imgs) {
  const photos = (await Promise.all(imgs.map(async i => await img(i)))).filter(Boolean)
  return { _type: 'sectionGalerie', _key: key('gal'), photos, fond: 'dark', colonnes: '3' }
}

async function carrousel(imgs, titre = '') {
  const images = (await Promise.all(imgs.map(async i => await img(i)))).filter(Boolean)
  return { _type: 'sectionCarrousel3Images', _key: key('carr'), titre, images, ratio: '3/2', fond: 'dark' }
}

function video(d) {
  const ytId = d.url?.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/)?.[1]
  const embedUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : d.url
  return {
    _type: 'sectionVideo', _key: key('vid'),
    url: embedUrl,
    eyebrow: d.eyebrow || '',
    titre: d.titre || '',
    description: d.description || '',
    videoPosition: d.position || 'left',
    fond: d.fond || 'dark',
  }
}

function cta(d) {
  return {
    _type: 'sectionCta', _key: key('cta'),
    titre:     d.titre,
    texte:     d.texte || '',
    btn1Texte: d.btn1Texte || 'Me contacter',
    btn1Lien:  d.btn1Lien  || '/contact',
    btn2Texte: d.btn2Texte || '06 87 30 34 56',
    btn2Lien:  d.btn2Lien  || 'tel:0687303456',
    style: 'dark',
  }
}

async function texteImage(d) {
  return {
    _type: 'sectionTexteImage', _key: key('ti'),
    texte: blocks(d.texte),
    image: d.img ? await img(d.img, d.alt || '') : null,
    texteImageUrl: null,
    imagePosition: d.position || 'right',
    fond: d.fond || 'white',
  }
}

async function selection(d) {
  const items = await Promise.all((d.items || []).map(async (item, i) => ({
    _type: 'selectionItem', _key: key('si'),
    tag:   item.tag  || '',
    titre: item.titre,
    texte: blocks(item.texte),
    image: item.img ? await img(item.img, item.alt || item.titre) : null,
    pills: (item.pills || []),
    infos: (item.infos || []).map(inf => ({
      _type: 'infoItem', _key: key('inf'),
      label:  inf.label,
      valeur: inf.valeur,
    })),
  })))
  return {
    _type: 'sectionSelection', _key: key('sel'),
    eyebrow: d.eyebrow || '',
    titre:   d.titre   || '',
    intro:   d.intro   || '',
    styleCorps: d.styleCorps || 'sand',
    items,
    fond: d.fond || 'white',
  }
}

// ── Import d'une prestation ───────────────────────────────────────────────────
async function importPrestation(slug, pagebuilder) {
  const pb = pagebuilder.filter(Boolean)
  console.log(`\n📄 Import : ${slug} (${pb.length} sections)`)
  const existing = await client.fetch(`*[_type == "prestation" && slug.current == $slug][0]._id`, { slug })
  if (!existing) { console.warn(`  ⚠️  Document introuvable : ${slug}`); return }
  await client.patch(existing).set({ pagebuilder: pb }).commit()
  console.log(`  ✅ Pagebuilder mis à jour`)
}

// ── Données BarSubNav (4 autres pages bar) ────────────────────────────────────
const barCards = {
  initiation:      { titre: 'Initiation bar à la mouche',  sousTitre: 'Pour débuter et devenir autonome',             lien: '/initiation-peche-du-bar-a-la-mouche',    img: '/images/bar-initiation-6.jpg'   },
  perfectionnement:{ titre: 'Perfectionnement',            sousTitre: 'Progresser et rechercher les gros poissons',   lien: '/peche-du-bar-perfectionnement',           img: '/images/bar-perf-9.jpg'         },
  vue:             { titre: 'Bar à vue en estuaire',        sousTitre: 'Le graal du bar à la mouche',                  lien: '/peche-du-bar-a-vue-a-la-mouche',         img: '/images/bar-vue-hq.jpg'         },
  bateau:          { titre: 'Pêche en bateau',              sousTitre: 'Sur mon Carolina Skiff spécial mouche',        lien: '/peche-mouche-bar-bateau-bretagne',        img: '/images/bateau-3.jpg'           },
  coaching:        { titre: 'Coaching bar à la mouche',     sousTitre: 'Analyse vidéo · Débriefing · Progression ciblée', lien: '/peche-du-bar-a-la-mouche-coaching',   img: '/images/bar-coaching-6.jpg'     },
}
function barSubNav(current) {
  const others = Object.entries(barCards).filter(([id]) => id !== current).map(([, c]) => c)
  return cards2({ eyebrow: 'Bar à la mouche · Bretagne-Sud', titre: 'Découvrez aussi', colonnes: '4', fond: 'white', cards: others })
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════════

async function importInitiation() {
  const pb = [
    hero({
      eyebrow: 'Pêche à la mouche · Initiation · Toutes espèces',
      titre: 'Initiation à la pêche à la mouche',
      sousTitre: "La mécanique du lancer est simple, encore faut-il l'apprendre correctement dès le départ. En une journée avec un professionnel, vous repartez avec les vraies bases pour pêcher seul, toutes espèces confondues.",
      btnReserverTexte: 'Réserver un stage', btnReserverLien: '/contact',
      btnMaterielLien: '/materiel-jeanbaptistevidal', btnMaterielLabel: 'Matériel mouche',
    }),
    stats([
      { num: 'Toute l\'année', label: 'Disponibilité' },
      { num: '9h30 – 17h',    label: 'Journée complète' },
      { num: 'Débutants',     label: 'Niveau requis' },
      { num: '280 €',         label: 'Tarif / journée' },
    ]),
    intro({
      texte: `La pêche à la mouche est une technique particulière, très différente de la pêche conventionnelle, ne serait-ce que pour le lancer. Elle est accessible à tous, mais demande du temps d'apprentissage et une bonne coordination. Apprendre seul, c'est souvent prendre de mauvaises habitudes difficiles à corriger ensuite.

Mon objectif est de vous faire acquérir une vraie autonomie dans des situations simples en une journée. Il est souvent bénéfique de prévoir deux journées pour bien démarrer et consolider les acquis, mais une journée suffit pour partir du bon pied et pouvoir pratiquer seul dès votre retour.

Au-delà du lancer, nous abordons tous les éléments essentiels : confection d'un bas de ligne, choix des mouches de saison, connaissance de la rivière et comportement des poissons. Ce stage est valable pour toutes les espèces (truite, bar, migrateurs) avec le matériel adapté à chacune.`,
      niveau: 'Débutants uniquement · Aussi pour ceux qui ont commencé seuls',
      format: '1 journée · 2 journées conseillées pour bien démarrer',
      saison: 'Toute l\'année',
      tarif:  '280 € · 1 pers. / 180 € · 2 pers. / 150 € · 3 pers.',
      lignesSupp: [{ label: 'Horaires', valeur: '9h30 à 17h00 environ' }, { label: 'Espèces', valeur: 'Truite · Bar · Migrateurs · Toutes espèces' }],
      boutons: [{ texte: 'Réserver', lien: '/contact' }],
    }),
    video({
      url: 'https://www.youtube-nocookie.com/embed/d1SjTIJaQFs',
      titre: 'Initiation à la pêche à la mouche — Jean-Baptiste Vidal',
      description: 'Ma façon d\'enseigner les lancers de base en pêche à la mouche, la méthode pour bien démarrer et progresser rapidement.',
      fond: 'dark',
    }),
    await programme({
      eyebrow: 'Programme', titre: 'Ce que vous allez apprendre',
      etapes: [
        { titre: 'Apprentissage du lancer', tag: 'Simple traction · Double traction · Lancer roulé · Distance',
          texte: `Le lancer est le cœur de la pêche à la mouche, et le point le plus important à acquérir correctement dès le début. On commence par la simple traction pour installer la mécanique du geste, puis on progresse vers la double traction pour gagner en vitesse de soie et en distance.\n\nOn travaille la posture, le timing, la trajectoire de la canne et la formation de la boucle. Un mauvais geste appris seul peut prendre des années à corriger. Avec un professionnel, vous construisez le bon geste dès la première heure.`,
          img: '/images/guide-truite-2.jpg' },
        { titre: 'Matériel & confection d\'un bas de ligne', tag: 'Canne · Soie · Nœuds · Fluorocarbone',
          texte: `Comprendre son matériel est indispensable pour progresser. On passe en revue la canne, la soie, les principaux nœuds de la pêche à la mouche, et la fabrication d'un bas de ligne simple adapté à vos secteurs de pêche et à l'espèce recherchée.\n\nJe vous conseille aussi sur l'achat de votre matériel personnel en fonction de vos coins de pêche, pour que vous puissiez continuer à pratiquer et à progresser en totale autonomie dès la fin du stage.`,
          img: '/images/materiel-truite-1.jpg' },
        { titre: 'Choix des mouches & connaissance du milieu', tag: 'Mouches saisonnières · Rivière · Postes · Comportement des poissons',
          texte: `Le choix des mouches en fonction de la saison et des conditions est un art à part entière. On aborde ensemble les grandes familles de mouches (sèche, nymphe, mouillée), leur utilisation selon les situations, et comment lire une rivière pour trouver les postes à poissons.\n\nConnaissance de l'écologie du milieu, comportement des truites tout au long de la saison, lecture des courants : autant de clés que vous repartirez avec pour devenir un pêcheur efficace, autonome et respectueux du milieu.`,
          img: '/images/guide-truite-1.jpg' },
        { titre: 'Progression & autres espèces', tag: 'Truite · Bar · Migrateurs · Sans limite',
          texte: `Ce stage est un tremplin. Après l'initiation, vous pouvez revenir me voir pour un stage de perfectionnement, une journée de guidage bar ou truite, ou explorer d'autres espèces (alose, saumon, brochet) avec le matériel spécifique à chacune.\n\nLa pêche à la mouche est sans limite : après la sèche, il y a la nymphe, la pêche à vue, la mouche de surface pour le bar, le Spey Cast pour les migrateurs... Chaque étape franchie ouvre un nouveau champ de possibilités.`,
          img: '/images/guide-truite-3.jpg' },
      ],
    }),
    cta({ titre: 'Réservez votre stage d\'initiation', texte: '280 € · 1 pers. / 180 € · 2 pers. · Disponibilités sur demande, réponse sous 24h.' }),
  ]
  await importPrestation('initiation-peche-a-la-mouche', pb)
}

async function importBrochet() {
  const pb = [
    hero({
      eyebrow: 'Brochet · Lac · Étangs · Bretagne',
      titre: 'Pêche du brochet à la mouche en Bretagne',
      sousTitre: 'Le prédateur d\'eau douce aux attaques les plus explosives de nos eaux bretonnes. En bateau sur le Lac Saint-Michel et les étangs du Finistère, Jean-Baptiste vous guide à la rencontre de l\'esox lucius.',
      btnMaterielLien: '/materiel-mouche-brochet', btnMaterielLabel: 'Matériel brochet',
    }),
    stats([
      { num: 'Mai – Déc.',  label: 'Saison' },
      { num: 'En bateau',   label: 'Carolina Skiff depuis 2018' },
      { num: 'Lac St-Michel', label: 'Spot à gros brochets' },
      { num: 'Tous niveaux', label: 'Débutants & confirmés' },
    ]),
    intro({
      texte: `Le brochet est le carnassier d'eau douce le plus agressif et surprenant de nos eaux continentales. Avec ses attaques fulgurantes et explosives, il ravit les pêcheurs, surtout à la belle saison, la période la plus intéressante pour traquer ce prédateur au combien passionnant.\n\nMême si la Bretagne est souvent assimilée à une destination pour les salmonidés, le brochet est bien représenté sur différents spots de la région. Que ce soit en grand lac, étangs, ou sur le canal de Nantes à Brest, il est possible de prendre de jolis spécimens et de diversifier sa pêche durant la saison.\n\nJe vous propose de vous accompagner dans l'apprentissage de la pêche du brochet à la mouche, optimisation du lancer, stratégies, choix des mouches, animations et présentations adaptées à notre vaillant esox lucius.`,
      niveau: 'Tous niveaux',
      format: 'Journée complète en bateau',
      saison: 'Mai → Décembre (printemps + automne)',
      tarif:  '300 € · 1 pers. / 200 € · 2 pers. (bord) · 320 € · 1 pers. (bateau)',
      lignesSupp: [{ label: 'Spots', valeur: 'Lac Saint-Michel · Étangs côtiers · Canal de Nantes à Brest' }, { label: 'Bateau', valeur: 'Carolina Skiff JV 15, 2 pêcheurs max' }],
      boutons: [{ texte: 'Vérifier les disponibilités', lien: '/contact' }],
    }),
    await programme({
      eyebrow: 'Programme', titre: 'La pêche du brochet à la mouche',
      etapes: [
        { titre: 'Un prédateur explosif', tag: 'Émotions · Touches · Saisons',
          texte: `Ce que je recherche dans la pêche du brochet, ce sont des émotions fortes, des touches fulgurantes (parfois visibles au printemps) qui provoquent de vraies montées d'adrénaline. Le brochet est l'un des rares prédateurs de nos eaux qui se pêche de manière agressive à l'aide de mouches de surface ou de grosses mouches colorées.\n\nLa fin du printemps et le début de l'été sont les périodes les plus intéressantes. À la sortie de la fraie, les poissons sont très agressifs et les touches en bordure sont franches. L'automne réserve aussi de belles surprises avec de beaux spécimens qui s'alimentent avant l'hiver.`,
          img: '/images/BR 2.avif' },
        { titre: 'Sa pêche', tag: 'Technique · Mouches · Stratégies',
          texte: `Les pêches de bordure, de postes marqués dans les herbiers, sous les frondaisons, le long de la végétation déclenchent des attaques explosives et surprenantes. Je vous accompagne dans le choix des mouches, les animations et présentations adaptées, et l'optimisation de votre lancer.\n\nSelon la saison, le brochet change de poste et suit sa nourriture : bancs de poissons fourrages, grenouilles, canetons. Je vous apporte mes stratégies pour localiser les poissons et déclencher les touches, quel que soit votre niveau.`,
          img: '/images/BR 3.avif' },
        { titre: 'Le bateau', tag: 'Carolina Skiff · Bateau mouche',
          texte: `Depuis 2018, je me suis équipé d'un Carolina Skiff JV 15, un flat boat à fond plat spécial mouche et à faible tirant d'eau, permettant de prospecter lacs et étangs dans très peu d'eau. Deux grandes plates-formes accueillent deux pêcheurs dans d'excellentes conditions de lancer.\n\nMotorisé par un Yamaha 40 CV pour les déplacements rapides et un moteur électrique à l'avant pour des dérives silencieuses, il permet de s'approcher des postes discrètement et efficacement.`,
          img: '/images/BR 4.avif' },
        { titre: 'Les étangs', tag: 'Lac Saint-Michel · Étangs bretons',
          texte: `Le Lac Saint-Michel (retenue de Brennilis, 450 ha dans les Monts d'Arrée) est l'un des plus grands lacs de Bretagne et un spot à gros brochets, chaque année des poissons dépassant le mètre sont capturés. Ses nombreuses anses et ses faibles profondeurs en font un terrain idéal pour la mouche.\n\nLa Bretagne détient aussi de nombreux étangs côtiers peuplés de brochets, perches et sandres. À l'aide de mon Carolina Skiff, je peux vous guider sur les secteurs les plus intéressants.`,
          img: '/images/BR 5.avif' },
        { titre: 'Le canal de Nantes à Brest', tag: 'Canal · Sandre · Perche',
          texte: `Le canal de Nantes à Brest offre une multitude de secteurs et la possibilité de pêcher divers carnassiers en plus du brochet : sandres et perches. De nombreux secteurs très intéressants jalonnent ce canal mythique traversant la Bretagne d'est en ouest.\n\nSelon la saison et les conditions, je vous propose de vous emmener découvrir ou vous perfectionner dans la recherche de ce prédateur hors du commun, du bord ou en float tube.`,
          img: '/images/BR 6.avif' },
      ],
    }),
    cta({ titre: 'Réservez votre sortie brochet', texte: 'Saison mai → décembre · Disponibilités et tarifs sur demande.' }),
  ]
  await importPrestation('peche-du-brochet-a-la-mouche', pb)
}

async function importInitiationBar() {
  const pb = [
    hero({
      eyebrow: 'Bar à la mouche · Initiation · Bretagne-Sud',
      titre: 'Initiation au bar à la mouche',
      sousTitre: 'Matériel, lancer, lecture du milieu, stratégie : en une journée vous repartez avec les clés pour pêcher le bar seul, près de chez vous.',
      btnMaterielLien: '/materiel-mouche-bar', btnMaterielLabel: 'Matériel bar',
    }),
    stats([
      { num: 'Mai – Nov',    label: 'Saison de pêche du bar' },
      { num: '6–8 h',       label: 'Journée de guidage' },
      { num: '2 max',       label: 'Pêcheurs par sortie' },
      { num: 'Tous niveaux', label: 'Débutants bienvenus' },
    ]),
    intro({
      texte: `Vous souhaitez vous initier à la pêche du bar à la mouche, prendre vos premiers bars et comprendre comment traquer ce poisson passionnant ? Ces stages sont spécialement conçus pour le pêcheur débutant ou sans expérience à la mouche.\n\nMon objectif est simple : vous transmettre toutes mes compétences, connaissance du milieu, de l'écosystème, techniques de lancer adaptées aux grandes mouches lestées, lecture des postes, stratégie de pêche, pour que vous puissiez poursuivre seul cette quête passionnante.\n\nLes bars quittent les côtes en automne pour leur reproduction et reviennent en mars. La saison s'étend de mai à fin novembre, avec un démarrage préférentiel à mi-avril. Marées, coefficients, météo, direction du vent, luminosité et teinte de l'eau sont autant de paramètres à maîtriser.`,
      niveau: 'Débutants · Pêcheurs sans expérience mouche',
      format: 'Journée complète · Week-end · Sur mesure',
      duree:  '6 à 8 heures de guidage',
      saison: 'Mai à novembre · Départ mi-avril',
      tarif:  '320 € · 1 pers. / 225 € · 2 pers.',
      lignesSupp: [{ label: 'Groupe', valeur: 'Maximum 2 pêcheurs' }],
      boutons: [{ texte: 'Réserver', lien: '/contact' }],
    }),
    await programme({
      eyebrow: 'Programme', titre: 'Ce que vous allez apprendre',
      etapes: [
        { titre: 'Choix & utilisation du matériel', tag: 'Canne · Soie · Bas de ligne · Mouches',
          texte: `Sélection de la canne appropriée, du type de soie, de la pointe et du fluorocarbone adaptés aux conditions du jour. Le choix de la mouche est une étape critique : une sélection saisonnière bien pensée multiplie les chances de capture.\n\nVous comprendrez pourquoi le matériel du bar à la mouche est spécifique : mouches lestées volumineuses, soies intermédiaires ou plongeantes, et pourquoi les réglages fins font la différence.`,
          img: '/images/BI3.avif' },
        { titre: 'Apprentissage du lancer', tag: 'Simple traction · Double traction · Lancer roulé',
          texte: `La pêche du bar exige des techniques de lancer particulières : simple et double traction pour gagner en vitesse et en distance, lancer roulé, arrière-main, maîtrise de la boucle serrée, exploitation des vents.\n\nAvec des mouches volumineuses et parfois lestées, le geste doit être précis et économique. On travaille ensemble la posture, le timing et la trajectoire pour que vous soyez à l'aise dans toutes les conditions de vent, inévitables en Bretagne.`,
          img: '/images/BI2.avif' },
        { titre: 'Stratégie & lecture du milieu', tag: 'Estuaires · Marées · Postes · Courants',
          texte: `L'estuaire est un écosystème de transition entre eau douce et eau salée. Comprendre son fonctionnement est indispensable. On analyse ensemble les marées, les coefficients, les courants, les postes à bars et les signaux biologiques (activité des oiseaux, chasses en surface).\n\nReconnaissance des bons postes selon les conditions du moment, lecture des courants, placement optimal pour présenter la mouche : autant de clés que vous repartirez avec pour être efficace dès votre prochaine sortie.`,
          img: '/images/BI4.avif' },
      ],
    }),
    await barSubNav('initiation'),
    cta({ titre: 'Réservez votre initiation', texte: 'Disponibilités et tarifs sur demande, réponse sous 24h.' }),
  ]
  await importPrestation('initiation-peche-du-bar-a-la-mouche', pb)
}

async function importBarPerfectionnement() {
  const pb = [
    hero({
      eyebrow: 'Bar à la mouche · Perfectionnement · Bretagne-Sud',
      titre: 'Perfectionnement — Rechercher les gros poissons',
      sousTitre: 'Double traction, grands lancers, lecture des postes, stratégie de pêche, pour les pêcheurs initiés qui veulent franchir le cap et traquer de vrais trophées.',
      btnMaterielLien: '/materiel-mouche-bar', btnMaterielLabel: 'Matériel bar',
    }),
    stats([
      { num: 'Mai – Nov',    label: 'Saison de pêche du bar' },
      { num: '6–8 h',       label: 'Journée de guidage' },
      { num: '2 max',       label: 'Pêcheurs par sortie' },
      { num: '17 ans',      label: 'd\'expérience bar intensive' },
    ]),
    intro({
      texte: `Vous êtes déjà pêcheur initié en eau douce et/ou en mer, et souhaitez améliorer votre technique de lancer, accroître vos connaissances de la pêche du bar et rechercher de plus gros poissons ? Ces stages de perfectionnement sont faits pour vous.\n\nFort de plus de 17 années d'expérience intensive en France et à l'étranger, je vous transmets mon savoir-faire pour la double traction, les stratégies de pêche et la traque des poissons les plus imposants. L'objectif : être encore plus performant et vous concentrer uniquement sur la traque de Mr Labrax.\n\nLes bars quittent les côtes en automne pour leur reproduction et reviennent en mars. La saison s'étend de mai à fin novembre. Marées, coefficients, météo, direction du vent, luminosité et teinte de l'eau sont les paramètres clés à maîtriser pour maximiser vos chances sur les gros poissons.`,
      niveau: 'Pêcheurs initiés',
      format: 'Journée · Week-end · Du bord ou en bateau',
      duree:  '6 à 8 heures selon les marées',
      saison: 'Mai à novembre · Départ mi-avril',
      tarif:  '320 € · 1 pers. / 225 € · 2 pers.',
      lignesSupp: [{ label: 'Groupe', valeur: 'Maximum 2 pêcheurs' }],
      boutons: [{ texte: 'Réserver une sortie', lien: '/contact' }],
    }),
    await programme({
      eyebrow: 'Programme', titre: 'Ce que vous allez travailler',
      intro: 'Chaque sortie est structurée autour de quatre axes pour faire progresser le pêcheur initié vers la maîtrise complète de la pêche du bar à la mouche.',
      etapes: [
        { titre: 'Perfectionnement du lancer', tag: 'Double traction · Roulé · Back handed · Distance',
          texte: `Maîtrise des techniques de lancer avancées : simple et double traction pour atteindre et dépasser les 15 mètres, lancer roulé, arrière-main (back handed), exploitation des vents de face et des vents arrière.\n\nLa capacité à serrer la boucle face au vent est déterminante pour la pêche du bar en conditions bretonnes. On travaille la précision, la constance et l'économie du geste pour que chaque lancer soit efficace, quelle que soit la météo.`,
          img: '/images/BP2.avif' },
        { titre: 'Matériel & choix des mouches', tag: 'Cannes · Soies · Mouches · Animations',
          texte: `Choix du matériel adapté selon les postes et les conditions du moment : type de soie, pointe, fluorocarbone. La sélection des mouches (taille, couleur, poids) et leur animation sont des paramètres souvent sous-estimés qui font pourtant toute la différence.\n\nOn décrypte ensemble les erreurs courantes dans le choix du matériel et des mouches, et on optimise chaque réglage pour maximiser le nombre de touches et de captures.`,
          img: '/images/BP3.avif' },
        { titre: 'Stratégies de pêche', tag: 'Préparation · Postes · Marées · Progression',
          texte: `La pêche du bar se prépare. On travaille ensemble la structure d'une sortie efficace : choix du spot en fonction des marées et du vent, lecture des courants et des postes, timing d'intervention, gestion de l'approche.\n\nAccumulation progressive d'expérience et d'observation pour construire une véritable autonomie : comprendre pourquoi ça mord à tel endroit, à telle heure, dans telles conditions, et savoir reproduire le succès.`,
          img: '/images/BP4.avif' },
        { titre: 'Traque du gros bar à vue', tag: 'Bar à vue · Imitations · Approche discrète · Places limitées',
          texte: `Programme spécialisé pour pêcheurs confirmés en bonne condition physique. Traque des gros bars à vue en estuaire à l'aide d'imitations de crustacés et de streamers, la forme la plus exigeante et la plus gratifiante de la pêche du bar.\n\nDiscrétion totale, lecture de l'eau, présentation millimétrique : un seul lancer imprécis et le bar disparaît. Un challenge technique et physique réservé aux pêcheurs qui maîtrisent déjà les bases, les places sont volontairement limitées.`,
          img: '/images/BP5.avif' },
      ],
    }),
    await barSubNav('perfectionnement'),
    cta({ titre: 'Réservez votre sortie', texte: 'Disponibilités et tarifs sur demande — réponse sous 24h.' }),
  ]
  await importPrestation('peche-du-bar-perfectionnement', pb)
}

async function importBarVue() {
  const pb = [
    hero({
      eyebrow: 'Bar à vue · Estuaire breton · Pêche d\'exception',
      titre: 'Bar à vue en estuaire — Le graal de la pêche du bar à la mouche',
      sousTitre: 'Croiser un bar trophée dans quelques centimètres d\'eau, présenter une imitation de crabe à quelques centimètres de son museau, une pêche d\'exception réservée aux pêcheurs confirmés.',
      btnMaterielLien: '/materiel-mouche-bar', btnMaterielLabel: 'Matériel bar',
    }),
    stats([
      { num: 'Printemps – Automne', label: 'Saison selon conditions' },
      { num: 'Places limitées',     label: 'Disponibilités réduites' },
      { num: 'Confirmés',           label: 'Niveau requis' },
      { num: '17 ans',              label: 'd\'expérience bar intensive' },
    ]),
    intro({
      texte: `Traquer les labrax à vue en estuaire devient rapidement une passion dévorante, à l'instar de la pêche en destination exotique, mais cette pêche demande une connaissance de terrain indéniable et une compréhension fine du fonctionnement de cet écosystème particulier.\n\nVous êtes pêcheur confirmé, en bonne forme physique, et vous souhaitez tenter l'expérience de prendre un très gros bar à vue ? Je propose des sorties spécial « pêche à vue » en quantité volontairement limitée pour traquer les gros bars à vue en estuaire à l'aide d'imitations de crabe et de crevette, et parfois au streamer à vue.\n\nDiscrétion totale, approche à pas de loup, présentation millimétrique : un seul lancer imprécis et le bar disparaît. Un vrai challenge technique et physique pour le pêcheur sportif aguerri.`,
      niveau: 'Pêcheurs confirmés · Bonne condition physique',
      format: 'Journée complète · Sorties limitées · Conditions météo spécifiques',
      duree:  'Calée sur les marées favorables',
      saison: 'Printemps – Automne · Fenêtres limitées',
      tarif:  '320 € · 1 pers. / 225 € · 2 pers.',
      lignesSupp: [{ label: 'Groupe', valeur: '1 à 2 pêcheurs maximum' }],
      boutons: [{ texte: 'Réserver', lien: '/contact' }],
    }),
    await programme({
      eyebrow: 'Programme', titre: 'La pêche du bar à vue',
      etapes: [
        { titre: 'Traque de gros bars à vue', tag: 'Approche · Discrétion · Lecture de l\'eau',
          texte: `La pêche du bar à vue se pratique dans des conditions très particulières : eau claire, marée descendante ou montante lente, lumière rasante. On marche des heures dans peu d'eau, à l'affût du moindre reflet, du moindre sillon laissé par un dos de bar dans le fond vaseux.\n\nL'approche est tout. Chaque pas compte : une onde de surface, une ombre portée, un bruit de wading trop fort et le bar disparaît en un éclair. Cette pêche façonne une qualité d'attention et une présence au milieu rarement atteintes.`,
          img: '/images/BV1.avif' },
        { titre: 'Recherche des spots de pêche', tag: 'Marées · Topographie · Reconnaissance terrain',
          texte: `Trouver les bons postes est un travail de longue haleine, certains spots ne fonctionnent qu'à des coefficients de marée précis, à certaines heures, dans certaines conditions de vent et de lumière. La connaissance terrain acquise sur 17 ans de pratique intensive est ici déterminante.\n\nOn travaille ensemble la lecture du fond, la topographie des vasières, les chenaux de marée et les zones de chasse préférentielles des gros bars.`,
          img: '/images/BV2.avif' },
        { titre: 'Stratégie & observations', tag: 'Météo · Luminosité · Comportement des poissons',
          texte: `Observer avant de pêcher. La patience et l'observation sont les premières qualités du pêcheur à vue. On lit l'eau ensemble : sens du courant, zones d'ombre, postures des poissons, direction de nage : autant d'indices qui conditionnent le placement et la présentation.\n\nLes conditions météo jouent un rôle central : ciel couvert ou soleil rasant, vent de face ou dans le dos, luminosité de l'eau selon l'heure. Comprendre ces paramètres, c'est multiplier ses chances sur les gros poissons.`,
          img: '/images/BV3.avif' },
        { titre: 'Choix, présentation & animation des mouches', tag: 'Imitations · Crabe · Crevette · Streamer à vue',
          texte: `Pour la pêche à vue, les imitations de crustacés sont reines : crabe, crevette, amphipode. Le choix de la taille, de la couleur et du poids de la mouche est critique selon la teinte de l'eau et la profondeur.\n\nL'animation est l'art de cette pêche : poser la mouche quelques centimètres devant le bar sans l'effrayer, laisser couler, déclencher une fuite lente... Le déclenchement de la touche dépend entièrement de la qualité de la présentation.`,
          img: '/images/BV4.avif' },
        { titre: 'Capture d\'un bar trophée', tag: 'Ferrage · Combat · Catch & Release',
          texte: `Voir un grand bar fondre sur la mouche, ferrer à la ligne, sentir une explosion de puissance dans quelques centimètres d'eau : c'est le moment pour lequel tout le reste n'était que préparation. Un bar de 60–70 cm capturé à vue dans peu d'eau vaut toutes les pêches du monde.\n\nLa pratique du catch & release est intégrale sur ces sorties. Le bar est un prédateur apex en voie de fragilisation, sa remise à l'eau soigneuse, rapide et documentée en photo fait partie intégrante de l'expérience.`,
          img: '/images/BV5.avif' },
      ],
    }),
    video({
      url: 'https://www.youtube-nocookie.com/embed/iq9lzlg3__I',
      eyebrow: 'En images', titre: 'Voir une journée de bar à vue',
      description: 'Une sortie filmée en Bretagne-Sud : traque, approche, présentation et capture d\'un gros bar à vue en estuaire.',
      fond: 'white', position: 'left',
    }),
    await barSubNav('vue'),
    cta({ titre: 'Réservez votre sortie bar à vue', texte: 'Places limitées, disponibilités et tarifs sur demande, réponse sous 24h.' }),
  ]
  await importPrestation('peche-du-bar-a-vue-a-la-mouche', pb)
}

async function importBarBateau() {
  const pb = [
    hero({
      eyebrow: 'Bar à la mouche · En bateau · Bretagne-Sud',
      titre: 'Pêche du bar en bateau — À bord de mon Carolina Skiff spécial mouche',
      sousTitre: 'Estuaires et côte bretonne : accédez aux meilleurs postes à bars, invisibles depuis le bord, à bord d\'un flat boat conçu pour la pêche à la mouche.',
      btnMaterielLien: '/materiel-mouche-bar', btnMaterielLabel: 'Matériel bar',
    }),
    stats([
      { num: 'Mai – Nov', label: 'Saison de pêche' },
      { num: '6–8 h',     label: 'Journée de guidage' },
      { num: '2 max',     label: 'Pêcheurs par sortie' },
      { num: '320 €',     label: 'Tarif individuel / jour' },
    ]),
    intro({
      texte: `Après avoir guidé de nombreuses années en bateau à l'étranger, depuis 2018 je me suis équipé d'un Carolina Skiff JV15, un « flat boat » à fond plat et à faible tirant d'eau spécialement conçu pour la pêche à la mouche en estuaire et en mer.\n\nLa pêche du bar en bateau est complémentaire à la pêche depuis le bord : elle permet de prospecter de nombreuses zones inaccessibles depuis la rive, de se déplacer rapidement entre les postes, et d'approcher discrètement les bars grâce à un moteur électrique à l'avant.\n\nJe vous emmène sur plusieurs estuaires de mon secteur géographique (Sud-Bretagne) en fonction de la saison, des marées, des coefficients et des conditions de pêche.`,
      niveau: 'Pêcheurs initiés · Maîtrise de la double traction requise',
      format: 'Journée complète · 6 à 8h selon marées · 1 ou 2 pêcheurs',
      saison: 'Mai à novembre · Dates selon meilleures marées',
      tarif:  '350 € · 1 pers. / 250 € · 2 pers.',
      lignesSupp: [
        { label: 'Bateau', valeur: 'Carolina Skiff JV15 · Fond plat · Faible tirant d\'eau' },
        { label: 'Motorisation', valeur: 'Suzuki 40 CV 4T · Minn Kota Powerdrive 70 lbs · Batterie lithium' },
        { label: 'Équipements', valeur: 'Sondeur Humminbird · Portes-cannes mouche · 2 plates-formes' },
      ],
      boutons: [{ texte: 'Réserver', lien: '/contact' }],
    }),
    video({
      url: 'https://www.youtube-nocookie.com/embed/Qnwlz4MA5q0?start=79',
      eyebrow: 'En images', titre: 'Une journée de pêche du bar en bateau',
      description: 'Streamer, mouches de surface, recherche des postes sur la côte bretonne, une sortie filmée à bord du Carolina Skiff.',
      fond: 'dark', position: 'left',
    }),
    await programme({
      eyebrow: 'Programme', titre: 'La pêche du bar en bateau',
      etapes: [
        { titre: 'Le Carolina Skiff JV15, un flat boat taillé pour la mouche', tag: 'Fond plat · Suzuki 40 CV · Minn Kota 70 lbs · Sondeur Humminbird',
          texte: `Le Carolina Skiff JV15 est un skiff américain à fond plat conçu pour naviguer dans très peu d'eau. Motorisé par un Suzuki 40 CV 4 temps, silencieux et peu consommant, il permet des déplacements rapides entre les postes. À l'avant, un moteur électrique Minn Kota Powerdrive 70 lbs alimenté par une batterie lithium assure les dérives et approches en totale discrétion.\n\nDeux grandes plates-formes avant et arrière accueillent confortablement deux pêcheurs. Le bateau est équipé de portes-cannes et rangements spécial mouche, d'un sondeur Humminbird qui fournit en temps réel la profondeur, la température de l'eau et la présence de poissons sous la coque.`,
          img: '/images/PB2.avif' },
        { titre: 'Streamers & mouches de surface', tag: 'Streamer · Gurgler · Popper · Soie intermédiaire & plongeante',
          texte: `Depuis le bateau, on pêche principalement au streamer en soie intermédiaire et plongeante, la technique la plus productive pour prospecter les postes à bars en profondeur, en dérive ou à l'ancre.\n\nMais c'est la pêche aux mouches de surface (gurgler, popper, slider) qui garantit les actions les plus spectaculaires : voir un bar exploser sur une mouche en surface depuis un bateau stabilisé est une expérience inoubliable. On adapte la technique selon les conditions du moment.`,
          img: '/images/PB3.avif' },
        { titre: 'Prospection des postes', tag: 'Estuaires · Côte · Dérive · Lecture de l\'eau',
          texte: `Le bateau multiplie les possibilités de prospection : en dérive sur un courant de marée, ancré face à une pointe rocheuse, ou en progression lente sur une vasière. On accède à des configurations impossibles depuis le bord : îlots, passes, chenaux, herbiers immergés.\n\nJe vous emmène sur mes meilleurs spots en fonction de la marée du jour, du vent et de la saison. Un planning des meilleures marées peut être communiqué à l'avance pour optimiser la date de votre sortie.`,
          img: '/images/PB4.avif' },
        { titre: 'Une pêche technique & ludique', tag: 'Double traction · Pêcheurs initiés · Bars 50 cm+',
          texte: `La pêche en bateau est ludique mais exigeante : elle nécessite une bonne maîtrise du lancer, notamment de la double traction, ainsi qu'un bon équilibre à bord. Ce n'est pas une pêche pour débutants, bien que je puisse aussi vous former pour débuter la pêche du bar.\n\nLes bars de plus de 50 cm sont présents et montent régulièrement sur nos mouches. Les actions sont souvent spectaculaires, notamment aux mouches de surface.`,
          img: '/images/PB5.avif' },
      ],
    }),
    await galerie(['/images/PB6.avif','/images/PB7.avif','/images/PB8.avif','/images/PB9.avif','/images/PB10.avif','/images/PB11.avif','/images/PB12.avif','/images/PB13.avif']),
    await barSubNav('bateau'),
    cta({ titre: 'Réservez votre sortie en bateau', texte: '320 € / jour · Dégressif à 2 pêcheurs · Disponibilités selon marées, réponse sous 24h.' }),
  ]
  await importPrestation('peche-mouche-bar-bateau-bretagne', pb)
}

async function importCoaching() {
  const pb = [
    hero({
      eyebrow: 'Bar à la mouche · Coaching personnalisé · Sur vos spots',
      titre: 'Coaching bar à la mouche — Sur vos coins favoris ou à bord de votre bateau',
      sousTitre: 'Vous pêchez déjà aux leurres ou débutez à la mouche ? Je viens sur vos spots pour vous transmettre mon expertise et vous permettre de pêcher le bar à la mouche avec aisance et succès.',
      btnMaterielLien: '/materiel-mouche-bar', btnMaterielLabel: 'Matériel bar',
    }),
    stats([
      { num: 'Mi-avril – Nov', label: 'Saison de coaching' },
      { num: '4–8 h',         label: 'Demi-journée ou journée' },
      { num: 'Tous niveaux',  label: 'Débutants bienvenus' },
      { num: '25 ans',        label: 'd\'expérience à la mouche' },
    ]),
    intro({
      texte: `Vous êtes déjà pêcheur aux leurres ou débutant moucheur, et vous souhaitez découvrir ou améliorer votre technique à la mouche ? Je viens vous accompagner et vous coacher sur vos coins favoris du bord ou à bord de votre propre bateau, là où vous pêchez déjà, dans un environnement que vous connaissez.\n\nFort de plus de 25 ans de pêche à la mouche intensive en France et à l'étranger pour de nombreuses espèces d'eau douce et marines, je mets tout mon savoir-faire à votre disposition pour vous faire progresser rapidement dans la pratique de la pêche du bar à la mouche.\n\nChaque journée de coaching est calée sur les conditions du moment. Une prestation entièrement sur mesure, adaptée à votre niveau et à vos objectifs, à la journée ou à la demi-journée.`,
      niveau: 'Tous niveaux · Débutants moucheurs bienvenus',
      format: 'Journée · Demi-journée · Sur vos spots · Sur votre bateau',
      duree:  '4 à 8 heures selon marées et formule choisie',
      saison: 'Mi-avril à fin novembre',
      tarif:  '320 € · 1 pers. / 225 € · 2 pers.',
      boutons: [{ texte: 'Réserver', lien: '/contact' }],
    }),
    await programme({
      eyebrow: 'Programme', titre: 'Le coaching sur vos spots',
      etapes: [
        { titre: 'Coaching sur vos spots', tag: 'Sur mesure · Vos secteurs · Votre niveau · Votre bateau',
          texte: `Le coaching se déroule entièrement dans votre environnement de pêche : vos estuaires, votre côte, votre bateau. Pas de déplacement sur mes spots, c'est moi qui viens à vous, pour vous apporter mon expertise directement là où vous pêchez.\n\nCette approche sur mesure permet de progresser plus vite : on travaille sur vos problèmes concrets, vos lacunes spécifiques, vos habitudes à corriger. Chaque sortie de coaching est unique et construite autour de vos objectifs du moment.`,
          img: '/images/BC1.avif' },
        { titre: 'Choix du matériel', tag: 'Canne · Soie · Pointe · Fluorocarbone · Mouches',
          texte: `Savoir s'équiper et choisir le matériel adapté à la technique et aux conditions est primordial. On passe en revue ensemble la taille et la puissance de canne, le type de soie, la pointe et le fluorocarbone, chaque élément de la chaîne doit être cohérent avec vos objectifs.\n\nLe choix des mouches selon la saison, les postes et les conditions n'est pas à prendre à la légère : c'est souvent lui qui fait la différence entre une journée mémorable et une journée blanche.`,
          img: '/images/BC2.avif' },
        { titre: 'Apprentissage du lancer', tag: 'Simple traction · Double traction · Roulé · Back handed',
          texte: `La pêche du bar est exigeante : elle demande de lancer des mouches souvent volumineuses et lestées à 15 mètres et plus. Maîtriser la simple et double traction est indispensable pour gagner en vitesse et en distance.\n\nOn travaille aussi le lancer roulé, le lancer arrière-main (back handed), la boucle serrée face au vent et l'exploitation du vent arrière. Autant de techniques qui permettent de s'adapter à toutes les conditions bretonnes.`,
          img: '/images/BC3.avif' },
        { titre: 'Stratégies de pêche', tag: 'Préparation · Marées · Postes · Lecture de l\'eau',
          texte: `Aller à la pêche est une chose, partir bien préparé avec une stratégie définie en est une autre. Je vous enseigne à construire une approche structurée : choix du spot en fonction des marées, lecture des courants, timing d'intervention, gestion de l'approche.\n\nComme je dis souvent à mes stagiaires : « on apprend toujours quelque chose à chaque sortie. » C'est l'accumulation progressive d'expériences et d'observations qui construit un vrai pêcheur autonome.`,
          img: '/images/BC4.avif' },
      ],
    }),
    await barSubNav('coaching'),
    cta({ titre: 'Réservez votre coaching', texte: 'Sur vos spots · 320 € / 1 pers. · 225 € / 2 pers. · Réponse sous 24h.' }),
  ]
  await importPrestation('peche-du-bar-a-la-mouche-coaching', pb)
}

async function importAlose() {
  const pb = [
    hero({
      eyebrow: 'Alose à la mouche · Aulne · Blavet · Bretagne',
      titre: 'Pêche de l\'alose à la mouche en Bretagne',
      sousTitre: 'Un migrateur encore confidentiel, d\'une puissance et d\'une combativité remarquables. Sur l\'Aulne, le Blavet et les rivières bretonnes, Jean-Baptiste vous guide à la rencontre de ce prédateur fascinant.',
      btnMaterielLien: '/materiel-mouche-migrateur', btnMaterielLabel: 'Matériel migrateurs',
    }),
    stats([
      { num: 'Mi-avril – fin juin', label: 'Saison Aulne / Blavet' },
      { num: 'Fin mai – fin juillet', label: 'Saison autres rivières' },
      { num: 'Estuaires bretons',   label: 'Aulne · Blavet · Ellé' },
      { num: '200 €',               label: 'Tarif coup du soir' },
    ]),
    intro({
      texte: `L'alose est une espèce en pleine expansion dans les rivières bretonnes après des décennies de déclin. Ce grand migrateur, proche du maquereau et du hareng, rétrograde jusqu'à 100 km des côtes pour se reproduire dans les rivières de première catégorie.\n\nSa pêche est encore confidentielle en France, mais les initiés connaissent les sensations incomparables que procure la capture d'une grande alose à la mouche. Un poisson de 1,5 à 2,5 kg, combatif, sauteur, pêché en soirée dans des eaux de printemps.\n\nJe propose des sorties guidées sur les meilleurs secteurs de l'Aulne et du Blavet, les deux rivières les plus importantes pour la grande alose en Bretagne, ainsi que sur plusieurs autres cours d'eau côtiers de la région.`,
      niveau: 'Initiés · Maîtrise du lancer requise',
      format: 'Coup du soir (3–4h) · Journée complète',
      saison: 'Mi-avril à fin juillet',
      tarif:  '200 € coup du soir / 320 € journée Aulne / 350 € journée Blavet',
      lignesSupp: [{ label: 'Rivières', valeur: 'Aulne · Blavet · Ellé · Elorn · Odet · Goyen · Scorf' }],
      boutons: [{ texte: 'Vérifier les disponibilités', lien: '/contact' }],
    }),
    video({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      eyebrow: 'Alose à la mouche', titre: 'Pêche de l\'alose à la mouche en Bretagne',
      description: 'Guidage pêche de l\'alose à la mouche sur les rivières bretonnes.',
      fond: 'dark',
    }),
    cta({ titre: 'Réservez votre sortie alose', texte: 'Saison mi-avril → fin juillet · Disponibilités et tarifs sur demande.' }),
  ]
  await importPrestation('peche-de-l-alose-a-la-mouche', pb)
}

async function importTruite() {
  const pb = [
    hero({
      eyebrow: 'Truite · Rivières Bretagne-Sud · Finistère & Morbihan',
      titre: 'Pêche de la truite à la mouche en Bretagne',
      sousTitre: 'Fario 100 % sauvage sur les plus belles rivières du Finistère et du Morbihan — sèche, nymphe, noyée, streamer depuis 1993',
      btnMaterielLien: '/materiel-mouche-truite', btnMaterielLabel: 'Matériel truite',
    }),
    intro({
      texte: `Le Finistère dispose de plus de 4 500 km de rivières de première catégorie, ce qui offre un vaste choix de magnifiques rivières à truites. Sur mon secteur géographique, j'ai sélectionné 7 rivières de taille et configuration différentes qui permettent de varier les plaisirs et de s'adapter à toutes les envies.\n\nLa gestion patrimoniale en Bretagne-Sud garantit des truites 100 % sauvages de souche atlantique, combatives et méfiantes. Leurs robes colorées et leurs habitats préservés en font l'une des pêches les plus techniques et les plus gratifiantes qui soit.\n\nJe pratique la pêche à la mouche depuis 1993 en France et à l'étranger. Je propose des sorties adaptées à tous les niveaux : débuter, s'initier, se perfectionner. Les techniques enseignées couvrent la sèche, la noyée, le streamer, la nymphe au fil et la nymphe à vue.`,
      niveau: 'Tous niveaux · Initiation et perfectionnement',
      format: 'Journée 9h30–18h · 7 à 8 h de guidage',
      saison: 'Mi-mars à mi-septembre',
      tarif:  '300 € · 1 pers. / 200 € · 2 pers. / 160 € · 3 pers.',
      lignesSupp: [{ label: 'Rivières', valeur: 'Scorff · Ellé · Isole · Odet · Jet · Steïr · Aven' }],
      boutons: [{ texte: 'Réserver une sortie', lien: '/contact' }],
    }),
    progCartes({
      eyebrow: 'Programme', titre: 'Une journée de pêche de la truite',
      intro: 'Chaque sortie est adaptée à votre niveau et à vos objectifs. Voici le déroulé type d\'une journée de guidage truite en rivière.',
      colonnes: '3',
      items: [
        { titre: 'Lecture de l\'eau', description: 'Identifier les postes : courants, bordures, blocs rocheux, sous-berges. Comprendre où se tient la truite selon l\'heure et la saison.' },
        { titre: 'Connaissance entomologique', description: 'Identification des mouches et invertébrés aquatiques présents sur la rivière. Choisir la mouche juste selon l\'éclosion du moment.' },
        { titre: 'Lancer & technique', description: 'Amélioration du lancer : droit, roulé, revers, courbe. Adaptation aux contraintes de la rivière : végétation, vent, contre-jour.' },
        { titre: 'Pêche par technique', description: 'Sèche, noyée, streamer, tandem, nymphe au fil — selon vos souhaits et votre niveau. Présentation, dérive, ferrage et combat.' },
        { titre: 'Matériel & bas de ligne', description: 'Choix de la canne, de la soie, du bas de ligne. Montage des mouches. Conseils personnalisés pour votre équipement.' },
        { titre: 'Écologie & no-kill', description: 'Respect du milieu, remise à l\'eau dans les règles de l\'art, gestion patrimoniale. La truite sauvage mérite qu\'on la préserve.' },
      ],
    }),
    await selection({
      eyebrow: 'Sélection de rivières', titre: 'Les plus belles rivières à truites de Bretagne-Sud',
      intro: 'J\'ai sélectionné ces cours d\'eau pour leur potentiel halieutique, leur beauté et la qualité de leurs populations de truites fario sauvages.',
      styleCorps: 'white', fond: 'white',
      items: [
        { tag: 'Morbihan (56)', titre: 'Le Scorff', img: '/images/truite-riviere-scorff.jpg',
          texte: `Réputé pour ses saumons, le Scorff s'écoule dans une vallée voisine de l'Ellé, en Morbihan. Entre Pont Callec et Pont-Scorff, des secteurs successifs offrent une grande diversité de parcours peuplés de belles truites fario sauvages.\n\nLa taille moyenne des truites y est généralement supérieure à la majorité des cours d'eau bretons. Pêche possible en sèche, nymphe à vue ou au fil. À partir de mi-mai jusqu'à fin de saison, de beaux spécimens sortent s'alimenter en surface.`,
          pills: ['Sèche', 'Nymphe au fil', 'Nymphe à vue'] },
        { tag: 'Finistère (29)', titre: 'L\'Ellé et l\'Isole', img: '/images/truite-riviere-elle.jpg',
          texte: `Le secteur de Quimperlé offre un réseau hydrographique vaste avec plusieurs rivières de caractère. L'Ellé propose de beaux secteurs en amont pour la truite en sèche et en nymphe.\n\nL'Isole, affluent principal, est un petit paradis pour la pêche de la truite dans une vallée encaissée et sauvage. Grande diversité de paysages et de profils de berges, synonymes d'une pêche variée et de qualité tout au long de la saison.`,
          pills: ['Sèche', 'Nymphe', 'Streamer'] },
        { tag: 'Finistère (29) · Quimper', titre: 'Les rivières de Quimper — Odet, Jet, Steïr', img: '/images/truite-riviere-odet.jpg',
          texte: `Quimper signifie « confluent » en breton. L'Odet reçoit le Steïr à l'ouest et le Jet à l'est — trois rivières aux profils, largeurs et longueurs bien différents, pour une pêche variée toute la saison.\n\nOdet : Le parcours du Stangala offre un cours très courant avec de nombreux blocs, parfait pour la sèche en eaux rapides et la nymphe au fil. Jet : Petite rivière de plaine avec trous profonds accueillant de belles truites et parfois des saumons. Steïr : Rivière mixte avec beaux courants et jolies fosses pour une pêche très variée.`,
          pills: ['Sèche', 'Nymphe au fil', 'Tandem'] },
        { tag: 'Finistère (29)', titre: 'L\'Aven et le Ster-Goz', img: '/images/truite-riviere-aven.jpg',
          texte: `Petite rivière de charme typique des fonds de vallée bretons, l'Aven s'écoule entre Scaër et Pont-Aven. Rapide du fait de sa pente élevée, elle offre des profils très variés avec de belles truites fario sauvages dans chaque recoin.\n\nLa pêche en sèche y est reine dès avril. La nymphe au fil permet de prendre de nombreuses truites lorsqu'elles sont moins actives en surface. Le Ster-Goz, affluent principal, est très intéressant pour la pêche en émergente et en nymphe.`,
          pills: ['Sèche', 'Émergente', 'Nymphe au fil'] },
      ],
    }),
    cta({ titre: 'Réservez votre sortie truite', texte: 'Disponibilités et tarifs sur demande · Réponse sous 24h · Mi-mars à mi-septembre' }),
  ]
  await importPrestation('peche-de-la-truite-a-la-mouche-en-bretagne', pb)
}

async function importReservoir() {
  const pb = [
    hero({
      eyebrow: 'Bretagne · Jean-Baptiste Vidal',
      titre: 'Pêche de la truite en Réservoir',
      sousTitre: 'Sèche, noyée, nymphe, chiro, streamer, boobies et blobs : une pêche technique et passionnante, toute l\'année.',
      btnMaterielLien: '/materiel-mouche-reservoir', btnMaterielLabel: 'Matériel réservoir',
    }),
    intro({
      texte: `La Bretagne dispose de plusieurs eaux closes pour rechercher la truite toute l'année mais également et surtout à l'automne et durant l'hiver lorsque les rivières de premières catégories sont fermées.\n\nDeux grands lacs : le réservoir St Michel (450 ha), classé grand lac intérieur, le Lac du Drennec (210 ha), permettent de pêcher la truite arc-en-ciel stockée durant une grande partie de l'année.\n\nLe réservoir de Saint Connan dit de l'Etang Neuf dans les côtes d'Armor ainsi que le réservoir Parc Ar Bihan permettent de pratiquer la pêche en lac toute l'année et sont empoissonnés régulièrement.\n\nUne bonne façon de continuer à pratiquer notre loisir tout en se perfectionnant au lancer et d'apprendre de nouvelles techniques. Pêche en sèche, noyée, nymphe ou tandem, pêche au "chiro", mais aussi streamer, boobies et blobs. Tout est possible.`,
      niveau: 'Initiation et perfectionnement · Débutant, initié ou expert',
      saison: 'Toute l\'année · Principalement d\'octobre à mars',
      tarif:  '320 € · 1 pers. / 200 € · 2 pers. / 150 € · 3 pers.',
      lignesSupp: [
        { label: 'Horaires', valeur: '9h30 à 18h00 · Soit 7 à 8 heures de guidage' },
        { label: 'Lieux', valeur: 'Etang Neuf / Saint Connan (22) · Parc Ar Bihan (56)' },
        { label: 'Note', valeur: 'Permis journalier non inclus (15 à 23 €)' },
      ],
      boutons: [{ texte: 'Réserver', lien: '/contact' }],
    }),
    progCartes({
      eyebrow: 'Au programme', titre: 'Stage Pêche de la truite à la mouche en Réservoir',
      intro: 'À titre indicatif. Me contacter pour plus de détails et personnaliser votre stage.',
      colonnes: '3',
      items: [
        { titre: 'Mouches et invertébrés aquatiques', description: 'Connaissance des mouches et invertébrés aquatiques : chironomides, sedges, daphnies, gammares. Savoir reconnaître les émergences du moment pour choisir la mouche adaptée.' },
        { titre: 'Apprentissage du lancer', description: 'Apprentissage et amélioration du lancer : lancer droit, roulé, revers, simple et double traction. Le réservoir demande souvent de lancer à longue distance, la technique est primordiale.' },
        { titre: 'Techniques de pêche réservoir', description: 'Toutes les techniques dites "réservoir" selon vos souhaits et votre niveau : pêche en noyée, au streamer, en sèche, nymphe, pêche au chiro, boobies et blobs. Tout est possible.' },
      ],
    }),
    await selection({
      eyebrow: 'Les plans d\'eau', titre: 'Nos réservoirs en Bretagne',
      styleCorps: 'sand', fond: 'white',
      items: [
        { tag: 'Côtes-d\'Armor (22)', titre: 'Le réservoir de Saint Connan — l\'Etang Neuf', img: '/images/reservoir-etang-neuf.avif',
          texte: `Le réservoir de Saint Connan, d'une superficie de 9 hectares dans un cadre sauvage et boisé, aux sources de la rivière Trieux, est un très bel endroit pour pratiquer la pêche de la truite en lac toute l'année.\n\nRégulièrement stocké en truite arc-en-ciel de belle taille, la pêche est à la fois technique et intéressante. J'y pêche et y guide principalement à l'automne et durant l'hiver lorsque les rivières de premières catégories sont fermées.\n\nIl est possible de pratiquer la pêche depuis les nombreux pontons aménagés mais aussi en float tube ou en louant une barque (6 disponibles).`,
          infos: [
            { label: 'Surface', valeur: '9 hectares' },
            { label: 'Accès ponton / float tube', valeur: 'Oui · Droit mise à l\'eau float tube : 2 €' },
            { label: 'Location de barque', valeur: '6 barques disponibles' },
            { label: 'Inclus dans le permis', valeur: 'Accès à la salle "pêche"' },
            { label: 'Période mouche uniquement', valeur: '15 juin au 15 octobre' },
            { label: 'Permis journalier', valeur: '23 €' },
          ]},
        { tag: 'Morbihan (56)', titre: 'Le réservoir de Colpo — Parc Ar Bihan', img: '/images/reservoir-parc-ar-bihan.avif',
          texte: `Le réservoir de Colpo ou du Parc Ar Bihan, créé en 2018, est un petit plan d'eau de 1,7 hectares, qui permet de pratiquer la pêche de la truite en lac toute l'année.\n\nLa pêche se pratique uniquement du bord dans des eaux claires qui permettent la pêche à vue sur les bordures. Les éclosions de chironomes sont fréquentes et c'est une pêche technique qui doit être pratiquée en employant de longs bas de ligne et pointes fines.\n\nBien entendu, il est possible de pratiquer toutes les autres techniques dites "réservoir" : pêche en noyée, au streamer et également aux boobies et blobs.`,
          infos: [
            { label: 'Surface', valeur: '1,7 hectare' },
            { label: 'Ouverture', valeur: 'Créé en 2018 · Toute l\'année' },
            { label: 'Accès float tube / barque', valeur: 'Pêche uniquement du bord' },
            { label: 'Particularité', valeur: 'Eaux claires · Pêche à vue' },
            { label: 'Département', valeur: 'Morbihan (56)' },
            { label: 'Permis journalier', valeur: '15 €' },
          ]},
      ],
    }),
    cta({ titre: 'Réservez votre stage réservoir', texte: '320 € / 1 pers. · 200 € / 2 pers. · 150 € / 3 pers. · Permis journalier non inclus · Réponse sous 24h' }),
  ]
  await importPrestation('peche-de-la-truite-en-reservoir', pb)
}

async function importMasterclassReservoir() {
  const pb = [
    hero({
      eyebrow: 'Masterclass · Pêche en réservoir',
      titre: 'Master Class — Techniques de pêche en réservoir',
      sousTitre: 'avec Grégoire Juglaret, Champion du Monde 2025, et Jean-Baptiste Vidal',
      btnReserverTexte: 'Réserver ma place', btnReserverLien: '/contact',
      btnMaterielLien: '/materiel-mouche-reservoir', btnMaterielLabel: 'Matériel réservoir',
    }),
    intro({
      texte: `En début 2026, je propose une Master Class à mes stagiaires afin de leur faire bénéficier d'un stage très pointu sur les techniques de pêche en réservoir.\n\nL'idée est de mutualiser les compétences d'un expert et les miennes pour offrir un contenu très technique sur la pêche en eaux closes. Un stage à ne rater sous aucun prétexte car l'acquisition de compétences est juste hors norme et permet de progresser bien plus rapidement.\n\nVenez profiter des compétences de professionnels lors d'un stage de 2 journées au bord du magnifique réservoir de l'Étang Neuf dans les Côtes d'Armor. Plan d'eau privatisé de 9 hectares, barques et pontons aménagés, salle chauffée et WC.`,
      intervenant: {
        avatar: 'GJ',
        nom:    'Grégoire Juglaret',
        titre:  'Champion du Monde de pêche à la mouche par équipe et individuel 2025 · Champion de France réservoir 2025',
        bio:    'Notre champion du monde vous délivrera tous ses secrets en vous expliquant en détail toutes les techniques de pêche en réservoir : pêche en washing line ou corde à linge, pêche soie plongeante S5/S7 aux boobies et autres mouches de fond.',
      },
      lignesSupp: [
        { label: 'Dates', valeur: '16 & 17 Janvier 2026' },
        { label: 'Participants', valeur: '4 personnes par session' },
        { label: 'Niveau', valeur: 'Débutants et confirmés' },
        { label: 'Lieu', valeur: 'Etang Neuf / Saint Connan (22)' },
        { label: 'Inclus', valeur: 'Hébergement, pension complète, privatisation du lac' },
      ],
      tarif: '700 € / pers.',
      boutons: [{ texte: 'Réserver ma place', lien: '/contact' }],
    }),
    progTexte({
      eyebrow: 'Programme', titre: 'Programme du stage',
      colonnes: [
        { label: 'Journée 1', style: 'normal', items: [
          { texte: 'Accueil des participants en salle pêche au bord du lac' },
          { texte: 'Session théorique sur les techniques de pêche en réservoir avec Grégoire Juglaret' },
          { texte: 'Atelier lancer sur les bords du plan d\'eau en individuel' },
          { texte: 'Mise en pratique et pêche sur le réservoir encadrée par les deux intervenants' },
          { texte: 'Soirée : débriefing, réponses aux questions, programme J2' },
          { texte: 'Montage de mouches pour le réservoir en soirée avec Grégoire' },
        ]},
        { label: 'Journée 2', style: 'normal', items: [
          { texte: 'Session théorique complémentaire si besoin' },
          { texte: 'Révision des lancers' },
          { texte: 'Mise en pratique et pêche : chaque participant passera du temps avec les deux intervenants' },
          { texte: 'Débriefing final et réponses aux questions' },
          { texte: 'Fin du stage et départ des participants' },
        ]},
        { label: 'Techniques enseignées', style: 'normal', items: [
          { texte: 'Explication détaillée du matériel pour le réservoir' },
          { texte: 'Perfectionnement au lancer en individuel' },
          { texte: 'Noyée, nymphe, streamer, sèche, bung, boobies' },
          { texte: 'Pêche en washing line / corde à linge' },
          { texte: 'Soie plongeante S5/S7 aux mouches de fond' },
        ]},
        { label: 'Inclus / Non inclus', style: 'check', items: [
          { texte: 'Hébergement & restauration pension complète', inclus: true },
          { texte: 'Privatisation du lac, barques et salle pêche', inclus: true },
          { texte: 'Encadrement par Grégoire Juglaret & JBV', inclus: true },
          { texte: 'Assurance RC (à prévoir)', inclus: false },
          { texte: 'Permis de pêche national', inclus: false },
          { texte: 'Boissons alcoolisées', inclus: false },
        ]},
      ],
    }),
    await texteImage({
      texte: `Le stage se déroule au bord de l'Étang Neuf sur la commune de Saint-Connan dans les Côtes d'Armor (22). Plan d'eau de 9 hectares alimenté par deux tributaires dont la rivière du Trieux, équipé de 9 pontons aménagés pour la pêche.\n\nNous avons réservé 3 gîtes authentiques situés au bord du lac pour que tous les participants puissent loger ensemble et profiter de moments conviviaux en dehors de la pêche.\n\n116 km de St Malo · 119 km de Quimper · 126 km de Rennes · 132 km de Brest · 233 km de Nantes · 475 km de Paris`,
      img: '/images/masterclass-reservoir-3.jpg', alt: 'Étang Neuf Saint-Connan — réservoir du stage masterclass',
      position: 'right', fond: 'white',
    }),
    await galerie(['/images/masterclass-reservoir-1.jpg','/images/masterclass-reservoir-2.jpg','/images/masterclass-1.jpg']),
    cta({ titre: 'Réservez votre place', texte: 'Places limitées à 4 participants · 700 € / pers. · Hébergement inclus · Réponse sous 24h.' }),
  ]
  await importPrestation('master-class-peche-en-reservoir', pb)
}

async function importMasterclassNymphe() {
  const pb = [
    hero({
      eyebrow: 'Masterclass · Nymphe au fil',
      titre: 'Master Class — Pêche en nymphe au fil',
      sousTitre: 'avec Stéphane Legentilhomme, guide et compétiteur, et Jean-Baptiste Vidal',
      btnReserverTexte: 'Réserver ma place', btnReserverLien: '/contact',
      btnMaterielLien: '/materiel-mouche-truite', btnMaterielLabel: 'Matériel truite',
    }),
    intro({
      texte: `En début de saison 2026, je propose deux Master Class à mes stagiaires afin de leur faire bénéficier d'un stage très pointu sur les techniques de pêche en nymphe au fil.\n\nL'idée est de mutualiser les compétences d'un expert et les miennes pour offrir un contenu très technique. Un stage à ne rater sous aucun prétexte car l'acquisition de compétences est juste hors norme et permet de progresser bien plus rapidement.\n\nVenez profiter des compétences de professionnels lors d'un stage de 2 journées au bord de l'Odet à Quimper. Deux sessions vous sont proposées en mars 2026, 4 participants par session pour un encadrement optimal.`,
      intervenant: {
        avatar: 'SL',
        nom:    'Stéphane Legentilhomme',
        titre:  'Guide de pêche dans l\'Ariège · Compétiteur pêche à la mouche',
        bio:    'Stéphane vous enseignera sa méthode de pêche en nymphe au fil et ses approches dans cette technique : confection du bas de ligne, notion d\'insertion, tenue de ligne, dérives efficaces, choix des nymphes, optimisation du placement et des déplacements en rivière.',
      },
      lignesSupp: [
        { label: 'Session 1', valeur: '20 & 21 Mars 2026' },
        { label: 'Session 2', valeur: '22 & 23 Mars 2026' },
        { label: 'Participants', valeur: '4 personnes par session' },
        { label: 'Niveau', valeur: 'Débutants et confirmés' },
        { label: 'Lieu', valeur: 'L\'Odet · Quimper (29)' },
        { label: 'Inclus', valeur: 'Hébergement, pension complète' },
      ],
      tarif: '800 € / pers.',
      boutons: [{ texte: 'Réserver ma place', lien: '/contact' }],
    }),
    progTexte({
      eyebrow: 'Programme', titre: 'Programme du stage',
      colonnes: [
        { label: 'Journée 1', style: 'normal', items: [
          { texte: 'Accueil des participants aux chambres d\'hôtes en soirée' },
          { texte: 'Session théorique sur les techniques de pêche en nymphe avec Stéphane Legentilhomme' },
          { texte: 'Atelier lancer sur les bords de l\'Odet' },
          { texte: 'Mise en pratique et pêche en rivière encadrée par les deux intervenants' },
          { texte: 'Soirée : débriefing, réponses aux questions, programme J2' },
          { texte: 'Présentation du montage de nymphes par Stéphane' },
        ]},
        { label: 'Journée 2', style: 'normal', items: [
          { texte: 'Session théorique complémentaire si besoin' },
          { texte: 'Révision des points importants de la veille' },
          { texte: 'Mise en pratique et pêche : chaque participant passera du temps avec les deux intervenants' },
          { texte: 'Débriefing final et réponses aux questions' },
          { texte: 'Fin du stage et départ des participants' },
        ]},
        { label: 'Techniques enseignées', style: 'normal', items: [
          { texte: 'Confection du bas de ligne et de ses pointes' },
          { texte: 'Notion d\'insertion des nymphes' },
          { texte: 'Tenue de ligne et dérives efficaces' },
          { texte: 'Choix des nymphes selon la saison et les postes' },
          { texte: 'Optimiser son placement et ses déplacements en rivière' },
          { texte: 'Mise à l\'épuisette et stratégie de prospection' },
        ]},
        { label: 'Inclus / Non inclus', style: 'check', items: [
          { texte: 'Hébergement & restauration pension complète', inclus: true },
          { texte: 'Encadrement par Stéphane Legentilhomme & JBV', inclus: true },
          { texte: 'Chambre individuelle pour chaque participant', inclus: true },
          { texte: 'Assurance RC (à prévoir)', inclus: false },
          { texte: 'Permis de pêche national', inclus: false },
          { texte: 'Boissons alcoolisées', inclus: false },
        ]},
      ],
    }),
    await texteImage({
      texte: `Le stage se déroule au bord de l'Odet sur la commune de Quimper dans le Finistère (29), sur un secteur de gorges offrant un parcours diversifié parfait pour pratiquer la pêche en nymphe au fil.\n\nLes participants sont logés dans une charmante chambre d'hôtes à Elliant dans le Finistère, à 300 m de l'Odet. Des chambres individuelles confortables et spacieuses avec une pièce commune chaleureuse.\n\n72 km de Brest · 122 km de Vannes · 222 km de Rennes · 229 km de St Malo · 573 km de Paris`,
      img: '/images/masterclass-nymphe-3.jpg', alt: 'L\'Odet à Quimper — rivière du stage nymphe au fil',
      position: 'right', fond: 'white',
    }),
    await galerie(['/images/masterclass-nymphe-1.jpg','/images/masterclass-nymphe-2.jpg','/images/masterclass-nymphe-4.jpg','/images/masterclass-nymphe-5.jpg','/images/masterclass-nymphe-6.jpg','/images/truite-fario.jpg']),
    cta({ titre: 'Places limitées, 4 participants par session', texte: 'Deux sessions disponibles en mars 2026, réservation conseillée.' }),
  ]
  await importPrestation('master-class-nymphe-au-fil', pb)
}

async function importSpey() {
  const speyImages = [
    '/images/spey-s1.avif','/images/spey-s2.avif','/images/spey-s3.avif','/images/spey-s4.avif','/images/spey-s5.avif',
    '/images/spey-s6.avif','/images/spey-s7.avif','/images/spey-s8.avif','/images/spey-s9.avif','/images/spey-s10.avif',
    '/images/spey-s11.avif','/images/spey-s12.avif','/images/spey-s13.avif','/images/spey-s14.avif','/images/spey-s15.avif',
    '/images/spey-s16.avif','/images/spey-s17.avif','/images/spey-s18.avif','/images/spey-s19.avif',
    '/images/spey-julien-1.jpg','/images/spey-julien-2.png','/images/spey-julien-3.jpg','/images/spey-julien-4.jpg','/images/spey-julien-5.jpg',
  ]
  const pb = [
    hero({
      eyebrow: 'Spey Cast · Lancer à la mouche',
      titre: 'Stage de Spey Cast et cours de lancer',
      sousTitre: 'Canne à une main · Switch · Deux mains : maîtrisez l\'art du lancer sans dégagement',
      btnMaterielLien: '/materiel-mouche-migrateur', btnMaterielLabel: 'Matériel migrateurs',
    }),
    intro({
      texte: `Bien qu'encore peu développé en France, le Spey Casting devient de plus en plus populaire sur nos rivières françaises. Principalement utilisé pour la pêche des poissons migrateurs, cet art de lancer une mouche à longue distance sans le moindre effort et avec peu de dégagement nécessite un peu de pratique et de technique.\n\nLe Spey casting est une technique de lancer qui ne s'applique pas uniquement pour la pêche des migrateurs. Elle peut être employée pour pêcher la truite, l'ombre, ou tout autre espèce. Elle est très pratique pour changer de direction en un seul lancer et geste !\n\nAyant personnellement pratiqué intensément à l'étranger lors de mes saisons et voyages, je vous propose de bénéficier de mon expérience afin de vous initier à cette technique ou de perfectionner vos acquis.\n\nQue ce soit en groupe ou en cours particulier, je vous proposerai différentes formules adaptées à vos besoins : pour une journée, un week-end, ou une formule par séance, sur une rivière du département ou près de chez vous.`,
      niveau: 'Débutants et confirmés',
      format: 'Journée · Week-end · Cours particuliers · En groupe',
      tarif:  '300 € · 1 pers. / 200 € · 2 pers. / 160 € · 3 pers.',
      lignesSupp: [{ label: 'Programme', valeur: 'Single Spey · Double Spey · Snap T · Snake Roll · Roulé' }],
      boutons: [{ texte: 'Réserver', lien: '/contact' }],
    }),
    await carrousel(speyImages, 'L\'art et l\'efficacité du Spey Cast'),
    progTexte({
      eyebrow: 'Programme', titre: 'Au programme',
      colonnes: [
        { label: 'Lancers & techniques', style: 'normal', items: [
          { texte: 'Les différents lancers Spey : Single et Double Spey, Snap T, Snake Roll, Roulé' },
          { texte: 'Matériel pour le Spey Cast (cannes, soies, polyleader)' },
          { texte: 'Lancer avec la main opposée' },
          { texte: 'Soie plongeante et pointe plongeante' },
        ]},
      ],
    }),
    cta({ titre: 'Réservez votre sortie', texte: 'Disponibilités et tarifs sur demande, réponse sous 24h.' }),
  ]
  await importPrestation('stage-spey-cast-et-cours-de-lancer', pb)
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXÉCUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('🚀 Import des prestations vers Sanity\n')
  await importInitiation()
  await importBrochet()
  await importInitiationBar()
  await importBarPerfectionnement()
  await importBarVue()
  await importBarBateau()
  await importCoaching()
  await importAlose()
  await importTruite()
  await importReservoir()
  await importMasterclassReservoir()
  await importMasterclassNymphe()
  await importSpey()
  console.log('\n✅ Import terminé — toutes les prestations ont été mises à jour.')
  console.log('   Déclenche un rebuild pour voir les changements sur le site.')
}

main().catch(err => {
  console.error('❌ Erreur :', err.message)
  process.exit(1)
})
