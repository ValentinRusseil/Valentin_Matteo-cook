<script lang="ts">
    export let recette;
    export let ingredients: string = '';
    import '../../styles/Form.scss';
    if (!recette.tempsPreparation) {
        recette.tempsPreparation = 1;
    }
    let categories = [
    'Entrée',
    'Plat',
    'Dessert',
    'Autre'
  ]
  let Origine = [
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
</script>

<div class="form-row">
    <div class="form-group">
        <input type="text" id="nom" bind:value={recette.nom} minlength="3" maxlength="100" placeholder="Entrez le titre" required />
        <label for="nom">Titre de la recette</label>
    </div>

    <div class="form-group">
        <select id="categorie" bind:value={recette.categorie} required>
            <option value="" disabled selected hidden>Sélectionnez une catégorie</option>
            {#each categories as categorie}
                <option value={categorie}>{categorie}</option>
            {/each}
        </select>
        <label for="categorie">Catégorie</label>
    </div>
</div>

<div class="form-group">
    <textarea id="description" bind:value={recette.description} minlength="1" maxlength="500" placeholder="Entrez une description" required></textarea>
    <label for="description">Description</label>
</div>

<p>Décrivez les étapes(une étape = UNE ligne)</p>
<div class="form-group">
    <textarea id="instructions" bind:value={recette.instructions} maxlength="1000" placeholder="exemple: 
    Coupez les pommes de terres.
    Assaisonner le tout." required></textarea>
    <label for="instructions">Instructions</label>
</div>

<div class="form-row">
    <div class="form-group">
        <input type="number"
            id="tempsPreparation"
            bind:value={recette.tempsPreparation}
            placeholder="Temps de préparation en minutes"
            min="1"
            required
        />
        <label for="tempsPreparation">Temps de préparation (minutes)</label>
    </div>

    <div class="form-group">
        <select id="origine" bind:value={recette.origine} required>
            <option value="" disabled selected hidden>Sélectionnez une origine</option>
            {#each Origine as origine}
                <option value={origine}>{origine}</option>
            {/each}
        </select>
        <label for="origine">Origine</label>
    </div>
</div>

<div class="form-group">
    <textarea 
        id="ingredients" 
        bind:value={ingredients} 
        minlength="2" 
        placeholder="Entrez un ingrédient" 
        required
    ></textarea>
    <label for="ingredients">Ingrédients</label>
</div>

<div class="actions">
    <slot name="actions">
        <button type="submit">Valider</button>
        <button type="button" on:click={() => {
            window.location.href = '/';
        }}>Annuler</button>
    </slot>
</div>
