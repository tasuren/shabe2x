<script lang="ts">
	import "../app.css";

	import Header from "$lib/components/Header.svelte";

	// 最初は一瞬でテーマが反映させるようにする。
	let lazyTransition = false;
	setTimeout(() => {
		lazyTransition = true;
		document.documentElement.style.transition = "background-color 0.2s linear";
	}, 100);
</script>

<div>
	<Header />

	<main>
		<slot />
	</main>
</div>
