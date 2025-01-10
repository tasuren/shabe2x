import type { ParentProps } from "solid-js";
import TitleBar from "./TitleBar";

function Layout(props: ParentProps) {
    return (
        <div class="min-h-screen w-full md:w-[65ch] m-auto flex flex-col justify-between">
            <TitleBar />

            <main class="flex-grow h-full">{props.children}</main>
        </div>
    );
}

export default Layout;
