import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const translations = {
  'partenaire-ffmgp': {
    tagEn: 'Professional body',
    descriptionEn: 'I am a member of the FFMGP, the federation representing professional fly fishing guides in France. Visit their website to find a guide or get information about fly fishing.',
  },
  'partenaire-orion': {
    tagEn: 'Tackle distributor',
    descriptionEn: 'Orion Fly Fishing is the French distributor for SAGE, REDINGTON and RIO brands. Their shop Ardent Pêche, located in Pontivy, is a top destination for fly fishers. Since 2015, this partnership lets me test and use the finest rods, reels and lines — all available for you to try free of charge during your sessions with me.',
  },
  'partenaire-sage': {
    tagEn: 'Rod & reel',
    descriptionEn: 'Through my partnership with Ardent Pêche, I am equipped each year with SAGE rods and reels — tools recognised worldwide for their quality and precision. You are welcome to try them during your guided days with me.',
  },
  'partenaire-simms': {
    tagEn: 'Fishing clothing',
    descriptionEn: 'A member of the SIMMS Guide Program since 2007. The absolute benchmark for fishing clothing: waders, boots, jackets — premium products I use every day for all my fishing in Brittany and abroad.',
  },
  'partenaire-redington': {
    tagEn: 'Rod & waders',
    descriptionEn: 'You can try Redington rods, reels and waders during your sessions with me. A reliable brand offering excellent value for money, ideal for anglers who are starting out or looking to improve.',
  },
  'partenaire-rio': {
    tagEn: 'Lines & leaders',
    descriptionEn: 'RIO lines are my go-to choice for all my fishing — sea bass, trout, salmon and saltwater species. Through the Ardent Pêche partnership, you will discover and use them during your sessions with me.',
  },
  'partenaire-costa': {
    tagEn: 'Polarised sunglasses',
    descriptionEn: 'I have been wearing Costa del Mar sunglasses for over 10 years, in France and abroad. The 580 lenses provide the best polarisation on the market — essential for sight fishing sea bass and bonefish on the flats.',
  },
  'partenaire-hpa': {
    tagEn: 'Waterproof bags',
    descriptionEn: 'I have been using HPA waterproof bags for years: panniers, hip packs and dry bags built to professional standard. The INFLADRY bag is particularly good for days on the water — nothing gets in, nothing gets out.',
  },
  'partenaire-navicom': {
    tagEn: 'Marine electronics',
    descriptionEn: 'Since 2018, my partnership with Navicom allows me to source quality marine electronics at trade price. I have equipped my boat with a Humminbird fish finder and a Minn Kota electric motor — both essential for my sea bass and pike fishing.',
  },
  'partenaire-fdp-finistere': {
    tagEn: 'Fishing federation',
    descriptionEn: "The Finistère Federation for Fishing and Aquatic Environment Protection works to preserve Brittany's rivers and water ecosystems. I support their efforts to protect local fish stocks and habitats.",
  },
  'partenaire-dhdlaika': {
    tagEn: 'Fishing trips',
    descriptionEn: 'Since late 2023, I have been developing a partnership with DHD LAIKA Agency to offer guided fishing trips to destinations around the world: Los Roques in Venezuela, Xcalak in Mexico, and more to come.',
  },
}

for (const [id, fields] of Object.entries(translations)) {
  try {
    const result = await client.patch(id).set(fields).commit()
    console.log(`✅ ${result._id} — tagEn + descriptionEn patched`)
  } catch (e) {
    console.warn(`⚠️  ${id} — ${e.message}`)
  }
}

console.log('\nTerminé.')
