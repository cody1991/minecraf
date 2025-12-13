/**
 * TropicalFish - Colorful tropical fish entity
 * Feature: 009-ecosystem-flora-fauna
 */

import * as THREE from 'three'
import { Fish } from './Fish'
import { FishType } from './FishTypes'

/**
 * Tropical fish - colorful, rarer in water
 */
export class TropicalFish extends Fish {
  private bodyMesh!: THREE.Mesh
  private tailMesh!: THREE.Mesh
  private finMeshes: THREE.Mesh[] = []
  private primaryColor: number = 0xff6600
  private secondaryColor: number = 0x00ffff

  constructor(x: number, y: number, z: number) {
    super(FishType.TROPICAL, x, y, z)
    
    // Update colors with random selection from config after mesh is created
    const colors = this.config.colors
    this.primaryColor = colors[Math.floor(Math.random() * colors.length)] ?? 0xff6600
    this.secondaryColor = colors[Math.floor(Math.random() * colors.length)] ?? 0x00ffff
    
    // Update mesh materials with new colors
    this.updateMeshColors()
  }
  
  /**
   * Update mesh materials with current colors
   */
  private updateMeshColors(): void {
    // Update body material
    if (this.bodyMesh && this.bodyMesh.material instanceof THREE.MeshLambertMaterial) {
      this.bodyMesh.material.color.setHex(this.primaryColor)
    }
    
    // Update other meshes with secondary color
    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh && child !== this.bodyMesh) {
        if (child.material instanceof THREE.MeshLambertMaterial) {
          // Skip eye meshes (black)
          if (child.material.color.getHex() !== 0x000000) {
            child.material.color.setHex(this.secondaryColor)
          }
        }
      }
    })
  }

  protected createMesh(): void {
    // Initialize finMeshes array here since createMesh is called from super() before class field initialization
    this.finMeshes = []
    
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: this.primaryColor })
    const stripeMaterial = new THREE.MeshLambertMaterial({ color: this.secondaryColor })

    // Body (taller, thinner)
    const bodyGeometry = new THREE.BoxGeometry(
      this.config.bodyWidth,
      this.config.bodyHeight,
      this.config.bodyDepth
    )
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // Stripe pattern
    const stripeGeometry = new THREE.BoxGeometry(
      this.config.bodyWidth + 0.01,
      0.05,
      this.config.bodyDepth * 0.8
    )
    const stripe1 = new THREE.Mesh(stripeGeometry, stripeMaterial)
    stripe1.position.set(0, 0.05, 0)
    this.mesh.add(stripe1)
    
    const stripe2 = new THREE.Mesh(stripeGeometry, stripeMaterial)
    stripe2.position.set(0, -0.05, 0)
    this.mesh.add(stripe2)

    // Tail fin (larger, more colorful)
    const tailGeometry = new THREE.BoxGeometry(
      this.config.tailWidth,
      this.config.tailHeight,
      0.12
    )
    this.tailMesh = new THREE.Mesh(tailGeometry, stripeMaterial)
    this.tailMesh.position.set(0, 0, -this.config.bodyDepth / 2 - 0.06)
    this.mesh.add(this.tailMesh)

    // Dorsal fin (tall and flowing)
    const dorsalGeometry = new THREE.BoxGeometry(0.02, 0.12, 0.2)
    const dorsalFin = new THREE.Mesh(dorsalGeometry, stripeMaterial)
    dorsalFin.position.set(0, this.config.bodyHeight / 2 + 0.05, -0.02)
    this.finMeshes.push(dorsalFin)
    this.mesh.add(dorsalFin)

    // Ventral fin
    const ventralGeometry = new THREE.BoxGeometry(0.02, 0.08, 0.1)
    const ventralFin = new THREE.Mesh(ventralGeometry, bodyMaterial)
    ventralFin.position.set(0, -this.config.bodyHeight / 2 - 0.03, 0.05)
    this.finMeshes.push(ventralFin)
    this.mesh.add(ventralFin)

    // Side fins (larger)
    const sideFinGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.08)
    
    const leftFin = new THREE.Mesh(sideFinGeometry, stripeMaterial)
    leftFin.position.set(-this.config.bodyWidth / 2 - 0.04, 0, 0.08)
    leftFin.rotation.z = -0.4
    this.finMeshes.push(leftFin)
    this.mesh.add(leftFin)
    
    const rightFin = new THREE.Mesh(sideFinGeometry, stripeMaterial)
    rightFin.position.set(this.config.bodyWidth / 2 + 0.04, 0, 0.08)
    rightFin.rotation.z = 0.4
    this.finMeshes.push(rightFin)
    this.mesh.add(rightFin)

    // Eyes (larger for tropical fish)
    const eyeGeometry = new THREE.BoxGeometry(0.04, 0.04, 0.02)
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 })
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-this.config.bodyWidth / 2 + 0.01, 0.05, this.config.bodyDepth / 2 - 0.04)
    this.mesh.add(leftEye)
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(this.config.bodyWidth / 2 - 0.01, 0.05, this.config.bodyDepth / 2 - 0.04)
    this.mesh.add(rightEye)
  }

  protected updateAnimation(_deltaTime: number): void {
    // Tail wiggle (faster for tropical fish)
    if (this.tailMesh) {
      this.tailMesh.rotation.y = Math.sin(this.animationTime * 12) * 0.5
    }

    // Body wiggle
    if (this.bodyMesh) {
      this.bodyMesh.rotation.y = Math.sin(this.animationTime * 10) * 0.12
    }

    // Fin movement (more dramatic)
    for (let i = 0; i < this.finMeshes.length; i++) {
      const fin = this.finMeshes[i]
      if (!fin) continue
      
      if (i === 0) { // Dorsal fin
        fin.rotation.x = Math.sin(this.animationTime * 4) * 0.1
      } else if (i >= 2) { // Side fins
        fin.rotation.z = (i === 2 ? -0.4 : 0.4) + Math.sin(this.animationTime * 8) * 0.2
      }
    }
  }
}
