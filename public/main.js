console.log('JS loaded')



document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')

  // GLOBAL VARIABLES
  let controls, render, light, mixer, loader
  // CLOCK
  const clock = new THREE.Clock()

  // CREATE A SCENE
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xbfd1e5)
  scene.fog = new THREE.Fog(0x6a99ee, 500, 1000)

  // CREATE CAMERA
  const camera = new THREE.PerspectiveCamera( 125, window.innerWidth / window.innerHeight, 1, 2000 )
  // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  camera.position.set(0, 100, 175)
  scene.add(camera)

  // CREATE RENDERER
  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  // renderer.outputEncoding = true
  // renderer.gammaFactor = 2.2
  document.body.appendChild( renderer.domElement )

  // ORBIT CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 50, 0)
  controls.update()

  // AMBIENT LIGHT
  const ambLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambLight)
  // DIRECTIONAL LIGHT WITH SHADOW CASTING
  light = new THREE.DirectionalLight(0xffffff, 1.0)
  // light = new THREE.DirectionalLight(0xddeeff, .8)
  light.position.set(-10, 50, 10)
  light.castShadow = true
  // light.gammaFactor = 2
  light.gammaOutput = true
  light.shadow.camera.right = 50
  light.shadow.camera.left = -50
  light.shadow.camera.top = 50
  light.shadow.camera.bottom = -50
  light.shadow.mapSize.width = 2048
  light.shadow.mapSize.height = 2048
  scene.add(light)

  // LOAD MANAGER
  loader = new THREE.GLTFLoader()
  // LOAD THE MODEL
  loader.load('assets/butterfly/scene.gltf',
    function(model) {
      // ADD MODEL TO SCENE
      character = model.scene
      scene.add(character)
      character.scale.set(1.1, 1.1, 1.1)
    }
  )

  document.addEventListener('mousemove', onDocumentMouseMove. false)
  function onDocumentMouseMove(event) {
    event.preventDefault()
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / renderer/domElement.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objects, true)
    if (intersects.length < 0) {
      active = intersects[0].object
      active.material.color.setHex(Math.random() * 0x9999999)
    }
    t.rotation.z = mouse.x * 0.5
    t.rotation = mouse.y * 0.5
  }

  // CREATING THE ENVIRONMENT
  const env = new THREE.Scene();
    env.background = new THREE.CubeTextureLoader()
  	.setPath( 'assets/cubeMap/' )
  	.load( [
  		'px.png',
  		'nx.png',
  		'py.png',
  		'ny.png',
  		'pz.png',
  		'nz.png'
  	] );
    scene.add(env)


    // ADD POINTS FOR PARTICLES TO GEOMETRY
    const geometry = new THREE.BufferGeometry()
    let vertices = []
    let materials = []
    let parameters
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 500 - 30
      const y = Math.random() * 260 - 30
      const z = Math.random() * 500 - 30
      vertices.push(x, y, z)
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    // LOAD PARTICLE TEXTURE
    const texture = new THREE.TextureLoader().load('assets/images/sprite1.jpeg')
    // CREATE POINTS MATERIAL
    material = new THREE.PointsMaterial({ size: 1.0, map: texture, blending: THREE.AdditiveBlending, depthTest: false, transparent: true, opacity: 0.5})
    material.color.setRGB(0.7, 0.7, 0.9)
    // CREATE POINTS OBJECT
    const particles = new THREE.Points( geometry, material)
    // RANDOMIZE ROATION OF PARTICLES
    particles.rotation.x = Math.random() * 6
    particles.rotation.y = Math.random() * 1
    particles.rotation.z = Math.random() * 1
    scene.add(particles)
    // MAKE MORE PARTICLES
    const particles2 = particles.clone()
    particles2.rotation.x = Math.random() * 6
    particles2.rotation.y = Math.random() * 1
    particles2.rotation.z = Math.random() * 1
    scene.add(particles2)

    // ANIMATION LOOP
    function animate() {
      requestAnimationFrame(animate)
      const d = clock.getDelta()
      for (let i = 0; i < scene.children.length; i++) {
        const object = scene.children[i]
        if (object instanceof THREE.Points) {
          object.rotation.z += .1 * d
        }
      }
      renderer.render(scene, camera)
    }
    animate()

    // function animate() {
    //   requestAnimationFrame(animate)
    //   renderer.render(scene, camera)
    // }
    // animate()




    console.log('JS done');
})
