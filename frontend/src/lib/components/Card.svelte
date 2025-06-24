<script lang="ts">
    export let nom = 'nom de la recette';
    export let description = 'Description par défaut';
    export let image = '';
    export let tempsPreparation = 'Temps de préparation inconnu';
    import { onMount } from 'svelte';
    import '../../styles/Card.scss';

    let imgElement: HTMLImageElement;
    let isVisible = false;
    let imageError = false;

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible = true;
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '50px',
            },
        );

        if (imgElement) {
            observer.observe(imgElement);
        }

        return () => observer.disconnect();
    });

    function handleImageError() {
        imageError = true;
    }
</script>

<div class="card">
    <div class="card__header">
        {#if image && !imageError}
            <img
                bind:this={imgElement}
                src={isVisible ? image : ''}
                alt={nom}
                loading="lazy"
                class="card__image"
                on:error={handleImageError}
            />
        {:else}
            <img 
                src="/default-recipe.jpg" 
                alt="Image par défaut" 
                loading="lazy"
                class="card__image"
            />
        {/if}
    </div>
    <div class="card__body">
        <h2>{nom}</h2>
        {#if description}
            <p>{description.length > 85 ? description.slice(0, 85) + '...' : description}</p>
        {/if}
        {#if tempsPreparation !== 'Temps de préparation inconnu'}
            <p class="temps">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon-clock"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                {tempsPreparation}
            </p>
        {/if}
    </div>
</div>
