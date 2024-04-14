<script lang="ts">
	import Button from "./Button.svelte";

	const STATIC_THEMES = {
		dark: "夜",
		light: "昼"
	} as const;
	const DYNAMIC_THEMES = { system: "自動" };
	type StaticTheme = keyof typeof STATIC_THEMES;
	type DynamicTheme = keyof typeof DYNAMIC_THEMES;
	type Theme = StaticTheme | DynamicTheme;
	const THEMES = Object.assign(STATIC_THEMES, DYNAMIC_THEMES);

	const themeOrder: Theme[] = ["dark", "light", "system"];
	const THEME_MEDIA = "(prefers-color-scheme: dark)";

	function getSystemTheme(): StaticTheme {
		return window.matchMedia(THEME_MEDIA).matches ? "dark" : "light";
	}

	// テーマを取得し、なければOS設定から汲み取る。
	let currentTheme: Theme = (localStorage.getItem("theme") as Theme) || "light";

	window.matchMedia(THEME_MEDIA).addEventListener("change", (event) => {
		if (currentTheme === "system") currentTheme = event.matches ? "dark" : "light";
	});

	function getNext(target: Theme): Theme {
		for (const i in Object.entries(themeOrder)) {
			if (themeOrder[i] == target) {
				const theme = themeOrder[+i + 1];
				return theme ? (target = theme) : themeOrder[0];
			}
		}

		throw new Error("unreacheable");
	}

	// 変更される度にシステムテーマならシステムのテーマを反映し設定を保存する。
	$: {
		localStorage.setItem("theme", currentTheme);
		let currentStaticTheme: StaticTheme =
			currentTheme === "system" ? getSystemTheme() : currentTheme;

		if (currentStaticTheme == "dark") document.documentElement.setAttribute("data-theme", "dark");
		else document.documentElement.removeAttribute("data-theme");

		document.documentElement.style.colorScheme = currentStaticTheme;
	}
</script>

<div>
	<Button
		onClick={(_) => {
			currentTheme = getNext(currentTheme);
		}}
	>
		テーマ：
		{THEMES[currentTheme]}
	</Button>
</div>
