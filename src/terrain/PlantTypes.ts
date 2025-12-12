/**
 * PlantTypes - Plant block properties and biome mappings
 * Feature: 008-biome-weather-system
 */

import { BlockType } from '../core/Block'
import { BiomeType } from './BiomeTypes'

/**
 * Plant block types (subset of BlockType)
 */
export const PLANT_BLOCKS: BlockType[] = [
  BlockType.FLOWER_RED,
  BlockType.FLOWER_YELLOW,
  BlockType.TALL_GRASS,
  BlockType.MUSHROOM_RED,
  BlockType.MUSHROOM_BROWN,
  BlockType.DEAD_BUSH,
  BlockType.CACTUS
]

/**
 * Check if a block type is a plant
 */
export function isPlantBlock(type: BlockType): boolean {
  return PLANT_BLOCKS.includes(type)
}

/**
 * Plant spawn configuration
 */
export interface PlantSpawnConfig {
  type: BlockType
  weight: number         // Spawn weight (higher = more common)
  requiresBase?: BlockType[] // Required base blocks (e.g., cactus needs sand)
}

/**
 * Plant spawn configurations by biome
 */
export const BIOME_PLANTS: Record<BiomeType, PlantSpawnConfig[]> = {
  [BiomeType.PLAINS]: [
    { type: BlockType.TALL_GRASS, weight: 10 },
    { type: BlockType.FLOWER_RED, weight: 2 },
    { type: BlockType.FLOWER_YELLOW, weight: 2 }
  ],
  [BiomeType.LAKE]: [
    { type: BlockType.TALL_GRASS, weight: 3 }
    // Less vegetation near water
  ],
  [BiomeType.MOUNTAIN]: [
    { type: BlockType.TALL_GRASS, weight: 4 },
    { type: BlockType.DEAD_BUSH, weight: 2 }
  ]
}

/**
 * Desert-specific plants (for sand surfaces)
 */
export const DESERT_PLANTS: PlantSpawnConfig[] = [
  { type: BlockType.CACTUS, weight: 2, requiresBase: [BlockType.SAND] },
  { type: BlockType.DEAD_BUSH, weight: 3, requiresBase: [BlockType.SAND] }
]

/**
 * Cave/dark area plants
 */
export const CAVE_PLANTS: PlantSpawnConfig[] = [
  { type: BlockType.MUSHROOM_RED, weight: 1 },
  { type: BlockType.MUSHROOM_BROWN, weight: 1 }
]

/**
 * Get plant spawn chance for a biome (0-1)
 */
export function getPlantSpawnChance(biome: BiomeType): number {
  switch (biome) {
    case BiomeType.PLAINS:
      return 0.15 // 15% chance per surface block
    case BiomeType.LAKE:
      return 0.05 // 5% near water
    case BiomeType.MOUNTAIN:
      return 0.08 // 8% on mountains
    default:
      return 0.1
  }
}

/**
 * Select a plant type based on weights
 */
export function selectPlantType(plants: PlantSpawnConfig[]): BlockType | null {
  if (plants.length === 0) return null
  
  const totalWeight = plants.reduce((sum, p) => sum + p.weight, 0)
  if (totalWeight === 0) return null
  
  let random = Math.random() * totalWeight
  
  for (const plant of plants) {
    random -= plant.weight
    if (random <= 0) {
      return plant.type
    }
  }
  
  return plants[0]?.type ?? null
}
