/**
 * Cow - Cow animal entity
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { Animal } from './Animal'
import { AnimalType } from './AnimalTypes'

/**
 * Cow animal - brown colored, larger body
 */
export class Cow extends Animal {
  private bodyMesh!: THREE.Mesh
  private headMesh!: THREE.Mesh
  private legMeshes: THREE.Mesh[] = []

  constructor(x: number, y: number, z: number) {
    super(AnimalType.COW, x, y, z)
    // Set collision dimensions for cow
    this.width = 0.9
    this.height = 1.4
    this.createMesh()
  }

  protected createMesh(): void {
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }) // Brown
    const spotMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }) // White spots
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 })

    // Body (1.4 x 1.0 x 0.8)
    const bodyGeometry = new THREE.BoxGeometry(0.8, 0.7, 1.2)
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    this.bodyMesh.position.set(0, 0.7, 0)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // White spots on body
    const spotGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.05)
    const spot1 = new THREE.Mesh(spotGeometry, spotMaterial)
    spot1.position.set(0.2, 0.75, 0.61)
    this.mesh.add(spot1)
    
    const spot2 = new THREE.Mesh(spotGeometry, spotMaterial)
    spot2.position.set(-0.15, 0.65, 0.61)
    this.mesh.add(spot2)

    // Head (0.5 x 0.5 x 0.5)
    const headGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    this.headMesh = new THREE.Mesh(headGeometry, headMaterial)
    this.headMesh.position.set(0, 0.9, 0.75)
    this.headMesh.castShadow = true
    this.mesh.add(this.headMesh)

    // Snout
    const snoutGeometry = new THREE.BoxGeometry(0.35, 0.2, 0.15)
    const snoutMaterial = new THREE.MeshLambertMaterial({ color: 0xd4a574 })
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial)
    snout.position.set(0, 0.8, 1.05)
    this.mesh.add(snout)

    // Horns
    const hornGeometry = new THREE.BoxGeometry(0.08, 0.2, 0.08)
    const hornMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5dc })
    
    const hornLeft = new THREE.Mesh(hornGeometry, hornMaterial)
    hornLeft.position.set(-0.2, 1.2, 0.75)
    this.mesh.add(hornLeft)
    
    const hornRight = new THREE.Mesh(hornGeometry, hornMaterial)
    hornRight.position.set(0.2, 1.2, 0.75)
    this.mesh.add(hornRight)

    // Legs (4 legs)
    const legGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.2)
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 })
    
    const legPositions = [
      [-0.25, 0.25, -0.4],  // Back left
      [0.25, 0.25, -0.4],   // Back right
      [-0.25, 0.25, 0.4],   // Front left
      [0.25, 0.25, 0.4]     // Front right
    ]
    
    for (const pos of legPositions) {
      const leg = new THREE.Mesh(legGeometry, legMaterial)
      leg.position.set(pos[0] ?? 0, pos[1] ?? 0, pos[2] ?? 0)
      leg.castShadow = true
      this.legMeshes.push(leg)
      this.mesh.add(leg)
    }

    // Udder
    const udderGeometry = new THREE.BoxGeometry(0.25, 0.15, 0.2)
    const udderMaterial = new THREE.MeshLambertMaterial({ color: 0xffc0cb })
    const udder = new THREE.Mesh(udderGeometry, udderMaterial)
    udder.position.set(0, 0.35, -0.2)
    this.mesh.add(udder)
  }

  protected updateAnimation(deltaTime: number): void {
    super.updateAnimation(deltaTime)
    
    // Animate legs when moving
    if (this.state !== 0) { // Not IDLE
      const legSwing = Math.sin(this.animationTime * 8) * 0.3
      
      // Front legs swing opposite to back legs
      if (this.legMeshes[0]) this.legMeshes[0].rotation.x = legSwing
      if (this.legMeshes[1]) this.legMeshes[1].rotation.x = -legSwing
      if (this.legMeshes[2]) this.legMeshes[2].rotation.x = -legSwing
      if (this.legMeshes[3]) this.legMeshes[3].rotation.x = legSwing
    } else {
      // Reset leg rotation when idle
      for (const leg of this.legMeshes) {
        leg.rotation.x = 0
      }
    }

    // Subtle head bob
    if (this.headMesh) {
      this.headMesh.rotation.x = Math.sin(this.animationTime * 2) * 0.05
    }
  }
}
