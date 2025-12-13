# Data Model: 修复动物浮空问题

**Feature**: 016-fix-animal-spawning  
**Date**: 2025-12-13

本文档定义功能涉及的数据结构和实体关系。

---

## 核心实体

### AnimalSpawner（修改目标）

**职责**：管理陆地动物的生成逻辑

**关键属性**：
```typescript
interface SpawnConfig {
  maxPerChunk: number       // 每区块最大动物数（默认 6）
  spawnChance: number       // 生成概率（默认 0.25）
  minY: number              // 最低生成高度（默认 1）
}

class AnimalSpawner {
  private entityManager: EntityManager
  private world: World
  private config: SpawnConfig
  private spawnedChunks: Set<string>  // 已生成动物的区块记录
}
```

**关键方法（本次修改）**：
```typescript
// 🔧 需要修改：添加水检测和坡度验证
private findSpawnPosition(
  chunkX: number, 
  chunkZ: number
): THREE.Vector3 | null

// 🆕 新增：坡度检测辅助方法
private hasSteepSlope(
  worldX: number,
  worldZ: number,
  centerHeight: number
): boolean
```

**状态转换**：
```
区块加载 → spawnInChunk() 
  ↓
检查是否已生成（spawnedChunks）
  ↓ 否
随机概率判断（spawnChance）
  ↓ 通过
循环尝试（最多 5 次）
  ↓
findSpawnPosition() - 查找有效位置
  ├─ 保护区检测 → 跳过
  ├─ 地形高度检测 → 检查 minY
  ├─ 🆕 水方块检测 → 检查 WATER_LEVEL 和 getBlock
  └─ 🆕 坡度检测 → 检查高度差 > 10
  ↓ 成功
createAnimal() → 创建动物实例
  ↓
entityManager.add() → 添加到世界
```

---

### Animal（无需修改）

**职责**：动物实体基类，包含物理属性和行为

**关键属性**：
```typescript
abstract class Animal extends Entity implements IPhysicsBody {
  readonly animalType: AnimalType
  position: THREE.Vector3        // 碰撞箱中心点位置
  velocity: THREE.Vector3        // 速度向量
  width: number                  // 碰撞箱宽度（默认 0.6）
  height: number                 // 碰撞箱高度（因子类而异）
  isGrounded: boolean            // 是否在地面上
  protected inWater: boolean     // 是否在水中
}
```

**子类体型**：
| 动物类型 | height | width | 备注 |
|---------|--------|-------|------|
| Chicken | 0.7 | 0.4 | 最小体型 |
| Rabbit | 0.5 | 0.4 | 最矮 |
| Pig | 0.9 | 0.9 | 中等 |
| Sheep | 1.3 | 0.9 | 中等偏大 |
| Wolf | 0.9 | 0.6 | 中等 |
| Fox | 0.7 | 0.6 | 小型 |
| Cow | 1.4 | 0.9 | 最大体型 |

**水物理状态**：
```
动物生成（陆地） → inWater = false
  ↓
移动进入水中 → checkInWater() 检测
  ↓
inWater = true → applyWaterPhysics()
  ├─ 应用浮力（WATER_BUOYANCY = 8）
  ├─ 速度减半（speedMultiplier = 0.5）
  └─ 浮到水面（WATER_SURFACE_OFFSET = 0.3）
  ↓
移动离开水中 → inWater = false
```

---

### World（只读访问）

**职责**：提供地形查询接口

**相关方法**：
```typescript
class World {
  // 获取方块类型（依赖区块加载）
  getBlock(x: number, y: number, z: number): BlockType
  
  // 获取地形高度（不依赖区块加载）
  getHeightAt(worldX: number, worldZ: number): number
  
  // 获取生物群系类型
  getBiomeAt(worldX: number, worldZ: number): BiomeType
}
```

**数据流**：
```
AnimalSpawner.findSpawnPosition()
  ↓
world.getHeightAt(x, z) → TerrainGenerator.getHeightAt()
  ├─ 检查 heightCache (90%+ 命中)
  └─ 未命中 → 计算噪声（4层八度）→ 缓存结果
  ↓
返回地形高度（整数）
  ↓
world.getBlock(x, y, z) → Chunk.getBlock()
  ├─ 转换坐标（世界 → 区块 → 局部）
  └─ 访问区块数组（O(1)）
  ↓
返回 BlockType 枚举
```

---

## 数据验证规则

### 生成位置验证流程

```typescript
interface SpawnValidation {
  // FR-001: 地面高度必须 >= minY
  heightCheck: (surfaceY: number) => surfaceY >= config.minY
  
  // FR-002: 不在保护区
  protectionCheck: (x: number, z: number) => !isInSpawnProtectionZone(x, z)
  
  // FR-005: 不在水中（新增）
  waterCheck: (x: number, surfaceY: number, z: number) => {
    // 检查1：地形高度是否在水位线以上
    if (surfaceY < WATER_LEVEL) return false
    
    // 检查2：地面上方是否有水方块
    const blockAbove = world.getBlock(x, surfaceY + 1, z)
    return blockAbove !== BlockType.WATER
  }
  
  // FR-006: 地形不陡峭（新增）
  slopeCheck: (x: number, z: number, centerHeight: number) => {
    for (const dir of DIRECTIONS) {
      const neighborHeight = world.getHeightAt(x + dir.dx, z + dir.dz)
      if (Math.abs(neighborHeight - centerHeight) > 10) {
        return false  // 陡坡
      }
    }
    return true  // 平缓
  }
}
```

### 位置计算公式

```typescript
// FR-003: 动物中心 Y 坐标计算
position.y = groundY + animal.height / 2

// 示例：
// Cow (height=1.4) 在 groundY=64 的地面
// position.y = 64 + 1.4/2 = 64.7
// 脚部位置 = 64.7 - 0.7 = 64.0 ✅ 接触地面
```

---

## 常量定义

### 环境常量

```typescript
// ChunkConstants.ts
export const WATER_LEVEL = 62        // 水位线高度
export const SPAWN_PROTECTION_RADIUS = 50  // 保护区半径
export const LANDMARK_ZONE_RADIUS = 200    // 地标区半径

// 新增：坡度检测配置
const SLOPE_THRESHOLD = 10           // 高度差阈值（方块）
const SLOPE_CHECK_DISTANCE = 2       // 检查距离（方块）
const SLOPE_CHECK_DIRECTIONS = [
  { dx: 2, dz: 0 },   // 东
  { dx: -2, dz: 0 },  // 西
  { dx: 0, dz: 2 },   // 南
  { dx: 0, dz: -2 }   // 北
]
```

### BlockType 枚举

```typescript
// Block.ts
export enum BlockType {
  AIR = 0,
  GRASS = 1,
  DIRT = 2,
  STONE = 3,
  // ...
  WATER = 9,      // 🔑 水方块检测使用
  // ...
  TORCH = 37
}
```

---

## 实体关系图

```
┌─────────────────┐
│  EntityManager  │ 管理所有实体
└────────┬────────┘
         │ 调用
         ↓
┌─────────────────┐     依赖     ┌──────────┐
│ AnimalSpawner   │─────────────→│  World   │
│ 🔧 修改目标     │               │ 只读访问  │
└────────┬────────┘               └────┬─────┘
         │ 创建                        │ 查询
         ↓                             ↓
┌─────────────────┐               ┌──────────────────┐
│     Animal      │               │ TerrainGenerator │
│   ✅ 无需修改   │               │  ✅ 无需修改     │
└─────────────────┘               └──────────────────┘
         │ 子类
         ├─ Cow
         ├─ Sheep
         ├─ Pig
         ├─ Chicken
         ├─ Rabbit
         ├─ Wolf
         └─ Fox
```

---

## 数据流图

### 动物生成完整流程

```
1. 玩家移动 → 新区块加载
   ↓
2. ChunkManager.onChunkLoaded()
   ↓
3. AnimalSpawner.spawnInChunk(chunkX, chunkZ)
   ├─ 检查 spawnedChunks（避免重复）
   ├─ 随机概率判断（25% spawnChance）
   └─ 循环尝试生成（1-6 只动物）
   ↓
4. findSpawnPosition(chunkX, chunkZ) - 🔧 修改点
   ├─ 随机 localX, localZ (0-15)
   ├─ 计算 worldX, worldZ
   ├─ 检查保护区（isInSpawnProtectionZone）
   ├─ 获取地形高度（world.getHeightAt）
   ├─ 🆕 检查水位线（surfaceY < WATER_LEVEL）
   ├─ 🆕 检查地面上方水方块（world.getBlock）
   └─ 🆕 检查坡度（hasSteepSlope）
   ↓ 成功
5. 选择动物类型（基于生物群系权重）
   ↓
6. createAnimal(type, x, groundY, z)
   ├─ 创建动物实例（new Cow/Sheep/...）
   └─ 应用位置公式（position.y = groundY + height/2）
   ↓
7. entityManager.add(animal)
   └─ 添加到 entities 列表和渲染场景
```

### 水检测数据流（新增）

```
findSpawnPosition()
  ↓
const surfaceY = world.getHeightAt(worldX, worldZ)
  ↓ 调用
TerrainGenerator.getHeightAt()
  ├─ 检查 heightCache
  │   ├─ 命中 → 返回缓存值（90%）
  │   └─ 未命中 → 计算噪声 → 缓存 → 返回
  ↓
返回地形高度（例如：surfaceY = 58）
  ↓
if (surfaceY < WATER_LEVEL) {  // 58 < 62
  continue  // 水下地形，跳过
}
  ↓ 通过（surfaceY >= 62）
const block = world.getBlock(worldX, surfaceY + 1, worldZ)
  ↓ 调用
World.getBlock() → Chunk.getBlock()
  ├─ 转换坐标（世界 → 区块 → 局部）
  └─ 访问数组：blocks[index]
  ↓
返回 BlockType（例如：BlockType.AIR 或 BlockType.WATER）
  ↓
if (block === BlockType.WATER) {
  continue  // 地面上方有水，跳过
}
  ↓ 通过（block === AIR）
return new THREE.Vector3(worldX + 0.5, surfaceY + 1, worldZ + 0.5)
```

### 坡度检测数据流（新增）

```
hasSteepSlope(worldX, worldZ, centerHeight)
  ↓
遍历 4 个方向 [东, 西, 南, 北]
  ↓
对于每个方向：
  const neighborX = worldX + dir.dx  // ±2
  const neighborZ = worldZ + dir.dz  // ±2
  ↓
  const neighborHeight = world.getHeightAt(neighborX, neighborZ)
    ↓ 调用 TerrainGenerator（有缓存）
  ↓
  const heightDiff = Math.abs(neighborHeight - centerHeight)
  ↓
  if (heightDiff > 10) {
    return true  // 陡坡，不适合生成
  }
  ↓
循环结束
  ↓
return false  // 所有方向都平缓
```

---

## 性能影响分析

### 修改前后对比

| 指标 | 修改前 | 修改后 | 变化 |
|------|--------|--------|------|
| getHeightAt 调用/尝试 | 1 次 | 5 次（1+4坡度） | +400% |
| 实际计算（90%缓存） | 0.1 次 | 0.5 次 | +0.4 次 |
| getBlock 调用/尝试 | 0 次 | 1 次 | +1 次 |
| 总耗时/尝试 | 0.01ms | 0.02ms | +0.01ms |
| 成功生成概率 | ~100% | ~80% | -20%（预期） |

**结论**：性能影响可忽略（+0.01ms/尝试），成功率下降是预期行为（过滤不适合生成的位置）。

---

## 测试数据

### 验证场景

| 场景 | 地形类型 | surfaceY | WATER_LEVEL | 坡度 | 预期结果 |
|------|---------|----------|-------------|------|---------|
| 1 | 平原草地 | 64 | 62 | 0-2 | ✅ 生成 |
| 2 | 湖底 | 58 | 62 | 0-2 | ❌ 跳过（水下） |
| 3 | 湖边陆地 | 63 | 62 | 0-2 | ✅ 生成 |
| 4 | 湖边水上 | 63 (水方块) | 62 | 0-2 | ❌ 跳过（水上） |
| 5 | 山顶 | 85 | 62 | 0-5 | ✅ 生成 |
| 6 | 悬崖边缘 | 70 | 62 | 15 | ❌ 跳过（陡坡） |
| 7 | 保护区 | 64 | 62 | 0-2 | ❌ 跳过（保护区） |

---

## 变更摘要

| 实体 | 变更类型 | 变更内容 |
|------|---------|---------|
| **AnimalSpawner** | 修改 | findSpawnPosition() - 添加水检测和坡度验证 |
| **AnimalSpawner** | 新增 | hasSteepSlope() - 坡度检测辅助方法 |
| **Animal** | 无变更 | 水物理系统已完善 |
| **World** | 无变更 | getBlock/getHeightAt 已满足需求 |
| **TerrainGenerator** | 无变更 | 高度缓存机制已优化 |

**下一步**：创建 quickstart.md 和 contracts/（如需）
