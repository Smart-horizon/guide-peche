import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const uid = () => Math.random().toString(36).slice(2, 14)

const pagebuilder = [
  // ── 1. INTRO (conservée telle quelle) ───────────────────────────────────────
  {
    _key: 'intro178100444518216',
    _type: 'sectionIntro',
    eyebrow: 'Cours de lancer · Pêche à la mouche',
    titre: 'Un lancer précis et élégant, ça s\'apprend',
    texte: [
      { _key: 'bl1', _type: 'block', style: 'normal', markDefs: [], children: [{ _key: 'sp1', _type: 'span', marks: [], text: 'Un bon lancer est la base de tout en pêche à la mouche. Que vous débutiez ou que vous cherchiez à corriger de mauvaises habitudes, ces cours de lancer sont conçus pour vous faire progresser rapidement.' }] },
      { _key: 'bl2', _type: 'block', style: 'normal', markDefs: [], children: [{ _key: 'sp2', _type: 'span', marks: [], text: 'Nous travaillons les fondamentaux : timing, boucle, double traction, distance et précision. Les séances peuvent se dérouler sur pelouse, au bord de l\'eau ou directement sur votre rivière habituelle.' }] },
      { _key: 'bl3', _type: 'block', style: 'normal', markDefs: [], children: [{ _key: 'sp3', _type: 'span', marks: [], text: 'Jean-Baptiste adapte son enseignement à votre niveau et à vos objectifs : sèche à distance, nymphe au fil, pêche en aval ou lancer en espace restreint.' }] },
    ],
    showInfoCard: true,
    niveau: 'Débutants et confirmés',
    format: 'Cours particulier · Demi-journée ou journée',
    saison: 'Toute l\'année',
    tarif: '280 € · 1 pers. / 180 € · 2 pers.',
    boutons: [
      { _key: 'btn1', _type: 'bouton', texte: 'Réserver un cours', lien: '/contact' },
      { _key: 'btn2', _type: 'bouton', texte: 'Consulter les tarifs', lien: '/tarifs' },
    ],
    fond: 'white',
  },

  // ── 2. DESCRIPTION — présentation & types de lancers ────────────────────────
  {
    _key: uid(),
    _type: 'sectionTexteImage',
    titre: 'Stage et cours de lancer pour canne à une main',
    texte: [
      { _key: uid(), _type: 'block', style: 'normal', markDefs: [], children: [{ _key: uid(), _type: 'span', marks: [], text: 'Depuis 2014, je propose des cours de lancer en individuel pour des pêcheurs souhaitant perfectionner leur technique, mais aussi des cours collectifs avec des clubs mouches ou associations.' }] },
      { _key: uid(), _type: 'block', style: 'normal', markDefs: [], children: [{ _key: uid(), _type: 'span', marks: [], text: 'Bien des pêcheurs pratiquent uniquement le lancer droit et latéral, parfois horizontal, qui ne leur permettent pas de s\'en sortir si le vent se lève, ou si la rivière est jonchée d\'arbres et d\'obstacles.' }] },
      { _key: uid(), _type: 'block', style: 'normal', markDefs: [], children: [{ _key: uid(), _type: 'span', marks: [], text: 'Les lancers revers, roulés et spey cast à une main sont très utiles pour exploiter tous les postes d\'une rivière peu importe sa taille et son encombrement.' }] },
      { _key: uid(), _type: 'block', style: 'normal', markDefs: [], children: [{ _key: uid(), _type: 'span', marks: [], text: 'Pour toutes les pêches en mer, en lac et la pêche des carnassiers, il faut absolument savoir lancer à distance, parfois rapidement (pêche en exotique) et/ou avec du vent.' }] },
      { _key: uid(), _type: 'block', style: 'normal', markDefs: [], children: [{ _key: uid(), _type: 'span', marks: [], text: 'Pour cela la simple traction, double traction et le back handed cast (lancer avec shoot arrière) sont indispensables. Je maîtrise parfaitement tous ces lancers et je pourrai vous les enseigner avec pédagogie.' }] },
    ],
    imagePosition: 'right',
    fond: 'sand',
  },

  // ── 3. PROGRAMME — Qu'allez-vous apprendre ? ────────────────────────────────
  {
    _key: uid(),
    _type: 'sectionProgrammeCartes',
    eyebrow: 'Programme',
    titre: 'Qu\'allez-vous apprendre ?',
    colonnes: '3',
    fond: 'sand',
    items: [
      {
        _key: uid(), _type: 'carte',
        titre: 'Choisir le bon matériel',
        sousTitre: 'CANNE · SOIE · MOULINET',
        description: 'Quelle action de canne vous correspond ? Quelle puissance choisir selon l\'espèce et le secteur ? Le profil de soie est aussi déterminant pour bien lancer et bien pêcher.',
      },
      {
        _key: uid(), _type: 'carte',
        titre: 'Bien charger sa canne, sans effort',
        sousTitre: 'TIMING · SYNCHRONISATION',
        description: 'Savoir charger sa canne s\'apprend. Le timing et la synchronisation des mouvements en sont souvent la clef. Nous verrons comment optimiser vos lancers avec le minimum d\'effort.',
      },
      {
        _key: uid(), _type: 'carte',
        titre: 'Lancer à distance',
        sousTitre: 'MOYENNE ET LONGUE DISTANCE',
        description: 'Grâce à plus de 30 années de pratique intensive, je repère rapidement les mauvais gestes pour vous permettre de gagner significativement en aisance et en distance.',
      },
      {
        _key: uid(), _type: 'carte',
        titre: 'Lancer dans toutes les situations',
        sousTitre: 'ADAPTABILITÉ · CONDITIONS',
        description: 'Pour optimiser sa pêche et s\'adapter aux conditions, il faut maîtriser différents lancers. Je pourrai vous enseigner tous les lancers nécessaires à la pratique de la pêche à la mouche.',
      },
      {
        _key: uid(), _type: 'carte',
        titre: 'Les lancers spéciaux',
        sousTitre: 'COURBES · DÉTENDUS · SOUS LA CANNE',
        description: 'D\'autres lancers peuvent être d\'une grande aide pour mieux présenter vos mouches et prendre plus de poissons : lancers courbes, détendus, sous la canne, etc.',
      },
    ],
  },

  // ── 4. VIDÉOS — Orion Fly Fishing ───────────────────────────────────────────
  {
    _key: uid(),
    _type: 'sectionVideos',
    titre: 'Apprendre les bases du lancer — vidéos tutoriels',
    lienChaine: 'https://www.youtube.com/@OrionFlyFishing',
    labelChaine: 'Toutes les vidéos Orion Fly Fishing',
    fond: 'white',
    items: [
      {
        _key: uid(),
        titre: 'Les bases du lancer de pêche à la mouche',
        youtubeId: '',
        espece: 'Initiation · Fondamentaux',
        description: 'Cette vidéo de 44 minutes reprend tous les fondamentaux du lancer à la mouche et explique les erreurs principales et comment les corriger. Indispensable pour les débutants comme pour ceux qui souhaitent repartir sur de bonnes bases.',
      },
      {
        _key: uid(),
        titre: 'Apprendre le lancer revers',
        youtubeId: '',
        espece: 'Lancer revers',
        description: 'Le lancer revers permet de s\'adapter à la configuration de la rivière et d\'exploiter tous les postes, notamment en petite et moyenne rivière. Il permet aussi de lancer dans toutes les situations, même quand le vent est mal orienté.',
      },
      {
        _key: uid(),
        titre: 'Apprendre le lancer roulé',
        youtubeId: '',
        espece: 'Lancer roulé',
        description: 'Le lancer roulé permet de propulser sa mouche sans développer sa soie à l\'arrière — très pratique et efficace sur des postes encombrés ou exigus. C\'est aussi le lancer de base pour le Spey Cast.',
      },
      {
        _key: uid(),
        titre: 'Perfectionner sa technique — Lancer à distance',
        youtubeId: '',
        espece: 'Distance · Double traction',
        description: 'Il n\'est pas rare de devoir lancer plus vite et plus loin : réservoir, lac, pêche exotique. Le vent est souvent l\'ennemi n°1 — cette vidéo vous permettra d\'y faire face et de dépasser les 20 mètres.',
      },
    ],
  },

  // ── 5. CTA FINAL ────────────────────────────────────────────────────────────
  {
    _key: uid(),
    _type: 'sectionCta',
    titre: 'Prêt à progresser ?',
    texte: 'Cours disponibles toute l\'année, en individuel ou en duo. Réponse sous 24h.',
    btn1Texte: 'Réserver un cours',
    btn1Lien: '/contact',
    btn2Texte: 'Consulter les tarifs',
    btn2Lien: '/tarifs',
    style: 'dark',
  },
]

const result = await client
  .patch('prestation-cours-de-lancer-peche-a-la-mouche')
  .set({ pagebuilder })
  .commit()

console.log('OK — updated:', result._id)
console.log('Sections:', result.pagebuilder.map(s => s._type).join(', '))
