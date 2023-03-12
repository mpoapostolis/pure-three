import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera } from "./camera";
import { renderer } from "./renderer";
// Set up orbit controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 4, -3);
controls.update();
controls.maxPolarAngle = Math.PI / 2.3;
controls.maxDistance = 7;
controls.minDistance = 3;
controls.mouseButtons = {
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.ROTATE,
};
controls.enablePan = false;

export { controls };
