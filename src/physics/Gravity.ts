/**
 * Gravity Module
 * Feature: 003-physics-collision
 * Updated: 006-random-terrain-generation - Added water physics
 * 
 * Handles gravity application to physics bodies.
 */

import { IPhysicsBody } from './PhysicsTypes'
import { GRAVITY, TERMINAL_VELOCITY, WATER_TERMINAL_VELOCITY } from './PhysicsConstants'

/** Vertical swim speed when pressing space/shift in water */
const SWIM_VERTICAL_SPEED = 4.0

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
 * Apply water physics to a physics body
 * Handles buoyancy, drag, and swimming controls
 * 
 * @param body - The physics body
 * @param deltaTime - Time elapsed since last frame
 * @param waterGravity - Reduced gravity in water
 * @param buoyancy - Upward buoyancy force
 * @param waterTerminalVelocity - Max speed in water
 * @param swimUp - Whether player is pressing swim up (space)
 * @param swimDown - Whether player is pressing swim down (shift)
 */
export function applyWaterPhysics(
  body: IPhysicsBody,
  deltaTime: number,
  waterGravity: number,
  buoyancy: number,
  waterTerminalVelocity: number = WATER_TERMINAL_VELOCITY,
  swimUp: boolean = false,
  swimDown: boolean = false
): void {
  // Apply swimming controls
  if (swimUp) {
    // Swim upward
    body.velocity.y = SWIM_VERTICAL_SPEED
  } else if (swimDown) {
    // Swim downward
    body.velocity.y = -SWIM_VERTICAL_SPEED
  } else {
    // Apply reduced gravity with slight buoyancy
    // Net effect: slowly sink unless swimming
    const netForce = waterGravity - buoyancy * 0.3 // Slight upward bias
    body.velocity.y -= netForce * deltaTime
    
    // Apply water drag to slow down vertical movement
    body.velocity.y *= (1 - 0.5 * deltaTime)
  }
  
  // Clamp to water terminal velocity
  if (body.velocity.y < -waterTerminalVelocity) {
    body.velocity.y = -waterTerminalVelocity
  }
  if (body.velocity.y > waterTerminalVelocity) {
    body.velocity.y = waterTerminalVelocity
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
