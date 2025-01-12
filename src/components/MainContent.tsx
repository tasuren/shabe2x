import Controller from "@/components/Controller/Controller";
import QuickController from "@/components/Controller/QuickController";
import Paper from "@/components/Paper";
import { type ParentProps, Show, createSignal } from "solid-js";
import Footer from "./Footer";

/** 大きいモニターの場合しか表示しないコンポーネント */
function OnlyBigMonitor(props: ParentProps) {
    const mql = window.matchMedia("(min-width: 768px)");
    const [isBigMonitor, setIsBigMonitor] = createSignal(mql.matches);

    mql.onchange = (e) => {
        console.log(e.matches);
        setIsBigMonitor(e.matches);
    };

    return <Show when={isBigMonitor()}>{props.children}</Show>;
}

function MainContent() {
    return (
        <>
            <main class="flex-grow relative">
                <div class="absolute w-full h-full flex flex-col justify-between">
                    <div class="space-y-4">
                        <Controller />
                        <Paper />
                    </div>

                    <Footer />
                </div>
            </main>

            <OnlyBigMonitor>
                <QuickController />
            </OnlyBigMonitor>
        </>
    );
}

export default MainContent;
