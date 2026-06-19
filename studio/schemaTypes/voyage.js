import { allSectionTypes } from './sections.js'

export default {
  name: 'voyage',
  title: 'Voyages',
  type: 'document',
  icon: () => '✈️',
  groups: [
    { name: 'page',        title: '🏗️ Page Builder' },
    { name: 'contenu',     title: '📝 Infos de base' },
    { name: 'traductions', title: '🇬🇧 Version anglaise' },
    { name: 'seo',         title: '🔍 SEO' },
  ],
  fields: [
    // ── Identité ────────────────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Titre du voyage',
      type: 'string',
      group: 'contenu',
      validation: Rule => Rule.required().error('Le titre est obligatoire'),
    },
    {
      name: 'slug',
      title: 'URL de la page',
      type: 'slug',
      group: 'contenu',
      options: { source: 'title' },
      description: 'Généré automatiquement — ne pas modifier sans prévenir Quentin',
      validation: Rule => Rule.required(),
    },
    {
      name: 'pays',
      title: 'Pays / Destination',
      type: 'string',
      group: 'contenu',
      description: 'Ex: Argentine · Cuba · Mexique · Venezuela',
    },
    {
      name: 'image',
      title: 'Photo principale (carte des voyages)',
      type: 'image',
      group: 'contenu',
      options: { hotspot: true },
      description: 'Utilisée dans les grilles de destinations sur d\'autres pages',
    },
    {
      name: 'especes',
      title: 'Espèces ciblées',
      type: 'string',
      group: 'contenu',
      description: 'Ex: Truite de mer · Bonefish · Permit · Tarpon',
    },
    {
      name: 'periode',
      title: 'Période idéale',
      type: 'string',
      group: 'contenu',
      description: 'Ex: Janvier à mars',
    },
    {
      name: 'prix',
      title: 'Prix indicatif',
      type: 'string',
      group: 'contenu',
      description: 'Ex: À partir de 3 500 € / personne',
    },

    // ── Page Builder ─────────────────────────────────────────────────────────
    {
      name: 'pagebuilder',
      title: 'Sections de la page',
      description: '✋ Glissez-déposez pour réorganiser · Cliquez "+" pour ajouter une section',
      type: 'array',
      group: 'page',
      of: allSectionTypes.map(s => ({ type: s.name })),
    },

    // ── Traductions EN ───────────────────────────────────────────────────────
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
    select: { title: 'title', subtitle: 'pays', sections: 'pagebuilder', media: 'image' },
    prepare({ title, subtitle, sections, media }) {
      const nb = sections?.length ?? 0
      return {
        title,
        subtitle: `✈️ ${subtitle ?? ''} · ${nb} section${nb > 1 ? 's' : ''}`,
        media,
      }
    },
  },
}
