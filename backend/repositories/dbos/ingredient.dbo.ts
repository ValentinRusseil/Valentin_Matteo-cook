import { ObjectId } from '../../deps.ts';
import { Ingredient } from '../../services/models/ingredient.model.ts';

export interface IngredientDbo {
    _id: ObjectId;
    nom: string;
}

export function fromIngredientDboToIngredient(dbo: IngredientDbo): Ingredient {
    const ingredient = JSON.parse(JSON.stringify(dbo));
    delete ingredient._id;
    ingredient.id = dbo._id.toString();
    return ingredient;
}

export function fromIngredientToIngredientDbo(ingredient: Ingredient): IngredientDbo {
    return {
        ...ingredient,
        _id: new ObjectId(ingredient.id),
    };
}
