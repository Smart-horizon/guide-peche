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
// 1. page-materiel-mouche-migrateur
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-materiel-mouche-migrateur', {
  seoTitleEn: 'Migratory Fish Fly Fishing Gear — Jean-Baptiste Vidal',
  seoDescriptionEn:
    'Spey rods, Scandi/Skagit heads, polyleaders and flies for salmon, shad and sea trout on Brittany rivers. Gear guide by Jean-Baptiste Vidal.',
  pagebuilderEn: [
    {
      _key: 'hero-2z-ewlz3',
      _type: 'sectionHero',
      description: null,
      eyebrow: 'Salmon · Shad · Sea Trout',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-695fe8e2624442264ee3cadbff557d0a7efa7954-1600x1067-jpg',
          _type: 'reference',
        },
      },
      label1: 'Spey Casting Courses',
      label2: '← All Gear',
      lien1: '/stage-spey-cast-et-cours-de-lancer',
      lien2: '/materiel-jeanbaptistevidal',
      sousTitre:
        'Two-handed Spey rods, shooting heads, polyleaders and flies tailored to Brittany rivers',
      texte: null,
      titre: 'Gear for Migratory Fish Fly Fishing',
    },
    {
      _key: 'mati-3g-1j92k0',
      _type: 'sectionMaterielIntro',
      description: null,
      specs: [
        {
          _key: 'sp-3r-wehvp',
          label: 'Target species',
          valeur: 'Atlantic salmon · Shad · Sea trout',
        },
        {
          _key: 'sp-3s-1c0eyg',
          label: 'Brittany rivers',
          valeur: 'Ellé · Scorff · Aulne · Blavet · Léguer · Elorn · Aven',
        },
        {
          _key: 'sp-3t-rykjm',
          label: 'Recommended rods',
          valeur: 'SAGE R8 Spey · SAGE SONIC · Redington Claymore',
        },
        {
          _key: 'sp-3u-1ae3xd',
          label: 'Lines',
          valeur: 'Shooting Head · Skagit · Scandi · WF',
        },
        {
          _key: 'sp-3v-upb0i',
          label: 'Versileaders',
          valeur: 'RIO 6, 10, 12, 15 ft — 4 densities',
        },
      ],
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Small and medium rivers',
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
              text: 'Single-handed rod 9–10 ft #8 for spring salmon. 9 ft rod #6–7 for smaller fish mid-season. Rivers: Elorn, Aven, Penzé, Goyen, Odet.',
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
              text: 'Medium and large rivers — Spey rods',
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
              text: 'SAGE R8 Spey or SAGE SONIC — two-handed 12–13 ft #7–8. REDINGTON CLAYMORE — excellent value for money. Rivers: Ellé, Scorff, Léguer, Aulne, Blavet.',
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
              text: 'Fly lines for Spey casting',
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
              text: 'Shooting Head (SH) — 10–15 m head, long-distance casts. Scandi — 8–10 m head, nymphs and light flies. Skagit — ~6 m head, heavy flies and sinking tips. WF medium — narrow rivers.',
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
              text: 'Versileaders and polyleaders',
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
              text: 'RIO versileaders or polyleaders in sizes 6, 10, 12, 15 ft. 4 densities: floating, intermediate, slow-sinking, fast-sinking.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'Gear for Migratory Fish in Brittany',
    },
    {
      _key: 'equi-3h-kwkki',
      _type: 'sectionEquipement',
      description: null,
      fond: 'sand',
      items: [
        {
          _key: 'it-3w-ko5za',
          description:
            "Ally's Shrimp, Cascade, orange patterns early season. Dark flies in clear water. Green Highlander, Gary Dog. Tube flies growing in popularity.",
          labelLien: null,
          lien: null,
          titre: 'Salmon',
        },
        {
          _key: 'it-3x-1gdbem',
          description:
            'Light, bright flies, sizes 8–12. Imitations of small crustaceans, silver or copper flies on the Ellé and Aulne in spring.',
          labelLien: null,
          lien: null,
          titre: 'Shad',
        },
        {
          _key: 'it-3y-12la30',
          description:
            'Mid-season: sober, understated patterns. At night: surface flies or dark streamers.',
          labelLien: null,
          lien: null,
          titre: 'Sea Trout',
        },
      ],
      texte: null,
      titre: 'Flies for Migratory Fish',
    },
    {
      _key: 'carr-3i-18m23t',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        {
          _key: 'img-3z-1foro4',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-695fe8e2624442264ee3cadbff557d0a7efa7954-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-40-mkny3',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-1a132ebeb82f4026b98df1087d59b5d9077e705d-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-41-1ib5x8',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-56a1772369a94e347203293cb2a18596459473a4-975x649-avif',
            _type: 'reference',
          },
          legende: '',
        },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'nav-3p-pg4zm',
      _type: 'sectionMaterielNav',
      description: null,
      fond: 'sand',
      liens: [
        {
          _key: 'nl-3k-1a9ppz',
          label: 'Trout gear',
          url: '/materiel-mouche-truite',
        },
        {
          _key: 'nl-3l-1l6tj9',
          label: 'Sea bass gear',
          url: '/materiel-mouche-bar',
        },
        {
          _key: 'nl-3m-1i6pp7',
          label: 'Stillwater gear',
          url: '/materiel-mouche-reservoir',
        },
        {
          _key: 'nl-3n-j13t1',
          label: 'Pike gear',
          url: '/materiel-mouche-brochet',
        },
        {
          _key: 'nl-3o-8z4p5',
          label: 'Saltwater / exotic gear',
          url: '/materiel-mouche-peche-exotique',
        },
      ],
      texte: null,
    },
    {
      _key: 'cta-3q-9gu9h',
      _type: 'sectionCta',
      description: null,
      fond: 'dark',
      label1: 'Contact me',
      label2: '06 87 30 34 56',
      lien1: '/contact',
      lien2: 'tel:0687303456',
      sousTitre:
        'Spey casting courses, salmon and shad guided days — availability on request.',
      texte: null,
      titre: 'Book Your Migratory Fish Session',
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. page-materiel-mouche-peche-exotique
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-materiel-mouche-peche-exotique', {
  seoTitleEn: 'Saltwater & Exotic Fly Fishing Gear — Jean-Baptiste Vidal',
  seoDescriptionEn:
    'Rods, reels and flies for bonefish, permit, tarpon and dorado. SAGE R8 Salt, SAGE Maverick, SAGE Enforcer. Gear guide by Jean-Baptiste Vidal.',
  pagebuilderEn: [
    {
      _key: 'hero-47-1abds2',
      _type: 'sectionHero',
      btnMaterielLabel: 'All gear',
      btnMaterielLien: '/materiel-jeanbaptistevidal/',
      btnReserverLien: '/voyages-peche-mouche/',
      btnReserverTexte: 'Fishing trips',
      description: null,
      eyebrow: 'Bonefish · Permit · Tarpon · Dorado',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-905803c7996f6682ed06e61efb5d8b2194b72a86-1600x1067-jpg',
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
          height: 0.5908974686780875,
          width: 1,
          x: 0.5,
          y: 0.379996590812239,
        },
      },
      label1: 'Fishing trips',
      label2: '← All gear',
      lien1: '/voyages-peche-mouche',
      lien2: '/materiel-jeanbaptistevidal',
      sousTitre:
        'High-performance equipment for major fly fishing expeditions: Cuba, Venezuela, Argentina, Mexico',
      texte: null,
      titre: 'Saltwater & Exotic Fly Fishing Gear',
    },
    {
      _key: 'mati-4q-5x5dx',
      _type: 'sectionMaterielIntro',
      description: null,
      fond: 'white',
      specs: [
        {
          _key: 'sp-56-18y24d',
          label: 'Target species',
          valeur: 'Bonefish · Permit · Tarpon · Dorado · GT',
        },
        {
          _key: 'sp-57-92905',
          label: 'Destinations',
          valeur: 'Cuba · Venezuela · Argentina · Mexico · Bolivia',
        },
        {
          _key: 'sp-58-ocvim',
          label: 'Rods',
          valeur: 'SAGE R8 Salt · SAGE Maverick · SAGE XI3',
        },
        {
          _key: 'sp-59-1cpkn9',
          label: 'Reels',
          valeur: 'SAGE Enforcer · Redington Grande',
        },
        {
          _key: 'sp-5a-yifm1',
          label: 'Line weights',
          valeur: '#8 bonefish · #9–10 permit/dorado · #10–12 tarpon',
        },
      ],
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'After fishing in more than 20 countries, I have refined my kit for each species. Heat, humidity, powerful fish and corrosive saltwater demand gear without compromise.',
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
              text: 'Bonefish',
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
              text: "SAGE R8 SALT 9 ft #8 — accuracy on moving fish. SAGE MAVERICK 9 ft #8 — tough in wind. Reel: SAGE ENFORCER or Redington Grande. Flies: shrimp, crabs, Mini-Puf, Gotcha, Crazy Charlie.",
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
              text: 'Permit',
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
              text: "9 ft rod #9 or #10. Backing: 200 m minimum. Reel: SAGE ENFORCER or Redington Grande. Flies: shrimp, crabs, Del's Merkin, Spawning Shrimp.",
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
              text: 'Tarpon',
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
              text: 'Small tarpon (2–10 kg): #8 rod. Large tarpon: SAGE XI3, SAGE R8 SALT or SAGE Maverick in #10 to #12. Flies: Black Death, Cockroach, Toad patterns.',
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
              text: 'Dorado',
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
              text: 'Smaller fish (2–5 kg): #8 rod. Larger fish (8 kg+): #9–10 rod. Steel or titanium wire leader 30 lb mandatory. Flies: Andino Deceiver, EP Baitfish, Gurglers, Poppers.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'Gear for Saltwater & Exotic Fly Fishing',
    },
    {
      _key: 'carr-4r-lmgq3',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        {
          _key: 'img-5b-1lr2yg',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-905803c7996f6682ed06e61efb5d8b2194b72a86-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-5c-p8zs0',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-35408a2d9d83252d2461c6b13bfe9ac9e3596194-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-5d-151cs9',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-a212399651a59edfdf92fcdd1cf582482c7f76bc-1600x1067-jpg',
            _type: 'reference',
          },
          legende: '',
        },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'vidS-4s-w550g',
      _type: 'sectionVideo',
      description: null,
      fond: 'sand',
      texte: null,
      titre: 'Preparing for an exotic saltwater fly fishing trip',
      url: 'https://www.youtube.com/watch?v=A9ov6VSGnVE',
    },
    {
      _key: 'c2-4x-rfavg',
      _type: 'sectionCards2',
      cards: [
        {
          _key: 'cd-4t-kay6d',
          lien: '/voyage-peche-argentine-rio-grande-truite-de-mer',
          sousTitre:
            'The Mecca of sea trout fly fishing. Rio Grande in Tierra del Fuego.',
          titre: 'Argentina — Rio Grande',
        },
        {
          _key: 'cd-4u-cgemz',
          lien: '/peche-mouche-cuba-cayo-cruz',
          sousTitre: 'Bonefish, permit and tarpon on stunning Cuban flats.',
          titre: 'Cuba — Cayo Cruz',
        },
        {
          _key: 'cd-4v-pnljh',
          lien: '/los-roques-venezuela',
          sousTitre: 'A bonefish paradise with giant fish in a dream setting.',
          titre: 'Venezuela — Los Roques',
        },
        {
          _key: 'cd-4w-1941tc',
          lien: '/voyage-peche-mouche-mexique',
          sousTitre: 'Bonefish and permit in the turquoise waters of the Yucatan.',
          titre: 'Mexico',
        },
      ],
      description: null,
      eyebrow: 'Destinations',
      fond: 'sand',
      texte: null,
      titre: 'Guided Trips with Jean-Baptiste Vidal',
    },
    {
      _key: 'nav-54-1kc3l',
      _type: 'sectionMaterielNav',
      description: null,
      fond: 'sand',
      liens: [
        {
          _key: 'nl-4y-jpe8f',
          label: 'Migratory fish gear',
          url: '/materiel-mouche-migrateur',
        },
        {
          _key: 'nl-4z-1fd7xi',
          label: 'Trout gear',
          url: '/materiel-mouche-truite',
        },
        {
          _key: 'nl-50-rkilc',
          label: 'Sea bass gear',
          url: '/materiel-mouche-bar',
        },
        {
          _key: 'nl-51-2yvks',
          label: 'Stillwater gear',
          url: '/materiel-mouche-reservoir',
        },
        {
          _key: 'nl-52-g4w38',
          label: 'Pike gear',
          url: '/materiel-mouche-brochet',
        },
      ],
      texte: null,
    },
    {
      _key: 'cta-55-1ldgub',
      _type: 'sectionCta',
      description: null,
      fond: 'dark',
      label1: 'View trips',
      label2: '06 87 30 34 56',
      lien1: '/voyages-peche-mouche',
      lien2: 'tel:0687303456',
      sousTitre: 'Jean-Baptiste advises you on the best gear for your destination.',
      texte: null,
      titre: 'Plan Your Fishing Trip',
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// 3. page-materiel-mouche-reservoir
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-materiel-mouche-reservoir', {
  seoTitleEn: 'Stillwater Fly Fishing Gear — Jean-Baptiste Vidal',
  seoDescriptionEn:
    'Rods, fly lines and flies for stillwater trout fishing. SAGE Sonic, Redington Crux, RIO lines in multiple densities. Guide by Jean-Baptiste Vidal.',
  pagebuilderEn: [
    {
      _key: 'hero-5j-1c2vpx',
      _type: 'sectionHero',
      description: null,
      eyebrow: 'Rainbow Trout · Stillwater · Reservoir',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-2600f13d80e1cbb09c155096cb1989052f5da67e-405x304-jpg',
          _type: 'reference',
        },
      },
      label1: 'Stillwater courses',
      label2: '← All gear',
      lien1: '/peche-de-la-truite-en-reservoir',
      lien2: '/materiel-jeanbaptistevidal',
      sousTitre:
        '#6–8 rods, fly lines in 3 densities and specific patterns for stillwater trout fishing',
      texte: null,
      titre: 'Stillwater Fly Fishing Gear',
    },
    {
      _key: 'mati-62-11b2um',
      _type: 'sectionMaterielIntro',
      description: null,
      specs: [
        {
          _key: 'sp-6d-13pf4z',
          label: 'Target species',
          valeur: 'Rainbow trout · Brown trout in stillwater',
        },
        {
          _key: 'sp-6e-uxbx1',
          label: 'Brittany venues',
          valeur: 'Drennec · Saint-Michel · Toul Dour',
        },
        {
          _key: 'sp-6f-1biese',
          label: 'Recommended rods',
          valeur: 'SAGE Sonic · Redington Crux',
        },
        {
          _key: 'sp-6g-ug11g',
          label: 'Lines',
          valeur: 'Rio Gold · Rio Camolux · Rio Phantom',
        },
        {
          _key: 'sp-6h-zwo1r',
          label: 'Reels',
          valeur: 'SAGE Spectrum · SAGE 2280 · Redington Behemoth',
        },
        {
          _key: 'sp-6i-1a0528',
          label: 'Line weights',
          valeur: '#6 to #8 depending on technique',
        },
      ],
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Stillwater is the ideal training ground for improving your fly casting. Drennec, Saint-Michel, Toul Dour — cast long distances, probe different depths.',
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
              text: 'SAGE SONIC — versatile and fast, long-distance casting. REDINGTON Crux — light and precise for sight fishing on stillwater. Line weights #6 to #8.',
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
              text: 'Fly lines — 3 densities',
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
              text: 'Floating — Rio Gold or Rio Grand (surface, nymph under indicator). Intermediate — Rio Camolux (50 cm to 2 m depth, the most versatile). Sinking — Rio Phantom or Rio Outbound (deep layers).',
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
              text: 'SAGE Spectrum — precise and solid. SAGE 2280 — classic and reliable. Redington Behemoth 7/8 — powerful and affordable.',
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
              text: 'Leaders',
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
              text: 'Maxima Chameleon or Rio Powerflex. Tippet 12° to 22° depending on the fishing method.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'Gear for Stillwater Fly Fishing',
    },
    {
      _key: 'equi-63-bejea',
      _type: 'sectionEquipement',
      description: null,
      fond: 'sand',
      items: [
        {
          _key: 'it-6j-1lz1e1',
          description:
            'Sedges, crane flies (daddy long legs), chironomids on the surface. Highly effective in the evening during summer hatches.',
          labelLien: null,
          lien: null,
          titre: 'Dry flies & emergers',
        },
        {
          _key: 'it-6k-1iu8z0',
          description:
            'Chironomid nymphs, sedge nymphs, buzzers. Suspended nymph fishing under an indicator. Weighted nymph for cold water.',
          labelLien: null,
          lien: null,
          titre: 'Nymphs',
        },
        {
          _key: 'it-6l-19hjxo',
          description:
            'Streamers imitating fry. Boobies (fished head-down) devastating on fast-sinking lines.',
          labelLien: null,
          lien: null,
          titre: 'Streamers & boobies',
        },
      ],
      texte: null,
      titre: 'Flies for Stillwater',
    },
    {
      _key: 'carr-64-brxao',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        {
          _key: 'img-6m-ptsfb',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-2600f13d80e1cbb09c155096cb1989052f5da67e-405x304-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-6n-4rrtm',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-a1c6140f257004a2dfff95f638e263b018ef1db4-499x374-jpg',
            _type: 'reference',
          },
          legende: '',
        },
        {
          _key: 'img-6o-ygx99',
          _type: 'image',
          alt: '',
          asset: {
            _ref: 'image-94e161fe22c2b19c794e3ca9873abb12775bef7f-405x367-jpg',
            _type: 'reference',
          },
          legende: '',
        },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'nav-6b-4wsx6',
      _type: 'sectionMaterielNav',
      description: null,
      fond: 'sand',
      liens: [
        {
          _key: 'nl-65-1f5d7z',
          label: 'Migratory fish gear',
          url: '/materiel-mouche-migrateur',
        },
        {
          _key: 'nl-66-mmnsf',
          label: 'Trout gear',
          url: '/materiel-mouche-truite',
        },
        {
          _key: 'nl-67-8salw',
          label: 'Sea bass gear',
          url: '/materiel-mouche-bar',
        },
        {
          _key: 'nl-69-1gm6fc',
          label: 'Pike gear',
          url: '/materiel-mouche-brochet',
        },
        {
          _key: 'nl-6a-1jpr6m',
          label: 'Saltwater / exotic gear',
          url: '/materiel-mouche-peche-exotique',
        },
      ],
      texte: null,
    },
    {
      _key: 'cta-6c-y02yj',
      _type: 'sectionCta',
      description: null,
      fond: 'dark',
      label1: 'View masterclass',
      label2: '06 87 30 34 56',
      lien1: '/master-class-peche-en-reservoir',
      lien2: 'tel:0687303456',
      sousTitre: 'Progress quickly with a full-day stillwater masterclass.',
      texte: null,
      titre: 'Stillwater Masterclass',
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// 4. page-partenaires-jeanbaptistevidal
// ─────────────────────────────────────────────────────────────────────────────
await patch('page-partenaires-jeanbaptistevidal', {
  seoTitleEn: 'Partners & Sponsors — Jean-Baptiste Vidal, Fly Fishing Guide',
  seoDescriptionEn:
    "Discover the brands and partners that support Jean-Baptiste Vidal: SAGE, SIMMS, RIO, Costa del Mar, DHD LAIKA and more. Gear he uses every day in the field.",
  pagebuilderEn: [
    {
      _key: 'part-hero',
      _type: 'sectionHero',
      btnReserverLien: '/contact',
      btnReserverTexte: 'Book a guided day',
      description: null,
      eyebrow: 'Gear · Partners · Trips',
      hauteur: 'medium',
      sousTitre:
        'Partnerships built on trust and high standards: the brands I use every day in the field, in Brittany and abroad.',
      texte: null,
      titre: 'My Partners',
    },
    {
      _key: 'part-intro',
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
              text: 'Over the years I have built strong partnerships with brands that share my approach to fly fishing: uncompromising gear, respect for natural environments and a passion for wild fish. Below you will find all the brands and organisations I work with, from the equipment I use daily to the agency that organises my exotic fishing trips.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'part-grid',
      _type: 'sectionPartenaires',
      description: null,
      fond: 'white',
      texte: null,
    },
    {
      _key: 'part-cta',
      _type: 'sectionCta',
      btn1Lien: '/contact',
      btn1Texte: 'Book a guided day',
      btn2Lien: '/materiel-jeanbaptistevidal',
      btn2Texte: 'View all gear',
      description: null,
      style: 'dark',
      texte: null,
      titre: 'Try the Gear in the Field with Me',
    },
  ],
})

console.log('\nAll 4 patches applied successfully.')
