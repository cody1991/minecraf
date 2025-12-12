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
