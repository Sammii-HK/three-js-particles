import GUI from 'lil-gui'

export function setupGUI({ particles, playgroundObjects, lights, scene, grid, axes, renderer }) {
  const gui = new GUI()

  // Particles folder
  const pFolder = gui.addFolder('Particles')
  const pParams = {
    speed: 0.1,
    opacity: particles.material.opacity,
    size: particles.material.size,
    visible: true,
  }
  pFolder.add(pParams, 'speed', 0, 1).name('Rotation Speed')
  pFolder.add(pParams, 'opacity', 0, 1).onChange((v) => {
    particles.material.opacity = v
  })
  pFolder.add(pParams, 'size', 0.1, 5).onChange((v) => {
    particles.material.size = v
  })
  pFolder.add(pParams, 'visible').onChange((v) => {
    particles.particles1.visible = v
    particles.particles2.visible = v
  })

  // Objects folder
  const oFolder = gui.addFolder('Objects')
  for (const [name, mesh] of Object.entries(playgroundObjects)) {
    const sub = oFolder.addFolder(name)
    sub.add(mesh, 'visible')
    if (mesh.material.wireframe !== undefined) {
      sub.add(mesh.material, 'wireframe')
    }
    if (mesh.material.opacity !== undefined && mesh.material.transparent !== undefined) {
      mesh.material.transparent = true
      sub.add(mesh.material, 'opacity', 0, 1)
    }
    if (mesh.material.metalness !== undefined) {
      sub.add(mesh.material, 'metalness', 0, 1)
    }
    if (mesh.material.roughness !== undefined) {
      sub.add(mesh.material, 'roughness', 0, 1)
    }
    sub.close()
  }

  // Light folder
  const lFolder = gui.addFolder('Light')
  const dir = lights.dir
  const dirHelper = lights.dirHelper
  const updateHelper = () => {
    dirHelper.update()
  }
  lFolder.add(dir.position, 'x', -100, 100).name('X').onChange(updateHelper)
  lFolder.add(dir.position, 'y', 0, 150).name('Y').onChange(updateHelper)
  lFolder.add(dir.position, 'z', -100, 100).name('Z').onChange(updateHelper)
  lFolder.add(dir, 'intensity', 0, 5).name('Intensity')
  lFolder.add(dir, 'castShadow').name('Cast Shadow')
  lFolder.add(dirHelper, 'visible').name('Show Helper')
  lFolder.addColor({ color: '#' + dir.color.getHexString() }, 'color').name('Color').onChange((v) => {
    dir.color.set(v)
    updateHelper()
  })

  // Scene folder
  const sFolder = gui.addFolder('Scene')
  const sceneParams = {
    fogNear: scene.fog ? scene.fog.near : 500,
    fogFar: scene.fog ? scene.fog.far : 1000,
    shadows: renderer.shadowMap.enabled,
  }
  sFolder.add(sceneParams, 'fogNear', 0, 2000).name('Fog Near').onChange((v) => {
    if (scene.fog) scene.fog.near = v
  })
  sFolder.add(sceneParams, 'fogFar', 0, 2000).name('Fog Far').onChange((v) => {
    if (scene.fog) scene.fog.far = v
  })
  sFolder.add(sceneParams, 'shadows').name('Shadows').onChange((v) => {
    renderer.shadowMap.enabled = v
  })

  // Helpers folder
  const hFolder = gui.addFolder('Helpers')
  hFolder.add(grid, 'visible').name('Grid')
  hFolder.add(axes, 'visible').name('Axes')
  hFolder.close()

  return { gui, pParams }
}
