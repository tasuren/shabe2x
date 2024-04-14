<script lang="ts">
	import "../app.css";
</script>

<div class="flex justify-center">
	<div style:max-width="65ch" class="w-3/5">
		<nav class="h-20 flex justify-between items-center">
			<h1 class="w-1/3 m-0">しゃべしゃべ</h1>
			<div class="flex space-x-4">
				<div>
					<a href="/">ホーム</a>
				</div>
				<div><a href="/app">アプリを開く</a></div>
			</div>
		</nav>

		<main>
			<slot />
		</main>
	</div>
</div>
