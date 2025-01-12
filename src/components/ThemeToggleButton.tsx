import { applyThemeToDOM, writeTheme } from "@/lib/theme";
import { readTheme } from "@/lib/theme";
import { createEffect, createSignal } from "solid-js";

const THEME_TITLES = {
    dark: "ダーク",
    light: "ライト",
    auto: "自動",
};

function ThemeToggleButton(props: { class: string }) {
    const [theme, setTheme] = createSignal(readTheme());

    createEffect(() => {
        const current = theme();

        writeTheme(current);
        applyThemeToDOM(current);
    });

    const toggleTheme = () => {
        const current = theme();
        if (current === "dark") setTheme("light");
        else if (current === "light") setTheme("auto");
        else setTheme("dark");
    };

    return (
        <button type="button" on:click={toggleTheme} class={props.class}>
            テーマ：{THEME_TITLES[theme()]}
        </button>
    );
}

export default ThemeToggleButton;
