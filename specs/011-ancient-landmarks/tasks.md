# Tasks: 古代地标建筑群

**Input**: Design documents from `/specs/011-ancient-landmarks/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 未明确要求测试，本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 任务所属用户故事（US1, US2, US3, US4）
- 描述中包含具体文件路径

---

## Phase 1: Setup (基础设施)

**Purpose**: 项目初始化和基础结构

- [X] T001 [P] 扩展 BlockType 枚举添加 7 种新方块类型 in `src/core/Block.ts`
- [X] T002 [P] 添加新方块的属性定义（name, color, transparent, solid）in `src/core/Block.ts`
- [X] T003 [P] 添加地标区域常量 LANDMARK_ZONE_RADIUS 和建筑位置常量 in `src/terrain/ChunkConstants.ts`
- [X] T004 创建 LandmarkConfig 基础接口 in `src/terrain/LandmarkManager.ts`
- [X] T005 创建 LandmarkManager 类实现生成器注册和方块查询 in `src/terrain/LandmarkManager.ts`

---

## Phase 2: Foundational (阻塞性前置任务)

**Purpose**: 所有用户故事依赖的核心基础设施

**⚠️ CRITICAL**: 此阶段必须完成后才能开始任何用户故事

- [X] T006 修改 TerrainGenerator 添加 LandmarkManager 集成 in `src/terrain/TerrainGenerator.ts`
- [X] T007 修改 TerrainGenerator.getBlockTypeAt() 优先检查地标建筑 in `src/terrain/TerrainGenerator.ts`
- [X] T008 [P] 更新 BlockTextures 添加新方块纹理映射 in `src/renderer/BlockTextures.ts`
- [X] T009 [P] 更新 TextureAtlas 支持新方块纹理 in `src/renderer/TextureAtlas.ts`

**Checkpoint**: 基础设施就绪 - 可开始用户故事实现

---

## Phase 3: User Story 1 - 探索可进入的金字塔 (Priority: P1) 🎯 MVP

**Goal**: 玩家可以找到金字塔入口，进入内部探索迷宫走廊、密室和墓室

**Independent Test**: 从斗兽场出发找到金字塔，定位入口，进入内部探索至少3个不同房间

### Implementation for User Story 1

- [X] T010 [US1] 创建 PyramidConfig 接口定义金字塔配置参数 in `src/terrain/PyramidGenerator.ts`
- [X] T011 [US1] 创建 PyramidRoom 和 PyramidCorridor 接口定义内部结构 in `src/terrain/PyramidGenerator.ts`
- [X] T012 [US1] 定义 PYRAMID_LAYOUT 预定义迷宫布局常量 in `src/terrain/PyramidGenerator.ts`
- [X] T013 [US1] 实现 PyramidGenerator 类构造函数和配置初始化 in `src/terrain/PyramidGenerator.ts`
- [X] T014 [US1] 实现金字塔外部四面体结构生成逻辑 in `src/terrain/PyramidGenerator.ts`
- [X] T015 [US1] 实现金字塔入口开口生成（北侧底部）in `src/terrain/PyramidGenerator.ts`
- [X] T016 [US1] 实现金字塔内部房间空腔生成（入口厅、大走廊、宝藏室、墓室）in `src/terrain/PyramidGenerator.ts`
- [X] T017 [US1] 实现金字塔走廊连接生成（主路径和死路）in `src/terrain/PyramidGenerator.ts`
- [X] T018 [US1] 实现火把放置逻辑（主路径每5方块一个火把）in `src/terrain/PyramidGenerator.ts`
- [X] T019 [US1] 实现 getBlockAt() 方法整合所有生成逻辑 in `src/terrain/PyramidGenerator.ts`
- [X] T020 [US1] 实现 isInBounds() 和 getBoundingBox() 方法 in `src/terrain/PyramidGenerator.ts`
- [X] T021 [US1] 在 LandmarkManager 中注册 PyramidGenerator in `src/terrain/LandmarkManager.ts`

**Checkpoint**: 金字塔功能完整，可独立测试探索体验

---

## Phase 4: User Story 2 - 欣赏故宫建筑群 (Priority: P2)

**Goal**: 玩家可以发现故宫，识别红墙黄瓦等中国建筑特征，进入院落空间

**Independent Test**: 从斗兽场出发找到故宫，识别中国建筑特征，穿过大门进入院落

### Implementation for User Story 2

- [X] T022 [US2] 创建 ForbiddenCityConfig 接口定义故宫配置参数 in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T023 [US2] 实现 ForbiddenCityGenerator 类构造函数和配置初始化 in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T024 [US2] 实现故宫围墙生成（红砖墙体，高度6方块）in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T025 [US2] 实现故宫大门生成（南侧入口，可通行）in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T026 [US2] 实现故宫主殿建筑生成（20×15×12，红墙金顶）in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T027 [US2] 实现故宫院落空间生成（对称布局）in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T028 [US2] 实现故宫屋顶黄色装饰（GOLD_BLOCK）in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T029 [US2] 实现 getBlockAt() 方法整合所有生成逻辑 in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T030 [US2] 实现 isInBounds() 和 getBoundingBox() 方法 in `src/terrain/ForbiddenCityGenerator.ts`
- [X] T031 [US2] 在 LandmarkManager 中注册 ForbiddenCityGenerator in `src/terrain/LandmarkManager.ts`

**Checkpoint**: 故宫功能完整，可独立测试建筑欣赏体验

---

## Phase 5: User Story 3 - 探索古代城堡 (Priority: P3)

**Goal**: 玩家可以发现城堡，看到塔楼和城墙，进入内部探索大厅和塔楼

**Independent Test**: 从斗兽场出发找到城堡，识别中世纪建筑特征，进入城堡探索内部

### Implementation for User Story 3

- [X] T032 [US3] 创建 CastleConfig 接口定义城堡配置参数 in `src/terrain/CastleGenerator.ts`
- [X] T033 [US3] 实现 CastleGenerator 类构造函数和配置初始化 in `src/terrain/CastleGenerator.ts`
- [X] T034 [US3] 实现城堡城墙生成（60×60，高度10，厚度3）in `src/terrain/CastleGenerator.ts`
- [X] T035 [US3] 实现城堡四角塔楼生成（半径5，高度18）in `src/terrain/CastleGenerator.ts`
- [X] T036 [US3] 实现城堡大门生成（南侧入口，可通行）in `src/terrain/CastleGenerator.ts`
- [X] T037 [US3] 实现城堡内部大厅生成 in `src/terrain/CastleGenerator.ts`
- [X] T038 [US3] 实现塔楼内部楼梯和可探索空间 in `src/terrain/CastleGenerator.ts`
- [X] T039 [US3] 实现护城河生成（宽度4，水方块）in `src/terrain/CastleGenerator.ts`
- [X] T040 [US3] 实现 getBlockAt() 方法整合所有生成逻辑 in `src/terrain/CastleGenerator.ts`
- [X] T041 [US3] 实现 isInBounds() 和 getBoundingBox() 方法 in `src/terrain/CastleGenerator.ts`
- [X] T042 [US3] 在 LandmarkManager 中注册 CastleGenerator in `src/terrain/LandmarkManager.ts`

**Checkpoint**: 城堡功能完整，可独立测试探索体验

---

## Phase 6: User Story 4 - 平原区域扩展与建筑布局 (Priority: P4)

**Goal**: 斗兽场周围有足够大的平原区域，三座建筑有合理间距

**Independent Test**: 在斗兽场周围行走验证平原区域大小，检查建筑间距

### Implementation for User Story 4

- [X] T043 [US4] 修改 TerrainGenerator 扩展平原区域半径至 200 方块 in `src/terrain/TerrainGenerator.ts`
- [X] T044 [US4] 实现地标区域内禁用树木和植被生成 in `src/terrain/TerrainGenerator.ts`
- [X] T045 [US4] 验证三座建筑位置配置符合间距要求（50-100方块）in `src/terrain/LandmarkManager.ts`
- [X] T046 [US4] 实现 LandmarkManager.getAllBoundingBoxes() 用于碰撞检测 in `src/terrain/LandmarkManager.ts`

**Checkpoint**: 平原区域和建筑布局完整，所有建筑可见且间距合理

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 跨用户故事的改进和优化

- [X] T047 [P] 验证所有新方块的碰撞检测正确 in `src/core/Block.ts`
- [X] T048 性能验证：确保建筑区域帧率稳定（桌面60FPS，移动30FPS）
- [X] T049 运行 quickstart.md 手动测试清单验证所有功能
- [X] T050 代码清理：确保所有生成器遵循 ColosseumGenerator 模式

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成 - 阻塞所有用户故事
- **User Stories (Phase 3-6)**: 依赖 Foundational 完成
  - 用户故事可并行执行（如有多人）
  - 或按优先级顺序执行（P1 → P2 → P3 → P4）
- **Polish (Phase 7)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 完成后可开始 - 无其他故事依赖
- **User Story 2 (P2)**: Foundational 完成后可开始 - 无其他故事依赖
- **User Story 3 (P3)**: Foundational 完成后可开始 - 无其他故事依赖
- **User Story 4 (P4)**: 依赖 US1/US2/US3 完成（需要所有建筑就位才能验证布局）

### Within Each User Story

- Config 接口 → 构造函数 → 结构生成 → getBlockAt() → 注册到 Manager
- 每个故事完成后可独立验证

### Parallel Opportunities

- T001, T002, T003 可并行（不同文件）
- T008, T009 可并行（不同文件）
- US1, US2, US3 可并行（不同生成器文件）
- T047 可与其他 Polish 任务并行

---

## Parallel Example: Phase 1 Setup

```bash
# 可同时执行:
Task: "扩展 BlockType 枚举添加 7 种新方块类型 in src/core/Block.ts"
Task: "添加地标区域常量 in src/terrain/ChunkConstants.ts"
```

## Parallel Example: User Stories

```bash
# Foundational 完成后，可同时执行:
Task: "PyramidGenerator 完整实现 (T010-T021)"
Task: "ForbiddenCityGenerator 完整实现 (T022-T031)"
Task: "CastleGenerator 完整实现 (T032-T042)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - 阻塞所有故事)
3. Complete Phase 3: User Story 1 (金字塔)
4. **STOP and VALIDATE**: 测试金字塔探索体验
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 基础设施就绪
2. Add User Story 1 → 独立测试 → 部署 (MVP!)
3. Add User Story 2 → 独立测试 → 部署
4. Add User Story 3 → 独立测试 → 部署
5. Add User Story 4 → 验证整体布局 → 部署
6. 每个故事独立增加价值

### Parallel Team Strategy

多人开发时：

1. 团队共同完成 Setup + Foundational
2. Foundational 完成后：
   - Developer A: User Story 1 (金字塔)
   - Developer B: User Story 2 (故宫)
   - Developer C: User Story 3 (城堡)
3. 各故事独立完成后合并
4. 共同完成 User Story 4 (布局验证)

---

## Notes

- [P] 任务 = 不同文件，无依赖
- [Story] 标签映射任务到具体用户故事
- 每个用户故事可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何检查点停止验证故事独立性
- 避免: 模糊任务、同文件冲突、破坏独立性的跨故事依赖
