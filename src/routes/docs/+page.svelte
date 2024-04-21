<script>
	import Article from "$lib/components/Article.svelte";
</script>

<Article class="mt-4">
	<h1>説明書</h1>
	<h2>アプリの開き方</h2>
	<p>
		アプリはインストールする必要がなく、アプリは上部の「<a href="/app">アプリを開く</a
		>」をクリックすることで開けます。
		<del>なお、PWAに対応しているため、アプリとしてインストールすることも可能です。</del>（対応予定）
	</p>

	<h2>画面解説</h2>
	<p>
    <img src="screen.png" alt="画面" />
		ほとんど書いてある通りの挙動をします。例えば「普通に再生」は普通に読み上げてくれます。「ゆっくり再生」はちょっとゆっくり読み上げてくれます。<br>
    
	</p>

	<h2>開発状況</h2>
	<p>
		リポジトリは<a href="https://github.com/tasuren/shabe2x" target="_blank">GitHubのここ</a
		>にてホストしています。<br />
		開発者はtasurenで、ホームページは<a href="https://tasuren.jp/" target="_blank">ここ</a
		>です。問い合わせ情報もこのホームページにあります。
	</p>
</Article>
