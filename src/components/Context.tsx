import { Paper } from "@/lib/paper";
import {
    type Theme,
    applyThemeToDOM,
    readTheme,
    writeTheme,
} from "@/lib/theme";
import { TTS } from "@/lib/voice";
import {
    type ParentProps,
    createContext,
    createEffect,
    createSignal,
    useContext,
} from "solid-js";

// テーマのコンテクスト
const ThemeContext = createContext<[() => Theme, (theme: Theme) => void]>();

function ThemeProvider(props: ParentProps) {
    const [theme, setTheme] = createSignal<Theme>(readTheme());

    createEffect(() => {
        const current = theme();
        writeTheme(current);
        applyThemeToDOM(current);
    });

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const value = useContext(ThemeContext);
    if (!value)
        throw new Error(
            "テーマのコンテキストプロバイダーが使われていないようです。",
        );
    return value;
};

// VoiceControllerのコンテクスト
const tts = new TTS();
const TTSContext = createContext(tts);

function VoiceProvider(props: ParentProps) {
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

function PaperProvider(props: ParentProps) {
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

// 全てのコンテクストプロバイダーを適用するコンポーネント
export function LibraryProvider(props: ParentProps) {
    return (
        <PaperProvider>
            <ThemeProvider>
                <VoiceProvider>{props.children}</VoiceProvider>
            </ThemeProvider>
        </PaperProvider>
    );
}
