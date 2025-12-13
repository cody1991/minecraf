# Tasks: 罗马斗兽场视觉增强

**Input**: Design documents from `/specs/010-colosseum-enhancement/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: 无单元测试要求，采用视觉验收测试

**Organization**: 任务按用户故事分组，每个故事可独立实现和测试

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3, US4）
- 所有任务在 `src/terrain/ColosseumGenerator.ts` 中实现

---

## Phase 1: Setup

**Purpose**: 确认现有代码结构，准备开发环境

- [X] T001 阅读并理解现有 `src/terrain/ColosseumGenerator.ts` 代码结构
- [X] T002 阅读 `src/core/Block.ts` 确认可用方块类型（STONE, COBBLESTONE, BRICK, SAND, DIRT, TALL_GRASS, LEAVES）
- [X] T003 启动开发服务器 `npm run dev`，确认斗兽场正常生成

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 添加辅助方法，为所有用户故事提供基础

**⚠️ CRITICAL**: 所有用户故事依赖此阶段完成

- [X] T004 在 `src/terrain/ColosseumGenerator.ts` 中添加 `seededRandom(x, z)` 辅助方法用于确定性随机
- [X] T005 在 `src/terrain/ColosseumGenerator.ts` 中添加 `isPilasterPosition(angle, levelY)` 辅助方法判断壁柱位置
- [X] T006 在 `src/terrain/ColosseumGenerator.ts` 中添加 `isCornicePosition(levelY)` 辅助方法判断檐口位置

**Checkpoint**: 基础设施就绪，可开始用户故事实现

---

## Phase 3: User Story 1 - 欣赏更精美的斗兽场外观 (Priority: P1) 🎯 MVP

**Goal**: 外墙具有立体感，包括凸出壁柱、檐口装饰带、顶层雉堞

**Independent Test**: 进入游戏，环绕斗兽场外墙观察，检查壁柱、檐口、雉堞是否可见

### Implementation for User Story 1

- [X] T007 [US1] 在 `getBlockAt()` 外墙区域添加壁柱凸出逻辑（depthFromOuter <= 1 时向外延伸）in `src/terrain/ColosseumGenerator.ts`
- [X] T008 [US1] 为壁柱添加柱头装饰（levelY == levelHeight-2 返回 BRICK）in `src/terrain/ColosseumGenerator.ts`
- [X] T009 [US1] 为壁柱添加柱础装饰（levelY == 1 返回 BRICK）in `src/terrain/ColosseumGenerator.ts`
- [X] T010 [US1] 添加檐口凸出逻辑（levelY == 0 或 levelHeight-1 时向外延伸 1 方块，返回 BRICK）in `src/terrain/ColosseumGenerator.ts`
- [X] T011 [US1] 添加顶层雉堞生成逻辑（relY == totalHeight 时，在 isPillar 位置生成锯齿状 STONE）in `src/terrain/ColosseumGenerator.ts`
- [X] T012 [US1] 为拱门添加拱券石装饰（拱门顶部曲线外侧返回 BRICK）in `src/terrain/ColosseumGenerator.ts`
- [X] T013 [US1] 为拱门两侧添加半圆柱装饰（posInUnit 边界位置返回 COBBLESTONE）in `src/terrain/ColosseumGenerator.ts`
- [ ] T014 [US1] 视觉验收：启动游戏，绕斗兽场一周，确认壁柱、檐口、雉堞、拱门装饰可见

**Checkpoint**: User Story 1 完成，外墙立体结构可独立验收

---

## Phase 4: User Story 2 - 体验丰富的内部装饰 (Priority: P2)

**Goal**: 观众席有层次变化，走廊有拱形天花板，竞技场地面有装饰图案

**Independent Test**: 进入斗兽场内部，观察座位、走廊天花板、地面图案

### Implementation for User Story 2

- [X] T015 [US2] 修改观众席方块选择逻辑（tierIndex % 3 选择 STONE/COBBLESTONE/BRICK）in `src/terrain/ColosseumGenerator.ts`
- [X] T016 [US2] 添加走廊拱形天花板生成逻辑（计算走廊中心距离，使用半圆形曲线确定天花板高度）in `src/terrain/ColosseumGenerator.ts`
- [X] T017 [US2] 添加竞技场地面中心圆形标记（距离 3-5 方块返回 DIRT）in `src/terrain/ColosseumGenerator.ts`
- [X] T018 [US2] 添加竞技场地面放射状分区线（每 45° 一条线，返回 DIRT）in `src/terrain/ColosseumGenerator.ts`
- [ ] T019 [US2] 视觉验收：进入斗兽场内部，确认座位层次、拱形天花板、地面图案可见

**Checkpoint**: User Story 2 完成，内部装饰可独立验收

---

## Phase 5: User Story 3 - 感受废墟区域的历史沧桑感 (Priority: P3)

**Goal**: 废墟区域有不规则边缘、散落碎石、植被点缀

**Independent Test**: 观察斗兽场废墟区域（角度 108°-216°），检查不规则边缘和植被

### Implementation for User Story 3

- [X] T020 [US3] 增强 `isInRuins()` 方法的噪声函数，生成更不规则的断裂边缘 in `src/terrain/ColosseumGenerator.ts`
- [X] T021 [US3] 在废墟区域地面添加散落碎石逻辑（10% 概率返回 COBBLESTONE）in `src/terrain/ColosseumGenerator.ts`
- [X] T022 [US3] 在废墟区域添加植被生成逻辑（15% 概率返回 TALL_GRASS 或 LEAVES）in `src/terrain/ColosseumGenerator.ts`
- [X] T023 [US3] 确保散落碎石和植被的 solid 属性正确（碎石 solid=true，植被 solid=false）in `src/terrain/ColosseumGenerator.ts`
- [ ] T024 [US3] 视觉验收：观察废墟区域，确认不规则边缘、碎石、植被可见

**Checkpoint**: User Story 3 完成，废墟效果可独立验收

---

## Phase 6: User Story 4 - 体验更丰富的材质层次 (Priority: P4)

**Goal**: 斗兽场使用至少 3 种不同材质区分结构

**Independent Test**: 近距离观察斗兽场各部位，确认材质差异

### Implementation for User Story 4

- [X] T025 [US4] 确认壁柱柱身使用 COBBLESTONE（与主墙面 STONE 区分）in `src/terrain/ColosseumGenerator.ts`
- [X] T026 [US4] 确认装饰元素（柱头、柱础、檐口、拱券石）使用 BRICK in `src/terrain/ColosseumGenerator.ts`
- [X] T027 [US4] 修改走廊地面方块为 STONE（与竞技场 SAND 区分）in `src/terrain/ColosseumGenerator.ts`
- [ ] T028 [US4] 视觉验收：确认整体斗兽场至少使用 3 种不同视觉效果的材质

**Checkpoint**: User Story 4 完成，材质层次可独立验收

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 性能验证和最终检查

- [ ] T029 性能验收：在斗兽场区域监控帧率，确认不低于 54 FPS（60 FPS 的 90%）
- [ ] T030 碰撞验收：在斗兽场各区域行走，确认所有通行路径畅通，无穿墙或卡住
- [ ] T031 运行 quickstart.md 中的完整验收检查清单
- [ ] T032 代码清理：移除调试日志，确保代码风格一致

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖，立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成，阻塞所有用户故事
- **User Stories (Phase 3-6)**: 依赖 Foundational 完成
  - 可按优先级顺序执行（P1 → P2 → P3 → P4）
  - 或并行执行（如有多人协作）
- **Polish (Phase 7)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 完成后可开始，无其他依赖
- **User Story 2 (P2)**: Foundational 完成后可开始，与 US1 独立
- **User Story 3 (P3)**: Foundational 完成后可开始，与 US1/US2 独立
- **User Story 4 (P4)**: 依赖 US1 完成（材质选择基于 US1 的结构）

### Within Each User Story

- 按任务顺序执行（逻辑依赖）
- 每个故事最后一个任务为视觉验收

---

## Parallel Opportunities

由于所有任务都在同一文件 `ColosseumGenerator.ts` 中实现，并行机会有限。建议：

1. **顺序执行用户故事**：P1 → P2 → P3 → P4
2. **每个故事内部顺序执行**：任务有逻辑依赖
3. **可并行的场景**：
   - T001, T002, T003 可并行（只读操作）
   - T004, T005, T006 可并行（添加独立的辅助方法）

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: User Story 1
4. **STOP and VALIDATE**: 视觉验收外墙立体结构
5. 如满足需求，可提前交付

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. User Story 1 → 外墙精美化 → 验收 (MVP!)
3. User Story 2 → 内部装饰 → 验收
4. User Story 3 → 废墟沧桑感 → 验收
5. User Story 4 → 材质层次 → 验收
6. 每个故事独立增值，不破坏之前功能

---

## Notes

- 所有任务在单一文件 `src/terrain/ColosseumGenerator.ts` 中实现
- 使用现有方块类型，无需修改 `Block.ts`
- 每个用户故事以视觉验收任务结束
- 建议每完成一个用户故事后提交代码
- 如遇性能问题，优先简化废墟区域噪声计算
