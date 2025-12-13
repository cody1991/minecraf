import * as THREE from 'three'
import { World } from '../core/World'
import { BlockType, isSolid } from '../core/Block'
import { Player } from './Player'
import { Raycaster, INTERACTION_DISTANCE } from '../utils/Raycaster'
import { AudioManager } from '../audio/AudioManager'

/**
 * BlockInteraction - handles block placement and destruction
 * Always uses player's eye position and look direction for consistent behavior
 * Updated: 017-block-sound-effects - Added block sound effects
 */
export class BlockInteraction {
  private world: World
  private player: Player
  private raycaster: Raycaster

  // Callback when world changes
  private onWorldChange: (() => void) | null = null

  constructor(world: World, player: Player, _camera: THREE.Camera) {
    this.world = world
    this.player = player
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

    // Get the block type before destroying (for sound effect)
    const blockType = this.world.getBlock(hit.blockX, hit.blockY, hit.blockZ)

    // Destroy the block (set to AIR)
    const success = this.world.setBlock(hit.blockX, hit.blockY, hit.blockZ, BlockType.AIR)

    if (success) {
      // Play block break sound at the block's position
      AudioManager.getInstance().playBlockSound(
        blockType,
        'break',
        hit.blockX + 0.5,
        hit.blockY + 0.5,
        hit.blockZ + 0.5
      )

      if (this.onWorldChange) {
        this.onWorldChange()
      }
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

    // Get the block type being placed
    const blockType = this.player.selectedBlockType

    // Place the block
    const success = this.world.setBlock(
      placePos.x,
      placePos.y,
      placePos.z,
      blockType
    )

    if (success) {
      // Play block place sound at the placed block's position
      AudioManager.getInstance().playBlockSound(
        blockType,
        'place',
        placePos.x + 0.5,
        placePos.y + 0.5,
        placePos.z + 0.5
      )

      if (this.onWorldChange) {
        this.onWorldChange()
      }
    }

    return success
  }

  /**
   * Get the block the player is looking at
   * Uses player's eye position and look direction for consistent behavior
   * in both first and third person views
   */
  private getTargetBlock() {
    // Always use player's eye position and look direction
    const origin = this.player.getEyePosition()
    const direction = this.player.getLookDirection()

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
