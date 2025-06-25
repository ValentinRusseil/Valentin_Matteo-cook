# CookCookCook 🍳

## Description

CookCookCook est une application web de gestion de recettes de cuisine permettant aux utilisateurs de découvrir, créer
et modifier leurs recettes préférées.

## Équipe- MVE

-   [Matteo PEREIRA](https://github.com/Aairuxul) - @Aairuxul
-   [Valentin RUSSEIL](https://github.com/ValentinRusseil) - @ValentinRusseil

## Structure du Projet

-   `frontend/` : Application front-end développée avec SvelteKit
-   `backend/` : API back-end développée avec Deno

## Prérequis

-   Deno (version recommandée : 2.2.5)
-   MongoDB (version recommandée : ≥ 5.0)
-   npm ou yarn

## Installation et Démarrage

### Installation Complète

1. Lancer les tests dans le backend

```bash
cd backend
deno test --allow-all
```

Lancer les tests avec le coverage
```bash
cd backend
deno test --allow-all --coverage=coverage
```

2. Installer et démarrer le backend

```bash
cd backend
# Mode développement
deno task dev

# Mode production
deno task run
```

3. Installer et démarrer le frontend

```bash
cd frontend
npm install
npm run dev
```

Pour plus de détails sur chaque partie du projet, consultez les README spécifiques :

-   [Frontend README](./frontend/README.md)
-   [Backend README](./backend/README.md)

## Technologies Utilisées

-   Frontend : SvelteKit, TypeScript, Vite
-   Backend : Deno, Oak, MongoDB

## Fonctionnalités Principales

-   Gestion des recettes (création, modification, suppression)
-   Recherche de recettes
-   Gestion des ingrédients (création, modification, suppression)
