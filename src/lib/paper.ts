import { type Signal, createSignal } from "solid-js";

/** TTSで使えるように、HTMLのノードを文字列に変換する。 */
export function stringifyNode(node: Node): string {
    let text = null;

    // ノードが子供ノードを追わなくても良いようなノードだった場合を考慮する。
    if (node.nodeType === Node.ELEMENT_NODE) {
        // コードブロックなどは飛ばしたいため、ノードが`PRE`なら改行にする。
        if (node.nodeName === "PRE") text = "\n\n";
    }

    // 子供ノードを追わなくても良かった場合、既に`text`は埋まっている。
    // その場合はもうreturnする。
    if (text === null) text = "";
    else return text;

    // ノードにある子ノードにも`stringifyNode`を適用する。
    for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i];

        if (childNode.nodeType === Node.TEXT_NODE)
            text += childNode.textContent;
        else text += stringifyNode(childNode);
    }

    // その他、ノード毎に必要な後処理を適宜行う。
    if (node.nodeType === Node.ELEMENT_NODE) {
        // ノードのHTMLタグがH1やPだった場合は見出しや段落なので、
        // その箇所では読み上げに句読点のような少しの沈黙をとってほしい。
        // そのため改行を付けておく。
        if (
            (node.nodeName.length === 2 && node.nodeName.startsWith("H")) ||
            node.nodeName === "P"
        ) {
            text += "\n\n";
        }
    }

    return text;
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

/** シャドーイング対象の文章を配置するHTMLを操作したりするためのクラス */
export class Paper {
    protected raw: HTMLElement;
    protected onRawSelectionChange: () => void;
    rangeState: Signal<Range | undefined>;
    selectedContentsState: Signal<string | undefined>;

    constructor(raw: HTMLElement) {
        this.raw = raw;
        this.rangeState = createSignal();
        this.selectedContentsState = createSignal();

        this.onRawSelectionChange = () => this.onSelectionChange();
    }

    protected onSelectionChange() {
        const range = this.getSelectionRange();

        console.log(1);
        if (range) {
            const setRange = this.rangeState[1];
            setRange(range);

            const setSelectedContents = this.selectedContentsState[1];
            setSelectedContents(stringifyNode(range.cloneContents()));
        }
    }

    mount() {
        document.addEventListener("selectionchange", this.onRawSelectionChange);
    }

    cleanup() {
        document.removeEventListener(
            "selectionchange",
            this.onRawSelectionChange,
        );
    }

    /** Paperの中で選択されている部分を取得します。 */
    getSelectionRange(): Range | null {
        return getSelectionRange();
    }

    /** Paperに書き込まれているHTMLを返します。 */
    getHtml() {
        return this.raw.innerHTML;
    }

    /** Paperに書き込まれている内容を文字列として返します。 */
    getHtmlAsText() {
        return stringifyNode(this.raw);
    }

    /** 読み上げる対象の文字列を取得します。 */
    getText() {
        const contents = this.selectedContentsState[0]();
        return contents || this.getHtmlAsText();
    }

    /** 文章をリセットします。 */
    reset() {
        this.raw.innerHTML = "";
    }
}
