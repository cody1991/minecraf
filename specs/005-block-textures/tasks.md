# Tasks: 更多方块与纹理

**Input**: Design documents from `/specs/005-block-textures/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 手动测试为主（无自动化测试任务）

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `public/` at repository root
- Paths shown below follow existing project structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 纹理资源准备和基础配置

- [x] T001 创建纹理图集图片文件 `public/textures/blocks.png`（16x16 像素 × 16 列 × 3 行）
- [x] T002 [P] 创建 BlockTextures 模块文件 `src/renderer/BlockTextures.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 核心纹理系统基础设施，所有用户故事依赖此阶段

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 扩展 BlockType 枚举，新增 8 种方块类型 `src/core/Block.ts`
- [x] T004 [P] 添加 BlockProperties 接口和 BLOCK_PROPERTIES 常量 `src/core/Block.ts`
- [x] T005 [P] 添加 BlockTextureMap 接口和纹理映射定义 `src/renderer/BlockTextures.ts`
- [x] T006 重构 TextureAtlas 类，支持从图片加载纹理 `src/renderer/TextureAtlas.ts`
- [x] T007 实现纹理加载失败回退机制（保留程序生成纯色）`src/renderer/TextureAtlas.ts`

**Checkpoint**: 纹理系统基础就绪 - 用户故事实现可以开始

---

## Phase 3: User Story 1 - 真实纹理方块体验 (Priority: P1) 🎯 MVP

**Goal**: 玩家在游戏中看到具有真实纹理的方块，而非纯色方块

**Independent Test**: 启动游戏，观察地形中的草方块是否显示绿色草地纹理顶面和泥土纹理侧面

### Implementation for User Story 1

- [x] T008 [US1] 修改 ChunkMesh 类，使用纹理 UV 坐标替代颜色 `src/renderer/ChunkMesh.ts`
- [x] T009 [US1] 更新 ChunkMesh 的 updateInstances 方法，根据方块类型设置正确的 UV `src/renderer/ChunkMesh.ts`
- [x] T010 [US1] 修改共享材质，使用纹理图集纹理 `src/renderer/ChunkMesh.ts`
- [x] T011 [US1] 更新 TextureAtlas.getUVs() 方法，支持按面获取 UV 坐标 `src/renderer/TextureAtlas.ts`
- [x] T012 [US1] 验证现有 5 种方块类型（草地、泥土、石头、木头、沙子）纹理显示正确

**Checkpoint**: 真实纹理渲染功能完成，可独立测试验证

---

## Phase 4: User Story 2 - 新增方块类型 (Priority: P2)

**Goal**: 玩家可以使用更多种类的方块来建造（圆石、砖块、玻璃、水、树叶、原木、木板、雪）

**Independent Test**: 按数字键切换方块类型，验证可以选择至少 10 种不同方块并正确放置

### Implementation for User Story 2

- [x] T013 [US2] 更新 PLACEABLE_BLOCKS 数组，包含新增方块类型 `src/core/Block.ts`
- [x] T014 [US2] 为新增方块添加纹理映射定义 `src/renderer/BlockTextures.ts`
- [x] T015 [P] [US2] 创建 TransparentRenderer 类处理透明方块渲染 `src/renderer/TransparentRenderer.ts`
- [x] T016 [US2] 修改 ChunkMesh 分离不透明和透明方块渲染 `src/renderer/ChunkMesh.ts`
- [x] T017 [US2] 实现透明方块深度排序渲染（双 Pass）`src/renderer/TransparentRenderer.ts`
- [x] T018 [US2] 更新 isSolid() 函数，水方块返回 false `src/core/Block.ts`
- [x] T019 [US2] 修改方块选择器 UI 显示纹理预览 `src/ui/BlockSelector.ts`
- [x] T020 [US2] 更新键盘输入处理支持更多方块快捷键（1-0）`src/player/Player.ts`
- [x] T021 [US2] 验证新增 8 种方块可正常放置和显示

**Checkpoint**: 所有 13 种方块类型可用，透明方块正确渲染

---

## Phase 5: User Story 3 - 方块面纹理差异化 (Priority: P3)

**Goal**: 草方块、原木等方块的不同面显示不同纹理

**Independent Test**: 观察草方块从不同角度，验证顶面、侧面、底面显示不同纹理

### Implementation for User Story 3

- [x] T022 [US3] 修改 ChunkMesh 根据面方向获取对应纹理 UV `src/renderer/ChunkMesh.ts`
- [x] T023 [US3] 实现 getUVsForFace(blockType, face) 方法 `src/renderer/TextureAtlas.ts`
- [x] T024 [US3] 更新草方块纹理映射（顶面草地、侧面带草边泥土、底面泥土）`src/renderer/BlockTextures.ts`
- [x] T025 [US3] 更新原木纹理映射（顶/底年轮、侧面树皮）`src/renderer/BlockTextures.ts`
- [x] T026 [US3] 验证多面纹理方块从各角度显示正确

**Checkpoint**: 多面纹理差异化功能完成，所有用户故事可独立验证

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 性能优化和边缘情况处理

- [x] T027 [P] 优化纹理图集加载，添加加载状态指示
- [x] T028 [P] 处理方块选择器超过屏幕宽度的滚动/分页
- [x] T029 性能验证：确保帧率保持 30+ FPS（移动端）/ 60 FPS（桌面端）
- [x] T030 运行 quickstart.md 验证流程，确保所有功能正常

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 → P2 → P3)
  - US2 和 US3 可以在 US1 完成后并行开发（如果有多人）
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - 透明渲染独立于 US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - 多面纹理独立于 US1/US2

### Within Each User Story

- 核心渲染逻辑优先
- 数据定义在实现之前
- 验证任务在最后

### Parallel Opportunities

- T002 可与 T001 并行（不同文件）
- T004, T005 可并行（不同文件）
- T015 可与其他 US2 任务并行（新文件）
- T027, T028 可并行（不同功能）

---

## Parallel Example: Phase 2 Foundational

```bash
# 并行执行不同文件的任务:
Task: "添加 BlockProperties 接口 src/core/Block.ts"
Task: "添加 BlockTextureMap 接口 src/renderer/BlockTextures.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup（纹理资源）
2. Complete Phase 2: Foundational（纹理系统基础）
3. Complete Phase 3: User Story 1（真实纹理渲染）
4. **STOP and VALIDATE**: 启动游戏验证纹理显示
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 纹理系统就绪
2. Add User Story 1 → 真实纹理 → 验证 → MVP!
3. Add User Story 2 → 新增方块 + 透明渲染 → 验证
4. Add User Story 3 → 多面纹理 → 验证 → 完整功能

### Single Developer Strategy

推荐按优先级顺序执行：
1. Phase 1-2: 基础设施（约 2 小时）
2. Phase 3 (US1): 核心纹理渲染（约 3 小时）
3. Phase 4 (US2): 新增方块 + 透明（约 4 小时）
4. Phase 5 (US3): 多面纹理（约 2 小时）
5. Phase 6: 收尾（约 1 小时）

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- 纹理图集使用程序生成（Minecraft 风格像素纹理）
