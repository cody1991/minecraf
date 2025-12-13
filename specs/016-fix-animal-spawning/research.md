# Research: 修复动物浮空问题

**Feature**: 016-fix-animal-spawning  
**Date**: 2025-12-13

## 问题根因分析

### 当前实现缺陷

**代码位置**: `src/entities/AnimalSpawner.ts` - `findSpawnPosition()` 方法

```typescript
// 当前实现 (有问题)
const surfaceY = this.world.getHeightAt(worldX, worldZ)
return new THREE.Vector3(worldX + 0.5, surfaceY + 1, worldZ + 0.5)
```

**问题**: `getHeightAt()` 返回的是基于噪声函数计算的**理论高度**，而非实际方块数据。

### 理论高度 vs 实际地面

| 场景 | 理论高度 | 实际地面 | 结果 |
|------|----------|----------|------|
| 平坦地形 | Y=64 | Y=64 | ✅ 正确 |
| 洞穴入口 | Y=64 | Y=50 (洞穴底部) | ❌ 悬浮 14 格 |
| 树木位置 | Y=64 | Y=64 (树下地面) | ⚠️ 可能卡在树干内 |
| 水面 | Y=64 | 水方块 | ❌ 生成在水中 |

## 解决方案研究

### 方案 1: 向下扫描 (Raycast Down)

**Decision**: ✅ 采用此方案

**Rationale**: 
- 直接使用已有的 `world.getBlock()` API
- 可精确找到实际固体地面
- 可过滤树木方块（LOG/LEAVES）
- 可检测水方块

**实现思路**:
```typescript
// 从理论高度开始向下扫描
for (let y = terrainY; y >= terrainY - MAX_SCAN_DEPTH; y--) {
  const block = world.getBlock(x, y, z)
  if (isValidGround(block)) {
    return y  // 找到实际地面
  }
}
```

**Alternatives considered**:
- 向上扫描：从 Y=0 开始向上找，性能差（需扫描更多方块）
- 二分查找：逻辑复杂，对洞穴场景不适用

### 方案 2: 扫描深度限制

**Decision**: 最大扫描深度 = 20 格

**Rationale**:
- 大多数洞穴深度在 20 格以内
- 超过 20 格的深洞不适合生成动物（太暗）
- 限制扫描次数保证性能

**Alternatives considered**:
- 无限制扫描：可能导致性能问题
- 10 格限制：可能遗漏较深洞穴

### 方案 3: 有效地面判定

**Decision**: 固体方块 AND 非树木方块

**Rationale**:
- 使用现有 `isSolid()` 函数判断固体
- 使用现有 `isTreeLog()` 和 `isTreeLeaves()` 排除树木
- 动物应该站在土地/石头上，而非树叶/树干

**有效地面方块**:
- GRASS, DIRT, STONE, SAND, SNOW, COBBLESTONE 等
- 排除: LOG, LEAVES, OAK_LOG, BIRCH_LOG, SPRUCE_LOG, OAK_LEAVES 等

### 方案 4: 水检测策略

**Decision**: 扫描过程中遇到水即放弃该位置

**Rationale**:
- 陆地动物不应生成在水中
- 水面下的地面也不适合生成
- 提前终止扫描可节省性能

### 方案 5: 空间检查

**Decision**: 检查地面上方 2 格空间

**Rationale**:
- 动物需要足够高度站立
- 脚部位置 (groundY + 1) 必须非固体
- 头部位置 (groundY + 2) 必须非固体
- 允许非固体植物（草丛、花朵）

## 现有 API 可用性

| API | 位置 | 用途 |
|-----|------|------|
| `world.getBlock(x, y, z)` | World.ts | 获取指定坐标方块类型 |
| `world.getHeightAt(x, z)` | World.ts | 获取理论地形高度（起始扫描点） |
| `isSolid(block)` | Block.ts | 判断方块是否固体 |
| `isTreeLog(block)` | Block.ts | 判断是否树干 |
| `isTreeLeaves(block)` | Block.ts | 判断是否树叶 |
| `BlockType.WATER` | Block.ts | 水方块类型常量 |

## 性能考量

| 操作 | 复杂度 | 说明 |
|------|--------|------|
| 每次生成尝试 | O(20) | 最多扫描 20 格 |
| 每只动物 | O(100) | 5 次位置尝试 × 20 格扫描 |
| 每区块 | O(600) | 最多 6 只动物 × 100 |

**结论**: 性能影响可忽略，每区块最多 600 次 `getBlock()` 调用，远低于区块渲染开销。

## 可选增强

### 斜坡检测

**Decision**: 可选实现，优先级低

**Rationale**:
- 陡峭斜坡上生成动物视觉不自然
- 可检查相邻 4 格高度差
- 阈值建议: 高度差 > 3 格视为陡坡

## 总结

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 地面检测方法 | 向下扫描 | 直接使用现有 API，可精确找到实际地面 |
| 扫描深度 | 20 格 | 覆盖大多数洞穴，性能可接受 |
| 有效地面 | 固体 & 非树木 | 使用现有辅助函数 |
| 水处理 | 遇水放弃 | 陆地动物不应在水中 |
| 空间检查 | 2 格高度 | 确保动物有站立空间 |
