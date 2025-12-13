# Data Model: 生态系统完善 - 动植物扩展

**Date**: 2025-12-12  
**Feature**: 009-ecosystem-flora-fauna

## 实体定义

### 1. AnimalType (枚举扩展)

现有类型 + 新增类型：

| 枚举值 | 名称 | 说明 |
|-------|------|------|
| COW = 0 | 牛 | 已存在 |
| SHEEP = 1 | 羊 | 已存在 |
| PIG = 2 | 猪 | 已存在 |
| CHICKEN = 3 | 鸡 | 已存在 |
| **RABBIT = 4** | 兔子 | **新增** |
| **WOLF = 5** | 狼 | **新增** |
| **FOX = 6** | 狐狸 | **新增** |

### 2. FishType (新增枚举)

| 枚举值 | 名称 | 说明 |
|-------|------|------|
| COMMON = 0 | 普通鱼 | 灰色/银色，常见 |
| TROPICAL = 1 | 热带鱼 | 彩色，较稀有 |

### 3. FlowerType (枚举扩展)

现有类型 + 新增类型：

| 枚举值 | 名称 | 说明 |
|-------|------|------|
| FLOWER_RED = 0 | 红花 | 已存在 |
| FLOWER_YELLOW = 1 | 黄花 | 已存在 |
| **ROSE = 2** | 玫瑰 | **新增**，深红色 |
| **TULIP = 3** | 郁金香 | **新增**，粉色 |
| **DAISY = 4** | 雏菊 | **新增**，白色 |
| **CORNFLOWER = 5** | 矢车菊 | **新增**，蓝色 |

### 4. TreeType (新增枚举)

| 枚举值 | 名称 | 树干高度 | 树叶形状 | 总高度 |
|-------|------|---------|---------|-------|
| OAK = 0 | 橡树 | 4-5 格 | 球形 3x3x3 | 5-7 格 |
| BIRCH = 1 | 桦树 | 5-6 格 | 柱形 3x3x2 | 6-7 格 |
| SPRUCE = 2 | 云杉 | 4-6 格 | 锥形多层 | 6-8 格 |

## 实体类结构

### Animal (扩展配置)

```typescript
interface AnimalConfig {
  type: AnimalType;
  bodySize: { width: number; height: number; depth: number };
  headSize: { width: number; height: number; depth: number };
  legCount: number;
  color: number;        // 主体颜色
  moveSpeed: number;    // 移动速度
  fleeSpeed: number;    // 逃跑速度
  fleeDistance: number; // 触发逃跑的距离
}
```

**新动物配置**:

| 动物 | 体型 (W×H×D) | 头部 | 腿数 | 颜色 | 移速 | 逃跑速度 | 逃跑距离 |
|-----|-------------|------|-----|------|-----|---------|---------|
| Rabbit | 0.4×0.3×0.5 | 0.3×0.25×0.25 | 4 | 棕色 | 3.0 | 6.0 | 5 |
| Wolf | 0.6×0.6×1.0 | 0.4×0.35×0.4 | 4 | 灰色 | 2.5 | 5.0 | 4 |
| Fox | 0.5×0.5×0.8 | 0.35×0.3×0.35 | 4 | 橙色 | 2.8 | 5.5 | 5 |

### Fish (新增类)

```typescript
interface FishConfig {
  type: FishType;
  bodySize: { width: number; height: number; depth: number };
  tailSize: { width: number; height: number };
  colors: number[];     // 颜色数组（热带鱼多色）
  swimSpeed: number;    // 游动速度
  turnRate: number;     // 转向速率
}

class Fish extends Entity {
  fishType: FishType;
  velocity: Vector3;
  targetDirection: Vector3;
  
  update(deltaTime: number): void;
  checkWaterBoundary(): boolean;
  turnAround(): void;
}
```

**鱼类配置**:

| 鱼类 | 体型 (W×H×D) | 尾部 | 颜色 | 游速 | 转向率 |
|-----|-------------|------|------|-----|-------|
| CommonFish | 0.3×0.15×0.5 | 0.15×0.2 | 银色 | 1.5 | 2.0 |
| TropicalFish | 0.25×0.2×0.4 | 0.12×0.25 | 多色 | 2.0 | 2.5 |

### Tree (结构定义)

```typescript
interface TreeStructure {
  type: TreeType;
  trunkHeight: number;      // 树干高度
  trunkBlock: BlockType;    // 树干方块类型
  leavesBlock: BlockType;   // 树叶方块类型
  leavesPattern: Vector3[]; // 树叶相对位置
}
```

**树木结构**:

| 树木 | 树干方块 | 树叶方块 | 树叶模式 |
|-----|---------|---------|---------|
| Oak | OAK_LOG | OAK_LEAVES | 球形 (约 27 个方块) |
| Birch | BIRCH_LOG | BIRCH_LEAVES | 柱形 (约 18 个方块) |
| Spruce | SPRUCE_LOG | SPRUCE_LEAVES | 锥形 (约 24 个方块) |

## 生成配置

### 生物群系动物权重

```typescript
const BIOME_SPAWN_WEIGHTS: Record<BiomeType, Record<AnimalType, number>> = {
  [BiomeType.PLAINS]: {
    [AnimalType.COW]: 3,
    [AnimalType.SHEEP]: 3,
    [AnimalType.PIG]: 2,
    [AnimalType.CHICKEN]: 2,
    [AnimalType.RABBIT]: 3,
    [AnimalType.WOLF]: 0,
    [AnimalType.FOX]: 1,
  },
  [BiomeType.LAKE]: {
    [AnimalType.COW]: 0,
    [AnimalType.SHEEP]: 0,
    [AnimalType.PIG]: 1,
    [AnimalType.CHICKEN]: 2,
    [AnimalType.RABBIT]: 1,
    [AnimalType.WOLF]: 0,
    [AnimalType.FOX]: 0,
  },
  [BiomeType.MOUNTAIN]: {
    [AnimalType.COW]: 1,
    [AnimalType.SHEEP]: 3,
    [AnimalType.PIG]: 0,
    [AnimalType.CHICKEN]: 1,
    [AnimalType.RABBIT]: 1,
    [AnimalType.WOLF]: 2,
    [AnimalType.FOX]: 2,
  },
};
```

### 生物群系鱼类权重

```typescript
const FISH_SPAWN_WEIGHTS: Record<BiomeType, Record<FishType, number>> = {
  [BiomeType.PLAINS]: {
    [FishType.COMMON]: 0,
    [FishType.TROPICAL]: 0,
  },
  [BiomeType.LAKE]: {
    [FishType.COMMON]: 5,
    [FishType.TROPICAL]: 2,
  },
  [BiomeType.MOUNTAIN]: {
    [FishType.COMMON]: 2,
    [FishType.TROPICAL]: 0,
  },
};
```

### 生物群系植物配置

```typescript
const BIOME_PLANTS: Record<BiomeType, PlantSpawnConfig[]> = {
  [BiomeType.PLAINS]: [
    { type: PlantType.TALL_GRASS, weight: 10 },
    { type: PlantType.FLOWER_RED, weight: 2 },
    { type: PlantType.FLOWER_YELLOW, weight: 2 },
    { type: PlantType.ROSE, weight: 2 },
    { type: PlantType.TULIP, weight: 2 },
    { type: PlantType.DAISY, weight: 2 },
    { type: PlantType.CORNFLOWER, weight: 1 },
  ],
  [BiomeType.LAKE]: [
    { type: PlantType.TALL_GRASS, weight: 3 },
  ],
  [BiomeType.MOUNTAIN]: [
    { type: PlantType.TALL_GRASS, weight: 4 },
    { type: PlantType.DEAD_BUSH, weight: 2 },
    { type: PlantType.CORNFLOWER, weight: 1 },
  ],
};
```

### 生物群系树木配置

```typescript
const BIOME_TREES: Record<BiomeType, TreeSpawnConfig[]> = {
  [BiomeType.PLAINS]: [
    { type: TreeType.OAK, weight: 5 },
    { type: TreeType.BIRCH, weight: 2 },
  ],
  [BiomeType.LAKE]: [
    { type: TreeType.OAK, weight: 1 },
  ],
  [BiomeType.MOUNTAIN]: [
    { type: TreeType.SPRUCE, weight: 5 },
    { type: TreeType.OAK, weight: 1 },
  ],
};
```

## 密度控制参数

| 参数 | 值 | 说明 |
|-----|-----|------|
| MAX_ANIMALS_PER_CHUNK | 6 | 每区块最大动物数 |
| MAX_FISH_PER_WATER_BODY | 8 | 每个水域最大鱼类数 |
| MIN_TREE_SPACING | 8 | 树木最小间距（格） |
| SPAWN_PROTECTION_RADIUS | 50 | 出生点保护半径（格） |
| TREE_SPAWN_CHANCE | 0.02 | 树木生成概率（每格） |
| FLOWER_SPAWN_CHANCE | 0.05 | 花卉生成概率（每格） |

## 状态转换

### Animal AI 状态（复用现有）

```
IDLE ──(随机)──> WANDERING
  │                  │
  │                  │
  └──(玩家靠近)──> FLEEING
                     │
                     └──(玩家远离)──> IDLE
```

### Fish 移动状态（新增）

```
SWIMMING ──(遇到边界)──> TURNING
    │                       │
    └───────(完成转向)──────┘
```
