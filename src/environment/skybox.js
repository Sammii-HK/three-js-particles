import * as THREE from 'three'

export function loadSkybox(scene) {
  const cubeTexture = new THREE.CubeTextureLoader()
    .setPath('assets/cubeMap/')
    .load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png',
    ])

  scene.background = cubeTexture
  scene.environment = cubeTexture

  return cubeTexture
}
