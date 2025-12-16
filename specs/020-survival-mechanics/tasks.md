# Tasks: 生存机制

**Input**: Design documents from `/specs/020-survival-mechanics/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 创建生存机制模块基础结构

- [x] T001 创建 `src/survival/` 目录结构
- [x] T002 [P] 创建 `src/survival/index.ts` 模块导出文件
- [x] T003 [P] 创建 `src/survival/SurvivalConstants.ts` 常量定义文件

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 核心基础设施，所有用户故事依赖此阶段

**⚠️ CRITICAL**: 用户故事实现前必须完成此阶段

- [x] T004 创建 `src/survival/PlayerStats.ts` 玩家生存状态类（生命值、饥饿值、氧气值、无敌时间）
- [x] T005 [P] 创建 `src/survival/DamageSystem.ts` 统一伤害处理系统（DamageSource 枚举、takeDamage 方法）
- [x] T006 [P] 添加 `LAVA` 方块类型到 `src/core/Block.ts`（如不存在）
- [x] T007 修改 `src/player/Player.ts` 集成 PlayerStats 实例

**Checkpoint**: 基础设施就绪 - 可开始用户故事实现

---

## Phase 3: User Story 1 - 生命值显示与受伤反馈 (Priority: P1) 🎯 MVP

**Goal**: 玩家拥有 10 颗心生命值，受伤时屏幕闪红，生命值实时显示

**Independent Test**: 让玩家从高处跳下，验证生命值减少和红屏效果

### Implementation for User Story 1

- [x] T008 [P] [US1] 创建 `src/ui/HealthBar.ts` 生命值 UI 组件（10 颗心，支持半心显示）
- [x] T009 [P] [US1] 创建 `src/ui/DamageOverlay.ts` 受伤红屏效果组件（0.3s 触发，0.5s 持续）
- [x] T010 [US1] 在 `src/survival/DamageSystem.ts` 实现无敌时间逻辑（0.5 秒）
- [x] T011 [US1] 在 `src/core/Game.ts` 集成 HealthBar UI 到游戏主循环
- [x] T012 [US1] 在 `src/core/Game.ts` 集成 DamageOverlay 到伤害事件

**Checkpoint**: 生命值系统可独立测试 - 玩家受伤时生命值减少、红屏闪烁

---

## Phase 4: User Story 2 - 死亡与重生机制 (Priority: P1)

**Goal**: 玩家生命值归零时死亡，显示死亡画面，可重生

**Independent Test**: 让玩家持续受伤直到死亡，验证死亡画面和重生流程

### Implementation for User Story 2

- [x] T013 [P] [US2] 创建 `src/ui/DeathScreen.ts` 死亡画面 UI（全屏遮罩、"重生"按钮）
- [x] T014 [US2] 在 `src/survival/PlayerStats.ts` 实现 `die()` 和 `respawn()` 方法
- [ ] T015 [US2] 在 `src/player/Player.ts` 实现重生传送逻辑（传送至出生点 0, Y, 0）
- [ ] T016 [US2] 在 `src/core/Game.ts` 集成死亡画面显示和重生事件处理
- [ ] T017 [US2] 确保重生时物品栏保留（验证 Inventory 不被清空）

**Checkpoint**: 死亡重生系统可独立测试 - 玩家死亡后可重生

---

## Phase 5: User Story 3 - 饥饿值系统 (Priority: P2)

**Goal**: 玩家拥有 10 格饥饿值，跑步/跳跃消耗，影响生命恢复

**Independent Test**: 让玩家持续跑步跳跃，观察饥饿值下降

### Implementation for User Story 3

- [x] T018 [P] [US3] 创建 `src/ui/HungerBar.ts` 饥饿值 UI 组件（10 格食物图标）
- [x] T019 [P] [US3] 创建 `src/survival/HungerSystem.ts` 饥饿消耗逻辑
- [x] T020 [P] [US3] 创建 `src/survival/HealthRegenSystem.ts` 生命恢复逻辑（饥饿值 > 18 时恢复）
- [ ] T021 [US3] 修改 `src/player/Movement.ts` 触发跑步/跳跃饥饿消耗事件
- [x] T022 [US3] 在 `src/survival/HungerSystem.ts` 实现饥饿伤害（饥饿值 = 0 时每 4 秒 1 点伤害，不致死）
- [ ] T023 [US3] 在 `src/core/Game.ts` 集成 HungerBar UI 和饥饿系统更新

**Checkpoint**: 饥饿值系统可独立测试 - 跑步跳跃消耗饥饿值，高饥饿值恢复生命

---

## Phase 6: User Story 4 - 食物系统 (Priority: P2)

**Goal**: 动物死亡掉落生肉，玩家可进食恢复饥饿值

**Independent Test**: 击杀动物获取食物，右键进食验证饥饿值恢复

### Implementation for User Story 4

- [x] T024 [P] [US4] 创建 `src/survival/FoodRegistry.ts` 食物注册表（5 种生肉及恢复值）
- [ ] T025 [P] [US4] 添加食物物品类型到 `src/core/Block.ts`（RAW_BEEF, RAW_PORKCHOP, RAW_MUTTON, RAW_CHICKEN, RAW_RABBIT）
- [x] T026 [US4] 修改 `src/entities/AnimalTypes.ts` 添加动物生命值和掉落物配置
- [x] T027 [US4] 修改 `src/entities/Animal.ts` 添加 `health`、`takeDamage()`、`die()` 方法
- [ ] T028 [US4] 在 `src/entities/Animal.ts` 实现死亡时生成 ItemEntity 掉落食物
- [ ] T029 [US4] 实现玩家点击动物造成伤害（在 `src/player/BlockInteraction.ts` 或新建交互模块）
- [ ] T030 [US4] 修改 `src/player/Inventory.ts` 添加 `useItem()` 方法支持食物使用
- [ ] T031 [US4] 实现右键使用食物恢复饥饿值逻辑（检查饥饿值是否已满）
- [ ] T032 [P] [US4] 添加进食音效到 `src/audio/AudioManager.ts`

**Checkpoint**: 食物系统可独立测试 - 击杀动物掉落食物，进食恢复饥饿值

---

## Phase 7: User Story 5 - 环境伤害系统 (Priority: P3)

**Goal**: 实现摔落、溺水、岩浆、仙人掌伤害

**Independent Test**: 让玩家进入各种危险环境验证伤害触发

### Implementation for User Story 5

- [x] T033 [P] [US5] 创建 `src/survival/EnvironmentDamage.ts` 环境伤害检测模块
- [x] T034 [US5] 实现摔落伤害检测（在落地时计算坠落高度，> 3 格触发伤害）
- [x] T035 [US5] 实现溺水伤害检测（水下氧气倒计时 10 秒，耗尽后每秒 2 点伤害）
- [x] T036 [US5] 实现岩浆伤害检测（接触 LAVA 方块时每 0.5 秒 4 点伤害）
- [x] T037 [US5] 实现仙人掌伤害检测（接触 CACTUS 方块时 1 点伤害）
- [ ] T038 [US5] 在 `src/core/Game.ts` 集成环境伤害系统到游戏主循环
- [x] T039 [P] [US5] 创建氧气条 UI（可选，在 HungerBar 旁边显示水下氧气）

**Checkpoint**: 环境伤害系统可独立测试 - 4 种伤害类型均正确触发

---

## Phase 8: Polish & Integration

**Purpose**: 跨用户故事的优化和集成

- [ ] T040 [P] 存档系统集成 - 修改 `src/storage/` 保存/加载 PlayerStats 数据
- [ ] T041 [P] 存档系统集成 - 修改 `src/storage/` 保存/加载动物生命值
- [ ] T042 性能验证 - 确保生存系统运行时帧率保持 60 FPS
- [x] T043 [P] 更新 `src/survival/index.ts` 导出所有模块
- [ ] T044 运行 quickstart.md 验证完整流程

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 立即开始
- **Foundational (Phase 2)**: 依赖 Setup - **阻塞所有用户故事**
- **User Story 1 (Phase 3)**: 依赖 Foundational
- **User Story 2 (Phase 4)**: 依赖 Foundational + US1（死亡依赖生命值系统）
- **User Story 3 (Phase 5)**: 依赖 Foundational
- **User Story 4 (Phase 6)**: 依赖 Foundational + US3（进食依赖饥饿值系统）
- **User Story 5 (Phase 7)**: 依赖 Foundational + US1（环境伤害依赖伤害系统）
- **Polish (Phase 8)**: 依赖所有用户故事完成

### User Story Dependencies

```
Foundational (Phase 2)
       │
       ├──────────────┬──────────────┐
       ▼              ▼              ▼
    US1 (P1)       US3 (P2)       US5 (P3)
    生命值         饥饿值         环境伤害
       │              │
       ▼              ▼
    US2 (P1)       US4 (P2)
    死亡重生       食物系统
```

### Parallel Opportunities

**Phase 2 内可并行**:
- T005 DamageSystem.ts
- T006 Block.ts (LAVA)

**Phase 3 内可并行**:
- T008 HealthBar.ts
- T009 DamageOverlay.ts

**Phase 5 内可并行**:
- T018 HungerBar.ts
- T019 HungerSystem.ts
- T020 HealthRegenSystem.ts

**Phase 6 内可并行**:
- T024 FoodRegistry.ts
- T025 Block.ts (食物类型)
- T032 AudioManager.ts

**跨 Phase 可并行**:
- US3 (饥饿值) 和 US5 (环境伤害) 可同时开发

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: User Story 1 (生命值)
4. 完成 Phase 4: User Story 2 (死亡重生)
5. **验证**: 玩家可受伤、死亡、重生

### Incremental Delivery

1. MVP: 生命值 + 死亡重生 → 可玩的生存基础
2. +饥饿值系统 → 资源管理维度
3. +食物系统 → 完整生存循环
4. +环境伤害 → 丰富危险元素

---

## Notes

- [P] 任务 = 不同文件，无依赖
- [Story] 标签映射到具体用户故事
- 每个用户故事可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何 Checkpoint 停止验证故事独立性
