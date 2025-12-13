/**
 * AnimalSpawner - Handles spawning animals in chunks
 * Feature: 008-biome-weather-system
 * Feature: 016-fix-animal-spawning - Fixed animal spawning on ground
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
import { BlockType, isSolid, isTreeLog, isTreeLeaves } from '../core/Block'

/**
 * Maximum depth to scan downward when finding ground
 * Feature: 016-fix-animal-spawning
 */
const MAX_SCAN_DEPTH = 10

/**
 * Extra height above terrain to start scanning (to account for trees)
 * Feature: 016-fix-animal-spawning
 */
const SCAN_START_OFFSET = 15

/**
 * Maximum allowed deviation from theoretical terrain height
 * Prevents spawning in caves or on floating structures
 * Feature: 016-fix-animal-spawning
 */
const MAX_HEIGHT_DEVIATION = 5

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
    
    // Check if ground-level chunks are loaded before attempting spawn
    // Feature: 016-fix-animal-spawning
    // We need chunks at y=0,1,2 to be loaded for proper ground detection
    for (let cy = 0; cy <= 2; cy++) {
      if (!this.world.isChunkLoaded(chunkX, cy, chunkZ)) {
        // Not all chunks loaded yet, try again later
        return
      }
    }
    
    // Mark chunk as processed (all required chunks are now loaded)
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
   * Feature: 016-fix-animal-spawning - Scan downward to find actual ground
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
      
      // Get theoretical terrain height as reference
      const terrainY = this.world.getHeightAt(worldX, worldZ)
      
      if (terrainY < this.config.minY) continue
      
      // Start scanning from above terrain (to account for trees and structures)
      // Feature: 016-fix-animal-spawning
      const scanStartY = Math.min(terrainY + SCAN_START_OFFSET, 127)
      const scanEndY = Math.max(terrainY - MAX_SCAN_DEPTH, 0)
      
      // Scan downward to find actual solid ground
      let groundY = -1
      let foundValidGround = false
      
      for (let y = scanStartY; y >= scanEndY; y--) {
        const block = this.world.getBlock(worldX, y, worldZ)
        
        // US2: If we hit water, this position is invalid for land animals
        if (block === BlockType.WATER) {
          break
        }
        
        // US1: Check if this is valid ground (solid, not tree)
        if (isSolid(block) && !isTreeLog(block) && !isTreeLeaves(block)) {
          groundY = y
          foundValidGround = true
          break
        }
      }
      
      // No valid ground found
      if (!foundValidGround) continue
      
      // Feature: 016-fix-animal-spawning
      // Reject if ground is too far from theoretical terrain (likely a cave or floating structure)
      if (Math.abs(groundY - terrainY) > MAX_HEIGHT_DEVIATION) continue
      
      // US3: Check space above ground (feet and head positions)
      const feetBlock = this.world.getBlock(worldX, groundY + 1, worldZ)
      const headBlock = this.world.getBlock(worldX, groundY + 2, worldZ)
      
      // Feet position must be passable (not solid, not water)
      if (isSolid(feetBlock) || feetBlock === BlockType.WATER) continue
      
      // Head position must be passable (not solid, not water)
      if (isSolid(headBlock) || headBlock === BlockType.WATER) continue
      
      // Return ground level + 1 (top of ground block)
      // Animal Y position will be adjusted in createAnimal based on animal height
      return new THREE.Vector3(worldX + 0.5, groundY + 1, worldZ + 0.5)
    }
    
    return null
  }

  /**
   * Create animal instance
   * @param type - Animal type to create
   * @param x - X position
   * @param groundY - Y position of ground surface (top of ground block)
   * @param z - Z position
   */
  private createAnimal(type: AnimalType, x: number, groundY: number, z: number): Animal | null {
    let animal: Animal | null = null
    
    switch (type) {
      case AnimalType.COW:
        animal = new Cow(x, groundY, z)
        break
      case AnimalType.SHEEP:
        animal = new Sheep(x, groundY, z)
        break
      case AnimalType.PIG:
        animal = new Pig(x, groundY, z)
        break
      case AnimalType.CHICKEN:
        animal = new Chicken(x, groundY, z)
        break
      case AnimalType.RABBIT:
        animal = new Rabbit(x, groundY, z)
        break
      case AnimalType.WOLF:
        animal = new Wolf(x, groundY, z)
        break
      case AnimalType.FOX:
        animal = new Fox(x, groundY, z)
        break
      default:
        return null
    }
    
    // Physics system uses center position, so adjust Y
    // groundY is the top of ground block, feet should be at groundY
    // Physics expects: position.y - height/2 = feet position
    // So: position.y = groundY + height/2
    if (animal) {
      animal.position.y = groundY + animal.height / 2
    }
    
    return animal
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
