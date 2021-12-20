# Three.js Particles

A Frontend app, which renders a 3D model of a butterfly within a 360 degree scene, with moving geometric particles, created with Three.js and Javascript.

## Details

### Timeframe

1 day

### Technologies Used

* Javascript
* [Three.js](https://threejs.org/)
* Express

### App Overview

The objective of this project was to explore some of the features available within [Three.js](https://threejs.org/), such as scenes, 3D models and animated geometric points within this 3D space.

![demo](https://user-images.githubusercontent.com/40900195/145025901-a627a446-4471-4bd7-a74a-2bbdc45f6e55.mov)

#### Development Process

The function to render the particles within a 3D scene.

```js
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
```

##### Used Sources

https://sketchfab.com/XiaoMa182

https://sketchfab.com/norgeotloic

http://www.humus.name/index.php?page=Textures


#### Functionality

The functionality is consistent with other 360 degree environments, and can be explored by drag and drop, zooming is also available.

### Challenges & Achievements

Getting the particles to render in a certain position of the scene.

## Future enhancements

* To incorporate photos I have taken myself to create a 3D scene.
