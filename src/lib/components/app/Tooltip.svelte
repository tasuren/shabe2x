<script lang="ts">
	import { onMount } from "svelte";
	import type { Speaker } from "./speaker";
	import { stringifyNode } from "./stringify";

	export let speaker: Speaker<any>;
	export let hidden = false,
		x = 0,
		y = 0;
	let outerPlay: (rate: number, node: Node) => void;
	export { outerPlay as play };

	let element: HTMLDivElement;
	let selectedContents: DocumentFragment | null = null;
	let play = (rate: number) => {
		if (selectedContents) outerPlay(rate, selectedContents);
	};

	function makeGoogleTranslateURL() {
		if (!selectedContents) return;

		const params = new URLSearchParams({
			sl: "auto",
			tl: "ja",
			q: stringifyNode(selectedContents)
		});

		return `https://translate.google.com/?${params.toString()}`;
	}

	// ツールチップの横幅を得る。
	let tooltipWidth: number = 0;
	onMount(() => {
		tooltipWidth = element.getBoundingClientRect().width;
		hidden = true;
	});

	addEventListener("mouseup", (event) => {
		// 選択した際にツールチップを表示して動かしたりする。
		if (isMouseHover) return;

		const selection = getSelection();
		if (!selection) return;
		const range = selection.getRangeAt(0);

		if (!range.collapsed) {
			// 選択箇所のすぐそこにツールチップを移動させる。
			x = event.clientX + scrollX;
			if (x + tooltipWidth > innerWidth)
				// ツールチップが右端に突き刺さらないように考慮する。
				x = innerWidth - tooltipWidth;

			// Y座標はマウスカーソルの位置に近い方の選択箇所の向こう側とする。
			const rect = range.getBoundingClientRect();
			if (event.clientY < rect.y + rect.height / 2)
				// もしも選択箇所の半分より上にマウスカーソルがあるなら、
				// 選択箇所の上側の向こう側をY座標とする。
				y = rect.top + scrollY - 50;
			// 選択箇所の下側のY座標。
			else y = event.clientY + scrollY + 15;

			hidden = false;
			selectedContents = range.cloneContents();
		}
	});

	let isMouseHover = false;
	addEventListener("mousedown", () => {
		if (!isMouseHover) hidden = true;
	});
</script>

{#key [x, y]}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div
		id="app-tooltip"
		class="
			// レイアウト
			absolute space-x-2 p-2 z-50
			// 見た目
			backdrop-blur-md rounded-md
		"
		class:hidden
		class:flex={!hidden}
		style:left="{x}px"
		style:top="{y}px"
		on:mouseover={() => (isMouseHover = true)}
		on:mouseleave={() => (isMouseHover = false)}
		bind:this={element}
	>
		<button
			type="button"
			on:click={() => {
				play(0.5);
			}}>部分ゆっくり再生</button
		>
		<button
			type="button"
			on:click={() => {
				play(1);
			}}>部分再生</button
		>
		<button type="button" on:click={speaker.stop}>停止</button>
		<a href={makeGoogleTranslateURL()} target="_blank">Google 翻訳で開く</a>
	</div>
{/key}
