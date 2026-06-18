import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config()

const client = createClient({
  projectId: 'uievv97s', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const patches = [
  // ─────────────────────────────────────────────────────────────────
  // 1. master-class-peche-en-reservoir
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-master-class-peche-en-reservoir',
    seoTitleEn: 'Stillwater Fly Fishing Masterclass — Techniques Workshop · Jean-Baptiste Vidal',
    seoDescriptionEn: 'Jean-Baptiste Vidal and world champion Grégoire Juglaret lead an intensive 2-day stillwater fly fishing masterclass in Brittany. Small group, private lake, all techniques covered.',
    pagebuilderEn: [
      {
        _key: 'hero399',
        _type: 'sectionHero',
        btnMaterielLabel: 'Stillwater gear',
        btnMaterielLien: '/materiel-mouche-reservoir',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book my place',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Masterclass · Stillwater fly fishing',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-057f793ce43a20cfa6199af146e9d7c5cd314e14-810x608-heif',
            _type: 'reference',
          },
          crop: {
            _type: 'sanity.imageCrop',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          },
          hotspot: {
            _type: 'sanity.imageHotspot',
            height: 0.47634875990795195,
            width: 0.5004753446421377,
            x: 0.4938583034177313,
            y: 0.4672717974942471,
          },
        },
        sousTitre: 'with Grégoire Juglaret, 2025 World Champion, and Jean-Baptiste Vidal',
        texte: null,
        titre: 'Masterclass — Stillwater Fly Fishing Techniques',
      },
      {
        _key: 'intro400',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn412',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book my place',
          },
        ],
        description: null,
        eyebrow: 'Masterclass · Stillwater fly fishing',
        fond: 'white',
        format: '2-day workshop',
        intervenant: {
          avatar: 'GJ',
          bio: 'Our world champion will share all his secrets, explaining in detail every traditional and modern stillwater technique: washing line fishing, sinking line S5/S7 with boobies and bottom flies.',
          nom: 'Grégoire Juglaret',
          titre: '2025 Individual & Team World Champion in Fly Fishing · 2025 French Stillwater Champion',
        },
        lignesSupp: [
          {
            _key: 'li407',
            _type: 'ligneInfo',
            label: 'Dates',
            valeur: '16 & 17 Janvier 2026',
          },
          {
            _key: 'li408',
            _type: 'ligneInfo',
            label: 'Participants',
            valeur: '4 personnes par session',
          },
          {
            _key: 'li409',
            _type: 'ligneInfo',
            label: 'Level',
            valeur: 'Beginners and experienced anglers',
          },
          {
            _key: 'li410',
            _type: 'ligneInfo',
            label: 'Location',
            valeur: 'Etang Neuf / Saint Connan (22)',
          },
          {
            _key: 'li411',
            _type: 'ligneInfo',
            label: 'Included',
            valeur: 'Accommodation, full board, private lake access',
          },
        ],
        niveau: 'Beginners and experienced anglers',
        saison: 'January 2026 (16th & 17th)',
        showInfoCard: true,
        tarif: '700 € / pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'In early 2026, I am offering a Masterclass to my students to give them access to a highly technical workshop focused on stillwater fly fishing techniques.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'The idea is to combine the expertise of a world champion with my own guiding experience to deliver exceptionally technical content on still-water fishing. A workshop you cannot afford to miss — the skills you gain are extraordinary and allow you to progress far faster than on your own.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Come and benefit from the skills of two professionals during a 2-day workshop on the magnificent Étang Neuf reservoir in the Côtes d\'Armor. Private 9-hectare lake, rowing boats and pontoons, heated fishing lodge and WC.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Stillwater Fly Fishing Techniques with Grégoire Juglaret',
      },
      {
        _key: 'progt413',
        _type: 'sectionProgrammeTexte',
        colonnes: [
          {
            _key: 'col414',
            _type: 'colonne',
            items: [
              {
                _key: 'item415',
                _type: 'item',
                inclus: true,
                texte: 'Welcome of participants in the lakeside fishing lodge',
              },
              {
                _key: 'item416',
                _type: 'item',
                inclus: true,
                texte: 'Theory session on stillwater techniques with Grégoire Juglaret',
              },
              {
                _key: 'item417',
                _type: 'item',
                inclus: true,
                texte: 'Individual casting workshop on the bank',
              },
              {
                _key: 'item418',
                _type: 'item',
                inclus: true,
                texte: 'Practical fishing session on the reservoir supervised by both instructors',
              },
              {
                _key: 'item419',
                _type: 'item',
                inclus: true,
                texte: 'Evening: debrief, Q&A, Day 2 programme',
              },
              {
                _key: 'item420',
                _type: 'item',
                inclus: true,
                texte: 'Stillwater fly tying session in the evening with Grégoire',
              },
            ],
            label: 'Day 1',
            style: 'normal',
          },
          {
            _key: 'col421',
            _type: 'colonne',
            items: [
              {
                _key: 'item422',
                _type: 'item',
                inclus: true,
                texte: 'Additional theory session if needed',
              },
              {
                _key: 'item423',
                _type: 'item',
                inclus: true,
                texte: 'Casting revision',
              },
              {
                _key: 'item424',
                _type: 'item',
                inclus: true,
                texte: 'Practical fishing: each participant spends time with both instructors',
              },
              {
                _key: 'item425',
                _type: 'item',
                inclus: true,
                texte: 'Final debrief and Q&A',
              },
              {
                _key: 'item426',
                _type: 'item',
                inclus: true,
                texte: 'End of workshop and departure',
              },
            ],
            label: 'Day 2',
            style: 'normal',
          },
          {
            _key: 'col427',
            _type: 'colonne',
            items: [
              {
                _key: 'item428',
                _type: 'item',
                inclus: true,
                texte: 'Detailed explanation of stillwater gear',
              },
              {
                _key: 'item429',
                _type: 'item',
                inclus: true,
                texte: 'Individual casting improvement',
              },
              {
                _key: 'item430',
                _type: 'item',
                inclus: true,
                texte: 'Wet fly, nymph, streamer, dry fly, bung, boobies',
              },
              {
                _key: 'item431',
                _type: 'item',
                inclus: true,
                texte: 'Washing line technique',
              },
              {
                _key: 'item432',
                _type: 'item',
                inclus: true,
                texte: 'Sinking line S5/S7 with deep flies',
              },
            ],
            label: 'Techniques taught',
            style: 'normal',
          },
          {
            _key: 'col433',
            _type: 'colonne',
            items: [
              {
                _key: 'item434',
                _type: 'item',
                inclus: true,
                texte: 'Accommodation & full board',
              },
              {
                _key: 'item435',
                _type: 'item',
                inclus: true,
                texte: 'Private lake, boats and fishing lodge',
              },
              {
                _key: 'item436',
                _type: 'item',
                inclus: true,
                texte: 'Instruction by Grégoire Juglaret & JBV',
              },
              {
                _key: 'item437',
                _type: 'item',
                inclus: false,
                texte: 'Public liability insurance (required)',
              },
              {
                _key: 'item438',
                _type: 'item',
                inclus: false,
                texte: 'National fishing licence',
              },
              {
                _key: 'item439',
                _type: 'item',
                inclus: false,
                texte: 'Alcoholic beverages',
              },
            ],
            label: 'Included / Not included',
            style: 'check',
          },
        ],
        description: null,
        eyebrow: 'Programme',
        fond: 'sand',
        intro: '',
        texte: null,
        titre: 'Workshop programme',
      },
      {
        _key: 'ti440',
        _type: 'sectionTexteImage',
        description: null,
        distances: [
          '116 km de St Malo',
          '119 km de Quimper',
          '126 km de Rennes',
          '132 km de Brest',
          '233 km de Nantes',
          '475 km de Paris',
        ],
        eyebrow: 'Saint Connan - Côtes d\'Armor',
        fond: 'white',
        image: {
          _type: 'image',
          alt: 'Étang Neuf Saint-Connan — stillwater masterclass venue',
          asset: {
            _ref: 'image-38f0c24c1f8511c91b4aed45c77b36b4d408e595-774x701-avif',
            _type: 'reference',
          },
        },
        imagePosition: 'right',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'The workshop takes place at the Étang Neuf on the commune of Saint-Connan in the Côtes d\'Armor (22). A 9-hectare lake fed by two tributaries including the Trieux river, equipped with 9 purpose-built fishing pontoons.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'We have reserved 3 authentic gîtes located on the lake shore so all participants can stay together and enjoy convivial moments outside of fishing.',
              },
            ],
            style: 'normal',
          },
        ],
        texteImageUrl: null,
        titre: 'Workshop venue',
      },
      {
        _key: 'e83e0bea2454',
        _type: 'sectionTexteImage',
        description: null,
        eyebrow: 'L\'étang Neuf',
        fond: 'white',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-233dea0ccdc626b4878a8a8acd952dcbc65f2098-780x585-avif',
            _type: 'reference',
          },
        },
        imagePosition: 'left',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Our world champion will reveal all his secrets, explaining in detail every traditional and modern stillwater technique. Including:',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              { _type: 'span', marks: [], text: 'Dry fly fishing' },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              { _type: 'span', marks: [], text: 'Nymph and wet fly fishing' },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              { _type: 'span', marks: [], text: 'Bung fishing' },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              { _type: 'span', marks: [], text: 'Indicator fishing' },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              { _type: 'span', marks: [], text: 'Washing line technique' },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              { _type: 'span', marks: [], text: 'Intermediate line fishing' },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              { _type: 'span', marks: [], text: 'S3 sinking line fishing' },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              { _type: 'span', marks: [], text: 'S5/S7 sinking line with boobies and deep flies' },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'In the evening, Grégoire will also present a stillwater fly tying session during a relaxed and convivial gathering.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Workshop content',
      },
      {
        _key: '33cd49abac75',
        _type: 'sectionTexteImage',
        description: null,
        eyebrow: '3 Gîtes',
        fond: 'white',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-f74636c6f71a5bf1a70be32f1cb941c27e436f06-801x601-avif',
            _type: 'reference',
          },
        },
        imagePosition: 'right',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'We have reserved 3 authentic gîtes on the lake shore for the workshop, with a total of 14 sleeping places including 7 bedrooms. Each gîte has a kitchen, living room and bathroom.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'We will all stay together in these gîtes to enjoy convivial moments outside the theory and practice sessions.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'For groups of 6, each participant will have a private room.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'For groups of 8, 5 participants can have a private room (allocated on a first-come basis) and 3 participants will share a twin room (one with Grégoire).',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Accommodation',
      },
      {
        _key: 'ca2300bf1353',
        _type: 'sectionCarrousel3Images',
        description: null,
        fond: 'dark',
        images: [
          {
            _key: 'accb7c91302a',
            _type: 'image',
            asset: {
              _ref: 'image-f297df4b36ebb8b89d84f9b69e0645a6327bfb55-810x608-avif',
              _type: 'reference',
            },
          },
          {
            _key: '961142faab77',
            _type: 'image',
            asset: {
              _ref: 'image-7e7a74498c28320e760f062e87a1f38a5e1fec1b-737x553-avif',
              _type: 'reference',
            },
          },
          {
            _key: 'ea497f6c97b4',
            _type: 'image',
            asset: {
              _ref: 'image-38f0c24c1f8511c91b4aed45c77b36b4d408e595-774x701-avif',
              _type: 'reference',
            },
          },
        ],
        ratio: '3/2',
        texte: null,
      },
      {
        _key: 'gal447',
        _type: 'sectionGalerie',
        colonnes: '4',
        description: null,
        fond: 'dark',
        photos: [
          {
            _key: 'e81d83776af8',
            _type: 'image',
            asset: {
              _ref: 'image-057f793ce43a20cfa6199af146e9d7c5cd314e14-810x608-heif',
              _type: 'reference',
            },
          },
          {
            _key: 'a90dbba1b3a4',
            _type: 'image',
            asset: {
              _ref: 'image-b32c6a38f16bb7bdf6f226b1177138ba1388b395-810x608-avif',
              _type: 'reference',
            },
          },
          {
            _key: '00244896f777',
            _type: 'image',
            asset: {
              _ref: 'image-8ef8fda793df97784d8dfa3884c72daa7fc9585e-810x608-heif',
              _type: 'reference',
            },
          },
          {
            _key: 'f119e5c10213',
            _type: 'image',
            asset: {
              _ref: 'image-9f54e34d72258df9fe6b29a4a79af6c93dc6c128-614x461-avif',
              _type: 'reference',
            },
          },
        ],
        texte: null,
      },
      {
        _key: 'cta448',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your place',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. masterclass
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-masterclass',
    seoTitleEn: 'Fly Fishing Masterclasses — Expert-Led Workshops · Jean-Baptiste Vidal',
    seoDescriptionEn: 'Intensive fly fishing masterclasses organised by Jean-Baptiste Vidal with champion guests. Stillwater with Grégoire Juglaret, French nymphing. Small groups, rapid skill development.',
    pagebuilderEn: [
      {
        _key: 'hero-mc',
        _type: 'sectionHero',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a masterclass',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Masterclass · Season 2026',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-11348d9efed922792c9c35abea34a3bb4a30916b-998x748-avif',
            _type: 'reference',
          },
        },
        sousTitre: 'Excellence workshops with champion instructors — progress at an extraordinary pace',
        texte: null,
        titre: 'Masterclass',
      },
      {
        _key: 'intro-mc',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn-mc',
            _type: 'bouton',
            lien: '/contact',
            texte: 'View the masterclasses',
          },
        ],
        description: null,
        eyebrow: 'Masterclass · Advanced techniques',
        fond: 'white',
        format: '2 days · 6 to 8 participants maximum · Private waters',
        niveau: 'Experienced anglers · Intermediate level required',
        saison: 'Spring 2026',
        showInfoCard: true,
        tarif: '700 à 800 € / pers. selon la masterclass',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'The Masterclasses offered by Jean-Baptiste combine his professional guiding expertise with the knowledge of champions to deliver content of exceptional density.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'These small-group workshops (4 to 6 people) guarantee personalised coaching and rapid progress. Each masterclass runs over 2 consecutive days, combining theory and field practice.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Sign up to the newsletter to be the first informed of upcoming dates.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Expert-led technical workshops',
      },
      {
        _key: 'cards-mc',
        _type: 'sectionCards2',
        cards: [
          {
            _key: 'c-mc1',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-057f793ce43a20cfa6199af146e9d7c5cd314e14-810x608-heif',
                _type: 'reference',
              },
            },
            lien: '/master-class-peche-en-reservoir',
            positionPhoto: 'center center',
            sousTitre: 'with Grégoire Juglaret, 2025 World Champion',
            titre: 'Masterclass "Stillwater Fly Fishing"',
          },
          {
            _key: 'c-mc2',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-08ac153c41c35cb285d33c28b45bef14464785f9-998x748-avif',
                _type: 'reference',
              },
              crop: {
                _type: 'sanity.imageCrop',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              },
              hotspot: {
                _type: 'sanity.imageHotspot',
                height: 0.5639295868064603,
                width: 0.4607339032732717,
                x: 0.5208356992381165,
                y: 0.32993265696140417,
              },
            },
            lien: '/master-class-nymphe-au-fil',
            positionPhoto: 'center center',
            sousTitre: 'Competition technique for all',
            titre: 'Masterclass "French Nymphing"',
          },
        ],
        colonnes: '2',
        description: null,
        eyebrow: 'Our offerings',
        fond: 'sand',
        texte: null,
        titre: 'Choose your Masterclass',
      },
      {
        _key: 'cta-mc',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your Masterclass',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. peche-a-la-mouche-en-bretagne
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-a-la-mouche-en-bretagne',
    seoTitleEn: 'Freshwater Fly Fishing in Brittany with Jean-Baptiste Vidal',
    seoDescriptionEn: 'Guided fly fishing in Brittany: trout, shad, pike and migratory fish. Professional guiding and courses in Finistère and Morbihan — all levels welcome.',
    pagebuilderEn: [
      {
        _key: 'hero211',
        _type: 'sectionHero',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a guided day',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Freshwater · Rivers · South Brittany',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-5bba743225d7f5e212ce1790dccb8e558d3f960e-285x200-jpg',
            _type: 'reference',
          },
        },
        sousTitre: 'Trout, shad, salmon and pike on the finest rivers of Finistère',
        texte: null,
        titre: 'Fly Fishing in Brittany',
      },
      {
        _key: 'intro218',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn219',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Contact me',
          },
        ],
        description: null,
        eyebrow: 'Freshwater · South Brittany',
        fond: 'white',
        format: 'Full day · Half day · Tailored',
        niveau: 'All levels · Beginner to expert',
        saison: 'Year-round',
        showInfoCard: true,
        tarif: 'À partir de 150 € / pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Brittany has an exceptionally rich river network: wild brown trout rivers in Finistère, major migratory rivers (Ellé, Aulne, Scorff, Léguer, Elorn), and coastal lakes for pike...',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Fishing is possible year-round thanks to the complementarity of habitats: freshwater, estuaries and coastline. From Breton rivers to lakes and reservoirs, there is always a species and a technique suited to the season.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'With 21 years of guiding on these rivers, I take you to the best spots discreetly, for unforgettable outings whether you are a beginner or an experienced angler.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Breton rivers: an exceptional playground',
      },
      {
        _key: 'bff19b7f2fda',
        _type: 'sectionProgrammeCartes',
        btnLien: '/initiation-peche-a-la-mouche',
        btnTexte: 'Discover the beginner\'s course',
        colonnes: '3',
        description: null,
        eyebrow: 'New to fly fishing?',
        fond: 'sand',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-2b17132406235d3250ba4ed717f6f9c6a9605eaa-405x304-jpg',
            _type: 'reference',
          },
        },
        intro: 'In one day with Jean-Baptiste, learn the basics of casting, gear selection and reading the water. Beginner courses for all species in South Brittany.',
        styleMisePage: 'photo-gauche',
        texte: null,
        titre: 'Fly Fishing Beginner\'s Course',
      },
      {
        _key: 'cards220',
        _type: 'sectionCards2',
        cards: [
          {
            _key: 'c221',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-0554ae07add05fd56a72bf109bb24e155f01bf34-405x304-jpg',
                _type: 'reference',
              },
            },
            lien: '/initiation-peche-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'For beginners · All levels',
            titre: 'Fly fishing initiation',
          },
          {
            _key: 'c222',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-c4cccbe7bf0c495770a8e9f23accf0c325b4f896-452x336-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-de-la-truite-a-la-mouche-en-bretagne',
            positionPhoto: 'center center',
            sousTitre: 'Rivers · Finistère',
            titre: 'Trout fishing',
          },
          {
            _key: 'c223',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-162f045318472c092d105aa007b71644797e6b11-525x336-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-de-l-alose-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'Migratory fish · Ellé · Aulne',
            titre: 'Shad fishing',
          },
          {
            _key: 'c224',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-b72cd11d71ac81b8d461af2971075a338fc4df2b-314x124-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-brochet-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'Coastal lakes · Canal',
            titre: 'Pike fishing',
          },
          {
            _key: 'c225',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-fb17d2af4ee025303559be636c7c153945e58f21-499x374-png',
                _type: 'reference',
              },
            },
            lien: '/peche-de-la-truite-en-reservoir',
            positionPhoto: 'center center',
            sousTitre: 'Private stillwaters · Brittany',
            titre: 'Stillwater fishing',
          },
          {
            _key: 'c226',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-2c5ca4e18d655199bae62645da36e14986c3d59f-408x296-jpg',
                _type: 'reference',
              },
            },
            lien: '/stage-spey-cast-et-cours-de-lancer',
            positionPhoto: 'center center',
            sousTitre: 'Two-handed rod · Salmon',
            titre: 'Spey Casting Course',
          },
        ],
        colonnes: '2',
        description: null,
        eyebrow: 'Our species',
        fond: 'sand',
        texte: null,
        titre: 'Choose your guided day',
      },
      {
        _key: 'cta227',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your freshwater guided day',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. peche-de-l-alose-a-la-mouche
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-de-l-alose-a-la-mouche',
    seoTitleEn: 'Shad Fly Fishing in Brittany — Guided Days with Jean-Baptiste Vidal',
    seoDescriptionEn: 'Discover shad fly fishing in Brittany with Jean-Baptiste Vidal. The shad is a spectacular, powerful migratory fish — an unforgettable fly fishing experience on Breton rivers.',
    pagebuilderEn: [
      {
        _key: 'hero297',
        _type: 'sectionHero',
        btnMaterielLabel: 'Migratory fish gear',
        btnMaterielLien: '/materiel-mouche-migrateur',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a guided day',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Shad fly fishing · Aulne · Blavet · Brittany',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-b31a9d82e0314ae388e86b19e016cacf762a1349-1050x672-avif',
            _type: 'reference',
          },
        },
        sousTitre: 'A still-confidential migratory species of remarkable power and fighting spirit. On the Aulne, the Blavet and Breton rivers, Jean-Baptiste guides you to meet this fascinating predator.',
        texte: null,
        titre: 'Shad Fly Fishing in Brittany',
      },
      {
        _key: 'stats298',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st299',
            _type: 'stat',
            label: 'Aulne / Blavet season',
            nombre: 'Mi-avril – fin juin',
          },
          {
            _key: 'st300',
            _type: 'stat',
            label: 'Other rivers season',
            nombre: 'Fin mai – fin juillet',
          },
          {
            _key: 'st301',
            _type: 'stat',
            label: 'Aulne · Blavet · Ellé',
            nombre: 'Estuaires bretons',
          },
          {
            _key: 'st302',
            _type: 'stat',
            label: 'Evening session rate',
            nombre: '200 €',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro303',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn311',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Check availability',
          },
        ],
        description: null,
        duree: '',
        eyebrow: 'Guided shad fishing · South Brittany',
        fond: 'white',
        format: 'Evening session (3–4h) · Full day',
        lignesSupp: [
          {
            _key: 'li310',
            _type: 'ligneInfo',
            label: 'Rivers',
            valeur: 'Aulne · Blavet · Ellé · Elorn · Odet · Goyen · Scorf',
          },
        ],
        niveau: 'Experienced anglers · Casting proficiency required',
        saison: 'Mid-April to end of July',
        showInfoCard: true,
        tarif: '200 € coup du soir / 320 € journée Aulne / 350 € journée Blavet',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'The shad is a species that has been expanding in Breton rivers after decades of decline. This large migratory fish, related to mackerel and herring, travels up to 100 km inland from the coast to spawn in first-category rivers.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Shad fly fishing is still little known in France, but those in the know understand the incomparable thrill of landing a large shad on the fly. A fish of 1.5 to 2.5 kg, a fierce fighter and a leaper, caught during spring evenings in rising water.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'I offer guided outings on the best stretches of the Aulne and the Blavet — the two most important shad rivers in Brittany — as well as on several other coastal rivers in the region.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'A confidential and unforgettable migratory fish',
      },
      {
        _key: 'vid312',
        _type: 'sectionVideo',
        description: null,
        eyebrow: 'Shad fly fishing',
        fond: 'dark',
        texte: null,
        titre: 'Shad Fly Fishing in Brittany',
        url: 'https://vimeo.com/197506448?fl=pl&fe=vl',
        videoPosition: 'left',
      },
      {
        _key: 'prog-alose-decouverte',
        _type: 'sectionProgramme',
        description: null,
        etapes: [
          {
            _key: 'e-alose-1',
            _type: 'etape',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-4b8fec783c602ca73cd3ce5e13930dc12578b129-688x458-avif',
                _type: 'reference',
              },
            },
            tag: 'Biology · Behaviour',
            texte: [
              {
                _key: '81bbb774ccdd',
                _type: 'block',
                children: [
                  {
                    _key: '808c0d3fbfa4',
                    _type: 'span',
                    marks: [],
                    text: 'The allis shad (alosa alosa) from the Clupeidae family is the largest of the shads. It is a migratory fish that runs up Breton rivers from mid-April through to mid-June, and even mid-July on smaller rivers where the water warms more slowly.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'c4087a101984',
                _type: 'block',
                children: [
                  {
                    _key: 'bae5ed8e878d',
                    _type: 'span',
                    marks: [],
                    text: 'Shad populations in Brittany have been growing over the past decade, although this species with its complex life cycle is very sensitive and remains vulnerable.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'cee838f9f159',
                _type: 'block',
                children: [
                  {
                    _key: '17f0c778d102',
                    _type: 'span',
                    marks: [],
                    text: 'The shad is an aggressive and very powerful migratory fish that puts up a tremendous fight when you match your tackle accordingly.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '8e40bc384237',
                _type: 'block',
                children: [
                  {
                    _key: '32453b747ed7',
                    _type: 'span',
                    marks: [],
                    text: 'It is an incredibly feisty fish that does not give up easily and delivers outstanding thrills. A real treat for the all-round fly angler!',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'A formidable migratory fish',
          },
          {
            _key: 'e-alose-2',
            _type: 'etape',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-389cf8819c7e7fefdaf4449c30ba53be5454d58f-682x594-avif',
                _type: 'reference',
              },
            },
            tag: 'Technique · Flies · Presentation',
            texte: [
              {
                _key: '21c412203ef0',
                _type: 'block',
                children: [
                  {
                    _key: '9fd66c6e38b9',
                    _type: 'span',
                    marks: [],
                    text: 'Shad are typically fly fished on a downstream swing using nymph/streamer patterns, often in bright colours such as orange, yellow, chartreuse green or pink.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'c538d8f8a100',
                _type: 'block',
                children: [
                  {
                    _key: '54d6e13bcf0c',
                    _type: 'span',
                    marks: [],
                    text: 'Depending on the season, you will need to fish at different depths using intermediate to fast-sinking polyleaders.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '207b53e3d78f',
                _type: 'block',
                children: [
                  {
                    _key: 'ad321e96c785',
                    _type: 'span',
                    marks: [],
                    text: 'On the Aulne and Blavet, a 9 to 10-foot #7–8 fly rod is used at the start of the season, as well as switch rods to cover the areas quickly, while a #6 rod is recommended later in the season when water levels drop and current slows.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'ea4d8c8c3473',
                _type: 'block',
                children: [
                  {
                    _key: '46d84ef713bc',
                    _type: 'span',
                    marks: [],
                    text: 'The technique involves presenting the shad fly at the right depth and speed depending on water levels, flow rate, water temperature and fish activity.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'f50b0b9d710c',
                _type: 'block',
                children: [
                  {
                    _key: 'ec02391e3364',
                    _type: 'span',
                    marks: [],
                    text: 'You need to stay highly focused during the swing to detect takes and set the hook at the right moment. Intense fishing.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b2f0cdd46b28',
                _type: 'block',
                children: [
                  { _key: '4a53afc7244c', _type: 'span', marks: [], text: '' },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '0d735bb9e716',
                _type: 'block',
                children: [
                  {
                    _key: '2c9cf3b4546f',
                    _type: 'span',
                    marks: [],
                    text: 'On smaller rivers, fish are generally spotted by sight and presented with small orange-headed nymphs retrieved in short strips in front of the located fish.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'How to fish for shad',
          },
          {
            _key: 'e-alose-3',
            _type: 'etape',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-4dcde77899cdafdff968474bbae31ef01808fd87-684x588-avif',
                _type: 'reference',
              },
            },
            tag: 'Gear · Casting · Spey Casting',
            texte: [
              {
                _key: '02869fb1deaa',
                _type: 'block',
                children: [
                  {
                    _key: '726c22cf2b9f',
                    _type: 'span',
                    marks: [],
                    text: 'Shad fly fishing in Brittany is mainly practised on these two canalised rivers, which hold the highest concentrations of shad in Brittany.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '12366fbd2490',
                _type: 'block',
                children: [
                  {
                    _key: '04933ae8dfc0',
                    _type: 'span',
                    marks: [],
                    text: 'Each year, several thousand allis shad and twaite shad (alosa fallax) colonise these rivers.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '858987c4aa06',
                _type: 'block',
                children: [
                  {
                    _key: '087b4c1ec1d6',
                    _type: 'span',
                    marks: [],
                    text: 'Shad run upstream as the water warms, very often from mid-April through to the end of June.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'f50991456d06',
                _type: 'block',
                children: [
                  {
                    _key: '589836b3d644',
                    _type: 'span',
                    marks: [],
                    text: 'They congregate below weirs and locks that slow their migration — to the great delight of fly anglers.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '4cd4c25f1db8',
                _type: 'block',
                children: [
                  {
                    _key: 'f88356b86709',
                    _type: 'span',
                    marks: [],
                    text: 'The Aulne and the Blavet are canalised rivers where the water warms quickly, making them early-season rivers compared to other (non-canalised) rivers where shad arrive later.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The Aulne and the Blavet',
          },
          {
            _key: 'e-alose-5',
            _type: 'etape',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-1285efb3c11a191c99930f058ade2fa19cd4b5a7-684x588-avif',
                _type: 'reference',
              },
            },
            tag: 'Sight fishing · Ellé · Elorn · Odet',
            texte: [
              {
                _key: '9a1207750c2d',
                _type: 'block',
                children: [
                  {
                    _key: '7d3637fd2f4b',
                    _type: 'span',
                    marks: [],
                    text: 'In recent years, shad have also colonised smaller rivers such as the Ellé, Elorn, Goyen, Odet, Penzé, Scorf and Trieux...',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'fb66346ff632',
                _type: 'block',
                children: [
                  {
                    _key: '858e9a36a9e9',
                    _type: 'span',
                    marks: [],
                    text: 'On these clearer rivers it is possible to spot them by sight and target them with small, brightly coloured nymphs. The technique involves locating a group of fish and swinging or stripping a fly past them, adjusting the retrieve to the fish\'s behaviour.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'e6324f4e7edf',
                _type: 'block',
                children: [
                  {
                    _key: '39027c9449f5',
                    _type: 'span',
                    marks: [],
                    text: 'It is 100% sight fishing — you watch the shad come and engulf your fly, often in a very subtle way. You need to be alert and very quick to set the hook at the right moment.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'c9712222f837',
                _type: 'block',
                children: [
                  {
                    _key: '2180f58df221',
                    _type: 'span',
                    marks: [],
                    text: 'On these smaller rivers the fights are explosive and the thrills are guaranteed!',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Also on other rivers…',
          },
        ],
        eyebrow: 'Discovering the shad',
        fond: 'sand',
        texte: null,
        titre: 'What to expect',
      },
      {
        _key: 'carr-alose-galerie',
        _type: 'sectionCarrousel3Images',
        description: null,
        fond: 'dark',
        images: [
          { _key: 'carr-al-7', _type: 'image', alt: 'Shad fly fishing in Brittany', asset: { _ref: 'image-640fc9e39fa89619a41ae6bd2b6338ad136d27c7-1015x676-avif', _type: 'reference' } },
          { _key: 'carr-al-8', _type: 'image', alt: 'Shad fly fishing — Breton rivers', asset: { _ref: 'image-0de6a108792ef88540f5560aecdfc4fe3a61d8b4-927x695-avif', _type: 'reference' } },
          { _key: 'carr-al-9', _type: 'image', alt: 'Guided shad fishing — Jean-Baptiste Vidal', asset: { _ref: 'image-305cd6b1d01724e3e3f4577ba63d629c789d45b7-676x676-avif', _type: 'reference' } },
          { _key: 'carr-al-10', _type: 'image', alt: 'Shad on the Aulne in Brittany', asset: { _ref: 'image-51e1d7d8d12bbf16ce4e4aaacd761165607a8e22-926x695-avif', _type: 'reference' } },
          { _key: 'carr-al-11', _type: 'image', alt: 'Shad fishing — a powerful migratory fish', asset: { _ref: 'image-679f12ec344f157913f769c7184219b2520fcae3-1086x724-avif', _type: 'reference' } },
          { _key: 'carr-al-12', _type: 'image', alt: 'Shad and salmon — Brittany', asset: { _ref: 'image-32375a3578166a0fa12ba670d104644943dcf071-543x724-avif', _type: 'reference' } },
          { _key: 'carr-al-13', _type: 'image', alt: 'Guided shad fishing South Brittany', asset: { _ref: 'image-18d7ab3b99884eb7618896de27533c22ef5f4c94-1236x695-avif', _type: 'reference' } },
          { _key: 'carr-al-14', _type: 'image', alt: 'Shad fly fishing — Aulne', asset: { _ref: 'image-208194852b667e2d0c1e39c2827268a7588d50a4-695x695-avif', _type: 'reference' } },
          { _key: 'carr-al-15', _type: 'image', alt: 'Migratory fish fishing in Brittany', asset: { _ref: 'image-3faaed4d8c63f21f64b1afde493d01cc479bbff8-901x676-avif', _type: 'reference' } },
          { _key: 'carr-al-16', _type: 'image', alt: 'Beautiful shad caught on the fly', asset: { _ref: 'image-85165af832447695dadde0bdca723bc99e37d7f0-927x695-avif', _type: 'reference' } },
          { _key: 'carr-al-17', _type: 'image', alt: 'Shad fly fishing — Blavet', asset: { _ref: 'image-ed906acd1e6eefe28f10bc7246eb899b864e4cd5-991x743-avif', _type: 'reference' } },
          { _key: 'carr-al-18', _type: 'image', alt: 'Shad fishing on a canalised river', asset: { _ref: 'image-aa2adda86e1e88d250041b4c2549bdcfe7ca447e-1238x695-avif', _type: 'reference' } },
          { _key: 'carr-al-19', _type: 'image', alt: 'Guided shad — Breton rivers', asset: { _ref: 'image-677d14c85f06276e6a6b4314586c3ca20ef7f5ac-1014x676-avif', _type: 'reference' } },
          { _key: 'carr-al-20', _type: 'image', alt: 'Shad caught on the fly', asset: { _ref: 'image-7411ae4be598b97e66de7e6e743992b6d57dd109-965x724-avif', _type: 'reference' } },
          { _key: 'carr-al-21', _type: 'image', alt: 'Shad fly fishing', asset: { _ref: 'image-7021ee8b0cca099999ae48a986de07ada9ecc5c1-927x695-avif', _type: 'reference' } },
          { _key: 'carr-al-22', _type: 'image', alt: 'Breton rivers — shad fly fishing', asset: { _ref: 'image-529773b81384824c88a624b7fb15bdd01f724ffd-991x743-avif', _type: 'reference' } },
          { _key: 'carr-al-23', _type: 'image', alt: 'Shad in Brittany — guide JBV', asset: { _ref: 'image-3888b62868267810960a9118c93138a2e221d9cf-927x695-avif', _type: 'reference' } },
          { _key: 'carr-al-24', _type: 'image', alt: 'Migratory fish guiding South Brittany', asset: { _ref: 'image-93ba16cf49cd183ad9f76188c3811c0b93c855ba-451x676-avif', _type: 'reference' } },
          { _key: 'carr-al-25', _type: 'image', alt: 'Shad fly fishing — downstream swing technique', asset: { _ref: 'image-5f1d0e36b1e523d3e0e0be8539b486e844cf7eac-901x676-avif', _type: 'reference' } },
          { _key: 'carr-al-26', _type: 'image', alt: 'Guided shad fishing — Finistère', asset: { _ref: 'image-bf4050e30342fdab7e57114a1d04d3f597369490-981x695-avif', _type: 'reference' } },
          { _key: 'carr-al-27', _type: 'image', alt: 'Beautiful shad — Breton rivers', asset: { _ref: 'image-3d6d351a2e02e7d1eca234e022a6106fcde0befa-521x695-avif', _type: 'reference' } },
        ],
        ratio: '3/2',
        texte: null,
      },
      {
        _key: 'cta313',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your shad guided day',
      },
      {
        _key: '45433ff25417',
        _type: 'sectionLienBlog',
        description: null,
        eyebrow: 'Blog · Enjoy Fishing',
        fond: 'white',
        labelBouton: 'Read the article',
        texte: null,
        titre: 'Feature: shad fly fishing on the best Breton rivers',
        urlArticle: 'http://www.enjoyfishing.fr/archive/2016/02/08/peche-de-l-alose-a-la-mouche-sur-les-meilleures-rivieres-de-3066155.html#more',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. peche-de-la-truite-a-la-mouche-en-bretagne
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-de-la-truite-a-la-mouche-en-bretagne',
    seoTitleEn: 'Trout Fly Fishing in Brittany — Guided Days · Jean-Baptiste Vidal',
    seoDescriptionEn: 'Discover wild brown trout on the finest rivers of Brittany with certified fly fishing guide Jean-Baptiste Vidal. All levels, dry fly, nymph, streamer — Finistère & Morbihan.',
    pagebuilderEn: [
      {
        _key: 'hero314',
        _type: 'sectionHero',
        btnMaterielLabel: 'Trout gear',
        btnMaterielLien: '/materiel-mouche-truite',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a guided day',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Trout · Rivers of South Brittany · Finistère & Morbihan',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-c4cccbe7bf0c495770a8e9f23accf0c325b4f896-452x336-jpg',
            _type: 'reference',
          },
        },
        sousTitre: '100% wild fario trout on the finest rivers of Finistère and Morbihan — dry fly, nymph, wet fly, streamer since 1993',
        texte: null,
        titre: 'Trout Fly Fishing in Brittany',
      },
      {
        _key: 'intro315',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn323',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book a guided day',
          },
        ],
        description: null,
        duree: '',
        eyebrow: 'Guided trout fishing · South Brittany',
        fond: 'white',
        format: 'Full day 9:30am–6pm · 7 to 8 hours of guiding',
        lignesSupp: [
          {
            _key: 'li322',
            _type: 'ligneInfo',
            label: 'Rivers',
            valeur: 'Scorff · Ellé · Isole · Odet · Jet · Steïr · Aven',
          },
        ],
        niveau: 'All levels · Initiation and improvement',
        saison: 'Mid-March to mid-September',
        showInfoCard: true,
        tarif: '300 € · 1 pers. / 200 € · 2 pers. / 160 € · 3 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Finistère has over 4,500 km of first-category rivers, offering an enormous choice of magnificent trout rivers. Within my geographical area, I have selected 7 rivers of different sizes and profiles to vary the experience and suit every preference.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Heritage management in South Brittany guarantees 100% wild Atlantic-strain brown trout — feisty and wary. Their vivid colouring and pristine habitats make this one of the most technical and rewarding forms of fly fishing there is.',
              },
            ],
            style: 'normal',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'I have been fly fishing since 1993 in France and abroad. I offer outings tailored to all levels: beginner, intermediate and advanced. Techniques covered include dry fly, wet fly, streamer, French nymphing and sight nymphing.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Wild brown trout on the finest rivers',
      },
      {
        _key: 'progc324',
        _type: 'sectionProgrammeCartes',
        colonnes: '3',
        description: null,
        eyebrow: 'Programme',
        fond: 'sand',
        intro: 'Each outing is tailored to your level and your goals. Here is a typical day of guided trout fishing on the river.',
        items: [
          {
            _key: 'carte325',
            _type: 'carte',
            description: 'Identifying lies: currents, margins, boulders, undercut banks. Understanding where trout hold depending on the time of day and season.',
            titre: 'Reading the water',
          },
          {
            _key: 'carte326',
            _type: 'carte',
            description: 'Identification of flies and aquatic invertebrates present on the river. Choosing the right fly to match the current hatch.',
            titre: 'Entomology',
          },
          {
            _key: 'carte327',
            _type: 'carte',
            description: 'Improving your cast: overhead, roll, backhand, curve cast. Adapting to river constraints: vegetation, wind, back-lighting.',
            titre: 'Casting & technique',
          },
          {
            _key: 'carte328',
            _type: 'carte',
            description: 'Dry fly, wet fly, streamer, tandem, French nymphing — according to your wishes and level. Presentation, drift, strike and fight.',
            titre: 'Fishing by technique',
          },
          {
            _key: 'carte329',
            _type: 'carte',
            description: 'Rod, line and leader selection. Fly tying. Personalised advice for your equipment.',
            titre: 'Gear & leader set-up',
          },
          {
            _key: 'carte330',
            _type: 'carte',
            description: 'Respect for the environment, correct catch-and-release practice, heritage management. Wild trout deserve to be preserved.',
            titre: 'Ecology & catch-and-release',
          },
        ],
        texte: null,
        titre: 'A trout fishing day',
      },
      {
        _key: 'sel351',
        _type: 'sectionSelection',
        description: null,
        eyebrow: 'River selection',
        fond: 'white',
        intro: 'I have selected these rivers for their fishing potential, their beauty and the quality of their wild brown trout populations.',
        items: [
          {
            _key: 'si331',
            _type: 'selectionItem',
            image: {
              _type: 'image',
              alt: 'The Scorff',
              asset: {
                _ref: 'image-0554ae07add05fd56a72bf109bb24e155f01bf34-405x304-jpg',
                _type: 'reference',
              },
            },
            infos: [],
            pills: ['Dry fly', 'French nymphing', 'Sight nymphing'],
            tag: 'Morbihan (56)',
            texte: [
              {
                _key: 'b332',
                _type: 'block',
                children: [
                  {
                    _key: 's333',
                    _type: 'span',
                    marks: [],
                    text: 'Renowned for its salmon, the Scorff flows through a valley neighbouring the Ellé in Morbihan. Between Pont Callec and Pont-Scorff, successive stretches offer great diversity of beats populated with beautiful wild brown trout.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b334',
                _type: 'block',
                children: [
                  {
                    _key: 's335',
                    _type: 'span',
                    marks: [],
                    text: 'The average size of trout here is generally larger than on most Breton rivers. Fishing is possible on dry fly, sight nymph or French nymph. From mid-May to the end of the season, fine specimens come up to feed on the surface.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The Scorff',
          },
          {
            _key: 'si336',
            _type: 'selectionItem',
            image: {
              _type: 'image',
              alt: 'The Ellé and the Isole',
              asset: {
                _ref: 'image-9e18464323e4bfb8ec50c3bc44b5035f11b2bd59-405x304-jpg',
                _type: 'reference',
              },
            },
            infos: [],
            pills: ['Dry fly', 'Nymph', 'Streamer'],
            tag: 'Finistère (29)',
            texte: [
              {
                _key: 'b337',
                _type: 'block',
                children: [
                  {
                    _key: 's338',
                    _type: 'span',
                    marks: [],
                    text: 'The Quimperlé area offers a vast river network with several characterful rivers. The Ellé provides fine upstream stretches for trout on dry fly and nymph.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b339',
                _type: 'block',
                children: [
                  {
                    _key: 's340',
                    _type: 'span',
                    marks: [],
                    text: 'The Isole, its main tributary, is a small paradise for trout fishing in a steep, wild valley. Great diversity of landscapes and bank profiles, synonymous with varied and high-quality fishing throughout the season.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The Ellé and the Isole',
          },
          {
            _key: 'si341',
            _type: 'selectionItem',
            image: {
              _type: 'image',
              alt: 'The Quimper rivers — Odet, Jet, Steïr',
              asset: {
                _ref: 'image-2b17132406235d3250ba4ed717f6f9c6a9605eaa-405x304-jpg',
                _type: 'reference',
              },
            },
            infos: [],
            pills: ['Dry fly', 'French nymphing', 'Tandem'],
            tag: 'Finistère (29) · Quimper',
            texte: [
              {
                _key: 'b342',
                _type: 'block',
                children: [
                  {
                    _key: 's343',
                    _type: 'span',
                    marks: [],
                    text: 'Quimper means "confluence" in Breton. The Odet receives the Steïr from the west and the Jet from the east — three rivers with very different profiles, widths and lengths, offering varied fishing throughout the season.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b344',
                _type: 'block',
                children: [
                  {
                    _key: 's345',
                    _type: 'span',
                    marks: [],
                    text: 'Odet: The Stangala beat offers a very fast-flowing stretch with many boulders, ideal for dry fly in fast water and French nymphing. Jet: A small lowland river with deep pools holding good trout and sometimes salmon. Steïr: A mixed river with fine runs and lovely pools for very varied fishing.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The Quimper rivers — Odet, Jet, Steïr',
          },
          {
            _key: 'si346',
            _type: 'selectionItem',
            image: {
              _type: 'image',
              alt: 'The Aven and the Ster-Goz',
              asset: {
                _ref: 'image-35e280b8adbd7d6ad622232805a8e3825079ae67-405x304-jpg',
                _type: 'reference',
              },
            },
            infos: [],
            pills: ['Dry fly', 'Emerger', 'French nymphing'],
            tag: 'Finistère (29)',
            texte: [
              {
                _key: 'b347',
                _type: 'block',
                children: [
                  {
                    _key: 's348',
                    _type: 'span',
                    marks: [],
                    text: 'A charming little river typical of Breton valley floors, the Aven flows between Scaër and Pont-Aven. Fast-running due to its steep gradient, it offers very varied profiles with beautiful wild brown trout in every corner.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b349',
                _type: 'block',
                children: [
                  {
                    _key: 's350',
                    _type: 'span',
                    marks: [],
                    text: 'Dry fly fishing is king here from April onwards. French nymphing accounts for many trout when they are less active on the surface. The Ster-Goz, its main tributary, is very interesting for emerger and nymph fishing.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The Aven and the Ster-Goz',
          },
        ],
        styleCorps: 'white',
        texte: null,
        titre: 'The finest trout rivers of South Brittany',
      },
      {
        _key: 'cta352',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your trout guided day',
      },
    ],
  },
]

for (const p of patches) {
  console.log(`Patching ${p.id}...`)
  await client.patch(p.id).set({
    seoTitleEn: p.seoTitleEn,
    seoDescriptionEn: p.seoDescriptionEn,
    pagebuilderEn: p.pagebuilderEn,
  }).commit({ autoGenerateArrayKeys: false })
  console.log(`✓ ${p.id}`)
}
console.log('Batch 2 done.')
