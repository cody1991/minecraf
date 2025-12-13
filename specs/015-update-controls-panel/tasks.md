# Tasks: 更新操作面板

**Input**: Design documents from `/specs/001-update-controls-panel/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅

**Tests**: 手动验证（无自动化测试需求）

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Target file**: `index.html` at repository root
- **Instructions element**: `#instructions` div (lines 148-157)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 无需项目初始化，仅需确认目标文件

- [x] T001 确认 `index.html` 中 `#instructions` 元素的当前内容和位置

**Checkpoint**: 目标文件已确认，可以开始修改

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 无阻塞性前置任务

本功能为简单的 HTML 内容更新，无需基础设施准备。

**Checkpoint**: 直接进入用户故事实现

---

## Phase 3: User Story 1 - 查看完整操作指南 (Priority: P1) 🎯 MVP

**Goal**: 更新操作面板显示所有当前支持的操作命令

**Independent Test**: 打开游戏，查看操作面板，验证所有操作命令是否完整显示

### Implementation for User Story 1

- [x] T002 [US1] 更新移动控制说明（WASD/方向键、Space、Shift）in `index.html`
- [x] T003 [US1] 更新鼠标操作说明（视角、左键破坏、右键放置）in `index.html`
- [x] T004 [US1] 更新方块选择说明（1-9,0 选择、Tab 循环）in `index.html`
- [x] T005 [US1] 添加功能快捷键说明（M 地图、V 视角、C 角色选择）in `index.html`
- [x] T006 [US1] 确保 ESC 解锁鼠标说明保留 in `index.html`

**Checkpoint**: 操作面板显示所有基本操作命令

---

## Phase 4: User Story 2 - 水中控制提示 (Priority: P2)

**Goal**: 在操作说明中体现水中特殊控制

**Independent Test**: 查看操作面板，确认 Space 和 Shift 的说明包含水中控制

### Implementation for User Story 2

- [x] T007 [US2] 更新 Space 键说明为"跳跃 / 水中上浮" in `index.html`
- [x] T008 [US2] 更新 Shift 键说明为"冲刺 / 水中下潜" in `index.html`

**Checkpoint**: 水中控制说明已整合到移动控制中

---

## Phase 5: User Story 3 - 操作分类清晰 (Priority: P3)

**Goal**: 按类别组织操作命令，提高可读性

**Independent Test**: 查看操作面板，确认操作按逻辑类别分组

### Implementation for User Story 3

- [x] T009 [US3] 添加 HTML 注释分隔不同操作类别 in `index.html`
- [x] T010 [US3] 确保操作顺序符合逻辑分组（移动→鼠标→方块→功能→其他）in `index.html`

**Checkpoint**: 操作面板内容按类别清晰组织

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 最终验证和优化

- [x] T011 验证所有操作说明文字简洁（每条 ≤10 字）in `index.html`
- [x] T012 验证操作说明与代码实现一致（对照 research.md 操作列表）
- [x] T013 在浏览器中测试面板显示效果，确保样式不变

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 跳过 - 无阻塞任务
- **User Stories (Phase 3-5)**: 可按顺序执行，也可合并为单次编辑
- **Polish (Phase 6)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: 无依赖 - 核心更新
- **User Story 2 (P2)**: 与 US1 的 T002 合并（Space/Shift 说明）
- **User Story 3 (P3)**: 依赖 US1 完成后组织结构

### 任务合并建议

由于所有任务都修改同一个文件的同一个元素，建议将 T002-T010 合并为单次编辑操作：

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

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 T001: 确认目标文件
2. 完成 T002-T006: 更新所有操作说明
3. **验证**: 打开游戏测试面板显示
4. 完成

### 推荐: 一次性完成

由于本功能简单且所有修改集中在同一元素，建议：

1. 执行 T001 确认目标
2. 一次性执行 T002-T010（使用上方合并后的 HTML）
3. 执行 T011-T013 验证

---

## Notes

- 所有任务修改同一文件（`index.html`）的同一元素（`#instructions`）
- 建议合并执行以避免多次编辑冲突
- 无需自动化测试，手动验证即可
- 保持现有 CSS 样式不变
