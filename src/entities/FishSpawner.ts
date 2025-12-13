/**
 * FishSpawner - Handles spawning fish in water bodies
 * Feature: 009-ecosystem-flora-fauna
 */

import * as THREE from 'three'
import { EntityManager } from './EntityManager'
import { Fish } from './Fish'
import { FishType } from './FishTypes'
import { CommonFish } from './CommonFish'
import { TropicalFish } from './TropicalFish'
import { BiomeType } from '../terrain/BiomeTypes'
import { World } from '../core/World'
import { BlockType } from '../core/Block'
import { isInSpawnProtectionZone } from '../terrain/SpawnProtection'
import { WATER_LEVEL } from '../core/ChunkConstants'

/**
 * Configuration for fish spawning
 */
export interface FishSpawnConfig {
  maxPerChunk: number
  spawnChance: number  // Chance per water chunk to spawn fish
  minWaterDepth: number // Minimum water depth required
}

const DEFAULT_FISH_SPAWN_CONFIG: FishSpawnConfig = {
  maxPerChunk: 6,
  spawnChance: 0.8,  // 80% chance per water chunk
  minWaterDepth: 1   // Only need 1 block of water
}

/**
 * Fish spawn weights by biome
 */
const FISH_SPAWN_WEIGHTS: Record<BiomeType, Partial<Record<FishType, number>>> = {
  [BiomeType.PLAINS]: {
    [FishType.COMMON]: 4,
    [FishType.TROPICAL]: 1
  },
  [BiomeType.LAKE]: {
    [FishType.COMMON]: 5,
    [FishType.TROPICAL]: 2
  },
  [BiomeType.MOUNTAIN]: {
    [FishType.COMMON]: 3,
    [FishType.TROPICAL]: 0
  }
}

/**
 * Spawns fish in water bodies
 */
export class FishSpawner {
  private entityManager: EntityManager
  private world: World
  private config: FishSpawnConfig
  private spawnedChunks: Set<string> = new Set()

  constructor(entityManager: EntityManager, world: World, config?: Partial<FishSpawnConfig>) {
    this.entityManager = entityManager
    this.world = world
    this.config = { ...DEFAULT_FISH_SPAWN_CONFIG, ...config }
  }

  /**
   * Get chunk key
   */
  private getChunkKey(chunkX: number, chunkZ: number): string {
    return `fish_${chunkX},${chunkZ}`
  }

  /**
   * Try to spawn fish in a chunk
   */
  spawnInChunk(chunkX: number, chunkZ: number): void {
    const chunkKey = this.getChunkKey(chunkX, chunkZ)
    
    // Don't spawn twice in same chunk
    if (this.spawnedChunks.has(chunkKey)) {
      return
    }
    
    // Mark chunk as processed
    this.spawnedChunks.add(chunkKey)
    
    // Check multiple positions in chunk for water
    let hasWater = false
    for (let dx = 0; dx < 16; dx += 4) {
      for (let dz = 0; dz < 16; dz += 4) {
        const worldX = chunkX * 16 + dx
        const worldZ = chunkZ * 16 + dz
        const terrainHeight = this.world.getHeightAt(worldX, worldZ)
        if (terrainHeight < WATER_LEVEL) {
          hasWater = true
          break
        }
      }
      if (hasWater) break
    }
    
    // Skip if no water found in chunk
    if (!hasWater) {
      return
    }
    
    // Get biome at chunk center
    const worldX = chunkX * 16 + 8
    const worldZ = chunkZ * 16 + 8
    const biome = this.world.getBiomeAt(worldX, worldZ)
    
    // Always spawn in lake biome, high chance elsewhere with water
    const spawnChance = biome === BiomeType.LAKE ? 1.0 : this.config.spawnChance
    if (Math.random() > spawnChance) {
      return
    }
    
    // Get spawn weights for this biome
    const weights = FISH_SPAWN_WEIGHTS[biome] || FISH_SPAWN_WEIGHTS[BiomeType.PLAINS]
    
    // Calculate total weight
    const totalWeight = Object.values(weights).reduce((a, b) => a + (b ?? 0), 0)
    if (totalWeight === 0) return
    
    // Determine number of fish to spawn (2-6)
    const count = 2 + Math.floor(Math.random() * this.config.maxPerChunk)
    
    let spawned = 0
    for (let i = 0; i < count; i++) {
      // Find spawn position in water
      const spawnPos = this.findWaterSpawnPosition(chunkX, chunkZ)
      if (!spawnPos) continue
      
      // Select fish type based on weights
      const fishType = this.selectFishType(weights, totalWeight)
      if (fishType === null) continue
      
      // Create and add fish
      const fish = this.createFish(fishType, spawnPos.x, spawnPos.y, spawnPos.z)
      if (fish) {
        if (this.entityManager.add(fish)) {
          spawned++
        }
      }
    }
    
    if (spawned > 0) {
      console.log(`[FishSpawner] Spawned ${spawned} fish in chunk (${chunkX}, ${chunkZ})`)
    }
  }

  /**
   * Select fish type based on weights
   */
  private selectFishType(weights: Partial<Record<FishType, number>>, totalWeight: number): FishType | null {
    let random = Math.random() * totalWeight
    
    for (const [type, weight] of Object.entries(weights)) {
      if (weight === undefined || weight === 0) continue
      random -= weight
      if (random <= 0) {
        return parseInt(type) as FishType
      }
    }
    
    return null
  }

  /**
   * Find a valid spawn position in water
   */
  private findWaterSpawnPosition(chunkX: number, chunkZ: number): THREE.Vector3 | null {
    // Try more random positions
    for (let attempt = 0; attempt < 20; attempt++) {
      const localX = Math.floor(Math.random() * 16)
      const localZ = Math.floor(Math.random() * 16)
      
      const worldX = chunkX * 16 + localX
      const worldZ = chunkZ * 16 + localZ
      
      // Skip spawn protection zone
      if (isInSpawnProtectionZone(worldX, worldZ)) continue
      
      // Get terrain height
      const terrainHeight = this.world.getHeightAt(worldX, worldZ)
      
      // Check if this is underwater
      if (terrainHeight >= WATER_LEVEL) continue
      
      // Calculate water depth
      const waterDepth = WATER_LEVEL - terrainHeight
      if (waterDepth < this.config.minWaterDepth) continue
      
      // Spawn in middle of water column
      const waterY = terrainHeight + 1 + Math.floor(waterDepth / 2)
      
      // Verify there's actually water at this position
      const block = this.world.getBlock(worldX, waterY, worldZ)
      
      if (block !== BlockType.WATER) continue
      
      return new THREE.Vector3(worldX + 0.5, waterY + 0.5, worldZ + 0.5)
    }
    
    return null
  }

  /**
   * Create fish instance
   */
  private createFish(type: FishType, x: number, y: number, z: number): Fish | null {
    switch (type) {
      case FishType.COMMON:
        return new CommonFish(x, y, z)
      case FishType.TROPICAL:
        return new TropicalFish(x, y, z)
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
