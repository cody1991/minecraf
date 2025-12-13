/**
 * PlantGenerator - Generates plants on terrain surface
 * Feature: 008-biome-weather-system
 */

import { BlockType } from '../core/Block'
import { BiomeType } from './BiomeTypes'
import {
  BIOME_PLANTS,
  DESERT_PLANTS,
  getPlantSpawnChance
} from './PlantTypes'

/**
 * Generates plants for terrain chunks
 */
export class PlantGenerator {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  /**
   * Simple seeded random
   */
  private seededRandom(x: number, z: number): number {
    const n = Math.sin(x * 12.9898 + z * 78.233 + this.seed * 43758.5453) * 43758.5453
    return n - Math.floor(n)
  }

  /**
   * Determine if a plant should spawn at this position
   */
  shouldSpawnPlant(worldX: number, worldZ: number, biome: BiomeType): boolean {
    const chance = getPlantSpawnChance(biome)
    return this.seededRandom(worldX, worldZ) < chance
  }

  /**
   * Get plant type to spawn at position
   */
  getPlantType(
    worldX: number,
    worldZ: number,
    biome: BiomeType,
    surfaceBlock: BlockType
  ): BlockType | null {
    // Use different seed offset for plant type selection
    const typeRandom = this.seededRandom(worldX + 1000, worldZ + 1000)
    
    // Check for desert/sand surface
    if (surfaceBlock === BlockType.SAND) {
      // Use desert plants
      if (DESERT_PLANTS.length > 0) {
        const totalWeight = DESERT_PLANTS.reduce((sum, p) => sum + p.weight, 0)
        let r = typeRandom * totalWeight
        for (const plant of DESERT_PLANTS) {
          r -= plant.weight
          if (r <= 0) {
            return plant.type
          }
        }
      }
      return null
    }

    // Get biome-specific plants
    const biomePlants = BIOME_PLANTS[biome] || BIOME_PLANTS[BiomeType.PLAINS]
    
    if (biomePlants.length === 0) return null
    
    const totalWeight = biomePlants.reduce((sum, p) => sum + p.weight, 0)
    let r = typeRandom * totalWeight
    
    for (const plant of biomePlants) {
      r -= plant.weight
      if (r <= 0) {
        return plant.type
      }
    }
    
    return biomePlants[0]?.type ?? null
  }

  /**
   * Check if surface block is valid for plants
   */
  isValidSurface(surfaceBlock: BlockType): boolean {
    return surfaceBlock === BlockType.GRASS ||
           surfaceBlock === BlockType.DIRT ||
           surfaceBlock === BlockType.SAND ||
           surfaceBlock === BlockType.STONE
  }

  /**
   * Get cactus height (1-3 blocks)
   */
  getCactusHeight(worldX: number, worldZ: number): number {
    const heightRandom = this.seededRandom(worldX + 2000, worldZ + 2000)
    return 1 + Math.floor(heightRandom * 3) // 1-3 blocks
  }
}
