# Tasks: 区块与地形生成系统

**Input**: Design documents from `/specs/002-chunk-terrain-system/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: 未明确要求，本任务列表不包含测试任务。如需测试，可后续添加。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3）
- 描述包含精确文件路径

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- 基于 plan.md 结构：`src/core/`, `src/terrain/`, `src/renderer/`

---

## Phase 1: Setup (基础设施)

**Purpose**: 新增目录结构和共享工具

- [x] T001 创建 terrain 目录结构 `src/terrain/`
- [x] T002 [P] 创建区块系统常量和类型定义 `src/core/ChunkConstants.ts`
- [x] T003 [P] 创建优先级队列工具类 `src/utils/PriorityQueue.ts`

---

## Phase 2: Foundational (核心基础模块)

**Purpose**: 所有用户故事共同依赖的核心模块，必须先完成

**⚠️ CRITICAL**: 用户故事实现必须等待此阶段完成

- [x] T004 实现 Simplex Noise 生成器 `src/terrain/NoiseGenerator.ts`
- [x] T005 实现 Chunk 数据结构（扁平化 Uint8Array 存储）`src/core/Chunk.ts`
- [x] T006 实现 ChunkMesh 单区块网格渲染（暴露面检测）`src/renderer/ChunkMesh.ts`
- [x] T007 实现 ChunkRenderer 多区块渲染管理（视锥剔除）`src/renderer/ChunkRenderer.ts`
- [x] T008 重构 World 类为基于区块的世界管理 `src/core/World.ts`
- [x] T009 适配 Raycaster 支持区块系统 `src/utils/Raycaster.ts`
- [x] T010 适配 Player/Movement 支持新世界系统 `src/player/Movement.ts`
- [x] T011 适配 BlockInteraction 支持区块系统 `src/player/BlockInteraction.ts`
- [x] T012 更新 Game 主循环集成新系统 `src/core/Game.ts`
- [x] T013 废弃/移除旧 BlockMesh 全局渲染 `src/renderer/BlockMesh.ts`

**Checkpoint**: 核心区块系统就绪，可以开始用户故事实现

---

## Phase 3: User Story 1 - 探索自然生成的地形世界 (Priority: P1) 🎯 MVP

**Goal**: 玩家进入游戏看到由噪声算法生成的自然地形，有山丘起伏，不同高度分布不同方块（草地/泥土/石头）

**Independent Test**: 启动游戏，观察地形是否有自然起伏，检查不同高度的方块类型

### Implementation for User Story 1

- [x] T014 [US1] 实现 TerrainGenerator 地形生成器（多倍频噪声高度图）`src/terrain/TerrainGenerator.ts`
- [x] T015 [US1] 实现高度分层方块分布逻辑（石头/泥土/草地）`src/terrain/TerrainGenerator.ts`
- [x] T016 [US1] 集成 TerrainGenerator 到 World/Chunk 生成流程 `src/core/World.ts`
- [x] T017 [US1] 实现 getHeightAt 地形高度查询（用于生成出生点）`src/terrain/TerrainGenerator.ts`
- [x] T018 [US1] 更新 getSpawnPosition 使用地形高度 `src/core/World.ts`
- [x] T019 [US1] 验证地形高度变化范围达到 30+ 方块 `src/terrain/TerrainGenerator.ts`

**Checkpoint**: 玩家可以看到自然起伏的地形，不同高度有不同方块类型

---

## Phase 4: User Story 2 - 流畅探索大型世界 (Priority: P1)

**Goal**: 玩家可以在 1000×1000+ 范围自由探索，区块按需加载/卸载，保持 60 FPS

**Independent Test**: 玩家持续向一个方向移动数分钟，观察新地形持续生成、帧率稳定

### Implementation for User Story 2

- [x] T020 [US2] 实现 ChunkManager 区块加载/卸载调度器 `src/core/ChunkManager.ts`
- [x] T021 [US2] 实现优先级队列加载策略（距离 + 方向权重）`src/core/ChunkManager.ts`
- [x] T022 [US2] 实现圆形加载区域计算（loadRadius = 8）`src/core/ChunkManager.ts`
- [x] T023 [US2] 实现滞后卸载策略（unloadRadius = 10）`src/core/ChunkManager.ts`
- [x] T024 [US2] 实现每帧最大加载限制（maxLoadsPerFrame = 2）`src/core/ChunkManager.ts`
- [x] T025 [US2] 集成 ChunkManager 到 Game 主循环 `src/core/Game.ts`
- [x] T026 [US2] 实现区块边界无缝衔接验证 `src/core/ChunkManager.ts`
- [x] T027 [US2] 实现世界种子支持（可重现地形）`src/core/World.ts`
- [x] T028 [US2] 性能验证：确保 60 FPS 目标 `src/core/Game.ts`

**Checkpoint**: 玩家可以无限探索，地形持续生成，帧率稳定

---

## Phase 5: User Story 3 - 发现洞穴探险 (Priority: P2)

**Goal**: 玩家可以发现自然生成的洞穴入口，洞穴延伸到地下可探索

**Independent Test**: 在世界中搜索洞穴入口，进入洞穴验证可通行性

### Implementation for User Story 3

- [x] T029 [US3] 实现 CaveGenerator 洞穴生成器（3D Simplex 阈值法）`src/terrain/CaveGenerator.ts`
- [x] T030 [US3] 配置洞穴参数（threshold=0.6, minHeight=8, maxHeight=56）`src/terrain/CaveGenerator.ts`
- [x] T031 [US3] 集成 CaveGenerator 到 TerrainGenerator `src/terrain/TerrainGenerator.ts`
- [x] T032 [US3] 确保洞穴壁为石头方块 `src/terrain/CaveGenerator.ts`
- [x] T033 [US3] 验证洞穴发现率（10分钟探索 80% 概率）`src/terrain/CaveGenerator.ts`

**Checkpoint**: 玩家可以发现并探索自然生成的洞穴

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事优化和收尾工作

- [x] T034 [P] 代码清理：移除未使用的旧代码 `src/renderer/BlockMesh.ts`
- [x] T035 [P] 添加调试信息：区块加载数量显示 `src/ui/FpsCounter.ts`
- [x] T036 性能优化：检查内存使用 < 512 MB `src/core/ChunkManager.ts`
- [x] T037 边缘情况：快速移动时的区块加载保护 `src/core/ChunkManager.ts`
- [ ] T038 运行 quickstart.md 验证所有功能 `specs/002-chunk-terrain-system/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup ──► Phase 2: Foundational ──┬──► Phase 3: US1 (P1) 🎯 MVP
                                           │
                                           ├──► Phase 4: US2 (P1)
                                           │
                                           └──► Phase 5: US3 (P2)
                                                      │
                                                      ▼
                                               Phase 6: Polish
```

### User Story Dependencies

| Story | Depends On | Can Parallel With |
|-------|------------|-------------------|
| US1 (地形生成) | Phase 2 完成 | US2（部分） |
| US2 (区块加载) | Phase 2 完成 | US1（部分） |
| US3 (洞穴) | US1 完成（需要 TerrainGenerator） | - |

**注意**: US1 和 US2 可以部分并行，但 US2 的 ChunkManager 需要调用 TerrainGenerator（US1），建议 US1 先完成核心后再并行。

### Within Each User Story

- 核心模块优先
- 集成任务最后
- 验证任务收尾

### Parallel Opportunities

**Phase 1 并行**:
```
T002 [P] ChunkConstants.ts
T003 [P] PriorityQueue.ts
```

**Phase 2 内部依赖**:
```
T004 NoiseGenerator ──► T014 TerrainGenerator
T005 Chunk ──► T006 ChunkMesh ──► T007 ChunkRenderer
T005 Chunk ──► T008 World ──► T009-T013 适配
```

**US3 依赖 US1**:
```
T014-T019 (US1 TerrainGenerator) ──► T029-T033 (US3 CaveGenerator)
```

---

## Parallel Example: Phase 2 Foundational

```bash
# 第一批并行（无依赖）:
Task: T004 "实现 Simplex Noise 生成器 src/terrain/NoiseGenerator.ts"
Task: T005 "实现 Chunk 数据结构 src/core/Chunk.ts"

# 第二批并行（依赖 T005）:
Task: T006 "实现 ChunkMesh src/renderer/ChunkMesh.ts"
Task: T008 "重构 World 类 src/core/World.ts"

# 第三批并行（依赖 T006, T008）:
Task: T007 "实现 ChunkRenderer src/renderer/ChunkRenderer.ts"
Task: T009 "适配 Raycaster src/utils/Raycaster.ts"
Task: T010 "适配 Movement src/player/Movement.ts"
Task: T011 "适配 BlockInteraction src/player/BlockInteraction.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. ✅ Complete Phase 1: Setup (T001-T003)
2. ✅ Complete Phase 2: Foundational (T004-T013) **CRITICAL**
3. ✅ Complete Phase 3: User Story 1 (T014-T019)
4. **STOP and VALIDATE**: 启动游戏，验证自然地形生成
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 区块系统基础就绪
2. + User Story 1 → 自然地形可见 → **MVP 可演示**
3. + User Story 2 → 无限世界可探索 → 完整体验
4. + User Story 3 → 洞穴可发现 → 增强探索深度
5. + Polish → 性能优化，生产就绪

### Suggested MVP Scope

**仅 User Story 1**（T001-T019，共 19 个任务）:
- 玩家可以看到自然起伏的地形
- 不同高度有不同方块类型
- 基本的区块渲染（固定范围）

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Tasks** | 38 |
| **Phase 1 (Setup)** | 3 |
| **Phase 2 (Foundational)** | 10 |
| **Phase 3 (US1)** | 6 |
| **Phase 4 (US2)** | 9 |
| **Phase 5 (US3)** | 5 |
| **Phase 6 (Polish)** | 5 |
| **Parallel Opportunities** | 12 tasks marked [P] |
| **MVP Scope** | T001-T019 (19 tasks) |

---

## Notes

- [P] 任务 = 不同文件，无依赖，可并行
- [US*] 标签 = 任务所属用户故事
- 每个用户故事可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何 Checkpoint 停止验证故事独立性
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
