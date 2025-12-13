# Data Model: 区块与地形生成系统

**Feature**: 002-chunk-terrain-system  
**Date**: 2025-12-12

## Entities

### 1. Chunk（区块）

世界的基本管理单元，包含 16×16×16 = 4096 个方块。

```typescript
interface Chunk {
  // 身份标识
  x: number                    // 区块 X 坐标（世界坐标 / 16）
  y: number                    // 区块 Y 坐标（0-7，共 8 层）
  z: number                    // 区块 Z 坐标（世界坐标 / 16）
  
  // 方块数据
  blocks: Uint8Array           // 4096 字节，扁平化存储
  
  // 状态
  state: ChunkState            // 加载状态
  isDirty: boolean             // 是否需要重新生成网格
  
  // 渲染
  mesh: THREE.InstancedMesh | null  // 渲染网格（已加载时）
  boundingBox: THREE.Box3      // 包围盒（视锥剔除用）
}

enum ChunkState {
  UNLOADED = 0,                // 未加载
  LOADING = 1,                 // 加载中
  LOADED = 2,                  // 已加载（可渲染）
  UNLOADING = 3                // 卸载中
}
```

**索引计算**:
```typescript
// 世界坐标 → 区块内索引
function blockIndex(localX: number, localY: number, localZ: number): number {
  return localY * 256 + localZ * 16 + localX  // 0-4095
}

// 世界坐标 → 区块坐标
function worldToChunk(worldX: number, worldY: number, worldZ: number): ChunkCoord {
  return {
    x: Math.floor(worldX / 16),
    y: Math.floor(worldY / 16),
    z: Math.floor(worldZ / 16)
  }
}
```

---

### 2. ChunkCoord（区块坐标）

区块的唯一标识。

```typescript
interface ChunkCoord {
  x: number
  y: number
  z: number
}

// 转换为字符串键（用于 Map 存储）
function chunkKey(x: number, y: number, z: number): string {
  return `${x},${y},${z}`
}
```

---

### 3. World（世界）

管理所有区块的容器。

```typescript
interface World {
  // 配置
  seed: number                          // 世界种子
  
  // 区块管理
  chunks: Map<string, Chunk>            // 已加载区块 (key: "x,y,z")
  
  // 边界
  minY: number                          // 0（基岩层）
  maxY: number                          // 128（建造上限）
  
  // 方法
  getBlock(x: number, y: number, z: number): BlockType
  setBlock(x: number, y: number, z: number, type: BlockType): boolean
  getChunk(cx: number, cy: number, cz: number): Chunk | undefined
  loadChunk(cx: number, cy: number, cz: number): Promise<Chunk>
  unloadChunk(cx: number, cy: number, cz: number): void
}
```

---

### 4. ChunkManager（区块管理器）

负责区块的加载、卸载和优先级调度。

```typescript
interface ChunkManager {
  // 配置
  loadRadius: number                    // 加载半径（区块数）
  unloadRadius: number                  // 卸载半径（区块数）
  maxLoadsPerFrame: number              // 每帧最大加载数
  
  // 状态
  loadQueue: PriorityQueue<ChunkCoord>  // 待加载队列
  activeChunks: Set<string>             // 当前活跃区块
  
  // 方法
  update(playerPosition: Vector3): void // 每帧更新
  getVisibleChunks(): Chunk[]           // 获取可见区块
}
```

---

### 5. TerrainGenerator（地形生成器）

根据噪声算法生成区块地形。

```typescript
interface TerrainGenerator {
  // 配置
  seed: number
  config: TerrainConfig
  
  // 方法
  generateChunk(cx: number, cy: number, cz: number): Uint8Array
  getHeightAt(worldX: number, worldZ: number): number
}

interface TerrainConfig {
  baseHeight: number          // 基础高度（64）
  heightVariation: number     // 高度变化范围（32）
  octaves: number             // 噪声层数（4）
  persistence: number         // 振幅衰减（0.5）
  lacunarity: number          // 频率增长（2.0）
  scale: number               // 基础缩放（0.01）
  stoneDepth: number          // 石头层深度（4）
  dirtDepth: number           // 泥土层厚度（3）
}
```

---

### 6. CaveGenerator（洞穴生成器）

使用 3D 噪声生成洞穴。

```typescript
interface CaveGenerator {
  // 配置
  seed: number
  config: CaveConfig
  
  // 方法
  shouldCarve(worldX: number, worldY: number, worldZ: number): boolean
}

interface CaveConfig {
  threshold: number           // 雕刻阈值（0.6）
  scale: number               // 噪声缩放（0.05）
  minHeight: number           // 最低高度（8）
  maxHeight: number           // 最高高度（56）
}
```

---

### 7. NoiseGenerator（噪声生成器）

Simplex Noise 实现。

```typescript
interface NoiseGenerator {
  // 方法
  noise2D(x: number, y: number): number           // 返回 -1 到 1
  noise3D(x: number, y: number, z: number): number
  
  // 多倍频
  fractal2D(x: number, y: number, octaves: number, persistence: number, lacunarity: number): number
  fractal3D(x: number, y: number, z: number, octaves: number, persistence: number, lacunarity: number): number
}
```

---

## Relationships

```
World (1) ──────────── (*) Chunk
  │                         │
  │ uses                    │ rendered by
  ▼                         ▼
ChunkManager            ChunkMesh
  │
  │ uses
  ▼
TerrainGenerator ──── NoiseGenerator
  │
  │ uses
  ▼
CaveGenerator ──────── NoiseGenerator
```

---

## State Transitions

### Chunk Lifecycle

```
UNLOADED ──[loadChunk()]──► LOADING ──[generation complete]──► LOADED
    ▲                                                              │
    │                                                              │
    └────────────────[unloadChunk()]◄──── UNLOADING ◄──────────────┘
```

### Chunk Dirty Flag

```
CLEAN ──[setBlock() / initial load]──► DIRTY ──[mesh rebuild]──► CLEAN
```

---

## Validation Rules

| Entity | Rule | Enforcement |
|--------|------|-------------|
| Chunk.x/z | 任意整数 | 无限世界 |
| Chunk.y | 0-7 | 世界高度 0-128 |
| Block index | 0-4095 | 数组边界检查 |
| BlockType | 0-5 (enum) | Uint8 范围 |
| World.seed | 32-bit integer | 噪声生成器要求 |
