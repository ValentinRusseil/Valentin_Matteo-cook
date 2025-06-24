import { Context, Router, RouterContext } from '../deps.ts';
import * as recetteService from '../services/recette.service.ts';
import {
    fromDtoToRecette,
    fromRecetteCandidateDtoToRecetteCandidate,
    fromRecetteToDto,
    recetteCandidateDtoSchema,
} from './dtos/recette.dto.ts';
import { Recette, RecetteCategorie } from '../services/models/recette.model.ts';

const router = new Router();

router
    .get('/recettes', getAllRecettesController)
    .get('/recettes/:id', getRecetteByIdController)
    .post('/recettes', createRecetteController)
    .put('/recettes/:id', updateRecetteController)
    .delete('/recettes/:id', deleteRecetteController);

async function getAllRecettesController(ctx: Context) {
    const nom = ctx.request.url.searchParams.get('nom');
    const categorie = ctx.request.url.searchParams.get('categorie');
    if (nom) {
        ctx.response.body = (await recetteService.getRecetteByNomService(nom)).map((recette) =>
            fromRecetteToDto(recette),
        );
    } else if (categorie) {
        ctx.response.body = (await recetteService.getRecetteByCategorieService(categorie)).map((recette) =>
            fromRecetteToDto(recette),
        );
    } else {
        ctx.response.body = (await recetteService.getAllRecettesService()).map((recette) => fromRecetteToDto(recette));
    }
}

async function getRecetteByIdController(ctx: RouterContext<'/recettes/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing book ID' };
        return;
    }
    ctx.response.body = fromRecetteToDto(await recetteService.getRecetteByIdService(idParam));
}

async function createRecetteController(ctx: Context) {
    const body = await ctx.request.body({ type: 'json' }).value;

    const validationResult = recetteCandidateDtoSchema.safeParse(body);
    if (!validationResult.success) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: 'Invalid input',
            details: validationResult.error.format(),
        };
        return;
    }

    const recetteCandidate = fromRecetteCandidateDtoToRecetteCandidate({
        ...validationResult.data,
        categorie: validationResult.data.categorie as RecetteCategorie,
    });
    ctx.response.status = 201;
    ctx.response.body = fromRecetteToDto(await recetteService.createRecetteService(recetteCandidate));
}

async function updateRecetteController(ctx: RouterContext<'/recettes/:id'>) {
    const body = await ctx.request.body({ type: 'json' }).value;
    const id = ctx.params.id;

    const validationResult = recetteCandidateDtoSchema.safeParse(body);
    if (!validationResult.success) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: 'Invalid input',
            details: validationResult.error.format(),
        };
        return;
    }

    const recetteCandidate = fromRecetteCandidateDtoToRecetteCandidate({
        ...validationResult.data,
        categorie: validationResult.data.categorie as RecetteCategorie,
    });
    const recette: Recette = fromDtoToRecette({ ...recetteCandidate, id });
    ctx.response.status = 200;
    ctx.response.body = {
        message: 'Recette updated successfully',
        body: fromRecetteToDto(await recetteService.updateRecetteService(recette)),
    };
}

async function deleteRecetteController(ctx: RouterContext<'/recettes/:id'>) {
    const idParam = ctx.params.id;
    if (!idParam) {
        ctx.response.status = 400;
        ctx.response.body = { error: 'Missing Recette ID' };
        return;
    }
    await recetteService.deleteRecetteService(idParam);
    ctx.response.status = 204;
    ctx.response.body = null;
}

export default router;
