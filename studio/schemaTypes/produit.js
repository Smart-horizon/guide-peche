export default {
  name: 'produit',
  title: 'Produits (boutique)',
  type: 'document',
  icon: () => '🛒',
  groups: [
    { name: 'infos',       title: '🛒 Produit', default: true },
    { name: 'traductions', title: '🇬🇧 Version anglaise' },
    { name: 'seo',         title: '🔍 SEO' },
  ],
  fields: [

    // ── Identité ─────────────────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Nom du produit',
      type: 'string',
      group: 'infos',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL du produit',
      type: 'slug',
      group: 'infos',
      options: { source: 'title' },
      description: 'Adresse de la fiche produit : /boutique/…  ⚠️ Ne pas modifier après publication',
      validation: Rule => Rule.required(),
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      group: 'infos',
      options: {
        list: [
          { title: '🪰 Mouche',              value: 'mouche'  },
          { title: '🧢 Casquette & goodies', value: 'goodies' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'espece',
      title: 'Espèce ciblée',
      type: 'string',
      group: 'infos',
      options: {
        list: [
          { title: '🌊 Bar',      value: 'bar'      },
          { title: '🏞️ Truite',   value: 'truite'   },
          { title: '🐟 Alose',    value: 'alose'    },
          { title: '🎣 Brochet',  value: 'brochet'  },
          { title: '✈️ Exotique', value: 'exotique' },
        ],
      },
      description: 'Pour les mouches uniquement — permet de filtrer la boutique et de lier les pages prestations',
      hidden: ({ document }) => document?.categorie !== 'mouche',
    },

    // ── Prix & disponibilité ─────────────────────────────────────────────────
    {
      name: 'prix',
      title: 'Prix (€ TTC)',
      type: 'number',
      group: 'infos',
      description: 'Prix de vente en euros, ex : 3.50',
      validation: Rule => Rule.required().positive(),
    },
    {
      name: 'disponible',
      title: 'Produit visible dans la boutique',
      type: 'boolean',
      group: 'infos',
      initialValue: true,
      description: 'Décochez pour retirer le produit de la boutique sans le supprimer',
    },
    {
      name: 'stock',
      title: 'Stock disponible',
      type: 'number',
      group: 'infos',
      description: 'Laissez vide = stock illimité · 0 = affiché "épuisé". Ignoré si le produit a des variantes (le stock se gère alors par variante).',
      hidden: ({ document }) => (document?.variantes?.length ?? 0) > 0,
      validation: Rule => Rule.min(0),
    },
    {
      name: 'variantes',
      title: 'Variantes (optionnel)',
      type: 'array',
      group: 'infos',
      description: 'Ex : taille d\'hameçon pour une mouche, couleur pour une casquette. Laissez vide si le produit est unique.',
      of: [{
        type: 'object',
        name: 'variante',
        fields: [
          {
            name: 'nom',
            title: 'Nom de la variante',
            type: 'string',
            description: 'Ex : "Hameçon n°2", "Bleu marine"',
            validation: Rule => Rule.required(),
          },
          {
            name: 'stock',
            title: 'Stock',
            type: 'number',
            description: 'Laissez vide = illimité · 0 = épuisé',
            validation: Rule => Rule.min(0),
          },
          {
            name: 'photos',
            title: 'Photos de la variante (optionnel)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Ex : la casquette dans cette couleur. Si vide, ce sont les photos principales du produit qui s\'affichent.',
          },
        ],
        preview: {
          select: { title: 'nom', stock: 'stock', media: 'photos.0' },
          prepare({ title, stock, media }) {
            return {
              title,
              subtitle: stock === 0 ? '❌ Épuisé' : stock != null ? `${stock} en stock` : 'Stock illimité',
              media,
            }
          },
        },
      }],
    },
    {
      name: 'poids',
      title: 'Poids (grammes)',
      type: 'number',
      group: 'infos',
      description: 'Poids emballé, utilisé pour calculer les frais de port. Ex : une mouche ≈ 5 g, une casquette ≈ 120 g',
      validation: Rule => Rule.min(0),
    },

    // ── Contenu ──────────────────────────────────────────────────────────────
    {
      name: 'images',
      title: 'Photos du produit',
      type: 'array',
      group: 'infos',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'La première photo est celle affichée dans la grille de la boutique',
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'infos',
      of: [{ type: 'block' }],
      description: 'Matériaux, conseils d\'utilisation, conditions de pêche idéales…',
    },

    {
      name: 'videoYoutube',
      title: 'Vidéo YouTube (optionnel)',
      type: 'url',
      group: 'infos',
      description: 'Ex : vidéo de montage de la mouche. Collez l\'adresse complète de la vidéo — elle sera intégrée sur la fiche produit.',
    },
    {
      name: 'articleLie',
      title: 'Article de blog lié (optionnel)',
      type: 'reference',
      to: [{ type: 'article' }],
      group: 'infos',
      description: 'Un article qui parle de ce produit — un lien "En savoir plus" apparaîtra sur la fiche',
    },

    // ── Version anglaise ─────────────────────────────────────────────────────
    {
      name: 'titleEn',
      title: 'Nom du produit — English',
      type: 'string',
      group: 'traductions',
      description: 'Laisser vide pour réutiliser le nom FR',
    },
    {
      name: 'descriptionEn',
      title: 'Description — English',
      type: 'array',
      group: 'traductions',
      of: [{ type: 'block' }],
      description: 'Laisser vide pour afficher la description FR en fallback',
    },

    // ── SEO ──────────────────────────────────────────────────────────────────
    {
      name: 'seoTitle',
      title: 'Titre SEO (balise <title>)',
      type: 'string',
      group: 'seo',
      description: 'Laissez vide pour utiliser le nom du produit',
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
      description: 'Image affichée sur Facebook, WhatsApp, etc. (1200×630px recommandé). Par défaut : première photo du produit.',
    },
  ],

  preview: {
    select: {
      title:      'title',
      categorie:  'categorie',
      prix:       'prix',
      disponible: 'disponible',
      stock:      'stock',
      media:      'images.0',
    },
    prepare({ title, categorie, prix, disponible, stock, media }) {
      const cat = categorie === 'mouche' ? '🪰' : '🧢'
      const etat = disponible === false ? ' · 🚫 masqué' : stock === 0 ? ' · ❌ épuisé' : ''
      return {
        title,
        subtitle: `${cat} ${prix != null ? prix.toFixed(2).replace('.', ',') + ' €' : 'prix manquant'}${etat}`,
        media,
      }
    },
  },
}
