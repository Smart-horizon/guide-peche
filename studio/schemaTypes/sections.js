/**
 * sections.js
 * Tous les types de blocs du Page Builder.
 * Ces objets sont utilisés dans le champ `pagebuilder[]`
 * des schemas prestation, voyage, page, etc.
 */

// ── Portable Text partagé ─────────────────────────────────────────────────
const richText = (name = 'texte', title = 'Texte') => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal',   value: 'normal' },
        { title: 'Titre H2', value: 'h2' },
        { title: 'Titre H3', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Gras',    value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link', type: 'object', title: 'Lien',
            fields: [{ name: 'href', type: 'url', title: 'URL du lien' }],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Description (SEO)' }],
    },
  ],
})

// ── Champ couleur de fond (réutilisé dans plusieurs blocs) ─────────────────
const fondField = (initialValue = 'white') => ({
  name: 'fond',
  title: 'Couleur de fond',
  type: 'string',
  options: {
    list: [
      { title: '⬜ Blanc',         value: 'white' },
      { title: '🟫 Beige (sable)', value: 'sand'  },
      { title: '🟦 Bleu nuit',     value: 'dark'  },
    ],
    layout: 'radio',
  },
  initialValue,
})

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────────────────────────────────────
export const sectionHero = {
  name: 'sectionHero',
  title: '🎯 Hero',
  type: 'object',
  fields: [
    {
      name: 'image', title: 'Photo de fond', type: 'image',
      options: { hotspot: true },
      description: 'Grande photo en arrière-plan du hero',
    },
    {
      name: 'eyebrow', title: 'Texte au-dessus du titre (eyebrow)',
      type: 'string',
      description: 'Ex : "Bar à la mouche · Bretagne-Sud"',
    },
    {
      name: 'titre', title: 'Titre principal (H1)', type: 'string',
      validation: Rule => Rule.required().error('Le titre H1 est obligatoire'),
    },
    {
      name: 'sousTitre', title: 'Phrase d\'accroche sous le titre', type: 'string',
    },
    {
      name: 'hauteur', title: 'Hauteur du hero',
      type: 'string',
      options: {
        list: [
          { title: 'Plein écran (72vh)', value: 'full' },
          { title: 'Moyen (50vh)',       value: 'medium' },
          { title: 'Compact (35vh)',     value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
    },
    {
      name: 'btnReserverTexte', title: 'Bouton principal — texte',
      type: 'string', initialValue: 'Réserver une sortie',
    },
    {
      name: 'btnReserverLien', title: 'Bouton principal — URL',
      type: 'string', initialValue: '/contact',
    },
    {
      name: 'btnTelTexte', title: 'Bouton téléphone — texte',
      type: 'string', initialValue: '06 87 30 34 56',
    },
    {
      name: 'btnMaterielLien', title: 'Bouton matériel — URL (optionnel)',
      type: 'string',
      description: 'Ex : /materiel-mouche-bar — laisser vide si non souhaité',
    },
    {
      name: 'btnMaterielLabel', title: 'Bouton matériel — libellé',
      type: 'string',
      initialValue: 'Matériel',
      description: 'Ex : "Matériel bar", "Matériel truite"…',
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'eyebrow', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: `🎯 Hero — ${title || '(sans titre)'}`,
      subtitle: subtitle || '',
      media,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — INTRO + INFO CARD
// ─────────────────────────────────────────────────────────────────────────────
export const sectionIntro = {
  name: 'sectionIntro',
  title: '📋 Intro + Info card',
  type: 'object',
  fields: [
    richText('texte', 'Texte principal'),
    {
      name: 'showInfoCard', title: 'Afficher l\'encart d\'infos pratiques ?',
      type: 'boolean', initialValue: true,
    },
    {
      name: 'niveau', title: 'Niveau requis',
      type: 'string', description: 'Ex : Tous niveaux — Débutant à expert',
    },
    {
      name: 'format', title: 'Format(s) proposé(s)',
      type: 'text', rows: 2,
      description: 'Ex : Initiation · Perfectionnement · Bar à vue',
    },
    {
      name: 'saison', title: 'Saison / période',
      type: 'string', description: 'Ex : Toute l\'année',
    },
    {
      name: 'tarif', title: 'Tarif',
      type: 'string', description: 'Ex : 300 € / journée · 180 € / demi-journée',
    },
    {
      name: 'duree', title: 'Durée',
      type: 'string', description: 'Ex : Journée complète (8h)',
    },
    {
      name: 'lignesSupp',
      title: 'Infos supplémentaires (libres)',
      type: 'array',
      description: 'Ajoutez autant de lignes que souhaité — ex : Matériel · Waders recommandés · Participants · 2 pers. max…',
      of: [
        {
          type: 'object',
          name: 'ligneInfo',
          title: 'Ligne',
          fields: [
            {
              name: 'label',  title: 'Étiquette',
              type: 'string', description: 'Ex : Matériel · Participants · Lieu · Espèces',
            },
            {
              name: 'valeur', title: 'Valeur',
              type: 'string', description: 'Ex : Waders recommandés · 2 pers. max · Rivière Odet',
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'valeur' },
            prepare: ({ title, subtitle }) => ({ title: title || '(sans étiquette)', subtitle }),
          },
        },
      ],
    },
    fondField('white'),
  ],
  preview: {
    select: { t: 'tarif', f: 'format' },
    prepare: ({ t, f }) => ({
      title: '📋 Intro + Info card',
      subtitle: [t, f].filter(Boolean).join(' · ') || 'Texte d\'introduction',
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2b — TITRE DE SECTION
// ─────────────────────────────────────────────────────────────────────────────
export const sectionTitre = {
  name: 'sectionTitre',
  title: '🏷️ Titre de section',
  type: 'object',
  fields: [
    {
      name: 'eyebrow',
      title: 'Texte au-dessus du titre (eyebrow)',
      type: 'string',
      description: 'Petite ligne en majuscules · Ex : "Ce que je propose" · "Équipement · Ressources"',
    },
    {
      name: 'titre',
      title: 'Titre (H2)',
      type: 'string',
      validation: Rule => Rule.required().error('Le titre est obligatoire'),
      description: 'Ex : "Stages & guidages" · "Matériel & univers"',
    },
    {
      name: 'sousTitre',
      title: 'Sous-titre (optionnel)',
      type: 'text',
      rows: 2,
      description: 'Courte phrase sous le titre — laissez vide si non souhaité',
    },
    {
      name: 'alignement',
      title: 'Alignement du texte',
      type: 'string',
      options: {
        list: [
          { title: '⬛ Centré (défaut)', value: 'center' },
          { title: '⬅️ Aligné à gauche', value: 'left'   },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    },
    fondField('white'),
  ],
  preview: {
    select: { eyebrow: 'eyebrow', titre: 'titre' },
    prepare: ({ eyebrow, titre }) => ({
      title: `🏷️ Titre — ${titre || '(sans titre)'}`,
      subtitle: eyebrow || '',
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — CARDS (sous-prestations / offres)
// ─────────────────────────────────────────────────────────────────────────────
export const sectionCards = {
  name: 'sectionCards',
  title: '🃏 Grille de cartes',
  type: 'object',
  fields: [
    {
      name: 'titre', title: 'Titre de la section (optionnel)', type: 'string',
    },
    {
      name: 'cards',
      title: 'Cartes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Carte',
          fields: [
            { name: 'titre',     title: 'Titre',              type: 'string' },
            { name: 'sousTitre', title: 'Sous-titre / accroche', type: 'string' },
            { name: 'lien',      title: 'URL cible',           type: 'string' },
            { name: 'image',     title: 'Photo de fond',       type: 'image', options: { hotspot: true } },
            {
              name: 'positionPhoto',
              title: 'Position de la photo',
              type: 'string',
              options: {
                list: [
                  { title: '⬛ Centre (défaut)', value: 'center center' },
                  { title: '⬆️ Haut',            value: 'center 20%'   },
                  { title: '⬇️ Bas',             value: 'center bottom'},
                ],
                layout: 'radio',
              },
              initialValue: 'center center',
            },
          ],
          preview: {
            select: { title: 'titre', subtitle: 'lien', media: 'image' },
          },
        },
      ],
    },
  ],
  preview: {
    select: { titre: 'titre', cards: 'cards' },
    prepare: ({ titre, cards }) => ({
      title: `🃏 Grille de cartes — ${titre || ''}`,
      subtitle: `${cards?.length || 0} carte(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — TEXTE RICHE
// ─────────────────────────────────────────────────────────────────────────────
export const sectionTexte = {
  name: 'sectionTexte',
  title: '📝 Bloc de texte',
  type: 'object',
  fields: [
    richText('texte', 'Contenu'),
    {
      name: 'largeur', title: 'Largeur du texte',
      type: 'string',
      options: {
        list: [
          { title: 'Normale (760px)',   value: 'normal' },
          { title: 'Large (960px)',     value: 'wide' },
          { title: 'Pleine largeur',    value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    },
    fondField('white'),
  ],
  preview: {
    prepare: () => ({ title: '📝 Bloc de texte' }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — TEXTE + IMAGE
// ─────────────────────────────────────────────────────────────────────────────
export const sectionTexteImage = {
  name: 'sectionTexteImage',
  title: '📰 Texte + Image',
  type: 'object',
  fields: [
    richText('texte', 'Texte'),
    {
      name: 'image', title: 'Image', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Description (SEO)' }],
    },
    {
      name: 'imagePosition', title: 'Position de l\'image',
      type: 'string',
      options: {
        list: [
          { title: '➡️ Image à droite', value: 'right' },
          { title: '⬅️ Image à gauche', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    },
    fondField('white'),
  ],
  preview: {
    select: { pos: 'imagePosition', media: 'image' },
    prepare: ({ pos, media }) => ({
      title: `📰 Texte + Image (image ${pos === 'left' ? 'à gauche' : 'à droite'})`,
      media,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — GALERIE
// ─────────────────────────────────────────────────────────────────────────────
export const sectionGalerie = {
  name: 'sectionGalerie',
  title: '🖼️ Galerie photos',
  type: 'object',
  fields: [
    {
      name: 'titre', title: 'Titre de la galerie (optionnel)', type: 'string',
    },
    {
      name: 'photos', title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Description (SEO)' }],
        },
      ],
    },
    {
      name: 'colonnes', title: 'Nombre de colonnes',
      type: 'string',
      options: {
        list: [
          { title: '2 colonnes', value: '2' },
          { title: '3 colonnes', value: '3' },
          { title: '4 colonnes', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '3',
    },
    fondField('mist'),
  ],
  preview: {
    select: { titre: 'titre', photos: 'photos' },
    prepare: ({ titre, photos }) => ({
      title: `🖼️ Galerie — ${titre || ''}`,
      subtitle: `${photos?.length || 0} photo(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — VIDÉO
// ─────────────────────────────────────────────────────────────────────────────
export const sectionVideo = {
  name: 'sectionVideo',
  title: '▶️ Vidéo + texte',
  type: 'object',
  fields: [
    {
      name: 'url', title: 'URL de la vidéo (YouTube)', type: 'url',
      description: 'Ex : https://www.youtube.com/watch?v=xxxxx',
      validation: Rule => Rule.required(),
    },
    {
      name: 'eyebrow', title: 'Libellé (texte au-dessus du titre)', type: 'string',
      description: 'Ex : "Bar à vue" — affiché en petites majuscules colorées',
    },
    {
      name: 'titre', title: 'Titre', type: 'string',
    },
    {
      name: 'description', title: 'Description', type: 'text', rows: 3,
    },
    {
      name: 'videoPosition',
      title: 'Position de la vidéo',
      type: 'string',
      options: {
        list: [
          { title: '◀ Vidéo à gauche', value: 'left' },
          { title: '▶ Vidéo à droite', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    },
    fondField('white'),
  ],
  preview: {
    select: { titre: 'titre', url: 'url' },
    prepare: ({ titre, url }) => ({
      title: `▶️ ${titre || url || 'Vidéo'}`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 — INFOS CLÉS BANDEAU
// ─────────────────────────────────────────────────────────────────────────────
export const sectionStats = {
  name: 'sectionStats',
  title: '📋 Infos clés — Bandeau',
  type: 'object',
  fields: [
    {
      name: 'stats', title: 'Infos',
      type: 'array',
      description: 'Chaque info = un titre en serif + un sous-titre en petites majuscules. 2 à 5 items recommandés.',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            {
              name: 'nombre', title: 'Titre principal',
              type: 'string',
              description: 'Ex : "Printemps – Automne", "Places limitées", "17 ans"',
            },
            {
              name: 'label', title: 'Sous-titre (petites majuscules)',
              type: 'string',
              description: 'Ex : "SAISON SELON CONDITIONS", "DISPONIBILITÉS RÉDUITES"',
            },
          ],
          preview: {
            select: { title: 'nombre', subtitle: 'label' },
          },
        },
      ],
    },
    fondField('dark'),
  ],
  preview: {
    select: { stats: 'stats' },
    prepare: ({ stats }) => ({
      title: `📋 Infos clés — ${stats?.length || 0} item(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9 — CTA FINAL
// ─────────────────────────────────────────────────────────────────────────────
export const sectionCta = {
  name: 'sectionCta',
  title: '📣 Bloc CTA (réservation)',
  type: 'object',
  fields: [
    {
      name: 'titre', title: 'Titre', type: 'string',
      initialValue: 'Réservez votre sortie',
    },
    {
      name: 'texte', title: 'Texte sous le titre', type: 'text', rows: 2,
      initialValue: 'Disponibilités et tarifs sur demande — réponse sous 24h.',
    },
    {
      name: 'btn1Texte', title: 'Bouton 1 — texte', type: 'string',
      initialValue: 'Me contacter',
    },
    {
      name: 'btn1Lien',  title: 'Bouton 1 — URL', type: 'string',
      initialValue: '/contact',
    },
    {
      name: 'btn2Texte', title: 'Bouton 2 — texte (optionnel)', type: 'string',
      initialValue: '06 87 30 34 56',
    },
    {
      name: 'btn2Lien',  title: 'Bouton 2 — URL (optionnel)', type: 'string',
      initialValue: 'tel:0687303456',
    },
    {
      name: 'style', title: 'Style visuel',
      type: 'string',
      options: {
        list: [
          { title: '🌑 Bleu nuit (foncé)',  value: 'dark' },
          { title: '🔵 Bleu océan',         value: 'ocean' },
          { title: '🟫 Beige (sable)',       value: 'sand' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    },
  ],
  preview: {
    select: { titre: 'titre', style: 'style' },
    prepare: ({ titre, style }) => ({
      title: `📣 CTA — ${titre || ''}`,
      subtitle: style,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 — BANNIÈRE / BANDE D'ANNONCE
// ─────────────────────────────────────────────────────────────────────────────
export const sectionBanniere = {
  name: 'sectionBanniere',
  title: '📢 Bannière / annonce',
  type: 'object',
  fields: [
    {
      name: 'texte', title: 'Texte de la bannière', type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'lien', title: 'Lien (optionnel)', type: 'string',
      description: 'Si renseigné, la bannière devient cliquable',
    },
    {
      name: 'style', title: 'Style visuel',
      type: 'string',
      options: {
        list: [
          { title: '🔵 Bleu ocean',   value: 'ocean' },
          { title: '🟫 Beige',        value: 'sand' },
          { title: '⚡ Accentué',     value: 'accent' },
        ],
        layout: 'radio',
      },
      initialValue: 'ocean',
    },
  ],
  preview: {
    select: { texte: 'texte' },
    prepare: ({ texte }) => ({ title: `📢 Bannière — ${texte || ''}` }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 — CARROUSEL 3 IMAGES
// ─────────────────────────────────────────────────────────────────────────────
export const sectionCarrousel3Images = {
  name: 'sectionCarrousel3Images',
  title: '🎠 Carrousel 3 images',
  type: 'object',
  fields: [
    {
      name: 'titre', title: 'Titre au-dessus (optionnel)', type: 'string',
    },
    {
      name: 'images', title: 'Images',
      type: 'array',
      description: 'Ajoutez autant d\'images que souhaité — 3 s\'affichent à la fois',
      validation: Rule => Rule.min(3).error('Minimum 3 images requises'),
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt',     title: 'Description (SEO)', type: 'string' },
            { name: 'legende', title: 'Légende (optionnel)', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'ratio', title: 'Format des images',
      type: 'string',
      options: {
        list: [
          { title: 'Cinéma 3:2 (recommandé)', value: '3/2' },
          { title: 'Paysage 4:3',             value: '4/3' },
          { title: 'Carré 1:1',               value: '1/1' },
        ],
        layout: 'radio',
      },
      initialValue: '3/2',
    },
    fondField('dark'),
  ],
  preview: {
    select: { titre: 'titre', images: 'images' },
    prepare: ({ titre, images }) => ({
      title: `🎠 Carrousel 3 images — ${titre || ''}`,
      subtitle: `${images?.length || 0} image(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12 — PROGRAMME / ÉTAPES
// ─────────────────────────────────────────────────────────────────────────────
export const sectionProgramme = {
  name: 'sectionProgramme',
  title: '🗓️ Programme / Étapes avec images',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Libellé (au-dessus du titre)',
      type: 'string',
      description: 'Ex : "Programme"',
    },
    {
      name: 'titre', title: 'Titre de la section',
      type: 'string',
      description: 'Ex : "Ce que vous allez travailler"',
    },
    {
      name: 'intro', title: 'Texte d\'introduction (optionnel)',
      type: 'text', rows: 3,
    },
    {
      name: 'etapes', title: 'Étapes du programme',
      type: 'array',
      description: 'Chaque étape = une photo + un titre + un texte. L\'image alterne automatiquement gauche/droite.',
      validation: Rule => Rule.min(1).error('Au moins une étape requise'),
      of: [
        {
          type: 'object',
          name: 'etape',
          fields: [
            {
              name: 'titre', title: 'Titre de l\'étape',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'tag', title: 'Mots-clés / thèmes (optionnel)',
              type: 'string',
              description: 'Ex : "Double traction · Roulé · Distance"',
            },
            {
              name: 'texte', title: 'Description',
              type: 'array',
              of: [{
                type: 'block',
                styles: [{ title: 'Normal', value: 'normal' }],
                marks: {
                  decorators: [
                    { title: 'Gras',    value: 'strong' },
                    { title: 'Italique', value: 'em' },
                  ],
                },
              }],
            },
            {
              name: 'image', title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Description (SEO)' }],
            },
          ],
          preview: {
            select: { title: 'titre', subtitle: 'tag', media: 'image' },
          },
        },
      ],
    },
    fondField('sand'),
  ],
  preview: {
    select: { titre: 'titre', etapes: 'etapes' },
    prepare: ({ titre, etapes }) => ({
      title: `🗓️ Programme — ${titre || ''}`,
      subtitle: `${etapes?.length || 0} étape(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13 — PROGRAMME SANS IMAGE (grille de cartes texte)
// ─────────────────────────────────────────────────────────────────────────────
export const sectionProgrammeTexte = {
  name: 'sectionProgrammeTexte',
  title: '🗓️ Programme / Étapes sans image',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Libellé (au-dessus du titre)', type: 'string',
      description: 'Ex : "Programme"',
    },
    {
      name: 'titre', title: 'Titre de la section', type: 'string',
      description: 'Ex : "Programme du stage"',
    },
    {
      name: 'intro', title: 'Introduction (optionnel)', type: 'text', rows: 2,
    },
    {
      name: 'colonnes', title: 'Colonnes / Blocs',
      type: 'array',
      description: 'Chaque bloc = une carte avec un label et une liste. 2 ou 4 colonnes recommandées.',
      validation: Rule => Rule.min(1).error('Au moins une colonne requise'),
      of: [{
        type: 'object',
        name: 'colonne',
        fields: [
          {
            name: 'label', title: 'Titre du bloc',
            type: 'string',
            description: 'Ex : "Journée 1", "Techniques enseignées", "Inclus / Non inclus"',
            validation: Rule => Rule.required(),
          },
          {
            name: 'style', title: 'Style de la liste',
            type: 'string',
            options: {
              list: [
                { title: '— Tirets (standard)',     value: 'normal' },
                { title: '✓ / ✗  Inclus / Exclus', value: 'check'  },
              ],
              layout: 'radio',
            },
            initialValue: 'normal',
          },
          {
            name: 'items', title: 'Éléments',
            type: 'array',
            validation: Rule => Rule.min(1).error('Au moins un élément requis'),
            of: [{
              type: 'object',
              name: 'item',
              fields: [
                {
                  name: 'texte', title: 'Texte',
                  type: 'text', rows: 2,
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'inclus',
                  title: '✓ Inclus (décocher pour ✗ Non inclus)',
                  type: 'boolean',
                  description: 'Uniquement utilisé si le style du bloc est "Inclus / Exclus"',
                  initialValue: true,
                },
              ],
              preview: {
                select: { title: 'texte', inclus: 'inclus' },
                prepare: ({ title, inclus }) => ({
                  title,
                  subtitle: inclus === false ? '✗' : '✓',
                }),
              },
            }],
          },
        ],
        preview: {
          select: { label: 'label', items: 'items' },
          prepare: ({ label, items }) => ({
            title: label || '(sans titre)',
            subtitle: `${items?.length || 0} élément(s)`,
          }),
        },
      }],
    },
    fondField('sand'),
  ],
  preview: {
    select: { titre: 'titre', colonnes: 'colonnes' },
    prepare: ({ titre, colonnes }) => ({
      title: `🗓️ Programme sans image — ${titre || ''}`,
      subtitle: `${colonnes?.length || 0} colonne(s)`,
    }),
  },
}

// ── Export de tous les types ──────────────────────────────────────────────────
export const allSectionTypes = [
  sectionHero,
  sectionIntro,
  sectionTitre,
  sectionCards,
  sectionTexte,
  sectionTexteImage,
  sectionGalerie,
  sectionVideo,
  sectionStats,
  sectionCta,
  sectionBanniere,
  sectionCarrousel3Images,
  sectionProgramme,
  sectionProgrammeTexte,
]
