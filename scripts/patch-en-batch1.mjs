import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config()

const client = createClient({
  projectId: 'uievv97s', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const patches = [
  // ─────────────────────────────────────────────
  // 1. bateau-bar-a-la-mouche
  // ─────────────────────────────────────────────
  {
    id: 'prestation-bateau-bar-a-la-mouche',
    seoTitleEn: 'The Boat — Sea Bass Fly Fishing by Boat · Jean-Baptiste Vidal',
    seoDescriptionEn: 'Sea bass fly fishing by boat along the Brittany coast with Jean-Baptiste Vidal and his fly-specific Carolina Skiff flat boat.',
    pagebuilderEn: [
      {
        _key: 'hero1',
        _type: 'sectionHero',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a trip',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Carolina Skiff · Flat bottom',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-a3b5172a18c5d1502cfd93961fcec85e3399dd13-1842x1228-jpg',
            _type: 'reference',
          },
        },
        sousTitre: 'Sea bass fly fishing by boat along the Brittany coast',
        statsHero: [
          {
            _key: 'c1d5fc19c335',
            _type: 'statHero',
            label: 'Flat bottom',
            nombre: 'Fly-specific',
          },
          {
            _key: 'e59462635a10',
            _type: 'statHero',
            label: 'gasoline engine',
            nombre: 'SUZUKI 40 CV 4 temps',
          },
          {
            _key: '7a100e26f272',
            _type: 'statHero',
            label: 'electric motor',
            nombre: 'Minn Kota Powerdrive 70 lbs',
          },
        ],
        texte: null,
        titre: 'The boat',
      },
      {
        _key: 'stats10',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st11',
            _type: 'stat',
            label: 'Year of purchase',
            nombre: '2018',
          },
          {
            _key: 'st12',
            _type: 'stat',
            label: 'Minimum draft',
            nombre: '30 cm',
          },
          {
            _key: 'st13',
            _type: 'stat',
            label: 'On-board capacity',
            nombre: '2 pêcheurs',
          },
          {
            _key: 'st14',
            _type: 'stat',
            label: 'Dedicated to fly fishing',
            nombre: '100 %',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro8',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn9',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Contact me',
          },
        ],
        description: null,
        eyebrow: 'Boat · Sea bass fly fishing',
        fond: 'white',
        format: 'Full day (7–8 h) · Half day (4 h) · On request',
        niveau: '2 anglers + guide · 1 full or half day',
        saison: 'April to November depending on conditions',
        showInfoCard: true,
        tarif: '350 € · 1 pers. / 250 € · 2 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'After years of guided boat fishing abroad, in 2018 I equipped myself with a new tool for my guiding sessions both at sea and in freshwater, by acquiring a Carolina Skiff JV 15.',
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
                text: 'This "skiff" or "flat boat" — a flat-bottomed boat specifically designed for fly fishing with a shallow draft — allows me to explore lakes, estuaries and the sea, ideal for fly fishing, with the ability to operate in very little water.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'The fly-specific Carolina Skiff',
      },
      {
        _key: 'dd978eee2c8e',
        _type: 'sectionTexteImage',
        description: null,
        fond: 'white',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-d0896fef9c8b091e8bc735f2ed95b8ec81618f19-1043x695-avif',
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
                text: 'With two large casting platforms — one at the bow and one at the stern — I can take two anglers on board.',
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
                text: 'Powered by a SUZUKI 40 CV 4-stroke gasoline engine with electric trim, it lets me move quickly between fishing spots. It is quiet, fuel-efficient and low-emission.',
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
                text: 'Fitted with a Minn Kota Powerdrive 70 lbs electric motor at the bow, powered by a lithium battery with very high autonomy, it allows for beautiful drifts and a discreet approach to fishing spots.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        _key: '4d1bde46738d',
        _type: 'sectionTexteImage',
        description: null,
        fond: 'white',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-9be3c0d15b03ec7a497c39a7414f39695a2228b5-1039x743-avif',
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
                text: 'It is also equipped with storage compartments, fly-fishing-specific rod holders, fly patches, and I have a Humminbird fish finder that provides valuable information about bottom depth, water temperature and fish presence.',
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
                text: 'Find my guided boat fishing services for sea bass and predatory fish on the "Sea Bass Fly Fishing" and "Pike Fly Fishing" pages.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        _key: '065286615bc0',
        _type: 'sectionCarrousel3Images',
        description: null,
        fond: 'sand',
        images: [
          {
            _key: '9e023cf0ec79',
            _type: 'image',
            asset: {
              _ref: 'image-f2053b3ff3d662e6efc79a1bbbaa3e21f6ec9397-1116x743-avif',
              _type: 'reference',
            },
          },
          {
            _key: 'bd99034f90c3',
            _type: 'image',
            asset: {
              _ref: 'image-a84de1748e0addd1dacbbfde33c74cf87ecd2f45-1221x743-avif',
              _type: 'reference',
            },
          },
          {
            _key: '8e3e4cfe1616',
            _type: 'image',
            asset: {
              _ref: 'image-0d95213cc6bd33f48ca4441521a9c42c81b0a3bb-1044x695-heif',
              _type: 'reference',
            },
          },
          {
            _key: '1a3f7874b4df',
            _type: 'image',
            asset: {
              _ref: 'image-b7dadb129710b8839b3397233f2c9294cb4c18cf-991x743-avif',
              _type: 'reference',
            },
          },
          {
            _key: '7a6fc870017f',
            _type: 'image',
            asset: {
              _ref: 'image-3635626c3b47eb3a9f312ff8452de6a74c483c5f-1460x743-avif',
              _type: 'reference',
            },
          },
        ],
        ratio: '3/2',
        texte: null,
      },
      {
        _key: 'cta15',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book a boat trip',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. cours-de-lancer-peche-a-la-mouche
  // ─────────────────────────────────────────────
  {
    id: 'prestation-cours-de-lancer-peche-a-la-mouche',
    seoTitleEn: 'Fly Casting Lessons — Fly Fishing Casting Course · Jean-Baptiste Vidal',
    seoDescriptionEn: 'Private and small-group fly casting lessons with certified fly fishing guide Jean-Baptiste Vidal. 30 years of expertise to help you improve quickly.',
    pagebuilderEn: [
      {
        _key: 'cbe470b4c59d',
        _type: 'sectionHero',
        btnMaterielLabel: 'Gear',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a course',
        btnTelTexte: '06 87 30 34 56',
        btnYoutubeTexte: 'Subscribe to my channel',
        description: null,
        hauteur: 'full',
        sousTitre: 'Single-handed rod',
        texte: null,
        titre: 'Casting course',
        videoYoutubeDebut: 0,
        videoYoutubeFin: 16,
        videoYoutubeUrl: 'https://www.youtube.com/watch?v=d1SjTIJaQFs&t=17s',
      },
      {
        _key: 'intro178100444518216',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn1',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book a lesson',
          },
          {
            _key: 'btn2',
            _type: 'bouton',
            lien: '/tarifs',
            texte: 'View rates',
          },
        ],
        description: null,
        eyebrow: 'Casting lessons · Fly fishing',
        fond: 'white',
        format: 'Private lesson · Half day or full day',
        niveau: 'Beginners and experienced anglers',
        saison: 'Year-round',
        showInfoCard: true,
        tarif: '280 € · 1 pers. / 180 € · 2 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'A good cast is the foundation of everything in fly fishing. Whether you are just starting out or looking to correct bad habits, these casting lessons are designed to make you progress quickly.',
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
                text: 'We work on the fundamentals: timing, loop, double haul, distance and accuracy. Sessions can take place on grass, by the water, or directly on your home river.',
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
                text: "Jean-Baptiste adapts his teaching to your level and goals: dry fly at distance, tight-line nymphing, downstream fishing or casting in tight spaces.",
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'A precise and elegant cast — it can be learned',
      },
      {
        _key: '66675ecd020a',
        _type: 'sectionTitre',
        alignement: 'center',
        description: null,
        fond: 'dark',
        sousTitre: 'single-handed rod',
        texte: null,
        titre: 'Casting course & lessons',
      },
      {
        _key: '05efb8f50d8a',
        _type: 'sectionTexte',
        description: null,
        fond: 'dark',
        largeur: 'wide',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Since 2014, I have been offering individual casting lessons for anglers who want to refine their technique, as well as group sessions with fly fishing clubs and associations.',
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
                text: 'Many anglers only practice the overhead and sidearm cast — sometimes horizontal — which leaves them struggling when the wind picks up or when the river is lined with trees and obstacles.',
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
                text: 'The backhand, roll cast and single-handed Spey cast are extremely useful for covering every spot on a river, regardless of its size or how cluttered it is.',
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
                text: 'For all saltwater, lake and predator fishing, you absolutely need to be able to cast at distance — sometimes quickly (exotic fishing) and/or in wind.',
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
                text: 'For this, the single haul, double haul and back-handed cast are essential. I have mastered all of these casts and I will teach them to you with clear, patient instruction.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        _key: 'dfsxvmqft8',
        _type: 'sectionProgrammeCartes',
        colonnes: '3',
        description: null,
        eyebrow: 'Programme',
        fond: 'sand',
        items: [
          {
            _key: '9wu75oaty5',
            _type: 'carte',
            description: 'Which rod action suits you? What power to choose depending on the species and location? The fly line profile is equally decisive for casting and fishing well.',
            sousTitre: 'ROD · FLY LINE · REEL',
            titre: 'Choosing the right gear',
          },
          {
            _key: 'g702h24dab5',
            _type: 'carte',
            description: 'Loading your rod is a skill that must be learned. Timing and synchronisation of movement are often the key. We will look at how to optimise your casts with minimum effort.',
            sousTitre: 'TIMING · SYNCHRONISATION',
            titre: 'Loading the rod effortlessly',
          },
          {
            _key: 'kpkjy9qxya',
            _type: 'carte',
            description: 'With more than 30 years of intensive practice, I quickly identify poor technique so you can make significant gains in ease and distance.',
            sousTitre: 'MEDIUM AND LONG DISTANCE',
            titre: 'Casting at distance',
          },
          {
            _key: 'x56oq0ohebh',
            _type: 'carte',
            description: 'To optimise your fishing and adapt to conditions, you need to master a range of casts. I can teach you every cast needed for fly fishing.',
            sousTitre: 'ADAPTABILITY · CONDITIONS',
            titre: 'Casting in any situation',
          },
          {
            _key: 'gmpi5s73pzj',
            _type: 'carte',
            description: 'Other casts can be a great help for presenting your flies better and catching more fish: curve casts, slack-line casts, reach casts, etc.',
            sousTitre: 'CURVE · SLACK-LINE · REACH',
            titre: 'Speciality casts',
          },
        ],
        texte: null,
        titre: 'What will you learn?',
      },
      {
        _key: 'klws30nhc0m',
        _type: 'sectionVideos',
        description: null,
        fond: 'white',
        items: [
          {
            _key: 'w2prvqrll8p',
            description: 'This 44-minute video covers all the fundamentals of fly casting and explains the most common mistakes and how to correct them. Essential for beginners and for those who want to rebuild solid foundations.',
            espece: 'Introduction · Fundamentals',
            titre: 'Fly casting basics',
            youtubeId: 'https://www.youtube.com/watch?v=d1SjTIJaQFs&t=17s',
          },
          {
            _key: 'wcb8tne0u7',
            description: 'The backhand cast lets you adapt to the layout of the river and cover every spot — especially on small and medium rivers. It also allows you to cast in any situation, even when the wind is against you.',
            espece: 'Backhand cast',
            titre: 'Learning the backhand cast',
            youtubeId: 'https://www.youtube.com/watch?v=Bi5flcQmq5U',
          },
          {
            _key: 'tugo51r1jxc',
            description: 'The roll cast lets you propel your fly without extending the line behind you — very practical and effective on cluttered or tight spots. It is also the foundational cast for Spey Casting.',
            espece: 'Roll cast',
            titre: 'Learning the roll cast',
            youtubeId: 'https://www.youtube.com/watch?v=rKOy281vwE8',
          },
          {
            _key: 'gj5ttgo4f37',
            description: "It's not uncommon to need to cast faster and farther: stillwater, lake, exotic fishing. Wind is often the number-one enemy — this video will help you deal with it and cast beyond 20 metres.",
            espece: 'Distance · Double haul',
            titre: 'Improving your technique — Long-distance casting',
            youtubeId: 'https://www.youtube.com/watch?v=87XXimb4npM',
          },
        ],
        labelChaine: 'All Orion Fly Fishing videos',
        lienChaine: 'https://www.youtube.com/@OrionFlyFishing',
        texte: null,
        titre: 'Learning the casting basics — tutorial videos',
      },
      {
        _key: 'esdrr6vspse',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Book a lesson',
        btn2Lien: '/tarifs',
        btn2Texte: 'View rates',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Ready to improve?',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. initiation-peche-a-la-mouche
  // ─────────────────────────────────────────────
  {
    id: 'prestation-initiation-peche-a-la-mouche',
    seoTitleEn: 'Introduction to Fly Fishing · Jean-Baptiste Vidal, certified guide',
    seoDescriptionEn: 'An introductory fly fishing course with a certified professional guide is the best way to start this technique on the right foot. Book your session in Brittany.',
    pagebuilderEn: [
      {
        _key: 'hero1',
        _type: 'sectionHero',
        btnMaterielLabel: 'Fly fishing gear',
        btnMaterielLien: '/materiel-jeanbaptistevidal',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a course',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Fly fishing · Introduction · All species',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-e78829858494e677fbb4a138d439dc5c572c1448-741x803-avif',
            _type: 'reference',
          },
        },
        sousTitre: 'The mechanics of casting are simple — but you need to learn them correctly from the start. In one day with a professional, you leave with the real foundations to fish on your own, for any species.',
        texte: null,
        titre: 'Introduction to fly fishing',
      },
      {
        _key: 'stats2',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st3',
            _type: 'stat',
            label: 'Availability',
            nombre: 'Toute l\'année',
          },
          {
            _key: 'st4',
            _type: 'stat',
            label: 'Full day',
            nombre: '9h30 – 17h',
          },
          {
            _key: 'st5',
            _type: 'stat',
            label: 'Level required',
            nombre: 'Beginners',
          },
          {
            _key: 'st6',
            _type: 'stat',
            label: 'Rate / day',
            nombre: '280 €',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro7',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn16',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book',
          },
        ],
        description: null,
        duree: '',
        eyebrow: 'Introduction · Fly fishing',
        fond: 'white',
        format: '1 day · 2 days recommended to get a solid start',
        lignesSupp: [
          {
            _key: 'li14',
            _type: 'ligneInfo',
            label: 'Schedule',
            valeur: '9:30 am to 5:00 pm approx.',
          },
          {
            _key: 'li15',
            _type: 'ligneInfo',
            label: 'Species',
            valeur: 'Trout · Sea bass · Migratory fish · All species',
          },
        ],
        niveau: 'Beginners only · Also for those who have started on their own',
        saison: 'Year-round',
        showInfoCard: true,
        tarif: '280 € · 1 pers. / 180 € · 2 pers. / 150 € · 3 pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'Fly fishing is a specific technique, very different from conventional fishing — starting with the cast. It is accessible to everyone, but requires time to learn and good coordination. Learning alone often means picking up bad habits that are difficult to correct later.',
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
                text: 'My goal is to help you gain true autonomy in simple situations within one day. It is often beneficial to plan two days to get a solid start and consolidate what you have learned, but one day is enough to get on the right foot and be able to fish on your own as soon as you get home.',
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
                text: 'Beyond casting, we cover all the essential elements: building a leader, choosing seasonal flies, reading the river and understanding fish behaviour. This course applies to all species (trout, sea bass, migratory fish) with the appropriate gear for each.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Getting started with a professional',
      },
      {
        _key: 'vid17',
        _type: 'sectionVideo',
        description: null,
        eyebrow: 'Tutorial video',
        fond: 'dark',
        texte: null,
        titre: 'My casting introduction technique',
        url: 'https://www.youtube.com/watch?v=d1SjTIJaQFs',
        videoPosition: 'left',
      },
      {
        _key: 'prog38',
        _type: 'sectionProgramme',
        description: null,
        etapes: [
          {
            _key: 'etape18',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Learning to cast',
              asset: {
                _ref: 'image-93ba3ca8109691c3ec5696953052ea86fc5dc127-1400x933-jpg',
                _type: 'reference',
              },
            },
            tag: 'Single haul · Double haul · Roll cast · Distance',
            texte: [
              {
                _key: 'b19',
                _type: 'block',
                children: [
                  {
                    _key: 's20',
                    _type: 'span',
                    marks: [],
                    text: 'Casting is the heart of fly fishing, and the most important thing to learn correctly from the very beginning. We start with the single haul to build the mechanics of the movement, then progress to the double haul to increase line speed and distance.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b21',
                _type: 'block',
                children: [
                  {
                    _key: 's22',
                    _type: 'span',
                    marks: [],
                    text: 'We work on posture, timing, rod path and loop formation. A bad movement learned alone can take years to correct. With a professional, you build the right technique from the very first hour.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Learning to cast',
          },
          {
            _key: 'etape23',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Gear & building a leader',
              asset: {
                _ref: 'image-aa46cebe15c0661e217ff507f855d380f44d36cb-1600x1067-jpg',
                _type: 'reference',
              },
            },
            tag: 'Rod · Fly line · Knots · Fluorocarbon',
            texte: [
              {
                _key: 'b24',
                _type: 'block',
                children: [
                  {
                    _key: 's25',
                    _type: 'span',
                    marks: [],
                    text: 'Understanding your gear is essential to progress. We go through the rod, the fly line, the main fly fishing knots, and how to build a simple leader suited to your fishing areas and target species.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b26',
                _type: 'block',
                children: [
                  {
                    _key: 's27',
                    _type: 'span',
                    marks: [],
                    text: 'I also advise you on buying your own personal gear based on where you fish, so you can continue to practise and improve in complete autonomy once the course is over.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Gear & building a leader',
          },
          {
            _key: 'etape28',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Fly selection & understanding the environment',
              asset: {
                _ref: 'image-0a83be27ad3453f03dda8c962fa67faf4ad35a73-1400x933-jpg',
                _type: 'reference',
              },
            },
            tag: 'Seasonal flies · River · Spots · Fish behaviour',
            texte: [
              {
                _key: 'b29',
                _type: 'block',
                children: [
                  {
                    _key: 's30',
                    _type: 'span',
                    marks: [],
                    text: 'Choosing flies according to the season and conditions is an art in itself. We explore the main fly families together (dry fly, nymph, wet fly), how to use them in different situations, and how to read a river to find fish-holding spots.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b31',
                _type: 'block',
                children: [
                  {
                    _key: 's32',
                    _type: 'span',
                    marks: [],
                    text: 'River ecology, trout behaviour through the season, reading currents: you will leave with all the keys to becoming an effective, self-sufficient angler who respects the environment.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Fly selection & understanding the environment',
          },
          {
            _key: 'etape33',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Progression & other species',
              asset: {
                _ref: 'image-ddff7b3dd218f2c82f37549839dcac2d7beea874-1400x933-jpg',
                _type: 'reference',
              },
            },
            tag: 'Trout · Sea bass · Migratory fish · No limits',
            texte: [
              {
                _key: 'b34',
                _type: 'block',
                children: [
                  {
                    _key: 's35',
                    _type: 'span',
                    marks: [],
                    text: 'This course is a springboard. After the introduction, you can come back for an advanced course, a guided sea bass or trout day, or explore other species (shad, salmon, pike) with the specific gear for each.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b36',
                _type: 'block',
                children: [
                  {
                    _key: 's37',
                    _type: 'span',
                    marks: [],
                    text: 'Fly fishing has no limits: after the dry fly comes the nymph, sight fishing, surface flies for sea bass, Spey Casting for migratory fish... Each milestone you reach opens a whole new world of possibilities.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Progression & other species',
          },
        ],
        eyebrow: 'Programme',
        fond: 'sand',
        intro: '',
        texte: null,
        titre: 'What you will learn',
      },
      {
        _key: 'cta39',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your introductory course',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. initiation-peche-du-bar-a-la-mouche
  // ─────────────────────────────────────────────
  {
    id: 'prestation-initiation-peche-du-bar-a-la-mouche',
    seoTitleEn: 'Introduction to Sea Bass Fly Fishing · Jean-Baptiste Vidal, Brittany',
    seoDescriptionEn: 'Introductory sea bass fly fishing course with Jean-Baptiste Vidal, certified fly fishing guide. Gear, strategies, flies — everything you need to catch your first sea bass.',
    pagebuilderEn: [
      {
        _key: 'hero83',
        _type: 'sectionHero',
        btnMaterielLabel: 'Sea bass gear',
        btnMaterielLien: '/materiel-mouche-bar',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Book a trip',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Sea bass fly fishing · Introduction · South Brittany',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-4bf37dd44c76c2a6b5a91a4a0dd51c7ad7284f1e-1400x933-jpg',
            _type: 'reference',
          },
        },
        sousTitre: 'Gear, casting, reading the water, strategy: in one day you leave with the keys to fish for sea bass on your own, close to home.',
        texte: null,
        titre: 'Introduction to sea bass fly fishing',
      },
      {
        _key: 'stats84',
        _type: 'sectionStats',
        description: null,
        fond: 'dark',
        stats: [
          {
            _key: 'st85',
            _type: 'stat',
            label: 'Sea bass season',
            nombre: 'Mai – Nov',
          },
          {
            _key: 'st86',
            _type: 'stat',
            label: 'Guided day',
            nombre: '6–8 h',
          },
          {
            _key: 'st87',
            _type: 'stat',
            label: 'Anglers per trip',
            nombre: '2 max',
          },
          {
            _key: 'st88',
            _type: 'stat',
            label: 'Beginners welcome',
            nombre: 'All levels',
          },
        ],
        texte: null,
      },
      {
        _key: 'intro89',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn97',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Book',
          },
        ],
        description: null,
        duree: '6 to 8 hours of guided fishing',
        eyebrow: 'Introduction · Sea bass fly fishing',
        fond: 'white',
        format: 'Full day · Weekend · Tailored',
        lignesSupp: [
          {
            _key: 'li96',
            _type: 'ligneInfo',
            label: 'Group',
            valeur: 'Maximum 2 anglers',
          },
        ],
        niveau: 'Beginners · Anglers with no fly fishing experience',
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
                text: 'Would you like to discover sea bass fly fishing, catch your first sea bass and understand how to target this fascinating fish? These courses are specially designed for the beginner or angler with no fly fishing experience.',
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
                text: 'My goal is simple: to pass on all my knowledge — understanding the environment and ecosystem, casting techniques suited to large weighted flies, reading fishing spots, fishing strategy — so that you can continue this exciting pursuit on your own.',
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
                text: 'Sea bass leave the coast in autumn to spawn and return in March. The season runs from May to late November, with the preferred start in mid-April. Tides, tide coefficients, weather, wind direction, light and water colour are all parameters you need to master.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Making you self-sufficient is my priority',
      },
      {
        _key: 'prog113',
        _type: 'sectionProgramme',
        description: null,
        etapes: [
          {
            _key: 'etape98',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Gear selection & use',
              asset: {
                _ref: 'image-060bddc197fdc39e25b02ef441977a947401096e-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Rod · Fly line · Leader · Flies',
            texte: [
              {
                _key: 'b99',
                _type: 'block',
                children: [
                  {
                    _key: 's100',
                    _type: 'span',
                    marks: [],
                    text: 'Selecting the right rod, fly line type, tippet and fluorocarbon for the day\'s conditions. Fly choice is a critical step: a well-thought-out seasonal selection greatly increases your chances of landing fish.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b101',
                _type: 'block',
                children: [
                  {
                    _key: 's102',
                    _type: 'span',
                    marks: [],
                    text: 'You will understand why sea bass fly fishing gear is specific: large weighted flies, intermediate or sinking lines, and why fine-tuning the details makes all the difference.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Gear selection & use',
          },
          {
            _key: 'etape103',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Learning to cast',
              asset: {
                _ref: 'image-e44574dd5d95b546b690a1ff7d457a89840c061f-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Single haul · Double haul · Roll cast',
            texte: [
              {
                _key: 'b104',
                _type: 'block',
                children: [
                  {
                    _key: 's105',
                    _type: 'span',
                    marks: [],
                    text: 'Sea bass fishing requires specific casting techniques: single and double haul to gain line speed and distance, roll cast, backhand cast, tight loop control, and handling wind.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b106',
                _type: 'block',
                children: [
                  {
                    _key: 's107',
                    _type: 'span',
                    marks: [],
                    text: 'With large and sometimes weighted flies, the movement must be precise and efficient. We work together on posture, timing and rod path so you feel confident in all wind conditions — which are unavoidable in Brittany.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Learning to cast',
          },
          {
            _key: 'etape108',
            _type: 'etape',
            image: {
              _type: 'image',
              alt: 'Strategy & reading the water',
              asset: {
                _ref: 'image-dd6a49671be3c16ef65c0e0315f2a09d990b2d00-798x598-heif',
                _type: 'reference',
              },
            },
            tag: 'Estuaries · Tides · Spots · Currents',
            texte: [
              {
                _key: 'b109',
                _type: 'block',
                children: [
                  {
                    _key: 's110',
                    _type: 'span',
                    marks: [],
                    text: 'The estuary is a transition ecosystem between fresh and salt water. Understanding how it works is essential. We analyse tides, tide coefficients, currents, sea bass holding spots and biological signals (bird activity, surface feeds).',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: 'b111',
                _type: 'block',
                children: [
                  {
                    _key: 's112',
                    _type: 'span',
                    marks: [],
                    text: 'Identifying the right spots for the current conditions, reading currents, finding the best position to present the fly: you will leave with all the keys to be effective on your very next outing.',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
            ],
            titre: 'Strategy & reading the water',
          },
        ],
        eyebrow: 'Programme',
        fond: 'sand',
        intro: '',
        texte: null,
        titre: 'What you will learn',
      },
      {
        _key: 'cards2118',
        _type: 'sectionCards2',
        cards: [
          {
            _key: 'card114',
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
            sousTitre: 'Progress and target bigger fish',
            titre: 'Advanced sea bass',
          },
          {
            _key: 'card115',
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
            titre: 'Sight fishing for sea bass',
          },
          {
            _key: 'card116',
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
            sousTitre: 'On board my fly-specific Carolina Skiff',
            titre: 'Boat fishing',
          },
          {
            _key: 'card117',
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
            titre: 'Sea bass coaching',
          },
        ],
        colonnes: '4',
        description: null,
        eyebrow: 'Sea bass fly fishing · South Brittany',
        fond: 'white',
        texte: null,
        titre: 'Also discover',
      },
      {
        _key: 'cta119',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Book your introductory course',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. master-class-nymphe-au-fil
  // ─────────────────────────────────────────────
  {
    id: 'prestation-master-class-nymphe-au-fil',
    seoTitleEn: 'Masterclass "French Nymphing / Tight-line Nymphing" · Jean-Baptiste Vidal',
    seoDescriptionEn: 'An intensive French nymphing masterclass led by Jean-Baptiste Vidal and expert guest Stéphane Legentilhomme. 2-day course on the River Odet, March 2026. Limited to 4 participants.',
    pagebuilderEn: [
      {
        _key: 'hero449',
        _type: 'sectionHero',
        btnMaterielLabel: 'Trout gear',
        btnMaterielLien: '/materiel-mouche-truite',
        btnReserverLien: '/contact',
        btnReserverTexte: 'Reserve my spot',
        btnTelTexte: '06 87 30 34 56',
        description: null,
        eyebrow: 'Masterclass · French nymphing',
        hauteur: 'full',
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-11348d9efed922792c9c35abea34a3bb4a30916b-998x748-avif',
            _type: 'reference',
          },
          crop: {
            _type: 'sanity.imageCrop',
            bottom: 0.16364101252876503,
            left: 0,
            right: 0,
            top: 0.0027273502088127344,
          },
          hotspot: {
            _type: 'sanity.imageHotspot',
            height: 0.5308957640842069,
            width: 0.7363028934655856,
            x: 0.6318485532672071,
            y: 0.41272479331799194,
          },
        },
        sousTitre: 'with Stéphane Legentilhomme, professional guide and competitor, and Jean-Baptiste Vidal',
        texte: null,
        titre: 'Masterclass — French Nymphing / Tight-line Nymphing',
      },
      {
        _key: 'intro450',
        _type: 'sectionIntro',
        boutons: [
          {
            _key: 'btn463',
            _type: 'bouton',
            lien: '/contact',
            texte: 'Reserve my spot',
          },
        ],
        description: null,
        eyebrow: 'Masterclass · French nymphing',
        fond: 'white',
        format: '2-day course',
        intervenant: {
          avatar: 'SL',
          bio: 'Stéphane will teach you his tight-line nymphing method and his approach to this technique: building a leader, nymph insertion, line control, effective drifts, nymph selection, optimising your position and movement on the river.',
          nom: 'Stéphane Legentilhomme',
          titre: 'Fly fishing guide in the Ariège · Competitive fly fisher',
        },
        lignesSupp: [
          {
            _key: 'li457',
            _type: 'ligneInfo',
            label: 'Session 1',
            valeur: '20 & 21 Mars 2026',
          },
          {
            _key: 'li458',
            _type: 'ligneInfo',
            label: 'Session 2',
            valeur: '22 & 23 Mars 2026',
          },
          {
            _key: 'li459',
            _type: 'ligneInfo',
            label: 'Participants',
            valeur: '4 personnes par session',
          },
          {
            _key: 'li460',
            _type: 'ligneInfo',
            label: 'Level',
            valeur: 'Beginners and experienced anglers',
          },
          {
            _key: 'li461',
            _type: 'ligneInfo',
            label: 'Location',
            valeur: 'River Odet · Quimper (29)',
          },
          {
            _key: 'li462',
            _type: 'ligneInfo',
            label: 'Included',
            valeur: 'Accommodation, full board',
          },
        ],
        niveau: 'Beginners and experienced anglers',
        showInfoCard: true,
        tarif: '800 € / pers.',
        texte: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                marks: [],
                text: 'At the start of the 2026 season, I am offering two Masterclasses for my students to give them access to a highly focused course on tight-line nymphing techniques.',
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
                text: "The idea is to pool the skills of an expert and my own experience to deliver very technical content. This is a course not to be missed — the level of skill you will gain is simply exceptional and allows you to progress far more quickly.",
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
                text: 'Come and benefit from the expertise of two professionals during a 2-day course on the banks of the River Odet in Quimper. Two sessions are available in March 2026, with 4 participants per session for optimal tuition.',
              },
            ],
            style: 'normal',
          },
        ],
        titre: 'Master tight-line nymphing with Jean-Baptiste Vidal',
      },
      {
        _key: 'progt464',
        _type: 'sectionProgrammeTexte',
        colonnes: [
          {
            _key: 'col465',
            _type: 'colonne',
            items: [
              {
                _key: 'item466',
                _type: 'item',
                inclus: true,
                texte: 'Welcome of participants at the B&B in the evening',
              },
              {
                _key: 'item467',
                _type: 'item',
                inclus: true,
                texte: 'Theory session on tight-line nymphing techniques with Stéphane Legentilhomme',
              },
              {
                _key: 'item468',
                _type: 'item',
                inclus: true,
                texte: 'Casting workshop on the banks of the River Odet',
              },
              {
                _key: 'item469',
                _type: 'item',
                inclus: true,
                texte: 'Practical session and river fishing supervised by both instructors',
              },
              {
                _key: 'item470',
                _type: 'item',
                inclus: true,
                texte: 'Evening: debrief, Q&A, Day 2 programme',
              },
              {
                _key: 'item471',
                _type: 'item',
                inclus: true,
                texte: 'Nymph tying demonstration by Stéphane',
              },
            ],
            label: 'Day 1',
            style: 'normal',
          },
          {
            _key: 'col472',
            _type: 'colonne',
            items: [
              {
                _key: 'item473',
                _type: 'item',
                inclus: true,
                texte: 'Additional theory session if needed',
              },
              {
                _key: 'item474',
                _type: 'item',
                inclus: true,
                texte: "Review of the previous day's key points",
              },
              {
                _key: 'item475',
                _type: 'item',
                inclus: true,
                texte: 'Practical session and fishing: each participant will spend time with both instructors',
              },
              {
                _key: 'item476',
                _type: 'item',
                inclus: true,
                texte: 'Final debrief and Q&A',
              },
              {
                _key: 'item477',
                _type: 'item',
                inclus: true,
                texte: 'End of course and departure of participants',
              },
            ],
            label: 'Day 2',
            style: 'normal',
          },
          {
            _key: 'col478',
            _type: 'colonne',
            items: [
              {
                _key: 'item479',
                _type: 'item',
                inclus: true,
                texte: 'Building a leader and tippets',
              },
              {
                _key: 'item480',
                _type: 'item',
                inclus: true,
                texte: 'Nymph insertion concepts',
              },
              {
                _key: 'item481',
                _type: 'item',
                inclus: true,
                texte: 'Line control and effective drifts',
              },
              {
                _key: 'item482',
                _type: 'item',
                inclus: true,
                texte: 'Choosing nymphs according to the season and the spot',
              },
              {
                _key: 'item483',
                _type: 'item',
                inclus: true,
                texte: 'Optimising your position and movement on the river',
              },
              {
                _key: 'item484',
                _type: 'item',
                inclus: true,
                texte: 'Netting fish and prospecting strategy',
              },
            ],
            label: 'Techniques covered',
            style: 'normal',
          },
          {
            _key: 'col485',
            _type: 'colonne',
            items: [
              {
                _key: 'item486',
                _type: 'item',
                inclus: true,
                texte: 'Accommodation & full-board meals',
              },
              {
                _key: 'item487',
                _type: 'item',
                inclus: true,
                texte: 'Instruction by Stéphane Legentilhomme & JBV',
              },
              {
                _key: 'item488',
                _type: 'item',
                inclus: true,
                texte: 'Individual room for each participant',
              },
              {
                _key: 'item489',
                _type: 'item',
                inclus: false,
                texte: 'Liability insurance (to be arranged)',
              },
              {
                _key: 'item490',
                _type: 'item',
                inclus: false,
                texte: 'National fishing licence',
              },
              {
                _key: 'item491',
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
        titre: 'Course programme',
      },
      {
        _key: 'ti492',
        _type: 'sectionTexteImage',
        description: null,
        distances: [
          '72 km de Brest',
          ' 122 km de Vannes ',
          '222 km de Rennes',
          ' 229 km de St Malo ',
          '573 km de Paris',
        ],
        eyebrow: 'The Odet — Quimper',
        fond: 'white',
        image: {
          _type: 'image',
          alt: 'River Odet in Quimper — venue for the tight-line nymphing course',
          asset: {
            _ref: 'image-c2089f5a0507560cf6fdaa660e0947089055147a-405x367-jpg',
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
                text: 'The course takes place on the banks of the River Odet in the commune of Quimper in Finistère (29), in a gorge section offering a varied stretch of river perfect for tight-line nymphing.',
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
                text: 'Participants are accommodated in a charming bed & breakfast in Elliant in Finistère, 300 m from the River Odet. Comfortable and spacious individual rooms with a warm shared common room.',
              },
            ],
            style: 'normal',
          },
        ],
        texteImageUrl: null,
        titre: 'Course venue',
      },
      {
        _key: 'gal499',
        _type: 'sectionGalerie',
        colonnes: '3',
        description: null,
        fond: 'dark',
        photos: [
          {
            _key: 'uiHvi6D42M2uHwe3EWEs6Q',
            _type: 'image',
            asset: {
              _ref: 'image-5e2eb3ae6adcf04deb773e181de95fa9f337bba5-499x374-jpg',
              _type: 'reference',
            },
          },
          {
            _key: 'uiHvi6D42M2uHwe3EWEsBG',
            _type: 'image',
            asset: {
              _ref: 'image-109dedf03bcc1b06a3fb73eecfbe4725ffe9db96-405x304-jpg',
              _type: 'reference',
            },
          },
          {
            _key: 'uiHvi6D42M2uHwe3EWEsG6',
            _type: 'image',
            asset: {
              _ref: 'image-9ed55a82a80dede19378a2ef1b909562a8aa0409-405x304-jpg',
              _type: 'reference',
            },
          },
          {
            _key: 'uiHvi6D42M2uHwe3EWEsKw',
            _type: 'image',
            asset: {
              _ref: 'image-7752a927d7243815619835c7dbb75a1bda3a11a5-405x304-jpg',
              _type: 'reference',
            },
          },
          {
            _key: 'uiHvi6D42M2uHwe3EWEsPm',
            _type: 'image',
            asset: {
              _ref: 'image-a8f387cdb7ef60388bd6b23ed44ed76bcc9a97d4-405x304-jpg',
              _type: 'reference',
            },
          },
          {
            _key: 'uiHvi6D42M2uHwe3EWEsUc',
            _type: 'image',
            asset: {
              _ref: 'image-a32ab5f3dcf83e0876c1c0e253ef379327a1e309-1400x1050-jpg',
              _type: 'reference',
            },
          },
        ],
        texte: null,
      },
      {
        _key: 'cta500',
        _type: 'sectionCta',
        btn1Lien: '/contact',
        btn1Texte: 'Contact me',
        btn2Lien: 'tel:0687303456',
        btn2Texte: '06 87 30 34 56',
        description: null,
        style: 'dark',
        texte: null,
        titre: 'Limited spots — 4 participants per session',
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
console.log('Batch 1 done.')
