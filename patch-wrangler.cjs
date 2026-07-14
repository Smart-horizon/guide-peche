const fs = require('fs');
const p = 'dist/server/wrangler.json';
const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
cfg.assets = cfg.assets || {};
// Worker d'abord partout, SAUF les anciennes URLs redirigees par public/_redirects :
// elles doivent etre servies par la couche assets pour produire de vrais 301.
// MAINTENANCE : garder cette liste alignee sur public/_redirects.
cfg.assets.run_worker_first = [
  '/*',
  '!/bon-cadeau-peche-mouche',
  '!/en/bon-cadeau-peche-mouche',
  '!/bateau-special-mouche-carnassier',
  '!/en/bateau-special-mouche-carnassier',
  '!/contact-jeanbaptiste-vidal-guide-de-peche',
  '!/en/contact-jeanbaptiste-vidal-guide-de-peche',
  '!/temoignages-avis-jeanbaptiste-vidal',
  '!/en/temoignages-avis-jeanbaptiste-vidal',
  '!/book-online',
  '!/brochure-jeanbaptiste-vidal',
  '!/medias-jeanbaptistevidal',
  '!/voyage-peche-mouche-mer-exotique',
  '!/voyage-peche-mouche-migrateurs',
  '!/service-page/*',
  '!/peche-du-saumon-a-la-mouche-bretagne',
  '!/en/peche-du-saumon-a-la-mouche-bretagne',
  '!/riviere-leguer-guidage-mouche-saumon',
  '!/peche-mouche-saumon-elle-guidage',
  '!/sejours-de-peche-a-la-mouche-en-bretagne',
  '!/archive/*',
  '!/tag/*',
];
fs.writeFileSync(p, JSON.stringify(cfg));
console.log('  ok run_worker_first: /* + ' + (cfg.assets.run_worker_first.length - 1) + ' exclusions 301');
