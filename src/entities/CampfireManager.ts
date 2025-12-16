/**
 * CampfireManager - Manages all campfire entities in the world
 * Feature: 023-campfire-system
 */

import * as THREE from 'three'
import { BlockType } from '../core/Block'
import { World } from '../core/World'
import { Campfire } from './Campfire'
import { ItemEntity } from './ItemEntity'

/**
 * Campfire manager - handles creation, updates, and removal of campfires
 */
export class CampfireManager {
  private scene: THREE.Scene
  private world: World
  
  /** Map of position key to campfire */
  private campfires: Map<string, Campfire> = new Map()
  
  /** Callback when cooked item is dropped */
  private onItemDrop: ((item: ItemEntity) => void) | null = null

  constructor(scene: THREE.Scene, world: World) {
    this.scene = scene
    this.world = world
  }

  /**
   * Set callback for item drops
   */
  setOnItemDrop(callback: (item: ItemEntity) => void): void {
    this.onItemDrop = callback
  }

  /**
   * Get position key for coordinates
   */
  private getKey(x: number, y: number, z: number): string {
    return `${x},${y},${z}`
  }

  /**
   * Create a campfire at position
   */
  createCampfire(x: number, y: number, z: number): Campfire {
    const key = this.getKey(x, y, z)
    
    // Check if already exists
    if (this.campfires.has(key)) {
      return this.campfires.get(key)!
    }
    
    // Create new campfire
    const campfire = new Campfire(x, y, z)
    this.campfires.set(key, campfire)
    this.scene.add(campfire.getMesh())
    
    console.log(`[Campfire] Created at ${x}, ${y}, ${z}`)
    return campfire
  }

  /**
   * Remove campfire at position
   */
  removeCampfire(x: number, y: number, z: number): void {
    const key = this.getKey(x, y, z)
    const campfire = this.campfires.get(key)
    
    if (campfire) {
      this.scene.remove(campfire.getMesh())
      campfire.dispose()
      this.campfires.delete(key)
      console.log(`[Campfire] Removed at ${x}, ${y}, ${z}`)
    }
  }

  /**
   * Get campfire at position
   */
  getCampfire(x: number, y: number, z: number): Campfire | null {
    const key = this.getKey(x, y, z)
    return this.campfires.get(key) ?? null
  }

  /**
   * Check if there's a campfire at position
   */
  hasCampfire(x: number, y: number, z: number): boolean {
    return this.campfires.has(this.getKey(x, y, z))
  }

  /**
   * Try to add food to campfire at position
   * @returns true if food was added
   */
  addFoodToCampfire(x: number, y: number, z: number, foodType: BlockType): boolean {
    const campfire = this.getCampfire(x, y, z)
    if (!campfire) return false
    
    return campfire.addFood(foodType)
  }

  /**
   * Update all campfires
   */
  update(deltaTime: number): void {
    for (const campfire of this.campfires.values()) {
      const cookedItems = campfire.update(deltaTime)
      
      // Drop cooked items
      if (cookedItems.length > 0 && this.onItemDrop) {
        const droppedItems = campfire.createDroppedItems(cookedItems)
        for (const item of droppedItems) {
          this.onItemDrop(item)
        }
        console.log(`[Campfire] Cooked ${cookedItems.length} items`)
      }
    }
  }

  /**
   * Sync campfires with world blocks
   * Called when chunks load/unload or blocks change
   */
  syncWithWorld(chunkX: number, chunkZ: number, chunkSize: number): void {
    // Check for new campfire blocks
    for (let x = chunkX * chunkSize; x < (chunkX + 1) * chunkSize; x++) {
      for (let z = chunkZ * chunkSize; z < (chunkZ + 1) * chunkSize; z++) {
        for (let y = 0; y < 256; y++) {
          const block = this.world.getBlock(x, y, z)
          const key = this.getKey(x, y, z)
          
          if (block === BlockType.CAMPFIRE && !this.campfires.has(key)) {
            this.createCampfire(x, y, z)
          } else if (block !== BlockType.CAMPFIRE && this.campfires.has(key)) {
            this.removeCampfire(x, y, z)
          }
        }
      }
    }
  }

  /**
   * Handle block placed event
   */
  onBlockPlaced(x: number, y: number, z: number, blockType: BlockType): void {
    if (blockType === BlockType.CAMPFIRE) {
      this.createCampfire(x, y, z)
    }
  }

  /**
   * Handle block removed event
   */
  onBlockRemoved(x: number, y: number, z: number): void {
    if (this.hasCampfire(x, y, z)) {
      this.removeCampfire(x, y, z)
    }
  }

  /**
   * Get all campfires
   */
  getAll(): Campfire[] {
    return Array.from(this.campfires.values())
  }

  /**
   * Dispose all campfires
   */
  dispose(): void {
    for (const campfire of this.campfires.values()) {
      this.scene.remove(campfire.getMesh())
      campfire.dispose()
    }
    this.campfires.clear()
  }
}
