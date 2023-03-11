import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import scene from "./scene";

export const W = "w";
export const A = "a";
export const S = "s";
export const D = "d";
export const SPACE = " ";
export const SHIFT = "shift";
export type heroActions =
  | "Running"
  | "Jumping"
  | "Walking"
  | "Idle"
  | "WalkingLeftTurn"
  | "LeftStrafe"
  | "RightStrafe"
  | "RightStrafeWalking"
  | "WalkingBackward"
  | "RunningBackward";

const loader = new GLTFLoader();

class Hero {
  model?: THREE.Group;
  mixer?: THREE.AnimationMixer;
  animationsMap: Map<string, THREE.AnimationAction> = new Map(); // Walk, Run, Idle
  action: heroActions = "Idle";

  constructor() {
    loader.load("/models/hero.glb", (gltf) => {
      const animationsMap: Map<heroActions, THREE.AnimationAction> = new Map();
      // Add the loaded model to the scene
      scene.add(gltf.scene);
      gltf.scene.scale.set(0.01, 0.01, 0.01);
      gltf.scene.position.set(0, 1, 0);
      // // Set up the idle animation
      const mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations
        .filter((animation) => animation.name !== "T-Pose (No Animation)")
        .forEach((animation) => {
          console.log(animation.name);
          const action = mixer.clipAction(animation);
          animationsMap.set(animation.name as heroActions, action);
        });
      this.model = gltf.scene;
      this.mixer = mixer;
      this.animationsMap = animationsMap;
      const idle = animationsMap.get("Idle")?.getClip();
      if (idle) this.mixer?.clipAction(idle).play();
    });
  }

  update(action: heroActions) {
    console.log("currentAction", action);
    if (this.action === action) return;
    const currentAction = this.animationsMap.get(this.action);
    const nextAction = this.animationsMap.get(action);
    if (currentAction && nextAction) {
      currentAction.fadeOut(0.5);
      nextAction.reset().fadeIn(0.5).play();
    }
    this.action = action;
  }
}

function keyToAction(_key: string, isShiftPressed: boolean) {
  const key = _key.toLocaleLowerCase();
  let action: heroActions;
  switch (key) {
    case SPACE:
      action = "Jumping";
      break;

    case W:
      action = isShiftPressed ? "Running" : "Walking";
      break;
    case A:
      action = isShiftPressed ? "LeftStrafe" : "WalkingLeftTurn";
      break;
    case S:
      action = isShiftPressed ? "RunningBackward" : "WalkingBackward";
      break;
    case D:
      action = isShiftPressed ? "RightStrafe" : "RightStrafeWalking";
      break;
    default:
      action = "Idle";
      break;
  }
  return action;
}

document.addEventListener("keydown", (event) => {
  let action = keyToAction(event.key, event.shiftKey);
  console.log("action", action);
  hero.update(action);
});

document.addEventListener("keyup", () => {
  hero.update("Idle");
});
export const hero = new Hero();
