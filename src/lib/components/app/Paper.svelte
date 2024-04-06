<script lang="ts">
	import { onMount } from "svelte";
	import Quill from "quill";
	import DOMPurify from "dompurify";
	import { Delta } from "quill/core";
	import Button from "../interaction/Button.svelte";

	let readableElement: HTMLElement;

	function cleanElement(element: Element): Element {
		element.removeAttribute("class");
		element.removeAttribute("style");
		element.removeAttribute("id");

		for (const child of element.children) {
			cleanElement(child);
		}

		return element;
	}

	let quill: Quill;
	onMount(() => {
		quill = new Quill(readableElement);

		readableElement.addEventListener("paste", (e) => {
			if (!e.clipboardData) return;
			for (const child of readableElement.children) cleanElement(child);
		});

		readableElement.addEventListener("keydown", (e) => {
			if (e.key == "z") {
				e.preventDefault();
				quill.history.undo();
				return false;
			}
		});
	});
</script>

<div style:max-width="65ch" class="mx-auto mt-5">
	<div class="mb-1">
		<Button>再生</Button>
	</div>
	<article
		class="prose dark:prose-invert min-h-52 outline-none p-4 border-2 rounded-md m-auto"
		contenteditable="true"
		on:input={() => {
			for (const child of readableElement.children) cleanElement(child);
		}}
		bind:this={readableElement}
	></article>
</div>
