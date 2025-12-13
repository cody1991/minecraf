# Tasks: 方块音效系统

**Input**: Design documents from `/specs/017-block-sound-effects/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 未在规格说明中明确要求，本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 任务所属用户故事（US1, US2, US3）
- 描述中包含确切文件路径

## Path Conventions

- **Project Type**: 单体 Web 游戏应用
- **Source**: `src/` 目录
- **Audio Module**: `src/audio/`
- **Player Module**: `src/player/`

---

## Phase 1: Setup (共享基础设施)

**Purpose**: 类型定义和基础结构准备

- [x] T001 [P] 添加 BlockSoundCategory 和 BlockSoundAction 类型定义到 src/audio/AudioTypes.ts
- [x] T002 [P] 添加 BLOCK_SOUND_PARAMS 常量配置到 src/audio/AudioTypes.ts

---

## Phase 2: Foundational (阻塞性前置任务)

**Purpose**: 核心基础设施，必须在任何用户故事开始前完成

**⚠️ CRITICAL**: 用户故事工作必须等待此阶段完成

- [x] T003 创建 BlockSoundThrottle 节流管理器类在 src/audio/BlockSoundThrottle.ts
- [x] T004 添加 generateBlockSound() 音效合成函数到 src/audio/SynthAudio.ts
- [x] T005 添加 getBlockSoundCategory() 方块类型映射函数到 src/audio/AudioTypes.ts

**Checkpoint**: 基础设施就绪 - 用户故事实现可以开始 ✅

---

## Phase 3: User Story 1 - 破坏方块时播放音效 (Priority: P1) 🎯 MVP

**Goal**: 玩家破坏方块时播放与材质对应的破坏音效

**Independent Test**: 破坏不同类型方块，验证播放对应材质的破坏音效

### Implementation for User Story 1

- [x] T006 [US1] 添加 playBlockSound() 方法到 src/audio/AudioManager.ts（支持 'break' 动作）
- [x] T007 [US1] 在 destroyBlock() 成功后调用音效播放，修改 src/player/BlockInteraction.ts
- [x] T008 [US1] 添加静音状态检查逻辑到 playBlockSound() 方法

**Checkpoint**: 破坏方块音效功能完整可测试 ✅

---

## Phase 4: User Story 2 - 放置方块时播放音效 (Priority: P1)

**Goal**: 玩家放置方块时播放与材质对应的放置音效

**Independent Test**: 放置不同类型方块，验证播放对应材质的放置音效

### Implementation for User Story 2

- [x] T009 [US2] 扩展 playBlockSound() 支持 'place' 动作（音调变化）在 src/audio/AudioManager.ts
- [x] T010 [US2] 在 placeBlock() 成功后调用音效播放，修改 src/player/BlockInteraction.ts
- [x] T011 [US2] 确保放置失败时不播放音效（验证现有逻辑）

**Checkpoint**: 放置方块音效功能完整可测试 ✅

---

## Phase 5: User Story 3 - 音效与音量控制集成 (Priority: P2)

**Goal**: 方块音效与现有音量控制系统集成

**Independent Test**: 调整音效音量，验证方块音效音量相应变化

### Implementation for User Story 3

- [x] T012 [US3] 确保 playBlockSound() 正确使用 sfxGain 节点在 src/audio/AudioManager.ts
- [x] T013 [US3] 添加节流逻辑集成到 playBlockSound() 调用 BlockSoundThrottle
- [x] T014 [US3] 验证主音量静音时方块音效不播放

**Checkpoint**: 音量控制集成完整可测试 ✅

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 跨用户故事的改进

- [x] T015 [P] 添加方块音效相关日志输出到 src/audio/AudioManager.ts
- [x] T016 运行 quickstart.md 验证流程，确保所有测试场景通过
- [x] T017 代码清理：移除调试代码，确保类型完整

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成 - 阻塞所有用户故事
- **User Stories (Phase 3-5)**: 依赖 Foundational 完成
  - US1 和 US2 均为 P1 优先级，建议按顺序完成
  - US3 依赖 US1/US2 的音效播放基础
- **Polish (Phase 6)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 完成后可开始 - 无其他故事依赖
- **User Story 2 (P1)**: 可与 US1 并行，但建议 US1 先完成以复用 playBlockSound()
- **User Story 3 (P2)**: 依赖 US1/US2 的 playBlockSound() 实现

### Within Each User Story

- 核心实现优先于边界处理
- AudioManager 修改优先于 BlockInteraction 集成
- 完成一个故事后再进入下一个

### Parallel Opportunities

- T001 和 T002 可并行（同文件不同部分，但建议合并）
- Phase 1 所有任务可并行
- T015 可与其他 Polish 任务并行

---

## Parallel Example: Phase 1 Setup

```bash
# 可同时启动的任务:
Task: "添加 BlockSoundCategory 和 BlockSoundAction 类型定义到 src/audio/AudioTypes.ts"
Task: "添加 BLOCK_SOUND_PARAMS 常量配置到 src/audio/AudioTypes.ts"
# 注意：同一文件，实际建议合并为一个任务
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational (关键 - 阻塞所有故事)
3. 完成 Phase 3: User Story 1
4. **停止并验证**: 独立测试破坏方块音效
5. 可部署/演示

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. 添加 User Story 1 → 独立测试 → 部署 (MVP!)
3. 添加 User Story 2 → 独立测试 → 部署
4. 添加 User Story 3 → 独立测试 → 部署
5. 每个故事独立增加价值

### Single Developer Strategy

推荐执行顺序：
1. T001 → T002（类型定义）
2. T003 → T004 → T005（基础设施）
3. T006 → T007 → T008（破坏音效 MVP）
4. T009 → T010 → T011（放置音效）
5. T012 → T013 → T014（音量集成）
6. T015 → T016 → T017（收尾）

---

## Notes

- [P] 任务 = 不同文件，无依赖
- [Story] 标签将任务映射到特定用户故事
- 每个用户故事应可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何检查点停止以独立验证故事
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
