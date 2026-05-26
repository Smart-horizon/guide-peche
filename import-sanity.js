import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const contenu = JSON.parse(fs.readFileSync('scraped/contenu.json', 'utf8'))

function slugify(url) {
  return url.replace(/^\//, '').replace(/\//g, '-') || 'accueil'
}

function textToBlocks(textes) {
  return textes.slice(0, 5).map(t => ({
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'normal',
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: t }]
  }))
}

async function uploadImage(imagePath) {
  try {
    const fullPath = path.join('scraped/images', imagePath)
    if (!fs.existsSync(fullPath)) return null
    const asset = await client.assets.upload('image', createReadStream(fullPath), {
      filename: imagePath
    })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (e) {
    return null
  }
}

async function main() {
  console.log('🚀 Import dans Sanity...\n')

  for (const page of contenu) {
    if (page.error) continue

    const slug = slugify(page.url)
    const firstImage = page.images?.[0]

    let image = null
    if (firstImage?.localFile) {
      console.log(`📸 Upload image: ${firstImage.localFile}`)
      image = await uploadImage(firstImage.localFile)
    }

    const doc = {
      _type: 'page',
      _id: `page-${slug}`,
      title: page.title?.split(' - ')[0] || slug,
      slug: { _type: 'slug', current: slug === 'accueil' ? '/' : slug },
      contenu: textToBlocks(page.textes || []),
      seoTitle: page.title || '',
      seoDescription: page.description || '',
    }

    if (image) doc.image = image

    try {
      await client.createOrReplace(doc)
      console.log(`✅ ${page.url}`)
    } catch (e) {
      console.log(`❌ ${page.url} — ${e.message}`)
    }
  }

  console.log('\n🎉 Import terminé !')
}

main()