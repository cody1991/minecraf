# Data Model: 罗马斗兽场出生地图

**Feature**: 004-colosseum-spawn-map  
**Date**: 2025-12-12

## Entities

### ColosseumConfig

斗兽场配置参数，控制生成的尺寸和结构。

```typescript
interface ColosseumConfig {
  // 椭圆尺寸
  arenaRadiusX: number      // 竞技场长轴半径 (默认: 25)
  arenaRadiusZ: number      // 竞技场短轴半径 (默认: 20)
  
  // 看台配置
  tierCount: number         // 看台层数 (默认: 3)
  tierWidth: number         // 每层宽度 (默认: 5)
  tierHeight: number        // 每层高度递增 (默认: 1)
  
  // 外墙配置
  wallHeight: number        // 外墙高度 (默认: 12)
  wallThickness: number     // 外墙厚度 (默认: 2)
  
  // 拱门配置
  archCount: number         // 拱门数量 (默认: 24)
  archWidth: number         // 拱门宽度 (默认: 3)
  archHeight: number        // 拱门高度 (默认: 4)
  
  // 位置
  centerX: number           // 中心X坐标 (默认: 0)
  centerZ: number           // 中心Z坐标 (默认: 0)
  baseHeight: number        // 基础高度 (默认: 从地形获取)
}
```

### ColosseumGenerator

斗兽场生成器，负责计算每个世界坐标的方块类型。

```typescript
class ColosseumGenerator {
  config: ColosseumConfig
  
  // 核心方法
  isInColosseumBounds(worldX: number, worldZ: number): boolean
  getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null
  
  // 结构检测
  isInArena(x: number, z: number): boolean
  isInTier(x: number, z: number, tierIndex: number): boolean
  isInWall(x: number, z: number): boolean
  isInArch(x: number, z: number, y: number): boolean
  isInCorridor(x: number, z: number): boolean
}
```

## Relationships

```
World
  └── TerrainGenerator
        └── ColosseumGenerator (composition)
              └── ColosseumConfig (configuration)
```

## State Transitions

斗兽场是静态结构，无状态转换。方块在生成后不会自动改变（玩家可手动修改）。

## Validation Rules

| 规则 | 约束 |
|------|------|
| arenaRadiusX | > 10, < 100 |
| arenaRadiusZ | > 10, < 100 |
| tierCount | >= 1, <= 5 |
| wallHeight | >= 6, <= 20 |
| archCount | >= 8, <= 48 |
| archWidth | >= 2, <= 5 |
| archHeight | >= 3, <= 8 |

## Default Configuration

```typescript
const DEFAULT_COLOSSEUM_CONFIG: ColosseumConfig = {
  // 椭圆尺寸 (约 80x60 方块)
  arenaRadiusX: 25,
  arenaRadiusZ: 20,
  
  // 看台配置
  tierCount: 3,
  tierWidth: 5,
  tierHeight: 1,
  
  // 外墙配置
  wallHeight: 12,
  wallThickness: 2,
  
  // 拱门配置
  archCount: 24,
  archWidth: 3,
  archHeight: 4,
  
  // 位置 (世界原点)
  centerX: 0,
  centerZ: 0,
  baseHeight: 64  // 将从地形高度动态获取
}
```

## Computed Properties

| 属性 | 计算方式 |
|------|----------|
| 总外半径 | arenaRadiusX + tierCount * tierWidth + wallThickness |
| 看台起始半径 | arenaRadiusX |
| 看台结束半径 | arenaRadiusX + tierCount * tierWidth |
| 拱门角度间隔 | 2π / archCount |
| 边界框 X 范围 | [centerX - totalRadius, centerX + totalRadius] |
| 边界框 Z 范围 | [centerZ - totalRadius, centerZ + totalRadius] |
