import { Context, Router, RouterContext } from '../deps.ts';
import * as ingredientService from '../services/ingredient.service.ts';
import {
    fromDtoToIngredient,
    fromIngredientCandidateDtoToIngredientCandidate,
    fromIngredientToDto,
    ingredientCandidateDtoSchema,
} from './dtos/ingredient.dto.ts';
import { Ingredient } from '../services/models/ingredient.model.ts';

const router = new Router();

router
    .get('/ingredients', getAllIngredientsController)
    .get('/ingredients/:id', getIngredientByIdController)
    .post('/ingredients', createIngredientController)
    .put('/ingredients/:id', updateIngredientController)
    .delete('/ingredients/:id', deleteIngredientController);

async function getAllIngredientsController(ctx: Context) {
    const nom = ctx.request.url.searchParams.get('nom');
    if (nom) {
        ctx.response.body = (await ingredientService.getIngredientByNomService(nom)).map((ingredient) =>
            fromIngredientToDto(ingredient),
        );
    } else {
        ctx.response.body = (await ingredientService.getAllIngredientsService()).map((ingredient) =>
            fromIngredientToDto(ingredient),
        );
    }
}

async function getIngredientByIdController(ctx: RouterContext<'/ingredients/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing ingredient ID' };
        return;
    }
    ctx.response.body = fromIngredientToDto(await ingredientService.getIngredientByIdService(idParam));
}

async function createIngredientController(ctx: Context) {
    const body = await ctx.request.body({ type: 'json' }).value;

    const validationResult = ingredientCandidateDtoSchema.safeParse(body);
    if (!validationResult.success) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: 'Invalid input',
            details: validationResult.error.format(),
        };
        return;
    }

    const ingredientCandidate = fromIngredientCandidateDtoToIngredientCandidate(validationResult.data);
    ctx.response.status = 201;
    ctx.response.body = fromIngredientToDto(await ingredientService.createIngredientService(ingredientCandidate));
}

async function updateIngredientController(ctx: RouterContext<'/ingredients/:id'>) {
    const body = await ctx.request.body({ type: 'json' }).value;
    const id = ctx.params.id;

    const validationResult = ingredientCandidateDtoSchema.safeParse(body);
    if (!validationResult.success) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: 'Invalid input',
            details: validationResult.error.format(),
        };
        return;
    }

    const ingredientCandidate = fromIngredientCandidateDtoToIngredientCandidate(validationResult.data);
    const ingredient: Ingredient = fromDtoToIngredient({
        ...ingredientCandidate,
        id,
    });
    ctx.response.status = 200;
    ctx.response.body = {
        message: 'Ingredient updated successfully',
        body: fromIngredientToDto(await ingredientService.updateIngredientService(ingredient)),
    };
}

async function deleteIngredientController(ctx: RouterContext<'/ingredients/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing ingredient ID' };
        return;
    }

    await ingredientService.deleteIngredientService(idParam);
    ctx.response.status = 204;
    ctx.response.body = null;
}

export default router;
