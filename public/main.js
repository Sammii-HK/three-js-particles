console.log('JS loaded')



document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')

  // GLOBAL VARIABLES
  let controls, render, light, mixer
  // CLOCK
  let clock = new THREE.Clock()
  // CREATE A SCENE
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x6a99ee)
  scene.fog = new THREE.Fog(0x6a99ee, 500, 1000)
  // CREATE CAMERA
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 )
  // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  camera.position.set(0, 100, 250)
  scene.add(camera)
  // CREATE RENDERER
  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.shadowMap.enabledd = true
  renderer.gammaOutput = true
  renderer.gammaFactor = 2.2
  document.body.appendChild( renderer.domElement )
  // ORBIT CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 50, 0)
  controls.update()
  // AMBIENT LIGHT
  light = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(light)
  // DIRECTIONAL LIGHT WITH SHADOW CASTING
  light = new THREE.DirectionalLight(0xffffff, 1.0)
  light.position.set(100, 200, 100)
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
  // ANIMATION LOOP
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()

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
    console.log('JS done');
})
