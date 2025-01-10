import type { ParentProps } from "solid-js";

import ThemeToggleButton from "@/components/ThemeToggleButton";
import ManualButton from "./ManualButton";

function Layout(props: ParentProps) {
    return (
        <div class="w-full md:w-[65ch] h-full m-auto flex flex-col justify-between">
            <header class="mx-4 flex-none flex justify-between items-center">
                <h1 class="text-2xl md:text-3xl">しゃべしゃべ</h1>

                <div class="space-x-2 h-fit">
                    <ManualButton />
                    <ThemeToggleButton class="h-fit mr-2" />
                </div>
            </header>

            <main class="flex-grow h-full">{props.children}</main>
        </div>
    );
}

export default Layout;
