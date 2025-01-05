import { useTheme } from "./Context";

const THEME_TITLES = {
	dark: "ダーク",
	light: "ライト",
	auto: "自動",
};

function ThemeToggleButton(props: { class: string }) {
	const [theme, setTheme] = useTheme();

	const toggleTheme = () => {
		const current = theme();
		if (current === "dark") setTheme("light");
		else if (current === "light") setTheme("auto");
		else setTheme("dark");
	};

	return (
		<button type="button" on:click={toggleTheme} class={props.class}>
			{THEME_TITLES[theme()]}
		</button>
	);
}

export default ThemeToggleButton;
