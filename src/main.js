import * as THREE from 'three'

import { createRenderer, createCamera, createGridHelper, createAxesHelper, setupResizeHandler } from './utils/helpers.js'
import { loadSkybox } from './environment/skybox.js'
import { setupLighting } from './environment/lighting.js'
import { createParticles } from './objects/particles.js'
import { loadButterfly } from './objects/butterfly.js'
import { createPlaygroundObjects, animatePlaygroundObjects } from './objects/playground.js'
import { setupOrbitControls } from './controls/orbit.js'
import { setupGUI } from './controls/gui.js'

// Scene
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0x6a99ee, 800, 2500)

// Clock
const clock = new THREE.Clock()

// Renderer & camera
const renderer = createRenderer()
const camera = createCamera()
scene.add(camera)

// Resize
setupResizeHandler(camera, renderer)

// Environment
loadSkybox(scene)
const lights = setupLighting(scene)

// Controls
const controls = setupOrbitControls(camera, renderer)

// Objects
const particles = createParticles(scene)
loadButterfly(scene)
const playgroundObjects = createPlaygroundObjects(scene)

// Helpers
const grid = createGridHelper(scene)
const axes = createAxesHelper(scene)

// GUI
const { pParams } = setupGUI({
  particles,
  playgroundObjects,
  lights,
  scene,
  grid,
  axes,
  renderer,
})

// Animation loop
function animate() {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()
  const elapsed = clock.getElapsedTime()

  // Rotate particles
  for (const child of scene.children) {
    if (child instanceof THREE.Points) {
      child.rotation.z += pParams.speed * delta
    }
  }

  // Animate playground objects
  animatePlaygroundObjects(playgroundObjects, elapsed)

  // Update orbit controls (required for damping)
  controls.update()

  renderer.render(scene, camera)
}

animate()
