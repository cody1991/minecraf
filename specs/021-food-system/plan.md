# Implementation Plan: 食物系统

**Branch**: `021-food-system` | **Date**: 2025-12-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/021-food-system/spec.md`

## Summary

实现完整的食物系统，包括：玩家左键攻击动物、动物死亡掉落食物、食物自动拾取到物品栏、右键食用食物恢复饥饿值。系统与现有的 `SurvivalManager`、`Inventory`、`Animal` 和 `ItemEntity` 模块集成。

## Technical Context

**Language/Version**: TypeScript 5.6  
**Primary Dependencies**: Three.js 0.170, Vite 6.0  
**Storage**: IndexedDB（现有存档系统）  
**Testing**: 手动测试（项目无自动化测试框架）  
**Target Platform**: Web 浏览器（桌面端 60 FPS，移动端 30 FPS）  
**Project Type**: Single（前端 WebGL 游戏）  
**Performance Goals**: 60 FPS 桌面端，攻击/拾取/进食响应 < 100ms  
**Constraints**: 内存 < 512 MB，无服务器依赖  
**Scale/Scope**: 单人游戏，5 种食物类型，7 种动物

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 食物掉落物使用现有 `ItemEntity` 3D 渲染 |
| II. 区块化世界管理 | ✅ 通过 | 食物掉落物作为实体管理，不影响区块系统 |
| III. 模块化游戏系统 | ✅ 通过 | 新增 `CombatSystem`、`EatingSystem` 独立模块 |
| IV. 响应式输入处理 | ✅ 通过 | 通过现有 `InputManager` 处理攻击和进食输入 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 食物纹理复用现有纹理图集系统 |

**技术标准检查**:
- TypeScript + Vite ✅
- Three.js (WebGL 2.0) ✅
- 性能标准（60 FPS）✅

## Project Structure

### Documentation (this feature)

```text
specs/021-food-system/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - 无 API)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── combat/                    # 新增：战斗系统
│   ├── CombatSystem.ts        # 攻击判定与伤害处理
│   └── CombatConstants.ts     # 战斗相关常量
├── survival/                  # 现有：生存系统
│   ├── EatingSystem.ts        # 新增：进食系统
│   ├── EatingConstants.ts     # 新增：进食相关常量
│   ├── FoodRegistry.ts        # 现有：食物注册表（需扩展）
│   └── SurvivalManager.ts     # 现有：需集成进食系统
├── entities/
│   ├── Animal.ts              # 现有：需添加攻击响应
│   ├── ItemEntity.ts          # 现有：复用食物掉落物
│   └── EntityManager.ts       # 现有：需管理食物掉落
├── player/
│   ├── Inventory.ts           # 现有：已支持食物堆叠
│   └── InventoryConstants.ts  # 现有：可能需扩展
├── ui/
│   └── EatingProgressUI.ts    # 新增：进食进度条
├── audio/
│   └── AudioManager.ts        # 现有：需添加攻击/进食音效
└── core/
    └── Block.ts               # 现有：需添加食物方块类型
```

**Structure Decision**: 采用 Option 1 (Single project)，新增 `combat/` 目录存放战斗系统，扩展现有 `survival/` 目录添加进食系统。

## Complexity Tracking

> 无宪法违规，无需记录复杂度偏离。
