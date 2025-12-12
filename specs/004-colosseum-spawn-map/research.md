# Research: 罗马斗兽场出生地图

**Feature**: 004-colosseum-spawn-map  
**Date**: 2025-12-12

## 1. 椭圆形建筑生成算法

### Decision
使用参数化椭圆方程生成斗兽场基础形状，通过离散化采样确定方块位置。

### Rationale
- 椭圆方程 `(x/a)² + (z/b)² = 1` 可精确控制长短轴比例
- 离散化采样适合方块世界的网格系统
- 可通过调整参数轻松控制斗兽场尺寸

### Alternatives Considered
- **预制建筑数据**: 需要大量存储空间，不够灵活
- **程序化噪声**: 无法生成规则的椭圆形状
- **贝塞尔曲线**: 过于复杂，椭圆方程足够

### Implementation Notes
```typescript
// 椭圆边界检测
function isInsideEllipse(x: number, z: number, a: number, b: number): boolean {
  return (x * x) / (a * a) + (z * z) / (b * b) <= 1
}

// 椭圆环带检测（用于墙壁）
function isInEllipseRing(x: number, z: number, innerA: number, innerB: number, outerA: number, outerB: number): boolean {
  return isInsideEllipse(x, z, outerA, outerB) && !isInsideEllipse(x, z, innerA, innerB)
}
```

## 2. 阶梯式看台生成

### Decision
使用同心椭圆环带，每层向外扩展并抬高一格，形成阶梯效果。

### Rationale
- 同心椭圆自然形成环绕式看台
- 每层高度递增模拟真实斗兽场的阶梯结构
- 简单的高度映射逻辑，易于实现和调试

### Alternatives Considered
- **固定高度平台**: 缺乏层次感
- **复杂曲面**: 实现难度高，方块世界效果不佳

### Implementation Notes
```typescript
// 3层看台配置
const TIER_CONFIG = [
  { innerRadius: 25, outerRadius: 30, height: 1 },  // 第1层
  { innerRadius: 30, outerRadius: 35, height: 2 },  // 第2层
  { innerRadius: 35, outerRadius: 40, height: 3 },  // 第3层
]
```

## 3. 拱门结构生成

### Decision
在外围墙壁上按固定角度间隔生成拱门开口，使用半圆形镂空算法。

### Rationale
- 角度间隔确保拱门均匀分布
- 半圆形镂空符合罗马建筑风格
- 拱门提供进出通道，增强可探索性

### Alternatives Considered
- **矩形门洞**: 不符合罗马风格
- **随机分布**: 视觉效果不佳

### Implementation Notes
```typescript
// 拱门参数
const ARCH_COUNT = 24        // 拱门数量
const ARCH_WIDTH = 3         // 拱门宽度（方块）
const ARCH_HEIGHT = 4        // 拱门高度（方块）
const ARCH_ANGLE_STEP = (2 * Math.PI) / ARCH_COUNT  // 角度间隔
```

## 4. 与现有地形系统集成

### Decision
在 TerrainGenerator 中添加斗兽场检测，斗兽场区域内优先使用 ColosseumGenerator 的方块数据。

### Rationale
- 保持现有地形生成逻辑不变
- 斗兽场作为覆盖层，优先级高于自然地形
- 斗兽场外围自然过渡到普通地形

### Alternatives Considered
- **独立区块类型**: 需要修改区块管理系统，改动过大
- **后处理修改**: 性能开销大，需要二次遍历

### Implementation Notes
```typescript
// 在 TerrainGenerator.getBlockTypeAt 中添加
if (this.colosseumGenerator.isInColosseumBounds(worldX, worldZ)) {
  const colosseumBlock = this.colosseumGenerator.getBlockAt(worldX, worldY, worldZ)
  if (colosseumBlock !== null) {
    return colosseumBlock
  }
}
// 否则继续正常地形生成
```

## 5. 方块材质选择

### Decision
使用现有方块类型：STONE（石材墙壁/结构）、SAND（竞技场地面）、DIRT（看台座位区）。

### Rationale
- 复用现有材质系统，无需新增资源
- STONE 符合古罗马石质建筑风格
- SAND 模拟竞技场沙地

### Alternatives Considered
- **新增专用方块类型**: 需要修改纹理图集，增加复杂度
- **仅使用 STONE**: 缺乏视觉层次

### Block Usage
| 结构部分 | 方块类型 | 说明 |
|----------|----------|------|
| 竞技场地面 | SAND | 沙地材质 |
| 墙壁/柱子 | STONE | 石质结构 |
| 看台座位 | STONE | 石质阶梯 |
| 走廊地面 | STONE | 石质地面 |

## 6. 出生点设置

### Decision
将出生点设置为斗兽场中心 (0, groundHeight + 1.8, 0)，与现有 World.getSpawnPosition() 兼容。

### Rationale
- 原点 (0, 0) 是世界中心，自然作为斗兽场中心
- 现有 getSpawnPosition() 已返回原点上方位置
- 无需修改玩家出生逻辑

### Implementation Notes
斗兽场生成以原点为中心，确保玩家出生时位于竞技场中心。

## 7. 性能考虑

### Decision
斗兽场生成在区块加载时一次性计算，结果缓存在区块数据中。

### Rationale
- 避免每帧重复计算
- 区块系统已有缓存机制
- 斗兽场跨越约 5x5 个水平区块，生成开销可接受

### Performance Estimates
- 斗兽场覆盖区块数: ~25 个水平区块 × 3 个垂直区块 = ~75 区块
- 每区块 4096 方块，总计 ~307,200 方块
- 预计生成时间: < 100ms（单次区块生成 < 5ms）
