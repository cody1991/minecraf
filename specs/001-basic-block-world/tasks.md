# Tasks: 基础 3D 方块世界

**Input**: Design documents from `/specs/001-basic-block-world/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested - test tasks omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Vite + TypeScript project with `npm create vite@latest . -- --template vanilla-ts`
- [ ] T002 Install dependencies: `npm install three` and `npm install -D @types/three`
- [ ] T003 [P] Create project directory structure per plan.md in src/
- [ ] T004 [P] Configure TypeScript strict mode in tsconfig.json
- [ ] T005 [P] Create index.html with canvas container and basic styles

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create BlockType enum in src/core/Block.ts
- [ ] T007 Create World class with 3D block array in src/core/World.ts
- [ ] T008 [P] Implement flat terrain generation in src/core/World.ts (32×32, 3 layers deep)
- [ ] T009 [P] Create TextureAtlas class for 5 block textures in src/renderer/TextureAtlas.ts
- [ ] T010 [P] Create 16×16 placeholder textures for grass, dirt, stone, wood, sand in public/textures/
- [ ] T011 Create Renderer class with Three.js scene setup in src/renderer/Renderer.ts
- [ ] T012 Create BlockMesh class with InstancedMesh rendering in src/renderer/BlockMesh.ts
- [ ] T013 Implement world-to-mesh synchronization in src/renderer/BlockMesh.ts
- [ ] T014 Create Game class with main loop (requestAnimationFrame) in src/core/Game.ts
- [ ] T015 Create main.ts entry point that initializes Game in src/main.ts

**Checkpoint**: Foundation ready - game renders flat terrain, user story implementation can begin

---

## Phase 3: User Story 1 - 自由移动探索 (Priority: P1) 🎯 MVP

**Goal**: 玩家可以使用 WASD + 鼠标在 3D 世界中自由移动和观察

**Independent Test**: 启动游戏 → 点击画面锁定鼠标 → WASD 移动 → 鼠标旋转视角

### Implementation for User Story 1

- [ ] T016 [P] [US1] Create InputState interface in src/input/InputManager.ts
- [ ] T017 [P] [US1] Create KeyboardInput class with WASD handling in src/input/KeyboardInput.ts
- [ ] T018 [P] [US1] Create MouseInput class with pointer lock in src/input/MouseInput.ts
- [ ] T019 [US1] Create InputManager class integrating keyboard and mouse in src/input/InputManager.ts
- [ ] T020 [US1] Create Player class with position, rotation, velocity in src/player/Player.ts
- [ ] T021 [US1] Create Camera class wrapping Three.js PerspectiveCamera in src/renderer/Camera.ts
- [ ] T022 [US1] Create Movement class with WASD movement logic in src/player/Movement.ts
- [ ] T023 [US1] Implement mouse look (yaw/pitch) in src/player/Movement.ts
- [ ] T024 [US1] Implement AABB collision detection in src/player/Movement.ts
- [ ] T025 [US1] Implement world boundary constraints in src/player/Movement.ts
- [ ] T026 [US1] Integrate Player, Camera, Movement into Game loop in src/core/Game.ts
- [ ] T027 [P] [US1] Create Crosshair UI component in src/ui/Crosshair.ts

**Checkpoint**: User Story 1 complete - player can move freely with WASD and mouse look

---

## Phase 4: User Story 2 - 破坏方块 (Priority: P2)

**Goal**: 玩家可以用鼠标左键破坏瞄准的方块

**Independent Test**: 瞄准方块 → 左键点击 → 方块消失

### Implementation for User Story 2

- [ ] T028 [US2] Create Raycaster utility class in src/utils/Raycaster.ts
- [ ] T029 [US2] Implement ray-block intersection detection in src/utils/Raycaster.ts
- [ ] T030 [US2] Create BlockInteraction class in src/player/BlockInteraction.ts
- [ ] T031 [US2] Implement destroyBlock method with distance check (5 blocks) in src/player/BlockInteraction.ts
- [ ] T032 [US2] Add left-click event handling in src/input/MouseInput.ts
- [ ] T033 [US2] Integrate block destruction into Game loop in src/core/Game.ts
- [ ] T034 [US2] Update BlockMesh when block is destroyed in src/renderer/BlockMesh.ts

**Checkpoint**: User Story 2 complete - player can destroy blocks with left click

---

## Phase 5: User Story 3 - 放置方块 (Priority: P3)

**Goal**: 玩家可以用鼠标右键在方块表面放置新方块

**Independent Test**: 瞄准方块表面 → 右键点击 → 新方块出现

### Implementation for User Story 3

- [ ] T035 [US3] Implement face normal detection in Raycaster in src/utils/Raycaster.ts
- [ ] T036 [US3] Implement placeBlock method in src/player/BlockInteraction.ts
- [ ] T037 [US3] Add placement validation (no overlap, not in player) in src/player/BlockInteraction.ts
- [ ] T038 [US3] Add right-click event handling in src/input/MouseInput.ts
- [ ] T039 [US3] Integrate block placement into Game loop in src/core/Game.ts
- [ ] T040 [US3] Update BlockMesh when block is placed in src/renderer/BlockMesh.ts

**Checkpoint**: User Story 3 complete - player can place blocks with right click

---

## Phase 6: User Story 4 - 切换方块类型 (Priority: P4)

**Goal**: 玩家可以用数字键 1-5 切换当前选择的方块类型

**Independent Test**: 按数字键 1-5 → UI 显示切换 → 放置对应类型方块

### Implementation for User Story 4

- [ ] T041 [US4] Add number key (1-5) handling in src/input/KeyboardInput.ts
- [ ] T042 [US4] Add selectedBlockType property to Player in src/player/Player.ts
- [ ] T043 [US4] Create BlockSelector UI component in src/ui/BlockSelector.ts
- [ ] T044 [US4] Implement block type display with current selection highlight in src/ui/BlockSelector.ts
- [ ] T045 [US4] Connect selectedBlockType to placeBlock in src/player/BlockInteraction.ts
- [ ] T046 [US4] Integrate BlockSelector into Game in src/core/Game.ts

**Checkpoint**: User Story 4 complete - player can switch between 5 block types

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T047 [P] Add FPS counter display in src/ui/FpsCounter.ts
- [ ] T048 [P] Add ESC key to unlock pointer in src/input/MouseInput.ts
- [ ] T049 Performance optimization: ensure ≥ 60 FPS in src/renderer/BlockMesh.ts
- [ ] T050 Add click-to-lock instruction overlay in src/ui/Crosshair.ts
- [ ] T051 Run quickstart.md validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 (移动) → US2 (破坏) → US3 (放置) → US4 (切换) 按优先级顺序
  - US2-US4 依赖 US1 的输入和玩家系统
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 (需要 Player, InputManager, Camera)
- **User Story 3 (P3)**: Depends on US2 (复用 Raycaster, BlockInteraction)
- **User Story 4 (P4)**: Depends on US3 (需要 placeBlock 功能)

### Within Each User Story

- Models/utilities before services
- Services before integration
- Core implementation before UI
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: T003, T004, T005 can run in parallel
- **Phase 2**: T008, T009, T010 can run in parallel
- **Phase 3 (US1)**: T016, T017, T018, T027 can run in parallel
- **Phase 7**: T047, T048 can run in parallel

---

## Parallel Example: Phase 2 Foundational

```bash
# Launch these tasks together:
Task: "Implement flat terrain generation in src/core/World.ts"
Task: "Create TextureAtlas class in src/renderer/TextureAtlas.ts"
Task: "Create placeholder textures in public/textures/"
```

## Parallel Example: User Story 1

```bash
# Launch input handlers together:
Task: "Create KeyboardInput class in src/input/KeyboardInput.ts"
Task: "Create MouseInput class in src/input/MouseInput.ts"
Task: "Create Crosshair UI in src/ui/Crosshair.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test movement and camera independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → 渲染平坦地形
2. Add User Story 1 → 自由移动探索 (MVP!)
3. Add User Story 2 → 破坏方块
4. Add User Story 3 → 放置方块
5. Add User Story 4 → 切换方块类型
6. Each story adds value without breaking previous stories

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Total tasks: 51
