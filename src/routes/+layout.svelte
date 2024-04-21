<script lang="ts">
	import { lazyThemeTransitionSetup } from "$lib";
	import ThemeButton from "$components/ThemeButton.svelte";

	import "../app.css";
	import { onMount } from "svelte";
	import Nav from "$lib/components/Nav.svelte";

	lazyThemeTransitionSetup();

	onMount(() => {});
</script>

<div>
	<div style:max-width="65ch" class="mx-2 my-2 md:m-auto">
		<Nav />

		<main>
			<slot />
		</main>
	</div>
</div>
