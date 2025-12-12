/**
 * BiomeGenerator - Generates biome types using large-scale noise
 * Feature: 006-random-terrain-generation
 * 
 * Determines biome type at any world position using Simplex noise.
 * Ensures spawn area remains as PLAINS biome.
 */

import { NoiseGenerator } from './NoiseGenerator'
import { BiomeType } from './BiomeTypes'
import { BIOME_SCALE, SPAWN_SAFE_RADIUS } from '../core/ChunkConstants'

/**
 * BiomeGenerator - determines biome type at world coordinates
 */
export class BiomeGenerator {
  private noise: NoiseGenerator
  private readonly biomeScale: number
  private readonly spawnSafeRadius: number

  // Biome cache for performance (key: "x,z")
  private biomeCache: Map<string, BiomeType> = new Map()
  private readonly maxCacheSize = 10000

  constructor(seed: number, biomeScale: number = BIOME_SCALE, spawnSafeRadius: number = SPAWN_SAFE_RADIUS) {
    // Use offset seed to ensure biome noise differs from terrain noise
    this.noise = new NoiseGenerator(seed + 1000)
    this.biomeScale = biomeScale
    this.spawnSafeRadius = spawnSafeRadius
  }

  /**
   * Get biome type at world X,Z coordinates
   */
  getBiomeAt(worldX: number, worldZ: number): BiomeType {
    // Check cache first
    const cacheKey = `${worldX},${worldZ}`
    const cached = this.biomeCache.get(cacheKey)
    if (cached !== undefined) {
      return cached
    }

    // Calculate biome
    const biome = this.calculateBiome(worldX, worldZ)

    // Cache the result
    if (this.biomeCache.size >= this.maxCacheSize) {
      // Clear oldest entries (simple strategy: clear half)
      const keys = Array.from(this.biomeCache.keys())
      for (let i = 0; i < keys.length / 2; i++) {
        this.biomeCache.delete(keys[i]!)
      }
    }
    this.biomeCache.set(cacheKey, biome)

    return biome
  }

  /**
   * Calculate biome type based on noise values
   */
  private calculateBiome(worldX: number, worldZ: number): BiomeType {
    // Spawn safe area - force PLAINS biome near origin
    const distanceFromOrigin = Math.sqrt(worldX * worldX + worldZ * worldZ)
    if (distanceFromOrigin < this.spawnSafeRadius) {
      return BiomeType.PLAINS
    }

    // Sample moisture noise (for lakes)
    const moisture = this.noise.noise2D(
      worldX * this.biomeScale,
      worldZ * this.biomeScale
    )

    // Sample temperature noise (for mountains) - offset to decorrelate
    const temperature = this.noise.noise2D(
      worldX * this.biomeScale + 1000,
      worldZ * this.biomeScale + 1000
    )

    // Determine biome based on noise thresholds
    if (moisture > 0.3) {
      return BiomeType.LAKE
    }
    if (temperature < -0.2) {
      return BiomeType.MOUNTAIN
    }
    return BiomeType.PLAINS
  }

  /**
   * Clear the biome cache
   */
  clearCache(): void {
    this.biomeCache.clear()
  }
}
