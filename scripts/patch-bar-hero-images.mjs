/**
 * Upload les images hero pour les pages Bar et les injecte dans le sectionHero Sanity
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images')

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// Mapping : id Sanity → image locale à utiliser pour le hero
const BAR_PAGES = [
  {
    id: 'prestation-initiation-peche-du-bar-a-la-mouche',
    heroImage: 'bar-initiation-6.jpg',        // 256KB — bar initiation pied
    label: 'Initiation Bar',
  },
  {
    id: 'prestation-peche-du-bar-perfectionnement',
    heroImage: 'bar-perf-9.jpg',              // 536KB — scene peche bar perf
    label: 'Perfectionnement Bar',
  },
  {
    id: 'prestation-peche-mouche-bar-bateau-bretagne',
    heroImage: 'bar-bateau-hq-2.jpg',         // 284KB — bateau en action
    label: 'Bar en bateau',
  },
  {
    id: 'prestation-peche-du-bar-a-vue-a-la-mouche',
    heroImage: 'bar-vue-hq-4.jpg',            // 2.9MB HQ — bar à vue estuaire
    label: 'Bar à vue',
  },
  {
    id: 'prestation-peche-du-bar-a-la-mouche-coaching',
    heroImage: 'bar-coaching-6.jpg',          // 348KB — coaching bar
    label: 'Coaching Bar',
  },
  {
    id: 'prestation-bateau-bar-a-la-mouche',
    heroImage: 'bar-bateau-hq-1.jpg',         // 1.8MB HQ — Carolina Skiff
    label: 'Le bateau',
  },
]

async function uploadImage(imagePath, label) {
  const ext = path.extname(imagePath).toLowerCase()
  const mimeMap = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.avif': 'image/avif', '.png': 'image/png', '.webp': 'image/webp' }
  const mimeType = mimeMap[ext] || 'image/jpeg'
  const stream = fs.createReadStream(imagePath)
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(imagePath),
    contentType: mimeType,
  })
  console.log(`  ✓ Upload [${label}] → ${asset._id}`)
  return asset
}

async function patchHeroImage(docId, assetId, label) {
  // On récupère le pagebuilder pour trouver la clé du sectionHero
  const doc = await client.fetch(`*[_id == $id][0]{ pagebuilder[]{ _key, _type } }`, { id: docId })
  const hero = doc?.pagebuilder?.find(s => s._type === 'sectionHero')
  if (!hero) {
    console.log(`  ⚠️  Pas de sectionHero pour ${label} — skipped`)
    return
  }

  await client
    .patch(docId)
    .set({
      [`pagebuilder[_key=="${hero._key}"].image`]: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      },
    })
    .commit()

  console.log(`  ✓ Patched hero image → ${label} (key: ${hero._key})`)
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('SANITY_TOKEN manquant')
    process.exit(1)
  }

  for (const page of BAR_PAGES) {
    console.log(`\n📸 ${page.label}`)
    const imagePath = path.join(IMAGES_DIR, page.heroImage)

    if (!fs.existsSync(imagePath)) {
      console.log(`  ⚠️  Image introuvable : ${imagePath}`)
      continue
    }

    const asset = await uploadImage(imagePath, page.label)
    await patchHeroImage(page.id, asset._id, page.label)
  }

  console.log('\n✅ Terminé — toutes les images hero Bar sont patchées dans Sanity')
}

main().catch(err => { console.error(err); process.exit(1) })
