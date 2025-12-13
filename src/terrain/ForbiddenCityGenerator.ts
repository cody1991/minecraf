/**
 * ForbiddenCityGenerator - Generates a Chinese Forbidden City style palace
 * Feature: 011-ancient-landmarks
 * 
 * Creates a traditional Chinese palace complex with:
 * - Red brick walls surrounding the compound
 * - Golden roof decorations (GOLD_BLOCK)
 * - Central main hall with symmetrical layout
 * - Accessible courtyards and gates
 */

import { BlockType } from '../core/Block'
import { LandmarkGenerator, BoundingBox } from './LandmarkManager'

/**
 * Forbidden City configuration
 */
export interface ForbiddenCityConfig {
  centerX: number
  centerZ: number
  baseHeight: number
  compoundWidth: number   // Total compound width (default: 60)
  compoundDepth: number   // Total compound depth (default: 80)
  wallHeight: number      // Wall height (default: 6)
  wallThickness: number   // Wall thickness (default: 2)
  mainHallWidth: number   // Main hall width (default: 20)
  mainHallDepth: number   // Main hall depth (default: 15)
  mainHallHeight: number  // Main hall height (default: 12)
  gateWidth: number       // Gate opening width (default: 6)
}

/**
 * Default Forbidden City configuration
 */
export const DEFAULT_FORBIDDEN_CITY_CONFIG: ForbiddenCityConfig = {
  centerX: -70,
  centerZ: 80,
  baseHeight: 64,
  compoundWidth: 60,
  compoundDepth: 80,
  wallHeight: 6,
  wallThickness: 2,
  mainHallWidth: 20,
  mainHallDepth: 15,
  mainHallHeight: 12,
  gateWidth: 6
}

/**
 * ForbiddenCityGenerator creates a Chinese palace complex
 */
export class ForbiddenCityGenerator implements LandmarkGenerator {
  public readonly config: ForbiddenCityConfig

  constructor(config: Partial<ForbiddenCityConfig> = {}) {
    this.config = { ...DEFAULT_FORBIDDEN_CITY_CONFIG, ...config }
  }

  /**
   * Check if world coordinates are within compound bounds
   */
  isInBounds(worldX: number, worldZ: number): boolean {
    const relX = Math.abs(worldX - this.config.centerX)
    const relZ = Math.abs(worldZ - this.config.centerZ)
    const halfWidth = this.config.compoundWidth / 2
    const halfDepth = this.config.compoundDepth / 2
    return relX <= halfWidth && relZ <= halfDepth
  }

  /**
   * Get bounding box for the compound
   */
  getBoundingBox(): BoundingBox {
    const halfWidth = this.config.compoundWidth / 2
    const halfDepth = this.config.compoundDepth / 2
    return {
      minX: this.config.centerX - halfWidth,
      maxX: this.config.centerX + halfWidth,
      minY: this.config.baseHeight,
      maxY: this.config.baseHeight + this.config.mainHallHeight + 5, // Include roof
      minZ: this.config.centerZ - halfDepth,
      maxZ: this.config.centerZ + halfDepth
    }
  }

  /**
   * Get block at world position
   */
  getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null {
    if (!this.isInBounds(worldX, worldZ)) {
      return null
    }

    const relX = worldX - this.config.centerX
    const relY = worldY - this.config.baseHeight
    const relZ = worldZ - this.config.centerZ

    // Below base height - not part of compound
    if (relY < 0) {
      return null
    }

    // Above max height
    const maxHeight = this.config.mainHallHeight + 5
    if (relY > maxHeight) {
      return null
    }

    // Ground floor (stone platform)
    if (relY === 0) {
      return BlockType.STONE
    }

    // Check if in gate opening
    if (this.isInGate(relX, relY, relZ)) {
      return BlockType.AIR
    }

    // Check if in main hall
    const mainHallBlock = this.getMainHallBlock(relX, relY, relZ)
    if (mainHallBlock !== null) {
      return mainHallBlock
    }

    // Check if in side halls
    const sideHallBlock = this.getSideHallBlock(relX, relY, relZ)
    if (sideHallBlock !== null) {
      return sideHallBlock
    }

    // Check if in surrounding wall
    const wallBlock = this.getWallBlock(relX, relY, relZ)
    if (wallBlock !== null) {
      return wallBlock
    }

    // Inside courtyard - air
    if (this.isInCourtyard(relX, relZ) && relY > 0) {
      return BlockType.AIR
    }

    return null
  }

  /**
   * Check if position is in the gate opening
   */
  private isInGate(relX: number, relY: number, relZ: number): boolean {
    const { compoundDepth, wallThickness, gateWidth, wallHeight } = this.config
    const halfDepth = compoundDepth / 2
    const halfGate = gateWidth / 2

    // South gate (main entrance)
    if (relZ >= halfDepth - wallThickness && relZ <= halfDepth) {
      if (Math.abs(relX) <= halfGate && relY >= 1 && relY <= wallHeight - 1) {
        return true
      }
    }

    // North gate (back entrance)
    if (relZ >= -halfDepth && relZ <= -halfDepth + wallThickness) {
      if (Math.abs(relX) <= halfGate && relY >= 1 && relY <= wallHeight - 1) {
        return true
      }
    }

    return false
  }

  /**
   * Get block for the main hall
   */
  private getMainHallBlock(relX: number, relY: number, relZ: number): BlockType | null {
    const { mainHallWidth, mainHallDepth, mainHallHeight } = this.config
    const halfWidth = mainHallWidth / 2
    const halfDepth = mainHallDepth / 2

    // Main hall is centered in the compound
    if (Math.abs(relX) > halfWidth || Math.abs(relZ) > halfDepth) {
      return null
    }

    // Hall floor
    if (relY === 1) {
      return BlockType.SANDSTONE_CARVED // Decorative floor
    }

    // Hall walls
    const isOnWall = Math.abs(relX) >= halfWidth - 1 || Math.abs(relZ) >= halfDepth - 1

    if (isOnWall && relY >= 1 && relY <= mainHallHeight) {
      // Door openings on each side
      if (relY >= 2 && relY <= 4) {
        // South door
        if (relZ >= halfDepth - 1 && Math.abs(relX) <= 2) {
          return BlockType.AIR
        }
        // North door
        if (relZ <= -halfDepth + 1 && Math.abs(relX) <= 2) {
          return BlockType.AIR
        }
      }
      return BlockType.RED_BRICK
    }

    // Hall interior
    if (relY >= 2 && relY < mainHallHeight) {
      // Pillars at corners
      if (this.isPillarPosition(relX, relZ, halfWidth - 2, halfDepth - 2)) {
        return BlockType.RED_BRICK
      }
      return BlockType.AIR
    }

    // Roof - golden tiles
    if (relY >= mainHallHeight && relY <= mainHallHeight + 3) {
      return this.getRoofBlock(relX, relZ, relY - mainHallHeight, halfWidth, halfDepth)
    }

    return null
  }

  /**
   * Get block for side halls
   */
  private getSideHallBlock(relX: number, relY: number, relZ: number): BlockType | null {
    // Two side halls on east and west
    const sideHallWidth = 10
    const sideHallDepth = 12
    const sideHallHeight = 8
    const sideOffset = 20 // Distance from center

    // Check east side hall
    const eastBlock = this.getSingleSideHall(
      relX - sideOffset, relY, relZ,
      sideHallWidth, sideHallDepth, sideHallHeight
    )
    if (eastBlock !== null) return eastBlock

    // Check west side hall
    const westBlock = this.getSingleSideHall(
      relX + sideOffset, relY, relZ,
      sideHallWidth, sideHallDepth, sideHallHeight
    )
    if (westBlock !== null) return westBlock

    return null
  }

  /**
   * Get block for a single side hall
   */
  private getSingleSideHall(
    relX: number, relY: number, relZ: number,
    width: number, depth: number, height: number
  ): BlockType | null {
    const halfWidth = width / 2
    const halfDepth = depth / 2

    if (Math.abs(relX) > halfWidth || Math.abs(relZ) > halfDepth) {
      return null
    }

    // Floor
    if (relY === 1) {
      return BlockType.STONE
    }

    // Walls
    const isOnWall = Math.abs(relX) >= halfWidth - 1 || Math.abs(relZ) >= halfDepth - 1

    if (isOnWall && relY >= 1 && relY <= height) {
      // Door on the side facing center
      if (relY >= 2 && relY <= 4 && Math.abs(relZ) <= 1) {
        if (Math.abs(relX) >= halfWidth - 1) {
          return BlockType.AIR
        }
      }
      return BlockType.RED_BRICK
    }

    // Interior
    if (relY >= 2 && relY < height) {
      return BlockType.AIR
    }

    // Roof
    if (relY >= height && relY <= height + 2) {
      return this.getRoofBlock(relX, relZ, relY - height, halfWidth, halfDepth)
    }

    return null
  }

  /**
   * Get roof block with traditional Chinese style
   */
  private getRoofBlock(
    relX: number, relZ: number, roofY: number,
    halfWidth: number, halfDepth: number
  ): BlockType | null {
    // Sloped roof - narrower at top
    const roofInset = roofY * 2
    const roofHalfWidth = halfWidth + 2 - roofInset
    const roofHalfDepth = halfDepth + 2 - roofInset

    if (roofHalfWidth <= 0 || roofHalfDepth <= 0) {
      return null
    }

    if (Math.abs(relX) <= roofHalfWidth && Math.abs(relZ) <= roofHalfDepth) {
      // Golden roof tiles
      return BlockType.GOLD_BLOCK
    }

    return null
  }

  /**
   * Get block for surrounding wall
   */
  private getWallBlock(relX: number, relY: number, relZ: number): BlockType | null {
    const { compoundWidth, compoundDepth, wallHeight, wallThickness } = this.config
    const halfWidth = compoundWidth / 2
    const halfDepth = compoundDepth / 2

    if (relY < 1 || relY > wallHeight) {
      return null
    }

    // Check if on any wall
    const onNorthWall = relZ <= -halfDepth + wallThickness && relZ >= -halfDepth
    const onSouthWall = relZ >= halfDepth - wallThickness && relZ <= halfDepth
    const onEastWall = relX >= halfWidth - wallThickness && relX <= halfWidth
    const onWestWall = relX <= -halfWidth + wallThickness && relX >= -halfWidth

    if (onNorthWall || onSouthWall || onEastWall || onWestWall) {
      // Wall top decoration
      if (relY === wallHeight) {
        return BlockType.GOLD_BLOCK
      }
      return BlockType.RED_BRICK
    }

    return null
  }

  /**
   * Check if position is in the courtyard (inside walls, outside buildings)
   */
  private isInCourtyard(relX: number, relZ: number): boolean {
    const { compoundWidth, compoundDepth, wallThickness } = this.config
    const halfWidth = compoundWidth / 2 - wallThickness
    const halfDepth = compoundDepth / 2 - wallThickness

    return Math.abs(relX) < halfWidth && Math.abs(relZ) < halfDepth
  }

  /**
   * Check if position should have a pillar
   */
  private isPillarPosition(relX: number, relZ: number, maxX: number, maxZ: number): boolean {
    // Pillars at corners of the interior
    const pillarSpacing = 4
    const xMod = Math.abs(relX) % pillarSpacing
    const zMod = Math.abs(relZ) % pillarSpacing

    if (xMod === 0 && zMod === 0) {
      if (Math.abs(relX) <= maxX && Math.abs(relZ) <= maxZ) {
        return true
      }
    }

    return false
  }
}
