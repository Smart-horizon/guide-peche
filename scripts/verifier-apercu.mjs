/**
 * verifier-apercu.mjs — le site publié et l'aperçu doivent rendre la MÊME chose.
 *
 * POURQUOI : en mode aperçu, le client Sanity encode des caractères invisibles
 * dans les chaînes (stega). Toute comparaison de chaîne non nettoyée devient
 * fausse, et l'aperçu diverge du site publié SANS que rien ne le signale.
 * Vécu le 16/07/2026 : le bloc « Derniers récits » affichait 3 articles en
 * publié et 1 en aperçu. Un build public ne révèle JAMAIS ce type de bug.
 *
 * ⚠️ RÈGLE CENTRALE : une différence n'est une ERREUR que si TOUT est publié.
 * Si JBV a un brouillon en cours, l'aperçu doit légitimement différer — c'est
 * sa raison d'être. Le script détecte les brouillons et ne conclut pas dans ce
 * cas, plutôt que de crier au loup (un contrôle qui alerte à tort est un
 * contrôle qu'on finit par ignorer).
 *
 * On ne compare pas le HTML brut : l'aperçu contient forcément les marqueurs
 * stega et les overlays. On compare une SIGNATURE STRUCTURELLE (compteurs de
 * blocs, iframes, liens internes) — ce qui doit être identique de part et
 * d'autre.
 *
 *   node scripts/verifier-apercu.mjs
 *   SANITY_TOKEN=… node scripts/verifier-apercu.mjs   (requis pour les brouillons)
 */

const PUBLIC  = 'https://guide-peche.smart-horizon.workers.dev'
const APERCU  = 'https://guide-peche-preview.smart-horizon.workers.dev'
const PROJECT = 'uievv97s'
const DATASET = 'production'

// Pages représentatives : chacune couvre un mécanisme différent.
const PAGES = [
  { url: '/',                              docType: 'page',       couvre: 'accueil, sections HP, cartes matériel' },
  { url: '/peche-du-bar-perfectionnement', docType: 'prestation', blog: true, couvre: 'bloc Derniers récits (maillage)' },
  { url: '/peche-de-l-alose-a-la-mouche',  docType: 'prestation', blog: true, couvre: 'section vidéo, FAQ' },
  { url: '/peche-du-bar-a-la-mouche',      docType: 'prestation', blog: true, couvre: 'page SEO critique' },
  { url: '/conditions-generales-de-ventes', docType: 'page',      couvre: 'largeur des blocs texte' },
  { url: '/boutique',                      docType: null,         produits: true, couvre: 'sections produits' },
  { url: '/en/',                           docType: 'page',       couvre: 'version anglaise' },
]

// Signaux structurels : présents à l'identique des deux côtés si tout est publié.
const SIGNAUX = {
  sections:        /class="[^"]*\bsection\b/g,
  heros:           /class="pb-hero"/g,
  cartesBlog:      /pb-blogsec__card"/g,
  cartesMateriel:  /hp-mat-card__bg/g,
  cartesProduit:   /pb-prod-card/g,
  titresH2:        /<h2/g,
  faq:             /pb-faq__item/g,
  images:          /<img /g,
}

const compte = (html, rx) => (html.match(rx) || []).length

// Liens internes et iframes : doivent être identiques (et propres) des 2 côtés.
// ⚠️ Le slash final est normalisé : le site public est STATIQUE (Astro ajoute
// « / ») alors que l'aperçu est SSR (pas de slash). C'est une différence de
// mode de rendu, pas de contenu — sans ça le contrôle alerte à tort sur
// chaque page, et un contrôle qui crie au loup finit ignoré.
const sansSlash = (u) => (u.length > 1 ? u.replace(/\/$/, '') : u)
const liens = (html) =>
  [...new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => sansSlash(m[1])))].sort()
const iframes = (html) =>
  [...new Set([...html.matchAll(/<iframe[^>]+src="([^"]+)"/g)].map((m) => m[1]))].sort()

const signature = (html) => ({
  ...Object.fromEntries(Object.entries(SIGNAUX).map(([k, rx]) => [k, compte(html, rx)])),
  liens: liens(html),
  iframes: iframes(html),
})

async function html(base, url) {
  const r = await fetch(`${base}${url}`, { headers: { 'cache-control': 'no-cache' } })
  if (!r.ok) throw new Error(`${base}${url} → HTTP ${r.status}`)
  return r.text()
}

/** Ids des documents ayant un brouillon non publié (⇒ différence légitime). */
async function brouillons(token) {
  if (!token) return null // sans token on ne peut pas savoir : on ne conclura pas
  const q = encodeURIComponent(
    `*[_id in path("drafts.**") && _type in ["page","prestation","voyage","article","produit","parametres","parametresBoutique"]]{
       "id": string::split(_id, "drafts.")[1], _type }`
  )
  const r = await fetch(`https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${q}`,
    { headers: { Authorization: `Bearer ${token}` } })
  const j = await r.json()
  if (j.error) throw new Error(`Sanity: ${JSON.stringify(j.error)}`)
  return j.result ?? []
}

/** Slug → id du document publié, pour rattacher une page à son brouillon. */
async function idDePage(token, url) {
  if (!token) return null
  const slug = url === '/' ? '/' : url.replace(/^\/(en\/)?/, '').replace(/\/$/, '') || '/'
  const q = encodeURIComponent(`*[slug.current == $s][0]._id`)
  const r = await fetch(
    `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${q}&$s=${encodeURIComponent(JSON.stringify(slug))}`,
    { headers: { Authorization: `Bearer ${token}` } })
  return (await r.json()).result ?? null
}

// ── Comparaison ──────────────────────────────────────────────────────────────
const diffs = (a, b) => {
  const out = []
  for (const k of Object.keys(a)) {
    const va = a[k], vb = b[k]
    if (Array.isArray(va)) {
      const manquants = va.filter((x) => !vb.includes(x))
      const enTrop    = vb.filter((x) => !va.includes(x))
      if (manquants.length || enTrop.length) {
        out.push(`${k}: ${manquants.length ? `absents de l'aperçu → ${manquants.slice(0, 3).join(', ')}` : ''}` +
                 `${enTrop.length ? ` en trop dans l'aperçu → ${enTrop.slice(0, 3).join(', ')}` : ''}`)
      }
    } else if (va !== vb) {
      out.push(`${k}: publié=${va}  aperçu=${vb}`)
    }
  }
  return out
}

const token = process.env.SANITY_TOKEN
const drafts = await brouillons(token)

console.log('🔍 Aperçu vs site publié — la structure doit être identique quand tout est publié.\n')
if (drafts === null) {
  console.log('⚠️  SANITY_TOKEN absent : impossible de détecter les brouillons.')
  console.log('    Une différence ne pourra pas être imputée avec certitude.\n')
} else if (drafts.length) {
  console.log(`ℹ️  ${drafts.length} brouillon(s) non publié(s) : une différence peut être NORMALE.`)
  console.log(`    Types concernés : ${[...new Set(drafts.map((d) => d._type))].join(', ')}\n`)
}

const draftIds = new Set((drafts ?? []).map((d) => d.id))
const globalDrafts = (drafts ?? []).filter((d) => ['article', 'produit', 'parametres', 'parametresBoutique'].includes(d._type))

let echecs = 0, ignorees = 0

for (const p of PAGES) {
  const [hPub, hApr] = await Promise.all([html(PUBLIC, p.url), html(APERCU, p.url)])
  const d = diffs(signature(hPub), signature(hApr))

  if (!d.length) {
    console.log(`✅ ${p.url.padEnd(34)} identique   (${p.couvre})`)
    continue
  }

  // Différence : légitime ou bug ? On regarde les brouillons.
  const idPage = await idDePage(token, p.url)
  const pageEnBrouillon = idPage && draftIds.has(idPage)
  // Le bloc blog dépend des articles ; la boutique dépend des produits.
  const depEnBrouillon = globalDrafts.some((g) =>
    (p.blog && g._type === 'article') || (p.produits && g._type === 'produit') ||
    ['parametres', 'parametresBoutique'].includes(g._type))

  if (drafts === null) {
    console.log(`⚠️  ${p.url.padEnd(34)} DIFFÉRENTE — cause indéterminable (pas de token)`)
    d.forEach((x) => console.log(`      ${x}`))
    ignorees++
  } else if (pageEnBrouillon || depEnBrouillon) {
    console.log(`⏭️  ${p.url.padEnd(34)} différente, mais brouillon en cours → NORMAL`)
    console.log(`      ${pageEnBrouillon ? 'la page elle-même a un brouillon' : 'un contenu lié a un brouillon'}`)
    d.forEach((x) => console.log(`      ${x}`))
    ignorees++
  } else {
    console.log(`❌ ${p.url.padEnd(34)} DIFFÉRENTE alors que TOUT est publié → BUG`)
    d.forEach((x) => console.log(`      ${x}`))
    echecs++
  }
}

console.log()
if (echecs) {
  console.log(`❌ ${echecs} page(s) divergent alors que tout est publié.`)
  console.log('   Cause la plus probable : une comparaison de chaîne Sanity sans stegaClean().')
  console.log('   Voir la section STEGA de CLAUDE.md.')
  process.exit(1)
}
console.log(`✅ Aucune divergence anormale.${ignorees ? `  (${ignorees} page(s) non concluante(s) : brouillons en cours)` : ''}`)
