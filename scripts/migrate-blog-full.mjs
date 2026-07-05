/**
 * migrate-blog-full.mjs
 * Migration complète enjoyfishing.fr → Sanity Studio
 * Traite tous les articles HTML du dossier export BlogSpirit.
 *
 * Usage : node scripts/migrate-blog-full.mjs
 *
 * Règles :
 *  - Contenu conservé EXACTEMENT (aucune réécriture IA)
 *  - EXCEPTION : paragraphes contenant un lien vers jeanbaptistevidalguidepeche.com → supprimés
 *  - Images uploadées depuis les fichiers locaux (grandes versions préférées)
 *  - Cache local pour éviter de re-uploader les mêmes images
 *  - Slugs conservés avec l'ID BlogSpirit (pour redirections 301)
 */

import { load as $load } from 'cheerio'
import { createClient } from '@sanity/client'
import { readFile, writeFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'
import 'dotenv/config'

// ─── Config ────────────────────────────────────────────────────────────────

const BLOG_DIR   = 'C:/01_DATA/01_PRO/DuvalFly/05_COLLABORATION/JEAN-BAPTISTE_VIDAL/enjoyfishing95946/enjoyfishing'
const CACHE_FILE = './scripts/migrate-image-cache.json'
const DELAY_MS   = 150  // délai entre articles pour ne pas saturer l'API

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// ─── Cache images ──────────────────────────────────────────────────────────

let imageCache = {}
try {
  imageCache = JSON.parse(await readFile(CACHE_FILE, 'utf-8'))
  console.log(`📦 Cache images : ${Object.keys(imageCache).length} entrées existantes`)
} catch { /* premier lancement */ }

async function saveCache() {
  await writeFile(CACHE_FILE, JSON.stringify(imageCache, null, 2))
}

// ─── Helpers ───────────────────────────────────────────────────────────────

const key = () => randomBytes(5).toString('hex')

async function uploadImage(src, label = '') {
  if (!src) return null
  const filename = path.basename(src.split('?')[0])
  const cacheKey = filename.toLowerCase()

  if (imageCache[cacheKey]) {
    return imageCache[cacheKey]
  }

  let buffer
  if (src.startsWith('http')) {
    const res = await fetch(src)
    if (!res.ok) { console.warn(`    ✗ HTTP ${res.status} — ${src}`); return null }
    buffer = Buffer.from(await res.arrayBuffer())
  } else {
    const localPath = path.resolve(BLOG_DIR, src)
    if (!existsSync(localPath)) {
      // Essayer avec casse différente (JPG vs jpg)
      const variants = [localPath, localPath.replace('.jpg', '.JPG'), localPath.replace('.JPG', '.jpg')]
      const found = variants.find(p => existsSync(p))
      if (!found) { console.warn(`    ✗ Introuvable : ${src}`); return null }
      buffer = await readFile(found)
    } else {
      buffer = await readFile(localPath)
    }
  }

  const asset = await client.assets.upload('image', buffer, { filename })
  console.log(`    ↑ ${label || filename} → ${asset._id}`)
  imageCache[cacheKey] = asset._id
  await saveCache()
  return asset._id
}

// Vérifie si une URL pointe vers un fichier image (et pas une page web)
const isImgUrl = (url) => url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url.split('?')[0])

// ─── Conversion HTML → Portable Text ──────────────────────────────────────

function nodeToSpans(node, $, markDefs, marks = []) {
  if (!node) return []
  if (node.type === 'text') {
    const text = node.data
    if (/^\s*$/.test(text)) return []
    return [{ _type: 'span', _key: key(), text, marks: [...marks] }]
  }
  if (node.type !== 'tag') return []
  const tag = node.tagName.toLowerCase()
  if (['script', 'style', 'button', 'object', 'embed', 'iframe', 'img', 'form'].includes(tag)) return []
  let m = [...marks]
  if (tag === 'strong' || tag === 'b') m = [...m, 'strong']
  if (tag === 'em'     || tag === 'i') m = [...m, 'em']
  if (tag === 'u') m = [...m, 'underline']
  if (tag === 'span') {
    const style = $(node).attr('style') || ''
    if (style.includes('underline')) m = [...m, 'underline']
  }
  if (tag === 'a') {
    const href = $(node).attr('href') || ''
    const isImageLink = /\.(jpg|jpeg|png|gif|webp)$/i.test(href)
    const isWixLink   = /jeanbaptistevidalguidepeche\.com/i.test(href)
    if (href && !href.startsWith('#') && !isImageLink && !isWixLink) {
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

function makeBlock(spans, markDefs, style = 'normal') {
  if (!spans.length || !spans.some(s => s.text?.trim())) return null
  return { _type: 'block', _key: key(), style, markDefs, children: spans }
}

async function bodyToBlocks(bodyEl, $) {
  const blocks = []
  for (const el of $(bodyEl).children().toArray()) {
    const tag = el.tagName?.toLowerCase()
    if (!tag) continue
    const $el = $(el)
    if (['script', 'style', 'form', 'object', 'noscript'].includes(tag)) continue
    if ($el.hasClass('fb-like') || $el.hasClass('fb_iframe_widget')) continue
    if (tag === 'a' && $el.attr('id') === 'more') continue

    // ── Titres ──
    if (['h1','h2','h3','h4','h5','h6'].includes(tag)) {
      const style = tag === 'h1' ? 'h1' : tag === 'h2' ? 'h2' : 'h3'
      const md = []
      const block = makeBlock(nodeToSpans(el, $, md), md, style)
      if (block) blocks.push(block)
      continue
    }

    // ── HR ──
    if (tag === 'hr') {
      blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), text: '—', marks: [] }] })
      continue
    }

    // ── iframe YouTube (élément direct) ──
    if (tag === 'iframe') {
      const src = $el.attr('src') || ''
      const ytMatch = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)
      if (ytMatch) blocks.push({ _type: 'youtube', _key: key(), videoId: ytMatch[1] })
      continue
    }

    // ── Paragraphe ──
    if (tag === 'p') {
      // YouTube iframe dans un <p>
      const iframeEl = $el.find('iframe').first()
      if (iframeEl.length) {
        const iframeSrc = iframeEl.attr('src') || ''
        const ytMatch = iframeSrc.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)
        if (ytMatch) {
          blocks.push({ _type: 'youtube', _key: key(), videoId: ytMatch[1] })
          continue
        }
      }

      const imgEl = $el.find('img').first()
      const hasOnlyImg = imgEl.length > 0 && $el.text().trim() === ''

      if (hasOnlyImg) {
        const parentA   = imgEl.parent('a')
        const parentHref = parentA.length ? (parentA.attr('href') || '') : ''
        // N'utiliser le href que si c'est une vraie URL d'image (pas une page Wix)
        const fullSrc   = isImgUrl(parentHref) ? parentHref : null
        const thumbSrc  = imgEl.attr('src') || null
        const alt       = imgEl.attr('alt') || ''
        const src       = fullSrc || thumbSrc
        if (src) {
          const assetId = await uploadImage(src, alt.slice(0, 40))
          if (assetId) {
            blocks.push({ _type: 'image', _key: key(), alt,
              asset: { _type: 'reference', _ref: assetId } })
          }
        }
        continue
      }

      // Supprimer les paragraphes qui renvoient vers l'ancien site Wix
      const hasWixRef = $el.find('a[href*="jeanbaptistevidalguidepeche.com"]').length > 0
        || /jeanbaptistevidalguidepeche\.com/i.test($el.text())
      if (hasWixRef) {
        // Contenu exporté Facebook : traiter chaque div[dir="auto"] feuille individuellement
        const allDirAuto = $el.find('div[dir="auto"]').toArray()
          .filter(d => !$(d).find('div[dir="auto"]').length)
        for (const divEl of allDirAuto) {
          const $div = $(divEl)
          if (/jeanbaptistevidalguidepeche\.com/i.test($div.text())) continue
          if (!$div.text().trim()) continue
          const md = []
          const block = makeBlock(nodeToSpans(divEl, $, md), md)
          if (block) blocks.push(block)
        }
        continue
      }

      const md = []
      const block = makeBlock(nodeToSpans(el, $, md), md)
      if (block) blocks.push(block)
      continue
    }

    // ── Div ──
    if (tag === 'div') {
      // YouTube iframe dans un <div>
      const iframeEl = $el.find('iframe').first()
      if (iframeEl.length) {
        const iframeSrc = iframeEl.attr('src') || ''
        const ytMatch = iframeSrc.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)
        if (ytMatch) {
          blocks.push({ _type: 'youtube', _key: key(), videoId: ytMatch[1] })
          continue
        }
      }

      const imgs = $el.find('img')
      if (imgs.length) {
        for (const imgEl of imgs.toArray()) {
          const $img       = $(imgEl)
          const parentA    = $img.parent('a')
          const parentHref = parentA.length ? (parentA.attr('href') || '') : ''
          const src = (isImgUrl(parentHref) ? parentHref : null) || $img.attr('src')
          const alt = $img.attr('alt') || ''
          if (src) {
            const assetId = await uploadImage(src, alt.slice(0, 40))
            if (assetId) {
              blocks.push({ _type: 'image', _key: key(), alt,
                asset: { _type: 'reference', _ref: assetId } })
            }
          }
        }
      } else {
        const text = $el.text().trim()
        if (!text) { continue }
        if (/jeanbaptistevidalguidepeche\.com/i.test(text)) {
          // Contenu exporté Facebook : traiter chaque div feuille dir="auto" individuellement
          const leaves = $el.find('[dir="auto"]').toArray()
            .filter(d => !$(d).find('[dir="auto"]').length)
          for (const divEl of leaves) {
            const $div = $(divEl)
            if (/jeanbaptistevidalguidepeche\.com/i.test($div.text())) continue
            if (!$div.text().trim()) continue
            const md = []
            const block = makeBlock(nodeToSpans(divEl, $, md), md)
            if (block) blocks.push(block)
          }
        } else {
          blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs: [],
            children: [{ _type: 'span', _key: key(), text, marks: [] }] })
        }
      }
      continue
    }

    // ── Fallback ──
    const md = []
    const block = makeBlock(nodeToSpans(el, $, md), md)
    if (block) blocks.push(block)
  }
  return blocks
}

// ─── Tags enrichis ─────────────────────────────────────────────────────────

const ESPECE_MAP = [
  { re: /\bbar\b/i,                                                      val: 'bar',      tag: 'Bar' },
  { re: /\balose/i,                                                      val: 'alose',    tag: 'Alose' },
  { re: /\bsaumon/i,                                                     val: 'saumon',   tag: 'Saumon' },
  { re: /\btruite/i,                                                     val: 'truite',   tag: 'Truite' },
  { re: /\bbrochet/i,                                                    val: 'brochet',  tag: 'Brochet' },
  { re: /dorado|bonefish|bolivie|cuba|venezuela|mexique|tarpon|permit/i, val: 'exotique', tag: 'Exotique' },
]

const TECHNIQUE_MAP = [
  { re: /spey.?cast/i,          tag: 'Spey Cast' },
  { re: /nymph/i,               tag: 'Nymphe' },
  { re: /streamer/i,            tag: 'Streamer' },
  { re: /s[eè]che|dry.?fly/i,   tag: 'Mouche sèche' },
  { re: /r[eé]servoir/i,        tag: 'Réservoir' },
  { re: /lancer|casting/i,      tag: 'Lancer' },
  { re: /masterclass/i,         tag: 'Masterclass' },
  { re: /voyage|rio.grande|bolivie|cuba|venezuela|mexique|roques/i, tag: 'Voyage' },
  { re: /montage|tying/i,       tag: 'Montage de mouche' },
]

const GENERIC_RE = /^(jean.baptiste|enjoy fishing|guide de p[eê]che en bretagne|j\.b\. vidal)/i

function buildTags(title, rawTags) {
  const corpus = (title + ' ' + rawTags.join(' ')).toLowerCase()
  const especeTags = ESPECE_MAP   .filter(({ re }) => re.test(corpus)).map(({ tag }) => tag)
  const technTags  = TECHNIQUE_MAP.filter(({ re }) => re.test(corpus)).map(({ tag }) => tag)
  const cleaned    = rawTags.filter(t => !GENERIC_RE.test(t))
  const seen = new Set()
  return [...especeTags, ...technTags, ...cleaned].filter(t => {
    const k = t.toLowerCase()
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

function detectEspece(title, rawTags) {
  const text = (title + ' ' + rawTags.join(' ')).toLowerCase()
  for (const { re, val } of ESPECE_MAP) {
    if (re.test(text)) return val
  }
  return null
}

// ─── Traitement d'un fichier article ───────────────────────────────────────

async function processArticle(filename) {
  const filePath = path.resolve(BLOG_DIR, filename)
  const html = await readFile(filePath, 'utf-8')
  const $ = $load(html)

  // Vérifier que c'est bien un article (présence du corps éditorial)
  const bodyEl = $('section.clearfix.box-body, section[itemprop="articleBody"]')
  if (!bodyEl.length) return null  // pas un article

  const title = $('h1[itemprop]').text().trim()
    || $('title').text().replace(/\s*[-–]\s*Enjoy Fishing\s*$/i, '').trim()
  if (!title) return null

  const dateStr = $('time[itemprop="datePublished"]').attr('datetime')
  const date    = dateStr ? new Date(dateStr).toISOString() : null

  const slug = filename.replace(/\.html$/, '')  // conserve l'ID BlogSpirit

  const seoDescription = ($('meta[name="description"]').attr('content') || '').slice(0, 160)
  const extrait        = ($('meta[name="description"]').attr('content') || '').slice(0, 300)

  const rawTags = $('span.box-article-tags a, span[itemprop="keywords"] a')
    .map((_, el) => $(el).text().trim()).get().filter(Boolean)

  const tags   = buildTags(title, rawTags)
  const espece = detectEspece(title, rawTags)

  // Image principale — priorité :
  // 1. section.featured-image (CDN BlogSpirit, haute qualité)
  // 2. 1er <a href="image.jpg"> lightbox dans le corps (seulement si href est une URL d'image)
  // 3. og:image (CDN)
  // 4. 1er <img src> dans le corps (fichier local)
  const featuredImgCdn = $('section.featured-image img').first().attr('src') || null

  const firstAWithImg = $('section.clearfix.box-body p a[href], section[itemprop="articleBody"] p a[href]')
    .filter((_, el) => $(el).find('img').length > 0).first()
  const lightboxSrc = isImgUrl(firstAWithImg.attr('href') || '') ? firstAWithImg.attr('href') : null

  const ogImage = $('meta[property="og:image"]').attr('content') || null

  const firstBodyImgSrc = $('section.clearfix.box-body img, section[itemprop="articleBody"] img')
    .filter((_, el) => !!$(el).attr('src') && !$(el).attr('src').startsWith('data:')).first().attr('src') || null

  const featuredSrc = featuredImgCdn || lightboxSrc || ogImage || firstBodyImgSrc

  let featuredAssetId = null
  if (featuredSrc) {
    featuredAssetId = await uploadImage(featuredSrc, 'hero')
  }

  const contenu = await bodyToBlocks(bodyEl.first(), $)
  const nBlocks = contenu.filter(b => b._type === 'block').length
  const nImages = contenu.filter(b => b._type === 'image').length

  const doc = {
    _type: 'article',
    _id:   `enjoyfishing-${slug}`,
    title,
    slug:  { _type: 'slug', current: slug },
    date,
    extrait,
    contenu,
    tags,
    seoTitle:       title.slice(0, 65),
    seoDescription,
    ...(espece          ? { espece }                                                                        : {}),
    ...(featuredAssetId ? { image: { _type: 'image', asset: { _type: 'reference', _ref: featuredAssetId } } } : {}),
  }

  await client.createOrReplace(doc)
  return { slug, nBlocks, nImages, tags: tags.slice(0, 3) }
}

// ─── Main ──────────────────────────────────────────────────────────────────

const allFiles = await readdir(BLOG_DIR)
const articleFiles = allFiles.filter(f =>
  f.endsWith('.html') && !f.startsWith('index')
).sort()

console.log(`\n📚 ${articleFiles.length} fichiers HTML à traiter (hors pages index)\n`)

let done = 0, errors = 0, skipped = 0
const startTime = Date.now()

for (const filename of articleFiles) {
  const idx = done + errors + skipped + 1
  process.stdout.write(`[${idx}/${articleFiles.length}] ${filename.slice(0, 60)}...`)
  try {
    const result = await processArticle(filename)
    if (!result) {
      process.stdout.write(' ↷ ignoré (pas un article)\n')
      skipped++
    } else {
      process.stdout.write(` ✓ ${result.nBlocks}p ${result.nImages}img [${result.tags.join(' · ')}]\n`)
      done++
    }
  } catch (err) {
    process.stdout.write(` ✗ ${err.message.slice(0, 80)}\n`)
    errors++
  }
  if (DELAY_MS > 0) await new Promise(r => setTimeout(r, DELAY_MS))
}

const elapsed = Math.round((Date.now() - startTime) / 1000)
console.log(`\n✅ Migration terminée en ${elapsed}s`)
console.log(`   ${done} articles créés / mis à jour`)
console.log(`   ${skipped} fichiers ignorés (non-articles)`)
console.log(`   ${errors} erreurs`)
console.log(`   ${Object.keys(imageCache).length} images en cache`)
console.log(`\n→ Sanity Studio : https://uievv97s.sanity.studio/`)
