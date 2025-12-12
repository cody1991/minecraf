/**
 * Animal - Base class for all animals
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { Entity, generateEntityId } from './Entity'
import { AnimalType, AnimalState, getAnimalConfig, AnimalConfig } from './AnimalTypes'
import { updateAnimalAI, getRandomStateDuration, getMovementSpeed } from './AnimalAI'
import { IPhysicsBody, ICollisionWorld } from '../physics/PhysicsTypes'
import { resolveXCollision, resolveYCollision, resolveZCollision, checkGrounded, checkInWater } from '../physics/Collision'
import { applyGravity } from '../physics/Gravity'
import { BlockType } from '../core/Block'

/** Gravity constant for animals (positive value, applied as downward force) */
const ANIMAL_GRAVITY = 20
/** Buoyancy force when in water */
const WATER_BUOYANCY = 8
/** Water surface target offset (animals float slightly above water) */
const WATER_SURFACE_OFFSET = 0.3
/** Jump velocity for animals */
const ANIMAL_JUMP_VELOCITY = 7
/** Cooldown between jumps (seconds) */
const JUMP_COOLDOWN = 0.5

/**
 * Base class for all animals
 */
export abstract class Animal extends Entity implements IPhysicsBody {
  /** Animal type */
  readonly animalType: AnimalType

  /** Current AI state */
  state: AnimalState = AnimalState.IDLE

  /** Time remaining in current state */
  stateTimer: number

  /** Target position for movement */
  targetPosition: THREE.Vector3 | null = null

  /** Animal configuration */
  protected config: AnimalConfig

  /** 3D mesh group */
  protected mesh: THREE.Group

  /** Animation time */
  protected animationTime: number = 0

  // IPhysicsBody implementation
  velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  width: number = 0.6  // Default collision width
  height: number = 1.0 // Default collision height
  isGrounded: boolean = false
  
  /** Whether animal is currently in water */
  protected inWater: boolean = false
  
  /** Jump cooldown timer */
  private jumpCooldown: number = 0

  constructor(type: AnimalType, x: number, y: number, z: number) {
    super(generateEntityId(), x, y, z)
    this.animalType = type
    this.config = getAnimalConfig(type)
    this.stateTimer = getRandomStateDuration(AnimalState.IDLE, this.config)
    this.mesh = new THREE.Group()
    this.mesh.position.set(x, y, z)
    
    // Random initial rotation
    this.rotation = Math.random() * Math.PI * 2
    this.mesh.rotation.y = this.rotation
  }

  /**
   * Create the animal mesh (implemented by subclasses)
   */
  protected abstract createMesh(): void

  /**
   * Update animal state
   */
  update(deltaTime: number, playerPosition: THREE.Vector3, world?: ICollisionWorld): void {
    // Update AI
    const aiResult = updateAnimalAI(
      this.state,
      this.stateTimer,
      deltaTime,
      this.position,
      playerPosition,
      this.config
    )

    // Handle state transition
    if (aiResult.newState !== null) {
      this.state = aiResult.newState
      this.stateTimer = getRandomStateDuration(this.state, this.config)
      
      if (aiResult.targetPosition) {
        this.targetPosition = aiResult.targetPosition
      }
    } else {
      this.stateTimer -= deltaTime
    }

    // Update movement with collision detection
    this.updateMovement(deltaTime, world)

    // Update animation
    this.updateAnimation(deltaTime)

    // Sync mesh position and rotation
    this.mesh.position.copy(this.position)
    this.mesh.rotation.y = this.rotation
  }

  /**
   * Update movement towards target with collision detection
   */
  private updateMovement(deltaTime: number, world?: ICollisionWorld): void {
    // Update jump cooldown
    if (this.jumpCooldown > 0) {
      this.jumpCooldown -= deltaTime
    }
    
    if (world) {
      // Check if in water
      this.inWater = checkInWater(this, world)
      
      if (this.inWater) {
        // In water: apply buoyancy to float to surface
        this.applyWaterPhysics(deltaTime, world)
      } else {
        // On land: apply normal gravity
        applyGravity(this, deltaTime, ANIMAL_GRAVITY)
        
        // Apply vertical velocity with collision
        const deltaY = this.velocity.y * deltaTime
        const yResult = resolveYCollision(this, world, deltaY)
        this.position.y = yResult.newPosition
        this.velocity.y = yResult.newVelocity
      }
      
      // Check if grounded
      this.isGrounded = checkGrounded(this, world)
    }

    if (!this.targetPosition) return

    const speed = getMovementSpeed(this.state, this.config)
    if (speed === 0) return

    // Calculate direction to target
    const direction = new THREE.Vector3()
      .subVectors(this.targetPosition, this.position)
    direction.y = 0 // Keep on ground plane
    
    const distance = direction.length()
    
    if (distance < 0.5) {
      // Reached target
      this.targetPosition = null
      return
    }

    direction.normalize()

    // Update rotation to face movement direction
    this.rotation = Math.atan2(direction.x, direction.z)

    // Calculate movement delta (slower in water)
    const speedMultiplier = this.inWater ? 0.5 : 1.0
    const moveDistance = Math.min(speed * speedMultiplier * deltaTime, distance)
    const deltaX = direction.x * moveDistance
    const deltaZ = direction.z * moveDistance

    if (world) {
      // Check if path is blocked before moving
      const canMoveX = this.canMoveInDirection(world, deltaX, 0)
      const canMoveZ = this.canMoveInDirection(world, 0, deltaZ)
      
      // Check if blocked and should try to jump
      const blockedX = !canMoveX && Math.abs(deltaX) > 0.001
      const blockedZ = !canMoveZ && Math.abs(deltaZ) > 0.001
      
      if ((blockedX || blockedZ) && this.isGrounded && !this.inWater) {
        // Try to jump over obstacle
        if (this.shouldJump(world, direction)) {
          this.jump()
        } else {
          // Can't jump over, give up on target
          this.targetPosition = null
        }
      }
      
      if (canMoveX) {
        const xResult = resolveXCollision(this, world, deltaX)
        this.position.x = xResult.newPosition
        if (xResult.collided && this.isGrounded) {
          // Hit wall while grounded, try to jump
          if (this.shouldJump(world, direction)) {
            this.jump()
          }
        }
      }
      
      if (canMoveZ) {
        const zResult = resolveZCollision(this, world, deltaZ)
        this.position.z = zResult.newPosition
        if (zResult.collided && this.isGrounded) {
          // Hit wall while grounded, try to jump
          if (this.shouldJump(world, direction)) {
            this.jump()
          }
        }
      }
    } else {
      // No collision world, just move directly
      this.position.x += deltaX
      this.position.z += deltaZ
    }
  }
  
  /**
   * Make the animal jump
   */
  private jump(): void {
    if (this.jumpCooldown <= 0 && this.isGrounded && !this.inWater) {
      this.velocity.y = ANIMAL_JUMP_VELOCITY
      this.isGrounded = false
      this.jumpCooldown = JUMP_COOLDOWN
    }
  }
  
  /**
   * Check if animal should attempt to jump (obstacle is jumpable)
   */
  private shouldJump(world: ICollisionWorld, direction: THREE.Vector3): boolean {
    // Don't jump if on cooldown
    if (this.jumpCooldown > 0) return false
    
    const halfHeight = this.height / 2
    
    // Check position in front of animal
    const checkDistance = 0.5
    const frontX = this.position.x + direction.x * checkDistance
    const frontZ = this.position.z + direction.z * checkDistance
    
    const feetY = Math.floor(this.position.y - halfHeight)
    
    // Check if there's a 1-block obstacle (can jump over)
    const blockAtFeet = world.getBlock(Math.floor(frontX), feetY, Math.floor(frontZ))
    const blockAtBody = world.getBlock(Math.floor(frontX), feetY + 1, Math.floor(frontZ))
    const blockAboveBody = world.getBlock(Math.floor(frontX), feetY + 2, Math.floor(frontZ))
    
    // Can jump if: block at feet level, but space above for landing
    const hasObstacle = blockAtFeet !== BlockType.AIR && blockAtFeet !== BlockType.WATER
    const hasSpaceAbove = (blockAtBody === BlockType.AIR || blockAtBody === BlockType.WATER) &&
                          (blockAboveBody === BlockType.AIR || blockAboveBody === BlockType.WATER)
    
    // Also check if there's ground to land on after the obstacle
    const landingX = this.position.x + direction.x * 1.5
    const landingZ = this.position.z + direction.z * 1.5
    const groundBeyond = world.getBlock(Math.floor(landingX), feetY, Math.floor(landingZ))
    const spaceBeyond = world.getBlock(Math.floor(landingX), feetY + 1, Math.floor(landingZ))
    
    const canLand = (groundBeyond !== BlockType.AIR || blockAtFeet !== BlockType.AIR) &&
                    (spaceBeyond === BlockType.AIR || spaceBeyond === BlockType.WATER)
    
    return hasObstacle && hasSpaceAbove && canLand
  }
  
  /**
   * Apply water physics - float to surface
   */
  private applyWaterPhysics(deltaTime: number, world: ICollisionWorld): void {
    const halfHeight = this.height / 2
    
    // Find water surface level
    let waterSurfaceY = this.position.y
    for (let checkY = Math.floor(this.position.y); checkY < this.position.y + 10; checkY++) {
      const blockAtY = world.getBlock(
        Math.floor(this.position.x),
        checkY,
        Math.floor(this.position.z)
      )
      const blockAbove = world.getBlock(
        Math.floor(this.position.x),
        checkY + 1,
        Math.floor(this.position.z)
      )
      
      // Found water surface (water block with air above)
      if (blockAtY === BlockType.WATER && blockAbove !== BlockType.WATER) {
        waterSurfaceY = checkY + 1 + WATER_SURFACE_OFFSET
        break
      }
    }
    
    // Target position: float at water surface
    const targetY = waterSurfaceY + halfHeight
    const currentY = this.position.y
    
    if (currentY < targetY) {
      // Below surface, apply buoyancy (float up)
      this.velocity.y += WATER_BUOYANCY * deltaTime
      // Clamp upward velocity
      if (this.velocity.y > 3) this.velocity.y = 3
    } else {
      // At or above surface, reduce velocity
      this.velocity.y *= 0.9
      // Slight downward pull to stay at surface
      if (currentY > targetY + 0.1) {
        this.velocity.y -= 2 * deltaTime
      }
    }
    
    // Apply velocity
    const deltaY = this.velocity.y * deltaTime
    this.position.y += deltaY
    
    // Clamp to not go too far above surface
    if (this.position.y > targetY + 0.5) {
      this.position.y = targetY + 0.5
      this.velocity.y = 0
    }
  }
  
  /**
   * Check if animal can move in a direction without hitting a wall
   * This helps prevent animals from getting stuck on block edges
   */
  private canMoveInDirection(world: ICollisionWorld, deltaX: number, deltaZ: number): boolean {
    const halfWidth = this.width / 2
    const halfHeight = this.height / 2
    
    // Check at feet level and body level
    const checkYs = [
      Math.floor(this.position.y - halfHeight + 0.1),  // Feet
      Math.floor(this.position.y),                      // Center
      Math.floor(this.position.y + halfHeight - 0.1)   // Head
    ]
    
    const newX = this.position.x + deltaX
    const newZ = this.position.z + deltaZ
    
    for (const checkY of checkYs) {
      // Check corners of the bounding box
      const checkPoints = [
        { x: newX - halfWidth, z: newZ - halfWidth },
        { x: newX + halfWidth, z: newZ - halfWidth },
        { x: newX - halfWidth, z: newZ + halfWidth },
        { x: newX + halfWidth, z: newZ + halfWidth },
      ]
      
      for (const point of checkPoints) {
        const blockX = Math.floor(point.x)
        const blockZ = Math.floor(point.z)
        const block = world.getBlock(blockX, checkY, blockZ)
        
        // Check if solid (not air, not water)
        if (block !== BlockType.AIR && block !== BlockType.WATER) {
          // Check if this is actually blocking (not just a block we're already in)
          const currentBlockX = Math.floor(this.position.x + (point.x - newX))
          const currentBlockZ = Math.floor(this.position.z + (point.z - newZ))
          
          if (blockX !== currentBlockX || blockZ !== currentBlockZ) {
            return false
          }
        }
      }
    }
    
    return true
  }

  /**
   * Update animation (implemented by subclasses)
   */
  protected updateAnimation(deltaTime: number): void {
    if (this.state === AnimalState.IDLE) {
      // Slow idle animation
      this.animationTime += deltaTime * 0.5
    } else {
      // Faster walking animation
      this.animationTime += deltaTime * (this.state === AnimalState.FLEEING ? 3 : 2)
    }
  }

  /**
   * Get the mesh
   */
  getMesh(): THREE.Object3D {
    return this.mesh
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry?.dispose()
        if (child.material instanceof THREE.Material) {
          child.material.dispose()
        } else if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose())
        }
      }
    })
  }
}
