import * as THREE from 'three'

export function setupLighting(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambient)

  const hemi = new THREE.HemisphereLight(0x87ceeb, 0x586780, 0.4)
  scene.add(hemi)

  const dir = new THREE.DirectionalLight(0xddeeff, 1.5)
  dir.position.set(-10, 50, 10)
  dir.castShadow = true
  dir.shadow.camera.right = 50
  dir.shadow.camera.left = -50
  dir.shadow.camera.top = 50
  dir.shadow.camera.bottom = -50
  dir.shadow.mapSize.width = 2048
  dir.shadow.mapSize.height = 2048
  scene.add(dir)

  return { ambient, hemi, dir }
}
