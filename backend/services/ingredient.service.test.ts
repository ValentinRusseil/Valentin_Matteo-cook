import { assertEquals, assertRejects } from "../deps.ts";
import {
    getAllIngredientsService,
    getIngredientByIdService,
    getIngredientByNomService,
    createIngredientService,
    updateIngredientService,
    deleteIngredientService
} from './ingredient.service.ts';
import * as ingredientRepository from '../repositories/ingredient.repository.ts';
import { NotFoundException } from '../deps.ts';
import { Ingredient, IngredientCandidate } from './models/ingredient.model.ts';

const fakeIngredient: Ingredient = { id: '1', nom: 'Tomate' };
const fakeIngredientCandidate: IngredientCandidate = { nom: 'Tomate' };

Deno.test('getAllIngredientsService returns all ingredients', async () => {
    const mockRepo = { getAllIngredients: () => Promise.resolve([fakeIngredient]) };
    const result = await getAllIngredientsService(mockRepo as any);
    assertEquals(result, [fakeIngredient]);
});

Deno.test('getIngredientByIdService returns ingredient by id', async () => {
    const mockRepo = {
        getIngredientById: (id: string) => Promise.resolve(id === '1' ? fakeIngredient : null)
    };
    const result = await getIngredientByIdService('1', mockRepo as any);
    assertEquals(result, fakeIngredient);
});

Deno.test('getIngredientByNomService returns ingredient by nom', async () => {
    const mockRepo = {
        getIngredientByNom: (nom: string) => Promise.resolve(nom === 'Tomate' ? [fakeIngredient] : [])
    };
    const result = await getIngredientByNomService('Tomate', mockRepo as any);
    assertEquals(result, [fakeIngredient]);
});

Deno.test('createIngredientService creates an ingredient', async () => {
    const mockRepo = {
        createIngredient: (ingredientCandidate: IngredientCandidate) => Promise.resolve({ ...fakeIngredient, ...ingredientCandidate })
    };
    const result = await createIngredientService(fakeIngredientCandidate, mockRepo as any);
    assertEquals(result, { ...fakeIngredient, ...fakeIngredientCandidate });
});

Deno.test('updateIngredientService updates an ingredient', async () => {
    const mockRepo = {
        getIngredientById: (id: string) => Promise.resolve(fakeIngredient.id),
        updateIngredient: (ingredient: Ingredient) => Promise.resolve(ingredient)
    };
    const result = await updateIngredientService({ id: '1', nom: 'Updated Tomate' }, mockRepo as any);
    assertEquals(result, { ...fakeIngredient, nom: 'Updated Tomate' });
});

Deno.test('updateIngredientService throws NotFoundException if ingredient not found', async () => {
    const getIngredientByIdMock = async (id: string): Promise<Ingredient> => {
        throw new Error('No id found for this ingredient');
    };
    
    const mockRepo = {
        ...ingredientRepository,
        getIngredientById: getIngredientByIdMock,
    };

    await assertRejects(
        async () => {
            await updateIngredientService({ id: '999', nom: 'Nonexistent' }, mockRepo);
        },
        Error,
        'No id found for this ingredient'
    );
});

Deno.test('deleteIngredientService deletes an ingredient', async () => {
    const mockRepo = {
        getIngredientById: (id: string) => Promise.resolve(id === '1' ? fakeIngredient : null),
        deleteIngredient: (id: string) => Promise.resolve()
    };
    await deleteIngredientService('1', mockRepo as any);
});

Deno.test('deleteIngredientService throws NotFoundException if ingredient not found', async () => {
    const mockRepo = {
        getIngredientById: (id: string) => Promise.resolve(null),
        deleteIngredient: (id: string) => Promise.resolve()
    };
    await assertRejects(
        () => deleteIngredientService('999', mockRepo as any),
        NotFoundException,
        'No id found for this ingredient'
    );
});
