# Mapping 301 — plan de redirections du lancement

*Préparé le 14/07/2026, "en off" : la partie chemins est déjà embarquée dans le
site (testable sur workers.dev), la partie domaines est prête à coller dans
Cloudflare au jour J.*

## Architecture (et pourquoi)

| Quoi | Mécanisme | Quand |
|---|---|---|
| Renommages de chemins sur le domaine principal | `public/_redirects` (couche assets) + exclusions `run_worker_first` dans `patch-wrangler.cjs` | déjà actif, testé sur workers.dev |
| enjoyfishing.fr → /blog/… | **Redirect Rules Cloudflare** (édge, avant le worker) | au lancement |
| enjoyfishingbrittany.com → /en/… | **Redirect Rules Cloudflare** | au lancement |
| apex → www (canonique) | **Redirect Rule Cloudflare** | au lancement |

Deux pièges découverts et contournés (ne pas revenir en arrière) :
1. **Jamais de redirection dans le middleware Astro** : il s'exécute pendant le
   prerender (host du build = celui de `site`) → une règle host a transformé tout
   un build en stubs de redirection. Et il ne tourne pas au runtime pour les
   pages statiques.
2. **`run_worker_first: true` global avale les 301 de `_redirects`** (le worker
   suit la redirection en interne et sert un 200). D'où la liste d'exclusions
   dans `patch-wrangler.cjs` : les anciennes URLs sont servies par la couche
   assets, qui émet de vrais 301. ⚠️ Toute nouvelle règle dans `_redirects`
   doit être ajoutée aux exclusions.

Canonique : `https://www.jeanbaptistevidalguidepeche.com` (www, comme sur Wix).

## 1. Domaine principal — URLs identiques (rien à faire)

43 des 52 URLs du sitemap Wix existent à l'identique sur le nouveau site
(prestations, voyages, matériel, hub, tarifs, mouches, revue de presse,
partenaires, vidéos, bio…). Les URLs `/en/...` suivent le même schéma.

## 2. Domaine principal — renommages et pages disparues (`public/_redirects`) ✅ actif

| Ancienne URL Wix | Nouvelle URL | Raison |
|---|---|---|
| /bon-cadeau-peche-mouche (+ /en/) | /bon-cadeau | renommée |
| /bateau-special-mouche-carnassier (+ /en/) | /bateau-bar-a-la-mouche | renommée ("fly fishing boat" #2 sur la version EN !) |
| /contact-jeanbaptiste-vidal-guide-de-peche (+ /en/) | /contact | page statique canonique |
| /temoignages-avis-jeanbaptiste-vidal (+ /en/) | /temoignages | page statique canonique |
| /book-online | /contact | module réservation Wix abandonné |
| /brochure-jeanbaptiste-vidal | /tarifs | |
| /medias-jeanbaptistevidal | /revue-de-presse-jeanbaptiste-vidal-moniteur-guide-de-peche | |
| /voyage-peche-mouche-mer-exotique | /voyages-peche-mouche | "voyage pêche exotique" #11 |
| /voyage-peche-mouche-migrateurs | /voyages-peche-mouche | |
| /service-page/* | /stage-peche-jeanbaptiste-vidal | pages de réservation Wix |
| /peche-du-saumon-a-la-mouche-bretagne (+ /en/) | /peche-a-la-mouche-en-bretagne | orpheline, porte "pêche saumon bretagne" #3 → hub avec FAQ saumon |
| /riviere-leguer-guidage-mouche-saumon | /peche-a-la-mouche-en-bretagne | orpheline ("le léguer pêche" #5) |
| /peche-mouche-saumon-elle-guidage | /peche-de-la-truite-a-la-mouche-en-bretagne | orpheline (l'Ellé = rivière truite) |
| /sejours-de-peche-a-la-mouche-en-bretagne | /stage-peche-mouche | orpheline |
| /archive/* et /tag/* | /blog | filet de sécurité (règle fine côté enjoyfishing.fr) |

## 3. enjoyfishing.fr → /blog/ (Redirect Rules Cloudflare, au lancement)

Zone Cloudflare `enjoyfishing.fr` → Rules → Redirect Rules, dans cet ordre :

**Règle 1 — articles (139 articles migrés, slugs identiques + ID)** :
- Si : Wildcard pattern — hostname `*enjoyfishing.fr`, path `/archive/*/*/*/*.html`
- Alors : URL statique dynamique →
  `concat("https://www.jeanbaptistevidalguidepeche.com/blog/", http.request.uri.path.segments[4])`
  *(variante wildcard : cible `https://www.jeanbaptistevidalguidepeche.com/blog/${4}` — le 4e joker capture le slug sans le `.html`)*
- 301. Vérifié : slug Sanity = ancien slug (ex. `peche-du-bar-a-la-mouche-quel-materiel-utiliser-3261792`).

**Règle 2 — vidéos** : path `/video*` → `https://www.jeanbaptistevidalguidepeche.com/videos-jeanbaptiste-vidal-moniteur-guide-de-peche` (301)

**Règle 3 — voyages** : path `/voyages*` → `https://www.jeanbaptistevidalguidepeche.com/voyages-peche-mouche` (301)

**Règle 4 — tout le reste** (accueil, /tag/*, archives mensuelles) : hostname `*enjoyfishing.fr` → `https://www.jeanbaptistevidalguidepeche.com/blog` (301)

## 4. enjoyfishingbrittany.com → /en/ (Redirect Rules Cloudflare, au lancement)

Une règle par ligne (Single Redirects, static), puis un catch-all :

| Ancienne page | Nouvelle URL |
|---|---|
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
| catch-all (accueil, galerie, mentions…) | /en/ |

## 5. apex → www (Redirect Rule Cloudflare, au lancement)

Zone `jeanbaptistevidalguidepeche.com` : hostname `jeanbaptistevidalguidepeche.com`
→ `https://www.jeanbaptistevidalguidepeche.com${http.request.uri.path}` (301, preserve query).

## ✅ Checklist du jour J (transfert)

1. [x] ~~Créer la page CGV~~ — fait le 14/07/2026 : `/conditions-generales-de-ventes` migrée de Wix (même URL, page Sanity éditable). ⚠️ À compléter avec un volet « vente de produits » (rétractation 14 j, livraison) avant l'ouverture de la boutique.
2. [ ] Ajouter `www.jeanbaptistevidalguidepeche.com` comme Custom Domain du worker guide-peche
3. [ ] Pointer les DNS des 3 domaines vers Cloudflare (zones actives)
4. [ ] Créer les Redirect Rules des sections 3, 4 et 5
5. [ ] Retirer le `noindex` (BaseLayout.astro) et déployer
6. [ ] Vérifier un échantillon de 301 par domaine (`curl -I`)
7. [ ] Google Search Console : valider les 3 propriétés, soumettre le sitemap
8. [ ] Surveiller la couverture GSC pendant 2-4 semaines (404, redirections)

## Tests possibles dès maintenant (workers.dev)

```
curl -I https://guide-peche.smart-horizon.workers.dev/bon-cadeau-peche-mouche      → 301 /bon-cadeau
curl -I https://guide-peche.smart-horizon.workers.dev/archive/2021/12/03/x.html    → 301 /blog
curl -I https://guide-peche.smart-horizon.workers.dev/temoignages-avis-jeanbaptiste-vidal → 301 /temoignages
```
