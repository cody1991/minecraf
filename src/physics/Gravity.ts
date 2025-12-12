/**
 * Gravity Module
 * Feature: 003-physics-collision
 * 
 * Handles gravity application to physics bodies.
 */

import { IPhysicsBody } from './PhysicsTypes'
import { GRAVITY, TERMINAL_VELOCITY } from './PhysicsConstants'

/**
 * Apply gravity to a physics body
 * Updates the body's vertical velocity based on gravity acceleration
 * 
 * @param body - The physics body to apply gravity to
 * @param deltaTime - Time elapsed since last frame in seconds
 * @param gravity - Gravity acceleration (default: GRAVITY constant)
 */
export function applyGravity(
  body: IPhysicsBody,
  deltaTime: number,
  gravity: number = GRAVITY
): void {
  // Only apply gravity if not grounded
  if (!body.isGrounded) {
    // Apply gravity acceleration: v = v + g * dt
    body.velocity.y -= gravity * deltaTime
    
    // Clamp to terminal velocity
    clampTerminalVelocity(body)
  }
}

/**
 * Clamp the body's falling velocity to terminal velocity
 * 
 * @param body - The physics body to clamp
 * @param terminalVelocity - Maximum falling speed (default: TERMINAL_VELOCITY constant)
 */
export function clampTerminalVelocity(
  body: IPhysicsBody,
  terminalVelocity: number = TERMINAL_VELOCITY
): void {
  // Terminal velocity only applies to downward movement
  if (body.velocity.y < -terminalVelocity) {
    body.velocity.y = -terminalVelocity
  }
}

/**
 * Reset vertical velocity (called when landing)
 * 
 * @param body - The physics body to reset
 */
export function resetVerticalVelocity(body: IPhysicsBody): void {
  if (body.velocity.y < 0) {
    body.velocity.y = 0
  }
}
