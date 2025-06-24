import { IngredientCandidateDto, ingredientCandidateDtoSchema } from './ingredient.dto.ts';
import { Recette, RecetteCandidate, RecetteCategorie } from '../../services/models/recette.model.ts';
import { z } from '../../deps.ts';
import { ObjectId } from 'https://deno.land/x/mongo@v0.34.0/mod.ts';
export const recetteDtoSchema = z.object({
    id: z.string(),
    nom: z.string().min(5).max(100),
    description: z.string().min(1).max(500),
    instructions: z.string().max(1000),
    categorie: z.enum(['entrée', 'plat', 'dessert', 'autre']),
    tempsPreparation: z.number().positive(),
    origine: z.string().min(1).max(50),
    ingredients: z.array(ingredientCandidateDtoSchema),
});

export type RecetteDto = z.infer<typeof recetteDtoSchema>;

export const recetteCandidateDtoSchema = z.object({
    nom: z.string().min(5).max(100),
    description: z.string().min(1).max(500),
    instructions: z.string().max(1000),
    categorie: z.enum(['entrée', 'plat', 'dessert', 'autre']),
    tempsPreparation: z.number().positive(),
    origine: z.string().min(1).max(50),
    ingredients: z.array(ingredientCandidateDtoSchema),
});

export type RecetteDtoCandidate = z.infer<typeof recetteCandidateDtoSchema>;
export interface RecetteCandidateDto {
    nom: string;
    description: string;
    instructions: string;
    categorie: RecetteCategorie;
    tempsPreparation: number;
    origine: string;
    ingredients: IngredientCandidateDto[];
}

export function fromRecetteToDto(recette: Recette): RecetteDto {
    return {
        ...recette,
    };
}

export function fromDtoToRecette(recetteDto: RecetteDto): Recette {
    return {
        ...recetteDto,
        categorie: recetteDto.categorie as RecetteCategorie,
        ingredients: recetteDto.ingredients.map((ingredient) => ({
            ...ingredient,
            id: new ObjectId().toString(),
        })),
    };
}

export function fromRecetteCandidateDtoToRecetteCandidate(recetteCandidateDto: RecetteCandidateDto): RecetteCandidate {
    return {
        ...recetteCandidateDto,
    };
}
