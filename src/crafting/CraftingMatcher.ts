/**
 * CraftingMatcher - Recipe matching logic
 * Feature: 023-crafting-tools-system
 * 
 * Implements normalized position matching algorithm for recipes.
 */

import { BlockType } from '../core/Block'
import { CraftingRecipe } from './CraftingRecipe'

/**
 * Crafting matcher for recipe matching
 */
export class CraftingMatcher {
  /**
   * Check if a recipe matches the given grid
   */
  matches(recipe: CraftingRecipe, grid: (BlockType | null)[][]): boolean {
    if (recipe.type === 'shapeless') {
      return this.matchesShapeless(recipe, grid)
    } else {
      return this.matchesShaped(recipe, grid)
    }
  }

  /**
   * Match a shaped recipe with offset support
   */
  private matchesShaped(recipe: CraftingRecipe, grid: (BlockType | null)[][]): boolean {
    if (!recipe.pattern) return false

    // Normalize both pattern and grid to top-left
    const normalizedPattern = this.normalizePattern(recipe.pattern, recipe.ingredients)
    const normalizedGrid = this.normalizeGrid(grid)

    // Compare dimensions
    if (normalizedPattern.width !== normalizedGrid.width ||
        normalizedPattern.height !== normalizedGrid.height) {
      return false
    }

    // Compare each cell
    for (let y = 0; y < normalizedPattern.height; y++) {
      for (let x = 0; x < normalizedPattern.width; x++) {
        const patternType = normalizedPattern.cells[y]?.[x] ?? null
        const gridType = normalizedGrid.cells[y]?.[x] ?? null

        if (patternType !== gridType) {
          return false
        }
      }
    }

    return true
  }

  /**
   * Match a shapeless recipe (only check types and counts)
   */
  private matchesShapeless(recipe: CraftingRecipe, grid: (BlockType | null)[][]): boolean {
    // Count ingredients in grid
    const gridCounts = new Map<BlockType, number>()
    let totalGridItems = 0

    for (const row of grid) {
      for (const cell of row) {
        if (cell !== null) {
          gridCounts.set(cell, (gridCounts.get(cell) || 0) + 1)
          totalGridItems++
        }
      }
    }

    // Count required ingredients
    const requiredCounts = new Map<BlockType, number>()
    let totalRequired = 0

    for (const type of Object.values(recipe.ingredients)) {
      requiredCounts.set(type, (requiredCounts.get(type) || 0) + 1)
      totalRequired++
    }

    // Check counts match
    if (totalGridItems !== totalRequired) {
      return false
    }

    // Check each ingredient type
    for (const [type, count] of requiredCounts) {
      if ((gridCounts.get(type) || 0) !== count) {
        return false
      }
    }

    return true
  }

  /**
   * Normalize a pattern to top-left corner
   */
  private normalizePattern(
    pattern: string[],
    ingredients: Record<string, BlockType>
  ): { cells: (BlockType | null)[][], width: number, height: number } {
    // Convert pattern to block types
    const cells: (BlockType | null)[][] = []
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    for (let y = 0; y < pattern.length; y++) {
      const row: (BlockType | null)[] = []
      const patternRow = pattern[y]!
      for (let x = 0; x < patternRow.length; x++) {
        const char = patternRow[x]!
        if (char === ' ') {
          row.push(null)
        } else {
          const type = ingredients[char]
          if (type !== undefined) {
            row.push(type)
            minX = Math.min(minX, x)
            minY = Math.min(minY, y)
            maxX = Math.max(maxX, x)
            maxY = Math.max(maxY, y)
          } else {
            row.push(null)
          }
        }
      }
      cells.push(row)
    }

    // No items found
    if (minX === Infinity) {
      return { cells: [[]], width: 0, height: 0 }
    }

    // Extract normalized region
    const width = maxX - minX + 1
    const height = maxY - minY + 1
    const normalizedCells: (BlockType | null)[][] = []

    for (let y = minY; y <= maxY; y++) {
      const row: (BlockType | null)[] = []
      for (let x = minX; x <= maxX; x++) {
        row.push(cells[y]?.[x] ?? null)
      }
      normalizedCells.push(row)
    }

    return { cells: normalizedCells, width, height }
  }

  /**
   * Normalize a grid to top-left corner
   */
  private normalizeGrid(
    grid: (BlockType | null)[][]
  ): { cells: (BlockType | null)[][], width: number, height: number } {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    // Find bounds of non-empty cells
    for (let y = 0; y < grid.length; y++) {
      const gridRow = grid[y]!
      for (let x = 0; x < gridRow.length; x++) {
        if (gridRow[x] !== null) {
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
        }
      }
    }

    // Empty grid
    if (minX === Infinity) {
      return { cells: [[]], width: 0, height: 0 }
    }

    // Extract normalized region
    const width = maxX - minX + 1
    const height = maxY - minY + 1
    const normalizedCells: (BlockType | null)[][] = []

    for (let y = minY; y <= maxY; y++) {
      const row: (BlockType | null)[] = []
      for (let x = minX; x <= maxX; x++) {
        row.push(grid[y]?.[x] ?? null)
      }
      normalizedCells.push(row)
    }

    return { cells: normalizedCells, width, height }
  }
}
