import { stringifyNode } from "@/lib/paper";
import { Show, createSignal, onCleanup, onMount } from "solid-js";
import VoiceController from "../VoiceController";
import PopUp from "./PopUp";

function makeGoogleTranslateURL(document: DocumentFragment): string {
    const params = new URLSearchParams({
        sl: "auto",
        tl: "ja",
        q: stringifyNode(document),
    });

    return `https://translate.google.com/?${params.toString()}`;
}

function getSelectionRange(): Range | null {
    // 選択箇所を取得する。
    const selection = getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);

    // 選択箇所が幅０の場合、何も選択していないとみなす。
    if (range.collapsed) return null;

    return range;
}

function QuickController() {
    const [contents, setContents] = createSignal<DocumentFragment>();
    const [range, setRange] = createSignal<Range>();

    const onSelectionChange = () => {
        const range = getSelectionRange();

        if (range) {
            setRange(range);
            setContents(range.cloneContents());
        }
    };

    onMount(() => {
        document.addEventListener("selectionchange", onSelectionChange);
    });

    onCleanup(() => {
        document.removeEventListener("selectionchange", onSelectionChange);
    });

    return (
        <PopUp
            class="space-x-2 p-2 z-50 rounded-md backdrop-blur"
            id="quick-controller"
            selectedRange={range}
        >
            <VoiceController
                getText={() => {
                    const currentContents = contents();
                    return currentContents
                        ? stringifyNode(currentContents)
                        : "";
                }}
            />

            <Show
                when={contents()}
                fallback={<span>Google 翻訳で開く</span>}
                keyed
            >
                {(contents) => (
                    <a
                        href={makeGoogleTranslateURL(contents)}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Google 翻訳で開く
                    </a>
                )}
            </Show>
        </PopUp>
    );
}

export default QuickController;
