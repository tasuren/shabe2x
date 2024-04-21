<script lang="ts">
	let className = "";
	export { className as class };
</script>

<article class="prose dark:prose-invert w-full {className}">
	<slot />
</article>
