import { cl } from "@/lib/ui";
import type { ParentProps } from "solid-js";
import TitleBar from "./TitleBar";

function Layout(props: ParentProps) {
    return (
        <div
            class={cl(
                "min-h-screen",
                "w-full",
                "md:w-[65ch]",
                "ms-auto",
                "me-auto",
                "flex",
                "flex-col",
            )}
        >
            <TitleBar />

            {props.children}
        </div>
    );
}

export default Layout;
