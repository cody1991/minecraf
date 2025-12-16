import * as THREE from 'three'
import { World } from '../core/World'
import { BlockType, isSolid } from '../core/Block'
import { Player } from './Player'
import { Raycaster, INTERACTION_DISTANCE } from '../utils/Raycaster'
import { AudioManager } from '../audio/AudioManager'
import { ItemEntity } from '../entities/ItemEntity'

/**
 * BlockInteraction - handles block placement and destruction
 * Always uses player's eye position and look direction for consistent behavior
 * Updated: 017-block-sound-effects - Added block sound effects
 * Updated: 019-inventory-system - Added item drop on block break
 */
export class BlockInteraction {
  private world: World
  private player: Player
  private raycaster: Raycaster

  // Callback when world changes
  private onWorldChange: (() => void) | null = null
  
  // Callback when item entity is created (Feature: 019-inventory-system)
  private onItemDrop: ((item: ItemEntity) => void) | null = null

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
   * Set callback for item drops (Feature: 019-inventory-system)
   */
  setOnItemDrop(callback: (item: ItemEntity) => void): void {
    this.onItemDrop = callback
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

      // Create dropped item entity (Feature: 019-inventory-system)
      if (blockType !== BlockType.AIR && this.onItemDrop) {
        const itemEntity = new ItemEntity(
          hit.blockX + 0.5,
          hit.blockY + 0.5,
          hit.blockZ + 0.5,
          blockType,
          1
        )
        this.onItemDrop(itemEntity)
      }

      if (this.onWorldChange) {
        this.onWorldChange()
      }
    }

    return success
  }

  /**
   * Try to place a block where the player is looking
   * Feature: 019-inventory-system - Uses item from inventory instead of selectedBlockType
   * Feature: 023-campfire-system - Returns placement info for campfire creation
   * @returns Placement info with position and block type, or null if failed
   */
  placeBlock(): { x: number; y: number; z: number; blockType: BlockType } | null {
    const hit = this.getTargetBlock()
    if (!hit) return null

    // Check distance
    if (hit.distance > INTERACTION_DISTANCE) return null

    // Get placement position (adjacent to hit block)
    const placePos = this.raycaster.getPlacementPosition(hit)

    // Validate placement position
    if (!this.world.isValidPosition(placePos.x, placePos.y, placePos.z)) {
      return null
    }

    // Check if position is already occupied
    if (isSolid(this.world.getBlock(placePos.x, placePos.y, placePos.z))) {
      return null
    }

    // Check if placement would intersect with player
    if (this.wouldIntersectPlayer(placePos.x, placePos.y, placePos.z)) {
      return null
    }

    // Get the block type from inventory (Feature: 019-inventory-system)
    const selectedItem = this.player.inventory.getSelectedItem()
    if (!selectedItem.itemType || selectedItem.count <= 0) {
      // No item in selected slot, fall back to legacy behavior
      return null
    }
    
    const blockType = selectedItem.itemType

    // Place the block
    const success = this.world.setBlock(
      placePos.x,
      placePos.y,
      placePos.z,
      blockType
    )

    if (success) {
      // Remove one item from inventory
      this.player.inventory.removeItem(this.player.inventory.selectedSlot, 1)
      
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
      
      return { x: placePos.x, y: placePos.y, z: placePos.z, blockType }
    }

    return null
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
