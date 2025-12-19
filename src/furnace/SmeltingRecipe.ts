/**
 * SmeltingRecipe - Smelting recipe definitions
 * Feature: 023-crafting-tools-system
 * 
 * Defines smelting recipes for the furnace.
 */

import { BlockType } from '../core/Block'

/**
 * Smelting recipe interface
 */
export interface SmeltingRecipe {
  /** Unique recipe identifier */
  id: string
  /** Input item type */
  input: BlockType
  /** Output item type */
  output: BlockType
  /** Output count */
  outputCount: number
  /** Smelting time in seconds */
  smeltTime: number
}

/**
 * All smelting recipes
 */
export const SMELTING_RECIPES: SmeltingRecipe[] = [
  // Ore smelting
  {
    id: 'iron_ingot',
    input: BlockType.IRON_ORE,
    output: BlockType.IRON_INGOT,
    outputCount: 1,
    smeltTime: 10
  },
  // Food cooking (same as campfire but in furnace)
  {
    id: 'cooked_beef',
    input: BlockType.RAW_BEEF,
    output: BlockType.COOKED_BEEF,
    outputCount: 1,
    smeltTime: 10
  },
  {
    id: 'cooked_porkchop',
    input: BlockType.RAW_PORKCHOP,
    output: BlockType.COOKED_PORKCHOP,
    outputCount: 1,
    smeltTime: 10
  },
  {
    id: 'cooked_mutton',
    input: BlockType.RAW_MUTTON,
    output: BlockType.COOKED_MUTTON,
    outputCount: 1,
    smeltTime: 10
  },
  {
    id: 'cooked_chicken',
    input: BlockType.RAW_CHICKEN,
    output: BlockType.COOKED_CHICKEN,
    outputCount: 1,
    smeltTime: 10
  },
  {
    id: 'cooked_rabbit',
    input: BlockType.RAW_RABBIT,
    output: BlockType.COOKED_RABBIT,
    outputCount: 1,
    smeltTime: 10
  },
  // Charcoal from logs
  {
    id: 'charcoal_log',
    input: BlockType.LOG,
    output: BlockType.CHARCOAL,
    outputCount: 1,
    smeltTime: 10
  },
  {
    id: 'charcoal_oak',
    input: BlockType.OAK_LOG,
    output: BlockType.CHARCOAL,
    outputCount: 1,
    smeltTime: 10
  },
  {
    id: 'charcoal_birch',
    input: BlockType.BIRCH_LOG,
    output: BlockType.CHARCOAL,
    outputCount: 1,
    smeltTime: 10
  },
  {
    id: 'charcoal_spruce',
    input: BlockType.SPRUCE_LOG,
    output: BlockType.CHARCOAL,
    outputCount: 1,
    smeltTime: 10
  }
]

/**
 * Get smelting recipe for an input item
 */
export function getSmeltingRecipe(input: BlockType): SmeltingRecipe | null {
  return SMELTING_RECIPES.find(r => r.input === input) || null
}

/**
 * Check if an item can be smelted
 */
export function canSmelt(input: BlockType): boolean {
  return SMELTING_RECIPES.some(r => r.input === input)
}
