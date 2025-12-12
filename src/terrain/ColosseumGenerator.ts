/**
 * ColosseumGenerator - Generates a Roman Colosseum structure at world origin
 * Feature: 004-colosseum-spawn-map
 * 
 * Creates an elliptical arena with tiered seating, arched walls, and corridors.
 */

import { BlockType } from '../core/Block'

/**
 * Configuration for the Colosseum structure
 */
export interface ColosseumConfig {
  // Ellipse dimensions
  arenaRadiusX: number      // Arena semi-major axis (default: 25)
  arenaRadiusZ: number      // Arena semi-minor axis (default: 20)
  
  // Tier configuration
  tierCount: number         // Number of seating tiers (default: 3)
  tierWidth: number         // Width of each tier (default: 5)
  tierHeight: number        // Height increment per tier (default: 1)
  
  // Wall configuration
  wallHeight: number        // Outer wall height (default: 12)
  wallThickness: number     // Outer wall thickness (default: 2)
  
  // Arch configuration
  archCount: number         // Number of arches (default: 24)
  archWidth: number         // Arch width in blocks (default: 3)
  archHeight: number        // Arch height in blocks (default: 4)
  
  // Position
  centerX: number           // Center X coordinate (default: 0)
  centerZ: number           // Center Z coordinate (default: 0)
  baseHeight: number        // Base Y height (default: 64)
}

/**
 * Default Colosseum configuration
 */
export const DEFAULT_COLOSSEUM_CONFIG: ColosseumConfig = {
  // Ellipse dimensions (~80x60 blocks)
  arenaRadiusX: 25,
  arenaRadiusZ: 20,
  
  // Tier configuration
  tierCount: 3,
  tierWidth: 5,
  tierHeight: 1,
  
  // Wall configuration
  wallHeight: 12,
  wallThickness: 2,
  
  // Arch configuration
  archCount: 24,
  archWidth: 3,
  archHeight: 4,
  
  // Position (world origin)
  centerX: 0,
  centerZ: 0,
  baseHeight: 64
}

/**
 * Check if a point is inside an ellipse
 * @param x - X coordinate relative to center
 * @param z - Z coordinate relative to center
 * @param a - Semi-major axis (X radius)
 * @param b - Semi-minor axis (Z radius)
 */
export function isInsideEllipse(x: number, z: number, a: number, b: number): boolean {
  if (a <= 0 || b <= 0) return false
  return (x * x) / (a * a) + (z * z) / (b * b) <= 1
}

/**
 * Check if a point is in an elliptical ring (between inner and outer ellipse)
 */
export function isInEllipseRing(
  x: number, z: number,
  innerA: number, innerB: number,
  outerA: number, outerB: number
): boolean {
  return isInsideEllipse(x, z, outerA, outerB) && !isInsideEllipse(x, z, innerA, innerB)
}

/**
 * ColosseumGenerator creates block data for the Colosseum structure
 */
export class ColosseumGenerator {
  public readonly config: ColosseumConfig
  
  // Computed properties
  private readonly tierEndRadius: number
  private readonly wallInnerRadius: number
  private readonly wallOuterRadius: number
  private readonly totalRadius: number
  private readonly archAngleStep: number

  constructor(config: Partial<ColosseumConfig> = {}) {
    this.config = { ...DEFAULT_COLOSSEUM_CONFIG, ...config }
    
    // Compute derived values
    this.tierEndRadius = this.config.arenaRadiusX + this.config.tierCount * this.config.tierWidth
    this.wallInnerRadius = this.tierEndRadius
    this.wallOuterRadius = this.tierEndRadius + this.config.wallThickness
    this.totalRadius = this.wallOuterRadius + 2 // Extra space for corridor
    this.archAngleStep = (2 * Math.PI) / this.config.archCount
  }

  /**
   * Check if world coordinates are within the Colosseum bounds
   */
  isInColosseumBounds(worldX: number, worldZ: number): boolean {
    const relX = worldX - this.config.centerX
    const relZ = worldZ - this.config.centerZ
    
    // Use a slightly larger bounding box for efficiency
    const maxRadius = this.totalRadius + 5
    return Math.abs(relX) <= maxRadius && Math.abs(relZ) <= maxRadius
  }

  /**
   * Check if position is in the arena floor area
   */
  isInArena(relX: number, relZ: number): boolean {
    return isInsideEllipse(relX, relZ, this.config.arenaRadiusX, this.config.arenaRadiusZ)
  }

  /**
   * Get which tier (0-indexed) a position is in, or -1 if not in any tier
   */
  getTierIndex(relX: number, relZ: number): number {
    const { arenaRadiusX, arenaRadiusZ, tierWidth, tierCount } = this.config
    
    for (let i = 0; i < tierCount; i++) {
      const innerA = arenaRadiusX + i * tierWidth
      const innerB = arenaRadiusZ + i * tierWidth
      const outerA = arenaRadiusX + (i + 1) * tierWidth
      const outerB = arenaRadiusZ + (i + 1) * tierWidth
      
      if (isInEllipseRing(relX, relZ, innerA, innerB, outerA, outerB)) {
        return i
      }
    }
    
    return -1
  }

  /**
   * Check if position is in the outer wall
   */
  isInWall(relX: number, relZ: number): boolean {
    const { arenaRadiusZ } = this.config
    const innerB = arenaRadiusZ + this.config.tierCount * this.config.tierWidth
    const outerB = innerB + this.config.wallThickness
    
    return isInEllipseRing(
      relX, relZ,
      this.wallInnerRadius, innerB,
      this.wallOuterRadius, outerB
    )
  }

  /**
   * Check if position is in an arch opening
   * @param relX - X relative to center
   * @param relZ - Z relative to center
   * @param relY - Y relative to base height
   */
  isInArch(relX: number, relZ: number, relY: number): boolean {
    const { archHeight, archWidth, archCount } = this.config
    
    // Only check arch area within wall height
    if (relY < 0 || relY >= archHeight) {
      return false
    }
    
    // Calculate angle from center
    const angle = Math.atan2(relZ, relX)
    
    // Check each arch position
    for (let i = 0; i < archCount; i++) {
      const archAngle = i * this.archAngleStep
      let angleDiff = Math.abs(angle - archAngle)
      
      // Handle angle wrap-around
      if (angleDiff > Math.PI) {
        angleDiff = 2 * Math.PI - angleDiff
      }
      
      // Calculate angular width at this radius
      const radius = Math.sqrt(relX * relX + relZ * relZ)
      const angularWidth = archWidth / radius
      
      if (angleDiff < angularWidth / 2) {
        // Check if within arch height (semi-circular top)
        const archCenterY = archHeight - archWidth / 2
        if (relY <= archCenterY) {
          return true // Below arch curve
        } else {
          // Check semi-circular top
          const dy = relY - archCenterY
          const maxDy = archWidth / 2
          if (dy <= maxDy) {
            // Within the curved top portion
            const normalizedDist = dy / maxDy
            const normalizedAngleDist = angleDiff / (angularWidth / 2)
            if (normalizedDist * normalizedDist + normalizedAngleDist * normalizedAngleDist <= 1) {
              return true
            }
          }
        }
      }
    }
    
    return false
  }

  /**
   * Check if position is in the outer corridor
   */
  isInCorridor(relX: number, relZ: number): boolean {
    const { arenaRadiusZ } = this.config
    const wallOuterB = arenaRadiusZ + this.config.tierCount * this.config.tierWidth + this.config.wallThickness
    const corridorOuterB = wallOuterB + 2
    
    return isInEllipseRing(
      relX, relZ,
      this.wallOuterRadius, wallOuterB,
      this.totalRadius, corridorOuterB
    )
  }

  /**
   * Get the block type at a specific world position
   * Returns null if position is outside Colosseum bounds or should use terrain
   */
  getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null {
    // Quick bounds check
    if (!this.isInColosseumBounds(worldX, worldZ)) {
      return null
    }
    
    const relX = worldX - this.config.centerX
    const relZ = worldZ - this.config.centerZ
    const relY = worldY - this.config.baseHeight
    
    // Below base height - let terrain handle it
    if (relY < 0) {
      return null
    }
    
    // Above structure height - air
    if (relY > this.config.wallHeight) {
      // Check if we're in the arena area (should be air above)
      if (this.isInArena(relX, relZ) || this.getTierIndex(relX, relZ) >= 0) {
        return BlockType.AIR
      }
      return null
    }
    
    // Arena floor (sand)
    if (this.isInArena(relX, relZ)) {
      if (relY === 0) {
        return BlockType.SAND
      }
      return BlockType.AIR
    }
    
    // Tiered seating
    const tierIndex = this.getTierIndex(relX, relZ)
    if (tierIndex >= 0) {
      const tierHeight = (tierIndex + 1) * this.config.tierHeight
      if (relY < tierHeight) {
        return BlockType.STONE // Solid stone below tier surface
      } else if (relY === tierHeight) {
        return BlockType.STONE // Tier surface
      }
      return BlockType.AIR // Above tier
    }
    
    // Outer wall
    if (this.isInWall(relX, relZ)) {
      // Check for arch opening
      if (this.isInArch(relX, relZ, relY)) {
        return BlockType.AIR
      }
      return BlockType.STONE
    }
    
    // Corridor
    if (this.isInCorridor(relX, relZ)) {
      if (relY === 0) {
        return BlockType.STONE // Corridor floor
      }
      return BlockType.AIR // Corridor space
    }
    
    // Outside structure
    return null
  }

  /**
   * Get the spawn height at the arena center
   */
  getSpawnHeight(): number {
    return this.config.baseHeight + 1 // One block above the sand floor
  }

  /**
   * Get the total outer radius of the structure
   */
  getTotalRadius(): number {
    return this.totalRadius
  }
}
