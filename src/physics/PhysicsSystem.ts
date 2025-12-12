/**
 * Physics System
 * Feature: 003-physics-collision
 * 
 * Main physics system that coordinates gravity, collision detection,
 * and movement resolution for physics bodies.
 */

import { IPhysicsBody, ICollisionWorld } from './PhysicsTypes'
import { PhysicsConfig, DEFAULT_PHYSICS_CONFIG, WORLD_MIN_Y } from './PhysicsConstants'
import { applyGravity, resetVerticalVelocity } from './Gravity'
import { checkGrounded, resolveYCollision, resolveXCollision, resolveZCollision } from './Collision'

/**
 * Physics System class
 * Manages physics simulation for game entities
 */
export class PhysicsSystem {
  private config: PhysicsConfig

  constructor(config: Partial<PhysicsConfig> = {}) {
    this.config = { ...DEFAULT_PHYSICS_CONFIG, ...config }
  }

  /**
   * Update physics for a body
   * Call this once per frame for each physics body
   * 
   * @param body - The physics body to update
   * @param world - The collision world for queries
   * @param deltaTime - Time elapsed since last frame in seconds
   */
  update(body: IPhysicsBody, world: ICollisionWorld, deltaTime: number): void {
    // Step 1: Apply gravity
    applyGravity(body, deltaTime, this.config.gravity)

    // Step 2: Calculate movement from velocity
    const deltaX = body.velocity.x * deltaTime
    const deltaY = body.velocity.y * deltaTime
    const deltaZ = body.velocity.z * deltaTime

    // Step 3: Resolve collisions in Y → X → Z order
    // Y first (gravity/jump) to determine grounded state
    const yResult = resolveYCollision(body, world, deltaY)
    body.position.y = yResult.newPosition
    body.velocity.y = yResult.newVelocity

    // X axis
    const xResult = resolveXCollision(body, world, deltaX)
    body.position.x = xResult.newPosition
    body.velocity.x = xResult.newVelocity

    // Z axis
    const zResult = resolveZCollision(body, world, deltaZ)
    body.position.z = zResult.newPosition
    body.velocity.z = zResult.newVelocity

    // Step 4: Update grounded state
    body.isGrounded = checkGrounded(body, world)

    // Step 5: Handle world bottom boundary
    this.handleWorldBoundary(body)

    // Step 6: Reset vertical velocity if grounded and falling
    if (body.isGrounded && body.velocity.y < 0) {
      resetVerticalVelocity(body)
    }
  }

  /**
   * Apply jump impulse to a body
   * Only succeeds if the body is grounded
   * 
   * @param body - The physics body to apply jump to
   * @returns true if jump was applied, false if not grounded
   */
  applyJump(body: IPhysicsBody): boolean {
    if (!body.isGrounded) {
      return false
    }

    body.velocity.y = this.config.jumpVelocity
    body.isGrounded = false
    return true
  }

  /**
   * Check if a body is grounded
   * 
   * @param body - The physics body to check
   * @param world - The collision world for queries
   * @returns true if grounded
   */
  checkGrounded(body: IPhysicsBody, world: ICollisionWorld): boolean {
    return checkGrounded(body, world)
  }

  /**
   * Handle world bottom boundary
   * Prevents player from falling below minimum Y
   */
  private handleWorldBoundary(body: IPhysicsBody): void {
    const halfHeight = body.height / 2
    const minY = WORLD_MIN_Y + halfHeight

    if (body.position.y < minY) {
      body.position.y = minY
      body.velocity.y = 0
    }
  }

  /**
   * Get current physics configuration
   */
  getConfig(): PhysicsConfig {
    return { ...this.config }
  }

  /**
   * Update physics configuration
   */
  setConfig(config: Partial<PhysicsConfig>): void {
    this.config = { ...this.config, ...config }
  }
}
