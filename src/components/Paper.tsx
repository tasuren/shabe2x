import DOMPurify from "dompurify";
import { tv } from "tailwind-variants";

import { cl } from "@/lib/ui";
import { onCleanup, onMount } from "solid-js";
import { usePaper } from "./Context";

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

function Paper() {
    const [paper, setPaper] = usePaper();

    onMount(() => {
        paper().mount();
    });

    onCleanup(() => {
        paper().cleanup();
    });

    return (
        <article
            class={cl(
                "p-2",
                "outline",
                "outline-1",
                "min-h-40",
                "my-2",
                "mx-3",
                "md:m-0",
                "md:w-full",
                "box-border",
            )}
            contenteditable={true}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            ref={setPaper}
        />
    );
}

export default Paper;
