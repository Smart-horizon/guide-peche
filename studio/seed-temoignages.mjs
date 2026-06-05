/**
 * seed-temoignages.mjs
 * Migration des 25 témoignages hardcodés → Sanity Studio
 *
 * Usage (depuis le dossier studio/) :
 *   node seed-temoignages.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skl1Jq1cu6ITb7XLmqhhExxPs49cBrlfmgynCLiVWj6a06hb09zCHnoaariWQdtgcTUzpyd9P3y5ocNpnUPYVOS863y3jY0rCxfIM2oAcfgPfaECJVFczkF1zzwztlb41HszbYACr8XRFzAxUqSLGyiba0KDzoA0g0m27TFwuniTC9BjMtPN',
  useCdn: false,
})

// ── 25 témoignages à migrer ──────────────────────────────────────────────────
// Chaque entrée : { _id, nom, prestation, texte }
// note = 5 pour tous, orderRank = index paddé (ex : '00001')

const temoignages = [
  // ── BAR À LA MOUCHE (3) ──────────────────────────────────────────────────

  {
    _id: 'temo-malcolm',
    nom: 'Malcolm',
    prestation: 'Bar à la mouche',
    texte: `Well, my day started with some apprehension as sight fishing with crab patterns was something I had never done nor considered doing before. I am a streamer/clouser pattern fisher and not used to short distance casting.

Jean has a wealth of experience accompanied by patience as I am sure I tested his level of patience. Jean briefly showed me what I was to do when spotting a bass and how to read the bass's typical movements.

It wasn't long after we started to search out some feeding bass when I had my first cast at a feeding bass. I cast the crab fly slightly away from the bass (my heart was pumping) and the bass moved towards the fly, watched it, tweaked the line, moving the fly 5mm....which induced the catch. Sadly my instinct was to grip down on the line causing to snap the tippet and loosing the fly at the same time. First lesson "DONT STOP THE FISH", simply lift and set the hook, the number let the fish run....the drag will do the rest.

I had a lot more opportunities to cast at feeding bass, stalking the weeded over growth. Despite not getting all the hookups I could have had, I learned through Jean where I was going wrong and how to spot bass. The skills Jean teaches you is worth all the time you saved up and time spend travelling to meet Jean, including time spent under his guidance.

5 ⭐⭐⭐⭐⭐ is not enough rating for the experience you will get. Book your trip, you won't regret it! Tight-lines! Many thanks Jean Baptiste.`,
  },

  {
    _id: 'temo-vincent',
    nom: 'Vincent',
    prestation: 'Bar à la mouche',
    texte: `3 jours de pêche avec Jean-Baptiste sur la côte Bretonne.

Jean-Baptiste est un guide passionné qui partage sa connaissance des lieux et des techniques de pêche du Bar afin de nous faire profiter de moments exceptionnels.

La pêche en bateau m'a permis de prendre mon premier Bar à la mouche dans un cadre magnifique, mais les deux journées de pêche à vue... que dire ! Je conseille à tout le monde d'essayer de prendre ces gros bars que Jean Baptiste connaît par cœur, de ressentir ces montées d'adrénaline, ce stress à la vue de Bars énormes postés devant vous à quelques mètres.

Encore plus heureux que moi du doublé que je réalise alors que je n'ai eu qu'à suivre ses conseils avisés.

Encore merci à toi, j'ai passé 3 jours de pêches magnifiques qui valent bien certaines destinations lointaines et qui n'appellent qu'à recommencer.`,
  },

  {
    _id: 'temo-marc',
    nom: 'Marc',
    prestation: 'Bar à la mouche',
    texte: `Deux jours avec Jean Baptiste : première journée pêche au bar à vue et 2ème journée de pêche au Bar en bateau.

Jean Baptiste connaît le poisson par cœur, ses habitudes, les sites qui vont bien. Super matos. Super conseils. Très agréable et efficace. Grande expérience du guidage.

Je suis satisfait à 100%. Je recommande et je reviendrai !`,
  },

  // ── SAUMON, ALOSE & SPEY CAST (15) ──────────────────────────────────────

  {
    _id: 'temo-diego',
    nom: 'Diego',
    prestation: 'Saumon',
    texte: `Certains apprentissages sont plus difficiles que d'autres, surtout quand l'esprit est déjà pollué par l'illusion du savoir. Il m'a fallu désapprendre pour réapprendre.

5 jours de stage intensif de techniques et tactiques de pêche au saumon à la mouche en Bretagne avec mon guide Jean-Baptiste Vidal. Le site est proprement magnifique et les rivières sont brunes et mystérieuses.

À la pêche au saumon à la mouche et en Speycast, j'ai pu faire cette expérience avec un professionnel, Jean-Baptiste Vidal, juste avant un nouveau confinement.

Mouches, lancers, dérives, angles, axes de posé et animation, rien ne manquait au programme ! Je salue le guide mais surtout le professeur dont la pédagogie et la patience auront été déterminantes.

Je ne peux que recommander Jean-Baptiste qui est à ce jour pour moi, le meilleur guide de pêche à la mouche que je connaisse. J'ai plus appris en quelques jours à peine qu'en 5 années !`,
  },

  {
    _id: 'temo-patrice',
    nom: 'Patrice',
    prestation: 'Saumon',
    texte: `Je tiens à remercier Jean-Baptiste pour son accompagnement et sa grande patience (!), après un total d'environ 10 jours de formation et de guidage au saumon, il a su m'amener aux bons endroits. Nous étions vraiment tout près cet été avec cette casse sur le Castillon et cette prise au mois d'Octobre, c'était tout simplement magique et quel sentiment intense que de pouvoir relâcher ce magnifique poisson, à jamais gravé dans ma mémoire et comme je tenais à ce que cela se fasse avec Jean-Baptiste, tout était simplement parfait !

Un grand merci à toi, Jean-Baptiste !`,
  },

  {
    _id: 'temo-patrice58',
    nom: 'Patrice, 58 ans, Normandie',
    prestation: 'Spey Cast',
    texte: `N'ayant plus pratiqué la pêche à la mouche depuis plus de 20 ans et à la suite d'un accident, ayant des difficultés à pêcher à une main, je me suis dit qu'il serait temps de sauter le pas et de m'initier au lancer à deux mains, avec l'objectif de pêcher à la mouche les poissons de ma Normandie, saumons et truites de mer, et aussi de profiter pleinement de ce que peut offrir le Gave d'Oloron.

Dès le premier contact au salon des pêches à la mouche de Carhaix en Février avec Jean-Baptiste, que je connaissais un peu grâce à ses excellents articles dans "Pêche Mouche", j'ai pu apprécier à la fois son humilité et son grand professionnalisme.

Rendez-vous fut donc pris pour 3 demi-journées de formation Spey-Cast et 3 demi-journées d'applications avec l'Alose et peut-être le Saumon. Merci pour ta patience, Jean-Baptiste, ce n'était pas gagné !

Le deuxième jour je prenais mes premières grandes aloses à la canne à deux mains et le troisième jour je me sentais assez à l'aise pour aller tenter le Saumon sur l'Ellé. Non seulement Jean-Baptiste a eu la patience et la pédagogie nécessaires pour comprendre mes blocages et me permettre de maîtriser suffisamment le lancer à deux mains, mais le mieux dans tout ça, c'est qu'il m'a redonné furieusement envie de pêcher à la mouche !

Un grand Merci et à très bientôt.`,
  },

  {
    _id: 'temo-patrick-alain',
    nom: 'Patrick et Alain',
    prestation: 'Saumon',
    texte: `Jean-Baptiste, nous sommes rentrés et j'ai bien reçu tes jolies photos. Je garde un excellent souvenir de notre rencontre et n'hésiterai pas à les publier et les commenter.

Je tiens simplement à te remercier pour l'excellent guidage dont tu as fait preuve lors de notre séjour en Bretagne. Des conseils multiples et précis et d'une efficacité redoutable. Quant à mon lancer "saumon" il s'est considérablement amélioré. C'est sans appréhension que dès à présent je pourrai affronter les endroits les plus difficiles pour le Speycast.

Pour illustrer la qualité de notre guide : conditions de pêche très difficiles — plein soleil, vent d'est et eaux basses. Pas un poisson ne bouge. La seule alose prise sur ce spot ce jour-là est celle-ci !

Je te souhaite une bonne continuation dans ton entreprise.`,
  },

  {
    _id: 'temo-mathieu-philippe',
    nom: 'Mathieu et Philippe',
    prestation: 'Saumon',
    texte: `Passionnés de pêche, nous avons décidé mon pote Mathieu et moi d'aller pêcher en Bretagne, région totalement inconnue pour moi. Ayant peu de temps, nous avons fait le choix de prendre un guide, mais pas n'importe quel guide — on nous avait très fortement conseillé de réserver avec Jean-Baptiste Vidal, et je vous avoue que je ne l'ai pas regretté !

Notre séjour s'est déroulé sur deux jours. Matériels, mouches, nourriture... tout y était. Jean Baptiste nous a conseillé de faire une journée truite puis une journée Saumon.

Le premier jour nous a permis de prendre quelques truites et surtout de découvrir les belles rivières bretonnes. Le deuxième jour a été extraordinaire : les conseils de Jean-Baptiste sur la maîtrise de la canne à deux mains et du choix de la mouche ont été prometteurs. C'est clair, sans Jean Baptiste, je n'aurai jamais fait un saumon de 79 cm pour 11/12 livres !

Encore mille merci à Jean Baptiste et à la Bretagne.`,
  },

  {
    _id: 'temo-antoine',
    nom: 'Antoine',
    prestation: 'Saumon',
    texte: `L'Elorn est une magnifique rivière à saumons mais comme beaucoup de rivières bretonnes la pêche du saumon par son approche me semblait différente de ce que l'on peut pratiquer à l'étranger.

Cette magnifique journée m'a permis de comprendre comment prospecter différents types de pools plus ou moins profonds, calmes ou rapides. Comment lancer et présenter la mouche, comment animer ou pas la mouche, bref tout ce qui me manquait pour aborder ce type de rivière.

Après avoir mangé d'excellentes crêpes bretonne, nous avons passé une après-midi de folie puisque sous les conseils de Jean Baptiste j'ai raté/décroché 5 saumons jusqu'au dernier qui prend la mouche à un mètre de mes pieds en fin de journée sur le dernier spot.

Nous nous souviendrons de cette après-midi et vivement l'année prochaine pour de nouvelles émotions !`,
  },

  {
    _id: 'temo-jerome-veyret',
    nom: 'Jérôme Veyret',
    prestation: 'Alose',
    texte: `Après avoir lu ses articles dans Pêche Mouche et parcouru de fond en comble son site internet / blog, l'envie de pêcher l'alose ne me lâchait plus. Rendez-vous fut pris pour 2 jours mi mai 2016 — à priori les conditions étaient loin d'être optimales : remontées d'aloses trois fois inférieures à celles de l'année 2015 à la même époque sur l'Aulne.

Mazette, ça s'annonçait plutôt corsé, mais Jean Baptiste connaît son sujet et selon lui un spot pourrait bien donner sur l'Aulne. Immédiatement sur place on constate qu'elles sont bel et bien là, maintenant y a plus qu'à...

Grâce à ses conseils, ses mouches, ses astuces de présentation, rapidement je prends "contact" avec ces aloses. JB en profite pour m'initier aux lancers double spey, reverse C, etc...

2 jours dont je repartirai enchanté, avec un nombre de captures au delà de mes espérances initiales. Un bilan très positif avec un guide qui allie rigueur, sérieux tout en étant fort sympathique.

Merci à toi Jean Baptiste et à une prochaine fois !`,
  },

  {
    _id: 'temo-yann-leprevost',
    nom: 'Yann Le Prevost',
    prestation: 'Saumon',
    texte: `Salut JB. Pour raison professionnelle, la saison s'est terminée hier pour moi. Encore une journée forte en émotion mais pas de saumon au sec. Ces deux dernières semaines, j'ai piqué environ 6 saumons mais ils se sont tous décrochés avant de les sortir.

Sinon au bilan c'est plutôt positif et tu y es pour beaucoup. J'ai pu apprendre le Spey Cast qui a changé foncièrement ma façon de pêcher. Tu m'as donné les clés pour appréhender les postes à saumon, les bonnes présentations et quelques coins magiques. Et surtout, gros point positif, tu m'as fait découvrir l'Alose qui m'a régalé pendant presque 2 mois.

Un grand merci du coup pour ce stage qui m'a fait sauter quelques années de galère solitaire et un deuxième grand merci pour ta disponibilité et tes conseils après le stage. Je reprendrai une journée ou deux l'année prochaine pour progresser encore et enfin sortir un fish. Bonne fin de saison pour toi et à bientôt sur Quimperlé !`,
  },

  {
    _id: 'temo-guy-bonel',
    nom: 'Guy Bonel',
    prestation: 'Saumon',
    texte: `Venir sur ton blog, Jean Baptiste, me retrempe dans ces douces journées de septembre sur les rivières du Finistère que je découvrais alors, en ta compagnie.

Quelques dizaines d'années à pêcher la truite à la mouche m'ont permis d'accréditer et de valider l'hypothèse qu'un guide de pêche est INDISPENSABLE et fait économiser des heures de recherche et d'errance (mais pas que !), que l'on peut opportunément et plaisamment consacrer à une recherche efficace du poisson !

Et j'aspire à retrouver ce garçon d'une disponibilité hors du commun, connaissant à fond ses domaines technique et géographique, toujours prêt à partager sans aucune réserve ses connaissances, son savoir.

J'ai appris beaucoup de toi et j'admire ton respect du poisson, de ce qui l'entoure et du pêcheur (même lorsque je fus maladroit....). J'apprécie ce contact, direct et franc, à la fois professionnel, humain et bienveillant, que tu maintiens en et hors guidage !

Bon vent à toi, sur tous tes chemins !`,
  },

  {
    _id: 'temo-michael-arraitz',
    nom: 'Michael Arraitz',
    prestation: 'Saumon',
    texte: `Passionné de pêche à la mouche depuis quelques années, je découvre Jean Baptiste Vidal avec ses articles de grande qualité dans "Pêche Mouche".

Je prends contact avec lui au printemps pour un premier séjour pour la pêche de l'Alose avec des conseils sur la technique du roulé et single Spey.

Je découvre alors un homme passionné, passionnant avec de vrais sens de la communication et du partage. Que dire de sa connaissance technique, elle est remarquable.

Pêche de l'alose sur l'Aulne avec des poissons mordeurs et de beaux combattants. Puis un séjour pour la découverte du saumon (accompagné d'un de mes fils) sur l'Ellé avec quelques beaux ratés ! Deuxième séjour sur l'Aven et le Scorff, sur des eaux basses et limpides. Jean Baptiste me fait prendre avec bonheur deux jolis poissons dans de magnifiques circonstances.

Lequel du pêcheur ou du guide était le plus heureux ? Probablement moi, tout de même !

Merci Jean Baptiste, ton terrain de jeu est somptueux. Ta passion est magnifique et contagieuse.`,
  },

  {
    _id: 'temo-jean-daniel-pilotto',
    nom: 'Jean-Daniel Pilotto',
    prestation: 'Saumon',
    texte: `Prendre un saumon à la mouche en France ! Il s'agissait pour moi d'un pari hasardeux jusqu'au jour où les articles de Jean-Baptiste Vidal dans Pêche Mouche m'ont convaincu du contraire.

Rendez-vous pris pour quatre journées de guidage sur les plus belles rivières bretonnes. Première impression : plutôt dépaysant pour un pêcheur habitué à pratiquer sur les grandes rivières écossaises et espagnoles !

La Bretagne offre une pêche technique avec des conditions d'eaux basses mais des poissons bien présents et de réelles chances de succès. C'est grâce à la parfaite maîtrise de son sujet que Jean-Baptiste a finalement gagné son pari : me faire prendre mon premier saumon français.

Finalement que du bonheur lors de cette semaine partagée avec mon guide dont j'ai apprécié la compétence ainsi que les qualités professionnelles et humaines hors du commun. Une belle rencontre qui me fera revenir pêcher sur les rives de l'Ellé, du Scorff ou de l'Aven.`,
  },

  {
    _id: 'temo-woestelandt',
    nom: 'Mr et Mme Woestelandt',
    prestation: 'Spey Cast',
    texte: `Nous tenons à remercier Jean-Baptiste pour la gentillesse et la patience qu'il a eu à notre égard. Guide passionné que nous recommandons.

Il nous a fait découvrir les rivières bretonnes tout particulièrement l'Ellé, l'Aulne et le Jet. Bien que les saumons, aloses et truites n'étaient au rendez-vous (cause forte chaleur), nous avons passé un agréable séjour riche d'enseignements techniques.

Marie-Christine et Jean-Claude Woestelandt`,
  },

  {
    _id: 'temo-yann-leprevost-2',
    nom: 'Yann Le Prevost',
    prestation: 'Saumon',
    texte: `J'ai fait appel à Jean-Baptiste pour apprendre à pêcher le saumon à la mouche. J'ai donc appris les bases de l'utilisation des cannes à deux mains et du Spey Cast. À l'écoute et patient, il dispense ses conseils avec une grande pédagogie. Il connaît bien la rivière et ses occupants et sait vous amener au bon endroit au bon moment.

Enfin, sa gentillesse et son entrain ont transformé ces deux jours d'apprentissage en une super partie de pêche avec un copain. J'envisage déjà de refaire appel à lui l'année prochaine pour un guidage Alose !`,
  },

  {
    _id: 'temo-pierre-sabourin',
    nom: 'Pierre Sabourin',
    prestation: 'Saumon',
    texte: `Après trois séjours cette année en Bretagne avec J.B. j'ai beaucoup apprécié son excellente maîtrise des lancers les plus acrobatiques. Sa connaissance de la rivière et son œil de Lynx ; son attention soutenue à toutes les maladresses des pêcheurs occasionnels qui ont besoin de ses services ; son adaptation instantanée à l'état de l'eau, tout en passant d'une rivière à l'autre avec aisance (Aulne, Elorn, Ellé).

Projets 2015 avec lui sans hésiter.`,
  },

  {
    _id: 'temo-cedric-goh',
    nom: 'Cédric Goh, Rennes',
    prestation: 'Saumon',
    texte: `Jean-Baptiste m'a permis de m'initier à la pêche au saumon à la mouche très simplement et amicalement. Il a réussi à m'apprendre les bases des lancers à deux mains ainsi que les tactiques de pêches. Il connaît parfaitement bien les secteurs qu'il propose et j'ai vraiment apprécié qu'il m'ait envoyé par la suite les indications pour les retrouver plus tard de mon côté.

Toujours de bon conseil et nous prend en photo pour de merveilleux souvenirs. Je le recommande vivement !`,
  },

  // ── TRUITE & INITIATION (5) ──────────────────────────────────────────────

  {
    _id: 'temo-christophe',
    nom: 'Christophe',
    prestation: 'Truite en rivière',
    texte: `Superbe session de guidage, pendant 2 jours 1/2, sur le Scorff et l'Isole, avec Jean-Baptiste Vidal.

Comme souhaité, j'ai découvert la pêche en noyée et en nymphe, et progressé sur la pêche en sèche. Je pense qu'il me faudra quelques années pour prendre, sans ses conseils, autant de truites que mercredi.

À celles et ceux qui cherchent un guide, n'hésitez pas à le contacter, il connaît son domaine et les rivières où il guide.

Bonne continuation Jean-Baptiste, merci pour tous les conseils prodigués, et la découverte de l'Isole. Je reviendrai pour progresser encore, dès que mon revers et le lancé roulé ne seront plus hasardeux.`,
  },

  {
    _id: 'temo-christian',
    nom: 'Christian',
    prestation: 'Truite en rivière',
    texte: `Enfin la date attendue du 12 juillet avec le ZIDANE de la pêche... après une mauvaise bronchite en début de vacances, cette journée ensoleillée est pleine de promesses, car le débutant que je suis n'a pas encore sorti une belle "TOTOCHE" de l'eau (hé oui, je suis débutant depuis quelques années déjà, mais c'est comme ça quand on va à la pêche une fois par an...).

Mes sorties sur le Scorff dont la couleur de l'eau a été troublée suite aux grosses pluies de la semaine n'ont pas été très satisfaisantes.

Jean Baptiste me propose une merveille de petite rivière, aux eaux cristallines... La rivière est limpide et l'activité visible avec des gobages réguliers... c'est mon jour !

Effectivement après 6 truites dans le même pool et autant de ratés, je sens que ça tire plus fort... et nous mettons au sec un superbe fario de 29 cm, mon record (aussitôt remis à l'eau...).

Voilà une journée qui sauve mes vacances. Merci ZIZOU, (je veux dire Jean Baptiste...) et à l'année prochaine... "CHAMPION DU MONDE !!!!!"`,
  },

  {
    _id: 'temo-jerome',
    nom: 'Jérome',
    prestation: 'Initiation pêche à la mouche',
    texte: `Merci pour ce moment (2 jours) de plaisirs à remonter le Scorff et l'Ellé avec toi et à apprendre les rudiments de la technique.

Nous avons quand même sorti quelques truites et tacons ! Avec le beau temps de la Bretagne, un super guide et un super spot de pêche, j'ai passé un moment exquis.

À l'année prochaine sans doute et je vais de suite me commander du matériel.`,
  },

  {
    _id: 'temo-christian-chris-ferrier',
    nom: 'Christian et Chris Ferrier',
    prestation: 'Initiation pêche à la mouche',
    texte: `Nous rentrons mon fils Chris (12 ans) et moi d'un séjour de 4 jours avec Enjoy Fishing pour apprendre les rudiments et le perfectionnement de la pêche à la mouche que ce soit pour la truite et/ou le saumon.

Nous sommes plus qu'enchantés de ce séjour, et je ne peux que vous recommander, que vous soyez novice ou expérimenté, de venir comme nous avec Monsieur Jean-Baptiste Vidal pêcher dans ces superbes rivières de Bretagne.

Professionnel de cette activité de loisirs, il vous fera découvrir dans les moindres détails l'envie et le goût de pêcher sous ses multiples conseils. Extrêmement sérieux et attentif, simple, agréable, convivial avec de l'expérience en France et à l'étranger à revendre, c'est vraiment l'idéal de profiter d'un séjour de pêche à la mouche en sa compagnie.

Encore merci Jean Baptiste et sans doute à une prochaine fois. Très cordialement. Christian et Chris Ferrier`,
  },

  {
    _id: 'temo-fiona-romain',
    nom: 'Fiona et Romain',
    prestation: 'Initiation pêche à la mouche',
    texte: `Ce fut un formidable moment que cette journée initiation pêche à la mouche !

Nous nous étions offert cette petite séance dans le but d'acquérir les bases de la technique et de découvrir les rivières du Finistère... Objectifs atteints Jean Baptiste !

Ce fut un vrai plaisir d'apprendre avec toi. Pas de stress, de la rigolade et surtout un excellent prof qui ne se contente pas de l'apprentissage brut du lancer mais fait découvrir l'art qu'est véritablement la pêche à la mouche.

On regardera les rivières du Finistère avec un autre œil, et Romain est bien parti pour persévérer pour un jour atteindre ton niveau (on ne sait jamais ;)

Au plaisir de se revoir les pieds dans l'eau, bonne continuation Jean Baptiste !`,
  },

  // ── VOYAGES INTERNATIONAUX (3) ───────────────────────────────────────────

  {
    _id: 'temo-mary-ann',
    nom: 'Mary-Ann',
    prestation: 'Voyage',
    texte: `My husband and I first fished with JBV in Argentina. He guided us for our first experience with the Golden Dorado at Pira Lodge and its estuaries. Fishing is his PASSION!

It was amazing to see a Frenchman, who didn't know any Spanish, guide us with ease. His English was impeccable as was his guiding skills. He knew exactly where to find the Dorados. It was up to us to NOT hook them. But we did! We had a great experience with JB.

When we fished Dorados in Bolivia several years later, we were pleasantly surprised to see JB guiding there! Once again he brought us to fish that we caught! And he spoke fluent Spanish!!!

JB is an amazing guy and guide. His passion for fishing is a blessing for him and his clients!`,
  },

  {
    _id: 'temo-jean-pierre',
    nom: 'Jean-Pierre',
    prestation: 'Bar à la mouche',
    texte: `Très heureux de la journée passée en ta compagnie où tu as parfaitement identifié mes lacunes et t'en remercie vivement. Il me reste à travailler les 3 points essentiels que tu as caractérisés. Je suis du genre opiniâtre, tu peux compter sur moi pour y remédier.

J'ai apprécié ton professionnalisme et ta grande maîtrise du sujet mouche indépendamment de ton contact agréable. Je n'hésiterai pas à te recommander, cela va sans dire...`,
  },

  {
    _id: 'temo-cary-pugh',
    nom: 'Cary Pugh',
    prestation: 'Voyage',
    texte: `Jean Baptiste is an excellent fisherman of course but what makes him an excellent guide is his ability to understand the goals and skills of his clients and put his clients in a position to succeed in light of those. He is willing to teach if you want to learn and also is willing to step back and let you experiment as well.

We didn't need to catch fish to have fun — his personality and enthusiasm ensured a good time — but the fish were awesome too! I'd fish anywhere if he could guide me.`,
  },
]

// ── IDs des anciens témoignages "seeds" à supprimer ─────────────────────────
// On récupère tous les documents existants et on supprime les seeds (sauf
// ceux qui ont déjà un _id "temo-*" pour éviter d'écraser une migration précédente)

async function run() {
  console.log('🔍 Récupération des témoignages existants...')
  const existing = await client.fetch(
    `*[_type == "temoignage"]{ _id, nom }`
  )
  console.log(`   → ${existing.length} témoignage(s) en base`)

  // Sépare les seeds (ID auto-généré par Sanity, ex: "a1b2c3d4e5f6")
  // des éventuels documents déjà migrés (ID "temo-*")
  const seeds   = existing.filter(d => !d._id.startsWith('temo-'))
  const migrated = existing.filter(d => d._id.startsWith('temo-'))

  if (migrated.length > 0) {
    console.log(`\n⚠️  ${migrated.length} témoignage(s) déjà migrés (temo-*) détectés.`)
    console.log('   Utilisation de createOrReplace → mise à jour en place.\n')
  }

  // Suppression des seeds si présents
  if (seeds.length > 0) {
    console.log(`🗑️  Suppression de ${seeds.length} ancien(s) seed(s)...`)
    for (const doc of seeds) {
      await client.delete(doc._id)
      console.log(`   ✓ Supprimé : ${doc.nom} (${doc._id})`)
    }
  }

  // Insertion / mise à jour des 25 témoignages
  console.log(`\n📥 Import de ${temoignages.length} témoignages...`)

  for (let i = 0; i < temoignages.length; i++) {
    const { _id, nom, prestation, texte } = temoignages[i]
    const orderRank = String(i + 1).padStart(5, '0')

    await client.createOrReplace({
      _type: 'temoignage',
      _id,
      orderRank,
      nom,
      note: 5,
      prestation,
      texte,
    })

    console.log(`   ✓ [${String(i + 1).padStart(2, '0')}/25] ${nom}`)
  }

  console.log('\n✅ Migration terminée — 25 témoignages importés dans Sanity.')
  console.log('   Rendez-vous dans Sanity Studio → ⭐ Témoignages pour vérifier et réordonner.')
}

run().catch(err => {
  console.error('❌ Erreur :', err.message)
  process.exit(1)
})
