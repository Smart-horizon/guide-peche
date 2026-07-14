# Mapping 301 — plan de redirections du lancement

*Préparé le 14/07/2026, "en off" : tout est déjà embarqué dans le site et inerte
tant que les domaines ne pointent pas vers le worker. Testable sur workers.dev.*

## Architecture

Trois propriétés fusionnent dans le nouveau site au lancement :

| Domaine source | Destination | Mécanisme |
|---|---|---|
| jeanbaptistevidalguidepeche.com (Wix FR+EN) | mêmes URLs sur le nouveau site | transfert du domaine ; renommages via `public/_redirects` |
| enjoyfishing.fr (blog, 156 articles) | `/blog/…` | domaine attaché au worker ; redirections par hôte dans `src/middleware.js` |
| enjoyfishingbrittany.com (site EN) | `/en/…` | idem middleware |

Canonique : `https://www.jeanbaptistevidalguidepeche.com` (www, comme sur Wix).
L'apex redirige vers www (middleware).

## 1. Domaine principal — URLs identiques (rien à faire)

43 des 52 URLs du sitemap Wix existent à l'identique sur le nouveau site
(toutes les prestations, voyages, matériel, hub, tarifs, mouches, revue de
presse, partenaires, vidéos, bio, stage-peche-jeanbaptiste-vidal…). Les URLs
`/en/...` de Wix suivent le même schéma → identiques aussi.

## 2. Domaine principal — renommages et pages disparues (`public/_redirects`)

| Ancienne URL Wix | Nouvelle URL | Raison |
|---|---|---|
| /bon-cadeau-peche-mouche (+ /en/) | /bon-cadeau | renommée |
| /bateau-special-mouche-carnassier (+ /en/) | /bateau-bar-a-la-mouche | renommée ("fly fishing boat" #2 sur la version EN !) |
| /contact-jeanbaptiste-vidal-guide-de-peche (+ /en/) | /contact | page statique canonique |
| /temoignages-avis-jeanbaptiste-vidal (+ /en/) | /temoignages | page statique canonique |
| /book-online | /contact | module réservation Wix abandonné |
| /brochure-jeanbaptiste-vidal | /tarifs | |
| /conditions-generales-de-ventes | /contact ⚠️ | **temporaire — créer une vraie page CGV avant lancement (obligation légale, boutique !)** |
| /medias-jeanbaptistevidal | /revue-de-presse-jeanbaptiste-vidal-moniteur-guide-de-peche | |
| /voyage-peche-mouche-mer-exotique | /voyages-peche-mouche | "voyage pêche exotique" #11 |
| /voyage-peche-mouche-migrateurs | /voyages-peche-mouche | |
| /service-page/* | /stage-peche-jeanbaptiste-vidal | pages de réservation Wix |
| /peche-du-saumon-a-la-mouche-bretagne (+ /en/) | /peche-a-la-mouche-en-bretagne | orpheline, porte "pêche saumon bretagne" #3 → hub avec FAQ saumon |
| /riviere-leguer-guidage-mouche-saumon | /peche-a-la-mouche-en-bretagne | orpheline ("le léguer pêche" #5) |
| /peche-mouche-saumon-elle-guidage | /peche-de-la-truite-a-la-mouche-en-bretagne | orpheline (l'Ellé = rivière truite) |
| /sejours-de-peche-a-la-mouche-en-bretagne | /stage-peche-mouche | orpheline |

## 3. enjoyfishing.fr → /blog/ (middleware, par hôte)

- **Articles** : `/archive/AAAA/MM/JJ/<slug>.html` → `/blog/<slug>` — règle générique
  vérifiée : les slugs Sanity reprennent exactement l'ancien slug + ID
  (ex. `peche-du-bar-a-la-mouche-quel-materiel-utiliser-3261792`, l'article #1
  sur "pêche du bar à la mouche"). Couvre les 139 articles migrés avec ID ;
  les 17 sans ID sont des articles créés directement dans Sanity (pas d'ancienne URL).
- `/video*` → `/videos-jeanbaptiste-vidal-moniteur-guide-de-peche`
- `/voyages*` → `/voyages-peche-mouche`
- Tout le reste (accueil, `/tag/*`, archives mensuelles) → `/blog`

## 4. enjoyfishingbrittany.com → /en/ (middleware, par hôte)

| Ancienne page | Nouvelle URL |
|---|---|
| / (accueil), /galerie, mentions, confidentialité | /en/ |
| /rates | /en/tarifs |
| /your-guide, /about-3, /why-booking-with-us | /en/jean-baptiste-vidal-moniteur-guide-de-peche |
| /sight-fshing-for-sea-bass *(typo d'origine)* | /en/peche-du-bar-a-vue-a-la-mouche |
| /sea-bass-boat-fishing | /en/peche-mouche-bar-bateau-bretagne |
| /saltwater-fly-fishing | /en/peche-du-bar-a-la-mouche |
| /freshwater-fly-fishing | /en/peche-a-la-mouche-en-bretagne |
| /trout-fishing | /en/peche-de-la-truite-a-la-mouche-en-bretagne |
| /shad-fishing | /en/peche-de-l-alose-a-la-mouche |
| /bateaux-de-pêche | /en/bateau-bar-a-la-mouche |
| /location-enjoy-fishing-brittany, /contact-us | /en/contact |

## ✅ Checklist du jour J (transfert)

1. [ ] Créer la page CGV et remplacer sa redirection temporaire
2. [ ] Ajouter les 3 domaines (+ www) comme **Custom Domains du worker guide-peche** dans Cloudflare
3. [ ] Transférer/pointer les DNS des 3 domaines vers Cloudflare
4. [ ] Retirer le `noindex` (BaseLayout.astro) et déployer
5. [ ] Vérifier un échantillon de 301 par domaine (curl -I)
6. [ ] Google Search Console : valider les 3 propriétés, soumettre le sitemap du nouveau site
7. [ ] Surveiller la couverture GSC pendant 2-4 semaines (404, redirections)

## Tests possibles dès maintenant (workers.dev)

- `curl -I https://guide-peche.smart-horizon.workers.dev/bon-cadeau-peche-mouche` → 301 vers /bon-cadeau
- `curl -I .../archive/2021/12/03/peche-du-bar-a-la-mouche-quel-materiel-utiliser-3261792.html` → 301 vers /blog/…
- Les règles par hôte (middleware) ne se déclenchent que sur les vrais domaines — inertes sur workers.dev et localhost.
