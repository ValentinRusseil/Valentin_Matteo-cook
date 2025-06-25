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

2. Lancer les tests

```bash
npm run test
```
ou

```bash
npx vitest
```

3. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Modifier les variables dans le fichier `.env` selon votre environnement.

4. Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`
