# CookCookCook Backend 🔧

## Prérequis

-   [Deno](https://deno.land/#installation) (version recommandée : 2.2.5)
-   MongoDB (version recommandée : ≥ 5.0)
-   Un éditeur compatible avec Deno/TypeScript

## Lancer les test

Pour lancer les tests, exécutez la commande suivante :

```bash
deno test --allow-read
```

Ou lancer les tests avec la couverture de code :

```bash
deno test --allow-read --coverage=coverage
```

Pour les tests, nous avons modifier les tests afin d'avoir des tests avec des asserts pour chaque test, des noms de tests et de varibles claires. Et nous pouvons trouver également des vérfications avec des fonctions du types `assertSpyCalls` et `assertSpyCall` pour vérifier que les fonctions sont appelées avec les bons arguments à la fin du fichier de test du service recette.