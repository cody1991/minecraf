# Data Model: 罗马斗兽场视觉增强

**Feature**: 010-colosseum-enhancement  
**Date**: 2025-12-13

## 概述

本功能不引入新的数据实体，而是扩展现有 `ColosseumGenerator` 的生成逻辑。以下记录需要理解和修改的现有数据结构。

## 现有实体

### ColosseumConfig

**位置**: `src/terrain/ColosseumGenerator.ts`

| 字段 | 类型 | 说明 | 本功能是否修改 |
|------|------|------|----------------|
| outerRadiusX | number | 外椭圆半长轴 | 否 |
| outerRadiusZ | number | 外椭圆半短轴 | 否 |
| wallThickness | number | 外墙厚度 | 否 |
| levelCount | number | 层数 (默认 4) | 否 |
| levelHeight | number | 每层高度 (默认 5) | 否 |
| archCount | number | 拱门数量 | 否 |
| arenaRadiusX | number | 竞技场半长轴 | 否 |
| arenaRadiusZ | number | 竞技场半短轴 | 否 |
| tierCount | number | 观众席层数 | 否 |
| centerX | number | 中心 X 坐标 | 否 |
| centerZ | number | 中心 Z 坐标 | 否 |
| baseHeight | number | 基础高度 | 否 |
| enableRuins | boolean | 是否启用废墟效果 | 否 |
| ruinsAngleStart | number | 废墟起始角度 | 否 |
| ruinsAngleEnd | number | 废墟结束角度 | 否 |

**说明**: 配置结构保持不变，所有增强通过生成逻辑实现。

### BlockType (使用的方块类型)

**位置**: `src/core/Block.ts`

| 方块类型 | 用途 |
|----------|------|
| STONE | 主墙面、填充墙、走廊地面 |
| COBBLESTONE | 壁柱柱身、废墟碎石 |
| BRICK | 柱头、柱础、檐口、拱券石 |
| SAND | 竞技场地面主体 |
| DIRT | 竞技场地面图案（深色） |
| TALL_GRASS | 废墟区域植被 |
| LEAVES | 废墟区域藤蔓 |

## 新增内部状态

### 装饰元素判断逻辑

以下为 `getBlockAt()` 方法内部的逻辑扩展，非持久化数据：

```typescript
// 壁柱判断
interface PilasterCheck {
  isPilaster: boolean      // 是否在壁柱位置
  isCapital: boolean       // 是否为柱头
  isBase: boolean          // 是否为柱础
}

// 檐口判断
interface CorniceCheck {
  isCornice: boolean       // 是否在檐口位置
  protrudeDepth: number    // 凸出深度 (0-1 方块)
}

// 竞技场地面图案
interface ArenaPattern {
  isCenterRing: boolean    // 是否在中心圆环
  isRadialLine: boolean    // 是否在放射线上
}

// 废墟增强
interface RuinsEnhancement {
  isRubble: boolean        // 是否为散落碎石
  isVegetation: boolean    // 是否为植被
  edgeIrregularity: number // 边缘不规则度 (0-1)
}
```

## 方块分配规则

### 外墙区域

| 位置条件 | 方块类型 |
|----------|----------|
| 壁柱柱头 (levelY == levelHeight-2) | BRICK |
| 壁柱柱础 (levelY == 1) | BRICK |
| 壁柱柱身 | COBBLESTONE |
| 檐口 (levelY == 0 或 levelHeight-1, 凸出) | BRICK |
| 拱券石 (拱门顶部外侧) | BRICK |
| 主墙面 | STONE |

### 内部区域

| 位置条件 | 方块类型 |
|----------|----------|
| 走廊地面 | STONE |
| 走廊拱形天花板 | STONE |
| 观众席 (tierIndex % 3 == 0) | STONE |
| 观众席 (tierIndex % 3 == 1) | COBBLESTONE |
| 观众席 (tierIndex % 3 == 2) | BRICK |

### 竞技场地面

| 位置条件 | 方块类型 |
|----------|----------|
| 中心圆环 (距离 3-5 方块) | DIRT |
| 放射线 (每 45°) | DIRT |
| 其他区域 | SAND |

### 废墟区域

| 位置条件 | 方块类型 |
|----------|----------|
| 散落碎石 (10% 概率) | COBBLESTONE |
| 植被 (15% 概率) | TALL_GRASS 或 LEAVES |
| 不规则边缘 | 根据噪声返回 AIR 或原方块 |

## 状态转换

本功能无状态转换，所有方块在区块加载时一次性生成。
