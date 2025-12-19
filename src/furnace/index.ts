/**
 * Furnace System - Main entry point
 * Feature: 023-crafting-tools-system
 * 
 * Exports all furnace system components.
 */

export type { SmeltingRecipe } from './SmeltingRecipe'
export { SMELTING_RECIPES, getSmeltingRecipe, canSmelt } from './SmeltingRecipe'
export type { FuelItem } from './FuelRegistry'
export { FUEL_ITEMS, FuelRegistry, isFuel, getBurnTime } from './FuelRegistry'
export type { FurnaceState } from './Furnace'
export { Furnace, createFurnaceState } from './Furnace'
export { FurnaceManager } from './FurnaceManager'

import { FurnaceManager } from './FurnaceManager'
import { World } from '../core/World'

/**
 * Initialize the furnace system
 */
export function initializeFurnaceSystem(world: World): void {
  console.log('[FurnaceSystem] Initializing...')
  FurnaceManager.getInstance().initialize(world)
}
