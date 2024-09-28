<script lang="ts">
	import App from '$lib/components/App.svelte';
</script>

<div>
	<App />
</div>

<style>
	:global(body) {
		margin: 0;
	}

	div {
		width: 100vw;
		height: 100vh;
		background: rgb(220, 231, 255);
		background: linear-gradient(180deg, rgb(202, 219, 255) 0%, rgba(8, 12, 21, 1) 100%);
	}
</style>
