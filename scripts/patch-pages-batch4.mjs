import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config()

const client = createClient({
  projectId: 'uievv97s', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function patch(id, data) {
  await client.patch(id).set(data).commit()
  console.log('✓', id)
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. page-mouches-de-peche-jeanbaptiste-vidal
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-mouches-de-peche-jeanbaptiste-vidal', {
  seoTitleEn: 'My Fly Patterns — Jean-Baptiste Vidal, Brittany Guide',
  seoDescriptionEn:
    'Salmon flies, nymphs, sea bass streamers and shad flies — the patterns tied and used by Jean-Baptiste Vidal, fly fishing guide in Brittany.',
  pagebuilderEn: [
    {
      _key: 'hero-85-zpyc4',
      _type: 'sectionHero',
      description: null,
      eyebrow: 'Salmon · Trout · Sea Bass · Shad · Reservoir',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-733502b22a8cac5e611ae18d17f438a79ba59f61-1158x653-avif',
          _type: 'reference',
        },
      },
      label1: 'Book a guided day',
      label2: 'All gear',
      lien1: '/contact',
      lien2: '/materiel-jeanbaptistevidal',
      sousTitre:
        'I tie all my flies personally, for fishing in France and abroad. Patterns tested season after season on my rivers and estuaries in Brittany.',
      texte: null,
      titre: 'My Fly Patterns',
    },
    {
      _key: 'mati-8c-49gyy',
      _type: 'sectionMaterielIntro',
      description: null,
      specs: [
        {
          _key: 'sp-8g-fexko',
          label: 'Atlantic salmon',
          valeur: "Ally's Shrimp · Cascade · Black flies · Green Highlander",
        },
        {
          _key: 'sp-8h-d72xb',
          label: 'Trout & Reservoir',
          valeur: 'Nymphs · Chironomids · Blob · Shipman Buzzer',
        },
        {
          _key: 'sp-8i-a80pt',
          label: 'Sea bass fly fishing',
          valeur: 'Streamers · Deceivers · Clousers · Poppers',
        },
        {
          _key: 'sp-8j-ifk0n',
          label: 'Shad flies',
          valeur: 'Light silver and copper patterns',
        },
        {
          _key: 'sp-8k-t4ww8',
          label: 'Pike',
          valeur: 'Large streamers · Pike flies · Tube flies',
        },
        {
          _key: 'sp-8l-16xinf',
          label: 'Photos',
          valeur: 'All rights reserved ENJOYFISHING · JB Vidal · Erwan Balanca',
        },
      ],
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Flies — they are of course the reason we can fool and catch fish.',
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
              text: 'For all my fishing trips, whether in France or abroad, I tie every single fly myself.',
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
              text: 'Here is a selection of my salmon, trout, pike and shad flies. I will keep updating this list as I add new patterns.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'The art of fly tying',
    },
    {
      _key: 'carr-8d-1ysqs',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        {
          _key: 'img-8m-13d8ai',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-fe927439d6a54b995ed6935dfa8966758f863fec-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8n-1dg0h1',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-3490a2d7ce6851cb53479793344c619536001837-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8o-dd18y',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-733502b22a8cac5e611ae18d17f438a79ba59f61-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8p-pwjm',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-c4c88cc120744327ecec63922b510095a00588b3-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8q-39uy8',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-69bd3ab9c9adc783ba91dfb78568308878ca63b8-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8r-ajjva',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-17344cc4dc6c8f937ae548e1d2a6abef28122d10-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8s-yx2df',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-ccceac450dc1f499e8a0d9a4cd281b2db19abe21-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8t-10w3wv',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-e33d1777c5f993cb71406d918af58ddd4a7e45c6-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8u-5qjuf',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-e5ed3e03eb79b88f95ff774421c425e1cc8c36b5-1158x653-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8v-ccq0l',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-cea3926c61f510a7efb213561f664b1d8d2ee46d-927x695-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8w-16wcmg',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-482e10a74467bc23ed988a2eafbb9976ef584f38-836x497-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8x-kujd6',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-1d10cdaac1f541093e0a9aa5c9081ab7df6fa884-927x695-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8y-1b0xo8',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-39653b897e4a3acbf55fcb77b1671df75ebba98c-671x458-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-8z-1i6csm',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-203eb68a24dfbe8fcebe78fbf38df4df83524907-927x695-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-90-16o3dg',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-54db789143a25bd27f025ab8c0f9ac1438d38ec3-927x695-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-91-os5xe',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-ae91936979b2f0a14473c4d9d6913b8e649a5d2c-927x695-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-92-13qov5',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-3fe75f1bf4e7333e403fb1c46059d11e85f45ff6-927x695-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-93-10g003',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-af2f161bb4bdc9f4938d963243ad27ee4c021ff0-927x695-avif',
            _type: 'reference',
          },
          legende: '',
        },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'vid-8e-1ejapz',
      _type: 'sectionVideos',
      description: null,
      fond: 'white',
      items: [
        {
          _key: 'it-94-i67i',
          description:
            'The shad fly must be light, lively and highly visible in the current. A silver pattern used on Breton estuaries.',
          espece: 'Shad',
          titre: 'Tying a shad fly',
          youtubeId: '9x2h5ezHV1Q',
        },
        {
          _key: 'it-95-tancv',
          description:
            'Coastal streamer tied on a single hook — a sand-eel imitation effective on the estuaries and rocky headlands of Brittany.',
          espece: 'Sea bass',
          titre: 'Tying a sea bass fly',
          youtubeId: 'oPICIIxRAOs',
        },
        {
          _key: 'it-96-6v6dn',
          description:
            'Classic pattern for Atlantic salmon, adapted to Breton rivers and the coloured spring waters.',
          espece: 'Salmon',
          titre: 'Tying a salmon fly',
          youtubeId: 'lmozx1gYlrE',
        },
        {
          _key: 'it-97-1me2fh',
          description:
            'The Blob Tequila is a reliable reservoir trout pattern: bright colour, pulsating material.',
          espece: 'Reservoir',
          titre: 'Tying a Blob Tequila',
          youtubeId: 'OIY4fU5CCJY',
        },
        {
          _key: 'it-98-aws24',
          description:
            'A streamlined version of the Blob, tied in UV chenille. An essential attractor for still waters and reservoirs.',
          espece: 'Reservoir',
          titre: 'Tying a Blob',
          youtubeId: 't0f7sUPtd4k',
        },
        {
          _key: 'it-99-185seh',
          description:
            'Chironomid imitation fished on the surface as a suspended nymph in the film.',
          espece: 'Reservoir',
          titre: 'Tying a Shipman Buzzer',
          youtubeId: '_bkGYL2fT2E',
        },
        {
          _key: 'it-9a-a8hez',
          description:
            'Thorax chironomid nymph on a curved hook. The most realistic imitation during hatches.',
          espece: 'Trout',
          titre: 'Tying a Chironomid nymph',
          youtubeId: 'kfSsPhmB1NM',
        },
        {
          _key: 'it-9b-1ikp6n',
          description:
            'A variant chironomid nymph with a segmented body and dubbed thorax.',
          espece: 'Trout',
          titre: 'Tying a Chironomid nymph variant',
          youtubeId: 'YgRwUQWw5Qo',
        },
      ],
      labelChaine: 'All Enjoy Fishing videos',
      lienChaine: 'https://www.youtube.com/@EnjoyFishing29',
      texte: null,
      titre: 'Fly tying tutorials',
    },
    {
      _key: 'cta-8f-168jh2',
      _type: 'sectionCta',
      description: null,
      fond: 'dark',
      label1: 'Contact me',
      label2: '06 87 30 34 56',
      lien1: '/contact',
      lien2: 'tel:0687303456',
      sousTitre:
        'On every guided day, you benefit from my fly selections tested in real fishing conditions.',
      texte: null,
      titre: 'Guided day with the right flies',
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. page-revue-de-presse-jbvidal
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-revue-de-presse-jbvidal', {
  seoTitleEn: 'Press Coverage — Jean-Baptiste Vidal, Fly Fishing Guide',
  seoDescriptionEn:
    'Press coverage of Jean-Baptiste Vidal: articles in Pêche Mouche, Voyages de Pêche, Fly Life Australia, Field & Stream USA and other French and international publications.',
  pagebuilderEn: [
    {
      _key: 'press-hero',
      _type: 'sectionHero',
      btnReserverLien: '/contact',
      btnReserverTexte: 'Book a guided day',
      description: null,
      eyebrow: 'Pêche Mouche · Voyages de Pêche · Field & Stream · Fly Life',
      hauteur: 'medium',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-4fd9f4a36c485f1445981ce56cd0e5a0de0fe3dc-1024x673-avif',
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
          height: 0.47156277899924226,
          width: 0.47282494642006995,
          x: 0.6292679316622533,
          y: 0.3059729293432864,
        },
      },
      sousTitre:
        'Over 15 years of collaboration with specialist fishing media, in France and abroad. Technical articles, portraits, travel reports and international coverage.',
      texte: null,
      titre: 'Press Coverage',
    },
    {
      _key: 'press-stats',
      _type: 'sectionStats',
      description: null,
      fond: 'dark',
      stats: [
        {
          _key: 'stat-1',
          _type: 'stat',
          label: 'years in Pêche Mouche',
          nombre: '14+',
        },
        {
          _key: 'stat-2',
          _type: 'stat',
          label: 'international magazines',
          nombre: '4',
        },
        {
          _key: 'stat-3',
          _type: 'stat',
          label: 'international cover',
          nombre: '1',
        },
        {
          _key: 'stat-4',
          _type: 'stat',
          label: 'publication period',
          nombre: '2007–2025',
        },
      ],
      texte: null,
    },
    {
      _key: 'press-intro',
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
              text: 'From November 2011 I was a regular contributor to the magazine ',
            },
            {
              _type: 'span',
              marks: ['strong'],
              text: 'Pêche Mouche',
            },
            {
              _type: 'span',
              marks: [],
              text: ', which unfortunately ceased publication in January 2025. I contributed various articles — "fishing spots", "portraits", "Pro technique" — and for several years I created and ran the fly-tying column "Mouches du moment" (Flies of the Moment), later renamed "Votre boîte à mouches" (Your Fly Box).',
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
              text: 'I also write occasionally for the ',
            },
            {
              _type: 'span',
              marks: ['strong'],
              text: 'Voyages de Pêche',
            },
            {
              _type: 'span',
              marks: [],
              text: ' magazine, covering various trips abroad, and I have appeared in international magazines — including a cover in Australia! In recent years I also write very regularly for ',
            },
            {
              _type: 'span',
              marks: ['strong'],
              text: 'Pêche.com',
            },
            {
              _type: 'span',
              marks: [],
              text: ', where I manage the entire fly fishing section.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'press-grid',
      _type: 'sectionRevuePresse',
      description: null,
      fond: 'white',
      texte: null,
    },
    {
      _key: 'press-pechecom',
      _type: 'sectionCta',
      btn1Lien: 'https://www.peche.com/',
      btn1Texte: 'Read my articles on Pêche.com',
      btn2Lien: '',
      btn2Texte: '',
      description: null,
      style: 'sand',
      texte: null,
      titre: 'Pêche.com — The fly fishing section',
    },
    {
      _key: 'press-cta',
      _type: 'sectionCta',
      btn1Lien: '/contact-jeanbaptiste-vidal-guide-de-peche',
      btn1Texte: 'Contact me',
      btn2Lien: '/videos-jeanbaptiste-vidal-moniteur-guide-de-peche',
      btn2Texte: 'Watch the videos',
      description: null,
      style: 'dark',
      texte: null,
      titre: 'Journalists & photographers',
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// 3. page-videos-jeanbaptiste-vidal-moniteur-guide-de-peche
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-videos-jeanbaptiste-vidal-moniteur-guide-de-peche', {
  seoTitleEn: 'Fly Fishing Videos — Jean-Baptiste Vidal, Brittany',
  seoDescriptionEn:
    'Fly fishing videos from Brittany and abroad: sea bass, trout, shad, dorado. Fly tying tutorials and casting technique.',
  pagebuilderEn: [
    // Section 1 — hero
    {
      _key: 'hero293',
      _type: 'sectionHero',
      btnYoutubeLien: 'https://www.youtube.com/@jean-baptiste-vidal',
      btnYoutubeTexte: 'Subscribe to the channel',
      description: null,
      hauteur: 'full',
      texte: null,
      titre: 'My Videos',
      videoYoutubeDebut: 0,
      videoYoutubeFin: 27,
      videoYoutubeUrl: 'https://www.youtube.com/watch?v=iq9lzlg3__I&t=4s',
    },
    // Section 2 — intro text
    {
      _key: 'txt294',
      _type: 'sectionTexte',
      description: null,
      fond: 'white',
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'On this page you will find my fly fishing videos: reports from Breton estuaries, sight-fishing sessions for sea bass, fly tying tutorials and guided fishing adventures abroad. Subscribe to my YouTube channel to stay up to date.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    // Section 3 — interview Tous des Tom Sawyer
    {
      _key: 'vid1297',
      _type: 'sectionVideo',
      description: null,
      eyebrow: "Yann Nabusset's podcasts",
      fond: 'white',
      texte: null,
      titre: 'My interview on the "Tous des Tom Sawyer" channel',
      url: 'https://www.youtube.com/watch?v=X7Oh8tjakvQ',
      videoPosition: 'left',
    },
    // Section 4 — tying chironomid nymph reservoir
    {
      _key: 'vid2298',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Chironomid · Reservoir',
      fond: 'white',
      texte: null,
      titre: 'Tying a chironomid nymph for reservoir trout',
      url: 'https://www.youtube.com/watch?v=kfSsPhmB1NM&t=21s',
      videoPosition: 'right',
    },
    // Section 5 — gear for exotic fishing
    {
      _key: 'vid3299',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Gear · Exotic · Travel',
      fond: 'white',
      texte: null,
      titre: 'Gear for exotic fly fishing',
      url: 'https://www.youtube.com/watch?v=A9ov6VSGnVE',
      videoPosition: 'left',
    },
    // Section 6 — sea bass fly fishing
    {
      _key: 'vid4300',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Sea bass · Brittany',
      fond: 'white',
      texte: null,
      titre: 'Sea bass fly fishing',
      url: 'https://www.youtube.com/watch?v=iq9lzlg3__I',
      videoPosition: 'right',
    },
    // Section 7 — roll cast
    {
      _key: 'bae41b389e80',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Roll cast',
      fond: 'white',
      texte: null,
      titre: 'Learning the roll cast in fly fishing',
      url: 'https://www.youtube.com/watch?v=rKOy281vwE8',
      videoPosition: 'left',
    },
    // Section 8 — backcast
    {
      _key: '9b2709781c35',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Backcast',
      fond: 'white',
      texte: null,
      titre: 'Learning the backcast in fly fishing',
      url: 'https://www.youtube.com/watch?v=Bi5flcQmq5U',
      videoPosition: 'right',
    },
    // Section 9 — fly casting basics
    {
      _key: '3a728b17b594',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Casting basics',
      fond: 'white',
      texte: null,
      titre: 'Learning the basics of fly casting',
      url: 'https://www.youtube.com/watch?v=d1SjTIJaQFs',
      videoPosition: 'left',
    },
    // Section 10 — tying salmon fly
    {
      _key: '110b47d8a059',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Salmon fly',
      fond: 'white',
      texte: null,
      titre: 'Tying a salmon fly',
      url: 'https://www.youtube.com/watch?v=lmozx1gYlrE',
      videoPosition: 'right',
    },
    // Section 11 — salmon fly fishing Brittany
    {
      _key: 'ded714789c25',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Salmon fly fishing',
      fond: 'white',
      texte: null,
      titre: 'Salmon fly fishing in Brittany',
      url: 'https://www.youtube.com/watch?v=y2EpbTF1Bzc',
      videoPosition: 'left',
    },
    // Section 12 — tying sea bass fly
    {
      _key: 'bf0803472395',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Deceiver',
      fond: 'white',
      texte: null,
      titre: 'Tying a sea bass fly',
      url: 'https://www.youtube.com/watch?v=oPICIIxRAOs',
      videoPosition: 'right',
    },
    // Section 13 — sea bass fly fishing from boat
    {
      _key: '6a10d9e37d5e',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Sea bass from the boat',
      fond: 'white',
      texte: null,
      titre: 'Sea bass fly fishing from a "fly-only" boat in the estuary — Brittany',
      url: 'https://www.youtube.com/watch?v=Qnwlz4MA5q0',
      videoPosition: 'left',
    },
    // Section 14 — sight fishing sea bass estuary
    {
      _key: 'ec8247c910f1',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Sight fishing sea bass',
      fond: 'white',
      texte: null,
      titre: 'Sight fishing for sea bass in the estuary — Brittany',
      url: 'https://vimeo.com/256914976?fl=pl&fe=vl',
      videoPosition: 'left',
    },
    // Section 15 — tying shad fly
    {
      _key: 'd4805be070da',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Shad',
      fond: 'white',
      texte: null,
      titre: 'Tying a shad fly',
      url: 'https://www.youtube.com/watch?v=9x2h5ezHV1Q',
      videoPosition: 'right',
    },
    // Section 16 — shad fly fishing Brittany May 2016
    {
      _key: '6a6473ed6a8a',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Shad fishing',
      fond: 'white',
      texte: null,
      titre: 'Shad fly fishing in Brittany — May 2016',
      url: 'https://vimeo.com/197506448?fl=pl&fe=vl',
      videoPosition: 'left',
    },
    // Section 17 — fly fishing initiation Brittany July 2015
    {
      _key: '006547f97032',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Initiation',
      fond: 'white',
      texte: null,
      titre: 'Fly fishing introduction in Brittany — July 2015',
      url: 'https://vimeo.com/148213725?fl=pl&fe=vl',
      videoPosition: 'right',
    },
    // Section 18 — dorado Bolivian jungle
    {
      _key: 'f44bee8adacc',
      _type: 'sectionVideo',
      description: null,
      eyebrow: 'Bolivia - Dorado',
      fond: 'white',
      texte: null,
      titre: 'Dorado fishing in the Bolivian jungle',
      url: 'https://www.youtube.com/watch?v=THORv1d29Oc',
      videoPosition: 'left',
    },
    // Section 19 — CTA
    {
      _key: 'cta301',
      _type: 'sectionCta',
      btn1Lien: '/contact',
      btn1Texte: 'Contact me',
      btn2Lien: 'tel:0687303456',
      btn2Texte: '06 87 30 34 56',
      description: null,
      style: 'dark',
      texte: null,
      titre: 'Subscribe to the YouTube channel',
    },
  ],
})

console.log('All 3 patches applied successfully.')
