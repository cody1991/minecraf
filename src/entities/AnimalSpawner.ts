/**
 * AnimalSpawner - Handles spawning animals in chunks
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { EntityManager } from './EntityManager'
import { Animal } from './Animal'
import { AnimalType } from './AnimalTypes'
import { Cow } from './Cow'
import { Sheep } from './Sheep'
import { Pig } from './Pig'
import { Chicken } from './Chicken'
import { Rabbit } from './Rabbit'
import { Wolf } from './Wolf'
import { Fox } from './Fox'
import { BiomeType } from '../terrain/BiomeTypes'
import { World } from '../core/World'
import { isInSpawnProtectionZone } from '../terrain/SpawnProtection'

/**
 * Configuration for animal spawning
 */
export interface SpawnConfig {
  maxPerChunk: number
  spawnChance: number  // Chance per chunk to spawn animals
  minY: number         // Minimum Y level for spawning
}

const DEFAULT_SPAWN_CONFIG: SpawnConfig = {
  maxPerChunk: 6,
  spawnChance: 0.25,  // 25% chance per chunk (reduced for less density)
  minY: 1
}

/**
 * Animal spawn weights by biome
 */
const BIOME_SPAWN_WEIGHTS: Record<BiomeType, Partial<Record<AnimalType, number>>> = {
  [BiomeType.PLAINS]: {
    [AnimalType.COW]: 3,
    [AnimalType.SHEEP]: 3,
    [AnimalType.PIG]: 2,
    [AnimalType.CHICKEN]: 2,
    [AnimalType.RABBIT]: 3,  // Rabbits common in plains
    [AnimalType.FOX]: 1      // Foxes less common
  },
  [BiomeType.LAKE]: {
    [AnimalType.COW]: 0,
    [AnimalType.SHEEP]: 0,
    [AnimalType.PIG]: 1,
    [AnimalType.CHICKEN]: 2,
    [AnimalType.RABBIT]: 1
  },
  [BiomeType.MOUNTAIN]: {
    [AnimalType.COW]: 1,
    [AnimalType.SHEEP]: 3,
    [AnimalType.PIG]: 0,
    [AnimalType.CHICKEN]: 1,
    [AnimalType.WOLF]: 3,    // Wolves common in mountains
    [AnimalType.FOX]: 2,     // Foxes in mountains
    [AnimalType.RABBIT]: 1
  }
}

/**
 * Spawns animals in chunks based on biome
 */
export class AnimalSpawner {
  private entityManager: EntityManager
  private world: World
  private config: SpawnConfig
  private spawnedChunks: Set<string> = new Set()

  constructor(entityManager: EntityManager, world: World, config?: Partial<SpawnConfig>) {
    this.entityManager = entityManager
    this.world = world
    this.config = { ...DEFAULT_SPAWN_CONFIG, ...config }
  }

  /**
   * Get chunk key
   */
  private getChunkKey(chunkX: number, chunkZ: number): string {
    return `${chunkX},${chunkZ}`
  }

  /**
   * Try to spawn animals in a chunk
   */
  spawnInChunk(chunkX: number, chunkZ: number): void {
    const chunkKey = this.getChunkKey(chunkX, chunkZ)
    
    // Don't spawn twice in same chunk
    if (this.spawnedChunks.has(chunkKey)) {
      return
    }
    
    // Mark chunk as processed
    this.spawnedChunks.add(chunkKey)
    
    // Random chance to spawn
    if (Math.random() > this.config.spawnChance) {
      return
    }
    
    // Get biome at chunk center
    const worldX = chunkX * 16 + 8
    const worldZ = chunkZ * 16 + 8
    const biome = this.world.getBiomeAt(worldX, worldZ)
    
    // Get spawn weights for this biome
    const weights = BIOME_SPAWN_WEIGHTS[biome] || BIOME_SPAWN_WEIGHTS[BiomeType.PLAINS]
    
    // Calculate total weight
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0)
    if (totalWeight === 0) return
    
    // Determine number of animals to spawn (1-4)
    const count = 1 + Math.floor(Math.random() * this.config.maxPerChunk)
    
    for (let i = 0; i < count; i++) {
      if (!this.entityManager.canSpawnInChunk(chunkX, chunkZ)) {
        break
      }
      
      // Select animal type based on weights
      const animalType = this.selectAnimalType(weights, totalWeight)
      if (animalType === null) continue
      
      // Find spawn position
      const spawnPos = this.findSpawnPosition(chunkX, chunkZ)
      if (!spawnPos) continue
      
      // Create and add animal
      const animal = this.createAnimal(animalType, spawnPos.x, spawnPos.y, spawnPos.z)
      if (animal) {
        this.entityManager.add(animal)
      }
    }
  }

  /**
   * Select animal type based on weights
   */
  private selectAnimalType(weights: Partial<Record<AnimalType, number>>, totalWeight: number): AnimalType | null {
    let random = Math.random() * totalWeight
    
    for (const [type, weight] of Object.entries(weights)) {
      if (weight === undefined) continue
      random -= weight
      if (random <= 0) {
        return parseInt(type) as AnimalType
      }
    }
    
    return null
  }

  /**
   * Find a valid spawn position in chunk
   */
  private findSpawnPosition(chunkX: number, chunkZ: number): THREE.Vector3 | null {
    // Try a few random positions
    for (let attempt = 0; attempt < 5; attempt++) {
      const localX = Math.floor(Math.random() * 16)
      const localZ = Math.floor(Math.random() * 16)
      
      const worldX = chunkX * 16 + localX
      const worldZ = chunkZ * 16 + localZ
      
      // Skip spawn protection zone
      if (isInSpawnProtectionZone(worldX, worldZ)) continue
      
      // Use terrain generator height directly (doesn't require chunk to be loaded)
      const surfaceY = this.world.getHeightAt(worldX, worldZ)
      
      if (surfaceY >= this.config.minY) {
        return new THREE.Vector3(worldX + 0.5, surfaceY + 1, worldZ + 0.5)
      }
    }
    
    return null
  }

  /**
   * Create animal instance
   */
  private createAnimal(type: AnimalType, x: number, y: number, z: number): Animal | null {
    switch (type) {
      case AnimalType.COW:
        return new Cow(x, y, z)
      case AnimalType.SHEEP:
        return new Sheep(x, y, z)
      case AnimalType.PIG:
        return new Pig(x, y, z)
      case AnimalType.CHICKEN:
        return new Chicken(x, y, z)
      case AnimalType.RABBIT:
        return new Rabbit(x, y, z)
      case AnimalType.WOLF:
        return new Wolf(x, y, z)
      case AnimalType.FOX:
        return new Fox(x, y, z)
      default:
        return null
    }
  }

  /**
   * Clear spawned chunks tracking (for chunk unload)
   */
  clearChunk(chunkX: number, chunkZ: number): void {
    const chunkKey = this.getChunkKey(chunkX, chunkZ)
    this.spawnedChunks.delete(chunkKey)
  }

  /**
   * Reset all spawned chunks
   */
  reset(): void {
    this.spawnedChunks.clear()
  }
}
