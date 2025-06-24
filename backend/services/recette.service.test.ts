import { assertEquals, assertRejects } from "../deps.ts";

import * as recetteRepository from "../repositories/recette.repository.ts";
import * as ingredientRepository from "../repositories/ingredient.repository.ts";
import { createRecetteService, getRecetteByIdService, getAllRecettesService, getRecetteByNomService, getRecetteByCategorieService, updateRecetteService, deleteRecetteService } from "./recette.service.ts";
import { Recette, RecetteCandidate, RecetteCategorie } from "./models/recette.model.ts";
import { IngredientCandidate } from "./models/ingredient.model.ts";

Deno.test("getAllRecettesService - Cas nominal", async () => {
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

Deno.test("getAllRecettesService - Cas avec pas de donner", async () => {
    // Given
    const expectedRecettes: Recette[] = [];
    const getAllRecettesMock = async (): Promise<Recette[]> => {
        return expectedRecettes;
    };

    const mockRepository = { ...recetteRepository, getAllRecettes: getAllRecettesMock };

    // When
    const recettes = await getAllRecettesService(mockRepository);

    // Then
    assertEquals(recettes, expectedRecettes);
});

Deno.test("getRecetteByIdService - Cas nominal", async () => {
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

Deno.test("getRecetteByIdService - Cas recette non trouvée", async () => {
    // Given
    const recetteId = "non_existent_id";
    const getRecetteByIdMock = async (id: string): Promise<Recette> => {
        assertEquals(id, recetteId);
        throw new Error("Recette not found");
    };

    const mockRepository = { ...recetteRepository, getRecetteById: getRecetteByIdMock };

    await assertRejects(
        async () => {
            await getRecetteByIdService(recetteId, mockRepository);
        },
        Error,
        "Recette not found",
    );
});

Deno.test("getRecetteByNomService - Cas nominal", async () => {
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

Deno.test("getRecetteByNomService - Cas avec pas de recette", async () => {
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

Deno.test("getRecetteByCategorieService - Cas nominal", async () => {
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

Deno.test("getRecetteByCategorieService - Cas catégorie invalide", async () => {
    // Given
    const categorie = "invalid_categorie";
    const mockRepository = { ...recetteRepository };
    await assertRejects(
        async () => {
            await getRecetteByCategorieService(categorie, mockRepository);
        },
        Error,
        `Catégorie invalide. Les catégories valides sont : ${Object.values(RecetteCategorie).join(', ')}`,
    );
});

Deno.test("createRecetteService - Cas nominal", async () => {
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
        assertEquals(recette, recetteCandidate);
        return createdRecette;
    };

    const getRecetteByIdMock = async (id: string): Promise<Recette> => {
        return createdRecette;
    };

    const mockRepository = { ...recetteRepository, createRecette: createRecetteMock, getRecetteById: getRecetteByIdMock };

    // When
    await createRecetteService(recetteCandidate, mockRepository);
});

Deno.test("createRecetteService - Cas recette candidate invalide", async () => {
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

Deno.test("updateRecetteService - Cas nominal", async () => {
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

    const updatedRecette: Recette = {
        ...recette,
        ingredients: [],
    };

    const updateRecetteMock = async (recette: Recette): Promise<Recette> => {
        assertEquals(recette, updatedRecette);
        return updatedRecette;
    };

    const getRecetteByIdMock = async (id: string): Promise<Recette> => {
        return updatedRecette;
    };

    const mockRepository = { ...recetteRepository, updateRecette: updateRecetteMock, getRecetteById: getRecetteByIdMock };

    // When
    await updateRecetteService(recette, mockRepository);
});

Deno.test("updateRecetteService - Cas recette non trouvée", async () => {
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
        assertEquals(id, recette.id);
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

Deno.test("updateRecetteService - Cas ingrédient non trouvé", async () => {
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
    const getIngredientByIdMock = async (id: string): Promise<{ id: string; nom: string }> => {
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

Deno.test("deleteRecetteService - Cas nominal", async () => {
    // Given
    const recetteId = "1";
    const deleteRecetteMock = async (id: string): Promise<void> => {
        assertEquals(id, recetteId);
    };

    const getRecetteByIdMock = async (id: string): Promise<Recette> => {
        return { id: recetteId, nom: "Recette 1", description: "Description 1", tempsPreparation: 30, categorie: RecetteCategorie.DESSERT, origine: "France", instructions: "Instructions 1", ingredients: [] };
    };

    const mockRepository = { ...recetteRepository, deleteRecette: deleteRecetteMock, getRecetteById: getRecetteByIdMock };

    // When
    await deleteRecetteService(recetteId, mockRepository);
});

Deno.test("deleteRecetteService - Cas recette non trouvée", async () => {
    // Given
    const recetteId = "non_existent_id";
    const getRecetteByIdMock = async (id: string): Promise<Recette> => {
        assertEquals(id, recetteId);
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