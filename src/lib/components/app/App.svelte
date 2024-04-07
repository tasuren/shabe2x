<script lang="ts">
	import Button from "../Button.svelte";
	import Paper from "./Paper.svelte";

	let paperElement: HTMLDivElement;
</script>

<div style:max-width="65ch" class="mx-auto mt-5">
	<div class="mb-1">
		<Button onClick={() => (paperElement.innerHTML = "")}>消去</Button>
		<Button>再生</Button>
	</div>
	<Paper bind:element={paperElement} />
</div>
