/**
 * Player class - represents the player entity
 * Feature: 005-block-textures - Extended block selection support
 */

import * as THREE from 'three'
import { BlockType, PLACEABLE_BLOCKS } from '../core/Block'

/**
 * Player constants
 */
export const PLAYER_HEIGHT = 1.8
export const PLAYER_WIDTH = 0.6
export const PLAYER_EYE_HEIGHT = 1.6
export const PLAYER_SPEED = 5.0 // blocks per second
export const MOUSE_SENSITIVITY = 0.002

/** Sprint speed multiplier (1.5x normal speed) */
export const SPRINT_MULTIPLIER = 1.5

/** Swimming speed multiplier (0.5x normal speed - slower in water) */
export const SWIM_SPEED_MULTIPLIER = 0.5

/** Vertical swim speed when pressing space/shift in water */
export const SWIM_VERTICAL_SPEED = 3.0

/** Water buoyancy force (upward acceleration in water) */
export const WATER_BUOYANCY = 8.0

/** Water drag (slows down vertical movement in water) */
export const WATER_DRAG = 0.8

/**
 * Player class - represents the player entity
 */
export class Player {
  public position: THREE.Vector3
  public velocity: THREE.Vector3
  public rotation: THREE.Euler

  // Player dimensions
  public readonly height = PLAYER_HEIGHT
  public readonly width = PLAYER_WIDTH
  public readonly eyeHeight = PLAYER_EYE_HEIGHT

  // Physics state
  public isGrounded: boolean = false
  public isInWater: boolean = false
  public isSubmerged: boolean = false // Head underwater

  // Currently selected block type for placing
  public selectedBlockType: BlockType = BlockType.GRASS

  constructor(x: number, y: number, z: number) {
    this.position = new THREE.Vector3(x, y, z)
    this.velocity = new THREE.Vector3(0, 0, 0)
    this.rotation = new THREE.Euler(0, 0, 0, 'YXZ') // Yaw-Pitch-Roll order
  }

  /**
   * Get the eye position (for camera)
   */
  getEyePosition(): THREE.Vector3 {
    return new THREE.Vector3(
      this.position.x,
      this.position.y + this.eyeHeight - this.height / 2,
      this.position.z
    )
  }

  /**
   * Get the forward direction vector (horizontal only, for movement)
   */
  getForwardDirection(): THREE.Vector3 {
    const direction = new THREE.Vector3(0, 0, -1)
    direction.applyEuler(new THREE.Euler(0, this.rotation.y, 0))
    return direction
  }

  /**
   * Get the look direction vector (includes pitch, for raycasting/interaction)
   */
  getLookDirection(): THREE.Vector3 {
    const direction = new THREE.Vector3(0, 0, -1)
    direction.applyEuler(this.rotation)
    return direction
  }

  /**
   * Get the right direction vector
   */
  getRightDirection(): THREE.Vector3 {
    const direction = new THREE.Vector3(1, 0, 0)
    direction.applyEuler(new THREE.Euler(0, this.rotation.y, 0))
    return direction
  }

  /**
   * Get player bounding box (AABB)
   */
  getBoundingBox(): {
    minX: number; maxX: number;
    minY: number; maxY: number;
    minZ: number; maxZ: number;
  } {
    const halfWidth = this.width / 2
    return {
      minX: this.position.x - halfWidth,
      maxX: this.position.x + halfWidth,
      minY: this.position.y - this.height / 2,
      maxY: this.position.y + this.height / 2,
      minZ: this.position.z - halfWidth,
      maxZ: this.position.z + halfWidth
    }
  }

  /**
   * Set selected block by key number (1-9, 0)
   * Maps keyboard numbers to PLACEABLE_BLOCKS array
   * 1 = index 0, 2 = index 1, ..., 9 = index 8, 0 = index 9
   */
  setSelectedBlockByKey(key: string): boolean {
    let index: number

    if (key >= '1' && key <= '9') {
      index = parseInt(key) - 1 // '1' -> 0, '9' -> 8
    } else if (key === '0') {
      index = 9 // '0' -> 9
    } else {
      return false
    }

    return this.setSelectedBlockIndex(index)
  }

  /**
   * Set selected block by index in PLACEABLE_BLOCKS array
   */
  setSelectedBlockIndex(index: number): boolean {
    if (index >= 0 && index < PLACEABLE_BLOCKS.length) {
      const blockType = PLACEABLE_BLOCKS[index]
      if (blockType !== undefined) {
        this.selectedBlockType = blockType
        return true
      }
    }
    return false
  }

  /**
   * Get the index of currently selected block in PLACEABLE_BLOCKS
   */
  getSelectedBlockIndex(): number {
    return PLACEABLE_BLOCKS.indexOf(this.selectedBlockType)
  }

  /**
   * Cycle to next block type
   */
  selectNextBlock(): void {
    const currentIndex = this.getSelectedBlockIndex()
    const nextIndex = (currentIndex + 1) % PLACEABLE_BLOCKS.length
    this.setSelectedBlockIndex(nextIndex)
  }

  /**
   * Cycle to previous block type
   */
  selectPreviousBlock(): void {
    const currentIndex = this.getSelectedBlockIndex()
    const prevIndex = (currentIndex - 1 + PLACEABLE_BLOCKS.length) % PLACEABLE_BLOCKS.length
    this.setSelectedBlockIndex(prevIndex)
  }

  // ============================================================================
  // Save System Methods (Feature: 018-world-save-system)
  // ============================================================================

  /**
   * Get serializable player state for saving
   */
  getState(): {
    position: { x: number; y: number; z: number }
    rotation: { yaw: number; pitch: number }
    selectedBlockIndex?: number
  } {
    return {
      position: {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      },
      rotation: {
        yaw: this.rotation.y,
        pitch: this.rotation.x,
      },
      selectedBlockIndex: this.getSelectedBlockIndex(),
    }
  }

  /**
   * Restore player state from save data
   */
  restoreState(state: {
    position: { x: number; y: number; z: number }
    rotation: { yaw: number; pitch: number }
    selectedBlockIndex?: number
  }): void {
    // Restore position
    this.position.set(state.position.x, state.position.y, state.position.z)
    
    // Restore rotation
    this.rotation.y = state.rotation.yaw
    this.rotation.x = state.rotation.pitch
    
    // Restore selected block
    if (state.selectedBlockIndex !== undefined) {
      this.setSelectedBlockIndex(state.selectedBlockIndex)
    }
    
    // Reset velocity
    this.velocity.set(0, 0, 0)
  }
}
