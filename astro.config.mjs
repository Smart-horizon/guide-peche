import { defineConfig } from 'astro/config'
import sanity from '@sanity/astro'

export default defineConfig({
  integrations: [
    sanity({
      projectId: 'uievv97s',
      dataset: 'production',
      useCdn: false,
    })
  ]
})