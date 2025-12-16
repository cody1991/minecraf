/**
 * Animal - Base class for all animals
 * Feature: 008-biome-weather-system
 * Feature: 012-sound-map-system - Added animal sounds
 * Feature: 020-survival-mechanics - Added health and combat
 * Feature: 022-animal-animation-system - Enhanced animations
 */

import * as THREE from 'three'
import { Entity, generateEntityId } from './Entity'
import { AnimalType, AnimalState, getAnimalConfig, AnimalConfig } from './AnimalTypes'
import { updateAnimalAI, getRandomStateDuration, getMovementSpeed } from './AnimalAI'
import { IPhysicsBody, ICollisionWorld } from '../physics/PhysicsTypes'
import { resolveXCollision, resolveYCollision, resolveZCollision, checkGrounded, checkInWater } from '../physics/Collision'
import { applyGravity } from '../physics/Gravity'
import { BlockType } from '../core/Block'
import { AudioManager } from '../audio/AudioManager'
import { FoodRegistry } from '../survival/FoodRegistry'
import { 
  AnimalAnimationState, 
  AnimalAnimationData, 
  createDefaultAnimationData,
  getAnimationConfig,
  calculateLegSwing,
  calculateBreathingScale
} from '../animation/AnimationState'

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
/** Minimum interval between animal sounds (seconds) */
const MIN_SOUND_INTERVAL = 5
/** Maximum interval between animal sounds (seconds) */
const MAX_SOUND_INTERVAL = 20
/** Damage flash duration (seconds) */
const DAMAGE_FLASH_DURATION = 0.2
/** Death animation duration (seconds) */
const DEATH_ANIMATION_DURATION = 1.0
/** Time after death before removal (seconds) */
const DEATH_REMOVAL_DELAY = 0.5
/** Head rotation limits (radians) */
const HEAD_YAW_LIMIT = Math.PI / 3      // ±60 degrees
const HEAD_PITCH_LIMIT = Math.PI / 6    // ±30 degrees
/** Head rotation speed */
const HEAD_ROTATION_SPEED = 3.0

/**
 * Callback for animal death event
 */
export type AnimalDeathCallback = (animal: Animal, position: THREE.Vector3, foodType: string | null) => void

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

  /** Sound timer for ambient sounds */
  private soundTimer: number = 0

  // Health system (Feature: 020-survival-mechanics)
  /** Current health */
  private _health: number = 10
  /** Maximum health */
  private _maxHealth: number = 10
  /** Whether animal is dead */
  private _isDead: boolean = false
  /** Damage flash timer */
  private damageFlashTimer: number = 0
  /** Original materials for damage flash */
  private originalMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map()
  /** Death callback */
  private onDeathCallback: AnimalDeathCallback | null = null

  // Animation system (Feature: 022-animal-animation-system)
  /** Animation state data */
  protected animData: AnimalAnimationData = createDefaultAnimationData()
  /** Death animation timer */
  private deathAnimTimer: number = 0
  /** Whether death animation is complete */
  private deathAnimComplete: boolean = false
  /** Last known player position for head tracking */
  private lastPlayerPosition: THREE.Vector3 = new THREE.Vector3()
  /** Reference to head mesh for rotation (set by subclass) */
  protected headMesh: THREE.Mesh | null = null
  /** Reference to body mesh for breathing/dying (set by subclass) */
  protected bodyMesh: THREE.Mesh | null = null
  /** Reference to leg meshes for walking animation (set by subclass) */
  protected legMeshes: THREE.Mesh[] = []

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
    
    // Initialize sound timer with random offset
    this.soundTimer = MIN_SOUND_INTERVAL + Math.random() * (MAX_SOUND_INTERVAL - MIN_SOUND_INTERVAL)
    
    // Initialize health from config (Feature: 020-survival-mechanics)
    this._maxHealth = this.config.maxHealth
    this._health = this._maxHealth
  }

  /**
   * Create the animal mesh (implemented by subclasses)
   */
  protected abstract createMesh(): void

  /**
   * Update animal state
   */
  update(deltaTime: number, playerPosition: THREE.Vector3, world?: ICollisionWorld): void {
    // Store player position for head tracking
    this.lastPlayerPosition.copy(playerPosition)
    
    // Handle death animation (Feature: 022-animal-animation-system)
    if (this._isDead) {
      this.updateDeathAnimation(deltaTime)
      return
    }
    
    // Update damage flash (Feature: 020-survival-mechanics)
    this.updateDamageFlash(deltaTime)
    
    // Update hurt animation state
    if (this.animData.currentState === AnimalAnimationState.HURT) {
      this.animData.stateTime += deltaTime
      const hurtConfig = getAnimationConfig(AnimalAnimationState.HURT)
      if (this.animData.stateTime >= hurtConfig.duration) {
        // Hurt animation complete, return to previous state
        this.setAnimationState(this.animData.previousState)
      }
    }
    
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

    // Update animation state based on AI state
    this.updateAnimationState()
    
    // Update animation
    this.updateAnimation(deltaTime)
    
    // Update head tracking (Feature: 022-animal-animation-system)
    this.updateHeadTracking(deltaTime, playerPosition)
    
    // Update ambient sounds
    this.updateSound(deltaTime, playerPosition)

    // Sync mesh position and rotation
    // The mesh is built with feet at y=0, but physics uses center position
    // So we offset the mesh down by half height to align feet with ground
    this.mesh.position.set(
      this.position.x,
      this.position.y - this.height / 2,
      this.position.z
    )
    this.mesh.rotation.y = this.rotation
  }
  
  /**
   * Update animation state based on AI state
   */
  private updateAnimationState(): void {
    // Don't change state during hurt animation
    if (this.animData.currentState === AnimalAnimationState.HURT) return
    if (this.animData.currentState === AnimalAnimationState.DYING) return
    
    let newState: AnimalAnimationState
    
    if (this.inWater) {
      newState = AnimalAnimationState.SWIMMING
    } else if (this.state === AnimalState.IDLE) {
      newState = AnimalAnimationState.IDLE
    } else if (this.state === AnimalState.FLEEING) {
      newState = AnimalAnimationState.RUNNING
    } else {
      newState = AnimalAnimationState.WALKING
    }
    
    if (newState !== this.animData.currentState) {
      this.setAnimationState(newState)
    }
  }
  
  /**
   * Set animation state with transition
   */
  protected setAnimationState(newState: AnimalAnimationState): void {
    if (newState === this.animData.currentState) return
    
    this.animData.previousState = this.animData.currentState
    this.animData.currentState = newState
    this.animData.stateTime = 0
    this.animData.blendProgress = 0
  }
  
  /**
   * Update head tracking to look at player
   * Feature: 022-animal-animation-system
   */
  private updateHeadTracking(deltaTime: number, playerPosition: THREE.Vector3): void {
    if (!this.headMesh) return
    
    // Calculate direction to player
    const toPlayer = new THREE.Vector3()
      .subVectors(playerPosition, this.position)
    
    const distanceToPlayer = toPlayer.length()
    
    // Only track player if within reasonable distance
    if (distanceToPlayer > 15) {
      // Gradually return head to forward position
      this.animData.headYaw = THREE.MathUtils.lerp(this.animData.headYaw, 0, deltaTime * 2)
      this.animData.headPitch = THREE.MathUtils.lerp(this.animData.headPitch, 0, deltaTime * 2)
    } else {
      // Project to horizontal plane for yaw
      const horizontalToPlayer = new THREE.Vector3(toPlayer.x, 0, toPlayer.z).normalize()
      
      // Calculate yaw (horizontal angle) relative to body rotation
      let targetYaw = Math.atan2(horizontalToPlayer.x, horizontalToPlayer.z) - this.rotation
      
      // Normalize to -PI to PI
      while (targetYaw > Math.PI) targetYaw -= Math.PI * 2
      while (targetYaw < -Math.PI) targetYaw += Math.PI * 2
      
      // Clamp to limits
      targetYaw = THREE.MathUtils.clamp(targetYaw, -HEAD_YAW_LIMIT, HEAD_YAW_LIMIT)
      
      // Calculate pitch (vertical angle)
      const horizontalDist = Math.sqrt(toPlayer.x * toPlayer.x + toPlayer.z * toPlayer.z)
      let targetPitch = Math.atan2(toPlayer.y - 0.5, horizontalDist) // Offset for head height
      targetPitch = THREE.MathUtils.clamp(targetPitch, -HEAD_PITCH_LIMIT, HEAD_PITCH_LIMIT)
      
      // Smoothly interpolate
      this.animData.headYaw = THREE.MathUtils.lerp(
        this.animData.headYaw,
        targetYaw,
        deltaTime * HEAD_ROTATION_SPEED
      )
      this.animData.headPitch = THREE.MathUtils.lerp(
        this.animData.headPitch,
        targetPitch,
        deltaTime * HEAD_ROTATION_SPEED
      )
    }
    
    // Apply rotation to head mesh
    this.headMesh.rotation.y = this.animData.headYaw
    this.headMesh.rotation.x = this.animData.headPitch
  }
  
  /**
   * Update death animation
   * Feature: 022-animal-animation-system
   */
  private updateDeathAnimation(deltaTime: number): void {
    if (this.deathAnimComplete) return
    
    this.deathAnimTimer += deltaTime
    
    // Calculate death animation progress
    const progress = Math.min(this.deathAnimTimer / DEATH_ANIMATION_DURATION, 1)
    
    // Ease out for natural falling motion
    const easedProgress = 1 - Math.pow(1 - progress, 2)
    
    // Tilt body to side (fall over)
    this.animData.bodyTilt = easedProgress * (Math.PI / 2)
    this.mesh.rotation.z = this.animData.bodyTilt
    
    // Slight drop as animal falls
    const dropAmount = easedProgress * 0.3
    this.mesh.position.y -= dropAmount * deltaTime * 2
    
    // Fade out at end
    if (progress >= 1) {
      this.deathAnimComplete = true
      
      // Wait a bit then notify for removal
      setTimeout(() => {
        // Trigger removal callback if set
        if (this.onDeathCallback) {
          // Already called in die(), this is just for cleanup timing
        }
      }, DEATH_REMOVAL_DELAY * 1000)
    }
  }
  
  /**
   * Check if death animation is complete
   */
  isDeathAnimationComplete(): boolean {
    return this.deathAnimComplete
  }
  
  /**
   * Update ambient sound emission
   */
  private updateSound(deltaTime: number, playerPosition: THREE.Vector3): void {
    this.soundTimer -= deltaTime
    
    if (this.soundTimer <= 0) {
      // Reset timer
      this.soundTimer = MIN_SOUND_INTERVAL + Math.random() * (MAX_SOUND_INTERVAL - MIN_SOUND_INTERVAL)
      
      // Check distance to player
      const distance = this.position.distanceTo(playerPosition)
      if (distance > 50) return // Too far to hear
      
      // Play animal sound
      const audioManager = AudioManager.getInstance()
      const soundName = audioManager.getAnimalSound(String(this.animalType))
      
      if (soundName && audioManager.initialized) {
        audioManager.play3dSfx(
          soundName,
          this.position.x,
          this.position.y,
          this.position.z,
          {
            volume: 0.6,
            refDistance: 3,
            maxDistance: 50,
            rolloffFactor: 1
          }
        )
      }
    }
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
   * Update animation (can be overridden by subclasses)
   * Feature: 022-animal-animation-system - Enhanced with state-based animations
   */
  protected updateAnimation(deltaTime: number): void {
    // Update animation time
    const speedMultiplier = this.getAnimationSpeedMultiplier()
    this.animationTime += deltaTime * speedMultiplier
    
    // Update blend progress
    if (this.animData.blendProgress < 1) {
      const config = getAnimationConfig(this.animData.currentState)
      this.animData.blendProgress = Math.min(
        this.animData.blendProgress + deltaTime / config.blendTime,
        1
      )
    }
    
    // Update leg swing angle
    this.animData.legSwingAngle = calculateLegSwing(
      this.animData.currentState,
      this.animationTime
    )
    
    // Apply leg animations
    this.applyLegAnimation()
    
    // Apply breathing animation for idle
    this.applyBreathingAnimation()
  }
  
  /**
   * Get animation speed multiplier based on current state
   */
  private getAnimationSpeedMultiplier(): number {
    switch (this.animData.currentState) {
      case AnimalAnimationState.IDLE:
        return 0.5
      case AnimalAnimationState.WALKING:
        return 2
      case AnimalAnimationState.RUNNING:
        return 3
      case AnimalAnimationState.SWIMMING:
        return 1.5
      case AnimalAnimationState.HURT:
        return 4
      default:
        return 1
    }
  }
  
  /**
   * Apply leg swing animation
   */
  protected applyLegAnimation(): void {
    if (this.legMeshes.length === 0) return
    
    const swing = this.animData.legSwingAngle
    
    // Standard 4-leg animation (front/back legs alternate)
    if (this.legMeshes.length >= 4) {
      if (this.legMeshes[0]) this.legMeshes[0].rotation.x = swing
      if (this.legMeshes[1]) this.legMeshes[1].rotation.x = -swing
      if (this.legMeshes[2]) this.legMeshes[2].rotation.x = -swing
      if (this.legMeshes[3]) this.legMeshes[3].rotation.x = swing
    } else if (this.legMeshes.length >= 2) {
      // 2-leg animation (like chicken)
      if (this.legMeshes[0]) this.legMeshes[0].rotation.x = swing
      if (this.legMeshes[1]) this.legMeshes[1].rotation.x = -swing
    }
  }
  
  /**
   * Apply breathing animation to body
   */
  protected applyBreathingAnimation(): void {
    if (!this.bodyMesh) return
    
    if (this.animData.currentState === AnimalAnimationState.IDLE) {
      const breathScale = calculateBreathingScale(this.animationTime)
      this.bodyMesh.scale.set(breathScale, breathScale, breathScale)
    } else {
      // Reset scale when not idle
      this.bodyMesh.scale.set(1, 1, 1)
    }
  }

  /**
   * Get the mesh
   */
  getMesh(): THREE.Object3D {
    return this.mesh
  }

  // ============================================================================
  // Health System (Feature: 020-survival-mechanics)
  // ============================================================================

  /** Get current health */
  get health(): number { return this._health }
  
  /** Get maximum health */
  get maxHealth(): number { return this._maxHealth }
  
  /** Check if dead */
  get isDead(): boolean { return this._isDead }

  /**
   * Set death callback
   */
  setOnDeath(callback: AnimalDeathCallback): void {
    this.onDeathCallback = callback
  }

  /**
   * Take damage from an attack
   * @param amount Damage amount
   * @returns true if damage was applied
   */
  takeDamage(amount: number): boolean {
    if (this._isDead) return false
    if (amount <= 0) return false
    
    this._health = Math.max(0, this._health - amount)
    
    // Trigger damage flash
    this.startDamageFlash()
    
    // Trigger hurt animation (Feature: 022-animal-animation-system)
    this.setAnimationState(AnimalAnimationState.HURT)
    
    // Check for death
    if (this._health <= 0) {
      this.die()
    }
    
    return true
  }

  /**
   * Start damage flash effect
   */
  private startDamageFlash(): void {
    this.damageFlashTimer = DAMAGE_FLASH_DURATION
    
    // Store original materials and apply red tint
    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (!this.originalMaterials.has(child)) {
          this.originalMaterials.set(child, child.material)
        }
        
        // Create red flash material
        if (Array.isArray(child.material)) {
          child.material = child.material.map(m => {
            const flashMat = (m as THREE.MeshLambertMaterial).clone()
            flashMat.color.setHex(0xff0000)
            return flashMat
          })
        } else {
          const flashMat = (child.material as THREE.MeshLambertMaterial).clone()
          flashMat.color.setHex(0xff0000)
          child.material = flashMat
        }
      }
    })
  }

  /**
   * Update damage flash effect
   */
  private updateDamageFlash(deltaTime: number): void {
    if (this.damageFlashTimer <= 0) return
    
    this.damageFlashTimer -= deltaTime
    
    if (this.damageFlashTimer <= 0) {
      // Restore original materials
      this.mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const original = this.originalMaterials.get(child)
          if (original) {
            child.material = original
          }
        }
      })
      this.originalMaterials.clear()
    }
  }

  /**
   * Handle animal death
   * Feature: 022-animal-animation-system - Added death animation
   */
  private die(): void {
    if (this._isDead) return
    
    this._isDead = true
    
    // Start death animation (Feature: 022-animal-animation-system)
    this.setAnimationState(AnimalAnimationState.DYING)
    this.deathAnimTimer = 0
    this.deathAnimComplete = false
    
    // Get food drop type
    let foodType: string | null = null
    if (this.config.dropsFood) {
      const food = FoodRegistry.getFoodForAnimal(this.animalType)
      if (food) {
        foodType = food
      }
    }
    
    // Notify callback (after animation starts)
    if (this.onDeathCallback) {
      this.onDeathCallback(this, this.position.clone(), foodType)
    }
  }

  /**
   * Set health directly (for loading from save)
   */
  setHealth(health: number): void {
    this._health = Math.max(0, Math.min(this._maxHealth, health))
    if (this._health <= 0) {
      this._isDead = true
    }
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
