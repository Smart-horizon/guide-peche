export default {
  name: 'accueil',
  title: "Page d'accueil",
  type: 'document',
  icon: () => '🏠',
  __experimental_actions: ['update', 'publish'],
  preview: {
    select: { id: '_id' },
    prepare: () => ({ title: "Page d'accueil", subtitle: 'jeanbaptistevidalguidepeche.com' }),
  },
  groups: [
    { name: 'hero',        title: '🖼️ Hero (bannière principale)', default: true },
    { name: 'guide',       title: '👤 Section Le Guide' },
    { name: 'prestations', title: '🎣 Section Stages & Guidages' },
    { name: 'bar',         title: '🌊 Section Bar à la mouche' },
    { name: 'materiel',    title: '🎿 Section Matériel & Univers' },
    { name: 'temo',        title: '⭐ Section Témoignages' },
    { name: 'cta',         title: "📞 Appel à l'action (bas de page)" },
  ],
  fields: [

    // ══ HERO ══
    {
      name: 'hero',
      title: 'Section Hero',
      type: 'object',
      group: 'hero',
      options: { collapsible: false },
      fields: [
        {
          name: 'badge',
          title: 'Badge (petit texte)',
          type: 'string',
          description: 'Ex: "21 ans de guidage" — mis à jour chaque année',
          initialValue: '21 ans de guidage',
        },
        {
          name: 'eyebrow',
          title: 'Texte au-dessus du titre',
          type: 'string',
          initialValue: "Moniteur-Guide diplômé d'État · Bretagne-Sud",
        },
        {
          name: 'titre',
          title: 'Titre principal',
          type: 'string',
          initialValue: 'Pêche à la mouche',
          validation: Rule => Rule.required(),
        },
        {
          name: 'titreItalic',
          title: 'Titre italique (2ème ligne)',
          type: 'string',
          initialValue: 'en Bretagne sauvage',
        },
        {
          name: 'texte',
          title: 'Texte de présentation',
          type: 'text',
          rows: 3,
          initialValue: "La pêche est possible toute l'année en eau douce ou en mer du fait de la complémentarité des milieux. Lacs, réservoirs, rivières, estuaires et côte — une multitude de possibilités en Bretagne-Sud.",
        },
        {
          name: 'image',
          title: 'Photo de fond du hero',
          type: 'image',
          options: { hotspot: true },
          description: 'Grande photo plein écran — idéalement en paysage, min. 1920×1080',
        },
        {
          name: 'bouton1Texte',
          title: 'Bouton 1 — texte',
          type: 'string',
          initialValue: 'Pêche du bar',
        },
        {
          name: 'bouton1Lien',
          title: 'Bouton 1 — lien',
          type: 'string',
          initialValue: '/peche-du-bar-a-la-mouche',
        },
        {
          name: 'bouton2Texte',
          title: 'Bouton 2 — texte',
          type: 'string',
          initialValue: 'Réserver une sortie',
        },
        {
          name: 'bouton2Lien',
          title: 'Bouton 2 — lien',
          type: 'string',
          initialValue: '/contact',
        },
      ],
    },

    // ══ LE GUIDE ══
    {
      name: 'guide',
      title: 'Section Le Guide',
      type: 'object',
      group: 'guide',
      options: { collapsible: false },
      fields: [
        {
          name: 'photo',
          title: 'Photo de Jean-Baptiste',
          type: 'image',
          options: { hotspot: true },
          description: 'Format portrait recommandé (3:4)',
        },
        {
          name: 'eyebrow',
          title: 'Texte au-dessus du titre',
          type: 'string',
          initialValue: 'Votre guide',
        },
        {
          name: 'nom',
          title: 'Nom affiché',
          type: 'string',
          initialValue: 'Jean-Baptiste Vidal',
        },
        {
          name: 'accroche',
          title: "Phrase d'accroche",
          type: 'string',
          initialValue: "33 ans de pêche à la mouche et d'expérience à votre service, dont 21 années de guidage en France et à l'étranger.",
        },
        {
          name: 'bio',
          title: 'Biographie',
          type: 'text',
          rows: 4,
          initialValue: "Après des études dans l'environnement et 5 ans à la Fédération de Pêche du Finistère, Jean-Baptiste a guidé 6 saisons sur le Rio Grande (Argentine) pour Nervous Waters, puis en Irlande, Russie et Bolivie. Depuis 2014, il propose ses services de Moniteur-Guide en Bretagne-Sud, tout au long de l'année.",
        },
        {
          name: 'stats',
          title: 'Statistiques clés',
          type: 'array',
          description: 'Les chiffres affichés sous la bio — glisser pour réordonner',
          of: [{
            type: 'object',
            name: 'stat',
            fields: [
              { name: 'nombre', title: 'Nombre', type: 'string' },
              { name: 'label',  title: 'Label',  type: 'string' },
            ],
            preview: { select: { title: 'nombre', subtitle: 'label' } },
          }],
          initialValue: [
            { _type: 'stat', nombre: '33 ans',    label: 'de pêche à la mouche' },
            { _type: 'stat', nombre: '21 ans',    label: 'de guidage' },
            { _type: 'stat', nombre: '6 saisons', label: 'sur le Rio Grande' },
            { _type: 'stat', nombre: '1 bateau',  label: 'Carolina Skiff' },
          ],
        },
        {
          name: 'boutonTexte',
          title: 'Bouton — texte',
          type: 'string',
          initialValue: 'Votre guide',
        },
        {
          name: 'boutonLien',
          title: 'Bouton — lien',
          type: 'string',
          initialValue: '/jean-baptiste-vidal-moniteur-guide-de-peche',
        },
      ],
    },

    // ══ PRESTATIONS ══
    {
      name: 'prestations',
      title: 'Section Stages & Guidages',
      type: 'object',
      group: 'prestations',
      options: { collapsible: false },
      fields: [
        {
          name: 'eyebrow',
          title: 'Texte au-dessus du titre',
          type: 'string',
          initialValue: 'Ce que je propose',
        },
        {
          name: 'titre',
          title: 'Titre de la section',
          type: 'string',
          initialValue: 'Stages & guidages',
          validation: Rule => Rule.required(),
        },
        {
          name: 'cards',
          title: 'Cartes de prestations',
          type: 'array',
          description: 'Les 5 cartes — glisser pour réordonner',
          of: [{
            type: 'object',
            name: 'card',
            fields: [
              { name: 'label',     title: 'Titre de la carte', type: 'string' },
              { name: 'sub',       title: 'Sous-titre',        type: 'string' },
              { name: 'href',      title: 'URL de la page',    type: 'string' },
              {
                name: 'categorie',
                title: 'Catégorie (slug)',
                type: 'string',
                description: 'Slug technique — détermine la photo issue de Sanity',
                options: {
                  list: [
                    { title: 'Eau douce',          value: 'eau-douce' },
                    { title: 'Pêche du bar',       value: 'bar' },
                    { title: 'Masterclass',        value: 'masterclass' },
                    { title: 'Spey Cast & Lancer', value: 'spey-cast' },
                    { title: 'Bon cadeau',         value: 'bon-cadeau' },
                  ],
                },
              },
            ],
            preview: { select: { title: 'label', subtitle: 'sub' } },
          }],
          initialValue: [
            { _type: 'card', label: 'Eau douce',          sub: 'Truite · Alose · Brochet',         href: '/peche-a-la-mouche-en-bretagne',      categorie: 'eau-douce'   },
            { _type: 'card', label: 'Pêche du bar',       sub: 'Pêche à vue · Bateau',             href: '/peche-du-bar-a-la-mouche',           categorie: 'bar'         },
            { _type: 'card', label: 'Masterclass',        sub: 'Réservoir · Nymphe au fil',        href: '/masterclass',                        categorie: 'masterclass'  },
            { _type: 'card', label: 'Spey Cast & Lancer', sub: 'Canne une main · Switch · Spey',   href: '/stage-spey-cast-et-cours-de-lancer', categorie: 'spey-cast'   },
            { _type: 'card', label: 'Bon cadeau',         sub: 'Offrir une sortie',                href: '/bon-cadeau-peche-mouche',            categorie: 'bon-cadeau'  },
          ],
        },
      ],
    },

    // ══ BAR PROMO ══
    {
      name: 'bar',
      title: 'Section Bar à la mouche',
      type: 'object',
      group: 'bar',
      options: { collapsible: false },
      fields: [
        {
          name: 'eyebrow',
          title: 'Texte au-dessus du titre',
          type: 'string',
          initialValue: 'Page star du site',
        },
        {
          name: 'titre',
          title: 'Titre',
          type: 'string',
          initialValue: 'Pêche du bar à la mouche',
        },
        {
          name: 'texte',
          title: 'Texte',
          type: 'text',
          rows: 3,
          initialValue: 'Bar à vue dans les estuaires bretons ou streamer en bateau sur le Carolina Skiff. Poissons trophées de 2 à 5 kg+ dans des cadres sauvages et préservés.',
        },
        {
          name: 'image',
          title: 'Photo (colonne droite)',
          type: 'image',
          options: { hotspot: true },
          description: 'Format paysage recommandé (4:3)',
        },
        {
          name: 'boutonTexte',
          title: 'Bouton — texte',
          type: 'string',
          initialValue: 'Découvrir les formules',
        },
        {
          name: 'boutonLien',
          title: 'Bouton — lien',
          type: 'string',
          initialValue: '/peche-du-bar-a-la-mouche',
        },
      ],
    },

    // ══ SECTIONS PERSONNALISÉES (gérées depuis l'onglet Disposition) ══
    {
      name: 'sectionsLibres',
      title: 'Sections personnalisées',
      type: 'array',
      hidden: true,
      of: [

        // ── 1. Texte + image (comme "Le Guide" ou "Bar")
        {
          type: 'object',
          name: 'sectionTexteImage',
          title: '📝 Texte + image',
          fields: [
            { name: 'eyebrow',      title: 'Petit texte au-dessus', type: 'string' },
            { name: 'titre',        title: 'Titre',                  type: 'string' },
            { name: 'texte',        title: 'Texte',                  type: 'text', rows: 4 },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              description: 'Format paysage ou portrait selon la disposition',
            },
            {
              name: 'disposition',
              title: 'Disposition',
              type: 'string',
              options: {
                list: [
                  { title: 'Image à droite (texte à gauche)', value: 'image-droite' },
                  { title: 'Image à gauche (texte à droite)', value: 'image-gauche' },
                ],
                layout: 'radio',
              },
              initialValue: 'image-droite',
            },
            { name: 'boutonTexte', title: 'Bouton — texte (optionnel)', type: 'string' },
            { name: 'boutonLien',  title: 'Bouton — lien (optionnel)',  type: 'string' },
            { name: 'position',    title: 'Position',                   type: 'number',  hidden: true },
            { name: 'visible',     title: 'Visible',                    type: 'boolean', hidden: true },
          ],
          initialValue: {
            eyebrow:     'Nouveauté',
            titre:       'Titre de votre section',
            texte:       'Décrivez ici votre contenu. Vous pouvez parler d\'une nouvelle offre, d\'une sortie exceptionnelle, d\'un partenariat...',
            disposition: 'image-droite',
            boutonTexte: 'En savoir plus',
            boutonLien:  '/contact',
          },
          preview: {
            select: { title: 'titre', subtitle: 'eyebrow', media: 'image' },
            prepare: ({ title, subtitle, media }) => ({ title, subtitle: subtitle ?? 'Texte + image', media }),
          },
        },

        // ── 2. Section mise en avant (fond sombre, comme "Bar")
        {
          type: 'object',
          name: 'sectionPromo',
          title: '🌟 Mise en avant (fond sombre)',
          fields: [
            { name: 'eyebrow',      title: 'Petit texte au-dessus',    type: 'string' },
            { name: 'titre',        title: 'Titre',                     type: 'string' },
            { name: 'texte',        title: 'Texte',                     type: 'text', rows: 3 },
            {
              name: 'image',
              title: 'Photo (colonne droite, optionnelle)',
              type: 'image',
              options: { hotspot: true },
            },
            { name: 'boutonTexte', title: 'Bouton — texte', type: 'string' },
            { name: 'boutonLien',  title: 'Bouton — lien',  type: 'string' },
            { name: 'position',    title: 'Position',        type: 'number',  hidden: true },
            { name: 'visible',     title: 'Visible',         type: 'boolean', hidden: true },
          ],
          initialValue: {
            eyebrow:     'À ne pas manquer',
            titre:       'Titre de la mise en avant',
            texte:       'Décrivez ici votre offre spéciale, votre événement ou votre actualité.',
            boutonTexte: 'Réserver',
            boutonLien:  '/contact',
          },
          preview: {
            select: { title: 'titre', subtitle: 'eyebrow', media: 'image' },
            prepare: ({ title, subtitle, media }) => ({ title, subtitle: subtitle ?? 'Fond sombre', media }),
          },
        },

        // ── 3. Galerie de cartes (comme "Stages" mais libre)
        {
          type: 'object',
          name: 'sectionCartes',
          title: '🃏 Galerie de cartes',
          fields: [
            { name: 'eyebrow', title: 'Petit texte au-dessus', type: 'string' },
            { name: 'titre',   title: 'Titre',                  type: 'string' },
            {
              name: 'cartes',
              title: 'Cartes',
              type: 'array',
              description: 'Ajoutez de 2 à 6 cartes — glisser pour réordonner',
              of: [{
                type: 'object',
                name: 'carte',
                fields: [
                  { name: 'label', title: 'Titre de la carte', type: 'string' },
                  { name: 'sub',   title: 'Sous-titre',         type: 'string' },
                  { name: 'href',  title: 'Lien',               type: 'string' },
                  { name: 'image', title: 'Photo de fond',      type: 'image', options: { hotspot: true } },
                ],
                preview: { select: { title: 'label', subtitle: 'sub', media: 'image' } },
              }],
              validation: R => R.min(2).max(6),
              initialValue: [
                { _type: 'carte', label: 'Nom de la sortie 1', sub: 'Sous-titre — lieu, espèce…', href: '/contact' },
                { _type: 'carte', label: 'Nom de la sortie 2', sub: 'Sous-titre — lieu, espèce…', href: '/contact' },
              ],
            },
            { name: 'position', title: 'Position', type: 'number',  hidden: true },
            { name: 'visible',  title: 'Visible',  type: 'boolean', hidden: true },
          ],
          initialValue: {
            eyebrow:  'À découvrir',
            titre:    'Titre de votre galerie',
            position: 99,
            visible:  true,
          },
          preview: {
            select: { title: 'titre', subtitle: 'eyebrow' },
            prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ?? 'Galerie de cartes' }),
          },
        },

        // ── 4. Bannière simple (texte centré + bouton)
        {
          type: 'object',
          name: 'sectionBanniere',
          title: '📢 Bannière (texte centré)',
          fields: [
            { name: 'eyebrow',      title: 'Petit texte au-dessus', type: 'string' },
            { name: 'titre',        title: 'Titre',                  type: 'string' },
            { name: 'texte',        title: 'Texte',                  type: 'text', rows: 2 },
            { name: 'boutonTexte', title: 'Bouton — texte',         type: 'string' },
            { name: 'boutonLien',  title: 'Bouton — lien',          type: 'string' },
            {
              name: 'fond',
              title: 'Couleur de fond',
              type: 'string',
              options: {
                list: [
                  { title: 'Beige (clair)',  value: 'sable' },
                  { title: 'Blanc',          value: 'blanc' },
                  { title: 'Bleu (sombre)',  value: 'ocean' },
                ],
                layout: 'radio',
              },
              initialValue: 'sable',
            },
            { name: 'position', title: 'Position', type: 'number',  hidden: true },
            { name: 'visible',  title: 'Visible',  type: 'boolean', hidden: true },
          ],
          initialValue: {
            eyebrow:     'Actualité',
            titre:       'Titre de votre annonce',
            texte:       'Un court texte d\'accroche pour inviter vos visiteurs à agir.',
            boutonTexte: 'Contactez-moi',
            boutonLien:  '/contact',
            fond:        'sable',
          },
          preview: {
            select: { title: 'titre', subtitle: 'fond' },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle: subtitle === 'ocean' ? 'Fond bleu' : subtitle === 'blanc' ? 'Fond blanc' : 'Fond beige',
            }),
          },
        },

      ],
    },

    // ══ MATÉRIEL ══
    {
      name: 'materiel',
      title: 'Section Matériel & Univers',
      type: 'object',
      group: 'materiel',
      options: { collapsible: false },
      fields: [
        {
          name: 'eyebrow',
          title: 'Texte au-dessus du titre',
          type: 'string',
          initialValue: 'Équipement · Ressources',
        },
        {
          name: 'titre',
          title: 'Titre de la section',
          type: 'string',
          initialValue: 'Matériel & univers',
        },

        // ── Carte principale (grande, pleine largeur)
        {
          name: 'featuredImage',
          title: 'Carte principale — photo de fond',
          type: 'image',
          options: { hotspot: true },
          description: 'Grande carte pleine largeur — format paysage',
        },
        {
          name: 'featuredEyebrow',
          title: 'Carte principale — sous-titre',
          type: 'string',
          initialValue: 'Cannes · Soies · Moulinets · Accessoires',
        },
        {
          name: 'featuredTitre',
          title: 'Carte principale — titre',
          type: 'string',
          initialValue: 'Mon matériel',
        },
        {
          name: 'featuredLien',
          title: 'Carte principale — lien "Voir tout"',
          type: 'string',
          initialValue: '/materiel-jeanbaptistevidal',
        },
        {
          name: 'sousLiens',
          title: 'Sous-liens de navigation (6 liens)',
          type: 'array',
          description: 'Les liens dans la colonne droite de la carte principale — glisser pour réordonner',
          of: [{
            type: 'object',
            name: 'sousLien',
            fields: [
              { name: 'label', title: 'Libellé', type: 'string' },
              { name: 'href',  title: 'URL',     type: 'string' },
            ],
            preview: { select: { title: 'label', subtitle: 'href' } },
          }],
          initialValue: [
            { _type: 'sousLien', label: 'Matériel migrateurs', href: '/materiel-mouche-migrateur' },
            { _type: 'sousLien', label: 'Matériel truite',     href: '/materiel-mouche-truite' },
            { _type: 'sousLien', label: 'Matériel bar',        href: '/materiel-mouche-bar' },
            { _type: 'sousLien', label: 'Matériel réservoir',  href: '/materiel-mouche-reservoir' },
            { _type: 'sousLien', label: 'Matériel brochet',    href: '/materiel-mouche-brochet' },
            { _type: 'sousLien', label: 'Matériel exotique',   href: '/materiel-mouche-peche-exotique' },
          ],
        },

        // ── Cartes secondaires (2 petites cartes en bas)
        {
          name: 'cardsSecondaires',
          title: 'Cartes secondaires (2 cartes du bas)',
          type: 'array',
          description: '"Mes mouches" et "Le bateau" — glisser pour réordonner',
          of: [{
            type: 'object',
            name: 'cardMat',
            fields: [
              { name: 'eyebrow', title: 'Sous-titre',   type: 'string' },
              { name: 'titre',   title: 'Titre',         type: 'string' },
              { name: 'lien',    title: 'URL',           type: 'string' },
              {
                name: 'image',
                title: 'Photo de fond',
                type: 'image',
                options: { hotspot: true },
              },
            ],
            preview: { select: { title: 'titre', subtitle: 'eyebrow' } },
          }],
          initialValue: [
            {
              _type: 'cardMat',
              eyebrow: 'Streamers · Nymphes · Sèches',
              titre:   'Mes mouches',
              lien:    '/mouches-de-peche-jeanbaptiste-vidal',
            },
            {
              _type: 'cardMat',
              eyebrow: 'Carolina Skiff · Fond plat',
              titre:   'Le bateau',
              lien:    '/bateau-bar-a-la-mouche',
            },
          ],
        },
      ],
    },

    // ══ TÉMOIGNAGES ══
    {
      name: 'temo',
      title: 'Section Témoignages',
      type: 'object',
      group: 'temo',
      options: { collapsible: false },
      fields: [
        {
          name: 'eyebrow',
          title: 'Texte au-dessus',
          type: 'string',
          initialValue: "Ce qu'ils disent",
        },
        {
          name: 'score',
          title: 'Note globale (ex: 5.0)',
          type: 'string',
          initialValue: '5.0',
        },
        {
          name: 'nombre',
          title: 'Nombre affiché (ex: 26 témoignages)',
          type: 'string',
          initialValue: '26 témoignages',
        },
        {
          name: 'pitch',
          title: 'Texte de confiance',
          type: 'string',
          initialValue: 'Des pêcheurs de toute la France font confiance à Jean-Baptiste depuis 2004.',
        },
        {
          name: 'ctaTexte',
          title: 'Bouton — texte',
          type: 'string',
          initialValue: 'Lire tous les témoignages',
        },
        {
          name: 'ctaLien',
          title: 'Bouton — lien',
          type: 'string',
          initialValue: '/temoignages',
        },
      ],
    },

    // ══ CTA FINALE ══
    {
      name: 'cta',
      title: 'CTA Bas de page',
      type: 'object',
      group: 'cta',
      options: { collapsible: false },
      fields: [
        {
          name: 'titre',
          title: 'Titre',
          type: 'string',
          initialValue: 'Prêt pour votre première sortie ?',
        },
        {
          name: 'texte',
          title: 'Texte',
          type: 'text',
          rows: 2,
          initialValue: 'Contactez Jean-Baptiste pour construire votre programme selon votre niveau, vos espèces cibles et vos disponibilités.',
        },
        {
          name: 'telephone',
          title: 'Numéro de téléphone',
          type: 'string',
          initialValue: '06 87 30 34 56',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          initialValue: 'enjoy.fishing@hotmail.fr',
        },
        {
          name: 'btn1Texte',
          title: 'Bouton 1 — texte',
          type: 'string',
          initialValue: 'Me contacter',
        },
        {
          name: 'btn1Lien',
          title: 'Bouton 1 — lien',
          type: 'string',
          initialValue: '/contact',
        },
        {
          name: 'btn2Texte',
          title: 'Bouton 2 — texte',
          type: 'string',
          initialValue: 'Voir les disponibilités 2026',
        },
        {
          name: 'btn2Lien',
          title: 'Bouton 2 — lien',
          type: 'string',
          initialValue: '/disponibilites-guidages',
        },
      ],
    },
  ],
}
