/**
 * 開発者の独断と偏見とてきとーで選んだ、聞こえやすい英語のVoiceのURIたち。
 */
const DEFAULT_ENGLISH_VOICE_URIS = [
    // macOSでのChromiumベースのブラウザ用
    "Samantha",
    // macOSでのSafari用
    "com.apple.voice.compact.en-US.Samantha",
    // WindowsでのChromiumベースのブラウザ用
    "Microsoft AvaMultilingual Online (Natural) - English (United States)",
];

/**
 * しゃべしゃべにふさわしいデフォルトのVoiceを探す。
 * `DEFAULT_ENGLISH_VOICE_URIS`のURIのVoiceが優先して選ばれる。
 */
function findProperlyEnglishVoice(
    voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
    const candidates = [];

    for (const voice of voices) {
        if (DEFAULT_ENGLISH_VOICE_URIS.includes(voice.voiceURI)) return voice;
        if (voice.lang === "en-US") candidates.push(voice);

        // AndroidのChromeでは`en-US`ではなく`en_US`表記となっているので、
        // それにも対応しておく。
        if (voice.lang === "en_US") candidates.push(voice);
    }

    if (candidates.length > 0) {
        return candidates[0];
    }

    return null;
}

/**
 * しゃべしゃべの設定
 */
class Settings {
    protected volume: number | null;
    protected voice: SpeechSynthesisVoice | null;

    constructor() {
        this.volume = null;
        this.voice = null;
    }

    setVolume(volume: number) {
        localStorage.setItem("volume", volume.toString());
        this.volume = volume;
    }

    getVolume(): number {
        if (!this.volume)
            this.volume = Number.parseInt(
                localStorage.getItem("volume") || "100",
            );

        return this.volume;
    }

    getVoiceByURI(uri: string): SpeechSynthesisVoice | null {
        for (const voice of this.getVoices()) {
            if (voice.voiceURI === uri) return voice;
        }

        return null;
    }

    setVoice(voice: SpeechSynthesisVoice) {
        localStorage.setItem("voice", voice.voiceURI);
        this.voice = voice;
    }

    setVoiceByURI(uri: string) {
        const voice = this.getVoiceByURI(uri);

        if (voice) {
            this.setVoice(voice);
        } else {
            throw new Error("そのURIでVoiceは見つかりませんでした。");
        }
    }

    getVoices(): SpeechSynthesisVoice[] {
        return speechSynthesis.getVoices();
    }

    addEventListenerVoicesChanged(handler: () => void) {
        speechSynthesis.addEventListener("voiceschanged", handler);
    }

    removeEventListenerVoicesChanged(handler: () => void) {
        speechSynthesis.removeEventListener("voiceschanged", handler);
    }

    getVoice(): SpeechSynthesisVoice | null {
        if (this.voice) return this.voice;

        // 前回使われていた音声設定を用意する。
        const voices = this.getVoices();
        const voiceURI = localStorage.getItem("voice");
        if (voiceURI) {
            for (const voice of voices) {
                if (voice.voiceURI === voiceURI) {
                    this.setVoice(voice);
                    return voice;
                }
            }
        }

        // 設定が見つからなければ、デフォルトを設定してそれを使う。
        const voice = findProperlyEnglishVoice(voices);
        if (voice) this.setVoice(voice);

        return voice;
    }
}

/**
 * しゃべしゃべのための、ウェブ音声 APIのspeechSynthesisのAPIラッパー
 */
export class TTS {
    settings: Settings;

    constructor() {
        this.settings = new Settings();
    }

    /**
     * 渡された文字列を読み上げます。
     * もしもVoiceが設定されていない場合、`Error`を送出します。
     */
    speech(text: string, rate: number) {
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = this.settings.getVoice();

        if (!voice) throw new Error("Voiceが設定されていません。");

        utterance.voice = voice;
        utterance.volume = this.settings.getVolume() * 0.01;
        utterance.lang = voice.lang;
        utterance.rate = rate;

        if (speechSynthesis.speaking) {
            this.cancel();
        }

        speechSynthesis.speak(utterance);
    }

    cancel() {
        speechSynthesis.cancel();
    }

    isPlaying() {
        return speechSynthesis.speaking;
    }
}
