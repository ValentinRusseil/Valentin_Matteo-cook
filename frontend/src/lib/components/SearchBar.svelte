<script lang="ts">
    import { searchQuery } from '$lib/stores/recetteStore';
    import { ingredientSearchQuery } from '$lib/stores/ingredientStore';
    import { writable } from 'svelte/store';
    import debounce from 'lodash/debounce';
    import '../../styles/SearchBar.scss';

    export let defaultSearchType: 'recettes' | 'ingredients' = 'recettes';
    const searchType = writable(defaultSearchType);

    const handleSearch = debounce(() => {
        // La recherche est automatiquement gérée par le store
    }, 300);
</script>

<div class="search-bar">
    {#if $searchType === 'recettes'}
        <input
            type="text"
            bind:value={$searchQuery}
            on:input={handleSearch}
            placeholder="Rechercher une recette..."
            class="search-bar__input"
        />
    {:else}
        <input
            type="text"
            bind:value={$ingredientSearchQuery}
            on:input={handleSearch}
            placeholder="Rechercher un ingrédient..."
            class="search-bar__input"
        />
    {/if}

    <svg
        class="search-bar__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
</div>
