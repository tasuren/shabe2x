<script>
	import App from "$components/app/App.svelte";

	import { text, speaker, volume, voiceName } from "$lib/state";
</script>

<svelte:head>
	<title>しゃべしゃべ</title>
</svelte:head>

<App bind:text={$text} bind:speaker={$speaker} bind:voiceName={$voiceName} bind:volume={$volume} />
