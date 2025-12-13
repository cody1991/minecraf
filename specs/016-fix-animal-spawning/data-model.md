# Data Model: 修复动物浮空问题

**Feature**: 016-fix-animal-spawning  
**Date**: 2025-12-13

## 概述

本功能不引入新的数据实体，仅修改 `AnimalSpawner` 类的内部逻辑。以下记录相关的数据结构和状态。

## 现有实体 (无修改)

### SpawnConfig

```typescript
interface SpawnConfig {
  maxPerChunk: number   // 每区块最大动物数 (默认: 6)
  spawnChance: number   // 生成概率 (默认: 0.25)
  minY: number          // 最小 Y 坐标 (默认: 1)
}
```

### SpawnPosition (概念实体)

生成位置的计算结果，非持久化。

| 字段 | 类型 | 说明 |
|------|------|------|
| x | number | 世界 X 坐标 (方块中心 +0.5) |
| y | number | 地面方块顶部 Y 坐标 +1 |
| z | number | 世界 Z 坐标 (方块中心 +0.5) |

## 新增常量

### 扫描配置

| 常量 | 值 | 说明 |
|------|-----|------|
| `MAX_SCAN_DEPTH` | 20 | 向下扫描最大深度 (格) |
| `SLOPE_THRESHOLD` | 3 | 斜坡检测阈值 (可选) |

## 方块分类逻辑

### 有效地面方块

```typescript
function isValidGround(block: BlockType): boolean {
  return isSolid(block) && !isTreeLog(block) && !isTreeLeaves(block)
}
```

**包含**: GRASS, DIRT, STONE, SAND, SNOW, COBBLESTONE, BRICK, PLANKS, etc.  
**排除**: LOG, LEAVES, OAK_LOG, BIRCH_LOG, SPRUCE_LOG, OAK_LEAVES, etc.

### 可通过空间

```typescript
function isPassable(block: BlockType): boolean {
  return !isSolid(block) && block !== BlockType.WATER
}
```

**包含**: AIR, TALL_GRASS, FLOWER_RED, FLOWER_YELLOW, etc.  
**排除**: 所有固体方块, WATER

## 状态转换

### 生成位置查找流程

```
开始
  │
  ▼
获取理论高度 (getHeightAt)
  │
  ▼
向下扫描 (最多 20 格)
  │
  ├─ 遇到 WATER → 放弃此位置
  │
  ├─ 遇到有效地面 → 记录 groundY
  │
  └─ 扫描完毕无地面 → 放弃此位置
  │
  ▼
检查空间 (groundY+1, groundY+2)
  │
  ├─ 有固体/水方块 → 放弃此位置
  │
  └─ 空间可用 → 返回位置
```

## 依赖关系

```
AnimalSpawner
    │
    ├── World.getBlock()      # 获取方块类型
    ├── World.getHeightAt()   # 获取理论高度
    │
    └── Block.ts
        ├── isSolid()         # 判断固体
        ├── isTreeLog()       # 判断树干
        └── isTreeLeaves()    # 判断树叶
```

## 验证规则

| 规则 | 验证方法 |
|------|----------|
| 地面必须是固体 | `isSolid(groundBlock) === true` |
| 地面不能是树木 | `!isTreeLog(groundBlock) && !isTreeLeaves(groundBlock)` |
| 脚部空间可通过 | `!isSolid(feetBlock) && feetBlock !== WATER` |
| 头部空间可通过 | `!isSolid(headBlock) && headBlock !== WATER` |
