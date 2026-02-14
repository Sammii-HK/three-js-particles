import * as THREE from 'three'

export function createParticles(scene) {
  const geometry = new THREE.BufferGeometry()
  const count = 1500
  const positions = []
  const colors = []

  // Spherical distribution spread wide around the scene
  for (let i = 0; i < count; i++) {
    const radius = 30 + Math.random() * 400
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    )

    const t = i / count
    colors.push(
      0.3 + t * 0.4,
      0.3 + (1 - t) * 0.3,
      0.7 + t * 0.3,
    )
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  const texture = new THREE.TextureLoader().load('assets/images/sprite1.jpeg')

  const material = new THREE.PointsMaterial({
    size: 1.5,
    map: texture,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    opacity: 0.5,
    vertexColors: true,
  })

  const particles1 = new THREE.Points(geometry, material)
  particles1.rotation.x = Math.random() * 6
  particles1.rotation.y = Math.random()
  particles1.rotation.z = Math.random()
  scene.add(particles1)

  const particles2 = particles1.clone()
  particles2.rotation.x = Math.random() * 6
  particles2.rotation.y = Math.random()
  particles2.rotation.z = Math.random()
  scene.add(particles2)

  return { particles1, particles2, material }
}
