/**
 * maillage.js — Maillage interne SEO (cocon sémantique)
 *
 * Relie les 156 articles de blog aux pages business, dans les deux sens :
 *   · Blog → Prestation : CTA hybride en bas d'article
 *       - bouton  → la prestation la plus PRÉCISE (réservoir, spey, bar à vue…)
 *       - lien texte → le hub de l'espèce (protège les URLs critiques)
 *   · Prestation → Blog : bloc "Derniers récits" = articles qui CIBLENT la page
 *       (repli sur l'espèce si moins de 3 articles précis)
 *
 * Résolution de la cible d'un article (ordre de priorité) :
 *   1. Champ Sanity "Prestation liée" (choix manuel de JBV)
 *   2. Détection par mots-clés dans les tags + titre
 *   3. Page pilier de l'espèce
 */

// ── Pages piliers par espèce (hubs) ──────────────────────────────────────────
export const PILIERS = {
  bar: {
    url: '/peche-du-bar-a-la-mouche',
    titre: 'La pêche du bar à la mouche en Bretagne',
    titreEn: 'Sea bass fly fishing in Brittany',
  },
  truite: {
    url: '/peche-de-la-truite-a-la-mouche-en-bretagne',
    titre: 'La pêche de la truite à la mouche en Bretagne',
    titreEn: 'Trout fly fishing in Brittany',
  },
  saumon: {
    url: '/peche-a-la-mouche-en-bretagne',
    titre: 'La pêche à la mouche en Bretagne',
    titreEn: 'Fly fishing in Brittany',
  },
  alose: {
    url: '/peche-de-l-alose-a-la-mouche',
    titre: "La pêche de l'alose à la mouche",
    titreEn: 'Shad fly fishing',
  },
  brochet: {
    url: '/peche-du-brochet-a-la-mouche',
    titre: 'La pêche du brochet à la mouche',
    titreEn: 'Pike fly fishing',
  },
  exotique: {
    url: '/voyages-peche-mouche',
    titre: 'Les voyages de pêche à la mouche',
    titreEn: 'Fly fishing trips',
  },
}

// ── Détection mots-clés → prestation précise ─────────────────────────────────
// Ordre = priorité. `espece` (optionnel) restreint la règle à une espèce
// pour éviter les faux positifs (ex : "bateau" dans un article truite).
const CIBLES = [
  // ── Contenus "média" : presse, montages de mouches, vidéos ────────────────
  { rx: /revue de presse|dans (le |la )?p[êe]che mouche\b|magazine|parution|interview|podcast/i,
    url: '/revue-de-presse-jeanbaptiste-vidal-moniteur-guide-de-peche', titre: 'la revue de presse', titreEn: 'the press review' },
  { rx: /montage|fly.?tying|une semaine[\s\S]{0,12}une mouche|une mouche[\s\S]{0,12}une histoire/i,
    url: '/mouches-de-peche-jeanbaptiste-vidal', titre: 'mes mouches de pêche', titreEn: 'my fishing flies' },
  // ── Prestations précises ──────────────────────────────────────────────────
  { rx: /master.?class[\s\S]{0,40}r[ée]servoir|r[ée]servoir[\s\S]{0,40}master.?class/i,
    url: '/master-class-peche-en-reservoir', titre: 'la Masterclass pêche en réservoir', titreEn: 'the reservoir masterclass' },
  { rx: /nymphe au fil/i,
    url: '/master-class-nymphe-au-fil', titre: 'la Masterclass Nymphe au fil', titreEn: 'the Czech-nymphing masterclass' },
  { rx: /r[ée]servoir/i,
    url: '/peche-de-la-truite-en-reservoir', titre: 'la pêche de la truite en réservoir', titreEn: 'reservoir trout fishing' },
  { rx: /spey/i,
    url: '/stage-spey-cast', titre: 'le stage de Spey Cast', titreEn: 'the Spey cast course' },
  { rx: /lancer/i,
    url: '/cours-de-lancer-peche-a-la-mouche', titre: 'les cours de lancer', titreEn: 'casting lessons' },
  { rx: /[àa] vue/i, espece: 'bar',
    url: '/peche-du-bar-a-vue-a-la-mouche', titre: 'la pêche du bar à vue en estuaire', titreEn: 'sight fishing for sea bass' },
  { rx: /bateau|skiff/i, espece: 'bar',
    url: '/peche-mouche-bar-bateau-bretagne', titre: 'la pêche du bar en bateau', titreEn: 'sea bass fishing by boat' },
  { rx: /coaching/i, espece: 'bar',
    url: '/peche-du-bar-a-la-mouche-coaching', titre: 'le coaching bar à la mouche', titreEn: 'sea bass coaching' },
  { rx: /initiation|d[ée]butant|d[ée]couverte de la p[êe]che/i, espece: 'bar',
    url: '/initiation-peche-du-bar-a-la-mouche', titre: "l'initiation à la pêche du bar", titreEn: 'the sea bass beginners course' },
  { rx: /initiation|d[ée]butant|d[ée]couverte de la p[êe]che/i,
    url: '/initiation-peche-a-la-mouche', titre: "l'initiation à la pêche à la mouche", titreEn: 'the fly fishing beginners course' },
  { rx: /los.?roques/i,
    url: '/los-roques-venezuela', titre: 'le voyage Los Roques — Venezuela', titreEn: 'the Los Roques trip — Venezuela' },
  { rx: /cayo.?cruz/i,
    url: '/peche-mouche-cuba-cayo-cruz', titre: 'le voyage Cuba — Cayo Cruz', titreEn: 'the Cuba trip — Cayo Cruz' },
  { rx: /santa.?maria/i,
    url: '/peche-mouche-cuba-cayo-santa-maria', titre: 'le voyage Cuba — Cayo Santa Maria', titreEn: 'the Cuba trip — Cayo Santa Maria' },
  { rx: /argentine|rio.?grande|terre de feu|kau.?tapen/i,
    url: '/voyage-peche-argentine-rio-grande-truite-de-mer', titre: "le voyage Argentine — Rio Grande", titreEn: 'the Argentina trip — Rio Grande' },
  { rx: /mexi(que|co)/i,
    url: '/voyage-peche-mouche-mexique', titre: 'le voyage au Mexique', titreEn: 'the Mexico trip' },
  // ── Matériel (par espèce, puis hub) ───────────────────────────────────────
  { rx: /mat[ée]riel|lunettes polarisantes|waders|moulinets?\b|bas de ligne/i, espece: 'bar',
    url: '/materiel-mouche-bar', titre: 'le matériel bar à la mouche', titreEn: 'sea bass fly fishing gear' },
  { rx: /mat[ée]riel|lunettes polarisantes|waders|moulinets?\b|bas de ligne/i, espece: 'truite',
    url: '/materiel-mouche-truite', titre: 'le matériel truite à la mouche', titreEn: 'trout fly fishing gear' },
  { rx: /mat[ée]riel|lunettes polarisantes|waders|moulinets?\b|bas de ligne/i, espece: 'brochet',
    url: '/materiel-mouche-brochet', titre: 'le matériel brochet à la mouche', titreEn: 'pike fly fishing gear' },
  { rx: /mat[ée]riel|lunettes polarisantes|waders|moulinets?\b|bas de ligne/i, espece: 'saumon',
    url: '/materiel-mouche-migrateur', titre: 'le matériel migrateurs', titreEn: 'migratory fish gear' },
  { rx: /mat[ée]riel|lunettes polarisantes|waders|moulinets?\b|bas de ligne/i, espece: 'alose',
    url: '/materiel-mouche-migrateur', titre: 'le matériel migrateurs', titreEn: 'migratory fish gear' },
  { rx: /mat[ée]riel|lunettes polarisantes|waders|moulinets?\b|bas de ligne/i, espece: 'exotique',
    url: '/materiel-mouche-peche-exotique', titre: 'le matériel pêche exotique', titreEn: 'saltwater fly fishing gear' },
  { rx: /mat[ée]riel|lunettes polarisantes|waders|moulinets?\b|bas de ligne/i,
    url: '/materiel-jeanbaptistevidal', titre: 'mon matériel de pêche à la mouche', titreEn: 'my fly fishing gear' },
  // ── Bon cadeau ────────────────────────────────────────────────────────────
  { rx: /bon cadeau|carte cadeau/i,
    url: '/bon-cadeau', titre: 'le bon cadeau pêche à la mouche', titreEn: 'the gift voucher' },
  // ── Vidéos (en dernier — les sujets précis ci-dessus gagnent) ─────────────
  { rx: /\bvid[ée]os?\b/i,
    url: '/videos-jeanbaptiste-vidal-moniteur-guide-de-peche', titre: 'mes vidéos de pêche', titreEn: 'my fishing videos' },
]

/**
 * Cible précise d'un article, par priorité :
 * 1. prestationLiee (référence Sanity : { title, slug }) — choix manuel
 * 2. mots-clés tags + titre
 * 3. pilier de l'espèce
 * Retourne { url, titre, titreEn } ou null.
 */
export function cibleArticle(article) {
  // 1. Choix manuel dans Sanity
  const ref = article?.prestationLiee
  if (ref?.slug) {
    return { url: `/${ref.slug}`, titre: ref.title || 'cette prestation', titreEn: ref.title || 'this experience' }
  }
  // 2. Mots-clés
  const haystack = [article?.title || '', ...(article?.tags || [])].join(' · ')
  for (const c of CIBLES) {
    if (c.espece && article?.espece !== c.espece) continue
    if (c.rx.test(haystack)) return { url: c.url, titre: c.titre, titreEn: c.titreEn }
  }
  // 3. Pilier de l'espèce
  return article?.espece ? PILIERS[article.espece] ?? null : null
}

// ── Espèces pertinentes pour une prestation/un voyage (repli sens inverse) ──
export function especesPourDoc(doc) {
  if (doc?._type === 'voyage') return ['exotique']
  if (doc?._type !== 'prestation') return null
  switch (doc.categorie) {
    case 'bar':         return ['bar']
    case 'eau-douce':   return ['truite', 'saumon', 'alose', 'brochet']
    case 'masterclass': return ['truite']
    case 'spey-cast':   return ['saumon', 'truite']
    default:            return null // bon-cadeau, etc.
  }
}

/**
 * "À lire aussi" : les 3 articles les plus PROCHES thématiquement.
 * Score : même prestation ciblée (+4) > même espèce (+2) > tags partagés
 * (+1 par tag discriminant, plafonné à 3 — les tags génériques présents
 * dans plus de 30 % des articles sont ignorés). Égalité → le plus récent.
 */
export function articlesSimilaires(article, allArticles) {
  const monSlug = article?.slug?.current || article?.slug
  const maCible = cibleArticle(article)?.url ?? null

  // Fréquence des tags → ignorer les tags trop communs ("pêche à la mouche"…)
  const freq = {}
  for (const a of allArticles) for (const t of a.tags || []) {
    const k = t.toLowerCase()
    freq[k] = (freq[k] || 0) + 1
  }
  const seuil = allArticles.length * 0.3
  const mesTags = new Set((article?.tags || []).map((t) => t.toLowerCase()).filter((t) => (freq[t] || 0) <= seuil))

  return allArticles
    .filter((a) => (a.slug?.current || a.slug) !== monSlug)
    .map((a) => {
      let score = 0
      if (maCible && cibleArticle(a)?.url === maCible) score += 4
      if (article?.espece && a.espece === article.espece) score += 2
      const partages = (a.tags || []).filter((t) => mesTags.has(t.toLowerCase())).length
      score += Math.min(partages, 3)
      return { a, score }
    })
    .sort((x, y) => y.score - x.score || new Date(y.a.date || 0) - new Date(x.a.date || 0))
    .slice(0, 3)
    .map((x) => x.a)
}

/**
 * Sens inverse : les 3 articles à afficher sur une page prestation/voyage.
 * Priorité aux articles dont la CIBLE est cette page, complétés par les
 * articles de la même espèce (jamais de bloc à moitié vide).
 * `allArticles` : liste légère { title, titleEn, slug, date, image, espece, tags, prestationLiee }.
 */
export function articlesPourPage(slug, doc, allArticles) {
  const url = `/${slug}`
  const precis = allArticles.filter((a) => cibleArticle(a)?.url === url)
  const especes = especesPourDoc(doc) ?? []
  const parEspece = allArticles.filter((a) => especes.includes(a.espece) && !precis.includes(a))
  return [...precis, ...parEspece].slice(0, 3)
}
