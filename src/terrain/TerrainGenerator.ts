/**
 * TerrainGenerator - Generates terrain using Simplex Noise
 * Feature: 002-chunk-terrain-system
 * Updated: 004-colosseum-spawn-map - Added Colosseum structure generation
 * Updated: 006-random-terrain-generation - Added biome-based terrain generation
 * 
 * Creates natural terrain with hills, valleys, and layered block distribution.
 * Supports multiple biomes (plains, lakes, mountains) with smooth transitions.
 */

import { BlockType } from '../core/Block'
import {
  CHUNK_SIZE,
  CHUNK_VOLUME,
  TerrainConfig,
  DEFAULT_TERRAIN_CONFIG,
  blockIndex,
  WATER_LEVEL,
  COLOSSEUM_FLAT_RADIUS,
} from '../core/ChunkConstants'
import { NoiseGenerator } from './NoiseGenerator'
import { CaveGenerator } from './CaveGenerator'
import { ColosseumGenerator, ColosseumConfig } from './ColosseumGenerator'
import { BiomeGenerator } from './BiomeGenerator'
import { BIOME_CONFIGS } from './BiomeTypes'
import { PlantGenerator } from './PlantGenerator'

/**
 * TerrainGenerator creates chunk block data using noise-based terrain generation
 */
export class TerrainGenerator {
  public readonly seed: number
  public readonly config: TerrainConfig

  private noise: NoiseGenerator
  private biomeGenerator: BiomeGenerator
  private plantGenerator: PlantGenerator
  private caveGenerator: CaveGenerator | null = null
  private colosseumGenerator: ColosseumGenerator | null = null

  // Height cache for performance (key: "x,z")
  private heightCache: Map<string, number> = new Map()
  private readonly maxCacheSize = 10000

  constructor(seed: number, config: Partial<TerrainConfig> = {}) {
    this.seed = seed
    this.config = { ...DEFAULT_TERRAIN_CONFIG, ...config }
    this.noise = new NoiseGenerator(seed)
    this.biomeGenerator = new BiomeGenerator(seed)
    this.plantGenerator = new PlantGenerator(seed)
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

    // Track surface positions for plant generation
    const surfacePositions: Array<{x: number, z: number, y: number, biome: import('./BiomeTypes').BiomeType, surface: BlockType}> = []

    for (let localX = 0; localX < CHUNK_SIZE; localX++) {
      for (let localZ = 0; localZ < CHUNK_SIZE; localZ++) {
        const worldX = worldOffsetX + localX
        const worldZ = worldOffsetZ + localZ

        // Get terrain height at this X,Z position
        const terrainHeight = this.getHeightAt(worldX, worldZ)
        const biome = this.biomeGenerator.getBiomeAt(worldX, worldZ)

        for (let localY = 0; localY < CHUNK_SIZE; localY++) {
          const worldY = worldOffsetY + localY
          const index = blockIndex(localX, localY, localZ)

          // Determine block type based on height
          const blockType = this.getBlockTypeAt(worldX, worldY, worldZ, terrainHeight)
          blocks[index] = blockType

          // Track surface for plant generation
          if (worldY === terrainHeight && blockType !== BlockType.AIR && blockType !== BlockType.WATER) {
            surfacePositions.push({
              x: localX,
              z: localZ,
              y: localY + 1, // Plant goes above surface
              biome,
              surface: blockType
            })
          }
        }
      }
    }

    // Generate plants on surface
    this.generatePlants(blocks, surfacePositions, worldOffsetX, worldOffsetZ)

    return blocks
  }

  /**
   * Generate plants on tracked surface positions
   */
  private generatePlants(
    blocks: Uint8Array,
    surfaces: Array<{x: number, z: number, y: number, biome: import('./BiomeTypes').BiomeType, surface: BlockType}>,
    worldOffsetX: number,
    worldOffsetZ: number
  ): void {
    for (const pos of surfaces) {
      // Skip if plant position is outside this chunk's Y range
      if (pos.y < 0 || pos.y >= CHUNK_SIZE) continue

      // Skip if not valid surface for plants
      if (!this.plantGenerator.isValidSurface(pos.surface)) continue

      // Calculate actual world coordinates
      const worldX = worldOffsetX + pos.x
      const worldZ = worldOffsetZ + pos.z
      
      // Skip spawn area (Colosseum flat radius)
      const distanceFromOrigin = Math.sqrt(worldX * worldX + worldZ * worldZ)
      if (distanceFromOrigin < COLOSSEUM_FLAT_RADIUS) continue

      // Check if plant should spawn
      if (!this.plantGenerator.shouldSpawnPlant(worldX, worldZ, pos.biome)) continue

      // Get plant type
      const plantType = this.plantGenerator.getPlantType(worldX, worldZ, pos.biome, pos.surface)
      if (!plantType) continue

      // Place plant
      const index = blockIndex(pos.x, pos.y, pos.z)
      
      // Handle cactus (can be multiple blocks tall)
      if (plantType === BlockType.CACTUS) {
        const height = this.plantGenerator.getCactusHeight(worldX, worldZ)
        for (let h = 0; h < height && pos.y + h < CHUNK_SIZE; h++) {
          const cactusIndex = blockIndex(pos.x, pos.y + h, pos.z)
          blocks[cactusIndex] = BlockType.CACTUS
        }
      } else {
        blocks[index] = plantType
      }
    }
  }

  /**
   * Get terrain height at world X,Z coordinates
   * Uses fractal noise for natural-looking terrain
   * Height is adjusted based on biome type
   * Colosseum area uses flat terrain at base height
   */
  getHeightAt(worldX: number, worldZ: number): number {
    // Check cache first
    const cacheKey = `${worldX},${worldZ}`
    const cached = this.heightCache.get(cacheKey)
    if (cached !== undefined) {
      return cached
    }

    // Colosseum protection zone - force flat terrain at base height
    const distanceFromOrigin = Math.sqrt(worldX * worldX + worldZ * worldZ)
    if (distanceFromOrigin < COLOSSEUM_FLAT_RADIUS) {
      // Use fixed base height for flat terrain around Colosseum
      const height = this.config.baseHeight
      this.heightCache.set(cacheKey, height)
      return height
    }

    // Get biome at this position
    const biome = this.biomeGenerator.getBiomeAt(worldX, worldZ)
    const biomeConfig = BIOME_CONFIGS[biome]

    // Adjust base height and variation based on biome
    const adjustedBaseHeight = this.config.baseHeight + biomeConfig.baseHeightOffset
    const adjustedVariation = this.config.heightVariation * biomeConfig.heightVariationScale

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
      adjustedBaseHeight + noiseValue * adjustedVariation
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
   * Includes water generation for areas below water level
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

    // Water generation: below water level and above terrain = water
    if (worldY <= WATER_LEVEL && worldY > terrainHeight) {
      return BlockType.WATER
    }

    // Above terrain = air
    if (worldY > terrainHeight) {
      return BlockType.AIR
    }

    // Check for caves (if enabled)
    if (this.caveGenerator && this.caveGenerator.shouldCarve(worldX, worldY, worldZ)) {
      // If cave is below water level, fill with water instead of air
      if (worldY <= WATER_LEVEL) {
        return BlockType.WATER
      }
      return BlockType.AIR
    }

    // Calculate depth from surface
    const depthFromSurface = terrainHeight - worldY

    // Get biome for surface block type
    const biome = this.biomeGenerator.getBiomeAt(worldX, worldZ)
    const biomeConfig = BIOME_CONFIGS[biome]

    // Surface layer = biome-specific block
    // If underwater, use sand instead of grass
    if (depthFromSurface === 0) {
      if (terrainHeight < WATER_LEVEL) {
        return BlockType.SAND // Underwater floor is sand
      }
      return biomeConfig.surfaceBlock
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
   * Get biome at world coordinates
   */
  getBiomeAt(worldX: number, worldZ: number): import('./BiomeTypes').BiomeType {
    return this.biomeGenerator.getBiomeAt(worldX, worldZ)
  }

  /**
   * Clear the height cache
   */
  clearCache(): void {
    this.heightCache.clear()
  }
}
