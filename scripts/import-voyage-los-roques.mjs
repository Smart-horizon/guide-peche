/**
 * import-voyage-los-roques.mjs
 * Importe le pagebuilder complet de la page Los Roques dans Sanity.
 * 15 sections dans l'ordre de la page originale.
 * Usage : node scripts/import-voyage-los-roques.mjs
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

const PUBLIC_DIR = path.resolve(process.cwd(), 'public', 'images')

// ── Utilitaires ───────────────────────────────────────────────────────────────
let _k = 0
const key = (p = 'k') => `${p}${++_k}`

const imageCache = new Map()
async function img(localPath, alt = '') {
  if (!localPath) return null
  const fullPath = path.join(PUBLIC_DIR, localPath.replace(/^\/images\//, ''))
  if (imageCache.has(fullPath)) {
    const ref = imageCache.get(fullPath)
    return alt ? { ...ref, alt } : ref
  }
  try {
    const buffer = await fs.readFile(fullPath)
    const ext  = path.extname(fullPath).slice(1).toLowerCase()
    const mime = { avif:'image/avif', jpg:'image/jpeg', jpeg:'image/jpeg', png:'image/png', webp:'image/webp' }[ext] || 'image/jpeg'
    const asset = await client.assets.upload('image', buffer, { filename: path.basename(fullPath), contentType: mime })
    const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    imageCache.set(fullPath, ref)
    console.log(`  ✓ img ${path.basename(fullPath)}`)
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

// ── Builders ──────────────────────────────────────────────────────────────────

function hero(d) {
  return {
    _type: 'sectionHero', _key: key('hero'),
    eyebrow: d.eyebrow || '', titre: d.titre,
    sousTitre: d.sousTitre || '', hauteur: 'full',
    btnReserverTexte: d.btnTexte || 'Réserver un séjour',
    btnReserverLien: '/contact', btnTelTexte: '06 87 30 34 56',
  }
}

function stats(items) {
  return {
    _type: 'sectionStats', _key: key('stats'), fond: 'dark',
    stats: items.map(s => ({ _type: 'stat', _key: key('st'), nombre: s.num, label: s.label })),
  }
}

function intro(d) {
  return {
    _type: 'sectionIntro', _key: key('intro'), fond: 'white',
    texte: blocks(d.texte), showInfoCard: true,
    niveau: '', format: '', saison: d.saison || '', tarif: d.tarif || '', duree: d.duree || '',
    lignesSupp: (d.lignesSupp || []).map(l => ({ _type: 'ligneInfo', _key: key('li'), label: l.label, valeur: l.valeur })),
    boutons: (d.boutons || []).map(b => ({ _type: 'bouton', _key: key('btn'), texte: b.texte, lien: b.lien })),
  }
}

async function texteImage(d) {
  return {
    _type: 'sectionTexteImage', _key: key('ti'),
    eyebrow: d.eyebrow || '', titre: d.titre || '',
    texte: blocks(d.texte),
    image: d.img ? await img(d.img, d.alt || '') : null,
    imagePosition: d.position || 'right',
    fond: d.fond || 'white',
  }
}

async function grilleCartes(d) {
  return {
    _type: 'sectionProgrammeCartes', _key: key('progc'),
    eyebrow: d.eyebrow || '', titre: d.titre || '', intro: d.intro || '',
    styleMisePage: d.style || null,
    image: d.img ? await img(d.img, d.alt || d.titre || '') : null,
    colonnes: d.colonnes || '3',
    note: d.note || '', btnTexte: d.btnTexte || '', btnLien: d.btnLien || '',
    fond: d.fond || 'sand',
    items: (d.items || []).map(item => ({
      _type: 'carte', _key: key('carte'),
      titre: item.titre, sousTitre: item.sousTitre || '', description: item.description || '',
    })),
  }
}

async function programme(d) {
  const etapes = await Promise.all((d.etapes || []).map(async e => ({
    _type: 'etape', _key: key('etape'),
    titre: e.titre, tag: e.tag || '',
    texte: blocks(e.texte),
    image: e.img ? await img(e.img, e.alt || e.titre) : null,
  })))
  return { _type: 'sectionProgramme', _key: key('prog'), eyebrow: d.eyebrow || 'Déroulement', titre: d.titre || '', intro: d.intro || '', etapes, fond: 'sand' }
}

function progTexte(d) {
  return {
    _type: 'sectionProgrammeTexte', _key: key('progt'),
    eyebrow: d.eyebrow || '', titre: d.titre || '', intro: d.intro || '',
    fond: d.fond || 'sand',
    colonnes: (d.colonnes || []).map(col => ({
      _type: 'colonne', _key: key('col'), label: col.label, style: col.style || 'normal',
      items: (col.items || []).map(item => ({ _type: 'item', _key: key('item'), texte: item.texte, inclus: item.inclus !== false })),
    })),
  }
}

async function galerie(imgs) {
  const photos = (await Promise.all(imgs.map(i => img(i)))).filter(Boolean)
  return { _type: 'sectionGalerie', _key: key('gal'), photos, colonnes: '3', fond: 'dark' }
}

function dates(d) {
  return {
    _type: 'sectionDates', _key: key('dates'),
    eyebrow: d.eyebrow || '', titre: d.titre, intro: d.intro || '',
    sejours: (d.sejours || []).map(s => ({
      _type: 'sejour', _key: key('sej'),
      dates: s.dates, destination: s.destination || '', description: s.description || '',
      prix: s.prix || '', placesTotal: s.placesTotal || 4, placesDispo: s.placesDispo ?? 4,
      statut: s.statut || 'disponible',
    })),
    btnTexte: d.btnTexte || 'Me contacter pour réserver',
    btnLien: d.btnLien || '/contact',
    fond: d.fond || 'dark',
  }
}

function texte(d) {
  return { _type: 'sectionTexte', _key: key('txt'), texte: blocks(d.texte), fond: d.fond || 'sand' }
}

function cta(d) {
  return {
    _type: 'sectionCta', _key: key('cta'),
    titre: d.titre, texte: d.texte || '',
    btn1Texte: d.btn1Texte || 'Me contacter', btn1Lien: d.btn1Lien || '/contact',
    btn2Texte: d.btn2Texte || '06 87 30 34 56', btn2Lien: d.btn2Lien || 'tel:0687303456',
    style: 'dark',
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOS ROQUES — 15 SECTIONS DANS L'ORDRE DE LA PAGE ORIGINALE
// ═══════════════════════════════════════════════════════════════════════════════

async function buildLosRoques() {
  return [

    // 1. HERO
    {
      ...hero({ eyebrow: 'Voyage de pêche · Los Roques · Venezuela', titre: 'Los Roques, Venezuela', sousTitre: 'Parc national des Caraïbes, 3ème destination mondiale pour le bonefish. Bonefish, tarpon, permit et plus de 12 espèces capturables à la mouche.', btnTexte: 'Réserver un séjour' }),
      image: await img('/images/E16.avif', 'Los Roques Venezuela — pêche à la mouche'),
    },

    // 2. STATS
    stats([
      { num: 'Janv. & Fév.', label: 'Séjours accompagnés 2026' },
      { num: '7 nuits',      label: 'Durée du séjour' },
      { num: '6,5 jours',    label: 'De pêche guidée' },
      { num: '12 espèces',   label: 'Capturables à la mouche' },
    ]),

    // 3. INTRO + INFO CARD
    intro({
      texte: `Los Roques est une destination de pêche à la mouche en mer exotique d'exception. Situé dans les Caraïbes, à 170 km au nord de Caracas, cet archipel de 221 000 hectares est classé Parc National depuis 1972. Ses eaux ne connaissent pas de pêche commerciale intensive — une des raisons pour lesquelles la densité de poissons y est remarquable.

Ce sont 360 îlots de sable blanc, de mangroves et de flats peu profonds, offrant un terrain de jeu illimité pour la pêche à vue. Le bonefish est l'espèce emblématique — régulièrement classé dans le top 3 mondial. Mais c'est aussi une destination multi-espèces rare : tarpon, permit, carangues, barracuda, poissons perroquets, balistes... Jusqu'à 12 espèces capturables dans la même journée.

J'emmène des groupes sur place lors de séjours encadrés en janvier et février, les meilleures semaines pour combiner bonefish en tailing et belles chances sur le tarpon.`,
      saison:  `Toute l'année — séjours accompagnés en janv. et fév.`,
      tarif:   'Sur devis — contactez-moi',
      duree:   '7 nuits / 6,5 jours de pêche',
      lignesSupp: [
        { label: 'Hébergement', valeur: 'Posada à Gran Roque, pension complète' },
        { label: 'Guide',       valeur: '1 guide pour 2 pêcheurs' },
        { label: 'Vol interne', valeur: 'Caracas → Los Roques inclus (40 min)' },
        { label: 'Partenaire',  valeur: 'DHD Laika — Adrien De Villeneuve' },
      ],
      boutons: [{ texte: 'Réserver un séjour', lien: '/contact' }],
    }),

    // 4. HÉBERGEMENT — Les Posadas de Gran Roque
    await texteImage({
      eyebrow:  'Gran Roque',
      titre:    'Les Posadas de Gran Roque',
      texte:    `Loin du tourisme de masse, des hôtels de luxe et des plages bétonnées. Gran Roque est un charmant petit village de pêcheurs où règne une grande tranquillité. Nous travaillons avec plusieurs posadas de très bon standing, souvent tenues par des Italiens très accueillants.

La restauration, à base de produits de la mer et de pasta, est vraiment excellente. Pension complète avec hébergement, petit-déjeuner, déjeuner et dîner inclus. La qualité et l'authenticité ont été privilégiées.

Gran Roque accueille chaque année des visiteurs du monde entier pour ses belles plages, mais aussi pour le kite-surf, la plongée, et surtout la pêche.`,
      img:      '/images/E1.avif',
      alt:      'Posada de Gran Roque — Los Roques Venezuela',
      position: 'right',
      fond:     'sand',
    }),

    // 5. ARCHIPEL — Un décor de carte postale
    await texteImage({
      eyebrow:  `L'Archipel`,
      titre:    'Un décor de carte postale, des poissons partout',
      texte:    `Imaginez un décor paradisiaque où les camaïeux de bleu et de vert se perdent à l'infini… Des bancs de sable blanc immaculés, des lagunes d'eau cristalline et des flats peu profonds à perte de vue.

Chaque jour, nous partons en bateau vers un îlot différent de l'archipel. Selon les conditions, nous pêcherons à pied sur les flats en recherchant le bonefish en tailing, ou depuis le bateau pour traquer tarpon, permit et carangues en eau plus profonde.

La particularité de Los Roques : les bonefish chassent souvent dans les bancs d'alevins. Nous les recherchons avec de petits clousers minnow ou gummy, et quand les conditions s'y prêtent, le Grand Slam est possible dans la même journée.`,
      img:      '/images/E3.avif',
      alt:      'Los Roques — îlot et lagon',
      position: 'left',
      fond:     'white',
    }),

    // 6. SAISONS — Pêchable toute l'année
    await grilleCartes({
      style:    'photo-gauche',
      eyebrow:  'MÉTÉO & CONDITIONS',
      titre:    `Pêchable toute l'année`,
      intro:    `Il est possible de pêcher à Los Roques toute l'année grâce à sa situation géographique, proche de l'équateur. Les cyclones y sont rares, les alizés fréquents.`,
      img:      '/images/E4.avif',
      alt:      'Pêche à la mouche à Los Roques — saison',
      colonnes: '2',
      fond:     'dark',
      note:     'Nos séjours accompagnés sont planifiés en Janvier/Février 2026, conditions optimales pour une session multi-espèces avec de belles chances sur le tarpon.',
      items: [
        { titre: 'Novembre → Avril', description: `Marées hautes avec peu de marnage. Idéal pour les espèces pélagiques : tarpons, permits, carangues. Bonefish présents et actifs, moins souvent en tailing visible.` },
        { titre: 'Mai → Octobre',    description: `Marées basses, de nombreuses situations de pêche du bonefish en tailing dans très peu d'eau. Les autres espèces restent présentes et recherchables dans la même journée.` },
      ],
    }),

    // 7. GUIDES — JBV + guide local
    await texteImage({
      eyebrow:  'Encadrement',
      titre:    `Jean-Baptiste Vidal + guide local d'exception`,
      texte:    `Nous avons choisi de vous emmener sur les meilleurs spots de l'archipel en compagnie de l'un des meilleurs guides du secteur. Il parle bien l'anglais et se fait toujours une joie de vous faire prendre de nouvelles espèces.

Je prendrai en charge la partie pêche des flats, déposés chaque jour sur une des îles avoisinantes pour rechercher surtout le bonefish, mais aussi carangues et d'autres espèces. Étant trilingue, je m'occupe également de toute la logistique et organisation sur place.

Formule 1 guide pour 2 pêcheurs, ou single skiff sur demande.`,
      img:      '/images/E5.avif',
      alt:      'Jean-Baptiste Vidal — guide Los Roques',
      position: 'right',
      fond:     'sand',
    }),

    // 8. ESPÈCES — Multi-espèces unique
    await grilleCartes({
      style:    'photo-haut',
      eyebrow:  'BONEFISH · TARPON · PERMIT · CARANGUES · +',
      titre:    'Une destination multi-espèces unique',
      intro:    `En plus de la bonne densité de gros bonefish, vous pourrez capturer à la mouche une douzaine d'espèces de poissons, dont bien entendu le tarpon et le permit. Notre guide est également spécialisé dans la recherche des poissons perroquets et balistes (trigger fish).`,
      img:      '/images/E6.avif',
      alt:      'Bonefish capturé sur les flats de Los Roques',
      colonnes: '3',
      fond:     'dark',
      items: [
        { titre: 'Le Bonefish',    sousTitre: 'ESPÈCE STAR · TOP 3 MONDIAL',       description: `Des bonefish actifs en tailing sur les flats peu profonds, la spécialité de Los Roques. De très bons gabarits, souvent chassant dans les bancs d'alevins. Petits clousers minnow et crevettes, soie #8 (voire #9 si le vent est fort).` },
        { titre: 'Tarpon · Permit', sousTitre: 'GRAND SLAM POSSIBLE',              description: `Les canaux plus profonds tiennent du tarpon toute l'année. Le permit est présent sur les flats et dans les passes. Le Grand Slam (bonefish, tarpon, permit dans la même journée) est une réelle possibilité à Los Roques.` },
        { titre: 'Les Bonus',      sousTitre: 'CARANGUES · BARRACUDA · SNOOK · +', description: `Carangues à œil de cheval, hippos, pompano, maquereaux espagnols, bonites, snook, barracuda, red snapper, poissons perroquets, balistes... La liste est longue.` },
      ],
    }),

    // 9. MATÉRIEL — Équipement recommandé
    await grilleCartes({
      eyebrow:  'ÉQUIPEMENT',
      titre:    'Le matériel recommandé',
      intro:    `L'idéal est de prévoir trois cannes pour couvrir toutes les situations. Une fiche matériel détaillée est disponible en téléchargement.`,
      colonnes: '4',
      fond:     'white',
      items: [
        { titre: '#8',           sousTitre: 'Bonefish',          description: 'Soie de 8 (voire 9 si vent fort) pour la pêche à vue du bonefish sur les flats peu profonds.' },
        { titre: '#9/10',        sousTitre: 'Permit & Carangues', description: 'Canne 9/10 pour le permit et les carangues. Équipez un ensemble avec un popper pour les gros barracudas.' },
        { titre: '#10/11',       sousTitre: 'Tarpon',             description: 'Canne 10/11 indispensable pour le tarpon. Moulinets robustes avec bon frein, 150 m+ de backing 30 lb.' },
        { titre: 'Bas de ligne', sousTitre: 'Fluorocarbone',     description: '12–20 lb pour bonefish · 20–25 lb pour permit · 40–80+ lb pour tarpon et autres espèces.' },
      ],
    }),

    // 10. PROGRAMME — Déroulement du séjour
    await programme({
      eyebrow: 'Programme',
      titre:   '9 jours sur place, 6,5 jours de pêche',
      intro:   '9 jours au total dont 6,5 jours de pêche guidée. Tout est organisé : vols internes, transferts, posada, guides.',
      etapes: [
        { titre: 'Jour 1 — Vol Paris → Caracas',                     tag: 'Départ',           texte: `Départ de Paris en fin d'après-midi ou en soirée. Vol direct ou avec une escale selon les options disponibles. Arrivée à Caracas en soirée, nuit à l'hôtel (non inclus si arrivée tardive — transfert organisé).`, img: '/images/E7.avif' },
        { titre: `Jour 2 — Vol Los Roques · Installation · Première pêche`, tag: 'Arrivée',   texte: `Vol tôt le matin vers Los Roques (40 minutes). Installation à la posada à Gran Roque. Revue du matériel, briefing sur les espèces et les techniques avec Jean-Baptiste. Première demi-journée de pêche possible selon les conditions et l'heure d'arrivée.`, img: '/images/E8.avif' },
        { titre: 'Jours 3 à 8 — Pêche guidée',                       tag: '6 jours de pêche', texte: `Six journées complètes de pêche guidée, en bateau et à pied sur les flats. Chaque matin départ vers un secteur différent selon les marées et les conditions de vent. Les bateaux (Dolphin Skiff) permettent d'accéder à des flats éloignés inaccessibles autrement.\n\nJean-Baptiste est présent les 3 premières journées pour guider et coacher. Un guide local spécialiste prend le relais les journées suivantes.` },
        { titre: 'Jour 9 — Retour',                                   tag: 'Départ',           texte: `Vol tôt le matin vers Caracas puis vol international retour vers Paris. Arrivée en France le lendemain matin selon les connexions.` },
      ],
    }),

    // 11. GALERIE
    await galerie([
      '/images/E7.avif',  '/images/E8.avif',  '/images/E9.avif',
      '/images/E10.avif', '/images/E11.avif', '/images/E12.avif',
      '/images/E13.avif', '/images/E14.avif', '/images/E15.avif',
      '/images/E17.avif', '/images/E18.avif', '/images/E19.avif',
      '/images/E20.avif', '/images/E21.avif', '/images/E22.avif',
      '/images/E23.avif', '/images/E24.avif', '/images/E25.avif',
      '/images/E26.avif', '/images/E27.avif', '/images/E28.avif',
      '/images/E29.avif', '/images/E30.avif', '/images/E31.avif',
      '/images/E32.avif',
    ]),

    // 12. DATES — Séjours hosted trips 2026
    dates({
      eyebrow: 'Hosted Trip · 2026',
      titre:   'Deux séjours disponibles',
      intro:   `J'organise deux semaines accompagnées pour début 2026, deux groupes de 4 pêcheurs maximum.`,
      fond:    'white',
      sejours: [
        { dates: '23 → 31 janvier 2026',        description: `Accompagnement par JBV pendant 3 jours + 3 jours guidés par le guide local. Groupe de 4 pêcheurs maximum.`, placesTotal: 4, placesDispo: 4, statut: 'disponible' },
        { dates: '31 janvier → 7 février 2026', description: `Guidé par JBV 3 jours + 3 jours guidés par le guide local. Groupe de 4 pêcheurs maximum.`,             placesTotal: 4, placesDispo: 4, statut: 'disponible' },
      ],
      btnTexte: 'Se renseigner',
      btnLien:  '/contact',
    }),

    // 13. INCLUS / NON INCLUS
    progTexte({
      eyebrow:  'Dans le séjour',
      titre:    'Ce qui est inclus',
      fond:     'dark',
      colonnes: [
        { label: '✅ Inclus', style: 'check', items: [
          { texte: 'Transferts et vols internes vers Los Roques', inclus: true },
          { texte: '7 nuits en posada en pension complète (sauf alcool)', inclus: true },
          { texte: '6,5 jours de pêche, 1 guide pour 2 pêcheurs', inclus: true },
          { texte: 'Organisation, coordination et logistique par Jean-Baptiste Vidal', inclus: true },
          { texte: 'Accompagnement et guidage JBV en plus du guide local', inclus: true },
          { texte: 'Excédent de bagage pour le vol local (3$/kg au-dessus de 10 kg)', inclus: true },
          { texte: 'Permis de pêche et taxe de séjour', inclus: true },
        ]},
        { label: '❌ Non inclus', style: 'cross', items: [
          { texte: 'Les vols internationaux (Paris–Caracas)', inclus: false },
          { texte: 'Le visa et les formalités d\'entrée', inclus: false },
          { texte: 'Les pourboires aux guides', inclus: false },
          { texte: 'Les boissons (alcool, etc.)', inclus: false },
          { texte: `L'assurance voyage et rapatriement`, inclus: false },
        ]},
      ],
    }),

    // 14. PRATIQUE — Réservation & organisation
    texte({
      texte: `Vous pouvez me contacter directement pour partir sur cette fabuleuse destination, ou passer par l'agence partenaire DHD LAIKA spécialisée dans les voyages de pêche haut de gamme.

Places limitées à 4 pêcheurs par groupe, réservation recommandée au moins 6 mois à l'avance.

Séjour organisé en partenariat avec DHD LAIKA — Agence de voyages de pêche.`,
      fond: 'sand',
    }),

    // 15. CTA
    cta({
      titre:     'Partir à Los Roques',
      texte:     'Contactez-moi pour les disponibilités 2026, les dates de départ et un devis personnalisé.',
      btn1Texte: 'Me contacter',
      btn1Lien:  '/contact',
      btn2Texte: '06 87 30 34 56',
      btn2Lien:  'tel:0687303456',
    }),

  ].filter(Boolean)
}

// ── Import ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Import Los Roques → Sanity (15 sections)\n')

  const pb = await buildLosRoques()
  console.log(`\n📄 ${pb.length} sections construites`)

  const id      = 'voyage-los-roques-venezuela'
  const draftId = `drafts.${id}`

  await client.patch(id).set({
    pagebuilder: pb,
    especes: 'Bonefish · Tarpon · Permit · Carangues',
    periode: `Toute l'année — séjours Jan. & Fév.`,
    prix:    'Sur devis',
  }).commit()
  console.log('  ✅ Document publié mis à jour')

  const draftExists = await client.fetch(`*[_id == $id][0]._id`, { id: draftId })
  if (draftExists) {
    await client.delete(draftId)
    console.log('  🗑️  Brouillon obsolète supprimé')
  }

  console.log('\n✅ Import terminé. Document publié et propre.')
}

main().catch(err => {
  console.error('❌ Erreur :', err.message)
  process.exit(1)
})
