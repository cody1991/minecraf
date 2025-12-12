import * as THREE from 'three'
import { Player, PLAYER_SPEED, MOUSE_SENSITIVITY, SPRINT_MULTIPLIER } from './Player'
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

    // Handle jump input
    if (input.jump) {
      this.physics.applyJump(this.getPhysicsBody())
    }

    // Calculate horizontal movement velocity
    this.updateHorizontalVelocity(input)

    // Apply physics (gravity, collision detection, position updates)
    this.physics.update(this.getPhysicsBody(), this.world, deltaTime)

    // Sync physics body state back to player
    this.player.isGrounded = this.getPhysicsBody().isGrounded
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
   * Applies sprint multiplier when sprint key is held
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
      
      // Apply sprint multiplier if sprinting
      const speed = input.sprint ? PLAYER_SPEED * SPRINT_MULTIPLIER : PLAYER_SPEED
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
