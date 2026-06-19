import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const DOC_ID = 'drafts.page-accueil'

// Add badges to the FR sectionHero (pagebuilder[0])
await client
  .patch(DOC_ID)
  .set({
    'pagebuilder[_key=="hero-090cea7d"].badges': [
      { _key: 'b1', texte: '21 ans de guidage' },
      { _key: 'b2', texte: '🪶 Exclusivement Mouche', style: 'mouche' },
    ],
  })
  .commit()

console.log('✅ FR badges patched')

// Add badges to the EN sectionHero (pagebuilderEn[0])
await client
  .patch(DOC_ID)
  .set({
    'pagebuilderEn[_key=="hero-090cea7d"].badges': [
      { _key: 'b1', texte: '21 years of guiding' },
      { _key: 'b2', texte: '🪶 Fly fishing only', style: 'mouche' },
    ],
  })
  .commit()

console.log('✅ EN badges patched')
