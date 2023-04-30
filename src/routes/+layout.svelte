<script>
	import Header from '$lib/components/Header.svelte';
	import '$lib/styles/app.css';
	import { page } from "$app/stores"
</script>

<Header />

<slot />