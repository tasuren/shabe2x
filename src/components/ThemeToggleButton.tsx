import { type Theme, useTheme } from "@lib/theme";

const THEME_TITLES = {
	dark: "ダーク",
	light: "ライト",
	auto: "自動",
};

function ThemeToggleButton() {
	const [theme, setTheme] = useTheme();

	const toggleTheme = () => {
		const current = theme();
		if (current === "dark") setTheme("light");
		else if (current === "light") setTheme("auto");
		else setTheme("dark");
	};

	return (
		<button type="button" on:click={toggleTheme}>
			{THEME_TITLES[theme()]}
		</button>
	);
}

export default ThemeToggleButton;
