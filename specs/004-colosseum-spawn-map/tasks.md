# Tasks: 罗马斗兽场出生地图

**Input**: Design documents from `/specs/004-colosseum-spawn-map/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, quickstart.md ✓

**Tests**: 未明确要求测试，本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3）
- 描述中包含确切文件路径

## Path Conventions

- **项目类型**: 单项目结构
- **源码路径**: `src/` 在仓库根目录
- **测试路径**: `tests/` 在仓库根目录

---

## Phase 1: Setup (基础设施)

**Purpose**: 创建斗兽场生成器模块的基础结构

- [x] T001 创建 ColosseumConfig 接口和默认配置 in `src/terrain/ColosseumGenerator.ts`
- [x] T002 [P] 创建椭圆几何辅助函数（isInsideEllipse, isInEllipseRing）in `src/terrain/ColosseumGenerator.ts`

---

## Phase 2: Foundational (核心生成器)

**Purpose**: 实现 ColosseumGenerator 核心类，为所有用户故事提供基础

**⚠️ CRITICAL**: 所有用户故事依赖此阶段完成

- [x] T003 实现 ColosseumGenerator 类骨架（构造函数、配置初始化）in `src/terrain/ColosseumGenerator.ts`
- [x] T004 实现 isInColosseumBounds() 边界检测方法 in `src/terrain/ColosseumGenerator.ts`
- [x] T005 实现竞技场地面生成逻辑（isInArena, 返回 SAND）in `src/terrain/ColosseumGenerator.ts`
- [x] T006 实现阶梯式看台生成逻辑（isInTier, 3层递增高度）in `src/terrain/ColosseumGenerator.ts`
- [x] T007 实现外墙生成逻辑（isInWall, 返回 STONE）in `src/terrain/ColosseumGenerator.ts`
- [x] T008 实现拱门镂空逻辑（isInArch, 24个拱门均匀分布）in `src/terrain/ColosseumGenerator.ts`
- [x] T009 实现外围走廊生成逻辑（isInCorridor）in `src/terrain/ColosseumGenerator.ts`
- [x] T010 实现 getBlockAt() 主方法，整合所有结构检测 in `src/terrain/ColosseumGenerator.ts`
- [x] T011 集成 ColosseumGenerator 到 TerrainGenerator in `src/terrain/TerrainGenerator.ts`
- [x] T012 更新 World 类以支持斗兽场区域的出生点计算 in `src/core/World.ts`

**Checkpoint**: 基础生成器就绪 - 可开始用户故事实现

---

## Phase 3: User Story 1 - 玩家在斗兽场中心出生 (Priority: P1) 🎯 MVP

**Goal**: 玩家进入游戏时出生在斗兽场竞技场中心，能看到完整的椭圆形竞技场结构

**Independent Test**: 启动游戏，验证玩家出生在斗兽场中心位置，环顾四周可见完整竞技场

### Implementation for User Story 1

- [x] T013 [US1] 确保 getSpawnPosition() 返回斗兽场中心沙地区域上方位置 in `src/core/World.ts`
- [x] T014 [US1] 验证斗兽场中心区域正确生成 SAND 方块 in `src/terrain/ColosseumGenerator.ts`
- [x] T015 [US1] 确保玩家出生时周围区块已加载，可见完整椭圆结构 in `src/core/ChunkManager.ts`
- [x] T016 [US1] 验证玩家死亡重生返回斗兽场中心（现有逻辑应自动支持）in `src/player/Player.ts`

**Checkpoint**: 玩家可在斗兽场中心出生，能看到完整竞技场结构

---

## Phase 4: User Story 2 - 探索斗兽场建筑结构 (Priority: P2)

**Goal**: 玩家可自由探索斗兽场各区域，所有结构可行走且碰撞正确

**Independent Test**: 控制玩家在斗兽场各区域移动，验证可走上看台、穿过拱门、进入走廊

### Implementation for User Story 2

- [x] T017 [US2] 验证阶梯式看台可行走（每层高度差为1方块，玩家可跳上）in `src/terrain/ColosseumGenerator.ts`
- [x] T018 [US2] 验证拱门通道可通行（拱门区域为 AIR）in `src/terrain/ColosseumGenerator.ts`
- [x] T019 [US2] 验证外围走廊可行走（走廊地面为 STONE）in `src/terrain/ColosseumGenerator.ts`
- [x] T020 [US2] 验证墙壁碰撞正确（现有物理系统应自动支持 STONE 碰撞）in `src/physics/Collision.ts`
- [x] T021 [US2] 确保斗兽场与周围地形无缝衔接，玩家可自由进出 in `src/terrain/TerrainGenerator.ts`

**Checkpoint**: 玩家可完整探索斗兽场所有区域，碰撞正确

---

## Phase 5: User Story 3 - 欣赏斗兽场视觉效果 (Priority: P3)

**Goal**: 斗兽场采用符合古罗马风格的材质和配色，营造古典竞技场氛围

**Independent Test**: 视觉检查材质、配色是否符合古罗马风格

### Implementation for User Story 3

- [x] T022 [US3] 确认墙壁/柱子使用 STONE 材质（灰色石质纹理）in `src/terrain/ColosseumGenerator.ts`
- [x] T023 [US3] 确认竞技场地面使用 SAND 材质（沙土色调）in `src/terrain/ColosseumGenerator.ts`
- [x] T024 [US3] 确认看台使用 STONE 材质形成层次感 in `src/terrain/ColosseumGenerator.ts`
- [x] T025 [US3] 验证光照效果自然（现有渲染系统应自动支持）in `src/renderer/ChunkRenderer.ts`

**Checkpoint**: 斗兽场视觉效果符合古罗马风格

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 优化和完善

- [x] T026 [P] 性能优化：确保斗兽场生成时间 < 100ms in `src/terrain/ColosseumGenerator.ts`
- [x] T027 [P] 代码清理：添加必要的 JSDoc 注释 in `src/terrain/ColosseumGenerator.ts`
- [x] T028 运行 quickstart.md 验证流程 in `specs/004-colosseum-spawn-map/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成 - 阻塞所有用户故事
- **User Stories (Phase 3-5)**: 依赖 Foundational 完成
  - 用户故事可并行执行（如有多人）
  - 或按优先级顺序执行（P1 → P2 → P3）
- **Polish (Phase 6)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 完成后可开始 - 无其他故事依赖
- **User Story 2 (P2)**: Foundational 完成后可开始 - 可与 US1 并行
- **User Story 3 (P3)**: Foundational 完成后可开始 - 可与 US1/US2 并行

### Within Each User Story

- 核心实现优先于验证任务
- 故事完成后再进入下一优先级

### Parallel Opportunities

- T001, T002 可并行（Phase 1）
- T013-T016 (US1) 可与 T017-T021 (US2) 并行（如有多人）
- T026, T027 可并行（Phase 6）

---

## Parallel Example: Foundational Phase

```bash
# 可并行的基础设施任务（不同功能模块）:
Task T005: "实现竞技场地面生成逻辑"
Task T006: "实现阶梯式看台生成逻辑"
Task T007: "实现外墙生成逻辑"
Task T008: "实现拱门镂空逻辑"
Task T009: "实现外围走廊生成逻辑"
```

---

## Implementation Strategy

### MVP First (仅 User Story 1)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational（关键 - 阻塞所有故事）
3. 完成 Phase 3: User Story 1
4. **停止并验证**: 独立测试 User Story 1
5. 如就绪可部署/演示

### Incremental Delivery

1. 完成 Setup + Foundational → 基础就绪
2. 添加 User Story 1 → 独立测试 → 部署/演示 (MVP!)
3. 添加 User Story 2 → 独立测试 → 部署/演示
4. 添加 User Story 3 → 独立测试 → 部署/演示
5. 每个故事增加价值而不破坏之前的故事

---

## Notes

- [P] 任务 = 不同文件，无依赖
- [Story] 标签将任务映射到特定用户故事以便追踪
- 每个用户故事应可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何检查点停止以独立验证故事
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
