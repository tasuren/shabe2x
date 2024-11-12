import {
	createContext,
	createEffect,
	createSignal,
	type ParentProps,
	useContext,
} from "solid-js";

// テーマ定義
const ABSOLUTE_THEMES = ["dark", "light"] as const;
type AbsoluteTheme = (typeof ABSOLUTE_THEMES)[number];
export const THEMES = [...ABSOLUTE_THEMES, "auto"] as const;
export type Theme = (typeof THEMES)[number];

// テーマ設定
function readTheme(): Theme {
	return (localStorage.getItem("theme") as Theme | null) || "auto";
}

function writeTheme(theme: Theme) {
	localStorage.setItem("theme", theme);
}

// DOM関連
function applyThemeToDOM(theme: Theme) {
	let absTheme = theme;
	if (absTheme === "auto")
		absTheme = matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";

	// カラースキーマを変更
	document.documentElement.style.colorScheme = absTheme;
}

// UI関連
const ThemeContext = createContext<[() => Theme, (theme: Theme) => void]>();

export function ThemeProvider(props: ParentProps) {
	const [theme, setTheme] = createSignal<Theme>(readTheme());

	createEffect(() => {
		const current = theme();
		writeTheme(current);
		applyThemeToDOM(current);
	});

	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const value = useContext(ThemeContext);
	if (!value)
		throw new Error(
			"テーマのコンテキストプロバイダーが使われていないようです。",
		);
	return value;
};
