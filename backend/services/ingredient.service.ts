import * as ingredientRepository from '../repositories/ingredient.repository.ts';
import { NotFoundException } from '../deps.ts';
import { Ingredient, IngredientCandidate } from './models/ingredient.model.ts';

export const getAllIngredientsService = async (repository = ingredientRepository): Promise<Ingredient[]> => {
    return await repository.getAllIngredients();
};

export const getIngredientByIdService = async (id: string, repository = ingredientRepository): Promise<Ingredient> => {
    return await repository.getIngredientById(id);
};

export const getIngredientByNomService = async (nom: string, repository = ingredientRepository): Promise<Ingredient[]> => {
    return await repository.getIngredientByNom(nom);
};

export const createIngredientService = async (ingredientCandidate: IngredientCandidate, repository = ingredientRepository): Promise<Ingredient> => {
    return await repository.createIngredient(ingredientCandidate);
};

export const updateIngredientService = async (ingredient: Ingredient, repository = ingredientRepository): Promise<Ingredient> => {
    const idexist = await repository.getIngredientById(ingredient.id);
    if (!idexist) {
        throw new NotFoundException('No id found for this ingredient');
    }
    return await repository.updateIngredient(ingredient);
};

export const deleteIngredientService = async (id: string, repository = ingredientRepository): Promise<void> => {
    const idexist = await getIngredientByIdService(id, repository);
    if (!idexist) {
        throw new NotFoundException('No id found for this ingredient');
    }
    return await repository.deleteIngredient(id);
};
