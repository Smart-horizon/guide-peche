/**
 * import-voyage-los-roques.mjs
 * Importe le pagebuilder de la page Los Roques dans Sanity.
 *
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

const PUBLIC_DIR  = path.resolve(process.cwd(), 'public', 'images')
const SCRAPED_DIR = path.resolve(process.cwd(), 'scraped', 'images')

// ── Utilitaires ───────────────────────────────────────────────────────────────
let _k = 0
const key = (p = 'k') => `${p}${++_k}`

const imageCache = new Map()

async function img(localPath, alt = '') {
  if (!localPath) return null

  let fullPath
  if (localPath.startsWith('/scraped/')) {
    fullPath = path.join(SCRAPED_DIR, localPath.replace(/^\/scraped\//, ''))
  } else {
    const name = localPath.replace(/^\/images\//, '')
    fullPath = path.join(PUBLIC_DIR, name)
  }

  if (imageCache.has(fullPath)) {
    const ref = imageCache.get(fullPath)
    return alt ? { ...ref, alt } : ref
  }
  try {
    const buffer = await fs.readFile(fullPath)
    const ext  = path.extname(fullPath).slice(1).toLowerCase()
    const mime = { avif: 'image/avif', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[ext] || 'image/jpeg'
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

// Image scraped Los Roques (raccourci)
const lr = (n, alt = '') => img(`/scraped/_los-roques-venezuela_${n}.png`, alt)

function blocks(text) {
  if (!text) return []
  return text.split(/\n\n+/).filter(p => p.trim()).map(p => ({
    _type: 'block', _key: key('b'), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key('s'), text: p.trim(), marks: [] }],
  }))
}

// ── Builders de sections ──────────────────────────────────────────────────────

function hero(d) {
  return {
    _type: 'sectionHero', _key: key('hero'),
    eyebrow:          d.eyebrow || '',
    titre:            d.titre,
    sousTitre:        d.sousTitre || '',
    hauteur:          'full',
    btnReserverTexte: d.btnTexte || 'Réserver un séjour',
    btnReserverLien:  '/contact',
    btnTelTexte:      '06 87 30 34 56',
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
    texte:       blocks(d.texte),
    showInfoCard: true,
    niveau:  d.niveau  || '',
    format:  d.format  || '',
    saison:  d.saison  || '',
    tarif:   d.tarif   || '',
    duree:   d.duree   || '',
    lignesSupp: (d.lignesSupp || []).map(l => ({ _type: 'ligneInfo', _key: key('li'), label: l.label, valeur: l.valeur })),
    boutons: (d.boutons || [{ texte: 'Réserver', lien: '/contact' }]).map(b => ({ _type: 'bouton', _key: key('btn'), texte: b.texte, lien: b.lien })),
  }
}

async function texteImage(d) {
  return {
    _type: 'sectionTexteImage', _key: key('ti'),
    texte:         blocks(d.texte),
    image:         d.img ? await img(d.img, d.alt || '') : null,
    imagePosition: d.position || 'right',
    fond:          d.fond || 'white',
  }
}

async function grilleCartes(d) {
  const items = (d.items || []).map(item => ({
    _type: 'carte', _key: key('carte'),
    titre:       item.titre,
    sousTitre:   item.sousTitre || '',
    description: item.description || '',
  }))
  return {
    _type:         'sectionProgrammeCartes', _key: key('progc'),
    eyebrow:       d.eyebrow  || '',
    titre:         d.titre    || '',
    intro:         d.intro    || '',
    image:         d.img ? await img(d.img, d.alt || d.titre || '') : null,
    imagePosition: d.imagePosition || 'left',
    colonnes:      d.colonnes || '3',
    note:          d.note     || '',
    btnTexte:      d.btnTexte || '',
    btnLien:       d.btnLien  || '',
    fond:          d.fond     || 'sand',
    items,
  }
}

async function programme(d) {
  const etapes = await Promise.all((d.etapes || []).map(async e => ({
    _type: 'etape', _key: key('etape'),
    titre: e.titre,
    tag:   e.tag || '',
    texte: blocks(e.texte),
    image: e.img ? await img(e.img, e.alt || e.titre) : null,
  })))
  return {
    _type:   'sectionProgramme', _key: key('prog'),
    eyebrow: d.eyebrow || 'Déroulement',
    titre:   d.titre   || '',
    intro:   d.intro   || '',
    etapes,
    fond: 'sand',
  }
}

function progTexte(d) {
  return {
    _type:   'sectionProgrammeTexte', _key: key('progt'),
    eyebrow: d.eyebrow || '',
    titre:   d.titre   || '',
    intro:   d.intro   || '',
    colonnes: (d.colonnes || []).map(col => ({
      _type: 'colonne', _key: key('col'),
      label: col.label,
      style: col.style || 'normal',
      items: (col.items || []).map(item => ({
        _type:  'item', _key: key('item'),
        texte:  item.texte || item,
        inclus: item.inclus !== false,
      })),
    })),
    fond: 'sand',
  }
}

async function galerie(imgs) {
  const photos = (await Promise.all(imgs.map(i => img(i)))).filter(Boolean)
  return { _type: 'sectionGalerie', _key: key('gal'), photos, colonnes: '3', fond: 'dark' }
}

function dates(d) {
  return {
    _type:   'sectionDates', _key: key('dates'),
    eyebrow: d.eyebrow || 'Hosted Trips',
    titre:   d.titre,
    intro:   d.intro   || '',
    sejours: (d.sejours || []).map(s => ({
      _type:        'sejour', _key: key('sej'),
      dates:        s.dates,
      destination:  s.destination  || '',
      description:  s.description  || '',
      prix:         s.prix         || '',
      placesTotal:  s.placesTotal  || 4,
      placesDispo:  s.placesDispo  ?? 4,
      statut:       s.statut       || 'disponible',
    })),
    btnTexte: d.btnTexte || 'Me contacter pour réserver',
    btnLien:  d.btnLien  || '/contact',
    fond: 'dark',
  }
}

function cta(d) {
  return {
    _type:     'sectionCta', _key: key('cta'),
    titre:     d.titre,
    texte:     d.texte     || '',
    btn1Texte: d.btn1Texte || 'Me contacter',
    btn1Lien:  d.btn1Lien  || '/contact',
    btn2Texte: d.btn2Texte || '06 87 30 34 56',
    btn2Lien:  d.btn2Lien  || 'tel:0687303456',
    style: 'dark',
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOS ROQUES — PAGEBUILDER
// ═══════════════════════════════════════════════════════════════════════════════

async function buildLosRoques() {
  return [

    // ── 1. HERO ──────────────────────────────────────────────────────────────
    {
      ...hero({
        eyebrow:   'Voyage de pêche · Los Roques · Venezuela',
        titre:     'Los Roques, Venezuela',
        sousTitre: 'Parc national des Caraïbes, 3ème destination mondiale pour le bonefish. Bonefish, tarpon, permit et plus de 12 espèces capturables à la mouche.',
        btnTexte:  'Réserver un séjour',
      }),
      image: await lr(0, 'Los Roques Venezuela — pêche à la mouche'),
    },

    // ── 2. STATS ─────────────────────────────────────────────────────────────
    stats([
      { num: 'Janv. & Fév.', label: 'Séjours accompagnés 2026' },
      { num: '7 nuits',      label: 'Durée du séjour' },
      { num: '6,5 jours',    label: 'De pêche guidée' },
      { num: '12 espèces',   label: 'Capturables à la mouche' },
    ]),

    // ── 3. INTRO + INFO CARD ─────────────────────────────────────────────────
    intro({
      texte: `Los Roques est une destination de pêche à la mouche en mer exotique d'exception. Situé dans les Caraïbes, à 170 km au nord de Caracas, cet archipel de 221 000 hectares est classé Parc National depuis 1972. Contrairement à la plupart des destinations exotiques, ses eaux ne connaissent pas de pêche commerciale intensive — une des raisons pour lesquelles la densité de poissons y est remarquable.

Ce sont 360 îlots de sable blanc, de mangroves et de flats peu profonds, offrant un terrain de jeu illimité pour la pêche à vue. Le bonefish est l'espèce emblématique — régulièrement classé dans le top 3 mondial. Mais c'est aussi une destination multi-espèces rare : tarpon, permit, carangues, barracuda, poissons perroquets, balistes... Jusqu'à 12 espèces capturables dans la même journée.

J'emmène des groupes sur place lors de séjours encadrés en janvier et février, les meilleures semaines pour combiner bonefish en tailing et belles chances sur le tarpon.`,
      saison:  'Toute l\'année — séjours accompagnés en janv. et fév.',
      tarif:   'Sur devis — contactez-moi',
      duree:   '7 nuits / 6,5 jours de pêche',
      lignesSupp: [
        { label: 'Hébergement', valeur: 'Posada à Gran Roque, pension complète' },
        { label: 'Guide',       valeur: '1 guide pour 2 pêcheurs' },
        { label: 'Vol interne', valeur: 'Caracas → Los Roques inclus (40 min)' },
        { label: 'Partenaire',  valeur: 'DHD Laika — Adrien De Villeneuve' },
      ],
      boutons: [
        { texte: 'Réserver un séjour', lien: '/contact' },
      ],
    }),

    // ── 4. DESTINATION ───────────────────────────────────────────────────────
    await texteImage({
      texte: `Los Roques est un archipel d'une beauté sauvage, classé Parc National depuis 1972. Ses 221 000 hectares protégés abritent 360 îlots, des bancs de sable blanc, des mangroves et des flats peu profonds à perte de vue. Gran Roque est la seule île habitée — un petit village de pêcheurs authentique, sans hôtel de masse ni béton.

La situation géographique proche de l'équateur garantit un ensoleillement presque toute l'année. Les cyclones y sont rares, les alizés fréquents. Le parc national interdit la pêche commerciale intensive, ce qui explique des densités de poissons rarement vues ailleurs dans les Caraïbes.

Depuis Gran Roque, les bateaux partent chaque matin vers de nouveaux secteurs. Des dizaines de kilomètres de flats sont explorés chaque jour, souvent sans croiser d'autres pêcheurs.`,
      img:      '/scraped/_los-roques-venezuela_1.png',
      alt:      'Archipel de Los Roques — flats et mangroves',
      position: 'right',
      fond:     'white',
    }),

    // ── 5. MULTI-ESPÈCES (grille de cartes avec image) ───────────────────────
    await grilleCartes({
      eyebrow:  'BONEFISH · TARPON · PERMIT · CARANGUES · +',
      titre:    'Une destination multi-espèces unique',
      intro:    'En plus de la bonne densité de gros bonefish, vous pourrez capturer à la mouche une douzaine d\'espèces de poissons, dont bien entendu le tarpon et le permit. Notre guide est également spécialisé dans la recherche des poissons perroquets et balistes (trigger fish).',
      img:      '/scraped/_los-roques-venezuela_2.png',
      alt:      'Bonefish capturé sur les flats de Los Roques',
      colonnes: '3',
      fond:     'dark',
      items: [
        {
          titre:       'Le Bonefish',
          sousTitre:   'ESPÈCE STAR · TOP 3 MONDIAL',
          description: 'Des bonefish actifs en tailing sur les flats peu profonds, la spécialité de Los Roques. De très bons gabarits, souvent chassant dans les bancs d\'alevins. Petits clousers minnow et crevettes, soie #8 (voire #9 si le vent est fort).',
        },
        {
          titre:       'Tarpon · Permit',
          sousTitre:   'GRAND SLAM POSSIBLE',
          description: 'Les canaux plus profonds tiennent du tarpon toute l\'année. Le permit est présent sur les flats et dans les passes. Le Grand Slam (bonefish, tarpon, permit dans la même journée) est une réelle possibilité à Los Roques.',
        },
        {
          titre:       'Les Bonus',
          sousTitre:   'CARANGUES · BARRACUDA · SNOOK · +',
          description: 'Carangues à œil de cheval, hippos, pompano, maquereaux espagnols, bonites, snook, barracuda, red snapper, poissons perroquets, balistes... La liste est longue. Notre guide local est spécialiste de la recherche de ces espèces bonus.',
        },
      ],
    }),

    // ── 6. MÉTÉO & SAISONS (grille de cartes avec image) ─────────────────────
    await grilleCartes({
      eyebrow:  'MÉTÉO & CONDITIONS',
      titre:    'Pêchable toute l\'année',
      intro:    'Il est possible de pêcher à Los Roques toute l\'année grâce à sa situation géographique, proche de l\'équateur. Les cyclones y sont rares, les alizés fréquents.',
      img:      '/scraped/_los-roques-venezuela_3.png',
      alt:      'Pêche à la mouche à Los Roques',
      colonnes: '2',
      fond:     'dark',
      note:     'Nos séjours accompagnés sont planifiés en Janvier/Février 2026, conditions optimales pour une session multi-espèces avec de belles chances sur le tarpon.',
      items: [
        {
          titre:       'Novembre → Avril',
          sousTitre:   '',
          description: 'Marées hautes avec peu de marnage. Idéal pour les espèces pélagiques : tarpons, permits, carangues. Bonefish présents et actifs, moins souvent en tailing visible.',
        },
        {
          titre:       'Mai → Octobre',
          sousTitre:   '',
          description: 'Marées basses, de nombreuses situations de pêche du bonefish en tailing dans très peu d\'eau. Les autres espèces restent présentes et recherchables dans la même journée.',
        },
      ],
    }),

    // ── 7. PROGRAMME DU SÉJOUR ───────────────────────────────────────────────
    await programme({
      eyebrow: 'Déroulement',
      titre:   'Votre séjour à Los Roques',
      intro:   '9 jours au total dont 6,5 jours de pêche guidée. Tout est organisé : vols internes, transfers, posada, guides.',
      etapes: [
        {
          titre: 'Jour 1 — Vol Paris → Caracas',
          tag:   'Départ',
          texte: `Départ de Paris en fin d'après-midi ou en soirée. Vol direct ou avec une escale selon les options disponibles. Arrivée à Caracas en soirée, nuit à l'hôtel (non inclus si arrivée tardive — transfert organisé).`,
          img:   '/scraped/_los-roques-venezuela_4.png',
        },
        {
          titre: 'Jour 2 — Vol Los Roques · Installation · Première pêche',
          tag:   'Arrivée',
          texte: `Vol tôt le matin vers Los Roques (40 minutes). Installation à la posada à Gran Roque. Revue du matériel, briefing sur les espèces et les techniques avec Jean-Baptiste. Première demi-journée de pêche possible selon les conditions et l'heure d'arrivée.`,
          img:   '/scraped/_los-roques-venezuela_5.png',
        },
        {
          titre: 'Jours 3 à 8 — Pêche guidée',
          tag:   '6 jours de pêche',
          texte: `Six journées complètes de pêche guidée, en bateau et à pied sur les flats. Chaque matin départ vers un secteur différent selon les marées et les conditions de vent. Les bateaux (Dolphin Skiff) permettent d'accéder à des flats éloignés inaccessibles autrement.

Jean-Baptiste est présent les 3 premières journées pour guider et coacher. Un guide local spécialiste prend le relais les journées suivantes. Déjeuner sur l'eau ou sur un îlot de sable, retour à la posada en fin d'après-midi.`,
        },
        {
          titre: 'Jour 9 — Retour',
          tag:   'Départ',
          texte: `Vol tôt le matin vers Caracas puis vol international retour vers Paris. Arrivée en France le lendemain matin selon les connexions.`,
        },
      ],
    }),

    // ── 8. CE QUI EST INCLUS ─────────────────────────────────────────────────
    progTexte({
      eyebrow: 'Package',
      titre:   'Ce qui est inclus',
      colonnes: [
        {
          label: '✅ Inclus',
          style: 'check',
          items: [
            { texte: 'Vols internes Caracas ↔ Los Roques', inclus: true },
            { texte: '7 nuits en posada, pension complète (alcools exclus)', inclus: true },
            { texte: '6,5 jours de pêche · 1 guide pour 2 pêcheurs', inclus: true },
            { texte: 'Permis de pêche et taxe de séjour', inclus: true },
            { texte: 'Excédent bagage vol local (3 $/kg au-dessus de 10 kg)', inclus: true },
            { texte: 'Logistique, organisation et coordination complète par JB Vidal', inclus: true },
          ],
        },
        {
          label: '❌ Non inclus',
          style: 'cross',
          items: [
            { texte: 'Vol international Paris → Caracas', inclus: false },
            { texte: 'Nuit à Caracas (si nécessaire)', inclus: false },
            { texte: 'Boissons alcoolisées', inclus: false },
            { texte: 'Pourboires pour les guides', inclus: false },
            { texte: 'Matériel de pêche personnel', inclus: false },
          ],
        },
      ],
    }),

    // ── 9. MATÉRIEL RECOMMANDÉ ───────────────────────────────────────────────
    await grilleCartes({
      eyebrow:  'ÉQUIPEMENT',
      titre:    'Le matériel recommandé',
      intro:    'L\'idéal est de prévoir trois cannes pour couvrir toutes les situations. Une fiche matériel détaillée est disponible en téléchargement.',
      colonnes: '4',
      fond:     'white',
      btnTexte: 'Télécharger la fiche matériel complète (PDF)',
      btnLien:  '/fiche-materiel-los-roques.pdf',
      items: [
        {
          titre:       '#8',
          sousTitre:   'Bonefish',
          description: 'Soie de 8 (voire 9 si vent fort) pour la pêche à vue du bonefish sur les flats peu profonds.',
        },
        {
          titre:       '#9/10',
          sousTitre:   'Permit & Carangues',
          description: 'Canne 9/10 pour le permit et les carangues. Équipez un ensemble avec un popper pour les gros barracudas.',
        },
        {
          titre:       '#10/11',
          sousTitre:   'Tarpon',
          description: 'Canne 10/11 indispensable pour le tarpon. Moulinets robustes avec bon frein, 150 m+ de backing 30 lb.',
        },
        {
          titre:       'Bas de ligne',
          sousTitre:   'Fluorocarbone',
          description: '12–20 lb pour bonefish · 20–25 lb pour permit · 40–80+ lb pour tarpon et autres espèces.',
        },
      ],
    }),

    // ── 10. GALERIE ──────────────────────────────────────────────────────────
    await galerie([
      '/scraped/_los-roques-venezuela_6.png',
      '/scraped/_los-roques-venezuela_7.png',
      '/scraped/_los-roques-venezuela_8.png',
      '/scraped/_los-roques-venezuela_9.png',
      '/scraped/_los-roques-venezuela_10.png',
      '/scraped/_los-roques-venezuela_11.png',
      '/scraped/_los-roques-venezuela_12.png',
      '/scraped/_los-roques-venezuela_13.png',
    ]),

    // ── 11. DATES HOSTED TRIPS ───────────────────────────────────────────────
    dates({
      eyebrow: 'Hosted Trips',
      titre:   'Séjours accompagnés 2026',
      intro:   'Je vous emmène en groupe de 4 pêcheurs maximum. Les deux séjours sont identiques dans leur organisation — choisissez selon vos disponibilités.',
      sejours: [
        {
          dates:       '23 → 31 janvier 2026',
          description: 'JB Vidal présent 3 jours + guide local spécialiste 3 jours. 4 pêcheurs maximum.',
          placesTotal: 4,
          placesDispo: 4,
          statut:      'disponible',
        },
        {
          dates:       '31 janvier → 7 février 2026',
          description: 'JB Vidal présent 3 jours + guide local spécialiste 3 jours. 4 pêcheurs maximum.',
          placesTotal: 4,
          placesDispo: 4,
          statut:      'disponible',
        },
      ],
      btnTexte: 'Me contacter pour réserver',
      btnLien:  '/contact',
    }),

    // ── 12. CTA ──────────────────────────────────────────────────────────────
    cta({
      titre:     'Partez pêcher à Los Roques',
      texte:     'Places limitées à 4 pêcheurs par séjour. Réponse sous 24h.',
      btn1Texte: 'Me contacter',
      btn1Lien:  '/contact',
      btn2Texte: '06 87 30 34 56',
      btn2Lien:  'tel:0687303456',
    }),

  ].filter(Boolean)
}

// ── Import ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Import Los Roques → Sanity\n')

  const pb = await buildLosRoques()
  console.log(`\n📄 Import : los-roques-venezuela (${pb.length} sections)`)

  const id = 'voyage-los-roques-venezuela'
  await client.patch(id).set({
    pagebuilder: pb,
    especes:  'Bonefish · Tarpon · Permit · Carangues',
    periode:  'Toute l\'année — séjours Jan. & Fév.',
    prix:     'Sur devis',
  }).commit()

  console.log('  ✅ Pagebuilder mis à jour')
  console.log('\n✅ Import terminé.')
}

main().catch(err => {
  console.error('❌ Erreur :', err.message)
  process.exit(1)
})
