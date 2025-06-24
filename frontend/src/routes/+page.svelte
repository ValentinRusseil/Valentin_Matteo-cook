<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import { filteredRecettes } from '$lib/stores/recetteStore';
    import { convertTimeToString } from '$lib/utils/timeConverter';
    import '../styles/Page.scss';
</script>

<h1>Nos Recettes</h1>

<div class="grid">
    {#each $filteredRecettes as recette}
        <a href={`/recettes/${recette.id}`}>
            <Card
                nom={recette.nom}
                description={recette.description}
                image={`https://picsum.photos/300/200/?random=${recette.id}`}
                tempsPreparation={convertTimeToString(recette.tempsPreparation)}
            />
        </a>
    {/each}
</div>
