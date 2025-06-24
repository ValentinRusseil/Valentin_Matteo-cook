import { config, Database, MongoClient } from '../deps.ts';
import { IngredientDbo } from './dbos/ingredient.dbo.ts';
import { RecetteDbo } from './dbos/recette.dbo.ts';

// Charger les variables d'environnement
const env = await config();

const MONGO_URL = env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = env.DB_NAME;

let client: MongoClient | null = null;
let db: Database | null = null;

export async function connectDB(): Promise<Database> {
    if (db) {
        return db;
    }

    try {
        client = new MongoClient();
        await client.connect(MONGO_URL);
        db = client.database(DB_NAME);
        console.log('Connecté à MongoDB ! Base de données:', DB_NAME);
        return db;
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        throw error;
    }
}

export function getIngredientsCollection() {
    if (!db) {
        throw new Error("La base de données n'est pas connectée. Appelez connectDB() d'abord.");
    }
    return db.collection<IngredientDbo>('ingredients');
}

export function getRecettesCollection() {
    if (!db) {
        throw new Error("La base de données n'est pas connectée. Appelez connectDB() d'abord.");
    }
    return db.collection<RecetteDbo>('recettes');
}
