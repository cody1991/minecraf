# Research: 罗马斗兽场视觉增强

**Feature**: 010-colosseum-enhancement  
**Date**: 2025-12-13

## 1. 现有方块类型分析

### Decision
使用现有方块类型实现材质多样化，无需添加新方块类型。

### Rationale
现有 `BlockType` 枚举已包含足够的石材变体：
- `STONE` (0x808080) - 主墙面、填充墙
- `COBBLESTONE` (0x6b6b6b) - 壁柱、承重结构（深色）
- `BRICK` (0x9c4a3a) - 檐口、装饰带（特殊材质）
- `SAND` (0xf4e4a6) - 竞技场地面
- `DIRT` (0x8b5a2b) - 地面图案深色区域
- `TALL_GRASS` - 废墟植被
- `LEAVES` - 废墟藤蔓效果

这些方块类型的颜色差异足以形成视觉层次，无需新增类型。

### Alternatives Considered
1. **添加新方块类型（如 MARBLE, TRAVERTINE）**: 需要更新纹理图集、Block.ts、渲染器，工作量大且偏离功能核心。
2. **使用颜色变体系统**: 需要重构方块渲染管线，复杂度过高。

---

## 2. 壁柱与檐口生成策略

### Decision
在现有 `getBlockAt` 方法中扩展外墙生成逻辑，通过距离和角度计算确定壁柱和檐口位置。

### Rationale
现有代码已有 `getArchPosition()` 方法计算拱门位置和 `isPillar` 标记。可以复用此逻辑：
- 壁柱：在 `isPillar` 为 true 的位置，向外凸出 1 个方块
- 檐口：在 `levelY === 0` 或 `levelY === levelHeight - 1` 的位置，向外凸出 1 个方块
- 柱头/柱础：在壁柱顶部和底部使用 `BRICK` 替代 `COBBLESTONE`

### Implementation Approach
```typescript
// 伪代码示意
if (isPillar && depthFromOuter <= 2) {
  // 壁柱凸出
  if (levelY === 0 || levelY === levelHeight - 2) {
    return BlockType.BRICK  // 柱头/柱础
  }
  return BlockType.COBBLESTONE  // 柱身
}
if (isCornice && depthFromOuter <= 1) {
  return BlockType.BRICK  // 檐口
}
```

### Alternatives Considered
1. **预计算壁柱位置数组**: 增加内存占用，对于程序化生成不必要。
2. **使用独立的壁柱生成器类**: 过度设计，壁柱逻辑简单，内联即可。

---

## 3. 拱门装饰生成策略

### Decision
扩展现有拱门生成逻辑，在拱门顶部添加拱券石效果，两侧添加半圆柱装饰。

### Rationale
现有 `isInArchOpening()` 方法已计算拱门开口区域。可以在拱门边缘添加装饰：
- 拱券石：在拱门顶部曲线外侧 1 个方块位置使用 `BRICK`
- 半圆柱：在拱门两侧 `posInUnit` 边界位置使用 `COBBLESTONE`

### Implementation Approach
在 `isInArchOpening()` 返回 true 的边界区域，检测是否为装饰位置：
- 如果 `levelY` 接近拱门顶部且在拱形曲线外侧 → 拱券石
- 如果 `posInUnit` 接近边界且在开口内侧 → 半圆柱

---

## 4. 竞技场地面图案生成策略

### Decision
在竞技场地面区域使用 `SAND` 和 `DIRT` 交替生成中心圆形标记和放射状分区线。

### Rationale
- 中心圆形：距离中心 3-5 方块范围使用 `DIRT`
- 放射状分区线：每 45° 一条线，宽度 1 方块，使用 `DIRT`
- 其余区域：使用 `SAND`

### Implementation Approach
```typescript
if (isInArena(relX, relZ) && relY === 0) {
  const dist = Math.sqrt(relX * relX + relZ * relZ)
  const angle = Math.atan2(relZ, relX)
  
  // 中心圆形标记
  if (dist >= 3 && dist <= 5) return BlockType.DIRT
  
  // 放射状分区线 (每 45°)
  const normalizedAngle = ((angle % (Math.PI / 4)) + Math.PI / 4) % (Math.PI / 4)
  if (normalizedAngle < 0.1 || normalizedAngle > Math.PI / 4 - 0.1) {
    return BlockType.DIRT
  }
  
  return BlockType.SAND
}
```

---

## 5. 废墟效果增强策略

### Decision
扩展现有 `isInRuins()` 方法，添加不规则边缘、散落碎石和植被生成。

### Rationale
现有代码已有废墟区域判断和 jagged edge 效果。可以增强：
- 不规则边缘：增加噪声幅度，使用更复杂的噪声函数
- 散落碎石：在废墟区域地面随机放置 `COBBLESTONE` 方块
- 植被：在废墟区域 15-25% 的位置放置 `TALL_GRASS` 或 `LEAVES`

### Implementation Approach
```typescript
// 废墟区域地面
if (isInRuinsZone && relY === tierHeight) {
  const random = seededRandom(relX, relZ)
  if (random < 0.1) return BlockType.COBBLESTONE  // 散落碎石
  if (random < 0.25) return BlockType.TALL_GRASS  // 植被
}
```

---

## 6. 观众席层次效果策略

### Decision
每隔 3 排使用不同材质（`STONE` 和 `COBBLESTONE` 交替）区分观众席层次。

### Rationale
现有 `getTierIndex()` 返回座位层索引。可以根据索引模 3 选择材质：
- 索引 % 3 == 0: `STONE`
- 索引 % 3 == 1: `COBBLESTONE`
- 索引 % 3 == 2: `BRICK`

### Implementation Approach
```typescript
const tierIndex = this.getTierIndex(relX, relZ)
if (tierIndex >= 0) {
  const materialIndex = tierIndex % 3
  const materials = [BlockType.STONE, BlockType.COBBLESTONE, BlockType.BRICK]
  return materials[materialIndex]
}
```

---

## 7. 拱形天花板生成策略

### Decision
在外围走廊区域生成拱形天花板，使用半圆形曲线计算天花板高度。

### Rationale
现有走廊区域在 `depthFromOuter > 2 && depthFromOuter < wallDepth - 1` 范围。天花板目前是平的 (`levelY === levelHeight - 1`)。可以改为拱形：
- 计算走廊中心位置
- 根据距离中心的偏移计算拱形高度
- 在拱形曲线以上的位置返回 `STONE`

### Implementation Approach
```typescript
// 走廊天花板
if (inCorridor) {
  const corridorCenter = (2 + wallDepth - 1) / 2
  const distFromCenter = Math.abs(depthFromOuter - corridorCenter)
  const archHeight = Math.sqrt(Math.max(0, 4 - distFromCenter * distFromCenter))
  if (levelY >= levelHeight - 1 - archHeight) {
    return BlockType.STONE
  }
}
```

---

## 8. 性能影响评估

### Decision
预期性能影响可控，无需特殊优化措施。

### Rationale
- 所有新增逻辑都是简单的数学计算（距离、角度、模运算）
- 无新增方块类型，不增加纹理图集大小
- 生成逻辑仅在区块加载时执行一次，不影响运行时帧率
- 斗兽场区域方块数量增加约 10-15%（装饰元素），在可接受范围内

### Monitoring
- 在开发过程中使用 FPS 计数器监控帧率
- 如发现性能问题，优先简化废墟区域的噪声计算
