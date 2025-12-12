import * as THREE from 'three'
import { Player, PLAYER_SPEED, MOUSE_SENSITIVITY } from './Player'
import { World } from '../core/World'
import { InputState } from '../input/InputManager'
import { isSolid } from '../core/Block'

/**
 * Movement class - handles player movement and collision
 */
export class Movement {
  private player: Player
  private world: World

  // Pitch limits (prevent camera flipping)
  private readonly minPitch = -Math.PI / 2 + 0.01
  private readonly maxPitch = Math.PI / 2 - 0.01

  constructor(player: Player, world: World) {
    this.player = player
    this.world = world
  }

  /**
   * Update player movement based on input
   */
  update(input: InputState, deltaTime: number): void {
    // Update rotation from mouse input
    this.updateRotation(input.mouseX, input.mouseY)

    // Update position from keyboard input
    this.updatePosition(input, deltaTime)
  }

  /**
   * Update player rotation (mouse look)
   */
  private updateRotation(mouseX: number, mouseY: number): void {
    // Yaw (horizontal rotation)
    this.player.rotation.y -= mouseX * MOUSE_SENSITIVITY

    // Pitch (vertical rotation) with clamping
    this.player.rotation.x -= mouseY * MOUSE_SENSITIVITY
    this.player.rotation.x = Math.max(
      this.minPitch,
      Math.min(this.maxPitch, this.player.rotation.x)
    )
  }

  /**
   * Update player position (WASD movement)
   */
  private updatePosition(input: InputState, deltaTime: number): void {
    // Calculate movement direction
    const moveDirection = new THREE.Vector3(0, 0, 0)

    if (input.forward) {
      moveDirection.add(this.player.getForwardDirection())
    }
    if (input.backward) {
      moveDirection.sub(this.player.getForwardDirection())
    }
    if (input.right) {
      moveDirection.add(this.player.getRightDirection())
    }
    if (input.left) {
      moveDirection.sub(this.player.getRightDirection())
    }

    // Normalize and apply speed
    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize()
      moveDirection.multiplyScalar(PLAYER_SPEED * deltaTime)

      // Try to move with collision detection
      this.moveWithCollision(moveDirection)
    }
  }

  /**
   * Move player with collision detection
   */
  private moveWithCollision(movement: THREE.Vector3): void {
    // Try X movement
    const newPosX = this.player.position.x + movement.x
    if (!this.checkCollision(newPosX, this.player.position.y, this.player.position.z)) {
      this.player.position.x = newPosX
    }

    // Try Z movement
    const newPosZ = this.player.position.z + movement.z
    if (!this.checkCollision(this.player.position.x, this.player.position.y, newPosZ)) {
      this.player.position.z = newPosZ
    }

    // Apply world boundary constraints
    this.applyWorldBounds()
  }

  /**
   * Check if player would collide with blocks at given position
   */
  private checkCollision(x: number, y: number, z: number): boolean {
    const halfWidth = this.player.width / 2
    const halfHeight = this.player.height / 2

    // Check all blocks that the player's bounding box might intersect
    const minBlockX = Math.floor(x - halfWidth)
    const maxBlockX = Math.floor(x + halfWidth)
    const minBlockY = Math.floor(y - halfHeight)
    const maxBlockY = Math.floor(y + halfHeight)
    const minBlockZ = Math.floor(z - halfWidth)
    const maxBlockZ = Math.floor(z + halfWidth)

    for (let bx = minBlockX; bx <= maxBlockX; bx++) {
      for (let by = minBlockY; by <= maxBlockY; by++) {
        for (let bz = minBlockZ; bz <= maxBlockZ; bz++) {
          const blockType = this.world.getBlock(bx, by, bz)
          if (isSolid(blockType)) {
            // Check AABB intersection
            if (this.aabbIntersects(
              x - halfWidth, y - halfHeight, z - halfWidth,
              x + halfWidth, y + halfHeight, z + halfWidth,
              bx, by, bz,
              bx + 1, by + 1, bz + 1
            )) {
              return true
            }
          }
        }
      }
    }

    return false
  }

  /**
   * Check if two AABBs intersect
   */
  private aabbIntersects(
    aMinX: number, aMinY: number, aMinZ: number,
    aMaxX: number, aMaxY: number, aMaxZ: number,
    bMinX: number, bMinY: number, bMinZ: number,
    bMaxX: number, bMaxY: number, bMaxZ: number
  ): boolean {
    return (
      aMinX < bMaxX && aMaxX > bMinX &&
      aMinY < bMaxY && aMaxY > bMinY &&
      aMinZ < bMaxZ && aMaxZ > bMinZ
    )
  }

  /**
   * Apply world boundary constraints
   * Note: With chunk-based world, X/Z are now infinite, only Y is bounded
   */
  private applyWorldBounds(): void {
    // Keep player above minimum world height (Y = 0)
    const minY = this.player.height / 2 + 0.1
    if (this.player.position.y < minY) {
      this.player.position.y = minY
    }

    // Keep player below maximum world height (Y = 128)
    const maxY = 128 - this.player.height / 2 - 0.1
    if (this.player.position.y > maxY) {
      this.player.position.y = maxY
    }
  }
}
