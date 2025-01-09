import DOMPurify from "dompurify";

import { usePaper } from "./Context";
import { onCleanup, onMount } from "solid-js";

/**
 * 渡された要素のスタイルなどを無くす。
 */
function cleanElement(element: Element): Element {
    element.removeAttribute("class");
    element.removeAttribute("style");
    element.removeAttribute("id");

    for (let i = 0; i < element.children.length; i++) {
        cleanElement(element.children[i]);
    }

    return element;
}

function onKeyDown(event: KeyboardEvent) {
    // Ctrl-Z/Cmd-Zで閉じたタブを開かないようにする。
    // これをしなければ、Paper内でUNDOをした際に、閉じたタブが開いてしまう。

    if (
        (event.ctrlKey && !event.metaKey) ||
        (!event.ctrlKey && event.metaKey)
    ) {
        if (event.key === "z" && !(event.target as HTMLElement).innerHTML)
            // Ctrl-Zかつ中身が空なら、閉じたタブを開かないようにイベントを抑制。
            event.preventDefault();
    }
}

function paste(rawHtml: string | Node) {
    const html = DOMPurify.sanitize(rawHtml);

    // ここでexecCommandを直接呼ばないのは、deprecatedの警告が表示されてしまうから。
    // でもexecCommandを使わなければ普通の実装だとundoが使えず都合が悪いので、
    // execCommandが存在するならできればそれを使いたい。
    // もしexecCommandを使わないでうまくやる方法を知っている人がいたらPRオナシャス！
    const methodName: string = "execCommand";
    // @ts-ignore
    const execCommand = (...obj) => document[methodName](...obj);

    if (execCommand) {
        execCommand("insertHTML", false, html);
    } else {
        // deprecatedなexecCommandを使わない正攻法
        // でもこれだとundoが使えない。
        const selection = getSelection();
        if (!selection) return;

        selection
            .getRangeAt(0)
            .insertNode(
                new DOMParser().parseFromString(html, "text/html").body,
            );
    }
}

function onPaste(event: ClipboardEvent) {
    if (!event.clipboardData || !event.clipboardData.getData("text/html"))
        return;

    event.preventDefault();

    const rawHtml = new DOMParser().parseFromString(
        event.clipboardData.getData("text/html"),
        "text/html",
    ).body;
    cleanElement(rawHtml);

    // ペーストと同じことをする。
    paste(rawHtml);
}

function onMouseDown() {
    
}

function Paper() {
    const [_, setPaper] = usePaper();

    onMount(() => {
        addEventListener("mousedown", onMouseDown);
    });

    onCleanup(() => {
        removeEventListener("mousedown", onMouseDown);
    });

    return (
        <article
            class="mx-3 md:m-0 p-2 md:w-full outline outline-1 min-h-[80%]"
            contenteditable={true}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            ref={setPaper}
        />
    );
}

export default Paper;
