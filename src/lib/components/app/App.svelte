<script lang="ts">
	import { onDestroy } from "svelte";

	import Paper from "./Paper.svelte";
	import { stringifyNode } from "./stringify";
	import type { Speaker } from "./speaker";
	import Tooltip from "./Tooltip.svelte";

	export let speaker: Speaker<any>;
	export let voiceName: string;
	export let text: string;
	export let volume: number = 100;

	let paperElement: HTMLDivElement;

	// スピーカーの準備
	speaker.onVoiceUpdate = () => {
		// これをしないとリアクティブにならない。
		// TODO: 5.0で対応されるっぽいので、対応したらこれを削除。
		speaker.voices = speaker.voices;
		if (!voiceName && speaker.defaultVoiceName) voiceName = speaker.defaultVoiceName;
	};
	speaker.setupVoices();

	function play(rate: number, node: Node) {
		text = stringifyNode(node);
		speaker.play({ text, voiceName, volume, rate });
	}

	function onPlay(rate: number) {
		let node: Node = paperElement;
		const selection = getSelection();

		if (selection) {
			const range = selection.getRangeAt(0);
			let selectedContents = range.cloneContents();
			if (selectedContents.textContent) node = selectedContents;
		}

		play(rate, node);
	}

	function onStop() {
		speaker.stop();
	}

	function onReset() {
		if (confirm("内容をリセットしますか？")) paperElement.innerHTML = "";
	}

	addEventListener("keydown", (e) => {
		if (!e.metaKey && !e.ctrlKey) return;

		let rate: number | null = null;

		if (e.key == "1") {
			rate = 0.5;
		} else if (e.key == "2") rate = 1;

		if (rate) onPlay(rate);
		else if (e.key == "3") onStop();
		else return;

		e.stopPropagation();
		e.preventDefault();
	});

	onDestroy(() => {
		if (speaker.isPlaying) speaker.stop();
	});
</script>

<Tooltip bind:speaker {play} />

<div id="app" style:max-width="65ch" class="mx-auto">
	<div class="flex justify-center">
		<div
			id=""
			class="
				sticky top-4
				// 配置
				w-fit mx-2

				// 中身の配置
				flex justify-center items-center
				md:space-x-2

					// スマホの場合、きつきつにならないようにする。
					my-3 md:my-0
					// 改行するようにする。
					flex-wrap

				// 見た目
				p-1 md:px-3 md:py-2
				bg-gray-light md:bg-opacity-0 bg-opacity-5 backdrop-blur-md
				rounded-md
			"
		>
			<div class="controls">
				<label for="voice-select">声：</label>
				<select name="voice-select" bind:value={voiceName} class="w-24">
					<option value="" disabled>選択してください</option>
					{#each Object.values(speaker.voices) as voice}
						<option value={voice.name}>{voice.name}</option>
					{/each}
				</select>
			</div>
			<wbr />

			<div class="controls">
				<label for="volume">音量：</label>
				<input
					type="range"
					name="volume"
					bind:value={volume}
					min="0"
					max="100"
					class="align-middle w-24"
				/>
			</div>
			<wbr />

			<div class="w-fit md:space-y-0 controls">
				<button type="button" on:click={() => onPlay(0.5)}>ゆっくり再生</button>
				<button type="button" on:click={() => onPlay(1)}>普通に再生</button>
				<wbr />
				<button type="button" on:click={onStop}>停止</button>
				<button type="button" on:click={onReset}>消去</button>
			</div>
			<wbr />
		</div>
	</div>

	<Paper
		class="
		// Typography
		prose dark:prose-invert
		// 配置
		my-1 min-h-52"
		bind:element={paperElement}
	/>
</div>

<style lang="postcss">
	.controls {
		@apply p-1 md:p-0 my-auto;
		& * {
			@apply align-middle leading-normal;
		}
		& button {
			@apply md:my-0 my-1;
		}
	}
</style>
