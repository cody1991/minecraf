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

- [x] T001 Initialize Vite + TypeScript project with `npm create vite@latest . -- --template vanilla-ts`
- [x] T002 Install dependencies: `npm install three` and `npm install -D @types/three`
- [x] T003 [P] Create project directory structure per plan.md in src/
- [x] T004 [P] Configure TypeScript strict mode in tsconfig.json
- [x] T005 [P] Create index.html with canvas container and basic styles

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create BlockType enum in src/core/Block.ts
- [x] T007 Create World class with 3D block array in src/core/World.ts
- [x] T008 [P] Implement flat terrain generation in src/core/World.ts (32×32, 3 layers deep)
- [x] T009 [P] Create TextureAtlas class for 5 block textures in src/renderer/TextureAtlas.ts
- [x] T010 [P] Create 16×16 placeholder textures for grass, dirt, stone, wood, sand in public/textures/
- [x] T011 Create Renderer class with Three.js scene setup in src/renderer/Renderer.ts
- [x] T012 Create BlockMesh class with InstancedMesh rendering in src/renderer/BlockMesh.ts
- [x] T013 Implement world-to-mesh synchronization in src/renderer/BlockMesh.ts
- [x] T014 Create Game class with main loop (requestAnimationFrame) in src/core/Game.ts
- [x] T015 Create main.ts entry point that initializes Game in src/main.ts

**Checkpoint**: Foundation ready - game renders flat terrain, user story implementation can begin

---

## Phase 3: User Story 1 - 自由移动探索 (Priority: P1) 🎯 MVP

**Goal**: 玩家可以使用 WASD + 鼠标在 3D 世界中自由移动和观察

**Independent Test**: 启动游戏 → 点击画面锁定鼠标 → WASD 移动 → 鼠标旋转视角

### Implementation for User Story 1

- [x] T016 [P] [US1] Create InputState interface in src/input/InputManager.ts
- [x] T017 [P] [US1] Create KeyboardInput class with WASD handling in src/input/KeyboardInput.ts
- [x] T018 [P] [US1] Create MouseInput class with pointer lock in src/input/MouseInput.ts
- [x] T019 [US1] Create InputManager class integrating keyboard and mouse in src/input/InputManager.ts
- [x] T020 [US1] Create Player class with position, rotation, velocity in src/player/Player.ts
- [x] T021 [US1] Create Camera class wrapping Three.js PerspectiveCamera in src/renderer/Camera.ts
- [x] T022 [US1] Create Movement class with WASD movement logic in src/player/Movement.ts
- [x] T023 [US1] Implement mouse look (yaw/pitch) in src/player/Movement.ts
- [x] T024 [US1] Implement AABB collision detection in src/player/Movement.ts
- [x] T025 [US1] Implement world boundary constraints in src/player/Movement.ts
- [x] T026 [US1] Integrate Player, Camera, Movement into Game loop in src/core/Game.ts
- [x] T027 [P] [US1] Create Crosshair UI component in src/ui/Crosshair.ts

**Checkpoint**: User Story 1 complete - player can move freely with WASD and mouse look

---

## Phase 4: User Story 2 - 破坏方块 (Priority: P2)

**Goal**: 玩家可以用鼠标左键破坏瞄准的方块

**Independent Test**: 瞄准方块 → 左键点击 → 方块消失

### Implementation for User Story 2

- [x] T028 [US2] Create Raycaster utility class in src/utils/Raycaster.ts
- [x] T029 [US2] Implement ray-block intersection detection in src/utils/Raycaster.ts
- [x] T030 [US2] Create BlockInteraction class in src/player/BlockInteraction.ts
- [x] T031 [US2] Implement destroyBlock method with distance check (5 blocks) in src/player/BlockInteraction.ts
- [x] T032 [US2] Add left-click event handling in src/input/MouseInput.ts
- [x] T033 [US2] Integrate block destruction into Game loop in src/core/Game.ts
- [x] T034 [US2] Update BlockMesh when block is destroyed in src/renderer/BlockMesh.ts

**Checkpoint**: User Story 2 complete - player can destroy blocks with left click

---

## Phase 5: User Story 3 - 放置方块 (Priority: P3)

**Goal**: 玩家可以用鼠标右键在方块表面放置新方块

**Independent Test**: 瞄准方块表面 → 右键点击 → 新方块出现

### Implementation for User Story 3

- [x] T035 [US3] Implement face normal detection in Raycaster in src/utils/Raycaster.ts
- [x] T036 [US3] Implement placeBlock method in src/player/BlockInteraction.ts
- [x] T037 [US3] Add placement validation (no overlap, not in player) in src/player/BlockInteraction.ts
- [x] T038 [US3] Add right-click event handling in src/input/MouseInput.ts
- [x] T039 [US3] Integrate block placement into Game loop in src/core/Game.ts
- [x] T040 [US3] Update BlockMesh when block is placed in src/renderer/BlockMesh.ts

**Checkpoint**: User Story 3 complete - player can place blocks with right click

---

## Phase 6: User Story 4 - 切换方块类型 (Priority: P4)

**Goal**: 玩家可以用数字键 1-5 切换当前选择的方块类型

**Independent Test**: 按数字键 1-5 → UI 显示切换 → 放置对应类型方块

### Implementation for User Story 4

- [x] T041 [US4] Add number key (1-5) handling in src/input/KeyboardInput.ts
- [x] T042 [US4] Add selectedBlockType property to Player in src/player/Player.ts
- [x] T043 [US4] Create BlockSelector UI component in src/ui/BlockSelector.ts
- [x] T044 [US4] Implement block type display with current selection highlight in src/ui/BlockSelector.ts
- [x] T045 [US4] Connect selectedBlockType to placeBlock in src/player/BlockInteraction.ts
- [x] T046 [US4] Integrate BlockSelector into Game in src/core/Game.ts

**Checkpoint**: User Story 4 complete - player can switch between 5 block types

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T047 [P] Add FPS counter display in src/ui/FpsCounter.ts
- [x] T048 [P] Add ESC key to unlock pointer in src/input/MouseInput.ts
- [x] T049 Performance optimization: ensure ≥ 60 FPS in src/renderer/BlockMesh.ts
- [x] T050 Add click-to-lock instruction overlay in src/ui/Crosshair.ts
- [x] T051 Run quickstart.md validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: ✅ Complete
- **Foundational (Phase 2)**: ✅ Complete
- **User Stories (Phase 3-6)**: ✅ Complete
- **Polish (Phase 7)**: ✅ Complete

### User Story Dependencies

- **User Story 1 (P1)**: ✅ Complete
- **User Story 2 (P2)**: ✅ Complete
- **User Story 3 (P3)**: ✅ Complete
- **User Story 4 (P4)**: ✅ Complete

---

## Implementation Summary

**Total Tasks**: 51
**Completed**: 51
**Status**: ✅ All tasks complete

### Files Created

- `src/core/Block.ts` - BlockType enum and utilities
- `src/core/World.ts` - World class with terrain generation
- `src/core/Game.ts` - Main game loop
- `src/renderer/Renderer.ts` - Three.js renderer wrapper
- `src/renderer/BlockMesh.ts` - InstancedMesh block rendering
- `src/renderer/TextureAtlas.ts` - Procedural texture atlas
- `src/renderer/Camera.ts` - First-person camera
- `src/input/InputManager.ts` - Input state management
- `src/input/KeyboardInput.ts` - Keyboard handling
- `src/input/MouseInput.ts` - Mouse and pointer lock
- `src/player/Player.ts` - Player entity
- `src/player/Movement.ts` - Movement and collision
- `src/player/BlockInteraction.ts` - Block placement/destruction
- `src/utils/Raycaster.ts` - Ray-block intersection
- `src/ui/Crosshair.ts` - Crosshair UI
- `src/ui/BlockSelector.ts` - Block selection UI
- `src/ui/FpsCounter.ts` - FPS display
- `src/main.ts` - Entry point
- `index.html` - HTML template with styles
