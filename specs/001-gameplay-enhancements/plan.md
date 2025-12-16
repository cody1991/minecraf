# Implementation Plan: 基础完善阶段 - 游戏体验增强

**Branch**: `001-gameplay-enhancements` | **Date**: 2025-12-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-gameplay-enhancements/spec.md`

## Summary

实现4个游戏体验增强功能：动物动画系统（行走/站立/受伤/死亡动画）、第一人称手持物品与攻击动画、挖掘系统增强（进度条/裂纹/粒子）、篝火与熟食系统。所有功能基于现有 TypeScript + Three.js 架构扩展，通过程序化动画和粒子系统实现视觉效果。

## Technical Context

**Language/Version**: TypeScript 5.6 + ES2020  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0  
**Storage**: IndexedDB (现有存档系统)  
**Testing**: 手动测试 (项目未配置自动化测试框架)  
**Target Platform**: Web 浏览器 (桌面端优先，支持移动端)  
**Project Type**: Single Web Application  
**Performance Goals**: 60 FPS (桌面端), 30 FPS (移动端)  
**Constraints**: 内存 < 512MB, 无外部资源依赖 (程序化生成)  
**Scale/Scope**: 7种动物 × 4种动画状态, 38+种方块挖掘时间, 5种熟食

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. WebGL 渲染优先 | ✅ PASS | 所有动画和粒子通过 Three.js 实现 |
| II. 区块化世界管理 | ✅ PASS | 篝火方块遵循现有区块系统 |
| III. 模块化游戏系统 | ✅ PASS | 新增独立模块：AnimationSystem, ParticleSystem, MiningSystem, CampfireBlock |
| IV. 响应式输入处理 | ✅ PASS | 复用现有输入系统，无新增输入类型 |
| V. 渐进式加载与性能优化 | ✅ PASS | 程序化动画无额外资源加载，粒子使用对象池 |

### Post-Phase 1 Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. WebGL 渲染优先 | ✅ PASS | 数据模型定义了 Three.js 兼容的动画和粒子结构 |
| II. 区块化世界管理 | ✅ PASS | CampfireState 与世界坐标系统集成 |
| III. 模块化游戏系统 | ✅ PASS | 6 个独立实体，通过事件/回调通信 |
| IV. 响应式输入处理 | ✅ PASS | HandItemState 与输入系统解耦 |
| V. 渐进式加载与性能优化 | ✅ PASS | ParticlePool 实现对象复用 |

**Gate Result**: ✅ ALL PASS - 可继续 Phase 2 (tasks)

## Project Structure

### Documentation (this feature)

```text
specs/001-gameplay-enhancements/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── animation/                    # 新增：动画系统模块
│   ├── AnimationState.ts         # 动画状态枚举和接口
│   ├── AnimalAnimator.ts         # 动物动画控制器
│   └── HandAnimator.ts           # 手持物品动画控制器
├── particles/                    # 新增：粒子系统模块
│   ├── ParticlePool.ts           # 粒子对象池
│   ├── ParticleEmitter.ts        # 粒子发射器
│   ├── BlockParticles.ts         # 方块破碎粒子
│   └── FireParticles.ts          # 火焰粒子
├── mining/                       # 新增：挖掘系统模块
│   ├── MiningConstants.ts        # 方块挖掘时间表
│   ├── MiningProgress.ts         # 挖掘进度管理
│   ├── CrackOverlay.ts           # 裂纹纹理覆盖
│   └── MiningUI.ts               # 挖掘进度条UI
├── blocks/                       # 新增：特殊方块模块
│   ├── CampfireBlock.ts          # 篝火方块逻辑
│   └── CampfireRenderer.ts       # 篝火渲染（火焰粒子）
├── entities/
│   └── Animal.ts                 # 修改：集成动画系统
├── player/
│   ├── BlockInteraction.ts       # 修改：集成挖掘系统
│   └── HandRenderer.ts           # 新增：第一人称手持渲染
├── survival/
│   └── FoodRegistry.ts           # 修改：添加熟食定义
├── core/
│   └── Block.ts                  # 修改：添加篝火和熟食方块类型
└── ui/
    └── MiningProgressBar.ts      # 新增：挖掘进度条组件
```

**Structure Decision**: 采用模块化设计，新增 `animation/`, `particles/`, `mining/`, `blocks/` 四个独立模块，遵循宪法第三条"模块化游戏系统"原则。

## Complexity Tracking

> 无宪法违规，无需记录复杂度偏离。
