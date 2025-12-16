/**
 * Pig - Pig animal entity
 * Feature: 008-biome-weather-system
 * Feature: 022-animal-animation-system - Enhanced animations
 */

import * as THREE from 'three'
import { Animal } from './Animal'
import { AnimalType } from './AnimalTypes'

/**
 * Pig animal - pink colored, with snout
 */
export class Pig extends Animal {
  constructor(x: number, y: number, z: number) {
    super(AnimalType.PIG, x, y, z)
    // Set collision dimensions for pig
    this.width = 0.7
    this.height = 1.0
    this.createMesh()
  }

  protected createMesh(): void {
    const pigMaterial = new THREE.MeshLambertMaterial({ color: 0xffb6c1 }) // Light pink
    const snoutMaterial = new THREE.MeshLambertMaterial({ color: 0xff9999 }) // Darker pink

    // Body
    const bodyGeometry = new THREE.BoxGeometry(0.7, 0.6, 1.0)
    this.bodyMesh = new THREE.Mesh(bodyGeometry, pigMaterial)
    this.bodyMesh.position.set(0, 0.55, 0)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // Head
    const headGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    this.headMesh = new THREE.Mesh(headGeometry, pigMaterial)
    this.headMesh.position.set(0, 0.65, 0.65)
    this.headMesh.castShadow = true
    this.mesh.add(this.headMesh)

    // Snout
    const snoutGeometry = new THREE.BoxGeometry(0.25, 0.2, 0.15)
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial)
    snout.position.set(0, 0.55, 0.95)
    this.mesh.add(snout)

    // Nostrils (dark spots on snout)
    const nostrilGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.02)
    const nostrilMaterial = new THREE.MeshLambertMaterial({ color: 0x4a4a4a })
    
    const nostrilLeft = new THREE.Mesh(nostrilGeometry, nostrilMaterial)
    nostrilLeft.position.set(-0.06, 0.55, 1.03)
    this.mesh.add(nostrilLeft)
    
    const nostrilRight = new THREE.Mesh(nostrilGeometry, nostrilMaterial)
    nostrilRight.position.set(0.06, 0.55, 1.03)
    this.mesh.add(nostrilRight)

    // Ears
    const earGeometry = new THREE.BoxGeometry(0.15, 0.12, 0.05)
    
    const earLeft = new THREE.Mesh(earGeometry, pigMaterial)
    earLeft.position.set(-0.2, 0.95, 0.6)
    earLeft.rotation.x = -0.5
    earLeft.rotation.z = -0.3
    this.mesh.add(earLeft)
    
    const earRight = new THREE.Mesh(earGeometry, pigMaterial)
    earRight.position.set(0.2, 0.95, 0.6)
    earRight.rotation.x = -0.5
    earRight.rotation.z = 0.3
    this.mesh.add(earRight)

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.15, 0.35, 0.15)
    
    const legPositions = [
      [-0.22, 0.175, -0.35],  // Back left
      [0.22, 0.175, -0.35],   // Back right
      [-0.22, 0.175, 0.35],   // Front left
      [0.22, 0.175, 0.35]     // Front right
    ]
    
    for (const pos of legPositions) {
      const leg = new THREE.Mesh(legGeometry, pigMaterial)
      leg.position.set(pos[0] ?? 0, pos[1] ?? 0, pos[2] ?? 0)
      leg.castShadow = true
      this.legMeshes.push(leg)
      this.mesh.add(leg)
    }

    // Curly tail
    const tailGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.15)
    const tail = new THREE.Mesh(tailGeometry, pigMaterial)
    tail.position.set(0, 0.65, -0.55)
    tail.rotation.x = 0.5
    this.mesh.add(tail)
  }
}
