import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const DOC_ID = 'page-videos-jeanbaptiste-vidal-moniteur-guide-de-peche'

const descriptions = {
  vid1297: "At the start of the year, Yann created this YouTube podcast channel to share the passion for fishing with all audiences — fans and influencers alike. It is a great honour to have been interviewed alongside some of the biggest names in lure fishing in France. You'll learn more about my professional journey, my passions in fishing, and my vision of the fly fishing guide profession and the future of salmon in France. Many thanks to Yann for having me. Enjoy watching!",
  vid2298: "In this video, I show you how to tie a simple but highly effective chironomid nymph that I use with great success on stillwater reservoirs. It works on a chironomid rig with a floating, intermediate or sinking line, as a dry fly dropper, below a booby, or in a washing-line setup. Enjoy tying!",
  vid3299: "In this video, I walk you through all the tackle you'll need for saltwater fly fishing — bonefish, permit, tarpon, GT, trevally, barracuda and more. A detailed guide to help you prepare for an exotic fishing trip, with key tips to put more fish on the hook!",
  vid4300: "In this video, I share my approach to fly fishing for sea bass — streamers and sight fishing, across all environments: sandy beaches, rocky points, oyster beds, open sea and estuaries. I also cover the tackle to use, which flies work best, and the fundamentals of targeting this superb predator.",
  'bae41b389e80': "In this episode, I introduce the roll cast — a technique that lets you adapt to any riverbank configuration and fish every spot, especially on small to medium rivers. It allows you to cast when there is no room to unfurl your line behind you, which is invaluable in many situations.",
  '9b2709781c35': "In this episode, I introduce the backhand cast — a technique that lets you adapt to any river configuration and cover every lie, especially on small and medium rivers. It also allows you to cast in any conditions, even into a crosswind, whether on a river, a lake or at sea.",
  '3a728b17b594': "This video covers the way I introduce my students to the fundamentals of fly casting. It is the perfect starting point for beginners, as well as a useful tool for correcting habits that have crept in over time and revisiting the core principles. Further videos will follow, exploring other cast types — roll cast, backhand cast, and more.",
  '110b47d8a059': "In this video, you will see me tie one of the salmon flies I rely on most for spring salmon fishing in Brittany — a pattern that also works abroad. In a smaller size, it makes an excellent fly for grilse (summer salmon).",
  ded714789c25: "A film showcasing salmon fly fishing on several Breton rivers with Jean-Baptiste Vidal, licensed fly fishing guide in Brittany. Filmed and edited by Mathieu Le Hec.",
  bf0803472395: "In this video, I show you one of the flies I use most for sea bass fly fishing, whether from a boat or the shore — a Deceiver: an essential pattern for sea bass that I have adapted and simplified.",
  '6a10d9e37d5e': "A film captured in July 2018 during a full day of boat fishing with Jean-Baptiste Vidal, licensed fly fishing guide in Brittany. Produced by Escape Feeling Media. Sea bass fly fishing is a fantastic challenge that Jean-Baptiste now offers to all his clients!",
  ec8247c910f1: "One of my most recent films, capturing some of my finest sight fishing catches — hunting sea bass on the fly in shallow water. Stalking this marine predator in these conditions is a true challenge that delivers unforgettable emotions, much like fishing for bonefish or permit on the flats.",
  d4805be070da: "In this video, I show you one of my most-used shad flies, for fishing in Brittany and beyond. In a smaller size, it works very well later in the season and for sight fishing.",
  '6a6473ed6a8a': "Shad fly fishing on the Aulne river with Jean-Daniel, who came all the way from Switzerland to chase migratory fish in Brittany — shad and salmon. Beautiful catches, powerful fights and lasting memories. Video edited by Julien Legendre.",
  '006547f97032': "During the 2015 season, I introduced many beginners to fly fishing. After a casting session on the lawn followed by a theory class on river ecosystems, reading the water and trout feeding, we headed to the river to practise in real conditions. Here is one of my students from that season, who had never held a fly rod before. A superb first session for a new convert to the sport.",
  f44bee8adacc: "In 2010 and 2011, I guided in Bolivia alongside my southern hemisphere seasons (Argentina — Rio Grande). Bolivia is a truly unique destination for dorado fishing in crystal-clear water, where you can also target pacu, yatoranas and catfish. An incredible experience, shared in this film edited by Nicolas Cadiou.",
}

const patch = client.patch(DOC_ID)
for (const [key, desc] of Object.entries(descriptions)) {
  patch.set({ [`pagebuilderEn[_key=="${key}"].description`]: desc })
}

const result = await patch.commit()
console.log('✅ Patched', result._id, '—', Object.keys(descriptions).length, 'video descriptions updated')
