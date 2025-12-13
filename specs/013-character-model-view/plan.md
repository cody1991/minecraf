# Implementation Plan: 人物模型与视角切换系统

**Branch**: `013-character-model-view` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/013-character-model-view/spec.md`

## Summary

实现第一人称/第三人称视角切换系统（V 键触发），以及方块人风格的角色模型库。玩家可在游戏开始前选择角色模型，第三人称视角下显示完整角色，摄像机默认距离 5 米并支持碰撞检测避免穿墙。

## Technical Context

**Language/Version**: TypeScript 5.6 + ES2020  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0  
**Storage**: LocalStorage（玩家偏好）  
**Testing**: Vitest（宪法要求）  
**Target Platform**: Web 浏览器（桌面端 60 FPS，移动端 30 FPS）  
**Project Type**: Single（Web 游戏）  
**Performance Goals**: 视角切换 < 0.3s，角色选择界面加载 < 2s，60 FPS 渲染  
**Constraints**: 内存 < 512 MB（桌面端），模型加载 < 2s  
**Scale/Scope**: 5+ 方块人风格角色模型

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 使用 Three.js 渲染角色模型，与现有渲染系统一致 |
| II. 区块化世界管理 | ✅ 不适用 | 本功能不涉及区块系统 |
| III. 模块化游戏系统 | ✅ 通过 | 视角系统、模型库、角色选择 UI 作为独立模块实现 |
| IV. 响应式输入处理 | ✅ 通过 | V 键通过现有 InputManager 处理，与游戏逻辑分离 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 模型按需加载，使用实例化渲染优化 |

**技术栈要求检查**:
- TypeScript + Vite ✅
- Three.js (WebGL 2.0) ✅
- 性能标准：60 FPS 桌面端 ✅

## Project Structure

### Documentation (this feature)

```text
specs/013-character-model-view/
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
├── player/
│   ├── Player.ts              # 现有 - 添加角色模型引用
│   ├── CharacterModel.ts      # 新增 - 角色模型类
│   └── CharacterModelLibrary.ts # 新增 - 模型库管理
├── renderer/
│   ├── Camera.ts              # 现有 - 扩展支持第三人称
│   ├── CameraController.ts    # 新增 - 视角切换控制器
│   └── ThirdPersonCamera.ts   # 新增 - 第三人称摄像机逻辑
├── ui/
│   ├── CharacterSelectUI.ts   # 新增 - 角色选择界面
│   └── CharacterPreview.ts    # 新增 - 模型预览渲染
├── input/
│   └── InputManager.ts        # 现有 - 添加 V 键处理
└── models/                    # 新增 - 模型定义目录
    ├── index.ts               # 模型注册
    └── blockman/              # 方块人模型
        ├── default.ts         # 默认角色
        ├── steve.ts           # Steve 风格
        ├── alex.ts            # Alex 风格
        ├── knight.ts          # 骑士风格
        └── wizard.ts          # 法师风格

public/
└── models/                    # 模型资源（如需外部加载）
```

**Structure Decision**: 遵循现有单项目结构，新增 `src/models/` 目录存放角色模型定义，扩展 `player/` 和 `renderer/` 模块支持视角切换。

## Complexity Tracking

> 无宪法违规，无需记录复杂度偏离。
