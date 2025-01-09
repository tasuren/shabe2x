import { Mouse, type PagePosition } from "@/lib/mouse-collector";
import { stringifyNode } from "@/lib/paper";
import { Show, createSignal, onCleanup, onMount } from "solid-js";
import VoiceController from "./VoiceController";

function makeGoogleTranslateURL(document: DocumentFragment): string {
    const params = new URLSearchParams({
        sl: "auto",
        tl: "ja",
        q: stringifyNode(document),
    });

    return `https://translate.google.com/?${params.toString()}`;
}

/** QuickControllerを表示すべき場所を、選択箇所とマウスカーソルの場所を元に算出する。 */
async function calculatePosition(
    mouse: Mouse,
    range: Range,
    elementWidth: number,
): Promise<PagePosition | null> {
    let [x, y] = [0, 0];
    const mousePosition = await mouse.getMousePosition();

    // 選択箇所のすぐそこにツールチップを移動させる。
    x = mousePosition.x + scrollX;

    // ツールチップが右端に突き刺さらないように考慮する。
    if (x + elementWidth > innerWidth) x = innerWidth - elementWidth;

    // Y座標はマウスカーソルの位置に近い方の選択箇所の向こう側とする。
    const rect = range.getBoundingClientRect();
    if (mousePosition.y < rect.y + rect.height / 2)
        // もしも選択箇所の半分より上にマウスカーソルがあるなら、
        // 選択箇所の上側の向こう側をY座標とする。
        y = rect.top + scrollY - 50;
    // 選択箇所の下側のY座標。
    else y = mousePosition.y + scrollY + 15;

    return { x, y };
}

function QuickController() {
    const [hidden, setHidden] = createSignal(false);
    const [position, setPosition] = createSignal({ x: 0, y: 0 });
    const [selectedContents, setSelectedContents] =
        createSignal<DocumentFragment>();

    let elementWidth = 0;
    const mouse = new Mouse();

    // 文章を選択した際にクイックコントローラーを表示して動かす。
    // また、選択している文字列を読み上げに使えるように保存する。
    const onSelectionChange = async () => {
        // 選択箇所を取得する。
        const selection = getSelection();
        if (!selection || selection.rangeCount === 0) return null;
        const range = selection.getRangeAt(0);

        // 選択箇所が幅０の場合、何も選択していないとみなす。
        if (range.collapsed) return null;

        // QuickControllerを配置すべき場所を算出する。
        const position = await calculatePosition(mouse, range, elementWidth);

        if (position) {
            setPosition(position);
            setHidden(false);
            setSelectedContents(range.cloneContents());
        }
    };

    const [isUsing, setUsing] = createSignal(false);

    const onMouseDown = () => {
        if (!isUsing()) setHidden(true);
    };

    onMount(() => {
        document.addEventListener("selectionchange", onSelectionChange);
        addEventListener("mousedown", onMouseDown);
    });

    onCleanup(() => {
        document.removeEventListener("selectionchange", onSelectionChange);
        removeEventListener("mousedown", onMouseDown);
        mouse.close();
    });

    return (
        <div
            class="absolute space-x-2 p-2 z-50 rounded-md backdrop-blur"
            classList={{ hidden: hidden() }}
            style={{ left: `${position().x}px`, top: `${position().y}px` }}
            // biome-ignore lint: マウスを使う前提のボタン群なので、onFocusは↓とセットで使わない。
            onMouseOver={() => setUsing(true)}
            onMouseLeave={() => setUsing(false)}
            ref={(element) => {
                elementWidth = element.getBoundingClientRect().width;
                setHidden(true);
            }}
        >
            <VoiceController
                getText={() => {
                    const contents = selectedContents();
                    return contents ? stringifyNode(contents) : "";
                }}
            />

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
        </div>
    );
}

export default QuickController;
