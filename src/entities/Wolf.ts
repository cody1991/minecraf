/**
 * Wolf - Wolf animal entity
 * Feature: 009-ecosystem-flora-fauna
 * Feature: 022-animal-animation-system - Enhanced animations
 */

import * as THREE from 'three'
import { Animal } from './Animal'
import { AnimalType } from './AnimalTypes'
import { AnimalAnimationState } from '../animation/AnimationState'

/**
 * Wolf animal - gray, medium-sized, passive behavior
 */
export class Wolf extends Animal {
  private tailMesh!: THREE.Mesh

  constructor(x: number, y: number, z: number) {
    super(AnimalType.WOLF, x, y, z)
    // Set collision dimensions for wolf
    this.width = 0.6
    this.height = 0.8
    this.createMesh()
  }

  protected createMesh(): void {
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 }) // Gray
    const bellyMaterial = new THREE.MeshLambertMaterial({ color: 0xc0c0c0 }) // Light gray
    const noseMaterial = new THREE.MeshLambertMaterial({ color: 0x2a2a2a }) // Dark gray

    // Body (elongated)
    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.45, 0.9)
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    this.bodyMesh.position.set(0, 0.55, 0)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // Belly (lighter underside)
    const bellyGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.7)
    const belly = new THREE.Mesh(bellyGeometry, bellyMaterial)
    belly.position.set(0, 0.35, 0)
    this.mesh.add(belly)

    // Head (wolf-like snout)
    const headGeometry = new THREE.BoxGeometry(0.35, 0.3, 0.4)
    this.headMesh = new THREE.Mesh(headGeometry, bodyMaterial)
    this.headMesh.position.set(0, 0.7, 0.55)
    this.headMesh.castShadow = true
    this.mesh.add(this.headMesh)

    // Snout
    const snoutGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.25)
    const snout = new THREE.Mesh(snoutGeometry, bodyMaterial)
    snout.position.set(0, 0.62, 0.8)
    this.mesh.add(snout)

    // Nose
    const noseGeometry = new THREE.BoxGeometry(0.08, 0.06, 0.05)
    const nose = new THREE.Mesh(noseGeometry, noseMaterial)
    nose.position.set(0, 0.65, 0.93)
    this.mesh.add(nose)

    // Ears (pointed)
    const earGeometry = new THREE.BoxGeometry(0.1, 0.15, 0.08)
    
    const earLeft = new THREE.Mesh(earGeometry, bodyMaterial)
    earLeft.position.set(-0.12, 0.9, 0.5)
    earLeft.rotation.z = -0.2
    this.mesh.add(earLeft)
    
    const earRight = new THREE.Mesh(earGeometry, bodyMaterial)
    earRight.position.set(0.12, 0.9, 0.5)
    earRight.rotation.z = 0.2
    this.mesh.add(earRight)

    // Eyes
    const eyeGeometry = new THREE.BoxGeometry(0.06, 0.04, 0.02)
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0xffcc00 }) // Yellow eyes
    
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial)
    eyeLeft.position.set(-0.1, 0.75, 0.75)
    this.mesh.add(eyeLeft)
    
    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial)
    eyeRight.position.set(0.1, 0.75, 0.75)
    this.mesh.add(eyeRight)

    // Tail (bushy)
    const tailGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.4)
    this.tailMesh = new THREE.Mesh(tailGeometry, bodyMaterial)
    this.tailMesh.position.set(0, 0.6, -0.6)
    this.tailMesh.rotation.x = -0.3
    this.mesh.add(this.tailMesh)

    // Legs (4 legs)
    const legGeometry = new THREE.BoxGeometry(0.12, 0.35, 0.12)
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 })
    
    const legPositions = [
      [-0.15, 0.175, -0.3],  // Back left
      [0.15, 0.175, -0.3],   // Back right
      [-0.15, 0.175, 0.3],   // Front left
      [0.15, 0.175, 0.3]     // Front right
    ]
    
    for (const pos of legPositions) {
      const leg = new THREE.Mesh(legGeometry, legMaterial)
      leg.position.set(pos[0] ?? 0, pos[1] ?? 0, pos[2] ?? 0)
      leg.castShadow = true
      this.legMeshes.push(leg)
      this.mesh.add(leg)
    }
  }

  protected updateAnimation(deltaTime: number): void {
    super.updateAnimation(deltaTime)
    
    // Tail animation based on state
    if (this.tailMesh) {
      const isMoving = this.animData.currentState === AnimalAnimationState.WALKING ||
                       this.animData.currentState === AnimalAnimationState.RUNNING
      
      if (isMoving) {
        // Tail wag when moving
        this.tailMesh.rotation.y = Math.sin(this.animationTime * 6) * 0.3
      } else {
        // Slow tail wag when idle
        this.tailMesh.rotation.y = Math.sin(this.animationTime * 2) * 0.15
      }
    }
  }
}
