<script lang="ts">
    import Form from '$lib/components/Form.svelte';
    import { addRecette } from '$lib/stores/recetteStore';
    import type { CreateRecetteDto } from '$lib/types/recette';

    let ingredients:string;
    let ingredientsList: string[];
    let recette: CreateRecetteDto = {
        nom: '',
        description: '',
        ingredients: [],
        instructions: '',
        tempsPreparation: 0,
        categorie: '',
        origine: '',
    };

    const handleSubmit = async () => {
      recette.categorie = recette.categorie.toLowerCase();
      recette.instructions = recette.instructions.split('\n').map((step, index) => `${index + 1}. ${step}`).join('\n');
      ingredientsList = ingredients.split(',');
      recette.categorie = recette.categorie.toLowerCase();
      recette.ingredients = ingredientsList.map(ingredient => ({ nom: ingredient.trim() }));
        try {
            const response = await addRecette(recette);
            console.log('API Response:', response);
            window.location.href = '/';
        } catch (err) {
            console.error("Erreur lors de l'envoi:", err);
        }
    };
</script>

<h2>Ajouter une recette</h2>
<form on:submit|preventDefault={handleSubmit} class="form-container">
    <Form bind:recette bind:ingredients />
</form>

<style>
    .recette-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 400px;
        margin: auto;
    }
</style>
