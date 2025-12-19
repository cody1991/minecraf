/**
 * ToolRecipes - Tool crafting recipes
 * Feature: 023-crafting-tools-system
 * 
 * Defines recipes for all 20 tools (4 materials × 5 types).
 */

import { BlockType } from '../../core/Block'
import { CraftingRecipe, createShapedRecipe } from '../CraftingRecipe'

/**
 * Material block types for crafting
 */
const MATERIALS = {
  wood: BlockType.PLANKS,
  stone: BlockType.COBBLESTONE,
  iron: BlockType.IRON_INGOT,
  diamond: BlockType.DIAMOND
}

/**
 * Tool result block types
 */
const TOOL_TYPES = {
  pickaxe: {
    wood: BlockType.WOODEN_PICKAXE,
    stone: BlockType.STONE_PICKAXE,
    iron: BlockType.IRON_PICKAXE,
    diamond: BlockType.DIAMOND_PICKAXE
  },
  axe: {
    wood: BlockType.WOODEN_AXE,
    stone: BlockType.STONE_AXE,
    iron: BlockType.IRON_AXE,
    diamond: BlockType.DIAMOND_AXE
  },
  shovel: {
    wood: BlockType.WOODEN_SHOVEL,
    stone: BlockType.STONE_SHOVEL,
    iron: BlockType.IRON_SHOVEL,
    diamond: BlockType.DIAMOND_SHOVEL
  },
  sword: {
    wood: BlockType.WOODEN_SWORD,
    stone: BlockType.STONE_SWORD,
    iron: BlockType.IRON_SWORD,
    diamond: BlockType.DIAMOND_SWORD
  },
  hoe: {
    wood: BlockType.WOODEN_HOE,
    stone: BlockType.STONE_HOE,
    iron: BlockType.IRON_HOE,
    diamond: BlockType.DIAMOND_HOE
  }
}

/**
 * Tool patterns
 */
const PATTERNS = {
  pickaxe: ['MMM', ' S ', ' S '],
  axe_left: ['MM', 'MS', ' S'],
  axe_right: ['MM', 'SM', ' S'],
  shovel: ['M', 'S', 'S'],
  sword: ['M', 'M', 'S'],
  hoe_left: ['MM', ' S', ' S'],
  hoe_right: ['MM', 'S ', 'S ']
}

/**
 * Generate all tool recipes
 */
function generateToolRecipes(): CraftingRecipe[] {
  const recipes: CraftingRecipe[] = []
  const materials = ['wood', 'stone', 'iron', 'diamond'] as const

  for (const material of materials) {
    const M = MATERIALS[material]
    const S = BlockType.STICK

    // Pickaxe
    recipes.push(createShapedRecipe(
      `${material}_pickaxe`,
      PATTERNS.pickaxe,
      { 'M': M, 'S': S },
      TOOL_TYPES.pickaxe[material],
      1
    ))

    // Axe (left variant)
    recipes.push(createShapedRecipe(
      `${material}_axe`,
      PATTERNS.axe_left,
      { 'M': M, 'S': S },
      TOOL_TYPES.axe[material],
      1
    ))

    // Axe (right variant - mirrored)
    recipes.push(createShapedRecipe(
      `${material}_axe_right`,
      PATTERNS.axe_right,
      { 'M': M, 'S': S },
      TOOL_TYPES.axe[material],
      1
    ))

    // Shovel
    recipes.push(createShapedRecipe(
      `${material}_shovel`,
      PATTERNS.shovel,
      { 'M': M, 'S': S },
      TOOL_TYPES.shovel[material],
      1
    ))

    // Sword
    recipes.push(createShapedRecipe(
      `${material}_sword`,
      PATTERNS.sword,
      { 'M': M, 'S': S },
      TOOL_TYPES.sword[material],
      1
    ))

    // Hoe (left variant)
    recipes.push(createShapedRecipe(
      `${material}_hoe`,
      PATTERNS.hoe_left,
      { 'M': M, 'S': S },
      TOOL_TYPES.hoe[material],
      1
    ))

    // Hoe (right variant - mirrored)
    recipes.push(createShapedRecipe(
      `${material}_hoe_right`,
      PATTERNS.hoe_right,
      { 'M': M, 'S': S },
      TOOL_TYPES.hoe[material],
      1
    ))
  }

  return recipes
}

/**
 * All tool recipes
 */
export const TOOL_RECIPES: CraftingRecipe[] = generateToolRecipes()

/**
 * Register tool recipes with the registry
 */
export function registerToolRecipes(): void {
  import('../RecipeRegistry').then(({ RecipeRegistry }) => {
    const registry = RecipeRegistry.getInstance()
    registry.registerAll(TOOL_RECIPES)
    console.log(`[ToolRecipes] Registered ${TOOL_RECIPES.length} tool recipes`)
  })
}
