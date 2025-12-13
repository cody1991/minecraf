# Implementation Plan: 生态系统完善 - 动植物扩展

**Branch**: `009-ecosystem-flora-fauna` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-ecosystem-flora-fauna/spec.md`

## Summary

扩展现有的动植物生态系统，包括：
1. **新增陆地动物**：兔子、狼、狐狸（均为被动型，复用现有 Animal 架构）
2. **新增水生动物**：普通鱼、热带鱼（严格限制在水中移动）
3. **新增植物**：4 种花卉（玫瑰、郁金香、雏菊、矢车菊）+ 3 种树木（橡树、桦树、云杉）
4. **密度控制**：动物每区块最多 6 只，树木最小间距 8 格
5. **出生点保护**：斗兽场区域内禁止动植物生成

技术方案基于现有架构扩展：
- 动物系统：继承 `Animal` 基类，复用 `AnimalAI` 状态机
- 鱼类系统：新建 `Fish` 类，实现水中移动逻辑
- 植物系统：扩展 `PlantGenerator` 和 `PlantTypes`，新增 `TreeGenerator`
- 出生点保护：复用 `COLOSSEUM_FLAT_RADIUS` 常量

## Technical Context

**Language/Version**: TypeScript 5.6 (ES2020 target)  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0  
**Storage**: N/A (内存中的区块数据)  
**Testing**: 手动测试 + TypeScript 类型检查  
**Target Platform**: Web 浏览器 (WebGL 2.0)  
**Project Type**: Web 应用 (单页面 3D 游戏)  
**Performance Goals**: 60 FPS (桌面端)  
**Constraints**: 新增动植物不应导致帧率下降  
**Scale/Scope**: 每区块最多 6 只动物，树木最小间距 8 格

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ PASS | 所有新实体使用 Three.js Mesh 渲染 |
| II. 区块化世界管理 | ✅ PASS | 动物通过 EntityManager 按区块管理，植物在区块生成时创建 |
| III. 模块化游戏系统 | ✅ PASS | 新动物继承 Animal 模块，鱼类独立模块，树木独立生成器 |
| IV. 响应式输入处理 | ✅ N/A | 本功能不涉及输入处理 |
| V. 渐进式加载与性能优化 | ✅ PASS | 动物按区块加载/卸载，密度控制确保性能 |

**性能标准检查**:
- 帧率目标 60 FPS ✅ (SC-008 已明确)
- 内存占用 < 512 MB ✅ (密度控制限制实体数量)

## Project Structure

### Documentation (this feature)

```text
specs/009-ecosystem-flora-fauna/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (无 API)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── core/
│   └── World.ts                    # 世界管理（已存在）
├── entities/
│   ├── Entity.ts                   # 实体基类（已存在）
│   ├── EntityManager.ts            # 实体管理器（已存在）
│   ├── Animal.ts                   # 动物基类（已存在）
│   ├── AnimalAI.ts                 # 动物 AI（已存在）
│   ├── AnimalSpawner.ts            # 动物生成器（需修改）
│   ├── AnimalTypes.ts              # 动物类型定义（需修改）
│   ├── Cow.ts                      # 牛（已存在）
│   ├── Sheep.ts                    # 羊（已存在）
│   ├── Pig.ts                      # 猪（已存在）
│   ├── Chicken.ts                  # 鸡（已存在）
│   ├── Rabbit.ts                   # 兔子（新增）
│   ├── Wolf.ts                     # 狼（新增）
│   ├── Fox.ts                      # 狐狸（新增）
│   ├── Fish.ts                     # 鱼类基类（新增）
│   ├── CommonFish.ts               # 普通鱼（新增）
│   ├── TropicalFish.ts             # 热带鱼（新增）
│   └── FishSpawner.ts              # 鱼类生成器（新增）
├── terrain/
│   ├── TerrainGenerator.ts         # 地形生成器（已存在）
│   ├── BiomeGenerator.ts           # 生物群系生成器（已存在）
│   ├── BiomeTypes.ts               # 生物群系类型（已存在）
│   ├── PlantGenerator.ts           # 植物生成器（需修改）
│   ├── PlantTypes.ts               # 植物类型定义（需修改）
│   ├── TreeGenerator.ts            # 树木生成器（新增）
│   ├── TreeTypes.ts                # 树木类型定义（新增）
│   └── ColosseumGenerator.ts       # 斗兽场生成器（已存在，提供保护区常量）
└── ...
```

**Structure Decision**: 遵循现有项目结构，在 `entities/` 目录新增动物类，在 `terrain/` 目录新增树木生成器。

## Complexity Tracking

> 无违规项，所有设计符合宪法原则。
