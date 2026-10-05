# Panneau d'administration — Voyageurs en Inde

Un panneau d'administration intégré au site permet de gérer **tout le contenu**
(circuits, thèmes, régions, guides) et de **téléverser des images**, sans toucher
au code.

## Accès

- URL : **`https://www.voyageurseninde.fr/admin`** (ou `/admin` sur l'aperçu Vercel)
- Mot de passe par défaut : **`voyageurs2024`**

> ⚠️ Le mot de passe protège l'accès côté navigateur uniquement (ce n'est pas une
> sécurité forte). Changez-le avant la mise en ligne :
> - soit en modifiant `ADMIN_PASSWORD` dans `components/admin/config.ts`,
> - soit en définissant la variable d'environnement `VITE_ADMIN_PASSWORD` dans
>   le tableau de bord Vercel (prioritaire, injectée au build).

## Ce que l'on peut modifier

| Onglet    | Contenu géré                                                                 |
| --------- | ---------------------------------------------------------------------------- |
| Circuits  | Titre, région, thème, durée, prix, image, description, points forts, **itinéraire jour par jour**, **points de la carte** |
| Thèmes    | Nom, icône (emoji), image                                                    |
| Régions   | Nom, image                                                                   |
| Guides    | Catégorie, titre, extrait, image, temps de lecture                           |

On peut **ajouter, supprimer, réordonner** (flèches ↑ ↓) chaque élément.

## Images

Pour chaque image, deux options :

1. **Téléverser** un fichier depuis l'ordinateur — il est automatiquement
   redimensionné/compressé et intégré au site.
2. **Coller une URL** d'image (ex. Unsplash, votre CDN). Recommandé pour garder le
   site léger si vous avez beaucoup d'images.

## Aperçu en direct

Toutes les modifications sont enregistrées dans **votre navigateur** et s'affichent
immédiatement sur le site (cliquez « ↗ Voir le site »). Elles ne sont visibles que
par vous tant qu'elles ne sont pas **publiées**.

## Publier (mettre en ligne pour tout le monde)

1. Cliquez **« Publier »** puis **« Télécharger site-data.json »**.
2. Remplacez le fichier **`data/site-data.json`** du dépôt par le fichier téléchargé.
3. Validez (commit) et poussez. Vercel reconstruit le site automatiquement ; le
   contenu (et le référencement / SEO via le prérendu) est mis à jour pour tous.

### Boutons utiles

- **Importer** : recharger un `site-data.json` précédemment exporté (utile pour
  reprendre une session ou transférer entre navigateurs).
- **Réinitialiser** : annuler toutes les modifications locales et revenir à la
  version publiée.
- **Quitter** : se déconnecter du panneau.

## Architecture (pour les développeurs)

- `data/site-data.json` — **source de vérité** du contenu, intégrée au build.
- `store/siteStore.ts` — superpose la copie de travail locale (localStorage) sur
  les données publiées, et expose le hook `useSiteData()`.
- `constants.ts` — réexporte les données du JSON (compatibilité ascendante).
- `components/admin/` — l'application d'administration (route `/admin`).

Le site lit le contenu via `useSiteData()`, donc les modifications de l'admin
s'affichent partout sans changement de code.
