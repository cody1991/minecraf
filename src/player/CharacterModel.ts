/**
 * CharacterModel - Runtime character model instance
 * Feature: 013-character-model-view
 */

import * as THREE from 'three'
import { CharacterModelDefinition, CharacterAnimation } from './CharacterTypes'
import { BlockmanBuilder, CharacterParts } from '../models/blockman/BlockmanBuilder'

/**
 * CharacterModel - Runtime instance of a character model
 */
export class CharacterModel {
  /** Model definition */
  readonly definition: CharacterModelDefinition
  
  /** Three.js group containing all body parts */
  readonly mesh: THREE.Group
  
  /** Body part references */
  readonly parts: CharacterParts
  
  /** Current animation */
  private currentAnimation: CharacterAnimation = 'idle'
  
  /** Animation time accumulator */
  private animationTime: number = 0
  
  /** Initial head Y position (for animation offset) */
  private initialHeadY: number = 0
  
  constructor(definition: CharacterModelDefinition) {
    this.definition = definition
    
    // Build the blockman mesh
    const buildResult = BlockmanBuilder.build(definition.colors)
    this.mesh = buildResult.mesh
    this.parts = buildResult.parts
    
    // Store initial head position for animation
    this.initialHeadY = this.parts.head.position.y
    
    // Set name for debugging
    this.mesh.name = `character_${definition.id}`
  }
  
  /**
   * Get/set model visibility
   */
  get visible(): boolean {
    return this.mesh.visible
  }
  
  set visible(value: boolean) {
    this.mesh.visible = value
  }
  
  /**
   * Update model position and rotation
   */
  updateTransform(position: THREE.Vector3, rotation: THREE.Euler): void {
    this.mesh.position.copy(position)
    // Only apply Y rotation (yaw) to the model
    this.mesh.rotation.set(0, rotation.y, 0)
  }
  
  /**
   * Play an animation
   */
  playAnimation(name: CharacterAnimation): void {
    if (this.currentAnimation !== name) {
      this.currentAnimation = name
      this.animationTime = 0
    }
  }
  
  /**
   * Update animation state
   */
  updateAnimation(deltaTime: number, isMoving: boolean): void {
    this.animationTime += deltaTime
    
    // Auto-switch animation based on movement
    if (isMoving && this.currentAnimation === 'idle') {
      this.currentAnimation = 'walk'
    } else if (!isMoving && this.currentAnimation === 'walk') {
      this.currentAnimation = 'idle'
    }
    
    // Apply animation
    switch (this.currentAnimation) {
      case 'walk':
        this.applyWalkAnimation()
        break
      case 'jump':
        this.applyJumpAnimation()
        break
      case 'idle':
      default:
        this.applyIdleAnimation()
        break
    }
  }
  
  /**
   * Apply idle animation (subtle breathing motion)
   */
  private applyIdleAnimation(): void {
    const breathe = Math.sin(this.animationTime * 2) * 0.02
    this.parts.body.position.y = breathe
    this.parts.head.position.y = this.initialHeadY + breathe
    
    // Reset limbs
    this.parts.leftArm.rotation.x = 0
    this.parts.rightArm.rotation.x = 0
    this.parts.leftLeg.rotation.x = 0
    this.parts.rightLeg.rotation.x = 0
  }
  
  /**
   * Apply walk animation (arm and leg swing)
   */
  private applyWalkAnimation(): void {
    const swingSpeed = 8
    const swingAmount = 0.5
    const swing = Math.sin(this.animationTime * swingSpeed) * swingAmount
    
    // Arms swing opposite to legs
    this.parts.leftArm.rotation.x = swing
    this.parts.rightArm.rotation.x = -swing
    this.parts.leftLeg.rotation.x = -swing
    this.parts.rightLeg.rotation.x = swing
  }
  
  /**
   * Apply jump animation (arms up)
   */
  private applyJumpAnimation(): void {
    this.parts.leftArm.rotation.x = -Math.PI * 0.5
    this.parts.rightArm.rotation.x = -Math.PI * 0.5
    this.parts.leftLeg.rotation.x = 0.2
    this.parts.rightLeg.rotation.x = 0.2
  }
  
  /**
   * Dispose of model resources
   */
  dispose(): void {
    BlockmanBuilder.dispose({ mesh: this.mesh, parts: this.parts })
  }
}
