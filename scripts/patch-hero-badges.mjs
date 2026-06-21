import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// Cherche le document homepage (publié ET brouillon)
const docs = await client.fetch(
  `*[_type == "page" && slug.current == "/"]{ _id, pagebuilder[]{ _key, _type } }`
)
console.log('Documents trouvés :', docs.map(d => d._id))

for (const doc of docs) {
  const heroItem = doc.pagebuilder?.find(s => s._type === 'sectionHero')
  if (!heroItem) {
    console.log(`  ⚠️  ${doc._id} — pas de sectionHero dans pagebuilder`)
    continue
  }

  console.log(`  Patch ${doc._id} — sectionHero key = ${heroItem._key}`)

  await client
    .patch(doc._id)
    .set({
      // Badges FR (affichés sur /  )
      [`pagebuilder[_key=="${heroItem._key}"].badges`]: [
        { _key: 'badge-guidage', texte: '21 ans de guidage',      style: 'default' },
        { _key: 'badge-mouche',  texte: '🪶 Exclusivement Mouche', style: 'mouche'  },
      ],
      // Badges EN (affichés sur /en/ — champ badgesEn dans le même sectionHero)
      [`pagebuilder[_key=="${heroItem._key}"].badgesEn`]: [
        { _key: 'badge-en-guidage', texte: '21 years of guiding', style: 'default' },
        { _key: 'badge-en-mouche',  texte: '🪶 Fly fishing only', style: 'mouche'  },
      ],
    })
    .commit()

  console.log(`  ✅ ${doc._id} patché`)
}

console.log('\nTerminé.')
