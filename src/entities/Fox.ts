/**
 * Fox - Fox animal entity
 * Feature: 009-ecosystem-flora-fauna
 */

import * as THREE from 'three'
import { Animal } from './Animal'
import { AnimalType } from './AnimalTypes'

/**
 * Fox animal - orange, medium-sized, agile
 */
export class Fox extends Animal {
  private bodyMesh!: THREE.Mesh
  private headMesh!: THREE.Mesh
  private legMeshes: THREE.Mesh[] = []
  private tailMesh!: THREE.Mesh

  constructor(x: number, y: number, z: number) {
    super(AnimalType.FOX, x, y, z)
    // Set collision dimensions for fox
    this.width = 0.5
    this.height = 0.7
    this.createMesh()
  }

  protected createMesh(): void {
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff6600 }) // Orange
    const whiteMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }) // White
    const blackMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a }) // Black

    // Body
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.35, 0.7)
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    this.bodyMesh.position.set(0, 0.45, 0)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // White belly
    const bellyGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5)
    const belly = new THREE.Mesh(bellyGeometry, whiteMaterial)
    belly.position.set(0, 0.3, 0)
    this.mesh.add(belly)

    // Head
    const headGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.35)
    this.headMesh = new THREE.Mesh(headGeometry, bodyMaterial)
    this.headMesh.position.set(0, 0.55, 0.45)
    this.headMesh.castShadow = true
    this.mesh.add(this.headMesh)

    // Snout (pointed)
    const snoutGeometry = new THREE.BoxGeometry(0.15, 0.12, 0.2)
    const snout = new THREE.Mesh(snoutGeometry, bodyMaterial)
    snout.position.set(0, 0.5, 0.68)
    this.mesh.add(snout)

    // White snout tip
    const snoutTipGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.05)
    const snoutTip = new THREE.Mesh(snoutTipGeometry, whiteMaterial)
    snoutTip.position.set(0, 0.48, 0.78)
    this.mesh.add(snoutTip)

    // Nose
    const noseGeometry = new THREE.BoxGeometry(0.06, 0.04, 0.04)
    const nose = new THREE.Mesh(noseGeometry, blackMaterial)
    nose.position.set(0, 0.52, 0.8)
    this.mesh.add(nose)

    // Ears (large, triangular)
    const earGeometry = new THREE.BoxGeometry(0.12, 0.18, 0.08)
    
    const earLeft = new THREE.Mesh(earGeometry, bodyMaterial)
    earLeft.position.set(-0.1, 0.75, 0.4)
    this.mesh.add(earLeft)
    
    const earRight = new THREE.Mesh(earGeometry, bodyMaterial)
    earRight.position.set(0.1, 0.75, 0.4)
    this.mesh.add(earRight)

    // Black ear tips
    const earTipGeometry = new THREE.BoxGeometry(0.1, 0.06, 0.06)
    
    const earTipLeft = new THREE.Mesh(earTipGeometry, blackMaterial)
    earTipLeft.position.set(-0.1, 0.85, 0.4)
    this.mesh.add(earTipLeft)
    
    const earTipRight = new THREE.Mesh(earTipGeometry, blackMaterial)
    earTipRight.position.set(0.1, 0.85, 0.4)
    this.mesh.add(earTipRight)

    // Eyes
    const eyeGeometry = new THREE.BoxGeometry(0.05, 0.04, 0.02)
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x4a2800 }) // Brown eyes
    
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial)
    eyeLeft.position.set(-0.08, 0.58, 0.62)
    this.mesh.add(eyeLeft)
    
    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial)
    eyeRight.position.set(0.08, 0.58, 0.62)
    this.mesh.add(eyeRight)

    // Tail (fluffy, white tip)
    const tailGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.5)
    this.tailMesh = new THREE.Mesh(tailGeometry, bodyMaterial)
    this.tailMesh.position.set(0, 0.45, -0.55)
    this.tailMesh.rotation.x = 0.3
    this.mesh.add(this.tailMesh)

    // White tail tip
    const tailTipGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.15)
    const tailTip = new THREE.Mesh(tailTipGeometry, whiteMaterial)
    tailTip.position.set(0, 0.5, -0.85)
    this.mesh.add(tailTip)

    // Legs (4 legs with black feet)
    const legGeometry = new THREE.BoxGeometry(0.1, 0.28, 0.1)
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0xff6600 })
    
    const legPositions = [
      [-0.12, 0.14, -0.22],  // Back left
      [0.12, 0.14, -0.22],   // Back right
      [-0.12, 0.14, 0.22],   // Front left
      [0.12, 0.14, 0.22]     // Front right
    ]
    
    for (const pos of legPositions) {
      const leg = new THREE.Mesh(legGeometry, legMaterial)
      leg.position.set(pos[0] ?? 0, pos[1] ?? 0, pos[2] ?? 0)
      leg.castShadow = true
      this.legMeshes.push(leg)
      this.mesh.add(leg)

      // Black feet
      const footGeometry = new THREE.BoxGeometry(0.08, 0.06, 0.08)
      const foot = new THREE.Mesh(footGeometry, blackMaterial)
      foot.position.set(pos[0] ?? 0, 0.03, pos[2] ?? 0)
      this.mesh.add(foot)
    }
  }

  protected updateAnimation(deltaTime: number): void {
    super.updateAnimation(deltaTime)
    
    // Animate legs when moving
    if (this.state !== 0) { // Not IDLE
      const legSwing = Math.sin(this.animationTime * 10) * 0.4
      
      // Opposite leg pairs move together (trot gait)
      if (this.legMeshes[0]) this.legMeshes[0].rotation.x = legSwing
      if (this.legMeshes[1]) this.legMeshes[1].rotation.x = -legSwing
      if (this.legMeshes[2]) this.legMeshes[2].rotation.x = -legSwing
      if (this.legMeshes[3]) this.legMeshes[3].rotation.x = legSwing

      // Tail follows body movement
      if (this.tailMesh) {
        this.tailMesh.rotation.y = Math.sin(this.animationTime * 5) * 0.25
        this.tailMesh.rotation.x = 0.3 + Math.sin(this.animationTime * 3) * 0.1
      }
    } else {
      // Reset leg rotation when idle
      for (const leg of this.legMeshes) {
        leg.rotation.x = 0
      }
      
      // Gentle tail sway when idle
      if (this.tailMesh) {
        this.tailMesh.rotation.y = Math.sin(this.animationTime * 1.5) * 0.1
        this.tailMesh.rotation.x = 0.3
      }
    }

    // Head movement
    if (this.headMesh) {
      this.headMesh.rotation.x = Math.sin(this.animationTime * 2) * 0.04
      this.headMesh.rotation.y = Math.sin(this.animationTime * 0.8) * 0.05
    }
  }
}
