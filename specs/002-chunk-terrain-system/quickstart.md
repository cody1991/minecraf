# Quickstart: 区块与地形生成系统

**Feature**: 002-chunk-terrain-system  
**Date**: 2025-12-12

## 快速开始

### 1. 运行开发服务器

```bash
cd /Users/cody/Desktop/tencent/minecraft
npm run dev
```

访问 http://localhost:5173 查看游戏。

### 2. 核心概念

#### 区块坐标系

```
世界坐标 (x, y, z) → 区块坐标 (cx, cy, cz)

cx = Math.floor(x / 16)
cy = Math.floor(y / 16)  // 0-7（世界高度 0-128）
cz = Math.floor(z / 16)
```

#### 方块索引

区块内 4096 个方块使用扁平化索引：

```typescript
index = y * 256 + z * 16 + x  // x, y, z ∈ [0, 15]
```

### 3. 主要模块

| 模块 | 路径 | 职责 |
|------|------|------|
| Chunk | `src/core/Chunk.ts` | 区块数据结构 |
| ChunkManager | `src/core/ChunkManager.ts` | 加载/卸载调度 |
| World | `src/core/World.ts` | 世界管理（重构） |
| NoiseGenerator | `src/terrain/NoiseGenerator.ts` | Simplex 噪声 |
| TerrainGenerator | `src/terrain/TerrainGenerator.ts` | 地形生成 |
| CaveGenerator | `src/terrain/CaveGenerator.ts` | 洞穴生成 |
| ChunkMesh | `src/renderer/ChunkMesh.ts` | 区块网格渲染 |
| ChunkRenderer | `src/renderer/ChunkRenderer.ts` | 多区块渲染管理 |

### 4. 使用示例

#### 获取/设置方块

```typescript
// 获取世界坐标 (10, 64, 20) 的方块
const block = world.getBlock(10, 64, 20)

// 设置方块
world.setBlock(10, 64, 20, BlockType.STONE)
```

#### 查询地形高度

```typescript
// 获取 (x, z) 位置的地形高度
const height = world.getHeightAt(100, 200)
```

#### 强制加载区块

```typescript
// 异步加载指定区块
const chunk = await chunkManager.forceLoadChunk(5, 3, 10)
```

### 5. 配置参数

#### 区块加载

```typescript
// src/core/ChunkManager.ts
const DEFAULT_CONFIG: ChunkLoadConfig = {
  loadRadius: 8,        // 加载半径（区块数）
  unloadRadius: 10,     // 卸载半径
  maxLoadsPerFrame: 2,  // 每帧最大加载数
}
```

#### 地形生成

```typescript
// src/terrain/TerrainGenerator.ts
const DEFAULT_TERRAIN: TerrainConfig = {
  baseHeight: 64,
  heightVariation: 32,
  octaves: 4,
  persistence: 0.5,
  lacunarity: 2.0,
  scale: 0.01,
  stoneDepth: 4,
  dirtDepth: 3,
}
```

#### 洞穴生成

```typescript
// src/terrain/CaveGenerator.ts
const DEFAULT_CAVE: CaveConfig = {
  threshold: 0.6,
  scale: 0.05,
  minHeight: 8,
  maxHeight: 56,
}
```

### 6. 调试技巧

#### 查看加载的区块数

```typescript
console.log('Loaded chunks:', chunkManager.loadedCount)
```

#### 固定种子测试

```typescript
const world = new World({ seed: 12345 })
// 相同种子 = 相同地形
```

#### 性能监控

游戏已内置 FPS 计数器（左上角）。目标：60 FPS。

### 7. 测试

```bash
# 运行单元测试（需先配置 Vitest）
npm run test

# 类型检查
npm run typecheck
```

### 8. 常见问题

**Q: 为什么看到空白区域？**  
A: 区块正在加载中。增加 `maxLoadsPerFrame` 或减少 `loadRadius`。

**Q: 帧率下降？**  
A: 减少 `loadRadius` 或检查是否有大量区块同时 dirty。

**Q: 地形不连续？**  
A: 检查噪声种子是否一致，区块边界计算是否正确。
