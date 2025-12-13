# Research: 区块与地形生成系统

**Feature**: 002-chunk-terrain-system  
**Date**: 2025-12-12

## 1. Simplex Noise 实现方案

### Decision
使用纯 TypeScript 实现的 Simplex Noise，不引入外部依赖。

### Rationale
- Three.js 不内置噪声函数
- 外部库（如 simplex-noise）增加依赖但功能简单可自实现
- 自实现便于优化和控制（如 Web Worker 移植）
- Simplex 比 Perlin 性能更好，无方向性伪影

### Alternatives Considered
| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| simplex-noise npm 包 | 成熟稳定 | 额外依赖 | 备选 |
| 自实现 Simplex | 零依赖，可优化 | 需验证正确性 | ✅ 选用 |
| Perlin Noise | 经典算法 | 有方向性伪影 | 不选 |

### Implementation Notes
- 实现 2D Simplex（地形高度图）和 3D Simplex（洞穴）
- 支持多倍频叠加（octaves）生成自然地形
- 种子化随机数生成器确保可重现性

---

## 2. 区块数据结构

### Decision
使用扁平化 Uint8Array 存储区块方块数据（16×16×16 = 4096 字节）。

### Rationale
- 内存紧凑：4KB/区块 vs 嵌套数组的对象开销
- 访问快速：单次索引计算 `y * 256 + z * 16 + x`
- 序列化友好：直接二进制存储
- 与 Web Worker 传输兼容（Transferable）

### Alternatives Considered
| 方案 | 内存/区块 | 访问速度 | 结论 |
|------|-----------|----------|------|
| 3D 嵌套数组 | ~50KB+ | 中等 | 不选 |
| Uint8Array 扁平化 | 4KB | 快 | ✅ 选用 |
| Map<string, BlockType> | 稀疏友好 | 慢 | 不选 |

---

## 3. 区块加载策略

### Decision
基于玩家位置的圆形加载区域，使用优先级队列按距离排序。

### Rationale
- 圆形区域比方形更自然，避免角落区块浪费
- 优先加载玩家前方和附近区块
- 异步生成避免主线程阻塞

### Parameters
| 参数 | 值 | 说明 |
|------|-----|------|
| 加载半径 | 8 区块 | 128 方块可见距离 |
| 卸载半径 | 10 区块 | 滞后卸载防抖动 |
| 每帧最大加载 | 2 区块 | 平衡加载速度与帧率 |
| 预加载方向权重 | 1.5x | 玩家朝向方向优先 |

---

## 4. 区块网格渲染

### Decision
每区块独立 InstancedMesh，仅渲染暴露面（贪婪网格合并可后续优化）。

### Rationale
- 独立网格便于按区块更新，避免全局重建
- 暴露面检测减少 90%+ 面数
- InstancedMesh 保持 draw call 低
- 贪婪网格合并复杂度高，作为后续优化

### Alternatives Considered
| 方案 | Draw Calls | 复杂度 | 结论 |
|------|------------|--------|------|
| 全局单 Mesh | 1 | 更新慢 | 不选 |
| 每区块 InstancedMesh | ~区块数 | 中等 | ✅ 选用 |
| 贪婪网格合并 | 最少 | 高 | 后续优化 |

---

## 5. 地形生成参数

### Decision
多层噪声叠加 + 高度分层方块分布。

### Parameters
```typescript
const TERRAIN_CONFIG = {
  // 基础地形
  baseHeight: 64,           // 海平面高度
  heightVariation: 32,      // 最大高度变化
  
  // 噪声参数
  octaves: 4,               // 噪声层数
  persistence: 0.5,         // 振幅衰减
  lacunarity: 2.0,          // 频率增长
  scale: 0.01,              // 基础缩放
  
  // 方块分层
  stoneDepth: 4,            // 石头层从地表向下深度
  dirtDepth: 3,             // 泥土层厚度
  // 表层自动为草地
}
```

---

## 6. 洞穴生成算法

### Decision
使用 3D Simplex Noise 阈值法生成洞穴。

### Rationale
- 简单有效，与地形生成共用噪声基础设施
- 阈值可调控洞穴密度和大小
- 自然连通，无需路径算法

### Parameters
```typescript
const CAVE_CONFIG = {
  threshold: 0.6,           // 噪声值 > 阈值则为空气
  scale: 0.05,              // 洞穴尺度
  minHeight: 8,             // 最低生成高度（避免穿透世界底部）
  maxHeight: 56,            // 最高生成高度（避免地表露天）
}
```

---

## 7. 视锥剔除策略

### Decision
使用 Three.js 内置 Frustum 对区块包围盒进行剔除。

### Rationale
- Three.js 已有成熟实现
- 区块级剔除粒度足够（16×16×16）
- 无需自实现八叉树

### Implementation
```typescript
const frustum = new THREE.Frustum()
frustum.setFromProjectionMatrix(
  camera.projectionMatrix.clone().multiply(camera.matrixWorldInverse)
)
// 对每个区块的 BoundingBox 检测
if (frustum.intersectsBox(chunk.boundingBox)) {
  // 渲染该区块
}
```

---

## 8. 现有代码重构影响

### World.ts 重构
- 移除固定大小数组，改为 `Map<string, Chunk>` 管理区块
- `getBlock`/`setBlock` 改为先定位区块再访问
- 移除 `generateFlatTerrain`，改用 TerrainGenerator

### BlockMesh.ts 重构
- 废弃全局 InstancedMesh 方案
- 改为 ChunkRenderer 管理多个 ChunkMesh

### Player/Raycaster 适配
- 世界坐标到区块坐标转换
- 跨区块射线检测
