import * as THREE from 'three'
import { BlockType } from '../core/Block'

/**
 * Player constants
 */
export const PLAYER_HEIGHT = 1.8
export const PLAYER_WIDTH = 0.6
export const PLAYER_EYE_HEIGHT = 1.6
export const PLAYER_SPEED = 5.0 // blocks per second
export const MOUSE_SENSITIVITY = 0.002

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
   * Get the forward direction vector
   */
  getForwardDirection(): THREE.Vector3 {
    const direction = new THREE.Vector3(0, 0, -1)
    direction.applyEuler(new THREE.Euler(0, this.rotation.y, 0))
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
   * Set selected block type (1-5 maps to GRASS-SAND)
   */
  setSelectedBlockIndex(index: number): void {
    if (index >= 1 && index <= 5) {
      this.selectedBlockType = index as BlockType
    }
  }
}
