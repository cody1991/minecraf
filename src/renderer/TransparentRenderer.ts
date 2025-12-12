/**
 * TransparentRenderer - Handles rendering of transparent blocks
 * Feature: 005-block-textures
 * 
 * Manages depth sorting and proper rendering order for transparent blocks
 * like glass, water, and leaves.
 */

import * as THREE from 'three'

/**
 * TransparentRenderer handles the special rendering needs of transparent blocks
 */
export class TransparentRenderer {
  private camera: THREE.Camera
  private transparentObjects: THREE.Object3D[] = []

  constructor(camera: THREE.Camera) {
    this.camera = camera
  }

  /**
   * Register a transparent object for depth-sorted rendering
   */
  registerTransparentObject(object: THREE.Object3D): void {
    if (!this.transparentObjects.includes(object)) {
      this.transparentObjects.push(object)
    }
  }

  /**
   * Unregister a transparent object
   */
  unregisterTransparentObject(object: THREE.Object3D): void {
    const index = this.transparentObjects.indexOf(object)
    if (index !== -1) {
      this.transparentObjects.splice(index, 1)
    }
  }

  /**
   * Sort transparent objects by distance from camera (back to front)
   * Call this before rendering each frame
   */
  sortByDistance(): void {
    const cameraPosition = this.camera.position

    this.transparentObjects.sort((a, b) => {
      // Get world positions
      const posA = new THREE.Vector3()
      const posB = new THREE.Vector3()
      a.getWorldPosition(posA)
      b.getWorldPosition(posB)

      // Sort by distance (far to near)
      const distA = posA.distanceToSquared(cameraPosition)
      const distB = posB.distanceToSquared(cameraPosition)
      return distB - distA
    })

    // Update render order based on sorted position
    this.transparentObjects.forEach((obj, index) => {
      obj.renderOrder = 100 + index
    })
  }

  /**
   * Get all registered transparent objects
   */
  getTransparentObjects(): THREE.Object3D[] {
    return [...this.transparentObjects]
  }

  /**
   * Clear all registered objects
   */
  clear(): void {
    this.transparentObjects = []
  }

  /**
   * Update camera reference
   */
  setCamera(camera: THREE.Camera): void {
    this.camera = camera
  }
}

/**
 * Configure material for transparent block rendering
 */
export function configureTransparentMaterial(material: THREE.Material, opacity: number = 0.8): void {
  if (material instanceof THREE.MeshLambertMaterial || 
      material instanceof THREE.MeshBasicMaterial ||
      material instanceof THREE.MeshStandardMaterial) {
    material.transparent = true
    material.opacity = opacity
    material.depthWrite = false
    material.side = THREE.DoubleSide
    material.alphaTest = 0.1
  }
}

/**
 * Configure material for opaque block rendering
 */
export function configureOpaqueMaterial(material: THREE.Material): void {
  if (material instanceof THREE.MeshLambertMaterial || 
      material instanceof THREE.MeshBasicMaterial ||
      material instanceof THREE.MeshStandardMaterial) {
    material.transparent = false
    material.opacity = 1.0
    material.depthWrite = true
    material.side = THREE.FrontSide
  }
}
