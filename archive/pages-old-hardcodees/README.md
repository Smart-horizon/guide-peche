# Archive — pages hardcodées de référence

Anciennes pages Astro codées en dur (avant la migration du contenu vers Sanity),
conservées comme référence de design/contenu. **Elles ne sont plus compilées**
(hors de `src/pages/`) et ne sont accessibles ni en local ni en production.

- `_index-old.astro` : l'ancienne page `/old` qui listait ces références (dev uniquement)
- `_VoyageLayout.astro` : layout utilisé uniquement par ces pages (contacts codés en dur — raison de son archivage)
- les 35 pages `*.astro` : versions hardcodées des pages du site

Archivé le 14/07/2026. Jusqu'à cette date, `deploy.sh` et le workflow GitHub
masquaient `src/pages/old/` avant chaque build — ces étapes ont été retirées.

Pour consulter une version : ouvrir le fichier ici, ou `git log --follow` pour l'historique.
