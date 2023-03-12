import RAPIER from "@dimforge/rapier3d-compat";

await RAPIER.init();

const gravity = { x: 0.0, y: -9.81, z: 0.0 };
const world = new RAPIER.World(gravity);
const groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
world.createCollider(groundColliderDesc);

// Create a dynamic rigid-body.
const heroRbDesc = RAPIER.RigidBodyDesc.dynamic();
heroRbDesc.setTranslation(0.0, 1.0, 0.0);
const heroRb = world.createRigidBody(heroRbDesc);

// Create a cuboid collider attached to the dynamic heroRb.
let colliderDesc = RAPIER.ColliderDesc.capsule(0.5, 0.4);
world.createCollider(colliderDesc, heroRb);

export { world, gravity, heroRb, heroRbDesc };
