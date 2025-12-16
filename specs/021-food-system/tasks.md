# Tasks: 食物系统

**Input**: Design documents from `/specs/021-food-system/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 无自动化测试（项目使用手动测试）

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Paths follow plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 添加食物系统所需的基础类型和纹理

- [ ] T001 [P] 添加 5 种食物 BlockType 枚举值到 `src/core/Block.ts`
- [ ] T002 [P] 添加食物方块颜色定义到 `src/core/Block.ts` 的 BLOCK_COLORS
- [ ] T003 [P] 添加食物纹理生成逻辑到 `src/renderer/TextureAtlas.ts`
- [ ] T004 更新 FoodRegistry 关联 FoodType 到 BlockType 在 `src/survival/FoodRegistry.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 创建战斗系统和进食系统的核心模块

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 创建 `src/combat/` 目录
- [ ] T006 [P] 创建战斗常量文件 `src/combat/CombatConstants.ts`（ATTACK_DAMAGE=3, ATTACK_RANGE=3, ATTACK_COOLDOWN=0.5）
- [ ] T007 创建 CombatSystem 基础结构 `src/combat/CombatSystem.ts`（射线检测动物、攻击冷却）
- [ ] T008 [P] 创建进食常量文件 `src/survival/EatingConstants.ts`（EATING_DURATION=1.5）
- [ ] T009 创建 EatingSystem 基础结构 `src/survival/EatingSystem.ts`（状态机：IDLE/EATING/COMPLETED）
- [ ] T010 [P] 添加攻击命中音效到 `src/audio/AudioManager.ts`
- [ ] T011 [P] 添加进食咀嚼音效到 `src/audio/AudioManager.ts`
- [ ] T012 [P] 添加进食完成音效到 `src/audio/AudioManager.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 攻击动物获取食物 (Priority: P1) 🎯 MVP

**Goal**: 玩家左键攻击动物，动物受伤显示红色闪烁，死亡后掉落对应食物

**Independent Test**: 攻击任意动物直到死亡，验证掉落对应食物物品

### Implementation for User Story 1

- [ ] T013 [US1] 实现 CombatSystem.attack() 射线检测动物碰撞 `src/combat/CombatSystem.ts`
- [ ] T014 [US1] 实现 CombatSystem.canAttack() 攻击冷却检测 `src/combat/CombatSystem.ts`
- [ ] T015 [US1] 在 CombatSystem 中调用 Animal.takeDamage() 并播放攻击音效 `src/combat/CombatSystem.ts`
- [ ] T016 [US1] 添加 FoodRegistry.getBlockTypeForFood() 方法 `src/survival/FoodRegistry.ts`
- [ ] T017 [US1] 在 EntityManager 中处理动物死亡回调，创建食物 ItemEntity `src/entities/EntityManager.ts`
- [ ] T018 [US1] 集成 CombatSystem 到 Game，左键点击时调用 attack() `src/core/Game.ts`
- [ ] T019 [US1] 处理攻击与方块交互的优先级（动物优先于方块）`src/core/Game.ts`

**Checkpoint**: 攻击动物 → 动物死亡 → 掉落食物物品 完整流程可测试

---

## Phase 4: User Story 2 - 拾取食物到物品栏 (Priority: P2)

**Goal**: 玩家靠近食物掉落物自动拾取到物品栏，播放拾取音效

**Independent Test**: 接近地面上的食物掉落物，验证自动拾取并显示在物品栏

### Implementation for User Story 2

- [ ] T020 [US2] 在 FoodRegistry 添加 isFoodBlock() 方法判断 BlockType 是否为食物 `src/survival/FoodRegistry.ts`
- [ ] T021 [US2] 确保 ItemEntity 支持食物 BlockType 的正确纹理显示 `src/entities/ItemEntity.ts`
- [ ] T022 [US2] 验证现有拾取逻辑对食物 ItemEntity 正常工作 `src/entities/EntityManager.ts`
- [ ] T023 [US2] 验证食物添加到 Inventory 时正确堆叠 `src/player/Inventory.ts`

**Checkpoint**: 食物掉落 → 自动拾取 → 物品栏显示 完整流程可测试

---

## Phase 5: User Story 3 - 食用食物恢复饥饿值 (Priority: P3)

**Goal**: 玩家选中食物按住右键进食，完成后恢复饥饿值并消耗食物

**Independent Test**: 选中食物右键食用，验证饥饿值恢复且食物数量减少

### Implementation for User Story 3

- [ ] T024 [US3] 实现 EatingSystem.startEating() 开始进食逻辑 `src/survival/EatingSystem.ts`
- [ ] T025 [US3] 实现 EatingSystem.cancelEating() 取消进食逻辑 `src/survival/EatingSystem.ts`
- [ ] T026 [US3] 实现 EatingSystem.update() 进度更新和完成检测 `src/survival/EatingSystem.ts`
- [ ] T027 [US3] 在进食完成时调用 PlayerStats.addHunger() 恢复饥饿值 `src/survival/EatingSystem.ts`
- [ ] T028 [US3] 在进食完成时调用 Inventory.removeItem() 消耗食物 `src/survival/EatingSystem.ts`
- [ ] T029 [US3] 添加饥饿值已满检测，阻止进食 `src/survival/EatingSystem.ts`
- [ ] T030 [P] [US3] 创建进食进度条 UI 组件 `src/ui/EatingProgressUI.ts`
- [ ] T031 [US3] 集成 EatingSystem 到 SurvivalManager `src/survival/SurvivalManager.ts`
- [ ] T032 [US3] 处理右键按下/释放事件触发进食 `src/core/Game.ts`
- [ ] T033 [US3] 处理玩家移动时中断进食 `src/survival/EatingSystem.ts`
- [ ] T034 [US3] 播放进食音效（进食中和完成时）`src/survival/EatingSystem.ts`

**Checkpoint**: 选中食物 → 按住右键进食 → 恢复饥饿值 完整流程可测试

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 边缘情况处理和优化

- [ ] T035 处理食物掉落在岩浆中销毁的逻辑 `src/entities/ItemEntity.ts`
- [ ] T036 处理食物掉落在水中正常存在的逻辑 `src/entities/ItemEntity.ts`
- [ ] T037 验证进食与方块放置的右键冲突处理 `src/core/Game.ts`
- [ ] T038 验证攻击距离和拾取范围的数值平衡
- [ ] T039 运行 quickstart.md 中的所有测试检查点

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 → US2 → US3 (sequential, each builds on previous)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - 核心攻击和掉落机制
- **User Story 2 (P2)**: Depends on US1 - 需要食物掉落物才能测试拾取
- **User Story 3 (P3)**: Depends on US2 - 需要物品栏中有食物才能测试进食

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1 (Setup)**:
```
T001 (BlockType) ─┬─ 并行
T002 (Colors)    ─┤
T003 (Textures)  ─┘
       ↓
T004 (FoodRegistry) ← 依赖 T001
```

**Phase 2 (Foundational)**:
```
T005 (目录) → T006 (常量) ─┬─ 并行 → T007 (CombatSystem)
              T008 (常量) ─┤        → T009 (EatingSystem)
              T010 (音效) ─┤
              T011 (音效) ─┤
              T012 (音效) ─┘
```

**Phase 5 (US3)**:
```
T024-T029 (EatingSystem 核心) ─┬─ 并行
T030 (UI)                      ─┘
       ↓
T031-T034 (集成)
```

---

## Parallel Example: Phase 1 Setup

```bash
# 可并行执行:
Task T001: "添加 5 种食物 BlockType 枚举值到 src/core/Block.ts"
Task T002: "添加食物方块颜色定义到 src/core/Block.ts 的 BLOCK_COLORS"
Task T003: "添加食物纹理生成逻辑到 src/renderer/TextureAtlas.ts"

# 完成后执行:
Task T004: "更新 FoodRegistry 关联 FoodType 到 BlockType"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T012)
3. Complete Phase 3: User Story 1 (T013-T019)
4. **STOP and VALIDATE**: 攻击动物 → 死亡 → 掉落食物
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → 基础设施就绪
2. Add User Story 1 → 攻击掉落可测试 → **MVP!**
3. Add User Story 2 → 拾取可测试 → 增量交付
4. Add User Story 3 → 进食可测试 → 完整功能
5. Each story adds value without breaking previous stories

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- 项目无自动化测试，使用 quickstart.md 中的手动测试检查点
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
