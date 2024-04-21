<script lang="ts">
	import ThemeButton from "./ThemeButton.svelte";

	const md = matchMedia("(min-width: 768px)");
	let isMd = md.matches;

	if (isMd) alert("すみませんが、まだスマホやタブレットには完全対応していません。");

	let menuHidden: boolean = !isMd;
	md.addEventListener("change", (e) => {
		isMd = e.matches;
		menuHidden = !isMd;
	});

	function toggleMenuHidden() {
		menuHidden = !menuHidden;
	}
</script>

<nav class="h-20 flex justify-between items-center">
	<h1 class="md:w-1/3 m-0">しゃべしゃべ</h1>

	<button type="button" class="visible md:hidden relative z-50" on:click={toggleMenuHidden}>
		{#if menuHidden}
			メニュー
		{:else}
			閉じる
		{/if}
	</button>

	{#key menuHidden}
		<div
			class="
        // レイアウト（左上にして新しい画面とする。）
        absolute md:static z-10 md:z-auto
        top-0 left-0
        w-screen h-fit md:w-auto md:h-auto

        // 中身の配置
        space-x-0 md:space-x-4 space-y-2 md:space-y-0
        flex-col md:flex-row p-6 md:p-0 box-border

        // 見た目
        backdrop-blur-xl rounded-md
      "
			style:display={menuHidden ? "none" : "flex"}
		>
			{#each [["/", "ホーム"], ["/docs", "説明書"], ["/app", "アプリを開く"]] as [href, text]}
				<div>
					<a
						{href}
						on:click={() => {
							if (!isMd) menuHidden = true;
						}}>{text}</a
					>
				</div>
			{/each}

			<div class="md:w-28 md:text-center">
				<ThemeButton />
			</div>
		</div>
	{/key}
</nav>
