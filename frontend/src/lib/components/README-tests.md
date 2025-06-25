# Tests du Composant Card

Ce fichier contient les tests unitaires pour le composant `Card.svelte`.

## Tests inclus

### Tests de base

- ✅ **Affichage des propriétés par défaut** : Vérifie que le composant affiche les valeurs par défaut correctement
- ✅ **Affichage des propriétés personnalisées** : Teste l'affichage avec des props personnalisées
- ✅ **Troncature de description** : Vérifie que les descriptions longues sont tronquées à 85 caractères

### Tests d'images

- ✅ **Image par défaut** : Teste l'affichage de l'image par défaut quand aucune image n'est fournie
- ✅ **Image personnalisée** : Vérifie la gestion des images personnalisées avec lazy loading
- ✅ **Gestion d'erreur d'image** : Teste le fallback vers l'image par défaut en cas d'erreur de chargement

### Tests du temps de préparation

- ✅ **Masquage du temps par défaut** : Vérifie que le temps par défaut n'est pas affiché
- ✅ **Affichage avec icône** : Teste l'affichage du temps avec l'icône horloge

### Tests d'IntersectionObserver

- ✅ **Initialisation conditionnelle** : Vérifie que l'observer n'est créé que si nécessaire
- ✅ **Pas d'observer sans image** : Teste qu'aucun observer n'est créé sans image personnalisée
- ✅ **Lazy loading** : Vérifie la logique de chargement différé des images
- ✅ **Nettoyage** : Teste la déconnexion de l'observer au démontage

### Tests d'accessibilité et structure

- ✅ **Structure HTML** : Vérifie la présence des classes CSS appropriées
- ✅ **Titre h2** : Teste l'affichage correct du nom dans l'élément heading
- ✅ **Description complète** : Vérifie l'affichage des descriptions courtes sans troncature

## Exécution des tests

```bash
# Exécuter uniquement les tests du composant Card
npm test -- Card.test.ts

# Exécuter tous les tests
npm test

# Exécuter les tests en mode watch
npm run test:watch

# Exécuter les tests avec couverture
npm run test:coverage

# Interface graphique pour les tests
npm run test:ui
```

## Configuration

Les tests utilisent :

- **Vitest** comme runner de tests
- **@testing-library/svelte** pour le rendu et les interactions
- **jsdom** comme environnement de test
- **Mocks** pour IntersectionObserver (non disponible dans jsdom)

## Notes sur l'implémentation

- L'IntersectionObserver est mocké car il n'est pas disponible dans l'environnement de test jsdom
- Les tests du lazy loading vérifient la logique mais ne testent pas l'intersection réelle
- La gestion d'erreur d'image est testée en simulant l'événement `error`
- Les tests de structure CSS vérifient la présence des classes dans le DOM
