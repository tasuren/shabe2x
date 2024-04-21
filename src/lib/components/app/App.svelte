<script lang="ts">
	import { onDestroy } from "svelte";

	import Paper from "./Paper.svelte";
	import Tooltip from "./Tooltip.svelte";
	import { stringifyNode } from "./stringify";
	import type { Speaker } from "./speaker";

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

	function play(rate: number, node: Node) {
		text = stringifyNode(node);
		speaker.play({ text, voiceName, volume, rate });
	}

	function onPlay(rateToUse: number) {
		// 状態をセーブする。
		play(rateToUse, paperElement);
	}

	function onStop() {
		speaker.stop();
	}

	function onReset() {
		if (confirm("内容をリセットしますか？")) paperElement.innerHTML = "";
	}

	onDestroy(() => {
		if (speaker.isPlaying) speaker.stop();
	});
</script>

<Tooltip bind:speaker {play}></Tooltip>

<div id="app" style:max-width="65ch" class="mx-auto mb-10">
	<div class="sticky top-4">
		<div
			class="
				// 配置
				sm:w-fit sm:mx-auto mx-2

				// 中身の配置
				flex justify-center items-center
				space-x-2 space-y-2 sm:space-y-0

					// スマホの場合、きつきつにならないようにする。
					my-3 sm:my-0
					// スマホの時、改行するようにする。
					flex-wrap

				// 見た目
				p-2 sm:p-4
				bg-gray-light sm:bg-opacity-0 bg-opacity-5 backdrop-blur-md
				rounded-md
			"
		>
			<div>
				<label for="voice-select">声：</label>
				<select name="voice-select" bind:value={voiceName} class="w-28">
					<option value="" disabled>選択してください</option>
					{#each Object.values(speaker.voices) as voice}
						<option value={voice.name}>{voice.name}</option>
					{/each}
				</select>
			</div>
			<wbr />

			<div>
				<label for="volume">音量：</label>
				<input
					type="range"
					name="volume"
					bind:value={volume}
					min="0"
					max="100"
					class="align-middle"
				/>
			</div>
			<wbr />

			<div class="w-fit">
				<button type="button" on:click={() => onPlay(0.5)}>ゆっくり再生</button>
				<button type="button" on:click={() => onPlay(1)}>普通に再生</button>
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
