import { cl } from "@/lib/ui";
import Manual from "./Manual";

function ManualButton() {
    let dialogElement: HTMLDialogElement | undefined;

    return (
        <>
            <button type="button" onClick={() => dialogElement?.showModal()}>
                説明書
            </button>

            <dialog
                style="margin: 0;" // リセットCSS
                class={cl(
                    "absolute left-1/2 top-1/2",
                    "-translate-x-1/2 -translate-y-1/2",
                    "w-5/6 md:w-1/2 h-4/5",
                )}
                ref={dialogElement}
            >
                <div class="h-full flex flex-col justify-between space-y-2">
                    <Manual class="overflow-auto" />

                    <div>
                        <button
                            type="button"
                            autofocus
                            onClick={() => dialogElement?.close()}
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default ManualButton;
