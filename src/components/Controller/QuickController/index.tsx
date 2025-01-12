import { usePaper } from "@/components/Context";
import { Show } from "solid-js";
import VoiceController from "../VoiceController";
import PopUp from "./PopUp";

function makeGoogleTranslateURL(query: string): string {
    const params = new URLSearchParams({
        sl: "auto",
        tl: "ja",
        q: query,
    });

    return `https://translate.google.com/?${params.toString()}`;
}

function QuickController() {
    const [paper, _] = usePaper();
    const selectedContents = paper().selectedContentsState[0];

    return (
        <PopUp
            class="space-x-2 p-2 z-50 rounded-md backdrop-blur"
            id="quick-controller"
        >
            <VoiceController getText={() => selectedContents() || ""} />

            <Show
                when={selectedContents()}
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
