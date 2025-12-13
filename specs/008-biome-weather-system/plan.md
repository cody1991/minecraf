# Implementation Plan: 生物、植物与天气系统

**Branch**: `008-biome-weather-system` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-biome-weather-system/spec.md`

## Summary

为 WebCraft 添加生物系统（牛、羊、猪、鸡）、植物系统（花朵、高草、蘑菇、枯灌木、仙人掌）和天气系统（昼夜循环、太阳/月亮、下雨效果）。技术方案基于现有的 Three.js 渲染架构，采用实体组件模式管理动物 AI，使用粒子系统实现雨滴效果，通过着色器实现动态天空。

## Technical Context

**Language/Version**: TypeScript 5.6.2  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0.3  
**Storage**: N/A（内存状态，无持久化）  
**Testing**: 手动测试（项目当前无测试框架配置）  
**Target Platform**: Web 浏览器（桌面端优先）  
**Project Type**: Web 应用（单项目结构）  
**Performance Goals**: 60 FPS（桌面端），30 FPS（移动端），50 只动物场景保持 30+ FPS  
**Constraints**: 内存 < 512MB，动物每区块最多 4 只，雨滴粒子数量需限制  
**Scale/Scope**: 4 种动物类型，5 种植物类型，2 种天气状态（晴/雨）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 使用 Three.js 渲染动物、植物、天空、雨滴 |
| II. 区块化世界管理 | ✅ 通过 | 动物/植物跟随区块加载/卸载，每区块限制 4 只动物 |
| III. 模块化游戏系统 | ✅ 通过 | 生物系统、植物系统、天气系统作为独立模块 |
| IV. 响应式输入处理 | ✅ 通过 | 无新增输入需求 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 动物使用实例化渲染，雨滴使用粒子系统 |

**技术栈要求检查**:
- TypeScript + Vite ✅
- Three.js (WebGL 2.0) ✅
- 性能标准：60 FPS 桌面端 / 30 FPS 移动端 ✅

## Project Structure

### Documentation (this feature)

```text
specs/008-biome-weather-system/
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
├── core/
│   ├── Game.ts              # 修改：集成天气系统和生物管理器
│   └── World.ts             # 修改：植物生成集成
├── entities/                # 新增：实体系统
│   ├── Entity.ts            # 基础实体类
│   ├── Animal.ts            # 动物基类
│   ├── Cow.ts               # 牛
│   ├── Sheep.ts             # 羊
│   ├── Pig.ts               # 猪
│   ├── Chicken.ts           # 鸡
│   ├── AnimalAI.ts          # 动物 AI 行为
│   └── EntityManager.ts     # 实体管理器
├── terrain/
│   ├── BiomeTypes.ts        # 修改：添加植物配置
│   ├── PlantGenerator.ts    # 新增：植物生成器
│   └── PlantTypes.ts        # 新增：植物类型定义
├── weather/                 # 新增：天气系统
│   ├── WeatherSystem.ts     # 天气状态管理
│   ├── TimeSystem.ts        # 游戏时间管理
│   ├── SkyRenderer.ts       # 天空渲染（太阳/月亮/星星）
│   └── RainEffect.ts        # 雨滴粒子效果
├── renderer/
│   ├── Renderer.ts          # 修改：动态光照支持
│   ├── AnimalRenderer.ts    # 新增：动物渲染
│   └── PlantRenderer.ts     # 新增：植物渲染
└── ...
```

**Structure Decision**: 采用现有单项目结构，新增 `entities/` 和 `weather/` 目录组织新功能模块。

## Complexity Tracking

> 无宪法违规，无需记录复杂度偏离。
