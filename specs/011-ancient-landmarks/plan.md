# Implementation Plan: 古代地标建筑群

**Branch**: `011-ancient-landmarks` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/011-ancient-landmarks/spec.md`

## Summary

在罗马斗兽场出生点附近扩展平原区域，添加三座可探索的世界奇观建筑：金字塔（可进入探索的内部迷宫）、故宫（中国古典风格宫殿群）、城堡（欧洲中世纪风格）。采用与 ColosseumGenerator 相同的生成器模式，每个建筑独立实现为 Generator 类，通过 TerrainGenerator 集成。

## Technical Context

**Language/Version**: TypeScript 5.6  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0  
**Storage**: N/A (内存中的区块数据)  
**Testing**: Vitest (按 constitution 要求)  
**Target Platform**: Web (桌面端 60 FPS, 移动端 30 FPS)  
**Project Type**: Web 应用 (单体前端)  
**Performance Goals**: 60 FPS 桌面端, 30 FPS 移动端, 首屏加载 < 3s  
**Constraints**: 内存占用 < 512 MB (桌面), 可见距离 16 区块  
**Scale/Scope**: 3 座新建筑，每座约 40-80 方块尺寸

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. WebGL 渲染优先 | ✅ PASS | 使用现有 Three.js 渲染管线，建筑通过 BlockType 生成 |
| II. 区块化世界管理 | ✅ PASS | 建筑生成器与 ChunkManager 集成，按区块生成 |
| III. 模块化游戏系统 | ✅ PASS | 每个建筑独立 Generator 类，可独立测试 |
| IV. 响应式输入处理 | ✅ N/A | 本功能不涉及输入处理 |
| V. 渐进式加载与性能优化 | ✅ PASS | 建筑随区块按需加载，使用现有纹理图集 |

**Gate Result**: PASS - 可继续 Phase 0

### Post-Design Re-check (Phase 1 完成后)

| Principle | Status | Notes |
|-----------|--------|-------|
| I. WebGL 渲染优先 | ✅ PASS | 新方块类型使用现有渲染管线 |
| II. 区块化世界管理 | ✅ PASS | LandmarkManager 与区块系统集成 |
| III. 模块化游戏系统 | ✅ PASS | 3 个独立生成器 + 1 个管理器 |
| IV. 响应式输入处理 | ✅ N/A | 不涉及 |
| V. 渐进式加载与性能优化 | ✅ PASS | 预计 ~53,000 方块，分布多区块 |

**Post-Design Gate Result**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/011-ancient-landmarks/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── terrain/
│   ├── TerrainGenerator.ts      # [MODIFY] 集成新建筑生成器
│   ├── ColosseumGenerator.ts    # [EXISTING] 参考实现模式
│   ├── PyramidGenerator.ts      # [NEW] 金字塔生成器
│   ├── ForbiddenCityGenerator.ts # [NEW] 故宫生成器
│   ├── CastleGenerator.ts       # [NEW] 城堡生成器
│   └── LandmarkManager.ts       # [NEW] 地标建筑管理器
├── core/
│   ├── Block.ts                 # [MODIFY] 添加新方块类型
│   └── ChunkConstants.ts        # [MODIFY] 扩展平原区域常量
└── renderer/
    ├── BlockTextures.ts         # [MODIFY] 新方块纹理映射
    └── TextureAtlas.ts          # [MODIFY] 新纹理支持

tests/
└── terrain/
    ├── PyramidGenerator.test.ts
    ├── ForbiddenCityGenerator.test.ts
    └── CastleGenerator.test.ts
```

**Structure Decision**: 采用现有单体结构，新增建筑生成器放置于 `src/terrain/` 目录，与 ColosseumGenerator 保持一致的模式。

## Complexity Tracking

> 无 Constitution 违规，无需记录偏离。
