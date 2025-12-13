# Data Model: 基础 3D 方块世界

**Feature**: 001-basic-block-world
**Date**: 2025-12-12

## Entities

### BlockType (Enum)

方块类型枚举，定义游戏中的 5 种基础方块。

| Value | Name | Texture Index | Description |
|-------|------|---------------|-------------|
| 0 | AIR | N/A | 空气，不渲染 |
| 1 | GRASS | 0 | 草地方块 |
| 2 | DIRT | 1 | 泥土方块 |
| 3 | STONE | 2 | 石头方块 |
| 4 | WOOD | 3 | 木头方块 |
| 5 | SAND | 4 | 沙子方块 |

```typescript
enum BlockType {
  AIR = 0,
  GRASS = 1,
  DIRT = 2,
  STONE = 3,
  WOOD = 4,
  SAND = 5
}
```

---

### Block

单个方块实体，存储位置和类型。

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| x | number | X 坐标 | 0 ≤ x < WORLD_WIDTH |
| y | number | Y 坐标（高度） | 0 ≤ y < WORLD_HEIGHT |
| z | number | Z 坐标 | 0 ≤ z < WORLD_DEPTH |
| type | BlockType | 方块类型 | 非 AIR 时渲染 |

```typescript
interface Block {
  x: number;
  y: number;
  z: number;
  type: BlockType;
}
```

---

### World

游戏世界，管理所有方块。

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| width | number | 世界宽度（X 轴） | 64 |
| height | number | 世界高度（Y 轴） | 256 |
| depth | number | 世界深度（Z 轴） | 64 |
| blocks | BlockType[][][] | 3D 方块数组 | blocks[x][y][z] |

```typescript
interface World {
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  blocks: BlockType[][][];

  getBlock(x: number, y: number, z: number): BlockType;
  setBlock(x: number, y: number, z: number, type: BlockType): void;
  isValidPosition(x: number, y: number, z: number): boolean;
}
```

**State Transitions**:
- `setBlock(x, y, z, AIR)`: 破坏方块
- `setBlock(x, y, z, type)`: 放置方块（type ≠ AIR）

---

### Player

玩家实体，包含位置、朝向和选择状态。

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| position | Vector3 | 玩家位置 | 世界边界内 |
| rotation | Euler | 玩家朝向 | pitch: [-90°, 90°] |
| selectedBlockType | BlockType | 当前选择的方块类型 | 1-5 (非 AIR) |
| velocity | Vector3 | 移动速度向量 | 用于平滑移动 |

```typescript
interface Player {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  selectedBlockType: BlockType;
  velocity: THREE.Vector3;

  readonly eyeHeight: number;  // 1.6 方块单位
  readonly width: number;      // 0.6 方块单位
  readonly height: number;     // 1.8 方块单位
}
```

**State Transitions**:
- 移动：position 根据 velocity 更新
- 视角旋转：rotation 根据鼠标输入更新
- 切换方块：selectedBlockType 根据数字键更新

---

### Camera

第一人称相机，跟随玩家。

| Field | Type | Description |
|-------|------|-------------|
| fov | number | 视野角度 (75°) |
| aspect | number | 宽高比 |
| near | number | 近裁剪面 (0.1) |
| far | number | 远裁剪面 (1000) |

```typescript
// 使用 Three.js PerspectiveCamera
// 位置 = player.position + (0, eyeHeight, 0)
// 旋转 = player.rotation
```

---

### InputState

输入状态，记录当前按键和鼠标状态。

| Field | Type | Description |
|-------|------|-------------|
| forward | boolean | W 键按下 |
| backward | boolean | S 键按下 |
| left | boolean | A 键按下 |
| right | boolean | D 键按下 |
| mouseX | number | 鼠标 X 移动量 |
| mouseY | number | 鼠标 Y 移动量 |
| leftClick | boolean | 左键点击 |
| rightClick | boolean | 右键点击 |

```typescript
interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  mouseX: number;
  mouseY: number;
  leftClick: boolean;
  rightClick: boolean;
}
```

---

## Relationships

```
World 1──* Block
  │
  └── contains blocks[x][y][z]

Player 1──1 Camera
  │
  └── camera follows player position + eyeHeight

Player *──1 BlockType
  │
  └── selectedBlockType references BlockType enum

InputState ──> Player
  │
  └── input updates player movement and rotation
```

---

## Validation Rules

| Entity | Rule | Error Handling |
|--------|------|----------------|
| Block | 位置必须在世界边界内 | 忽略无效操作 |
| Block | 不能在玩家碰撞盒内放置 | 阻止放置 |
| Player | 位置必须在世界边界内 | 限制移动 |
| Player | 不能穿过实体方块 | 碰撞阻止 |
| Player | selectedBlockType 必须为 1-5 | 默认为 GRASS |

---

## Constants

```typescript
const WORLD_WIDTH = 64;
const WORLD_HEIGHT = 256;
const WORLD_DEPTH = 64;

const PLAYER_HEIGHT = 1.8;
const PLAYER_WIDTH = 0.6;
const PLAYER_EYE_HEIGHT = 1.6;
const PLAYER_SPEED = 5.0;  // 方块/秒
const MOUSE_SENSITIVITY = 0.002;

const INTERACTION_DISTANCE = 5.0;  // 方块单位
const BLOCK_SIZE = 1.0;  // 方块边长
```
