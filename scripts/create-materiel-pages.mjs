/**
 * create-materiel-pages.mjs
 * Crée les 8 pages matériel dans Sanity :
 * - Document PUBLIÉ (pour le site)
 * - Document BROUILLON drafts.* (pour Studio — éditeur visible)
 * Usage : node scripts/create-materiel-pages.mjs
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images')

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// ── Cache upload images ───────────────────────────────────────────────────────
const assetCache = {}
async function uploadImage(filename) {
  if (assetCache[filename]) return assetCache[filename]
  const filePath = path.join(IMAGES_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  Introuvable : ${filename}`)
    return null
  }
  try {
    const buffer = fs.readFileSync(filePath)
    const asset = await client.assets.upload('image', buffer, { filename })
    const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    assetCache[filename] = ref
    console.log(`  📤 ${filename}`)
    return ref
  } catch (e) {
    console.error(`  ❌ ${filename}: ${e.message}`)
    return null
  }
}

// ── _key valide (alphanumérique + tirets, sans points) ────────────────────────
let _kc = 1
function k(p) {
  return `${p}-${(_kc++).toString(36)}-${Math.floor(Math.random() * 1e8).toString(36)}`
}

// ── Blocks de texte ───────────────────────────────────────────────────────────
function p(text) {
  return { _type: 'block', _key: k('b'), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: k('s'), text, marks: [] }] }
}
function h3(text) {
  return { _type: 'block', _key: k('b'), style: 'h3', markDefs: [], children: [{ _type: 'span', _key: k('s'), text, marks: [] }] }
}

// ── Sections helpers ──────────────────────────────────────────────────────────
function sectionHero(o) {
  return { _type: 'sectionHero', _key: k('hero'), ...o }
}
function sectionMaterielIntro(o) {
  return { _type: 'sectionMaterielIntro', _key: k('mati'), ...o }
}
function sectionEquipement(o) {
  return { _type: 'sectionEquipement', _key: k('equi'), fond: 'sand', ...o }
}
function sectionCarrousel(o) {
  return { _type: 'sectionCarrousel3Images', _key: k('carr'), fond: 'dark', ratio: '3/2', ...o }
}
function sectionMaterielNav(o) {
  return { _type: 'sectionMaterielNav', _key: k('nav'), fond: 'sand', ...o }
}
function sectionCta(o) {
  return { _type: 'sectionCta', _key: k('cta'), fond: 'dark', ...o }
}
function sectionTexte(o) {
  return { _type: 'sectionTexte', _key: k('txt'), fond: 'white', ...o }
}
function sectionPartenaires(o) {
  return { _type: 'sectionPartenaires', _key: k('part'), fond: 'white', ...o }
}
function sectionGrilleSubPages(o) {
  return { _type: 'sectionGrilleSubPages', _key: k('hub'), fond: 'sand', ...o }
}
function sectionVideos(o) {
  return { _type: 'sectionVideos', _key: k('vid'), fond: 'white', ...o }
}
function sectionVideo(o) {
  return { _type: 'sectionVideo', _key: k('vidS'), ...o }
}
function sectionCards2(o) {
  return { _type: 'sectionCards2', _key: k('c2'), fond: 'sand', ...o }
}

// Liens de navigation communs
function navLiens(exclure = '') {
  return [
    { _key: k('nl'), label: 'Matériel migrateurs', url: '/materiel-mouche-migrateur' },
    { _key: k('nl'), label: 'Matériel truite', url: '/materiel-mouche-truite' },
    { _key: k('nl'), label: 'Matériel bar', url: '/materiel-mouche-bar' },
    { _key: k('nl'), label: 'Matériel réservoir', url: '/materiel-mouche-reservoir' },
    { _key: k('nl'), label: 'Matériel brochet', url: '/materiel-mouche-brochet' },
    { _key: k('nl'), label: 'Matériel exotique', url: '/materiel-mouche-peche-exotique' },
  ].filter(l => !l.url.includes(exclure))
}

// ── Résolution des images dans sections ───────────────────────────────────────
async function resolveImages(sections) {
  const out = []
  for (const s of sections) {
    const sec = { ...s }

    // image principale de la section (hero bg, etc.)
    if (sec._imgFile) {
      const asset = await uploadImage(sec._imgFile)
      if (asset) sec.image = asset
      delete sec._imgFile
    }

    // carrousel : sec._imgs = ['file1.jpg', 'file2.jpg', ...]
    if (sec._imgs) {
      sec.images = []
      for (const f of sec._imgs) {
        const asset = await uploadImage(f)
        if (asset) sec.images.push({ ...asset, _key: k('img'), alt: '', legende: '' })
      }
      delete sec._imgs
    }

    // grille sous-pages : sec._cartes = [{titre, url, _img, alt}]
    if (sec._cartes) {
      sec.cartes = []
      for (const c of sec._cartes) {
        const asset = c._img ? await uploadImage(c._img) : null
        sec.cartes.push({
          _key: k('c'),
          titre: c.titre,
          url: c.url,
          image: asset ? { _type: 'image', asset: asset.asset, alt: c.alt || '' } : null,
        })
      }
      delete sec._cartes
    }

    // items équipement : specs avec _key
    if (sec.specs) {
      sec.specs = sec.specs.map(sp => ({ _key: k('sp'), ...sp }))
    }
    if (sec.items) {
      sec.items = sec.items.map(it => ({ _key: k('it'), ...it }))
    }
    if (sec.liens) {
      sec.liens = sec.liens.map(l => ({ _key: k('li'), ...l }))
    }

    out.push(sec)
  }
  return out
}

// ════════════════════════════════════════════════════════════════════
// DÉFINITION DES 8 PAGES
// ════════════════════════════════════════════════════════════════════
async function buildPages() {
  return [

    // ── 1. HUB MATÉRIEL ────────────────────────────────────────────
    {
      id: 'page-materiel-jeanbaptistevidal',
      title: 'Mon matériel de pêche à la mouche',
      slug: 'materiel-jeanbaptistevidal',
      seoTitle: 'Matériel de pêche à la mouche — Jean-Baptiste Vidal',
      seoDescription: 'Cannes SAGE & Redington, soies RIO & Royal Wulff, accessoires Loon — le matériel utilisé par Jean-Baptiste Vidal, 33 ans d\'expérience.',
      sections: await resolveImages([
        sectionHero({
          _imgFile: 'materiel-hero.jpg',
          eyebrow: 'Équipement · Recommandations · Partenaires',
          titre: 'Mon matériel de pêche à la mouche',
          sousTitre: 'Le matériel que j\'utilise pour mes pêches en France et à l\'étranger, 33 ans d\'expérience au service de vos choix',
          lien1: '/contact', label1: 'Réserver une sortie',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
        sectionMaterielIntro({
          specs: [
            { label: 'Cannes', valeur: 'SAGE · Redington' },
            { label: 'Soies', valeur: 'RIO · Royal Wulff' },
            { label: 'Accessoires', valeur: 'Loon Outdoors · Adams Built' },
            { label: 'Revendeur', valeur: 'Ardent Pêche, Pontivy' },
            { label: 'Contact', valeur: '06 87 30 34 56' },
          ],
          texte: [
            p('Après plus de 33 ans de pêche à la mouche et 21 ans de guidage professionnel en France et dans le monde entier, j\'ai testé et sélectionné le matériel que j\'utilise au quotidien.'),
            p('Je travaille en partenariat avec des marques qui partagent mes valeurs : SAGE, Redington, RIO, Royal Wulff, Loon Outdoors, Adams Built. Je ne recommande que ce que j\'utilise personnellement.'),
            p('Retrouvez ci-dessous mes recommandations organisées par type de pêche, avec des liens vers mon revendeur de confiance, Ardent Pêche à Pontivy.'),
          ],
        }),
        sectionGrilleSubPages({
          eyebrow: 'Par type de pêche',
          titre: 'Choisir son matériel',
          _cartes: [
            { titre: 'Matériel migrateurs', url: '/materiel-mouche-migrateur', _img: 'materiel-migrateur-1.jpg', alt: 'Matériel pêche des migrateurs' },
            { titre: 'Matériel truite', url: '/materiel-mouche-truite', _img: 'materiel-truite-1.jpg', alt: 'Matériel pêche de la truite' },
            { titre: 'Matériel bar', url: '/materiel-mouche-bar', _img: 'materiel-bar-1.jpg', alt: 'Matériel pêche du bar' },
            { titre: 'Matériel réservoir', url: '/materiel-mouche-reservoir', _img: 'reservoir-2.jpg', alt: 'Matériel pêche en réservoir' },
            { titre: 'Matériel brochet', url: '/materiel-mouche-brochet', _img: 'brochet-jbv.jpg', alt: 'Matériel pêche du brochet' },
            { titre: 'Matériel exotique', url: '/materiel-mouche-peche-exotique', _img: 'materiel-exotique-1.jpg', alt: 'Matériel pêche exotique' },
          ],
        }),
        sectionPartenaires({
          eyebrow: 'Mes partenaires',
          titre: 'Les marques que j\'utilise et recommande',
        }),
        sectionCarrousel({
          _imgs: ['materiel-1.jpg', 'materiel-2.jpg', 'materiel-3.jpg', 'materiel-hero.jpg'],
        }),
        sectionCta({
          titre: 'Des questions sur le matériel ?',
          sousTitre: 'Jean-Baptiste vous conseille sur le meilleur équipement pour votre pratique.',
          lien1: '/contact', label1: 'Me contacter',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
      ]),
    },

    // ── 2. BAR ─────────────────────────────────────────────────────
    {
      id: 'page-materiel-mouche-bar',
      title: 'Matériel pêche du bar à la mouche',
      slug: 'materiel-mouche-bar',
      seoTitle: 'Matériel de pêche à la mouche pour le bar — Jean-Baptiste Vidal',
      seoDescription: 'Cannes puissantes, soies et mouches pour la pêche du bar à la mouche en Bretagne. Cannes SAGE R8 Salt, SAGE Maverick, soies RIO Striper.',
      sections: await resolveImages([
        sectionHero({
          _imgFile: 'materiel-bar-1.jpg',
          eyebrow: 'Bar · Eau salée · Estuaires',
          titre: 'Matériel de pêche à la mouche pour le bar',
          sousTitre: 'Cannes puissances #8-10, moulinets étanches et soies RIO Striper pour la pêche du bar en Bretagne',
          lien1: '/peche-du-bar-a-la-mouche', label1: 'Pêche du bar à la mouche',
          lien2: '/materiel-jeanbaptistevidal', label2: '← Tout le matériel',
        }),
        sectionMaterielIntro({
          titre: 'Matériel de pêche à la mouche pour le bar en Bretagne',
          specs: [
            { label: 'Espèce cible', valeur: 'Bar (Loup · Dicentrarchus labrax)' },
            { label: 'Terrain de jeu', valeur: 'Estuaires · Côtes rocheuses · Embouchures · Plages' },
            { label: 'Cannes recommandées', valeur: 'SAGE R8 Salt · SAGE Maverick · Redington Predator' },
            { label: 'Soies', valeur: 'Rio Striper flottante · intermédiaire · plongeante' },
            { label: 'Moulinets', valeur: 'SAGE Spectrum · SAGE 2280 · Redington Behemoth' },
            { label: 'Puissances', valeur: '#8 à #10 selon les conditions' },
          ],
          texte: [
            p('La pêche du bar à la mouche en Bretagne est une pêche exigeante, exposée aux éléments marins. Le matériel doit être robuste et résistant à la corrosion.'),
            h3('Cannes (Rods)'),
            p('SAGE R8 Salt 9 pieds #8 — bar à vue en conditions calmes. SAGE Maverick 9 pieds #9 — bateau et vent fort. Redington Predator 9 pieds #9 — excellent rapport qualité/prix.'),
            h3('Moulinets (Reels)'),
            p('SAGE Spectrum — frein précis. SAGE 2280 — robuste taille 7/8. Redington Behemoth 7/8 — puissant et abordable.'),
            h3('Soies (Lines)'),
            p('Rio Striper flottante — surface et eaux peu profondes. Rio Striper intermédiaire — 90% des situations en estuaire. Rio Striper plongeante — fosses profondes.'),
            h3('Bas de ligne'),
            p('Fluorocarbone 27° à 40° selon la méthode. Longueur 1,5 à 2 m.'),
          ],
        }),
        sectionEquipement({
          titre: 'Mouches pour le bar',
          items: [
            { titre: 'Mouches de surface', description: 'Gurglers, poppers, sliders — prises visuelles en estuaires peu profonds et hauts fonds.', lien: null, labelLien: null },
            { titre: 'Streamers', description: 'Imitations de blanchaille, lançons. Coloris : blanc/chartreuse, blanc/olive, blanc/bleu. Tailles 2/0 à 3/0.', lien: null, labelLien: null },
            { titre: 'Mouches de fond', description: 'Crevettes et crabes fluo, clouser minnows plombés, squirmies. Efficaces sur les spots rocheux.', lien: null, labelLien: null },
          ],
        }),
        sectionCarrousel({
          _imgs: ['materiel-bar-1.jpg', 'materiel-bar-2.jpg', 'materiel-bar-3.jpg'],
        }),
        sectionMaterielNav({ liens: navLiens('bar') }),
        sectionCta({
          titre: 'Sortie bar à la mouche',
          sousTitre: 'Guidage bar à vue, initiation et perfectionnement en Bretagne-Sud.',
          lien1: '/peche-du-bar-a-la-mouche', label1: 'Voir les formules',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
      ]),
    },

    // ── 3. BROCHET ─────────────────────────────────────────────────
    {
      id: 'page-materiel-mouche-brochet',
      title: 'Matériel pêche du brochet à la mouche',
      slug: 'materiel-mouche-brochet',
      seoTitle: 'Matériel de pêche à la mouche pour le brochet — Jean-Baptiste Vidal',
      seoDescription: 'Cannes puissantes, soies et grosses mouches pour la pêche du brochet à la mouche. SAGE Payload, Rio Elite Predator.',
      sections: await resolveImages([
        sectionHero({
          _imgFile: 'BR 1.avif',
          eyebrow: 'Matériel · Brochet · Prédateur',
          titre: 'Matériel de pêche à la mouche pour le brochet',
          sousTitre: 'Cannes puissance #9–10, soies prédateurs et grosses mouches volumineuses pour le grand brochet en lac et en étang',
          lien1: '/peche-du-brochet-a-la-mouche', label1: 'Pêche du brochet',
          lien2: '/materiel-jeanbaptistevidal', label2: '← Tout le matériel',
        }),
        sectionEquipement({
          eyebrow: 'Équipement recommandé',
          titre: 'Ce qu\'il faut dans la boîte',
          items: [
            {
              titre: 'La canne, puissance 9 à 10',
              description: 'SAGE Payload — spécialement conçue pour les grosses mouches, action en boucle ouverte. SAGE Maverick — puissante et polyvalente.',
              lien: 'https://www.ardentflyfishing.com/fr/p/28552-canne-a-mouche-sage-payload-89-soie-9.html',
              labelLien: 'Acheter la SAGE Payload sur Ardent →',
            },
            {
              titre: 'La soie, fuseau décentré',
              description: 'Rio Elite Predator — tête courte, profil optimisé contre le vent. 3 densités : flottante / intermédiaire / plongeante rapide.',
              lien: 'https://www.ardentflyfishing.com/fr/p/29497-soie-rio-elite-predator-wf-f.html',
              labelLien: 'Acheter la Rio Elite Predator sur Ardent →',
            },
            {
              titre: 'Le bas de ligne',
              description: '1 ou 2 brins maximum. Avançon acier ou titane obligatoire. Rio gamme acier tressé multi-brin. Fluorocarbone 60°+ pour petits sujets.',
              lien: null, labelLien: null,
            },
          ],
          lienBoutique: 'https://www.ardentflyfishing.com/fr/c/1094-brochet',
          labelBoutique: 'Mouches brochet sur Ardent',
        }),
        sectionEquipement({
          eyebrow: 'Mouches à brochet',
          titre: 'Les patterns indispensables',
          items: [
            { titre: 'Mouches de surface', description: 'Gurglers, poppers, sliders — bordure dans les herbiers et sous frondaisons, printemps/début été.', lien: null, labelLien: null },
            { titre: 'Streamers imitatifs', description: 'Imitations de perches, gardons. Marabou et craft fur. Tailles 3/0 à 6/0.', lien: null, labelLien: null },
            { titre: 'Streamers attractants', description: 'Couleurs vives (chartreuse, orange, rouge/blanc) pour eaux colorées. Deceiver et Clouser géants.', lien: null, labelLien: null },
          ],
          lienBoutique: 'https://www.ardentflyfishing.com/fr/c/1094-brochet',
          labelBoutique: 'Mouches brochet sur Ardent',
        }),
        sectionCarrousel({
          _imgs: ['MB 1.avif', 'MB 2.avif', 'MB 3.avif', 'MB 4.avif', 'MB 5.avif', 'MB 6.avif', 'MB 7.avif', 'MB 8.avif', 'MB 9.avif'],
        }),
        sectionMaterielNav({ liens: navLiens('brochet') }),
        sectionCta({
          titre: 'Sortie brochet à la mouche',
          sousTitre: 'Guidage spécialisé brochet, disponibilités et tarifs sur demande.',
          lien1: '/contact', label1: 'Me contacter',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
      ]),
    },

    // ── 4. MIGRATEURS ──────────────────────────────────────────────
    {
      id: 'page-materiel-mouche-migrateur',
      title: 'Matériel pêche des migrateurs à la mouche',
      slug: 'materiel-mouche-migrateur',
      seoTitle: 'Matériel pour la pêche des migrateurs à la mouche — Jean-Baptiste Vidal',
      seoDescription: 'Cannes, soies, polyleaders et mouches pour pêcher le saumon, l\'alose et la truite de mer en Bretagne.',
      sections: await resolveImages([
        sectionHero({
          _imgFile: 'materiel-migrateur-1.jpg',
          eyebrow: 'Saumon · Alose · Truite de mer',
          titre: 'Matériel pour la pêche des migrateurs',
          sousTitre: 'Cannes à deux mains, soies Spey, polyleaders et mouches adaptés aux rivières de Bretagne',
          lien1: '/stage-spey-cast-et-cours-de-lancer', label1: 'Stages Spey Cast',
          lien2: '/materiel-jeanbaptistevidal', label2: '← Tout le matériel',
        }),
        sectionMaterielIntro({
          titre: 'Matériel pour les poissons migrateurs en Bretagne',
          specs: [
            { label: 'Espèces cibles', valeur: 'Saumon atlantique · Alose feinte · Truite de mer' },
            { label: 'Rivières Bretagne', valeur: 'Ellé · Scorff · Aulne · Blavet · Léguer · Elorn · Aven' },
            { label: 'Cannes recommandées', valeur: 'SAGE R8 Spey · SAGE SONIC · Redington Claymore' },
            { label: 'Soies', valeur: 'Shooting Head · Skagit · Scandi · WF' },
            { label: 'Versileaders', valeur: 'RIO 6, 10, 12, 15 pieds — 4 densités' },
          ],
          texte: [
            h3('Petites et moyennes rivières'),
            p('Canne à une main 9-10 pieds soie #8 pour saumon de printemps. Canne 9 pieds soie #6-7 pour individus plus petits en mi-saison. Rivières : Elorn, Aven, Penzé, Goyen, Odet.'),
            h3('Moyennes et grandes rivières — cannes Spey'),
            p('SAGE R8 Spey ou SAGE SONIC — deux mains 12-13 pieds soie #7-8. REDINGTON CLAYMORE — excellent rapport qualité/prix. Rivières : Ellé, Scorff, Léguer, Aulne, Blavet.'),
            h3('Soies pour le Spey casting'),
            p('Shooting Head (SH) — tête 10-15m, grandes distances. Scandi — tête 8-10m, nymphes et mouches légères. Skagit — tête ~6m, grosses mouches et pointes plongeantes. WF medium — rivières étroites.'),
            h3('Versileaders et polyleaders'),
            p('Versileaders RIO ou polyleaders en tailles 6, 10, 12, 15 pieds. 4 densités : flottant, intermédiaire, plongeant lent, plongeant rapide.'),
          ],
        }),
        sectionEquipement({
          titre: 'Mouches pour les migrateurs',
          items: [
            { titre: 'Saumon', description: 'Ally\'s Shrimp, Cascade, mouches orangées en début de saison. Mouches noires par temps clair. Green Highlander, Gary Dog. Tubes fly de plus en plus populaires.', lien: null, labelLien: null },
            { titre: 'Alose', description: 'Mouches légères et brillantes, tailles 8-12. Imitations de petits crustacés, mouches argentées ou cuivrées sur Ellé et Aulne au printemps.', lien: null, labelLien: null },
            { titre: 'Truite de mer', description: 'En milieu de saison : mouches sobres et discrètes. La nuit : mouches de surface ou streamers sombres.', lien: null, labelLien: null },
          ],
        }),
        sectionCarrousel({
          _imgs: ['materiel-migrateur-1.jpg', 'materiel-migrateur-2.jpg', 'spey-s1.avif'],
        }),
        sectionMaterielNav({ liens: navLiens('migrateur') }),
        sectionCta({
          titre: 'Réservez votre sortie migrateurs',
          sousTitre: 'Stages Spey Cast, guidages saumon et alose, disponibilités sur demande.',
          lien1: '/contact', label1: 'Me contacter',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
      ]),
    },

    // ── 5. EXOTIQUE ────────────────────────────────────────────────
    {
      id: 'page-materiel-mouche-peche-exotique',
      title: 'Matériel pêche exotique à la mouche',
      slug: 'materiel-mouche-peche-exotique',
      seoTitle: 'Matériel pour la pêche à la mouche en exotique — Jean-Baptiste Vidal',
      seoDescription: 'Cannes, soies et mouches pour la pêche exotique : bonefish, permit, tarpon, dorado. SAGE R8 Salt, SAGE Maverick, SAGE Enforcer.',
      sections: await resolveImages([
        sectionHero({
          _imgFile: 'materiel-exotique-1.jpg',
          eyebrow: 'Bonefish · Permit · Tarpon · Dorado',
          titre: 'Matériel pour la pêche exotique à la mouche',
          sousTitre: 'Équipement haute performance pour les grands voyages de pêche : Cuba, Venezuela, Argentine, Mexique',
          lien1: '/voyages-peche-mouche', label1: 'Voyages de pêche',
          lien2: '/materiel-jeanbaptistevidal', label2: '← Tout le matériel',
        }),
        sectionMaterielIntro({
          titre: 'Matériel pour la pêche à la mouche en exotique',
          specs: [
            { label: 'Espèces', valeur: 'Bonefish · Permit · Tarpon · Dorado · GT' },
            { label: 'Destinations', valeur: 'Cuba · Venezuela · Argentine · Mexique · Bolivie' },
            { label: 'Cannes', valeur: 'SAGE R8 Salt · SAGE Maverick · SAGE XI3' },
            { label: 'Moulinets', valeur: 'SAGE Enforcer · Redington Grande' },
            { label: 'Puissances', valeur: '#8 bonefish · #9-10 permit/dorado · #10-12 tarpon' },
          ],
          texte: [
            p('Après avoir pêché dans plus de 12 pays, j\'ai affiné mon matériel pour chaque espèce. La chaleur, l\'humidité, les poissons puissants et l\'eau de mer corrosive exigent un équipement sans compromis.'),
            h3('Bonefish'),
            p('SAGE R8 SALT 9 pieds #8 — précision sur poissons en déplacement. SAGE MAVERICK 9 pieds #8 — robuste par vent. Moulinet : SAGE ENFORCER ou Redington Grande. Mouches : crevettes, crabes, Mini-Puf, Gotcha, Crazy Charlie.'),
            h3('Permit'),
            p('Canne 9 pieds #9 ou #10. Backing : 200m minimum. Moulinet : SAGE ENFORCER ou Redington Grande. Mouches : crevettes, crabes, Del\'s Merkin, Spawning Shrimp.'),
            h3('Tarpon'),
            p('Petits tarpons (2-10 kg) : canne #8. Grands tarpons : SAGE XI3, SAGE R8 SALT ou SAGE Maverick en #10 à #12. Mouches : Black Death, Cockroach, patterns Toad.'),
            h3('Dorado'),
            p('Petits sujets (2-5 kg) : canne #8. Gros sujets (8 kg+) : canne #9-10. Avançon acier ou titane 30 livres obligatoire. Mouches : Andino Deceiver, EP Baitfish, Gurglers, Poppers.'),
          ],
        }),
        sectionCarrousel({
          _imgs: ['materiel-exotique-1.jpg', 'materiel-exotique-2.jpg', 'materiel-exotique-3.jpg'],
        }),
        sectionVideo({
          titre: 'Préparer son voyage exotique de pêche à la mouche',
          url: 'https://www.youtube.com/watch?v=A9ov6VSGnVE',
          fond: 'sand',
        }),
        sectionCards2({
          eyebrow: 'Destinations',
          titre: 'Voyages organisés par Jean-Baptiste Vidal',
          cards: [
            { _key: k('cd'), titre: 'Argentine — Rio Grande', sousTitre: 'La Mecque de la truite de mer à la mouche. Rio Grande en Terre de Feu.', lien: '/voyage-peche-argentine-rio-grande-truite-de-mer' },
            { _key: k('cd'), titre: 'Cuba — Cayo Cruz', sousTitre: 'Bonefish, permit et tarpon sur les magnifiques flats cubains.', lien: '/peche-mouche-cuba-cayo-cruz' },
            { _key: k('cd'), titre: 'Venezuela — Los Roques', sousTitre: 'Paradis des flats avec bonefish géants dans un cadre de rêve.', lien: '/los-roques-venezuela' },
            { _key: k('cd'), titre: 'Mexique', sousTitre: 'Bonefish et permit dans les eaux turquoise du Yucatan.', lien: '/voyage-peche-mouche-mexique' },
          ],
        }),
        sectionMaterielNav({ liens: navLiens('exotique') }),
        sectionCta({
          titre: 'Préparez votre voyage de pêche',
          sousTitre: 'Jean-Baptiste vous conseille sur le matériel adapté à votre destination.',
          lien1: '/voyages-peche-mouche', label1: 'Voir les voyages',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
      ]),
    },

    // ── 6. RÉSERVOIR ───────────────────────────────────────────────
    {
      id: 'page-materiel-mouche-reservoir',
      title: 'Matériel pêche en réservoir à la mouche',
      slug: 'materiel-mouche-reservoir',
      seoTitle: 'Matériel pour la pêche à la mouche en réservoir — Jean-Baptiste Vidal',
      seoDescription: 'Cannes, soies et mouches pour la pêche de la truite en réservoir. SAGE Sonic, Redington Crux, soies RIO en différentes densités.',
      sections: await resolveImages([
        sectionHero({
          _imgFile: 'reservoir-2.jpg',
          eyebrow: 'Truite arc-en-ciel · Réservoir · Plan d\'eau',
          titre: 'Matériel pour la pêche en réservoir',
          sousTitre: 'Cannes puissances #6-8, soies en 3 densités et mouches spécifiques pour la pêche en réservoir',
          lien1: '/peche-de-la-truite-en-reservoir', label1: 'Stages réservoir',
          lien2: '/materiel-jeanbaptistevidal', label2: '← Tout le matériel',
        }),
        sectionMaterielIntro({
          titre: 'Matériel pour la pêche à la mouche en réservoir',
          specs: [
            { label: 'Espèce cible', valeur: 'Truite arc-en-ciel · Fario en réservoir' },
            { label: 'Sites Bretagne', valeur: 'Drennec · Saint-Michel · Toul Dour' },
            { label: 'Cannes recommandées', valeur: 'SAGE Sonic · Redington Crux' },
            { label: 'Soies', valeur: 'Rio Gold · Rio Camolux · Rio Phantom' },
            { label: 'Moulinets', valeur: 'SAGE Spectrum · SAGE 2280 · Redington Behemoth' },
            { label: 'Puissances', valeur: '#6 à #8 selon la technique' },
          ],
          texte: [
            p('Le réservoir est le terrain de jeu idéal pour progresser à la pêche à la mouche. Drennec, Saint-Michel, Toul Dour — lancer loin, sonder différentes profondeurs.'),
            h3('Cannes'),
            p('SAGE SONIC — polyvalente et rapide, lancers longue distance. REDINGTON Crux — légère et précise, pêche à vue en réservoir. Puissances #6 à #8.'),
            h3('Soies — 3 densités'),
            p('Flottante — Rio Gold ou Rio Grand (surface, nymphe sous indicateur). Intermédiaire — Rio Camolux (50cm à 2m de profondeur, la plus polyvalente). Plongeante — Rio Phantom ou Rio Outbound (couches profondes).'),
            h3('Moulinets'),
            p('SAGE Spectrum — précis et solide. SAGE 2280 — classique et fiable. Redington Behemoth 7/8 — puissant et économique.'),
            h3('Bas de ligne'),
            p('Maxima Chameleon ou Rio Powerflex. Pointes 12° à 22° selon la méthode de pêche.'),
          ],
        }),
        sectionEquipement({
          titre: 'Mouches pour le réservoir',
          items: [
            { titre: 'Mouches sèches & émergentes', description: 'Sédges, tipules (daddy long legs), chironomes en surface. Très efficaces le soir lors des émergences estivales.', lien: null, labelLien: null },
            { titre: 'Nymphes', description: 'Nymphes de chironome, de sédge, buzzers. Pêche en nymphe suspendue sous indicateur. Nymphe plombée pour eaux froides.', lien: null, labelLien: null },
            { titre: 'Streamers & boobies', description: 'Streamers pour imiter les alevins. Boobies (nageant tête en bas) redoutables sur soies plongeantes rapides.', lien: null, labelLien: null },
          ],
        }),
        sectionCarrousel({
          _imgs: ['reservoir-2.jpg', 'masterclass-reservoir-1.jpg', 'masterclass-reservoir-2.jpg'],
        }),
        sectionMaterielNav({ liens: navLiens('reservoir') }),
        sectionCta({
          titre: 'Masterclass réservoir',
          sousTitre: 'Progressez rapidement avec une journée de masterclass en réservoir.',
          lien1: '/master-class-peche-en-reservoir', label1: 'Voir la masterclass',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
      ]),
    },

    // ── 7. TRUITE ──────────────────────────────────────────────────
    {
      id: 'page-materiel-mouche-truite',
      title: 'Matériel pêche de la truite à la mouche',
      slug: 'materiel-mouche-truite',
      seoTitle: 'Matériel pour la pêche de la truite à la mouche — Jean-Baptiste Vidal',
      seoDescription: 'Cannes légères, soies et mouches pour la pêche de la truite fario en rivière et en réservoir en Bretagne.',
      sections: await resolveImages([
        sectionHero({
          _imgFile: 'materiel-truite-1.jpg',
          eyebrow: 'Truite fario · Truite de mer · Réservoir',
          titre: 'Matériel pour la pêche de la truite',
          sousTitre: 'Cannes légères 7 à 9 pieds, soies RIO et mouches sèches pour les rivières de Bretagne',
          lien1: '/peche-de-la-truite-a-la-mouche-en-bretagne', label1: 'Stages truite',
          lien2: '/materiel-jeanbaptistevidal', label2: '← Tout le matériel',
        }),
        sectionMaterielIntro({
          titre: 'Matériel pour la pêche de la truite à la mouche en Bretagne',
          specs: [
            { label: 'Espèces cibles', valeur: 'Truite fario · Truite de mer · Arc-en-ciel' },
            { label: 'Rivières Bretagne', valeur: 'Odet · Jet · Steïr · Elorn · Aven · Penzé · Queffleuth' },
            { label: 'Cannes recommandées', valeur: 'SAGE Sonic · SAGE TROUT LL · SAGE R8 Core · SAGE DART' },
            { label: 'Soies', valeur: 'Rio Gold · Rio Technical Trout · Rio Creek' },
            { label: 'Bas de ligne', valeur: '3,5 à 4,5 m, pointe 16° à 10°' },
          ],
          texte: [
            p('Rivières bretonnes : Odet, Jet, Steïr, Elorn, Ster Goz, Aven, Penzé, Queffleuth — généralement étroites à moyennes, souvent boisées.'),
            h3('Cannes pour la rivière (7 à 9 pieds)'),
            p('SAGE Sonic 8,6 pieds #4 — polyvalence et précision. SAGE TROUT LL 8,6 pieds #4 — ultra-légère, pêche sèche. SAGE R8 Core 8,6 pieds #4 — technique et précis. SAGE DART 7,6 pieds #3 — petits ruisseaux.'),
            h3('Soies pour la truite en rivière'),
            p('Rio Gold — référence polyvalente, sèche et nymphe légère. Rio Trout Intouch — sensibilité et détection des touches. Rio Technical Trout Elite — pêcheurs avancés. Rio Creek — courtes distances avec SAGE DART.'),
            h3('Bas de ligne et fil'),
            p('Longueur 3,5 à 4,5 mètres. Pointes 16° à 10° selon la mouche. Rio Powerflex nylon recommandé.'),
            h3('Pêche en réservoir'),
            p('Cannes 9 pieds #6 à #8, gamme SONIC. 3 soies nécessaires : flottante / flottante à pointe intermédiaire / plongeante. Réservoirs : Drennec, Saint-Michel, Toul Dour.'),
          ],
        }),
        sectionEquipement({
          titre: 'Mouches pour la truite',
          items: [
            { titre: 'Mouches sèches', description: 'Sédges, Baetis rhodanis, March Brown, éphémères de mai. Imitations d\'éphéméroptères tailles 14-16, printemps et début d\'été.', lien: null, labelLien: null },
            { titre: 'Nymphes et émergentes', description: 'Duck tail emergers, patterns à corps de lièvre, imitations d\'Ignita. Nymphe au fil dans courants rapides et fosses.', lien: null, labelLien: null },
            { titre: 'Réservoir', description: 'Streamers, imitations de sédges, terrestrials (tipules), chironomes. Boobies et nymphes plombées en profondeur.', lien: null, labelLien: null },
          ],
        }),
        sectionCarrousel({
          _imgs: ['materiel-truite-1.jpg', 'materiel-truite-2.jpg', 'materiel-truite-3.jpg', 'materiel-truite-4.jpg'],
        }),
        sectionMaterielNav({ liens: navLiens('truite') }),
        sectionCta({
          titre: 'Réservez votre stage truite',
          sousTitre: 'Initiation et perfectionnement à la pêche de la truite à la mouche en Bretagne.',
          lien1: '/contact', label1: 'Me contacter',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
      ]),
    },

    // ── 8. MOUCHES ─────────────────────────────────────────────────
    {
      id: 'page-mouches-de-peche-jeanbaptiste-vidal',
      title: 'Mes mouches de pêche',
      slug: 'mouches-de-peche-jeanbaptiste-vidal',
      seoTitle: 'Mes mouches de pêche — Jean-Baptiste Vidal, Guide Bretagne',
      seoDescription: 'Mouches à saumon, nymphes, streamers bar et mouches à alose — les patterns montés et utilisés par Jean-Baptiste Vidal.',
      sections: await resolveImages([
        sectionHero({
          _imgFile: 'A3.avif',
          eyebrow: 'Saumon · Truite · Bar · Alose · Réservoir',
          titre: 'Mes mouches de pêche',
          sousTitre: 'Je monte toutes mes mouches personnellement, pour la France et l\'étranger. Patterns testés saison après saison sur mes rivières et estuaires de Bretagne.',
          lien1: '/contact', label1: 'Réserver une sortie',
          lien2: '/materiel-jeanbaptistevidal', label2: 'Tout le matériel',
        }),
        sectionMaterielIntro({
          titre: 'L\'art du montage',
          specs: [
            { label: 'Saumon atlantique', valeur: 'Ally\'s Shrimp · Cascade · Mouches noires · Green Highlander' },
            { label: 'Truite & Réservoir', valeur: 'Nymphes · Chironomes · Blob · Shipman Buzzer' },
            { label: 'Bar à la mouche', valeur: 'Streamers · Deceivers · Clousers · Poppers' },
            { label: 'Alose feinte', valeur: 'Mouches légères argentées et cuivrées' },
            { label: 'Brochet', valeur: 'Gros streamers · Pike flies · Tube flies' },
            { label: 'Photos', valeur: 'Droits réservés ENJOYFISHING · JB Vidal · Erwan Balanca' },
          ],
          texte: [
            p('Ah les mouches ! C\'est bien sûr grâce à elles que nous arrivons à leurrer et attraper nos poissons.'),
            p('Pour toutes mes pêches, que ce soit en France ou à l\'étranger, je monte toutes mes mouches personnellement.'),
            p('Voici une sélection de mes mouches à saumons, truites, brochets et aloses. Je mettrai la liste à jour en y ajoutant mes nouveaux modèles.'),
          ],
        }),
        sectionCarrousel({
          _imgs: [
            'A1.avif', 'A2.avif', 'A3.avif', 'A4.avif', 'A5.avif', 'A6.avif',
            'A7.avif', 'A8.avif', 'A9.avif', 'A10.avif', 'A11.avif', 'A12.avif',
            'A13.avif', 'A14.avif', 'A15.avif', 'A16.avif', 'A17.avif', 'A18.avif',
          ],
        }),
        sectionVideos({
          titre: 'Tutoriels de montage',
          lienChaine: 'https://www.youtube.com/@EnjoyFishing29',
          labelChaine: 'Toutes les vidéos Enjoy Fishing',
          items: [
            { titre: 'Montage d\'une mouche à alose', youtubeId: '9x2h5ezHV1Q', espece: 'Alose', description: 'La mouche à alose doit être légère, vive et bien visible dans le courant. Pattern argenté utilisé sur les estuaires bretons.' },
            { titre: 'Montage d\'une mouche à bar', youtubeId: 'oPICIIxRAOs', espece: 'Bar', description: 'Streamer côtier monté sur hameçon simple, imitation de sand-eel efficace sur les estuaires et pointes rocheuses de Bretagne.' },
            { titre: 'Montage d\'une mouche à saumon', youtubeId: 'lmozx1gYlrE', espece: 'Saumon', description: 'Pattern classique pour le saumon atlantique, adapté aux rivières bretonnes et aux eaux colorées de printemps.' },
            { titre: 'Montage Blob Tequila', youtubeId: 'OIY4fU5CCJY', espece: 'Réservoir', description: 'Le Blob Tequila est une valeur sûre pour la truite de réservoir : couleur vive, matière pulsante.' },
            { titre: 'Montage Blob', youtubeId: 't0f7sUPtd4k', espece: 'Réservoir', description: 'Version épurée du Blob, montée en chenille UV. Attractor incontournable pour plans d\'eau et réservoirs.' },
            { titre: 'Montage Shipman Buzzer', youtubeId: '_bkGYL2fT2E', espece: 'Réservoir', description: 'Imitation de chironome en surface, pêché en nymphe suspendue dans le film.' },
            { titre: 'Montage Chironome', youtubeId: 'kfSsPhmB1NM', espece: 'Truite', description: 'Nymphe de chironome en thorax sur hameçon courbe. L\'imitation la plus réaliste lors des éclosions.' },
            { titre: 'Montage nymphe de Chironome', youtubeId: 'YgRwUQWw5Qo', espece: 'Truite', description: 'Variante de nymphe de chironome avec corps segmenté et thorax en dubbing.' },
          ],
        }),
        sectionCta({
          titre: 'Sortie guidée avec les bonnes mouches',
          sousTitre: 'Lors de chaque guidage, vous bénéficiez de mes sélections testées sur le terrain.',
          lien1: '/contact', label1: 'Me contacter',
          lien2: 'tel:0687303456', label2: '06 87 30 34 56',
        }),
      ]),
    },
  ]
}

// ── Créer publié + brouillon ──────────────────────────────────────────────────
async function createPage(page) {
  console.log(`\n📄 ${page.title} (/${page.slug})`)
  const base = {
    _type: 'page',
    title: page.title,
    slug: { _type: 'slug', current: page.slug },
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    pagebuilder: page.sections,
  }

  // Document publié
  await client.createOrReplace({ _id: page.id, ...base })
  console.log(`  ✅ Publié : ${page.id}`)

  // Brouillon (visible dans Studio)
  await client.createOrReplace({ _id: `drafts.${page.id}`, ...base })
  console.log(`  ✅ Brouillon : drafts.${page.id}`)
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log('🎣 Création des pages matériel dans Sanity...\n')
const pages = await buildPages()
for (const page of pages) {
  await createPage(page)
}
console.log('\n✅ Toutes les pages créées (publiées + brouillons) !')
console.log('👉 Dans Sanity Studio : rafraîchis la page pour voir les sections éditables.')
