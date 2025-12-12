import * as THREE from 'three'
import { World } from '../core/World'
import { BlockType, isSolid } from '../core/Block'
import { Player } from './Player'
import { Raycaster, INTERACTION_DISTANCE } from '../utils/Raycaster'

/**
 * BlockInteraction - handles block placement and destruction
 */
export class BlockInteraction {
  private world: World
  private player: Player
  private raycaster: Raycaster
  private camera: THREE.Camera

  // Callback when world changes
  private onWorldChange: (() => void) | null = null

  constructor(world: World, player: Player, camera: THREE.Camera) {
    this.world = world
    this.player = player
    this.camera = camera
    this.raycaster = new Raycaster(world)
  }

  /**
   * Set callback for world changes
   */
  setOnWorldChange(callback: () => void): void {
    this.onWorldChange = callback
  }

  /**
   * Try to destroy the block the player is looking at
   */
  destroyBlock(): boolean {
    const hit = this.getTargetBlock()
    if (!hit) return false

    // Check distance
    if (hit.distance > INTERACTION_DISTANCE) return false

    // Destroy the block (set to AIR)
    const success = this.world.setBlock(hit.blockX, hit.blockY, hit.blockZ, BlockType.AIR)

    if (success && this.onWorldChange) {
      this.onWorldChange()
    }

    return success
  }

  /**
   * Try to place a block where the player is looking
   */
  placeBlock(): boolean {
    const hit = this.getTargetBlock()
    if (!hit) return false

    // Check distance
    if (hit.distance > INTERACTION_DISTANCE) return false

    // Get placement position (adjacent to hit block)
    const placePos = this.raycaster.getPlacementPosition(hit)

    // Validate placement position
    if (!this.world.isValidPosition(placePos.x, placePos.y, placePos.z)) {
      return false
    }

    // Check if position is already occupied
    if (isSolid(this.world.getBlock(placePos.x, placePos.y, placePos.z))) {
      return false
    }

    // Check if placement would intersect with player
    if (this.wouldIntersectPlayer(placePos.x, placePos.y, placePos.z)) {
      return false
    }

    // Place the block
    const success = this.world.setBlock(
      placePos.x,
      placePos.y,
      placePos.z,
      this.player.selectedBlockType
    )

    if (success && this.onWorldChange) {
      this.onWorldChange()
    }

    return success
  }

  /**
   * Get the block the player is looking at
   */
  private getTargetBlock() {
    // Get camera position and direction
    const origin = this.camera.position.clone()
    const direction = new THREE.Vector3(0, 0, -1)
    direction.applyQuaternion(this.camera.quaternion)

    return this.raycaster.cast(origin, direction)
  }

  /**
   * Check if a block at given position would intersect with the player
   */
  private wouldIntersectPlayer(blockX: number, blockY: number, blockZ: number): boolean {
    const playerBox = this.player.getBoundingBox()

    // Block bounds
    const blockMinX = blockX
    const blockMaxX = blockX + 1
    const blockMinY = blockY
    const blockMaxY = blockY + 1
    const blockMinZ = blockZ
    const blockMaxZ = blockZ + 1

    // AABB intersection test
    return (
      playerBox.minX < blockMaxX && playerBox.maxX > blockMinX &&
      playerBox.minY < blockMaxY && playerBox.maxY > blockMinY &&
      playerBox.minZ < blockMaxZ && playerBox.maxZ > blockMinZ
    )
  }
}
