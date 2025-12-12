import * as THREE from 'three'
import { World } from '../core/World'
import { BlockType } from '../core/Block'

/**
 * Interaction distance in blocks
 */
export const INTERACTION_DISTANCE = 5.0

/**
 * Result of a raycast hit
 */
export interface RaycastHit {
  // Block position that was hit
  blockX: number
  blockY: number
  blockZ: number
  // Block type
  blockType: BlockType
  // Face normal (direction the hit face is pointing)
  faceNormal: THREE.Vector3
  // Distance to hit
  distance: number
}

/**
 * Raycaster - performs ray-block intersection for block interaction
 */
export class Raycaster {
  private world: World
  private readonly stepSize = 0.1 // Ray marching step size

  constructor(world: World) {
    this.world = world
  }

  /**
   * Cast a ray from origin in direction and find first block hit
   */
  cast(
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    maxDistance: number = INTERACTION_DISTANCE
  ): RaycastHit | null {
    // Normalize direction
    const dir = direction.clone().normalize()

    // Ray marching
    let distance = 0
    let lastBlockX = -1
    let lastBlockY = -1
    let lastBlockZ = -1

    while (distance < maxDistance) {
      // Current position along ray
      const x = origin.x + dir.x * distance
      const y = origin.y + dir.y * distance
      const z = origin.z + dir.z * distance

      // Get block at this position
      const blockX = Math.floor(x)
      const blockY = Math.floor(y)
      const blockZ = Math.floor(z)

      // Only check if we moved to a new block
      if (blockX !== lastBlockX || blockY !== lastBlockY || blockZ !== lastBlockZ) {
        const blockType = this.world.getBlock(blockX, blockY, blockZ)

        if (blockType !== BlockType.AIR) {
          // Calculate face normal based on entry direction
          const faceNormal = this.calculateFaceNormal(
            x, y, z,
            blockX, blockY, blockZ
          )

          return {
            blockX,
            blockY,
            blockZ,
            blockType,
            faceNormal,
            distance
          }
        }

        lastBlockX = blockX
        lastBlockY = blockY
        lastBlockZ = blockZ
      }

      distance += this.stepSize
    }

    return null
  }

  /**
   * Calculate which face of the block was hit
   */
  private calculateFaceNormal(
    hitX: number, hitY: number, hitZ: number,
    blockX: number, blockY: number, blockZ: number
  ): THREE.Vector3 {
    // Calculate relative position within block
    const relX = hitX - blockX - 0.5
    const relY = hitY - blockY - 0.5
    const relZ = hitZ - blockZ - 0.5

    // Find which face is closest
    const absX = Math.abs(relX)
    const absY = Math.abs(relY)
    const absZ = Math.abs(relZ)

    if (absX > absY && absX > absZ) {
      return new THREE.Vector3(relX > 0 ? 1 : -1, 0, 0)
    } else if (absY > absZ) {
      return new THREE.Vector3(0, relY > 0 ? 1 : -1, 0)
    } else {
      return new THREE.Vector3(0, 0, relZ > 0 ? 1 : -1)
    }
  }

  /**
   * Get the position where a block would be placed (adjacent to hit block)
   */
  getPlacementPosition(hit: RaycastHit): { x: number; y: number; z: number } {
    return {
      x: hit.blockX + Math.round(hit.faceNormal.x),
      y: hit.blockY + Math.round(hit.faceNormal.y),
      z: hit.blockZ + Math.round(hit.faceNormal.z)
    }
  }
}
