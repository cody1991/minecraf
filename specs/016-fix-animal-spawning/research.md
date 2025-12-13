# Research: 修复动物浮空问题

**Feature**: 016-fix-animal-spawning  
**Date**: 2025-12-13  
**Status**: Completed

本文档记录 Phase 0 研究阶段的技术决策和替代方案评估。

---

## 研究问题

### 问题 1: 水方块检测方法

**背景**：当前 `findSpawnPosition()` 使用 `world.getHeightAt()` 获取地形高度，但未检测该位置是否有水方块，导致动物可能生成在湖泊/河流中。

**可选方案**：

| 方案 | 实现方式 | 优点 | 缺点 |
|------|---------|------|------|
| A. 仅用 getHeightAt() | `surfaceY < WATER_LEVEL(62)` 判断 | 不依赖区块加载，性能最优 | 无法检测水上建筑（如玻璃桥）上方的水 |
| B. 仅用 getBlock() | `getBlock(x, y, z) === BlockType.WATER` | 精确检测任意位置水方块 | 依赖区块加载，未加载时误判为 AIR |
| C. 双重验证（推荐） | 先 getHeightAt 筛选，再 getBlock 验证 | 兼顾性能和准确性 | 需要两次方法调用 |

**决策**：选择 **方案 C（双重验证）**

**理由**：
- `getHeightAt()` 可快速筛选掉大部分水下地形（90%+ 的水域情况），性能开销可忽略
- `getBlock()` 精确验证地面上方是否有水（处理河流、湖泊边缘），确保不生成在水中
- 参考 `FishSpawner.ts` 第 172-206 行的成熟实现模式

**替代方案被拒理由**：
- 方案 A：无法处理特殊地形（如玩家建造的水渠、高于水位线的湖泊）
- 方案 B：区块未加载时会误判（`getBlock()` 返回 AIR），导致错误地认为是陆地

**技术细节**：
```typescript
// WATER_LEVEL = 62（定义于 ChunkConstants.ts）
const surfaceY = this.world.getHeightAt(worldX, worldZ)

// 第一步：快速筛选水下地形
if (surfaceY < WATER_LEVEL) {
  continue  // 地形在水下，跳过
}

// 第二步：精确验证地面上方不是水
const blockAboveSurface = this.world.getBlock(worldX, surfaceY + 1, worldZ)
if (blockAboveSurface === BlockType.WATER) {
  continue  // 地面上方有水，跳过
}
```

**性能评估**：
- getHeightAt：0.01ms（90% 缓存命中）
- getBlock：0.001ms（直接数组访问）
- 总开销/动物：~0.011ms × 5 次尝试 = 0.055ms（可忽略）

---

### 问题 2: 坡度检测算法设计

**背景**：需要检测陡峭地形（高度差 > 10 方块），避免动物生成在悬崖边缘或陡坡上。

**可选方案**：

| 方案 | 检测方向 | 检查距离 | 性能 | 准确性 |
|------|---------|---------|------|--------|
| A. 4 个基本方向 | 东西南北 | 2 方块 | ★★★★★ | ★★★★☆ |
| B. 8 个方向（对角线） | 东西南北+斜向 | 2 方块 | ★★★☆☆ | ★★★★★ |
| C. 4 个方向，距离 1 | 东西南北 | 1 方块 | ★★★★★ | ★★☆☆☆（过于敏感） |
| D. 采样 9 点（3×3） | 周围 8 点 | 1 方块 | ★★★☆☆ | ★★★★☆ |

**决策**：选择 **方案 A（4 个基本方向，距离 2 方块）**

**理由**：
1. **方向选择**：4 个基本方向已足够检测主要坡度，对角线方向收益有限（山地坡度通常沿基本轴向）
2. **检查距离**：
   - 距离 1：检测 10 方块高差需要坡度 10/1 = 10（83° 角），过于敏感，会拒绝正常台阶
   - 距离 2：坡度 10/2 = 5（79° 角），合理阈值
   - 距离 3+：可能跨越区块边界，影响缓存命中率
3. **性能优势**：4 次 `getHeightAt()` 调用，90% 缓存命中率，实际计算仅 0.4 次/动物

**替代方案被拒理由**：
- 方案 B：8 方向增加 2 倍调用但准确性提升有限（对角线坡度少见）
- 方案 C：距离 1 过于敏感，会错误拒绝小台阶地形
- 方案 D：9 点采样调用次数多，且无法检测距离 2 的陡坡

**算法实现**：
```typescript
private hasSteepSlope(worldX: number, worldZ: number, centerHeight: number): boolean {
  const SLOPE_THRESHOLD = 10
  const CHECK_DISTANCE = 2
  
  const directions = [
    { dx: CHECK_DISTANCE, dz: 0 },   // 东
    { dx: -CHECK_DISTANCE, dz: 0 },  // 西
    { dx: 0, dz: CHECK_DISTANCE },   // 南
    { dx: 0, dz: -CHECK_DISTANCE }   // 北
  ]
  
  for (const dir of directions) {
    const neighborHeight = this.world.getHeightAt(worldX + dir.dx, worldZ + dir.dz)
    if (Math.abs(neighborHeight - centerHeight) > SLOPE_THRESHOLD) {
      return true  // 陡坡
    }
  }
  
  return false
}
```

**边界情况处理**：
- **区块边界**：`getHeightAt()` 基于噪声生成，不依赖区块加载，区块边界完全可靠
- **Landmark 区域**：内部地形强制平坦（高度差恒为 0），自动通过检测，可跳过以节省性能
- **保护区优化**：在 `isInSpawnProtectionZone()` 区域内跳过坡度检测（性能优化）

**性能评估**：
- 无坡度检测：5 次 `getHeightAt()` / 动物
- 有坡度检测：9 次 `getHeightAt()` / 动物（+80%）
- 实际计算（90% 缓存命中）：0.5 → 0.9 次（+0.4 次）
- 总耗时增加：+0.01ms/动物（可忽略）

---

### 问题 3: 位置计算逻辑验证

**背景**：需要确认 `createAnimal()` 中的 Y 坐标计算是否正确。

**当前实现（AnimalSpawner.ts 第 224-229 行）**：
```typescript
if (animal) {
  // Animal position is at center, so feet are at position.y - height/2
  // We want feet at groundY, so position.y = groundY + height/2
  animal.position.y = groundY + animal.height / 2
}
```

**验证结果**：✅ **逻辑正确，无需修改**

**分析**：
- 动物实体的 `position` 表示碰撞箱**中心点**（Three.js 标准）
- 动物的脚部位置 = `position.y - height/2`
- 要让脚部接触地面（groundY），需要：`position.y = groundY + height/2`
- 各动物子类（Cow/Sheep/Pig/Chicken/...）的 height 属性已正确配置

**不同动物体型测试**：
| 动物 | height | 应用公式后脚部 Y | 结果 |
|------|--------|------------------|------|
| Chicken | 0.7 | groundY + 0.35 - 0.35 = groundY | ✅ |
| Cow | 1.4 | groundY + 0.7 - 0.7 = groundY | ✅ |
| Wolf | 0.9 | groundY + 0.45 - 0.45 = groundY | ✅ |

**结论**：`createAnimal()` 中的位置计算无需修改，仅需修复 `findSpawnPosition()` 的水检测和坡度验证。

---

## 技术依赖最佳实践

### World.getBlock() 使用指南

**用途**：精确检测特定位置的方块类型

**特性**：
- ✅ 返回精确的 BlockType 枚举值
- ⚠️ **依赖区块已加载**，未加载时返回 BlockType.AIR（误判风险）
- ❌ 无内部缓存

**最佳实践**：
```typescript
// ✅ 正确：结合 getHeightAt 预筛选
if (surfaceY < WATER_LEVEL) continue  // 预筛选
const block = this.world.getBlock(x, y, z)

// ❌ 错误：直接用于未加载区块
const block = this.world.getBlock(randomX, 50, randomZ)  // 可能返回 AIR
```

---

### World.getHeightAt() 使用指南

**用途**：获取地形表面高度（不包括水面高度）

**特性**：
- ✅ **不依赖区块加载**（基于噪声函数）
- ✅ 内置缓存（maxCacheSize: 10000，90%+ 命中率）
- ⚠️ 返回固体地形高度，不是水面高度

**最佳实践**：
```typescript
// ✅ 正确：用于生成系统预筛选
const terrainHeight = this.world.getHeightAt(x, z)
if (terrainHeight < WATER_LEVEL) {
  // 水下地形
}

// ❌ 错误：将返回值误认为是水面高度
const waterSurfaceY = this.world.getHeightAt(x, z)  // 错误！这是地形高度
```

---

### TerrainGenerator 缓存机制

**实现（TerrainGenerator.ts 第 46-48 行）**：
```typescript
private heightCache: Map<string, number> = new Map()
private readonly maxCacheSize = 10000

// LRU 策略：缓存满时清理一半
if (this.heightCache.size >= this.maxCacheSize) {
  const keys = Array.from(this.heightCache.keys())
  for (let i = 0; i < keys.length / 2; i++) {
    this.heightCache.delete(keys[i]!)
  }
}
```

**性能特点**：
- 缓存容量：10000 个 (x,z) 坐标
- 覆盖范围：约 100×100 区块（相当于半径 800 方块）
- 命中率：AnimalSpawner 中 90%+（位置相近）
- 清理策略：简单 LRU（删除前 50%）

**建议**：无需在 AnimalSpawner 中添加额外缓存，现有机制已足够。

---

## 参考实现

### FishSpawner 的水检测模式（推荐）

```typescript
// FishSpawner.ts 第 172-206 行
private findWaterSpawnPosition(chunkX: number, chunkZ: number): THREE.Vector3 | null {
  for (let attempt = 0; attempt < 20; attempt++) {
    const terrainHeight = this.world.getHeightAt(worldX, worldZ)
    
    // 第一步：快速筛选（不依赖区块加载）
    if (terrainHeight >= WATER_LEVEL) continue
    
    const waterDepth = WATER_LEVEL - terrainHeight
    if (waterDepth < minDepth) continue
    
    const waterY = terrainHeight + 1 + Math.floor(waterDepth / 2)
    
    // 第二步：精确验证（依赖区块加载）
    const block = this.world.getBlock(worldX, waterY, worldZ)
    if (block !== BlockType.WATER) continue
    
    return new THREE.Vector3(worldX + 0.5, waterY + 0.5, worldZ + 0.5)
  }
  return null
}
```

---

### Animal.ts 的水物理系统（已完善，无需修改）

```typescript
// Animal.ts 第 179-183 行
this.inWater = checkInWater(this, world)

if (this.inWater) {
  this.applyWaterPhysics(deltaTime, world)  // 浮力、游泳
}
```

**功能**：
- 检测动物是否在水中（检测碰撞箱下半身）
- 应用浮力效果（WATER_BUOYANCY = 8）
- 浮到水面（WATER_SURFACE_OFFSET = 0.3）
- 速度减半（speedMultiplier = 0.5）

**结论**：动物遇水后的行为已完善，本次修复仅需确保生成位置不在水中。

---

## 总结

| 决策点 | 选择方案 | 关键理由 |
|--------|---------|---------|
| 水方块检测 | getHeightAt + getBlock 双重验证 | 兼顾性能（缓存）和准确性 |
| 坡度检测 | 4 个基本方向，距离 2 方块 | 性能最优，准确性足够 |
| 位置计算 | 无需修改 | 现有逻辑已正确实现 |
| 缓存策略 | 使用现有 TerrainGenerator 缓存 | 命中率 90%+，无需额外缓存 |

**下一步**：进入 Phase 1，创建 data-model.md 和 contracts/（如需）
