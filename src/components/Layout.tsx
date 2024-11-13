import ThemeToggleButton from "@components/ThemeToggleButton";
import type { ParentProps } from "solid-js";

function Layout(props: ParentProps) {
	return (
		<>
			<div class="w-[65ch] mx-auto flex flex-col">
				<header class="flex justify-between">
					<h1>しゃべしゃべ</h1>

					<ThemeToggleButton class="h-fit mr-1 my-auto" />
				</header>

				<main class="flex-grow">{props.children}</main>
			</div>
		</>
	);
}

export default Layout;
