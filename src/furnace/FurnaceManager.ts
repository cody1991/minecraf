/**
 * FurnaceManager - Manages all furnaces in the world
 * Feature: 023-crafting-tools-system
 * 
 * Handles furnace creation, removal, and updates.
 */

import { BlockType } from '../core/Block'
import { World } from '../core/World'
import { Furnace, FurnaceState } from './Furnace'
import { ItemEntity } from '../entities/ItemEntity'

/**
 * Furnace manager singleton
 */
export class FurnaceManager {
  private static instance: FurnaceManager | null = null
  
  private furnaces: Map<string, Furnace> = new Map()
  private world: World | null = null
  private onItemDrop: ((item: ItemEntity) => void) | null = null

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): FurnaceManager {
    if (!FurnaceManager.instance) {
      FurnaceManager.instance = new FurnaceManager()
    }
    return FurnaceManager.instance
  }

  /**
   * Initialize with world reference
   */
  initialize(world: World): void {
    this.world = world
    console.log('[FurnaceManager] Initialized')
  }

  /**
   * Set item drop callback
   */
  setOnItemDrop(callback: (item: ItemEntity) => void): void {
    this.onItemDrop = callback
  }

  /**
   * Get position key
   */
  private getKey(x: number, y: number, z: number): string {
    return `${x},${y},${z}`
  }

  /**
   * Create a new furnace at position
   */
  createFurnace(x: number, y: number, z: number): FurnaceState {
    const key = this.getKey(x, y, z)
    
    // Remove existing furnace if any
    if (this.furnaces.has(key)) {
      this.removeFurnace(x, y, z)
    }

    const furnace = new Furnace(x, y, z)
    this.furnaces.set(key, furnace)
    
    console.log(`[FurnaceManager] Created furnace at ${key}`)
    return furnace.state
  }

  /**
   * Remove furnace at position
   * @returns Items that were in the furnace
   */
  removeFurnace(x: number, y: number, z: number): { items: Array<{ itemType: BlockType; count: number }> } {
    const key = this.getKey(x, y, z)
    const furnace = this.furnaces.get(key)

    if (!furnace) {
      return { items: [] }
    }

    const items = furnace.getAllItems()
    this.furnaces.delete(key)

    // Drop items as entities
    if (this.onItemDrop) {
      for (const item of items) {
        const itemEntity = new ItemEntity(
          x + 0.5,
          y + 0.5,
          z + 0.5,
          item.itemType,
          item.count
        )
        this.onItemDrop(itemEntity)
      }
    }

    console.log(`[FurnaceManager] Removed furnace at ${key}, dropped ${items.length} item types`)
    return { items }
  }

  /**
   * Get furnace at position
   */
  getFurnace(x: number, y: number, z: number): FurnaceState | null {
    const key = this.getKey(x, y, z)
    const furnace = this.furnaces.get(key)
    return furnace?.state || null
  }

  /**
   * Get furnace instance at position
   */
  getFurnaceInstance(x: number, y: number, z: number): Furnace | null {
    const key = this.getKey(x, y, z)
    return this.furnaces.get(key) || null
  }

  /**
   * Update all furnaces
   */
  update(deltaTime: number): void {
    for (const furnace of this.furnaces.values()) {
      const wasBurning = furnace.isBurning()
      furnace.update(deltaTime)
      const isBurning = furnace.isBurning()

      // Update block type if burning state changed
      if (this.world && wasBurning !== isBurning) {
        const { x, y, z } = furnace.state.position
        const newType = isBurning ? BlockType.FURNACE_LIT : BlockType.FURNACE
        this.world.setBlock(x, y, z, newType)
      }
    }
  }

  /**
   * Add fuel to furnace at position
   */
  addFuel(x: number, y: number, z: number, fuel: BlockType, count: number): boolean {
    const furnace = this.getFurnaceInstance(x, y, z)
    if (!furnace) return false
    return furnace.addFuel(fuel, count)
  }

  /**
   * Add input to furnace at position
   */
  addInput(x: number, y: number, z: number, input: BlockType, count: number): boolean {
    const furnace = this.getFurnaceInstance(x, y, z)
    if (!furnace) return false
    return furnace.addInput(input, count)
  }

  /**
   * Take output from furnace at position
   */
  takeOutput(x: number, y: number, z: number): { itemType: BlockType; count: number } | null {
    const furnace = this.getFurnaceInstance(x, y, z)
    if (!furnace) return null
    return furnace.takeOutput()
  }

  /**
   * Handle block placed event
   */
  onBlockPlaced(x: number, y: number, z: number, blockType: BlockType): void {
    if (blockType === BlockType.FURNACE) {
      this.createFurnace(x, y, z)
    }
  }

  /**
   * Handle block removed event
   */
  onBlockRemoved(x: number, y: number, z: number): void {
    const key = this.getKey(x, y, z)
    if (this.furnaces.has(key)) {
      this.removeFurnace(x, y, z)
    }
  }

  /**
   * Get all furnace states (for save system)
   */
  getAllFurnaces(): FurnaceState[] {
    return Array.from(this.furnaces.values()).map(f => f.state)
  }

  /**
   * Restore furnaces from save data
   */
  restoreFromSave(furnaceStates: FurnaceState[]): void {
    this.furnaces.clear()
    
    for (const state of furnaceStates) {
      const furnace = new Furnace(state.position.x, state.position.y, state.position.z)
      furnace.state = state
      this.furnaces.set(furnace.getPositionKey(), furnace)
    }

    console.log(`[FurnaceManager] Restored ${furnaceStates.length} furnaces`)
  }

  /**
   * Get furnace count
   */
  getFurnaceCount(): number {
    return this.furnaces.size
  }
}
