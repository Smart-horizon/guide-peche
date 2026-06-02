import { createClient } from '@sanity/client'

// Client standard — pour les requêtes côté build
export const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Client avec stega — pour les pages qui supportent le Visual Editing
// Les données retournées contiennent des métadonnées invisibles qui permettent
// de cliquer sur un texte dans le site et d'ouvrir le bon champ dans le Studio
export const stegaClient = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  stega: {
    enabled: true,
    studioUrl: 'https://jbvidal.sanity.studio',
  },
})
