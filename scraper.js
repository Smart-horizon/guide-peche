import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import https from 'https'

const BASE_URL = 'https://www.jeanbaptistevidalguidepeche.com'

const PAGES = [
  '/',
  '/jean-baptiste-vidal-moniteur-guide-de-peche',
  '/temoignages-avis-jeanbaptiste-vidal',
  '/stage-peche-jeanbaptiste-vidal',
  '/stage-peche-mouche',
  '/tarifs',
  '/disponibilites-guidages',
  '/bon-cadeau-peche-mouche',
  '/peche-a-la-mouche-en-bretagne',
  '/initiation-peche-a-la-mouche',
  '/peche-de-l-alose-a-la-mouche',
  '/peche-de-la-truite-a-la-mouche-en-bretagne',
  '/peche-de-la-truite-en-reservoir',
  '/peche-du-brochet-a-la-mouche',
  '/materiel-jeanbaptistevidal',
  '/mouches-de-peche-jeanbaptiste-vidal',
  '/peche-du-bar-a-la-mouche',
  '/initiation-peche-du-bar-a-la-mouche',
  '/peche-du-bar-perfectionnement',
  '/peche-mouche-bar-bateau-bretagne',
  '/peche-du-bar-a-vue-a-la-mouche',
  '/peche-du-bar-a-la-mouche-coaching',
  '/bateau-bar-a-la-mouche',
  '/masterclass',
  '/master-class-peche-en-reservoir',
  '/master-class-nymphe-au-fil',
  '/stage-spey-cast-et-cours-de-lancer',
  '/stage-spey-cast',
  '/cours-de-lancer-peche-a-la-mouche',
  '/voyages-peche-mouche',
  '/voyage-peche-argentine-rio-grande-truite-de-mer',
  '/peche-mouche-cuba-cayo-cruz',
  '/peche-mouche-cuba-cayo-santa-maria',
  '/los-roques-venezuela',
  '/voyage-peche-mouche-mexique',
  '/contact-jeanbaptiste-vidal-guide-de-peche',
  '/partenaires-jeanbaptistevidal',
  '/videos-jeanbaptiste-vidal-moniteur-guide-de-peche',
]

// Créer les dossiers
if (!fs.existsSync('scraped')) fs.mkdirSync('scraped')
if (!fs.existsSync('scraped/images')) fs.mkdirSync('scraped/images')

function downloadImage(url, filename) {
  return new Promise((resolve) => {
    const filepath = `scraped/images/${filename}`
    if (fs.existsSync(filepath)) return resolve(filepath)
    const file = fs.createWriteStream(filepath)
    https.get(url, res => {
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve(filepath) })
    }).on('error', () => resolve(null))
  })
}

async function scrapePage(url) {
  try {
    const res = await axios.get(BASE_URL + url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    })
    const $ = cheerio.load(res.data)

    const title = $('title').text().trim()
    const description = $('meta[name="description"]').attr('content') || ''

    // Textes
    const textes = []
    $('p, h1, h2, h3').each((_, el) => {
      const t = $(el).text().trim()
      if (t.length > 30) textes.push(t)
    })

    // Images
    const images = []
    $('img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src')
      const alt = $(el).attr('alt') || ''
      if (src && src.includes('wixstatic.com') && !src.includes('blur')) {
        images.push({ src, alt })
      }
    })

    console.log(`✅ ${url} — ${textes.length} textes, ${images.length} images`)

    return { url, title, description, textes, images }
  } catch (e) {
    console.log(`❌ ${url} — ${e.message}`)
    return { url, error: e.message }
  }
}

async function main() {
  console.log('🎣 Démarrage du scraping...\n')
  const results = []

  for (const page of PAGES) {
    const data = await scrapePage(page)
    results.push(data)
    await new Promise(r => setTimeout(r, 1000))
  }

  // Télécharger les images
  console.log('\n📸 Téléchargement des images...')
  for (const page of results) {
    if (page.images) {
      for (let i = 0; i < page.images.length; i++) {
        const img = page.images[i]
        const ext = img.src.split('.').pop().split('?')[0] || 'jpg'
        const filename = `${page.url.replace(/\//g, '_')}_${i}.${ext}`
        await downloadImage(img.src, filename)
        img.localFile = filename
      }
    }
  }

  fs.writeFileSync('scraped/contenu.json', JSON.stringify(results, null, 2))
  console.log('\n🎉 Scraping terminé ! Fichier : scraped/contenu.json')
}

main()