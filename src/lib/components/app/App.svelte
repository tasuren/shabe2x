<script lang="ts">
	import { onDestroy } from "svelte";
	import Paper from "./Paper.svelte";

	let paperElement: HTMLDivElement;

	function extractStringFromElement(node: Node): string {
		let text = "";

		for (let childNode of node.childNodes)
			if (childNode.nodeType == Node.TEXT_NODE) text += childNode.textContent;
			else text += extractStringFromElement(childNode);

		if (
			node.nodeType == Node.ELEMENT_NODE &&
			((node.nodeName.length == 2 && node.nodeName.startsWith("H")) || node.nodeName == "P")
		) {
			console.log(node.nodeName);
			text += "\n\n";
		}

		return text;
	}

	let voices: SpeechSynthesisVoice[],
		voice = 0;

	function setupVoice() {
		voices = speechSynthesis.getVoices();
		for (let i = 0; i < voices.length; i++) {
			if (voices[i].default) voice = i;
			if (voices[i].name.includes("Samantha")) {
				voice = i;
				break;
			}
		}
	}

	speechSynthesis.onvoiceschanged = (_) => setupVoice();
	// 既にアプリを開いたことがあり`onvoicechanged`が実行されていた時、
	// 画面遷移でアプリを開いた場合は`onvoicechanged`が呼ばれることはない。
	// だからここで絶対に初期化させる。
	setupVoice();

	// `isPlaying`ではなく`speechSynthesis.speaking`を使いたいが、それではHTMLに反映がされない。
	let volume = 100,
		isPlaying = false;
	function onPlay(_: MouseEvent) {
		// HTMLにある文字列を抽出する。
		const uttr = new SpeechSynthesisUtterance(extractStringFromElement(paperElement));

		uttr.voice = voices[voice];
		uttr.volume = volume * 0.01;
		uttr.onend = (_) => (isPlaying = false);

		if (speechSynthesis.speaking) speechSynthesis.cancel();

		speechSynthesis.speak(uttr);
		isPlaying = true;
	}

	function onStop(_: MouseEvent) {
		speechSynthesis.cancel();
		isPlaying = false;
	}

	onDestroy(() => {
		if (speechSynthesis.speaking) speechSynthesis.cancel();
	});
</script>

<div>
	<div class="sticky top-4">
		<div class="flex justify-center space-x-2">
			<button type="button" on:click={() => (paperElement.innerHTML = "")}>消去</button>
			<div>|</div>
			<label for="voice-select">声：</label>
			{#key voices}
				<select
					name="voice-select"
					value={voice}
					class="w-36"
					on:change={(e) => (voice = parseInt(e.currentTarget.value))}
				>
					{#each speechSynthesis.getVoices() as voice, i}
						<option value={i}>{voice.name} ({voice.lang})</option>
					{/each}
				</select>
			{/key}

			<label for="volume">音量：</label>
			<input type="range" name="volume" bind:value={volume} min="0" max="100" />
			<button type="button" on:click={onPlay}>再生</button>
			<button type="button" on:click={onStop} disabled={!isPlaying}>停止</button>
		</div>
	</div>

	<Paper bind:element={paperElement} class="my-4 prose dark:prose-invert overflow-y-auto" />
</div>
