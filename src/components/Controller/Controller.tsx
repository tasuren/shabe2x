import { cl } from "@/lib/ui";
import { For, createSignal, onCleanup, onMount } from "solid-js";
import { usePaper, useTTS } from "../Context";
import VoiceController from "./VoiceController";

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
        tts.settings.mount(updateVoices);
    });

    onCleanup(() => {
        tts.settings.cleanup(updateVoices);
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

function MainController() {
    const [paper, _] = usePaper();

    return (
        <div
            class={cl(
                // 配置と位置
                "flex justify-evenly",
                "flex-wrap",
                "sticky top-4",
                // 見た目
                "p-2 md:py-2 md:px-4",
                "w-fit space-x-2 mx-auto",
                "backdrop-blur",
            )}
        >
            <div>
                <VoiceSelect />
            </div>

            <div>
                <VolumeInput />
            </div>

            <div class="space-x-2 pt-1 md:pt-0">
                <VoiceController />

                <button type="button" onClick={() => paper().reset()}>
                    消去
                </button>
            </div>
        </div>
    );
}

export default MainController;
