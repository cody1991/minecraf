/**
 * PyramidGenerator - Generates an Egyptian-style pyramid with explorable interior
 * Feature: 011-ancient-landmarks
 * 
 * Creates a classic pyramid structure with:
 * - 4-sided pyramid exterior made of sandstone
 * - Entrance on the north side
 * - Internal maze with rooms and corridors
 * - Torch lighting on main paths
 */

import { BlockType } from '../core/Block'
import { LandmarkGenerator, BoundingBox } from './LandmarkManager'

/**
 * Pyramid configuration
 */
export interface PyramidConfig {
  centerX: number
  centerZ: number
  baseHeight: number
  baseSize: number      // Base edge length (default: 50)
  height: number        // Pyramid height (default: 35)
  entranceSide: 'north' | 'south' | 'east' | 'west'
  corridorWidth: number // Corridor width (default: 3)
  roomCount: number     // Number of rooms (default: 4)
  deadEndCount: number  // Number of dead ends (default: 3)
  torchSpacing: number  // Torch spacing (default: 5)
}

/**
 * Room definition for pyramid interior
 */
export interface PyramidRoom {
  id: string
  name: string
  minX: number  // Relative to pyramid center
  maxX: number
  minY: number  // Relative to baseHeight
  maxY: number
  minZ: number
  maxZ: number
  type: 'entrance' | 'corridor' | 'chamber' | 'treasure' | 'tomb'
}

/**
 * Corridor definition connecting rooms
 */
export interface PyramidCorridor {
  id: string
  fromRoom: string
  toRoom: string | null  // null = dead end
  segments: Array<{ x1: number; y1: number; z1: number; x2: number; y2: number; z2: number }>
  hasTorches: boolean
}

/**
 * Default pyramid configuration
 */
export const DEFAULT_PYRAMID_CONFIG: PyramidConfig = {
  centerX: 100,
  centerZ: 0,
  baseHeight: 64,
  baseSize: 50,
  height: 35,
  entranceSide: 'north',
  corridorWidth: 3,
  roomCount: 4,
  deadEndCount: 3,
  torchSpacing: 5
}

/**
 * Predefined pyramid interior layout
 */
const PYRAMID_ROOMS: PyramidRoom[] = [
  // Entrance hall - at north side, ground level
  { id: 'entrance', name: '入口厅', type: 'entrance', minX: -3, maxX: 3, minY: 1, maxY: 5, minZ: -22, maxZ: -16 },
  // Descending corridor area
  { id: 'descending', name: '下降走廊', type: 'corridor', minX: -2, maxX: 2, minY: 1, maxY: 4, minZ: -15, maxZ: -8 },
  // Grand gallery - larger central space
  { id: 'grand_gallery', name: '大走廊', type: 'chamber', minX: -4, maxX: 4, minY: 1, maxY: 8, minZ: -7, maxZ: 3 },
  // Treasure room - side chamber
  { id: 'treasure', name: '宝藏室', type: 'treasure', minX: 6, maxX: 12, minY: 1, maxY: 5, minZ: -5, maxZ: 1 },
  // Tomb chamber - final destination
  { id: 'tomb', name: '墓室', type: 'tomb', minX: -5, maxX: 5, minY: 1, maxY: 7, minZ: 5, maxZ: 15 }
]

/**
 * Predefined corridors connecting rooms
 */
const PYRAMID_CORRIDORS: PyramidCorridor[] = [
  // Main path: entrance -> descending
  {
    id: 'main_1',
    fromRoom: 'entrance',
    toRoom: 'descending',
    segments: [{ x1: 0, y1: 2, z1: -16, x2: 0, y2: 2, z2: -15 }],
    hasTorches: true
  },
  // Main path: descending -> grand gallery
  {
    id: 'main_2',
    fromRoom: 'descending',
    toRoom: 'grand_gallery',
    segments: [{ x1: 0, y1: 2, z1: -8, x2: 0, y2: 2, z2: -7 }],
    hasTorches: true
  },
  // Main path: grand gallery -> tomb
  {
    id: 'main_3',
    fromRoom: 'grand_gallery',
    toRoom: 'tomb',
    segments: [{ x1: 0, y1: 2, z1: 3, x2: 0, y2: 2, z2: 5 }],
    hasTorches: true
  },
  // Branch: descending -> treasure
  {
    id: 'branch_1',
    fromRoom: 'descending',
    toRoom: 'treasure',
    segments: [
      { x1: 2, y1: 2, z1: -12, x2: 6, y2: 2, z2: -12 },
      { x1: 6, y1: 2, z1: -12, x2: 6, y2: 2, z2: -5 }
    ],
    hasTorches: true
  },
  // Dead end 1: from grand gallery going west
  {
    id: 'dead_1',
    fromRoom: 'grand_gallery',
    toRoom: null,
    segments: [
      { x1: -4, y1: 2, z1: -2, x2: -10, y2: 2, z2: -2 }
    ],
    hasTorches: false
  },
  // Dead end 2: from descending going east
  {
    id: 'dead_2',
    fromRoom: 'descending',
    toRoom: null,
    segments: [
      { x1: 2, y1: 2, z1: -10, x2: 8, y2: 2, z2: -10 },
      { x1: 8, y1: 2, z1: -10, x2: 8, y2: 2, z2: -14 }
    ],
    hasTorches: false
  }
]

/**
 * PyramidGenerator creates a pyramid with explorable interior
 */
export class PyramidGenerator implements LandmarkGenerator {
  public readonly config: PyramidConfig
  private rooms: PyramidRoom[]
  private corridors: PyramidCorridor[]

  constructor(config: Partial<PyramidConfig> = {}) {
    this.config = { ...DEFAULT_PYRAMID_CONFIG, ...config }
    this.rooms = PYRAMID_ROOMS
    this.corridors = PYRAMID_CORRIDORS
  }

  /**
   * Check if world coordinates are within pyramid bounds
   */
  isInBounds(worldX: number, worldZ: number): boolean {
    const relX = Math.abs(worldX - this.config.centerX)
    const relZ = Math.abs(worldZ - this.config.centerZ)
    const halfBase = this.config.baseSize / 2
    return relX <= halfBase && relZ <= halfBase
  }

  /**
   * Get bounding box for the pyramid
   */
  getBoundingBox(): BoundingBox {
    const halfBase = this.config.baseSize / 2
    return {
      minX: this.config.centerX - halfBase,
      maxX: this.config.centerX + halfBase,
      minY: this.config.baseHeight,
      maxY: this.config.baseHeight + this.config.height,
      minZ: this.config.centerZ - halfBase,
      maxZ: this.config.centerZ + halfBase
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

    // Below base height - not part of pyramid
    if (relY < 0) {
      return null
    }

    // Above pyramid height - air
    if (relY >= this.config.height) {
      return null
    }

    // Check if in entrance opening
    if (this.isInEntrance(relX, relY, relZ)) {
      return BlockType.AIR
    }

    // Check if in any room
    const room = this.getRoomAt(relX, relY, relZ)
    if (room) {
      // Room floor
      if (relY === room.minY - 1) {
        return BlockType.SANDSTONE_CARVED
      }
      // Room interior
      return BlockType.AIR
    }

    // Check if in any corridor
    const corridor = this.getCorridorAt(relX, relY, relZ)
    if (corridor) {
      // Check for torch placement
      if (corridor.hasTorches && this.isTorchPosition(relX, relY, relZ)) {
        return BlockType.TORCH
      }
      return BlockType.AIR
    }

    // Check if within pyramid shell
    if (this.isInPyramidShell(relX, relY, relZ)) {
      // Use carved sandstone for decorative elements
      if (this.isDecorativePosition(relX, relY, relZ)) {
        return BlockType.SANDSTONE_CARVED
      }
      return BlockType.SANDSTONE
    }

    return null
  }

  /**
   * Check if position is in the entrance opening
   */
  private isInEntrance(relX: number, relY: number, relZ: number): boolean {
    const { baseSize, corridorWidth } = this.config
    const halfBase = baseSize / 2
    const halfCorridor = corridorWidth / 2

    // North entrance - opening in the pyramid shell
    if (relZ < -halfBase + 3) {
      return false
    }

    // Entrance is at north side, near base
    if (relZ >= -halfBase && relZ <= -halfBase + 3) {
      if (Math.abs(relX) <= halfCorridor && relY >= 1 && relY <= 4) {
        return true
      }
    }

    return false
  }

  /**
   * Get room at position (if any)
   */
  private getRoomAt(relX: number, relY: number, relZ: number): PyramidRoom | null {
    for (const room of this.rooms) {
      if (relX >= room.minX && relX <= room.maxX &&
          relY >= room.minY && relY <= room.maxY &&
          relZ >= room.minZ && relZ <= room.maxZ) {
        return room
      }
    }
    return null
  }

  /**
   * Get corridor at position (if any)
   */
  private getCorridorAt(relX: number, relY: number, relZ: number): PyramidCorridor | null {
    const corridorWidth = this.config.corridorWidth
    const halfWidth = Math.floor(corridorWidth / 2)
    const corridorHeight = 4

    for (const corridor of this.corridors) {
      for (const seg of corridor.segments) {
        // Check if point is within corridor segment bounds
        const minX = Math.min(seg.x1, seg.x2) - halfWidth
        const maxX = Math.max(seg.x1, seg.x2) + halfWidth
        const minZ = Math.min(seg.z1, seg.z2) - halfWidth
        const maxZ = Math.max(seg.z1, seg.z2) + halfWidth
        const minY = Math.min(seg.y1, seg.y2)
        const maxY = Math.max(seg.y1, seg.y2) + corridorHeight

        if (relX >= minX && relX <= maxX &&
            relY >= minY && relY <= maxY &&
            relZ >= minZ && relZ <= maxZ) {
          return corridor
        }
      }
    }
    return null
  }

  /**
   * Check if position should have a torch
   */
  private isTorchPosition(relX: number, relY: number, relZ: number): boolean {
    const { torchSpacing } = this.config

    // Torches on walls at regular intervals
    // Only at specific height (eye level)
    if (relY !== 3) {
      return false
    }

    // Check if at wall position with correct spacing
    const xMod = Math.abs(relX) % torchSpacing
    const zMod = Math.abs(relZ) % torchSpacing

    return (xMod === 0 || zMod === 0) && (Math.abs(relX) > 1 || Math.abs(relZ) > 1)
  }

  /**
   * Check if position is within the pyramid shell
   */
  private isInPyramidShell(relX: number, relY: number, relZ: number): boolean {
    const { baseSize, height } = this.config
    const halfBase = baseSize / 2

    // Calculate the pyramid slope
    // At y=0, the edge is at halfBase
    // At y=height, the edge is at 0
    const edgeAtY = halfBase * (1 - relY / height)

    // Check if within pyramid bounds at this height
    if (Math.abs(relX) > edgeAtY || Math.abs(relZ) > edgeAtY) {
      return false
    }

    // Check if on the outer shell (within 2 blocks of edge)
    const innerEdge = edgeAtY - 2
    if (innerEdge <= 0) {
      // Near top, everything is shell
      return true
    }

    // On outer shell if outside inner edge
    if (Math.abs(relX) >= innerEdge || Math.abs(relZ) >= innerEdge) {
      return true
    }

    // Also solid at base level
    if (relY === 0) {
      return true
    }

    return false
  }

  /**
   * Check if position should use decorative sandstone
   */
  private isDecorativePosition(relX: number, relY: number, relZ: number): boolean {
    const { baseSize, height } = this.config
    const halfBase = baseSize / 2
    const edgeAtY = halfBase * (1 - relY / height)

    // Decorative bands every 5 blocks vertically
    if (relY % 5 === 0) {
      return true
    }

    // Corner edges
    const isCorner = Math.abs(Math.abs(relX) - Math.abs(relZ)) < 2
    if (isCorner && Math.abs(relX) >= edgeAtY - 1) {
      return true
    }

    // Entrance frame
    if (relZ < -halfBase + 4 && Math.abs(relX) <= 4 && relY <= 5) {
      if (Math.abs(relX) >= 2 || relY >= 4) {
        return true
      }
    }

    return false
  }
}
