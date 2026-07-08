import { createClient } from '@sanity/client'

const PROJECT_ID = 'uievv97s'
const DATASET    = 'production'
const API_VER    = '2024-01-01'
const STUDIO_URL = 'https://jbvidal.sanity.studio'

// ── Mode aperçu ────────────────────────────────────────────────────────────
// Activé UNIQUEMENT dans le build du worker d'aperçu (deploy-preview.sh pose
// PUBLIC_SANITY_PREVIEW=true). Le build public ne définit jamais ce flag →
// client standard, published, sans stega. Aucune pollution du site public.
const PREVIEW = import.meta.env.PUBLIC_SANITY_PREVIEW === 'true'

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
        stega:       { enabled: true, studioUrl: STUDIO_URL },
      }
    : {}),
})

// stegaClient = alias du client principal (stega actif uniquement en mode aperçu).
// Conservé pour la compatibilité avec les imports existants.
export const stegaClient = client

// Indique aux composants (BaseLayout) s'il faut monter l'overlay Visual Editing.
export const visualEditingEnabled = PREVIEW

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
  },
})
