/**
 * EntityManager - Manages all game entities
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { Entity } from './Entity'
import { ICollisionWorld } from '../physics/PhysicsTypes'

/**
 * Manages all entities in the game world
 */
export class EntityManager {
  /** All entities by ID */
  private entities: Map<string, Entity> = new Map()

  /** Entities grouped by chunk for efficient lookup */
  private entitiesByChunk: Map<string, Set<string>> = new Map()

  /** Scene to add entity meshes to */
  private scene: THREE.Scene

  /** Maximum entities per chunk */
  private readonly maxPerChunk: number = 4

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  /**
   * Get chunk key from coordinates
   */
  private getChunkKey(chunkX: number, chunkZ: number): string {
    return `${chunkX},${chunkZ}`
  }

  /**
   * Add an entity to the manager
   */
  add(entity: Entity): boolean {
    if (this.entities.has(entity.id)) {
      console.warn(`Entity ${entity.id} already exists`)
      return false
    }

    // Check chunk limit
    const chunkKey = this.getChunkKey(entity.chunkX, entity.chunkZ)
    const chunkEntities = this.entitiesByChunk.get(chunkKey)
    if (chunkEntities && chunkEntities.size >= this.maxPerChunk) {
      return false // Chunk is full
    }

    // Add to entities map
    this.entities.set(entity.id, entity)

    // Add to chunk map
    if (!this.entitiesByChunk.has(chunkKey)) {
      this.entitiesByChunk.set(chunkKey, new Set())
    }
    this.entitiesByChunk.get(chunkKey)!.add(entity.id)

    // Add mesh to scene
    const mesh = entity.getMesh()
    if (mesh) {
      this.scene.add(mesh)
    }

    return true
  }

  /**
   * Remove an entity from the manager
   */
  remove(entityId: string): boolean {
    const entity = this.entities.get(entityId)
    if (!entity) {
      return false
    }

    // Remove mesh from scene
    const mesh = entity.getMesh()
    if (mesh) {
      this.scene.remove(mesh)
    }

    // Remove from chunk map
    const chunkKey = this.getChunkKey(entity.chunkX, entity.chunkZ)
    const chunkEntities = this.entitiesByChunk.get(chunkKey)
    if (chunkEntities) {
      chunkEntities.delete(entityId)
      if (chunkEntities.size === 0) {
        this.entitiesByChunk.delete(chunkKey)
      }
    }

    // Dispose entity
    entity.dispose()

    // Remove from entities map
    this.entities.delete(entityId)

    return true
  }

  /**
   * Get entity by ID
   */
  get(entityId: string): Entity | undefined {
    return this.entities.get(entityId)
  }

  /**
   * Get all entities in a chunk
   */
  getByChunk(chunkX: number, chunkZ: number): Entity[] {
    const chunkKey = this.getChunkKey(chunkX, chunkZ)
    const entityIds = this.entitiesByChunk.get(chunkKey)
    if (!entityIds) return []

    const entities: Entity[] = []
    for (const id of entityIds) {
      const entity = this.entities.get(id)
      if (entity) {
        entities.push(entity)
      }
    }
    return entities
  }

  /**
   * Get count of entities in a chunk
   */
  getChunkEntityCount(chunkX: number, chunkZ: number): number {
    const chunkKey = this.getChunkKey(chunkX, chunkZ)
    return this.entitiesByChunk.get(chunkKey)?.size ?? 0
  }

  /**
   * Check if chunk can accept more entities
   */
  canSpawnInChunk(chunkX: number, chunkZ: number): boolean {
    return this.getChunkEntityCount(chunkX, chunkZ) < this.maxPerChunk
  }

  /**
   * Update all entities
   */
  update(deltaTime: number, playerPosition: THREE.Vector3, world?: ICollisionWorld): void {
    for (const entity of this.entities.values()) {
      if (!entity.isActive) continue

      // Store old chunk position
      const oldChunkX = entity.chunkX
      const oldChunkZ = entity.chunkZ

      // Update entity with collision world
      entity.update(deltaTime, playerPosition, world)

      // Update chunk coordinates
      entity.updateChunkCoordinates()

      // If chunk changed, update chunk map
      if (entity.chunkX !== oldChunkX || entity.chunkZ !== oldChunkZ) {
        // Remove from old chunk
        const oldChunkKey = this.getChunkKey(oldChunkX, oldChunkZ)
        const oldChunkEntities = this.entitiesByChunk.get(oldChunkKey)
        if (oldChunkEntities) {
          oldChunkEntities.delete(entity.id)
          if (oldChunkEntities.size === 0) {
            this.entitiesByChunk.delete(oldChunkKey)
          }
        }

        // Add to new chunk
        const newChunkKey = this.getChunkKey(entity.chunkX, entity.chunkZ)
        if (!this.entitiesByChunk.has(newChunkKey)) {
          this.entitiesByChunk.set(newChunkKey, new Set())
        }
        this.entitiesByChunk.get(newChunkKey)!.add(entity.id)
      }
    }
  }

  /**
   * Get all entities
   */
  getAll(): Entity[] {
    return Array.from(this.entities.values())
  }

  /**
   * Get total entity count
   */
  getCount(): number {
    return this.entities.size
  }

  /**
   * Remove all entities in a chunk (for chunk unloading)
   */
  removeChunk(chunkX: number, chunkZ: number): void {
    const chunkKey = this.getChunkKey(chunkX, chunkZ)
    const entityIds = this.entitiesByChunk.get(chunkKey)
    if (!entityIds) return

    // Copy IDs to avoid modification during iteration
    const idsToRemove = Array.from(entityIds)
    for (const id of idsToRemove) {
      this.remove(id)
    }
  }

  /**
   * Dispose of all entities
   */
  dispose(): void {
    for (const entity of this.entities.values()) {
      const mesh = entity.getMesh()
      if (mesh) {
        this.scene.remove(mesh)
      }
      entity.dispose()
    }
    this.entities.clear()
    this.entitiesByChunk.clear()
  }
}
