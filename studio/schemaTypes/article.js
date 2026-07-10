export default {
  name: 'article',
  title: 'Articles du blog',
  type: 'document',
  icon: () => '✍️',
  groups: [
    { name: 'contenu',     title: '📝 Contenu' },
    { name: 'traductions', title: '🇬🇧 Version anglaise' },
    { name: 'classement',  title: '🏷️ Classement' },
    { name: 'seo',         title: '🔍 SEO' },
  ],
  fields: [
    {
      name: 'title',
      title: "Titre de l'article",
      type: 'string',
      group: 'contenu',
      validation: Rule => Rule.required().error('Le titre est obligatoire'),
    },
    {
      name: 'slug',
      title: "URL de l'article",
      type: 'slug',
      group: 'contenu',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date de publication',
      type: 'datetime',
      group: 'contenu',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' },
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'image',
      title: 'Photo principale',
      type: 'image',
      group: 'contenu',
      options: { hotspot: true },
    },
    {
      name: 'galerie',
      title: 'Galerie photos (optionnel)',
      type: 'array',
      group: 'contenu',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt',     type: 'string', title: 'Description (texte alternatif)' },
          { name: 'caption', type: 'string', title: 'Légende (affichée sous la photo)' },
        ],
      }],
      description: '📸 Glissez-déposez plusieurs photos — elles s\'afficheront en galerie sous l\'article',
      options: { layout: 'grid' },
    },
    {
      name: 'extrait',
      title: 'Extrait / Chapô',
      type: 'text',
      rows: 3,
      group: 'contenu',
      description: 'Court résumé affiché dans la liste des articles',
      validation: Rule => Rule.max(300).warning('Moins de 300 caractères recommandé'),
    },
    {
      name: 'contenu',
      title: "Contenu de l'article",
      type: 'array',
      group: 'contenu',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: "Description de l'image (SEO)", type: 'string' }],
        },
        {
          type: 'object',
          name: 'youtube',
          title: 'Vidéo YouTube',
          fields: [
            { name: 'videoId', title: 'ID YouTube (ex: dQw4w9WgXcQ)', type: 'string' },
          ],
          preview: {
            select: { title: 'videoId' },
            prepare({ title }) { return { title: `▶ YouTube : ${title || '(sans ID)'}` } },
          },
        },
        {
          type: 'object',
          name: 'vimeo',
          title: 'Vidéo Vimeo',
          fields: [
            { name: 'videoId', title: 'ID Vimeo (ex: 202750783)', type: 'string' },
          ],
          preview: {
            select: { title: 'videoId' },
            prepare({ title }) { return { title: `▶ Vimeo : ${title || '(sans ID)'}` } },
          },
        },
      ],
    },
    // ── Traductions EN ──────────────────────────────────────────────────────
    {
      name: 'titleEn',
      title: 'Titre — English',
      type: 'string',
      group: 'traductions',
    },
    {
      name: 'extraitEn',
      title: 'Extrait — English',
      type: 'text',
      rows: 3,
      group: 'traductions',
    },
    {
      name: 'contenuEn',
      title: '🇬🇧 Contenu de l\'article — English',
      type: 'array',
      group: 'traductions',
      description: 'Texte anglais uniquement — photos et vidéos reprises automatiquement depuis la version française.',
      of: [
        { type: 'block' },
      ],
    },
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
      name: 'prestationLiee',
      title: 'Prestation liée (optionnel)',
      type: 'reference',
      group: 'classement',
      to: [{ type: 'prestation' }, { type: 'voyage' }, { type: 'page' }],
      options: {
        // Uniquement des documents avec une URL (exclut la page d'accueil)
        filter: 'defined(slug.current) && slug.current != "/"',
      },
      description: '🔗 La prestation/le voyage vers lequel cet article renvoie (bouton principal en bas d\'article). Laissez vide : le site choisit automatiquement (mots-clés puis espèce).',
    },
    {
      name: 'pageLiee',
      title: 'Page liée (optionnel)',
      type: 'reference',
      group: 'classement',
      to: [{ type: 'page' }],
      options: {
        filter: 'defined(slug.current) && slug.current != "/"',
      },
      description: '🔗 Une page thématique du site en PLUS de la prestation : matériel, mes mouches, vidéos, revue de presse… Affichée en lien "Voir aussi" en bas d\'article, et l\'article apparaît dans le bloc "À lire sur le blog" de cette page. Laissez vide : détection automatique par mots-clés.',
    },
    {
      name: 'espece',
      title: 'Espèce',
      type: 'string',
      group: 'classement',
      options: {
        list: [
          { title: '🌊 Bar', value: 'bar' },
          { title: '🏞️ Truite', value: 'truite' },
          { title: '🐟 Saumon', value: 'saumon' },
          { title: '🐟 Alose', value: 'alose' },
          { title: '🎣 Brochet', value: 'brochet' },
          { title: '✈️ Exotique', value: 'exotique' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'classement',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.max(65).warning('Idéalement moins de 65 caractères'),
    },
    {
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères'),
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image', espece: 'espece' },
    prepare({ title, subtitle, media, espece }) {
      const emojis = { bar: '🌊', truite: '🏞️', saumon: '🐟', alose: '🐟', brochet: '🎣', exotique: '✈️' }
      const date = subtitle ? new Date(subtitle).toLocaleDateString('fr-FR') : ''
      return {
        title: `${emojis[espece] || '✍️'} ${title}`,
        subtitle: date,
        media,
      }
    },
  },
}
