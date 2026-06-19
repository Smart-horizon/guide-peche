import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const hp = await client.fetch(`
  *[_type == "page" && slug.current == "/"][0]{
    _id,
    "sections": pagebuilder[]{_type, titre, eyebrow, sousTitre, description, btnReserverTexte, btnReserverLien}
  }
`)

console.log('Homepage _id:', hp._id)
console.log('\nSections:')
hp.sections?.forEach((s, i) => {
  console.log(`\n[${i}] _type: ${s._type}`)
  if (s.eyebrow)   console.log('  eyebrow:', s.eyebrow)
  if (s.titre)     console.log('  titre:', s.titre)
  if (s.sousTitre) console.log('  sousTitre:', s.sousTitre)
  if (s.description) console.log('  description:', s.description?.substring?.(0, 80) || JSON.stringify(s.description)?.substring(0, 80))
  if (s.btnReserverTexte) console.log('  btnReserverTexte:', s.btnReserverTexte)
})
