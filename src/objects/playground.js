import * as THREE from 'three'

export function createPlaygroundObjects(scene) {
  const objects = {}

  // Wireframe box - neon green
  const wireBox = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0x39ff14, wireframe: true }),
  )
  wireBox.position.set(-60, 25, -40)
  scene.add(wireBox)
  objects.wireBox = wireBox

  // Chrome sphere - reflects skybox
  const chromeSphere = new THREE.Mesh(
    new THREE.SphereGeometry(7, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.05,
    }),
  )
  chromeSphere.position.set(-25, 20, -50)
  chromeSphere.castShadow = true
  scene.add(chromeSphere)
  objects.chromeSphere = chromeSphere

  // Glowing sphere - emissive pulsing
  const glowSphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 24, 24),
    new THREE.MeshStandardMaterial({
      color: 0xff4488,
      emissive: 0xff4488,
      emissiveIntensity: 0.8,
    }),
  )
  glowSphere.position.set(30, 30, -50)
  scene.add(glowSphere)
  objects.glowSphere = glowSphere

  // Torus knot - rainbow normals, floats up/down
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(6, 2, 64, 12),
    new THREE.MeshNormalMaterial(),
  )
  torusKnot.position.set(60, 35, -40)
  torusKnot.castShadow = true
  scene.add(torusKnot)
  objects.torusKnot = torusKnot

  // Icosahedron - flat shading
  const icosahedron = new THREE.Mesh(
    new THREE.IcosahedronGeometry(7, 0),
    new THREE.MeshPhongMaterial({
      color: 0x4488ff,
      flatShading: true,
    }),
  )
  icosahedron.position.set(0, 50, -60)
  icosahedron.castShadow = true
  scene.add(icosahedron)
  objects.icosahedron = icosahedron

  return objects
}

export function animatePlaygroundObjects(objects, elapsed) {
  const { wireBox, chromeSphere, glowSphere, torusKnot, icosahedron } = objects

  if (wireBox) {
    wireBox.rotation.x += 0.005
    wireBox.rotation.y += 0.008
  }
  if (chromeSphere) {
    chromeSphere.rotation.y += 0.003
  }
  if (glowSphere) {
    glowSphere.material.emissiveIntensity = 0.5 + Math.sin(elapsed * 2) * 0.5
  }
  if (torusKnot) {
    torusKnot.rotation.x += 0.007
    torusKnot.rotation.y += 0.005
    torusKnot.position.y = 35 + Math.sin(elapsed * 1.5) * 5
  }
  if (icosahedron) {
    icosahedron.rotation.x += 0.006
    icosahedron.rotation.z += 0.004
  }
}
