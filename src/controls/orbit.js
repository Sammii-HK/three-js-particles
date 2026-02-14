import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function setupOrbitControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 20, 0)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.update()
  return controls
}
