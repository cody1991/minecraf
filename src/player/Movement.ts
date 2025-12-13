import * as THREE from 'three'
import { Player, PLAYER_SPEED, MOUSE_SENSITIVITY, SPRINT_MULTIPLIER, SWIM_SPEED_MULTIPLIER } from './Player'
import { World } from '../core/World'
import { InputState } from '../input/InputManager'
import { PhysicsSystem } from '../physics/PhysicsSystem'
import { IPhysicsBody } from '../physics/PhysicsTypes'

/**
 * Movement class - handles player movement and collision
 * Integrates with PhysicsSystem for gravity, jumping, and collision detection
 */
export class Movement {
  private player: Player
  private world: World
  private physics: PhysicsSystem

  // Pitch limits (prevent camera flipping)
  private readonly minPitch = -Math.PI / 2 + 0.01
  private readonly maxPitch = Math.PI / 2 - 0.01

  constructor(player: Player, world: World) {
    this.player = player
    this.world = world
    this.physics = new PhysicsSystem()
  }

  /**
   * Update player movement based on input
   */
  update(input: InputState, deltaTime: number): void {
    // Update rotation from mouse input
    this.updateRotation(input.mouseX, input.mouseY)

    // Check if in water for physics
    const inWater = this.player.isInWater

    // Handle jump input (only on land)
    if (input.jump && !inWater) {
      this.physics.applyJump(this.getPhysicsBody())
    }

    // Calculate horizontal movement velocity
    this.updateHorizontalVelocity(input)

    // Apply physics with swim controls
    // In water: space = swim up, shift = swim down
    const swimUp = inWater && input.jump
    const swimDown = inWater && input.sprint
    this.physics.update(this.getPhysicsBody(), this.world, deltaTime, swimUp, swimDown)

    // Sync physics body state back to player
    this.player.isGrounded = this.getPhysicsBody().isGrounded
    this.player.isInWater = this.getPhysicsBody().isInWater ?? false
    this.player.isSubmerged = this.getPhysicsBody().isSubmerged ?? false
  }

  /**
   * Get player as IPhysicsBody interface
   */
  private getPhysicsBody(): IPhysicsBody {
    return this.player as IPhysicsBody
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
   * Update horizontal velocity based on input
   * Velocity is set directly (not accumulated) for responsive controls
   * Applies sprint multiplier when sprint key is held (on land)
   * Applies swim speed multiplier when in water
   */
  private updateHorizontalVelocity(input: InputState): void {
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

    // Normalize and apply speed to velocity
    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize()
      
      // Determine speed based on state
      let speed = PLAYER_SPEED
      
      if (this.player.isInWater) {
        // In water: slower movement, shift is for diving not sprinting
        speed = PLAYER_SPEED * SWIM_SPEED_MULTIPLIER
      } else if (input.sprint) {
        // On land: sprint multiplier
        speed = PLAYER_SPEED * SPRINT_MULTIPLIER
      }
      
      moveDirection.multiplyScalar(speed)
      
      this.player.velocity.x = moveDirection.x
      this.player.velocity.z = moveDirection.z
    } else {
      // No input - stop horizontal movement
      this.player.velocity.x = 0
      this.player.velocity.z = 0
    }
  }

  /**
   * Get the physics system instance
   */
  getPhysicsSystem(): PhysicsSystem {
    return this.physics
  }
}
