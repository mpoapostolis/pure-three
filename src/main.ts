import * as THREE from "three";
import { animate } from "./components/render";
import scene from "./scenes/main";
import "./style.css";

const planeGeom = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeom, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Add a grid helper to the scene
const gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);
// Add a directional light to the scene
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 10);
scene.add(light);
// Render loop

animate();
