# Data Model: 合成与工具系统

**Feature**: 023-crafting-tools-system  
**Date**: 2025-12-19

## 实体定义

### 1. BlockType 扩展

```typescript
// 在 core/Block.ts 中扩展 BlockType 枚举
enum BlockType {
  // ... 现有类型 ...
  
  // 功能方块
  CRAFTING_TABLE = 50,  // 工作台
  FURNACE = 51,         // 熔炉
  FURNACE_LIT = 52,     // 燃烧中的熔炉
  
  // 材料
  COAL = 60,            // 煤炭
  CHARCOAL = 61,        // 木炭
  IRON_ORE = 62,        // 铁矿石
  IRON_INGOT = 63,      // 铁锭
  DIAMOND = 64,         // 钻石
  STICK = 65,           // 木棍
  
  // 木质工具
  WOODEN_PICKAXE = 100,
  WOODEN_AXE = 101,
  WOODEN_SHOVEL = 102,
  WOODEN_SWORD = 103,
  WOODEN_HOE = 104,
  
  // 石质工具
  STONE_PICKAXE = 110,
  STONE_AXE = 111,
  STONE_SHOVEL = 112,
  STONE_SWORD = 113,
  STONE_HOE = 114,
  
  // 铁质工具
  IRON_PICKAXE = 120,
  IRON_AXE = 121,
  IRON_SHOVEL = 122,
  IRON_SWORD = 123,
  IRON_HOE = 124,
  
  // 钻石工具
  DIAMOND_PICKAXE = 130,
  DIAMOND_AXE = 131,
  DIAMOND_SHOVEL = 132,
  DIAMOND_SWORD = 133,
  DIAMOND_HOE = 134,
}
```

### 2. ItemSlot 扩展

```typescript
// 在 player/InventoryConstants.ts 中扩展
interface ItemSlot {
  itemType: BlockType | null;
  count: number;
  durability?: number;  // 新增：工具耐久度（仅工具有值）
  maxDurability?: number;  // 新增：最大耐久度（用于显示耐久度条）
}
```

### 3. ToolMaterial 枚举

```typescript
// tools/ToolTypes.ts
enum ToolMaterial {
  WOOD = 'wood',
  STONE = 'stone',
  IRON = 'iron',
  DIAMOND = 'diamond',
}

enum ToolType {
  PICKAXE = 'pickaxe',  // 镐
  AXE = 'axe',          // 斧
  SHOVEL = 'shovel',    // 锹
  SWORD = 'sword',      // 剑
  HOE = 'hoe',          // 锄
}
```

### 4. ToolProperties

```typescript
// tools/ToolProperties.ts
interface ToolProperties {
  material: ToolMaterial;
  type: ToolType;
  durability: number;       // 最大耐久度
  speedMultiplier: number;  // 挖掘速度倍率
  effectiveBlocks: BlockType[];  // 有效方块类型
}

// 工具属性表
const TOOL_PROPERTIES: Record<BlockType, ToolProperties> = {
  [BlockType.WOODEN_PICKAXE]: {
    material: ToolMaterial.WOOD,
    type: ToolType.PICKAXE,
    durability: 60,
    speedMultiplier: 2,
    effectiveBlocks: [BlockType.STONE, BlockType.COBBLESTONE, ...],
  },
  [BlockType.STONE_PICKAXE]: {
    material: ToolMaterial.STONE,
    type: ToolType.PICKAXE,
    durability: 131,
    speedMultiplier: 4,
    effectiveBlocks: [BlockType.STONE, BlockType.COBBLESTONE, ...],
  },
  // ... 其他工具
};
```

### 5. CraftingRecipe

```typescript
// crafting/CraftingRecipe.ts
interface CraftingRecipe {
  id: string;                    // 配方唯一标识
  type: 'shaped' | 'shapeless';  // 形状/无形状配方
  pattern?: string[];            // 形状配方的图案（如 ['PPP', ' S ', ' S ']）
  ingredients: Record<string, BlockType>;  // 图案符号到方块类型的映射
  result: {
    item: BlockType;
    count: number;
  };
  gridSize: 2 | 3;  // 所需合成格尺寸
}

// 示例：木镐配方
const WOODEN_PICKAXE_RECIPE: CraftingRecipe = {
  id: 'wooden_pickaxe',
  type: 'shaped',
  pattern: ['PPP', ' S ', ' S '],
  ingredients: {
    'P': BlockType.PLANKS,
    'S': BlockType.STICK,
  },
  result: { item: BlockType.WOODEN_PICKAXE, count: 1 },
  gridSize: 3,
};
```

### 6. SmeltingRecipe

```typescript
// furnace/SmeltingRecipe.ts
interface SmeltingRecipe {
  id: string;
  input: BlockType;
  output: BlockType;
  outputCount: number;
  smeltTime: number;  // 冶炼时间（秒）
}

// 示例
const IRON_SMELTING: SmeltingRecipe = {
  id: 'iron_ingot',
  input: BlockType.IRON_ORE,
  output: BlockType.IRON_INGOT,
  outputCount: 1,
  smeltTime: 10,
};
```

### 7. FuelItem

```typescript
// furnace/FuelRegistry.ts
interface FuelItem {
  item: BlockType;
  burnTime: number;  // 燃烧时间（秒）
}

const FUEL_ITEMS: FuelItem[] = [
  { item: BlockType.COAL, burnTime: 80 },
  { item: BlockType.CHARCOAL, burnTime: 80 },
  { item: BlockType.PLANKS, burnTime: 15 },
  { item: BlockType.LOG, burnTime: 15 },
  { item: BlockType.OAK_LOG, burnTime: 15 },
  { item: BlockType.BIRCH_LOG, burnTime: 15 },
  { item: BlockType.SPRUCE_LOG, burnTime: 15 },
];
```

### 8. FurnaceState

```typescript
// furnace/Furnace.ts
interface FurnaceState {
  position: { x: number; y: number; z: number };
  fuelSlot: ItemSlot;
  inputSlot: ItemSlot;
  outputSlot: ItemSlot;
  burnTimeRemaining: number;   // 当前燃料剩余燃烧时间
  burnTimeTotal: number;       // 当前燃料总燃烧时间（用于显示进度）
  smeltProgress: number;       // 冶炼进度（0-1）
  currentRecipe: SmeltingRecipe | null;
}
```

## 实体关系

```
┌─────────────────┐
│   BlockType     │◄────────────────────────────────────┐
│  (扩展枚举)      │                                      │
└────────┬────────┘                                      │
         │                                               │
         ▼                                               │
┌─────────────────┐     ┌─────────────────┐             │
│    ItemSlot     │     │ ToolProperties  │             │
│  (扩展接口)      │     │   (工具属性)     │◄────────────┤
└────────┬────────┘     └─────────────────┘             │
         │                                               │
         ▼                                               │
┌─────────────────┐     ┌─────────────────┐             │
│   Inventory     │     │ CraftingRecipe  │─────────────┤
│   (物品栏)       │     │   (合成配方)     │             │
└─────────────────┘     └─────────────────┘             │
                                                         │
┌─────────────────┐     ┌─────────────────┐             │
│  FurnaceState   │     │ SmeltingRecipe  │─────────────┤
│   (熔炉状态)     │     │   (冶炼配方)     │             │
└─────────────────┘     └─────────────────┘             │
                                                         │
┌─────────────────┐                                      │
│    FuelItem     │──────────────────────────────────────┘
│   (燃料定义)     │
└─────────────────┘
```

## 状态转换

### 工具生命周期

```
[创建] ──合成获得──► [满耐久] ──使用──► [损耗中] ──耐久度=0──► [销毁]
                         │                  │
                         └──────使用────────┘
```

### 熔炉状态机

```
[空闲] ──添加燃料+输入──► [燃烧中] ──冶炼完成──► [输出就绪]
   ▲                        │                      │
   │                        │燃料耗尽              │取走输出
   │                        ▼                      │
   └──────────────────── [暂停] ◄──────────────────┘
```

## 验证规则

1. **工具耐久度**: `0 <= durability <= maxDurability`
2. **物品堆叠**: 工具类物品 `count` 必须为 1
3. **合成格**: 2×2 配方可在 3×3 格中使用，反之不行
4. **熔炉槽位**: 每个槽位最多 64 个物品（工具除外）
5. **燃料验证**: 只有在 `FUEL_ITEMS` 中注册的物品可作为燃料
