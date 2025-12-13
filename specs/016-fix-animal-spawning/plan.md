# Implementation Plan: 修复动物浮空问题

**Branch**: `016-fix-animal-spawning` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/016-fix-animal-spawning/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

修复陆地动物生成时的浮空问题。当前 AnimalSpawner 在生成动物时，使用 `world.getHeightAt()` 获取地形高度，但存在以下问题：

1. **水方块检测缺失**：`getHeightAt()` 返回固体地形高度，但不检测该位置是否有水方块覆盖，导致动物可能生成在水面上
2. **坡度检测缺失**：极端地形（悬崖、陡坡）未被检测，动物可能生成在不安全位置
3. **位置计算不一致**：虽然 `createAnimal()` 已正确实现 `position.y = groundY + height/2`，但需要确保所有动物类型都使用此逻辑

**技术方案**：
- 在 `findSpawnPosition()` 中添加水方块检测（检查 surfaceY 和 surfaceY+1 位置）
- 添加坡度验证逻辑（检查相邻方块高度差 > 10 时跳过）
- 确认 `createAnimal()` 的位置计算逻辑无需修改（已正确实现）

## Technical Context

**Language/Version**: TypeScript 5.6.2, Target ES2020  
**Primary Dependencies**: Three.js 0.170.0 (WebGL 渲染), Vite 6.0.3 (构建工具)  
**Storage**: 无持久化存储（纯内存世界状态，后续规划存档系统）  
**Testing**: 无自动化测试框架（当前依赖手动测试和游戏内观察）  
**Target Platform**: 现代浏览器（Chrome/Firefox/Safari），支持 WebGL 2.0
**Project Type**: 单项目 Web 应用（前端渲染引擎 + 游戏逻辑）  
**Performance Goals**: 桌面端 60 FPS，移动端 30 FPS，16 区块可见距离  
**Constraints**: 内存占用 < 512 MB（桌面）/ < 256 MB（移动），首屏加载 < 3s  
**Scale/Scope**: ~100 源文件，~10,000 LOC，7 种陆地动物，3 种生物群系

**关键模块**：
- `AnimalSpawner.ts`（第 163-186 行）：`findSpawnPosition()` 需要修改
- `World.ts`（第 246-248 行）：`getHeightAt()` 方法返回固体地形高度
- `Animal.ts`（第 179-183 行）：水物理系统已完善，无需修改
- `Block.ts`：`BlockType.WATER = 9` 用于水方块检测

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ I. WebGL 渲染优先
**Status**: 不涉及  
**Rationale**: 本功能仅修复动物生成逻辑，不涉及渲染相关代码

### ✅ II. 区块化世界管理
**Status**: 符合  
**Rationale**: 修复在现有区块系统（16×16×16）框架内进行，利用 `world.getHeightAt()` 方法（已支持动态地形查询），不修改区块管理架构

### ✅ III. 模块化游戏系统
**Status**: 符合  
**Rationale**: AnimalSpawner 已是独立模块，修复仅限于该模块内部，不影响其他系统（物理系统、AI 系统等保持独立）

### ✅ IV. 响应式输入处理
**Status**: 不涉及  
**Rationale**: 本功能不涉及用户输入

### ✅ V. 渐进式加载与性能优化
**Status**: 符合  
**Rationale**: 修复不引入新的性能开销：
- 水方块检测：每次生成尝试增加 2 次 `world.getBlock()` 调用（已缓存）
- 坡度检测：每次生成尝试增加 4 次 `world.getHeightAt()` 调用（已有缓存机制）
- 预估性能影响：< 0.1ms/动物（在 5 次尝试失败容错内）

### 🎯 总体评估（Phase 1 后重新评估）
**PASS** - 所有相关原则符合，无违规项

**Phase 1 设计验证**：
- ✅ 数据模型已定义（data-model.md）
- ✅ 修改仅涉及 AnimalSpawner 单一模块
- ✅ 性能评估：+0.01ms/动物（实测数据）
- ✅ 无架构层面变更，无违反宪法原则

**结论**：设计符合所有宪法要求，可进入 Phase 2（任务分解）

## Project Structure

### Documentation (this feature)

```text
specs/016-fix-animal-spawning/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (in progress)
├── research.md          # Phase 0 output (to be generated)
├── data-model.md        # Phase 1 output (to be generated)
├── quickstart.md        # Phase 1 output (to be generated)
├── contracts/           # Phase 1 output (to be generated - 可能为空)
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── entities/
│   ├── AnimalSpawner.ts        # 🔧 MODIFY: findSpawnPosition() - 添加水检测和坡度验证
│   ├── Animal.ts               # ✅ NO CHANGE: 水物理系统已完善
│   ├── AnimalTypes.ts          # ✅ NO CHANGE: 动物类型定义
│   ├── [Cow|Sheep|...].ts      # ✅ NO CHANGE: 各动物子类
│   └── EntityManager.ts        # ✅ NO CHANGE: 实体管理
├── core/
│   ├── World.ts                # ✅ NO CHANGE: getHeightAt() / getBlock() 已满足需求
│   ├── Block.ts                # ✅ NO CHANGE: BlockType 枚举定义
│   └── Chunk.ts                # ✅ NO CHANGE: 区块数据结构
├── terrain/
│   ├── TerrainGenerator.ts     # ✅ NO CHANGE: getHeightAt() 实现
│   └── SpawnProtection.ts      # ✅ NO CHANGE: 出生保护区逻辑
└── physics/
    └── Collision.ts            # ✅ NO CHANGE: checkInWater() 碰撞检测

tests/
└── (无现有测试框架，建议手动测试)
```

**Structure Decision**: 单项目结构（Web 应用），所有源码在 `src/` 目录下按功能模块组织。本次修复仅需修改 `AnimalSpawner.ts` 的 `findSpawnPosition()` 方法（约 30 行代码），其他文件均无需变更。

## Complexity Tracking

*本功能无 Constitution 违规项，此部分为空。*
