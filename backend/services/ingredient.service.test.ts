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

const mockIngredient: Ingredient = { id: '1', nom: 'Tomate' };
const mockIngredientCandidate: IngredientCandidate = { nom: 'Tomate' };

Deno.test('getAllIngredientsService returns all ingredients', async () => {
    //given
    const mockRepo = { getAllIngredients: () => Promise.resolve([mockIngredient]) };

    //when
    const result = await getAllIngredientsService(mockRepo as any);

    //then
    assertEquals(result, [mockIngredient]);
});

Deno.test('getAllIngredientsService returns empty array if no ingredients', async () => {
    //given
    const mockRepo = { getAllIngredients: () => Promise.resolve([]) };
    
    //when
    const result = await getAllIngredientsService(mockRepo as any);
    
    //then
    assertEquals(result, []);
});

Deno.test('getIngredientByIdService returns ingredient by id', async () => {
    //given
    const mockRepo = {
        getIngredientById: (id: string) => Promise.resolve(id === '1' ? mockIngredient : null)
    };

    //when
    const result = await getIngredientByIdService('1', mockRepo as any);
    
    //then
    assertEquals(result, mockIngredient);
});

Deno.test('getIngredientByIdService throws NotFoundException if ingredient not found', async () => {
    //given
    const mockRepo = {
        ...ingredientRepository,
        getIngredientById: (id: string): Promise<Ingredient> => {
            throw new NotFoundException("Ingredient not found");
        }
    }

    //when & then
    await assertRejects(
        () => getIngredientByIdService('999', mockRepo),
        NotFoundException,
        'Ingredient not found'
    );
});

Deno.test('getIngredientByNomService returns ingredient by nom', async () => {
    //given
    const mockRepo = {
        getIngredientByNom: (nom: string) => Promise.resolve(nom === 'Tomate' ? [mockIngredient] : [])
    };

    //when
    const result = await getIngredientByNomService('Tomate', mockRepo as any);

    //then
    assertEquals(result, [mockIngredient]);
});

Deno.test('createIngredientService creates an ingredient', async () => {
    //given
    const mockRepo = {
        createIngredient: (ingredientCandidate: IngredientCandidate) => Promise.resolve({ ...mockIngredient, ...ingredientCandidate })
    };

    //when
    const result = await createIngredientService(mockIngredientCandidate, mockRepo as any);

    //then
    assertEquals(result, { ...mockIngredient, ...mockIngredientCandidate });
});

Deno.test('updateIngredientService updates an ingredient', async () => {
    //given
    const mockRepo = {
        getIngredientById: (id: string) => Promise.resolve(mockIngredient.id),
        updateIngredient: (ingredient: Ingredient) => Promise.resolve(ingredient)
    };

    //when
    const result = await updateIngredientService({ id: '1', nom: 'Updated Tomate' }, mockRepo as any);

    //then
    assertEquals(result, { ...mockIngredient, nom: 'Updated Tomate' });
});

Deno.test('updateIngredientService throws NotFoundException if ingredient not found', async () => {
    //given
    const getIngredientByIdMock = async (id: string): Promise<Ingredient> => {
        throw new Error('No id found for this ingredient');
    };
    
    const mockRepo = {
        ...ingredientRepository,
        getIngredientById: getIngredientByIdMock,
    };

    //when & then
    await assertRejects(
        async () => {
            await updateIngredientService({ id: '999', nom: 'Nonexistent' }, mockRepo);
        },
        Error,
        'No id found for this ingredient'
    );
});

Deno.test('updateIngredientService - cas ingredient id non trouvé', async () => {
    //given
    const mockRepo = {
        getIngredientById: (id: string) => Promise.resolve(null),
        updateIngredient: (ingredient: Ingredient) => Promise.resolve(ingredient)
    };

    //when & then
    await assertRejects(
        () => updateIngredientService({ id: '999', nom: 'Nonexistent' }, mockRepo as any),
        NotFoundException,
        'No id found for this ingredient'
    );
});

Deno.test('deleteIngredientService deletes an ingredient', async () => {
    //given
    const mockRepo = {
        ...ingredientRepository,
        getIngredientById: (id: string) => Promise.resolve(id === '1' ? mockIngredient : null),
        deleteIngredient: (id: string) => Promise.resolve()
    };
    //when
    await deleteIngredientService('1', mockRepo as any);

    //then
    await assertRejects(
        async () => {
            await updateIngredientService({ id: '999', nom: 'Nonexistent' }, mockRepo as any);
        },
        Error,
        'No id found for this ingredient'
    );
});

Deno.test('deleteIngredientService throws NotFoundException if ingredient not found', async () => {
    //given
    const mockRepo = {
        getIngredientById: (id: string) => Promise.resolve(null),
        deleteIngredient: (id: string) => Promise.resolve()
    };

    //when & then
    await assertRejects(
        () => deleteIngredientService('999', mockRepo as any),
        NotFoundException,
        'No id found for this ingredient'
    );
});
