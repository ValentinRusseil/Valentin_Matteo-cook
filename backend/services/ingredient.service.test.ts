import { assertEquals, assertRejects, describe, beforeEach, it } from "../deps.ts";
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

describe('Ingredient Service Tests', () => {
    let mockIngredient: Ingredient;
    let mockIngredientCandidate: IngredientCandidate;

    beforeEach(() => {
        mockIngredient = { id: '1', nom: 'Tomate' };
        mockIngredientCandidate = { nom: 'Tomate' };
    });
    
    describe('getAllIngredientsService', () => {
        it('should return all ingredients', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                getAllIngredients: () => Promise.resolve([mockIngredient])
            };

            //when
            const result = await getAllIngredientsService(mockRepo);

            //then
            assertEquals(result, [mockIngredient]);
        });

        it('should return empty array if no ingredients', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                    getAllIngredients: () => Promise.resolve([])
                };
            
            //when
            const result = await getAllIngredientsService(mockRepo);
            
            //then
            assertEquals(result, []);
        });

    });

    describe('getIngredientByIdService', () => {
        it('should return ingredient by id', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                getIngredientById: (id: string) => Promise.resolve(mockIngredient)
            };

            //when
            const result = await getIngredientByIdService('1', mockRepo);
            
            //then
            assertEquals(result, mockIngredient);
        });

        it('should throw NotFoundException if ingredient not found', async () => {
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
    });
    describe('getIngredientByNomService', () => {
        it('should return ingredient by nom', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                getIngredientByNom: (nom: string) => Promise.resolve([mockIngredient])
            };

            //when
            const result = await getIngredientByNomService('Tomate', mockRepo);

            //then
            assertEquals(result, [mockIngredient]);
        });

        it('should return empty array if no ingredient found by nom', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                getIngredientByNom: (nom: string) => Promise.resolve([])
            };

            //when
            const result = await getIngredientByNomService('Nonexistent', mockRepo);

            //then
            assertEquals(result, []);
        });
    });

    describe('createIngredientService', () => {
        it('should create an ingredient', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                createIngredient: (ingredientCandidate: IngredientCandidate) => Promise.resolve({ ...mockIngredient, ...ingredientCandidate })
            };

            //when
            const result = await createIngredientService(mockIngredientCandidate, mockRepo);

            //then
            assertEquals(result, { ...mockIngredient, ...mockIngredientCandidate });
        });

        it('should throw NotFoundException if ingredient creation fails', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                createIngredient: (ingredientCandidate: IngredientCandidate): Promise<Ingredient> => {
                    throw new NotFoundException('Ingredient creation failed');
                }
            };

            //when & then
            await assertRejects(
                () => createIngredientService(mockIngredientCandidate, mockRepo),
                NotFoundException,
                'Ingredient creation failed'
            );
        });
    });

    describe('updateIngredientService', () => {
        it('should update an ingredient', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                getIngredientById: (id: string) => Promise.resolve(mockIngredient),
                updateIngredient: (ingredient: Ingredient) => Promise.resolve(ingredient)
            };

            //when
            const result = await updateIngredientService({ id: '1', nom: 'Updated Tomate' }, mockRepo);

            //then
            assertEquals(result, { ...mockIngredient, nom: 'Updated Tomate' });
        });

        it('should throw NotFoundException if ingredient not found for update', async () => {
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

        it('should throw NotFoundException if ingredient id not found', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                getIngredientById: (id: string) => Promise.resolve(mockIngredient),
                updateIngredient: (ingredient: Ingredient) : Promise<Ingredient> => {
                throw new NotFoundException('No id found for this ingredient')
                }
            };

            //when & then
            await assertRejects(
                () => updateIngredientService({ id: '999', nom: 'Nonexistent' }, mockRepo),
                NotFoundException,
                'No id found for this ingredient'
            );
        });
    });

    describe('deleteIngredientService', () => { 
        it('should delete an ingredient', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                getIngredientById: (id: string) => Promise.resolve(mockIngredient),
                deleteIngredient: (id: string) => Promise.resolve()
            };

            //when
            const result = await deleteIngredientService('1', mockRepo);

            //then
            assertEquals(result, undefined);
        });

        it('should throw NotFoundException if ingredient not found for deletion', async () => {
            //given
            const mockRepo = {
                ...ingredientRepository,
                getIngredientById: (id: string): Promise<Ingredient> => {
                    throw new NotFoundException('No id found for this ingredient');
                },
            };

            //when & then
            await assertRejects(
                () => deleteIngredientService('999', mockRepo),
                NotFoundException,
                'No id found for this ingredient'
            );
        });
    });

});
