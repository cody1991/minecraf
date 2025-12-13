# Implementation Plan: 声音与地图系统

**Branch**: `012-sound-map-system` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/012-sound-map-system/spec.md`

## Summary

为 WebCraft 游戏添加完整的声音系统（背景音乐、脚步声、摔落音效、动物声音）和地图系统（右上角圆形小地图、左上角坐标显示、M 键全屏大地图）。技术上使用 Web Audio API 实现音频管理，使用 HTML5 Canvas 2D 渲染地图 UI。

## Technical Context

**Language/Version**: TypeScript 5.6 + ES2020  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0, Web Audio API (原生)  
**Storage**: LocalStorage (音量设置持久化)  
**Testing**: Vitest (按 Constitution 要求)  
**Target Platform**: Web Browser (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web 游戏 (单页应用)  
**Performance Goals**: 60 FPS 桌面端, 30 FPS 移动端 (按 Constitution)  
**Constraints**: 音频延迟 <50ms, 小地图刷新 10+ FPS, 大地图打开 <500ms  
**Scale/Scope**: 单人游戏，无限世界，多种动物类型

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 地图 UI 使用 Canvas 2D 叠加层，不影响 WebGL 渲染管线 |
| II. 区块化世界管理 | ✅ 通过 | 小地图从现有区块数据读取，无需修改区块系统 |
| III. 模块化游戏系统 | ✅ 通过 | AudioManager 和 MapSystem 作为独立模块，通过事件通信 |
| IV. 响应式输入处理 | ✅ 通过 | M 键通过现有 InputManager 处理 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 音频按需加载，地图使用缓存渲染 |

**性能标准检查**:
- 帧率目标: 60/30 FPS - 新增系统不应影响渲染帧率
- 内存占用: 音频资源预估 <10MB，地图缓存 <5MB

## Project Structure

### Documentation (this feature)

```text
specs/012-sound-map-system/
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
├── audio/                    # 新增：声音系统模块
│   ├── AudioManager.ts       # 音频管理器核心
│   ├── SoundEffect.ts        # 音效封装类
│   ├── AudioTypes.ts         # 音频类型定义
│   └── AudioSettings.ts      # 音量设置与持久化
├── ui/                       # 扩展：UI 模块
│   ├── MiniMap.ts            # 新增：右上角小地图
│   ├── WorldMap.ts           # 新增：全屏大地图
│   ├── CoordinateDisplay.ts  # 新增：坐标显示
│   ├── VolumeControl.ts      # 新增：音量控制 UI
│   ├── BlockSelector.ts      # 现有
│   ├── Crosshair.ts          # 现有
│   └── FpsCounter.ts         # 现有
├── core/
│   └── Game.ts               # 修改：集成 AudioManager 和 MapSystem
├── player/
│   └── Player.ts             # 修改：触发移动/摔落音效事件
└── entities/
    └── Animal.ts             # 修改：触发动物声音事件

public/
└── audio/                    # 新增：音频资源目录
    ├── music/                # 背景音乐
    ├── footsteps/            # 脚步声
    ├── effects/              # 音效（摔落等）
    └── animals/              # 动物声音
```

**Structure Decision**: 遵循现有单项目结构，新增 `src/audio/` 模块和扩展 `src/ui/` 模块。音频资源放在 `public/audio/` 目录。

## Constitution Re-Check (Post Phase 1)

*验证设计阶段产出是否仍符合 Constitution 原则*

| 原则 | 状态 | Phase 1 验证 |
|------|------|--------------|
| I. WebGL 渲染优先 | ✅ 通过 | data-model.md 确认地图使用 Canvas 2D 叠加层 |
| II. 区块化世界管理 | ✅ 通过 | 地图从 World/ChunkManager 读取数据，不修改区块结构 |
| III. 模块化游戏系统 | ✅ 通过 | AudioManager 单例模式，MiniMap/WorldMap 独立组件 |
| IV. 响应式输入处理 | ✅ 通过 | 通过现有 InputManager 处理 M 键 |
| V. 渐进式加载与性能优化 | ✅ 通过 | research.md 确认预加载策略和缓存渲染 |

**结论**: 所有 Constitution 原则通过，可进入 Phase 2 任务分解。

## Complexity Tracking

> 无违规，不需要记录。

## Generated Artifacts

| 文件 | 状态 | 说明 |
|------|------|------|
| plan.md | ✅ 完成 | 本文件 |
| research.md | ✅ 完成 | 10 个技术决策 |
| data-model.md | ✅ 完成 | 音频和地图系统实体定义 |
| quickstart.md | ✅ 完成 | 快速开始指南 |
| contracts/ | ✅ 完成 | N/A - 无外部 API |
| tasks.md | ✅ 完成 | 52 个任务，7 个用户故事 |
