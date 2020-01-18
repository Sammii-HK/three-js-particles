console.log('JS loaded')

// GLOBAL VARIABLES
var controls, camera, scene, render, light, mixer;
// CLOCK
var clock = new THREE.Clock();
// CREATE A SCENE
var scene = new THREE.Scene()
scene.background = new THREE.Color(0x6a99ee)
scene.fog = new THREE.Fog(0x6a99ee, 500, 1000)
// CREATE CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 100, 250)
scene.add(camera)
// CREATE RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabledd = true
renderer.gammaOutput = true
renderer.gammaFactor = 2.2



document.body.appendChild( renderer.domElement );


document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded")
})
