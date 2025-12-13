# Implementation Plan: 物理与碰撞系统 (Physics & Collision System)

**Branch**: `003-physics-collision` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-physics-collision/spec.md`

## Summary

实现玩家物理系统，包括重力下落、与方块的AABB碰撞检测、以及跳跃功能。系统将扩展现有的 `Movement` 类，添加垂直方向的物理模拟，确保玩家无法穿过固体方块，并支持墙壁滑动。

## Technical Context

**Language/Version**: TypeScript 5.6 (ES2020 target)  
**Primary Dependencies**: Three.js 0.170.0  
**Storage**: N/A (内存中状态)  
**Testing**: Vitest (待配置)  
**Target Platform**: Web (桌面端 WebGL 2.0)  
**Project Type**: Web 应用 (单体前端)  
**Performance Goals**: 60 FPS 稳定运行  
**Constraints**: 物理计算每帧 < 2ms，与渲染循环同步  
**Scale/Scope**: 单玩家，无限区块世界

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 物理系统与渲染解耦，不涉及渲染逻辑 |
| II. 区块化世界管理 | ✅ 通过 | 复用现有 World/Chunk 系统进行碰撞检测 |
| III. 模块化游戏系统 | ✅ 通过 | 物理系统作为独立模块，通过事件/接口与其他系统通信 |
| IV. 响应式输入处理 | ✅ 通过 | 复用现有 InputManager，添加跳跃输入处理 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 仅检测玩家附近方块，不影响整体性能 |

**Gate Status**: ✅ 全部通过

## Project Structure

### Documentation (this feature)

```text
specs/003-physics-collision/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── core/
│   ├── Block.ts           # 现有 - 方块类型定义
│   ├── Chunk.ts           # 现有 - 区块数据
│   ├── World.ts           # 现有 - 世界管理
│   └── ...
├── physics/               # 新增 - 物理系统模块
│   ├── PhysicsSystem.ts   # 物理系统主类
│   ├── Gravity.ts         # 重力计算
│   ├── Collision.ts       # 碰撞检测
│   └── AABB.ts            # 轴对齐包围盒工具
├── player/
│   ├── Player.ts          # 现有 - 添加 isGrounded 状态
│   └── Movement.ts        # 现有 - 集成物理系统
├── input/
│   ├── InputManager.ts    # 现有 - 添加跳跃输入
│   └── KeyboardInput.ts   # 现有 - 添加空格键映射
└── ...

tests/
├── unit/
│   └── physics/
│       ├── Gravity.test.ts
│       ├── Collision.test.ts
│       └── AABB.test.ts
└── integration/
    └── physics/
        └── PhysicsSystem.test.ts
```

**Structure Decision**: 新增 `src/physics/` 模块目录，遵循现有模块化结构。物理系统作为独立模块，通过接口与 Player 和 World 交互。

## Complexity Tracking

> 无违规项，无需记录。
