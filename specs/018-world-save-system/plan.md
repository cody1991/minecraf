# Implementation Plan: 世界存档系统

**Branch**: `018-world-save-system` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/018-world-save-system/spec.md`

## Summary

实现基于 IndexedDB 的世界存档系统，支持手动保存/加载、多存档槽位管理（创建/删除/重命名）、自动保存功能。存档数据包括世界种子、已修改区块的方块数据、玩家状态。UI 集成到现有设置面板中作为新标签页。

## Technical Context

**Language/Version**: TypeScript 5.6  
**Primary Dependencies**: Three.js 0.170, Vite 6.0, 原生 IndexedDB API  
**Storage**: IndexedDB（浏览器本地存储）  
**Testing**: 手动测试 + Vitest（如需单元测试）  
**Target Platform**: 现代浏览器（Chrome、Firefox、Safari、Edge）  
**Project Type**: Web 应用（单页面游戏）  
**Performance Goals**: 保存 ≤3s、加载 ≤5s、自动保存对帧率影响 ≤10%  
**Constraints**: 支持 100+ 已修改区块、5 个手动槽位 + 1 个自动槽位  
**Scale/Scope**: 单用户本地存储，无跨设备同步

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 存档系统与渲染解耦，仅涉及数据持久化 |
| II. 区块化世界管理 | ✅ 通过 | 复用现有 Chunk 系统，仅序列化已修改区块 |
| III. 模块化游戏系统 | ✅ 通过 | 存档系统作为独立模块，通过事件与 Game/World 通信 |
| IV. 响应式输入处理 | ✅ 通过 | UI 交互通过现有输入抽象层 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 自动保存使用异步操作，不阻塞主线程 |

**技术栈要求检查**:
- TypeScript + Vite ✅
- 无需额外依赖（使用原生 IndexedDB API）

## Project Structure

### Documentation (this feature)

```text
specs/018-world-save-system/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── storage/                    # 新增：存档系统模块
│   ├── SaveManager.ts          # 存档管理器（保存/加载/删除）
│   ├── SaveData.ts             # 存档数据结构定义
│   ├── IndexedDBStorage.ts     # IndexedDB 封装层
│   └── AutoSave.ts             # 自动保存逻辑
├── ui/
│   ├── SavePanel.ts            # 新增：存档 UI 面板
│   └── VolumeControl.ts        # 现有：参考 UI 模式
├── core/
│   ├── World.ts                # 修改：添加序列化/反序列化方法
│   ├── Chunk.ts                # 修改：添加 isModified 标记
│   └── Game.ts                 # 修改：集成存档系统
└── player/
    └── Player.ts               # 现有：提取玩家状态
```

**Structure Decision**: 新增 `src/storage/` 模块存放存档相关逻辑，保持与现有模块解耦。UI 组件放在 `src/ui/`，遵循现有模式。

## Constitution Check (Post-Design)

*Re-evaluation after Phase 1 design completion.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 存档系统完全独立于渲染模块 |
| II. 区块化世界管理 | ✅ 通过 | 复用 Chunk 数据结构，仅添加 isModified 标记 |
| III. 模块化游戏系统 | ✅ 通过 | SaveManager 作为独立模块，通过接口与 Game/World 交互 |
| IV. 响应式输入处理 | ✅ 通过 | SavePanel 遵循现有 UI 模式 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 异步 IndexedDB 操作，分批处理大量区块 |

**技术栈验证**:
- TypeScript + Vite ✅
- 原生 IndexedDB API（无额外依赖）✅
- 遵循现有代码模式 ✅

## Complexity Tracking

> 无宪法违规，无需记录。
