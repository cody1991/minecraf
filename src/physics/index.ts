/**
 * Physics Module Exports
 * Feature: 003-physics-collision
 */

// Main system
export { PhysicsSystem } from './PhysicsSystem'

// Types
export type {
  IPhysicsBody,
  ICollisionWorld,
  CollisionResult,
  AxisCollisionResult
} from './PhysicsTypes'

// Constants
export {
  GRAVITY,
  JUMP_VELOCITY,
  TERMINAL_VELOCITY,
  GROUND_CHECK_OFFSET,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  WORLD_MIN_Y,
  WORLD_MAX_Y,
  DEFAULT_PHYSICS_CONFIG
} from './PhysicsConstants'
export type { PhysicsConfig } from './PhysicsConstants'

// AABB utilities
export {
  createAABB,
  createBlockAABB,
  aabbIntersects,
  aabbContains,
  aabbContainsPoint,
  aabbCenter,
  aabbDimensions,
  aabbExpand,
  aabbTranslate,
  aabbPenetration
} from './AABB'
export type { AABB } from './AABB'

// Gravity
export { applyGravity, clampTerminalVelocity, resetVerticalVelocity } from './Gravity'

// Collision
export {
  checkGrounded,
  getBodyAABB,
  resolveYCollision,
  resolveXCollision,
  resolveZCollision
} from './Collision'
