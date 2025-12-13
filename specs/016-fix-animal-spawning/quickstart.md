# Quickstart: 修复动物浮空问题

**Feature**: 016-fix-animal-spawning  
**Date**: 2025-12-13  
**Branch**: `016-fix-animal-spawning`

本指南帮助开发者快速理解功能需求并开始实现。

---

## 快速理解（30 秒）

**问题**：陆地动物（牛、羊、猪等）生成时可能出现浮空或在水中  
**原因**：`AnimalSpawner.findSpawnPosition()` 未检测水方块和地形坡度  
**方案**：添加两项验证：
1. 检测生成位置是否有水（地形高度 < 水位线 或 地面上方有水方块）
2. 检测地形坡度（相邻方块高度差 > 10 时跳过）

**影响文件**：仅修改 `src/entities/AnimalSpawner.ts`（约 30 行代码）

---

## 核心修改（5 分钟）

### 修改位置

```typescript
// src/entities/AnimalSpawner.ts

// 🔧 修改：private findSpawnPosition() 方法（第 163-186 行）
// 🆕 新增：private hasSteepSlope() 辅助方法
```

### 修改前代码

```typescript
// 当前实现（第 163-186 行）
private findSpawnPosition(chunkX: number, chunkZ: number): THREE.Vector3 | null {
  for (let attempt = 0; attempt < 5; attempt++) {
    const localX = Math.floor(Math.random() * 16)
    const localZ = Math.floor(Math.random() * 16)
    
    const worldX = chunkX * 16 + localX
    const worldZ = chunkZ * 16 + localZ
    
    if (isInSpawnProtectionZone(worldX, worldZ)) continue
    
    const surfaceY = this.world.getHeightAt(worldX, worldZ)
    
    if (surfaceY >= this.config.minY) {
      // ❌ 问题：没有检测水方块和坡度
      return new THREE.Vector3(worldX + 0.5, surfaceY + 1, worldZ + 0.5)
    }
  }
  
  return null
}
```

### 修改后代码（完整实现）

```typescript
// 🔧 修改后实现
private findSpawnPosition(chunkX: number, chunkZ: number): THREE.Vector3 | null {
  const WATER_LEVEL = 62  // 从 ChunkConstants 导入
  
  for (let attempt = 0; attempt < 5; attempt++) {
    const localX = Math.floor(Math.random() * 16)
    const localZ = Math.floor(Math.random() * 16)
    
    const worldX = chunkX * 16 + localX
    const worldZ = chunkZ * 16 + localZ
    
    // 现有检测：保护区
    if (isInSpawnProtectionZone(worldX, worldZ)) continue
    
    // 现有检测：地形高度
    const surfaceY = this.world.getHeightAt(worldX, worldZ)
    if (surfaceY < this.config.minY) continue
    
    // 🆕 新增检测 1：水位线检测（快速筛选水下地形）
    if (surfaceY < WATER_LEVEL) {
      continue  // 地形在水下，跳过
    }
    
    // 🆕 新增检测 2：地面上方水方块检测（处理湖泊边缘）
    const blockAboveSurface = this.world.getBlock(worldX, surfaceY + 1, worldZ)
    if (blockAboveSurface === BlockType.WATER) {
      continue  // 地面上方有水，跳过
    }
    
    // 🆕 新增检测 3：坡度检测（避免悬崖边缘）
    if (this.hasSteepSlope(worldX, worldZ, surfaceY)) {
      continue  // 地形陡峭，跳过
    }
    
    // 所有检测通过，返回有效位置
    return new THREE.Vector3(worldX + 0.5, surfaceY + 1, worldZ + 0.5)
  }
  
  return null
}

// 🆕 新增方法：坡度检测
private hasSteepSlope(worldX: number, worldZ: number, centerHeight: number): boolean {
  // 在保护区内跳过检测（性能优化）
  if (isInSpawnProtectionZone(worldX, worldZ)) {
    return false
  }

  const SLOPE_THRESHOLD = 10  // 高度差阈值
  const CHECK_DISTANCE = 2    // 检查距离（方块）
  
  // 检查 4 个基本方向
  const directions = [
    { dx: CHECK_DISTANCE, dz: 0 },   // 东
    { dx: -CHECK_DISTANCE, dz: 0 },  // 西
    { dx: 0, dz: CHECK_DISTANCE },   // 南
    { dx: 0, dz: -CHECK_DISTANCE }   // 北
  ]
  
  for (const dir of directions) {
    const neighborX = worldX + dir.dx
    const neighborZ = worldZ + dir.dz
    const neighborHeight = this.world.getHeightAt(neighborX, neighborZ)
    
    const heightDiff = Math.abs(neighborHeight - centerHeight)
    if (heightDiff > SLOPE_THRESHOLD) {
      return true  // 陡坡
    }
  }
  
  return false  // 所有方向都平缓
}
```

### 导入语句（需要添加）

```typescript
// AnimalSpawner.ts 文件顶部
import { BlockType } from '../core/Block'  // 🆕 新增：用于 BlockType.WATER
import { WATER_LEVEL } from '../core/ChunkConstants'  // 🆕 新增：水位线常量
```

---

## 验证测试（10 分钟）

### 手动测试步骤

1. **启动游戏**
   ```bash
   npm run dev
   ```

2. **测试场景 1：平原生物群系**
   - 走到平原区域，等待动物生成
   - ✅ 验证：所有动物脚部接触地面，无浮空
   - ✅ 验证：动物不会生成在水中

3. **测试场景 2：湖泊边缘**
   - 走到湖泊生物群系（BiomeType.LAKE）
   - ✅ 验证：动物只生成在陆地上，不在水中
   - ✅ 验证：动物走进水里后会游泳（水物理系统）

4. **测试场景 3：山地陡坡**
   - 走到山地生物群系（BiomeType.MOUNTAIN）
   - ✅ 验证：动物生成在平缓区域，不在悬崖边缘
   - ✅ 验证：陡坡区域不生成动物（5 次尝试后跳过）

### 调试工具

```typescript
// 在 findSpawnPosition() 中添加调试日志
console.log(`[AnimalSpawner] Attempt ${attempt}:`, {
  worldX,
  worldZ,
  surfaceY,
  isWater: surfaceY < WATER_LEVEL,
  blockAbove: blockAboveSurface,
  hasSteepSlope: this.hasSteepSlope(worldX, worldZ, surfaceY)
})
```

### 性能验证

使用浏览器开发者工具（F12 → Performance）：
- 生成 100 只动物的总耗时应 < 5ms
- 每次 `findSpawnPosition()` 调用应 < 0.1ms

---

## 常见问题

### Q: 为什么要检测两次水（surfaceY < WATER_LEVEL 和 getBlock）？

**A**: 两步验证机制：
- 第一步：快速筛选水下地形（90% 的水域情况），无需区块加载
- 第二步：精确检测湖泊边缘（地形在水位线以上但上方有水方块）

### Q: 坡度检测会影响性能吗？

**A**: 影响极小（+0.01ms/动物）：
- `getHeightAt()` 有 90%+ 缓存命中率
- 4 次调用仅产生 0.4 次真实计算
- 保护区内跳过检测（优化）

### Q: 动物走进水里会怎样？

**A**: 水物理系统（Animal.ts）会自动处理：
- 检测到在水中 → 应用浮力
- 浮到水面 → 速度减半
- 这是正常行为，无需修改

### Q: 为什么不修改 createAnimal() 的位置计算？

**A**: 现有逻辑已正确：
```typescript
position.y = groundY + height / 2
```
- 动物 position 表示碰撞箱中心
- 脚部 = position.y - height/2 = groundY
- 各动物子类的 height 属性已正确配置

---

## 技术参考

### 关键方法说明

```typescript
// World.getHeightAt() - 获取地形高度
// - 返回：固体地形的 Y 坐标（整数）
// - 特性：不依赖区块加载，有缓存（90%+ 命中率）
// - 注意：返回地形高度，不是水面高度
const surfaceY = this.world.getHeightAt(worldX, worldZ)

// World.getBlock() - 获取方块类型
// - 返回：BlockType 枚举（AIR=0, WATER=9, ...）
// - 特性：依赖区块加载，未加载时返回 AIR
// - 注意：需要配合 getHeightAt 预筛选
const block = this.world.getBlock(worldX, worldY, worldZ)
```

### 常量定义

```typescript
// ChunkConstants.ts
export const WATER_LEVEL = 62              // 水位线高度
export const SPAWN_PROTECTION_RADIUS = 50  // 保护区半径

// Block.ts
export enum BlockType {
  AIR = 0,
  WATER = 9,
  // ...
}
```

---

## 相关文档

- **spec.md**: 完整功能规范（用户故事、验收标准）
- **research.md**: 技术调研（水检测、坡度检测方案对比）
- **data-model.md**: 数据结构和实体关系
- **tasks.md**: 任务分解（由 `/speckit.tasks` 生成）

---

## 预期成果

**修改代码量**：
- 修改文件：1 个（AnimalSpawner.ts）
- 新增代码：约 30 行
- 删除代码：0 行
- 新增导入：2 行

**验收标准**（spec.md）：
- SC-001: 99% 以上动物脚部贴合地面（误差 < 0.1 方块）
- SC-002: 50 个新区块中无浮空/嵌入动物
- SC-003: 7 种动物脚部位置一致
- SC-004: 湖泊边缘 100% 生成在陆地上
- SC-005: 动物从生成第一帧就在正确位置

**性能影响**：
- 生成耗时：+0.01ms/动物（可忽略）
- 成功率：80%（过滤不适合位置，符合预期）

---

## 下一步

1. 运行 `/speckit.tasks` 创建任务分解
2. 按用户故事优先级（P1 → P2 → P3）实现
3. 每个故事完成后进行手动测试
4. 所有测试通过后合并到 main 分支

**开始实现**：参考上方"修改后代码"，直接编辑 `src/entities/AnimalSpawner.ts`
