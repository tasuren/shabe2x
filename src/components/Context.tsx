import { Paper } from "@/lib/paper";
import { TTS } from "@/lib/voice";
import {
    type ParentProps,
    createContext,
    createSignal,
    useContext,
} from "solid-js";

// VoiceControllerのコンテクスト
const tts = new TTS();
const TTSContext = createContext(tts);

export function TTSProvider(props: ParentProps) {
    return (
        <TTSContext.Provider value={tts}>{props.children}</TTSContext.Provider>
    );
}

export function useTTS(): TTS {
    return useContext(TTSContext);
}

// Paperのコンテクスト
const PaperContext =
    createContext<[() => Paper | undefined, (paper: Paper) => void]>();

export function PaperProvider(props: ParentProps) {
    const [paper, setPaper] = createSignal<Paper>();

    return (
        <PaperContext.Provider value={[paper, setPaper]}>
            {props.children}
        </PaperContext.Provider>
    );
}

export function usePaper(): [() => Paper, (raw: HTMLElement) => void] {
    const value = useContext(PaperContext);
    if (!value) throw new Error("Paperのプロバイダーが設定されていません。");

    const [paper, setPaper] = value;
    return [
        () => {
            const p = paper();
            if (!p) throw new Error("Paperが設定されていません。");
            return p;
        },
        (raw) => setPaper(new Paper(raw)),
    ];
}
