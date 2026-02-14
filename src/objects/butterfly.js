import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export function loadButterfly(scene) {
  const loader = new GLTFLoader()

  return new Promise((resolve) => {
    loader.load(
      'assets/butterfly/scene.gltf',
      (gltf) => {
        const model = gltf.scene
        model.scale.set(0.25, 0.25, 0.25)
        scene.add(model)
        resolve(model)
      },
      undefined,
      (error) => {
        console.warn('Could not load butterfly model:', error)
        resolve(null)
      },
    )
  })
}
