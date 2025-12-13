/**
 * BlockmanBuilder - Procedurally generates blockman character meshes
 * Feature: 013-character-model-view
 */

import * as THREE from 'three'
import { CharacterColors } from '../../player/CharacterTypes'
import { BLOCKMAN_DIMENSIONS, BLOCKMAN_TOTAL_HEIGHT } from '../../player/CharacterConstants'
import { PLAYER_HEIGHT } from '../../player/Player'

/**
 * Character body parts
 */
export interface CharacterParts {
  head: THREE.Mesh
  body: THREE.Mesh
  leftArm: THREE.Mesh
  rightArm: THREE.Mesh
  leftLeg: THREE.Mesh
  rightLeg: THREE.Mesh
}

/**
 * Build result containing mesh group and part references
 */
export interface BlockmanBuildResult {
  mesh: THREE.Group
  parts: CharacterParts
}

/**
 * BlockmanBuilder - Creates blockman style character meshes
 */
export class BlockmanBuilder {
  /**
   * Build a blockman character mesh with the given colors
   */
  static build(colors: CharacterColors): BlockmanBuildResult {
    const group = new THREE.Group()
    
    // Calculate scale factor to match player height
    const scaleFactor = PLAYER_HEIGHT / BLOCKMAN_TOTAL_HEIGHT
    
    const dim = BLOCKMAN_DIMENSIONS
    
    // Create materials for each body part
    const headMaterial = new THREE.MeshLambertMaterial({ color: colors.head })
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: colors.body })
    const armMaterial = new THREE.MeshLambertMaterial({ color: colors.arms })
    const legMaterial = new THREE.MeshLambertMaterial({ color: colors.legs })
    
    // Create geometries
    const headGeometry = new THREE.BoxGeometry(
      dim.HEAD_SIZE * scaleFactor,
      dim.HEAD_SIZE * scaleFactor,
      dim.HEAD_SIZE * scaleFactor
    )
    
    const bodyGeometry = new THREE.BoxGeometry(
      dim.BODY_WIDTH * scaleFactor,
      dim.BODY_HEIGHT * scaleFactor,
      dim.BODY_DEPTH * scaleFactor
    )
    
    const armGeometry = new THREE.BoxGeometry(
      dim.ARM_WIDTH * scaleFactor,
      dim.ARM_HEIGHT * scaleFactor,
      dim.ARM_DEPTH * scaleFactor
    )
    
    const legGeometry = new THREE.BoxGeometry(
      dim.LEG_WIDTH * scaleFactor,
      dim.LEG_HEIGHT * scaleFactor,
      dim.LEG_DEPTH * scaleFactor
    )
    
    // Create meshes
    const head = new THREE.Mesh(headGeometry, headMaterial)
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
    
    // Position body parts relative to center (player position is at center of body)
    // Body is at center
    body.position.set(0, 0, 0)
    
    // Head on top of body
    const headY = (dim.BODY_HEIGHT / 2 + dim.HEAD_SIZE / 2) * scaleFactor
    head.position.set(0, headY, 0)
    
    // Arms on sides of body
    const armX = (dim.BODY_WIDTH / 2 + dim.ARM_WIDTH / 2) * scaleFactor
    const armY = (dim.BODY_HEIGHT / 2 - dim.ARM_HEIGHT / 2) * scaleFactor
    leftArm.position.set(-armX, armY, 0)
    rightArm.position.set(armX, armY, 0)
    
    // Legs below body
    const legY = -(dim.BODY_HEIGHT / 2 + dim.LEG_HEIGHT / 2) * scaleFactor
    const legX = (dim.LEG_WIDTH / 2) * scaleFactor
    leftLeg.position.set(-legX, legY, 0)
    rightLeg.position.set(legX, legY, 0)
    
    // Add eyes if color specified
    if (colors.eyes !== undefined) {
      const eyeSize = dim.HEAD_SIZE * 0.15 * scaleFactor
      const eyeGeometry = new THREE.BoxGeometry(eyeSize, eyeSize, eyeSize * 0.5)
      const eyeMaterial = new THREE.MeshLambertMaterial({ color: colors.eyes })
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
      
      const eyeOffsetX = dim.HEAD_SIZE * 0.2 * scaleFactor
      const eyeOffsetY = dim.HEAD_SIZE * 0.1 * scaleFactor
      const eyeOffsetZ = dim.HEAD_SIZE * 0.5 * scaleFactor
      
      leftEye.position.set(-eyeOffsetX, headY + eyeOffsetY, eyeOffsetZ)
      rightEye.position.set(eyeOffsetX, headY + eyeOffsetY, eyeOffsetZ)
      
      group.add(leftEye)
      group.add(rightEye)
    }
    
    // Add all parts to group
    group.add(head)
    group.add(body)
    group.add(leftArm)
    group.add(rightArm)
    group.add(leftLeg)
    group.add(rightLeg)
    
    // Enable shadows
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    
    return {
      mesh: group,
      parts: {
        head,
        body,
        leftArm,
        rightArm,
        leftLeg,
        rightLeg
      }
    }
  }
  
  /**
   * Dispose of a blockman mesh and its resources
   */
  static dispose(result: BlockmanBuildResult): void {
    result.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (child.material instanceof THREE.Material) {
          child.material.dispose()
        }
      }
    })
  }
}
