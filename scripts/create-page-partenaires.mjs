// create-page-partenaires.mjs
// Crée le document page /partenaires-jeanbaptistevidal dans Sanity avec sections pagebuilder

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

const doc = {
  _id: 'page-partenaires-jeanbaptistevidal',
  _type: 'page',
  title: 'Mes partenaires',
  slug: { _type: 'slug', current: 'partenaires-jeanbaptistevidal' },
  seoTitle: 'Partenaires — Jean-Baptiste Vidal, Guide de pêche à la mouche Bretagne',
  seoDescription: 'Découvrez les marques et partenaires qui accompagnent Jean-Baptiste Vidal : SAGE, SIMMS, RIO, Costa del Mar, DHD LAIKA et bien d\'autres.',
  pagebuilder: [
    {
      _type: 'sectionHero',
      _key: 'part-hero',
      eyebrow: 'Matériel · Partenaires · Voyages',
      titre: 'Mes partenaires',
      sousTitre: "Des partenariats construits sur la confiance et l'exigence : les marques que j'utilise au quotidien sur le terrain, en Bretagne et à l'étranger.",
      hauteur: 'medium',
      btnReserverTexte: 'Réserver une sortie',
      btnReserverLien: '/contact',
    },
    {
      _type: 'sectionTexte',
      _key: 'part-intro',
      texte: [
        {
          _type: 'block',
          _key: 'part-intro-p1',
          style: 'normal',
          markDefs: [],
          children: [{
            _type: 'span',
            _key: 'part-intro-s1',
            text: "Au fil des années, j'ai noué des partenariats solides avec des marques qui partagent ma vision de la pêche à la mouche : l'exigence du matériel, le respect des milieux naturels et la passion du poisson sauvage. Retrouvez ci-dessous toutes les marques et organisations avec lesquelles je collabore, du matériel que j'utilise chaque jour à l'agence qui organise mes voyages de pêche exotique.",
            marks: [],
          }],
        },
      ],
      largeur: 'normal',
      fond: 'sand',
    },
    {
      _type: 'sectionPartenaires',
      _key: 'part-grid',
      fond: 'white',
    },
    {
      _type: 'sectionCta',
      _key: 'part-cta',
      titre: 'Testez le matériel avec moi',
      texte: 'Lors de chaque journée de guidage, vous bénéficiez gratuitement de l\'ensemble de mon matériel partenaire : cannes SAGE, soies RIO, waders Redington.',
      btn1Texte: 'Réserver une sortie',
      btn1Lien: '/contact',
      btn2Texte: 'Voir tout le matériel',
      btn2Lien: '/materiel-jeanbaptistevidal',
      style: 'dark',
    },
  ],
}

console.log('📄 Création du document page partenaires...')
try {
  const result = await client.createOrReplace(doc)
  console.log(`✅ Page créée : ${result._id}`)
  console.log('   slug : /partenaires-jeanbaptistevidal')
  console.log('\nDéploie maintenant : bash deploy.sh')
} catch (err) {
  console.error('❌ Erreur :', err.message)
}
