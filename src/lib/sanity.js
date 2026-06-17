import { createClient } from '@sanity/client'

const PROJECT_ID = 'uievv97s'
const DATASET    = 'production'
const API_VER    = '2024-01-01'
const STUDIO_URL = 'https://jbvidal.sanity.studio'

// Client standard — pour les requêtes côté build (published uniquement)
// useCdn: true → passe par apicdn.sanity.io (quota CDN, plus généreux que l'API directe)
export const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  useCdn:    true,
  apiVersion: API_VER,
})

// stegaClient = alias du client standard (stega désactivé — plus d'overlays visual editing)
// Conserver l'export pour la compatibilité avec les imports existants
export const stegaClient = client

// Client preview (SSR) — pour la route /preview/*
// Récupère les BROUILLONS Sanity → les changements apparaissent instantanément
// sans publier ni attendre le rebuild. Nécessite un token de lecture.
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
