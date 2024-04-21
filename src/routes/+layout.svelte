<script lang="ts">
	import { lazyThemeTransitionSetup } from "$lib";

	import "../app.css";
	import { onMount } from "svelte";
	import Nav from "$lib/components/Nav.svelte";

	lazyThemeTransitionSetup();

	onMount(() => {});
</script>

<div style:max-width="65ch" class="mx-auto">
	<Nav />

	<main class="pb-10">
		<slot />
	</main>
</div>
