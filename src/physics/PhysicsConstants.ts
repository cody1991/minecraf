/**
 * Physics Constants
 * Feature: 003-physics-collision
 * 
 * Configuration values for the physics system.
 * Based on Minecraft-style physics parameters.
 */

/**
 * Gravity acceleration in blocks per second squared
 * Approximately 2g for enhanced game feel
 */
export const GRAVITY = 32

/**
 * Jump initial velocity in blocks per second
 * Calculated to achieve ~1.13 blocks jump height
 * Formula: height = v²/(2g) → v = √(2gh) ≈ 8.5 for h=1.13
 */
export const JUMP_VELOCITY = 8.5

/**
 * Maximum falling speed in blocks per second
 * Prevents unrealistic speeds during long falls
 */
export const TERMINAL_VELOCITY = 78

/**
 * Ground check offset in blocks
 * Small tolerance for floating point precision
 */
export const GROUND_CHECK_OFFSET = 0.01

/**
 * Player collision dimensions (from Player.ts)
 */
export const PLAYER_WIDTH = 0.6
export const PLAYER_HEIGHT = 1.8

/**
 * Minimum world Y coordinate
 * Players stop at this height instead of falling infinitely
 */
export const WORLD_MIN_Y = 0

/**
 * Maximum world Y coordinate
 */
export const WORLD_MAX_Y = 256

/**
 * Physics configuration interface
 */
export interface PhysicsConfig {
  gravity: number
  jumpVelocity: number
  terminalVelocity: number
  groundCheckOffset: number
}

/**
 * Default physics configuration
 */
export const DEFAULT_PHYSICS_CONFIG: PhysicsConfig = {
  gravity: GRAVITY,
  jumpVelocity: JUMP_VELOCITY,
  terminalVelocity: TERMINAL_VELOCITY,
  groundCheckOffset: GROUND_CHECK_OFFSET
}
