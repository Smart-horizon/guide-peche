// reset-orderrank-partenaires.mjs
// Corrige les orderRank des partenaires : remplace a0/a1/... par des valeurs LexoRank valides
// Usage: node scripts/reset-orderrank-partenaires.mjs

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

// Valeurs LexoRank valides générées par le plugin (bien espacées, drag-and-drop fonctionnel)
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
]

// Ordre actuel des partenaires (FFMGP en 1er, DHD LAIKA en dernier)
const ORDER = [
  'partenaire-ffmgp',
  'partenaire-orion',
  'partenaire-sage',
  'partenaire-simms',
  'partenaire-redington',
  'partenaire-rio',
  'partenaire-costa',
  'partenaire-hpa',
  'partenaire-navicom',
  'partenaire-fdp-finistere',
  'partenaire-dhdlaika',
]

console.log('🔧 Reset des orderRank partenaires → format LexoRank...\n')

for (let i = 0; i < ORDER.length; i++) {
  const _id = ORDER[i]
  const orderRank = LEXO_RANKS[i]
  try {
    await client.patch(_id).set({ orderRank }).commit()
    console.log(`  ✅ ${_id.replace('partenaire-', '')} → ${orderRank}`)
  } catch (err) {
    console.error(`  ❌ ${_id} : ${err.message}`)
  }
}

console.log('\n✅ Reset terminé. Le drag-and-drop devrait maintenant fonctionner dans le Studio.')
console.log('   Lance bash deploy.sh après avoir réorganisé l\'ordre si nécessaire.')
