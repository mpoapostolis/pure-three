import * as THREE from "three";
import scene from "../scenes/main";
import { camera } from "./camera";
import { controls } from "./controls";
import { hero } from "./hero";
import { heroRb, world } from "./physics";
import { renderer } from "./renderer";

const clock = new THREE.Clock();

export function animate() {
  let mixerUpdateDelta = clock.getDelta();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  hero?.mixer?.update(mixerUpdateDelta);
  world.step();
  heroRb.addForce(
    {
      x: 0,
      y: 0,
      z: 0.1,
    },
    true
  );

  // console.log(hero?.rb?.translation());
  // let position = rigidBody?.translation();
  // if (hero.model?.position) hero.model.position.set();

  controls.update();
}
