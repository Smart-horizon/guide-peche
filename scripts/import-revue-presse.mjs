// import-revue-presse.mjs
// Importe les 15 articles de presse dans Sanity
// Usage: node scripts/import-revue-presse.mjs

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envContent = readFileSync(join(__dirname, '../.env'), 'utf-8')
const env = {}
for (const line of envContent.split('\n')) {
  const t = line.trim()
  if (!t || t.startsWith('#')) continue
  const idx = t.indexOf('=')
  if (idx === -1) continue
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim()
}

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  token: env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Valeurs LexoRank valides (ordre = du plus récent au plus ancien)
const LEXO_RANKS = [
  '0|hzzzzz:',
  '0|i00007:',
  '0|i0000f:',
  '0|i0000n:',
  '0|i0000v:',
  '0|i00013:',
  '0|i0001b:',
  '0|i0001j:',
  '0|i0001r:',
  '0|i0001z:',
  '0|i00027:',
  '0|i0002f:',
  '0|i0002n:',
  '0|i0002v:',
  '0|i00033:',
]

const articles = [
  {
    _id: 'presse-pm153',
    magazine: 'Pêche Mouche',
    numero: 'N° 153',
    date: 'Novembre–Décembre 2022',
    annee: 2022,
    titre: 'Portrait — Jean-Baptiste Vidal, monsieur Migrateur',
    description: "Portrait signé Erwan Balanca, photographe professionnel. Ce numéro contient également ma rubrique régulière \"Mouches du moment\".",
    type: 'Portrait',
    coverFile: 'press-pm153.png',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-vdp152',
    magazine: 'Voyages de Pêche',
    numero: 'N° 152',
    date: 'Avril–Mai 2022',
    annee: 2022,
    titre: 'Traque du bar à la mouche en Bretagne-Sud',
    description: "Mon article sur la pêche du bar à la mouche dans les estuaires et sur les côtes de Bretagne-Sud : estuaires, platiers rocheux, eaux claires.",
    type: 'Article',
    coverFile: 'press-vdp152.png',
    lien: 'https://www.voyagesdepeche.com/numerique/vdp152/#p=8',
    labelLien: 'Lire le magazine en ligne',
  },
  {
    _id: 'presse-livre',
    magazine: 'Livre',
    numero: null,
    date: '2020',
    annee: 2020,
    titre: '"Merveilles du monde en Bretagne" — Hélène Prigent · Chapitre "Un air de Norvège"',
    description: "Hélène Prigent rend hommage au saumon breton à travers mes photos et mes activités de Moniteur-Guide dans ce bel ouvrage. Disponible à la FNAC et dans les espaces culturels.",
    type: 'Livre',
    coverFile: 'press-livre.jpg',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-pm123',
    magazine: 'Pêche Mouche',
    numero: 'N° 123',
    date: 'Novembre–Décembre 2017',
    annee: 2017,
    titre: 'Rubrique régulière — Mouches du moment',
    description: "Ma rubrique de montage \"Mouches du moment\", puis \"Votre boîte à mouches\", publiée chaque numéro depuis Novembre 2011 jusqu'à l'arrêt du magazine en Janvier 2025.",
    type: 'Rubrique',
    coverFile: 'press-pm123.png',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-pm104',
    magazine: 'Pêche Mouche',
    numero: 'N° 104',
    date: 'Septembre–Octobre 2014',
    annee: 2014,
    titre: 'Traque du bar dans les estuaires bretons + Bonefish de Nouvelle-Calédonie',
    description: "Double article : technique bar sur les estuaires bretons, et voyage en Nouvelle-Calédonie avec \"Les énormes bones du caillou\". Plus un article technique sur les cannes Switch.",
    type: 'Double article',
    coverFile: 'press-pm104.jpg',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-pm103',
    magazine: 'Pêche Mouche',
    numero: 'N° 103',
    date: 'Juillet–Août 2014',
    annee: 2014,
    titre: 'Pêche des castillons en Bretagne',
    description: "Article technique sur la pêche des castillons (saumons d'été) dans les rivières bretonnes, l'une des meilleures destinations en France pour la pêche du saumon.",
    type: 'Article technique',
    coverFile: 'press-pm103.jpg',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-salmo54',
    magazine: 'Revue SALMO',
    numero: 'N° 54',
    date: 'Juin 2014',
    annee: 2014,
    titre: 'Double page — Mes 3 mouches préférées',
    description: "Une double page attribuée à un pêcheur qui présente ses trois mouches préférées ou caractéristiques. Merci à Olivier Plasseraud pour cette publication.",
    type: 'Sélection',
    coverFile: 'press-salmo54.jpg',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-fieldstreams',
    magazine: 'Field & Stream (USA)',
    numero: null,
    date: 'Novembre 2013',
    annee: 2013,
    titre: 'Double page — Guide au lodge de Kau Tapen, Rio Grande',
    description: "Le photographe Tim Romano de Field & Stream nous a rendu visite en 2012 au lodge de Kau Tapen sur le Rio Grande. En l'honneur de mes services de guide et manager, il m'a mis au devant des projecteurs dans cet article.",
    type: 'Magazine US',
    coverFile: 'press-fieldstreams.jpg',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-pm93',
    magazine: 'Pêche Mouche',
    numero: 'N° 93',
    date: 'Novembre–Décembre 2012',
    annee: 2012,
    titre: 'Permit — L\'ultime Challenge',
    description: "Le Mexique et la Baie d'Ascencion, l'une des meilleures destinations pour traquer le permit dans les eaux turquoises de Punta Allen. Une traque passionnante et subtile.",
    type: 'Article voyage',
    coverFile: 'press-pm93.jpg',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-pm92',
    magazine: 'Pêche Mouche',
    numero: 'N° 92',
    date: 'Septembre–Octobre 2012',
    annee: 2012,
    titre: 'Guide de pêche international — une passion, un métier',
    description: "À travers cet article, je fais découvrir le métier des guides de pêche internationaux qui vivent dans des lodges du monde entier pour partager leur passion.",
    type: 'Portrait métier',
    coverFile: 'press-pm92.jpg',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-pm89',
    magazine: 'Pêche Mouche',
    numero: 'N° 89',
    date: 'Mars–Avril 2012',
    annee: 2012,
    titre: 'Grosses truites de mer argentines — Sachez les séduire',
    description: "Article technique sur la pêche de la truite de mer géante du Rio Grande, sous les vents patagoniques et les couchers de soleil les plus beaux que j'ai vus au monde.",
    type: 'Article technique',
    coverFile: 'press-pm89.jpg',
    lien: null,
    labelLien: null,
  },
  {
    _id: 'presse-flylife61',
    magazine: 'Fly Life Magazine (Australie)',
    numero: 'N° 61',
    date: 'Printemps 2010',
    annee: 2010,
    titre: 'Couverture — Pêche en Terre de Feu, Rio Grande',
    description: "Tom Krucera raconte son voyage en Terre de Feu sur le Rio Grande où je l'ai guidé. Belle photos et histoires de pêche. Une première couverture pour moi, merci à lui et à Fly Life !",
    type: '⭐ Couverture',
    coverFile: 'press-flylife61.jpg',
    lien: '/pdfs/article-fly-life-2010.pdf',
    labelLien: "Lire l'article (PDF, EN)",
  },
  {
    _id: 'presse-vdp2008nov',
    magazine: 'Voyages de Pêche',
    numero: null,
    date: 'Novembre 2008',
    annee: 2008,
    titre: 'Les truites géantes du bout du monde',
    description: "Mon expérience sur le Rio Grande en Argentine, là où les truites de mer atteignent des tailles hors norme. Une destination incontournable pour le pêcheur qui s'attaque à la truite de mer.",
    type: 'Article voyage',
    coverFile: 'press-vdp2008nov.jpg',
    lien: '/pdfs/article-voyages-de-peche-truites-tdf-2008.pdf',
    labelLien: "Lire l'article (PDF)",
  },
  {
    _id: 'presse-vdp2008aout',
    magazine: 'Voyages de Pêche',
    numero: null,
    date: 'Août 2008',
    annee: 2008,
    titre: 'La Ponoi au fil des saisons',
    description: "La Ponoi, l'une des meilleures rivières du monde pour le saumon atlantique. J'y ai fait une saison de 5 mois en 2007 au lodge de Ryabaga Camp. Une expérience unique.",
    type: 'Article voyage',
    coverFile: 'press-vdp2008aout.jpg',
    lien: '/pdfs/article-voyages-de-peche-ponoi-russie-2008.pdf',
    labelLien: "Lire l'article (PDF)",
  },
  {
    _id: 'presse-fishfly2007',
    magazine: 'Fish & Fly (USA)',
    numero: 'N° 5',
    date: 'Midseason 2007',
    annee: 2007,
    titre: 'Mini fishing report — Saison sur la Ponoi',
    description: "Petite parution dans le magazine américain Fish & Fly. Ayant guidé le rédacteur en chef Tom Pero sur la Ponoi en 2007, il a souhaité me remercier d'un mini rapport de pêche. J'avais fait un saumon de 18 livres seul en bateau, un moment inoubliable !",
    type: 'Parution',
    coverFile: 'press-fishfly2007.gif',
    lien: null,
    labelLien: null,
  },
]

console.log(`📰 Import de ${articles.length} articles de presse dans Sanity...\n`)

for (let i = 0; i < articles.length; i++) {
  const { _id, coverFile, lien, labelLien, ...fields } = articles[i]
  const doc = {
    _id,
    _type: 'revuePresse',
    orderRank: LEXO_RANKS[i],
    ...fields,
    ...(lien ? { lien } : {}),
    ...(labelLien ? { labelLien } : {}),
  }

  try {
    const result = await client.createOrReplace(doc)
    console.log(`  ✅ ${fields.magazine}${fields.numero ? ' ' + fields.numero : ''} (${fields.annee}) → ${result._id}`)
  } catch (err) {
    console.error(`  ❌ ${fields.titre} : ${err.message}`)
  }
}

console.log('\n✅ Import terminé.')
console.log('   Lance ensuite : node scripts/upload-covers-presse.mjs')
