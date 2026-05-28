import { defineConfig } from 'astro/config'
import sanity from '@sanity/astro'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://jeanbaptistevidalguidepeche.com',
  integrations: [
    sanity({
      projectId: 'uievv97s',
      dataset: 'production',
      useCdn: false,
    }),
    sitemap(),
  ],
})
