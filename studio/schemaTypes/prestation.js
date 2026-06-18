import { allSectionTypes } from './sections.js'

export default {
  name: 'prestation',
  title: 'Prestations',
  type: 'document',
  icon: () => '🎣',
  groups: [
    { name: 'page',        title: '🏗️ Page Builder' },
    { name: 'traductions', title: '🇬🇧 Version anglaise' },
    { name: 'seo',         title: '🔍 SEO' },
  ],
  fields: [

    // ── Identité (niveau document) ──────────────────────────────────────────
    {
      name: 'title',
      title: 'Nom de la prestation (affiché dans le Studio)',
      type: 'string',
      description: 'Utilisé comme titre par défaut si le Hero n\'a pas de titre',
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
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: '🏞️ Guidage eau douce', value: 'eau-douce'  },
          { title: '🌊 Pêche du bar',      value: 'bar'        },
          { title: '🏆 Masterclass',       value: 'masterclass'},
          { title: '🎿 Spey Cast & Lancer', value: 'spey-cast' },
          { title: '🎁 Bon cadeau',        value: 'bon-cadeau' },
        ],
        layout: 'radio',
      },
    },

    // ── Page Builder ────────────────────────────────────────────────────────
    {
      name: 'pagebuilder',
      title: 'Sections de la page',
      description: '✋ Glissez-déposez pour réorganiser · Cliquez "+" pour ajouter une section · "…" pour dupliquer',
      type: 'array',
      group: 'page',
      of: allSectionTypes.map(s => ({ type: s.name })),
    },

    // ── Version anglaise ─────────────────────────────────────────────────────
    {
      name: 'seoTitleEn',
      title: 'Titre SEO — English',
      type: 'string',
      group: 'traductions',
      description: 'Balise <title> pour /en/... — laisser vide pour réutiliser le titre FR',
      validation: Rule => Rule.max(65).warning('Idéalement moins de 65 caractères'),
    },
    {
      name: 'seoDescriptionEn',
      title: 'Description SEO — English',
      type: 'text',
      rows: 3,
      group: 'traductions',
      description: 'Meta description anglaise — laisser vide pour réutiliser la FR',
      validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères'),
    },
    {
      name: 'pagebuilderEn',
      title: '🇬🇧 Sections de la page — English',
      description: 'Version anglaise du page builder. Même structure qu\'en FR. Si vide, la version française s\'affiche en fallback.',
      type: 'array',
      group: 'traductions',
      of: allSectionTypes.map(s => ({ type: s.name })),
    },

    // ── SEO ──────────────────────────────────────────────────────────────────
    {
      name: 'seoTitle',
      title: 'Titre SEO (balise <title>)',
      type: 'string',
      group: 'seo',
      description: 'Laissez vide pour utiliser le titre du Hero',
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
      description: 'Image affichée sur Facebook, WhatsApp, etc. (1200×630px recommandé)',
    },
  ],

  preview: {
    select: {
      title:    'title',
      subtitle: 'categorie',
      sections: 'pagebuilder',
    },
    prepare({ title, subtitle, sections }) {
      const cats = {
        'eau-douce':   '🏞️',
        'bar':         '🌊',
        'masterclass': '🏆',
        'spey-cast':   '🎿',
        'bon-cadeau':  '🎁',
      }
      const nb = sections?.length ?? 0
      return {
        title,
        subtitle: `${cats[subtitle] ?? ''} ${subtitle ?? ''} · ${nb} section${nb > 1 ? 's' : ''}`,
      }
    },
  },
}
