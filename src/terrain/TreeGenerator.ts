/**
 * TreeGenerator - Generates trees on terrain surface
 * Feature: 009-ecosystem-flora-fauna
 */

import { BlockType } from '../core/Block'
import { BiomeType } from './BiomeTypes'
import {
  TreeType,
  TreeConfig,
  TREE_CONFIGS,
  BIOME_TREES,
  getTreeSpawnChance
} from './TreeTypes'
import { isInSpawnProtectionZone } from './SpawnProtection'

/**
 * Minimum spacing between trees (in blocks)
 */
export const MIN_TREE_SPACING = 8

/**
 * Generates trees for terrain chunks
 */
export class TreeGenerator {
  private seed: number
  
  /** Track tree positions for spacing check (chunk-local) */
  private treePositions: Map<string, boolean> = new Map()

  constructor(seed: number) {
    this.seed = seed
  }

  /**
   * Simple seeded random
   */
  private seededRandom(x: number, z: number, offset: number = 0): number {
    const n = Math.sin(x * 12.9898 + z * 78.233 + this.seed * 43758.5453 + offset * 12345.6789) * 43758.5453
    return n - Math.floor(n)
  }

  /**
   * Get position key for tree tracking
   */
  private getPositionKey(x: number, z: number): string {
    return `${x},${z}`
  }

  /**
   * Check if a tree can be placed at this position (spacing check)
   */
  canPlaceTree(worldX: number, worldZ: number): boolean {
    // Check spawn protection zone
    if (isInSpawnProtectionZone(worldX, worldZ)) {
      return false
    }

    // Check spacing with existing trees
    for (let dx = -MIN_TREE_SPACING; dx <= MIN_TREE_SPACING; dx++) {
      for (let dz = -MIN_TREE_SPACING; dz <= MIN_TREE_SPACING; dz++) {
        const key = this.getPositionKey(worldX + dx, worldZ + dz)
        if (this.treePositions.has(key)) {
          return false
        }
      }
    }

    return true
  }

  /**
   * Determine if a tree should spawn at this position
   */
  shouldSpawnTree(worldX: number, worldZ: number, biome: BiomeType): boolean {
    const chance = getTreeSpawnChance(biome)
    return this.seededRandom(worldX, worldZ, 3000) < chance
  }

  /**
   * Get tree type to spawn at position
   */
  getTreeType(worldX: number, worldZ: number, biome: BiomeType): TreeType | null {
    const biomeTrees = BIOME_TREES[biome] || BIOME_TREES[BiomeType.PLAINS]
    
    if (biomeTrees.length === 0) return null

    const totalWeight = biomeTrees.reduce((sum, t) => sum + t.weight, 0)
    if (totalWeight === 0) return null

    let r = this.seededRandom(worldX + 4000, worldZ + 4000) * totalWeight

    for (const tree of biomeTrees) {
      r -= tree.weight
      if (r <= 0) {
        return tree.type
      }
    }

    return biomeTrees[0]?.type ?? null
  }

  /**
   * Get trunk height for a tree
   */
  getTrunkHeight(worldX: number, worldZ: number, config: TreeConfig): number {
    const heightRandom = this.seededRandom(worldX + 5000, worldZ + 5000)
    return config.minTrunkHeight + Math.floor(heightRandom * (config.maxTrunkHeight - config.minTrunkHeight + 1))
  }

  /**
   * Generate tree blocks at position
   * @param worldX World X coordinate
   * @param surfaceY Surface Y coordinate (ground level)
   * @param worldZ World Z coordinate
   * @param treeType Type of tree to generate
   * @param setBlock Callback to set block at position
   */
  generateTree(
    worldX: number,
    surfaceY: number,
    worldZ: number,
    treeType: TreeType,
    setBlock: (x: number, y: number, z: number, type: BlockType) => void
  ): void {
    const config = TREE_CONFIGS[treeType]
    const trunkHeight = this.getTrunkHeight(worldX, worldZ, config)

    // Mark position as having a tree
    this.treePositions.set(this.getPositionKey(worldX, worldZ), true)

    // Generate trunk
    for (let dy = 0; dy < trunkHeight; dy++) {
      setBlock(worldX, surfaceY + dy + 1, worldZ, config.trunkBlock)
    }

    // Generate leaves based on tree type
    const leavesY = surfaceY + trunkHeight + 1
    
    switch (treeType) {
      case TreeType.OAK:
        this.generateOakLeaves(worldX, leavesY, worldZ, config, setBlock)
        break
      case TreeType.BIRCH:
        this.generateBirchLeaves(worldX, leavesY, worldZ, config, setBlock)
        break
      case TreeType.SPRUCE:
        this.generateSpruceLeaves(worldX, leavesY, worldZ, trunkHeight, config, setBlock)
        break
    }
  }

  /**
   * Generate oak tree leaves (spherical pattern)
   */
  private generateOakLeaves(
    worldX: number,
    leavesY: number,
    worldZ: number,
    config: TreeConfig,
    setBlock: (x: number, y: number, z: number, type: BlockType) => void
  ): void {
    const radius = config.leavesRadius

    for (let dy = -1; dy < config.leavesHeight; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          // Spherical shape check
          const dist = Math.sqrt(dx * dx + dy * dy * 0.5 + dz * dz)
          if (dist <= radius + 0.5) {
            // Skip corners for more natural look
            if (Math.abs(dx) === radius && Math.abs(dz) === radius && dy === -1) {
              continue
            }
            setBlock(worldX + dx, leavesY + dy, worldZ + dz, config.leavesBlock)
          }
        }
      }
    }
  }

  /**
   * Generate birch tree leaves (columnar pattern)
   */
  private generateBirchLeaves(
    worldX: number,
    leavesY: number,
    worldZ: number,
    config: TreeConfig,
    setBlock: (x: number, y: number, z: number, type: BlockType) => void
  ): void {
    const radius = config.leavesRadius

    for (let dy = -1; dy < config.leavesHeight; dy++) {
      const layerRadius = dy === config.leavesHeight - 1 ? 1 : radius
      
      for (let dx = -layerRadius; dx <= layerRadius; dx++) {
        for (let dz = -layerRadius; dz <= layerRadius; dz++) {
          // Skip corners
          if (Math.abs(dx) === layerRadius && Math.abs(dz) === layerRadius) {
            continue
          }
          setBlock(worldX + dx, leavesY + dy, worldZ + dz, config.leavesBlock)
        }
      }
    }
  }

  /**
   * Generate spruce tree leaves (conical pattern)
   */
  private generateSpruceLeaves(
    worldX: number,
    leavesY: number,
    worldZ: number,
    _trunkHeight: number,
    config: TreeConfig,
    setBlock: (x: number, y: number, z: number, type: BlockType) => void
  ): void {
    // Spruce has multiple layers of leaves going down the trunk
    const layers = config.leavesHeight
    
    for (let layer = 0; layer < layers; layer++) {
      const y = leavesY - layer
      const radius = Math.min(layer, config.leavesRadius)
      
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          // Diamond shape for each layer
          if (Math.abs(dx) + Math.abs(dz) <= radius) {
            setBlock(worldX + dx, y, worldZ + dz, config.leavesBlock)
          }
        }
      }
    }

    // Top point
    setBlock(worldX, leavesY + 1, worldZ, config.leavesBlock)
  }

  /**
   * Clear tree positions (for chunk unload)
   */
  clearChunk(chunkX: number, chunkZ: number): void {
    const startX = chunkX * 16
    const startZ = chunkZ * 16
    
    for (let x = startX; x < startX + 16; x++) {
      for (let z = startZ; z < startZ + 16; z++) {
        this.treePositions.delete(this.getPositionKey(x, z))
      }
    }
  }

  /**
   * Reset all tree positions
   */
  reset(): void {
    this.treePositions.clear()
  }
}
