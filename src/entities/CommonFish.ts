/**
 * CommonFish - Common silver fish entity
 * Feature: 009-ecosystem-flora-fauna
 */

import * as THREE from 'three'
import { Fish } from './Fish'
import { FishType } from './FishTypes'

/**
 * Common fish - silver colored, most common in water
 */
export class CommonFish extends Fish {
  private bodyMesh!: THREE.Mesh
  private tailMesh!: THREE.Mesh
  private finMeshes: THREE.Mesh[] = []

  constructor(x: number, y: number, z: number) {
    super(FishType.COMMON, x, y, z)
  }

  protected createMesh(): void {
    // Initialize finMeshes array here since createMesh is called from super() before class field initialization
    this.finMeshes = []
    
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xc0c0c0 }) // Silver
    const finMaterial = new THREE.MeshLambertMaterial({ color: 0xa0a0a0 }) // Darker silver

    // Body (elongated oval)
    const bodyGeometry = new THREE.BoxGeometry(
      this.config.bodyWidth,
      this.config.bodyHeight,
      this.config.bodyDepth
    )
    this.bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // Tail fin
    const tailGeometry = new THREE.BoxGeometry(
      this.config.tailWidth,
      this.config.tailHeight,
      0.1
    )
    this.tailMesh = new THREE.Mesh(tailGeometry, finMaterial)
    this.tailMesh.position.set(0, 0, -this.config.bodyDepth / 2 - 0.05)
    this.mesh.add(this.tailMesh)

    // Dorsal fin (top)
    const dorsalGeometry = new THREE.BoxGeometry(0.02, 0.08, 0.15)
    const dorsalFin = new THREE.Mesh(dorsalGeometry, finMaterial)
    dorsalFin.position.set(0, this.config.bodyHeight / 2 + 0.03, 0)
    this.finMeshes.push(dorsalFin)
    this.mesh.add(dorsalFin)

    // Side fins
    const sideFinGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.06)
    
    const leftFin = new THREE.Mesh(sideFinGeometry, finMaterial)
    leftFin.position.set(-this.config.bodyWidth / 2 - 0.03, 0, 0.05)
    leftFin.rotation.z = -0.3
    this.finMeshes.push(leftFin)
    this.mesh.add(leftFin)
    
    const rightFin = new THREE.Mesh(sideFinGeometry, finMaterial)
    rightFin.position.set(this.config.bodyWidth / 2 + 0.03, 0, 0.05)
    rightFin.rotation.z = 0.3
    this.finMeshes.push(rightFin)
    this.mesh.add(rightFin)

    // Eye
    const eyeGeometry = new THREE.BoxGeometry(0.03, 0.03, 0.02)
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 })
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-this.config.bodyWidth / 2 + 0.01, 0.03, this.config.bodyDepth / 2 - 0.05)
    this.mesh.add(leftEye)
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(this.config.bodyWidth / 2 - 0.01, 0.03, this.config.bodyDepth / 2 - 0.05)
    this.mesh.add(rightEye)
  }

  protected updateAnimation(_deltaTime: number): void {
    // Tail wiggle
    if (this.tailMesh) {
      this.tailMesh.rotation.y = Math.sin(this.animationTime * 10) * 0.4
    }

    // Body wiggle
    if (this.bodyMesh) {
      this.bodyMesh.rotation.y = Math.sin(this.animationTime * 8) * 0.1
    }

    // Fin movement
    for (let i = 0; i < this.finMeshes.length; i++) {
      const fin = this.finMeshes[i]
      if (fin && i > 0) { // Skip dorsal fin
        fin.rotation.z = (i === 1 ? -0.3 : 0.3) + Math.sin(this.animationTime * 6) * 0.15
      }
    }
  }
}
