# Implementation Plan: 更多方块与纹理

**Branch**: `005-block-textures` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-block-textures/spec.md`

## Summary

实现真实纹理贴图系统替代当前的纯色方块渲染，并新增 8 种方块类型。技术方案采用纹理图集（Texture Atlas）加载 16x16 像素 PNG 纹理，支持多面纹理差异化和透明/半透明方块渲染。

## Technical Context

**Language/Version**: TypeScript 5.6 + ES2020  
**Primary Dependencies**: Three.js 0.170.0, Vite 6.0  
**Storage**: 本地文件系统（public/textures/ 目录存放纹理资源）  
**Testing**: 手动测试 + 浏览器开发者工具性能分析  
**Target Platform**: 现代浏览器（WebGL 2.0 支持）  
**Project Type**: Web 应用（单项目结构）  
**Performance Goals**: 30 FPS（移动端）/ 60 FPS（桌面端），与纯色渲染性能相当  
**Constraints**: 纹理图集单张图片 < 1MB，内存占用 < 512 MB  
**Scale/Scope**: 13+ 种方块类型，16x16 像素纹理

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 通过 | 使用 Three.js 纹理系统，渲染逻辑封装在 renderer/ 模块 |
| II. 区块化世界管理 | ✅ 通过 | 纹理系统与现有区块渲染集成，不改变区块架构 |
| III. 模块化游戏系统 | ✅ 通过 | TextureAtlas 作为独立模块，Block 定义扩展不影响其他系统 |
| IV. 响应式输入处理 | ✅ 通过 | 方块选择器 UI 更新不影响输入系统 |
| V. 渐进式加载与性能优化 | ✅ 通过 | 使用纹理图集减少 Draw Call，支持纹理加载失败回退 |

**Gate Result**: ✅ 全部通过，无违规项

## Project Structure

### Documentation (this feature)

```text
specs/005-block-textures/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── core/
│   └── Block.ts              # 扩展 BlockType 枚举和方块属性
├── renderer/
│   ├── TextureAtlas.ts       # 重构：从图片加载纹理图集
│   ├── BlockTextures.ts      # 新增：方块纹理定义（多面映射）
│   ├── ChunkMesh.ts          # 修改：使用纹理 UV 替代颜色
│   └── TransparentRenderer.ts # 新增：透明方块渲染器
├── ui/
│   └── BlockSelector.ts      # 修改：显示纹理预览
└── ...

public/
└── textures/
    └── blocks.png            # 纹理图集（16x16 per block）

tests/
└── (手动测试为主)
```

**Structure Decision**: 保持现有单项目结构，在 `renderer/` 模块中新增纹理相关文件，`public/textures/` 存放纹理资源。

## Complexity Tracking

> 无违规项需要记录
