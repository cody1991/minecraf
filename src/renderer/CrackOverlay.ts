/**
 * CrackOverlay - Renders crack texture on block being dug
 * Feature: 023-digging-system
 */

import * as THREE from 'three'

/** Crack overlay size (slightly larger than block to prevent z-fighting) */
const OVERLAY_SIZE = 1.002

/**
 * CrackOverlay - Shows crack animation on block being dug
 */
export class CrackOverlay {
  private scene: THREE.Scene
  private mesh: THREE.Mesh | null = null
  private material: THREE.MeshBasicMaterial
  private geometry: THREE.BoxGeometry
  
  /** Current crack stage (0-9) */
  private crackStage: number = 0
  
  /** Whether overlay is visible */
  private _visible: boolean = false

  constructor(scene: THREE.Scene) {
    this.scene = scene
    
    // Create geometry (slightly larger than block)
    this.geometry = new THREE.BoxGeometry(OVERLAY_SIZE, OVERLAY_SIZE, OVERLAY_SIZE)
    
    // Create material with crack texture
    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    })
    
    // Create mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.visible = false
    this.mesh.renderOrder = 1
    this.scene.add(this.mesh)
  }

  /**
   * Set visibility
   */
  set visible(value: boolean) {
    this._visible = value
    if (this.mesh) {
      this.mesh.visible = value
    }
  }

  get visible(): boolean {
    return this._visible
  }

  /**
   * Set target block position
   */
  setPosition(x: number, y: number, z: number): void {
    if (this.mesh) {
      this.mesh.position.set(x + 0.5, y + 0.5, z + 0.5)
    }
  }

  /**
   * Set crack stage (0-9)
   */
  setCrackStage(stage: number): void {
    this.crackStage = Math.max(0, Math.min(9, stage))
    
    // Update material opacity based on crack stage
    // Stage 0 = 10% opacity, Stage 9 = 70% opacity
    const opacity = 0.1 + (this.crackStage / 9) * 0.6
    this.material.opacity = opacity
    
    // Darken color as cracks progress
    const darkness = 1 - (this.crackStage / 9) * 0.5
    this.material.color.setRGB(darkness * 0.3, darkness * 0.3, darkness * 0.3)
  }

  /**
   * Hide overlay
   */
  hide(): void {
    this.visible = false
    this.crackStage = 0
    this.material.opacity = 0
  }

  /**
   * Show overlay at position with crack stage
   */
  show(x: number, y: number, z: number, stage: number): void {
    this.setPosition(x, y, z)
    this.setCrackStage(stage)
    this.visible = true
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    if (this.mesh) {
      this.scene.remove(this.mesh)
      this.mesh.geometry.dispose()
      this.material.dispose()
      this.mesh = null
    }
  }
}
