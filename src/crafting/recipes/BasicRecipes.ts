/**
 * BasicRecipes - Basic crafting recipes
 * Feature: 023-crafting-tools-system
 * 
 * Defines basic recipes: planks, sticks, crafting table, etc.
 */

import { BlockType } from '../../core/Block'
import { CraftingRecipe, createShapedRecipe } from '../CraftingRecipe'

/**
 * Basic crafting recipes
 */
export const BASIC_RECIPES: CraftingRecipe[] = [
  // Log → Planks (shapeless, any log type)
  {
    id: 'planks_from_log',
    type: 'shapeless',
    ingredients: { 'L': BlockType.LOG },
    result: { item: BlockType.PLANKS, count: 4 },
    gridSize: 2
  },
  {
    id: 'planks_from_oak_log',
    type: 'shapeless',
    ingredients: { 'L': BlockType.OAK_LOG },
    result: { item: BlockType.PLANKS, count: 4 },
    gridSize: 2
  },
  {
    id: 'planks_from_birch_log',
    type: 'shapeless',
    ingredients: { 'L': BlockType.BIRCH_LOG },
    result: { item: BlockType.PLANKS, count: 4 },
    gridSize: 2
  },
  {
    id: 'planks_from_spruce_log',
    type: 'shapeless',
    ingredients: { 'L': BlockType.SPRUCE_LOG },
    result: { item: BlockType.PLANKS, count: 4 },
    gridSize: 2
  },

  // Planks → Sticks (2 vertical planks)
  createShapedRecipe(
    'sticks',
    ['P', 'P'],
    { 'P': BlockType.PLANKS },
    BlockType.STICK,
    4
  ),

  // 4 Planks → Crafting Table
  createShapedRecipe(
    'crafting_table',
    ['PP', 'PP'],
    { 'P': BlockType.PLANKS },
    BlockType.CRAFTING_TABLE,
    1
  ),

  // 8 Cobblestone → Furnace
  createShapedRecipe(
    'furnace',
    ['CCC', 'C C', 'CCC'],
    { 'C': BlockType.COBBLESTONE },
    BlockType.FURNACE,
    1
  ),

  // Torch (coal + stick) - placeholder for future
  // createShapedRecipe(
  //   'torch',
  //   ['C', 'S'],
  //   { 'C': BlockType.COAL, 'S': BlockType.STICK },
  //   BlockType.TORCH,
  //   4
  // )
]

/**
 * Register basic recipes with the registry
 */
export function registerBasicRecipes(): void {
  import('../RecipeRegistry').then(({ RecipeRegistry }) => {
    const registry = RecipeRegistry.getInstance()
    registry.registerAll(BASIC_RECIPES)
    console.log(`[BasicRecipes] Registered ${BASIC_RECIPES.length} basic recipes`)
  })
}
