import { allSectionTypes } from './sections.js'

export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: () => '📄',
  groups: [
    { name: 'page',        title: '🏗️ Page Builder' },
    { name: 'traductions', title: '🇬🇧 Version anglaise' },
    { name: 'seo',         title: '🔍 SEO' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Titre de la page (affiché dans le Studio)',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL de la page',
      type: 'slug',
      options: { source: 'title' },
      description: '⚠️ Ne pas modifier après publication — risque SEO',
      validation: Rule => Rule.required(),
    },

    // ── Page Builder ───────────────────────────────────────────────────────
    {
      name: 'pagebuilder',
      title: 'Sections de la page',
      description: '✋ Glissez-déposez pour réorganiser · Cliquez "+" pour ajouter une section',
      type: 'array',
      group: 'page',
      of: allSectionTypes.map(s => ({ type: s.name })),
    },

    // ── Contenu simple (legacy / fallback) ─────────────────────────────────
    {
      name: 'contenu',
      title: 'Contenu (texte simple)',
      type: 'array',
      group: 'page',
      description: "Utilisé uniquement si aucune section pagebuilder n'est définie",
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      title: 'Image principale',
      type: 'image',
      group: 'page',
      options: { hotspot: true },
    },

    // ── Traductions EN ─────────────────────────────────────────────────────
    {
      name: 'seoTitleEn',
      title: 'Titre SEO — English',
      type: 'string',
      group: 'traductions',
      validation: Rule => Rule.max(65).warning('Ideally under 65 characters'),
    },
    {
      name: 'seoDescriptionEn',
      title: 'Description SEO — English',
      type: 'text',
      rows: 3,
      group: 'traductions',
      validation: Rule => Rule.max(160).warning('Ideally under 160 characters'),
    },
    {
      name: 'pagebuilderEn',
      title: '🇬🇧 Sections de la page — English',
      type: 'array',
      group: 'traductions',
      description: 'English version of the page. Leave empty to fall back to French content.',
      of: allSectionTypes.map(s => ({ type: s.name })),
    },

    // ── SEO ────────────────────────────────────────────────────────────────
    {
      name: 'seoTitle',
      title: 'Titre SEO (balise <title>)',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.max(65).warning('Idéalement moins de 65 caractères'),
    },
    {
      name: 'seoDescription',
      title: 'Description SEO (meta description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères'),
    },
    {
      name: 'ogImage',
      title: 'Image de partage (Open Graph)',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
    },
  ],

  preview: {
    select: { title: 'title', sections: 'pagebuilder' },
    prepare({ title, sections }) {
      const nb = sections?.length ?? 0
      return {
        title,
        subtitle: `📄 ${nb} section${nb > 1 ? 's' : ''}`,
      }
    },
  },
}
