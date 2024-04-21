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
	declare defaultVoiceName: string | null;

	constructor() {
		this.isPlaying = false;
	}

	onVoiceUpdate() {}
	abstract setupVoices(): void;
	abstract play(abcUttr: Utterance): void;
	abstract stop(): void;
}

export class NativeSpeaker extends Speaker<SpeechSynthesisVoice> {
	constructor() {
		super();

		this.voices = {};

		speechSynthesis.onvoiceschanged = () => {
			this.setupVoices();
		};
	}

	setupVoices() {
		const voices: { [key: string]: Voice<SpeechSynthesisVoice> } = {};
		let defaultVoiceName = "";
		let confirmDefault = false;

		for (const rawVoice of speechSynthesis.getVoices()) {
			if (!confirmDefault) {
				if (rawVoice.default) defaultVoiceName = rawVoice.name;

				if (rawVoice.name.includes("アメリカ") && rawVoice.name.includes("英語")) {
					defaultVoiceName = rawVoice.name;
					confirmDefault = true;
				}
			}

			if (rawVoice.name.includes("Samantha")) {
				// AppleデバイスではSamanthaが一番聞きやすい。
				// だから、これがあれば問答無用で選択する。
				defaultVoiceName = rawVoice.name;
				confirmDefault = true;
			}

			voices[rawVoice.name] = { name: rawVoice.name, language: rawVoice.lang, body: rawVoice };
		}

		if (defaultVoiceName) {
			this.defaultVoiceName = defaultVoiceName;
		}

		this.voices = voices;
		this.onVoiceUpdate();
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
