import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import scene from "./components/scene";
import { hero } from "./components/hero";

// Create a Three.js scene
scene.background = new THREE.Color(0xffffff);
// Set up a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const planeGeom = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeom, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// Add a grid helper to the scene
const gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);

// Add a directional light to the scene
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 10);
scene.add(light);
// Render loop
const clock = new THREE.Clock();
function animate() {
  let mixerUpdateDelta = clock.getDelta();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  hero?.mixer?.update(mixerUpdateDelta);
  if (hero.action !== "Idle" && hero.model?.position)
    hero.model.position.z += 0.02;
  controls.update();
}

animate();
