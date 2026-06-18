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
  // 1. TRUITE EN RÉSERVOIR
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-de-la-truite-en-reservoir',
    seoTitleEn: 'Stillwater Trout Fly Fishing in Brittany — Jean-Baptiste Vidal',
    seoDescriptionEn: 'Fish for trout year-round, especially in autumn and winter, on Brittany\'s stillwaters with Jean-Baptiste Vidal, certified fly fishing guide.',
    pagebuilderEn: [
      {
        _key: 'hero353',
        _type: 'sectionHero',
        btnMaterielLabel: 'Stillwater gear',
        btnMaterielLien: '/materiel-mouche-reservoir',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a session',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Brittany · Jean-Baptiste Vidal',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-fb17d2af4ee025303559be636c7c153945e58f21-499x374-png',
            _type: 'reference',
          },
        },
        sousTitre: 'Dry fly, wet fly, nymph, chironomid, streamer, boobies and blobs: a technical and thrilling style of fishing, year-round.',
        texte: null,
        titre: 'Stillwater Trout Fly Fishing',
      },
      {
        _key: 'intro354',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn366',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book',
          },
        ],
        description: null,
        duree: '',
        eyebrow: 'Course · Guided session · Stillwater',
        fond: 'white',
        lignesSupp: [
          {
            _key: 'li363',
            _type: 'ligneInfo',
            label: 'Hours',
            note: '7 to 8 hours of guided fishing',
            valeur: '9:30 am to 6:00 pm',
          },
          {
            _key: 'li364',
            _type: 'ligneInfo',
            label: 'Venues',
            valeur: 'Etang Neuf / Saint Connan (22) · Parc Ar Bihan (56)',
          },
          {
            _key: 'li365',
            _type: 'ligneInfo',
            label: 'Note',
            valeur: 'Day permit not included (€15 to €23)',
          },
        ],
        niveau: 'Beginners and advanced anglers · All skill levels',
        saison: 'Year-round · Mainly October to March',
        showInfoCard: true,
        tarif: '320 € · 1 pers. / 200 € · 2 pers. / 150 € · 3 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Brittany has several enclosed stillwaters where you can fish for trout year-round, and especially in autumn and winter when first-category rivers are closed.',
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
                text: 'Two large lakes — Réservoir Saint-Michel (450 ha), classified as a major inland lake, and Lac du Drennec (210 ha) — allow rainbow trout fishing for much of the year.',
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
                text: 'The Saint Connan reservoir (Etang Neuf) in the Côtes-d\'Armor and the Parc Ar Bihan reservoir both allow lake fishing year-round and are stocked regularly.',
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
                text: 'A great way to keep fishing and improve your casting while learning new techniques. Dry fly, wet fly, nymph or tandem rigs, chironomid fishing, as well as streamers, boobies and blobs. Everything is possible.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Stillwater trout fly fishing',
      },
      {
        _key: 'progc367',
        _type: 'sectionProgrammeCartes',
        colonnes: '3',
        description: null,
        eyebrow: 'What\'s covered',
        fond: 'sand',
        intro: 'For guidance only. Contact me for more details and to personalise your course.',
        items: [
          {
            _key: 'carte368',
            _type: 'carte',
            description: 'Understanding flies and aquatic invertebrates: chironomids, sedges, daphnia, freshwater shrimp. Learning to identify the current hatch to choose the right fly.',
            titre: 'Flies and aquatic invertebrates',
          },
          {
            _key: 'carte369',
            _type: 'carte',
            description: 'Learning and improving your casting: overhead cast, roll cast, backhand, single and double haul. Stillwater fishing often requires long-distance casts — technique is everything.',
            titre: 'Casting technique',
          },
          {
            _key: 'carte370',
            _type: 'carte',
            description: 'All the so-called "stillwater" techniques according to your wishes and ability: wet fly, streamer, dry fly, nymph, chironomid fishing, boobies and blobs. Everything is possible.',
            titre: 'Stillwater fishing techniques',
          },
        ],
        texte: null,
        titre: 'Stillwater Trout Fly Fishing Course',
      },
      {
        _key: 'sel397',
        _type: 'sectionSelection',
        description: null,
        eyebrow: 'The venues',
        fond: 'white',
        intro: '',
        items: [
          {
            _key: 'si371',
            _type: 'selectionItem',
            image: {
              _type: 'image',
              alt: 'The Saint Connan reservoir — l\'Etang Neuf',
              asset: {
                _ref: 'image-057f793ce43a20cfa6199af146e9d7c5cd314e14-810x608-heif',
                _type: 'reference',
              },
            },
            infos: [
              {
                _key: 'inf385',
                _type: 'infoItem',
                label: 'Area',
                valeur: '9 hectares',
              },
              {
                _key: 'inf386',
                _type: 'infoItem',
                label: 'Pontoon / float tube access',
                valeur: 'Yes · Float tube launch fee: €2',
              },
              {
                _key: 'inf387',
                _type: 'infoItem',
                label: 'Boat hire',
                valeur: '6 boats available',
              },
              {
                _key: 'inf388',
                _type: 'infoItem',
                label: 'Included with permit',
                valeur: 'Access to the fishing lodge',
              },
              {
                _key: 'inf389',
                _type: 'infoItem',
                label: 'Fly fishing only period',
                valeur: '15 June to 15 October',
              },
              {
                _key: 'inf390',
                _type: 'infoItem',
                label: 'Day permit',
                valeur: '€23',
              },
            ],
            pills: [],
            tag: 'Côtes-d\'Armor (22)',
            texte: [
              {
                _key: 'b372',
                _type: 'block',
                children: [
                  {
                    _key: 's373',
                    _type: 'span',
                    marks: [],
                    text: 'The Saint Connan reservoir, covering 9 hectares in a wild, wooded setting at the source of the Trieux river, is a beautiful place to fish for lake trout year-round.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b374',
                _type: 'block',
                children: [
                  {
                    _key: 's375',
                    _type: 'span',
                    marks: [],
                    text: 'Regularly stocked with good-sized rainbow trout, the fishing is both technical and rewarding. I fish and guide here mainly in autumn and winter when first-category rivers are closed.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b376',
                _type: 'block',
                children: [
                  {
                    _key: 's377',
                    _type: 'span',
                    marks: [],
                    text: 'You can fish from the many purpose-built pontoons, or by float tube, or by hiring a boat (6 available).',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The Saint Connan reservoir — l\'Etang Neuf',
          },
          {
            _key: 'si378',
            _type: 'selectionItem',
            image: {
              _type: 'image',
              alt: 'The Colpo reservoir — Parc Ar Bihan',
              asset: {
                _ref: 'image-8ef8fda793df97784d8dfa3884c72daa7fc9585e-810x608-heif',
                _type: 'reference',
              },
            },
            infos: [
              {
                _key: 'inf391',
                _type: 'infoItem',
                label: 'Area',
                valeur: '1.7 hectares',
              },
              {
                _key: 'inf392',
                _type: 'infoItem',
                label: 'Opening',
                valeur: 'Created in 2018 · Year-round',
              },
              {
                _key: 'inf393',
                _type: 'infoItem',
                label: 'Float tube / boat access',
                valeur: 'Bank fishing only',
              },
              {
                _key: 'inf394',
                _type: 'infoItem',
                label: 'Highlight',
                valeur: 'Clear water · Sight fishing',
              },
              {
                _key: 'inf395',
                _type: 'infoItem',
                label: 'Department',
                valeur: 'Morbihan (56)',
              },
              {
                _key: 'inf396',
                _type: 'infoItem',
                label: 'Day permit',
                valeur: '€15',
              },
            ],
            pills: [],
            tag: 'Morbihan (56)',
            texte: [
              {
                _key: 'b379',
                _type: 'block',
                children: [
                  {
                    _key: 's380',
                    _type: 'span',
                    marks: [],
                    text: 'The Colpo reservoir at Parc Ar Bihan, created in 2018, is a small 1.7-hectare lake that offers year-round trout fishing.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b381',
                _type: 'block',
                children: [
                  {
                    _key: 's382',
                    _type: 'span',
                    marks: [],
                    text: 'Fishing is from the bank only, in clear water that allows sight fishing along the margins. Chironomid hatches are frequent and this is a technical discipline requiring long leaders and fine tippets.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b383',
                _type: 'block',
                children: [
                  {
                    _key: 's384',
                    _type: 'span',
                    marks: [],
                    text: 'Of course, all other stillwater techniques are also available: wet fly, streamer, boobies and blobs.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The Colpo reservoir — Parc Ar Bihan',
          },
        ],
        styleCorps: 'sand',
        texte: null,
        titre: 'Our stillwaters in Brittany',
      },
      {
        _key: 'cta398',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your stillwater course',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. PÊCHE DU BAR À LA MOUCHE (overview)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-du-bar-a-la-mouche',
    seoTitleEn: 'Sea Bass Fly Fishing in Brittany — Jean-Baptiste Vidal, Guide',
    seoDescriptionEn: 'Sea bass fly fishing with Jean-Baptiste Vidal, certified fly fishing guide. Introductory and advanced guided sessions for sea bass — shore fishing and boat fishing. Trophy bass sight fishing.',
    pagebuilderEn: [
      {
        _key: '89e02tjy',
        _type: 'sectionHero',
        btnMaterielLabel: 'Sea bass gear',
        btnMaterielLien: '/materiel-mouche-bar',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a session',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Sea bass fly fishing · South Brittany',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-b9856e26fe8f79aaf397e30a56f544f01e196619-1400x933-jpg',
            _type: 'reference',
          },
        },
        sousTitre: 'Since 2000 in South Brittany: sight fishing, boat fishing, estuary fishing',
        texte: null,
        titre: 'Sea Bass Fly Fishing in Brittany',
      },
      {
        _key: 'ue9v2dyk',
        _type: 'sectionIntro',
        description: null,
        eyebrow: 'Sea bass fly fishing · South Brittany',
        fond: 'white',
        format: 'Introduction · Advanced · Sight fishing · Coaching · Boat',
        lignesSupp: [
          {
            _key: '9ee43ec596ff',
            _type: 'ligneInfo',
          },
        ],
        niveau: 'All levels',
        saison: 'Mid-April to end of November',
        showInfoCard: true,
        tarif: 'À partir de 225 € / pers. · Voir tarifs par prestation',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'France has an extensive coastline, and Brittany ranks among the most sought-after regions for sea bass fly fishing, with its estuaries and rocky headlands offering exceptional opportunities.',
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
                text: 'Since arriving in Brittany in 2000, I was quickly drawn to sea bass fishing — a species I had never caught on the fly before. Stalking sea bass in the estuaries becomes an all-consuming passion, much like exotic destination fishing, but demands an intimate knowledge of the terrain and a thorough understanding of how this unique ecosystem works.',
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
                text: 'After years of exploration, I now offer guided fly fishing services on several Breton estuaries, helping you discover and improve your sea bass fly fishing — from the shore and from my Carolina Skiff.',
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
                text: 'Stealth, a stealthy approach, and precision are essential to outwit wary trophy bass in shallow water.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Sea bass fly fishing in Brittany',
      },
      {
        _key: 'y6jhl8eb',
        _type: 'sectionCards',
        cards: [
          {
            _key: '979cypma',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-4bf37dd44c76c2a6b5a91a4a0dd51c7ad7284f1e-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/initiation-peche-du-bar-a-la-mouche',
            sousTitre: 'Get started and become independent',
            titre: 'Sea bass fly fishing — Introduction',
          },
          {
            _key: 'if9l5jfg',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-bc98599b5c439ce0b92471023bfbbdf349bb5693-1400x1050-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-perfectionnement',
            sousTitre: 'Improve and target trophy fish',
            titre: 'Advanced sea bass',
          },
          {
            _key: 'g71oslyn',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-0462297e3c7755ed40b45199ca4205e4023934fc-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-a-vue-a-la-mouche',
            sousTitre: 'The holy grail of sea bass fly fishing',
            titre: 'Estuary sight fishing',
          },
          {
            _key: 'so9pceej',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-0622f5d1be95a91c082f51bcf1d0026ea74c8e32-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-mouche-bar-bateau-bretagne',
            sousTitre: 'Aboard my fly-specific Carolina Skiff',
            titre: 'Boat fishing',
          },
          {
            _key: '472c57ro',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-45e2c5fdb5bbd23ce4cd35f7d6d86ae573d2a9c3-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-a-la-mouche-coaching',
            positionPhoto: 'center 20%',
            sousTitre: 'Video analysis, technical debrief, targeted improvement',
            titre: 'Sea bass fly fishing coaching',
          },
        ],
        description: null,
        texte: null,
      },
      {
        _key: 'qw91lp3x',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your session',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. COACHING BAR
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-du-bar-a-la-mouche-coaching',
    seoTitleEn: 'Sea Bass Fly Fishing Coaching in Brittany',
    seoDescriptionEn: 'Jean-Baptiste Vidal, certified fly fishing guide, comes to your own fishing spots or boat to share his expertise and help you progress quickly in sea bass fly fishing.',
    pagebuilderEn: [
      {
        _key: 'hero256',
        _type: 'sectionHero',
        btnMaterielLabel: 'Sea bass gear',
        btnMaterielLien: '/materiel-mouche-bar',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a session',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Sea bass fly fishing · Personalised coaching · On your spots',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-45e2c5fdb5bbd23ce4cd35f7d6d86ae573d2a9c3-1400x933-jpg',
            _type: 'reference',
          },
        },
        sousTitre: 'Already fishing with lures or just starting out with the fly? I come to your spots to share my expertise and help you fish sea bass on the fly with confidence and success.',
        texte: null,
        titre: 'Sea bass fly fishing coaching — On your favourite spots or aboard your own boat',
      },
      {
        _key: 'stats257',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st258',
            _type: 'stat',
            label: 'Coaching season',
            nombre: 'Mid-April – Nov',
          },
          {
            _key: 'st259',
            _type: 'stat',
            label: 'Half-day or full day',
            nombre: '4–8 h',
          },
          {
            _key: 'st260',
            _type: 'stat',
            label: 'Beginners welcome',
            nombre: 'All levels',
          },
          {
            _key: 'st261',
            _type: 'stat',
            label: 'fly fishing experience',
            nombre: '25 ans',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro262',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn269',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book',
          },
        ],
        description: null,
        duree: '4 to 8 hours depending on tides and chosen format',
        eyebrow: 'Coaching · Sea bass fly fishing',
        fond: 'white',
        format: 'Full day · Half-day · On your spots · On your boat',
        lignesSupp: [],
        niveau: 'All levels · Fly fishing beginners welcome',
        saison: 'Mid-April to end of November',
        showInfoCard: true,
        tarif: '320 € · 1 pers. / 225 € · 2 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Already a lure angler or a fly fishing beginner looking to discover or improve your technique on the fly? I come and coach you on your favourite shore spots or aboard your own boat — where you already fish, in an environment you know.',
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
                text: 'With over 25 years of intensive fly fishing in France and abroad for many freshwater and saltwater species, I put all my expertise at your disposal to help you progress quickly in sea bass fly fishing.',
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
                text: 'Each coaching day is built around current conditions. A fully tailored experience, adapted to your level and goals, available as a full day or half-day.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'My expertise delivered directly on your fishing grounds',
      },
      {
        _key: 'prog290',
        _type: 'sectionProgramme',
        description: null,
        etapes: [
          {
            _key: 'etape270',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Coaching on your spots',
              asset: {
                _ref: 'image-d8ef4aff94dcabb87f54be97964f3f3235446be3-942x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Bespoke · Your waters · Your level · Your boat',
            texte: [
              {
                _key: 'b271',
                _type: 'block',
                children: [
                  {
                    _key: 's272',
                    _type: 'span',
                    marks: [],
                    text: 'The coaching takes place entirely in your own fishing environment: your estuaries, your coastline, your boat. I don\'t take you to my spots — I come to you, bringing my expertise directly to where you fish.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b273',
                _type: 'block',
                children: [
                  {
                    _key: 's274',
                    _type: 'span',
                    marks: [],
                    text: 'This bespoke approach lets you progress faster: we work on your real problems, your specific weaknesses, the habits you need to correct. Each coaching session is unique and built around your current objectives.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Coaching on your spots',
          },
          {
            _key: 'etape275',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Gear selection',
              asset: {
                _ref: 'image-7fa5e1fbf900fd047747f35e808605514fe0d762-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Rod · Fly line · Leader · Fluorocarbon · Flies',
            texte: [
              {
                _key: 'b276',
                _type: 'block',
                children: [
                  {
                    _key: 's277',
                    _type: 'span',
                    marks: [],
                    text: 'Knowing how to kit yourself out and choose the right gear for the technique and conditions is paramount. We go through rod weight and length, fly line type, leader and fluorocarbon together — every element of the system needs to work as a coherent whole.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b278',
                _type: 'block',
                children: [
                  {
                    _key: 's279',
                    _type: 'span',
                    marks: [],
                    text: 'Fly selection according to season, spots and conditions should never be taken lightly: it is often the deciding factor between a memorable day and a blank.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Gear selection',
          },
          {
            _key: 'etape280',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Casting instruction',
              asset: {
                _ref: 'image-c22f064dcc4766321f2a2e05b8fe3bfeee27b812-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Single haul · Double haul · Roll cast · Back handed',
            texte: [
              {
                _key: 'b281',
                _type: 'block',
                children: [
                  {
                    _key: 's282',
                    _type: 'span',
                    marks: [],
                    text: 'Sea bass fishing is demanding: it often requires casting bulky, weighted flies beyond 15 metres. Mastering the single and double haul is essential for gaining line speed and distance.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b283',
                _type: 'block',
                children: [
                  {
                    _key: 's284',
                    _type: 'span',
                    marks: [],
                    text: 'We also work on the roll cast, backhand cast, tight loop into the wind and exploiting a tailwind — techniques that let you adapt to any Breton conditions.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Casting instruction',
          },
          {
            _key: 'etape285',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Fishing strategies',
              asset: {
                _ref: 'image-9d5c07d5510744fd118b0d446e4c40499335bb27-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Preparation · Tides · Spots · Reading the water',
            texte: [
              {
                _key: 'b286',
                _type: 'block',
                children: [
                  {
                    _key: 's287',
                    _type: 'span',
                    marks: [],
                    text: 'Going fishing is one thing; going well prepared with a clear strategy is another. I teach you how to build a structured approach: choosing a spot based on the tides, reading currents, timing your session, managing your approach.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b288',
                _type: 'block',
                children: [
                  {
                    _key: 's289',
                    _type: 'span',
                    marks: [],
                    text: 'As I often tell my clients: "you always learn something on every session." It\'s the gradual build-up of experience and observation that makes a truly independent angler.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Fishing strategies',
          },
        ],
        eyebrow: 'Programme',
        fond: 'sand',
        intro: '',
        texte: null,
        titre: 'Coaching on your spots',
      },
      {
        _key: 'cards2295',
        _type: 'sectionCards2',
        cards: [
          {
            _key: 'card291',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-4bf37dd44c76c2a6b5a91a4a0dd51c7ad7284f1e-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/initiation-peche-du-bar-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'Get started and become independent',
            titre: 'Sea bass fly fishing — Introduction',
          },
          {
            _key: 'card292',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-bc98599b5c439ce0b92471023bfbbdf349bb5693-1400x1050-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-perfectionnement',
            positionPhoto: 'center center',
            sousTitre: 'Improve and target trophy fish',
            titre: 'Advanced sea bass',
          },
          {
            _key: 'card293',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-0462297e3c7755ed40b45199ca4205e4023934fc-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-a-vue-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'The holy grail of sea bass fly fishing',
            titre: 'Estuary sight fishing',
          },
          {
            _key: 'card294',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-84bd429dd425423e96bd9a28b59fc1cab1cac859-464x294-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-mouche-bar-bateau-bretagne',
            positionPhoto: 'center center',
            sousTitre: 'Aboard my fly-specific Carolina Skiff',
            titre: 'Boat fishing',
          },
        ],
        colonnes: '4',
        description: null,
        eyebrow: 'Sea bass fly fishing · South Brittany',
        fond: 'white',
        texte: null,
        titre: 'See also',
      },
      {
        _key: 'cta296',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your coaching session',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. BAR À VUE (SIGHT FISHING)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-du-bar-a-vue-a-la-mouche',
    seoTitleEn: 'Sea Bass Sight Fishing on the Fly in Brittany',
    seoDescriptionEn: 'Sea bass fly fishing with Jean-Baptiste Vidal, certified fly fishing guide. Stalking trophy bass on sight across Breton estuaries using crab and shrimp imitations in shallow water. An unforgettable experience.',
    pagebuilderEn: [
      {
        _key: 'hero162',
        _type: 'sectionHero',
        btnMaterielLabel: 'Sea bass gear',
        btnMaterielLien: '/materiel-mouche-bar',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a session',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Sight fishing · Breton estuary · Exceptional fishing',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-fb20d99e324531298c3c1cd17848114dc2b4c413-4000x3000-jpg',
            _type: 'reference',
          },
        },
        sousTitre: 'Encountering a trophy bass in a few centimetres of water, presenting a crab imitation inches from its nose — exceptional fishing reserved for experienced anglers.',
        texte: null,
        titre: 'Sea bass sight fishing in the estuary — The holy grail of sea bass fly fishing',
      },
      {
        _key: 'stats163',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st164',
            _type: 'stat',
            label: 'Season depending on conditions',
            nombre: 'Printemps – Automne',
          },
          {
            _key: 'st165',
            _type: 'stat',
            label: 'Limited availability',
            nombre: 'Places limitées',
          },
          {
            _key: 'st166',
            _type: 'stat',
            label: 'Level required',
            nombre: 'Confirmés',
          },
          {
            _key: 'st167',
            _type: 'stat',
            label: 'of intensive sea bass experience',
            nombre: '17 ans',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro168',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn176',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book',
          },
        ],
        description: null,
        duree: 'Timed around favourable tides',
        eyebrow: 'Sight fishing · Breton estuary',
        fond: 'white',
        format: 'Full day · Limited sessions · Specific weather conditions required',
        lignesSupp: [
          {
            _key: 'li175',
            _type: 'ligneInfo',
            label: 'Group',
            valeur: '1 to 2 anglers maximum',
          },
        ],
        niveau: 'Experienced anglers · Good physical condition required',
        saison: 'Spring – Autumn · Limited windows',
        showInfoCard: true,
        tarif: '320 € · 1 pers. / 225 € · 2 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Stalking sea bass on sight in the estuary quickly becomes an all-consuming passion, much like exotic destination fishing, but this type of fishing demands an intimate knowledge of the terrain and a thorough understanding of how this unique ecosystem works.',
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
                text: 'Are you an experienced angler in good physical condition, looking to try catching a trophy bass on sight? I offer a limited number of dedicated sight-fishing sessions, targeting large bass on sight in the estuary using crab and shrimp imitations, and occasionally streamers presented to visible fish.',
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
                text: 'Total stealth, a cat-like approach, millimetre-perfect presentation: a single imprecise cast and the bass vanishes. A genuine technical and physical challenge for the seasoned sporting angler.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'The most demanding, the most rewarding',
      },
      {
        _key: 'prog202',
        _type: 'sectionProgramme',
        description: null,
        etapes: [
          {
            _key: 'etape177',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Stalking trophy bass on sight',
              asset: {
                _ref: 'image-15c472df7ca26b4116ca24b2ca387ab38efb2ef7-942x596-heif',
                _type: 'reference',
              },
            },
            tag: 'Approach · Stealth · Reading the water',
            texte: [
              {
                _key: 'b178',
                _type: 'block',
                children: [
                  {
                    _key: 's179',
                    _type: 'span',
                    marks: [],
                    text: 'Sight fishing for sea bass requires very specific conditions: clear water, a slow incoming or outgoing tide, raking light. You wade for hours in shallow water, watching for the faintest flash of silver, the slightest wake left by a bass\'s back over the muddy bottom.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b180',
                _type: 'block',
                children: [
                  {
                    _key: 's181',
                    _type: 'span',
                    marks: [],
                    text: 'The approach is everything. Every step counts: a ripple on the surface, a shadow, too much wading noise — and the bass is gone in a flash. This style of fishing builds a quality of attention and presence in the natural world that is rarely achieved otherwise.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Stalking trophy bass on sight',
          },
          {
            _key: 'etape182',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Finding the right spots',
              asset: {
                _ref: 'image-dd6a49671be3c16ef65c0e0315f2a09d990b2d00-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Tides · Topography · Ground reconnaissance',
            texte: [
              {
                _key: 'b183',
                _type: 'block',
                children: [
                  {
                    _key: 's184',
                    _type: 'span',
                    marks: [],
                    text: 'Finding the right spots is a long-term undertaking — some locations only fish at precise tidal coefficients, at certain times, in specific wind and light conditions. The field knowledge built over 17 years of intensive practice is the decisive factor here.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b185',
                _type: 'block',
                children: [
                  {
                    _key: 's186',
                    _type: 'span',
                    marks: [],
                    text: 'Together we work on reading the bottom, interpreting tidal flat topography, tidal channels and the preferred hunting zones of large bass.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Finding the right spots',
          },
          {
            _key: 'etape187',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Strategy & observation',
              asset: {
                _ref: 'image-9c930011a19c5533ea70bf07ff4f340bc61dcd21-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Weather · Light · Fish behaviour',
            texte: [
              {
                _key: 'b188',
                _type: 'block',
                children: [
                  {
                    _key: 's189',
                    _type: 'span',
                    marks: [],
                    text: 'Observe before you fish. Patience and observation are the primary qualities of a sight fisherman. We read the water together: current direction, shaded areas, fish posture, direction of travel — all clues that determine positioning and presentation.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b190',
                _type: 'block',
                children: [
                  {
                    _key: 's191',
                    _type: 'span',
                    marks: [],
                    text: 'Weather conditions play a central role: overcast sky or raking sun, headwind or tailwind, water brightness at different times of day. Understanding these parameters multiplies your chances on big fish.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Strategy & observation',
          },
          {
            _key: 'etape192',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Fly choice, presentation & animation',
              asset: {
                _ref: 'image-0c146476d0bc69e596a42deafd84aaab1bfdb275-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Imitations · Crab · Shrimp · Streamer on sight',
            texte: [
              {
                _key: 'b193',
                _type: 'block',
                children: [
                  {
                    _key: 's194',
                    _type: 'span',
                    marks: [],
                    text: 'For sight fishing, crustacean imitations are king: crab, shrimp, amphipod. The choice of fly size, colour and weight is critical depending on water clarity and depth.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b195',
                _type: 'block',
                children: [
                  {
                    _key: 's196',
                    _type: 'span',
                    marks: [],
                    text: 'Animation is the art of this style of fishing: placing the fly a few centimetres in front of the bass without spooking it, letting it sink, triggering a slow escape… The take depends entirely on the quality of the presentation.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Fly choice, presentation & animation',
          },
          {
            _key: 'etape197',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Catching a trophy bass',
              asset: {
                _ref: 'image-6176b4f7de59d22a2b68f65077cbf5c2da09d601-739x555-heif',
                _type: 'reference',
              },
            },
            tag: 'Strike · Fight · Catch & Release',
            texte: [
              {
                _key: 'b198',
                _type: 'block',
                children: [
                  {
                    _key: 's199',
                    _type: 'span',
                    marks: [],
                    text: 'Watching a large bass charge the fly, strip-striking, feeling an explosion of power in inches of water — this is the moment everything else was preparation for. A 60–70 cm bass caught on sight in shallow water is worth all the fishing in the world.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b200',
                _type: 'block',
                children: [
                  {
                    _key: 's201',
                    _type: 'span',
                    marks: [],
                    text: 'Catch and release is practised in full on these sessions. The sea bass is an apex predator under increasing pressure; careful, quick and photo-documented release is an integral part of the experience.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Catching a trophy bass',
          },
        ],
        eyebrow: 'Programme',
        fond: 'sand',
        intro: '',
        texte: null,
        titre: 'Sea bass sight fishing',
      },
      {
        _key: 'vid203',
        _type: 'sectionVideo',
        description: null,
        eyebrow: 'In pictures',
        fond: 'white',
        texte: null,
        titre: 'See a day of sea bass sight fishing',
        url: 'https://www.youtube.com/watch?v=iq9lzlg3__I',
        videoPosition: 'left',
      },
      {
        _key: 'cards2208',
        _type: 'sectionCards2',
        cards: [
          {
            _key: 'card204',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-4bf37dd44c76c2a6b5a91a4a0dd51c7ad7284f1e-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/initiation-peche-du-bar-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'Get started and become independent',
            titre: 'Sea bass fly fishing — Introduction',
          },
          {
            _key: 'card205',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-bc98599b5c439ce0b92471023bfbbdf349bb5693-1400x1050-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-perfectionnement',
            positionPhoto: 'center center',
            sousTitre: 'Improve and target trophy fish',
            titre: 'Advanced sea bass',
          },
          {
            _key: 'card206',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-84bd429dd425423e96bd9a28b59fc1cab1cac859-464x294-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-mouche-bar-bateau-bretagne',
            positionPhoto: 'center center',
            sousTitre: 'Aboard my fly-specific Carolina Skiff',
            titre: 'Boat fishing',
          },
          {
            _key: 'card207',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-45e2c5fdb5bbd23ce4cd35f7d6d86ae573d2a9c3-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-a-la-mouche-coaching',
            positionPhoto: 'center center',
            sousTitre: 'Video analysis · Debrief · Targeted improvement',
            titre: 'Sea bass fly fishing coaching',
          },
        ],
        colonnes: '4',
        description: null,
        eyebrow: 'Sea bass fly fishing · South Brittany',
        fond: 'white',
        texte: null,
        titre: 'See also',
      },
      {
        _key: 'cta209',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your sight fishing session',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. PERFECTIONNEMENT BAR (ADVANCED SEA BASS)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-du-bar-perfectionnement',
    seoTitleEn: 'Advanced Sea Bass Fly Fishing in Brittany',
    seoDescriptionEn: 'Sea bass fly fishing with Jean-Baptiste Vidal, certified fly fishing guide. Advanced guided course for sea bass fly fishing. Trophy bass sight fishing. Improve your casting technique, learn more about bass behaviour and habitat, choose the right gear and flies, and land your first big bass on the fly.',
    pagebuilderEn: [
      {
        _key: 'hero120',
        _type: 'sectionHero',
        btnMaterielLabel: 'Sea bass gear',
        btnMaterielLien: '/materiel-mouche-bar',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a session',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Sea bass fly fishing · Advanced · South Brittany',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-bc98599b5c439ce0b92471023bfbbdf349bb5693-1400x1050-jpg',
            _type: 'reference',
          },
        },
        sousTitre: 'Double haul, long-distance casting, spot reading, fishing strategy — for experienced anglers who want to step up and target real trophies.',
        texte: null,
        titre: 'Advanced sea bass fly fishing — Targeting trophy fish',
      },
      {
        _key: 'stats121',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st122',
            _type: 'stat',
            label: 'Sea bass fishing season',
            nombre: 'Mai – Nov',
          },
          {
            _key: 'st123',
            _type: 'stat',
            label: 'Guided fishing day',
            nombre: '6–8 h',
          },
          {
            _key: 'st124',
            _type: 'stat',
            label: 'Anglers per session',
            nombre: '2 max',
          },
          {
            _key: 'st125',
            _type: 'stat',
            label: 'of intensive sea bass experience',
            nombre: '17 ans',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro126',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn134',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book a session',
          },
        ],
        description: null,
        duree: '6 to 8 hours depending on the tides',
        eyebrow: 'Advanced · Sea bass fly fishing',
        fond: 'white',
        format: 'Full day · Weekend · Shore or boat',
        lignesSupp: [
          {
            _key: 'li133',
            _type: 'ligneInfo',
            label: 'Group',
            valeur: 'Maximum 2 anglers',
          },
        ],
        niveau: 'Experienced anglers',
        saison: 'May to November · Starting mid-April',
        showInfoCard: true,
        tarif: '320 € · 1 pers. / 225 € · 2 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Are you already an experienced angler in freshwater and/or at sea, looking to refine your casting technique, deepen your knowledge of sea bass and target bigger fish? These advanced courses are designed for you.',
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
                text: 'With over 17 years of intensive experience in France and abroad, I pass on my expertise in the double haul, fishing strategies and hunting the biggest fish. The goal: to make you even more effective so you can focus entirely on stalking Mr Labrax.',
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
                text: 'Sea bass leave the coast in autumn to spawn and return in March. The season runs from May to the end of November. Tides, tidal coefficients, weather, wind direction, light and water colour are the key parameters to master to maximise your chances on big fish.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'For experienced anglers who want to go further',
      },
      {
        _key: 'prog155',
        _type: 'sectionProgramme',
        description: null,
        etapes: [
          {
            _key: 'etape135',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Advanced casting',
              asset: {
                _ref: 'image-c22f064dcc4766321f2a2e05b8fe3bfeee27b812-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Double haul · Roll cast · Back handed · Distance',
            texte: [
              {
                _key: 'b136',
                _type: 'block',
                children: [
                  {
                    _key: 's137',
                    _type: 'span',
                    marks: [],
                    text: 'Mastering advanced casting techniques: single and double haul to reach and exceed 15 metres, roll cast, backhand cast, exploiting headwinds and tailwinds.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b138',
                _type: 'block',
                children: [
                  {
                    _key: 's139',
                    _type: 'span',
                    marks: [],
                    text: 'The ability to tighten your loop into the wind is decisive for sea bass fishing in Breton conditions. We work on precision, consistency and economy of movement so that every cast is effective, whatever the weather.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Advanced casting',
          },
          {
            _key: 'etape140',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Gear & fly selection',
              asset: {
                _ref: 'image-8a12aac8ab6949bc108ad839609fa0e05133b0de-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Rods · Fly lines · Flies · Animation',
            texte: [
              {
                _key: 'b141',
                _type: 'block',
                children: [
                  {
                    _key: 's142',
                    _type: 'span',
                    marks: [],
                    text: 'Choosing the right gear for each spot and the conditions of the day: fly line type, leader, fluorocarbon. Fly selection (size, colour, weight) and animation are often underestimated factors that nonetheless make all the difference.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b143',
                _type: 'block',
                children: [
                  {
                    _key: 's144',
                    _type: 'span',
                    marks: [],
                    text: 'Together we analyse common mistakes in gear and fly selection, and fine-tune every setting to maximise strikes and landed fish.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Gear & fly selection',
          },
          {
            _key: 'etape145',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Fishing strategies',
              asset: {
                _ref: 'image-e044d79a1b3b77f43e7de82a44184e4056193934-794x596-heif',
                _type: 'reference',
              },
            },
            tag: 'Preparation · Spots · Tides · Progression',
            texte: [
              {
                _key: 'b146',
                _type: 'block',
                children: [
                  {
                    _key: 's147',
                    _type: 'span',
                    marks: [],
                    text: 'Sea bass fishing requires preparation. We work together on structuring an effective session: choosing the spot based on tides and wind, reading currents and holding areas, timing your approach, managing your stalk.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b148',
                _type: 'block',
                children: [
                  {
                    _key: 's149',
                    _type: 'span',
                    marks: [],
                    text: 'Gradual accumulation of experience and observation to build genuine independence: understanding why fish at a certain spot, at a certain time, in certain conditions, and knowing how to repeat your success.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Fishing strategies',
          },
          {
            _key: 'etape150',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Stalking trophy bass on sight',
              asset: {
                _ref: 'image-31a5de108af8a21e53a8ad07edac5538d8582cc0-798x528-heif',
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
                height: 0.832288299031115,
                width: 0.610716057549198,
                x: 0.6946419712254011,
                y: 0.4161441495155575,
              },
            },
            tag: 'Sight fishing · Imitations · Stealthy approach · Limited places',
            texte: [
              {
                _key: 'b151',
                _type: 'block',
                children: [
                  {
                    _key: 's152',
                    _type: 'span',
                    marks: [],
                    text: 'A specialist programme for experienced anglers in good physical condition. Stalking large bass on sight in the estuary with crustacean imitations and streamers — the most demanding and the most rewarding form of sea bass fishing.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b153',
                _type: 'block',
                children: [
                  {
                    _key: 's154',
                    _type: 'span',
                    marks: [],
                    text: 'Total stealth, reading the water, millimetre-perfect presentation: one imprecise cast and the bass is gone. A technical and physical challenge reserved for anglers who already have a solid foundation — places are deliberately limited.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Stalking trophy bass on sight',
          },
        ],
        eyebrow: 'Programme',
        fond: 'sand',
        intro: 'Each session is structured around four pillars to take the experienced angler from competence to complete mastery of sea bass fly fishing.',
        texte: null,
        titre: 'What you will work on',
      },
      {
        _key: 'cards2160',
        _type: 'sectionCards2',
        cards: [
          {
            _key: 'card156',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-4bf37dd44c76c2a6b5a91a4a0dd51c7ad7284f1e-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/initiation-peche-du-bar-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'Get started and become independent',
            titre: 'Sea bass fly fishing — Introduction',
          },
          {
            _key: 'card157',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-0462297e3c7755ed40b45199ca4205e4023934fc-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-a-vue-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'The holy grail of sea bass fly fishing',
            titre: 'Estuary sight fishing',
          },
          {
            _key: 'card158',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-84bd429dd425423e96bd9a28b59fc1cab1cac859-464x294-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-mouche-bar-bateau-bretagne',
            positionPhoto: 'center center',
            sousTitre: 'Aboard my fly-specific Carolina Skiff',
            titre: 'Boat fishing',
          },
          {
            _key: 'card159',
            _type: 'card',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-45e2c5fdb5bbd23ce4cd35f7d6d86ae573d2a9c3-1400x933-jpg',
                _type: 'reference',
              },
            },
            lien: '/peche-du-bar-a-la-mouche-coaching',
            positionPhoto: 'center center',
            sousTitre: 'Video analysis · Debrief · Targeted improvement',
            titre: 'Sea bass fly fishing coaching',
          },
        ],
        colonnes: '4',
        description: null,
        eyebrow: 'Sea bass fly fishing · South Brittany',
        fond: 'white',
        texte: null,
        titre: 'See also',
      },
      {
        _key: 'cta161',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your session',
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
console.log('Batch 3 done.')
