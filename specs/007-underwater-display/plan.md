# Implementation Plan: 水下显示优化

**Branch**: `007-underwater-display` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-underwater-display/spec.md`

## Summary

优化 Minecraft 风格游戏的水下显示效果，解决水体填充不完整的问题，并添加水下视觉效果（蓝色色调滤镜和雾效果）。核心问题在于当前 `isFaceExposed` 方法只检查 AIR 方块，导致相邻水方块之间的面不被渲染，造成水体内部"透视"效果。

## Technical Context

**Language/Version**: TypeScript 5.6  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0  
**Storage**: N/A（无持久化需求）  
**Testing**: 手动测试（项目当前无自动化测试框架）  
**Target Platform**: Web Browser (WebGL 2.0)  
**Project Type**: Single（Web 游戏）  
**Performance Goals**: 60 FPS（桌面端），30 FPS（移动端）  
**Constraints**: 水域渲染帧率差异不超过 10%  
**Scale/Scope**: 16 区块可见距离，水下能见度 16 格

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ PASS | 使用 Three.js 实现水下效果，符合 WebGL 渲染要求 |
| II. 区块化世界管理 | ✅ PASS | 修改在 Chunk 和 ChunkMesh 层面，保持区块架构 |
| III. 模块化游戏系统 | ✅ PASS | 水下效果作为独立渲染模块，通过 Player 状态触发 |
| IV. 响应式输入处理 | ✅ N/A | 本功能不涉及输入处理 |
| V. 渐进式加载与性能优化 | ✅ PASS | 水下雾效果使用 Three.js 内置 Fog，性能开销低 |

**性能标准检查**:
- 帧率目标：60 FPS（桌面）/ 30 FPS（移动）- 需验证
- 内存占用：无显著增加（仅添加 Fog 对象）

## Project Structure

### Documentation (this feature)

```text
specs/007-underwater-display/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── core/
│   ├── Block.ts           # 方块类型定义（无需修改）
│   ├── Chunk.ts           # 需修改：isFaceExposed 逻辑
│   ├── ChunkConstants.ts  # 需添加：水下效果常量
│   ├── ChunkManager.ts    # 无需修改
│   ├── Game.ts            # 需修改：集成水下效果
│   └── World.ts           # 无需修改
├── player/
│   ├── Player.ts          # 已有 isSubmerged 状态
│   └── Movement.ts        # 无需修改
├── physics/
│   └── Collision.ts       # 已有 checkSubmerged 函数
├── renderer/
│   ├── Renderer.ts        # 需修改：添加水下雾效果
│   ├── ChunkMesh.ts       # 需修改：透明方块面渲染逻辑
│   └── UnderwaterEffect.ts # 新增：水下效果管理器
└── terrain/
    └── TerrainGenerator.ts # 无需修改（水生成逻辑正确）
```

**Structure Decision**: 使用现有单项目结构，新增 `UnderwaterEffect.ts` 模块管理水下视觉效果。

## Complexity Tracking

> 无违反宪法的情况，无需记录。

## Phase 0: Research Summary

### 问题根因分析

**Decision**: 水体显示不完整的根本原因是 `Chunk.isFaceExposed()` 方法

**Rationale**: 
- 当前逻辑：`return this.getBlock(nx, ny, nz) === BlockType.AIR`
- 问题：两个相邻水方块之间的面不会被渲染（因为相邻方块不是 AIR）
- 结果：从水内部看，只能看到水与空气/固体方块的边界面，内部是"透明"的

**Alternatives considered**:
1. 修改 `isFaceExposed` 使其对透明方块返回 true - 会导致所有透明方块内部面都渲染，性能差
2. 为水方块单独处理 - 需要修改 ChunkMesh 的渲染逻辑，更精确但复杂
3. 使用后处理全屏水下效果 - 不解决水体填充问题，但可用于水下视觉效果

### 水下视觉效果方案

**Decision**: 使用 Three.js 内置 Fog + 场景背景色切换

**Rationale**:
- Three.js 的 `FogExp2` 提供指数衰减雾效果，符合水下能见度需求
- 切换场景背景色为蓝色，配合雾效果实现水下色调
- 无需后处理 shader，性能开销低

**Alternatives considered**:
1. 后处理 shader - 效果更好但性能开销大，需要额外渲染通道
2. 仅改变背景色 - 效果不够明显，缺少距离衰减
3. 自定义材质 - 需要修改所有方块材质，复杂度高

### 透明方块面渲染策略

**Decision**: 修改 `isFaceExposed` 逻辑，对透明方块使用不同的判断规则

**Rationale**:
- 透明方块（水、玻璃、树叶）的面应该在以下情况渲染：
  - 相邻方块是 AIR
  - 相邻方块是不同类型的透明方块（如水与玻璃边界）
  - 相邻方块是不透明方块（边界面）
- 相同类型透明方块之间的面不渲染（避免重复渲染）

**Alternatives considered**:
1. 始终渲染透明方块所有面 - 性能差，大量重复面
2. 仅渲染水面顶部 - 不解决水下视角问题
