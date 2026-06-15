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
    {
      name: 'videoYoutubeUrl',
      title: '▶️ Vidéo de fond — URL YouTube (optionnel)',
      type: 'url',
      description: 'Remplace la photo par une vidéo YouTube en fond. Ex : https://www.youtube.com/watch?v=iq9lzlg3__I — la vidéo sera muette et en boucle.',
    },
    {
      name: 'videoYoutubeDebut',
      title: '⏱ Début de la boucle (secondes)',
      type: 'number',
      initialValue: 0,
      description: 'Secondes depuis le début de la vidéo YouTube. Ex : 0 = depuis le début.',
      hidden: ({ parent }) => !parent?.videoYoutubeUrl,
    },
    {
      name: 'videoYoutubeFin',
      title: '⏱ Fin de la boucle (secondes)',
      type: 'number',
      description: 'La vidéo reboucle à ce moment. Ex : 27 = boucle sur les 27 premières secondes. Laisser vide = vidéo entière.',
      hidden: ({ parent }) => !parent?.videoYoutubeUrl,
    },
    {
      name: 'videoUrl',
      title: '🎬 Vidéo de fond — URL MP4 (optionnel)',
      type: 'url',
      description: 'Remplace la photo si renseignée. Héberger sur Cloudflare R2 ou autre CDN. Format MP4 H.264, muette, ~30s en boucle.',
    },
    {
      name: 'videoWebmUrl',
      title: '🎬 Vidéo de fond — URL WebM (optionnel)',
      type: 'url',
      description: 'Version WebM plus légère (même vidéo, format alternatif). Prioritaire sur MP4 dans les navigateurs modernes.',
    },
    {
      name: 'btnYoutubeLien',
      title: 'Bouton YouTube — URL de la chaîne (optionnel)',
      type: 'url',
      description: 'Ex : https://www.youtube.com/@enjoyfishing — laisser vide pour ne pas afficher',
    },
    {
      name: 'btnYoutubeTexte',
      title: 'Bouton YouTube — libellé',
      type: 'string',
      initialValue: "S'abonner à ma chaîne",
      description: 'Texte du bouton YouTube (affiché avec le logo YouTube)',
    },
    // ── Stats hero (optionnel — remplace les boutons CTA) ──
    {
      name: 'statsHero',
      title: '📊 Stats dans le hero (optionnel)',
      type: 'array',
      description: 'Si renseignées, remplacent les boutons CTA. Ex : 21 ans de guidage | 33 ans de pratique | 12+ pays',
      of: [{
        type: 'object',
        name: 'statHero',
        title: 'Statistique',
        fields: [
          { name: 'nombre', title: 'Valeur (ex : 21, 33 ans, 12+)', type: 'string', validation: R => R.required() },
          { name: 'label',  title: 'Libellé (ex : "ans de guidage")', type: 'string', validation: R => R.required() },
        ],
        preview: {
          select: { nombre: 'nombre', label: 'label' },
          prepare: ({ nombre, label }) => ({ title: `${nombre} — ${label}` }),
        },
      }],
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
    {
      name: 'eyebrow',
      title: 'Libellé (au-dessus du titre)',
      type: 'string',
      description: 'Ex : "Bar à la mouche · Bretagne-Sud" — petite ligne en majuscules',
    },
    {
      name: 'titre',
      title: 'Titre de la section (H2)',
      type: 'string',
      description: 'Accroche principale de l\'introduction',
    },
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
      name: 'duree', title: 'Horaires',
      type: 'string', description: 'Ex : 9h30–18h · Soit 7 à 8h de guidage',
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
            {
              name: 'note', title: 'Note (italique, optionnel)',
              type: 'string', description: 'Précision affichée en italique sous la valeur — ex : Permis journalier non inclus (15 à 23 €)',
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'valeur' },
            prepare: ({ title, subtitle }) => ({ title: title || '(sans étiquette)', subtitle }),
          },
        },
      ],
    },
    {
      name: 'boutons',
      title: 'Boutons de l\'info card',
      type: 'array',
      description: 'Boutons bleus affichés en bas de l\'encart — ex : "Vérifier les disponibilités → /contact"',
      of: [{
        type: 'object',
        name: 'bouton',
        fields: [
          {
            name: 'texte', title: 'Texte du bouton',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'lien', title: 'URL de destination',
            type: 'string',
            description: 'Ex : /contact · /tarifs · /disponibilites-guidages · tel:0687303456',
            validation: Rule => Rule.required(),
          },
        ],
        preview: {
          select: { title: 'texte', subtitle: 'lien' },
        },
      }],
    },
    {
      name: 'intervenant',
      title: 'Intervenant / Expert invité (optionnel)',
      type: 'object',
      description: 'Bloc profil affiché dans l\'intro — ex : co-intervenant masterclass',
      fields: [
        {
          name: 'avatar', title: 'Initiales (2 lettres max)',
          type: 'string',
          description: 'Ex : "GJ" pour Grégoire Juglaret',
        },
        {
          name: 'nom', title: 'Nom complet', type: 'string',
        },
        {
          name: 'titre', title: 'Titre / rôle',
          type: 'string',
          description: 'Ex : "Champion du Monde 2025 · Champion de France réservoir"',
        },
        {
          name: 'bio', title: 'Présentation',
          type: 'text', rows: 3,
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
  title: '🃏 Grille de cartes — style n°1',
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
// SECTION 3b — GRILLE DE CARTES STYLE N°2 (colonnes configurables, sans wide)
// ─────────────────────────────────────────────────────────────────────────────
export const sectionCards2 = {
  name: 'sectionCards2',
  title: '🃏 Grille de cartes — style n°2',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Libellé au-dessus du titre (optionnel)',
      type: 'string',
      description: 'Ex : "Bar à la mouche · Bretagne-Sud"',
    },
    {
      name: 'titre', title: 'Titre de la section (optionnel)', type: 'string',
    },
    {
      name: 'colonnes', title: 'Nombre de colonnes',
      type: 'string',
      options: {
        list: [
          { title: '2 colonnes', value: '2' },
          { title: '3 colonnes', value: '3' },
          { title: '4 colonnes (recommandé)', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '4',
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
            { name: 'titre',     title: 'Titre',               type: 'string' },
            { name: 'sousTitre', title: 'Sous-titre / accroche', type: 'string' },
            { name: 'lien',      title: 'URL cible',            type: 'string' },
            { name: 'image',     title: 'Photo de fond',        type: 'image', options: { hotspot: true } },
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
    fondField('white'),
  ],
  preview: {
    select: { titre: 'titre', cards: 'cards' },
    prepare: ({ titre, cards }) => ({
      title: `🃏 Grille de cartes n°2 — ${titre || ''}`,
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
    {
      name: 'eyebrow', title: 'Libellé au-dessus du titre (optionnel)',
      type: 'string',
      description: 'Ex : "Gran Roque" ou "L\'Archipel"',
    },
    {
      name: 'titre', title: 'Titre de la section (optionnel)',
      type: 'string',
      description: 'Si vide, le titre sera dans le texte riche ci-dessous',
    },
    richText('texte', 'Texte'),
    {
      name: 'image', title: 'Image (optionnel)', type: 'image',
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
    {
      name: 'distances',
      title: 'Étiquettes (optionnel)',
      type: 'array',
      description: 'Ex : "72 km de Brest", "222 km de Rennes" — affichées en chips sous le texte',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    fondField('white'),
  ],
  preview: {
    select: { titre: 'titre', eyebrow: 'eyebrow', pos: 'imagePosition', media: 'image' },
    prepare: ({ titre, eyebrow, pos, media }) => ({
      title: `📰 ${titre || eyebrow || 'Texte + Image'} (image ${pos === 'left' ? 'à gauche' : 'à droite'})`,
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
      validation: Rule => Rule.min(1).warning('Ajoutez au moins 3 images pour un rendu optimal'),
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
  title: '🗓️ Programme / Étapes sans image style 1',
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

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 14 — GRILLE DE CARTES
// ─────────────────────────────────────────────────────────────────────────────
export const sectionProgrammeCartes = {
  name: 'sectionProgrammeCartes',
  title: '📐 Mise en page d\'info',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Libellé au-dessus du titre', type: 'string',
      description: 'Ex : "Équipement" ou "Bonefish · Tarpon · Permit"',
    },
    {
      name: 'titre', title: 'Titre de la section', type: 'string',
    },
    // ── Style de mise en page ─────────────────────────────────────────────────
    {
      name: 'styleMisePage',
      title: 'Style de mise en page',
      type: 'string',
      options: {
        list: [
          { title: '🅰️ Style A — Grande photo à gauche, cartes à droite',    value: 'photo-gauche' },
          { title: '🅱️ Style B — Photo + intro en haut, grille en dessous', value: 'photo-haut'   },
        ],
        layout: 'radio',
      },
      description: 'Actif uniquement si une image est renseignée ci-dessous. Sans image : grille simple.',
    },
    // ── Image ─────────────────────────────────────────────────────────────────
    {
      name: 'image', title: 'Image (optionnel)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Description (SEO)' }],
      description: 'Requise pour les styles A et B',
    },
    {
      name: 'intro', title: 'Introduction (optionnel)', type: 'text', rows: 2,
    },
    // ── Cartes ────────────────────────────────────────────────────────────────
    {
      name: 'items', title: 'Cartes',
      type: 'array',
      description: '2, 3 ou 4 cartes recommandées selon le nombre de colonnes.',
      validation: Rule => Rule.min(1),
      of: [{
        type: 'object',
        name: 'carte',
        fields: [
          {
            name: 'titre', title: 'Titre',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'sousTitre', title: 'Sous-titre (optionnel)',
            type: 'string',
            description: 'Ex : "ESPÈCE STAR · TOP 3 MONDIAL" ou "NOVEMBRE → AVRIL"',
          },
          {
            name: 'description', title: 'Description',
            type: 'text', rows: 3,
          },
        ],
        preview: {
          select: { title: 'titre', subtitle: 'sousTitre' },
          prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle || '' }),
        },
      }],
    },
    {
      name: 'colonnes', title: 'Nombre de colonnes',
      type: 'string',
      options: {
        list: [
          { title: '2 colonnes', value: '2' },
          { title: '3 colonnes (recommandé)', value: '3' },
          { title: '4 colonnes', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '3',
    },
    // ── Note de bas de section ────────────────────────────────────────────────
    {
      name: 'note', title: 'Note de bas de section (optionnel)',
      type: 'string',
      description: 'Texte en italique sous les cartes — ex : "Nos séjours sont planifiés en janvier/février"',
    },
    // ── Bouton optionnel ──────────────────────────────────────────────────────
    {
      name: 'btnTexte', title: 'Bouton — texte (optionnel)',
      type: 'string',
      description: 'Ex : "Télécharger la fiche matériel (PDF)"',
    },
    {
      name: 'btnFichier', title: 'Bouton — fichier PDF (optionnel)',
      type: 'file',
      options: { accept: '.pdf' },
      description: '⬆️ Glissez-déposez votre PDF ici — prioritaire sur l\'URL ci-dessous',
    },
    {
      name: 'btnLien', title: 'Bouton — URL externe (optionnel)',
      type: 'string',
      description: 'Utilisé seulement si aucun fichier n\'est uploadé ci-dessus',
    },
    fondField('sand'),
  ],
  preview: {
    select: { titre: 'titre', items: 'items', media: 'image', style: 'styleMisePage' },
    prepare: ({ titre, items, media, style }) => {
      const styleLabel = style === 'photo-gauche' ? ' · Style A' : style === 'photo-haut' ? ' · Style B' : ''
      return {
        title:    `📐 Mise en page d'info — ${titre || ''}${styleLabel}`,
        subtitle: `${items?.length || 0} carte(s)`,
        media,
      }
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 15 — SÉLECTION (image + texte alternés)
// ─────────────────────────────────────────────────────────────────────────────
export const sectionSelection = {
  name: 'sectionSelection',
  title: '🗂️ Sélection (image + texte alternés)',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Libellé (au-dessus du titre)', type: 'string',
      description: 'Ex : "Les plans d\'eau", "Sélection de rivières"',
    },
    {
      name: 'titre', title: 'Titre de la section', type: 'string',
    },
    {
      name: 'intro', title: 'Introduction (optionnel)', type: 'text', rows: 2,
    },
    {
      name: 'styleCorps',
      title: 'Fond du bloc texte',
      type: 'string',
      options: {
        list: [
          { title: '🟫 Beige (sable) — style réservoir', value: 'sand'  },
          { title: '⬜ Blanc — style rivières',           value: 'white' },
        ],
        layout: 'radio',
      },
      initialValue: 'sand',
    },
    {
      name: 'items', title: 'Éléments de la sélection',
      type: 'array',
      description: 'L\'image alterne automatiquement gauche / droite.',
      validation: Rule => Rule.min(1),
      of: [{
        type: 'object',
        name: 'selectionItem',
        fields: [
          {
            name: 'tag', title: 'Libellé / région',
            type: 'string',
            description: 'Ex : "Finistère (29)", "Côtes-d\'Armor (22)"',
          },
          {
            name: 'titre', title: 'Titre (h3)',
            type: 'string',
            validation: Rule => Rule.required(),
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
            validation: Rule => Rule.required(),
          },
          {
            name: 'pills', title: 'Tags / techniques (optionnel)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Petites pastilles en bas — ex : "Sèche", "Nymphe au fil", "Streamer"',
          },
          {
            name: 'infos', title: 'Infos clés (optionnel)',
            type: 'array',
            of: [{
              type: 'object',
              name: 'infoItem',
              fields: [
                { name: 'label',  title: 'Label',  type: 'string' },
                { name: 'valeur', title: 'Valeur', type: 'string' },
              ],
              preview: {
                select: { title: 'label', subtitle: 'valeur' },
              },
            }],
            description: 'Grille d\'infos clés en bas — ex : "Surface → 9 hectares"',
          },
        ],
        preview: {
          select: { title: 'titre', subtitle: 'tag', media: 'image' },
        },
      }],
    },
    fondField('white'),
  ],
  preview: {
    select: { titre: 'titre', items: 'items' },
    prepare: ({ titre, items }) => ({
      title: `🗂️ Sélection — ${titre || ''}`,
      subtitle: `${items?.length || 0} élément(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 18 — BILAN DE SÉJOUR
// ─────────────────────────────────────────────────────────────────────────────
export const sectionBilan = {
  name: 'sectionBilan',
  title: '📓 Bilan de séjour',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Mention au-dessus du titre',
      type: 'string',
      description: 'Ex : "Récit de séjour · Mars 2015"',
    },
    {
      name: 'titre', title: 'Titre du bilan', type: 'string',
      validation: Rule => Rule.required(),
      description: 'Ex : "Une semaine à Cayo Cruz"',
    },
    {
      name: 'contexte', title: 'Contexte court (dates, groupe, conditions)',
      type: 'string',
      description: 'Ex : "28 fév — 7 mars 2015 · 6 pêcheurs · Conditions variables"',
    },
    richText('texte', 'Récit du séjour'),
    {
      name: 'resultats', title: 'Résultats clés',
      type: 'array',
      description: 'Chiffres ou faits marquants — ex : "Permits capturés → 3"',
      of: [{
        type: 'object',
        name: 'resultat',
        fields: [
          { name: 'label',  title: 'Label',  type: 'string', description: 'Ex : "Permits capturés"' },
          { name: 'valeur', title: 'Valeur', type: 'string', description: 'Ex : "3"' },
        ],
        preview: { select: { title: 'label', subtitle: 'valeur' } },
      }],
    },
    {
      name: 'image', title: 'Photo du séjour (optionnel)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Description (SEO)' }],
    },
    fondField('sand'),
  ],
  preview: {
    select: { titre: 'titre', contexte: 'contexte', media: 'image' },
    prepare: ({ titre, contexte, media }) => ({
      title:    `📓 Bilan — ${titre || ''}`,
      subtitle: contexte || '',
      media,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 19 — DATES DES SÉJOURS (HOSTED TRIPS)
// ─────────────────────────────────────────────────────────────────────────────
export const sectionDates = {
  name: 'sectionDates',
  title: '📅 Dates des séjours',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Mention au-dessus du titre',
      type: 'string',
      description: 'Ex : "Hosted Trips 2026"',
    },
    {
      name: 'titre', title: 'Titre de la section', type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'intro', title: 'Texte d\'introduction (optionnel)', type: 'string',
    },
    {
      name: 'sejours', title: 'Séjours disponibles',
      type: 'array',
      of: [{
        type: 'object',
        name: 'sejour',
        fields: [
          {
            name: 'dates', title: 'Dates', type: 'string',
            validation: Rule => Rule.required(),
            description: 'Ex : "23 — 31 janvier 2026"',
          },
          {
            name: 'destination', title: 'Destination (si différente de la page)',
            type: 'string',
            description: 'Ex : "Los Roques, Venezuela" — laisser vide si identique',
          },
          {
            name: 'description', title: 'Description courte', type: 'string',
            description: 'Ex : "JB Vidal présent 3 jours + guide local 3 jours"',
          },
          {
            name: 'prix', title: 'Prix indicatif', type: 'string',
            description: 'Ex : "À partir de 2 800 €" — laisser vide si sur devis',
          },
          {
            name: 'placesTotal', title: 'Nombre de places au total', type: 'number',
            description: 'Ex : 4',
          },
          {
            name: 'placesDispo', title: 'Places encore disponibles', type: 'number',
            description: 'Mettre 0 pour afficher "Complet"',
          },
          {
            name: 'statut', title: 'Statut',
            type: 'string',
            options: {
              list: [
                { title: '🟢 Disponible',       value: 'disponible'     },
                { title: '🟡 Quelques places',   value: 'peu-de-places'  },
                { title: '🔴 Complet',           value: 'complet'        },
                { title: '⏳ Liste d\'attente',  value: 'liste-attente'  },
              ],
              layout: 'radio',
            },
            initialValue: 'disponible',
          },
        ],
        preview: {
          select: { dates: 'dates', dest: 'destination', statut: 'statut', dispo: 'placesDispo' },
          prepare: ({ dates, dest, statut, dispo }) => {
            const icons = { disponible: '🟢', 'peu-de-places': '🟡', complet: '🔴', 'liste-attente': '⏳' }
            return {
              title:    `${icons[statut] || ''} ${dates || ''}`,
              subtitle: [dest, dispo != null ? `${dispo} place(s) dispo` : ''].filter(Boolean).join(' · '),
            }
          },
        },
      }],
    },
    {
      name: 'btnTexte', title: 'Bouton — texte', type: 'string',
      initialValue: 'Me contacter pour réserver',
    },
    {
      name: 'btnLien', title: 'Bouton — URL', type: 'string',
      initialValue: '/contact',
    },
    fondField('dark'),
  ],
  preview: {
    select: { titre: 'titre', sejours: 'sejours' },
    prepare: ({ titre, sejours }) => ({
      title:    `📅 Dates — ${titre || ''}`,
      subtitle: `${sejours?.length || 0} séjour(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 20 — CHOIX (lodges, options)
// ─────────────────────────────────────────────────────────────────────────────
export const sectionChoix = {
  name: 'sectionChoix',
  title: '🏠 Choix (lodges, options)',
  type: 'object',
  fields: [
    { name: 'eyebrow', title: 'Mention au-dessus du titre', type: 'string' },
    { name: 'titre', title: 'Titre de la section', type: 'string', validation: Rule => Rule.required() },
    { name: 'intro', title: 'Texte introductif', type: 'text', rows: 3 },
    fondField('sand'),
    {
      name: 'options',
      title: 'Options / Choix',
      type: 'array',
      description: '2 options recommandées (Villa Maria & Kau Tapen, etc.)',
      of: [{
        type: 'object',
        name: 'option',
        title: 'Option',
        fields: [
          { name: 'numero', title: 'Numéro (ex: "01")', type: 'string' },
          { name: 'titre', title: 'Nom du lodge / option', type: 'string', validation: Rule => Rule.required() },
          { name: 'tag', title: 'Sous-titre court (emplacement, spécificité)', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 4 },
          {
            name: 'image', title: 'Photo du lodge',
            type: 'image', options: { hotspot: true },
            fields: [{ name: 'alt', type: 'string', title: 'Description' }],
          },
        ],
        preview: {
          select: { title: 'titre', subtitle: 'tag', media: 'image' },
          prepare: ({ title, subtitle, media }) => ({ title: title || 'Option', subtitle, media }),
        },
      }],
    },
    {
      name: 'galerie',
      title: 'Galerie photos (optionnel — sous les choix)',
      type: 'array',
      description: '2 à 4 photos de l\'hébergement (intérieur, salle à manger...)',
      of: [{
        type: 'image', options: { hotspot: true },
        fields: [{ name: 'alt', type: 'string', title: 'Description' }],
      }],
    },
  ],
  preview: {
    select: { titre: 'titre', opts: 'options' },
    prepare: ({ titre, opts }) => ({
      title: `🏠 Choix — ${titre || ''}`,
      subtitle: `${opts?.length || 0} option(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 21 — FRISE CHRONOLOGIQUE
// ─────────────────────────────────────────────────────────────────────────────
export const sectionFriseChronologique = {
  name: 'sectionFriseChronologique',
  title: '📅 Frise chronologique',
  type: 'object',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow (au-dessus du titre)', type: 'string' },
    { name: 'titre', title: 'Titre de la section (H2)', type: 'string' },
    { name: 'sousTitre', title: 'Sous-titre (phrase introductive)', type: 'text', rows: 2 },
    fondField('sand'),
    // Barre de stats (au-dessus de la frise)
    {
      name: 'statsBar',
      title: '📊 Barre de stats (optionnel)',
      type: 'array',
      description: 'Chiffres clés affichés en bandeau au-dessus de la frise. Ex : 10+ pays | 8 lodges | 15 ans',
      of: [{
        type: 'object', name: 'statBar', title: 'Stat',
        fields: [
          { name: 'nombre', title: 'Valeur (ex : 10+, 8, 15 ans)', type: 'string', validation: R => R.required() },
          { name: 'label',  title: 'Libellé (ex : "pays guidés")', type: 'string', validation: R => R.required() },
        ],
        preview: { select: { nombre: 'nombre', label: 'label' }, prepare: ({ nombre, label }) => ({ title: `${nombre} ${label}` }) },
      }],
    },
    {
      name: 'citation', title: 'Citation (dans la barre de stats)',
      type: 'string',
      description: 'Ex : « Chaque destination m\'a appris quelque chose d\'unique. »',
    },
    // Étapes de la frise
    {
      name: 'items', title: 'Étapes de la frise',
      type: 'array',
      validation: R => R.min(1).error('Au moins une étape requise'),
      of: [{
        type: 'object', name: 'friseItem', title: 'Étape',
        fields: [
          { name: 'periode', title: 'Période (ex : 2008–2013, Mars 2015)', type: 'string', validation: R => R.required() },
          { name: 'lieu',    title: 'Lieu (ex : Argentine — Terre de Feu)', type: 'string', validation: R => R.required() },
          { name: 'detail',  title: 'Détail de l\'expérience', type: 'text', rows: 2 },
          {
            name: 'photos', title: '📸 Photos (ouvre un mini-carrousel au survol)',
            type: 'array',
            description: 'Si présentes, le point de la frise devient cliquable et affiche les photos',
            of: [{
              type: 'image', options: { hotspot: true },
              fields: [
                { name: 'alt',     type: 'string', title: 'Description (SEO / accessibilité)' },
                { name: 'caption', type: 'string', title: 'Légende (affichée sur la photo)' },
              ],
            }],
          },
          { name: 'lien',       title: 'Lien principal (optionnel)', type: 'string', description: 'URL interne ou externe' },
          { name: 'lienLabel',  title: 'Libellé du lien principal',  type: 'string' },
          { name: 'lien2',      title: 'Lien secondaire (optionnel)', type: 'string' },
          { name: 'lienLabel2', title: 'Libellé du lien secondaire',  type: 'string' },
        ],
        preview: {
          select: { periode: 'periode', lieu: 'lieu', photos: 'photos' },
          prepare: ({ periode, lieu, photos }) => ({
            title: `${periode} — ${lieu}`,
            subtitle: photos?.length ? `📸 ${photos.length} photo(s)` : 'Aucune photo',
          }),
        },
      }],
    },
  ],
  preview: {
    select: { titre: 'titre', items: 'items' },
    prepare: ({ titre, items }) => ({
      title: `📅 Frise — ${titre || '(sans titre)'}`,
      subtitle: `${items?.length || 0} étape(s)`,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 22 — LISTE (diplômes, qualifications, certifications)
// ─────────────────────────────────────────────────────────────────────────────
export const sectionListe = {
  name: 'sectionListe',
  title: '📋 Liste (diplômes, qualifications...)',
  type: 'object',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'titre',   title: 'Titre (H2)', type: 'string' },
    { name: 'intro',   title: 'Texte introductif', type: 'text', rows: 3 },
    fondField('white'),
    {
      name: 'items', title: 'Éléments de la liste',
      type: 'array',
      validation: R => R.min(1),
      of: [{
        type: 'object', name: 'listeItem', title: 'Élément',
        fields: [
          {
            name: 'annee', title: 'Étiquette (année, catégorie)',
            type: 'string',
            validation: R => R.required(),
            description: 'Ex : 2004, Presse, Sponsors, 2001–',
          },
          {
            name: 'label', title: 'Description',
            type: 'string',
            validation: R => R.required(),
          },
        ],
        preview: {
          select: { annee: 'annee', label: 'label' },
          prepare: ({ annee, label }) => ({ title: `${annee} — ${label}` }),
        },
      }],
    },
    {
      name: 'image', title: 'Photo (côté droit)',
      type: 'image', options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Description (SEO)' }],
    },
  ],
  preview: {
    select: { titre: 'titre', items: 'items', media: 'image' },
    prepare: ({ titre, items, media }) => ({
      title: `📋 Liste — ${titre || '(sans titre)'}`,
      subtitle: `${items?.length || 0} élément(s)`,
      media,
    }),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION — LIEN VERS ARTICLE DE BLOG
export const sectionLienBlog = {
  name: 'sectionLienBlog',
  title: '📰 Lien vers article de blog',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Eyebrow', type: 'string',
      description: 'Ex : Blog · Enjoy Fishing',
      initialValue: 'Blog · Enjoy Fishing',
    },
    {
      name: 'titre', title: "Titre de l'article", type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'description', title: 'Description', type: 'text', rows: 3,
      description: 'Courte présentation de l\'article (1–2 phrases)',
    },
    {
      name: 'urlArticle', title: "URL de l'article", type: 'url',
      validation: R => R.required(),
      description: 'Lien complet vers enjoyfishing.fr ou tout autre blog',
    },
    {
      name: 'labelBouton', title: 'Libellé du bouton', type: 'string',
      description: 'Par défaut : "Lire l\'article →"',
    },
    fondField('white'),
  ],
  preview: {
    select: { titre: 'titre', url: 'urlArticle' },
    prepare: ({ titre, url }) => ({
      title: `📰 ${titre || '(sans titre)'}`,
      subtitle: url,
    }),
  },
}

// ── SECTIONS HOMEPAGE ─────────────────────────────────────────────────────────

export const sectionPrestationsHP = {
  name: 'sectionPrestationsHP',
  title: 'Prestations (grille HP)',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Eyebrow', type: 'string',
      description: 'Petit texte au-dessus du titre (ex: "Ce que je propose")',
    },
    {
      name: 'titre', title: 'Titre de section', type: 'string',
    },
  ],
  preview: {
    select: { titre: 'titre' },
    prepare: ({ titre }) => ({ title: `🎣 Prestations HP — ${titre || ''}` }),
  },
}

export const sectionGuideHP = {
  name: 'sectionGuideHP',
  title: 'Le Guide (section HP)',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Eyebrow', type: 'string',
      description: 'Ex: "Votre guide"',
    },
    {
      name: 'nom', title: 'Nom du guide', type: 'string',
    },
    {
      name: 'accroche', title: 'Accroche (sous-titre)', type: 'string',
    },
    {
      name: 'bio', title: 'Bio courte', type: 'text', rows: 4,
    },
    {
      name: 'photo', title: 'Photo du guide', type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'boutonTexte', title: 'Texte du bouton', type: 'string',
      description: 'Ex: "En savoir plus"',
    },
    {
      name: 'boutonLien', title: 'Lien du bouton', type: 'string',
      description: 'Ex: /jean-baptiste-vidal-moniteur-guide-de-peche',
    },
    {
      name: 'stats',
      title: 'Stats / Chiffres clés',
      type: 'array',
      description: 'Les 4 badges chiffres (ex: "33 ans — de pêche à la mouche")',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'valeur',
              title: 'Valeur (en gras)',
              type: 'string',
              description: 'Ex: "33 ans" ou "Voyages"',
            },
            {
              name: 'label',
              title: 'Description',
              type: 'string',
              description: 'Ex: "de pêche à la mouche"',
            },
          ],
          preview: {
            select: { valeur: 'valeur', label: 'label' },
            prepare: ({ valeur, label }) => ({ title: `${valeur || '—'} ${label || ''}` }),
          },
        },
      ],
    },
  ],
  preview: {
    select: { nom: 'nom' },
    prepare: ({ nom }) => ({ title: `🧑‍✈️ Guide HP — ${nom || ''}` }),
  },
}

export const sectionTemoignagesHP = {
  name: 'sectionTemoignagesHP',
  title: 'Témoignages (section HP)',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Eyebrow (haut gauche)', type: 'string',
      description: 'Ex: "Ce qu\'ils disent"',
    },
    {
      name: 'pitch', title: 'Phrase d\'accroche (droite)', type: 'text', rows: 3,
      description: 'Texte affiché sous la note moyenne, côté droit. Ex: "Des pêcheurs de toute la France font confiance à Jean-Baptiste depuis 2004."',
    },
    {
      name: 'ctaTexte', title: 'Texte du lien', type: 'string',
      description: 'Ex: "Lire tous les témoignages"',
    },
    {
      name: 'ctaLien', title: 'URL du lien', type: 'string',
      description: 'Ex: /temoignages',
    },
    {
      name: '_note', title: '💡 Sélection des témoignages', type: 'string',
      readOnly: true,
      initialValue: 'Pour choisir les témoignages affichés ici, allez dans "Témoignages" et cochez "Afficher en accueil" sur chaque fiche souhaitée.',
    },
  ],
  preview: {
    select: { pitch: 'pitch' },
    prepare: ({ pitch }) => ({ title: `⭐ Témoignages HP — ${pitch || ''}` }),
  },
}

export const sectionBonCadeauHP = {
  name: 'sectionBonCadeauHP',
  title: 'Bon cadeau (section HP)',
  type: 'object',
  fields: [
    {
      name: 'titre', title: 'Titre', type: 'string',
    },
    {
      name: 'texte', title: 'Texte', type: 'text', rows: 3,
    },
    {
      name: 'btn1Texte', title: 'Bouton 1 — texte', type: 'string',
    },
    {
      name: 'btn1Lien', title: 'Bouton 1 — lien', type: 'string',
    },
    {
      name: 'btn2Texte', title: 'Bouton 2 — texte', type: 'string',
    },
    {
      name: 'btn2Lien', title: 'Bouton 2 — lien', type: 'string',
    },
  ],
  preview: {
    select: { titre: 'titre' },
    prepare: ({ titre }) => ({ title: `🎁 Bon cadeau HP — ${titre || ''}` }),
  },
}

// ── BANNIÈRE + INFOCARD FLOUTÉ ────────────────────────────────────────────────
export const sectionBanniereCard = {
  name: 'sectionBanniereCard',
  title: '🎴 Bannière + Infocard',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Photo de fond',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo affichée en arrière-plan (plein cadre)',
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Petite ligne au-dessus du titre — ex: "🎁 Idée cadeau"',
    },
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
    },
    {
      name: 'texte',
      title: 'Texte de description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'boutons',
      title: 'Boutons (max 2)',
      type: 'array',
      validation: Rule => Rule.max(2),
      of: [{
        type: 'object',
        name: 'bouton',
        title: 'Bouton',
        fields: [
          { name: 'texte', title: 'Texte', type: 'string' },
          { name: 'lien',  title: 'Lien',  type: 'string' },
          {
            name: 'style',
            title: 'Style',
            type: 'string',
            options: { list: [
              { title: 'Primaire (fond clair)', value: 'primaire' },
              { title: 'Ghost (bordure blanche)', value: 'ghost' },
            ]},
            initialValue: 'primaire',
          },
        ],
        preview: {
          select: { texte: 'texte', style: 'style' },
          prepare: ({ texte, style }) => ({ title: texte, subtitle: style }),
        },
      }],
    },
    {
      name: 'infocard',
      title: 'Infocard (encart flouté à droite)',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'afficher',
          title: 'Afficher l\'infocard',
          type: 'boolean',
          initialValue: true,
          description: 'Désactiver pour n\'afficher que le contenu texte (pleine largeur)',
        },
        {
          name: 'lignes',
          title: 'Lignes label / valeur',
          type: 'array',
          of: [{
            type: 'object',
            name: 'ligne',
            title: 'Ligne',
            fields: [
              { name: 'label',  title: 'Label (petit)',  type: 'string' },
              { name: 'valeur', title: 'Valeur (grand)', type: 'string' },
            ],
            preview: {
              select: { label: 'label', valeur: 'valeur' },
              prepare: ({ label, valeur }) => ({ title: label, subtitle: valeur }),
            },
          }],
        },
        {
          name: 'ctaTexte',
          title: 'Bouton CTA — texte',
          type: 'string',
          description: 'Ex: "Commander →"',
        },
        {
          name: 'ctaLien',
          title: 'Bouton CTA — lien',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: { titre: 'titre', eyebrow: 'eyebrow', media: 'image' },
    prepare: ({ titre, eyebrow, media }) => ({
      title: `🎴 ${titre || eyebrow || '(Bannière + Infocard)'}`,
      media,
    }),
  },
}

// ── GRILLE WILD FLY — style n°3 ──────────────────────────────────────────────
export const sectionCards3 = {
  name: 'sectionCards3',
  title: '🃏 Grille Wild Fly — style n°3',
  type: 'object',
  fields: [
    {
      name: 'eyebrow', title: 'Eyebrow', type: 'string',
    },
    {
      name: 'titre', title: 'Titre de section', type: 'string',
    },
    {
      name: 'cartes',
      title: 'Cartes',
      description: 'Recommandé : 1 grande carte + 4 cartes normales (5 au total)',
      type: 'array',
      validation: Rule => Rule.max(6).warning('Maximum 6 cartes recommandé'),
      of: [{
        type: 'object',
        name: 'carte3',
        title: 'Carte',
        fields: [
          {
            name: 'image', title: 'Photo de fond', type: 'image',
            options: { hotspot: true },
          },
          { name: 'label', title: 'Titre de la carte', type: 'string' },
          {
            name: 'sousTitre', title: 'Sous-label (catégorie)', type: 'string',
            description: 'Ex: "Truite · Alose · Brochet"',
          },
          { name: 'lien', title: 'Lien (URL)', type: 'string' },
          {
            name: 'isLarge',
            title: 'Grande carte (occupe 2 colonnes)',
            type: 'boolean',
            initialValue: false,
            description: 'Idéalement 1 seule grande carte par grille — placez-la en premier',
          },
        ],
        preview: {
          select: { label: 'label', isLarge: 'isLarge', image: 'image' },
          prepare: ({ label, isLarge, image }) => ({
            title: `${isLarge ? '▬▬' : '▬'} ${label || '(sans titre)'}`,
            media: image,
          }),
        },
      }],
    },
  ],
  preview: {
    select: { titre: 'titre', eyebrow: 'eyebrow' },
    prepare: ({ titre, eyebrow }) => ({
      title: `🃏 Grille WF — ${titre || eyebrow || ''}`,
    }),
  },
}

// ── Section Matériel / Mouches / Bateau (HP) ─────────────────────────────────
export const sectionMaterielHP = {
  name: 'sectionMaterielHP',
  title: 'Matériel HP',
  type: 'object',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow de section',
      type: 'string',
      description: 'Ex : "Équipement · Ressources"',
    },
    {
      name: 'titre',
      title: 'Titre de section',
      type: 'string',
      description: 'Ex : "Matériel & univers"',
    },
    {
      name: 'featuredEyebrow',
      title: 'Carte principale — eyebrow',
      type: 'string',
      description: 'Ex : "Cannes · Soies · Moulinets · Accessoires"',
    },
    {
      name: 'featuredTitre',
      title: 'Carte principale — titre',
      type: 'string',
      description: 'Ex : "Mon matériel"',
    },
    {
      name: 'featuredLien',
      title: 'Carte principale — lien',
      type: 'string',
      description: 'Ex : "/materiel-jeanbaptistevidal"',
    },
    {
      name: 'featuredImage',
      title: 'Carte principale — image de fond',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'sousLiens',
      title: 'Sous-liens matériel',
      type: 'array',
      description: 'Les liens de navigation rapide (matériel bar, truite, etc.)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Texte', type: 'string' },
            { name: 'href',  title: 'Lien (URL)',  type: 'string' },
          ],
          preview: {
            select: { label: 'label', href: 'href' },
            prepare: ({ label, href }) => ({ title: label, subtitle: href }),
          },
        },
      ],
    },
    {
      name: 'cardsSecondaires',
      title: 'Cartes secondaires (Mouches, Bateau…)',
      type: 'array',
      description: 'Ex : "Mes mouches" et "Le bateau"',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow',      type: 'string' },
            { name: 'titre',   title: 'Titre',         type: 'string' },
            { name: 'lien',    title: 'Lien (URL)',     type: 'string' },
            {
              name: 'image',
              title: 'Image de fond',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { titre: 'titre', eyebrow: 'eyebrow' },
            prepare: ({ titre, eyebrow }) => ({ title: titre, subtitle: eyebrow }),
          },
        },
      ],
    },
  ],
  preview: {
    select: { titre: 'titre', eyebrow: 'eyebrow' },
    prepare: ({ titre, eyebrow }) => ({
      title: `🎣 Matériel HP — ${titre || eyebrow || ''}`,
    }),
  },
}

// ── Export de tous les types ──────────────────────────────────────────────────
export const allSectionTypes = [
  sectionHero,
  sectionIntro,
  sectionTitre,
  sectionCards,
  sectionCards2,
  sectionCards3,
  sectionTexte,
  sectionTexteImage,
  sectionGalerie,
  sectionVideo,
  sectionStats,
  sectionCta,
  sectionBanniere,
  sectionBanniereCard,
  sectionCarrousel3Images,
  sectionProgramme,
  sectionProgrammeTexte,
  sectionProgrammeCartes,
  sectionSelection,
  sectionBilan,
  sectionDates,
  sectionChoix,
  sectionFriseChronologique,
  sectionListe,
  sectionLienBlog,
  sectionPrestationsHP,
  sectionGuideHP,
  sectionMaterielHP,
  sectionTemoignagesHP,
  sectionBonCadeauHP,
]
