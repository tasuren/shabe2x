<script lang="ts">
	import { onDestroy } from "svelte";

	import { volume, voiceName } from "$lib/state";

	import Paper from "./Paper.svelte";
	import Tooltip from "./Tooltip.svelte";
	import { stringifyNode } from "./stringify";
	import { speaker, text } from "./state";

	let paperElement: HTMLDivElement;

	// スピーカーの準備
	$speaker.onVoiceUpdate = () => {
		// これをしないとリアクティブにならない。
		// TODO: 5.0で対応されるっぽいので、対応したらこれを削除。
		$speaker.voices = $speaker.voices;
	};

	function play(node: Node) {
		$text = stringifyNode(node);
		$speaker.play();
	}

	function onPlay() {
		// 状態をセーブする。
		play(paperElement);
	}

	function onStop() {
		$speaker.stop();
	}

	onDestroy(() => {
		if ($speaker.isPlaying) $speaker.stop();
	});
</script>

<Tooltip {play}></Tooltip>

<div id="app" class="mb-10">
	<div class="sticky top-4">
		<div
			class="
				// レイアウト
				flex justify-center items-center space-x-2 mx-auto
				// 見た目
				w-fit p-4 backdrop-blur-md rounded-md
			"
		>
			<button type="button" on:click={() => (paperElement.innerHTML = "")}>消去</button>
			<div>|</div>

			<label for="voice-select">声：</label>
			{#key $speaker.voices}
				<select name="voice-select" bind:value={$voiceName} class="w-36">
					<option value="" disabled>選択してください</option>
					{#each Object.values($speaker.voices) as voice}
						<option value={voice.name}>{voice.name}</option>
					{/each}
				</select>
			{/key}

			<label for="volume">音量：</label>
			<input type="range" name="volume" bind:value={$volume} min="0" max="100" />
			<button type="button" on:click={onPlay}>再生</button>
			<button type="button" on:click={onStop}>停止</button>
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
