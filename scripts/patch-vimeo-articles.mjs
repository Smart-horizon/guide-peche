/**
 * patch-vimeo-articles.mjs
 * Insère les blocs Vimeo manquants dans les 8 articles concernés.
 * Les blocs Vimeo étaient ignorés par la migration (seul YouTube était géré).
 *
 * Usage : node scripts/patch-vimeo-articles.mjs
 */

import { load as $load } from 'cheerio'
import { createClient } from '@sanity/client'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { randomBytes } from 'crypto'
import 'dotenv/config'

const BLOG_DIR = 'C:/01_DATA/01_PRO/DuvalFly/05_COLLABORATION/JEAN-BAPTISTE_VIDAL/enjoyfishing95946/enjoyfishing'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const key = () => randomBytes(5).toString('hex')

const VIMEO_ARTICLES = [
  { slug: 'bar-a-la-mouche-a-vue-en-estuaire-3087451',                             videoId: '202750783' },
  { slug: 'bilan-de-la-saison-2016-d-enjoy-fishing-peche-a-la-mouche-su-3086838',  videoId: '197095403' },
  { slug: 'l-efficacite-et-la-beaute-du-spey-cast-3083730',                        videoId: '192014250' },
  { slug: 'peche-du-bar-a-la-mouche-en-bretagne-avec-jean-baptiste-vida-3102724',  videoId: '256914976' },
  { slug: 'peche-du-saumon-en-bretagne-bilan-a-la-mi-saison-2015-3054248',         videoId: '114129554' },
  { slug: 'peche-sur-la-rena-en-norvege-septembre-2012-fishing-on-the-r',          videoId: '26525181'  },
  { slug: 'session-peche-du-brochet-a-la-mouche-en-bretagne-3061062',              videoId: '147093480' },
  { slug: 'un-jour-un-poisson-une-histoire-gros-bonefish-de-los-roques-3148862',   videoId: '404975055' },
]

async function getVimeoPosition(slug) {
  const file = BLOG_DIR + '/' + slug + '.html'
  if (!existsSync(file)) return null

  const html = await readFile(file, 'utf-8')
  const $ = $load(html)
  const body = $('section.clearfix.box-body, section[itemprop="articleBody"]')
  const children = body.children().toArray()

  // Compter combien de blocs texte/image précèdent l'iframe Vimeo
  let blocksBefore = 0
  for (const el of children) {
    const tag = el.tagName?.toLowerCase()
    if (!tag) continue
    const $el = $(el)

    // Vérifier si c'est l'iframe Vimeo (dans un <p> ou directement)
    const iframeSrc = $el.attr('src') || $el.find('iframe').attr('src') || ''
    if (iframeSrc.includes('vimeo')) break

    // Est-ce un élément ignoré ?
    if (['script', 'style', 'form', 'object', 'noscript'].includes(tag)) continue
    if ($el.hasClass('fb-like') || $el.hasClass('fb_iframe_widget')) continue
    if (tag === 'a' && $el.attr('id') === 'more') continue
    if (tag === 'hr') { blocksBefore++; continue }
    if (tag === 'iframe') { /* YouTube direct — serait un bloc */ blocksBefore++; continue }

    if (tag === 'p') {
      const pIframeSrc = $el.find('iframe').attr('src') || ''
      if (pIframeSrc.includes('vimeo')) break
      if (pIframeSrc.includes('youtube')) { blocksBefore++; continue }
      const imgEl = $el.find('img').first()
      const hasOnlyImg = imgEl.length > 0 && $el.text().trim() === ''
      if (hasOnlyImg) { blocksBefore++; continue }
      const hasWixRef = $el.find('a[href*="jeanbaptistevidalguidepeche.com"]').length > 0
        || /jeanbaptistevidalguidepeche\.com/i.test($el.text())
      if (hasWixRef) continue
      const text = $el.text().trim()
      if (text) blocksBefore++
      continue
    }

    if (tag === 'div') {
      const divIframeSrc = $el.find('iframe').attr('src') || ''
      if (divIframeSrc.includes('vimeo')) break
      if (divIframeSrc.includes('youtube')) { blocksBefore++; continue }
      const imgs = $el.find('img')
      if (imgs.length) { blocksBefore += imgs.length; continue }
      const text = $el.text().trim()
      if (text) blocksBefore++
      continue
    }

    // Fallback : autres tags avec du texte
    if (['h1','h2','h3','h4','h5','h6'].includes(tag)) { blocksBefore++; continue }
  }

  return blocksBefore
}

async function patchArticle({ slug, videoId }) {
  // Récupérer l'article actuel
  const doc = await client.fetch(
    '*[_type == "article" && slug.current == $slug][0]{ _id, contenu }',
    { slug }
  )

  if (!doc) { console.log(`  ✗ Non trouvé dans Sanity: ${slug}`); return }

  const currentContenu = doc.contenu || []

  // Vérifier si le bloc Vimeo existe déjà
  const alreadyHasVimeo = currentContenu.some(b => b._type === 'vimeo')
  if (alreadyHasVimeo) { console.log(`  ↷ Vimeo déjà présent: ${slug}`); return }

  // Trouver la position d'insertion
  const position = await getVimeoPosition(slug)
  const insertAt = position !== null ? Math.min(position, currentContenu.length) : currentContenu.length

  const vimeoBlock = { _type: 'vimeo', _key: key(), videoId }

  // Construire le nouveau contenu avec le bloc Vimeo inséré
  const newContenu = [
    ...currentContenu.slice(0, insertAt),
    vimeoBlock,
    ...currentContenu.slice(insertAt),
  ]

  await client.patch(doc._id).set({ contenu: newContenu }).commit()
  console.log(`  ✓ Vimeo ${videoId} inséré à la position ${insertAt}/${currentContenu.length}: ${slug.slice(0, 55)}`)
}

console.log('\n🎬 Patch Vimeo — 8 articles\n')
for (const article of VIMEO_ARTICLES) {
  console.log(`[${article.slug.slice(0, 60)}]`)
  try {
    await patchArticle(article)
  } catch (err) {
    console.log(`  ✗ Erreur: ${err.message.slice(0, 80)}`)
  }
}
console.log('\n✅ Patch terminé')
