/**
 * CraftingRecipe - Recipe data structure
 * Feature: 023-crafting-tools-system
 * 
 * Defines the structure for crafting recipes.
 */

import { BlockType } from '../core/Block'

/**
 * Crafting recipe interface
 */
export interface CraftingRecipe {
  /** Unique recipe identifier */
  id: string
  /** Recipe type: shaped (pattern matters) or shapeless (only ingredients matter) */
  type: 'shaped' | 'shapeless'
  /** Pattern for shaped recipes (e.g., ['PPP', ' S ', ' S '] for pickaxe) */
  pattern?: string[]
  /** Map of pattern symbols to block types */
  ingredients: Record<string, BlockType>
  /** Recipe result */
  result: {
    item: BlockType
    count: number
  }
  /** Minimum grid size required (2 for 2×2, 3 for 3×3) */
  gridSize: 2 | 3
}

/**
 * Create a shaped recipe
 */
export function createShapedRecipe(
  id: string,
  pattern: string[],
  ingredients: Record<string, BlockType>,
  result: BlockType,
  count: number = 1
): CraftingRecipe {
  // Determine grid size from pattern
  const maxWidth = Math.max(...pattern.map(row => row.length))
  const height = pattern.length
  const gridSize: 2 | 3 = (maxWidth > 2 || height > 2) ? 3 : 2

  return {
    id,
    type: 'shaped',
    pattern,
    ingredients,
    result: { item: result, count },
    gridSize
  }
}

/**
 * Create a shapeless recipe
 */
export function createShapelessRecipe(
  id: string,
  ingredients: BlockType[],
  result: BlockType,
  count: number = 1,
  gridSize: 2 | 3 = 2
): CraftingRecipe {
  // Create ingredient map with unique symbols
  const ingredientMap: Record<string, BlockType> = {}
  
  let symbolIndex = 0
  const typeToSymbol: Map<BlockType, string> = new Map()
  
  for (const ingredient of ingredients) {
    if (!typeToSymbol.has(ingredient)) {
      const symbol = String.fromCharCode(65 + symbolIndex) // A, B, C, ...
      typeToSymbol.set(ingredient, symbol)
      ingredientMap[symbol] = ingredient
      symbolIndex++
    }
  }

  return {
    id,
    type: 'shapeless',
    ingredients: ingredientMap,
    result: { item: result, count },
    gridSize
  }
}
