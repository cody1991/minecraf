/**
 * Crafting System - Main entry point
 * Feature: 023-crafting-tools-system
 * 
 * Exports all crafting system components.
 */

export type { CraftingRecipe } from './CraftingRecipe'
export { createShapedRecipe, createShapelessRecipe } from './CraftingRecipe'
export { RecipeRegistry } from './RecipeRegistry'
export { CraftingMatcher } from './CraftingMatcher'
export { BASIC_RECIPES, registerBasicRecipes } from './recipes/BasicRecipes'
export { TOOL_RECIPES, registerToolRecipes } from './recipes/ToolRecipes'

import { RecipeRegistry } from './RecipeRegistry'
import { registerBasicRecipes } from './recipes/BasicRecipes'
import { registerToolRecipes } from './recipes/ToolRecipes'

/**
 * Initialize the crafting system
 * Registers all recipes
 */
export function initializeCraftingSystem(): void {
  console.log('[CraftingSystem] Initializing...')
  
  // Register all recipes
  registerBasicRecipes()
  registerToolRecipes()
  
  const registry = RecipeRegistry.getInstance()
  console.log(`[CraftingSystem] Initialized with ${registry.getRecipeCount()} recipes`)
}
