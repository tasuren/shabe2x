export interface Utterance {
	text: string;
	voiceName: string;
	volume: number;
	rate: number;
}

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

	abstract play(abcUttr: Utterance): void;
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

	play(abcUttr: Utterance) {
		const uttr = new SpeechSynthesisUtterance(abcUttr.text);

		uttr.volume = abcUttr.volume * 0.01;
		uttr.rate = abcUttr.rate;
		if (abcUttr.voiceName) uttr.voice = this.voices[abcUttr.voiceName].body;
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
