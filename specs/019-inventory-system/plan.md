# Implementation Plan: 物品与背包系统

**Branch**: `019-inventory-system` | **Date**: 2025-12-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/019-inventory-system/spec.md`

## Summary

实现完整的物品与背包系统，包括：
1. **物品掉落系统** - 方块破坏时生成物品实体，具有物理效果和自动拾取功能
2. **背包系统** - 36格背包（9快捷栏+27存储格），支持物品堆叠和拖拽整理
3. **快捷栏优化** - 底部UI显示物品图标和数量，支持数字键和滚轮切换

技术方案：扩展现有 Entity 系统创建 ItemEntity，新增 Inventory 类管理物品存储，重构 BlockSelector 为完整的快捷栏UI。

## Technical Context

**Language/Version**: TypeScript 5.6 (ES2020 target)  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0  
**Storage**: IndexedDB (现有 SaveManager 系统)  
**Testing**: Vitest (项目配置)  
**Target Platform**: Web (Desktop/Mobile)
**Project Type**: Single (Web Game)  
**Performance Goals**: 60 FPS (桌面), 30 FPS (移动)  
**Constraints**: <512MB 内存, 物品实体生成 <0.1s, 拾取响应 <0.2s  
**Scale/Scope**: 单人游戏，同屏最多数百个物品实体

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Check (Phase 0)

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 符合 | 物品实体使用 Three.js 渲染，与现有 Entity 系统一致 |
| II. 区块化世界管理 | ✅ 符合 | ItemEntity 将集成到 EntityManager 的区块管理中 |
| III. 模块化游戏系统 | ✅ 符合 | Inventory 作为独立模块，通过事件与其他系统通信 |
| IV. 响应式输入处理 | ✅ 符合 | 快捷栏输入通过 InputManager 统一处理 |
| V. 渐进式加载与性能优化 | ✅ 符合 | 物品实体使用实例化渲染，纹理复用方块纹理图集 |

**Gate Status**: ✅ PASS

### Post-Design Check (Phase 1)

| 原则 | 状态 | 设计验证 |
|------|------|----------|
| I. WebGL 渲染优先 | ✅ 符合 | ItemEntity 使用 Three.js BoxGeometry，复用方块纹理 |
| II. 区块化世界管理 | ✅ 符合 | ItemEntity 继承 Entity，由 EntityManager 按区块管理 |
| III. 模块化游戏系统 | ✅ 符合 | Inventory 独立模块，通过 IInventory 接口解耦 |
| IV. 响应式输入处理 | ✅ 符合 | 数字键/滚轮通过 InputManager 处理，E 键切换背包 |
| V. 渐进式加载与性能优化 | ✅ 符合 | 限制 500 个物品实体，复用纹理图集 |

**Gate Status**: ✅ PASS - 设计符合所有宪法原则

## Project Structure

### Documentation (this feature)

```text
specs/019-inventory-system/
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
├── core/
│   └── Block.ts              # 现有 - 方块类型定义
├── entities/
│   ├── Entity.ts             # 现有 - 实体基类
│   ├── EntityManager.ts      # 现有 - 实体管理器
│   └── ItemEntity.ts         # 新增 - 物品实体类
├── player/
│   ├── Player.ts             # 修改 - 添加背包引用
│   ├── BlockInteraction.ts   # 修改 - 破坏方块时生成物品
│   └── Inventory.ts          # 新增 - 背包系统
├── ui/
│   ├── BlockSelector.ts      # 重构 → HotbarUI.ts
│   ├── HotbarUI.ts           # 新增 - 快捷栏UI（替代BlockSelector）
│   └── InventoryUI.ts        # 新增 - 背包界面
├── audio/
│   └── SynthAudio.ts         # 修改 - 添加拾取音效
└── storage/
    └── SaveData.ts           # 修改 - 添加背包数据结构
```

**Structure Decision**: 遵循现有单项目结构，新增文件放入对应功能模块目录。

## Complexity Tracking

> 无违规项，无需记录
