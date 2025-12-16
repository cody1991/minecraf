# Tasks: 物品与背包系统

**Input**: Design documents from `/specs/019-inventory-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 未明确要求测试，本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3）
- 描述中包含具体文件路径

## Path Conventions

- **单项目结构**: `src/` 在仓库根目录
- 遵循现有项目结构

---

## Phase 1: Setup (基础设施)

**Purpose**: 项目初始化和类型定义

- [X] T001 创建物品类型常量定义在 src/player/InventoryConstants.ts
- [X] T002 [P] 扩展 SaveData 接口添加 inventory 字段在 src/storage/SaveData.ts
- [X] T003 [P] 在 SynthAudio 中添加拾取音效生成方法在 src/audio/SynthAudio.ts

---

## Phase 2: Foundational (基础模块)

**Purpose**: 所有用户故事依赖的核心模块

**⚠️ CRITICAL**: 必须完成此阶段才能开始用户故事实现

- [X] T004 创建 Inventory 类实现背包数据结构在 src/player/Inventory.ts
- [X] T005 实现 Inventory.addItem() 方法（堆叠逻辑）在 src/player/Inventory.ts
- [X] T006 实现 Inventory.removeItem() 方法在 src/player/Inventory.ts
- [X] T007 实现 Inventory.swapSlots() 方法在 src/player/Inventory.ts
- [X] T008 实现 Inventory.serialize() 和 deserialize() 方法在 src/player/Inventory.ts
- [X] T009 修改 Player 类添加 inventory 属性在 src/player/Player.ts
- [X] T010 修改 Player.getState() 和 restoreState() 包含背包数据在 src/player/Player.ts

**Checkpoint**: 背包核心数据结构就绪，可开始用户故事实现

---

## Phase 3: User Story 1 - 破坏方块获得物品 (Priority: P1) 🎯 MVP

**Goal**: 玩家破坏方块后掉落物品实体，自动拾取到背包

**Independent Test**: 破坏任意方块，观察物品掉落、弹跳、自动拾取和音效

### Implementation for User Story 1

- [X] T011 [P] [US1] 创建 ItemEntity 类继承 Entity 在 src/entities/ItemEntity.ts
- [X] T012 [US1] 实现 ItemEntity 3D 网格渲染（0.25 尺寸方块 + 旋转动画）在 src/entities/ItemEntity.ts
- [X] T013 [US1] 实现 ItemEntity 物理效果（重力、弹跳）在 src/entities/ItemEntity.ts
- [X] T014 [US1] 实现 ItemEntity 玩家吸引逻辑（2格范围，8格/秒速度）在 src/entities/ItemEntity.ts
- [X] T015 [US1] 实现 ItemEntity 生命周期（5分钟消失、岩浆销毁）在 src/entities/ItemEntity.ts
- [X] T016 [US1] 修改 BlockInteraction.destroyBlock() 生成 ItemEntity 在 src/player/BlockInteraction.ts
- [X] T017 [US1] 在 Game.update() 中添加物品拾取检测逻辑在 src/core/Game.ts
- [X] T018 [US1] 实现拾取时调用 Inventory.addItem() 和播放音效在 src/core/Game.ts
- [X] T019 [US1] 处理背包满时物品留在地面的逻辑在 src/core/Game.ts

**Checkpoint**: 此时可独立测试物品掉落和拾取功能

---

## Phase 4: User Story 2 - 背包管理 (Priority: P2)

**Goal**: 玩家按 E 键打开背包界面，拖拽整理物品

**Independent Test**: 按 E 键打开/关闭背包，拖拽物品移动和交换

### Implementation for User Story 2

- [X] T020 [P] [US2] 创建 InventoryUI 类在 src/ui/InventoryUI.ts
- [X] T021 [US2] 实现背包界面 DOM 结构（36 格网格布局）在 src/ui/InventoryUI.ts
- [X] T022 [US2] 实现背包界面样式（CSS Grid 9 列）在 src/ui/InventoryUI.ts
- [X] T023 [US2] 实现物品槽渲染（图标 + 数量显示）在 src/ui/InventoryUI.ts
- [X] T024 [US2] 实现拖拽功能（HTML5 Drag and Drop API）在 src/ui/InventoryUI.ts
- [X] T025 [US2] 实现物品交换逻辑（拖拽到已有物品的格子）在 src/ui/InventoryUI.ts
- [X] T026 [US2] 实现右键拆分堆叠功能在 src/ui/InventoryUI.ts
- [X] T027 [US2] 添加 E 键监听打开/关闭背包在 src/input/InputManager.ts
- [X] T028 [US2] 实现背包打开时解锁鼠标指针在 src/ui/InventoryUI.ts
- [X] T029 [US2] 实现 ESC 键关闭背包在 src/ui/InventoryUI.ts
- [X] T030 [US2] 在 Game 类中集成 InventoryUI 在 src/core/Game.ts

**Checkpoint**: 此时可独立测试背包界面和物品管理功能

---

## Phase 5: User Story 3 - 快捷栏使用 (Priority: P3)

**Goal**: 底部快捷栏显示物品，支持数字键和滚轮切换

**Independent Test**: 数字键 1-9 切换槽位，滚轮循环切换，高亮显示正确

### Implementation for User Story 3

- [X] T031 [P] [US3] 创建 HotbarUI 类替代 BlockSelector 在 src/ui/HotbarUI.ts
- [X] T032 [US3] 实现快捷栏 DOM 结构（9 格水平布局）在 src/ui/HotbarUI.ts
- [X] T033 [US3] 实现物品图标和数量显示在 src/ui/HotbarUI.ts
- [X] T034 [US3] 实现选中槽位高亮显示在 src/ui/HotbarUI.ts
- [X] T035 [US3] 实现数字键 1-9 切换槽位在 src/ui/HotbarUI.ts
- [X] T036 [US3] 实现鼠标滚轮循环切换槽位在 src/ui/HotbarUI.ts
- [X] T037 [US3] 修改 InputManager 处理快捷栏输入在 src/input/InputManager.ts
- [X] T038 [US3] 在 Game 类中替换 BlockSelector 为 HotbarUI 在 src/core/Game.ts
- [X] T039 [US3] 实现快捷栏与背包数据同步更新在 src/ui/HotbarUI.ts

**Checkpoint**: 所有用户故事功能完成

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事优化和边缘情况处理

- [X] T040 [P] 实现物品实体在水中缓慢下沉在 src/entities/ItemEntity.ts
- [X] T041 [P] 限制同屏物品实体数量（最多 500 个）在 src/entities/EntityManager.ts
- [X] T042 [P] 实现区块卸载时清理物品实体在 src/entities/EntityManager.ts
- [X] T043 验证存档系统正确保存/加载背包数据在 src/storage/SaveManager.ts
- [X] T044 优化物品实体渲染性能在 src/entities/ItemEntity.ts
- [X] T045 清理废弃的 BlockSelector 相关代码在 src/ui/BlockSelector.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成 - 阻塞所有用户故事
- **User Stories (Phase 3-5)**: 依赖 Foundational 完成
  - US1 必须先完成（US2/US3 需要背包有物品才能测试）
  - US2 和 US3 可并行开发
- **Polish (Phase 6)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 完成后可开始 - 无其他故事依赖
- **User Story 2 (P2)**: 可在 US1 完成后开始（需要物品来测试拖拽）
- **User Story 3 (P3)**: 可在 US1 完成后开始（需要物品来测试显示）

### Within Each User Story

- 模型/实体类先于服务逻辑
- 核心功能先于 UI
- UI 结构先于交互逻辑

### Parallel Opportunities

- T002, T003 可并行（不同文件）
- T011 可与其他 US1 任务并行开始
- T020, T031 可并行（不同 UI 文件）
- T040, T041, T042 可并行（不同功能模块）

---

## Parallel Example: User Story 1

```bash
# 启动 US1 的并行任务:
Task: "创建 ItemEntity 类继承 Entity 在 src/entities/ItemEntity.ts"

# 完成 ItemEntity 后，可并行:
Task: "修改 BlockInteraction.destroyBlock() 生成 ItemEntity"
Task: "在 Game.update() 中添加物品拾取检测逻辑"
```

---

## Implementation Strategy

### MVP First (仅 User Story 1)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational (CRITICAL)
3. 完成 Phase 3: User Story 1
4. **STOP and VALIDATE**: 测试物品掉落和拾取
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. User Story 1 → 物品掉落拾取可用 (MVP!)
3. User Story 2 → 背包管理可用
4. User Story 3 → 快捷栏优化完成
5. 每个故事独立增加价值

### Recommended Execution Order

```
T001 → T002, T003 (并行)
    ↓
T004 → T005 → T006 → T007 → T008 → T009 → T010
    ↓
T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018 → T019
    ↓
T020 → T021 → ... → T030  (US2)
T031 → T032 → ... → T039  (US3，可与 US2 并行)
    ↓
T040, T041, T042 (并行) → T043 → T044 → T045
```

---

## Notes

- [P] 任务 = 不同文件，无依赖，可并行
- [Story] 标签将任务映射到特定用户故事
- 每个用户故事应可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何检查点停止以独立验证故事
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
