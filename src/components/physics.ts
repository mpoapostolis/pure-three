import RAPIER from "@dimforge/rapier3d-compat";

await RAPIER.init();

const gravity = { x: 0.0, y: -9.81, z: 0.0 };
const world = new RAPIER.World(gravity);
const groundColliderDesc = RAPIER.ColliderDesc.cuboid(150.0, 0.1, 150.0);
world.createCollider(groundColliderDesc);

// Create a dynamic rigid-body.
let heroRbDesc = RAPIER.RigidBodyDesc.kinematicVelocityBased().setTranslation(
  0.0,
  1.0,
  0.0
);
let heroRb = world.createRigidBody(heroRbDesc);
// Create a cuboid collider attached to the dynamic rigidBody.
const colliderDesc = RAPIER.ColliderDesc.capsule(0.5, 0.4);
const heroCollider = world.createCollider(colliderDesc, heroRb);

let offset = 0.01;
// Create the controller.
let characterController = world.createCharacterController(offset);
characterController.computeColliderMovement(
  heroCollider, // The collider we would like to move.
  {
    x: 0,
    y: 0,
    z: 0,
  }
  //   desiredTranslation // The movement we would like to apply if there wasn’t any obstacle.
);
// Read the result.

export { world, gravity, heroRb, characterController };
