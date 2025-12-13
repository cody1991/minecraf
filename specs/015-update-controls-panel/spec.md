# Feature Specification: 更新操作面板

**Feature Branch**: `001-update-controls-panel`  
**Created**: 2025-12-13  
**Status**: Draft  
**Input**: User description: "如今新增了非常多的操作命令，但是操作面板还是旧的。请更新最新的一版"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 查看完整操作指南 (Priority: P1)

新玩家进入游戏时，需要看到完整且准确的操作说明，以便快速了解所有可用的控制方式。

**Why this priority**: 这是操作面板的核心功能，直接影响新玩家的上手体验。如果操作说明不完整或过时，玩家可能无法发现和使用新增的功能。

**Independent Test**: 可以通过打开游戏、查看操作面板并验证所有列出的操作是否与实际功能一致来独立测试。

**Acceptance Scenarios**:

1. **Given** 玩家首次进入游戏, **When** 操作说明面板显示, **Then** 面板应显示所有当前支持的操作命令
2. **Given** 玩家查看操作面板, **When** 阅读移动控制说明, **Then** 应看到 WASD/方向键移动、Space 跳跃、Shift 冲刺的说明
3. **Given** 玩家查看操作面板, **When** 阅读方块操作说明, **Then** 应看到 1-9,0 选择方块、Tab 循环切换的说明
4. **Given** 玩家查看操作面板, **When** 阅读功能键说明, **Then** 应看到 M 地图、V 视角切换、C 角色选择的说明

---

### User Story 2 - 水中控制提示 (Priority: P2)

玩家在水中时，控制方式与陆地不同，需要了解水中特殊操作。

**Why this priority**: 水中控制是游戏的重要功能，但与陆地控制有差异，玩家需要明确知道这些差异。

**Independent Test**: 可以通过查看操作面板中是否包含水中控制说明来独立验证。

**Acceptance Scenarios**:

1. **Given** 玩家查看操作面板, **When** 阅读水中控制说明, **Then** 应看到 Space 上浮、Shift 下潜的说明

---

### User Story 3 - 操作分类清晰 (Priority: P3)

操作命令较多时，需要按类别组织，便于玩家快速查找。

**Why this priority**: 提升用户体验，让玩家能够快速定位所需的操作说明。

**Independent Test**: 可以通过检查操作面板是否将操作按类别（移动、方块、功能等）分组来验证。

**Acceptance Scenarios**:

1. **Given** 玩家查看操作面板, **When** 浏览操作列表, **Then** 操作应按逻辑类别分组显示

---

### Edge Cases

- 操作面板内容过长时，应保持可读性和简洁性
- 面板应适应不同屏幕尺寸，不遮挡关键游戏元素

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 操作面板 MUST 显示所有移动控制（WASD/方向键移动、Space 跳跃、Shift 冲刺）
- **FR-002**: 操作面板 MUST 显示鼠标控制（鼠标视角、左键破坏、右键放置）
- **FR-003**: 操作面板 MUST 显示方块选择控制（1-9,0 选择方块、Tab 循环切换）
- **FR-004**: 操作面板 MUST 显示功能快捷键（M 地图、V 视角切换、C 角色选择）
- **FR-005**: 操作面板 MUST 显示水中特殊控制（Space 上浮、Shift 下潜）
- **FR-006**: 操作面板 MUST 显示 ESC 解锁鼠标功能
- **FR-007**: 操作面板 SHOULD 将操作按类别分组，提高可读性

### Key Entities

- **操作命令**: 包含按键/操作、功能描述、适用场景（陆地/水中/通用）
- **操作类别**: 移动控制、鼠标操作、方块选择、功能快捷键

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 操作面板显示的所有操作命令与实际游戏功能 100% 一致
- **SC-002**: 新玩家能在 30 秒内从操作面板找到任意功能的操作方式
- **SC-003**: 操作面板覆盖所有 15+ 个当前支持的操作命令
- **SC-004**: 操作说明文字简洁明了，每条说明不超过 10 个字

## Assumptions

- 操作面板位于 `index.html` 中的 `#instructions` 元素
- 当前支持的操作命令已在代码中实现，只需更新显示内容
- 保持现有的面板样式和交互方式不变
- 操作面板仅在游戏开始前显示（点击开始后隐藏）

## Out of Scope

- 游戏内可调出的帮助面板（按 H 或 F1 等）
- 自定义按键绑定功能
- 多语言支持
- 操作面板的视觉重新设计
