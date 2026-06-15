// upload-logos-partenaires.mjs
// Upload les logos depuis public/images/ vers Sanity et les attache aux fiches partenaires
// Usage: node scripts/upload-logos-partenaires.mjs

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
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

// Correspondance id-document → fichier logo
const logos = [
  { _id: 'partenaire-ffmgp',        file: 'partner-ffmgp.jpg'        },
  { _id: 'partenaire-orion',        file: 'partner-orion.jpg'        },
  { _id: 'partenaire-sage',         file: 'partner-sage.jpg'         },
  { _id: 'partenaire-simms',        file: 'partner-simms.png'        },
  { _id: 'partenaire-redington',    file: 'partner-redington.jpg'    },
  { _id: 'partenaire-rio',          file: 'partner-rio.gif'          },
  { _id: 'partenaire-costa',        file: 'partner-costa.png'        },
  { _id: 'partenaire-hpa',          file: 'partner-hpa.png'          },
  { _id: 'partenaire-navicom',      file: 'partner-navicom.png'      },
  { _id: 'partenaire-fdp-finistere',file: 'partner-fdp-finistere.png'},
  { _id: 'partenaire-dhdlaika',     file: 'partner-dhdlaika.png'     },
]

const imagesDir = join(__dirname, '../public/images')

console.log('🖼️  Upload des logos partenaires vers Sanity...\n')

for (const { _id, file } of logos) {
  const filePath = join(imagesDir, file)
  if (!existsSync(filePath)) {
    console.warn(`  ⚠️  Fichier introuvable : ${file} — ignoré`)
    continue
  }

  try {
    const buffer = readFileSync(filePath)
    const ext = file.split('.').pop().toLowerCase()
    const mimeTypes = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp' }
    const contentType = mimeTypes[ext] || 'image/jpeg'

    // 1. Upload l'image comme asset Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: file,
      contentType,
    })

    // 2. Patch le document partenaire pour lier le logo
    await client
      .patch(_id)
      .set({ logo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
      .commit()

    console.log(`  ✅ ${file} → ${_id}`)
  } catch (err) {
    console.error(`  ❌ ${file} : ${err.message}`)
  }
}

console.log('\n✅ Upload terminé. Lance bash deploy.sh pour mettre à jour le site.')
