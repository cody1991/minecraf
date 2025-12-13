# Implementation Plan: 基础 3D 方块世界

**Branch**: `001-basic-block-world` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-basic-block-world/spec.md`

## Summary

构建一个基础的 Web 版 Minecraft 原型，支持第一人称视角的 3D 方块世界探索。核心功能包括：
WASD + 鼠标控制的自由移动、左键破坏/右键放置方块、5 种基础方块类型切换。
技术方案采用 TypeScript + Three.js，实现模块化的渲染、输入和世界管理系统。

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Three.js (WebGL 2.0 渲染), Vite (构建工具)
**Storage**: N/A (内存中存储，刷新重置)
**Testing**: Vitest (单元测试)
**Target Platform**: 现代桌面浏览器 (Chrome, Firefox, Safari, Edge)
**Project Type**: Single (纯前端 Web 应用)
**Performance Goals**: ≥ 60 FPS, 首屏加载 < 3s
**Constraints**: 内存 < 512 MB, 世界大小 64×64 方块
**Scale/Scope**: 单人本地游戏, 有限世界

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ Pass | 使用 Three.js 作为渲染引擎 |
| II. 区块化世界管理 | ⚠️ Simplified | MVP 阶段使用简化的单区块世界（64×64），后续扩展为完整区块系统 |
| III. 模块化游戏系统 | ✅ Pass | 渲染、输入、世界管理分离为独立模块 |
| IV. 响应式输入处理 | ✅ Pass | 键鼠输入通过抽象层处理 |
| V. 渐进式加载与性能优化 | ✅ Pass | 使用纹理图集、实例化渲染 |

## Project Structure

### Documentation (this feature)

```text
specs/001-basic-block-world/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for this feature - no API)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── core/
│   ├── Game.ts              # 游戏主循环
│   ├── World.ts             # 世界管理
│   └── Block.ts             # 方块定义
├── renderer/
│   ├── Renderer.ts          # Three.js 渲染器封装
│   ├── Camera.ts            # 第一人称相机
│   ├── BlockMesh.ts         # 方块网格生成
│   └── TextureAtlas.ts      # 纹理图集
├── input/
│   ├── InputManager.ts      # 输入管理器
│   ├── KeyboardInput.ts     # 键盘输入处理
│   └── MouseInput.ts        # 鼠标输入处理
├── player/
│   ├── Player.ts            # 玩家实体
│   ├── Movement.ts          # 移动控制
│   └── BlockInteraction.ts  # 方块交互（放置/破坏）
├── ui/
│   ├── Crosshair.ts         # 准星 UI
│   └── BlockSelector.ts     # 方块选择器 UI
├── utils/
│   ├── Vector3.ts           # 向量工具
│   └── Raycaster.ts         # 射线检测
├── main.ts                  # 入口文件
└── index.html               # HTML 模板

tests/
├── unit/
│   ├── World.test.ts
│   ├── Block.test.ts
│   └── Movement.test.ts
└── integration/
    └── GameLoop.test.ts
```

**Structure Decision**: 采用单项目结构，按功能模块组织代码。渲染、输入、游戏逻辑分离，
符合宪法模块化原则。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 简化区块系统 | MVP 快速验证核心玩法 | 完整区块系统增加 2-3 倍开发时间，可后续迭代 |
