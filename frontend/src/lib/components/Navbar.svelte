<script lang="ts">
    import { page } from '$app/stores';
    import SearchBar from './SearchBar.svelte';
    import '../../styles/Navbar.scss';
</script>

<nav class="navbar">
    <div class="nav-left">
        <a href="/" class="logo">CookCookCook</a>
    </div>

    <div class="nav-center">
        <SearchBar defaultSearchType="recettes" />
    </div>

    <div class="nav-right">
        <ul>
            <li class:active={$page.url.pathname === '/ingredients'}>
                <a href="/ingredients">Ingrédients</a>
            </li>
            <li class:active={$page.url.pathname === '/recettes/add'}>
                <a href="/recettes/add">Ajouter une recette</a>
            </li>
        </ul>
    </div>
</nav>
