import { Ingredient, IngredientCandidate } from './ingredient.model.ts';

export enum RecetteCategorie {
    ENTREE = 'entrée',
    PLAT = 'plat',
    DESSERT = 'dessert',
    AUTRE = 'autre',
}

export interface Recette {
    id: string;
    nom: string;
    description: string;
    instructions: string;
    categorie: RecetteCategorie;
    tempsPreparation: number;
    origine: string;
    ingredients: Ingredient[];
}

export interface RecetteCandidate {
    nom: string;
    description: string;
    instructions: string;
    categorie: RecetteCategorie;
    tempsPreparation: number;
    origine: string;
    ingredients: IngredientCandidate[];
}
