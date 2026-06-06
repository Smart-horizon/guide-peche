import { createClient } from '@sanity/client'

const PROJECT_ID = 'uievv97s'
const DATASET    = 'production'
const API_VER    = '2024-01-01'
const STUDIO_URL = 'https://jbvidal.sanity.studio'

// Client standard — pour les requêtes côté build (published uniquement)
export const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  useCdn:    false,
  apiVersion: API_VER,
})

// Client avec stega — pour les pages publiées qui supportent le Visual Editing
// Les données retournées contiennent des métadonnées invisibles qui permettent
// de cliquer sur un texte dans le site et d'ouvrir le bon champ dans le Studio
export const stegaClient = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  useCdn:    false,
  apiVersion: API_VER,
  stega: {
    enabled:   true,
    studioUrl: STUDIO_URL,
  },
})

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
