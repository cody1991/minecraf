/**
 * TreeTypes - Tree type definitions and configurations
 * Feature: 009-ecosystem-flora-fauna
 */

import { BlockType } from '../core/Block'
import { BiomeType } from './BiomeTypes'

/**
 * Tree type enumeration
 */
export enum TreeType {
  OAK = 0,
  BIRCH = 1,
  SPRUCE = 2
}

/**
 * Tree configuration interface
 */
export interface TreeConfig {
  type: TreeType
  name: string
  nameEn: string
  trunkBlock: BlockType
  leavesBlock: BlockType
  minTrunkHeight: number
  maxTrunkHeight: number
  leavesRadius: number    // Horizontal radius of leaves
  leavesHeight: number    // Vertical height of leaves
}

/**
 * Configuration for each tree type
 */
export const TREE_CONFIGS: Record<TreeType, TreeConfig> = {
  [TreeType.OAK]: {
    type: TreeType.OAK,
    name: '橡树',
    nameEn: 'Oak',
    trunkBlock: BlockType.OAK_LOG,
    leavesBlock: BlockType.OAK_LEAVES,
    minTrunkHeight: 4,
    maxTrunkHeight: 5,
    leavesRadius: 2,
    leavesHeight: 3
  },
  [TreeType.BIRCH]: {
    type: TreeType.BIRCH,
    name: '桦树',
    nameEn: 'Birch',
    trunkBlock: BlockType.BIRCH_LOG,
    leavesBlock: BlockType.BIRCH_LEAVES,
    minTrunkHeight: 5,
    maxTrunkHeight: 6,
    leavesRadius: 2,
    leavesHeight: 2
  },
  [TreeType.SPRUCE]: {
    type: TreeType.SPRUCE,
    name: '云杉',
    nameEn: 'Spruce',
    trunkBlock: BlockType.SPRUCE_LOG,
    leavesBlock: BlockType.SPRUCE_LEAVES,
    minTrunkHeight: 4,
    maxTrunkHeight: 6,
    leavesRadius: 2,
    leavesHeight: 4
  }
}

/**
 * Tree spawn configuration
 */
export interface TreeSpawnConfig {
  type: TreeType
  weight: number
}

/**
 * Tree spawn configurations by biome
 */
export const BIOME_TREES: Record<BiomeType, TreeSpawnConfig[]> = {
  [BiomeType.PLAINS]: [
    { type: TreeType.OAK, weight: 5 },
    { type: TreeType.BIRCH, weight: 2 }
  ],
  [BiomeType.LAKE]: [
    { type: TreeType.OAK, weight: 1 }
  ],
  [BiomeType.MOUNTAIN]: [
    { type: TreeType.SPRUCE, weight: 5 },
    { type: TreeType.OAK, weight: 1 }
  ]
}

/**
 * Get tree spawn chance for a biome (0-1)
 */
export function getTreeSpawnChance(biome: BiomeType): number {
  switch (biome) {
    case BiomeType.PLAINS:
      return 0.02  // 2% chance per valid position
    case BiomeType.LAKE:
      return 0.005 // 0.5% near water
    case BiomeType.MOUNTAIN:
      return 0.015 // 1.5% on mountains
    default:
      return 0.01
  }
}

/**
 * Select a tree type based on weights
 */
export function selectTreeType(trees: TreeSpawnConfig[]): TreeType | null {
  if (trees.length === 0) return null
  
  const totalWeight = trees.reduce((sum, t) => sum + t.weight, 0)
  if (totalWeight === 0) return null
  
  let random = Math.random() * totalWeight
  
  for (const tree of trees) {
    random -= tree.weight
    if (random <= 0) {
      return tree.type
    }
  }
  
  return trees[0]?.type ?? null
}

/**
 * Get tree config by type
 */
export function getTreeConfig(type: TreeType): TreeConfig {
  return TREE_CONFIGS[type]
}
