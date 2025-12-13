/**
 * Map color configuration for minimap and world map
 * Feature: 012-sound-map-system
 */

import { BlockType } from '../core/Block'

/**
 * Block type to map color mapping
 */
export const MAP_COLORS: Record<number, string> = {
  // Natural blocks
  [BlockType.AIR]: 'transparent',
  [BlockType.GRASS]: '#7CFC00',
  [BlockType.DIRT]: '#8B4513',
  [BlockType.STONE]: '#808080',
  [BlockType.SAND]: '#F4A460',
  [BlockType.WATER]: '#4169E1',
  [BlockType.SNOW]: '#FFFAFA',
  
  // Wood and leaves
  [BlockType.WOOD]: '#8B4513',
  [BlockType.LOG]: '#6B4423',
  [BlockType.PLANKS]: '#DEB887',
  [BlockType.LEAVES]: '#228B22',
  [BlockType.OAK_LOG]: '#6B4423',
  [BlockType.OAK_LEAVES]: '#228B22',
  [BlockType.BIRCH_LOG]: '#D2B48C',
  [BlockType.BIRCH_LEAVES]: '#90EE90',
  [BlockType.SPRUCE_LOG]: '#4A3728',
  [BlockType.SPRUCE_LEAVES]: '#2D5A2D',
  
  // Building blocks
  [BlockType.COBBLESTONE]: '#696969',
  [BlockType.BRICK]: '#B22222',
  [BlockType.GLASS]: '#87CEEB',
  
  // Ancient landmarks
  [BlockType.SANDSTONE]: '#D4B896',
  [BlockType.SANDSTONE_CARVED]: '#C4A876',
  [BlockType.RED_BRICK]: '#8B2323',
  [BlockType.GOLD_BLOCK]: '#FFD700',
  [BlockType.DARK_STONE]: '#4A4A4A',
  [BlockType.MOSSY_STONE]: '#5A6B4A',
  
  // Plants (show as their primary color)
  [BlockType.FLOWER_RED]: '#FF4444',
  [BlockType.FLOWER_YELLOW]: '#FFFF44',
  [BlockType.TALL_GRASS]: '#5A8F3D',
  [BlockType.MUSHROOM_RED]: '#CC3333',
  [BlockType.MUSHROOM_BROWN]: '#8B6914',
  [BlockType.DEAD_BUSH]: '#8B6B47',
  [BlockType.CACTUS]: '#2D6B2D',
  [BlockType.ROSE]: '#CC0033',
  [BlockType.TULIP]: '#FF69B4',
  [BlockType.DAISY]: '#FFFFFF',
  [BlockType.CORNFLOWER]: '#6495ED',
  [BlockType.TORCH]: '#FFCC00',
}

/**
 * Default color for unknown block types
 */
export const DEFAULT_BLOCK_COLOR = '#404040'

/**
 * Color for unloaded chunks
 */
export const UNLOADED_CHUNK_COLOR = '#1a1a1a'

/**
 * Player marker color
 */
export const PLAYER_COLOR = '#FF0000'

/**
 * Player direction indicator color
 */
export const PLAYER_DIRECTION_COLOR = '#FFFFFF'

/**
 * Get map color for a block type
 */
export function getMapColor(blockType: number): string {
  return MAP_COLORS[blockType] ?? DEFAULT_BLOCK_COLOR
}
