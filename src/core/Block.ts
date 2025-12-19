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
  TORCH = 37,            // 火把照明
  // Survival mechanics blocks (020-survival-mechanics)
  LAVA = 38,             // 岩浆
  // Campfire (023-campfire-system)
  CAMPFIRE = 39,         // 篝火
  // Food items (021-food-system)
  RAW_BEEF = 50,
  RAW_PORKCHOP = 51,
  RAW_MUTTON = 52,
  RAW_CHICKEN = 53,
  RAW_RABBIT = 54,
  // Cooked food items (023-campfire-system)
  COOKED_BEEF = 60,
  COOKED_PORKCHOP = 61,
  COOKED_MUTTON = 62,
  COOKED_CHICKEN = 63,
  COOKED_RABBIT = 64,
  
  // Crafting & Tools System (023-crafting-tools-system)
  // Functional blocks
  CRAFTING_TABLE = 70,
  FURNACE = 71,
  FURNACE_LIT = 72,
  
  // Materials
  COAL = 80,
  CHARCOAL = 81,
  IRON_ORE = 82,
  IRON_INGOT = 83,
  DIAMOND = 84,
  STICK = 85,
  
  // Wood tools
  WOODEN_PICKAXE = 100,
  WOODEN_AXE = 101,
  WOODEN_SHOVEL = 102,
  WOODEN_SWORD = 103,
  WOODEN_HOE = 104,
  
  // Stone tools
  STONE_PICKAXE = 110,
  STONE_AXE = 111,
  STONE_SHOVEL = 112,
  STONE_SWORD = 113,
  STONE_HOE = 114,
  
  // Iron tools
  IRON_PICKAXE = 120,
  IRON_AXE = 121,
  IRON_SHOVEL = 122,
  IRON_SWORD = 123,
  IRON_HOE = 124,
  
  // Diamond tools
  DIAMOND_PICKAXE = 130,
  DIAMOND_AXE = 131,
  DIAMOND_SHOVEL = 132,
  DIAMOND_SWORD = 133,
  DIAMOND_HOE = 134
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
  [BlockType.TORCH]: '火把',
  // Survival mechanics blocks (020-survival-mechanics)
  [BlockType.LAVA]: '岩浆',
  // Campfire (023-campfire-system)
  [BlockType.CAMPFIRE]: '篝火',
  // Food items (021-food-system)
  [BlockType.RAW_BEEF]: '生牛肉',
  [BlockType.RAW_PORKCHOP]: '生猪排',
  [BlockType.RAW_MUTTON]: '生羊肉',
  [BlockType.RAW_CHICKEN]: '生鸡肉',
  [BlockType.RAW_RABBIT]: '生兔肉',
  // Cooked food items (023-campfire-system)
  [BlockType.COOKED_BEEF]: '熟牛肉',
  [BlockType.COOKED_PORKCHOP]: '熟猪排',
  [BlockType.COOKED_MUTTON]: '熟羊肉',
  [BlockType.COOKED_CHICKEN]: '熟鸡肉',
  [BlockType.COOKED_RABBIT]: '熟兔肉',
  
  // Crafting & Tools System (023-crafting-tools-system)
  [BlockType.CRAFTING_TABLE]: '工作台',
  [BlockType.FURNACE]: '熔炉',
  [BlockType.FURNACE_LIT]: '熔炉',
  [BlockType.COAL]: '煤炭',
  [BlockType.CHARCOAL]: '木炭',
  [BlockType.IRON_ORE]: '铁矿石',
  [BlockType.IRON_INGOT]: '铁锭',
  [BlockType.DIAMOND]: '钻石',
  [BlockType.STICK]: '木棍',
  // Wood tools
  [BlockType.WOODEN_PICKAXE]: '木镐',
  [BlockType.WOODEN_AXE]: '木斧',
  [BlockType.WOODEN_SHOVEL]: '木锹',
  [BlockType.WOODEN_SWORD]: '木剑',
  [BlockType.WOODEN_HOE]: '木锄',
  // Stone tools
  [BlockType.STONE_PICKAXE]: '石镐',
  [BlockType.STONE_AXE]: '石斧',
  [BlockType.STONE_SHOVEL]: '石锹',
  [BlockType.STONE_SWORD]: '石剑',
  [BlockType.STONE_HOE]: '石锄',
  // Iron tools
  [BlockType.IRON_PICKAXE]: '铁镐',
  [BlockType.IRON_AXE]: '铁斧',
  [BlockType.IRON_SHOVEL]: '铁锹',
  [BlockType.IRON_SWORD]: '铁剑',
  [BlockType.IRON_HOE]: '铁锄',
  // Diamond tools
  [BlockType.DIAMOND_PICKAXE]: '钻石镐',
  [BlockType.DIAMOND_AXE]: '钻石斧',
  [BlockType.DIAMOND_SHOVEL]: '钻石锹',
  [BlockType.DIAMOND_SWORD]: '钻石剑',
  [BlockType.DIAMOND_HOE]: '钻石锄'
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
  [BlockType.TORCH]: 0xffcc00,
  // Survival mechanics blocks (020-survival-mechanics)
  [BlockType.LAVA]: 0xff4500,
  // Campfire (023-campfire-system)
  [BlockType.CAMPFIRE]: 0xff6600,  // 橙色火焰
  // Food items (021-food-system)
  [BlockType.RAW_BEEF]: 0xc41e3a,    // 红色肉块
  [BlockType.RAW_PORKCHOP]: 0xffb6c1, // 粉红色
  [BlockType.RAW_MUTTON]: 0x8b0000,   // 深红色
  [BlockType.RAW_CHICKEN]: 0xffdab9,  // 浅粉色
  [BlockType.RAW_RABBIT]: 0xd2b48c,   // 浅棕色
  // Cooked food items (023-campfire-system)
  [BlockType.COOKED_BEEF]: 0x8b4513,    // 棕色熟肉
  [BlockType.COOKED_PORKCHOP]: 0xcd853f, // 金棕色
  [BlockType.COOKED_MUTTON]: 0xa0522d,   // 深棕色
  [BlockType.COOKED_CHICKEN]: 0xdaa520,  // 金黄色
  [BlockType.COOKED_RABBIT]: 0xb8860b,   // 深金色
  
  // Crafting & Tools System (023-crafting-tools-system)
  [BlockType.CRAFTING_TABLE]: 0xbc8f5a, // 木板色
  [BlockType.FURNACE]: 0x808080,        // 石头色
  [BlockType.FURNACE_LIT]: 0xff6600,    // 橙色（燃烧中）
  [BlockType.COAL]: 0x2a2a2a,           // 深灰色
  [BlockType.CHARCOAL]: 0x3a3a3a,       // 灰色
  [BlockType.IRON_ORE]: 0xd4a574,       // 铁矿色
  [BlockType.IRON_INGOT]: 0xd4d4d4,     // 银色
  [BlockType.DIAMOND]: 0x4aedd9,        // 钻石蓝
  [BlockType.STICK]: 0x8b6914,          // 木棍色
  // Wood tools
  [BlockType.WOODEN_PICKAXE]: 0xbc8f5a,
  [BlockType.WOODEN_AXE]: 0xbc8f5a,
  [BlockType.WOODEN_SHOVEL]: 0xbc8f5a,
  [BlockType.WOODEN_SWORD]: 0xbc8f5a,
  [BlockType.WOODEN_HOE]: 0xbc8f5a,
  // Stone tools
  [BlockType.STONE_PICKAXE]: 0x808080,
  [BlockType.STONE_AXE]: 0x808080,
  [BlockType.STONE_SHOVEL]: 0x808080,
  [BlockType.STONE_SWORD]: 0x808080,
  [BlockType.STONE_HOE]: 0x808080,
  // Iron tools
  [BlockType.IRON_PICKAXE]: 0xd4d4d4,
  [BlockType.IRON_AXE]: 0xd4d4d4,
  [BlockType.IRON_SHOVEL]: 0xd4d4d4,
  [BlockType.IRON_SWORD]: 0xd4d4d4,
  [BlockType.IRON_HOE]: 0xd4d4d4,
  // Diamond tools
  [BlockType.DIAMOND_PICKAXE]: 0x4aedd9,
  [BlockType.DIAMOND_AXE]: 0x4aedd9,
  [BlockType.DIAMOND_SHOVEL]: 0x4aedd9,
  [BlockType.DIAMOND_SWORD]: 0x4aedd9,
  [BlockType.DIAMOND_HOE]: 0x4aedd9
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
  },
  // Survival mechanics blocks (020-survival-mechanics)
  [BlockType.LAVA]: {
    name: '岩浆',
    nameEn: 'Lava',
    color: 0xff4500,
    transparent: true,
    opacity: 0.9,
    solid: false
  },
  // Food items (021-food-system)
  [BlockType.RAW_BEEF]: {
    name: '生牛肉',
    nameEn: 'Raw Beef',
    color: 0xc41e3a,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.RAW_PORKCHOP]: {
    name: '生猪排',
    nameEn: 'Raw Porkchop',
    color: 0xffb6c1,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.RAW_MUTTON]: {
    name: '生羊肉',
    nameEn: 'Raw Mutton',
    color: 0x8b0000,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.RAW_CHICKEN]: {
    name: '生鸡肉',
    nameEn: 'Raw Chicken',
    color: 0xffdab9,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.RAW_RABBIT]: {
    name: '生兔肉',
    nameEn: 'Raw Rabbit',
    color: 0xd2b48c,
    transparent: false,
    opacity: 1,
    solid: false
  },
  // Campfire (023-campfire-system)
  [BlockType.CAMPFIRE]: {
    name: '篝火',
    nameEn: 'Campfire',
    color: 0xff6600,
    transparent: true,
    opacity: 1,
    solid: true
  },
  // Cooked food items (023-campfire-system)
  [BlockType.COOKED_BEEF]: {
    name: '熟牛肉',
    nameEn: 'Cooked Beef',
    color: 0x8b4513,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.COOKED_PORKCHOP]: {
    name: '熟猪排',
    nameEn: 'Cooked Porkchop',
    color: 0xcd853f,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.COOKED_MUTTON]: {
    name: '熟羊肉',
    nameEn: 'Cooked Mutton',
    color: 0xa0522d,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.COOKED_CHICKEN]: {
    name: '熟鸡肉',
    nameEn: 'Cooked Chicken',
    color: 0xdaa520,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.COOKED_RABBIT]: {
    name: '熟兔肉',
    nameEn: 'Cooked Rabbit',
    color: 0xb8860b,
    transparent: false,
    opacity: 1,
    solid: false
  },
  
  // Crafting & Tools System (023-crafting-tools-system)
  [BlockType.CRAFTING_TABLE]: {
    name: '工作台',
    nameEn: 'Crafting Table',
    color: 0xbc8f5a,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.FURNACE]: {
    name: '熔炉',
    nameEn: 'Furnace',
    color: 0x808080,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.FURNACE_LIT]: {
    name: '熔炉',
    nameEn: 'Furnace',
    color: 0xff6600,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.COAL]: {
    name: '煤炭',
    nameEn: 'Coal',
    color: 0x2a2a2a,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.CHARCOAL]: {
    name: '木炭',
    nameEn: 'Charcoal',
    color: 0x3a3a3a,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.IRON_ORE]: {
    name: '铁矿石',
    nameEn: 'Iron Ore',
    color: 0xd4a574,
    transparent: false,
    opacity: 1,
    solid: true
  },
  [BlockType.IRON_INGOT]: {
    name: '铁锭',
    nameEn: 'Iron Ingot',
    color: 0xd4d4d4,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.DIAMOND]: {
    name: '钻石',
    nameEn: 'Diamond',
    color: 0x4aedd9,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.STICK]: {
    name: '木棍',
    nameEn: 'Stick',
    color: 0x8b6914,
    transparent: false,
    opacity: 1,
    solid: false
  },
  // Wood tools
  [BlockType.WOODEN_PICKAXE]: {
    name: '木镐',
    nameEn: 'Wooden Pickaxe',
    color: 0xbc8f5a,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.WOODEN_AXE]: {
    name: '木斧',
    nameEn: 'Wooden Axe',
    color: 0xbc8f5a,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.WOODEN_SHOVEL]: {
    name: '木锹',
    nameEn: 'Wooden Shovel',
    color: 0xbc8f5a,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.WOODEN_SWORD]: {
    name: '木剑',
    nameEn: 'Wooden Sword',
    color: 0xbc8f5a,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.WOODEN_HOE]: {
    name: '木锄',
    nameEn: 'Wooden Hoe',
    color: 0xbc8f5a,
    transparent: false,
    opacity: 1,
    solid: false
  },
  // Stone tools
  [BlockType.STONE_PICKAXE]: {
    name: '石镐',
    nameEn: 'Stone Pickaxe',
    color: 0x808080,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.STONE_AXE]: {
    name: '石斧',
    nameEn: 'Stone Axe',
    color: 0x808080,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.STONE_SHOVEL]: {
    name: '石锹',
    nameEn: 'Stone Shovel',
    color: 0x808080,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.STONE_SWORD]: {
    name: '石剑',
    nameEn: 'Stone Sword',
    color: 0x808080,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.STONE_HOE]: {
    name: '石锄',
    nameEn: 'Stone Hoe',
    color: 0x808080,
    transparent: false,
    opacity: 1,
    solid: false
  },
  // Iron tools
  [BlockType.IRON_PICKAXE]: {
    name: '铁镐',
    nameEn: 'Iron Pickaxe',
    color: 0xd4d4d4,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.IRON_AXE]: {
    name: '铁斧',
    nameEn: 'Iron Axe',
    color: 0xd4d4d4,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.IRON_SHOVEL]: {
    name: '铁锹',
    nameEn: 'Iron Shovel',
    color: 0xd4d4d4,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.IRON_SWORD]: {
    name: '铁剑',
    nameEn: 'Iron Sword',
    color: 0xd4d4d4,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.IRON_HOE]: {
    name: '铁锄',
    nameEn: 'Iron Hoe',
    color: 0xd4d4d4,
    transparent: false,
    opacity: 1,
    solid: false
  },
  // Diamond tools
  [BlockType.DIAMOND_PICKAXE]: {
    name: '钻石镐',
    nameEn: 'Diamond Pickaxe',
    color: 0x4aedd9,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.DIAMOND_AXE]: {
    name: '钻石斧',
    nameEn: 'Diamond Axe',
    color: 0x4aedd9,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.DIAMOND_SHOVEL]: {
    name: '钻石锹',
    nameEn: 'Diamond Shovel',
    color: 0x4aedd9,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.DIAMOND_SWORD]: {
    name: '钻石剑',
    nameEn: 'Diamond Sword',
    color: 0x4aedd9,
    transparent: false,
    opacity: 1,
    solid: false
  },
  [BlockType.DIAMOND_HOE]: {
    name: '钻石锄',
    nameEn: 'Diamond Hoe',
    color: 0x4aedd9,
    transparent: false,
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
  BlockType.SNOW,
  BlockType.CAMPFIRE,  // Feature: 023-campfire-system
  BlockType.CRAFTING_TABLE,  // Feature: 023-crafting-tools-system
  BlockType.FURNACE  // Feature: 023-crafting-tools-system
]
