<script lang="ts">
	import { speaker, text } from "./state";

	export let hidden = true,
		x = 0,
		y = 0;
	export let element: HTMLDivElement | null = null;
	export let play: (node: Node) => void;

	function makeGoogleTranslateURL() {
		const params = new URLSearchParams({
			sl: "auto",
			tl: "ja",
			q: $text
		});
		return `https://translate.google.com/?${params.toString()}`;
	}

	let selectedContents: DocumentFragment | null = null;
	addEventListener("mouseup", (event) => {
		if (isMouseHover) return;

		const selection = getSelection();
		if (!selection) return;
		const range = selection.getRangeAt(0);

		if (!range.collapsed) {
			x = event.clientX + scrollX;
			y = event.clientY + scrollY + 10;
			hidden = false;
		}

		selectedContents = range.cloneContents();
	});

	let isMouseHover = false;
	addEventListener("mousedown", () => {
		if (!isMouseHover) hidden = true;
	});
</script>

{#key [x, y]}
	{#if !hidden}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div
			id="app-tooltip"
			class="
        // レイアウト
        absolute flex space-x-2 p-2
        // 見た目
        backdrop-blur-md rounded-md
      "
			style:left="{x}px"
			style:top="{y}px"
			on:mouseover={() => (isMouseHover = true)}
			on:mouseleave={() => (isMouseHover = false)}
			bind:this={element}
		>
			<button
				type="button"
				on:click={() => {
					if (selectedContents) play(selectedContents);
				}}>部分再生</button
			>
			<button type="button" on:click={$speaker.stop}>停止</button>
			<a href={makeGoogleTranslateURL()} target="_blank">Google 翻訳で開く</a>
		</div>
	{/if}
{/key}
