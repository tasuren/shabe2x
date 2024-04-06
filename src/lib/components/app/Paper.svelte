<script lang="ts">
	import DOMPurify from "dompurify";

	let articleElement: HTMLElement;

	addEventListener("paste", function (e) {
		e.preventDefault();
		if (e.clipboardData) {
			articleElement.innerHTML = DOMPurify.sanitize(
				new DOMParser().parseFromString(e.clipboardData.getData("text/html"), "text/html").body
			);
		}
	});
</script>

<article
	class="prose dark:prose-invert px-10 py-5 w-"
	contenteditable="true"
	bind:this={articleElement}
>
	a
</article>
