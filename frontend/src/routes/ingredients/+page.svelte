<script>
    import Card from '$lib/components/Card.svelte';
    import { onMount } from 'svelte';
    import { ingredients, loadIngredients } from '$lib/stores/ingredientStore';
    import '../../styles/IngredientsPage.scss';

    onMount(() => {
        loadIngredients(fetch);
    });
</script>

<div class="container">
    <div class="header">
        <h1>Liste des ingrédients</h1>
        <a href="/ingredients/add" class="add-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un ingrédient
        </a>
    </div>
    
    <div class="ingredients-grid">
        <div class="grid">
            {#each $ingredients as ingredient}
                <a href="/ingredients/{ingredient.id}" class="card-link">
                    <Card
                        nom={ingredient.nom}
                        image={`https://picsum.photos/300/200/?random=${ingredient.id}`}
                    />
                </a>
            {/each}
        </div>
    </div>
</div>

