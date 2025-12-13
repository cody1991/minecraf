/**
 * Entity - Base class for all game entities
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { ICollisionWorld } from '../physics/PhysicsTypes'

/**
 * Base entity class for all game entities (animals, etc.)
 */
export abstract class Entity {
  /** Unique identifier */
  readonly id: string

  /** World position */
  position: THREE.Vector3

  /** Y-axis rotation in radians */
  rotation: number

  /** Chunk X coordinate */
  chunkX: number

  /** Chunk Z coordinate */
  chunkZ: number

  /** Whether entity is active */
  isActive: boolean = true

  constructor(id: string, x: number, y: number, z: number) {
    this.id = id
    this.position = new THREE.Vector3(x, y, z)
    this.rotation = 0
    this.chunkX = Math.floor(x / 16)
    this.chunkZ = Math.floor(z / 16)
  }

  /**
   * Update entity state
   * @param deltaTime Time since last update in seconds
   * @param playerPosition Current player position
   * @param world Collision world for physics
   */
  abstract update(deltaTime: number, playerPosition: THREE.Vector3, world?: ICollisionWorld): void

  /**
   * Get the 3D mesh for this entity
   */
  abstract getMesh(): THREE.Object3D | null

  /**
   * Update chunk coordinates based on current position
   */
  updateChunkCoordinates(): void {
    this.chunkX = Math.floor(this.position.x / 16)
    this.chunkZ = Math.floor(this.position.z / 16)
  }

  /**
   * Get distance to a point
   */
  distanceTo(point: THREE.Vector3): number {
    return this.position.distanceTo(point)
  }

  /**
   * Get horizontal distance to a point (ignoring Y)
   */
  horizontalDistanceTo(point: THREE.Vector3): number {
    const dx = this.position.x - point.x
    const dz = this.position.z - point.z
    return Math.sqrt(dx * dx + dz * dz)
  }

  /**
   * Dispose of entity resources
   */
  abstract dispose(): void
}

/**
 * Generate a unique entity ID
 */
let entityIdCounter = 0
export function generateEntityId(): string {
  return `entity_${Date.now()}_${entityIdCounter++}`
}
