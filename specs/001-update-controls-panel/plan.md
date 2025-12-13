# Implementation Plan: 更新操作面板

**Branch**: `001-update-controls-panel` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-update-controls-panel/spec.md`

## Summary

更新 `index.html` 中的操作说明面板，使其完整反映当前游戏支持的所有操作命令。当前面板仅显示部分操作（如 "1-5 切换方块"），需要更新为完整的操作列表，包括移动控制、鼠标操作、方块选择、功能快捷键和水中控制。

## Technical Context

**Language/Version**: TypeScript + HTML/CSS (Vite 项目)  
**Primary Dependencies**: 无新增依赖（仅修改 HTML 内容）  
**Storage**: N/A  
**Testing**: 手动验证 + 视觉检查  
**Target Platform**: Web 浏览器（桌面端优先）  
**Project Type**: Web 应用  
**Performance Goals**: N/A（静态内容更新）  
**Constraints**: 保持现有样式和布局  
**Scale/Scope**: 单文件修改（index.html）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. WebGL 渲染优先 | ✅ 不适用 | 本功能不涉及渲染逻辑 |
| II. 区块化世界管理 | ✅ 不适用 | 本功能不涉及世界管理 |
| III. 模块化游戏系统 | ✅ 通过 | HTML 内容更新不影响模块化 |
| IV. 响应式输入处理 | ✅ 通过 | 仅更新说明文档，不修改输入处理逻辑 |
| V. 渐进式加载与性能优化 | ✅ 不适用 | 静态 HTML 内容 |

**结论**: 所有适用的宪法原则均通过，无违规需要记录。

## Project Structure

### Documentation (this feature)

```text
specs/001-update-controls-panel/
├── spec.md              # 功能规范
├── plan.md              # 本文件
├── research.md          # Phase 0 输出（简化版）
└── tasks.md             # Phase 2 输出
```

### Source Code (repository root)

```text
index.html               # 目标文件 - 包含 #instructions 操作面板
```

**Structure Decision**: 本功能仅涉及根目录下的 `index.html` 文件修改，无需创建新的源代码文件或目录结构。

## Complexity Tracking

无违规需要记录。本功能为简单的 HTML 内容更新，复杂度极低。

## Implementation Approach

### 修改范围

仅修改 `index.html` 中 `#instructions` 元素的内容：

**当前内容**:
```html
<div id="instructions">
  <h2>点击开始游戏</h2>
  <p>WASD - 移动</p>
  <p>鼠标 - 视角</p>
  <p>左键 - 破坏方块</p>
  <p>右键 - 放置方块</p>
  <p>1-5 - 切换方块</p>
  <p>M - 打开地图</p>
  <p>ESC - 解锁鼠标</p>
</div>
```

**更新后内容**（按类别分组）:
```html
<div id="instructions">
  <h2>点击开始游戏</h2>
  <!-- 移动控制 -->
  <p>WASD/方向键 - 移动</p>
  <p>Space - 跳跃 / 水中上浮</p>
  <p>Shift - 冲刺 / 水中下潜</p>
  <!-- 鼠标操作 -->
  <p>鼠标 - 视角</p>
  <p>左键 - 破坏方块</p>
  <p>右键 - 放置方块</p>
  <!-- 方块选择 -->
  <p>1-9, 0 - 选择方块</p>
  <p>Tab - 循环切换方块</p>
  <!-- 功能键 -->
  <p>M - 打开地图</p>
  <p>V - 切换视角</p>
  <p>C - 角色选择</p>
  <p>ESC - 解锁鼠标</p>
</div>
```

### 验收标准

1. 面板显示所有 15+ 个操作命令
2. 每条说明简洁（≤10 字）
3. 保持现有样式不变
4. 操作说明与代码实现一致
