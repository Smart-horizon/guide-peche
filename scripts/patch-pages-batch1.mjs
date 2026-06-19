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

// ─────────────────────────────────────────────
// 1. page-bon-cadeau
// ─────────────────────────────────────────────
await patch('page-bon-cadeau', {
  seoTitleEn: 'Fly Fishing Gift Voucher in Brittany — Jean-Baptiste Vidal',
  seoDescriptionEn:
    'Give the perfect gift: a fly fishing day in Brittany with professional guide Jean-Baptiste Vidal. Sea bass, trout, shad, pike — personalised voucher from 150 €.',
  pagebuilderEn: [
    {
      _key: '1gebot80',
      _type: 'sectionHero',
      btnReserverLien: '/contact',
      btnReserverTexte: 'Request my gift voucher',
      btnTelTexte: '06 87 30 34 56',
      description: null,
      eyebrow: 'Original gift idea · South Brittany',
      hauteur: 'moyen',
      sousTitre:
        'Personalised gift voucher for a birthday, Christmas, retirement or any special occasion. Beginners or experienced anglers — Jean-Baptiste tailors every outing.',
      texte: null,
      titre: 'Give a fly fishing day in Brittany',
    },
    {
      _key: 's9484pcq',
      _type: 'sectionIntro',
      boutons: [
        {
          _key: 'xmhcz79m',
          _type: 'object',
          lien: 'tel:0687303456',
          texte: '06 87 30 34 56',
        },
        {
          _key: 'f7lg85de',
          _type: 'object',
          lien: 'mailto:enjoy.fishing@hotmail.fr',
          texte: 'enjoy.fishing@hotmail.fr',
        },
      ],
      description: null,
      duree: '7 to 8 hours (full day)',
      eyebrow: 'Gift voucher 2026',
      fond: 'white',
      lignesSupp: [
        {
          _key: '7pcgl6s7',
          _type: 'object',
          label: 'Levels',
          valeur: 'Beginners · Intermediate · Expert',
        },
        {
          _key: 'gsfvyh8l',
          _type: 'object',
          label: 'Species',
          valeur: 'Sea bass · Trout · Shad · Pike · Stillwater',
        },
        {
          _key: 'fretu9vj',
          _type: 'object',
          label: 'Area',
          valeur: 'South Brittany, Finistère · Morbihan',
        },
      ],
      showInfoCard: true,
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'For fishing enthusiasts or those wishing to discover fly fishing, a gift voucher is the perfect solution. A full day, a weekend or a multi-day stay — everything can be arranged to suit your wishes.',
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
              text: 'Give an immersive experience on the rivers, estuaries and coasts of South Brittany with Jean-Baptiste Vidal, a professional guide with 21 years of experience.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'A unique, tailor-made gift',
    },
    {
      _key: 'hrq6azl4',
      _type: 'sectionProgrammeCartes',
      colonnes: '3',
      description: null,
      eyebrow: 'The options',
      fond: 'sand',
      intro: 'All vouchers are fully customisable to suit your wishes and budget. Contact Jean-Baptiste to discuss what works best.',
      items: [
        {
          _key: '7eveiwk0',
          _type: 'object',
          description:
            'Ideal for a first fly fishing experience. Sea bass in an estuary, trout on a river or a technical introduction on a stillwater — tailored to the recipient\'s preferences.',
          sousTitre: 'For beginners',
          titre: 'Introduction & discovery',
        },
        {
          _key: 'kchwa61r',
          _type: 'object',
          description:
            'A full day alongside Jean-Baptiste on his secret spots. Technical improvement, sight fishing, reading the water... An unforgettable day on the river.',
          sousTitre: 'For passionate anglers',
          titre: 'Guided fishing day',
        },
        {
          _key: 'xlkx4yc1',
          _type: 'object',
          description:
            'Several days of guided fishing with optional accommodation and activities arranged for non-fishing companions. Sea bass by boat, Brittany rivers, stillwater — the ultimate gift for any angler.',
          sousTitre: 'The full experience',
          titre: 'Weekend or multi-day stay',
        },
      ],
      texte: null,
      titre: 'Choose your gift voucher',
    },
    {
      _key: 'ddqlzxer',
      _type: 'sectionProgrammeTexte',
      colonnes: [
        {
          _key: 'u4mowzdx',
          _type: 'object',
          items: [
            {
              _key: '3gdnx800',
              _type: 'object',
              inclus: true,
              texte: 'Professional guiding and instruction (approx. 7–8 hours)',
            },
            {
              _key: '24kthkbp',
              _type: 'object',
              inclus: true,
              texte: 'Loan of premium tackle if needed (rods, reels, fly lines)',
            },
            {
              _key: 'moq6djhc',
              _type: 'object',
              inclus: true,
              texte: 'Flies and consumable materials',
            },
            {
              _key: 'ihbjcpmd',
              _type: 'object',
              inclus: true,
              texte: 'Personalised printable JPEG gift voucher, delivered within 24 hours',
            },
            {
              _key: '4i4a6bm7',
              _type: 'object',
              inclus: true,
              texte: 'Logistical assistance on request (accommodation, restaurants…)',
            },
            {
              _key: 'u9u6c6cp',
              _type: 'object',
              inclus: true,
              texte: 'Drinks',
            },
          ],
          label: 'Included in your gift voucher',
          style: 'check',
        },
        {
          _key: 'p694jski',
          _type: 'object',
          items: [
            {
              _key: 'm9t6mhso',
              _type: 'object',
              inclus: false,
              texte: 'Fishing licence',
            },
            {
              _key: 'p1dfhjcl',
              _type: 'object',
              inclus: false,
              texte: 'Waders and wading boots',
            },
            {
              _key: '9tecusv2',
              _type: 'object',
              inclus: false,
              texte: 'Meals and food',
            },
            {
              _key: '12ppz7c7',
              _type: 'object',
              inclus: false,
              texte: 'Transport and accommodation',
            },
          ],
          label: 'Not included',
          style: 'check',
        },
      ],
      description: null,
      eyebrow: 'What\'s included',
      fond: 'white',
      texte: null,
      titre: 'What\'s included',
    },
    {
      _key: '4ga7yqe7',
      _type: 'sectionProgrammeCartes',
      colonnes: '3',
      description: null,
      eyebrow: 'Simple and fast',
      fond: 'sand',
      items: [
        {
          _key: 'rbwn6aur',
          _type: 'object',
          description:
            'Contact Jean-Baptiste by form, email or phone to tell him about your gift idea.',
          sousTitre: 'Step 1',
          titre: 'Get in touch',
        },
        {
          _key: 'b77owiix',
          _type: 'object',
          description:
            'Specify the type of session (species, duration, number of people) and check the pricing page if needed.',
          sousTitre: 'Step 2',
          titre: 'Choose the session',
        },
        {
          _key: 'iswk21mf',
          _type: 'object',
          description:
            'Provide the recipient\'s name and the names of the gift-givers. The voucher will be personalised for you.',
          sousTitre: 'Step 3',
          titre: 'Personalise the voucher',
        },
        {
          _key: '23n74igt',
          _type: 'object',
          description:
            'Send payment for the chosen session. Pricing is available on the dedicated page.',
          sousTitre: 'Step 4',
          titre: 'Pay the amount',
        },
        {
          _key: 'mu3hiiqi',
          _type: 'object',
          description:
            'Once payment is received, Jean-Baptiste sends the printable JPEG voucher within 24 hours (sometimes sooner if urgent).',
          sousTitre: 'Step 5',
          titre: 'Receive the document',
        },
        {
          _key: 'nc70y01l',
          _type: 'object',
          description:
            'The recipient contacts the guide to set a date together. The voucher is valid throughout the current season.',
          sousTitre: 'Step 6',
          titre: 'Enjoy!',
        },
      ],
      texte: null,
      titre: 'How to order?',
    },
    {
      _key: 'v0pqwlf9',
      _type: 'sectionBanniere',
      description: null,
      style: 'ocean',
      texte: null,
    },
    {
      _key: 'dsjcf9sm',
      _type: 'sectionCta',
      btn1Lien: '/contact',
      btn1Texte: 'Contact me',
      btn2Lien: 'tel:0687303456',
      btn2Texte: '06 87 30 34 56',
      description: null,
      style: 'dark',
      texte: null,
      titre: 'Order your gift voucher',
    },
  ],
})

// ─────────────────────────────────────────────
// 2. page-jean-baptiste-vidal-moniteur-guide-de-peche
// ─────────────────────────────────────────────
await patch('page-jean-baptiste-vidal-moniteur-guide-de-peche', {
  seoTitleEn: 'Jean-Baptiste Vidal — Licensed Fly Fishing Guide in Brittany',
  seoDescriptionEn:
    'Meet Jean-Baptiste Vidal, state-licensed fly fishing guide in South Brittany. 21 years of guiding, expert in sea bass, trout and migratory fish.',
  pagebuilderEn: [
    {
      _key: 'hero1',
      _type: 'sectionHero',
      description: null,
      eyebrow: 'Your guide',
      hauteur: 'full',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-747bb7980ac5b59035182f4c8439fba359ff5f58-1225x695-avif',
          _type: 'reference',
        },
      },
      sousTitre: 'State-Licensed Fly Fishing Guide · South Brittany',
      statsHero: [
        {
          _key: 'sh2',
          label: 'years guiding',
          nombre: '21',
        },
        {
          _key: 'sh3',
          label: 'years fly fishing',
          nombre: '33',
        },
        {
          _key: 'sh4',
          label: 'countries fished',
          nombre: '12+',
        },
      ],
      texte: null,
      titre: 'Jean-Baptiste Vidal',
    },
    {
      _key: 'ti5',
      _type: 'sectionTexteImage',
      description: null,
      eyebrow: 'The Guide',
      fond: 'white',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-45a3dacd2e22e71a5786adde1f8e887a7ef3d034-364x273-jpg',
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
              text: "You don't choose to become a fishing guide on a whim. It's a calling, a passion you want to share — a desire to pass on your knowledge, your skills, your technique, and your sensitivity to aquatic environments.",
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
              text: "After years of fishing all across France from an early age, I quickly knew I had to make a living from this all-consuming passion. I started my professional career at the Finistère Fishing Federation in Quimper for five years, before earning the BP JEPS 'Recreational Fishing' diploma in 2004.",
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
              text: 'In 2005 I left to guide in Iceland — my first international experience, which opened the door to a long career as a guide and lodge manager across several countries: Argentina, Russia, Bolivia, Ireland…',
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
              text: 'Since 2014, I have chosen to settle permanently in Brittany to offer my services and share with you the passion that unites us.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'A professional at your service',
    },
    {
      _key: 'frise14',
      _type: 'sectionFriseChronologique',
      citation: '« Every destination taught me something unique — a way of reading the water, a new technique. »',
      description: null,
      eyebrow: 'Experience',
      fond: 'sand',
      items: [
        {
          _key: 'fi18',
          detail: 'Technician at the Finistère Fishing and Aquatic Environment Protection Federation',
          lien: null,
          lienLabel: null,
          lieu: 'Finistère, France',
          periode: '2001–2005',
          photos: [],
        },
        {
          _key: 'fi19',
          detail: 'Lax-A Angling Club — Salmon, sea trout, brown trout, Arctic char',
          lien: null,
          lienLabel: null,
          lieu: 'Iceland',
          periode: '2005',
          photos: [],
        },
        {
          _key: 'fi20',
          detail: 'Pira Lodge — Dorado fly fishing guide',
          lien: '/voyage-peche-argentine-rio-grande-truite-de-mer',
          lienLabel: 'See the Argentina trip',
          lieu: 'Argentina — Corrientes',
          periode: '2006–2007',
          photos: [
            {
              _key: '2cd0eba0a387',
              _type: 'image',
              asset: {
                _ref: 'image-a1455e60e220347b7cde093ec313f3c7bf012f89-442x255-png',
                _type: 'reference',
              },
            },
            {
              _key: 'f639b18f53ec',
              _type: 'image',
              asset: {
                _ref: 'image-7eabbe22e5e37bfeee6137e02b6086a906e726eb-379x254-png',
                _type: 'reference',
              },
            },
            {
              _key: '63db68bd26d9',
              _type: 'image',
              asset: {
                _ref: 'image-6b0d0b28cf42c4bcf486930eed52503392d58e45-339x254-png',
                _type: 'reference',
              },
            },
          ],
        },
        {
          _key: 'fi21',
          detail: 'Pike and trout fly fishing guide',
          lien: null,
          lienLabel: null,
          lieu: 'Ireland',
          periode: '2006',
          photos: [],
        },
        {
          _key: 'fi22',
          detail: 'Ponoi River Company, Ryabaga Camp — Atlantic salmon',
          lien: null,
          lienLabel: null,
          lieu: 'Russia — Kola Peninsula',
          periode: '2007',
          photos: [],
        },
        {
          _key: 'fi23',
          detail: 'Rio Grande — Sea trout · Lodge manager at Toon Ken',
          lien: '/voyage-peche-argentine-rio-grande-truite-de-mer',
          lienLabel: 'See the Argentina trip',
          lieu: 'Argentina — Tierra del Fuego',
          periode: '2008–2009',
          photos: [
            {
              _key: '909233686d6f',
              _type: 'image',
              asset: {
                _ref: 'image-a1455e60e220347b7cde093ec313f3c7bf012f89-442x255-png',
                _type: 'reference',
              },
            },
            {
              _key: 'e111568d812e',
              _type: 'image',
              asset: {
                _ref: 'image-7eabbe22e5e37bfeee6137e02b6086a906e726eb-379x254-png',
                _type: 'reference',
              },
            },
            {
              _key: '19297e720b5e',
              _type: 'image',
              asset: {
                _ref: 'image-6b0d0b28cf42c4bcf486930eed52503392d58e45-339x254-png',
                _type: 'reference',
              },
            },
          ],
        },
        {
          _key: 'fi24',
          detail: 'Tsimane Lodge — Dorado and pacu in crystal-clear water',
          lien: '/voyages-peche-mouche',
          lien2: '/temoignages',
          lienLabel: 'Discover the trips',
          lienLabel2: 'Trip testimonials',
          lieu: 'Bolivia',
          periode: '2010–2012',
          photos: [
            {
              _key: 'bac7b7b8037d',
              _type: 'image',
            },
            {
              _key: '4ada79b58b37',
              _type: 'image',
              asset: {
                _ref: 'image-a157cefc0624b7b3feb02c2fa531ce882dc04422-1400x934-jpg',
                _type: 'reference',
              },
            },
            {
              _key: 'd1a1d079288c',
              _type: 'image',
              asset: {
                _ref: 'image-e9550c9093f0b7267341b0192d029f0d6d490475-1400x934-jpg',
                _type: 'reference',
              },
            },
            {
              _key: 'bf68f9c7b06a',
              _type: 'image',
              asset: {
                _ref: 'image-c243277d783f53627bacb7953e09387e2fd7bab4-1400x934-jpg',
                _type: 'reference',
              },
            },
          ],
        },
        {
          _key: 'fi25',
          detail: 'First stay · Bonefish, permit and tarpon · Caribbean National Park',
          lien: '/los-roques-venezuela',
          lienLabel: 'See the Venezuela destination',
          lieu: 'Venezuela — Los Roques',
          periode: '2011',
          photos: [
            { _key: '6948feb1b56a', _type: 'image', asset: { _ref: 'image-8ff5d60d71d6e06004e5c58b8a1e88a3ba2a3c84-1176x535-avif', _type: 'reference' } },
            { _key: '1044fc88ac56', _type: 'image', asset: { _ref: 'image-0322f6e5696e895157019bf1585e1273e5e1c268-678x508-heif', _type: 'reference' } },
            { _key: '539ae81da7dc', _type: 'image', asset: { _ref: 'image-5b7c5a96ccd26d8a074f773cde90732cf80c0ac4-758x508-avif', _type: 'reference' } },
            { _key: 'd805f85d7eec', _type: 'image', asset: { _ref: 'image-25ea45a395358e448346c1b03694eb0c180c6bb6-1206x828-avif', _type: 'reference' } },
            { _key: '7f211214d37c', _type: 'image', asset: { _ref: 'image-e48f7f682e05405cb2ceb959e237e36f3962e9b8-1324x743-avif', _type: 'reference' } },
            { _key: '020b46f3f571', _type: 'image', asset: { _ref: 'image-4481483c01e67a766b2342848bc6698ba7a61734-852x597-avif', _type: 'reference' } },
            { _key: 'f64280d05205', _type: 'image', asset: { _ref: 'image-1593986f679bd72175f0c9dbc23b034781f3b8a3-1249x683-avif', _type: 'reference' } },
            { _key: '52d6fa481abe', _type: 'image', asset: { _ref: 'image-a2d9e7d08ec721c31bc76605768781c49ca36d6b-540x354-avif', _type: 'reference' } },
            { _key: '01ecfee986da', _type: 'image', asset: { _ref: 'image-6760df98a694c4427182a941070f1689744d42e9-1201x695-avif', _type: 'reference' } },
            { _key: 'f0c9a7837fbe', _type: 'image', asset: { _ref: 'image-51495e41137c190fc31b399814488b3e021e95cd-1168x651-avif', _type: 'reference' } },
            { _key: '77e17f25cc4b', _type: 'image', asset: { _ref: 'image-82ae04c3f4176bf9dcadedb43eeb1fd2b0fda48e-1209x695-avif', _type: 'reference' } },
            { _key: 'df4b8c5559bb', _type: 'image', asset: { _ref: 'image-449dadc898283307815e562449a10181314f9f0f-1241x695-avif', _type: 'reference' } },
            { _key: '54b944435078', _type: 'image', asset: { _ref: 'image-2ae77d286a1fe34e6486d76876561c5e1c527dfd-1324x743-avif', _type: 'reference' } },
            { _key: 'c898c8376987', _type: 'image', asset: { _ref: 'image-95621ff006af94c13c48e77ae171614b7a308524-1094x630-avif', _type: 'reference' } },
            { _key: 'd6737aabc212', _type: 'image', asset: { _ref: 'image-cf054cc7544e015f032d2f77a3f0c5a36370b1b0-1145x695-avif', _type: 'reference' } },
            { _key: '638afb8be99f', _type: 'image', asset: { _ref: 'image-3fec82f9031333d124e1a34fb686abcb5cbe0c22-1241x695-avif', _type: 'reference' } },
            { _key: 'd55df53eeba9', _type: 'image', asset: { _ref: 'image-3f4376118235dbd1d48049448ce44f72f99b4a76-946x695-avif', _type: 'reference' } },
            { _key: '47fb7a94b66e', _type: 'image', asset: { _ref: 'image-ab1e131599e9ae141844555c6c7e78fec640274d-1246x695-avif', _type: 'reference' } },
            { _key: '3ba227972818', _type: 'image', asset: { _ref: 'image-608e42573bf0980ac008fd74987c9bcfc7812354-1238x695-avif', _type: 'reference' } },
            { _key: 'a21906287947', _type: 'image', asset: { _ref: 'image-6982c9a13311a8a7aa827f3831284d5c82de3c75-989x557-avif', _type: 'reference' } },
            { _key: 'd6dd7bb6bd4c', _type: 'image', asset: { _ref: 'image-b9cf1fd77d29b54fec435089ab8ba25d79e63345-869x560-avif', _type: 'reference' } },
            { _key: '3ec3cff4b07a', _type: 'image', asset: { _ref: 'image-a4293e986fc51e84221d168d92c2069ba24c39ce-1065x593-avif', _type: 'reference' } },
            { _key: '3618de0a7d8f', _type: 'image', asset: { _ref: 'image-631b688e31634c145c51dd4a5cbb9ebc5d5902e7-1241x695-avif', _type: 'reference' } },
            { _key: '939e89e54e1d', _type: 'image', asset: { _ref: 'image-4eea6f4bb6c44a7593a61283210cbb0f040ca046-1043x586-avif', _type: 'reference' } },
            { _key: '1396926cbc57', _type: 'image', asset: { _ref: 'image-c51609c20d1469e0ca87b179e981a739c49cd451-837x541-avif', _type: 'reference' } },
            { _key: '549ed12b9ed3', _type: 'image', asset: { _ref: 'image-e917b3df13ba75a3080d050eb0accbcbac49e2f1-1043x577-avif', _type: 'reference' } },
            { _key: 'ea13ddd70d07', _type: 'image', asset: { _ref: 'image-2a3bec734c9a00d816e3eb7eeb7b1cd714741c5c-1038x580-avif', _type: 'reference' } },
            { _key: '94fc1db268d3', _type: 'image', asset: { _ref: 'image-eda7ee98f584260020f4804b9eb70306b1f8edfa-1068x550-avif', _type: 'reference' } },
            { _key: '0ff0424965b3', _type: 'image', asset: { _ref: 'image-b052db8edc6edc595fb7bc076bfe5502cf1c9f05-856x585-avif', _type: 'reference' } },
            { _key: '5917b8edfc40', _type: 'image', asset: { _ref: 'image-3b064923b8234f9d8723b60bfff65f58dde85e00-1006x580-avif', _type: 'reference' } },
            { _key: '035237550426', _type: 'image', asset: { _ref: 'image-e85c0de221cb1104009c3122f8492ff687edb062-1046x585-avif', _type: 'reference' } },
            { _key: '7d44e4bfb3f2', _type: 'image', asset: { _ref: 'image-5718b2a0f6b3594694994e9a2bc8b5d11bd822f5-1238x695-avif', _type: 'reference' } },
          ],
        },
        {
          _key: 'fi26',
          detail: 'Rio Grande — Lodge manager at Kau Tapen (Nervous Waters)',
          lien: '/voyage-peche-argentine-rio-grande-truite-de-mer',
          lienLabel: 'See the Argentina trip',
          lieu: 'Argentina — Tierra del Fuego',
          periode: '2011–2013',
          photos: [],
        },
        {
          _key: 'fi27',
          detail: 'Independent licensed guide · Sea bass, trout, migratory fish, Spey casting · Courses and trips',
          lien: '/stage-peche-mouche',
          lien2: '/temoignages',
          lienLabel: 'View the services',
          lienLabel2: 'Read the testimonials',
          lieu: 'South Brittany, France',
          periode: '2014–present',
          photos: [],
        },
        {
          _key: 'fi28',
          detail: 'Hosted trip · Permit, bonefish and Grand Slam on the Cayo Cruz flats',
          lien: '/peche-mouche-cuba-cayo-cruz',
          lienLabel: 'See the Cuba Cayo Cruz trip',
          lieu: 'Cuba — Cayo Cruz',
          periode: 'March 2015',
          photos: [],
        },
        {
          _key: 'fi29',
          detail: 'Hosted trip · Tarpon and bonefish in the Gardens of the King',
          lien: '/peche-mouche-cuba-cayo-santa-maria',
          lienLabel: 'See the Cuba Santa Maria trip',
          lieu: 'Cuba — Cayo Santa Maria',
          periode: 'March 2016',
          photos: [],
        },
        {
          _key: 'fi30',
          detail: '2 hosted trips · Permit, bonefish and tarpon · Quintana Roo',
          lien: '/voyage-peche-mouche-mexique',
          lienLabel: 'See the Mexico trip',
          lieu: 'Mexico — Xcalak',
          periode: '2018–2019',
          photos: [],
        },
        {
          _key: 'fi31',
          detail: 'Hosted trips · Bonefish, tarpon and permit in the largest natural park in the Caribbean',
          lien: '/los-roques-venezuela',
          lienLabel: 'See the Venezuela destination',
          lieu: 'Venezuela — Los Roques',
          periode: '2023–2025',
          photos: [],
        },
      ],
      sousTitre: 'From Iceland to Tierra del Fuego, from Russia to Bolivia: years of guiding across the globe before settling in Brittany.',
      statsBar: [
        { _key: 'sb15', label: 'countries guided', nombre: '10+' },
        { _key: 'sb16', label: 'lodges managed', nombre: '8' },
        { _key: 'sb17', label: 'years internationally', nombre: '15' },
      ],
      texte: null,
      titre: 'An international guiding career',
    },
    {
      _key: 'carr32',
      _type: 'sectionCarrousel3Images',
      description: null,
      fond: 'dark',
      images: [
        { _key: 'c45f23eda0a2', _type: 'image', asset: { _ref: 'image-e9550c9093f0b7267341b0192d029f0d6d490475-1400x934-jpg', _type: 'reference' } },
        { _key: 'b111c9f8ac72', _type: 'image', asset: { _ref: 'image-a2222f442667774505d90d5f6f3663fa65e13679-728x546-avif', _type: 'reference' } },
        { _key: 'ea83230dba8d', _type: 'image', asset: { _ref: 'image-bdf7bfeba0c9a6202ea970740723bb1fcec7e10c-1369x913-avif', _type: 'reference' } },
        { _key: '90e2e4649e34', _type: 'image', asset: { _ref: 'image-bd7fe7eaa589c863b9c742f3b215e6ca8ab348a0-1369x913-avif', _type: 'reference' } },
        { _key: '9cef0c0a2cd5', _type: 'image', asset: { _ref: 'image-25ea45a395358e448346c1b03694eb0c180c6bb6-1206x828-avif', _type: 'reference' } },
        { _key: 'c5f7fe960679', _type: 'image', asset: { _ref: 'image-e85c0de221cb1104009c3122f8492ff687edb062-1046x585-avif', _type: 'reference' } },
        { _key: '4db29ca4632b', _type: 'image', asset: { _ref: 'image-dd69230ce9bae57c57c16e1f9618076b453f3990-678x510-avif', _type: 'reference' } },
        { _key: 'dce6cb94f78c', _type: 'image', asset: { _ref: 'image-b8cd3118b611c09030018652362e24c584cc2a20-698x1042-avif', _type: 'reference' } },
        { _key: 'b07a37f46ce3', _type: 'image', asset: { _ref: 'image-925a6c662a5920f0fcc1544832254da9d7b2b197-1217x913-avif', _type: 'reference' } },
        { _key: '853ebc2051b5', _type: 'image', asset: { _ref: 'image-08f88720957a06dd75415de03983b1acbc783d77-1369x913-avif', _type: 'reference' } },
        { _key: '6325eec120f6', _type: 'image', asset: { _ref: 'image-5026f7d5fe48e3dbd7f4e368d98bddcb3928572e-1217x913-avif', _type: 'reference' } },
        { _key: 'd768d00e404c', _type: 'image', asset: { _ref: 'image-04f711db9ca2080bb9586a5e7580e2cecad4b20a-1217x913-avif', _type: 'reference' } },
        { _key: 'a5cfca11eab2', _type: 'image', asset: { _ref: 'image-464af9d0abb3fa83c89f9d0a50f2f941f9916e5b-1369x913-avif', _type: 'reference' } },
        { _key: '62a844432e82', _type: 'image', asset: { _ref: 'image-a157cefc0624b7b3feb02c2fa531ce882dc04422-1400x934-jpg', _type: 'reference' } },
      ],
      ratio: '3/2',
      texte: null,
    },
    {
      _key: 'liste33',
      _type: 'sectionListe',
      description: null,
      eyebrow: 'Qualifications',
      fond: 'white',
      intro: "Holder of the BP JEPS 'Recreational Fishing' diploma, Jean-Baptiste is qualified to teach fly fishing and lead outings in marine environments. He is also a member of the Pro Guide Team for Rio, SAGE and Simms.",
      items: [
        { _key: 'li34', annee: '1999', label: 'BTS in Nature Management and Conservation' },
        { _key: 'li35', annee: '2004', label: "BP JEPS 'Recreational Fishing', Licensed Fishing Guide" },
        { _key: 'li36', annee: '2004', label: "UCC 'Recreational fishing in marine environments'" },
        { _key: 'li37', annee: '2004', label: 'Swimming Supervision Certificate' },
        { _key: 'li38', annee: '2004', label: 'First Aid Certificate' },
        { _key: 'li39', annee: '2001–', label: 'Technician at the Finistère Fishing Federation' },
        { _key: 'li40', annee: 'Press', label: 'Fishing journalist, Pêche Mouche magazine (since 2011)' },
        { _key: 'li41', annee: 'Sponsors', label: 'Pro Guide Team: Rio, SAGE, Simms, Redington, Loon, CF Design' },
      ],
      texte: null,
      titre: 'Qualifications & certifications',
    },
    {
      _key: 'dest42',
      _type: 'sectionProgrammeTexte',
      colonnes: [
        {
          _key: 'col43',
          items: [
            { _key: 'i44', texte: 'Argentina — Tierra del Fuego, Patagonia, Corrientes' },
            { _key: 'i45', texte: 'Iceland — East & West Ranga, Varma, Jokla…' },
            { _key: 'i46', texte: 'Russia — Ponoi River' },
            { _key: 'i47', texte: 'Bolivia — Tsimane Lodge' },
            { _key: 'i48', texte: 'Ireland — Connemara, Lough Sheelin…' },
            { _key: 'i49', texte: 'Norway — Gaula, Rena, Glomma' },
            { _key: 'i50', texte: 'American West (Montana, Idaho, Wyoming)' },
            { _key: 'i51', texte: 'Quebec — Lac St Pierre, Massawippi…' },
          ],
          label: 'Freshwater',
          style: 'default',
        },
        {
          _key: 'col52',
          items: [
            { _key: 'i53', texte: 'Venezuela — Los Roques (4 stays)' },
            { _key: 'i54', texte: 'Cuba — Cayo Cruz & Cayo Santa Maria' },
            { _key: 'i55', texte: 'Mexico — Punta Allen, Xcalak' },
            { _key: 'i56', texte: 'Bahamas — Abaco Lodge, Bair\'s Lodge' },
            { _key: 'i57', texte: 'Seychelles — St Joseph, Poivre' },
            { _key: 'i58', texte: 'New Caledonia (2 stays)' },
            { _key: 'i59', texte: 'Florida — Islamorada, Biscayne Key' },
          ],
          label: 'Saltwater',
          style: 'default',
        },
      ],
      description: null,
      eyebrow: 'Travels',
      fond: 'dark',
      intro: 'Every trip enriches technique and water-reading skills. This international experience is put to work for clients in Brittany.',
      texte: null,
      titre: 'Fly fishing in 12 countries around the world',
    },
    {
      _key: 'ti260',
      _type: 'sectionTexteImage',
      description: null,
      eyebrow: 'Today',
      fond: 'sand',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-384e6d166d226759b696bbd77b78fd0a422478cf-942x598-avif',
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
              text: 'Based in South Brittany since 2000, between Quimper and Quimperlé, Jean-Baptiste offers his services as an independent licensed guide on the finest estuaries and coastlines of Finistère.',
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
              text: 'Sea bass in estuaries and by boat (Carolina Skiff), river and stillwater trout, shad, pike, Spey casting courses and masterclasses — a complete range of services, tailored to all levels.',
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'Fly fishing guide in Brittany since 2006',
    },
    {
      _key: 'cta65',
      _type: 'sectionCta',
      btn1Lien: '/stage-peche-mouche',
      btn1Texte: 'View the services',
      btn2Lien: '/contact',
      btn2Texte: 'Book a session',
      description: null,
      style: 'dark',
      texte: null,
      titre: 'Go fishing with Jean-Baptiste',
    },
  ],
})

// ─────────────────────────────────────────────
// 3. page-tarifs
// ─────────────────────────────────────────────
await patch('page-tarifs', {
  seoTitleEn: 'Pricing 2026 — Fly Fishing Courses & Guide Days | Jean-Baptiste Vidal',
  seoDescriptionEn:
    'Prices for fly fishing courses and guided days in Brittany with Jean-Baptiste Vidal: sea bass, trout, shad, pike, stillwater, Spey casting. From 150 € per person.',
  pagebuilderEn: [
    {
      _key: 't0zb37ew',
      _type: 'sectionHero',
      btnReserverLien: '/contact',
      btnReserverTexte: 'Get in touch',
      btnTelTexte: '06 87 30 34 56',
      description: null,
      eyebrow: 'South Brittany · 2026',
      hauteur: 'moyen',
      sousTitre: 'Guided days and instruction for beginners, intermediate and expert anglers: freshwater, sea bass, migratory fish, technique.',
      texte: null,
      titre: 'Course & guide day pricing',
    },
    {
      _key: '8iojt39d',
      _type: 'sectionIntro',
      boutons: [
        {
          _key: 'k00d6p2p',
          _type: 'object',
          lien: 'tel:0687303456',
          texte: '06 87 30 34 56',
        },
        {
          _key: 'gwoi1vhu',
          _type: 'object',
          lien: 'mailto:enjoy.fishing@hotmail.fr',
          texte: 'enjoy.fishing@hotmail.fr',
        },
      ],
      description: null,
      duree: 'approx. 7 to 8 hours',
      eyebrow: 'Pricing 2026',
      fond: 'white',
      lignesSupp: [
        {
          _key: '5luo9i1k',
          _type: 'object',
          label: 'Levels',
          valeur: 'Beginners · Intermediate · Expert',
        },
        {
          _key: 'hey0ud7b',
          _type: 'object',
          label: 'Area',
          valeur: 'South Brittany, Finistère · Morbihan',
        },
        {
          _key: 'cca3fcrm',
          _type: 'object',
          label: 'Contact',
          valeur: '06 87 30 34 56',
        },
      ],
      showInfoCard: true,
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: "On this page you'll find the pricing for my fly fishing courses and guided days in Brittany. Feel free to contact me if you'd like further information.",
            },
          ],
          style: 'normal',
        },
      ],
      titre: 'Price per person',
    },
    {
      _key: 'ixt3b0yx',
      _type: 'sectionTarifs',
      couleurPanel: 'bar',
      description: null,
      eyebrow: 'Estuaries · South Brittany',
      fond: 'white',
      lienLabel: 'Discover the services →',
      lienUrl: '/peche-du-bar-a-la-mouche',
      lignes: [
        {
          _key: '0czfobl2',
          _type: 'object',
          format: '1 full day',
          lienUrl: '/initiation-peche-du-bar-a-la-mouche',
          nom: 'Sea bass fly fishing — introduction',
          prix: [
            { _key: 'n4uauwy5', _type: 'object', label: '1 pers.', valeur: '320 €' },
            { _key: 'v2booowg', _type: 'object', label: '2 pers.', valeur: '225 €' },
          ],
          statut: 'normal',
        },
        {
          _key: 'l2tb5h9i',
          _type: 'object',
          format: '1 full day',
          lienUrl: '/peche-du-bar-perfectionnement',
          nom: 'Sea bass — advanced coaching',
          prix: [
            { _key: 'd8rleiuf', _type: 'object', label: '1 pers.', valeur: '320 €' },
            { _key: '3cypobrz', _type: 'object', label: '2 pers.', valeur: '225 €' },
          ],
          statut: 'normal',
        },
        {
          _key: 'opco2sgw',
          _type: 'object',
          format: '1 session',
          lienUrl: '/peche-du-bar-a-vue-a-la-mouche',
          nom: 'Sight fishing for sea bass',
          prix: [
            { _key: 'aow665i9', _type: 'object', label: '1 pers.', valeur: '320 €' },
            { _key: 'jw7hyuoy', _type: 'object', label: '2 pers.', valeur: '225 €' },
          ],
          statut: 'accentue',
        },
        {
          _key: 'k2m3iddm',
          _type: 'object',
          format: '1 session · Carolina Skiff',
          lienUrl: '/peche-mouche-bar-bateau-bretagne',
          nom: 'Sea bass by boat — fly fishing special',
          prix: [
            { _key: '23mcyzqz', _type: 'object', label: '1 pers.', valeur: '350 €' },
            { _key: 'q3ktfe4x', _type: 'object', label: '2 pers.', valeur: '250 €' },
          ],
          statut: 'accentue',
        },
        {
          _key: '3i498phc',
          _type: 'object',
          format: 'Full day · Your spots · Your boat',
          lienUrl: '/peche-du-bar-a-la-mouche-coaching',
          nom: 'Sea bass fly fishing coaching',
          prix: [
            { _key: 'f8ovib0e', _type: 'object', label: '1 pers.', valeur: '320 €' },
            { _key: '01rkcvwv', _type: 'object', label: '2 pers.', valeur: '225 €' },
          ],
          statut: 'normal',
        },
      ],
      matrices: [],
      texte: null,
      titre: 'Sea bass fly fishing',
    },
    {
      _key: 'j6xx2zhw',
      _type: 'sectionTarifs',
      couleurPanel: 'eau',
      description: null,
      eyebrow: 'Rivers · Stillwaters',
      fond: 'sand',
      lienLabel: 'Discover the services →',
      lienUrl: '/peche-a-la-mouche-en-bretagne',
      lignes: [
        {
          _key: 'p373hrj2',
          _type: 'object',
          format: '1 full day',
          lienUrl: '/peche-a-la-mouche-en-bretagne',
          nom: 'Fly fishing introduction',
          prix: [
            { _key: '7rgufqlc', _type: 'object', label: '1 pers.', valeur: '280 €' },
            { _key: '5hms05lq', _type: 'object', label: '2 pers.', valeur: '180 €' },
            { _key: 's3b8fk9g', _type: 'object', label: '3 pers.', valeur: '150 €' },
          ],
          statut: 'normal',
        },
        {
          _key: 'a348qqwn',
          _type: 'object',
          format: '1 full day',
          lienUrl: '/peche-de-la-truite-a-la-mouche-en-bretagne',
          nom: 'River trout — advanced',
          prix: [
            { _key: 'nisdxtrp', _type: 'object', label: '1 pers.', valeur: '300 €' },
            { _key: '6axcr0al', _type: 'object', label: '2 pers.', valeur: '200 €' },
            { _key: 'q7u69v8f', _type: 'object', label: '3 pers.', valeur: '160 €' },
          ],
          statut: 'normal',
        },
        {
          _key: 'mkd3zlru',
          _type: 'object',
          format: '1 full day · fishing permit not included',
          lienUrl: '/peche-de-la-truite-en-reservoir',
          nom: 'Stillwater trout',
          prix: [
            { _key: 'uxq4lec8', _type: 'object', label: '1 pers.', valeur: '320 €' },
            { _key: 'ic6btkbr', _type: 'object', label: '2 pers.', valeur: '200 €' },
            { _key: 'j7givzmn', _type: 'object', label: '3 pers.', valeur: '150 €' },
          ],
          statut: 'normal',
        },
        {
          _key: 'b4w3je78',
          _type: 'object',
          format: '1 full day',
          lienUrl: '/peche-du-brochet-a-la-mouche',
          nom: 'Pike — bank fishing',
          prix: [
            { _key: '8zsvq8ro', _type: 'object', label: '1 pers.', valeur: '300 €' },
            { _key: 's7z5cl2e', _type: 'object', label: '2 pers.', valeur: '200 €' },
          ],
          statut: 'normal',
        },
        {
          _key: 'ipx9ensl',
          _type: 'object',
          format: '1 full day',
          lienUrl: '/peche-du-brochet-a-la-mouche',
          nom: 'Pike — by boat',
          prix: [
            { _key: '3heefb54', _type: 'object', label: '1 pers.', valeur: '320 €' },
            { _key: '1rm5nrav', _type: 'object', label: '2 pers.', valeur: '200 €' },
          ],
          statut: 'normal',
        },
        {
          _key: 'ukl6104v',
          _type: 'object',
          format: 'Closed in 2026',
          lienUrl: null,
          nom: 'Atlantic salmon (salmo salar)',
          prix: [
            { _key: '0z6ucm6h', _type: 'object', label: '1 pers.', valeur: '300 €' },
            { _key: 'nhnsr7b0', _type: 'object', label: '2 pers.', valeur: '200 €' },
            { _key: '64o39lgy', _type: 'object', label: '3 pers.', valeur: '160 €' },
          ],
          statut: 'ferme',
        },
      ],
      matrices: [
        {
          _key: 'y0ipimt2',
          _type: 'object',
          colonnes: ['Evening session', '1 day Aulne', '1 day Blavet'],
          lignes: [
            { _key: 'wj75qj7g', _type: 'object', label: '1 person', valeurs: ['200 €', '320 €', '350 €'] },
            { _key: '4wlzsqeh', _type: 'object', label: '2 people', valeurs: ['180 €', '200 €', '250 €'] },
            { _key: 'g1sxqhfi', _type: 'object', label: '3 people', valeurs: ['150 €', '170 €', '180 €'] },
          ],
          note: 'rate depends on the session format',
          titre: 'Shad (alosa alosa)',
          titreUrl: '/peche-de-l-alose-a-la-mouche',
        },
      ],
      texte: null,
      titre: 'Freshwater & migratory fish',
    },
    {
      _key: 'v1082hxv',
      _type: 'sectionTarifs',
      couleurPanel: 'stage',
      description: null,
      eyebrow: 'Technique · Improvement',
      fond: 'white',
      lienLabel: 'Discover the courses →',
      lienUrl: '/stage-spey-cast-et-cours-de-lancer',
      lignes: [
        {
          _key: 'oahhe9en',
          _type: 'object',
          format: '1 full day · single & double-handed rods',
          lienUrl: '/stage-spey-cast-et-cours-de-lancer',
          nom: 'Casting course including Spey casting',
          prix: [
            { _key: 'uj8b2j3x', _type: 'object', label: '1 pers.', valeur: '300 €' },
            { _key: 'ide42x3b', _type: 'object', label: '2 pers.', valeur: '200 €' },
            { _key: 'iiu4awp0', _type: 'object', label: '3 pers.', valeur: '160 €' },
          ],
          statut: 'normal',
        },
        {
          _key: 'rabfgso3',
          _type: 'object',
          format: 'Bespoke format',
          lienUrl: '/master-class-peche-en-reservoir',
          nom: 'Stillwater masterclass',
          prix: [],
          statut: 'contact',
        },
        {
          _key: 'mw50mlhe',
          _type: 'object',
          format: 'Bespoke format',
          lienUrl: '/master-class-nymphe-au-fil',
          nom: 'French nymphing masterclass',
          prix: [],
          statut: 'contact',
        },
      ],
      matrices: [
        {
          _key: 'kxvdcgez',
          _type: 'object',
          colonnes: ['Half day', 'Full day'],
          lignes: [
            { _key: 'rtslji45', _type: 'object', label: 'Parent and 1 child', valeurs: ['230 €', '350 €'] },
            { _key: 'ye9pjk6l', _type: 'object', label: 'Parent and 2 children', valeurs: ['250 €', '400 €'] },
          ],
          note: null,
          titre: 'Parent & child course (under 16)',
          titreUrl: '/contact',
        },
      ],
      texte: null,
      titre: 'Courses & technique',
    },
    {
      _key: '5z9avd1c',
      _type: 'sectionCta',
      btn1Lien: '/contact',
      btn1Texte: 'Book',
      btn2Lien: 'tel:0687303456',
      btn2Texte: '06 87 30 34 56',
      description: null,
      style: 'dark',
      texte: null,
      titre: "What's included",
    },
    {
      _key: 'a2b2bvls',
      _type: 'sectionCta',
      btn1Lien: '/contact',
      btn1Texte: 'Contact me',
      btn2Lien: 'tel:0687303456',
      btn2Texte: '06 87 30 34 56',
      description: null,
      style: 'ocean',
      texte: null,
      titre: 'Book your course',
    },
  ],
})

// ─────────────────────────────────────────────
// 4. page-voyages-peche-mouche
// ─────────────────────────────────────────────
await patch('page-voyages-peche-mouche', {
  seoTitleEn: 'Fly Fishing Trips with Jean-Baptiste Vidal — Hosted Worldwide',
  seoDescriptionEn:
    'Hosted fly fishing trips led by Jean-Baptiste Vidal: Argentina, Cuba, Venezuela, Mexico. Sea trout, permit, bonefish and tarpon in the world\'s finest destinations.',
  pagebuilderEn: [
    {
      _key: 'voy-hero',
      _type: 'sectionHero',
      btnReserverLien: '/contact',
      btnReserverTexte: 'Contact me',
      btnTelTexte: '06 87 30 34 56',
      description: null,
      eyebrow: 'Hosted trips · Worldwide',
      hauteur: 'full',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-3f4376118235dbd1d48049448ce44f72f99b4a76-946x695-avif',
          _type: 'reference',
        },
      },
      sousTitre: 'Argentina, Cuba, Venezuela, Mexico: exceptional destinations to hunt permit, bonefish, tarpon and sea trout in wild, unspoiled environments.',
      texte: null,
      titre: 'Fly fishing trips',
    },
    {
      _key: 'voy-stats',
      _type: 'sectionStats',
      description: null,
      fond: 'dark',
      stats: [
        { _key: 'stat-dest', label: 'destinations', nombre: '5' },
        { _key: 'stat-pays', label: 'countries fished', nombre: '12+' },
        { _key: 'stat-ans', label: 'years of exotic fishing experience', nombre: '20+' },
      ],
      texte: null,
    },
    {
      _key: 'voy-intro-text',
      _type: 'sectionTexte',
      description: null,
      fond: 'white',
      largeur: 'normal',
      texte: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              marks: [],
              text: 'Fish with a guide who knows the spots',
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
              text: "Since 2005, Jean-Baptiste has travelled to the world's greatest fly fishing destinations: Argentina, Bolivia, Russia, Iceland, Cuba, Venezuela, Mexico. These hosted trips guarantee you arrive on familiar ground — with a guide who has already fished there and knows the spots, the local guides and the best seasons.",
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
              text: 'Small group, relaxed pace, easy-going atmosphere. We fish, we laugh, we come back with memories.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'voy-pourquoi',
      _type: 'sectionAvantages',
      description: null,
      eyebrow: 'Hosted trips',
      fond: 'white',
      items: [
        {
          _key: 'avt-1',
          icone: '🎯',
          texte: 'Jean-Baptiste always takes a scouting trip before opening a destination to clients. You arrive on familiar ground with a guide who has already fished there.',
          titre: 'Destinations tried and tested first',
        },
        {
          _key: 'avt-2',
          icone: '🤝',
          texte: 'Long-standing partnerships with Nervous Waters (Argentina), Avalon Fishing (Cuba Cruz), Fly Fish The Run (Cuba Santa Maria) and DHD Laika (Venezuela, Mexico).',
          titre: 'International network',
        },
        {
          _key: 'avt-3',
          icone: '🎣',
          texte: 'Jean-Baptiste is on the water with you in addition to the local guide. Technical coaching, water reading, fly selection — to maximise your chances of a catch.',
          titre: 'Extra guiding on top of the local guide',
        },
        {
          _key: 'avt-4',
          icone: '🌎',
          texte: 'Full organisation included: internal flights, transfers, accommodation, guides and on-the-ground logistics. All you need to do is pack your rods and go.',
          titre: 'Everything handled for you',
        },
      ],
      texte: null,
      titre: 'Why travel with Jean-Baptiste?',
    },
    {
      _key: 'voy-grid',
      _type: 'sectionVoyagesGrid',
      description: null,
      eyebrow: 'Destinations',
      texte: null,
      titre: 'Choose your adventure',
      voyageFeaturedSlug: 'los-roques-venezuela',
    },
    {
      _key: 'voy-cta',
      _type: 'sectionCta',
      btn1Lien: '/contact',
      btn1Texte: 'Contact me',
      btn2Lien: 'tel:0687303456',
      btn2Texte: '06 87 30 34 56',
      description: null,
      style: 'dark',
      texte: null,
      titre: 'Planning a trip?',
    },
  ],
})

console.log('\nAll 4 patches applied successfully.')
