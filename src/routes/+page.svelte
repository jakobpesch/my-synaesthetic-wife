<script lang="ts">
	import App from '$lib/components/App.svelte';
	import Synesthesia from '$lib/components/synesthesia.svelte';
	let show = false;
</script>

<div class="background p-4 {show ? 'syn-on' : 'syn-off'}">
	<button
		on:click={() => {
			show = !show;
		}}
	>
		Turn {#if show}
			off
		{:else}
			on
		{/if} synesthesia
	</button>
	<Synesthesia />
	<App />
</div>

<style>
	:global(body) {
		margin: 0;
	}

	.background {
		height: 100vh;
		background: rgb(220, 231, 255);
		background: linear-gradient(180deg, rgb(202, 219, 255) 0%, rgba(8, 12, 21, 1) 100%);
	}

	:global(.syn-off .to-be-colored) {
		visibility: hidden;
	}
	:global(.syn-on .to-be-colored) {
		animation: fadeIn 2s ease-in-out;
	}
	:global(.syn-on .to-be-colored span) {
		text-shadow:
			0 0 3px color-mix(in srgb, currentColor 100%, transparent),
			0 0 10px color-mix(in srgb, currentColor 30%, transparent),
			0 0 15px color-mix(in srgb, currentColor 20%, transparent),
			0 0 20px color-mix(in srgb, currentColor 10%, transparent);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
