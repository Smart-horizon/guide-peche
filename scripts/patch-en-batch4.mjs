import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config()

const client = createClient({
  projectId: 'uievv97s', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const patches = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. peche-du-brochet-a-la-mouche
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-du-brochet-a-la-mouche',
    seoTitleEn: 'Fly Fishing for Pike in Brittany — Jean-Baptiste Vidal',
    seoDescriptionEn:
      'Fly fishing for pike in Brittany on lakes and ponds (Lake Saint-Michel, coastal ponds, Finistère). Shore or boat fishing aboard my fully equipped Carolina Skiff.',
    pagebuilderEn: [
      {
        _key: 'hero40',
        _type: 'sectionHero',
        btnMaterielLabel: 'Pike gear',
        btnMaterielLien: '/materiel-mouche-brochet',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a trip',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Pike · Lake · Ponds · Brittany',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-766a95dd101d1c57fe729d06c1844b7d41196b4e-960x666-avif',
            _type: 'reference',
          },
        },
        sousTitre:
          "The freshwater predator with the most explosive strikes in our Breton waters. By boat on Lake Saint-Michel and the Finistère ponds, Jean-Baptiste guides you to meet the esox lucius.",
        texte: null,
        titre: 'Fly Fishing for Pike in Brittany',
      },
      {
        _key: 'stats41',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st42',
            _type: 'stat',
            label: 'Season',
            nombre: 'May – Dec.',
          },
          {
            _key: 'st43',
            _type: 'stat',
            label: 'Carolina Skiff since 2018',
            nombre: 'By boat',
          },
          {
            _key: 'st44',
            _type: 'stat',
            label: 'Big pike spot',
            nombre: 'Lac St-Michel',
          },
          {
            _key: 'st45',
            _type: 'stat',
            label: 'Beginners & experienced anglers',
            nombre: 'All levels',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro46',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn55',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Check availability',
          },
        ],
        description: null,
        eyebrow: 'Pike guiding · Southern Brittany',
        fond: 'white',
        format: 'Full day by boat',
        lignesSupp: [
          {
            _key: 'li53',
            _type: 'ligneInfo',
            label: 'Spots',
            valeur: 'Lac Saint-Michel · Coastal ponds · Nantes-Brest Canal',
          },
          {
            _key: 'li54',
            _type: 'ligneInfo',
            label: 'Boat',
            valeur: 'Carolina Skiff JV 15, max 2 anglers',
          },
        ],
        niveau: 'All levels',
        saison: 'May → December (spring + autumn)',
        showInfoCard: true,
        tarif: '300 € · 1 pers. / 200 € · 2 pers. (shore) · 320 € · 1 pers. (boat)',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Pike is the most aggressive and surprising freshwater predator in our continental waters. With its lightning-fast, explosive strikes, it thrills anglers — especially during the warm season, the most rewarding time to hunt this utterly fascinating predator.',
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
                text: 'While Brittany is often associated with salmonid fishing, pike are well represented across various spots in the region. Whether in large lakes, ponds, or along the Nantes-to-Brest Canal, beautiful specimens can be caught and fishing can be diversified throughout the season.',
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
                text: 'I offer to guide you through learning fly fishing for pike: casting optimisation, strategies, fly selection, retrieves and presentations tailored to our valiant esox lucius.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'An extraordinary predator',
      },
      {
        _key: 'prog81',
        _type: 'sectionProgramme',
        description: null,
        etapes: [
          {
            _key: 'etape56',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'An explosive predator',
              asset: {
                _ref: 'image-57200dee55b590a4902ca79d1c70c8b472995ed8-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Thrills · Strikes · Seasons',
            texte: [
              {
                _key: '941d5a45ae89',
                _type: 'block',
                children: [
                  {
                    _key: '4f38ed4bf61c',
                    _type: 'span',
                    marks: [],
                    text: "What I seek in pike fishing is intense emotion — lightning strikes, sometimes visual especially in spring — that trigger a serious adrenaline rush! Pike is indeed one of the rare predators in our waters that can be fished aggressively using surface flies or large colourful flies, much like tropical species such as dorado, peacock bass, or GT.",
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '02ab8eab5c1b',
                _type: 'block',
                children: [
                  {
                    _key: '4f38ed4bf61c',
                    _type: 'span',
                    marks: [],
                    text: 'Dynamic bank fishing in the weed beds, under overhanging branches, along vegetation in late spring and summer triggers explosive and surprising strikes. An absolute delight! That is precisely what keeps me coming back regularly to the water in search of a beautiful pike taken on a lovely home-tied fly!',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'a475b42995ee',
                _type: 'block',
                children: [
                  {
                    _key: 'eafbd24752b4',
                    _type: 'span',
                    marks: [],
                    text: 'Autumn and early winter fishing is also interesting, when you stalk the larger specimens that are feeding as heavily as possible before winter and spawning season.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'An explosive predator',
          },
          {
            _key: 'etape61',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'How to fish for pike',
              asset: {
                _ref: 'image-313f61e68ad1a7b4a30ee9fdd5b06aad27d66fe8-798x598-heif',
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
                height: 0.989090599164749,
                width: 0.3807112488090663,
                x: 0.8096443755954669,
                y: 0.5054547004176255,
              },
            },
            tag: 'Technique · Flies · Strategies',
            texte: [
              {
                _key: '1b0947b82b0d',
                _type: 'block',
                children: [
                  {
                    _key: 'dec0bbe219aa',
                    _type: 'span',
                    marks: [],
                    text: 'Depending on the season, pike move from spot to spot following their prey — mainly shoals of baitfish — though they are opportunists and will also take frogs, ducklings and other small animals.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '479e7ec9fa18',
                _type: 'block',
                children: [
                  {
                    _key: '4647abdbafc2',
                    _type: 'span',
                    marks: [],
                    text: 'For me, late spring and early summer are the most rewarding periods, along with the end of autumn.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '98cfc197c7e6',
                _type: 'block',
                children: [
                  {
                    _key: '60013af3344c',
                    _type: 'span',
                    marks: [],
                    text: 'After spawning, from mid-May to mid-June, fish are very aggressive and actively feeding. Fishing is often along the banks, as pike follow cyprinids such as bream and roach during their spawning period, or perch shoals. Strikes are generally more decisive and surface fishing can begin — with its guaranteed share of thrills!',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '3a18366f129b',
                _type: 'block',
                children: [
                  {
                    _key: '04de8d437b26',
                    _type: 'span',
                    marks: [],
                    text: 'Bank fishing and defined holding spots remain my favourite approach, even though beautiful fish can be found on more typical features (drop-offs, shallow bars, obstacles), sometimes away from the bank.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '38d63f21aac5',
                _type: 'block',
                children: [
                  {
                    _key: '8756407a19d7',
                    _type: 'span',
                    marks: [],
                    text: 'Autumn and early winter also hold great surprises as temperatures drop and pike feed regularly to build up reserves before spawning. This is often a productive period for landing a big pike — and also the last worthwhile outings of the year for the versatile fly angler.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'How to fish for pike',
          },
          {
            _key: 'etape66',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'The boat',
              asset: {
                _ref: 'image-6d401b1e98b7c9a2de838f203916ae812945fbe7-798x598-heif',
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
                height: 1,
                width: 0.5053865419531156,
                x: 0.44481585385427325,
                y: 0.5,
              },
            },
            tag: 'Carolina Skiff · Fly fishing boat',
            texte: [
              {
                _key: '628216930172',
                _type: 'block',
                children: [
                  {
                    _key: '4688e850a645',
                    _type: 'span',
                    marks: [],
                    text: 'After many years of guiding from a boat abroad, since 2018 I have equipped myself with a new tool to carry out my guided sessions both at sea and in fresh water — a Carolina Skiff JV 15.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '62985a0eaf53',
                _type: 'block',
                children: [
                  {
                    _key: '4ff1a93c03d0',
                    _type: 'span',
                    marks: [],
                    text: 'This "skiff" or "flat boat" — a flat-bottomed, fly-fishing-dedicated boat with a shallow draft — lets us explore lakes, estuaries and coastal waters, ideal for fly fishing, with the ability to move through very shallow water.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b5100c024b50',
                _type: 'block',
                children: [
                  {
                    _key: 'f5f712819e04',
                    _type: 'span',
                    marks: [],
                    text: '​',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '1b3b4abf46ad',
                _type: 'block',
                children: [
                  {
                    _key: '3e40900d8db1',
                    _type: 'span',
                    marks: [],
                    text: 'With two large casting platforms — one fore and one aft — I can take two anglers on board.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'c0f13c5d1f03',
                _type: 'block',
                children: [
                  {
                    _key: 'c6a1afbdb2f8',
                    _type: 'span',
                    marks: [],
                    text: 'Powered by a Yamaha 40 hp outboard, it allows quick travel between fishing spots.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '37299b5a2d9f',
                _type: 'block',
                children: [
                  {
                    _key: 'b950b2218348',
                    _type: 'span',
                    marks: [],
                    text: 'Fitted with a bow-mounted electric motor, it is possible to make beautiful drifts and approach spots quietly and efficiently.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '71a560473ebd',
                _type: 'block',
                children: [
                  {
                    _key: '99a4724d98bf',
                    _type: 'span',
                    marks: [],
                    text: '​',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'fe654a318367',
                _type: 'block',
                children: [
                  {
                    _key: 'f16007c87ba9',
                    _type: 'span',
                    marks: [],
                    text: 'Very practical for prospecting Breton lakes and ponds where navigation is permitted, fishing is very enjoyable thanks to dual propulsion and the ability to move through very shallow water in complete silence.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The boat',
          },
          {
            _key: 'etape71',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'The ponds',
              asset: {
                _ref: 'image-286d6dde00250441df9e29f2eca7b79f70cfd3d9-798x598-heif',
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
                height: 0.803630784965482,
                width: 0.4869918265712065,
                x: 0.24349591328560324,
                y: 0.5954572573084463,
              },
            },
            tag: 'Lac Saint-Michel · Breton ponds',
            texte: [
              {
                _key: 'c404aa3e5666',
                _type: 'block',
                children: [
                  {
                    _key: 'ac49aa60ab45',
                    _type: 'span',
                    marks: [],
                    text: "Lake Saint-Michel — also known as the Brennilis reservoir — in the Monts d'Arrée covers 450 hectares and is one of the largest lakes in Brittany. Classified as a Grand Lac Intérieur (Major Inland Lake), its regulations and management have been adapted to balance both pike and trout populations. Pike reproduce naturally and can grow to impressive sizes. Every year fish exceeding one metre are caught, with record pike reaching over 1.30 m!",
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '8b03b9d75480',
                _type: 'block',
                children: [
                  {
                    _key: 'e41bab8e4d9d',
                    _type: 'span',
                    marks: [],
                    text: 'Rainbow trout come from the Favot fish farm, which belongs to the Finistère Fishing Federation and stocks the lake throughout the season with fish ranging from 40 to over 70 cm.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'e2900482e82d',
                _type: 'block',
                children: [
                  {
                    _key: 'e0c9124b6821',
                    _type: 'span',
                    marks: [],
                    text: 'The lake lends itself very well to fly fishing thanks to its many bays and shallow depths (1.50 m on average). In an Irish-style landscape, fishing can be done from the bank but more often by boat or float tube in order to explore the various sectors, holding spots and depths this magnificent lake has to offer!',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Lac St Michel — A big pike hotspot',
          },
          {
            _key: 'etape76',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'The Nantes-Brest Canal',
              asset: {
                _ref: 'image-dc8230ce7aea1a7df682f282c9a5cc1a88f7729a-794x596-heif',
                _type: 'reference',
              },
            },
            tag: 'Canal · Perch · Zander',
            texte: [
              {
                _key: 'f117dc67f096',
                _type: 'block',
                children: [
                  {
                    _key: '33ea490f2a41',
                    _type: 'span',
                    marks: [],
                    text: 'Brittany has many ponds stocked with pike and perch, sometimes zander, as well as carp and other cyprinids.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '10b4bc798547',
                _type: 'block',
                children: [
                  {
                    _key: 'bfb49bffb169',
                    _type: 'span',
                    marks: [],
                    text: 'Some lend themselves better than others to fly fishing for pike.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '9d9803926fdd',
                _type: 'block',
                children: [
                  {
                    _key: '6f0825ad60e5',
                    _type: 'span',
                    marks: [],
                    text: 'Using my Carolina Skiff, I can guide you on certain lakes and ponds in ideal conditions. I know many highly productive areas for targeting this predator, which is sometimes overlooked by fly anglers.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '862ae4725ae4',
                _type: 'block',
                children: [
                  {
                    _key: '105a956a40c8',
                    _type: 'span',
                    marks: [],
                    text: '​',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '1c8b7dc7a503',
                _type: 'block',
                children: [
                  {
                    _key: '1e559ce1b0db',
                    _type: 'span',
                    marks: [],
                    text: 'The Nantes-to-Brest Canal also offers a multitude of sections and the possibility of targeting various predatory fish in addition to pike (zander and perch).',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '27bd283da784',
                _type: 'block',
                children: [
                  {
                    _key: 'dc0a1bafe5d1',
                    _type: 'span',
                    marks: [],
                    text: 'Depending on the season and conditions, I will take you to discover or improve your skills in searching for this extraordinary predator from the bank and by float tube.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The ponds — The Nantes-to-Brest Canal',
          },
        ],
        eyebrow: 'Programme',
        fond: 'sand',
        intro: '',
        texte: null,
        titre: 'Fly fishing for pike',
      },
      {
        _key: 'cta82',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your pike trip',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. peche-mouche-bar-bateau-bretagne
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'prestation-peche-mouche-bar-bateau-bretagne',
    seoTitleEn: 'Fly Fishing for Sea Bass by Boat in Brittany — Jean-Baptiste Vidal',
    seoDescriptionEn:
      'Come fly fish for sea bass aboard a boat designed for fly fishing — my fully equipped Carolina Skiff. Catch beautiful sea bass at beginner or intermediate level. Jean-Baptiste Vidal, certified professional fly fishing guide.',
    pagebuilderEn: [
      {
        _key: 'hero210',
        _type: 'sectionHero',
        btnMaterielLabel: 'Sea bass gear',
        btnMaterielLien: '/materiel-mouche-bar',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a trip',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Sea bass fly fishing · By boat · Southern Brittany',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-1c721a59aacaad5980d44adb9a08df47150e3603-1264x740-jpg',
            _type: 'reference',
          },
        },
        sousTitre:
          'Estuaries and the Breton coastline: access the best sea bass spots — invisible from shore — aboard a flat boat built for fly fishing.',
        texte: null,
        titre: 'Sea bass fly fishing by boat — Aboard my fly-dedicated Carolina Skiff',
      },
      {
        _key: 'stats211',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st212',
            _type: 'stat',
            label: 'Fishing season',
            nombre: 'May – Nov',
          },
          {
            _key: 'st213',
            _type: 'stat',
            label: 'Guided day',
            nombre: '6–8 h',
          },
          {
            _key: 'st214',
            _type: 'stat',
            label: 'Anglers per trip',
            nombre: '2 max',
          },
          {
            _key: 'st215',
            _type: 'stat',
            label: 'Individual rate / day',
            nombre: '320 €',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro216',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn226',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book',
          },
        ],
        description: null,
        duree: '',
        eyebrow: 'Sea bass fly fishing · By boat',
        fond: 'white',
        format: 'Full day · 6 to 8 h depending on tides · 1 or 2 anglers',
        lignesSupp: [
          {
            _key: 'li223',
            _type: 'ligneInfo',
            label: 'Boat',
            valeur: 'Carolina Skiff JV15 · Flat bottom · Shallow draft',
          },
          {
            _key: 'li224',
            _type: 'ligneInfo',
            label: 'Motors',
            valeur: 'Suzuki 40 hp 4-stroke · Minn Kota Powerdrive 70 lbs · Lithium battery',
          },
          {
            _key: 'li225',
            _type: 'ligneInfo',
            label: 'Equipment',
            valeur: 'Humminbird fish finder · Fly rod holders · 2 casting platforms',
          },
        ],
        niveau: 'Experienced anglers · Double haul required',
        saison: 'May to November · Dates chosen for best tides',
        showInfoCard: true,
        tarif: '350 € · 1 pers. / 250 € · 2 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: "After many years of guiding from a boat abroad, since 2018 I have equipped myself with a Carolina Skiff JV15 — a flat-bottomed \"flat boat\" with a shallow draft, specially designed for fly fishing in estuaries and at sea.",
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
                text: 'Sea bass fishing by boat is complementary to shore fishing: it opens up many areas unreachable from the bank, allows quick moves between spots, and lets us approach sea bass stealthily thanks to a bow-mounted electric motor.',
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
                text: 'I take you to several estuaries in my geographical area (Southern Brittany), chosen according to the season, tidal flow, tidal coefficient and fishing conditions.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'A tool built for estuary fly fishing',
      },
      {
        _key: 'vid227',
        _type: 'sectionVideo',
        description: null,
        eyebrow: 'In pictures',
        fond: 'dark',
        texte: null,
        titre: 'A day of sea bass fishing by boat',
        url: 'https://www.youtube.com/watch?v=Qnwlz4MA5q0',
        videoPosition: 'left',
      },
      {
        _key: 'prog248',
        _type: 'sectionProgramme',
        description: null,
        etapes: [
          {
            _key: 'etape228',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'The Carolina Skiff JV15, a flat boat built for fly fishing',
              asset: {
                _ref: 'image-5033a63022be6ccc5060783cb4d562f4aabdaaea-928x588-heif',
                _type: 'reference',
              },
            },
            tag: 'Flat bottom · Suzuki 40 hp · Minn Kota 70 lbs · Humminbird fish finder',
            texte: [
              {
                _key: 'b229',
                _type: 'block',
                children: [
                  {
                    _key: 's230',
                    _type: 'span',
                    marks: [],
                    text: 'The Carolina Skiff JV15 is an American flat-bottomed skiff designed to navigate in very shallow water. Powered by a quiet, fuel-efficient Suzuki 40 hp 4-stroke engine, it enables rapid travel between spots. At the bow, a Minn Kota Powerdrive 70 lbs electric motor powered by a lithium battery handles drifts and silent approaches.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b231',
                _type: 'block',
                children: [
                  {
                    _key: 's232',
                    _type: 'span',
                    marks: [],
                    text: 'Two large fore and aft casting platforms comfortably accommodate two anglers. The boat is equipped with fly rod holders and fly-specific storage, plus a Humminbird fish finder providing real-time water depth, temperature, and fish presence under the hull.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'The Carolina Skiff JV15, a flat boat built for fly fishing',
          },
          {
            _key: 'etape233',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Streamers & surface flies',
              asset: {
                _ref: 'image-0bf305ebc6154ba1ed740755d2fd94f43a8ffaa7-1044x695-heif',
                _type: 'reference',
              },
            },
            tag: 'Streamer · Gurgler · Popper · Intermediate & sinking fly line',
            texte: [
              {
                _key: 'b234',
                _type: 'block',
                children: [
                  {
                    _key: 's235',
                    _type: 'span',
                    marks: [],
                    text: 'From the boat we fish mainly with streamers on intermediate and sinking lines — the most productive technique for prospecting sea bass holding spots at depth, whether drifting or anchored.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b236',
                _type: 'block',
                children: [
                  {
                    _key: 's237',
                    _type: 'span',
                    marks: [],
                    text: 'But it is surface fly fishing (gurgler, popper, slider) that delivers the most spectacular action: watching a sea bass explode on a surface fly from a stable boat is an unforgettable experience. We adapt our technique to the conditions of the moment.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Streamers & surface flies',
          },
          {
            _key: 'etape238',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Prospecting the spots',
              asset: {
                _ref: 'image-0d95213cc6bd33f48ca4441521a9c42c81b0a3bb-1044x695-heif',
                _type: 'reference',
              },
            },
            tag: 'Estuaries · Coastline · Drift · Reading the water',
            texte: [
              {
                _key: 'b239',
                _type: 'block',
                children: [
                  {
                    _key: 's240',
                    _type: 'span',
                    marks: [],
                    text: 'The boat multiplies our prospecting options: drifting on a tidal current, anchored in front of a rocky headland, or creeping slowly across a mud flat. We reach configurations impossible from the bank — islands, passes, channels, submerged weed beds.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b241',
                _type: 'block',
                children: [
                  {
                    _key: 's242',
                    _type: 'span',
                    marks: [],
                    text: 'I take you to my best spots according to the day\'s tide, wind and season. A schedule of the best tides can be shared in advance to help you choose the optimal date for your trip.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Prospecting the spots',
          },
          {
            _key: 'etape243',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Technical & exciting fishing',
              asset: {
                _ref: 'image-b27d0164d03dbe379588f887c87fea3f54239d25-1365x695-heif',
                _type: 'reference',
              },
            },
            tag: 'Double haul · Experienced anglers · Sea bass 50 cm+',
            texte: [
              {
                _key: 'b244',
                _type: 'block',
                children: [
                  {
                    _key: 's245',
                    _type: 'span',
                    marks: [],
                    text: 'Boat fishing is exciting but demanding: it requires solid casting skills — especially the double haul — and good balance on board. This is not a beginner fishery, though I can also help you take your first steps in sea bass fishing.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b246',
                _type: 'block',
                children: [
                  {
                    _key: 's247',
                    _type: 'span',
                    marks: [],
                    text: 'Sea bass over 50 cm are present and regularly take our flies. The action is often spectacular, especially on surface flies.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Technical & exciting fishing',
          },
        ],
        eyebrow: 'Programme',
        fond: 'sand',
        intro: '',
        texte: null,
        titre: 'Sea bass fly fishing by boat',
      },
      {
        _key: 'gal249',
        _type: 'sectionGalerie',
        colonnes: '3',
        description: null,
        fond: 'dark',
        photos: [
          { _key: 'AfHw7cNo6fvLW2zKrPy1OW', _type: 'image', asset: { _ref: 'image-b02ca4c33ceaac5669e2d4ddee58f8072fe1cb6f-1043x695-heif', _type: 'reference' } },
          { _key: 'AfHw7cNo6fvLW2zKrPy1Th', _type: 'image', asset: { _ref: 'image-361077efb7ec0d0db3bf122e23ebba646f1df245-1043x695-heif', _type: 'reference' } },
          { _key: 'AfHw7cNo6fvLW2zKrPy1Ys', _type: 'image', asset: { _ref: 'image-878ca1c5047cfac8ffc1ddf92cf30542190f60b4-1238x695-heif', _type: 'reference' } },
          { _key: 'AfHw7cNo6fvLW2zKrPy1e3', _type: 'image', asset: { _ref: 'image-8b3d1439b87236d8ebb9ec7f284cd7b9b434cb11-1043x695-heif', _type: 'reference' } },
          { _key: 'AfHw7cNo6fvLW2zKrPy1jE', _type: 'image', asset: { _ref: 'image-7da1bfc0b25cdd343f0039cb39024bfc686e7da2-972x695-heif', _type: 'reference' } },
          { _key: 'AfHw7cNo6fvLW2zKrPy1oP', _type: 'image', asset: { _ref: 'image-2be61ba08db2719a2e24b464885ddf76aec60649-1238x695-heif', _type: 'reference' } },
          { _key: 'AfHw7cNo6fvLW2zKrPy1ta', _type: 'image', asset: { _ref: 'image-a23be6e93db804d2f7500da988ba0350363a297a-1282x695-heif', _type: 'reference' } },
          { _key: 'AfHw7cNo6fvLW2zKrPy1yl', _type: 'image', asset: { _ref: 'image-b8d81d3665d8853c07dcb4616c640e4567f996ac-1238x695-heif', _type: 'reference' } },
        ],
        texte: null,
      },
      {
        _key: 'cards2254',
        _type: 'sectionCards2',
        cards: [
          {
            _key: 'card250',
            _type: 'card',
            image: { _type: 'image', asset: { _ref: 'image-4bf37dd44c76c2a6b5a91a4a0dd51c7ad7284f1e-1400x933-jpg', _type: 'reference' } },
            lien: '/initiation-peche-du-bar-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'To start out and fish independently',
            titre: 'Sea bass fly fishing introduction',
          },
          {
            _key: 'card251',
            _type: 'card',
            image: { _type: 'image', asset: { _ref: 'image-bc98599b5c439ce0b92471023bfbbdf349bb5693-1400x1050-jpg', _type: 'reference' } },
            lien: '/peche-du-bar-perfectionnement',
            positionPhoto: 'center center',
            sousTitre: 'Progress and target bigger fish',
            titre: 'Intermediate level',
          },
          {
            _key: 'card252',
            _type: 'card',
            image: { _type: 'image', asset: { _ref: 'image-0462297e3c7755ed40b45199ca4205e4023934fc-1400x933-jpg', _type: 'reference' } },
            lien: '/peche-du-bar-a-vue-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'The holy grail of sea bass fly fishing',
            titre: 'Sight fishing for sea bass in the estuary',
          },
          {
            _key: 'card253',
            _type: 'card',
            image: { _type: 'image', asset: { _ref: 'image-45e2c5fdb5bbd23ce4cd35f7d6d86ae573d2a9c3-1400x933-jpg', _type: 'reference' } },
            lien: '/peche-du-bar-a-la-mouche-coaching',
            positionPhoto: 'center center',
            sousTitre: 'Video analysis · Debrief · Targeted improvement',
            titre: 'Sea bass fly fishing coaching',
          },
        ],
        colonnes: '4',
        description: null,
        eyebrow: 'Sea bass fly fishing · Southern Brittany',
        fond: 'white',
        texte: null,
        titre: 'Also discover',
      },
      {
        _key: 'cta255',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your boat trip',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. stage-peche-mouche
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'prestation-stage-peche-mouche',
    seoTitleEn: 'Fly Fishing Courses in Brittany — Jean-Baptiste Vidal',
    seoDescriptionEn:
      'Fly fishing courses in Brittany with Jean-Baptiste Vidal. Salmon, shad, trout, sea bass, pike, casting lessons and Spey casting courses. Certified professional guide.',
    pagebuilderEn: [
      {
        _key: 'hero-sp',
        _type: 'sectionHero',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a course',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Enjoy Fishing · Southern Brittany',
        hauteur: 'full',
        sousTitre: 'Day, weekend or multi-day stay: all species, all levels.',
        texte: null,
        titre: 'Fly fishing courses',
      },
      {
        _key: 'intro-sp',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn-sp',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book a course',
          },
        ],
        description: null,
        eyebrow: 'Courses · Fly fishing',
        fond: 'white',
        format: 'Day · Weekend · Tailored',
        niveau: 'All levels · From beginner to expert',
        saison: 'Year-round',
        showInfoCard: true,
        tarif: 'From 160 € / pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Jean-Baptiste offers various course formats tailored to all levels and all species: trout, sea bass, shad, pike, migratory fish. Each course takes place in real conditions on river or at sea, with personalised technical coaching.',
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
                text: 'Groups are intentionally kept to 2–3 people to ensure high-quality instruction. You leave with mastered techniques and concrete reference points to keep improving on your own.',
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
                text: 'Introduction, intermediate, casting lessons, Spey casting or Masterclass — a format for every goal.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Progress in real conditions with a professional',
      },
      {
        _key: 'cards-sp',
        _type: 'sectionCards2',
        cards: [
          {
            _key: 'c-sp1',
            _type: 'card',
            lien: '/peche-de-l-alose-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'Migratory fish · Mid-March → October',
            titre: 'Salmon & Shad fly fishing',
          },
          {
            _key: 'c-sp2',
            _type: 'card',
            lien: '/peche-de-la-truite-a-la-mouche-en-bretagne',
            positionPhoto: 'center center',
            sousTitre: 'Trout · Opening → Closing season',
            titre: 'Trout fly fishing in Brittany',
          },
          {
            _key: 'c-sp3',
            _type: 'card',
            lien: '/peche-du-bar-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'Sea bass · Year-round',
            titre: 'Sea bass fly fishing: shore & boat',
          },
          {
            _key: 'c-sp4',
            _type: 'card',
            lien: '/peche-du-brochet-a-la-mouche',
            positionPhoto: 'center center',
            sousTitre: 'Pike · Spring & Autumn',
            titre: 'Pike fly fishing',
          },
          {
            _key: 'c-sp5',
            _type: 'card',
            lien: '/stage-spey-cast-et-cours-de-lancer',
            positionPhoto: 'center center',
            sousTitre: 'Spey Casting · Year-round',
            titre: 'Spey Casting & Casting lessons',
          },
          {
            _key: 'c-sp6',
            _type: 'card',
            lien: '/masterclass',
            positionPhoto: 'center center',
            sousTitre: 'Advanced techniques · Autumn & Winter',
            titre: 'Masterclass',
          },
        ],
        colonnes: '3',
        description: null,
        eyebrow: 'My services',
        fond: 'white',
        texte: null,
        titre: 'Choose your course',
      },
      {
        _key: 'cta-sp',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your course',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. stage-spey-cast
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'prestation-stage-spey-cast',
    seoTitleEn: 'Spey Casting Course and Casting Lessons — Jean-Baptiste Vidal',
    seoDescriptionEn:
      'Spey casting course and casting lessons for single-handed, Switch and two-handed rods in Brittany, offered by Jean-Baptiste Vidal, professional fly fishing guide in Brittany.',
    pagebuilderEn: [
      {
        _key: 'd103d20765db',
        _type: 'sectionHero',
        btnMaterielLabel: 'Spey casting gear',
        btnMaterielLien: '/materiel-mouche-migrateur',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a course',
        btnTelTexte: '06 87 30 34 56',
        btnYoutubeTexte: 'Subscribe to my channel',
        description: null,
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-2c5ca4e18d655199bae62645da36e14986c3d59f-408x296-jpg',
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
            height: 0.7121931513464058,
            width: 0.5302085033841082,
            x: 0.28408567022883635,
            y: 0.587214115908253,
          },
        },
        sousTitre: 'Two-handed rod',
        texte: null,
        titre: 'Spey casting course',
        videoYoutubeDebut: 0,
      },
      {
        _key: 'intro17810044451828',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn001',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book this course',
          },
          {
            _key: 'btn002',
            _type: 'bouton',
            lien: '/tarifs',
            texte: 'View rates',
          },
        ],
        description: null,
        eyebrow: 'Spey Casting Course · Brittany',
        fond: 'white',
        format: '1-day course · Weekend · Group or private',
        niveau: 'Beginners and experienced anglers',
        saison: 'Year-round',
        showInfoCard: true,
        tarif: '300 € · 1 pers. / 200 € · 2 pers. / 160 € · 3 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Spey casting is the art of presenting a fly at long range, effortlessly and with minimal back-clearance. Jean-Baptiste has practised these techniques intensively over many seasons in Argentina and Russia, on salmon rivers.',
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
                text: 'Whether you are a beginner or looking to polish your existing skills, this small-group course (2 to 4 people max.) will let you progress quickly in a friendly and educational environment.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Master Spey casting with Jean-Baptiste',
      },
      {
        _key: 'texte-spey-001',
        _type: 'sectionTexte',
        description: null,
        fond: 'sand',
        largeur: 'normal',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Spey casting: an exceptional cast',
              },
            ],
            style: 'h2',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Spey casting is a casting technique still little practised in France but rapidly growing in popularity. It allows any fly to be presented with minimal back-clearance and very little effort — ideal for confined, tree-lined or wide rivers.',
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
                text: 'This technique applies to trout, grayling, salmon and all large species. In Brittany, Jean-Baptiste offers group or private lesson formats, tailored to your level and goals.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        _key: 'prog-carte-001',
        _type: 'sectionProgrammeTexte',
        colonnes: [
          {
            _key: 'col-techniques',
            items: [
              { _key: 'i001', _type: 'item', inclus: true, texte: 'Single Spey and Double Spey' },
              { _key: 'i002', _type: 'item', inclus: true, texte: 'Snap T and Snake Roll' },
              { _key: 'i003', _type: 'item', inclus: true, texte: 'Roll cast and its variations' },
              { _key: 'i004', _type: 'item', inclus: true, texte: 'Casting with the off-side hand' },
              { _key: 'i005', _type: 'item', inclus: true, texte: 'Sinking fly line and sinking tip' },
              { _key: 'i006', _type: 'item', inclus: true, texte: 'Gear: rods, fly lines, polyleaders' },
            ],
            label: 'Techniques taught',
            style: 'normal',
          },
          {
            _key: 'col-formats',
            items: [
              { _key: 'i007', _type: 'item', inclus: true, texte: 'Introduction, intermediate or expert level' },
              { _key: 'i008', _type: 'item', inclus: true, texte: '1 day, weekend or per-session format' },
              { _key: 'i009', _type: 'item', inclus: true, texte: 'On a local river or near you' },
              { _key: 'i010', _type: 'item', inclus: true, texte: 'Private lesson or small group (2–4 people)' },
            ],
            label: 'Formats available',
            style: 'normal',
          },
        ],
        description: null,
        eyebrow: 'Programme',
        fond: 'white',
        intro: 'Introduction and intermediate courses in Brittany, tailored to your level (beginner, intermediate, expert). One day, a weekend or per session — on a local river or near you.',
        texte: null,
        titre: 'À la carte Spey Casting courses',
      },
      {
        _key: 'texte-collectif-001',
        _type: 'sectionTexte',
        description: null,
        fond: 'dark',
        largeur: 'normal',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Group Spey casting course',
              },
            ],
            style: 'h2',
          },
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Jean-Baptiste also offers group courses for tackle shops, fly fishing clubs and associations. These courses include a theoretical indoor session (gear and technique presentation) and a practical riverside session.',
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
                text: 'To organise a group course with your club or association, contact Jean-Baptiste directly.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        _key: 'prog-lancer-001',
        _type: 'sectionProgrammeTexte',
        colonnes: [
          {
            _key: 'col-lancers',
            items: [
              { _key: 'l001', _type: 'item', inclus: true, texte: 'Overhead cast' },
              { _key: 'l002', _type: 'item', inclus: true, texte: 'Roll cast' },
              { _key: 'l003', _type: 'item', inclus: true, texte: 'Backhand cast' },
              { _key: 'l004', _type: 'item', inclus: true, texte: 'Horizontal or side cast' },
              { _key: 'l005', _type: 'item', inclus: true, texte: 'Single haul' },
              { _key: 'l006', _type: 'item', inclus: true, texte: 'Double haul' },
              { _key: 'l007', _type: 'item', inclus: true, texte: 'Spey casting with single-handed or Switch rod' },
            ],
            label: 'Casts taught',
            style: 'normal',
          },
        ],
        description: null,
        eyebrow: 'Also available',
        fond: 'sand',
        intro: 'The art of casting a fly at distance and with precision takes work and many hours of practice. Jean-Baptiste teaches all the fundamental casts, for single-handed rod as well as Switch.',
        texte: null,
        titre: 'Casting lessons for single-handed rod',
      },
      {
        _key: 'cta-spey-001',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: '/tarifs',
        btn2Texte: 'View rates',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your Spey casting course',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. stage-spey-cast-et-cours-de-lancer
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'prestation-stage-spey-cast-et-cours-de-lancer',
    seoTitleEn: 'Spey Casting Course and Casting Lessons — Jean-Baptiste Vidal',
    seoDescriptionEn:
      'Spey casting course and casting lessons for single-handed, Switch and two-handed rods in Brittany, offered by Jean-Baptiste Vidal, professional fly fishing guide in Brittany.',
    pagebuilderEn: [
      {
        _key: 'hero501',
        _type: 'sectionHero',
        btnMaterielLabel: 'Migratory fish gear',
        btnMaterielLien: '/materiel-mouche-migrateur',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a trip',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Spey Casting · Fly casting',
        hauteur: 'full',
        sousTitre: 'Single-handed · Switch · Two-handed: master the art of casting without back-clearance',
        texte: null,
        titre: 'Spey Casting course and casting lessons',
      },
      {
        _key: 'intro502',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn512',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book',
          },
        ],
        description: null,
        duree: '',
        eyebrow: 'Spey Casting · Fly casting',
        fond: 'white',
        format: 'Day · Weekend · Private lessons · Group',
        lignesSupp: [
          {
            _key: 'li511',
            _type: 'ligneInfo',
            label: 'Programme',
            valeur: 'Single Spey · Double Spey · Snap T · Snake Roll · Roll cast',
          },
        ],
        niveau: 'Beginners and experienced anglers',
        saison: 'Year-round',
        showInfoCard: true,
        tarif: '300 € · 1 pers. / 200 € · 2 pers. / 160 € · 3 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Though still little practised in France, Spey casting is becoming increasingly popular on our rivers. Primarily used for migratory fish, this art of casting a fly at long range with minimal effort and little back-clearance requires some practice and technique.',
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
                text: 'Spey casting is not limited to migratory fish fishing. It can be used for trout, grayling or any other species. It is extremely handy for changing direction in a single cast and movement!',
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
                text: 'Having personally practised these techniques intensively abroad during my seasons and travels, I invite you to benefit from my experience to introduce you to this technique or to refine your existing skills.',
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
                text: 'Whether in a group or as a private lesson, I will offer you various formats tailored to your needs: for a day, a weekend, or a per-session arrangement, on a local river or near you.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'The art of casting without back-clearance',
      },
      {
        _key: 'carr513',
        _type: 'sectionCarrousel3Images',
        description: null,
        fond: 'dark',
        images: [
          { _type: 'image', asset: { _ref: 'image-56a1772369a94e347203293cb2a18596459473a4-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-5b51ead33db409482a29fb56ba5006686ecf45eb-974x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-74381cbe5b584b2227b3ce5a494e7d518050df13-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-eb5d349a464c9b93e837bd0339280f733b8ab525-649x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-779391fb065acfb257c91b0dc7994076f9977fff-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-1b5802a9af78d754759dfc59fc96d7f45bf31b38-973x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-eb58cafe78f799e8dc6f2975b17bfc98e0d37c8f-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-b8aa282f0b85e2be274ff35ac43435e59692c6b9-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-3d0dbe45639a8a0e87a0385d6fc8401c29e3278f-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-1e10e6a4e7036b60d1a99fa5ef4f4ceb2b35216e-973x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-819524692a2f16651be28a6bd0387f93cddaacc0-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-e5173248dd71aefaa05bef635a93bb826d160da3-1045x697-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-d8135bccb9008848be78c30d54f0456f208df7c1-973x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-25036142c4ae83e687d7fb67d7f813d7e436d26d-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-0ec31079ad3ea16912ba5e964d54fc3f420be7a8-973x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-47052b301c7d0339d05899ef37b6058d746acddd-975x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-16f7ec224ce598de154bf2d7bbbfe40283328efc-973x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-97633ad141ec719d69db3feb03768bd9f3022bcc-973x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-d28611537b986cd426673957b6c2a555a6666828-649x649-heif', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-5a5fa8b9a79cd508f5eef844f8e8f9c987827527-1600x1067-jpg', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-e8c88b1f2e7180f7b41147a7320a51e36168ec01-1600x1030-png', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-0bbfb10e5cd7aea0f26501d46c53eb5ff313e330-1600x1044-jpg', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-7a5e244f3380dd34b54bb6ed143f6fd796794bc8-1600x1044-jpg', _type: 'reference' } },
          { _type: 'image', asset: { _ref: 'image-6626487a60a332a0c889d1edc07a446658bcf4f1-1600x1044-jpg', _type: 'reference' } },
        ],
        ratio: '3/2',
        texte: null,
        titre: 'The art and efficiency of Spey casting',
      },
      {
        _key: 'progt514',
        _type: 'sectionProgrammeTexte',
        colonnes: [
          {
            _key: 'col515',
            _type: 'colonne',
            items: [
              { _key: 'item516', _type: 'item', inclus: true, texte: 'The different Spey casts: Single and Double Spey, Snap T, Snake Roll, Roll cast' },
              { _key: 'item517', _type: 'item', inclus: true, texte: 'Gear for Spey casting (rods, fly lines, polyleaders)' },
              { _key: 'item518', _type: 'item', inclus: true, texte: 'Casting with the off-side hand' },
              { _key: 'item519', _type: 'item', inclus: true, texte: 'Sinking fly line and sinking tip' },
            ],
            label: 'Casts & techniques',
            style: 'normal',
          },
        ],
        description: null,
        eyebrow: 'Programme',
        fond: 'sand',
        intro: '',
        texte: null,
        titre: 'On the programme',
      },
      {
        _key: 'cta520',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your trip',
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
console.log('Batch 4 done.')
