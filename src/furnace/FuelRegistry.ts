/**
 * FuelRegistry - Fuel item definitions
 * Feature: 023-crafting-tools-system
 * 
 * Defines fuel items and their burn times.
 */

import { BlockType } from '../core/Block'

/**
 * Fuel item interface
 */
export interface FuelItem {
  /** Item type */
  item: BlockType
  /** Burn time in seconds */
  burnTime: number
}

/**
 * All fuel items with burn times (Minecraft vanilla values)
 */
export const FUEL_ITEMS: FuelItem[] = [
  // Coal and charcoal (80 seconds = 8 items)
  { item: BlockType.COAL, burnTime: 80 },
  { item: BlockType.CHARCOAL, burnTime: 80 },
  // Wood items (15 seconds = 1.5 items)
  { item: BlockType.PLANKS, burnTime: 15 },
  { item: BlockType.LOG, burnTime: 15 },
  { item: BlockType.OAK_LOG, burnTime: 15 },
  { item: BlockType.BIRCH_LOG, burnTime: 15 },
  { item: BlockType.SPRUCE_LOG, burnTime: 15 },
  { item: BlockType.WOOD, burnTime: 15 },
  // Sticks (5 seconds = 0.5 items)
  { item: BlockType.STICK, burnTime: 5 }
]

/**
 * Fuel registry singleton
 */
export class FuelRegistry {
  private static instance: FuelRegistry | null = null
  private fuelMap: Map<BlockType, number> = new Map()

  private constructor() {
    // Initialize fuel map
    for (const fuel of FUEL_ITEMS) {
      this.fuelMap.set(fuel.item, fuel.burnTime)
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(): FuelRegistry {
    if (!FuelRegistry.instance) {
      FuelRegistry.instance = new FuelRegistry()
    }
    return FuelRegistry.instance
  }

  /**
   * Check if an item is fuel
   */
  isFuel(itemType: BlockType): boolean {
    return this.fuelMap.has(itemType)
  }

  /**
   * Get burn time for a fuel item
   * @returns Burn time in seconds, or 0 if not fuel
   */
  getBurnTime(itemType: BlockType): number {
    return this.fuelMap.get(itemType) || 0
  }

  /**
   * Get all fuel items
   */
  getAllFuels(): FuelItem[] {
    return [...FUEL_ITEMS]
  }
}

// Export convenience functions
export function isFuel(itemType: BlockType): boolean {
  return FuelRegistry.getInstance().isFuel(itemType)
}

export function getBurnTime(itemType: BlockType): number {
  return FuelRegistry.getInstance().getBurnTime(itemType)
}
