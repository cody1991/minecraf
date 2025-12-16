/**
 * Chicken - Chicken animal entity
 * Feature: 008-biome-weather-system
 * Feature: 022-animal-animation-system - Enhanced animations
 */

import * as THREE from 'three'
import { Animal } from './Animal'
import { AnimalType } from './AnimalTypes'
import { calculateLegSwing } from '../animation/AnimationState'

/**
 * Chicken animal - white body, red comb, smaller size
 */
export class Chicken extends Animal {
  private wingMeshes: THREE.Mesh[] = []

  constructor(x: number, y: number, z: number) {
    super(AnimalType.CHICKEN, x, y, z)
    // Set collision dimensions for chicken (smaller)
    this.width = 0.4
    this.height = 0.7
    this.createMesh()
  }

  protected createMesh(): void {
    const featherMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }) // White
    const combMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }) // Red
    const beakMaterial = new THREE.MeshLambertMaterial({ color: 0xffa500 }) // Orange
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0xffa500 }) // Orange

    // Body (smaller, rounder)
    const bodyGeometry = new THREE.BoxGeometry(0.4, 0.35, 0.5)
    this.bodyMesh = new THREE.Mesh(bodyGeometry, featherMaterial)
    this.bodyMesh.position.set(0, 0.35, 0)
    this.bodyMesh.castShadow = true
    this.mesh.add(this.bodyMesh)

    // Head
    const headGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25)
    this.headMesh = new THREE.Mesh(headGeometry, featherMaterial)
    this.headMesh.position.set(0, 0.55, 0.3)
    this.headMesh.castShadow = true
    this.mesh.add(this.headMesh)

    // Comb (red thing on top)
    const combGeometry = new THREE.BoxGeometry(0.05, 0.12, 0.15)
    const comb = new THREE.Mesh(combGeometry, combMaterial)
    comb.position.set(0, 0.72, 0.32)
    this.mesh.add(comb)

    // Wattle (red thing below beak)
    const wattleGeometry = new THREE.BoxGeometry(0.08, 0.1, 0.05)
    const wattle = new THREE.Mesh(wattleGeometry, combMaterial)
    wattle.position.set(0, 0.42, 0.45)
    this.mesh.add(wattle)

    // Beak
    const beakGeometry = new THREE.BoxGeometry(0.1, 0.08, 0.12)
    const beak = new THREE.Mesh(beakGeometry, beakMaterial)
    beak.position.set(0, 0.52, 0.48)
    this.mesh.add(beak)

    // Eyes
    const eyeGeometry = new THREE.BoxGeometry(0.04, 0.04, 0.02)
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 })
    
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial)
    eyeLeft.position.set(-0.1, 0.58, 0.42)
    this.mesh.add(eyeLeft)
    
    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial)
    eyeRight.position.set(0.1, 0.58, 0.42)
    this.mesh.add(eyeRight)

    // Wings
    const wingGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.3)
    
    const wingLeft = new THREE.Mesh(wingGeometry, featherMaterial)
    wingLeft.position.set(-0.23, 0.35, 0)
    this.wingMeshes.push(wingLeft)
    this.mesh.add(wingLeft)
    
    const wingRight = new THREE.Mesh(wingGeometry, featherMaterial)
    wingRight.position.set(0.23, 0.35, 0)
    this.wingMeshes.push(wingRight)
    this.mesh.add(wingRight)

    // Legs (thin)
    const legGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.05)
    
    const legLeft = new THREE.Mesh(legGeometry, legMaterial)
    legLeft.position.set(-0.1, 0.1, 0)
    this.legMeshes.push(legLeft)
    this.mesh.add(legLeft)
    
    const legRight = new THREE.Mesh(legGeometry, legMaterial)
    legRight.position.set(0.1, 0.1, 0)
    this.legMeshes.push(legRight)
    this.mesh.add(legRight)

    // Tail feathers
    const tailGeometry = new THREE.BoxGeometry(0.15, 0.2, 0.1)
    const tail = new THREE.Mesh(tailGeometry, featherMaterial)
    tail.position.set(0, 0.45, -0.28)
    tail.rotation.x = -0.5
    this.mesh.add(tail)
  }

  protected updateAnimation(deltaTime: number): void {
    super.updateAnimation(deltaTime)
    
    // Chicken has faster leg animation
    const swing = calculateLegSwing(this.animData.currentState, this.animationTime, 0.4)
    if (this.legMeshes[0]) this.legMeshes[0].rotation.x = swing
    if (this.legMeshes[1]) this.legMeshes[1].rotation.x = -swing
    
    // Wing flap animation
    const wingFlap = Math.sin(this.animationTime * 4) * 0.2
    if (this.wingMeshes[0]) this.wingMeshes[0].rotation.z = wingFlap
    if (this.wingMeshes[1]) this.wingMeshes[1].rotation.z = -wingFlap

    // Head bobbing (chicken-like)
    if (this.headMesh) {
      this.headMesh.position.z = 0.3 + Math.sin(this.animationTime * 6) * 0.03
    }
  }
}
