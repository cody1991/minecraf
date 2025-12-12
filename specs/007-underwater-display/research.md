# Research: 水下显示优化

**Feature**: 007-underwater-display  
**Date**: 2025-12-12

## 问题 1: 水体显示不完整的根因

### 调查结果

通过代码分析发现问题出在 `src/core/Chunk.ts` 的 `isFaceExposed` 方法：

```typescript
// 第 200-201 行
return this.getBlock(nx, ny, nz) === BlockType.AIR
```

**问题**：该方法只检查相邻方块是否为 AIR，但水方块（WATER）不是 AIR，因此：
- 两个相邻水方块之间的面不会被渲染
- 玩家在水下时，只能看到水与空气/固体方块的边界
- 水体内部看起来是"空的"或"透视"的

### 决策

修改 `isFaceExposed` 方法，对透明方块使用不同的判断逻辑：
- 不透明方块：相邻方块为 AIR 或透明方块时渲染面
- 透明方块：相邻方块为 AIR 或不同类型方块时渲染面

### 替代方案

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| 修改 isFaceExposed | 精确控制，性能好 | 需要修改核心逻辑 | ✅ 采用 |
| 始终渲染透明方块所有面 | 简单 | 性能差，大量重复面 | ❌ 拒绝 |
| 后处理水下效果 | 效果好 | 不解决填充问题 | ❌ 拒绝 |

---

## 问题 2: 水下视觉效果实现方案

### 调查结果

Three.js 提供多种实现水下效果的方式：

1. **Fog（雾效果）**
   - `THREE.Fog(color, near, far)` - 线性雾
   - `THREE.FogExp2(color, density)` - 指数雾
   - 性能开销低，内置于渲染管线

2. **后处理 Shader**
   - 使用 EffectComposer + ShaderPass
   - 可实现更复杂效果（扭曲、气泡等）
   - 需要额外渲染通道，性能开销高

3. **场景背景色**
   - 简单切换 `scene.background`
   - 配合 Fog 使用效果更好

### 决策

使用 Three.js 内置 `FogExp2` + 场景背景色切换：

```typescript
// 水下效果
scene.fog = new THREE.FogExp2(0x1a3a5c, 0.04) // 蓝色雾，密度对应16格能见度
scene.background = new THREE.Color(0x1a3a5c)

// 正常效果
scene.fog = null
scene.background = new THREE.Color(0x87ceeb) // 天蓝色
```

### 参数计算

水下能见度 16 格 = 16 方块 = 16 单位距离

FogExp2 密度计算：
- 当 `exp(-density * distance) ≈ 0.05`（95% 衰减）时
- `density = -ln(0.05) / distance = 3.0 / 16 ≈ 0.19`
- 但这太强了，使用 `0.04` 提供更柔和的效果

---

## 问题 3: 透明方块渲染顺序

### 调查结果

当前 `ChunkMesh.ts` 已经分离了不透明和透明 mesh：
- `opaqueMesh`: renderOrder = 0
- `transparentMesh`: renderOrder = 1

透明 mesh 使用：
- `transparent: true`
- `depthWrite: false`
- `side: THREE.DoubleSide`

### 决策

保持现有透明渲染策略，仅修改面暴露判断逻辑。

---

## 问题 4: 玩家水下状态检测

### 调查结果

已有实现：
- `Player.isSubmerged`: 玩家头部是否在水下
- `PhysicsSystem.checkSubmerged()`: 检测头部位置的方块类型
- 在 `Movement.ts` 中每帧更新

### 决策

复用现有 `isSubmerged` 状态触发水下视觉效果，无需新增检测逻辑。

---

## 总结

| 问题 | 决策 | 影响文件 |
|------|------|----------|
| 水体填充不完整 | 修改 isFaceExposed 逻辑 | Chunk.ts, ChunkMesh.ts |
| 水下视觉效果 | FogExp2 + 背景色切换 | Renderer.ts, 新增 UnderwaterEffect.ts |
| 透明方块渲染 | 保持现有策略 | 无 |
| 水下状态检测 | 复用 isSubmerged | Game.ts |
