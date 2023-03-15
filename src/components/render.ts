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
  const pos = heroRb.translation();
  if (hero.model?.rotation)
    hero.model.rotation.y = -Math.PI + controls.getAzimuthalAngle();

  controls.target.set(pos.x, pos.y, pos.z);
  if (hero.model?.position)
    hero.model.position.set(pos?.x ?? 0, pos?.y ?? 0, pos?.z ?? 0);

  controls.update();
}
