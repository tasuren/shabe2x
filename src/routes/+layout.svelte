<script lang="ts">
	import { lazyThemeTransitionSetup } from "$lib";

	import "../app.css";
	import { onMount } from "svelte";
	import Nav from "$lib/components/Nav.svelte";

	lazyThemeTransitionSetup();

	onMount(() => {});
</script>

<div style:max-width="65ch" class="mx-2 pb-2 md:m-auto">
	<Nav />

	<main>
		<slot />
	</main>
</div>
