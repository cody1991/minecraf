# Tasks: 生态系统完善 - 动植物扩展

**Input**: Design documents from `/specs/009-ecosystem-flora-fauna/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 手动测试（无自动化测试要求）

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Entities in `src/entities/`
- Terrain generation in `src/terrain/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 扩展类型定义，为所有用户故事提供基础

- [x] T001 扩展 AnimalType 枚举添加 RABBIT, WOLF, FOX in `src/entities/AnimalTypes.ts`
- [x] T002 [P] 添加新动物配置 ANIMAL_CONFIGS 条目 in `src/entities/AnimalTypes.ts`
- [x] T003 [P] 创建 FishType 枚举和 FISH_CONFIGS in `src/entities/FishTypes.ts`
- [x] T004 [P] 扩展 PlantType 枚举添加 ROSE, TULIP, DAISY, CORNFLOWER in `src/terrain/PlantTypes.ts`
- [x] T005 [P] 创建 TreeType 枚举和 TREE_CONFIGS in `src/terrain/TreeTypes.ts`
- [x] T006 [P] 添加树木相关方块类型 OAK_LOG, BIRCH_LOG, SPRUCE_LOG, OAK_LEAVES, BIRCH_LEAVES, SPRUCE_LEAVES in `src/core/BlockTypes.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 核心基础设施，所有用户故事依赖的共享组件

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 定义出生点保护常量 SPAWN_PROTECTION_RADIUS = 50 in `src/terrain/SpawnProtection.ts`
- [x] T008 创建 Fish 基类（继承 Entity，实现水中移动逻辑）in `src/entities/Fish.ts`
- [x] T009 创建 TreeGenerator 类（树木生成逻辑，间距检测）in `src/terrain/TreeGenerator.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 探索多样化的陆地动物生态 (Priority: P1) 🎯 MVP

**Goal**: 玩家在不同生物群系能遇到多种陆地动物（兔子、狼、狐狸）

**Independent Test**: 在平原看到兔子，在山地看到狼和狐狸，动物能正常漫游和逃跑

### Implementation for User Story 1

- [x] T010 [P] [US1] 创建 Rabbit 类（继承 Animal，棕色小型，快速移动）in `src/entities/Rabbit.ts`
- [x] T011 [P] [US1] 创建 Wolf 类（继承 Animal，灰色中型，被动行为）in `src/entities/Wolf.ts`
- [x] T012 [P] [US1] 创建 Fox 类（继承 Animal，橙色中型，敏捷）in `src/entities/Fox.ts`
- [x] T013 [US1] 更新 BIOME_SPAWN_WEIGHTS 添加新动物权重 in `src/entities/AnimalSpawner.ts`
- [x] T014 [US1] 更新 AnimalSpawner.createAnimal() 支持创建新动物类型 in `src/entities/AnimalSpawner.ts`
- [x] T015 [US1] 更新 maxPerChunk 为 6 in `src/entities/AnimalSpawner.ts`
- [x] T016 [US1] 在 EntityManager 中注册新动物类型 in `src/entities/EntityManager.ts`

**Checkpoint**: User Story 1 完成 - 可在不同生物群系看到 7 种动物

---

## Phase 4: User Story 2 - 欣赏丰富的植物景观 (Priority: P1)

**Goal**: 玩家能看到多种花卉和树木，分布自然不密集

**Independent Test**: 在平原看到玫瑰、郁金香等花卉，看到橡树、桦树等树木，树木间距 ≥8 格

### Implementation for User Story 2

- [x] T017 [P] [US2] 更新 BIOME_PLANTS 添加新花卉配置 in `src/terrain/PlantTypes.ts`
- [x] T018 [P] [US2] 实现橡树生成模式（球形树叶）in `src/terrain/TreeGenerator.ts`
- [x] T019 [P] [US2] 实现桦树生成模式（柱形树叶）in `src/terrain/TreeGenerator.ts`
- [x] T020 [P] [US2] 实现云杉生成模式（锥形树叶）in `src/terrain/TreeGenerator.ts`
- [x] T021 [US2] 添加 BIOME_TREES 配置（按生物群系分配树木）in `src/terrain/TreeTypes.ts`
- [x] T022 [US2] 实现树木间距检测（MIN_TREE_SPACING = 8）in `src/terrain/TreeGenerator.ts`
- [x] T023 [US2] 在 TerrainGenerator 中集成 TreeGenerator in `src/terrain/TerrainGenerator.ts`
- [x] T024 [US2] 添加树干和树叶方块的纹理/颜色 in `src/core/Block.ts`

**Checkpoint**: User Story 2 完成 - 可看到多种花卉和树木，分布自然

---

## Phase 5: User Story 3 - 观察水中生物 (Priority: P2)

**Goal**: 玩家在水域能看到鱼类游动

**Independent Test**: 在湖泊看到普通鱼和热带鱼在水中游动，鱼不会游出水面

### Implementation for User Story 3

- [x] T025 [P] [US3] 创建 CommonFish 类（银色，常见）in `src/entities/CommonFish.ts`
- [x] T026 [P] [US3] 创建 TropicalFish 类（多色，稀有）in `src/entities/TropicalFish.ts`
- [x] T027 [US3] 创建 FishSpawner 类（水域生成逻辑）in `src/entities/FishSpawner.ts`
- [x] T028 [US3] 实现 FISH_SPAWN_WEIGHTS 按生物群系配置 in `src/entities/FishSpawner.ts`
- [x] T029 [US3] 实现水边界检测和掉头逻辑 in `src/entities/Fish.ts`
- [x] T030 [US3] 在 Game.ts 中集成 FishSpawner in `src/core/Game.ts`
- [x] T031 [US3] 在 World 中添加 isWaterAt() 辅助方法 in `src/core/World.ts`

**Checkpoint**: User Story 3 完成 - 可在水域看到鱼类游动

---

## Phase 6: User Story 4 - 出生点区域保持清爽 (Priority: P2)

**Goal**: 出生点（斗兽场）区域内无动物和额外植物

**Independent Test**: 进入游戏后在斗兽场内外观察，确认 50 格内无动物，无额外树木

### Implementation for User Story 4

- [x] T032 [US4] 在 AnimalSpawner 中添加出生点保护检测 in `src/entities/AnimalSpawner.ts`
- [x] T033 [US4] 在 FishSpawner 中添加出生点保护检测 in `src/entities/FishSpawner.ts`
- [x] T034 [US4] 在 TreeGenerator 中添加出生点保护检测 in `src/terrain/TreeGenerator.ts`
- [x] T035 [US4] 在 PlantGenerator 中添加出生点保护检测（降低密度）in `src/terrain/SpawnProtection.ts`

**Checkpoint**: User Story 4 完成 - 出生点区域干净整洁

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 性能优化和最终验证

- [x] T036 性能验证：确保 60 FPS 目标达成
- [x] T037 [P] 代码清理：移除调试日志和未使用代码
- [x] T038 运行 quickstart.md 中的测试检查点验证

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 和 US2 可并行（均为 P1，无相互依赖）
  - US3 依赖 T008 (Fish 基类)
  - US4 依赖 US1-US3 中的 Spawner 类
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: 依赖 Phase 1 (AnimalTypes) + Phase 2
- **User Story 2 (P1)**: 依赖 Phase 1 (PlantTypes, TreeTypes, BlockTypes) + Phase 2 (TreeGenerator)
- **User Story 3 (P2)**: 依赖 Phase 1 (FishTypes) + Phase 2 (Fish 基类)
- **User Story 4 (P2)**: 依赖 Phase 2 (SpawnProtection) + US1-US3 的 Spawner

### Within Each User Story

- 类型定义 → 实体类 → 生成器 → 集成
- [P] 标记的任务可并行执行

### Parallel Opportunities

- T002, T003, T004, T005, T006 可并行（不同文件）
- T010, T011, T012 可并行（三种新动物）
- T017, T018, T019, T020 可并行（花卉和树木模式）
- T025, T026 可并行（两种鱼类）

---

## Parallel Example: User Story 1

```bash
# Launch all animal classes together:
Task: "创建 Rabbit 类 in src/entities/Rabbit.ts"
Task: "创建 Wolf 类 in src/entities/Wolf.ts"
Task: "创建 Fox 类 in src/entities/Fox.ts"
```

## Parallel Example: User Story 2

```bash
# Launch all tree patterns together:
Task: "实现橡树生成模式 in src/terrain/TreeGenerator.ts"
Task: "实现桦树生成模式 in src/terrain/TreeGenerator.ts"
Task: "实现云杉生成模式 in src/terrain/TreeGenerator.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T009)
3. Complete Phase 3: User Story 1 (T010-T016)
4. **STOP and VALIDATE**: 在不同生物群系测试新动物
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. Add User Story 1 → 测试动物多样性 → 可演示
3. Add User Story 2 → 测试植物景观 → 可演示
4. Add User Story 3 → 测试水中生物 → 可演示
5. Add User Story 4 → 测试出生点保护 → 完整功能

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- 每个用户故事可独立完成和测试
- 每个任务完成后提交代码
- 在任何检查点可停下验证功能
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
