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
  const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 2000 )
  // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  camera.position.set(0, 100, 50)
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
  // const ambLight = new THREE.AmbientLight(0xffffff, 0.4)
  // scene.add(ambLight)
  // DIRECTIONAL LIGHT WITH SHADOW CASTING
  // light = new THREE.DirectionalLight(0xffffff, 1.0)
  light = new THREE.DirectionalLight(0xddeeff, 1.5)
  light.position.set(-10, 50, 10)
  light.castShadow = true
  // light.gammaFactor = 2
  // light.gammaOutput = true
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
      character.scale.set(.25, .25, .25)
    }
  )

  // CREATING THE ENVIRONMENT
  scene.background = new THREE.CubeTextureLoader()
  	.setPath( 'assets/cubeMap/' )
  	.load( [
  		'px.png',
  		'nx.png',
  		'py.png',
  		'ny.png',
  		'pz.png',
  		'nz.png'
  	] )

    // ADD POINTS FOR PARTICLES TO GEOMETRY
    const geometry = new THREE.BufferGeometry()
    let vertices = []
    let materials = []
    let parameters
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 100 - 30
      const y = Math.random() * 100 - 30
      const z = Math.random() * 100 - 30
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

    // UPDATE CAMERA USING MOUSE
    camera.position.x += (mouse.x * 0.3 - camera.position.x) * .05
    camera.position.y += (mouse.y * 0.3 - (camera.position.y - 30)) * .05
    // UPDATE MOUSE WITH MOUSE MOVE
    window.addEventListener("mousemove", mouseMove)
    function mouseMove(e) {
      const x = (e.clientX - window.innerWidth / 2)
      const y = (e.clientY - window.innerWidth / 2)
      mouse.x = x
      mouse.y = y
    }

    // CREATE GROUND PLANE
    const ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2000,2000),
      new THREE.MeshPhongMaterial({ color: 0x586780 })
    )
    ground.rotation.x = (Math.PI / 180) * -25
    // ground.rotation.x = (Math.PI / 180) * -160
    // ground.rotation.x = (Math.PI / 180) * -15
    // ground.rotation.x = (Math.PI / 180) * -105
    // ground.rotation.x = (Math.PI / 180) * -85
    ground.position.y = -1250
    // ground.position.y = 5250
    // ground.position.y = -5250
    // ground.position.y = -125
    // ground.position.y = -15
    ground.recieveShadow = true
    scene.add(ground)



    console.log('JS done');
})
