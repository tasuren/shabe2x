export { default as Button } from "./components/Button.svelte";
export { default as ThemeButton } from "./components/ThemeButton.svelte";
export { default as App } from "./components/app/App.svelte";

export function lazyThemeTransitionSetup() {
	// 最初は一瞬でテーマが反映させるようにする。
	setTimeout(() => {
		document.documentElement.style.transition = "background-color 0.2s linear";
	}, 100);
}
