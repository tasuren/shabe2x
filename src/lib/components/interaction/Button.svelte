<script lang="ts">
	export let onClick: (event: MouseEvent) => void = () => {};
</script>

<button
	type="button"
	class="border p-1 rounded-lg hover:bg-gray-dark/15 dark:hover:bg-gray-light/15"
	on:click={onClick}
>
	<slot />
</button>
