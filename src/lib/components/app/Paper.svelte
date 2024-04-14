<script lang="ts">
	import DOMPurify from "dompurify";
	import { onMount } from "svelte";

	export let element: HTMLDivElement;
	let className: string = "";
	export { className as class };

	function cleanElement(element: Element): Element {
		element.removeAttribute("class");
		element.removeAttribute("style");
		element.removeAttribute("id");

		for (const child of element.children) {
			cleanElement(child);
		}

		return element;
	}

	onMount(() => {
		element.addEventListener("keydown", (e) => {
			if ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) {
				if (e.key == "z" && !element.innerHTML)
					// Ctrl-Zかつ中身が空なら、閉じたタブを開かないようにイベントを抑制。
					e.preventDefault();
			}
		});

		element.addEventListener("paste", (e) => {
			if (!e.clipboardData) return;

			e.preventDefault();

			const rawHtml = new DOMParser().parseFromString(
				e.clipboardData.getData("text/html"),
				"text/html"
			).body;
			cleanElement(rawHtml);

			const selection = getSelection();
			if (!selection) return;

			// ペーストと同じことをする。
			const html = DOMPurify.sanitize(rawHtml);
			if (document.execCommand) {
				document.execCommand("insertHTML", false, html);
			} else {
				// TODO: これではペースト後にundoができなくなる。それを修正したい。
				selection.getRangeAt(0).insertNode(new DOMParser().parseFromString(html, "text/html").body);
			}
		});
	});
</script>

<div
	class="
		// 見た目
		outline outline-1 bg-gray-light dark:bg-gray-dark
		// レイアウト
		h-full p-4 border
		{className}
	"
	contenteditable="true"
	bind:this={element}
></div>
