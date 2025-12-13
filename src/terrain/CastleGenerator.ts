/**
 * CastleGenerator - Generates a medieval European castle
 * Feature: 011-ancient-landmarks
 * 
 * Creates a medieval castle with:
 * - Stone walls with battlements
 * - Four corner towers
 * - Main gate with drawbridge area
 * - Interior great hall
 * - Moat surrounding the castle
 */

import { BlockType } from '../core/Block'
import { LandmarkGenerator, BoundingBox } from './LandmarkManager'

/**
 * Castle configuration
 */
export interface CastleConfig {
  centerX: number
  centerZ: number
  baseHeight: number
  wallSize: number        // Wall perimeter size (default: 60)
  wallHeight: number      // Wall height (default: 10)
  wallThickness: number   // Wall thickness (default: 3)
  towerRadius: number     // Tower radius (default: 5)
  towerHeight: number     // Tower height (default: 18)
  gateWidth: number       // Gate opening width (default: 6)
  moatWidth: number       // Moat width (default: 4)
  moatDepth: number       // Moat depth (default: 3)
  hallWidth: number       // Great hall width (default: 20)
  hallDepth: number       // Great hall depth (default: 15)
  hallHeight: number      // Great hall height (default: 10)
}

/**
 * Default castle configuration
 */
export const DEFAULT_CASTLE_CONFIG: CastleConfig = {
  centerX: -70,
  centerZ: -80,
  baseHeight: 64,
  wallSize: 60,
  wallHeight: 10,
  wallThickness: 3,
  towerRadius: 5,
  towerHeight: 18,
  gateWidth: 6,
  moatWidth: 4,
  moatDepth: 3,
  hallWidth: 20,
  hallDepth: 15,
  hallHeight: 10
}

/**
 * CastleGenerator creates a medieval castle with towers and moat
 */
export class CastleGenerator implements LandmarkGenerator {
  public readonly config: CastleConfig

  constructor(config: Partial<CastleConfig> = {}) {
    this.config = { ...DEFAULT_CASTLE_CONFIG, ...config }
  }

  /**
   * Check if world coordinates are within castle bounds (including moat)
   */
  isInBounds(worldX: number, worldZ: number): boolean {
    const relX = Math.abs(worldX - this.config.centerX)
    const relZ = Math.abs(worldZ - this.config.centerZ)
    const halfSize = this.config.wallSize / 2 + this.config.moatWidth + 2
    return relX <= halfSize && relZ <= halfSize
  }

  /**
   * Get bounding box for the castle
   */
  getBoundingBox(): BoundingBox {
    const halfSize = this.config.wallSize / 2 + this.config.moatWidth + 2
    return {
      minX: this.config.centerX - halfSize,
      maxX: this.config.centerX + halfSize,
      minY: this.config.baseHeight - this.config.moatDepth,
      maxY: this.config.baseHeight + this.config.towerHeight,
      minZ: this.config.centerZ - halfSize,
      maxZ: this.config.centerZ + halfSize
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

    // Check moat first (below and at base level)
    const moatBlock = this.getMoatBlock(relX, relY, relZ)
    if (moatBlock !== null) {
      return moatBlock
    }

    // Below base height (not in moat) - not part of castle
    if (relY < 0) {
      return null
    }

    // Above max height
    if (relY > this.config.towerHeight) {
      return null
    }

    // Check if in gate opening
    if (this.isInGate(relX, relY, relZ)) {
      return BlockType.AIR
    }

    // Check corner towers
    const towerBlock = this.getTowerBlock(relX, relY, relZ)
    if (towerBlock !== null) {
      return towerBlock
    }

    // Check great hall
    const hallBlock = this.getGreatHallBlock(relX, relY, relZ)
    if (hallBlock !== null) {
      return hallBlock
    }

    // Check walls
    const wallBlock = this.getWallBlock(relX, relY, relZ)
    if (wallBlock !== null) {
      return wallBlock
    }

    // Inside courtyard - ground level
    if (this.isInCourtyard(relX, relZ)) {
      if (relY === 0) {
        return BlockType.STONE
      }
      return BlockType.AIR
    }

    return null
  }

  /**
   * Get moat block
   */
  private getMoatBlock(relX: number, relY: number, relZ: number): BlockType | null {
    const { wallSize, moatWidth, moatDepth } = this.config
    const halfWall = wallSize / 2

    // Moat is outside the walls
    const distFromWall = Math.max(Math.abs(relX), Math.abs(relZ)) - halfWall

    if (distFromWall > 0 && distFromWall <= moatWidth) {
      // Skip moat at gate (bridge)
      if (this.isOnBridge(relX, relZ)) {
        if (relY >= 0) {
          return BlockType.STONE // Bridge surface
        }
        return null
      }

      // Moat water
      if (relY >= -moatDepth && relY < 0) {
        return BlockType.WATER
      }
    }

    return null
  }

  /**
   * Check if position is on the bridge
   */
  private isOnBridge(relX: number, relZ: number): boolean {
    const { wallSize, gateWidth } = this.config
    const halfWall = wallSize / 2
    const halfGate = gateWidth / 2

    // South bridge
    if (relZ > halfWall && Math.abs(relX) <= halfGate + 1) {
      return true
    }

    return false
  }

  /**
   * Check if position is in the gate opening
   */
  private isInGate(relX: number, relY: number, relZ: number): boolean {
    const { wallSize, wallThickness, gateWidth, wallHeight } = this.config
    const halfWall = wallSize / 2
    const halfGate = gateWidth / 2

    // South gate
    if (relZ >= halfWall - wallThickness && relZ <= halfWall) {
      if (Math.abs(relX) <= halfGate && relY >= 1 && relY <= wallHeight - 2) {
        return true
      }
    }

    return false
  }

  /**
   * Get block for corner towers
   */
  private getTowerBlock(relX: number, relY: number, relZ: number): BlockType | null {
    const { wallSize, towerRadius, towerHeight } = this.config
    const halfWall = wallSize / 2

    // Tower positions at corners
    const towerPositions = [
      { x: halfWall, z: halfWall },
      { x: -halfWall, z: halfWall },
      { x: halfWall, z: -halfWall },
      { x: -halfWall, z: -halfWall }
    ]

    for (const pos of towerPositions) {
      const dx = relX - pos.x
      const dz = relZ - pos.z
      const dist = Math.sqrt(dx * dx + dz * dz)

      if (dist <= towerRadius) {
        // Tower floor
        if (relY === 0) {
          return BlockType.DARK_STONE
        }

        // Tower walls (outer ring)
        if (dist >= towerRadius - 1.5 && relY <= towerHeight) {
          // Battlements at top
          if (relY >= towerHeight - 2) {
            if (relY === towerHeight && Math.floor(dist * 2) % 2 === 0) {
              return BlockType.AIR // Crenellations
            }
            return BlockType.DARK_STONE
          }
          // Window slits
          if (relY % 4 === 0 && dist >= towerRadius - 0.5) {
            return BlockType.AIR
          }
          return BlockType.DARK_STONE
        }

        // Tower interior
        if (dist < towerRadius - 1.5 && relY > 0 && relY < towerHeight - 2) {
          // Spiral staircase
          if (this.isOnStaircase(dx, dz, relY)) {
            return BlockType.STONE
          }
          return BlockType.AIR
        }

        // Tower roof
        if (relY >= towerHeight - 2 && relY <= towerHeight) {
          if (dist <= towerRadius - 1) {
            return BlockType.DARK_STONE
          }
        }
      }
    }

    return null
  }

  /**
   * Check if position is on the spiral staircase
   */
  private isOnStaircase(dx: number, dz: number, y: number): boolean {
    // Spiral staircase in tower center
    const angle = Math.atan2(dz, dx)
    const normalizedAngle = (angle + Math.PI) / (2 * Math.PI) // 0 to 1
    const stairStep = (normalizedAngle * 16 + y) % 4

    const dist = Math.sqrt(dx * dx + dz * dz)
    return dist <= 2 && stairStep < 1
  }

  /**
   * Get block for the great hall
   */
  private getGreatHallBlock(relX: number, relY: number, relZ: number): BlockType | null {
    const { hallWidth, hallDepth, hallHeight } = this.config
    const halfWidth = hallWidth / 2
    const halfDepth = hallDepth / 2

    // Hall is centered in the castle
    if (Math.abs(relX) > halfWidth || Math.abs(relZ) > halfDepth) {
      return null
    }

    // Hall floor
    if (relY === 0) {
      return BlockType.STONE
    }

    // Hall walls
    const isOnWall = Math.abs(relX) >= halfWidth - 1 || Math.abs(relZ) >= halfDepth - 1

    if (isOnWall && relY >= 1 && relY <= hallHeight) {
      // Entrance on south side
      if (relZ >= halfDepth - 1 && Math.abs(relX) <= 2 && relY >= 1 && relY <= 4) {
        return BlockType.AIR
      }
      // Windows
      if (relY >= 3 && relY <= 5 && (Math.abs(relX) === halfWidth - 1 || Math.abs(relZ) === halfDepth - 1)) {
        if ((Math.floor(relX) + Math.floor(relZ)) % 4 === 0) {
          return BlockType.AIR
        }
      }
      return BlockType.DARK_STONE
    }

    // Hall interior
    if (relY >= 1 && relY < hallHeight) {
      // Support pillars
      if (this.isHallPillar(relX, relZ)) {
        return BlockType.DARK_STONE
      }
      // Torches on pillars
      if (this.isTorchPosition(relX, relY, relZ)) {
        return BlockType.TORCH
      }
      return BlockType.AIR
    }

    // Hall roof
    if (relY >= hallHeight && relY <= hallHeight + 2) {
      // Peaked roof
      const roofY = relY - hallHeight
      const roofInset = roofY * 2
      if (Math.abs(relX) <= halfWidth - roofInset && Math.abs(relZ) <= halfDepth) {
        return BlockType.DARK_STONE
      }
    }

    return null
  }

  /**
   * Check if position should have a hall pillar
   */
  private isHallPillar(relX: number, relZ: number): boolean {
    const { hallWidth, hallDepth } = this.config
    const halfWidth = hallWidth / 2 - 3
    const halfDepth = hallDepth / 2 - 3

    // Pillars at regular intervals
    if (Math.abs(relX) <= halfWidth && Math.abs(relZ) <= halfDepth) {
      if (Math.abs(relX) % 5 === 0 && Math.abs(relZ) % 5 === 0) {
        if (Math.abs(relX) > 0 || Math.abs(relZ) > 0) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Check if position should have a torch
   */
  private isTorchPosition(relX: number, relY: number, relZ: number): boolean {
    if (relY !== 3) return false

    const { hallWidth, hallDepth } = this.config
    const halfWidth = hallWidth / 2 - 2
    const halfDepth = hallDepth / 2 - 2

    // Torches near walls
    if (Math.abs(relX) === halfWidth || Math.abs(relZ) === halfDepth) {
      if ((Math.floor(relX) + Math.floor(relZ)) % 6 === 0) {
        return true
      }
    }
    return false
  }

  /**
   * Get block for castle walls
   */
  private getWallBlock(relX: number, relY: number, relZ: number): BlockType | null {
    const { wallSize, wallHeight, wallThickness } = this.config
    const halfWall = wallSize / 2

    if (relY < 0 || relY > wallHeight) {
      return null
    }

    // Check if on any wall
    const onNorthWall = relZ <= -halfWall + wallThickness && relZ >= -halfWall
    const onSouthWall = relZ >= halfWall - wallThickness && relZ <= halfWall
    const onEastWall = relX >= halfWall - wallThickness && relX <= halfWall
    const onWestWall = relX <= -halfWall + wallThickness && relX >= -halfWall

    // Skip corners (handled by towers)
    const inCorner = Math.abs(relX) >= halfWall - this.config.towerRadius &&
                     Math.abs(relZ) >= halfWall - this.config.towerRadius

    if (inCorner) {
      return null
    }

    if (onNorthWall || onSouthWall || onEastWall || onWestWall) {
      // Battlements at top
      if (relY === wallHeight) {
        // Crenellations pattern
        const pos = Math.floor(relX + relZ)
        if (pos % 2 === 0) {
          return BlockType.DARK_STONE
        }
        return BlockType.AIR
      }

      // Wall walkway
      if (relY === wallHeight - 1) {
        return BlockType.DARK_STONE
      }

      // Wall body with mossy stone accents
      if (relY < wallHeight - 1) {
        // Mossy stone at base
        if (relY <= 2) {
          return BlockType.MOSSY_STONE
        }
        return BlockType.DARK_STONE
      }
    }

    return null
  }

  /**
   * Check if position is in the courtyard
   */
  private isInCourtyard(relX: number, relZ: number): boolean {
    const { wallSize, wallThickness } = this.config
    const halfWall = wallSize / 2 - wallThickness

    return Math.abs(relX) < halfWall && Math.abs(relZ) < halfWall
  }
}
