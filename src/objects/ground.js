import * as THREE from 'three'

export function createGround(scene) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0x586780 }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -15
  ground.receiveShadow = true
  scene.add(ground)
  return ground
}
