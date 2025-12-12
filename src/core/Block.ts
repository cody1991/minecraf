/**
 * Block types available in the game
 * Feature: 005-block-textures - Extended with 8 new block types
 */
export enum BlockType {
  // Existing types
  AIR = 0,
  GRASS = 1,
  DIRT = 2,
  STONE = 3,
  WOOD = 4,      // Legacy wood (planks)
  SAND = 5,
  // New types (005-block-textures)
  COBBLESTONE = 6,
  BRICK = 7,
  GLASS = 8,
  WATER = 9,
  LEAVES = 10,
  LOG = 11,
  PLANKS = 12,
  SNOW = 13
}

/**
 * Block properties interface
 */
export interface BlockProperties {
  name: string           // Display name (Chinese)
  nameEn: string         // English name
  color: number          // Fallback color (hex)
  transparent: boolean   // Whether block is transparent
  opacity: number        // Opacity (0-1)
  solid: boolean         // Whether block has collision
}

/**
 * Block type names for display
 */
export const BLOCK_NAMES: Record<BlockType, string> = {
  [BlockType.AIR]: '空气',
  [BlockType.GRASS]: '草地',
  [BlockType.DIRT]: '泥土',
  [BlockType.STONE]: '石头',
  [BlockType.WOOD]: '木头',
  [BlockType.SAND]: '沙子',
  [BlockType.COBBLESTONE]: '圆石',
  [BlockType.BRICK]: '砖块',
  [BlockType.GLASS]: '玻璃',
  [BlockType.WATER]: '水',
  [BlockType.LEAVES]: '树叶',
  [BlockType.LOG]: '原木',
  [BlockType.PLANKS]: '木板',
  [BlockType.SNOW]: '雪'
}

/**
 * Block colors for rendering (fallback if textures not loaded)
 */
export const BLOCK_COLORS: Record<BlockType, number> = {
  [BlockType.AIR]: 0x000000,
  [BlockType.GRASS]: 0x7cba3d,
  [BlockType.DIRT]: 0x8b5a2b,
  [BlockType.STONE]: 0x808080,
  [BlockType.WOOD]: 0x8b4513,
  [BlockType.SAND]: 0xf4e4a6,
  [BlockType.COBBLESTONE]: 0x6b6b6b,
  [BlockType.BRICK]: 0x9c4a3a,
  [BlockType.GLASS]: 0xc8e8ff,
  [BlockType.WATER]: 0x3366cc,
  [BlockType.LEAVES]: 0x3d9140,
  [BlockType.LOG]: 0x6b4423,
  [BlockType.PLANKS]: 0xbc8f5a,
  [BlockType.SNOW]: 0xfafafa
}

/**
 * Block properties for all block types
 */
export const BLOCK_PROPERTIES: Record<BlockType, BlockProperties> = {
  [BlockType.AIR]: {
    name: '空气',
    nameEn: 'Air',
    color: 0x000000,
    transparent: true,
    opacity: 0,
    solid: false
  },
  [BlockType.GRASS]: {
    name: '草地',
    nameEn: 'Grass',
    color: 0x7cba3d,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.DIRT]: {
    name: '泥土',
    nameEn: 'Dirt',
    color: 0x8b5a2b,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.STONE]: {
    name: '石头',
    nameEn: 'Stone',
    color: 0x808080,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.WOOD]: {
    name: '木头',
    nameEn: 'Wood',
    color: 0x8b4513,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.SAND]: {
    name: '沙子',
    nameEn: 'Sand',
    color: 0xf4e4a6,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.COBBLESTONE]: {
    name: '圆石',
    nameEn: 'Cobblestone',
    color: 0x6b6b6b,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.BRICK]: {
    name: '砖块',
    nameEn: 'Brick',
    color: 0x9c4a3a,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.GLASS]: {
    name: '玻璃',
    nameEn: 'Glass',
    color: 0xc8e8ff,
    transparent: true,
    opacity: 0.3,
    solid: true
  },
  [BlockType.WATER]: {
    name: '水',
    nameEn: 'Water',
    color: 0x3366cc,
    transparent: true,
    opacity: 0.6,
    solid: false
  },
  [BlockType.LEAVES]: {
    name: '树叶',
    nameEn: 'Leaves',
    color: 0x3d9140,
    transparent: true,
    opacity: 0.8,
    solid: true
  },
  [BlockType.LOG]: {
    name: '原木',
    nameEn: 'Log',
    color: 0x6b4423,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.PLANKS]: {
    name: '木板',
    nameEn: 'Planks',
    color: 0xbc8f5a,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.SNOW]: {
    name: '雪',
    nameEn: 'Snow',
    color: 0xfafafa,
    transparent: false,
    opacity: 1,
    solid: true
  }
}

/**
 * Get texture index for a block type (used in texture atlas)
 */
export function getTextureIndex(type: BlockType): number {
  if (type === BlockType.AIR) return -1
  return type - 1
}

/**
 * Check if a block type is solid (for collision detection)
 */
export function isSolid(type: BlockType): boolean {
  return BLOCK_PROPERTIES[type]?.solid ?? (type !== BlockType.AIR)
}

/**
 * Check if a block type is transparent
 */
export function isTransparent(type: BlockType): boolean {
  return BLOCK_PROPERTIES[type]?.transparent ?? false
}

/**
 * Get block opacity (0-1)
 */
export function getBlockOpacity(type: BlockType): number {
  return BLOCK_PROPERTIES[type]?.opacity ?? 1
}

/**
 * All placeable block types (excluding AIR)
 */
export const PLACEABLE_BLOCKS: BlockType[] = [
  BlockType.GRASS,
  BlockType.DIRT,
  BlockType.STONE,
  BlockType.WOOD,
  BlockType.SAND,
  BlockType.COBBLESTONE,
  BlockType.BRICK,
  BlockType.GLASS,
  BlockType.WATER,
  BlockType.LEAVES,
  BlockType.LOG,
  BlockType.PLANKS,
  BlockType.SNOW
]
