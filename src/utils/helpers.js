import * as THREE from 'three'

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  document.body.appendChild(renderer.domElement)
  return renderer
}

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    5000,
  )
  camera.position.set(0, 60, 250)
  return camera
}

export function createGridHelper(scene) {
  const grid = new THREE.GridHelper(200, 20, 0x444444, 0x222222)
  grid.position.y = -1
  grid.visible = false
  scene.add(grid)
  return grid
}

export function createAxesHelper(scene) {
  const axes = new THREE.AxesHelper(50)
  axes.visible = false
  scene.add(axes)
  return axes
}

export function setupResizeHandler(camera, renderer) {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}
