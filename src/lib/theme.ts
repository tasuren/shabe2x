// テーマ定義
const ABSOLUTE_THEMES = ["dark", "light"] as const;
export type AbsoluteTheme = (typeof ABSOLUTE_THEMES)[number];
export const THEMES = [...ABSOLUTE_THEMES, "auto"] as const;
export type Theme = (typeof THEMES)[number];

// テーマ設定
export function readTheme(): Theme {
    return (localStorage.getItem("theme") as Theme | null) || "auto";
}

export function writeTheme(theme: Theme) {
    localStorage.setItem("theme", theme);
}

// DOM関連
export function applyThemeToDOM(theme: Theme) {
    let absTheme = theme;
    if (absTheme === "auto")
        absTheme = matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

    // カラースキーマを変更
    document.documentElement.style.colorScheme = absTheme;

    // Tailwind CSSのためのテーマ情報を設定
    document.documentElement.setAttribute("data-theme", absTheme);
}
