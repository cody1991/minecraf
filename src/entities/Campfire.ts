/**
 * Campfire - Campfire block entity with cooking functionality
 * Feature: 023-campfire-system
 */

import * as THREE from 'three'
import { BlockType } from '../core/Block'
import { FoodRegistry } from '../survival/FoodRegistry'
import { ItemEntity } from './ItemEntity'

/** Maximum items that can cook at once */
export const MAX_COOKING_SLOTS = 4

/** Cooking time in seconds */
export const COOKING_TIME = 10

/** Cooking slot state */
interface CookingSlot {
  rawItem: BlockType
  progress: number  // 0-1
  active: boolean
}

/**
 * Campfire entity - manages cooking and visual effects
 */
export class Campfire {
  /** World position */
  readonly x: number
  readonly y: number
  readonly z: number
  
  /** Unique ID */
  readonly id: string
  
  /** Cooking slots */
  private slots: CookingSlot[] = []
  
  /** Fire particle system */
  private particleGroup: THREE.Group
  private particles: THREE.Mesh[] = []
  
  /** Point light for illumination */
  private light: THREE.PointLight
  
  /** Base mesh (logs) */
  private baseMesh: THREE.Group
  
  /** Container for all meshes */
  private container: THREE.Group
  
  /** Particle animation timer */
  private particleTimer: number = 0
  
  /** Light flicker timer */
  private flickerTimer: number = 0

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
    this.id = `campfire_${x}_${y}_${z}`
    
    // Initialize cooking slots
    for (let i = 0; i < MAX_COOKING_SLOTS; i++) {
      this.slots.push({
        rawItem: BlockType.AIR,
        progress: 0,
        active: false
      })
    }
    
    // Create container
    this.container = new THREE.Group()
    this.container.position.set(x + 0.5, y, z + 0.5)
    
    // Create base (logs)
    this.baseMesh = this.createBase()
    this.container.add(this.baseMesh)
    
    // Create fire particles
    this.particleGroup = new THREE.Group()
    this.createFireParticles()
    this.container.add(this.particleGroup)
    
    // Create point light
    this.light = new THREE.PointLight(0xff6600, 1.5, 8)
    this.light.position.set(0, 0.5, 0)
    this.container.add(this.light)
  }

  /**
   * Create log base mesh
   */
  private createBase(): THREE.Group {
    const group = new THREE.Group()
    const logMaterial = new THREE.MeshLambertMaterial({ color: 0x4a3728 })
    
    // Create crossed logs
    const logGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.8)
    
    const log1 = new THREE.Mesh(logGeometry, logMaterial)
    log1.position.set(0, 0.05, 0)
    group.add(log1)
    
    const log2 = new THREE.Mesh(logGeometry, logMaterial)
    log2.position.set(0, 0.05, 0)
    log2.rotation.y = Math.PI / 2
    group.add(log2)
    
    // Create upper logs (crossed the other way)
    const log3 = new THREE.Mesh(logGeometry, logMaterial)
    log3.position.set(0, 0.15, 0)
    log3.rotation.y = Math.PI / 4
    group.add(log3)
    
    const log4 = new THREE.Mesh(logGeometry, logMaterial)
    log4.position.set(0, 0.15, 0)
    log4.rotation.y = -Math.PI / 4
    group.add(log4)
    
    return group
  }

  /**
   * Create fire particle meshes
   */
  private createFireParticles(): void {
    const particleCount = 12
    
    for (let i = 0; i < particleCount; i++) {
      const size = 0.1 + Math.random() * 0.15
      const geometry = new THREE.PlaneGeometry(size, size * 1.5)
      
      // Fire color gradient (yellow to orange to red)
      const hue = 0.05 + Math.random() * 0.1  // Yellow-orange range
      const color = new THREE.Color().setHSL(hue, 1, 0.5 + Math.random() * 0.3)
      
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false
      })
      
      const particle = new THREE.Mesh(geometry, material)
      
      // Random position within fire area
      particle.position.set(
        (Math.random() - 0.5) * 0.3,
        0.2 + Math.random() * 0.4,
        (Math.random() - 0.5) * 0.3
      )
      
      // Store initial Y for animation
      particle.userData.baseY = particle.position.y
      particle.userData.speed = 0.5 + Math.random() * 0.5
      particle.userData.phase = Math.random() * Math.PI * 2
      
      this.particles.push(particle)
      this.particleGroup.add(particle)
    }
  }

  /**
   * Get the 3D container
   */
  getMesh(): THREE.Group {
    return this.container
  }

  /**
   * Try to add raw food to cook
   * @returns true if food was added
   */
  addFood(rawFoodType: BlockType): boolean {
    // Check if it's raw food
    if (!FoodRegistry.isRawFood(rawFoodType)) {
      console.log(`[Campfire] Not raw food: ${rawFoodType}`)
      return false
    }
    
    // Find empty slot
    for (const slot of this.slots) {
      if (!slot.active) {
        slot.rawItem = rawFoodType
        slot.progress = 0
        slot.active = true
        console.log(`[Campfire] Added raw food: ${rawFoodType}, cooked version will be: ${FoodRegistry.getCookedVersion(rawFoodType)}`)
        return true
      }
    }
    
    // All slots full
    return false
  }

  /**
   * Check if campfire can accept more food
   */
  canAddFood(): boolean {
    return this.slots.some(slot => !slot.active)
  }

  /**
   * Get number of active cooking slots
   */
  getActiveSlotsCount(): number {
    return this.slots.filter(slot => slot.active).length
  }

  /**
   * Update cooking progress and animations
   * @returns Array of cooked items ready to drop
   */
  update(deltaTime: number): BlockType[] {
    const cookedItems: BlockType[] = []
    
    // Update cooking slots
    for (const slot of this.slots) {
      if (slot.active) {
        slot.progress += deltaTime / COOKING_TIME
        
        if (slot.progress >= 1) {
          // Cooking complete
          const cookedType = FoodRegistry.getCookedVersion(slot.rawItem)
          console.log(`[Campfire] Cooking complete! Raw: ${slot.rawItem}, Cooked: ${cookedType}`)
          if (cookedType) {
            cookedItems.push(cookedType)
          } else {
            // Fallback: if no cooked version, return raw item
            console.log(`[Campfire] WARNING: No cooked version found, returning raw item`)
            cookedItems.push(slot.rawItem)
          }
          
          // Reset slot
          slot.rawItem = BlockType.AIR
          slot.progress = 0
          slot.active = false
        }
      }
    }
    
    // Update fire particle animation
    this.particleTimer += deltaTime
    for (const particle of this.particles) {
      const speed = particle.userData.speed as number
      const phase = particle.userData.phase as number
      const baseY = particle.userData.baseY as number
      
      // Vertical oscillation
      particle.position.y = baseY + Math.sin(this.particleTimer * speed * 3 + phase) * 0.1
      
      // Slight horizontal sway
      particle.position.x += Math.sin(this.particleTimer * 2 + phase) * 0.001
      
      // Billboard effect - face camera
      particle.rotation.y = this.particleTimer * 0.5
      
      // Fade based on height
      const material = particle.material as THREE.MeshBasicMaterial
      material.opacity = 0.6 + Math.sin(this.particleTimer * speed * 2 + phase) * 0.3
    }
    
    // Update light flicker
    this.flickerTimer += deltaTime
    this.light.intensity = 1.2 + Math.sin(this.flickerTimer * 10) * 0.3 + Math.random() * 0.2
    
    return cookedItems
  }

  /**
   * Create item entities for cooked food
   */
  createDroppedItems(cookedItems: BlockType[]): ItemEntity[] {
    const items: ItemEntity[] = []
    
    for (let i = 0; i < cookedItems.length; i++) {
      const cookedItem = cookedItems[i]
      if (cookedItem === undefined) continue
      
      // Drop items around the campfire
      const angle = (i / cookedItems.length) * Math.PI * 2
      const dropX = this.x + 0.5 + Math.cos(angle) * 0.8
      const dropZ = this.z + 0.5 + Math.sin(angle) * 0.8
      
      const item = new ItemEntity(
        dropX,
        this.y + 0.5,
        dropZ,
        cookedItem,
        1
      )
      items.push(item)
    }
    
    return items
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    // Dispose geometries and materials
    this.baseMesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (child.material instanceof THREE.Material) {
          child.material.dispose()
        }
      }
    })
    
    for (const particle of this.particles) {
      particle.geometry.dispose()
      if (particle.material instanceof THREE.Material) {
        particle.material.dispose()
      }
    }
    
    this.light.dispose()
  }
}
