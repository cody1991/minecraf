/**
 * LandmarkManager - Manages multiple landmark building generators
 * Feature: 011-ancient-landmarks
 * 
 * Coordinates the generation of ancient landmark buildings:
 * - Pyramid (金字塔)
 * - Forbidden City (故宫)
 * - Castle (城堡)
 */

import { BlockType } from '../core/Block'
import {
  PYRAMID_POSITION,
  FORBIDDEN_CITY_POSITION,
  CASTLE_POSITION,
  LANDMARK_ZONE_RADIUS
} from '../core/ChunkConstants'
import { PyramidGenerator, PyramidConfig } from './PyramidGenerator'
import { ForbiddenCityGenerator, ForbiddenCityConfig } from './ForbiddenCityGenerator'
import { CastleGenerator, CastleConfig } from './CastleGenerator'

/**
 * Base configuration for all landmarks
 */
export interface LandmarkConfig {
  centerX: number
  centerZ: number
  baseHeight: number
}

/**
 * Bounding box for collision detection
 */
export interface BoundingBox {
  minX: number
  maxX: number
  minY: number
  maxY: number
  minZ: number
  maxZ: number
}

/**
 * Interface for landmark generators
 */
export interface LandmarkGenerator {
  getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null
  isInBounds(worldX: number, worldZ: number): boolean
  getBoundingBox(): BoundingBox
}

/**
 * LandmarkManager coordinates multiple landmark generators
 */
export class LandmarkManager {
  private generators: Array<{ name: string; generator: LandmarkGenerator }> = []
  private baseHeight: number

  constructor(baseHeight: number) {
    this.baseHeight = baseHeight
    this.initializeGenerators()
  }

  /**
   * Initialize all landmark generators with default positions
   */
  private initializeGenerators(): void {
    // Pyramid (东侧)
    const pyramidConfig: Partial<PyramidConfig> = {
      centerX: PYRAMID_POSITION.x,
      centerZ: PYRAMID_POSITION.z,
      baseHeight: this.baseHeight
    }
    this.registerGenerator('Pyramid', new PyramidGenerator(pyramidConfig))

    // Forbidden City (西南侧)
    const forbiddenCityConfig: Partial<ForbiddenCityConfig> = {
      centerX: FORBIDDEN_CITY_POSITION.x,
      centerZ: FORBIDDEN_CITY_POSITION.z,
      baseHeight: this.baseHeight
    }
    this.registerGenerator('ForbiddenCity', new ForbiddenCityGenerator(forbiddenCityConfig))

    // Castle (西北侧)
    const castleConfig: Partial<CastleConfig> = {
      centerX: CASTLE_POSITION.x,
      centerZ: CASTLE_POSITION.z,
      baseHeight: this.baseHeight
    }
    this.registerGenerator('Castle', new CastleGenerator(castleConfig))
  }

  /**
   * Register a landmark generator
   */
  registerGenerator(name: string, generator: LandmarkGenerator): void {
    this.generators.push({ name, generator })
  }

  /**
   * Get block at world position (checks all generators in order)
   */
  getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null {
    for (const { generator } of this.generators) {
      const block = generator.getBlockAt(worldX, worldY, worldZ)
      if (block !== null) {
        return block
      }
    }
    return null
  }

  /**
   * Check if position is in any landmark zone
   */
  isInLandmarkZone(worldX: number, worldZ: number): boolean {
    const distFromOrigin = Math.sqrt(worldX * worldX + worldZ * worldZ)
    return distFromOrigin <= LANDMARK_ZONE_RADIUS
  }

  /**
   * Check if position is within any landmark building bounds
   */
  isInAnyLandmark(worldX: number, worldZ: number): boolean {
    for (const { generator } of this.generators) {
      if (generator.isInBounds(worldX, worldZ)) {
        return true
      }
    }
    return false
  }

  /**
   * Get all bounding boxes for collision detection
   */
  getAllBoundingBoxes(): Array<{ name: string; box: BoundingBox }> {
    return this.generators.map(({ name, generator }) => ({
      name,
      box: generator.getBoundingBox()
    }))
  }

  /**
   * Get the landmark zone radius
   */
  getLandmarkZoneRadius(): number {
    return LANDMARK_ZONE_RADIUS
  }
}
