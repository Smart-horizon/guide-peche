const EMOJIS = {
  texteImage: '📝',
  promo:      '🌟',
  cartes:     '🃏',
  banniere:   '📢',
}

export default {
  name:  'sectionAccueil',
  title: 'Section personnalisée — Accueil',
  type:  'document',
  icon:  () => '➕',

  __experimental_actions: ['create', 'update', 'publish', 'delete'],

  groups: [
    { name: 'config',  title: '⚙️ Type de section' },
    { name: 'contenu', title: '✏️ Contenu', default: true },
  ],

  fields: [

    // ── Type de section ──────────────────────────────────────────────────────
    {
      name:  'sectionType',
      title: 'Type de section',
      type:  'string',
      group: 'config',
      options: {
        list: [
          { title: '📝 Texte + image',         value: 'texteImage' },
          { title: '🌟 Mise en avant (promo)',  value: 'promo'      },
          { title: '🃏 Galerie de cartes',      value: 'cartes'     },
          { title: '📢 Bannière',               value: 'banniere'   },
        ],
        layout: 'radio',
      },
      initialValue: 'texteImage',
      validation: Rule => Rule.required(),
    },

    // ── Gestion interne (hidden) ─────────────────────────────────────────────
    {
      name:   'position',
      title:  'Position',
      type:   'number',
      hidden: true,
    },
    {
      name:   'visible',
      title:  'Visible',
      type:   'boolean',
      hidden: true,
    },

    // ── Champs communs ───────────────────────────────────────────────────────
    {
      name:  'eyebrow',
      title: 'Texte au-dessus du titre',
      type:  'string',
      group: 'contenu',
      description: 'Petit texte en surtitre — optionnel',
    },
    {
      name:  'titre',
      title: 'Titre',
      type:  'string',
      group: 'contenu',
      validation: Rule => Rule.required(),
    },
    {
      name:  'texte',
      title: 'Texte',
      type:  'text',
      rows:  4,
      group: 'contenu',
      hidden: ({ parent }) => parent?.sectionType === 'cartes',
    },
    {
      name:  'boutonTexte',
      title: 'Bouton — texte',
      type:  'string',
      group: 'contenu',
      hidden: ({ parent }) => parent?.sectionType === 'cartes',
    },
    {
      name:  'boutonLien',
      title: 'Bouton — lien (URL)',
      type:  'string',
      group: 'contenu',
      hidden: ({ parent }) => parent?.sectionType === 'cartes',
    },

    // ── Image (texteImage + promo) ───────────────────────────────────────────
    {
      name:   'image',
      title:  'Photo',
      type:   'image',
      group:  'contenu',
      options: { hotspot: true },
      description: 'Format paysage recommandé (4:3)',
      hidden: ({ parent }) =>
        parent?.sectionType !== 'texteImage' && parent?.sectionType !== 'promo',
    },

    // ── Disposition (texteImage uniquement) ─────────────────────────────────
    {
      name:  'disposition',
      title: 'Disposition de la photo',
      type:  'string',
      group: 'contenu',
      options: {
        list: [
          { title: 'Image à droite (texte à gauche)', value: 'image-droite' },
          { title: 'Image à gauche (texte à droite)', value: 'image-gauche' },
        ],
        layout: 'radio',
      },
      initialValue: 'image-droite',
      hidden: ({ parent }) => parent?.sectionType !== 'texteImage',
    },

    // ── Fond (banniere uniquement) ───────────────────────────────────────────
    {
      name:  'fond',
      title: 'Couleur de fond',
      type:  'string',
      group: 'contenu',
      options: {
        list: [
          { title: 'Beige (clair)',  value: 'sable'  },
          { title: 'Blanc',          value: 'blanc'  },
          { title: 'Bleu (sombre)',  value: 'ocean'  },
        ],
        layout: 'radio',
      },
      initialValue: 'sable',
      hidden: ({ parent }) => parent?.sectionType !== 'banniere',
    },

    // ── Cartes (cartes uniquement) ───────────────────────────────────────────
    {
      name:  'cartes',
      title: 'Cartes',
      type:  'array',
      group: 'contenu',
      description: 'Ajoutez de 2 à 6 cartes — glisser pour réordonner',
      of: [{
        type: 'object',
        name: 'carte',
        fields: [
          { name: 'label', title: 'Titre de la carte', type: 'string' },
          { name: 'sub',   title: 'Sous-titre',         type: 'string' },
          { name: 'href',  title: 'Lien',               type: 'string' },
          {
            name:    'image',
            title:   'Photo de fond',
            type:    'image',
            options: { hotspot: true },
          },
        ],
        preview: { select: { title: 'label', subtitle: 'sub', media: 'image' } },
      }],
      validation: Rule => Rule.min(2).max(6),
      hidden: ({ parent }) => parent?.sectionType !== 'cartes',
    },

  ],

  preview: {
    select: {
      title:       'titre',
      sectionType: 'sectionType',
      visible:     'visible',
    },
    prepare: ({ title, sectionType, visible }) => {
      const emoji = EMOJIS[sectionType] ?? '➕'
      const suffix = visible === false ? ' [masquée]' : ''
      return {
        title:    `${emoji} ${title ?? '(sans titre)'}${suffix}`,
        subtitle: sectionType ?? 'section personnalisée',
      }
    },
  },
}
