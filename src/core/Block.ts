/**
 * Block types available in the game
 * Feature: 005-block-textures - Extended with 8 new block types
 * Updated: 009-ecosystem-flora-fauna - Added tree and flower types
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
  SNOW = 13,
  // Plant types (008-biome-weather-system)
  FLOWER_RED = 14,
  FLOWER_YELLOW = 15,
  TALL_GRASS = 16,
  MUSHROOM_RED = 17,
  MUSHROOM_BROWN = 18,
  DEAD_BUSH = 19,
  CACTUS = 20,
  // New flower types (009-ecosystem-flora-fauna)
  ROSE = 21,
  TULIP = 22,
  DAISY = 23,
  CORNFLOWER = 24,
  // Tree-specific blocks (009-ecosystem-flora-fauna)
  OAK_LOG = 25,
  BIRCH_LOG = 26,
  SPRUCE_LOG = 27,
  OAK_LEAVES = 28,
  BIRCH_LEAVES = 29,
  SPRUCE_LEAVES = 30,
  // Ancient landmarks blocks (011-ancient-landmarks)
  SANDSTONE = 31,        // 金字塔沙石
  SANDSTONE_CARVED = 32, // 金字塔雕刻沙石
  RED_BRICK = 33,        // 故宫红砖
  GOLD_BLOCK = 34,       // 故宫金色装饰
  DARK_STONE = 35,       // 城堡深色石头
  MOSSY_STONE = 36,      // 城堡苔藓石头
  TORCH = 37             // 火把照明
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
  [BlockType.SNOW]: '雪',
  // Plant types (008-biome-weather-system)
  [BlockType.FLOWER_RED]: '红花',
  [BlockType.FLOWER_YELLOW]: '黄花',
  [BlockType.TALL_GRASS]: '高草',
  [BlockType.MUSHROOM_RED]: '红蘑菇',
  [BlockType.MUSHROOM_BROWN]: '棕蘑菇',
  [BlockType.DEAD_BUSH]: '枯灌木',
  [BlockType.CACTUS]: '仙人掌',
  // New flower types (009-ecosystem-flora-fauna)
  [BlockType.ROSE]: '玫瑰',
  [BlockType.TULIP]: '郁金香',
  [BlockType.DAISY]: '雏菊',
  [BlockType.CORNFLOWER]: '矢车菊',
  // Tree-specific blocks (009-ecosystem-flora-fauna)
  [BlockType.OAK_LOG]: '橡木原木',
  [BlockType.BIRCH_LOG]: '桦木原木',
  [BlockType.SPRUCE_LOG]: '云杉原木',
  [BlockType.OAK_LEAVES]: '橡树树叶',
  [BlockType.BIRCH_LEAVES]: '桦树树叶',
  [BlockType.SPRUCE_LEAVES]: '云杉树叶',
  // Ancient landmarks blocks (011-ancient-landmarks)
  [BlockType.SANDSTONE]: '沙石',
  [BlockType.SANDSTONE_CARVED]: '雕刻沙石',
  [BlockType.RED_BRICK]: '红砖',
  [BlockType.GOLD_BLOCK]: '金块',
  [BlockType.DARK_STONE]: '深色石头',
  [BlockType.MOSSY_STONE]: '苔藓石头',
  [BlockType.TORCH]: '火把'
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
  [BlockType.SNOW]: 0xfafafa,
  // Plant types (008-biome-weather-system)
  [BlockType.FLOWER_RED]: 0xff4444,
  [BlockType.FLOWER_YELLOW]: 0xffff44,
  [BlockType.TALL_GRASS]: 0x5a8f3d,
  [BlockType.MUSHROOM_RED]: 0xcc3333,
  [BlockType.MUSHROOM_BROWN]: 0x8b6914,
  [BlockType.DEAD_BUSH]: 0x8b6b47,
  [BlockType.CACTUS]: 0x2d6b2d,
  // New flower types (009-ecosystem-flora-fauna)
  [BlockType.ROSE]: 0xcc0033,
  [BlockType.TULIP]: 0xff69b4,
  [BlockType.DAISY]: 0xffffff,
  [BlockType.CORNFLOWER]: 0x6495ed,
  // Tree-specific blocks (009-ecosystem-flora-fauna)
  [BlockType.OAK_LOG]: 0x6b4423,
  [BlockType.BIRCH_LOG]: 0xd4c4a8,
  [BlockType.SPRUCE_LOG]: 0x4a3728,
  [BlockType.OAK_LEAVES]: 0x3d9140,
  [BlockType.BIRCH_LEAVES]: 0x5a9f4a,
  [BlockType.SPRUCE_LEAVES]: 0x2d5a2d,
  // Ancient landmarks blocks (011-ancient-landmarks)
  [BlockType.SANDSTONE]: 0xd4b896,
  [BlockType.SANDSTONE_CARVED]: 0xc4a876,
  [BlockType.RED_BRICK]: 0x8b2323,
  [BlockType.GOLD_BLOCK]: 0xffd700,
  [BlockType.DARK_STONE]: 0x4a4a4a,
  [BlockType.MOSSY_STONE]: 0x5a6b4a,
  [BlockType.TORCH]: 0xffcc00
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
  },
  // Plant types (008-biome-weather-system)
  [BlockType.FLOWER_RED]: {
    name: '红花',
    nameEn: 'Red Flower',
    color: 0xff4444,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.FLOWER_YELLOW]: {
    name: '黄花',
    nameEn: 'Yellow Flower',
    color: 0xffff44,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.TALL_GRASS]: {
    name: '高草',
    nameEn: 'Tall Grass',
    color: 0x5a8f3d,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.MUSHROOM_RED]: {
    name: '红蘑菇',
    nameEn: 'Red Mushroom',
    color: 0xcc3333,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.MUSHROOM_BROWN]: {
    name: '棕蘑菇',
    nameEn: 'Brown Mushroom',
    color: 0x8b6914,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.DEAD_BUSH]: {
    name: '枯灌木',
    nameEn: 'Dead Bush',
    color: 0x8b6b47,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.CACTUS]: {
    name: '仙人掌',
    nameEn: 'Cactus',
    color: 0x2d6b2d,
    transparent: true,
    opacity: 1,
    solid: true  // Cactus is solid for collision
  },
  // New flower types (009-ecosystem-flora-fauna)
  [BlockType.ROSE]: {
    name: '玫瑰',
    nameEn: 'Rose',
    color: 0xcc0033,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.TULIP]: {
    name: '郁金香',
    nameEn: 'Tulip',
    color: 0xff69b4,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.DAISY]: {
    name: '雏菊',
    nameEn: 'Daisy',
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    solid: false
  },
  [BlockType.CORNFLOWER]: {
    name: '矢车菊',
    nameEn: 'Cornflower',
    color: 0x6495ed,
    transparent: true,
    opacity: 1,
    solid: false
  },
  // Tree-specific blocks (009-ecosystem-flora-fauna)
  [BlockType.OAK_LOG]: {
    name: '橡木原木',
    nameEn: 'Oak Log',
    color: 0x6b4423,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.BIRCH_LOG]: {
    name: '桦木原木',
    nameEn: 'Birch Log',
    color: 0xd4c4a8,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.SPRUCE_LOG]: {
    name: '云杉原木',
    nameEn: 'Spruce Log',
    color: 0x4a3728,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.OAK_LEAVES]: {
    name: '橡树树叶',
    nameEn: 'Oak Leaves',
    color: 0x3d9140,
    transparent: true,
    opacity: 0.8,
    solid: true
  },
  [BlockType.BIRCH_LEAVES]: {
    name: '桦树树叶',
    nameEn: 'Birch Leaves',
    color: 0x5a9f4a,
    transparent: true,
    opacity: 0.8,
    solid: true
  },
  [BlockType.SPRUCE_LEAVES]: {
    name: '云杉树叶',
    nameEn: 'Spruce Leaves',
    color: 0x2d5a2d,
    transparent: true,
    opacity: 0.8,
    solid: true
  },
  // Ancient landmarks blocks (011-ancient-landmarks)
  [BlockType.SANDSTONE]: {
    name: '沙石',
    nameEn: 'Sandstone',
    color: 0xd4b896,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.SANDSTONE_CARVED]: {
    name: '雕刻沙石',
    nameEn: 'Carved Sandstone',
    color: 0xc4a876,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.RED_BRICK]: {
    name: '红砖',
    nameEn: 'Red Brick',
    color: 0x8b2323,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.GOLD_BLOCK]: {
    name: '金块',
    nameEn: 'Gold Block',
    color: 0xffd700,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.DARK_STONE]: {
    name: '深色石头',
    nameEn: 'Dark Stone',
    color: 0x4a4a4a,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.MOSSY_STONE]: {
    name: '苔藓石头',
    nameEn: 'Mossy Stone',
    color: 0x5a6b4a,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.TORCH]: {
    name: '火把',
    nameEn: 'Torch',
    color: 0xffcc00,
    transparent: true,
    opacity: 1,
    solid: false
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
 * Check if a block type is a cross-shaped plant (rendered with X pattern)
 */
export function isCrossPlant(type: BlockType): boolean {
  return type === BlockType.FLOWER_RED ||
         type === BlockType.FLOWER_YELLOW ||
         type === BlockType.TALL_GRASS ||
         type === BlockType.MUSHROOM_RED ||
         type === BlockType.MUSHROOM_BROWN ||
         type === BlockType.DEAD_BUSH ||
         // New flower types (009-ecosystem-flora-fauna)
         type === BlockType.ROSE ||
         type === BlockType.TULIP ||
         type === BlockType.DAISY ||
         type === BlockType.CORNFLOWER
}

/**
 * Check if a block type is a plant
 */
export function isPlant(type: BlockType): boolean {
  return (type >= BlockType.FLOWER_RED && type <= BlockType.CACTUS) ||
         (type >= BlockType.ROSE && type <= BlockType.CORNFLOWER)
}

/**
 * Check if a block type is a tree log
 */
export function isTreeLog(type: BlockType): boolean {
  return type === BlockType.OAK_LOG ||
         type === BlockType.BIRCH_LOG ||
         type === BlockType.SPRUCE_LOG ||
         type === BlockType.LOG
}

/**
 * Check if a block type is tree leaves
 */
export function isTreeLeaves(type: BlockType): boolean {
  return type === BlockType.OAK_LEAVES ||
         type === BlockType.BIRCH_LEAVES ||
         type === BlockType.SPRUCE_LEAVES ||
         type === BlockType.LEAVES
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
