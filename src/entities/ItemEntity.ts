/**
 * ItemEntity - Dropped item entity in the world
 * Feature: 019-inventory-system
 * 
 * Represents an item dropped in the world that can be picked up by the player.
 * Features physics (gravity, bouncing), rotation animation, and player attraction.
 */

import * as THREE from 'three'
import { Entity, generateEntityId } from './Entity'
import { BlockType, BLOCK_COLORS } from '../core/Block'
import { ICollisionWorld } from '../physics/PhysicsTypes'
import {
  ITEM_ENTITY_SIZE,
  ITEM_PICKUP_RANGE,
  ITEM_PICKUP_SPEED,
  ITEM_DESPAWN_TIME,
  ITEM_MAX_BOUNCES,
  ITEM_BOUNCE_FACTOR,
  ITEM_INITIAL_BOUNCE_VELOCITY,
  ITEM_ROTATION_SPEED,
  ITEM_GRAVITY
} from '../player/InventoryConstants'
import { getSharedTextureAtlas } from '../renderer/ChunkMesh'
import { getTextureIndexForFace } from '../renderer/BlockTextures'

/**
 * Item entity state
 */
export enum ItemEntityState {
  Falling = 'falling',
  Bouncing = 'bouncing',
  Resting = 'resting',
  BeingPickedUp = 'beingPickedUp'
}

/**
 * Dropped item entity
 */
export class ItemEntity extends Entity {
  /** Item type (block type) */
  readonly itemType: BlockType
  
  /** Stack count */
  count: number
  
  /** Spawn timestamp */
  readonly spawnTime: number
  
  /** Current state */
  state: ItemEntityState = ItemEntityState.Falling
  
  /** Velocity vector */
  velocity: THREE.Vector3
  
  /** Bounce counter */
  private bounceCount: number = 0
  
  /** 3D mesh */
  private mesh: THREE.Mesh | null = null
  

  
  /** Whether entity should be destroyed */
  private shouldBeDestroyed: boolean = false

  constructor(x: number, y: number, z: number, itemType: BlockType, count: number = 1) {
    super(generateEntityId(), x, y, z)
    this.itemType = itemType
    this.count = Math.min(count, 64)
    this.spawnTime = Date.now()
    
    // Initial velocity with slight random horizontal spread and upward bounce
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      ITEM_INITIAL_BOUNCE_VELOCITY * 20, // Convert to velocity units
      (Math.random() - 0.5) * 2
    )
    
    // Random initial rotation
    this.rotation = Math.random() * Math.PI * 2
    
    // Create mesh
    this.createMesh()
  }

  /**
   * Create the 3D mesh for this item
   * Uses proper UV mapping to display the correct block texture on each face
   */
  private createMesh(): void {
    const size = ITEM_ENTITY_SIZE
    
    try {
      const atlas = getSharedTextureAtlas()
      const atlasTexture = atlas.getTexture()
      const config = atlas.getConfig()
      
      // Get texture indices for each face
      const topIndex = getTextureIndexForFace(this.itemType, 'top')
      const bottomIndex = getTextureIndexForFace(this.itemType, 'bottom')
      const sideIndex = getTextureIndexForFace(this.itemType, 'side')
      
      // Calculate UV scale
      const uScale = 1 / config.columns
      // V coordinates: textures are in row 0 of canvas (top), 
      // but in UV space (0,0) is bottom-left, so row 0 is at the top of UV space
      const vScale = 1 / config.rows
      const v0 = (config.rows - 1) * vScale  // Bottom of first row in UV
      const v1 = 1.0                          // Top of first row in UV
      
      // Create custom geometry with proper UVs
      const geometry = new THREE.BoxGeometry(size, size, size)
      const uvAttribute = geometry.getAttribute('uv')
      const uvArray = uvAttribute.array as Float32Array
      
      // BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z
      // Each face has 4 vertices, each vertex has 2 UV coords = 8 floats per face
      
      // Helper to set UV for a face (4 vertices)
      const setFaceUV = (faceIndex: number, textureIndex: number) => {
        const u0 = textureIndex * uScale
        const u1 = (textureIndex + 1) * uScale
        
        const baseIdx = faceIndex * 8 // 4 vertices * 2 coords
        // Vertex order for each face in BoxGeometry: 
        // bottom-left, bottom-right, top-left, top-right
        uvArray[baseIdx + 0] = u0; uvArray[baseIdx + 1] = v0 // bottom-left
        uvArray[baseIdx + 2] = u1; uvArray[baseIdx + 3] = v0 // bottom-right
        uvArray[baseIdx + 4] = u0; uvArray[baseIdx + 5] = v1 // top-left
        uvArray[baseIdx + 6] = u1; uvArray[baseIdx + 7] = v1 // top-right
      }
      
      // Set UVs for each face
      setFaceUV(0, sideIndex)   // +X (right)
      setFaceUV(1, sideIndex)   // -X (left)
      setFaceUV(2, topIndex)    // +Y (top)
      setFaceUV(3, bottomIndex) // -Y (bottom)
      setFaceUV(4, sideIndex)   // +Z (front)
      setFaceUV(5, sideIndex)   // -Z (back)
      
      uvAttribute.needsUpdate = true
      
      const material = new THREE.MeshLambertMaterial({
        map: atlasTexture,
        transparent: false
      })
      
      this.mesh = new THREE.Mesh(geometry, material)
    } catch {
      // Fallback to solid color
      const geometry = new THREE.BoxGeometry(size, size, size)
      const color = BLOCK_COLORS[this.itemType] ?? 0x808080
      const material = new THREE.MeshLambertMaterial({ color })
      this.mesh = new THREE.Mesh(geometry, material)
    }
    
    this.mesh.position.copy(this.position)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
  }

  /**
   * Update item entity
   */
  update(deltaTime: number, playerPosition: THREE.Vector3, world?: ICollisionWorld): void {
    if (!this.isActive || this.shouldBeDestroyed) return

    // Check despawn time
    const age = (Date.now() - this.spawnTime) / 1000
    if (age >= ITEM_DESPAWN_TIME) {
      this.shouldBeDestroyed = true
      return
    }

    // Update based on state
    switch (this.state) {
      case ItemEntityState.Falling:
      case ItemEntityState.Bouncing:
        this.updatePhysics(deltaTime, world)
        break
      case ItemEntityState.Resting:
        this.checkPlayerProximity(playerPosition)
        break
      case ItemEntityState.BeingPickedUp:
        this.updatePickup(deltaTime, playerPosition)
        break
    }

    // Rotate the item for visual effect (except when being picked up)
    if (this.state !== ItemEntityState.BeingPickedUp) {
      this.rotation += ITEM_ROTATION_SPEED * deltaTime
    }

    // Update mesh position and rotation
    if (this.mesh) {
      this.mesh.position.copy(this.position)
      this.mesh.rotation.y = this.rotation
    }

    // Lava destruction check (not implemented yet, reserved for future)
  }

  /**
   * Update physics (gravity, collision, bouncing)
   */
  private updatePhysics(deltaTime: number, world?: ICollisionWorld): void {
    // Apply gravity
    this.velocity.y -= ITEM_GRAVITY * deltaTime

    // Calculate new position
    const newX = this.position.x + this.velocity.x * deltaTime
    const newY = this.position.y + this.velocity.y * deltaTime
    const newZ = this.position.z + this.velocity.z * deltaTime

    // Check collision with ground
    if (world) {
      const groundY = this.findGroundLevel(world, newX, newY, newZ)
      
      if (newY <= groundY + ITEM_ENTITY_SIZE / 2) {
        // Hit ground
        this.position.y = groundY + ITEM_ENTITY_SIZE / 2
        
        if (this.bounceCount < ITEM_MAX_BOUNCES && Math.abs(this.velocity.y) > 1) {
          // Bounce
          this.velocity.y = -this.velocity.y * ITEM_BOUNCE_FACTOR
          this.velocity.x *= 0.8 // Friction
          this.velocity.z *= 0.8
          this.bounceCount++
          this.state = ItemEntityState.Bouncing
        } else {
          // Come to rest
          this.velocity.set(0, 0, 0)
          this.state = ItemEntityState.Resting
        }
      } else {
        this.position.y = newY
      }
      
      // Update horizontal position with simple collision
      this.position.x = newX
      this.position.z = newZ
    } else {
      // No world reference, just apply velocity
      this.position.x = newX
      this.position.y = Math.max(0.5, newY) // Don't go below y=0
      this.position.z = newZ
      
      if (this.position.y <= 0.5) {
        this.velocity.set(0, 0, 0)
        this.state = ItemEntityState.Resting
      }
    }

    // Apply drag
    this.velocity.x *= 0.98
    this.velocity.z *= 0.98
  }

  /**
   * Find ground level at a position
   */
  private findGroundLevel(world: ICollisionWorld, x: number, y: number, z: number): number {
    const bx = Math.floor(x)
    const bz = Math.floor(z)
    
    // Search downward for solid block
    for (let by = Math.floor(y); by >= 0; by--) {
      const block = world.getBlock(bx, by, bz)
      if (block !== null && block !== BlockType.AIR && block !== BlockType.WATER) {
        return by + 1 // Top of the solid block
      }
    }
    
    return 0 // Default ground level
  }

  /**
   * Check if player is close enough to start pickup
   */
  private checkPlayerProximity(playerPosition: THREE.Vector3): void {
    const distance = this.position.distanceTo(playerPosition)
    
    if (distance <= ITEM_PICKUP_RANGE) {
      this.state = ItemEntityState.BeingPickedUp
    }
  }

  /**
   * Update pickup animation (fly towards player)
   */
  private updatePickup(deltaTime: number, playerPosition: THREE.Vector3): void {
    // Calculate direction to player
    const direction = new THREE.Vector3()
      .subVectors(playerPosition, this.position)
      .normalize()
    
    // Move towards player
    const speed = ITEM_PICKUP_SPEED
    this.position.add(direction.multiplyScalar(speed * deltaTime))
    
    // Check if reached player
    const distance = this.position.distanceTo(playerPosition)
    if (distance < 0.5) {
      this.shouldBeDestroyed = true
    }
  }

  /**
   * Start being picked up by player
   */
  startPickup(_playerPosition: THREE.Vector3): void {
    this.state = ItemEntityState.BeingPickedUp
  }

  /**
   * Check if this entity should be destroyed
   */
  shouldDestroy(): boolean {
    return this.shouldBeDestroyed
  }

  /**
   * Mark for destruction
   */
  markForDestruction(): void {
    this.shouldBeDestroyed = true
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
    if (this.mesh) {
      if (this.mesh.geometry) {
        this.mesh.geometry.dispose()
      }
      if (this.mesh.material) {
        if (Array.isArray(this.mesh.material)) {
          this.mesh.material.forEach(m => m.dispose())
        } else {
          this.mesh.material.dispose()
        }
      }
      this.mesh = null
    }
    this.isActive = false
  }
}
