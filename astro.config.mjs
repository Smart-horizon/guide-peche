import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sanity from '@sanity/astro'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'

export default defineConfig({
  // Astro v6 : "static" supporte nativement les pages SSR (prerender = false)
  // L'adapter Cloudflare génère dist/_worker.js pour les routes dynamiques
  adapter: cloudflare({ imageService: 'passthrough' }),
  site: 'https://jeanbaptistevidalguidepeche.com',
  vite: {
    optimizeDeps: {
      include: [
        'lodash',
        'react/compiler-runtime',
        'react-compiler-runtime',
        '@sanity/mutate',
        '@sanity/mutate/_unstable_machine',
        '@sanity/mutate/_unstable_store',
        '@sanity/mutate/_unstable_apply',
        '@sanity/visual-editing',
        '@sanity/visual-editing-csm',
        '@sanity/ui',
        '@sanity/icons',
      ],
    },
    ssr: {
      noExternal: ['@sanity/visual-editing', '@sanity/ui'],
    },
  },
  integrations: [
    react(),
    sanity({
      projectId: 'uievv97s',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2024-01-01',
    }),
    sitemap(),
  ],
})
