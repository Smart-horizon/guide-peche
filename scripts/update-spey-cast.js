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

const pagebuilder = [
  // ── 1. INTRO (enrichi) ────────────────────────────────────────────────────
  {
    _key: 'intro17810044451828',
    _type: 'sectionIntro',
    eyebrow: 'Stage Spey Cast · Bretagne',
    titre: 'Maîtrisez le Spey Cast avec Jean-Baptiste',
    fond: 'white',
    showInfoCard: true,
    niveau: 'Débutants et confirmés',
    format: 'Stage 1 jour · Week-end · En groupe ou particulier',
    saison: "Toute l'année",
    tarif: '300 € · 1 pers. / 200 € · 2 pers. / 160 € · 3 pers.',
    texte: [
      {
        _key: 'bl001', _type: 'block', style: 'normal', markDefs: [],
        children: [{ _key: 'sp001', _type: 'span', marks: [], text: "Le Spey Cast est un art de lancer une mouche à longue distance, sans effort et avec un minimum de dégagement derrière soi. Jean-Baptiste pratique intensément ces techniques depuis ses nombreuses saisons en Argentine et en Russie, sur des rivières à saumons." }]
      },
      {
        _key: 'bl002', _type: 'block', style: 'normal', markDefs: [],
        children: [{ _key: 'sp002', _type: 'span', marks: [], text: "Que vous soyez débutant ou que vous souhaitiez perfectionner vos acquis, ce stage en petits groupes (2 à 4 personnes max.) vous permettra de progresser rapidement dans un cadre convivial et pédagogique." }]
      },
    ],
    boutons: [
      { _key: 'btn001', _type: 'bouton', texte: 'Réserver ce stage', lien: '/contact' },
      { _key: 'btn002', _type: 'bouton', texte: 'Consulter les tarifs', lien: '/tarifs' },
    ],
  },

  // ── 2. QU'EST-CE QUE LE SPEY CAST ────────────────────────────────────────
  {
    _key: 'texte-spey-001',
    _type: 'sectionTexte',
    fond: 'sand',
    largeur: 'normal',
    texte: [
      {
        _key: 't2b1', _type: 'block', style: 'h2', markDefs: [],
        children: [{ _key: 't2s1', _type: 'span', marks: [], text: 'Le Spey Cast : un lancer d\'exception' }]
      },
      {
        _key: 't2b2', _type: 'block', style: 'normal', markDefs: [],
        children: [{ _key: 't2s2', _type: 'span', marks: [], text: "Le Spey Cast est une technique de lancer encore peu développée en France, mais qui gagne rapidement en popularité. Elle permet de lancer n'importe quelle mouche avec peu de dégagement et un effort minimal, idéale pour les rivières encaissées, boisées ou de grande largeur." }]
      },
      {
        _key: 't2b3', _type: 'block', style: 'normal', markDefs: [],
        children: [{ _key: 't2s3', _type: 'span', marks: [], text: "Cette technique s'applique à la pêche de la truite, de l'ombre, du saumon et de toutes les grandes espèces. En Bretagne, Jean-Baptiste propose des formules en groupe ou en cours particulier, adaptées à votre niveau et à vos objectifs." }]
      },
    ],
  },

  // ── 3. PROGRAMME À LA CARTE ───────────────────────────────────────────────
  {
    _key: 'prog-carte-001',
    _type: 'sectionProgrammeTexte',
    fond: 'white',
    eyebrow: 'Programme',
    titre: 'Stages Spey Cast à la carte',
    intro: "Stages d'initiation et de perfectionnement en Bretagne, adaptés à votre niveau (débutant, confirmé, expert). Une journée, un week-end ou par séance — sur rivière du département ou près de chez vous.",
    colonnes: [
      {
        _key: 'col-techniques',
        label: 'Techniques enseignées',
        style: 'normal',
        items: [
          { _key: 'i001', _type: 'item', texte: 'Single Spey et Double Spey', inclus: true },
          { _key: 'i002', _type: 'item', texte: 'Snap T et Snake Roll', inclus: true },
          { _key: 'i003', _type: 'item', texte: 'Lancer roulé et ses variantes', inclus: true },
          { _key: 'i004', _type: 'item', texte: 'Lancer avec la main opposée', inclus: true },
          { _key: 'i005', _type: 'item', texte: 'Soie plongeante et pointe plongeante', inclus: true },
          { _key: 'i006', _type: 'item', texte: 'Matériel : cannes, soies, polyleaders', inclus: true },
        ],
      },
      {
        _key: 'col-formats',
        label: 'Formats proposés',
        style: 'normal',
        items: [
          { _key: 'i007', _type: 'item', texte: 'Initiation, perfectionnement ou niveau expert', inclus: true },
          { _key: 'i008', _type: 'item', texte: '1 journée, week-end ou formule par séance', inclus: true },
          { _key: 'i009', _type: 'item', texte: 'Sur rivière du département ou près de chez vous', inclus: true },
          { _key: 'i010', _type: 'item', texte: 'Cours particulier ou petit groupe (2–4 pers.)', inclus: true },
        ],
      },
    ],
  },

  // ── 4. STAGE COLLECTIF ────────────────────────────────────────────────────
  {
    _key: 'texte-collectif-001',
    _type: 'sectionTexte',
    fond: 'dark',
    largeur: 'normal',
    texte: [
      {
        _key: 't4b1', _type: 'block', style: 'h2', markDefs: [],
        children: [{ _key: 't4s1', _type: 'span', marks: [], text: 'Stage de Spey Cast collectif' }]
      },
      {
        _key: 't4b2', _type: 'block', style: 'normal', markDefs: [],
        children: [{ _key: 't4s2', _type: 'span', marks: [], text: "Jean-Baptiste propose également des stages collectifs à destination des magasins de pêche, clubs mouche et associations. Ces stages comprennent une partie théorique en salle (présentation du matériel, des techniques) et une partie pratique en rivière." }]
      },
      {
        _key: 't4b3', _type: 'block', style: 'normal', markDefs: [],
        children: [{ _key: 't4s3', _type: 'span', marks: [], text: "Pour organiser un stage collectif avec votre club ou association, contactez Jean-Baptiste directement." }]
      },
    ],
  },

  // ── 5. COURS LANCER CANNE À UNE MAIN ────────────────────────────────────
  {
    _key: 'prog-lancer-001',
    _type: 'sectionProgrammeTexte',
    fond: 'sand',
    eyebrow: 'En complément',
    titre: 'Cours de lancer pour canne à une main',
    intro: "L'art de lancer une mouche à distance et avec précision se travaille et nécessite des heures de pratique. Jean-Baptiste vous enseigne tous les lancers fondamentaux, en canne à une main comme en Switch.",
    colonnes: [
      {
        _key: 'col-lancers',
        label: 'Lancers enseignés',
        style: 'normal',
        items: [
          { _key: 'l001', _type: 'item', texte: 'Lancer droit', inclus: true },
          { _key: 'l002', _type: 'item', texte: 'Lancer roulé', inclus: true },
          { _key: 'l003', _type: 'item', texte: 'Lancer revers', inclus: true },
          { _key: 'l004', _type: 'item', texte: 'Lancer horizontal ou latéral', inclus: true },
          { _key: 'l005', _type: 'item', texte: 'Simple traction', inclus: true },
          { _key: 'l006', _type: 'item', texte: 'Double traction', inclus: true },
          { _key: 'l007', _type: 'item', texte: 'Spey Cast pour canne à une main ou Switch', inclus: true },
        ],
      },
    ],
  },

  // ── 6. CTA FINAL ──────────────────────────────────────────────────────────
  {
    _key: 'cta-spey-001',
    _type: 'sectionCta',
    titre: 'Réservez votre stage de Spey Cast',
    texte: 'Places limitées — Jean-Baptiste adapte chaque stage à votre niveau et à vos objectifs.',
    btn1Texte: 'Me contacter',
    btn1Lien: '/contact',
    btn2Texte: 'Consulter les tarifs',
    btn2Lien: '/tarifs',
    style: 'dark',
  },
]

client.patch('prestation-stage-spey-cast')
  .set({ pagebuilder })
  .commit({ autoGenerateArrayKeys: false })
  .then(r => { console.log('OK:', r._id); process.exit(0) })
  .catch(e => { console.error('ERR:', e.message); process.exit(1) })
