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
          { title: '🪰 Mouche',               value: 'mouche'   },
          { title: '🎁 Coffret de mouches',   value: 'coffret'  },
          { title: '🧢 Casquette & goodies',  value: 'goodies'  },
          { title: '🎣 Matériel',             value: 'materiel' },
          { title: '📦 Autre',                value: 'autre'    },
        ],
        layout: 'radio',
      },
      description: 'Sert à filtrer la boutique et à alimenter les sections « Produits » des pages',
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
      description: 'Pour les mouches, coffrets et matériel — permet de filtrer la boutique et d\'alimenter les sections « Produits » par espèce',
      hidden: ({ document }) => !['mouche', 'coffret', 'materiel'].includes(document?.categorie),
    },
    {
      name: 'badges',
      title: 'Mises en avant',
      type: 'array',
      group: 'infos',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '✨ Nouveauté',       value: 'nouveaute' },
          { title: '🔥 Meilleure vente', value: 'vente'     },
          { title: '❤️ Coup de cœur',    value: 'coup-coeur'},
        ],
      },
      description: 'Affiché en pastille sur le produit. Sert aussi aux sections « Produits » des pages (ex : afficher les meilleures ventes).',
    },
    {
      name: 'dateAjout',
      title: 'Date d\'ajout à la boutique',
      type: 'datetime',
      group: 'infos',
      options: { dateFormat: 'DD/MM/YYYY' },
      initialValue: () => new Date().toISOString(),
      description: 'Utilisée pour classer les nouveautés — laissez la date du jour',
    },

    // ── Prix & disponibilité ─────────────────────────────────────────────────
    {
      name: 'prix',
      title: 'Prix (€ TTC)',
      type: 'number',
      group: 'infos',
      description: 'Prix de vente en euros, ex : 3.50 — c\'est aussi le prix par défaut des variantes qui n\'en précisent pas',
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
      name: 'quantiteMin',
      title: 'Quantité minimum par commande',
      type: 'number',
      group: 'infos',
      initialValue: 1,
      description: 'Ex : 3 pour vendre les mouches par 3 minimum. Laissez 1 si le produit se vend à l\'unité.',
      validation: Rule => Rule.min(1).integer(),
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
            description: 'Ex : "Hameçon n°2", "Bleu marine", "10 cm – Blanc/olive"',
            validation: Rule => Rule.required(),
          },
          {
            name: 'prix',
            title: 'Prix (€ TTC) — optionnel',
            type: 'number',
            description: 'Laissez vide pour utiliser le prix du produit. Ex : la grande taille un peu plus chère.',
            validation: Rule => Rule.positive(),
          },
          {
            name: 'stock',
            title: 'Stock',
            type: 'number',
            description: 'Laissez vide = illimité · 0 = épuisé',
            validation: Rule => Rule.min(0),
          },
          {
            name: 'poids',
            title: 'Poids (grammes) — optionnel',
            type: 'number',
            description: 'Laissez vide pour utiliser le poids du produit. Sert au calcul des frais de port.',
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
          select: { title: 'nom', prix: 'prix', stock: 'stock', media: 'photos.0' },
          prepare({ title, prix, stock, media }) {
            const p = prix != null ? `${prix.toFixed(2).replace('.', ',')} € · ` : ''
            const s = stock === 0 ? '❌ Épuisé' : stock != null ? `${stock} en stock` : 'Stock illimité'
            return { title, subtitle: `${p}${s}`, media }
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
      name: 'prestationsAssociees',
      title: 'Prestations associées (optionnel)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'prestation' }] }],
      group: 'infos',
      description: 'Ex : pour une mouche à bar, les sorties bar — un encart "Pêchez-la avec Jean-Baptiste" apparaîtra sur la fiche',
    },
    {
      name: 'articlesAssocies',
      title: 'Articles de blog associés (optionnel)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      group: 'infos',
      description: 'Des articles qui parlent de ce produit ou de cette pêche — liens "À lire sur le blog" sur la fiche',
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
      const cat = { mouche: '🪰', coffret: '🎁', goodies: '🧢', materiel: '🎣', autre: '📦' }[categorie] ?? '📦'
      const etat = disponible === false ? ' · 🚫 masqué' : stock === 0 ? ' · ❌ épuisé' : ''
      return {
        title,
        subtitle: `${cat} ${prix != null ? prix.toFixed(2).replace('.', ',') + ' €' : 'prix manquant'}${etat}`,
        media,
      }
    },
  },
}
