/**
 * migrate-article-demo.mjs
 * Migration démo : UN article BlogSpirit (enjoyfishing.fr) → Sanity Studio
 * Article : aloses-et-saumons-au-rendez-vous-en-bretagne-3004732.html
 *
 * Usage : node scripts/migrate-article-demo.mjs
 */

import { load as $load } from 'cheerio'
import { createClient } from '@sanity/client'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'
import 'dotenv/config'

// ─── Config ────────────────────────────────────────────────────────────────

const BLOG_DIR = 'C:/01_DATA/01_PRO/DuvalFly/05_COLLABORATION/JEAN-BAPTISTE_VIDAL/enjoyfishing95946/enjoyfishing'
const ARTICLE_FILE = 'aloses-et-saumons-au-rendez-vous-en-bretagne-3004732.html'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// ─── Helpers ───────────────────────────────────────────────────────────────

const key = () => randomBytes(5).toString('hex')

/** Upload une image locale ou distante vers Sanity, retourne l'asset ID */
async function uploadImage(src, label = '') {
  if (!src) return null
  let buffer
  const filename = path.basename(src.split('?')[0])

  if (src.startsWith('http')) {
    console.log(`  ↓ Download  ${label || filename}`)
    const res = await fetch(src)
    if (!res.ok) { console.warn(`  ✗ HTTP ${res.status} — ${src}`); return null }
    buffer = Buffer.from(await res.arrayBuffer())
  } else {
    const localPath = path.resolve(BLOG_DIR, src)
    if (!existsSync(localPath)) {
      console.warn(`  ✗ Fichier manquant : ${localPath}`)
      return null
    }
    console.log(`  ↑ Upload    ${label || filename}`)
    buffer = await readFile(localPath)
  }

  const asset = await client.assets.upload('image', buffer, { filename })
  console.log(`  ✓ ${asset._id}`)
  return asset._id
}

// ─── Conversion HTML → Portable Text ──────────────────────────────────────

/**
 * Extrait les spans Portable Text depuis un nœud DOM (récursif).
 * Gère : strong, em, u, a (liens externes), span styles.
 */
function nodeToSpans(node, $, markDefs, marks = []) {
  if (!node) return []

  // Nœud texte
  if (node.type === 'text') {
    const text = node.data
    if (/^\s*$/.test(text)) return []
    return [{ _type: 'span', _key: key(), text, marks: [...marks] }]
  }

  if (node.type !== 'tag') return []

  const tag = node.tagName.toLowerCase()

  // Éléments à ignorer
  if (['script', 'style', 'button', 'object', 'embed', 'iframe', 'img', 'form'].includes(tag)) return []

  let m = [...marks]

  if (tag === 'strong' || tag === 'b') m = [...m, 'strong']
  if (tag === 'em' || tag === 'i')     m = [...m, 'em']
  if (tag === 'u')                     m = [...m, 'underline']
  if (tag === 'span') {
    const style = $(node).attr('style') || ''
    if (style.includes('underline')) m = [...m, 'underline']
    // on ignore les couleurs inline (non supportées en PT basique)
  }

  if (tag === 'a') {
    const href = $(node).attr('href') || ''
    // Ignorer les liens lightbox vers des fichiers image locaux
    const isImageLink = /\.(jpg|jpeg|png|gif|webp)$/i.test(href)
    if (href && !href.startsWith('#') && !isImageLink) {
      const lk = key()
      markDefs.push({ _type: 'link', _key: lk, href })
      m = [...m, lk]
    }
  }

  const spans = []
  for (const child of node.children || []) {
    spans.push(...nodeToSpans(child, $, markDefs, m))
  }
  return spans
}

/**
 * Crée un bloc Portable Text (paragraphe, h2, h3…).
 * Retourne null si le bloc est vide.
 */
function makeBlock(spans, markDefs, style = 'normal') {
  if (!spans.length || !spans.some(s => s.text?.trim())) return null
  return { _type: 'block', _key: key(), style, markDefs, children: spans }
}

/**
 * Convertit le <section.box-body> en tableau de blocs Portable Text + images Sanity.
 * Logique image : <p><a href="grande.jpg"><img src="miniature.jpg" alt="..."></a></p>
 *   → on upload la GRANDE image (href) et on utilise l'alt de l'img.
 */
async function bodyToBlocks(bodyEl, $) {
  const blocks = []

  for (const el of $(bodyEl).children().toArray()) {
    const tag = el.tagName?.toLowerCase()
    if (!tag) continue
    const $el = $(el)

    // Éléments à ignorer
    if (['script', 'style', 'form', 'object', 'noscript'].includes(tag)) continue
    if ($el.hasClass('fb-like') || $el.hasClass('fb_iframe_widget')) continue

    // ── Ancre "more" BlogSpirit ──
    if (tag === 'a' && $el.attr('id') === 'more') continue

    // ── Titres ──
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
      const style = tag === 'h1' ? 'h1' : tag === 'h2' ? 'h2' : 'h3'
      const md = []
      const block = makeBlock(nodeToSpans(el, $, md), md, style)
      if (block) blocks.push(block)
      continue
    }

    // ── Règle horizontale ──
    if (tag === 'hr') {
      blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), text: '—', marks: [] }] })
      continue
    }

    // ── Paragraphe ──
    if (tag === 'p') {
      const imgEl = $el.find('img').first()
      const hasOnlyImg = imgEl.length > 0 && $el.text().trim() === ''

      if (hasOnlyImg) {
        // <p><a href="grande.jpg"><img src="thumb.jpg" alt="..."></a></p>
        const parentA = imgEl.parent('a')
        const fullSrc = parentA.length ? (parentA.attr('href') || null) : null
        const thumbSrc = imgEl.attr('src') || null
        const alt = imgEl.attr('alt') || ''
        const src = fullSrc || thumbSrc // préférer la grande

        if (src) {
          const assetId = await uploadImage(src, alt.slice(0, 50))
          if (assetId) {
            blocks.push({ _type: 'image', _key: key(), alt,
              asset: { _type: 'reference', _ref: assetId } })
          }
        }
        continue
      }

      // Paragraphe texte (peut contenir inline img — peu probable ici)
      const md = []
      const block = makeBlock(nodeToSpans(el, $, md), md)
      if (block) blocks.push(block)
      continue
    }

    // ── Div ──
    if (tag === 'div') {
      const imgs = $el.find('img')
      if (imgs.length) {
        for (const imgEl of imgs.toArray()) {
          const $img = $(imgEl)
          const parentA = $img.parent('a')
          const src = (parentA.length ? parentA.attr('href') : null) || $img.attr('src')
          const alt = $img.attr('alt') || ''
          if (src) {
            const assetId = await uploadImage(src, alt.slice(0, 50))
            if (assetId) {
              blocks.push({ _type: 'image', _key: key(), alt,
                asset: { _type: 'reference', _ref: assetId } })
            }
          }
        }
      } else {
        const text = $el.text().trim()
        if (text) {
          blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs: [],
            children: [{ _type: 'span', _key: key(), text, marks: [] }] })
        }
      }
      continue
    }

    // ── Fallback : extraire le texte ──
    const md = []
    const block = makeBlock(nodeToSpans(el, $, md), md)
    if (block) blocks.push(block)
  }

  return blocks
}

// ─── Détection de l'espèce principale ──────────────────────────────────────

function detectEspece(title, tags) {
  const text = (title + ' ' + tags.join(' ')).toLowerCase()
  if (/\bbar\b/.test(text))                                                  return 'bar'
  if (/\balose/.test(text))                                                   return 'alose'
  if (/\bsaumon/.test(text))                                                  return 'saumon'
  if (/\btruite/.test(text))                                                  return 'truite'
  if (/\bbrochet/.test(text))                                                 return 'brochet'
  if (/dorado|bonefish|bolivie|cuba|venezuela|mexique|tarpon|permit/.test(text)) return 'exotique'
  return null
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const filePath = path.resolve(BLOG_DIR, ARTICLE_FILE)
  console.log(`\n📂 Lecture : ${ARTICLE_FILE}`)
  const html = await readFile(filePath, 'utf-8')
  const $ = $load(html)

  // ── Métadonnées ──
  const title = $('h1[itemprop]').text().trim()
    || $('title').text().replace(/\s*[-–]\s*Enjoy Fishing\s*$/i, '').trim()

  const dateStr = $('time[itemprop="datePublished"]').attr('datetime')
  const date = dateStr ? new Date(dateStr).toISOString() : null

  // Slug = nom du fichier sans .html, sans l'ID BlogSpirit final (5+ chiffres)
  const rawSlug = ARTICLE_FILE.replace(/\.html$/, '')

  const seoDescription = ($('meta[name="description"]').attr('content') || '').slice(0, 160)
  const extrait        = ($('meta[name="description"]').attr('content') || '').slice(0, 300)

  const tags = $('span.box-article-tags a, span[itemprop="keywords"] a')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(t => t && !/jean.baptiste vidal|enjoy fishing/i.test(t))

  const espece = detectEspece(title, tags)

  // Image principale : 1er <a href> qui contient un <img> (= lightbox grande image)
  // ou <section.featured-image img> (articles récents), sinon og:image CDN
  const firstAWithImg = $('section.clearfix.box-body p a[href]')
    .filter((_, el) => $(el).find('img').length > 0)
    .first()
  const firstImgHref = firstAWithImg.attr('href') || null
  const featuredImgEl = $('section.featured-image img').first()
  const featuredImgSrc = featuredImgEl.length
    ? (featuredImgEl.attr('src') || featuredImgEl.closest('picture').find('source').first().attr('srcset')?.split(' ')[0])
    : null
  const ogImage     = $('meta[property="og:image"]').attr('content') || null
  // Priorité : lightbox full-size > featured-image section > og:image CDN
  const featuredSrc = firstImgHref || featuredImgSrc || ogImage

  console.log(`\n📰 "${title}"`)
  console.log(`📅 ${date?.slice(0, 10)}  |  🐟 ${espece ?? '—'}`)
  console.log(`🏷️  Tags : ${tags.join(', ') || '—'}`)
  console.log(`🔗 Slug  : /blog/${rawSlug}`)
  console.log(`🖼️  Image : ${featuredSrc}`)

  // ── Upload image principale ──
  let featuredAssetId = null
  if (featuredSrc) {
    console.log('\n📤 Upload image principale...')
    featuredAssetId = await uploadImage(featuredSrc, 'image principale')
  }

  // ── Conversion du corps en Portable Text ──
  console.log('\n📝 Conversion du contenu...')
  const bodyEl = $('section.clearfix.box-body')
  const contenu = await bodyToBlocks(bodyEl, $)

  const nBlocks = contenu.filter(b => b._type === 'block').length
  const nImages = contenu.filter(b => b._type === 'image').length
  console.log(`  → ${contenu.length} éléments : ${nBlocks} blocs texte + ${nImages} images`)

  // ── Document Sanity ──
  const doc = {
    _type: 'article',
    _id: `enjoyfishing-${rawSlug}`,
    title,
    slug: { _type: 'slug', current: rawSlug },
    date,
    extrait,
    contenu,
    tags,
    seoTitle: title.slice(0, 65),
    seoDescription,
    ...(espece           ? { espece }                                                              : {}),
    ...(featuredAssetId  ? { image: { _type: 'image', asset: { _type: 'reference', _ref: featuredAssetId } } } : {}),
  }

  // ── Push Sanity ──
  console.log('\n🚀 Création du document Sanity...')
  const result = await client.createOrReplace(doc)

  console.log(`\n✅ Article créé : ${result._id}`)
  console.log(`   Titre  : ${result.title}`)
  console.log(`   Slug   : ${result.slug?.current}`)
  console.log(`\n→ Sanity Studio : https://uievv97s.sanity.studio/`)
  console.log(`→ URL blog      : /blog/${rawSlug}`)
}

main().catch(err => {
  console.error('\n❌ Erreur :', err.message)
  process.exit(1)
})
