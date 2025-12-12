/**
 * ColosseumGenerator - Generates a realistic Roman Colosseum structure
 * Feature: 004-colosseum-spawn-map
 * 
 * Based on the real Roman Colosseum architecture:
 * - 4 levels of facade with arches (levels 0-2) and windows (level 3)
 * - Columns/pillars between each arch
 * - Horizontal entablatures (cornices) between levels
 * - Tiered seating (cavea) inside
 * - Sand arena floor with underground hypogeum hint
 * - Optional ruins effect on one side
 */

import { BlockType } from '../core/Block'

/**
 * Configuration for the Colosseum structure
 */
export interface ColosseumConfig {
  // Ellipse dimensions (outer wall)
  outerRadiusX: number      // Outer semi-major axis
  outerRadiusZ: number      // Outer semi-minor axis
  
  // Wall thickness
  wallThickness: number     // Thickness of the outer wall structure
  
  // Level configuration
  levelCount: number        // Number of levels (default: 4)
  levelHeight: number       // Height of each level (default: 5)
  
  // Arch configuration per level
  archCount: number         // Number of arches around the ellipse
  
  // Arena configuration
  arenaRadiusX: number      // Arena semi-major axis
  arenaRadiusZ: number      // Arena semi-minor axis
  
  // Seating tiers
  tierCount: number         // Number of seating tiers
  
  // Position
  centerX: number
  centerZ: number
  baseHeight: number
  
  // Ruins effect (partial destruction on one side)
  enableRuins: boolean
  ruinsAngleStart: number   // Start angle for ruins (radians)
  ruinsAngleEnd: number     // End angle for ruins (radians)
}

/**
 * Default Colosseum configuration - scaled for Minecraft
 */
export const DEFAULT_COLOSSEUM_CONFIG: ColosseumConfig = {
  // Outer dimensions (~90x70 blocks ellipse)
  outerRadiusX: 45,
  outerRadiusZ: 35,
  
  // Wall structure
  wallThickness: 6,
  
  // 4 levels like the real Colosseum
  levelCount: 4,
  levelHeight: 5,
  
  // 48 arches (scaled from 80)
  archCount: 48,
  
  // Arena floor
  arenaRadiusX: 28,
  arenaRadiusZ: 18,
  
  // Seating
  tierCount: 5,
  
  // Position
  centerX: 0,
  centerZ: 0,
  baseHeight: 64,
  
  // Ruins effect - partial destruction like the real Colosseum
  enableRuins: true,
  ruinsAngleStart: Math.PI * 0.6,   // ~108 degrees
  ruinsAngleEnd: Math.PI * 1.2      // ~216 degrees
}

/**
 * Check if a point is inside an ellipse
 */
export function isInsideEllipse(x: number, z: number, a: number, b: number): boolean {
  if (a <= 0 || b <= 0) return false
  return (x * x) / (a * a) + (z * z) / (b * b) <= 1
}

/**
 * Check if a point is in an elliptical ring
 */
export function isInEllipseRing(
  x: number, z: number,
  innerA: number, innerB: number,
  outerA: number, outerB: number
): boolean {
  return isInsideEllipse(x, z, outerA, outerB) && !isInsideEllipse(x, z, innerA, innerB)
}

/**
 * Get scaled radius for ellipse at given angle
 */
function getEllipseRadius(angle: number, a: number, b: number): number {
  const cosA = Math.cos(angle)
  const sinA = Math.sin(angle)
  return (a * b) / Math.sqrt(b * b * cosA * cosA + a * a * sinA * sinA)
}

/**
 * Normalize angle to [0, 2π)
 */
function normalizeAngle(angle: number): number {
  while (angle < 0) angle += 2 * Math.PI
  while (angle >= 2 * Math.PI) angle -= 2 * Math.PI
  return angle
}

/**
 * ColosseumGenerator creates block data for a realistic Colosseum structure
 */
export class ColosseumGenerator {
  public readonly config: ColosseumConfig
  
  private readonly totalHeight: number
  private readonly archAngleStep: number
  private readonly innerWallRadiusX: number
  private readonly innerWallRadiusZ: number
  private readonly pillarWidth: number
  private readonly archWidth: number

  constructor(config: Partial<ColosseumConfig> = {}) {
    this.config = { ...DEFAULT_COLOSSEUM_CONFIG, ...config }
    
    this.totalHeight = this.config.levelCount * this.config.levelHeight
    this.archAngleStep = (2 * Math.PI) / this.config.archCount
    this.innerWallRadiusX = this.config.outerRadiusX - this.config.wallThickness
    this.innerWallRadiusZ = this.config.outerRadiusZ - this.config.wallThickness
    
    // Calculate pillar and arch widths based on arch count
    // Each arch unit = 1 pillar + 1 arch opening
    // Pillar is about 1/3 of the unit, arch is 2/3
    this.pillarWidth = 0.3
    this.archWidth = 0.7
  }

  /**
   * Check if world coordinates are within the Colosseum bounds
   */
  isInColosseumBounds(worldX: number, worldZ: number): boolean {
    const relX = worldX - this.config.centerX
    const relZ = worldZ - this.config.centerZ
    const maxRadius = Math.max(this.config.outerRadiusX, this.config.outerRadiusZ) + 5
    return Math.abs(relX) <= maxRadius && Math.abs(relZ) <= maxRadius
  }

  /**
   * Check if position is in the ruined section
   */
  private isInRuins(angle: number, relY: number): boolean {
    if (!this.config.enableRuins) return false
    
    const normAngle = normalizeAngle(angle)
    const start = normalizeAngle(this.config.ruinsAngleStart)
    const end = normalizeAngle(this.config.ruinsAngleEnd)
    
    let inRuinsAngle = false
    if (start < end) {
      inRuinsAngle = normAngle >= start && normAngle <= end
    } else {
      inRuinsAngle = normAngle >= start || normAngle <= end
    }
    
    if (!inRuinsAngle) return false
    
    // Ruins affect upper levels more
    // Level 3 (top): 100% destroyed
    // Level 2: 70% destroyed
    // Level 1: 40% destroyed  
    // Level 0: 20% destroyed
    const level = Math.floor(relY / this.config.levelHeight)
    const ruinsThresholds = [0.2, 0.4, 0.7, 1.0]
    const threshold = ruinsThresholds[Math.min(level, 3)] ?? 1.0
    
    // Use angle position within ruins zone to create gradual destruction
    const ruinsWidth = normalizeAngle(end - start)
    let posInRuins: number
    if (start < end) {
      posInRuins = (normAngle - start) / ruinsWidth
    } else {
      if (normAngle >= start) {
        posInRuins = (normAngle - start) / ruinsWidth
      } else {
        posInRuins = (normAngle + 2 * Math.PI - start) / ruinsWidth
      }
    }
    
    // Create jagged edge effect
    const jaggedNoise = Math.sin(normAngle * 10) * 0.1 + Math.sin(normAngle * 23) * 0.05
    const effectiveThreshold = threshold + jaggedNoise
    
    // Center of ruins zone is most destroyed
    const distFromCenter = Math.abs(posInRuins - 0.5) * 2  // 0 at center, 1 at edges
    return (1 - distFromCenter) > (1 - effectiveThreshold)
  }

  /**
   * Get current level (0-indexed) based on relative Y
   */
  private getLevel(relY: number): number {
    if (relY < 0) return -1
    return Math.floor(relY / this.config.levelHeight)
  }

  /**
   * Get position within current level (0 to levelHeight-1)
   */
  private getLevelY(relY: number): number {
    return relY % this.config.levelHeight
  }

  /**
   * Get arch index and position within arch unit
   * Returns: { archIndex, posInUnit } where posInUnit is 0-1
   * posInUnit < pillarWidth = pillar, else = arch opening
   */
  private getArchPosition(angle: number): { archIndex: number; posInUnit: number; isPillar: boolean } {
    const normAngle = normalizeAngle(angle)
    const archIndex = Math.floor(normAngle / this.archAngleStep)
    const posInUnit = (normAngle % this.archAngleStep) / this.archAngleStep
    const isPillar = posInUnit < this.pillarWidth || posInUnit > (1 - this.pillarWidth)
    
    return { archIndex, posInUnit, isPillar }
  }

  /**
   * Check if position is in an arch opening (not pillar, not entablature)
   */
  private isInArchOpening(relX: number, relZ: number, relY: number, level: number): boolean {
    const { levelHeight } = this.config
    const levelY = this.getLevelY(relY)
    
    // Entablature (cornice) at top and bottom of each level
    if (levelY === 0 || levelY >= levelHeight - 1) return false
    
    const angle = Math.atan2(relZ, relX)
    const { isPillar, posInUnit } = this.getArchPosition(angle)
    
    // Pillars are solid
    if (isPillar) return false
    
    // Top level (level 3) has smaller windows instead of full arches
    if (level === 3) {
      // Windows only in middle height of level
      if (levelY < 2 || levelY >= levelHeight - 1) return false
      
      // Windows are narrower - only center of arch unit
      const centerDist = Math.abs(posInUnit - 0.5)
      return centerDist < 0.2
    }
    
    // Levels 0-2 have full arches with semi-circular tops
    const archOpeningHeight = levelHeight - 2  // Leave room for entablature
    
    if (levelY <= archOpeningHeight - 1) {
      // Below arch curve - fully open
      return true
    } else if (levelY === archOpeningHeight) {
      // Semi-circular top - check if within curve
      const centerDist = Math.abs(posInUnit - 0.5) / (this.archWidth / 2)
      return centerDist < 0.8  // Slightly narrower at top
    }
    
    return false
  }

  /**
   * Check if position is in the outer wall structure
   */
  private isInOuterWall(relX: number, relZ: number): boolean {
    const { outerRadiusX, outerRadiusZ } = this.config
    
    return isInEllipseRing(
      relX, relZ,
      this.innerWallRadiusX, this.innerWallRadiusZ,
      outerRadiusX, outerRadiusZ
    )
  }

  /**
   * Get tier index for seating area
   */
  private getTierIndex(relX: number, relZ: number): number {
    const { arenaRadiusX, arenaRadiusZ, tierCount } = this.config
    const tierWidth = (this.innerWallRadiusX - arenaRadiusX) / tierCount
    const tierWidthZ = (this.innerWallRadiusZ - arenaRadiusZ) / tierCount
    
    for (let i = 0; i < tierCount; i++) {
      const innerA = arenaRadiusX + i * tierWidth
      const innerB = arenaRadiusZ + i * tierWidthZ
      const outerA = arenaRadiusX + (i + 1) * tierWidth
      const outerB = arenaRadiusZ + (i + 1) * tierWidthZ
      
      if (isInEllipseRing(relX, relZ, innerA, innerB, outerA, outerB)) {
        return i
      }
    }
    
    return -1
  }

  /**
   * Check if position is in the arena floor
   */
  private isInArena(relX: number, relZ: number): boolean {
    return isInsideEllipse(relX, relZ, this.config.arenaRadiusX, this.config.arenaRadiusZ)
  }

  /**
   * Get the block type at a specific world position
   */
  getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null {
    if (!this.isInColosseumBounds(worldX, worldZ)) {
      return null
    }
    
    const relX = worldX - this.config.centerX
    const relZ = worldZ - this.config.centerZ
    const relY = worldY - this.config.baseHeight
    
    // Below base - let terrain handle
    if (relY < 0) return null
    
    const angle = Math.atan2(relZ, relX)
    
    // Check if in ruined section
    if (this.isInRuins(angle, relY)) {
      return null  // Let terrain show through
    }
    
    // Above structure
    if (relY >= this.totalHeight) {
      // Add merlons/crenellations on top of pillars
      if (relY === this.totalHeight && this.isInOuterWall(relX, relZ)) {
        const { isPillar } = this.getArchPosition(angle)
        if (isPillar) {
          return BlockType.STONE
        }
      }
      return null
    }
    
    const level = this.getLevel(relY)
    const levelY = this.getLevelY(relY)
    
    // ===== OUTER WALL STRUCTURE =====
    if (this.isInOuterWall(relX, relZ)) {
      // Calculate distance from outer edge
      const outerR = getEllipseRadius(angle, this.config.outerRadiusX, this.config.outerRadiusZ)
      const innerR = getEllipseRadius(angle, this.innerWallRadiusX, this.innerWallRadiusZ)
      const currentR = Math.sqrt(relX * relX + relZ * relZ)
      const depthFromOuter = outerR - currentR
      const wallDepth = outerR - innerR
      
      const { isPillar } = this.getArchPosition(angle)
      
      // === Outer facade (first 2 blocks from outside) ===
      if (depthFromOuter <= 2) {
        // Check for arch openings
        if (this.isInArchOpening(relX, relZ, relY, level)) {
          return BlockType.AIR
        }
        
        // Pillars protrude slightly on the outermost layer
        if (isPillar && depthFromOuter <= 1) {
          // Column capital at top of each level (just below entablature)
          if (levelY === this.config.levelHeight - 2) {
            return BlockType.STONE  // Could use different block for capitals
          }
          return BlockType.STONE
        }
        
        // Entablature (horizontal cornice between levels)
        if (levelY === 0 || levelY === this.config.levelHeight - 1) {
          return BlockType.STONE
        }
        
        return BlockType.STONE
      }
      
      // === Inner corridor/gallery space ===
      if (depthFromOuter > 2 && depthFromOuter < wallDepth - 1) {
        // Floor of each level
        if (levelY === 0) {
          return BlockType.STONE
        }
        // Ceiling
        if (levelY === this.config.levelHeight - 1) {
          return BlockType.STONE
        }
        // Support columns inside corridor (every 4th arch position)
        const archPos = this.getArchPosition(angle)
        if (archPos.archIndex % 4 === 0 && archPos.isPillar) {
          if (depthFromOuter > 3 && depthFromOuter < wallDepth - 2) {
            return BlockType.STONE
          }
        }
        // Open corridor space
        return BlockType.AIR
      }
      
      // === Inner wall (facing the arena/seating) ===
      if (depthFromOuter >= wallDepth - 1) {
        // Inner arches for access to seating (fewer than outer)
        if (levelY > 0 && levelY < this.config.levelHeight - 1) {
          const archPos = this.getArchPosition(angle)
          // Arches every 2nd position
          if (archPos.archIndex % 2 === 0 && !archPos.isPillar) {
            const centerDist = Math.abs(archPos.posInUnit - 0.5)
            if (centerDist < 0.25) {
              return BlockType.AIR
            }
          }
        }
        return BlockType.STONE
      }
      
      return BlockType.STONE
    }
    
    // ===== ARENA FLOOR =====
    if (this.isInArena(relX, relZ)) {
      if (relY === 0) {
        return BlockType.SAND
      }
      // Hypogeum hint - some structure below arena level visible
      if (relY === -1) {
        // Create grid pattern for hypogeum
        const gridX = Math.abs(relX) % 6
        const gridZ = Math.abs(relZ) % 6
        if (gridX === 0 || gridZ === 0) {
          return BlockType.STONE
        }
      }
      return BlockType.AIR
    }
    
    // ===== SEATING TIERS (CAVEA) =====
    const tierIndex = this.getTierIndex(relX, relZ)
    if (tierIndex >= 0) {
      // Each tier rises as you go outward
      // Tier height increases progressively
      const tierBaseHeight = tierIndex * 2  // Each tier is 2 blocks higher
      const tierTopHeight = tierBaseHeight + 1
      
      if (relY < tierBaseHeight) {
        // Solid foundation under tier
        return BlockType.STONE
      } else if (relY === tierBaseHeight) {
        // Walking/standing level
        return BlockType.STONE
      } else if (relY === tierTopHeight) {
        // Seat back (creates step effect)
        // Only on the outer edge of each tier
        const { arenaRadiusX, arenaRadiusZ, tierCount } = this.config
        const tierWidth = (this.innerWallRadiusX - arenaRadiusX) / tierCount
        const tierWidthZ = (this.innerWallRadiusZ - arenaRadiusZ) / tierCount
        const outerA = arenaRadiusX + (tierIndex + 1) * tierWidth
        const outerB = arenaRadiusZ + (tierIndex + 1) * tierWidthZ
        const innerA = outerA - 1
        const innerB = outerB - 1
        
        if (isInEllipseRing(relX, relZ, innerA, innerB, outerA, outerB)) {
          return BlockType.STONE
        }
        return BlockType.AIR
      }
      
      // Above tier seating
      return BlockType.AIR
    }
    
    return null
  }

  /**
   * Get the spawn height at the arena center
   */
  getSpawnHeight(): number {
    return this.config.baseHeight + 1
  }

  /**
   * Get the total outer radius of the structure
   */
  getTotalRadius(): number {
    return Math.max(this.config.outerRadiusX, this.config.outerRadiusZ)
  }
}
