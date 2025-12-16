/**
 * BlockTextures - Block texture definitions and mappings
 * Feature: 005-block-textures
 * 
 * Defines texture mappings for each block type, supporting different
 * textures for top, bottom, and side faces.
 */

import { BlockType } from '../core/Block'

/**
 * Face types for texture mapping
 */
export type BlockFace = 'top' | 'bottom' | 'front' | 'back' | 'left' | 'right' | 'side'

/**
 * Block texture map - defines textures for each face
 */
export interface BlockTextureMap {
  top: number      // Texture index for top face
  bottom: number   // Texture index for bottom face
  side: number     // Texture index for side faces (front, back, left, right)
}

/**
 * Texture indices in the atlas (column index)
 * Layout: 16 columns x 3 rows
 * Row 0: Top textures
 * Row 1: Side textures
 * Row 2: Bottom textures
 */
export const TextureIndex = {
  // Existing blocks
  GRASS_TOP: 0,
  GRASS_SIDE: 1,
  DIRT: 2,
  STONE: 3,
  WOOD: 4,        // Planks (legacy WOOD)
  SAND: 5,
  // New blocks
  COBBLESTONE: 6,
  BRICK: 7,
  GLASS: 8,
  WATER: 9,
  LEAVES: 10,
  LOG_TOP: 11,
  LOG_SIDE: 12,
  PLANKS: 13,
  SNOW: 14,
  // Ancient landmarks blocks (011-ancient-landmarks)
  SANDSTONE: 15,
  SANDSTONE_CARVED: 16,
  RED_BRICK: 17,
  GOLD_BLOCK: 18,
  DARK_STONE: 19,
  MOSSY_STONE: 20,
  TORCH: 21,
  // Food items (021-food-system)
  RAW_BEEF: 22,
  RAW_PORKCHOP: 23,
  // Cooked food items (023-campfire-system) - reuse raw textures with different tint
  COOKED_BEEF: 22,      // Same as RAW_BEEF
  COOKED_PORKCHOP: 23,  // Same as RAW_PORKCHOP
  COOKED_MUTTON: 22,    // Same as RAW_BEEF
  COOKED_CHICKEN: 23,   // Same as RAW_PORKCHOP
  COOKED_RABBIT: 22,    // Same as RAW_BEEF
  // Campfire (023-campfire-system)
  CAMPFIRE: 21,         // Use torch texture as placeholder
} as const

/**
 * Block texture mappings - defines which texture each face uses
 */
export const BLOCK_TEXTURE_MAPS: Partial<Record<BlockType, BlockTextureMap>> = {
  [BlockType.GRASS]: {
    top: TextureIndex.GRASS_TOP,
    bottom: TextureIndex.DIRT,
    side: TextureIndex.GRASS_SIDE
  },
  [BlockType.DIRT]: {
    top: TextureIndex.DIRT,
    bottom: TextureIndex.DIRT,
    side: TextureIndex.DIRT
  },
  [BlockType.STONE]: {
    top: TextureIndex.STONE,
    bottom: TextureIndex.STONE,
    side: TextureIndex.STONE
  },
  [BlockType.WOOD]: {
    top: TextureIndex.WOOD,
    bottom: TextureIndex.WOOD,
    side: TextureIndex.WOOD
  },
  [BlockType.SAND]: {
    top: TextureIndex.SAND,
    bottom: TextureIndex.SAND,
    side: TextureIndex.SAND
  },
  [BlockType.COBBLESTONE]: {
    top: TextureIndex.COBBLESTONE,
    bottom: TextureIndex.COBBLESTONE,
    side: TextureIndex.COBBLESTONE
  },
  [BlockType.BRICK]: {
    top: TextureIndex.BRICK,
    bottom: TextureIndex.BRICK,
    side: TextureIndex.BRICK
  },
  [BlockType.GLASS]: {
    top: TextureIndex.GLASS,
    bottom: TextureIndex.GLASS,
    side: TextureIndex.GLASS
  },
  [BlockType.WATER]: {
    top: TextureIndex.WATER,
    bottom: TextureIndex.WATER,
    side: TextureIndex.WATER
  },
  [BlockType.LEAVES]: {
    top: TextureIndex.LEAVES,
    bottom: TextureIndex.LEAVES,
    side: TextureIndex.LEAVES
  },
  [BlockType.LOG]: {
    top: TextureIndex.LOG_TOP,
    bottom: TextureIndex.LOG_TOP,
    side: TextureIndex.LOG_SIDE
  },
  [BlockType.PLANKS]: {
    top: TextureIndex.PLANKS,
    bottom: TextureIndex.PLANKS,
    side: TextureIndex.PLANKS
  },
  [BlockType.SNOW]: {
    top: TextureIndex.SNOW,
    bottom: TextureIndex.SNOW,
    side: TextureIndex.SNOW
  },
  // Tree-specific blocks (009-ecosystem-flora-fauna)
  // All tree logs use the same LOG textures
  [BlockType.OAK_LOG]: {
    top: TextureIndex.LOG_TOP,
    bottom: TextureIndex.LOG_TOP,
    side: TextureIndex.LOG_SIDE
  },
  [BlockType.BIRCH_LOG]: {
    top: TextureIndex.LOG_TOP,
    bottom: TextureIndex.LOG_TOP,
    side: TextureIndex.LOG_SIDE
  },
  [BlockType.SPRUCE_LOG]: {
    top: TextureIndex.LOG_TOP,
    bottom: TextureIndex.LOG_TOP,
    side: TextureIndex.LOG_SIDE
  },
  // All tree leaves use the same LEAVES texture
  [BlockType.OAK_LEAVES]: {
    top: TextureIndex.LEAVES,
    bottom: TextureIndex.LEAVES,
    side: TextureIndex.LEAVES
  },
  [BlockType.BIRCH_LEAVES]: {
    top: TextureIndex.LEAVES,
    bottom: TextureIndex.LEAVES,
    side: TextureIndex.LEAVES
  },
  [BlockType.SPRUCE_LEAVES]: {
    top: TextureIndex.LEAVES,
    bottom: TextureIndex.LEAVES,
    side: TextureIndex.LEAVES
  },
  // Ancient landmarks blocks (011-ancient-landmarks)
  [BlockType.SANDSTONE]: {
    top: TextureIndex.SANDSTONE,
    bottom: TextureIndex.SANDSTONE,
    side: TextureIndex.SANDSTONE
  },
  [BlockType.SANDSTONE_CARVED]: {
    top: TextureIndex.SANDSTONE_CARVED,
    bottom: TextureIndex.SANDSTONE_CARVED,
    side: TextureIndex.SANDSTONE_CARVED
  },
  [BlockType.RED_BRICK]: {
    top: TextureIndex.RED_BRICK,
    bottom: TextureIndex.RED_BRICK,
    side: TextureIndex.RED_BRICK
  },
  [BlockType.GOLD_BLOCK]: {
    top: TextureIndex.GOLD_BLOCK,
    bottom: TextureIndex.GOLD_BLOCK,
    side: TextureIndex.GOLD_BLOCK
  },
  [BlockType.DARK_STONE]: {
    top: TextureIndex.DARK_STONE,
    bottom: TextureIndex.DARK_STONE,
    side: TextureIndex.DARK_STONE
  },
  [BlockType.MOSSY_STONE]: {
    top: TextureIndex.MOSSY_STONE,
    bottom: TextureIndex.MOSSY_STONE,
    side: TextureIndex.MOSSY_STONE
  },
  [BlockType.TORCH]: {
    top: TextureIndex.TORCH,
    bottom: TextureIndex.TORCH,
    side: TextureIndex.TORCH
  },
  // Food items (021-food-system)
  [BlockType.RAW_BEEF]: {
    top: TextureIndex.RAW_BEEF,
    bottom: TextureIndex.RAW_BEEF,
    side: TextureIndex.RAW_BEEF
  },
  [BlockType.RAW_PORKCHOP]: {
    top: TextureIndex.RAW_PORKCHOP,
    bottom: TextureIndex.RAW_PORKCHOP,
    side: TextureIndex.RAW_PORKCHOP
  },
  [BlockType.RAW_MUTTON]: {
    top: TextureIndex.RAW_BEEF,  // Reuse beef texture
    bottom: TextureIndex.RAW_BEEF,
    side: TextureIndex.RAW_BEEF
  },
  [BlockType.RAW_CHICKEN]: {
    top: TextureIndex.RAW_PORKCHOP,  // Reuse porkchop texture
    bottom: TextureIndex.RAW_PORKCHOP,
    side: TextureIndex.RAW_PORKCHOP
  },
  [BlockType.RAW_RABBIT]: {
    top: TextureIndex.RAW_BEEF,  // Reuse beef texture
    bottom: TextureIndex.RAW_BEEF,
    side: TextureIndex.RAW_BEEF
  },
  // Cooked food items (023-campfire-system)
  [BlockType.COOKED_BEEF]: {
    top: TextureIndex.COOKED_BEEF,
    bottom: TextureIndex.COOKED_BEEF,
    side: TextureIndex.COOKED_BEEF
  },
  [BlockType.COOKED_PORKCHOP]: {
    top: TextureIndex.COOKED_PORKCHOP,
    bottom: TextureIndex.COOKED_PORKCHOP,
    side: TextureIndex.COOKED_PORKCHOP
  },
  [BlockType.COOKED_MUTTON]: {
    top: TextureIndex.COOKED_MUTTON,
    bottom: TextureIndex.COOKED_MUTTON,
    side: TextureIndex.COOKED_MUTTON
  },
  [BlockType.COOKED_CHICKEN]: {
    top: TextureIndex.COOKED_CHICKEN,
    bottom: TextureIndex.COOKED_CHICKEN,
    side: TextureIndex.COOKED_CHICKEN
  },
  [BlockType.COOKED_RABBIT]: {
    top: TextureIndex.COOKED_RABBIT,
    bottom: TextureIndex.COOKED_RABBIT,
    side: TextureIndex.COOKED_RABBIT
  },
  // Campfire (023-campfire-system)
  [BlockType.CAMPFIRE]: {
    top: TextureIndex.CAMPFIRE,
    bottom: TextureIndex.CAMPFIRE,
    side: TextureIndex.CAMPFIRE
  }
}

/**
 * Get texture index for a specific block face
 */
export function getTextureIndexForFace(blockType: BlockType, face: string): number {
  const textureMap = BLOCK_TEXTURE_MAPS[blockType]
  if (!textureMap) {
    return 0 // Default to first texture
  }

  switch (face) {
    case 'top':
      return textureMap.top
    case 'bottom':
      return textureMap.bottom
    case 'front':
    case 'back':
    case 'left':
    case 'right':
      return textureMap.side
    default:
      return textureMap.side
  }
}

/**
 * Check if a block type has different textures for different faces
 */
export function hasMultiFaceTextures(blockType: BlockType): boolean {
  const textureMap = BLOCK_TEXTURE_MAPS[blockType]
  if (!textureMap) return false
  
  return textureMap.top !== textureMap.side || textureMap.bottom !== textureMap.side
}
