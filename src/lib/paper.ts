/**
 * TTSで使えるように、HTMLのノードを文字列に変換する。
 */
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

/**
 * シャドーイング対象の文章を配置するHTMLを操作したりするためのクラス
 */
export class Paper {
    protected raw: HTMLElement;

    constructor(raw: HTMLElement) {
        this.raw = raw;
    }

    /**
     * Paperに書き込まれているHTMLを返します。
     */
    getHtml() {
        return this.raw.innerHTML;
    }

    /**
     * Paperに書き込まれている内容を文字列として返します。
     */
    getHtmlAsText() {
        return stringifyNode(this.raw);
    }

    /**
     * 文章をリセットします。
     */
    reset() {
        this.raw.innerHTML = "";
    }
}
