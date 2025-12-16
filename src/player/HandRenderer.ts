/**
 * HandRenderer - First-person hand and held item rendering
 * Feature: 023-hand-item-attack-animation
 */

import * as THREE from 'three'
import { BlockType, isTransparent } from '../core/Block'
import { getSharedTextureAtlas } from '../renderer/ChunkMesh'
import { getTextureIndexForFace } from '../renderer/BlockTextures'
import { HandAnimator } from '../animation/HandAnimator'
import { FoodRegistry } from '../survival/FoodRegistry'

/** Hand position relative to camera */
const HAND_POSITION = new THREE.Vector3(0.4, -0.35, -0.5)

/** Hand rotation (slightly tilted) */
const HAND_ROTATION = new THREE.Euler(-0.1, -0.3, 0.1)

/** Block item scale */
const BLOCK_SCALE = 0.25

/** Food item scale */
const FOOD_SCALE = 0.2

/**
 * HandRenderer - Renders held items in first-person view
 */
export class HandRenderer {
  /** Container group attached to camera */
  private container: THREE.Group
  
  /** Current item mesh */
  private itemMesh: THREE.Mesh | null = null
  
  /** Current held item type */
  private currentItemType: BlockType | null = null
  
  /** Hand animator */
  private animator: HandAnimator
  
  /** Base position for animation */
  private basePosition: THREE.Vector3
  
  /** Base rotation for animation */
  private baseRotation: THREE.Euler
  
  /** Whether renderer is visible (first-person only) */
  private _visible: boolean = true
  
  constructor() {
    this.container = new THREE.Group()
    this.container.name = 'HandRenderer'
    
    this.animator = new HandAnimator()
    this.basePosition = HAND_POSITION.clone()
    this.baseRotation = HAND_ROTATION.clone()
  }
  
  /**
   * Get the container to attach to camera
   */
  getContainer(): THREE.Group {
    return this.container
  }
  
  /**
   * Set visibility (hide in third-person)
   */
  set visible(value: boolean) {
    this._visible = value
    this.container.visible = value
  }
  
  get visible(): boolean {
    return this._visible
  }
  
  /**
   * Set the held item
   */
  setItem(itemType: BlockType | null): void {
    if (itemType === this.currentItemType) return
    
    // Remove old mesh
    if (this.itemMesh) {
      this.container.remove(this.itemMesh)
      this.itemMesh.geometry.dispose()
      if (this.itemMesh.material instanceof THREE.Material) {
        this.itemMesh.material.dispose()
      }
      this.itemMesh = null
    }
    
    this.currentItemType = itemType
    
    if (itemType === null || itemType === BlockType.AIR) {
      // Empty hand - no item to render
      return
    }
    
    // Create appropriate mesh based on item type
    if (FoodRegistry.isFood(itemType)) {
      this.itemMesh = this.createFoodMesh(itemType)
    } else {
      this.itemMesh = this.createBlockMesh(itemType)
    }
    
    if (this.itemMesh) {
      this.itemMesh.position.copy(this.basePosition)
      this.itemMesh.rotation.copy(this.baseRotation)
      this.container.add(this.itemMesh)
    }
  }
  
  /**
   * Create a block item mesh
   */
  private createBlockMesh(blockType: BlockType): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(BLOCK_SCALE, BLOCK_SCALE, BLOCK_SCALE)
    
    // Get texture atlas
    const atlas = getSharedTextureAtlas()
    const atlasTexture = atlas.getTexture()
    
    // Create materials for each face
    const materials = this.createBlockMaterials(blockType, atlasTexture)
    
    const mesh = new THREE.Mesh(geometry, materials)
    mesh.castShadow = false
    mesh.receiveShadow = false
    
    // Rotate block for better viewing angle
    mesh.rotation.set(0.2, 0.8, 0.1)
    
    return mesh
  }
  
  /**
   * Create materials for block faces
   */
  private createBlockMaterials(blockType: BlockType, atlasTexture: THREE.Texture): THREE.Material[] {
    const atlas = getSharedTextureAtlas()
    const faces = ['side', 'side', 'top', 'bottom', 'side', 'side'] as const
    
    return faces.map(face => {
      const textureIndex = getTextureIndexForFace(blockType, face)
      const uvs = atlas.getUVsForIndex(textureIndex)
      
      // Clone texture and set UV offset/repeat
      const texture = atlasTexture.clone()
      texture.needsUpdate = true
      texture.repeat.set(uvs[2] - uvs[0], uvs[3] - uvs[1])
      texture.offset.set(uvs[0], uvs[1])
      
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: isTransparent(blockType),
        side: THREE.FrontSide
      })
      
      return material
    })
  }
  
  /**
   * Create a food item mesh (flat sprite-like)
   */
  private createFoodMesh(blockType: BlockType): THREE.Mesh {
    // Create a flat plane for food
    const geometry = new THREE.PlaneGeometry(FOOD_SCALE, FOOD_SCALE)
    
    const atlas = getSharedTextureAtlas()
    const atlasTexture = atlas.getTexture()
    const textureIndex = getTextureIndexForFace(blockType, 'side')
    const uvs = atlas.getUVsForIndex(textureIndex)
    
    const texture = atlasTexture.clone()
    texture.needsUpdate = true
    texture.repeat.set(uvs[2] - uvs[0], uvs[3] - uvs[1])
    texture.offset.set(uvs[0], uvs[1])
    
    const material = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    })
    
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = false
    mesh.receiveShadow = false
    
    // Rotate to face camera
    mesh.rotation.set(0, 0.3, 0.1)
    
    return mesh
  }
  
  /**
   * Trigger attack animation
   */
  attack(): void {
    console.log('[HandRenderer] attack() called')
    this.animator.startSwing()
  }
  
  /**
   * Trigger place animation
   */
  place(): void {
    console.log('[HandRenderer] place() called')
    this.animator.startPlace()
  }
  
  /**
   * Start eating animation
   */
  startEating(): void {
    console.log('[HandRenderer] startEating() called')
    this.animator.startEating()
  }
  
  /**
   * Stop eating animation
   */
  stopEating(): void {
    console.log('[HandRenderer] stopEating() called')
    this.animator.stopEating()
  }
  
  /**
   * Update animation
   */
  update(deltaTime: number, isMoving: boolean): void {
    this.animator.update(deltaTime, isMoving)
    
    if (!this.itemMesh) return
    
    // Apply base position
    this.itemMesh.position.copy(this.basePosition)
    this.itemMesh.rotation.copy(this.baseRotation)
    
    // Apply walking bob
    const bob = this.animator.getBobOffset()
    this.itemMesh.position.x += bob.x
    this.itemMesh.position.y += bob.y
    
    // Apply swing rotation and offset
    const swingRot = this.animator.getSwingRotation()
    const swingOffset = this.animator.getSwingOffset()
    if (swingRot !== 0) {
      this.itemMesh.rotation.x += swingRot
      this.itemMesh.position.y += swingOffset.y
    }
    
    // Apply place offset
    const placeOffset = this.animator.getPlaceOffset()
    this.itemMesh.position.z -= placeOffset
    
    // Apply eating offset
    const eatingOffset = this.animator.getEatingOffset()
    if (eatingOffset.x !== 0 || eatingOffset.y !== 0) {
      this.itemMesh.position.x += eatingOffset.x
      this.itemMesh.position.y += eatingOffset.y
      this.itemMesh.position.z += eatingOffset.z
      this.itemMesh.rotation.x += eatingOffset.rotX
    }
  }
  
  /**
   * Dispose resources
   */
  dispose(): void {
    if (this.itemMesh) {
      this.container.remove(this.itemMesh)
      this.itemMesh.geometry.dispose()
      if (Array.isArray(this.itemMesh.material)) {
        this.itemMesh.material.forEach(m => m.dispose())
      } else if (this.itemMesh.material instanceof THREE.Material) {
        this.itemMesh.material.dispose()
      }
      this.itemMesh = null
    }
  }
}
