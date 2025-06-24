import { loadRecettes } from '$lib/stores/recetteStore';

export const load = async ({ fetch }) => {
    await loadRecettes(fetch);
};
