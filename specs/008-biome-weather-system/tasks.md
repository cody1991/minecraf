# Tasks: 生物、植物与天气系统

**Input**: Design documents from `/specs/008-biome-weather-system/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 无自动化测试（项目当前无测试框架配置，采用手动测试）

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Paths follow existing project structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create new directories and base types for the feature

- [ ] T001 Create entities directory structure at src/entities/
- [ ] T002 Create weather directory structure at src/weather/
- [ ] T003 [P] Add plant block types to src/core/Block.ts (FLOWER_RED, FLOWER_YELLOW, TALL_GRASS, MUSHROOM_RED, MUSHROOM_BROWN, DEAD_BUSH, CACTUS)
- [ ] T004 [P] Create AnimalType and AnimalState enums in src/entities/AnimalTypes.ts
- [ ] T005 [P] Create WeatherType enum and TimePeriod enum in src/weather/WeatherTypes.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core systems that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create base Entity class in src/entities/Entity.ts (id, position, rotation, chunkX, chunkZ)
- [ ] T007 Create TimeSystem class in src/weather/TimeSystem.ts (ticks, dayCount, update, getSunAngle, getMoonAngle, isDay)
- [ ] T008 [P] Create EntityManager class in src/entities/EntityManager.ts (add, remove, update, getByChunk, dispose)
- [ ] T009 Modify src/core/Game.ts to initialize TimeSystem and EntityManager

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 观察动物在世界中活动 (Priority: P1) 🎯 MVP

**Goal**: 玩家在草地生物群系中能看到牛、羊、猪、鸡等动物自然活动

**Independent Test**: 进入游戏后，在草地生物群系中能看到至少一种动物在移动和活动

### Implementation for User Story 1

- [ ] T010 [P] [US1] Create Animal base class in src/entities/Animal.ts (extends Entity, type, state, stateTimer, targetPosition, moveSpeed, mesh)
- [ ] T011 [P] [US1] Create AnimalAI module in src/entities/AnimalAI.ts (FSM: IDLE, WANDERING, FLEEING states with transitions)
- [ ] T012 [US1] Create Cow class in src/entities/Cow.ts (box-based mesh, brown color, specific dimensions)
- [ ] T013 [P] [US1] Create Sheep class in src/entities/Sheep.ts (box-based mesh, white/gray color, wool body)
- [ ] T014 [P] [US1] Create Pig class in src/entities/Pig.ts (box-based mesh, pink color, snout)
- [ ] T015 [P] [US1] Create Chicken class in src/entities/Chicken.ts (box-based mesh, white/red color, smaller size)
- [ ] T016 [US1] Create AnimalRenderer in src/renderer/AnimalRenderer.ts (createMesh for each type, updateAnimation)
- [ ] T017 [US1] Add animal spawn logic to EntityManager (spawnAnimalsInChunk, max 4 per chunk, biome-based)
- [ ] T018 [US1] Integrate animal update loop in src/core/Game.ts (call entityManager.update with deltaTime and playerPosition)
- [ ] T019 [US1] Add animal count to FPS display in src/core/Game.ts

**Checkpoint**: User Story 1 complete - animals visible and moving in grassland biomes

---

## Phase 4: User Story 2 - 体验昼夜循环与天体 (Priority: P1)

**Goal**: 玩家能体验完整的昼夜循环，看到太阳、月亮、星空，天空颜色随时间变化

**Independent Test**: 在游戏中等待，能观察到完整的日出、日落、月升过程，天空颜色相应变化

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create sky vertex shader in src/weather/shaders/sky.vert (pass UV and position)
- [ ] T021 [P] [US2] Create sky fragment shader in src/weather/shaders/sky.frag (time-based color gradient)
- [ ] T022 [US2] Create SkyRenderer class in src/weather/SkyRenderer.ts (skydome with ShaderMaterial, sun mesh, moon mesh, stars)
- [ ] T023 [US2] Implement sun position calculation in SkyRenderer (east to west arc based on TimeSystem)
- [ ] T024 [US2] Implement moon position calculation in SkyRenderer (opposite to sun)
- [ ] T025 [US2] Implement star field rendering in SkyRenderer (static points visible at night)
- [ ] T026 [US2] Implement dynamic ambient light in src/renderer/Renderer.ts (adjust intensity based on time)
- [ ] T027 [US2] Integrate SkyRenderer in src/core/Game.ts (create, update with TimeSystem)
- [ ] T028 [US2] Remove static sky background color in src/renderer/Renderer.ts (let SkyRenderer handle it)

**Checkpoint**: User Story 2 complete - full day/night cycle with sun, moon, stars visible

---

## Phase 5: User Story 3 - 体验下雨天气 (Priority: P2)

**Goal**: 玩家能体验随机出现的下雨天气，包含雨滴粒子效果和天空变暗

**Independent Test**: 在游戏中等待或触发下雨，能看到雨滴粒子效果和天空变暗

### Implementation for User Story 3

- [ ] T029 [P] [US3] Create WeatherSystem class in src/weather/WeatherSystem.ts (type, duration, transitionProgress, update, isRaining)
- [ ] T030 [US3] Create RainEffect class in src/weather/RainEffect.ts (Points particle system, 8000 particles)
- [ ] T031 [US3] Implement rain particle update in RainEffect (fall animation, reset at bottom, follow player)
- [ ] T032 [US3] Implement underwater check in RainEffect (hide particles when player.isSubmerged)
- [ ] T033 [US3] Integrate WeatherSystem in src/core/Game.ts (create, update)
- [ ] T034 [US3] Connect RainEffect visibility to WeatherSystem.isRaining() in src/core/Game.ts
- [ ] T035 [US3] Modify ambient light in Renderer to dim 30% when raining
- [ ] T036 [US3] Modify SkyRenderer to darken sky colors when raining

**Checkpoint**: User Story 3 complete - rain effect with particles and darkened sky

---

## Phase 6: User Story 4 - 观察世界中的植物 (Priority: P2)

**Goal**: 玩家能看到花朵、草丛、蘑菇等植物自然分布在地表，不同生物群系有不同植物

**Independent Test**: 在草地生物群系中能看到花朵和高草，在不同群系看到不同植物

### Implementation for User Story 4

- [ ] T037 [P] [US4] Create PlantTypes module in src/terrain/PlantTypes.ts (plant block properties, biome-plant mapping)
- [ ] T038 [P] [US4] Add plant block textures configuration to src/renderer/BlockTextures.ts
- [ ] T039 [US4] Create PlantGenerator class in src/terrain/PlantGenerator.ts (generate plants on chunk surface)
- [ ] T040 [US4] Implement biome-based plant selection in PlantGenerator (Plains: flowers/grass, Mountain: grass/deadbush, Desert: cactus)
- [ ] T041 [US4] Integrate PlantGenerator into terrain generation in src/terrain/TerrainGenerator.ts
- [ ] T042 [US4] Add plant mesh generation to src/renderer/ChunkMesh.ts (cross-shaped billboard for flowers/grass)
- [ ] T043 [US4] Handle plant transparency in ChunkMesh (no face culling between plant blocks)

**Checkpoint**: User Story 4 complete - plants visible in appropriate biomes

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimization and edge case handling

- [ ] T044 [P] Implement animal LOD in AnimalRenderer (simplify mesh at distance > 32 blocks)
- [ ] T045 [P] Implement animal frustum culling in EntityManager (skip update/render for off-screen animals)
- [ ] T046 Add animal despawn on chunk unload in EntityManager
- [ ] T047 Add performance logging for animal count vs FPS
- [ ] T048 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 and US2 are both P1, can proceed in parallel
  - US3 depends on US2 (needs TimeSystem and SkyRenderer for weather integration)
  - US4 can proceed independently after Foundational
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 3 (P2)**: Depends on US2 (SkyRenderer for weather effects)
- **User Story 4 (P2)**: Can start after Foundational - No dependencies on other stories

### Within Each User Story

- Base classes before specific implementations
- Renderers after entity classes
- Integration into Game.ts after all components ready

### Parallel Opportunities

- T003, T004, T005 can run in parallel (different files)
- T010, T011 can run in parallel (Animal.ts and AnimalAI.ts)
- T012, T013, T014, T015 can run in parallel (individual animal classes)
- T020, T021 can run in parallel (shader files)
- T029, T037, T038 can run in parallel (different systems)
- T044, T045 can run in parallel (different optimization targets)

---

## Parallel Example: User Story 1

```bash
# Launch all animal classes together (after T010, T011 complete):
Task: "Create Cow class in src/entities/Cow.ts"
Task: "Create Sheep class in src/entities/Sheep.ts"
Task: "Create Pig class in src/entities/Pig.ts"
Task: "Create Chicken class in src/entities/Chicken.ts"
```

## Parallel Example: User Story 2

```bash
# Launch shader files together:
Task: "Create sky vertex shader in src/weather/shaders/sky.vert"
Task: "Create sky fragment shader in src/weather/shaders/sky.frag"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Animals)
4. **STOP and VALIDATE**: Test animals visible and moving
5. Demo: "Look, there are cows and sheep!"

### Recommended Order (Full Feature)

1. Setup + Foundational → Foundation ready
2. User Story 1 (Animals) → Test → Core gameplay element ✓
3. User Story 2 (Day/Night) → Test → Atmosphere complete ✓
4. User Story 3 (Rain) → Test → Weather variety ✓
5. User Story 4 (Plants) → Test → Visual richness ✓
6. Polish → Performance validated ✓

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Animals)
   - Developer B: User Story 2 (Day/Night)
   - Developer C: User Story 4 (Plants)
3. After US2 complete:
   - Developer B: User Story 3 (Rain)
4. All: Polish phase

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Performance target: 50 animals at 30+ FPS
