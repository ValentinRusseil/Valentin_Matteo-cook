import { Recette, RecetteCandidate } from '../services/models/recette.model.ts';
import { getRecettesCollection } from './mongo.ts';
import { InternalServerErrorException, NotFoundException, ObjectId } from '../deps.ts';
import { fromRecetteDboToRecette, RecetteDbo } from './dbos/recette.dbo.ts';

export const getAllRecettes = async (): Promise<Recette[]> => {
    const recettesCollection = getRecettesCollection();
    const dbos = await recettesCollection.find({}).toArray();
    return dbos.map((dbo: RecetteDbo) => fromRecetteDboToRecette(dbo));
};

export const getRecetteById = async (id: string): Promise<Recette> => {
    const recettesCollection = getRecettesCollection();
    const objectId = new ObjectId(id);
    const dbo = await recettesCollection.findOne({ _id: objectId });
    if (!dbo) {
        throw new NotFoundException('Recette not found with this id: ' + id);
    }
    return fromRecetteDboToRecette(dbo);
};

export const getRecetteByNom = async (nom: string): Promise<Recette[]> => {
    const recettesCollection = getRecettesCollection();

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

    const dbo = await recettesCollection.aggregate(pipeline).toArray();

    return dbo.map((dbo: RecetteDbo) => fromRecetteDboToRecette(dbo));
};

export const getRecetteByCategorie = async (categorie: 'entrée' | 'plat' | 'dessert' | 'autre'): Promise<Recette[]> => {
    const ingredientsCollection = getRecettesCollection();
    const dbos = await ingredientsCollection
        .find({ categorie: { $regex: new RegExp(`^${categorie}$`, 'i') } })
        .toArray();
    return dbos.map((dbo: RecetteDbo) => fromRecetteDboToRecette(dbo));
};

export const createRecette = async (recetteCandidate: RecetteCandidate): Promise<Recette> => {
    const recettesCollection = getRecettesCollection();
    const insertId = await recettesCollection.insertOne({
        ...recetteCandidate,
        ingredients: recetteCandidate.ingredients.map((candidate) => ({
            ...candidate,
            id: new ObjectId().toString(),
        })),
    });

    return await getRecetteById(insertId.toString());
};

export const updateRecette = async (updatedRecetteData: Recette): Promise<Recette> => {
    const recettesCollection = getRecettesCollection();
    const objectId = new ObjectId(updatedRecetteData.id);
    await recettesCollection.updateOne(
        { _id: objectId },
        {
            $set: updatedRecetteData,
        },
    );
    return await getRecetteById(updatedRecetteData.id.toString());
};

export const deleteRecette = async (id: string): Promise<void> => {
    try {
        const recettesCollection = getRecettesCollection();
        const objectId = new ObjectId(id);
        await recettesCollection.deleteOne({ _id: objectId });
    } catch (error) {
        throw new InternalServerErrorException('An error occurred while deleting the recette \n' + error);
    }
};
