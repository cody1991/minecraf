/**
 * Sheep - Sheep animal entity
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { Animal } from './Animal'
import { AnimalType } from './AnimalTypes'

/**
 * Sheep animal - white wool, gray face and legs
 */
export class Sheep extends Animal {
  private bodyMesh!: THREE.Mesh
  private headMesh!: THREE.Mesh
  private legMeshes: THREE.Mesh[] = []

  constructor(x: number, y: number, z: number) {
    super(AnimalType.SHEEP, x, y, z)
    // Set collision dimensions for sheep
    this.width = 0.9
    this.height = 1.2
    this.createMesh()
  }

  protected createMesh(): void {
    const woolMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 }) // White wool
    const skinMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 }) // Gray skin

    // Wool body (fluffy, larger than actual body)
    const woolGeometry = new THREE.BoxGeometry(0.9, 0.7, 1.0)
    this.bodyMesh = new THREE.Mesh(woolGeometry, woolMaterial)
    this.bodyMesh.position.set(0, 0.65, 0)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // Head (gray)
    const headGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.45)
    this.headMesh = new THREE.Mesh(headGeometry, skinMaterial)
    this.headMesh.position.set(0, 0.75, 0.65)
    this.headMesh.castShadow = true
    this.mesh.add(this.headMesh)

    // Wool on top of head
    const headWoolGeometry = new THREE.BoxGeometry(0.35, 0.15, 0.35)
    const headWool = new THREE.Mesh(headWoolGeometry, woolMaterial)
    headWool.position.set(0, 1.0, 0.65)
    this.mesh.add(headWool)

    // Ears
    const earGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.05)
    
    const earLeft = new THREE.Mesh(earGeometry, skinMaterial)
    earLeft.position.set(-0.25, 0.85, 0.65)
    earLeft.rotation.z = -0.3
    this.mesh.add(earLeft)
    
    const earRight = new THREE.Mesh(earGeometry, skinMaterial)
    earRight.position.set(0.25, 0.85, 0.65)
    earRight.rotation.z = 0.3
    this.mesh.add(earRight)

    // Legs (gray)
    const legGeometry = new THREE.BoxGeometry(0.15, 0.4, 0.15)
    
    const legPositions = [
      [-0.3, 0.2, -0.35],  // Back left
      [0.3, 0.2, -0.35],   // Back right
      [-0.3, 0.2, 0.35],   // Front left
      [0.3, 0.2, 0.35]     // Front right
    ]
    
    for (const pos of legPositions) {
      const leg = new THREE.Mesh(legGeometry, skinMaterial)
      leg.position.set(pos[0] ?? 0, pos[1] ?? 0, pos[2] ?? 0)
      leg.castShadow = true
      this.legMeshes.push(leg)
      this.mesh.add(leg)
    }
  }

  protected updateAnimation(deltaTime: number): void {
    super.updateAnimation(deltaTime)
    
    // Animate legs when moving
    if (this.state !== 0) { // Not IDLE
      const legSwing = Math.sin(this.animationTime * 8) * 0.3
      
      if (this.legMeshes[0]) this.legMeshes[0].rotation.x = legSwing
      if (this.legMeshes[1]) this.legMeshes[1].rotation.x = -legSwing
      if (this.legMeshes[2]) this.legMeshes[2].rotation.x = -legSwing
      if (this.legMeshes[3]) this.legMeshes[3].rotation.x = legSwing
    } else {
      for (const leg of this.legMeshes) {
        leg.rotation.x = 0
      }
    }

    // Subtle head movement
    if (this.headMesh) {
      this.headMesh.rotation.x = Math.sin(this.animationTime * 1.5) * 0.08
    }

    // Wool "breathing" effect
    if (this.bodyMesh) {
      const breathScale = 1 + Math.sin(this.animationTime * 2) * 0.02
      this.bodyMesh.scale.set(breathScale, breathScale, breathScale)
    }
  }
}
