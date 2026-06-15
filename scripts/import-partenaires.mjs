// import-partenaires.mjs
// Usage: node scripts/import-partenaires.mjs
// Crée les 11 fiches partenaires dans Sanity (createOrReplace — sans doublons si relancé)

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

// orderRank générés par fractional-indexing (séquence pour 11 items)
const ORDER_RANKS = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'aA']

const partners = [
  {
    _id: 'partenaire-ffmgp',
    nom: 'FFMGP',
    nomComplet: 'Fédération Française des Moniteurs Guides de Pêche',
    tag: 'Organisme professionnel',
    description: "Je suis membre de la FFMGP, la fédération qui regroupe les moniteurs-guides de pêche professionnels en France. Consultez leur site pour trouver un guide ou obtenir des renseignements sur la pêche à la mouche.",
    url: 'https://www.ffmgp.com/',
    labelLien: 'ffmgp.com',
  },
  {
    _id: 'partenaire-orion',
    nom: 'Orion Fly Fishing · Ardent Pêche',
    nomComplet: 'Orion Fly Fishing · Ardent Pêche — Pontivy',
    tag: 'Distributeur matériel',
    description: "Orion Fly Fishing est l'importateur des marques SAGE, REDINGTON et RIO en France. Leur magasin Ardent Pêche, situé à Pontivy, est une adresse de choix. Depuis 2015, ce partenariat me permet de tester et d'utiliser les meilleures cannes, moulinets et soies, que vous pourrez essayer gratuitement lors de vos journées en ma compagnie.",
    url: 'https://ardent-peche.com/',
    labelLien: 'ardent-peche.com',
  },
  {
    _id: 'partenaire-sage',
    nom: 'SAGE',
    nomComplet: 'Sage Fly Fishing',
    tag: 'Canne & moulinet',
    description: "Grâce à mon partenariat avec Ardent Pêche, je bénéficie chaque année des cannes et moulinets SAGE, des outils reconnus dans le monde entier pour leur qualité et leur précision. Vous pourrez les essayer lors de vos journées en ma compagnie.",
    url: 'https://www.sageflyfish.com/',
    labelLien: 'sageflyfish.com',
  },
  {
    _id: 'partenaire-simms',
    nom: 'SIMMS',
    nomComplet: 'Simms Fishing Products',
    tag: 'Vêtements de pêche',
    description: "Membre du Guide Program chez SIMMS depuis 2007. La référence absolue en matière de vêtements de pêche : waders, bottes, vestes, des produits premium que j'utilise au quotidien pour toutes mes pêches en Bretagne et à l'étranger.",
    url: 'https://www.simmsfishing.com/',
    labelLien: 'simmsfishing.com',
  },
  {
    _id: 'partenaire-redington',
    nom: 'Redington',
    nomComplet: 'Redington Fly Fishing',
    tag: 'Canne & waders',
    description: "Vous pourrez essayer les cannes, moulinets et waders Redington lors de vos journées en ma compagnie. Une marque sérieuse qui propose d'excellents rapports qualité/prix, idéale pour les pêcheurs qui débutent ou progressent.",
    url: 'https://www.redington.com/',
    labelLien: 'redington.com',
  },
  {
    _id: 'partenaire-rio',
    nom: 'RIO Products',
    nomComplet: 'RIO Fly Lines',
    tag: 'Soies & bas de ligne',
    description: "Les soies RIO sont mes soies de référence pour toutes mes pêches : bar, truite, saumon, poissons exotiques. Grâce au partenariat avec Ardent Pêche, vous les découvrirez et les utiliserez lors de vos sorties en ma compagnie.",
    url: 'https://www.rioproducts.com/',
    labelLien: 'rioproducts.com',
  },
  {
    _id: 'partenaire-costa',
    nom: 'Costa del Mar',
    nomComplet: 'Costa del Mar — Polarisantes',
    tag: 'Optique polarisante',
    description: "J'utilise les lunettes Costa del Mar depuis plus de 10 ans pour toutes mes pêches en France et à l'étranger. Les verres 580 offrent la meilleure polarisation du marché, indispensables pour les pêches à vue du bar et des poissons des flats.",
    url: 'https://www.costadelmar.com/',
    labelLien: 'costadelmar.com',
  },
  {
    _id: 'partenaire-hpa',
    nom: 'HPA',
    nomComplet: 'HPA — Bagagerie étanche',
    tag: 'Bagagerie étanche',
    description: "J'utilise la bagagerie HPA depuis des années : sacoches, bananes et sacs étanches de qualité professionnelle. Le sac INFLADRY est particulièrement intéressant pour les journées sur l'eau, rien ne rentre, rien ne sort.",
    url: 'https://www.hpa-shop.fr/',
    labelLien: 'hpa-shop.fr',
  },
  {
    _id: 'partenaire-navicom',
    nom: 'Navicom · We-Van',
    nomComplet: 'Navicom — Électronique marine',
    tag: 'Électronique marine',
    description: "Depuis 2018, mon partenariat avec Navicom me permet d'acquérir du matériel électronique de qualité à prix pro. J'ai ainsi équipé mon bateau d'un sondeur Humminbird et d'un moteur électrique Minn Kota, essentiels pour mes pêches du bar et du brochet.",
    url: 'https://www.navicom.fr/',
    labelLien: 'navicom.fr',
  },
  {
    _id: 'partenaire-fdp-finistere',
    nom: 'Fédération Pêche Finistère',
    nomComplet: 'Fédération de Pêche du Finistère',
    tag: 'Fédération pêche',
    description: "La Fédération de Pêche et de Protection du Milieu Aquatique du Finistère œuvre pour la préservation des rivières et milieux aquatiques bretons. Je soutiens leur démarche pour la protection du patrimoine piscicole local.",
    url: 'https://www.peche-en-finistere.fr/',
    labelLien: 'peche-en-finistere.fr',
  },
  {
    _id: 'partenaire-dhdlaika',
    nom: 'DHD LAIKA',
    nomComplet: 'Agence DHD LAIKA — Voyages de pêche',
    tag: 'Voyages de pêche',
    description: "Depuis fin 2023, je développe un partenariat avec l'Agence DHD LAIKA pour vous proposer de m'accompagner en voyage sur différentes destinations dans le monde : Los Roques au Venezuela, Xcalak au Mexique, et bien d'autres destinations à venir.",
    url: 'https://www.agence-dhdlaika.com/',
    labelLien: 'agence-dhdlaika.com',
  },
]

console.log(`🤝 Import de ${partners.length} partenaires dans Sanity...\n`)

for (let i = 0; i < partners.length; i++) {
  const { _id, ...fields } = partners[i]
  const doc = {
    _id,
    _type: 'partenaire',
    orderRank: ORDER_RANKS[i],
    ...fields,
  }

  try {
    const result = await client.createOrReplace(doc)
    console.log(`  ✅ ${fields.nom} → ${result._id}`)
  } catch (err) {
    console.error(`  ❌ ${fields.nom} : ${err.message}`)
  }
}

console.log('\n✅ Import terminé. Lance bash deploy.sh pour mettre à jour le site.')
console.log('   Tu peux aussi réorganiser les fiches par drag-and-drop dans le Studio avant le deploy.')
