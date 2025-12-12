/**
 * TerrainGenerator - Generates terrain using Simplex Noise
 * Feature: 002-chunk-terrain-system
 * Updated: 004-colosseum-spawn-map - Added Colosseum structure generation
 * 
 * Creates natural terrain with hills, valleys, and layered block distribution.
 */

import { BlockType } from '../core/Block'
import {
  CHUNK_SIZE,
  CHUNK_VOLUME,
  TerrainConfig,
  DEFAULT_TERRAIN_CONFIG,
  blockIndex,
} from '../core/ChunkConstants'
import { NoiseGenerator } from './NoiseGenerator'
import { CaveGenerator } from './CaveGenerator'
import { ColosseumGenerator, ColosseumConfig } from './ColosseumGenerator'

/**
 * TerrainGenerator creates chunk block data using noise-based terrain generation
 */
export class TerrainGenerator {
  public readonly seed: number
  public readonly config: TerrainConfig

  private noise: NoiseGenerator
  private caveGenerator: CaveGenerator | null = null
  private colosseumGenerator: ColosseumGenerator | null = null

  // Height cache for performance (key: "x,z")
  private heightCache: Map<string, number> = new Map()
  private readonly maxCacheSize = 10000

  constructor(seed: number, config: Partial<TerrainConfig> = {}) {
    this.seed = seed
    this.config = { ...DEFAULT_TERRAIN_CONFIG, ...config }
    this.noise = new NoiseGenerator(seed)
  }

  /**
   * Enable cave generation
   */
  enableCaves(caveGenerator: CaveGenerator): void {
    this.caveGenerator = caveGenerator
  }

  /**
   * Enable Colosseum structure generation at world origin
   */
  enableColosseum(config?: Partial<ColosseumConfig>): void {
    // Set base height to match terrain at origin
    const baseHeight = this.getHeightAt(0, 0)
    this.colosseumGenerator = new ColosseumGenerator({
      ...config,
      baseHeight
    })
  }

  /**
   * Get the Colosseum generator (if enabled)
   */
  getColosseumGenerator(): ColosseumGenerator | null {
    return this.colosseumGenerator
  }

  /**
   * Generate block data for a chunk
   * @returns Uint8Array of 4096 block types
   */
  generateChunk(cx: number, cy: number, cz: number): Uint8Array {
    const blocks = new Uint8Array(CHUNK_VOLUME)

    // Calculate world offset for this chunk
    const worldOffsetX = cx * CHUNK_SIZE
    const worldOffsetY = cy * CHUNK_SIZE
    const worldOffsetZ = cz * CHUNK_SIZE

    for (let localX = 0; localX < CHUNK_SIZE; localX++) {
      for (let localZ = 0; localZ < CHUNK_SIZE; localZ++) {
        const worldX = worldOffsetX + localX
        const worldZ = worldOffsetZ + localZ

        // Get terrain height at this X,Z position
        const terrainHeight = this.getHeightAt(worldX, worldZ)

        for (let localY = 0; localY < CHUNK_SIZE; localY++) {
          const worldY = worldOffsetY + localY
          const index = blockIndex(localX, localY, localZ)

          // Determine block type based on height
          const blockType = this.getBlockTypeAt(worldX, worldY, worldZ, terrainHeight)
          blocks[index] = blockType
        }
      }
    }

    return blocks
  }

  /**
   * Get terrain height at world X,Z coordinates
   * Uses fractal noise for natural-looking terrain
   */
  getHeightAt(worldX: number, worldZ: number): number {
    // Check cache first
    const cacheKey = `${worldX},${worldZ}`
    const cached = this.heightCache.get(cacheKey)
    if (cached !== undefined) {
      return cached
    }

    // Generate height using fractal noise
    const noiseValue = this.noise.fractal2D(
      worldX * this.config.scale,
      worldZ * this.config.scale,
      this.config.octaves,
      this.config.persistence,
      this.config.lacunarity
    )

    // Map noise (-1 to 1) to height range
    const height = Math.floor(
      this.config.baseHeight + noiseValue * this.config.heightVariation
    )

    // Cache the result
    if (this.heightCache.size >= this.maxCacheSize) {
      // Clear oldest entries (simple strategy: clear half)
      const keys = Array.from(this.heightCache.keys())
      for (let i = 0; i < keys.length / 2; i++) {
        this.heightCache.delete(keys[i]!)
      }
    }
    this.heightCache.set(cacheKey, height)

    return height
  }

  /**
   * Determine block type at a specific world position
   */
  private getBlockTypeAt(
    worldX: number,
    worldY: number,
    worldZ: number,
    terrainHeight: number
  ): BlockType {
    // Check Colosseum structure first (if enabled)
    if (this.colosseumGenerator) {
      const colosseumBlock = this.colosseumGenerator.getBlockAt(worldX, worldY, worldZ)
      if (colosseumBlock !== null) {
        return colosseumBlock
      }
    }

    // Above terrain = air
    if (worldY > terrainHeight) {
      return BlockType.AIR
    }

    // Check for caves (if enabled)
    if (this.caveGenerator && this.caveGenerator.shouldCarve(worldX, worldY, worldZ)) {
      return BlockType.AIR
    }

    // Calculate depth from surface
    const depthFromSurface = terrainHeight - worldY

    // Surface layer = grass
    if (depthFromSurface === 0) {
      return BlockType.GRASS
    }

    // Dirt layer (just below surface)
    if (depthFromSurface <= this.config.dirtDepth) {
      return BlockType.DIRT
    }

    // Everything else = stone
    return BlockType.STONE
  }

  /**
   * Get the minimum terrain height (for spawn calculation)
   */
  getMinHeight(): number {
    return this.config.baseHeight - this.config.heightVariation
  }

  /**
   * Get the maximum terrain height
   */
  getMaxHeight(): number {
    return this.config.baseHeight + this.config.heightVariation
  }

  /**
   * Clear the height cache
   */
  clearCache(): void {
    this.heightCache.clear()
  }
}
