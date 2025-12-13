/**
 * Fish - Base class for fish entities
 * Feature: 009-ecosystem-flora-fauna
 */

import * as THREE from 'three'
import { Entity, generateEntityId } from './Entity'
import { FishType, FishConfig, FISH_CONFIGS } from './FishTypes'
import { ICollisionWorld } from '../physics/PhysicsTypes'

/**
 * Base class for all fish entities
 * Fish swim in water and turn around when reaching water boundaries
 */
export abstract class Fish extends Entity {
  /** Fish type */
  readonly fishType: FishType

  /** Fish configuration */
  protected config: FishConfig

  /** 3D mesh for rendering */
  protected mesh: THREE.Group

  /** Current velocity */
  protected velocity: THREE.Vector3

  /** Target direction for smooth turning */
  protected targetDirection: THREE.Vector3

  /** Animation time accumulator */
  protected animationTime: number = 0

  /** Whether fish is currently turning */
  protected isTurning: boolean = false

  constructor(type: FishType, x: number, y: number, z: number) {
    super(generateEntityId(), x, y, z)
    this.fishType = type
    this.config = FISH_CONFIGS[type]
    this.mesh = new THREE.Group()
    
    // Initialize with random direction
    const angle = Math.random() * Math.PI * 2
    this.velocity = new THREE.Vector3(
      Math.cos(angle) * this.config.swimSpeed,
      (Math.random() - 0.5) * 0.3, // Slight vertical movement
      Math.sin(angle) * this.config.swimSpeed
    )
    this.targetDirection = this.velocity.clone().normalize()
    
    this.createMesh()
    this.updateMeshPosition()
  }

  /**
   * Create the fish mesh - to be implemented by subclasses
   */
  protected abstract createMesh(): void

  /**
   * Update fish state
   */
  update(deltaTime: number, _playerPosition: THREE.Vector3, world?: ICollisionWorld): void {
    this.animationTime += deltaTime

    // Check water boundary and update velocity
    if (world) {
      this.checkWaterBoundary(world, deltaTime)
    }

    // Smooth turning
    if (this.isTurning) {
      this.velocity.lerp(
        this.targetDirection.clone().multiplyScalar(this.config.swimSpeed),
        deltaTime * this.config.turnRate
      )
      
      // Check if turn is complete
      if (this.velocity.clone().normalize().dot(this.targetDirection) > 0.95) {
        this.isTurning = false
      }
    }

    // Add slight random movement
    this.velocity.x += (Math.random() - 0.5) * 0.1 * deltaTime
    this.velocity.z += (Math.random() - 0.5) * 0.1 * deltaTime
    this.velocity.y += (Math.random() - 0.5) * 0.05 * deltaTime

    // Clamp vertical velocity
    this.velocity.y = Math.max(-0.3, Math.min(0.3, this.velocity.y))

    // Normalize and apply speed
    const speed = this.velocity.length()
    if (speed > this.config.swimSpeed * 1.2) {
      this.velocity.normalize().multiplyScalar(this.config.swimSpeed)
    }

    // Update position
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime))

    // Update rotation to face movement direction
    if (this.velocity.lengthSq() > 0.001) {
      this.rotation = Math.atan2(this.velocity.x, this.velocity.z)
    }

    this.updateMeshPosition()
    this.updateAnimation(deltaTime)
  }

  /**
   * Check if next position is still in water, turn around if not
   */
  protected checkWaterBoundary(world: ICollisionWorld, _deltaTime: number): void {
    // Look ahead
    const lookAhead = this.velocity.clone().normalize().multiplyScalar(1.5)
    const nextPos = this.position.clone().add(lookAhead)

    // Check if next position is water
    const blockX = Math.floor(nextPos.x)
    const blockY = Math.floor(nextPos.y)
    const blockZ = Math.floor(nextPos.z)

    // Use world.getBlock if available, otherwise assume water check
    const isWater = this.isWaterAt(world, blockX, blockY, blockZ)

    if (!isWater) {
      this.turnAround()
    }

    // Also check vertical boundaries
    const aboveY = Math.floor(this.position.y + 0.5)
    const belowY = Math.floor(this.position.y - 0.5)
    
    if (!this.isWaterAt(world, blockX, aboveY, blockZ) && this.velocity.y > 0) {
      this.velocity.y = -Math.abs(this.velocity.y)
    }
    if (!this.isWaterAt(world, blockX, belowY, blockZ) && this.velocity.y < 0) {
      this.velocity.y = Math.abs(this.velocity.y)
    }
  }

  /**
   * Check if a position contains water
   */
  protected isWaterAt(world: ICollisionWorld, x: number, y: number, z: number): boolean {
    // ICollisionWorld has getBlock method
    if ('getBlock' in world) {
      const block = (world as { getBlock: (x: number, y: number, z: number) => number }).getBlock(x, y, z)
      return block === 9 // BlockType.WATER = 9
    }
    return true // Assume water if can't check
  }

  /**
   * Turn around when hitting boundary
   */
  protected turnAround(): void {
    // Reverse direction with some randomness
    this.targetDirection = new THREE.Vector3(
      -this.velocity.x + (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.2,
      -this.velocity.z + (Math.random() - 0.5) * 0.5
    ).normalize()
    
    this.isTurning = true
  }

  /**
   * Update mesh position and rotation
   */
  protected updateMeshPosition(): void {
    this.mesh.position.copy(this.position)
    this.mesh.rotation.y = this.rotation
  }

  /**
   * Update animation - to be overridden by subclasses
   */
  protected updateAnimation(_deltaTime: number): void {
    // Default tail wiggle animation
    // Subclasses should implement their own animation
  }

  /**
   * Get the 3D mesh
   */
  getMesh(): THREE.Object3D | null {
    return this.mesh
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose())
        } else {
          child.material.dispose()
        }
      }
    })
  }
}
