import { voiceName, volume } from "$lib/state";
import { get } from "svelte/store";
import { text } from "./state";

export interface Voice<T> {
	name: string;
	language: string;
	body: T;
}

export abstract class Speaker<T> {
	declare isPlaying: boolean;
	declare voices: { [key: string]: Voice<T> };
	declare onVoiceUpdate: () => void;
	declare defaultVoiceName: string | null;

	constructor() {
		this.isPlaying = false;
	}

	abstract play(text: string): void;
	abstract stop(): void;
}

export class NativeSpeaker extends Speaker<SpeechSynthesisVoice> {
	constructor() {
		super();

		this.voices = {};

		const setupVoices = () => {
			const voices: { [key: string]: Voice<SpeechSynthesisVoice> } = {};
			let defaultVoiceName = "";
			let confirmDefault = false;

			for (const rawVoice of speechSynthesis.getVoices()) {
				if (!confirmDefault) {
					if (rawVoice.default) defaultVoiceName = rawVoice.name;
					if (rawVoice.name.includes("Samantha")) {
						// Samanthaの声が良い感じなので、それがあればそれを絶対デフォルトとする。
						defaultVoiceName = rawVoice.name;
						confirmDefault = true;
					}
				}

				voices[rawVoice.name] = { name: rawVoice.name, language: rawVoice.lang, body: rawVoice };
			}

			if (defaultVoiceName) {
				if (!get(voiceName)) voiceName.set(defaultVoiceName);
				this.defaultVoiceName = defaultVoiceName;
			}

			this.voices = voices;
		};

		speechSynthesis.onvoiceschanged = () => {
			setupVoices();
			this.onVoiceUpdate();
		};
		// 既にアプリを開いたことがあり`onvoicechanged`が実行されていた時、
		// 画面遷移でアプリを開いた場合は`onvoicechanged`が呼ばれることはない。
		// だからここで絶対に初期化させる。
		setupVoices();
	}

	play() {
		const uttr = new SpeechSynthesisUtterance(get(text));

		uttr.volume = get(volume) * 0.01;
		if (get(voiceName)) uttr.voice = this.voices[get(voiceName)].body;
		uttr.onend = () => (this.isPlaying = false);

		if (speechSynthesis.speaking) this.stop();
		speechSynthesis.speak(uttr);

		this.isPlaying = true;
	}

	stop() {
		speechSynthesis.cancel();
		this.isPlaying = false;
	}
}
