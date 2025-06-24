# CookCookCook Frontend 🎨

## Technologies Principales

- **SvelteKit**: Framework fullstack pour la construction d'applications web
- **TypeScript**: Langage de programmation typé pour une meilleure maintenabilité
- **Vite**: Outil de build moderne pour un développement rapide
- **ESLint**: Linting du code
- **Prettier**: Formatage du code

## Structure du Projet

```
frontend/
├── src/                    # Code source principal
│   ├── routes/            # Pages et routes de l'application
│   ├── lib/               # Composants, utilitaires et logique réutilisable
│   ├── styles/            # Styles globaux et variables CSS
│   └── app.html           # Template HTML principal
├── static/                # Fichiers statiques (images, fonts, etc.)
├── vite.config.ts         # Configuration de Vite
└── svelte.config.js       # Configuration de SvelteKit
```

## Installation

1. Installer les dépendances

```bash
npm install
```

2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Modifier les variables dans le fichier `.env` selon votre environnement.

3. Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint et Prettier

## Organisation du Code

### Routes (`src/routes/`)

- Contient toutes les pages de l'application
- Utilise le système de routage basé sur les fichiers de SvelteKit
- Chaque fichier `+page.svelte` représente une route

### Bibliothèque (`src/lib/`)

- Composants réutilisables
- Utilitaires et helpers
- Stores Svelte pour la gestion d'état
- Types TypeScript partagés

### Styles (`src/styles/`)

- Styles globaux
- Variables CSS
- Thèmes et configurations de style

## Configuration

- TypeScript configuré en mode strict
- ESLint et Prettier pour la cohérence du code
- Variables d'environnement gérées via fichiers `.env`

Pour plus de détails sur l'architecture du projet, consultez le fichier [ARCHITECTURE.md](./ARCHITECTURE.md).

## Évolution Future

- Implémentation de tests unitaires et d'intégration
- Amélioration de la documentation des composants
- Optimisation des performances
- Ajout de nouvelles fonctionnalités selon les besoins

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](../LICENSE) pour plus de détails.
