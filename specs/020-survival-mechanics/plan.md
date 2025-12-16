# Implementation Plan: 生存机制

**Branch**: `020-survival-mechanics` | **Date**: 2025-12-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/020-survival-mechanics/spec.md`

## Summary

实现完整的生存机制系统，包括：
- **生命值系统**: 20 点生命值（10 颗心）、受伤红屏效果、0.5 秒无敌时间
- **死亡重生系统**: 死亡画面、重生按钮、传送至出生点
- **饥饿值系统**: 20 点饥饿值（10 格）、跑步/跳跃消耗、影响生命恢复
- **食物系统**: 动物击杀掉落生肉、进食恢复饥饿值
- **环境伤害系统**: 摔落、溺水、岩浆、仙人掌伤害

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Three.js (渲染)、Vite (构建)  
**Storage**: IndexedDB (存档系统已存在)  
**Testing**: Vitest (已配置)  
**Target Platform**: Web (桌面端优先，支持移动端)  
**Project Type**: Web 游戏  
**Performance Goals**: 60 FPS (桌面端)、30 FPS (移动端)  
**Constraints**: 生存机制更新不应影响帧率  
**Scale/Scope**: 单人游戏

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | UI 使用 HTML/CSS 叠加层，不影响 WebGL 渲染 |
| II. 区块化世界管理 | ✅ 通过 | 生存系统与区块系统解耦，仅读取方块类型判断伤害 |
| III. 模块化游戏系统 | ✅ 通过 | 创建独立的 survival/ 模块，通过事件系统通信 |
| IV. 响应式输入处理 | ✅ 通过 | 进食操作通过现有输入抽象层处理 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 生存系统计算轻量，不需要 Web Worker |

**Constitution Check 结果**: ✅ 全部通过

## Project Structure

### Documentation (this feature)

```text
specs/020-survival-mechanics/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - 无外部 API)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── survival/                    # 新增：生存机制模块
│   ├── index.ts                 # 模块导出
│   ├── PlayerStats.ts           # 玩家生存状态（生命值、饥饿值、氧气值）
│   ├── DamageSystem.ts          # 伤害系统（统一伤害处理）
│   ├── HungerSystem.ts          # 饥饿系统（消耗、恢复逻辑）
│   ├── HealthRegenSystem.ts     # 生命恢复系统
│   ├── EnvironmentDamage.ts     # 环境伤害（摔落、溺水、岩浆、仙人掌）
│   └── FoodRegistry.ts          # 食物注册表（类型、恢复值）
├── entities/
│   ├── Animal.ts                # 修改：添加生命值、受伤、死亡逻辑
│   └── AnimalTypes.ts           # 修改：添加动物生命值配置
├── player/
│   ├── Player.ts                # 修改：集成 PlayerStats
│   └── Inventory.ts             # 修改：添加食物使用方法
├── ui/
│   ├── HealthBar.ts             # 新增：生命值 UI（10 颗心）
│   ├── HungerBar.ts             # 新增：饥饿值 UI（10 格）
│   ├── DamageOverlay.ts         # 新增：受伤红屏效果
│   └── DeathScreen.ts           # 新增：死亡画面 UI
├── core/
│   └── Block.ts                 # 修改：添加 LAVA、CACTUS 方块类型（如不存在）
└── audio/
    └── AudioManager.ts          # 修改：添加进食音效
```

**Structure Decision**: 创建独立的 `survival/` 模块封装所有生存机制逻辑，遵循模块化原则。UI 组件放在 `ui/` 目录保持一致性。

## Complexity Tracking

> 无违规项，不需要记录。

