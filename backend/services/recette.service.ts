import * as recetteRepository from '../repositories/recette.repository.ts';
import { Recette, RecetteCandidate, RecetteCategorie } from './models/recette.model.ts';
import { BadRequestException, NotFoundException } from '../deps.ts';

export const getAllRecettesService = async (): Promise<Recette[]> => {
    return await recetteRepository.getAllRecettes();
};

export const getRecetteByIdService = async (id: string): Promise<Recette> => {
    return await recetteRepository.getRecetteById(id);
};

export const getRecetteByNomService = async (nom: string): Promise<Recette[]> => {
    return await recetteRepository.getRecetteByNom(nom);
};

export const getRecetteByCategorieService = async (categorie: string): Promise<Recette[]> => {
    if (!Object.values(RecetteCategorie).includes(categorie as RecetteCategorie)) {
        throw new BadRequestException(
            `Catégorie invalide. Les catégories valides sont : ${Object.values(RecetteCategorie).join(', ')}`,
        );
    }
    const categorieEnum = categorie as RecetteCategorie;
    return await recetteRepository.getRecetteByCategorie(categorieEnum);
};

export const createRecetteService = async (recetteCandidate: RecetteCandidate): Promise<Recette> => {
    return await recetteRepository.createRecette(recetteCandidate);
};

export const updateRecetteService = async (recette: Recette): Promise<Recette> => {
    const recetteId = await recetteRepository.getRecetteById(recette.id);
    if (!recetteId) {
        throw new NotFoundException('Recette not found');
    }
    return await recetteRepository.updateRecette(recette);
};

export const deleteRecetteService = async (id: string): Promise<void> => {
    const recetteId = await recetteRepository.getRecetteById(id);
    if (!recetteId) {
        throw new NotFoundException('Recette not found');
    }
    return await recetteRepository.deleteRecette(id);
};
