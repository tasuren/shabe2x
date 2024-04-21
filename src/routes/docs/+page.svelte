<script>
	import Article from "$lib/components/Article.svelte";
</script>

<svelte:head>
	<title>しゃべしゃべの説明書</title>
</svelte:head>

<Article class="mt-4">
	<h1>説明書</h1>
	<h2>アプリの開き方</h2>
	<p>
		アプリはインストールする必要がなく、アプリは上部の「<a href="/app">アプリを開く</a
		>」をクリックすることで開けます。
		<del>なお、PWAに対応しているため、アプリとしてインストールすることも可能です。</del>（対応予定）
	</p>

	<h2>画面解説</h2>
	<h3>基本操作</h3>
	<p>
		<img src="screen.png" alt="画面" />
		真ん中の長方形が読み上げる文字列を入力する場所で、HTMLのペーストをしても書式（見出しや強調等）をそのままに表示してくれます。<br
		/>
		ボタンなどは書いてある通りの挙動をします。例えば「普通に再生」は普通に読み上げてくれます。「ゆっくり再生」はちょっとゆっくり読み上げてくれます。<br
		/>
		なお、文章を部分選択して再生ボタンを押すと、その部分のみ読み上げてくれます。
	</p>
	<h3>ショートカットキー</h3>
	<p>
		<key>Ctrl</key>（Macの場合<key>command</key>）と<key>Shift</key
		>を押しながら以下のキーを押すと、それに対応したアクションをすることができます。
	</p>
	<ul>
		<li><key>a</key>：ゆっくり再生</li>
		<li><key>s</key>：普通に再生</li>
		<li><key>z</key>：停止</li>
	</ul>

	<h2>対応ブラウザ</h2>
	<p>
		このアプリは読み上げにWeb Speech
		APIを使っており、それは新しいものなので一部のブラウザでは動作しないかもしれません。<br />
		少なくとも以下のブラウザの動作を確認しています。
	</p>
	<ul>
		<li>macのSafariとChromiumベースのブラウザ</li>
		<li>AndroidのFirefox</li>
	</ul>

	<h2>開発状況</h2>
	<p>
		まずこのアプリはまだ完成したばかりで、動作が不安定です。バグがあれば次の連絡先に連絡してください。
	</p>
	<p>
		ソースコードは<a href="https://github.com/tasuren/shabe2x" target="_blank"
			>GitHubのこのリポジトリ</a
		>にてホストしています。ですので、問題などはできればここでIssueとして投稿してください。<br />
		また、開発者はtasurenであり、ホームページは<a href="https://tasuren.jp/" target="_blank">ここ</a
		>です。開発者の問い合わせ情報もこのホームページにあります。
	</p>
</Article>
