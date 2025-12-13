/**
 * Rabbit - Rabbit animal entity
 * Feature: 009-ecosystem-flora-fauna
 */

import * as THREE from 'three'
import { Animal } from './Animal'
import { AnimalType } from './AnimalTypes'

/**
 * Rabbit animal - small, brown, fast moving
 */
export class Rabbit extends Animal {
  private bodyMesh!: THREE.Mesh
  private headMesh!: THREE.Mesh
  private legMeshes: THREE.Mesh[] = []
  private earMeshes: THREE.Mesh[] = []

  constructor(x: number, y: number, z: number) {
    super(AnimalType.RABBIT, x, y, z)
    // Set collision dimensions for rabbit (small)
    this.width = 0.4
    this.height = 0.5
    this.createMesh()
  }

  protected createMesh(): void {
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8b6914 }) // Brown
    const earMaterial = new THREE.MeshLambertMaterial({ color: 0xffb6c1 }) // Pink inner ear

    // Body (small and round)
    const bodyGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.4)
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    this.bodyMesh.position.set(0, 0.25, 0)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // Head (round)
    const headGeometry = new THREE.BoxGeometry(0.25, 0.2, 0.2)
    this.headMesh = new THREE.Mesh(headGeometry, bodyMaterial)
    this.headMesh.position.set(0, 0.35, 0.25)
    this.headMesh.castShadow = true
    this.mesh.add(this.headMesh)

    // Ears (long)
    const earGeometry = new THREE.BoxGeometry(0.06, 0.2, 0.04)
    
    const earLeft = new THREE.Mesh(earGeometry, bodyMaterial)
    earLeft.position.set(-0.08, 0.55, 0.2)
    this.earMeshes.push(earLeft)
    this.mesh.add(earLeft)
    
    const earRight = new THREE.Mesh(earGeometry, bodyMaterial)
    earRight.position.set(0.08, 0.55, 0.2)
    this.earMeshes.push(earRight)
    this.mesh.add(earRight)

    // Inner ears (pink)
    const innerEarGeometry = new THREE.BoxGeometry(0.03, 0.15, 0.02)
    
    const innerEarLeft = new THREE.Mesh(innerEarGeometry, earMaterial)
    innerEarLeft.position.set(-0.08, 0.55, 0.22)
    this.mesh.add(innerEarLeft)
    
    const innerEarRight = new THREE.Mesh(innerEarGeometry, earMaterial)
    innerEarRight.position.set(0.08, 0.55, 0.22)
    this.mesh.add(innerEarRight)

    // Nose
    const noseGeometry = new THREE.BoxGeometry(0.06, 0.04, 0.04)
    const noseMaterial = new THREE.MeshLambertMaterial({ color: 0xffb6c1 })
    const nose = new THREE.Mesh(noseGeometry, noseMaterial)
    nose.position.set(0, 0.32, 0.36)
    this.mesh.add(nose)

    // Tail (fluffy ball)
    const tailGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    const tailMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const tail = new THREE.Mesh(tailGeometry, tailMaterial)
    tail.position.set(0, 0.25, -0.25)
    this.mesh.add(tail)

    // Legs (4 small legs)
    const legGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.08)
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x8b6914 })
    
    const legPositions = [
      [-0.1, 0.075, -0.12],  // Back left
      [0.1, 0.075, -0.12],   // Back right
      [-0.1, 0.075, 0.12],   // Front left
      [0.1, 0.075, 0.12]     // Front right
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
    
    // Animate legs when moving (hopping motion)
    if (this.state !== 0) { // Not IDLE
      const hopPhase = Math.sin(this.animationTime * 12)
      const legSwing = hopPhase * 0.4
      
      // Back legs move together, front legs move together
      if (this.legMeshes[0]) this.legMeshes[0].rotation.x = legSwing
      if (this.legMeshes[1]) this.legMeshes[1].rotation.x = legSwing
      if (this.legMeshes[2]) this.legMeshes[2].rotation.x = -legSwing
      if (this.legMeshes[3]) this.legMeshes[3].rotation.x = -legSwing

      // Hopping body motion
      this.bodyMesh.position.y = 0.25 + Math.abs(hopPhase) * 0.05
    } else {
      // Reset when idle
      for (const leg of this.legMeshes) {
        leg.rotation.x = 0
      }
      this.bodyMesh.position.y = 0.25
    }

    // Ear twitch
    for (const ear of this.earMeshes) {
      ear.rotation.z = Math.sin(this.animationTime * 3 + Math.random()) * 0.1
    }

    // Nose wiggle
    if (this.headMesh) {
      this.headMesh.rotation.x = Math.sin(this.animationTime * 4) * 0.03
    }
  }
}
