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
- **Dataset** : production
- **Organisation Sanity** : Smart-horizon
- **GitHub repo** : https://github.com/Smart-horizon/guide-peche
- **Site live** : https://guide-peche.smart-horizon.workers.dev
- **Node.js** : v24.16.0
- **npm** : 11.13.0

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

### Cartes prestations
- Photos en arrière-plan (comme Wild Fly Production)
- Overlay gradient sombre pour lisibilité
- Titre + description + flèche → par-dessus la photo

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

