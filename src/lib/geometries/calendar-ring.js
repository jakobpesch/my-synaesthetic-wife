import * as THREE from 'three';

// Create a ring geometry
const innerRadius = 1;
const outerRadius = 5;
const segments = 32;
const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, segments);

// Adjust the Y position of the outer vertices
const position = ringGeometry.attributes.position;
const vertexCount = position.count;

for (let i = 0; i < vertexCount; i++) {
	const x = position.getX(i);
	const y = position.getY(i);
	const z = position.getZ(i);

	// Increase Y value for outer vertices (those closer to the outer radius)
	const distanceFromCenter = Math.sqrt(x * x + z * z);
	if (distanceFromCenter > innerRadius) {
		const heightDifference = 2; // Adjust this to control the height difference
		position.setY(
			i,
			y + (heightDifference * (distanceFromCenter - innerRadius)) / (outerRadius - innerRadius)
		);
	}
}

// Update the geometry after modifying the vertices
ringGeometry.attributes.position.needsUpdate = true;

export { ringGeometry };
