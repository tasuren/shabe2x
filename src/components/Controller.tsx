import { For, createSignal, onCleanup, onMount } from "solid-js";
import { usePaper, useTTS } from "./Context";

function VoiceSelect() {
	const tts = useTTS();

	const [voices, setVoices] = createSignal(tts.settings.getVoices());
	const [selected, setVoice] = createSignal<SpeechSynthesisVoice>();

	// 環境によっては遅延して使える声のVoiceが判明するため、
	// 判明した時に声一覧を更新する必要がある。
	// それを以下でやる。
	const updateVoices = () => {
		const voices = tts.settings.getVoices();
		setVoices(voices);

		if (voices) {
			// 声選択の選択の初期状態を更新する。
			const voice = tts.settings.getVoice();
			if (voice) setVoice(voice);
		}
	};

	onMount(() => {
		tts.settings.addEventListenerVoicesChanged(updateVoices);
	});

	onCleanup(() => {
		tts.settings.removeEventListenerVoicesChanged(updateVoices);
	});

	return (
		<>
			<label for="voice" class="align-middle">
				声：
			</label>
			<select
				name="voice"
				class="w-24 align-middle"
				value={selected()?.voiceURI || ""}
				onChange={(event) =>
					tts.settings.setVoiceByURI(event.target.value)
				}
			>
				<option value="">選択してください</option>

				<For each={voices()}>
					{(v) => (
						<option value={v.voiceURI}>
							{v.name} ({v.lang})
						</option>
					)}
				</For>
			</select>
		</>
	);
}

function VolumeInput() {
	const tts = useTTS();

	return (
		<>
			<label for="volume" class="align-middle">
				音量：
			</label>
			<input
				type="range"
				name="volume"
				min="0"
				max="100"
				value={tts.settings.getVolume()}
				onChange={(event) =>
					tts.settings.setVolume(Number.parseInt(event.target.value))
				}
				class="align-middle"
			/>
		</>
	);
}

function VoiceController() {
	const [paper, _] = usePaper();
	const tts = useTTS();

	return (
		<>
			<button
				type="button"
				onClick={() => tts.speech(paper().getHtmlAsText(), 1)}
			>
				ゆっくり再生
			</button>
			<button type="button">普通に再生</button>
			<button type="button">停止</button>
			<button type="button" onClick={() => paper().reset()}>
				消去
			</button>
		</>
	);
}

function Controller() {
	return (
		<div class="mb-4 flex justify-evenly flex-wrap">
			<div>
				<VoiceSelect />
			</div>

			<div>
				<VolumeInput />
			</div>

			<div class="space-x-2 pt-1 md:pt-0">
				<VoiceController />
			</div>
		</div>
	);
}

export default Controller;
