<script lang="ts">
	import { onMount } from "svelte";
	import Quill from "quill";

	let element: HTMLTextAreaElement;
	let quill: Quill;

	onMount(() => {
		quill = new Quill(element);

		element.addEventListener("keydown", (e) => {
			if (e.key == "z") {
				console.log(1);
				e.preventDefault();
				quill.history.undo();
				return false;
			}
		});
	});

	function cleanElement(element: Element): Element {
		element.removeAttribute("class");
		element.removeAttribute("style");
		element.removeAttribute("id");

		for (const child of element.children) {
			cleanElement(child);
		}

		return element;
	}
</script>

<textarea
	class="
    // Typographyのスタイル
    prose dark:prose-invert
    // 見た目
    outline-none bg-gray-light dark:bg-gray-dark
    // レイアウト
    w-full min-h-52 p-4 border m-auto
  "
	on:input={() => {
		for (const child of element.children) cleanElement(child);
	}}
	bind:this={element}
></textarea>
