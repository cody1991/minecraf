# Tasks: 水下显示优化

**Input**: Design documents from `/specs/007-underwater-display/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 手动测试（项目当前无自动化测试框架）

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Paths shown below use the existing project structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 添加水下效果所需的常量定义

- [X] T001 [P] 在 src/core/ChunkConstants.ts 中添加水下效果常量（UNDERWATER_FOG_COLOR, UNDERWATER_FOG_DENSITY, UNDERWATER_VISIBILITY）

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 核心渲染逻辑修改，所有用户故事依赖此阶段

**⚠️ CRITICAL**: 必须先完成此阶段才能验证任何用户故事

- [X] T002 修改 src/core/Chunk.ts 中的 isFaceExposed 方法，增强透明方块面暴露判断逻辑
- [X] T003 修改 src/renderer/ChunkMesh.ts 中的 buildGeometryData 方法，调用增强后的 isFaceExposed

**Checkpoint**: 基础渲染逻辑修改完成 - 可以开始用户故事实现

---

## Phase 3: User Story 1 - 水体完整填充显示 (Priority: P1) 🎯 MVP

**Goal**: 解决水体显示不完整的问题，确保水体连续无空洞

**Independent Test**: 在水域附近移动观察水体是否连续无缺口；潜入水下环顾四周，确认没有"透视"效果

### Implementation for User Story 1

- [X] T004 [US1] 在 src/core/Chunk.ts 中实现新的 isFaceExposed 逻辑：透明方块相邻不同类型时渲染面
- [X] T005 [US1] 在 src/core/Block.ts 中确认 isTransparent 函数正确返回水方块的透明属性
- [X] T006 [US1] 重新构建所有已加载区块的 mesh 以应用新的面暴露逻辑（在 ChunkManager 或 Game 中触发）
- [X] T007 [US1] 手动测试：启动游戏，前往水域，验证水体完整填充

**Checkpoint**: 水体应该完整连续，没有空洞或"透视"效果

---

## Phase 4: User Story 2 - 水下视觉效果改善 (Priority: P2)

**Goal**: 玩家潜入水下时显示蓝色色调滤镜和雾效果

**Independent Test**: 潜入水下观察屏幕是否呈现蓝色色调，远处物体是否逐渐衰减

### Implementation for User Story 2

- [X] T008 [P] [US2] 创建 src/renderer/UnderwaterEffect.ts 水下效果管理器类
- [X] T009 [US2] 在 UnderwaterEffect 中实现 enable() 方法：设置 FogExp2 和蓝色背景
- [X] T010 [US2] 在 UnderwaterEffect 中实现 disable() 方法：移除雾效果，恢复天蓝背景
- [X] T011 [US2] 在 UnderwaterEffect 中实现 update(isSubmerged) 方法：根据状态切换效果
- [X] T012 [US2] 修改 src/renderer/Renderer.ts 添加获取 scene 的公共方法（如果不存在）
- [X] T013 [US2] 修改 src/core/Game.ts 初始化 UnderwaterEffect 实例
- [X] T014 [US2] 修改 src/core/Game.ts 游戏循环中调用 underwaterEffect.update(player.isSubmerged)
- [X] T015 [US2] 手动测试：潜入水下验证蓝色色调和雾效果，离开水面验证效果消失

**Checkpoint**: 水下视觉效果应在进入/离开水面时正确切换

---

## Phase 5: User Story 3 - 水面渲染优化 (Priority: P3)

**Goal**: 优化水面透明度和视觉层次感

**Independent Test**: 从水面上方观察水体，确认能看到水下内容且水面边界清晰

### Implementation for User Story 3

- [X] T016 [US3] 检查 src/core/Block.ts 中水方块的 opacity 设置（当前 0.6），根据需要调整
- [X] T017 [US3] 检查 src/renderer/ChunkMesh.ts 中透明材质的 opacity 参数（当前 0.8），确保与 Block 定义一致
- [X] T018 [US3] 验证水面顶部面正确渲染（水与空气边界）
- [X] T019 [US3] 手动测试：从水面上方观察，验证透明度和边界清晰度

**Checkpoint**: 水面应有适当透明度，能看到水下内容

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 边缘情况处理和性能验证

- [X] T020 [P] 测试边缘情况：水与玻璃相邻时的渲染顺序
- [X] T021 [P] 测试边缘情况：单个水方块（孤立水源）的显示
- [X] T022 [P] 测试边缘情况：浅水区（一格深）的显示
- [X] T023 测试边缘情况：快速进出水面时效果切换的流畅性
- [X] T024 性能验证：对比水域和陆地区域的帧率，确保差异不超过 10%
- [X] T025 运行 quickstart.md 中的验收检查清单

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories should proceed sequentially (P1 → P2 → P3) for this feature
  - US1 修改核心渲染逻辑，US2/US3 依赖正确的水体渲染
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after US1 complete - 需要水体正确渲染才能验证水下效果
- **User Story 3 (P3)**: Can start after US1 complete - 需要水体正确渲染才能验证水面效果

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- T001 (常量定义) 可与其他 Setup 任务并行
- T008 (UnderwaterEffect 类创建) 可与 US1 实现并行开始
- T020-T022 (边缘情况测试) 可并行执行

---

## Parallel Example: User Story 2

```bash
# T008 可以在 US1 完成前开始（创建类结构）:
Task: "创建 src/renderer/UnderwaterEffect.ts 水下效果管理器类"

# 但 T013-T015 需要等待 US1 完成后才能正确集成和测试
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational (T002-T003)
3. Complete Phase 3: User Story 1 (T004-T007)
4. **STOP and VALIDATE**: 测试水体是否完整填充
5. 如果 MVP 满足需求，可以暂停

### Incremental Delivery

1. Complete Setup + Foundational → 基础就绪
2. Add User Story 1 → 测试水体填充 → **MVP 完成!**
3. Add User Story 2 → 测试水下效果 → 增强版本
4. Add User Story 3 → 测试水面渲染 → 完整版本
5. Polish → 边缘情况和性能验证

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- 本功能使用手动测试，无自动化测试任务
- 每个用户故事完成后进行手动验证
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
