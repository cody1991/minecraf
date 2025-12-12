# Tasks: 物理与碰撞系统 (Physics & Collision System)

**Input**: Design documents from `/specs/003-physics-collision/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: 未明确要求测试，本任务列表不包含测试任务。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Single project (TypeScript + Vite)
- **Source**: `src/` at repository root
- **New module**: `src/physics/` for physics system

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create physics module structure and shared utilities

- [x] T001 Create physics module directory structure at `src/physics/`
- [x] T002 [P] Create AABB utility class in `src/physics/AABB.ts` with intersection and containment methods
- [x] T003 [P] Create PhysicsConfig constants in `src/physics/PhysicsConstants.ts` (GRAVITY=32, JUMP_VELOCITY=8.5, TERMINAL_VELOCITY=78)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core physics infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Add `isGrounded: boolean` property to Player class in `src/player/Player.ts`
- [x] T005 [P] Add `jump: boolean` to InputState interface in `src/input/InputManager.ts`
- [x] T006 [P] Map Space key to jump input in `src/input/KeyboardInput.ts`
- [x] T007 Create IPhysicsBody interface in `src/physics/PhysicsTypes.ts` (position, velocity, width, height, isGrounded)
- [x] T008 Create ICollisionWorld interface in `src/physics/PhysicsTypes.ts` (getBlock, isValidPosition methods)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 玩家受重力影响下落 (Priority: P1) 🎯 MVP

**Goal**: 玩家在空中时受重力影响持续下落，直到接触固体方块

**Independent Test**: 将玩家放置在空中，观察玩家自然下落并停在方块表面

### Implementation for User Story 1

- [x] T009 [US1] Create Gravity module in `src/physics/Gravity.ts` with applyGravity(body, deltaTime) function
- [x] T010 [US1] Implement terminal velocity clamping in Gravity module (max 78 blocks/s)
- [x] T011 [US1] Create ground detection function checkGrounded(body, world) in `src/physics/Collision.ts`
- [x] T012 [US1] Implement vertical collision detection in `src/physics/Collision.ts` (Y-axis AABB check)
- [x] T013 [US1] Create PhysicsSystem class in `src/physics/PhysicsSystem.ts` with update(body, world, deltaTime) method
- [x] T014 [US1] Integrate PhysicsSystem into Movement class in `src/player/Movement.ts` (call physics update in game loop)
- [x] T015 [US1] Handle world bottom boundary in PhysicsSystem (stop at Y=0, no damage per spec)

**Checkpoint**: 玩家可以从空中下落并停在地面上

---

## Phase 4: User Story 2 - 玩家与方块碰撞检测 (Priority: P1)

**Goal**: 玩家无法穿过固体方块，碰撞时沿墙壁滑动

**Independent Test**: 让玩家走向墙壁，验证被阻挡且可沿墙滑动

### Implementation for User Story 2

- [x] T016 [US2] Implement X-axis collision detection in `src/physics/Collision.ts`
- [x] T017 [US2] Implement Z-axis collision detection in `src/physics/Collision.ts`
- [x] T018 [US2] Implement separated axis collision resolution (Y→X→Z order) in `src/physics/Collision.ts`
- [x] T019 [US2] Implement wall sliding behavior in collision resolution (preserve perpendicular velocity)
- [x] T020 [US2] Refactor Movement.moveWithCollision() in `src/player/Movement.ts` to use new Collision module
- [x] T021 [US2] Handle head collision (ceiling) when moving upward in collision detection
- [x] T022 [US2] Handle multi-block collision (player touching multiple blocks simultaneously)

**Checkpoint**: 玩家无法穿墙，可沿墙滑动，头部碰撞正常

---

## Phase 5: User Story 3 - 玩家跳跃功能 (Priority: P2)

**Goal**: 玩家站在地面时可跳跃约1格高度，空中无法二段跳

**Independent Test**: 在平地按空格跳跃，验证跳跃高度约1格且空中无法再跳

### Implementation for User Story 3

- [x] T023 [US3] Implement applyJump(body) function in `src/physics/PhysicsSystem.ts` (set velocity.y = JUMP_VELOCITY)
- [x] T024 [US3] Add jump input handling in Movement.update() in `src/player/Movement.ts`
- [x] T025 [US3] Implement ground-only jump restriction (check isGrounded before allowing jump)
- [x] T026 [US3] Verify jump height reaches ~1.13 blocks (adjust JUMP_VELOCITY if needed)

**Checkpoint**: 玩家可正常跳跃，空中无法二段跳

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, optimization, and integration verification

- [x] T027 [P] Add world boundary check for X/Z in `src/physics/Collision.ts` (infinite world, only Y bounded)
- [x] T028 [P] Optimize collision detection with early exit in `src/physics/Collision.ts`
- [x] T029 Verify 60 FPS performance with physics enabled (manual testing)
- [x] T030 Export all physics modules from `src/physics/index.ts`
- [x] T031 Update Game class in `src/core/Game.ts` to properly initialize PhysicsSystem

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Shares Collision.ts with US1, coordinate carefully
- **User Story 3 (P2)**: Depends on US1 (needs gravity and ground detection working)

### Within Each User Story

- Core physics logic before integration
- PhysicsSystem before Movement integration
- Collision detection before resolution

### Parallel Opportunities

- T002, T003 can run in parallel (different files)
- T005, T006 can run in parallel (different files)
- T027, T028 can run in parallel (different concerns)

---

## Parallel Example: Setup Phase

```bash
# Launch all setup tasks together:
Task: "Create AABB utility class in src/physics/AABB.ts"
Task: "Create PhysicsConfig constants in src/physics/PhysicsConstants.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Gravity)
4. **STOP and VALIDATE**: 玩家可以下落并停在地面
5. 可作为最小可用版本发布

### Incremental Delivery

1. Setup + Foundational → 基础设施就绪
2. User Story 1 (重力) → 玩家可下落 → 验证
3. User Story 2 (碰撞) → 玩家无法穿墙 → 验证
4. User Story 3 (跳跃) → 完整物理体验 → 验证
5. Polish → 性能优化和边缘情况处理

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 和 US2 都是 P1 优先级，但 US1 (重力) 应先完成因为 US2 (碰撞) 的垂直碰撞依赖重力系统
- 现有 Movement.ts 已有基础碰撞检测，需要重构而非完全重写
- 物理参数基于 research.md 中的决策 (GRAVITY=32, JUMP_VELOCITY=8.5)
