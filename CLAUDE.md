# CONTEXTE PROJET — Site Jean-Baptiste Vidal
# Guide de pêche à la mouche en Bretagne
# Fichier de briefing pour Claude Code

---

## 🎯 OBJECTIF DU PROJET

Refonte complète du site vitrine de Jean-Baptiste Vidal (guide de pêche à la mouche professionnel en Bretagne) en migrant de Wix vers une stack moderne :
- **CMS** : Sanity (headless)
- **Frontend** : Astro
- **Hébergement** : Cloudflare Pages
- **Dépôt** : GitHub (Smart-horizon/guide-peche)

---

## 👤 LE CLIENT

**Jean-Baptiste Vidal**
- Moniteur-Guide de pêche à la mouche professionnel
- Basé en Bretagne-Sud (entre Quimper et Quimperlé)
- 33 ans de pêche à la mouche, 21 ans de guidage
- A pêché dans 12+ pays (Argentine, Russie, Bolivie, Irlande, Cuba, Venezuela, Mexique...)
- Site actuel : jeanbaptistevidalguidepeche.com (Wix)
- Blog actuel : enjoyfishing.fr (à fusionner)
- Le guide n'est PAS technique — il utilisera uniquement Sanity Studio via navigateur
- Il ne verra jamais de code

---

## 🏗️ STACK TECHNIQUE

```
Sanity Studio  →  Astro  →  Cloudflare Pages
  (CMS)           (front)     (hébergement)
```

- **Project ID Sanity** : uievv97s
- **Datasets** : `production` (public) + `commandes` (privé) — voir ci-dessous
- **Organisation Sanity** : Smart-horizon
- **Plan Sanity** : Growth (2 datasets inclus — les 2 sont utilisés)
- **GitHub repo** : https://github.com/Smart-horizon/guide-peche
- **Site live** : https://guide-peche.smart-horizon.workers.dev
- **Node.js** : v24.16.0
- **npm** : 11.13.0

### 🔒 Deux datasets — à ne pas confondre

| Dataset | Visibilité | Contenu | Qui y accède |
|---|---|---|---|
| `production` | **public** en lecture | Tout le contenu éditorial : pages, prestations, voyages, articles, **produits + stocks**, paramètres | Le site (build + workers), sans token |
| `commandes` | **privé** | Uniquement les documents `commande` (nom, e-mail, téléphone, adresse des clients) | Le webhook Stripe (SANITY_TOKEN) + les membres du projet via le Studio |

**Pourquoi** : `production` est en lecture publique — n'importe qui peut interroger son endpoint GROQ sans authentification. Y laisser les commandes exposerait les données personnelles des clients (obligation RGPD). Elles sont donc isolées dans un dataset privé.

**Ce que ça implique** :
- Le Studio a **deux workspaces** (`studio/sanity.config.js` exporte un tableau). JBV bascule de l'un à l'autre via le sélecteur en haut à gauche. Son marque-page `jbvidal.sanity.studio` reste valable : la racine redirige vers le workspace du site.
- ⚠️ Sanity impose que tous les `basePath` aient le **même nombre de segments** : le workspace principal ne peut donc pas rester sur `/` (d'où `/site` + `/commandes`). `sanity build` ne détecte PAS cette erreur — elle n'apparaît qu'au chargement du Studio. Toujours vérifier avec `sanity dev` après avoir touché aux workspaces.
- Le type `commande` n'est **pas** dans `schemaTypes` (il est dans `commandeTypes`) — ne pas l'y remettre.
- `src/pages/api/stripe-webhook.js` utilise **deux clients** : `sanityCmd` écrit la commande dans `commandes`, `sanity` lit/patche les stocks dans `production`.
- Le StockTool et les produits restent dans `production` — le suivi des stocks n'est pas concerné.
- ⚠️ Jamais de `reference` entre une commande et un produit : les références Sanity ne traversent pas les datasets. Les lignes de commande recopient titre/prix en dur, c'est voulu.
- Un dataset privé renvoie `200` + liste vide (pas un `401`) aux requêtes non authentifiées.
- ⚠️ Rendre un dataset privé ne protège **pas** les assets (images) : `cdn.sanity.io` reste accessible par URL.

### ⏳ Rétention RGPD — 24 mois

Un cron mensuel (`.github/workflows/anonymiser-commandes.yml`) lance `scripts/anonymiser-commandes.mjs`, qui **anonymise** les commandes de plus de 24 mois : `client`, `adresseLivraison`, `pointRelais`, `note` et `stripeSessionId` sont effacés, `anonymisee: true` est posé. Le numéro, la date, les articles et les montants restent → JBV garde son historique de ventes.

**Le raisonnement, à ne pas perdre** :
- L'obligation comptable des **10 ans** (art. L123-22 code de commerce) porte sur les factures : c'est **Stripe** qui la remplit, pas Sanity. Les documents `commande` ne sont qu'un outil opérationnel (préparer et expédier le colis).
- Une fois cette finalité éteinte, le RGPD **impose** d'effacer (art. 5.1.e) — les 10 ans ne sont pas une autorisation de garder 10 ans.
- 24 mois = couverture de la garantie légale de conformité (2 ans). La CNIL recommande par ailleurs « relation commerciale + 3 ans » en base active et 5 ans d'archivage intermédiaire (prescription, art. L110-4) — durées applicables à un fichier client, que JBV n'a pas ici.
- ⚠️ `stripeSessionId` est effacé **volontairement** : le garder rendrait la commande ré-identifiable via Stripe → pseudonymisation et non anonymisation, donc toujours dans le champ du RGPD. Ne pas le remettre.
- `note` est effacé aussi : JBV peut y mettre un n° de suivi colis, lié à une adresse.

Test à blanc possible à tout moment : onglet Actions → « Purge RGPD des commandes » → Run workflow (case simulation cochée par défaut).

---

## 📁 STRUCTURE DU PROJET

```
guide-peche/
├── src/
│   ├── pages/
│   │   └── index.astro        ← page d'accueil (à construire)
│   ├── layouts/               ← à créer
│   ├── components/            ← à créer
│   └── lib/
│       └── sanity.js          ← connexion Sanity
├── studio/                    ← Sanity Studio
│   └── schemaTypes/
│       ├── index.js
│       ├── page.js
│       ├── prestation.js
│       ├── voyage.js
│       ├── temoignage.js
│       └── article.js
├── scraped/
│   ├── contenu.json           ← contenu scrappé du site Wix (36 pages)
│   └── images/                ← 474 images téléchargées depuis Wix
├── .env                       ← tokens et variables d'environnement
├── astro.config.mjs
├── package.json
└── CLAUDE.md                  ← ce fichier
```

---

## 🎨 DESIGN — RÈGLES ABSOLUES

### Style général
- Inspiré de **patagoniariverguides.com** et **Wild Fly Production**
- Épuré, premium, nature sauvage
- Typographies : **Playfair Display** (titres serif élégant) + **DM Sans** (corps)
- **Responsive mobile-first** — une seule version qui s'adapte à tous les écrans
- Pas de version desktop/mobile séparée

### Palette de couleurs
```
Bleu océan principal  : #1B5E8A
Bleu foncé hero       : #0d2b3e
Bleu clair accent     : #7EC8E3
Bleu moyen            : #5BA3C9
Fond beige            : #f8f7f4
Fond beige foncé      : #f0eff0
Texte foncé           : #1a1a1f
Footer fond           : #07181f
```

### Hero
- Grande photo plein écran en fond (issues du dossier scraped/images/)
- Overlay sombre pour lisibilité du texte
- Texte centré ou aligné bas-gauche
- Bouton "Réserver" très visible dès le hero
- Badge "21 ans de guidage" en coin

**Deux curseurs "Épaisseur du voile bleu"** — dosent le voile pour que le titre blanc ressorte. Aperçu en direct dans le Studio (vraie photo + titre témoin).

| Champ | Ce qu'il voile | Où c'est appliqué |
|---|---|---|
| `sectionHero.voile` | la **photo** : fond du hero image **et** poster d'un hero vidéo | dégradé cuit dans le `background` par `heroBg()` |
| `sectionHero.voileVideo` | la **vidéo** une fois démarrée (YouTube + MP4) | variable CSS `--voile-k` sur `.pb-hero__overlay` |

- **50 = réglage d'origine** et le champ est alors *absent* du document (le curseur fait `unset` à 50) → les heros jamais touchés rendent exactement comme avant. **En-dessous de 50 le voile s'éclaircit, au-dessus il s'assombrit** — pour faire ressortir un titre blanc il faut MONTER (70–100).
- `voileVideo` est masqué dans le Studio s'il n'y a ni `videoYoutubeUrl` ni `videoUrl`.
- ⚠️ **Pourquoi deux champs et pas un** : sur un hero vidéo, `.pb-hero__yt-poster` (z-index 1) est peint **au-dessus** de `.pb-hero__overlay` (z-index auto). Un overlay unique ne pouvait donc jamais voiler la photo — d'où le dégradé cuit dans le poster. Ne pas « simplifier » en remettant un seul overlay : le bug reviendrait (photo nue, voile visible seulement une fois la vidéo lancée).
- Vidéo MP4 : son poster est natif (attribut `poster` de `<video>`), impossible à voiler à part → c'est `voileVideo` qui couvre les deux.
- Les curseurs sont des composants maison (`studio/components/VoileSlider.jsx`) : Sanity **n'a pas** d'input "range" natif pour les nombres (`NumberOptions` n'accepte que les listes d'énumération — `options.range` est silencieusement ignoré).
- ⚠️ Le calcul (`mult` / `alpha`) et les paliers du dégradé sont **dupliqués** entre `VoileSlider.jsx` (aperçu Studio) et `voileMult`/`voileAlpha`/`heroBg` de `src/components/PageBuilderSections.astro` (rendu du site). Modifier les deux ensemble, sinon l'aperçu ment. Les paliers diffèrent selon le calque : photo `.88/.45@60%/.3`, vidéo `.88/.5@55%/.25`.
- `heroBg()` sert aussi à `sectionBoutiqueCta` — l'appel s'y fait sans voile, donc au réglage d'origine.
- ⚠️ En test local : `astro dev` fige `PUBLIC_SANITY_PREVIEW` dans le cache Vite. Passer du mode aperçu au mode publié **sans** `rm -rf node_modules/.vite` fait lire les brouillons en croyant lire le publié (c'est aussi ce que nettoie `deploy.sh`).

### Cartes prestations
- Photos en arrière-plan (comme Wild Fly Production)
- Overlay gradient sombre pour lisibilité
- Titre + description + flèche → par-dessus la photo

### 🎯 Cadrage des images : le hotspot pilote TOUT

**Le piège** : `urlFor(img).width(W).height(H).fit('crop').crop('focalpoint')` produit une image d'un **ratio figé**. Tant que le cadre CSS a le même ratio, le hotspot est respecté. Mais si une media query change ce ratio, `background-size: cover` **redécoupe l'image au centre** et le hotspot est perdu. C'est ce qui coupait le visage du guide sur mobile (`.guide-photo` : 3/4 → 16/9 sous 1024px, image en 600×800 → seule la bande 29–71 % visible, visage à 25 % hors champ).

**La règle** — on ne recadre plus côté CDN. L'image est servie à son **ratio naturel** (`urlFor(img).width(W).auto('format')`, sans `height`/`crop`), puis `src/lib/image.js` en déduit :
- la **position** (`--img-pos`) → le sujet reste visible quel que soit le ratio du cadre ;
- le **zoom** (`--img-zoom`) → déduit de la **TAILLE** du hotspot. C'est la sémantique Sanity : le hotspot n'est pas un point mais « la zone qui doit rester visible ». Cercle serré = gros plan, cercle large = plan large. **JBV recadre n'importe quelle image depuis le Studio, sans développeur.**

**Usage** :
```astro
<div class:list={['ma-carte', vars && 'img-hotspot']} style={vars}></div>
// vars = hotspotVars(urlFor(image).width(1400).auto('format').url(), image)
```
Le motif `.img-hotspot` est dans le `<style is:global>` de `BaseLayout.astro`.

- **`CIBLE` (0.9) est le seul réglage global du cadrage** : part du cadre occupée par le hotspot. La monter zoome tout le site, la baisser l'élargit. Calé sur le réel : guide (h=0.46) → ×1.97, cartes Matériel (h=0.81) → ×1.11, sans hotspot → ×1 (rendu strictement inchangé).
- ⚠️ Le zoom passe par `transform: scale()` sur un `::before` en `cover`, **pas** par `background-size: auto Z%` : agrandir un fond déjà en `cover` couvre toujours le cadre, alors qu'une hauteur en % laisserait des bandes si l'image était plus étroite que le cadre (ex. photo paysage remplacée par un portrait).
- ⚠️ `.img-hotspot` se pose sur un calque d'image **dédié et sans enfant** (le `::before` absolu passerait au-dessus d'un contenu non positionné), et l'hôte doit être **positionné** (`.guide-photo` en `relative`, `.hp-mat-card__bg` en `absolute`). Le motif ne force pas `position` pour ne pas écraser ce dernier.
- ⚠️ `hotspotPosition()` suppose qu'aucun `rect`/crop CDN n'est appliqué : les coordonnées du hotspot sont relatives à l'image ENTIÈRE.
- **Périmètre actuel** : les cartes (photo du guide, cartes Matériel), FR + EN. Les heros gardent `heroBg()` — ils rendent déjà correctement. 🔎 Reste éventuellement à étendre au blog / à la boutique.
- ⚠️ `src/pages/en/index.astro` prenait sa `sectionGuideHP` en bloc depuis `pagebuilderEn`, **photo comprise** — donc avec un hotspot périmé (la copie EN n'est pas resynchronisée quand JBV recadre en FR). La photo est désormais forcée depuis le FR, conformément à la règle de `mergeEnSections`. Vérifier ce réflexe sur toute section lue directement depuis `pagebuilderEn`.

---

## ✅ RÈGLES IMPORTANTES À RESPECTER ABSOLUMENT

### 1. Editabilité maximale dans Sanity
**RÈGLE CRITIQUE** : Tous les champs et sections de CHAQUE page doivent être éditables dans Sanity Studio au maximum. Le guide doit pouvoir modifier depuis Sanity :
- Tous les textes (titres, sous-titres, descriptions, boutons)
- Toutes les images
- L'ordre des sections (si possible)
- Les couleurs d'accentuation
- Les liens et URLs
- Les tarifs
- Les disponibilités
- Les témoignages

### 2. SEO — Protection absolue
- Les URLs du nouveau site DOIVENT correspondre aux URLs actuelles de Wix
- Configurer les redirections 301 pour chaque URL modifiée
- Générer un sitemap.xml automatiquement
- Balises meta (title, description, og) configurables depuis Sanity pour chaque page
- Le site Wix reste en ligne jusqu'au transfert de domaine final

### 3. Responsive
- Mobile-first obligatoire
- Tester sur mobile ET desktop
- Navigation mobile avec menu hamburger

### 4. Performance
- Images optimisées (WebP si possible)
- Utiliser le CDN Sanity pour les images
- Lazy loading sur les images

### 5. Connexion Sanity
```javascript
// src/lib/sanity.js
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})
```

---

## 📄 SCHÉMAS SANITY EXISTANTS

### page.js
Champs : title, slug, contenu (blocks), image, seoTitle, seoDescription

### prestation.js
Champs : title, slug, categorie (eau-douce/bar/masterclass/spey-cast/bon-cadeau), description (blocks), image, tarif, duree, seoTitle, seoDescription

### voyage.js
Champs : title, slug, pays, description (blocks), image, periode, prix, especes, seoTitle, seoDescription

### temoignage.js
Champs : nom, date, note (1-5), prestation, texte, photo

### article.js (blog enjoyfishing)
Champs : title, slug, date, image, extrait, contenu (blocks), tags, espece (bar/truite/saumon/alose/brochet/exotique), seoTitle, seoDescription

---

## 🗺️ STRUCTURE DU SITE — PAGES À CRÉER

```
/                          → Accueil
/jean-baptiste-vidal       → Le guide (bio)
/temoignages               → Témoignages clients
/stage-peche-mouche        → Stages (overview)
/tarifs                    → Tarifs
/disponibilites-guidages   → Disponibilités 2026
/bon-cadeau                → Bon cadeau

/peche-a-la-mouche-en-bretagne         → Overview eau douce
/initiation-peche-a-la-mouche          → Initiation
/peche-de-l-alose-a-la-mouche          → Alose
/peche-de-la-truite-a-la-mouche        → Truite
/peche-de-la-truite-en-reservoir       → Réservoir
/peche-du-brochet-a-la-mouche          → Brochet
/materiel-jeanbaptistevidal            → Matériel
/mouches-de-peche                      → Ses mouches

/peche-du-bar-a-la-mouche             → Bar (overview) ⭐ PAGE STAR
/initiation-peche-du-bar              → Initiation bar
/peche-du-bar-perfectionnement        → Perfectionnement
/peche-mouche-bar-bateau-bretagne     → Bar en bateau
/peche-du-bar-a-vue-a-la-mouche      → Bar à vue ⭐
/peche-du-bar-a-la-mouche-coaching    → Coaching
/bateau-bar-a-la-mouche              → Le bateau

/masterclass                          → Masterclass overview
/master-class-peche-en-reservoir      → Masterclass réservoir
/master-class-nymphe-au-fil          → Masterclass nymphe

/stage-spey-cast-et-cours-de-lancer  → Spey Cast overview
/stage-spey-cast                     → Stage Spey
/cours-de-lancer-peche-a-la-mouche   → Cours lancer

/voyages-peche-mouche                 → Voyages overview
/voyage-peche-argentine-rio-grande    → Argentine
/peche-mouche-cuba-cayo-cruz         → Cuba Cayo Cruz
/peche-mouche-cuba-cayo-santa-maria  → Cuba Santa Maria
/los-roques-venezuela                → Venezuela
/voyage-peche-mouche-mexique         → Mexique

/blog/                               → Blog (articles enjoyfishing)
/blog/[slug]                         → Article individuel

/contact                             → Contact
/partenaires                         → Partenaires
/videos                              → Vidéos
```

---

## 📊 DONNÉES SEO IMPORTANTES

### Mots-clés stratégiques à protéger (top trafic actuel)
1. "pêche bar bretagne" → position #2 → 41 visiteurs/mois
2. "stage pêche à la mouche" → position #1 → 18 visiteurs/mois
3. "peche du bar bretagne" → position #2 → 25 visiteurs/mois
4. "peche aux bars en bretagne" → position #5 → 16 visiteurs/mois
5. "mouche alose" → position #2 → 5 visiteurs/mois
6. "pêche saumon bretagne" → position #3 → 4 visiteurs/mois

### Pages les plus précieuses (à ne surtout pas casser)
- `/peche-du-bar-a-la-mouche` ← URL CRITIQUE
- `/stage-peche-mouche` ← URL CRITIQUE
- `/peche-de-la-truite-a-la-mouche-en-bretagne`
- `/materiel-mouche-bar`

---

## 🔄 MIGRATION À FAIRE (TO-DO fin de projet)

- [ ] Configurer MCP Sanity pour VS Code manuellement
- [ ] Mettre en place les redirections 301 (Wix → nouveau site)
- [ ] Migrer le projet Sanity vers le compte du guide (JeanBaptisteVidal)
- [ ] Migrer Cloudflare Pages vers son compte
- [ ] Migrer GitHub vers son repo
- [ ] Transférer le nom de domaine jeanbaptistevidalguidepeche.com
- [ ] Fusionner enjoyfishing.fr → /blog/ avec redirections 301
- [ ] Désactiver le noindex avant mise en ligne
- [ ] Soumettre le sitemap dans Google Search Console

### Boutique (au passage en production)
- [ ] Activer le compte Stripe "Jean-Baptiste Vidal — Enjoy Fishing" (SIREN + IBAN de JBV) et passer les clés en live (worker + webhook à redéclarer en live)
- [ ] JBV : déclarer l'achat-revente en activité secondaire au guichet unique INPI (avant les premières ventes)
- [ ] Activer les reçus Stripe (Réglages → E-mails → "Paiements réussis") pour l'e-mail de confirmation client
- [ ] Après transfert du domaine : configurer SPF/DKIM et brancher des e-mails personnalisés aux couleurs du site via Resend (confirmation de commande + notification "commande expédiée"). D'ici là : notifications Stripe pour JBV + suivi dans Sanity → Commandes
- [ ] Remplacer les frais de port provisoires par les vrais tarifs (Colissimo / lettre suivie / Mondial Relay ? — à décider avec JBV)
- [ ] Raccorder la page CGV à la boutique (lien au checkout) et vérifier les mentions vente à distance / rétractation
- [x] ✅ RGPD — rétention : les commandes de plus de **24 mois** sont anonymisées automatiquement (cron mensuel `.github/workflows/anonymiser-commandes.yml` → `scripts/anonymiser-commandes.mjs`). Voir la section Rétention ci-dessous.
- [x] ✅ RGPD — données clients isolées : les commandes vivent dans le dataset **privé** `commandes`, pas dans `production` (public en lecture). Voir la section Datasets ci-dessous.

---

## 🚀 PROCHAINES ÉTAPES IMMÉDIATES

1. Créer `src/lib/sanity.js` (client Sanity)
2. Créer `src/layouts/Layout.astro` (layout principal avec head SEO)
3. Créer `src/components/Header.astro` (navigation responsive)
4. Créer `src/components/Footer.astro`
5. Construire `src/pages/index.astro` (homepage complète)
6. Créer `src/pages/[slug].astro` (pages dynamiques depuis Sanity)
7. Créer `src/pages/blog/index.astro` et `src/pages/blog/[slug].astro`
8. Configurer `astro.config.mjs` pour Cloudflare
9. Ajouter Tailwind CSS pour le styling
10. Configurer le sitemap automatique

---

## ⚙️ VARIABLES D'ENVIRONNEMENT (.env)

```
SANITY_TOKEN=sk11Jq1cu6ITb7XLmqhhExxPs49cBrlfmgynCLiVWj6a06hb09zCHnoaariWQdtgcTUzpyd9P3y5ocNpnUPYVOS863y3jY0rCxfIM2oAcfgPfaECJVFczkF1zzwztlb41HszbYACr8XRFzAxUqSLGyiba0KDzoA0g0m27TFwunitC9BjMtPN
SANITY_PROJECT_ID=uievv97s
SANITY_DATASET=production
```

---

## 💡 RAPPELS ET NOTES IMPORTANTES

- Le site Wix actuel reste en ligne pendant TOUTE la durée du projet
- Le nouveau site Cloudflare est sur un domaine temporaire (workers.dev)
- Aucune redirection avant le transfert de domaine final
- Jean-Baptiste a un Carolina Skiff (bateau spécial mouche)
- Il propose aussi des voyages de pêche exotique (Argentine, Cuba, Venezuela, Mexique)
- enjoyfishing.fr est son blog personnel (même auteur) → à fusionner dans /blog/
- 474 images scrapées disponibles dans scraped/images/
- 36 pages de contenu disponibles dans scraped/contenu.json
- Le contenu importé dans Sanity est en cours — à enrichir
- Version anglaise du site existe (/en/...) → à prévoir dans l'architecture

---

## 📝 NOTES PAR PAGE

### /peche-a-la-mouche-en-bretagne
- **Photos** : mettre à jour avec la meilleure qualité disponible (scraped/images/)

### /jean-baptiste-vidal-moniteur-guide-de-peche (Le Guide)
- **Frise chronologique** : reste à configurer — envisager une démo à montrer à JBV pour valider le concept avant de remplir le contenu définitif
- Anciennes pages hardcodées de référence : archivées dans `archive/pages-old-hardcodees/` (hors de src/, plus compilées) depuis le 14/07/2026
- ⚠️ **PROCÉDURE DEPLOY OBLIGATOIRE** — toujours utiliser `bash deploy.sh` et JAMAIS `npm run deploy` directement.
  Le script nettoie le cache Vite SSR, patche wrangler.json (`run_worker_first`, requis pour les pages SSR) et force le re-upload des HTML (invalidation du cache Wrangler).
  ```
  bash deploy.sh
  ```

---

## 🎣 CONTEXTE PERSONNEL

- Projet mené par Quentin (consultant indépendant, ami du guide)
- Quentin gère aussi DuvalFly (son propre e-commerce pêche à la mouche)
- Style DuvalFly = même inspiration Wild Fly Production
- Quentin apprend le développement web en parallèle de ce projet
- Communication entre Quentin et le guide : amicale et décontractée

