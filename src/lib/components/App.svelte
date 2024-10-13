<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<div class="calendar-container">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	.calendar-container {
		width: 100vw;
		height: 50vh;
	}
</style>
