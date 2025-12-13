# Implementation Plan: 修复动物浮空问题

**Branch**: `016-fix-animal-spawning` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/016-fix-animal-spawning/spec.md`

## Summary

修复动物生成位置计算逻辑，确保动物正确站在地面上。当前实现仅使用 `getHeightAt()` 返回的理论高度（基于噪声计算），未考虑洞穴挖空、树木遮挡等实际地形因素。需要改为向下扫描实际方块数据，找到真正的固体地面。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Three.js (WebGL 2.0), Vite  
**Storage**: N/A (内存中的区块数据)  
**Testing**: Vitest (单元测试)  
**Target Platform**: Web 浏览器 (桌面端 60 FPS, 移动端 30 FPS)  
**Project Type**: Single (Web 游戏)  
**Performance Goals**: 区块加载时动物生成不可感知延迟  
**Constraints**: 向下扫描深度需限制以避免性能问题  
**Scale/Scope**: 每区块最多 6 只动物，每次生成尝试 5 个位置

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 不涉及渲染逻辑，仅修改生成位置计算 |
| II. 区块化世界管理 | ✅ 通过 | 使用现有 `world.getBlock()` API 访问区块数据 |
| III. 模块化游戏系统 | ✅ 通过 | 修改仅限于 `AnimalSpawner` 模块 |
| IV. 响应式输入处理 | ✅ 通过 | 不涉及输入处理 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 扫描深度有限制，不影响区块加载性能 |

## Project Structure

### Documentation (this feature)

```text
specs/016-fix-animal-spawning/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── core/
│   ├── Block.ts         # BlockType, isSolid(), isTreeLog(), isTreeLeaves()
│   ├── World.ts         # getBlock(), getHeightAt()
│   └── Chunk.ts         # 区块数据存储
├── entities/
│   ├── AnimalSpawner.ts # 🎯 主要修改文件
│   ├── Animal.ts        # 动物基类
│   └── [Cow|Sheep|...].ts
└── terrain/
    ├── TerrainGenerator.ts
    └── CaveGenerator.ts
```

**Structure Decision**: 单项目结构，修改仅限于 `src/entities/AnimalSpawner.ts`

## Complexity Tracking

> 无违规项，不需要复杂度追踪
