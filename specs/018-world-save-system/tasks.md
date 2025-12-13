# Tasks: 世界存档系统

**Input**: Design documents from `/specs/018-world-save-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 未明确要求，本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3, US4, US5）
- 描述中包含确切文件路径

---

## Phase 1: Setup（基础设施）

**Purpose**: 创建存档系统模块结构和基础类型定义

- [X] T001 创建存档模块目录结构 `src/storage/`
- [X] T002 [P] 定义存档数据类型接口 in `src/storage/SaveData.ts`
- [X] T003 [P] 实现 IndexedDB 存储封装层 in `src/storage/IndexedDBStorage.ts`

---

## Phase 2: Foundational（核心基础设施）

**Purpose**: 必须完成的核心组件，所有用户故事都依赖这些

**⚠️ CRITICAL**: 用户故事实现前必须完成此阶段

- [X] T004 扩展 Chunk 类添加 `isModified` 标记 in `src/core/Chunk.ts`
- [X] T005 扩展 World 类添加 `getModifiedChunks()` 方法 in `src/core/World.ts`
- [X] T006 扩展 World 类添加 `restoreFromSave()` 方法 in `src/core/World.ts`
- [X] T007 扩展 Player 类添加 `getState()` 和 `restoreState()` 方法 in `src/player/Player.ts`
- [X] T008 实现 SaveManager 核心类框架 in `src/storage/SaveManager.ts`

**Checkpoint**: 基础设施就绪，可开始用户故事实现

---

## Phase 3: User Story 1 - 保存当前世界 (Priority: P1) 🎯 MVP

**Goal**: 玩家可以将当前游戏进度保存到指定槽位

**Independent Test**: 放置方块 → 保存到槽位 1 → 刷新页面 → 检查 IndexedDB 中存在存档数据

### Implementation for User Story 1

- [X] T009 [US1] 实现 SaveManager.save() 方法 in `src/storage/SaveManager.ts`
- [X] T010 [US1] 实现 SaveManager.listSaves() 方法 in `src/storage/SaveManager.ts`
- [X] T011 [US1] 实现 SaveManager.getSlot() 方法 in `src/storage/SaveManager.ts`
- [X] T012 [P] [US1] 创建 SavePanel UI 组件框架 in `src/ui/SavePanel.ts`
- [X] T013 [US1] 实现存档槽位列表显示 in `src/ui/SavePanel.ts`
- [X] T014 [US1] 实现保存按钮和存档命名输入框 in `src/ui/SavePanel.ts`
- [X] T015 [US1] 实现覆盖确认对话框 in `src/ui/SavePanel.ts`
- [X] T016 [US1] 实现保存成功/失败提示 in `src/ui/SavePanel.ts`
- [X] T017 [US1] 集成 SavePanel 到 Game 类 in `src/core/Game.ts`
- [X] T018 [US1] 添加键盘快捷键打开存档面板（ESC 或专用键）in `src/core/Game.ts`

**Checkpoint**: 用户故事 1 完成，可独立测试保存功能

---

## Phase 4: User Story 2 - 加载已保存的世界 (Priority: P1)

**Goal**: 玩家可以从存档列表加载之前保存的游戏进度

**Independent Test**: 存在存档 → 点击加载 → 验证方块位置和玩家位置恢复

### Implementation for User Story 2

- [X] T019 [US2] 实现 SaveManager.load() 方法 in `src/storage/SaveManager.ts`
- [X] T020 [US2] 实现 World.restoreFromSave() 完整逻辑 in `src/core/World.ts`
- [X] T021 [US2] 实现加载按钮和加载流程 in `src/ui/SavePanel.ts`
- [X] T022 [US2] 实现加载前保存当前进度提示 in `src/ui/SavePanel.ts`
- [X] T023 [US2] 实现加载进度指示器 in `src/ui/SavePanel.ts`
- [X] T024 [US2] 集成加载流程到 Game 类 in `src/core/Game.ts`
- [X] T025 [US2] 处理加载失败和数据损坏情况 in `src/storage/SaveManager.ts`

**Checkpoint**: 用户故事 1 和 2 完成，保存/加载核心功能可用

---

## Phase 5: User Story 3 - 管理存档列表 (Priority: P2)

**Goal**: 玩家可以重命名和删除存档

**Independent Test**: 重命名存档 → 验证名称变化；删除存档 → 验证从列表消失

### Implementation for User Story 3

- [X] T026 [US3] 实现 SaveManager.rename() 方法 in `src/storage/SaveManager.ts`
- [X] T027 [US3] 实现 SaveManager.delete() 方法 in `src/storage/SaveManager.ts`
- [X] T028 [US3] 实现重命名按钮和输入框 in `src/ui/SavePanel.ts`
- [X] T029 [US3] 实现删除按钮和确认对话框 in `src/ui/SavePanel.ts`
- [X] T030 [US3] 实现删除时级联清除区块数据 in `src/storage/IndexedDBStorage.ts`

**Checkpoint**: 用户故事 3 完成，存档管理功能可用

---

## Phase 6: User Story 4 - 自动保存 (Priority: P2)

**Goal**: 系统每 5 分钟自动保存游戏进度到专用槽位

**Independent Test**: 开始游戏 → 等待 5 分钟（或修改为 10 秒测试）→ 刷新页面 → 检查自动存档存在

### Implementation for User Story 4

- [X] T031 [P] [US4] 创建 AutoSave 类 in `src/storage/AutoSave.ts`
- [X] T032 [US4] 实现定时器和自动保存触发逻辑 in `src/storage/AutoSave.ts`
- [X] T033 [US4] 实现自动保存完成提示（不打断游戏）in `src/ui/SavePanel.ts`
- [X] T034 [US4] 实现保存锁机制防止并发冲突 in `src/storage/SaveManager.ts`
- [X] T035 [US4] 集成 AutoSave 到 Game 类 in `src/core/Game.ts`
- [X] T036 [US4] 实现启动时检测自动存档并提示恢复 in `src/core/Game.ts`

**Checkpoint**: 用户故事 4 完成，自动保存功能可用

---

## Phase 7: User Story 5 - 创建新世界 (Priority: P3)

**Goal**: 玩家可以创建新的随机世界而不影响现有存档

**Independent Test**: 点击"新建世界" → 验证生成新世界 → 验证现有存档不受影响

### Implementation for User Story 5

- [X] T037 [US5] 在存档面板添加"新建世界"按钮 in `src/ui/SavePanel.ts`
- [X] T038 [US5] 实现新建世界确认对话框（提示保存当前进度）in `src/ui/SavePanel.ts`
- [X] T039 [US5] 实现 Game.createNewWorld() 方法 in `src/core/Game.ts`
- [X] T040 [US5] 重置世界状态并生成新种子 in `src/core/World.ts`

**Checkpoint**: 所有用户故事完成

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事优化和边缘情况处理

- [X] T041 [P] 检测浏览器 IndexedDB 支持，不支持时优雅降级 in `src/storage/SaveManager.ts`
- [X] T042 [P] 处理存储空间不足错误 in `src/storage/IndexedDBStorage.ts`
- [X] T043 [P] 优化大量区块的分批保存/加载 in `src/storage/SaveManager.ts`
- [X] T044 统一 UI 样式与现有面板一致 in `src/ui/SavePanel.ts`
- [X] T045 添加存档功能相关的控制台日志 in `src/storage/SaveManager.ts`
- [X] T046 运行 quickstart.md 验证所有功能

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖，可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成，**阻塞**所有用户故事
- **User Stories (Phase 3-7)**: 依赖 Foundational 完成
  - US1 和 US2 是 P1 优先级，建议按顺序完成
  - US3 和 US4 是 P2 优先级，可并行
  - US5 是 P3 优先级，最后完成
- **Polish (Phase 8)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 完成后可开始，无其他依赖
- **User Story 2 (P1)**: 建议在 US1 后完成（复用 SavePanel），但逻辑上独立
- **User Story 3 (P2)**: 依赖 SavePanel 存在（US1 创建），可与 US4 并行
- **User Story 4 (P2)**: 依赖 SaveManager 核心（US1），可与 US3 并行
- **User Story 5 (P3)**: 依赖 SavePanel 存在，可独立完成

### Within Each User Story

- 核心逻辑（SaveManager 方法）→ UI 组件 → Game 集成
- 每个故事完成后可独立测试

### Parallel Opportunities

- T002, T003 可并行（Setup 阶段）
- T012 可与 T009-T011 并行（US1 内）
- T031 可与其他 US4 任务并行
- T041, T042, T043 可并行（Polish 阶段）

---

## Parallel Example: User Story 1

```bash
# 并行执行 SaveManager 方法实现：
Task: "T009 [US1] 实现 SaveManager.save() 方法"
Task: "T010 [US1] 实现 SaveManager.listSaves() 方法"
Task: "T011 [US1] 实现 SaveManager.getSlot() 方法"

# 同时并行创建 UI 框架：
Task: "T012 [P] [US1] 创建 SavePanel UI 组件框架"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup（T001-T003）
2. 完成 Phase 2: Foundational（T004-T008）
3. 完成 Phase 3: User Story 1（T009-T018）
4. **STOP and VALIDATE**: 测试保存功能
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. User Story 1 → 测试 → 部署（MVP：可保存！）
3. User Story 2 → 测试 → 部署（可保存+加载！）
4. User Story 3 + 4 → 测试 → 部署（完整存档管理！）
5. User Story 5 → 测试 → 部署（新建世界！）
6. Polish → 最终发布

---

## Notes

- [P] 任务 = 不同文件，无依赖，可并行
- [Story] 标签映射任务到具体用户故事
- 每个用户故事应可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何检查点停止以独立验证故事
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
