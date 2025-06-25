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

Quand vous lancez les tests avec la couverture de code, un dossier `coverage` est créé dans le répertoire racine du projet. Vous pouvez visualiser la couverture de code en ouvrant le fichier `index.html` dans ce dossier avec votre navigateur.


## Coverage de notre code

Coverage de tous les services du backend de CookCookCook :
![alt text](image.png)

Coverage de notre service recette :
![alt text](image-1.png)

Coverage de notre service ingredient :
![alt text](image-2.png)

## Autres informations sur les tests

Pour les tests, nous avons modifier les tests afin d'avoir des tests avec des asserts pour chaque test, des noms de tests et de varibles claires. Et nous pouvons trouver également des vérfications avec des fonctions du types `assertSpyCalls` et `assertSpyCall` pour vérifier que les fonctions sont appelées avec les bons arguments à la fin du fichier de test du service recette.

Dans les tests back, avec Deno, nous avons pu regrouper les tests dans deux fichiers distincts, et dedans nous avons pu regrouper les tests par fonctionnalité grâce à l'utilisation de `describe` et `it`. Cela permet de mieux organiser les tests et de les rendre plus lisibles.