export type PagePosition = { x: number; y: number };

/**
 * マウスの場所を取得するためのクラス
 *
 * マウスの場所を取得するには、マウスが動いた際のイベントから
 * マウスの場所を採取する必要がある。必要な時だけそのイベントを使うのが
 * このクラスの仕組み。
 */
export class Mouse {
    private resolve: ((position: PagePosition) => void) | null;
    private before: PagePosition;
    private eventListener: (event: MouseEvent) => void;

    constructor() {
        this.resolve = null;
        this.before = { x: 0, y: 0 };

        this.eventListener = (e) => this.onMouseMove(this, e);
    }

    private onMouseMove(mouse: Mouse, event: MouseEvent) {
        if (!mouse.resolve) return;

        mouse.resolve({ x: event.pageX, y: event.pageY });
    }

    async getMousePosition(): Promise<PagePosition> {
        const position = await new Promise<PagePosition>((resolve) => {
            this.resolve = resolve;

            setTimeout(() => resolve(this.before), 100);
        });

        this.resolve = null;
        this.before = position;

        return position;
    }

    mount() {
        addEventListener("mousemove", this.eventListener);
    }

    cleanup() {
        removeEventListener("mousemove", this.eventListener);
    }
}

/** QuickControllerを表示すべき場所を、選択箇所とマウスカーソルの場所を元に算出する。 */
export async function calculateClosestPosition(
    mouse: Mouse,
    range: Range,
    elementWidth: number,
): Promise<PagePosition | null> {
    let [x, y] = [0, 0];
    const mousePosition = await mouse.getMousePosition();

    // 選択箇所のすぐそこにツールチップを移動させる。
    x = mousePosition.x + scrollX;

    // QuickControllerが右端に突き刺さらないように考慮する。
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
