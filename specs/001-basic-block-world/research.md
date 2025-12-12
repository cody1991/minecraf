# Research: 基础 3D 方块世界

**Feature**: 001-basic-block-world
**Date**: 2025-12-12

## 1. Three.js 第一人称控制

### Decision
使用 Three.js 内置的 `PointerLockControls` 配合自定义移动逻辑实现第一人称控制。

### Rationale
- `PointerLockControls` 提供鼠标锁定和视角旋转的标准实现
- 移动逻辑需要自定义以支持碰撞检测
- 避免引入额外依赖（如 cannon.js 物理引擎），保持轻量

### Alternatives Considered
| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| PointerLockControls + 自定义移动 | 轻量、可控 | 需手写碰撞检测 | ✅ 采用 |
| FirstPersonControls | 内置移动 | 不支持指针锁定 | ❌ 不适合游戏 |
| cannon.js 物理引擎 | 完整物理 | 过于复杂、性能开销 | ❌ MVP 不需要 |

---

## 2. 方块渲染优化策略

### Decision
使用 `InstancedMesh` 进行方块渲染，配合纹理图集减少 Draw Call。

### Rationale
- 64×64×3 = 12,288 个方块，逐个渲染会导致性能问题
- `InstancedMesh` 可将相同几何体的多个实例合并为单次 Draw Call
- 纹理图集将 5 种方块纹理合并为单张贴图，减少材质切换

### Alternatives Considered
| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| InstancedMesh + 纹理图集 | 高性能、低 Draw Call | 需要管理实例矩阵 | ✅ 采用 |
| 合并几何体 (BufferGeometryUtils.merge) | 简单 | 动态更新困难 | ❌ 不适合可编辑世界 |
| 逐方块 Mesh | 实现简单 | 性能差 | ❌ 无法达到 60 FPS |

---

## 3. 射线检测（Raycasting）方案

### Decision
使用 Three.js 内置 `Raycaster` 进行方块选择和交互检测。

### Rationale
- Three.js Raycaster 针对 Mesh 优化，支持 InstancedMesh
- 可直接获取交互点的法向量，用于确定放置方块的位置
- 无需额外依赖

### Implementation Notes
- 射线从相机位置沿视角方向发射
- 限制最大检测距离为 5 个方块单位
- 使用 `face.normal` 确定放置方向

---

## 4. 世界数据结构

### Decision
使用 3D 数组 `blocks[x][y][z]` 存储方块数据，配合 Map 进行快速查找。

### Rationale
- 64×64×256 的世界规模，3D 数组访问 O(1)
- 简单直观，易于实现和调试
- 后续可扩展为区块化存储

### Data Structure
```typescript
type BlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'sand' | 'air';

interface WorldData {
  blocks: BlockType[][][];  // [x][y][z]
  width: number;            // 64
  height: number;           // 256
  depth: number;            // 64
}
```

---

## 5. 碰撞检测策略

### Decision
使用 AABB (Axis-Aligned Bounding Box) 碰撞检测，玩家与方块均为轴对齐包围盒。

### Rationale
- AABB 计算简单高效
- 方块天然是轴对齐的立方体
- 足以满足基础移动碰撞需求

### Implementation Notes
- 玩家碰撞盒：0.6 × 1.8 × 0.6（宽×高×深）
- 每帧检测玩家新位置与周围方块的碰撞
- 碰撞时阻止移动或滑动

---

## 6. 纹理资源策略

### Decision
使用 16×16 像素的简化纹理，打包为单张纹理图集。

### Rationale
- 16×16 是 Minecraft 经典纹理尺寸
- 小尺寸纹理加载快、内存占用低
- 单张图集减少 HTTP 请求和材质切换

### Texture Atlas Layout
```
+-------+-------+-------+-------+-------+
| grass | dirt  | stone | wood  | sand  |
| (0,0) | (1,0) | (2,0) | (3,0) | (4,0) |
+-------+-------+-------+-------+-------+
```
- 图集尺寸：80×16 像素（5 种方块 × 16px）
- UV 坐标计算：`u = blockIndex * 0.2`, `v = 0`

---

## 7. 项目初始化与构建

### Decision
使用 Vite + TypeScript 模板初始化项目。

### Rationale
- Vite 提供快速的开发服务器和 HMR
- 原生支持 TypeScript
- 构建输出优化，适合生产部署

### Setup Commands
```bash
npm create vite@latest webcraft -- --template vanilla-ts
cd webcraft
npm install three @types/three
npm run dev
```

---

## Summary

所有技术决策均已明确，无 NEEDS CLARIFICATION 项。可进入 Phase 1 设计阶段。
