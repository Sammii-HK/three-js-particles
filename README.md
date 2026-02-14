# Three.js Playground

A 3D playground built with Three.js featuring particles, a butterfly model, interactive objects, and real-time tweakable controls.

## Quick Start

```bash
npm install
npm run dev
```

This opens the app in your browser with Vite's hot-reload dev server.

## Features

- **Particles** - 1500 per-vertex colored particles with additive blending
- **Butterfly model** - GLTF model loaded into the scene
- **Cubemap skybox** - 360-degree environment that also drives PBR reflections
- **Playground objects** - wireframe box, glass box, chrome sphere, glowing sphere, torus knot, icosahedron
- **lil-gui controls** - tweak particles, objects, fog, shadows, and helpers in real time
- **Orbit controls** - smooth camera movement with damping

## Technologies

- [Three.js](https://threejs.org/) (via npm)
- [Vite](https://vitejs.dev/) for dev server and bundling
- [lil-gui](https://lil-gui.georgealways.com/) for the controls panel

## Project Structure

```
src/
  main.js                  # Entry: scene, renderer, animate loop
  objects/
    particles.js           # Particle system with per-vertex colors
    butterfly.js           # GLTF loader
    ground.js              # Ground plane
    playground.js          # Boxes, spheres, torus knot, icosahedron
  environment/
    skybox.js              # Cubemap + scene.environment for PBR
    lighting.js            # Ambient + hemisphere + directional lights
  controls/
    gui.js                 # lil-gui controls panel
    orbit.js               # OrbitControls with damping
  utils/
    helpers.js             # Renderer, camera, grid/axes helpers
```

## Asset Sources

- https://sketchfab.com/XiaoMa182
- https://sketchfab.com/norgeotloic
- http://www.humus.name/index.php?page=Textures
