# Implementation Plan: 随机地形生成与冲刺移动

**Branch**: `006-random-terrain-generation` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-random-terrain-generation/spec.md`

## Summary

实现随机地形生成系统和玩家冲刺移动功能。每次新游戏使用随机种子生成包含湖泊、山脉、平原等多样化生物群系的地形，同时保持罗马斗兽场在固定位置。玩家可按住 Shift 键以 1.5 倍速度冲刺移动。

## Technical Context

**Language/Version**: TypeScript 5.6  
**Primary Dependencies**: Three.js 0.170, Vite 6.0  
**Storage**: N/A (内存中生成，无持久化)  
**Testing**: Vitest (待配置)  
**Target Platform**: Web (桌面端 60 FPS, 移动端 30 FPS)  
**Project Type**: Single (Web 游戏)  
**Performance Goals**: 60 FPS 桌面端, 30 FPS 移动端, 地形生成不阻塞主线程  
**Constraints**: 内存 < 512MB, 首屏加载 < 3s, 可见距离 16 区块

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 使用现有 Three.js 渲染管线，新增水方块渲染 |
| II. 区块化世界管理 | ✅ 通过 | 扩展现有 TerrainGenerator，保持 16×256×16 区块结构 |
| III. 模块化游戏系统 | ✅ 通过 | BiomeGenerator 作为独立模块，冲刺逻辑封装在 Movement 模块 |
| IV. 响应式输入处理 | ✅ 通过 | 扩展 InputState 添加 sprint 状态，通过现有输入抽象层 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 生物群系噪声可缓存，水渲染使用透明渲染器 |

**Gate Result**: ✅ 全部通过，无违规项

## Project Structure

### Documentation (this feature)

```text
specs/006-random-terrain-generation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── core/
│   ├── Block.ts           # 已有 WATER 类型
│   ├── World.ts           # 修改：随机种子初始化
│   └── ChunkConstants.ts  # 可能新增生物群系配置
├── terrain/
│   ├── TerrainGenerator.ts    # 修改：集成生物群系
│   ├── BiomeGenerator.ts      # 新增：生物群系生成器
│   ├── NoiseGenerator.ts      # 现有：已支持种子
│   └── ColosseumGenerator.ts  # 现有：保持不变
├── player/
│   ├── Player.ts          # 修改：添加冲刺速度常量
│   └── Movement.ts        # 修改：冲刺逻辑
├── input/
│   ├── InputManager.ts    # 修改：添加 sprint 状态
│   └── KeyboardInput.ts   # 现有：已支持 Shift 检测
└── renderer/
    └── TransparentRenderer.ts  # 现有：水渲染支持

tests/
└── unit/
    ├── BiomeGenerator.test.ts  # 新增
    └── Movement.test.ts        # 新增/扩展
```

**Structure Decision**: 单项目结构，扩展现有 `src/terrain/` 模块添加生物群系生成器，修改 `src/player/` 模块支持冲刺。
