import MainController from "@/components/Controller/MainController";
import QuickController from "@/components/Controller/QuickController";
import Paper from "@/components/Paper";
import { type ParentProps, Show, createSignal } from "solid-js";
import { PaperProvider, TTSProvider } from "./Context";
import Footer from "./Footer";

/** 大きいモニターの場合しか表示しないコンポーネント */
function OnlyBigMonitor(props: ParentProps) {
    const mql = window.matchMedia("(min-width: 768px)");
    const [isBigMonitor, setIsBigMonitor] = createSignal(mql.matches);

    mql.onchange = (e) => {
        setIsBigMonitor(e.matches);
    };

    return <Show when={isBigMonitor()}>{props.children}</Show>;
}

function MainContent() {
    return (
        <PaperProvider>
            <TTSProvider>
                <main class="flex-1 flex flex-col justify-between">
                    <div class="space-y-4">
                        <MainController />
                        <Paper />
                    </div>

                    <Footer />
                </main>

                <OnlyBigMonitor>
                    <QuickController />
                </OnlyBigMonitor>
            </TTSProvider>
        </PaperProvider>
    );
}

export default MainContent;
