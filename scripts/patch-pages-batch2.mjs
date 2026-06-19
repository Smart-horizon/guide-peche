import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config()

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function patch(id, data) {
  await client.patch(id).set(data).commit()
  console.log('✓', id)
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. page-materiel-jeanbaptistevidal
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-materiel-jeanbaptistevidal', {
  seoTitleEn: 'Fly Fishing Gear — Jean-Baptiste Vidal, Brittany Guide',
  seoDescriptionEn:
    'SAGE & Redington rods, RIO & Royal Wulff lines, Loon accessories — the gear used by Jean-Baptiste Vidal, 33 years of fly fishing experience.',
  pagebuilderEn: [
    {
      _key: 'hero-1-1mll97',
      _type: 'sectionHero',
      description: null,
      eyebrow: 'Gear · Recommendations · Partners',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-14106cb0a0bc96157cb14c711567f16a097f5a61-1600x1067-jpg',
          _type: 'reference',
        },
      },
      label1: 'Book a trip',
      label2: '06 87 30 34 56',
      lien1: '/contact',
      lien2: 'tel:0687303456',
      sousTitre:
        'The gear I use for fishing in France and abroad — 33 years of experience to guide your choices',
      texte: null,
      titre: 'My fly fishing gear',
    },
    {
      _key: 'mati-8-1a1cxq',
      _type: 'sectionMaterielIntro',
      description: null,
      specs: [
        {
          _key: 'sp-d-m18ep',
          label: 'Rods',
          valeur: 'SAGE · Redington',
        },
        {
          _key: 'sp-e-vj2ni',
          label: 'Lines',
          valeur: 'RIO · Royal Wulff',
        },
        {
          _key: 'sp-f-3zo38',
          label: 'Accessories',
          valeur: 'Loon Outdoors · Adams Built',
        },
        {
          _key: 'sp-g-19297o',
          label: 'Dealer',
          valeur: 'Ardent Pêche, Pontivy',
        },
        {
          _key: 'sp-h-zhxu6',
          label: 'Contact',
          valeur: '06 87 30 34 56',
        },
      ],
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'After more than 33 years of fly fishing and 21 years of professional guiding in France and around the world, I have tested and selected the gear I rely on every day.',
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
              text: 'I work in partnership with brands that share my values: SAGE, Redington, RIO, Royal Wulff, Loon Outdoors, Adams Built. I only recommend what I personally use.',
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
              text: 'Browse my recommendations below, organised by fishing type, with links to my trusted dealer Ardent Pêche in Pontivy.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'hub-9-1cfopf',
      _type: 'sectionGrilleSubPages',
      cartes: [
        {
          _key: 'c-i-i3ev9',
          description:
            'Spey rods, Skagit lines and heads for migratory fish in Brittany.',
          image: {
            _type: 'image',
            alt: 'Migratory fish fly fishing gear',
            asset: {
              _ref: 'image-695fe8e2624442264ee3cadbff557d0a7efa7954-1600x1067-jpg',
              _type: 'reference',
            },
          },
          tag: 'Salmon · Shad',
          titre: 'Migratory fish gear',
          url: '/materiel-mouche-migrateur',
        },
        {
          _key: 'c-j-peexy',
          description:
            'Light lines and fine rods for river and reservoir trout fishing.',
          image: {
            _type: 'image',
            alt: 'Trout fly fishing gear',
            asset: {
              _ref: 'image-aa46cebe15c0661e217ff507f855d380f44d36cb-1600x1067-jpg',
              _type: 'reference',
            },
          },
          tag: 'Freshwater',
          titre: 'Trout gear',
          url: '/materiel-mouche-truite',
        },
        {
          _key: 'c-k-1bi7h5',
          description:
            'Powerful rods #9–12, Shooting Head lines for sea bass fly fishing.',
          image: {
            _type: 'image',
            alt: 'Sea bass fly fishing gear',
            asset: {
              _ref: 'image-b378571e93a75d944c6cec626d0691b462b4dc44-1600x1067-jpg',
              _type: 'reference',
            },
          },
          tag: 'Coast · Brittany',
          titre: 'Sea bass gear',
          url: '/materiel-mouche-bar',
        },
        {
          _key: 'c-l-1jjmaq',
          description:
            'Sinking lines and intermediate rods for reservoir trout fishing.',
          image: {
            _type: 'image',
            alt: 'Reservoir fly fishing gear',
            asset: {
              _ref: 'image-2600f13d80e1cbb09c155096cb1989052f5da67e-405x304-jpg',
              _type: 'reference',
            },
          },
          tag: 'Lake · Reservoir',
          titre: 'Reservoir gear',
          url: '/materiel-mouche-reservoir',
        },
        {
          _key: 'c-m-177oje',
          description:
            '#9–10 rods and large articulated flies for pike hunting.',
          image: {
            _type: 'image',
            alt: 'Pike fly fishing gear',
            asset: {
              _ref: 'image-37c62c20195f652ef05b06e656838d094c26f9f8-1400x933-jpg',
              _type: 'reference',
            },
          },
          tag: 'Freshwater',
          titre: 'Pike gear',
          url: '/materiel-mouche-brochet',
        },
        {
          _key: 'c-n-1j4xbj',
          description:
            'Tropical gear for warm-water species: tarpon, permit, GT.',
          image: {
            _type: 'image',
            alt: 'Exotic fly fishing gear',
            asset: {
              _ref: 'image-905803c7996f6682ed06e61efb5d8b2194b72a86-1600x1067-jpg',
              _type: 'reference',
            },
          },
          tag: 'International',
          titre: 'Exotic gear',
          url: '/materiel-mouche-peche-exotique',
        },
      ],
      description: null,
      eyebrow: 'By fishing type',
      fond: 'sand',
      texte: null,
      titre: 'Choose your gear',
    },
    {
      _key: 'part-a-i7we4',
      _type: 'sectionPartenaires',
      description: null,
      eyebrow: 'My partners',
      fond: 'white',
      texte: null,
      titre: 'The brands I use and recommend',
    },
    {
      _key: 'carr-b-13v1uk',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        {
          _key: 'img-o-10m5vk',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-562186650c43f1c1d9e78d402a10f965d398697b-1600x1120-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-p-11hdeb',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-7c085728bbaf0a4f1ebaf5d0ed34c331aab3f0d5-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-q-sf3qt',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-bcbdfec80387b63c6f4516c2cd6bda93d6f7c1d7-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-r-kq6nq',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-14106cb0a0bc96157cb14c711567f16a097f5a61-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'cta-c-ektrd',
      _type: 'sectionCta',
      description: null,
      fond: 'dark',
      label1: 'Contact me',
      label2: '06 87 30 34 56',
      lien1: '/contact',
      lien2: 'tel:0687303456',
      sousTitre:
        'Jean-Baptiste advises you on the best equipment for your style of fishing.',
      texte: null,
      titre: 'Questions about gear?',
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. page-materiel-mouche-bar
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-materiel-mouche-bar', {
  seoTitleEn: 'Sea Bass Fly Fishing Gear — Jean-Baptiste Vidal',
  seoDescriptionEn:
    'Powerful rods, lines and flies for sea bass fly fishing in Brittany. SAGE R8 Salt, SAGE Maverick, RIO Striper lines.',
  pagebuilderEn: [
    {
      _key: 'hero-s-1k1gfk',
      _type: 'sectionHero',
      description: null,
      eyebrow: 'Sea Bass · Saltwater · Estuaries',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-b378571e93a75d944c6cec626d0691b462b4dc44-1600x1067-jpg',
          _type: 'reference',
        },
      },
      label1: 'Sea bass fly fishing',
      label2: '← All gear',
      lien1: '/peche-du-bar-a-la-mouche',
      lien2: '/materiel-jeanbaptistevidal',
      sousTitre:
        'Heavy rods #8–10, sealed reels and RIO Striper lines for sea bass fly fishing in Brittany',
      texte: null,
      titre: 'Sea bass fly fishing gear',
    },
    {
      _key: 'mati-1b-pl4e2',
      _type: 'sectionMaterielIntro',
      description: null,
      specs: [
        {
          _key: 'sp-1m-jb0mu',
          label: 'Target species',
          valeur: 'Sea bass (European bass · Dicentrarchus labrax)',
        },
        {
          _key: 'sp-1n-fftgo',
          label: 'Fishing grounds',
          valeur: 'Estuaries · Rocky coasts · River mouths · Beaches',
        },
        {
          _key: 'sp-1o-apmm3',
          label: 'Recommended rods',
          valeur: 'SAGE R8 Salt · SAGE Maverick · Redington Predator',
        },
        {
          _key: 'sp-1p-vo82k',
          label: 'Lines',
          valeur: 'Rio Striper floating · intermediate · sinking',
        },
        {
          _key: 'sp-1q-1l4m7g',
          label: 'Reels',
          valeur: 'SAGE Spectrum · SAGE 2280 · Redington Behemoth',
        },
        {
          _key: 'sp-1r-1ym93',
          label: 'Line weights',
          valeur: '#8 to #10 depending on conditions',
        },
      ],
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Sea bass fly fishing in Brittany is a demanding discipline, fully exposed to marine conditions. Gear must be robust and corrosion-resistant.',
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
              text: 'Rods',
            },
          ],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'SAGE R8 Salt 9ft #8 — sight fishing in calm conditions. SAGE Maverick 9ft #9 — boat fishing and strong wind. Redington Predator 9ft #9 — outstanding value for money.',
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
              text: 'Reels',
            },
          ],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'SAGE Spectrum — precise drag. SAGE 2280 — sturdy, size 7/8. Redington Behemoth 7/8 — powerful and affordable.',
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
              text: 'Lines',
            },
          ],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Rio Striper floating — surface and shallow water. Rio Striper intermediate — covers 90% of estuary situations. Rio Striper sinking — deep holes.',
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
              text: 'Leader',
            },
          ],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Fluorocarbon 27 lb to 40 lb depending on the method. Length 1.5 to 2 m.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'Sea bass fly fishing gear in Brittany',
    },
    {
      _key: 'equi-1c-yx66y',
      _type: 'sectionEquipement',
      description: null,
      fond: 'sand',
      items: [
        {
          _key: 'it-1s-mddok',
          description:
            'Gurglers, poppers, sliders — visual takes in shallow estuaries and sand flats.',
          labelLien: null,
          lien: null,
          titre: 'Surface flies',
        },
        {
          _key: 'it-1t-17om3d',
          description:
            'Sand eel and whitebait imitations. Colours: white/chartreuse, white/olive, white/blue. Sizes 2/0 to 3/0.',
          labelLien: null,
          lien: null,
          titre: 'Streamers',
        },
        {
          _key: 'it-1u-154ahf',
          description:
            'Fluorescent shrimps and crabs, weighted Clouser Minnows, squirmies. Effective on rocky marks.',
          labelLien: null,
          lien: null,
          titre: 'Bottom flies',
        },
      ],
      texte: null,
      titre: 'Flies for sea bass',
    },
    {
      _key: 'carr-1d-1h6o1a',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        {
          _key: 'img-1v-1csgjj',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-b378571e93a75d944c6cec626d0691b462b4dc44-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-1w-14snzt',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-c377670db284a54b573bb0da8aabe15883cc5cec-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-1x-17xo3p',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-d44226ab12caee1d7e241b6b76a4ef48a1aea667-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'nav-1k-1hnshq',
      _type: 'sectionMaterielNav',
      description: null,
      fond: 'sand',
      liens: [
        {
          _key: 'nl-1e-h4haa',
          label: 'Migratory fish gear',
          url: '/materiel-mouche-migrateur',
        },
        {
          _key: 'nl-1f-1793fe',
          label: 'Trout gear',
          url: '/materiel-mouche-truite',
        },
        {
          _key: 'nl-1h-rbmjj',
          label: 'Reservoir gear',
          url: '/materiel-mouche-reservoir',
        },
        {
          _key: 'nl-1i-bf9kv',
          label: 'Pike gear',
          url: '/materiel-mouche-brochet',
        },
        {
          _key: 'nl-1j-1firn1',
          label: 'Exotic gear',
          url: '/materiel-mouche-peche-exotique',
        },
      ],
      texte: null,
    },
    {
      _key: 'cta-1l-1jlljw',
      _type: 'sectionCta',
      description: null,
      fond: 'dark',
      label1: 'View options',
      label2: '06 87 30 34 56',
      lien1: '/peche-du-bar-a-la-mouche',
      lien2: 'tel:0687303456',
      sousTitre:
        'Sight fishing for sea bass, beginner and advanced sessions in South Brittany.',
      texte: null,
      titre: 'Sea bass fly fishing trip',
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// 3. page-materiel-mouche-brochet
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-materiel-mouche-brochet', {
  seoTitleEn: 'Pike Fly Fishing Gear — Jean-Baptiste Vidal',
  seoDescriptionEn:
    'Powerful rods, lines and big flies for pike fly fishing. SAGE Payload, Rio Elite Predator — Jean-Baptiste Vidal\'s recommendations.',
  pagebuilderEn: [
    {
      _key: 'hero-23-blvw5',
      _type: 'sectionHero',
      description: null,
      eyebrow: 'Gear · Pike · Predator',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-766a95dd101d1c57fe729d06c1844b7d41196b4e-960x666-avif',
          _type: 'reference',
        },
      },
      label1: 'Pike fly fishing',
      label2: '← All gear',
      lien1: '/peche-du-brochet-a-la-mouche',
      lien2: '/materiel-jeanbaptistevidal',
      sousTitre:
        '#9–10 weight rods, predator lines and large bulky flies for big pike in lakes and ponds',
      texte: null,
      titre: 'Pike fly fishing gear',
    },
    {
      _key: 'equi-24-ez7xc',
      _type: 'sectionEquipement',
      description: null,
      eyebrow: 'Recommended gear',
      fond: 'sand',
      items: [
        {
          _key: 'it-2f-d26jq',
          description:
            'SAGE Payload — purpose-built for large flies, open-loop action. SAGE Maverick — powerful and versatile.',
          labelLien: 'Buy the SAGE Payload at Ardent →',
          lien: 'https://www.ardentflyfishing.com/fr/p/28552-canne-a-mouche-sage-payload-89-soie-9.html',
          titre: 'The rod, #9 to #10 weight',
        },
        {
          _key: 'it-2g-902gt',
          description:
            'Rio Elite Predator — short head, optimised profile in wind. 3 densities: floating / intermediate / fast sinking.',
          labelLien: 'Buy the Rio Elite Predator at Ardent →',
          lien: 'https://www.ardentflyfishing.com/fr/p/29497-soie-rio-elite-predator-wf-f.html',
          titre: 'The line, offset head',
        },
        {
          _key: 'it-2h-1m9tm3',
          description:
            '1 or 2 sections maximum. Steel or titanium wire trace required. Rio multi-strand braided wire range. Fluorocarbon 60 lb+ for smaller fish.',
          labelLien: null,
          lien: null,
          titre: 'The leader',
        },
      ],
      labelBoutique: 'Pike flies at Ardent',
      lienBoutique: 'https://www.ardentflyfishing.com/fr/c/1094-brochet',
      texte: null,
      titre: 'What to have in the box',
    },
    {
      _key: 'equi-25-w30mr',
      _type: 'sectionEquipement',
      description: null,
      eyebrow: 'Pike flies',
      fond: 'sand',
      items: [
        {
          _key: 'it-2i-1exj61',
          description:
            'Gurglers, poppers, sliders — along weed edges and under overhanging trees, spring and early summer.',
          labelLien: null,
          lien: null,
          titre: 'Surface flies',
        },
        {
          _key: 'it-2j-9sy2b',
          description:
            'Perch and roach imitations. Marabou and craft fur. Sizes 3/0 to 6/0.',
          labelLien: null,
          lien: null,
          titre: 'Imitative streamers',
        },
        {
          _key: 'it-2k-qxong',
          description:
            'Bright colours (chartreuse, orange, red/white) for coloured water. Giant Deceivers and Clousers.',
          labelLien: null,
          lien: null,
          titre: 'Attractor streamers',
        },
      ],
      labelBoutique: 'Pike flies at Ardent',
      lienBoutique: 'https://www.ardentflyfishing.com/fr/c/1094-brochet',
      texte: null,
      titre: 'Essential patterns',
    },
    {
      _key: 'carr-26-pi9sg',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        {
          _key: 'img-2l-1jkbxr',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-e22a35f965f455c10750a0811e10e69e239958e2-1218x913-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-2m-11t1bu',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-4bf833a9b9c76ea7a1fe12d9ec4ea1114be84686-1217x912-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-2n-1bq2h3',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-778459cf3b09912e9e1a17c1ff96ee19e3b7d838-1217x912-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-2o-19wjyc',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-ef5cf935164471a8f50004625787282803a9adc8-1217x912-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-2p-1a2hxa',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-0aa243d0270946b40dee32f4f38b8edc572554d8-1217x912-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-2q-uc9z9',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-06c4b3e0f13bf1003efed0b22612d0df6475cda9-1217x913-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-2r-1l3f4u',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-a0678705912f5907af159ce146f1b695f63f838d-1217x912-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-2s-quw4m',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-6ab703707142fcbd2ca75324c8ee6fa6a959bbb3-1217x913-avif',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-2t-1mm6y9',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-97d302b46a333e643036feb6e26c09b1313bf4bb-1369x913-avif',
            _type: 'reference',
          },
          legende: '',
        },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'nav-2d-q6abk',
      _type: 'sectionMaterielNav',
      description: null,
      fond: 'sand',
      liens: [
        {
          _key: 'nl-27-1i53ao',
          label: 'Migratory fish gear',
          url: '/materiel-mouche-migrateur',
        },
        {
          _key: 'nl-28-7rrey',
          label: 'Trout gear',
          url: '/materiel-mouche-truite',
        },
        {
          _key: 'nl-29-15vuuh',
          label: 'Sea bass gear',
          url: '/materiel-mouche-bar',
        },
        {
          _key: 'nl-2a-eut6t',
          label: 'Reservoir gear',
          url: '/materiel-mouche-reservoir',
        },
        {
          _key: 'nl-2c-16ktb4',
          label: 'Exotic gear',
          url: '/materiel-mouche-peche-exotique',
        },
      ],
      texte: null,
    },
    {
      _key: 'cta-2e-1ncc3s',
      _type: 'sectionCta',
      description: null,
      fond: 'dark',
      label1: 'Contact me',
      label2: '06 87 30 34 56',
      lien1: '/contact',
      lien2: 'tel:0687303456',
      sousTitre:
        'Specialist pike guiding — availability and rates on request.',
      texte: null,
      titre: 'Pike fly fishing trip',
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// 4. page-materiel-mouche-truite
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-materiel-mouche-truite', {
  seoTitleEn: 'Trout Fly Fishing Gear — Jean-Baptiste Vidal, Brittany',
  seoDescriptionEn:
    'Light rods, lines and flies for river and reservoir trout fly fishing in Brittany — SAGE Sonic, SAGE DART, RIO Gold.',
  pagebuilderEn: [
    {
      _key: 'hero-6u-11djv8',
      _type: 'sectionHero',
      description: null,
      eyebrow: 'Brown Trout · Sea Trout · Reservoir',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-aa46cebe15c0661e217ff507f855d380f44d36cb-1600x1067-jpg',
          _type: 'reference',
        },
      },
      label1: 'Trout courses',
      label2: '← All gear',
      lien1: '/peche-de-la-truite-a-la-mouche-en-bretagne',
      lien2: '/materiel-jeanbaptistevidal',
      sousTitre:
        'Light rods 7 to 9 ft, RIO lines and dry flies for the rivers of Brittany',
      texte: null,
      titre: 'Trout fly fishing gear',
    },
    {
      _key: 'mati-7d-si0bk',
      _type: 'sectionMaterielIntro',
      description: null,
      specs: [
        {
          _key: 'sp-7o-18let7',
          label: 'Target species',
          valeur: 'Brown trout · Sea trout · Rainbow trout',
        },
        {
          _key: 'sp-7p-r0llm',
          label: 'Brittany rivers',
          valeur: 'Odet · Jet · Steïr · Elorn · Aven · Penzé · Queffleuth',
        },
        {
          _key: 'sp-7q-ytnom',
          label: 'Recommended rods',
          valeur: 'SAGE Sonic · SAGE TROUT LL · SAGE R8 Core · SAGE DART',
        },
        {
          _key: 'sp-7r-1jwlyb',
          label: 'Lines',
          valeur: 'Rio Gold · Rio Technical Trout · Rio Creek',
        },
        {
          _key: 'sp-7s-xvu38',
          label: 'Leader',
          valeur: '3.5 to 4.5 m, tippet 16 lb to 10 lb',
        },
      ],
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Brittany rivers: Odet, Jet, Steïr, Elorn, Ster Goz, Aven, Penzé, Queffleuth — generally small to medium-sized, often wooded.',
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
              text: 'River rods (7 to 9 ft)',
            },
          ],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'SAGE Sonic 8.6 ft #4 — versatility and precision. SAGE TROUT LL 8.6 ft #4 — ultralight, dry fly fishing. SAGE R8 Core 8.6 ft #4 — technical and precise. SAGE DART 7.6 ft #3 — small streams.',
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
              text: 'Fly lines for river trout',
            },
          ],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Rio Gold — versatile benchmark, dry fly and light nymphing. Rio Trout Intouch — sensitivity and strike detection. Rio Technical Trout Elite — for advanced anglers. Rio Creek — short distances with the SAGE DART.',
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
              text: 'Leader and tippet',
            },
          ],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Length 3.5 to 4.5 metres. Tippet 16 lb to 10 lb depending on the fly. Rio Powerflex nylon recommended.',
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
              text: 'Reservoir fishing',
            },
          ],
          style: 'h3',
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: '9 ft rods #6 to #8, SONIC range. 3 lines needed: floating / floating with intermediate tip / full sinking. Reservoirs: Drennec, Saint-Michel, Toul Dour.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'Trout fly fishing gear in Brittany',
    },
    {
      _key: 'equi-7e-ooogm',
      _type: 'sectionEquipement',
      description: null,
      fond: 'sand',
      items: [
        {
          _key: 'it-7t-18h6mo',
          description:
            'Sedges, Baetis rhodanis, March Brown, May flies. Mayfly imitations sizes 14–16, spring and early summer.',
          labelLien: null,
          lien: null,
          titre: 'Dry flies',
        },
        {
          _key: 'it-7u-157cr5',
          description:
            'Duck tail emergers, hare\'s ear patterns, Ignita imitations. Czech nymphing in fast runs and deep pools.',
          labelLien: null,
          lien: null,
          titre: 'Nymphs and emergers',
        },
        {
          _key: 'it-7v-1mbowd',
          description:
            'Streamers, sedge imitations, terrestrials (crane flies), chironomids. Boobies and weighted nymphs for deeper water.',
          labelLien: null,
          lien: null,
          titre: 'Reservoir',
        },
      ],
      texte: null,
      titre: 'Flies for trout',
    },
    {
      _key: 'carr-7f-159akt',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        {
          _key: 'img-7w-t6iej',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-aa46cebe15c0661e217ff507f855d380f44d36cb-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-7x-188cgr',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-51b337250b55c81dd81a5c543bedaf47593ea345-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-7y-rjtnj',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-5317e097fe0b3ee123a4e80f7d3764aa3b340ec6-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-7z-j2na8',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-b4d0011f53f3fa2ecb40ab6f6e38233c9e56ca4a-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'nav-7m-1fbefr',
      _type: 'sectionMaterielNav',
      description: null,
      fond: 'sand',
      liens: [
        {
          _key: 'nl-7g-1idilm',
          label: 'Migratory fish gear',
          url: '/materiel-mouche-migrateur',
        },
        {
          _key: 'nl-7i-1ezdca',
          label: 'Sea bass gear',
          url: '/materiel-mouche-bar',
        },
        {
          _key: 'nl-7j-1lb6ny',
          label: 'Reservoir gear',
          url: '/materiel-mouche-reservoir',
        },
        {
          _key: 'nl-7k-1dxak8',
          label: 'Pike gear',
          url: '/materiel-mouche-brochet',
        },
        {
          _key: 'nl-7l-192zsu',
          label: 'Exotic gear',
          url: '/materiel-mouche-peche-exotique',
        },
      ],
      texte: null,
    },
    {
      _key: 'cta-7n-1hir6b',
      _type: 'sectionCta',
      description: null,
      fond: 'dark',
      label1: 'Contact me',
      label2: '06 87 30 34 56',
      lien1: '/contact',
      lien2: 'tel:0687303456',
      sousTitre:
        'Beginner and advanced trout fly fishing courses in Brittany.',
      texte: null,
      titre: 'Book your trout course',
    },
  ],
})

console.log('\nAll 4 patches applied successfully.')
