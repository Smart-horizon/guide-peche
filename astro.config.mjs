import { defineConfig } from 'astro/config'
import sanity from '@sanity/astro'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'

export default defineConfig({
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
      studioUrl: 'https://jbvidal.sanity.studio',
      stega: {
        studioUrl: 'https://jbvidal.sanity.studio',
      },
    }),
    sitemap(),
  ],
})
