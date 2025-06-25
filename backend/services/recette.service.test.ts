import { assertEquals, assertRejects, spy, assertSpyCalls, assertSpyCall, describe, it } from "../deps.ts";

import * as recetteRepository from "../repositories/recette.repository.ts";
import * as ingredientRepository from "../repositories/ingredient.repository.ts";
import { createRecetteService, getRecetteByIdService, getAllRecettesService, getRecetteByNomService, getRecetteByCategorieService, updateRecetteService, deleteRecetteService } from "./recette.service.ts";
import { Recette, RecetteCandidate, RecetteCategorie } from "./models/recette.model.ts";
import { Ingredient, IngredientCandidate } from "./models/ingredient.model.ts";

describe("Recette Service Tests", () => {

    describe("getAllRecettesService", () => {
        it("getAllRecettesService - Cas nominal", async () => {
            // Given
            const expectedRecettes: Recette[] = [
                { id: "1", nom: "Recette 1", description: "Description 1", tempsPreparation: 30, categorie: RecetteCategorie.DESSERT, origine: "France", instructions: "Instructions 1", ingredients: [] },
                { id: "2", nom: "Recette 2", description: "Description 2", tempsPreparation: 45, categorie: RecetteCategorie.PLAT, origine: "Italie", instructions: "Instructions 2", ingredients: [] },
            ];
            const getAllRecettesMock = async (): Promise<Recette[]> => {
                return expectedRecettes;
            };

            const mockRepository = { ...recetteRepository, getAllRecettes: getAllRecettesMock };


            // When
            const recettes = await getAllRecettesService(mockRepository);


            // Then
            assertEquals(recettes, expectedRecettes);
        });

        it("getAllRecettesService - Cas nominal", async () => {
            // Given
            const expectedRecettes: Recette[] = [
                { id: "1", nom: "Recette 1", description: "Description 1", tempsPreparation: 30, categorie: RecetteCategorie.DESSERT, origine: "France", instructions: "Instructions 1", ingredients: [] },
                { id: "2", nom: "Recette 2", description: "Description 2", tempsPreparation: 45, categorie: RecetteCategorie.PLAT, origine: "Italie", instructions: "Instructions 2", ingredients: [] },
            ];
            const getAllRecettesMock = async (): Promise<Recette[]> => {
                return expectedRecettes;
            };

            const mockRepository = { ...recetteRepository, getAllRecettes: getAllRecettesMock };


            // When
            const recettes = await getAllRecettesService(mockRepository);


            // Then
            assertEquals(recettes, expectedRecettes);
        });
    });

    describe("getRecetteByIdService", () => {
        it("getRecetteByIdService - Cas nominal", async () => {
            // Given
            const recetteId = "1";
            const expectedRecette: Recette = {
                id: recetteId,
                nom: "Recette 1",
                description: "Description 1",
                tempsPreparation: 30,
                categorie: RecetteCategorie.DESSERT,
                origine: "France",
                instructions: "Instructions 1",
                ingredients: [],
            };
            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                return expectedRecette;
            };

            const mockRepository = { ...recetteRepository, getRecetteById: getRecetteByIdMock };


            // When
            const recette = await getRecetteByIdService(recetteId, mockRepository);


            // Then
            assertEquals(recette, expectedRecette);
        });

        it("getRecetteByIdService - Cas recette non trouvée", async () => {
            // Given
            const recetteId = "non_existent_id";
            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                throw new Error("Recette not found");
            };

            // When & Then
            const mockRepository = { ...recetteRepository, getRecetteById: getRecetteByIdMock };

            await assertRejects(
                async () => {
                    await getRecetteByIdService(recetteId, mockRepository);
                },
                Error,
                "Recette not found",
            );
        });
    });

    describe("getRecetteByNomService", () => {
        it("getRecetteByNomService - Cas nominal", async () => {
            // Given
            const recetteNom = "Recette 1";
            const expectedRecettes: Recette[] = [
                {
                    id: "1",
                    nom: recetteNom,
                    description: "Description 1",
                    tempsPreparation: 30,
                    categorie: RecetteCategorie.DESSERT,
                    origine: "France",
                    instructions: "Instructions 1",
                    ingredients: [],
                },
            ];
            const getRecetteByNomMock = async (nom: string): Promise<Recette[]> => {
                return expectedRecettes;
            };

            const mockRepository = { ...recetteRepository, getRecetteByNom: getRecetteByNomMock };


            // When
            const recettes = await getRecetteByNomService(recetteNom, mockRepository);


            // Then
            assertEquals(recettes, expectedRecettes);
        });

        it("getRecetteByNomService - Cas avec pas de recette", async () => {
            // Given
            const recetteNom = "Non Existent Recette";
            const expectedRecettes: Recette[] = [];
            const getRecetteByNomMock = async (nom: string): Promise<Recette[]> => {
                return expectedRecettes;
            };

            const mockRepository = { ...recetteRepository, getRecetteByNom: getRecetteByNomMock };


            // When
            const recettes = await getRecetteByNomService(recetteNom, mockRepository);


            // Then
            assertEquals(recettes, expectedRecettes);
        });
    });

    describe("getRecetteByCategorieService", () => {
        it("getRecetteByCategorieService - Cas nominal", async () => {
            // Given
            const categorie = RecetteCategorie.DESSERT;
            const expectedRecettes: Recette[] = [
                {
                    id: "1",
                    nom: "Recette Dessert 1",
                    description: "Description 1",
                    tempsPreparation: 30,
                    categorie: RecetteCategorie.DESSERT,
                    origine: "France",
                    instructions: "Instructions 1",
                    ingredients: [],
                },
            ];
            const getRecetteByCategorieMock = async (categorie: "entrée" | "plat" | "dessert" | "autre"): Promise<Recette[]> => {
                return expectedRecettes;
            };

            const mockRepository = { ...recetteRepository, getRecetteByCategorie: getRecetteByCategorieMock };


            // When
            const recettes = await getRecetteByCategorieService(categorie, mockRepository);


            // Then
            assertEquals(recettes, expectedRecettes);
        });

        it("getRecetteByCategorieService - Cas catégorie invalide", async () => {
            // Given
            const categorie = "invalid_categorie";
            const mockRepository = { ...recetteRepository };

            // When & Then
            await assertRejects(
                async () => {
                    await getRecetteByCategorieService(categorie, mockRepository);
                },
                Error,
                `Catégorie invalide. Les catégories valides sont : ${Object.values(RecetteCategorie).join(', ')}`,
            );
        });
    });

    describe("createRecetteService", () => {
        it("createRecetteService - Cas nominal", async () => {
            // Given
            const ingredientCandidate: IngredientCandidate = {
                nom: "Test Ingredient",
            };

            const recetteCandidate: RecetteCandidate = {
                nom: "Test Recette",
                description: "Description de la recette",
                tempsPreparation: 30,
                categorie: RecetteCategorie.DESSERT,
                origine: "France",
                instructions: "Instructions de la recette",
                ingredients: [ingredientCandidate],
            };

            const createdRecette: Recette = {
                id: "1",
                ...recetteCandidate,
                ingredients: [],
            };
            const createRecetteMock = async (recette: RecetteCandidate): Promise<Recette> => {
                return createdRecette;
            };

            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                return createdRecette;
            };

            const mockRepository = { ...recetteRepository, createRecette: createRecetteMock, getRecetteById: getRecetteByIdMock };


            // When
            const result = await createRecetteService(recetteCandidate, mockRepository);


            // Then
            assertEquals(result, createdRecette);
        });

        it("createRecetteService - Cas recette candidate invalide", async () => {
            // Given
            const recetteCandidate: RecetteCandidate = {
                nom: "",
                description: "Description de la recette",
                tempsPreparation: 30,
                categorie: RecetteCategorie.DESSERT,
                origine: "France",
                instructions: "Instructions de la recette",
                ingredients: [],
            };

            const createRecetteMock = async (recette: RecetteCandidate): Promise<Recette> => {
                throw new Error("Recette candidate invalide");
            };

            const mockRepository = { ...recetteRepository, createRecette: createRecetteMock };


            // When & Then
            await assertRejects(
                async () => {
                    await createRecetteService(recetteCandidate, mockRepository);
                },
                Error,
                "Recette candidate invalide",
            );
        });
    });

    describe("updateRecetteService", () => {
        it("updateRecetteService - Cas nominal", async () => {
            // Given
            const recette: Recette = {
                id: "1",
                nom: "Updated Recette",
                description: "Updated Description",
                tempsPreparation: 45,
                categorie: RecetteCategorie.PLAT,
                origine: "Italie",
                instructions: "Updated Instructions",
                ingredients: [],
            };

            const getRecetteByIdSpy = spy(() => Promise.resolve(recette));
            const updateRecetteSpy = spy(() => Promise.resolve(recette));
            const getIngredientByIdSpy = spy((id: string) => 
                Promise.resolve({ id, nom: `Ingredient ${id}` } as Ingredient)
            );

            const updatedRecette: Recette = {
                ...recette,
                ingredients: [],
            };

            const updateRecetteMock = async (recette: Recette): Promise<Recette> => {
                return updatedRecette;
            };

            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                return updatedRecette;
            };

            const mockRepository = { ...recetteRepository, updateRecette: updateRecetteMock, getRecetteById: getRecetteByIdMock };


            // When
            const result = await updateRecetteService(recette, mockRepository);


            // Then
            assertEquals(result, updatedRecette);
        });

        it("updateRecetteService - Cas recette non trouvée", async () => {
            // Given
            const recette: Recette = {
                id: "non_existent_id",
                nom: "Updated Recette",
                description: "Updated Description",
                tempsPreparation: 45,
                categorie: RecetteCategorie.PLAT,
                origine: "Italie",
                instructions: "Updated Instructions",
                ingredients: [],
            };

            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                throw new Error("Recette not found");
            };

            const mockRepository = { ...recetteRepository, getRecetteById: getRecetteByIdMock };


            // When & Then
            await assertRejects(
                async () => {
                    await updateRecetteService(recette, mockRepository);
                },
                Error,
                "Recette not found",
            );
        });

        it("updateRecetteService - Cas recette id non trouvé", async () => {
            // Given
            const recette: Recette = {
                id: "non_existent_id",
                nom: "Updated Recette",
                description: "Updated Description",
                tempsPreparation: 45,
                categorie: RecetteCategorie.PLAT,
                origine: "Italie",
                instructions: "Updated Instructions",
                ingredients: [],
            };
            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                return undefined as unknown as Recette; // Simule l'absence de la recette
            };
            const mockRepository = { ...recetteRepository, getRecetteById: getRecetteByIdMock };


            // When & Then
            await assertRejects(
                async () => {
                    await updateRecetteService(recette, mockRepository);
                },
                Error,
                "Recette not found",
            );
        });

        it("updateRecetteService - Cas ingredient inexistant (BadRequestException)", async () => {
            // Given
            const recette: Recette = {
                id: "1",
                nom: "Recette test",
                description: "desc",
                tempsPreparation: 10,
                categorie: RecetteCategorie.PLAT,
                origine: "France",
                instructions: "inst",
                ingredients: [{ id: "not_found", nom: "Ingrédient inconnu" }],
            };

            const getRecetteByIdMock = async (_id: string): Promise<Recette> => recette;
            const updateRecetteMock = async (r: Recette): Promise<Recette> => r;
            // Ici, on simule l'absence de l'ingrédient
            const getIngredientByIdMock = async (_id: string): Promise<Ingredient> => {return undefined as unknown as Ingredient;};

            const mockRepository = { ...recetteRepository, updateRecette: updateRecetteMock, getRecetteById: getRecetteByIdMock };
            const mockIngredientRepository = { ...ingredientRepository, getIngredientById: getIngredientByIdMock };


            // When & Then
            await assertRejects(
                async () => {
                    await updateRecetteService(recette, mockRepository, mockIngredientRepository);
                },
                Error,
                "Ingredient with id not_found does not exist",
            );
        });

        it("updateRecetteService - Cas ingrédient non trouvé", async () => {
            // Given
            const recette: Recette = {
                id: "1",
                nom: "Updated Recette",
                description: "Updated Description",
                tempsPreparation: 45,
                categorie: RecetteCategorie.PLAT,
                origine: "Italie",
                instructions: "Updated Instructions",
                ingredients: [{ id: "non_existent_ingredient_id", nom: "Non Existent Ingredient" }],
            };

            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                return recette;
            };
            const getIngredientByIdMock = async (id: string): Promise<Recette> => {
                throw new Error("Ingredient with id non_existent_ingredient_id does not exist, but got \"Ingredient not found\".");
            };

            const mockRepository = { ...recetteRepository, getRecetteById: getRecetteByIdMock };
            const mockIngredientRepository = { ...ingredientRepository, getIngredientById: getIngredientByIdMock };


            // When & Then
            await assertRejects(
                async () => {
                    await updateRecetteService(recette, mockRepository, mockIngredientRepository);
                },
                Error,
                "Ingredient with id non_existent_ingredient_id does not exist",
            );
        });
    });

    describe("deleteRecetteService", () => {
        it("deleteRecetteService - Cas nominal", async () => {
            // Given
            const recetteId = "1";
            const deleteRecetteMock = async (id: string): Promise<void> => {};

            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                return { id: recetteId, nom: "Recette 1", description: "Description 1", tempsPreparation: 30, categorie: RecetteCategorie.DESSERT, origine: "France", instructions: "Instructions 1", ingredients: [] };
            };

            const mockRepository = { ...recetteRepository, deleteRecette: deleteRecetteMock, getRecetteById: getRecetteByIdMock };


            // When
            const result = await deleteRecetteService(recetteId, mockRepository);


            // Then
            assertEquals(result, undefined);
        });

        it("deleteRecetteService - Cas recette non trouvée", async () => {
            // Given
            const recetteId = "non_existent_id";
            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                throw new Error("Recette not found");
            };

            const mockRepository = { ...recetteRepository, getRecetteById: getRecetteByIdMock };


            // When & Then
            await assertRejects(
                async () => {
                    await deleteRecetteService(recetteId, mockRepository);
                },
                Error,
                "Recette not found",
            );
        });

        it("deleteRecetteService - Cas recette id non trouvé", async () => {
            // Given
            const recetteId = "non_existent_id";
            const getRecetteByIdMock = async (id: string): Promise<Recette> => {
                return undefined as unknown as Recette; // Simule l'absence de la recette
            };

            const mockRepository = { ...recetteRepository, getRecetteById: getRecetteByIdMock };


            // When & Then
            await assertRejects(
                async () => {
                    await deleteRecetteService(recetteId, mockRepository);
                },
                Error,
                "Recette not found",
            );
        });
    });

    describe("Test avec des spys", () => {
        it("deleteRecetteService - Vérifie que deleteRecette est appelé exactement une fois", async () => {
            // Given
            const recetteId = "1";
            const existingRecette: Recette = {
                id: recetteId,
                nom: "Recette à supprimer",
                description: "Description",
                tempsPreparation: 30,
                categorie: RecetteCategorie.DESSERT,
                origine: "France",
                instructions: "Instructions",
                ingredients: []
            };

            const getRecetteByIdSpy = spy(() => Promise.resolve(existingRecette));
            const deleteRecetteSpy = spy(() => Promise.resolve());

            const mockRepository = {
                ...recetteRepository,
                getRecetteById: getRecetteByIdSpy,
                deleteRecette: deleteRecetteSpy
            };

            // When
            await deleteRecetteService(recetteId, mockRepository);

            // Then - Équivalent de verify(...).times(1)
            assertSpyCalls(getRecetteByIdSpy, 1);
            assertSpyCalls(deleteRecetteSpy, 1);
            
            // Vérifier les arguments passés
            assertSpyCall(getRecetteByIdSpy, 0, { args: [recetteId] });
            assertSpyCall(deleteRecetteSpy, 0, { args: [recetteId] });
        });

        it("deleteRecetteService - Vérifie que deleteRecette n'est JAMAIS appelé si recette non trouvée", async () => {
            // Given
            const recetteId = "non_existent_id";
            const getRecetteByIdSpy = spy(() => {
                throw new Error("Recette not found");
            });
            const deleteRecetteSpy = spy(() => Promise.resolve());

            const mockRepository = {
                ...recetteRepository,
                getRecetteById: getRecetteByIdSpy,
                deleteRecette: deleteRecetteSpy
            };

            // When & Then
            await assertRejects(async () => {
                await deleteRecetteService(recetteId, mockRepository);
            }, Error, "Recette not found");

            // Vérifier que getRecetteById a été appelé
            assertSpyCalls(getRecetteByIdSpy, 1);
            
            // Équivalent de verify(...).never() - deleteRecette ne doit JAMAIS être appelé
            assertSpyCalls(deleteRecetteSpy, 0);
        });

        it("updateRecetteService - Vérifie les appels multiples aux dépendances", async () => {
            // Given
            const recette: Recette = {
                id: "1",
                nom: "Updated Recette",
                description: "Updated Description",
                tempsPreparation: 45,
                categorie: RecetteCategorie.PLAT,
                origine: "Italie",
                instructions: "Updated Instructions",
                ingredients: [
                    { id: "ing1", nom: "Ingredient 1" },
                    { id: "ing2", nom: "Ingredient 2" }
                ]
            };

            const getRecetteByIdSpy = spy(() => Promise.resolve(recette));
            const updateRecetteSpy = spy(() => Promise.resolve(recette));
            const getIngredientByIdSpy = spy((id: string) => 
                Promise.resolve({ id, nom: `Ingredient ${id}` } as Ingredient)
            );

            const mockRepository = {
                ...recetteRepository,
                getRecetteById: getRecetteByIdSpy,
                updateRecette: updateRecetteSpy
            };

            const mockIngredientRepository = {
                ...ingredientRepository,
                getIngredientById: getIngredientByIdSpy
            };

            // When
            await updateRecetteService(recette, mockRepository, mockIngredientRepository);

            // Then - Vérifications multiples
            assertSpyCalls(getRecetteByIdSpy, 1); // Appelé 1 fois
            assertSpyCalls(updateRecetteSpy, 1);  // Appelé 1 fois
            assertSpyCalls(getIngredientByIdSpy, 2); // Appelé 2 fois (pour chaque ingrédient)
            
            // Vérifier les arguments spécifiques
            assertSpyCall(getIngredientByIdSpy, 0, { args: ["ing1"] });
            assertSpyCall(getIngredientByIdSpy, 1, { args: ["ing2"] });
        });
    });
});
