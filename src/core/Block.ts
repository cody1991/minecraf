/**
 * Block types available in the game
 */
export enum BlockType {
  AIR = 0,
  GRASS = 1,
  DIRT = 2,
  STONE = 3,
  WOOD = 4,
  SAND = 5
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
  [BlockType.SAND]: '沙子'
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
  [BlockType.SAND]: 0xf4e4a6
}

/**
 * Get texture index for a block type (used in texture atlas)
 */
export function getTextureIndex(type: BlockType): number {
  if (type === BlockType.AIR) return -1
  return type - 1 // GRASS=0, DIRT=1, STONE=2, WOOD=3, SAND=4
}

/**
 * Check if a block type is solid (for collision detection)
 */
export function isSolid(type: BlockType): boolean {
  return type !== BlockType.AIR
}

/**
 * All placeable block types (excluding AIR)
 */
export const PLACEABLE_BLOCKS: BlockType[] = [
  BlockType.GRASS,
  BlockType.DIRT,
  BlockType.STONE,
  BlockType.WOOD,
  BlockType.SAND
]
