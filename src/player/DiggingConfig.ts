/**
 * DiggingConfig - Block digging time configuration
 * Feature: 023-digging-system
 * 
 * Defines base digging times for different block types.
 * Times are in seconds.
 */

import { BlockType } from '../core/Block'

/**
 * Block hardness values (time in seconds to break with bare hands)
 */
export const BLOCK_HARDNESS: Partial<Record<BlockType, number>> = {
  // Instant break (0.1s)
  [BlockType.TALL_GRASS]: 0.1,
  [BlockType.FLOWER_RED]: 0.1,
  [BlockType.FLOWER_YELLOW]: 0.1,
  [BlockType.ROSE]: 0.1,
  [BlockType.TULIP]: 0.1,
  [BlockType.DAISY]: 0.1,
  [BlockType.CORNFLOWER]: 0.1,
  [BlockType.DEAD_BUSH]: 0.1,
  [BlockType.MUSHROOM_RED]: 0.1,
  [BlockType.MUSHROOM_BROWN]: 0.1,
  [BlockType.TORCH]: 0.1,
  
  // Very soft (0.5s)
  [BlockType.LEAVES]: 0.5,
  [BlockType.OAK_LEAVES]: 0.5,
  [BlockType.BIRCH_LEAVES]: 0.5,
  [BlockType.SPRUCE_LEAVES]: 0.5,
  [BlockType.SNOW]: 0.5,
  
  // Soft (1.0s)
  [BlockType.DIRT]: 1.0,
  [BlockType.GRASS]: 1.0,
  [BlockType.SAND]: 1.0,
  [BlockType.CACTUS]: 1.0,
  [BlockType.CAMPFIRE]: 1.0,  // Feature: 023-campfire-system
  
  // Medium (1.5s)
  [BlockType.PLANKS]: 1.5,
  [BlockType.WOOD]: 1.5,
  [BlockType.LOG]: 1.5,
  [BlockType.OAK_LOG]: 1.5,
  [BlockType.BIRCH_LOG]: 1.5,
  [BlockType.SPRUCE_LOG]: 1.5,
  
  // Hard (2.5s)
  [BlockType.COBBLESTONE]: 2.5,
  [BlockType.STONE]: 2.5,
  [BlockType.BRICK]: 2.5,
  [BlockType.SANDSTONE]: 2.5,
  [BlockType.SANDSTONE_CARVED]: 2.5,
  [BlockType.RED_BRICK]: 2.5,
  [BlockType.DARK_STONE]: 2.5,
  [BlockType.MOSSY_STONE]: 2.5,
  
  // Very hard (3.5s)
  [BlockType.GOLD_BLOCK]: 3.5,
  
  // Glass (fragile but takes time)
  [BlockType.GLASS]: 0.8,
}

/** Default hardness for blocks not in the list */
export const DEFAULT_HARDNESS = 1.5

/**
 * Get the digging time for a block type
 */
export function getBlockDiggingTime(blockType: BlockType): number {
  return BLOCK_HARDNESS[blockType] ?? DEFAULT_HARDNESS
}

/**
 * Crack stage thresholds (0-9 stages)
 * Each threshold represents the progress percentage at which a new crack stage appears
 */
export const CRACK_STAGES = 10

/**
 * Get crack stage (0-9) based on progress (0-1)
 */
export function getCrackStage(progress: number): number {
  return Math.min(Math.floor(progress * CRACK_STAGES), CRACK_STAGES - 1)
}
