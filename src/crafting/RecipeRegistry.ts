/**
 * RecipeRegistry - Recipe registration and lookup
 * Feature: 023-crafting-tools-system
 * 
 * Manages all crafting recipes and provides lookup functionality.
 */

import { BlockType } from '../core/Block'
import { CraftingRecipe } from './CraftingRecipe'
import { CraftingMatcher } from './CraftingMatcher'

/**
 * Recipe registry singleton
 */
export class RecipeRegistry {
  private static instance: RecipeRegistry | null = null
  
  private recipes: Map<string, CraftingRecipe> = new Map()
  private matcher: CraftingMatcher

  private constructor() {
    this.matcher = new CraftingMatcher()
  }

  /**
   * Get singleton instance
   */
  static getInstance(): RecipeRegistry {
    if (!RecipeRegistry.instance) {
      RecipeRegistry.instance = new RecipeRegistry()
    }
    return RecipeRegistry.instance
  }

  /**
   * Reset instance (for testing)
   */
  static resetInstance(): void {
    RecipeRegistry.instance = null
  }

  /**
   * Register a new recipe
   */
  register(recipe: CraftingRecipe): void {
    if (this.recipes.has(recipe.id)) {
      console.warn(`[RecipeRegistry] Recipe ${recipe.id} already registered, overwriting`)
    }
    this.recipes.set(recipe.id, recipe)
    console.log(`[RecipeRegistry] Registered recipe: ${recipe.id}`)
  }

  /**
   * Register multiple recipes
   */
  registerAll(recipes: CraftingRecipe[]): void {
    for (const recipe of recipes) {
      this.register(recipe)
    }
  }

  /**
   * Find a matching recipe for the given grid
   * @param grid 2D array of block types (null for empty slots)
   * @returns Matching recipe or null
   */
  findMatch(grid: (BlockType | null)[][]): CraftingRecipe | null {
    // Determine grid size
    const gridSize = grid.length as 2 | 3

    // Try each recipe
    for (const recipe of this.recipes.values()) {
      // Skip recipes that require larger grid
      if (recipe.gridSize > gridSize) continue

      if (this.matcher.matches(recipe, grid)) {
        return recipe
      }
    }

    return null
  }

  /**
   * Get all registered recipes
   */
  getAllRecipes(): CraftingRecipe[] {
    return Array.from(this.recipes.values())
  }

  /**
   * Get recipes that can be crafted in a 2×2 grid
   */
  get2x2Recipes(): CraftingRecipe[] {
    return this.getAllRecipes().filter(r => r.gridSize === 2)
  }

  /**
   * Get recipes that require a 3×3 grid
   */
  get3x3Recipes(): CraftingRecipe[] {
    return this.getAllRecipes().filter(r => r.gridSize === 3)
  }

  /**
   * Get a recipe by ID
   */
  getRecipe(id: string): CraftingRecipe | undefined {
    return this.recipes.get(id)
  }

  /**
   * Check if a recipe exists
   */
  hasRecipe(id: string): boolean {
    return this.recipes.has(id)
  }

  /**
   * Get recipe count
   */
  getRecipeCount(): number {
    return this.recipes.size
  }
}
