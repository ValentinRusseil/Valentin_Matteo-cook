# CookCookCook Backend 🔧

## Technologies Principales

-   **Deno**: Runtime moderne pour JavaScript et TypeScript
-   **Oak**: Framework web pour Deno (similaire à Express.js)
-   **MongoDB**: Base de données NoSQL
-   **Zod**: Validation des données avec TypeScript
-   **TypeScript**: Support natif avec Deno

## Structure du Projet

```
backend/
├── controllers/        # Contrôleurs pour la logique métier
├── middleware/        # Middlewares personnalisés
├── repositories/      # Couche d'accès aux données
├── services/         # Services métier
├── utils/            # Utilitaires et helpers
├── deps.ts           # Gestion des dépendances
├── server.ts         # Point d'entrée de l'application
├── .env.exemple      # Template des variables d'environnement
├── deno.json        # Configuration de Deno
├── postman_collection.json  # Collection Postman pour tester l'API
└── data-mongodb-*.json     # Données d'exemple pour MongoDB
```

## Prérequis

-   [Deno](https://deno.land/#installation) (version recommandée : 2.2.5)
-   MongoDB (version recommandée : ≥ 5.0)
-   Un éditeur compatible avec Deno/TypeScript

## Installation

1. Installer Deno

```bash
# macOS ou Linux
curl -fsSL https://deno.land/x/install/install.sh | sh

# Windows (PowerShell)
irm https://deno.land/install.ps1 | iex
```

2. Configurer les variables d'environnement

```bash
cp .env.exemple .env
```

Modifier les variables dans le fichier `.env` selon votre environnement :

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=cook-db
PORT=8000
```

3. Démarrer le serveur

```bash
# Mode développement
deno task dev

# Mode production
deno task run
```

Le serveur sera accessible à l'adresse : `http://localhost:8000`

## Base de Données

### Installation de MongoDB

1. Télécharger MongoDB Community Server

    - Rendez-vous sur [le site officiel de MongoDB](https://www.mongodb.com/try/download/community)
    - Cliquez sur "Download" pour la version correspondant à votre système d'exploitation
    - Suivez les instructions d'installation par défaut

2. Vérifier l'installation

```bash
# Dans un terminal, tapez :
mongod --version
```

Si la commande affiche la version de MongoDB, l'installation est réussie.

3. Démarrer MongoDB

```bash
# Sur macOS/Linux
sudo systemctl start mongod

# Sur Windows
# MongoDB devrait démarrer automatiquement comme un service
# Sinon, ouvrez les Services Windows et démarrez "MongoDB"
```

### Configuration de la Base de Données

1. Créer la base de données

```bash
# Ouvrir un terminal MongoDB
mongosh

# Créer et utiliser la base de données
use cook-db
```

2. Créer les collections

```bash
# Toujours dans mongosh
db.createCollection("recettes")
db.createCollection("ingredients")
```

### Import des Données d'Exemple

1. Ouvrir un terminal dans le dossier `backend`

2. Importer les ingrédients

```bash
# Sur macOS/Linux
mongoimport --db cook-db --collection ingredients --file data-mongodb-ingredient.json --jsonArray

# Sur Windows (PowerShell)
& 'C:\Program Files\MongoDB\Tools\100\bin\mongoimport.exe' --db cook-db --collection ingredients --file data-mongodb-ingredient.json --jsonArray
```

3. Importer les recettes

```bash
# Sur macOS/Linux
mongoimport --db cook-db --collection recettes --file data-mongodb-recettes.json --jsonArray

# Sur Windows (PowerShell)
& 'C:\Program Files\MongoDB\Tools\100\bin\mongoimport.exe' --db cook-db --collection recettes --file data-mongodb-recettes.json --jsonArray
```

4. Vérifier l'import

```bash
# Dans mongosh
use cook-db
db.ingredients.count()  # Devrait afficher le nombre d'ingrédients
db.recettes.count()    # Devrait afficher le nombre de recettes
```

### Problèmes Courants

1. **MongoDB n'est pas reconnu comme commande**

    - Assurez-vous que MongoDB est bien installé
    - Ajoutez MongoDB au PATH système si nécessaire
    - Sur Windows, réinstallez MongoDB en cochant "Add to PATH" pendant l'installation

2. **Erreur de connexion**

    - Vérifiez que MongoDB est bien démarré
    - Vérifiez que le port 27017 est libre
    - Vérifiez les permissions du dossier de données MongoDB

3. **Erreur d'import**
    - Vérifiez que vous êtes dans le bon dossier
    - Vérifiez que les fichiers JSON existent et sont valides
    - Sur Windows, utilisez le chemin complet vers mongoimport.exe

Pour plus d'aide, consultez la [documentation officielle de MongoDB](https://docs.mongodb.com/manual/installation/).

## API Endpoint

### Ingrédients

-   `POST /ingredients` : Création d'un ingrédient
-   `GET /ingredients/:id` : Obtenir un ingrédient par ID
-   `GET /ingredients` : Liste des ingrédients
-   `GET /ingredients?nom={nom}` : Recherche d'ingrédients par nom
-   `PUT /ingredients/:id` : Modification d'un ingrédient
-   `DELETE /ingredients/:id` : Suppression d'un ingrédient

### Recettes

-   `GET /recettes` : Liste des recettes
-   `GET /recettes/:id` : Obtenir une recette par ID
-   `GET /recettes?nom={nom}` : Recherche de recettes par nom
-   `GET /recettes?categorie={categorie}` : Filtrage par catégorie (entrée, plat, dessert, autre)
-   `POST /recettes` : Création d'une recette
-   `PUT /recettes/:id` : Modification d'une recette
-   `DELETE /recettes/:id` : Suppression d'une recette

## Tests et Documentation

### Collection Postman

Une collection Postman (`postman_collection.json`) est fournie pour tester l'API. Pour l'utiliser :

1. Importer le fichier dans Postman
2. Configurer l'environnement avec la bonne URL de base
3. Tester les différents endpoints

### Validation des Données

-   Utilisation de Zod pour la validation des schémas
-   Vérification stricte des types TypeScript
-   Gestion des erreurs avec des exceptions personnalisées

## Sécurité

-   Validation des entrées avec Zod
-   Protection CORS configurée
-   Gestion sécurisée des erreurs
-   Logs des requêtes et des erreurs

## Développement

### Scripts Disponibles

-   `deno task dev` : Lance le serveur en mode développement avec rechargement automatique
-   `deno task run` : Lance le serveur en mode production
-   `deno task format` : Formate le code selon les conventions
-   `deno lint` : Vérifie le code avec le linter
-   `deno test` : Lance les tests (à implémenter)

### Bonnes Pratiques

-   Utilisation des types stricts TypeScript
-   Documentation du code avec JSDoc
-   Gestion des erreurs centralisée
-   Architecture en couches (Controller -> Service -> Repository)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](../LICENSE) pour plus de détails.

## Additional Resources

### Postman Collection

A Postman collection (`postman_collection.json`) is included in the repository
to help test the API endpoints. You can import this collection into Postman to
quickly start making requests to your local server.

### Sample Database

A sample MongoDB database structure (`data-mongodb.json`) is provided to help
you understand the data schema and get started with some initial data. You can
import this file into your MongoDB instance using:
