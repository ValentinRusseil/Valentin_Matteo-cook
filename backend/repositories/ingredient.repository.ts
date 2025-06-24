import { Ingredient, IngredientCandidate } from '../services/models/ingredient.model.ts';
import { getIngredientsCollection } from './mongo.ts';
import { InternalServerErrorException, NotFoundException, ObjectId } from '../deps.ts';
import { fromIngredientDboToIngredient, IngredientDbo } from './dbos/ingredient.dbo.ts';

export const getAllIngredients = async (): Promise<Ingredient[]> => {
    const ingredientsCollection = getIngredientsCollection();
    const dbos = await ingredientsCollection.find({}).toArray();
    return dbos.map((dbo: IngredientDbo) => fromIngredientDboToIngredient(dbo));
};

export const getIngredientById = async (id: string): Promise<Ingredient> => {
    const ingredientsCollection = getIngredientsCollection();
    const objectId = new ObjectId(id);
    const dbo = await ingredientsCollection.findOne({ _id: objectId });
    if (!dbo) {
        throw new NotFoundException('Ingredient not found');
    }
    return fromIngredientDboToIngredient(dbo);
};

export const getIngredientByNom = async (nom: string): Promise<Ingredient[]> => {
    const ingredientsCollection = getIngredientsCollection();

    // On crée une regex simple qui recherche le terme n'importe où dans le nom
    const regex = new RegExp(nom.split(' ').join('.*'), 'i');

    // Définition des remplacements à effectuer
    const replacements = [
        { find: 'é', replacement: 'e' },
        { find: 'è', replacement: 'e' },
        { find: 'à', replacement: 'a' },
        { find: ' ', replacement: '' },
    ];

    // Construction du pipeline d'agrégation
    const pipeline = [
        {
            $addFields: {
                normalizedNom: {
                    $toLower: '$nom',
                },
            },
        },
        ...replacements.map((rep) => ({
            $addFields: {
                normalizedNom: {
                    $replaceAll: {
                        input: '$normalizedNom',
                        find: rep.find,
                        replacement: rep.replacement,
                    },
                },
            },
        })),
        {
            $match: {
                normalizedNom: { $regex: regex },
            },
        },
    ];

    const dbo = await ingredientsCollection.aggregate(pipeline).toArray();
    return dbo.map((dbo: IngredientDbo) => fromIngredientDboToIngredient(dbo));
};

export const createIngredient = async (ingredientCandidate: IngredientCandidate): Promise<Ingredient> => {
    const ingredientsCollection = getIngredientsCollection();
    const insertId = await ingredientsCollection.insertOne({
        ...ingredientCandidate,
    });
    return await getIngredientById(insertId.toString());
};

export const updateIngredient = async (updatedIngredientData: Ingredient): Promise<Ingredient> => {
    const ingredientsCollection = getIngredientsCollection();
    const objectId = new ObjectId(updatedIngredientData.id);
    await ingredientsCollection.updateOne(
        { _id: objectId },
        {
            $set: updatedIngredientData,
        },
    );
    return await getIngredientById(updatedIngredientData.id.toString());
};

export const deleteIngredient = async (id: string): Promise<void> => {
    try {
        const ingredientsCollection = getIngredientsCollection();
        const objectId = new ObjectId(id);
        await ingredientsCollection.deleteOne({ _id: objectId });
    } catch (error) {
        throw new InternalServerErrorException('An error occurred while deleting the ingredient \n' + error);
    }
};
