<script lang="ts">
	import { T } from '@threlte/core';
	import { ContactShadows, Grid, interactivity, OrbitControls } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import CalendarRing from './calendar-ring.svelte';
	interactivity();
	const scale = spring(1);
</script>

<T.PerspectiveCamera makeDefault position={[0, 3, 0]} fov={15}>
	<OrbitControls
		enableZoom={true}
		enablePan={false}
		enableDamping={true}
		maxPolarAngle={Math.PI / 7.8}
		minPolarAngle={Math.PI / 8.2}
		target={[0, 3, 0]}
		rotateSpeed={-0.2}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={-5} position.y={10} />
<T.AmbientLight intensity={0.2} />

<Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={250}
	cellSize={2}
/>

<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

<CalendarRing position.x={0} position.y={1} position.z={0}>
	<T.Mesh slot="fallback" position={[0, 0, 0]}>
		<T.BoxGeometry />
	</T.Mesh>
</CalendarRing>

<T.Mesh position={[0, 1, 0]}>
	<T.BoxGeometry args={[0.1, 2, 0.1]} />
</T.Mesh>
