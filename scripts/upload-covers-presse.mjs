// upload-covers-presse.mjs
// Upload les couvertures depuis public/images/ vers Sanity et les attache aux fiches revuePresse
// Usage: node scripts/upload-covers-presse.mjs

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

const covers = [
  { _id: 'presse-pm153',       file: 'press-pm153.png'        },
  { _id: 'presse-vdp152',      file: 'press-vdp152.png'       },
  { _id: 'presse-livre',       file: 'press-livre.jpg'        },
  { _id: 'presse-pm123',       file: 'press-pm123.png'        },
  { _id: 'presse-pm104',       file: 'press-pm104.jpg'        },
  { _id: 'presse-pm103',       file: 'press-pm103.jpg'        },
  { _id: 'presse-salmo54',     file: 'press-salmo54.jpg'      },
  { _id: 'presse-fieldstreams',file: 'press-fieldstreams.jpg' },
  { _id: 'presse-pm93',        file: 'press-pm93.jpg'         },
  { _id: 'presse-pm92',        file: 'press-pm92.jpg'         },
  { _id: 'presse-pm89',        file: 'press-pm89.jpg'         },
  { _id: 'presse-flylife61',   file: 'press-flylife61.jpg'    },
  { _id: 'presse-vdp2008nov',  file: 'press-vdp2008nov.jpg'   },
  { _id: 'presse-vdp2008aout', file: 'press-vdp2008aout.jpg'  },
  { _id: 'presse-fishfly2007', file: 'press-fishfly2007.gif'  },
]

const imagesDir = join(__dirname, '../public/images')

console.log('🖼️  Upload des couvertures presse vers Sanity...\n')

for (const { _id, file } of covers) {
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

    const asset = await client.assets.upload('image', buffer, { filename: file, contentType })
    await client
      .patch(_id)
      .set({ cover: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
      .commit()

    console.log(`  ✅ ${file} → ${_id}`)
  } catch (err) {
    console.error(`  ❌ ${file} : ${err.message}`)
  }
}

console.log('\n✅ Upload terminé.')
console.log('   Lance ensuite : node scripts/create-page-revue-presse.mjs')
