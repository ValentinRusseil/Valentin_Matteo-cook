import { Ingredient, IngredientCandidate } from '../../services/models/ingredient.model.ts';
import { z } from '../../deps.ts';

export const ingredientDtoSchema = z.object({
    id: z.string(),
    nom: z.string().min(3).max(50),
});

export type IngredientDto = z.infer<typeof ingredientDtoSchema>;

export const ingredientCandidateDtoSchema = z.object({
    nom: z.string().min(3).max(50),
});

export interface IngredientCandidateDto {
    nom: string;
}

export function fromIngredientToDto(ingredient: Ingredient): IngredientDto {
    return {
        ...ingredient,
    };
}

export function fromDtoToIngredient(dto: IngredientDto): Ingredient {
    return {
        ...dto,
    };
}

export function fromIngredientCandidateDtoToIngredientCandidate(
    dtoCandidate: IngredientCandidateDto,
): IngredientCandidate {
    return {
        ...dtoCandidate,
    };
}
