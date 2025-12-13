# Implementation Plan: 方块音效系统

**Branch**: `017-block-sound-effects` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/017-block-sound-effects/spec.md`

## Summary

为方块破坏和放置操作添加音效反馈。系统将 38 种方块类型映射到 6 种音效类别（石头、木头、泥土、沙子、玻璃、植物），使用程序化合成音效（SynthAudio）生成，与现有音量控制系统集成，包含 50ms 节流防止音频过载。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Three.js, Web Audio API, Vite  
**Storage**: N/A（无持久化需求）  
**Testing**: Vitest（单元测试）  
**Target Platform**: Web (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web 游戏（单体应用）  
**Performance Goals**: 60 FPS 桌面端，音效响应 < 100ms  
**Constraints**: 音效节流 50ms，内存占用 < 512MB  
**Scale/Scope**: 38 种方块类型，6 种音效类别

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 音效系统独立于渲染，不影响渲染性能 |
| II. 区块化世界管理 | ✅ 通过 | 不涉及区块系统修改 |
| III. 模块化游戏系统 | ✅ 通过 | 扩展现有 AudioManager，通过事件/回调通信 |
| IV. 响应式输入处理 | ✅ 通过 | 音效由方块交互触发，不直接处理输入 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 使用程序化合成，无需额外资源加载 |

**技术栈要求检查**:
- ✅ TypeScript + Vite
- ✅ Web Audio API（已有 AudioManager）
- ✅ 符合性能标准（60 FPS 目标）

## Project Structure

### Documentation (this feature)

```text
specs/017-block-sound-effects/
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
├── audio/
│   ├── AudioManager.ts      # 扩展：添加方块音效播放方法
│   ├── AudioTypes.ts        # 扩展：添加方块音效类型定义
│   ├── SynthAudio.ts        # 扩展：添加方块音效合成函数
│   └── BlockSoundThrottle.ts # 新增：音效节流管理器
├── player/
│   └── BlockInteraction.ts  # 修改：触发音效播放
└── core/
    └── Block.ts             # 参考：方块类型定义（只读）
```

**Structure Decision**: 扩展现有 `src/audio/` 模块，在 `BlockInteraction.ts` 中集成音效触发逻辑。

## Complexity Tracking

> 无违规项，设计符合宪法所有原则。
