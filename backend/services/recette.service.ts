import * as recetteRepository from '../repositories/recette.repository.ts';
import * as ingredientRepository from '../repositories/ingredient.repository.ts';
import { Recette, RecetteCandidate, RecetteCategorie } from './models/recette.model.ts';
import { BadRequestException, NotFoundException } from '../deps.ts';

export const getAllRecettesService = async (repository = recetteRepository): Promise<Recette[]> => {
    return await repository.getAllRecettes();
};

export const getRecetteByIdService = async (id: string, repository = recetteRepository): Promise<Recette> => {
    return await repository.getRecetteById(id);
};

export const getRecetteByNomService = async (nom: string, repository = recetteRepository): Promise<Recette[]> => {
    return await repository.getRecetteByNom(nom);
};

export const getRecetteByCategorieService = async (categorie: string, repository = recetteRepository): Promise<Recette[]> => {
    if (!Object.values(RecetteCategorie).includes(categorie as RecetteCategorie)) {
        throw new BadRequestException(
            `Catégorie invalide. Les catégories valides sont : ${Object.values(RecetteCategorie).join(', ')}`,
        );
    }
    const categorieEnum = categorie as RecetteCategorie;
    return await repository.getRecetteByCategorie(categorieEnum);
};

export const createRecetteService = async (recetteCandidate: RecetteCandidate, repository = recetteRepository): Promise<Recette> => {
    return await repository.createRecette(recetteCandidate);
};

export const updateRecetteService = async (recette: Recette, repository = recetteRepository, ingreRepository = ingredientRepository): Promise<Recette> => {
    const recetteId = await repository.getRecetteById(recette.id);
    if (!recetteId) {
        throw new NotFoundException('Recette not found');
    }
    // Check if the ingredients exist in the database
    if (recette.ingredients) {
        for (const ingredient of recette.ingredients) {
            const ingredientExists = await ingreRepository.getIngredientById(ingredient.id);
            if (!ingredientExists) {
                throw new BadRequestException(`Ingredient with id ${ingredient.id} does not exist`);
            }
        }
    }
    return await repository.updateRecette(recette);
};

export const deleteRecetteService = async (id: string, repository = recetteRepository): Promise<void> => {
    const recetteId = await repository.getRecetteById(id);
    if (!recetteId) {
        throw new NotFoundException('Recette not found');
    }
    return await repository.deleteRecette(id);
};
