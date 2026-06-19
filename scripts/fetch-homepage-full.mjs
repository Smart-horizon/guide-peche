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
    "sections": pagebuilder[]
  }
`)

console.log(JSON.stringify(hp, null, 2))
