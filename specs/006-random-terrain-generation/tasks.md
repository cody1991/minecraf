# Tasks: 随机地形生成与冲刺移动

**Input**: Design documents from `/specs/006-random-terrain-generation/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 未明确要求测试，本任务列表不包含测试任务。

**Organization**: 任务按用户故事组织，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3, US4）
- 描述中包含确切文件路径

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- 基于 plan.md 结构

---

## Phase 1: Setup (基础配置)

**Purpose**: 新增类型定义和配置常量

- [X] T001 [P] 在 `src/terrain/BiomeTypes.ts` 中定义 BiomeType 枚举和 BiomeConfig 接口
- [X] T002 [P] 在 `src/core/ChunkConstants.ts` 中添加 waterLevel、biomeScale、spawnSafeRadius 配置常量
- [X] T003 [P] 在 `src/player/Player.ts` 中添加 SPRINT_MULTIPLIER 常量

---

## Phase 2: Foundational (核心基础设施)

**Purpose**: 生物群系生成器 - 所有地形相关用户故事的基础

**⚠️ CRITICAL**: US1、US2、US3 均依赖此阶段完成

- [X] T004 创建 `src/terrain/BiomeGenerator.ts` 生物群系生成器类
- [X] T005 在 BiomeGenerator 中实现 getBiomeAt(x, z) 方法，使用大尺度噪声采样
- [X] T006 在 BiomeGenerator 中实现出生安全区逻辑（原点 50 方块内强制 PLAINS）
- [X] T007 在 BiomeGenerator 中添加生物群系缓存机制

**Checkpoint**: 生物群系生成器就绪，可开始用户故事实现

---

## Phase 3: User Story 1 - 每次进入游戏体验不同的地图 (Priority: P1) 🎯 MVP

**Goal**: 每次新游戏使用随机种子生成不同地形，斗兽场位置固定

**Independent Test**: 启动游戏两次，对比斗兽场周围的地形是否不同

### Implementation for User Story 1

- [X] T008 [US1] 修改 `src/core/World.ts` 构造函数，使用 Date.now() 生成随机种子
- [X] T009 [US1] 修改 `src/core/World.ts` 添加 getSeed() 方法暴露当前种子
- [X] T010 [US1] 修改 `src/terrain/TerrainGenerator.ts` 构造函数，创建并集成 BiomeGenerator
- [X] T011 [US1] 确保 `src/terrain/ColosseumGenerator.ts` 在原点固定生成不受种子影响

**Checkpoint**: 每次启动游戏地形不同，斗兽场位置固定

---

## Phase 4: User Story 2 - 探索多样化的自然地形 (Priority: P1)

**Goal**: 生成湖泊、山脉、平原三种地形，地形间自然过渡

**Independent Test**: 向不同方向探索 500 方块，发现至少 2 种不同地形

### Implementation for User Story 2

- [X] T012 [US2] 修改 `src/terrain/TerrainGenerator.ts` getHeightAt() 方法，根据生物群系调整高度参数
- [X] T013 [US2] 在 `src/terrain/BiomeTypes.ts` 中添加 BIOME_CONFIGS 配置表（高度偏移、变化缩放）
- [X] T014 [US2] 修改 `src/terrain/TerrainGenerator.ts` getBlockTypeAt() 方法，添加水方块生成逻辑
- [X] T015 [US2] 在 getBlockTypeAt() 中实现：y <= waterLevel && y > terrainHeight 时返回 WATER
- [X] T016 [US2] 实现生物群系边界插值平滑过渡（可选优化）

**Checkpoint**: 可发现湖泊（水域）、山脉（高地）、平原（草地），过渡自然

---

## Phase 5: User Story 3 - 地形区域具有规模感 (Priority: P2)

**Goal**: 湖泊、山脉等地形成片分布，具有规模感

**Independent Test**: 测量湖泊面积 >= 32x32，山脉高差 >= 20 方块

### Implementation for User Story 3

- [X] T017 [US3] 调整 `src/terrain/BiomeGenerator.ts` 中 biomeScale 参数（0.005）确保大片区域
- [X] T018 [US3] 调整 `src/terrain/BiomeTypes.ts` 中 LAKE 的 baseHeightOffset（-10）确保足够低洼
- [X] T019 [US3] 调整 `src/terrain/BiomeTypes.ts` 中 MOUNTAIN 的 heightVariationScale（2.5）确保足够高

**Checkpoint**: 湖泊成片、山脉连绵、平原开阔

---

## Phase 6: User Story 4 - 按住 Shift 键快速跑动 (Priority: P2)

**Goal**: 按住 Shift 键以 1.5 倍速度冲刺移动

**Independent Test**: 按住 Shift+W 移动 1 秒，距离约 7.5 方块（正常 5 方块）

### Implementation for User Story 4

- [X] T020 [P] [US4] 修改 `src/input/InputManager.ts` InputState 接口，添加 sprint: boolean 字段
- [X] T021 [P] [US4] 修改 `src/input/InputManager.ts` getState() 方法，检测 ShiftLeft/ShiftRight 按键
- [X] T022 [US4] 修改 `src/player/Movement.ts` updateHorizontalVelocity() 方法，根据 sprint 状态应用速度倍率
- [X] T023 [US4] 验证冲刺在跳跃中和水中均正常工作

**Checkpoint**: 按住 Shift 移动速度加快，松开恢复正常

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 优化和完善

- [X] T024 [P] 在 `src/core/World.ts` 中添加自定义种子输入支持（FR-008 可选功能）
- [X] T025 [P] 添加控制台日志输出当前世界种子，便于调试
- [X] T026 性能验证：确保地形生成不影响 60 FPS 帧率
- [X] T027 运行 quickstart.md 中的验证步骤

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成 - 阻塞所有用户故事
- **User Stories (Phase 3-6)**: 均依赖 Foundational 完成
  - US1 和 US4 可并行（无交叉依赖）
  - US2 依赖 US1（需要随机种子生效）
  - US3 依赖 US2（调整 US2 的参数）
- **Polish (Phase 7)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 完成后可开始 - 无故事间依赖
- **User Story 2 (P1)**: 依赖 US1（随机种子需生效）
- **User Story 3 (P2)**: 依赖 US2（调整生物群系参数）
- **User Story 4 (P2)**: Foundational 完成后可开始 - 与地形无依赖，可与 US1 并行

### Parallel Opportunities

- Phase 1: T001, T002, T003 可并行
- Phase 6: T020, T021 可并行（不同文件）
- US1 和 US4 可并行开发（不同模块）

---

## Parallel Example: Setup Phase

```bash
# 并行执行 Setup 任务:
Task: "在 src/terrain/BiomeTypes.ts 中定义 BiomeType 枚举"
Task: "在 src/core/ChunkConstants.ts 中添加配置常量"
Task: "在 src/player/Player.ts 中添加 SPRINT_MULTIPLIER"
```

## Parallel Example: User Story 4

```bash
# 并行执行 US4 输入相关任务:
Task: "修改 InputManager.ts InputState 接口"
Task: "修改 InputManager.ts getState() 方法"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (BiomeGenerator)
3. Complete Phase 3: User Story 1 (随机种子)
4. **STOP and VALIDATE**: 启动两次游戏验证地形不同
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. Add US1 → 随机种子生效 → 验证 (MVP!)
3. Add US2 → 多样化地形 → 验证
4. Add US3 → 规模感调优 → 验证
5. Add US4 → 冲刺移动 → 验证
6. Polish → 完成

### Parallel Team Strategy

双人开发时：
1. 共同完成 Setup + Foundational
2. Foundational 完成后：
   - Developer A: US1 → US2 → US3（地形相关）
   - Developer B: US4（冲刺移动）
3. 合并后 Polish

---

## Notes

- [P] 任务 = 不同文件，无依赖
- [Story] 标签映射到具体用户故事
- 每个用户故事应可独立完成和测试
- 每个任务或逻辑组完成后提交
- 可在任意 Checkpoint 停止验证
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
