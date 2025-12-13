/**
 * UnderwaterEffect - Manages underwater visual effects
 * Feature: 007-underwater-display
 * 
 * Handles fog effect and background color changes when player is submerged.
 */

import * as THREE from 'three'
import {
  UNDERWATER_FOG_COLOR,
  UNDERWATER_FOG_DENSITY,
  SKY_BACKGROUND_COLOR,
} from '../core/ChunkConstants'

/**
 * UnderwaterEffect class - manages underwater visual effects
 */
export class UnderwaterEffect {
  private scene: THREE.Scene
  private isActive: boolean = false

  // Cached color objects for performance
  private readonly underwaterColor: THREE.Color
  private readonly normalColor: THREE.Color
  private readonly underwaterFog: THREE.FogExp2

  constructor(scene: THREE.Scene) {
    this.scene = scene
    
    // Initialize colors
    this.underwaterColor = new THREE.Color(UNDERWATER_FOG_COLOR)
    this.normalColor = new THREE.Color(SKY_BACKGROUND_COLOR)
    this.underwaterFog = new THREE.FogExp2(UNDERWATER_FOG_COLOR, UNDERWATER_FOG_DENSITY)
  }

  /**
   * Update underwater effect based on player submerged state
   */
  update(isSubmerged: boolean): void {
    if (isSubmerged && !this.isActive) {
      this.enable()
    } else if (!isSubmerged && this.isActive) {
      this.disable()
    }
  }

  /**
   * Enable underwater effect
   */
  enable(): void {
    if (this.isActive) return
    
    this.scene.fog = this.underwaterFog
    this.scene.background = this.underwaterColor
    this.isActive = true
  }

  /**
   * Disable underwater effect
   */
  disable(): void {
    if (!this.isActive) return
    
    this.scene.fog = null
    this.scene.background = this.normalColor
    this.isActive = false
  }

  /**
   * Check if underwater effect is currently active
   */
  getIsActive(): boolean {
    return this.isActive
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.disable()
  }
}
