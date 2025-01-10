import {
    type Accessor,
    type ParentProps,
    createEffect,
    createSignal,
    onCleanup,
    onMount,
} from "solid-js";
import {
    Mouse,
    type PagePosition,
    calculateClosestPosition,
} from "./position.ts";

/** ポップアップ */
function PopUp(
    props: ParentProps<{
        class: string;
        id: string;
        selectedRange: Accessor<Range | undefined>;
    }>,
) {
    const [position, setPosition] = createSignal<PagePosition>({ x: 0, y: 0 });
    const [hidden, setHidden] = createSignal(true);
    let element: HTMLDivElement | undefined;

    // 文章が選択されたら、その場所にポップアップを表示する。
    const mouse = new Mouse();
    createEffect(async () => {
        const range = props.selectedRange();
        if (!range || !element) return;

        const newPosition = await calculateClosestPosition(
            mouse,
            range,
            element.clientWidth,
        );
        if (newPosition) {
            setPosition(newPosition);
            setHidden(false);
        }
    });

    // 外側をクリックした際に閉じる。
    const onMouseDown = (event: MouseEvent) => {
        if (!(event.target as Element).closest(`#${props.id}`)) setHidden(true);
    };

    onMount(() => {
        addEventListener("mousedown", onMouseDown);
        mouse.mount();
    });

    onCleanup(() => {
        removeEventListener("mousedown", onMouseDown);
        mouse.cleanup();
    });

    return (
        <div
            class={`absolute ${props.class}`}
            id={props.id}
            style={{
                left: `${position().x}px`,
                top: `${position().y}px`,
            }}
            hidden={hidden()}
            ref={element}
        >
            {props.children}
        </div>
    );
}

export default PopUp;
