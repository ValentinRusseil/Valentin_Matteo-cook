<script lang="ts">
    import NavBar from '$lib/components/Navbar.svelte';
    import '../styles/Layout.scss';
</script>

<NavBar />

<main>
    <slot />
</main>
