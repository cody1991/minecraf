# Tasks: 声音与地图系统

**Input**: Design documents from `/specs/012-sound-map-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: 未明确要求测试，本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1-US7）
- 包含精确文件路径

---

## Phase 1: Setup (共享基础设施)

**Purpose**: 项目初始化和音频资源目录结构

- [x] T001 创建音频模块目录结构 `src/audio/`
- [x] T002 [P] 创建音频资源目录 `public/audio/music/`, `public/audio/footsteps/`, `public/audio/effects/`, `public/audio/animals/`
- [x] T003 [P] 创建音频类型定义文件 `src/audio/AudioTypes.ts`（定义 AudioSettings, SfxOptions, Sfx3dOptions, AudioAsset 接口）
- [x] T004 [P] 创建地图颜色映射配置 `src/ui/MapColors.ts`（定义 MAP_COLORS, DEFAULT_BLOCK_COLOR, UNLOADED_CHUNK_COLOR）

---

## Phase 2: Foundational (阻塞性前置任务)

**Purpose**: 所有用户故事依赖的核心基础设施

**⚠️ CRITICAL**: 必须完成此阶段才能开始用户故事实现

- [x] T005 实现 AudioSettings 持久化模块 `src/audio/AudioSettings.ts`（LocalStorage 读写、默认值、加载/保存方法）
- [x] T006 实现 SoundInstance 类 `src/audio/SoundInstance.ts`（封装 AudioBufferSourceNode、GainNode、stop/setVolume 方法）
- [x] T007 实现 AudioManager 核心类 `src/audio/AudioManager.ts`（单例模式、AudioContext 初始化、音频加载缓存、playMusic/playSfx/play3dSfx 方法）
- [x] T008 下载并添加背景音乐文件 `public/audio/music/ambient.mp3`（使用合成音频作为后备）
- [x] T009 [P] 下载并添加脚步声音效 `public/audio/footsteps/grass.mp3`, `stone.mp3`, `sand.mp3`, `wood.mp3`（使用合成音频作为后备）
- [x] T010 [P] 下载并添加摔落音效 `public/audio/effects/fall_light.mp3`, `fall_heavy.mp3`（使用合成音频作为后备）
- [x] T011 [P] 下载并添加动物声音 `public/audio/animals/cow.mp3`, `pig.mp3`, `sheep.mp3`, `chicken.mp3`, `wolf.mp3`, `fox.mp3`（使用合成音频作为后备）

**Checkpoint**: 音频基础设施就绪，可开始用户故事实现

---

## Phase 3: User Story 1 - 背景音乐体验 (Priority: P1) 🎯 MVP

**Goal**: 玩家进入游戏后能听到循环播放的背景音乐，可控制音量和静音

**Independent Test**: 进入游戏验证背景音乐播放，调整音量滑块验证音量变化，点击静音按钮验证静音功能

### Implementation for User Story 1

- [x] T012 [US1] 在 AudioManager 中实现背景音乐播放逻辑 `src/audio/AudioManager.ts`（playMusic 循环播放、淡入淡出过渡）
- [x] T013 [US1] 实现音量控制 UI 组件 `src/ui/VolumeControl.ts`（音量滑块、静音按钮、音量图标状态）
- [x] T014 [US1] 在 main.ts 中集成 AudioManager `src/main.ts`（初始化、游戏启动时播放背景音乐）
- [x] T015 [US1] 在 index.html 中添加音量控制 UI 容器和样式 `index.html`
- [x] T016 [US1] 实现用户交互后恢复 AudioContext `src/audio/AudioManager.ts`（处理浏览器自动播放策略）

**Checkpoint**: 背景音乐功能完整可用，可独立测试

---

## Phase 4: User Story 2 - 移动音效反馈 (Priority: P1)

**Goal**: 玩家移动时播放脚步声，不同地形有不同音效，奔跑时节奏加快

**Independent Test**: WASD 移动验证脚步声播放，停止移动验证声音停止，Shift 奔跑验证节奏变化

### Implementation for User Story 2

- [x] T017 [US2] 在 main.ts 中添加移动状态检测 `src/main.ts`（isMoving、isRunning、groundBlockType 属性）
- [x] T018 [US2] 在 main.ts 中实现脚步声触发逻辑 `src/main.ts`（根据移动状态和地形类型调用 AudioManager.playSfx）
- [x] T019 [US2] 实现地形类型到脚步声映射 `src/audio/AudioManager.ts`（getFootstepSound 方法）
- [x] T020 [US2] 实现脚步声播放间隔控制 `src/main.ts`（行走/奔跑不同间隔）

**Checkpoint**: 脚步声功能完整可用，可独立测试

---

## Phase 5: User Story 3 - 实时小地图导航 (Priority: P1)

**Goal**: 右上角显示圆形实时小地图，显示玩家位置和朝向，实时更新

**Independent Test**: 进入游戏查看右上角小地图，移动时验证地图更新，转向验证方向指示变化

### Implementation for User Story 3

- [x] T021 [US3] 实现 MiniMap 类 `src/ui/MiniMap.ts`（Canvas 创建、圆形裁剪、样式定位）
- [x] T022 [US3] 实现小地图地形渲染 `src/ui/MiniMap.ts`（从 World 读取方块数据、应用颜色映射）
- [x] T023 [US3] 实现玩家位置和朝向标记 `src/ui/MiniMap.ts`（中心点标记、方向箭头）
- [x] T024 [US3] 实现层级切换逻辑 `src/ui/MiniMap.ts`（根据玩家 Y 坐标切换地表/地下显示）
- [x] T025 [US3] 实现离屏 Canvas 缓存优化 `src/ui/MiniMap.ts`（仅在区块变化时重绘缓存）
- [x] T026 [US3] 在 main.ts 中集成 MiniMap `src/main.ts`（初始化、游戏循环中更新）

**Checkpoint**: 小地图功能完整可用，可独立测试

---

## Phase 6: User Story 4 - 坐标信息显示 (Priority: P1)

**Goal**: 左上角显示玩家当前 X、Y、Z 坐标，实时更新

**Independent Test**: 进入游戏查看左上角坐标显示，移动时验证坐标数值变化

### Implementation for User Story 4

- [x] T027 [US4] 实现 CoordinateDisplay 类 `src/ui/CoordinateDisplay.ts`（DOM 元素创建、样式定位）
- [x] T028 [US4] 实现坐标格式化显示 `src/ui/CoordinateDisplay.ts`（X/Y/Z 标签、小数位数控制）
- [x] T029 [US4] 在 main.ts 中集成 CoordinateDisplay `src/main.ts`（初始化、游戏循环中更新）
- [x] T030 [US4] 更新 FPS 信息区域布局 `src/ui/FpsCounter.ts`（与坐标显示协调布局）

**Checkpoint**: 坐标显示功能完整可用，可独立测试

---

## Phase 7: User Story 5 - 大地图查看 (Priority: P2)

**Goal**: 按 M 键打开全屏大地图，支持缩放和平移，显示玩家位置

**Independent Test**: 按 M 键验证大地图打开，再按 M 或 ESC 验证关闭，滚轮验证缩放

### Implementation for User Story 5

- [x] T031 [US5] 实现 WorldMap 类 `src/ui/WorldMap.ts`（全屏 Canvas 创建、样式定位、打开/关闭状态）
- [x] T032 [US5] 实现大地图地形渲染 `src/ui/WorldMap.ts`（从 World 读取更大范围数据、应用颜色映射）
- [x] T033 [US5] 实现玩家位置标记 `src/ui/WorldMap.ts`（当前位置高亮显示）
- [x] T034 [US5] 实现缩放功能 `src/ui/WorldMap.ts`（鼠标滚轮缩放、缩放范围限制 0.1-4.0）
- [x] T035 [US5] 实现平移功能 `src/ui/WorldMap.ts`（鼠标拖拽平移地图视图）
- [x] T036 [US5] 在 InputManager 中添加 M 键处理 `src/input/KeyboardInput.ts`（M 键切换大地图）
- [x] T037 [US5] 在 main.ts 中集成 WorldMap `src/main.ts`（初始化、M 键事件处理）

**Checkpoint**: 大地图功能完整可用，可独立测试

---

## Phase 8: User Story 6 - 摔落音效 (Priority: P2)

**Goal**: 玩家从高处摔落着地时播放音效，高度越高音效越响

**Independent Test**: 从 3 格高度跳下验证轻摔落音效，从 10 格高度跳下验证重摔落音效

### Implementation for User Story 6

- [x] T038 [US6] 在 main.ts 中添加摔落检测 `src/main.ts`（记录下落起始高度、着地检测）
- [x] T039 [US6] 实现摔落高度计算 `src/main.ts`（计算实际摔落距离）
- [x] T040 [US6] 实现摔落音效触发 `src/main.ts`（根据摔落高度选择 fall_light 或 fall_heavy）
- [x] T041 [US6] 实现摔落音效音量调节 `src/audio/AudioManager.ts`（高度越高音量越大）

**Checkpoint**: 摔落音效功能完整可用，可独立测试

---

## Phase 9: User Story 7 - 动物声音 (Priority: P3)

**Goal**: 动物发出声音，基于距离的 3D 空间音效

**Independent Test**: 接近动物验证声音播放，远离验证声音变小，靠近验证声音变大

### Implementation for User Story 7

- [x] T042 [US7] 在 Animal.ts 中添加声音发出逻辑 `src/entities/Animal.ts`（随机间隔发出声音）
- [x] T043 [US7] 实现动物类型到声音映射 `src/audio/AudioManager.ts`（getAnimalSound 方法）
- [x] T044 [US7] 实现 3D 空间音效 `src/audio/AudioManager.ts`（play3dSfx 使用 PannerNode）
- [x] T045 [US7] 在 Animal.ts 中调用 3D 音效播放 `src/entities/Animal.ts`（传递动物位置）
- [x] T046 [US7] 实现听者位置更新 `src/audio/AudioManager.ts`（同步玩家位置到 AudioListener）

**Checkpoint**: 动物声音功能完整可用，可独立测试

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: 跨用户故事的优化和完善

- [x] T047 [P] 实现音频静默降级 `src/audio/AudioManager.ts`（浏览器不支持时静默处理）
- [x] T048 [P] 实现地图边界处理 `src/ui/MiniMap.ts`, `src/ui/WorldMap.ts`（边界区域显示处理）
- [x] T049 优化音频预加载策略 `src/audio/AudioManager.ts`（常用音效预加载、动物声音按需加载）
- [x] T050 优化小地图渲染性能 `src/ui/MiniMap.ts`（控制刷新率 10 FPS）
- [x] T051 [P] 添加 dispose 方法清理资源 `src/audio/AudioManager.ts`, `src/ui/MiniMap.ts`, `src/ui/WorldMap.ts`, `src/ui/CoordinateDisplay.ts`
- [x] T052 运行 quickstart.md 验证所有功能

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可立即开始
- **Foundational (Phase 2)**: 依赖 Setup 完成 - **阻塞所有用户故事**
- **User Stories (Phase 3-9)**: 全部依赖 Foundational 完成
  - US1-US4 (P1) 可并行开始
  - US5-US6 (P2) 可在 P1 完成后开始，或与 P1 并行
  - US7 (P3) 可在 P2 完成后开始，或与 P1/P2 并行
- **Polish (Phase 10)**: 依赖所有用户故事完成

### User Story Dependencies

| 故事 | 优先级 | 依赖 | 可并行 |
|------|--------|------|--------|
| US1 背景音乐 | P1 | Foundational | ✅ |
| US2 脚步声 | P1 | Foundational | ✅ |
| US3 小地图 | P1 | Foundational | ✅ |
| US4 坐标显示 | P1 | Foundational | ✅ |
| US5 大地图 | P2 | Foundational, 可复用 US3 地图渲染 | ✅ |
| US6 摔落音效 | P2 | Foundational | ✅ |
| US7 动物声音 | P3 | Foundational | ✅ |

### Within Each User Story

- 模型/类型定义 → 服务/逻辑 → 集成 → 验证
- 每个故事完成后可独立测试

### Parallel Opportunities

- T002, T003, T004 可并行（Setup 阶段）
- T009, T010, T011 可并行（音频资源下载）
- US1-US4 可并行（4 个 P1 故事）
- US5-US7 可并行（P2/P3 故事）
- T047, T048, T051 可并行（Polish 阶段）

---

## Parallel Example: Phase 2 Foundational

```bash
# 并行下载所有音频资源：
Task: T009 下载脚步声音效
Task: T010 下载摔落音效
Task: T011 下载动物声音
```

## Parallel Example: P1 User Stories

```bash
# 4 个 P1 故事可并行开发：
Developer A: US1 背景音乐 (T012-T016)
Developer B: US2 脚步声 (T017-T020)
Developer C: US3 小地图 (T021-T026)
Developer D: US4 坐标显示 (T027-T030)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational（关键 - 阻塞所有故事）
3. 完成 Phase 3: User Story 1 背景音乐
4. **停止并验证**: 独立测试背景音乐功能
5. 可部署/演示 MVP

### Incremental Delivery

1. Setup + Foundational → 基础就绪
2. 添加 US1 背景音乐 → 测试 → 部署 (MVP!)
3. 添加 US2 脚步声 → 测试 → 部署
4. 添加 US3 小地图 → 测试 → 部署
5. 添加 US4 坐标显示 → 测试 → 部署
6. 添加 US5 大地图 → 测试 → 部署
7. 添加 US6 摔落音效 → 测试 → 部署
8. 添加 US7 动物声音 → 测试 → 部署
9. 每个故事独立增加价值

### Recommended Order (Solo Developer)

1. Phase 1-2: Setup + Foundational (T001-T011)
2. Phase 3: US1 背景音乐 (T012-T016) - **MVP**
3. Phase 6: US4 坐标显示 (T027-T030) - 最简单
4. Phase 5: US3 小地图 (T021-T026) - 地图基础
5. Phase 7: US5 大地图 (T031-T037) - 复用小地图逻辑
6. Phase 4: US2 脚步声 (T017-T020) - 音效扩展
7. Phase 8: US6 摔落音效 (T038-T041) - 音效扩展
8. Phase 9: US7 动物声音 (T042-T046) - 3D 音效
9. Phase 10: Polish (T047-T052)

---

## Notes

- [P] 任务 = 不同文件，无依赖，可并行
- [Story] 标签映射任务到特定用户故事
- 每个用户故事应可独立完成和测试
- 每个任务或逻辑组完成后提交
- 在任何检查点停止以独立验证故事
- 避免：模糊任务、同文件冲突、破坏独立性的跨故事依赖

---

## Summary

| 统计项 | 数量 |
|--------|------|
| 总任务数 | 52 |
| Phase 1 Setup | 4 |
| Phase 2 Foundational | 7 |
| US1 背景音乐 | 5 |
| US2 脚步声 | 4 |
| US3 小地图 | 6 |
| US4 坐标显示 | 4 |
| US5 大地图 | 7 |
| US6 摔落音效 | 4 |
| US7 动物声音 | 5 |
| Phase 10 Polish | 6 |
| 可并行任务 | 18 |
