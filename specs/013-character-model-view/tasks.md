# Tasks: 人物模型与视角切换系统

**Input**: Design documents from `/specs/013-character-model-view/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: 未明确要求，本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 任务所属用户故事（US1, US2, US3）
- 包含精确文件路径

---

## Phase 1: Setup (共享基础设施)

**Purpose**: 项目结构初始化和基础类型定义

- [ ] T001 创建模型目录结构 `src/models/` 和 `src/models/blockman/`
- [ ] T002 [P] 创建共享类型定义文件 `src/player/CharacterTypes.ts`（ViewMode 枚举、CharacterColors、CharacterModelDefinition 接口）
- [ ] T003 [P] 创建常量定义文件 `src/player/CharacterConstants.ts`（摄像机距离、过渡时间等常量）

---

## Phase 2: Foundational (阻塞性前置任务)

**Purpose**: 所有用户故事共同依赖的核心基础设施

**⚠️ CRITICAL**: 必须完成此阶段后才能开始任何用户故事

- [ ] T004 实现 CharacterModel 基类 `src/player/CharacterModel.ts`（Three.js Group 创建、身体部位网格、updateTransform、dispose 方法）
- [ ] T005 实现方块人模型生成器 `src/models/blockman/BlockmanBuilder.ts`（程序化生成头、身体、四肢的立方体网格）
- [ ] T006 [P] 实现偏好设置管理器 `src/player/PreferenceManager.ts`（LocalStorage 读写、getPreference、savePreference 方法）

**Checkpoint**: 基础设施就绪 - 可以开始用户故事实现

---

## Phase 3: User Story 1 - 视角切换 (Priority: P1) 🎯 MVP

**Goal**: 玩家可通过 V 键在第一人称和第三人称视角之间切换

**Independent Test**: 进入游戏后按 V 键，观察视角是否正确切换，摄像机是否平滑过渡

### Implementation for User Story 1

- [ ] T007 [US1] 创建 CameraController 类 `src/renderer/CameraController.ts`（currentMode 状态、toggleViewMode、setViewMode 方法）
- [ ] T008 [US1] 实现第一人称视角逻辑 `src/renderer/CameraController.ts`（摄像机位于眼睛位置，隐藏角色模型）
- [ ] T009 [US1] 实现第三人称视角逻辑 `src/renderer/CameraController.ts`（摄像机位于角色身后 5 米，显示角色模型）
- [ ] T010 [US1] 实现视角切换平滑过渡 `src/renderer/CameraController.ts`（LERP 插值，0.3 秒过渡时间）
- [ ] T011 [US1] 实现摄像机碰撞检测 `src/renderer/CameraController.ts`（射线检测障碍物，自动调整距离避免穿墙）
- [ ] T012 [US1] 扩展 InputManager 添加 V 键处理 `src/input/InputManager.ts`（监听 KeyV 事件，调用 CameraController.toggleViewMode）
- [ ] T013 [US1] 创建默认角色模型定义 `src/models/blockman/default.ts`（灰色方块人，isDefault: true）
- [ ] T014 [US1] 扩展 Player 类添加角色模型引用 `src/player/Player.ts`（characterModel 属性，模型位置同步）
- [ ] T015 [US1] 集成 CameraController 到 Game 类 `src/core/Game.ts`（替换现有 Camera，update 循环调用）
- [ ] T016 [US1] 处理第三人称视角下的鼠标旋转 `src/renderer/CameraController.ts`（摄像机围绕角色旋转，保持跟随）

**Checkpoint**: 视角切换功能完整可用，可独立测试

---

## Phase 4: User Story 2 - 角色模型选择 (Priority: P2)

**Goal**: 玩家可在游戏开始前选择不同的角色模型

**Independent Test**: 打开角色选择界面，浏览模型，选择并确认，进入游戏后验证使用所选模型

### Implementation for User Story 2

- [ ] T017 [P] [US2] 创建角色选择 UI 容器 `src/ui/CharacterSelectUI.ts`（HTML/CSS 覆盖层，show/hide 方法）
- [ ] T018 [P] [US2] 创建模型预览渲染器 `src/ui/CharacterPreview.ts`（独立 Three.js 场景，旋转预览）
- [ ] T019 [US2] 实现模型列表展示 `src/ui/CharacterSelectUI.ts`（从 ModelLibrary 获取模型，生成缩略图列表）
- [ ] T020 [US2] 实现模型选择交互 `src/ui/CharacterSelectUI.ts`（点击模型触发预览，高亮选中状态）
- [ ] T021 [US2] 实现确认/取消按钮逻辑 `src/ui/CharacterSelectUI.ts`（确认保存偏好并关闭，取消直接关闭）
- [ ] T022 [US2] 实现模型预览旋转交互 `src/ui/CharacterPreview.ts`（鼠标拖拽旋转模型）
- [ ] T023 [US2] 集成角色选择到主菜单 `src/core/Game.ts`（添加"选择角色"按钮，打开 CharacterSelectUI）
- [ ] T024 [US2] 游戏启动时加载保存的角色偏好 `src/core/Game.ts`（从 PreferenceManager 读取，创建对应模型）

**Checkpoint**: 角色选择功能完整可用，可独立测试

---

## Phase 5: User Story 3 - 模型库管理 (Priority: P3)

**Goal**: 系统提供包含 5 个方块人风格角色的模型库

**Independent Test**: 检查模型库返回 5 个模型，逐个加载验证正确显示

### Implementation for User Story 3

- [ ] T025 [P] [US3] 创建 Steve 角色模型定义 `src/models/blockman/steve.ts`（蓝色衬衫方块人）
- [ ] T026 [P] [US3] 创建 Alex 角色模型定义 `src/models/blockman/alex.ts`（绿色衬衫方块人）
- [ ] T027 [P] [US3] 创建骑士角色模型定义 `src/models/blockman/knight.ts`（银色盔甲方块人）
- [ ] T028 [P] [US3] 创建法师角色模型定义 `src/models/blockman/wizard.ts`（紫色长袍方块人）
- [ ] T029 [US3] 实现 ModelLibrary 类 `src/player/CharacterModelLibrary.ts`（模型注册、getAvailableModels、getModelById、getDefaultModel、createModelInstance）
- [ ] T030 [US3] 创建模型注册入口 `src/models/index.ts`（导入所有模型定义，注册到 ModelLibrary）
- [ ] T031 [US3] 实现模型加载错误处理 `src/player/CharacterModelLibrary.ts`（加载失败时返回默认模型）

**Checkpoint**: 模型库完整，5 个角色可用

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 跨用户故事的优化和完善

- [ ] T032 [P] 添加简单的行走动画 `src/player/CharacterModel.ts`（手臂和腿部摆动）
- [ ] T033 [P] 优化模型渲染性能 `src/player/CharacterModel.ts`（合并几何体减少 Draw Call）
- [ ] T034 处理快速连续按 V 键的边界情况 `src/renderer/CameraController.ts`（防抖或队列处理）
- [ ] T035 运行 quickstart.md 验证所有功能

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成 - 阻塞所有用户故事
- **User Stories (Phase 3-5)**: 均依赖 Foundational 完成
  - US1 (视角切换) → US2 (角色选择) → US3 (模型库)
  - 或并行开发（如有多人）
- **Polish (Phase 6)**: 依赖所有用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: Foundational 完成后可开始 - 无其他故事依赖
- **User Story 2 (P2)**: 依赖 US1（需要视角切换展示选中模型），但可独立测试选择界面
- **User Story 3 (P3)**: 依赖 US1（需要 CharacterModel 基类），但模型定义可并行创建

### Within Each User Story

- 类型/接口 → 基类 → 具体实现 → 集成
- 核心功能 → 交互处理 → 边界情况

### Parallel Opportunities

**Phase 1 并行**:
```
T002 (CharacterTypes.ts) || T003 (CharacterConstants.ts)
```

**Phase 2 并行**:
```
T004 (CharacterModel.ts) → T005 (BlockmanBuilder.ts)
T006 (PreferenceManager.ts) 可与上述并行
```

**Phase 4 (US2) 并行**:
```
T017 (CharacterSelectUI.ts) || T018 (CharacterPreview.ts)
```

**Phase 5 (US3) 并行**:
```
T025 (steve.ts) || T026 (alex.ts) || T027 (knight.ts) || T028 (wizard.ts)
```

---

## Parallel Example: User Story 3

```bash
# 同时创建所有角色模型定义:
Task: "创建 Steve 角色模型定义 src/models/blockman/steve.ts"
Task: "创建 Alex 角色模型定义 src/models/blockman/alex.ts"
Task: "创建骑士角色模型定义 src/models/blockman/knight.ts"
Task: "创建法师角色模型定义 src/models/blockman/wizard.ts"
```

---

## Implementation Strategy

### MVP First (仅 User Story 1)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational (关键 - 阻塞所有故事)
3. 完成 Phase 3: User Story 1 (视角切换)
4. **停止并验证**: 独立测试视角切换功能
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. 添加 US1 (视角切换) → 独立测试 → 部署 (MVP!)
3. 添加 US2 (角色选择) → 独立测试 → 部署
4. 添加 US3 (模型库) → 独立测试 → 部署
5. 每个故事增加价值而不破坏之前的功能

---

## Notes

- [P] 任务 = 不同文件，无依赖
- [Story] 标签将任务映射到特定用户故事以便追踪
- 每个用户故事应可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何检查点停止以独立验证故事
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖
