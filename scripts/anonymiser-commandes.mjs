/**
 * Purge RGPD des commandes — anonymise les commandes de plus de 24 mois.
 *
 * Pourquoi 24 mois : les documents "commande" de Sanity ne sont PAS le registre
 * comptable (c'est Stripe qui porte l'obligation des 10 ans, art. L123-22 code
 * de commerce). Ici la finalité est opérationnelle — préparer et expédier le
 * colis, puis couvrir la garantie légale de conformité (2 ans). Passé ce délai
 * la finalité est éteinte : le RGPD impose d'effacer (art. 5.1.e).
 *
 * Anonymisation, pas pseudonymisation : on efface aussi stripeSessionId, sinon
 * la commande resterait ré-identifiable via Stripe et donc toujours soumise au
 * RGPD. Ce qui reste (numéro, date, articles, montants) n'identifie personne :
 * JBV garde son historique de ventes.
 *
 * Lancé chaque mois par .github/workflows/anonymiser-commandes.yml.
 *
 *   node scripts/anonymiser-commandes.mjs --dry-run   (n'écrit rien)
 *   node scripts/anonymiser-commandes.mjs
 */
import { createClient } from '@sanity/client'

const MOIS_RETENTION = 24
const DRY_RUN = process.argv.includes('--dry-run')

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌ SANITY_TOKEN manquant.')
  process.exit(1)
}

// Dataset PRIVÉ : c'est le seul endroit où vivent les données clients.
const client = createClient({
  projectId: 'uievv97s',
  dataset: 'commandes',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Champs porteurs de données personnelles, effacés en bloc.
const CHAMPS_PERSONNELS = [
  'client',            // nom, e-mail, téléphone
  'adresseLivraison',
  'pointRelais',
  'note',              // peut contenir un n° de suivi colis (= lié à une adresse)
  'stripeSessionId',   // clé de ré-identification chez Stripe
]

const limite = new Date()
limite.setMonth(limite.getMonth() - MOIS_RETENTION)
const limiteISO = limite.toISOString()

const cibles = await client.fetch(
  `*[_type == "commande"
     && !(_id in path("drafts.**"))
     && anonymisee != true
     && date < $limite
   ] | order(date asc) { _id, numero, date }`,
  { limite: limiteISO }
)

console.log(`🔒 Purge RGPD — rétention ${MOIS_RETENTION} mois`)
console.log(`   Commandes antérieures au ${limiteISO.slice(0, 10)} : ${cibles.length}`)

if (cibles.length === 0) {
  console.log('   Rien à faire.')
  process.exit(0)
}

if (DRY_RUN) {
  for (const c of cibles) console.log(`   [dry-run] ${c.numero} (${c.date?.slice(0, 10)})`)
  console.log('   Aucune écriture (--dry-run).')
  process.exit(0)
}

let ok = 0
for (const c of cibles) {
  try {
    await client
      .patch(c._id)
      .unset(CHAMPS_PERSONNELS)
      .set({ anonymisee: true })
      .commit({ visibility: 'async' })
    console.log(`   ✓ ${c.numero} (${c.date?.slice(0, 10)})`)
    ok++
  } catch (e) {
    // On continue : une commande en échec sera reprise au prochain passage.
    console.error(`   ✗ ${c.numero} — ${e.message}`)
  }
}

console.log(`✅ ${ok}/${cibles.length} commande(s) anonymisée(s).`)
if (ok < cibles.length) process.exit(1)
