M3U magicien

# Présentation

Cette application vous permet d'analyser un fichier M3U, de filtrer les entrées par genre et d'afficher la liste des films pour les genres sélectionnés.

## Installation et configuration

1. **Installer les dépendances** :
Accédez au répertoire du projet dans le terminal et exécutez :
```shell
npm install --yes
```
Cette commande installe tous les packages nécessaires répertoriés dans le fichier `package.json`.

## Démarrage de l'application

1. **Démarrer le serveur de développement** :
Exécutez la commande suivante dans le répertoire du projet :
```shell
npm run dev
```
Cette commande démarre le serveur de développement Vite. L'application sera accessible à l'URL fournie dans la console (généralement `http://localhost:5173`).

## Utilisation de l'application

1. **Télécharger le fichier M3U** :
- Ouvrez l'application dans votre navigateur à l'adresse : http://localhost:5173
- Le titre « fichier m3u » et le bouton « Choisir un fichier » s'afficheront sur la même ligne.
- Cliquez sur le bouton « Choisir un fichier » pour importer votre fichier .m3u.
2. **Filtrer par genre** :
- Une fois le fichier chargé, l'application analysera le contenu M3U et affichera les boutons « Genres ».
- Cliquez sur certains genres pour les sélectionner ou les désélectionner.
3. **Afficher la liste des films pour les genres sélectionnés** :
- Lorsque vous sélectionnez les genres, la section « Films » se met à jour dynamiquement pour afficher la liste des noms de fichiers.
- Cliquez sur un film pour ouvrir l'URL correspondante.

## Remarques

- La liste des films est triée par ordre alphabétique.

Amusez-vous bien avec l'application M3U Magician !