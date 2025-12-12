/**
 * Physics Types
 * Feature: 003-physics-collision
 * 
 * Interface definitions for the physics system.
 */

import * as THREE from 'three'
import { BlockType } from '../core/Block'

/**
 * Interface for entities affected by physics
 */
export interface IPhysicsBody {
  /** Center position of the entity */
  position: THREE.Vector3
  
  /** Velocity vector (blocks per second) */
  velocity: THREE.Vector3
  
  /** Collision box width (X and Z axis) */
  width: number
  
  /** Collision box height (Y axis) */
  height: number
  
  /** Whether the entity is standing on solid ground */
  isGrounded: boolean
}

/**
 * Interface for world collision queries
 */
export interface ICollisionWorld {
  /**
   * Get the block type at world coordinates
   */
  getBlock(x: number, y: number, z: number): BlockType
  
  /**
   * Check if a position is within valid world bounds
   */
  isValidPosition(x: number, y: number, z: number): boolean
}

/**
 * Result of a collision check
 */
export interface CollisionResult {
  /** Whether a collision occurred */
  collided: boolean
  
  /** Collision normal (direction to push entity out) */
  normalX: number
  normalY: number
  normalZ: number
  
  /** Penetration depth */
  penetration: number
  
  /** Position of the colliding block */
  blockX: number
  blockY: number
  blockZ: number
}

/**
 * Axis-specific collision result
 */
export interface AxisCollisionResult {
  /** Whether collision occurred on this axis */
  collided: boolean
  
  /** Adjusted position after collision resolution */
  newPosition: number
  
  /** Adjusted velocity after collision (usually 0 if collided) */
  newVelocity: number
}
