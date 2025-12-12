# Implementation Plan: 区块与地形生成系统

**Branch**: `002-chunk-terrain-system` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-chunk-terrain-system/spec.md`

## Summary

将现有的固定大小世界（64×256×64）重构为基于区块的无限世界系统。实现 16×16×16 区块划分、按需动态加载/卸载、Simplex 噪声地形生成（包含山丘和洞穴）、以及基于玩家位置的可见区块渲染优化。目标是支持 1000×1000+ 方块范围探索，保持 60 FPS。

## Technical Context

**Language/Version**: TypeScript 5.6 (ES2020 target)  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0  
**Storage**: N/A（内存中，后续可扩展 IndexedDB）  
**Testing**: Vitest（需添加）  
**Target Platform**: Web (WebGL 2.0)，桌面端优先  
**Project Type**: Single（前端 3D 游戏）  
**Performance Goals**: 60 FPS，首屏 < 3s  
**Constraints**: 内存 < 512 MB，可见距离 8-16 区块  
**Scale/Scope**: 无限世界（按需加载），垂直高度 0-128（8 个垂直区块）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. WebGL 渲染优先 | ✅ PASS | 使用 Three.js，渲染逻辑在 renderer/ 模块 |
| II. 区块化世界管理 | ✅ PASS | 本功能核心目标，16×16×16 区块 |
| III. 模块化游戏系统 | ✅ PASS | 区块/地形生成作为独立模块 |
| IV. 响应式输入处理 | ✅ PASS | 不影响，复用现有 input/ 模块 |
| V. 渐进式加载与性能优化 | ✅ PASS | 按需加载区块，实例化渲染 |

**技术栈合规**: TypeScript + Vite + Three.js ✅

## Project Structure

### Documentation (this feature)

```text
specs/002-chunk-terrain-system/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (internal APIs)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── core/
│   ├── Block.ts              # 现有 - 方块类型定义
│   ├── Chunk.ts              # 新增 - 区块数据结构
│   ├── ChunkManager.ts       # 新增 - 区块加载/卸载管理
│   ├── World.ts              # 重构 - 改为基于区块的世界
│   └── Game.ts               # 现有 - 游戏主循环
├── terrain/                  # 新增目录
│   ├── NoiseGenerator.ts     # 新增 - Simplex 噪声封装
│   ├── TerrainGenerator.ts   # 新增 - 地形生成逻辑
│   └── CaveGenerator.ts      # 新增 - 洞穴生成逻辑
├── renderer/
│   ├── ChunkMesh.ts          # 新增 - 单区块网格渲染
│   ├── ChunkRenderer.ts      # 新增 - 多区块渲染管理
│   ├── BlockMesh.ts          # 废弃/重构
│   └── ...                   # 现有文件
├── player/                   # 现有 - 需适配新世界系统
├── input/                    # 现有 - 无需改动
├── ui/                       # 现有 - 无需改动
└── utils/
    └── Raycaster.ts          # 现有 - 需适配区块系统

tests/
├── unit/
│   ├── Chunk.test.ts
│   ├── NoiseGenerator.test.ts
│   └── TerrainGenerator.test.ts
└── integration/
    └── ChunkLoading.test.ts
```

**Structure Decision**: 保持现有 Single project 结构，新增 `terrain/` 目录存放地形生成相关模块，区块系统放在 `core/`。

## Complexity Tracking

> 无宪法违规，无需记录偏离。

---

## Phase Completion Status

| Phase | Status | Artifacts |
|-------|--------|-----------|
| Phase 0: Research | ✅ Complete | [research.md](./research.md) |
| Phase 1: Design | ✅ Complete | [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md) |
| Phase 2: Tasks | ✅ Complete | [tasks.md](./tasks.md) |

### Constitution Re-Check (Post Phase 1)

| Principle | Status | Design Alignment |
|-----------|--------|------------------|
| I. WebGL 渲染优先 | ✅ PASS | ChunkMesh/ChunkRenderer 使用 Three.js InstancedMesh |
| II. 区块化世界管理 | ✅ PASS | 16×16×16 Chunk + ChunkManager 动态加载 |
| III. 模块化游戏系统 | ✅ PASS | terrain/ 独立模块，通过接口解耦 |
| IV. 响应式输入处理 | ✅ PASS | 无影响 |
| V. 渐进式加载与性能优化 | ✅ PASS | 优先级队列加载 + 视锥剔除 + 暴露面渲染 |

**All gates passed. Ready for `/speckit.tasks`.**
