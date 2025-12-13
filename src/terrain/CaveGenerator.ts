/**
 * CaveGenerator - Generates caves using 3D Simplex Noise
 * Feature: 002-chunk-terrain-system
 * 
 * Uses threshold-based noise to carve out cave systems.
 */

import {
  CaveConfig,
  DEFAULT_CAVE_CONFIG,
} from '../core/ChunkConstants'
import { NoiseGenerator } from './NoiseGenerator'

/**
 * CaveGenerator creates underground cave systems
 */
export class CaveGenerator {
  public readonly seed: number
  public readonly config: CaveConfig

  private noise: NoiseGenerator

  constructor(seed: number, config: Partial<CaveConfig> = {}) {
    this.seed = seed
    this.config = { ...DEFAULT_CAVE_CONFIG, ...config }
    // Use a different seed offset for caves to avoid correlation with terrain
    this.noise = new NoiseGenerator(seed + 12345)
  }

  /**
   * Determine if a block at the given world position should be carved out
   * @returns true if the block should be air (cave)
   */
  shouldCarve(worldX: number, worldY: number, worldZ: number): boolean {
    // Only generate caves within height range
    if (worldY < this.config.minHeight || worldY > this.config.maxHeight) {
      return false
    }

    // Use 3D noise to determine cave presence
    const noiseValue = this.noise.noise3D(
      worldX * this.config.scale,
      worldY * this.config.scale,
      worldZ * this.config.scale
    )

    // Noise returns -1 to 1, we want caves where noise > threshold
    // Adjust threshold to control cave density
    return noiseValue > this.config.threshold
  }

  /**
   * Get cave density at a position (0-1, for visualization/debugging)
   */
  getCaveDensity(worldX: number, worldY: number, worldZ: number): number {
    const noiseValue = this.noise.noise3D(
      worldX * this.config.scale,
      worldY * this.config.scale,
      worldZ * this.config.scale
    )
    // Map -1..1 to 0..1
    return (noiseValue + 1) / 2
  }
}
