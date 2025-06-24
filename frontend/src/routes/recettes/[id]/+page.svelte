<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { recetteStore } from '$lib/stores/recetteStore';
    import { navigateBack } from '$lib/utils/navigation';
    import { goto } from '$app/navigation';
    import '../../../styles/RecettePage.scss';

    let categories = [
        'Entrée',
        'Plat',
        'Dessert',
        'Autre'
    ];

    let origines = [
        'France',
        'Italie',
        'Espagne',
        'Allemagne',
        'Angleterre',
        'Portugal',
        'Mexique',
        'Brésil',
        'Chine',
        'Japon',
        'Inde',
        'Autre'
    ];

    const id = $page.params.id;
    let isEditing = false;
    let editedRecette: any = null;

    onMount(() => {
        recetteStore.loadRecette(fetch, id);
        return () => recetteStore.reset();
    });

    function startEditing() {
        editedRecette = { ...recette };
        isEditing = true;
    }

    async function saveChanges() {
        if (confirm('Voulez-vous enregistrer les modifications ?')) {
            const recette = {
                ...editedRecette,
                categorie: editedRecette.categorie.toLowerCase(),
            };
            const success = await recetteStore.updateRecette(fetch, id, recette);
            if (success) {
                isEditing = false;
            }
        }
    }

    function cancelEditing() {
        isEditing = false;
        editedRecette = null;
    }

    async function handleDelete() {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
            const success = await recetteStore.deleteRecette(fetch, id);
            if (success) {
                goto('/');
            }
        }
    }

    function addIngredient() {
        editedRecette.ingredients = [...editedRecette.ingredients, { nom: '' }];
    }

    function removeIngredient(index: number) {
        editedRecette.ingredients = editedRecette.ingredients.filter((_, i) => i !== index);
    }

    $: ({ recette, error, loading } = $recetteStore);
</script>

<main class="recette-page">
    <div class="header-actions">
        <button class="bouton-retour" on:click={navigateBack}> ← Retour </button>
        {#if recette && !isEditing}
            <div class="action-buttons">
                <button class="bouton-modifier" on:click={startEditing}> Modifier </button>
                <button class="bouton-supprimer" on:click={handleDelete}> Supprimer </button>
            </div>
        {/if}
    </div>

    {#if loading}
        <div class="loading">
            <p>Chargement de la recette...</p>
        </div>
    {:else if error}
        <div class="error">
            <p>{error}</p>
        </div>
    {:else if recette}
        <div class="recette-details">
            {#if isEditing}
                <div class="edit-form">
                    <header class="recette-header">
                        <input type="text" bind:value={editedRecette.nom} class="edit-input title" />
                        <textarea bind:value={editedRecette.description} class="edit-input description"></textarea>
                    </header>

                    <div class="meta-info">
                        <div>
                            <strong>Catégorie:</strong>
                            <select bind:value={editedRecette.categorie} class="edit-input">
                                <option value={editedRecette.categorie} disabled selected hidden>{editedRecette.categorie.charAt(0).toUpperCase() + editedRecette.categorie.slice(1)}</option>
                                {#each categories as categorie}
                                    <option value={categorie}>{categorie}</option>
                                {/each}
                            </select>
                        </div>
                        <div>
                            <strong>Origine:</strong>
                            <select bind:value={editedRecette.origine} class="edit-input">
                                {#each origines as origine}
                                    <option value={origine}>{origine}</option>
                                {/each}
                            </select>
                        </div>
                        <div>
                            <strong>Temps de préparation en minutes</strong>
                            <input type="number" bind:value={editedRecette.tempsPreparation} class="edit-input" />
                        </div>
                    </div>

                    <div class="ingredients">
                        <h2>Ingrédients</h2>
                        {#each editedRecette.ingredients as ingredient, i}
                            <div class="ingredient-row">
                                <input type="text" bind:value={ingredient.nom} class="edit-input" />
                                <button type="button" class="remove-ingredient-btn" on:click={() => removeIngredient(i)}>×</button>
                            </div>
                        {/each}
                        <button type="button" class="add-ingredient-btn" on:click={addIngredient}>
                            + Ajouter un ingrédient
                        </button>
                    </div>

                    <div class="instructions">
                        <h2>Instructions</h2>
                        <textarea bind:value={editedRecette.instructions} class="edit-input instructions" rows="10"
                        ></textarea>
                    </div>

                    <div class="edit-actions">
                        <button class="bouton-annuler" on:click={cancelEditing}>Annuler</button>
                        <button class="bouton-sauvegarder" on:click={saveChanges}>Sauvegarder</button>
                    </div>
                </div>
            {:else}
                <header class="recette-header">
                    <h1>{recette.nom}</h1>
                    <p class="description-courte">{recette.description}</p>
                </header>

                <div class="meta-info">
                    <p><strong>Catégorie:</strong> {recette.categorie}</p>
                    <p><strong>Origine:</strong> {recette.origine}</p>
                    <p><strong>Temps de préparation:</strong> {recette.tempsPreparation} minutes</p>
                </div>

                <div class="ingredients">
                    <h2>Ingrédients</h2>
                    <ul>
                        {#each recette.ingredients as ingredient}
                            <li>{ingredient.nom}</li>
                        {/each}
                    </ul>
                </div>

                <div class="instructions">
                    <h2>Instructions</h2>
                    <div class="etapes">
                        {#each recette.instructions.split('\n').filter(ligne => ligne.trim() !== '') as etape, index}
                            <div class="etape">
                                <span class="numero">Étape {index + 1}</span>
                                <p class="texte">{etape}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</main>
