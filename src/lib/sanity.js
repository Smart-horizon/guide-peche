import { createClient } from '@sanity/client'

const PROJECT_ID = 'uievv97s'
const DATASET    = 'production'
const API_VER    = '2024-01-01'
// Inclut le basePath du workspace : depuis que les commandes ont leur propre
// workspace (dataset privé), le Studio est multi-workspace et le site vit sous
// /site. Sans ce segment, les overlays d'aperçu renvoient vers le sélecteur.
const STUDIO_URL = 'https://jbvidal.sanity.studio/site'

// ── Mode aperçu ────────────────────────────────────────────────────────────
// Activé UNIQUEMENT dans le build du worker d'aperçu (deploy-preview.sh pose
// PUBLIC_SANITY_PREVIEW=true). Le build public ne définit jamais ce flag →
// client standard, published, sans stega. Aucune pollution du site public.
const PREVIEW = import.meta.env.PUBLIC_SANITY_PREVIEW === 'true'

// ── Champs JAMAIS encodés par le stega ─────────────────────────────────────
// Le stega insère ~1500 caractères invisibles par chaîne pour rendre le texte
// cliquable dans l'aperçu. Sur un champ AFFICHÉ (titre, accroche) c'est utile.
// Sur un champ de LOGIQUE, c'est doublement nuisible :
//
//  1. CORRECTION — toute égalité stricte devient fausse ('bar' !== 'bar␣…').
//     C'est ce qui vidait le bloc « Derniers récits » en aperçu.
//  2. CPU — `tags` pesait 9 698 caractères par article. Sur 156 articles, le
//     seul maillage coûtait 20 ms, au-delà du budget CPU d'un Worker (10 ms) :
//     le worker d'aperçu tombait en erreur 1102.
//
// On coupe donc le stega à la source pour ces champs. C'est la parade de fond :
// elle vaut pour tout le code, présent et à venir, sans avoir à se souvenir
// d'appeler stegaClean() à chaque comparaison.
// ⚠️ N'ajouter ici que des champs NON affichés comme texte éditable — un champ
// listé ici perd son overlay cliquable dans l'aperçu.
const CHAMPS_LOGIQUE = new Set([
  // filtrage / routage
  'espece', 'categorie', 'tags', 'current', 'mode', 'statut', 'pays',
  // mise en forme (comparés à des valeurs en dur)
  'fond', 'largeur', 'style', 'listItem', 'hauteur', 'videoPosition', 'type',
  'youtubeId',
])

// Tout champ de LIEN, reconnu par son nom plutôt que listé un par un — le
// projet en compte une trentaine (btnLien, lienChaine, urlArticle, titreUrl,
// barCtaUrl…) et la liste serait vite périmée. Un marqueur stega dans un href
// casse le lien : ils ne doivent JAMAIS être encodés.
// ⚠️ On exclut les LIBELLÉS (lienLabel, labelLien, lienLabel2…) : ce sont des
// textes affichés, ils doivent garder leur overlay cliquable.
const EST_LIEN = (cle) => /(lien|url|href|slug)/i.test(cle) && !/label/i.test(cle)

// sourcePath = chemin dans le document source, ex. ['pagebuilder', {_key}, 'espece'].
// On regarde le dernier segment nommé (pour un slug : ['slug','current']).
const stegaFilter = (props) => {
  const segments = props.sourcePath.filter((p) => typeof p === 'string')
  const cle = segments[segments.length - 1]
  if (!cle) return props.filterDefault(props)
  if (CHAMPS_LOGIQUE.has(cle) || EST_LIEN(cle)) return false
  return props.filterDefault(props)
}

// Client principal.
//  · Public  : useCdn true, contenu publié, PAS de stega (site propre).
//  · Aperçu  : brouillons en temps réel + stega (overlays cliquables dans Sanity).
export const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  apiVersion: API_VER,
  useCdn:     !PREVIEW,
  ...(PREVIEW
    ? {
        perspective: 'previewDrafts',
        token:       import.meta.env.SANITY_TOKEN,
        stega:       { enabled: true, studioUrl: STUDIO_URL, filter: stegaFilter },
      }
    : {}),
})

// stegaClient = alias du client principal (stega actif uniquement en mode aperçu).
// Conservé pour la compatibilité avec les imports existants.
export const stegaClient = client

// Indique aux composants (BaseLayout) s'il faut monter l'overlay Visual Editing.
export const visualEditingEnabled = PREVIEW

// Projection GROQ de la fiche produit — partagée entre le build statique
// (getStaticPaths, scope isolé : seuls les imports y sont visibles) et le
// fallback SSR du worker d'aperçu.
export const PRODUIT_PROJECTION = `{
  _id, title, slug, categorie, espece, prix, stock, poids, quantiteMin, badges,
  images, description, videoYoutube, seoTitle, seoDescription, ogImage,
  "variantes": variantes[]{ nom, prix, stock, photos },
  "prestations": prestationsAssociees[]->{ title, "slug": slug.current },
  "articles": articlesAssocies[]->{ title, "slug": slug.current }
}`

// Client preview (SSR) — conservé pour compatibilité éventuelle.
export const previewClient = createClient({
  projectId:   PROJECT_ID,
  dataset:     DATASET,
  useCdn:      false,
  apiVersion:  API_VER,
  perspective: 'previewDrafts',
  token:       import.meta.env.SANITY_TOKEN,
  stega: {
    enabled:   true,
    studioUrl: STUDIO_URL,
    filter:    stegaFilter, // même règle que le client principal
  },
})
