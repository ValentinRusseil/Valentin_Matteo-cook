import type { Ingredient } from '$lib/types/ingredient';
import { writable, derived } from 'svelte/store';
import { IngredientService } from '$lib/services/ingredientService';

interface IngredientState {
    ingredient: Ingredient | null;
    error: string | null;
    loading: boolean;
}

function createIngredientStore() {
    const { subscribe, set, update } = writable<IngredientState>({
        ingredient: null,
        error: null,
        loading: false,
    });

    return {
        subscribe,
        loadIngredient: async (fetch: typeof window.fetch, id: string) => {
            update((state) => ({ ...state, loading: true }));
            try {
                const ingredient = await IngredientService.getIngredientById(fetch, id);
                set({ ingredient, error: null, loading: false });
            } catch (e) {
                set({ ingredient: null, error: (e as Error).message, loading: false });
            }
        },
        reset: () => set({ ingredient: null, error: null, loading: false }),
        deleteIngredient: async (fetch: typeof window.fetch, id: string) => {
            try {
                await IngredientService.deleteIngredientById(fetch, id);
                return true;
            } catch (e) {
                set({ ingredient: null, error: (e as Error).message, loading: false });
                return false;
            }
        },
        updateIngredient: async (fetch: typeof window.fetch, id: string, ingredient: Ingredient) => {
            try {
                await IngredientService.updateIngredient(fetch, id, ingredient);
                set({ ingredient, error: null, loading: false });
                return true;
            } catch (e) {
                set({ ingredient: null, error: (e as Error).message, loading: false });
                return false;
            }
        },
    };
}

export const ingredientStore = createIngredientStore();

interface IngredientState {
    ingredient: Ingredient | null;
    error: string | null;
    loading: boolean;
}

export const ingredients = writable<Ingredient[]>([]);
export const ingredientSearchQuery = writable<string>('');

export async function loadIngredients(fetch: typeof window.fetch) {
    const data = await IngredientService.getIngredients(fetch);
    ingredients.set(data);
}
export async function addIngredient(ingredient: string): Promise<Response> {
    return IngredientService.addIngredient(ingredient);
}

export async function getIngredient(name: string): Promise<Ingredient> {
    return IngredientService.getIngredientName(name).then((ingredients) => ingredients[0]);
}

// Filtrer les ingrédients en fonction de la recherche
export const filteredIngredients = derived(
    [ingredients, ingredientSearchQuery],
    ([$ingredients, $ingredientSearchQuery]) => {
        if (!$ingredientSearchQuery) return $ingredients;
        return $ingredients.filter((ingredient) =>
            ingredient.nom.toLowerCase().includes($ingredientSearchQuery.toLowerCase()),
        );
    },
);
