# Implementation Plan: 合成与工具系统

**Branch**: `023-crafting-tools-system` | **Date**: 2025-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/023-crafting-tools-system/spec.md`

## Summary

实现完整的合成与工具系统，包括：
1. **合成系统**：2×2 手持合成格（物品栏内）+ 3×3 工作台合成格，支持形状配方和无形状配方
2. **工作台方块**：可放置、可交互、右键打开合成界面
3. **工具系统**：4 等级（木/石/铁/钻石）× 5 类型（镐/斧/锹/剑/锄），影响挖掘速度，具有耐久度
4. **熔炉系统**：可放置熔炉方块，支持燃料冶炼，后台持续运行

技术方案基于现有的物品栏系统（`Inventory.ts`、`InventoryUI.ts`）扩展，复用拖拽交互机制。

## Technical Context

**Language/Version**: TypeScript 5.6.2 (ES2020 target)  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0.3  
**Storage**: 内存状态 + IndexedDB（存档系统已有）  
**Testing**: 手动测试 + 类型检查（tsc --noEmit）  
**Target Platform**: Web 浏览器（桌面端优先）  
**Project Type**: Single（前端 SPA 游戏）  
**Performance Goals**: 60 FPS，合成界面响应 < 16ms  
**Constraints**: 内存 < 512MB，无外部服务依赖  
**Scale/Scope**: 单人游戏，约 20 种合成配方，20 种工具

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ Pass | 工作台/熔炉方块使用 Three.js 渲染，UI 使用 DOM |
| II. 区块化世界管理 | ✅ Pass | 工作台/熔炉作为方块存储在区块中 |
| III. 模块化游戏系统 | ✅ Pass | 合成系统、工具系统、熔炉系统作为独立模块 |
| IV. 响应式输入处理 | ✅ Pass | 复用现有 InputManager 的右键交互 |
| V. 渐进式加载与性能优化 | ✅ Pass | 配方数据静态定义，无需动态加载 |

**技术标准检查**:
- TypeScript + Vite ✅
- Three.js (WebGL 2.0) ✅
- 60 FPS 目标 ✅

## Project Structure

### Documentation (this feature)

```text
specs/023-crafting-tools-system/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (内部接口定义)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── crafting/                    # 新增：合成系统模块
│   ├── CraftingRecipe.ts        # 配方数据结构
│   ├── RecipeRegistry.ts        # 配方注册表
│   ├── CraftingMatcher.ts       # 配方匹配逻辑
│   └── recipes/                 # 预定义配方
│       ├── BasicRecipes.ts      # 基础配方（木板、木棍、工作台）
│       ├── ToolRecipes.ts       # 工具配方
│       └── FurnaceRecipes.ts    # 熔炉配方
├── tools/                       # 新增：工具系统模块
│   ├── ToolTypes.ts             # 工具类型定义
│   ├── ToolProperties.ts        # 工具属性（耐久度、速度倍率）
│   └── ToolSystem.ts            # 工具使用逻辑
├── furnace/                     # 新增：熔炉系统模块
│   ├── Furnace.ts               # 熔炉实体
│   ├── FurnaceManager.ts        # 熔炉管理器
│   ├── SmeltingRecipe.ts        # 冶炼配方
│   └── FuelRegistry.ts          # 燃料注册表
├── ui/                          # 现有：UI 模块
│   ├── InventoryUI.ts           # 修改：添加 2×2 合成格
│   ├── CraftingTableUI.ts       # 新增：3×3 合成界面
│   ├── FurnaceUI.ts             # 新增：熔炉界面
│   └── DurabilityBar.ts         # 新增：耐久度显示
├── core/
│   └── Block.ts                 # 修改：添加工作台、熔炉、工具类型
├── player/
│   ├── Inventory.ts             # 修改：支持工具耐久度
│   ├── DiggingManager.ts        # 修改：工具速度加成
│   └── BlockInteraction.ts      # 修改：右键交互工作台/熔炉
└── renderer/
    └── BlockTextures.ts         # 修改：添加工作台、熔炉纹理
```

**Structure Decision**: 采用模块化目录结构，新增 `crafting/`、`tools/`、`furnace/` 三个独立模块，遵循宪法第 III 条"模块化游戏系统"原则。

## Complexity Tracking

无违规项，符合宪法所有原则。
