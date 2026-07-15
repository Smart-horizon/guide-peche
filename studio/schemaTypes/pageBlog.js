/**
 * pageBlog.js
 * Singleton — textes éditables de la page /blog (liste des articles)
 * Un seul document de ce type (documentId: 'pageBlog')
 */

export default {
  name: 'pageBlog',
  title: 'Page Blog',
  type: 'document',
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'hero', title: '🎯 Hero' },
    { name: 'seo',  title: '🔍 SEO' },
  ],

  fields: [
    {
      name: 'heroEyebrow', title: 'Texte au-dessus du titre', type: 'string',
      group: 'hero', initialValue: 'Enjoy Fishing',
    },
    {
      name: 'heroTitre', title: 'Titre principal (H1)', type: 'string',
      group: 'hero', initialValue: 'Le blog',
    },
    {
      name: 'heroSousTitre', title: 'Sous-titre', type: 'string',
      group: 'hero', initialValue: 'Récits, techniques et carnets de pêche à la mouche.',
    },
    {
      name: 'videTexte', title: 'Message si aucun article', type: 'string',
      group: 'hero', initialValue: 'Les articles arrivent bientôt.',
    },
    {
      name: 'seoTitle', title: 'Titre SEO (balise <title>)', type: 'string',
      group: 'seo', initialValue: 'Blog pêche à la mouche — Jean-Baptiste Vidal',
      validation: Rule => Rule.max(70).warning('Idéalement moins de 65 caractères'),
    },
    {
      name: 'seoDescription', title: 'Description SEO', type: 'text', rows: 3,
      group: 'seo', initialValue: 'Articles et récits de pêche à la mouche par Jean-Baptiste Vidal : bar, truite, alose, saumon et pêche exotique.',
      validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères'),
    },
  ],

  preview: {
    prepare: () => ({ title: '📰 Page Blog — textes' }),
  },
}
