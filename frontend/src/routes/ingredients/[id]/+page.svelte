<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { ingredientStore } from '$lib/stores/ingredientStore';
    import { navigateBack } from '$lib/utils/navigation';
    import { goto } from '$app/navigation';
    import '../../../styles/IngredientPage.scss';

    const id = $page.params.id;
    let isEditing = false;
    let editedIngredient: any = null;

    onMount(() => {
        ingredientStore.loadIngredient(fetch, id);
        return () => ingredientStore.reset();
    });

    function startEditing() {
        editedIngredient = { ...ingredient };
        isEditing = true;
    }

    async function saveChanges() {
        if (confirm('Voulez-vous enregistrer les modifications ?')) {
            const success = await ingredientStore.updateIngredient(fetch, id, editedIngredient);
            if (success) {
                isEditing = false;
            }
        }
    }

    function cancelEditing() {
        isEditing = false;
        editedIngredient = null;
    }

    async function handleDelete() {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet ingrédient ?')) {
            const success = await ingredientStore.deleteIngredient(fetch, id);
            if (success) {
                goto('/ingredients');
            }
        }
    }

    $: ({ ingredient, error, loading } = $ingredientStore);
</script>

<main class="ingredient-page">
    <div class="header-actions">
        <button class="bouton-retour" on:click={navigateBack}> ← Retour </button>
        {#if ingredient && !isEditing}
            <div class="action-buttons">
                <button class="bouton-modifier" on:click={startEditing}> Modifier </button>
                <button class="bouton-supprimer" on:click={handleDelete}> Supprimer </button>
            </div>
        {/if}
    </div>

    {#if loading}
        <div class="loading">
            <p>Chargement de l'ingrédient...</p>
        </div>
    {:else if error}
        <div class="error">
            <p>{error}</p>
        </div>
    {:else if ingredient}
        <div class="ingredient-details">
            {#if isEditing}
                <div class="edit-form">
                    <header class="ingredient-header">
                        <input type="text" bind:value={editedIngredient.nom} class="edit-input title" />
                    </header>

                    <div class="edit-actions">
                        <button class="bouton-annuler" on:click={cancelEditing}>Annuler</button>
                        <button class="bouton-sauvegarder" on:click={saveChanges}>Sauvegarder</button>
                    </div>
                </div>
            {:else}
                <header class="ingredient-header">
                    <h1>{ingredient.nom}</h1>
                </header>
            {/if}
        </div>
    {/if}
</main>
