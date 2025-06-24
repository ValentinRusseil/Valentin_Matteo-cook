<script lang="ts">
    import { goto } from '$app/navigation';
    import { IngredientService } from '$lib/services/ingredientService';
    import '../../../styles/IngredientForm.scss';

    let nom = '';
    let error = '';
    let loading = false;

    async function handleSubmit() {
        if (!nom.trim()) {
            error = 'Le nom de l\'ingrédient est requis';
            return;
        }

        loading = true;
        error = '';

        try {
            await IngredientService.createIngredient(fetch, { nom: nom.trim() });
            goto('/ingredients');
        } catch (e) {
            error = 'Une erreur est survenue lors de la création de l\'ingrédient';
        } finally {
            loading = false;
        }
    }
</script>

<div class="ingredient-form">
    <div class="form-header">
        <h1>Ajouter un ingrédient</h1>
    </div>

    <div class="form-content">
        <form on:submit|preventDefault={handleSubmit}>
            <div class="form-group">
                <input
                    type="text"
                    id="nom"
                    bind:value={nom}
                    placeholder="Nom de l'ingrédient"
                />
            </div>

            {#if error}
                <div class="error-message">{error}</div>
            {/if}

            <div class="form-actions">
                <a href="/ingredients" class="bouton-annuler">
                    Annuler
                </a>
                <button
                    type="submit"
                    class="bouton-creer"
                    disabled={loading}
                >
                    {loading ? 'Création en cours...' : 'Créer'}
                </button>
            </div>
        </form>
    </div>
</div>
