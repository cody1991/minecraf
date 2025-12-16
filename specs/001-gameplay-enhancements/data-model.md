# Data Model: 基础完善阶段 - 游戏体验增强

**Date**: 2025-12-16  
**Status**: Complete

## Entities

### 1. AnimationState (动画状态)

```typescript
/**
 * 动物动画状态枚举
 */
enum AnimalAnimationState {
  IDLE = 'idle',           // 站立待机
  WALKING = 'walking',     // 行走
  HURT = 'hurt',           // 受伤
  DYING = 'dying',         // 死亡中
  SWIMMING = 'swimming'    // 游泳（水中）
}

/**
 * 动画配置
 */
interface AnimationConfig {
  state: AnimalAnimationState
  duration: number         // 动画周期（秒）
  loop: boolean           // 是否循环
  blendTime: number       // 过渡时间（秒）
}

/**
 * 动物动画数据
 */
interface AnimalAnimationData {
  currentState: AnimalAnimationState
  previousState: AnimalAnimationState
  stateTime: number       // 当前状态已播放时间
  blendProgress: number   // 过渡进度 0-1
  legSwingAngle: number   // 腿部摆动角度
  headRotation: THREE.Euler // 头部朝向
}
```

**Validation Rules**:
- `stateTime` >= 0
- `blendProgress` ∈ [0, 1]
- `legSwingAngle` ∈ [-π/4, π/4]

**State Transitions**:
```
IDLE ←→ WALKING (移动/停止)
IDLE/WALKING → HURT (受到伤害)
HURT → IDLE/WALKING (伤害动画结束)
ANY → DYING (生命值归零)
IDLE/WALKING ←→ SWIMMING (进入/离开水)
```

---

### 2. HandItemModel (手持物品模型)

```typescript
/**
 * 手持物品类型
 */
enum HandItemType {
  EMPTY = 'empty',         // 空手
  BLOCK = 'block',         // 方块
  FOOD = 'food',           // 食物
  TOOL = 'tool'            // 工具（未来扩展）
}

/**
 * 手持物品状态
 */
interface HandItemState {
  itemType: HandItemType
  blockType: BlockType | null
  isSwinging: boolean      // 是否正在挥动
  swingProgress: number    // 挥动进度 0-1
  bobOffset: number        // 行走摆动偏移
}

/**
 * 手持物品渲染配置
 */
interface HandRenderConfig {
  position: THREE.Vector3  // 相对相机位置
  rotation: THREE.Euler    // 基础旋转
  scale: number           // 缩放
}
```

**Validation Rules**:
- `swingProgress` ∈ [0, 1]
- 当 `itemType === EMPTY` 时，`blockType` 必须为 `null`

---

### 3. MiningProgress (挖掘进度)

```typescript
/**
 * 挖掘状态
 */
interface MiningState {
  isActive: boolean        // 是否正在挖掘
  targetBlock: THREE.Vector3 | null  // 目标方块坐标
  targetBlockType: BlockType | null  // 目标方块类型
  progress: number         // 挖掘进度 0-1
  crackStage: number       // 裂纹阶段 0-3
  totalTime: number        // 总挖掘时间
  elapsedTime: number      // 已用时间
}

/**
 * 方块挖掘时间配置
 */
interface BlockMiningTime {
  blockType: BlockType
  baseTime: number         // 基础挖掘时间（秒）
  hardness: number         // 硬度等级 1-10
}
```

**Validation Rules**:
- `progress` ∈ [0, 1]
- `crackStage` ∈ {0, 1, 2, 3}
- `elapsedTime` <= `totalTime`
- 当 `isActive === false` 时，所有其他字段重置

---

### 4. CampfireBlock (篝火方块)

```typescript
/**
 * 篝火烤制槽位
 */
interface CookingSlot {
  rawFoodType: FoodType | null   // 生食类型
  cookingProgress: number        // 烤制进度 0-1
  startTime: number              // 开始烤制时间戳
}

/**
 * 篝火状态
 */
interface CampfireState {
  position: THREE.Vector3        // 方块位置
  isLit: boolean                 // 是否点燃
  slots: [CookingSlot, CookingSlot, CookingSlot, CookingSlot]  // 4个槽位
  lightLevel: number             // 光照等级
}

/**
 * 烤制配置
 */
const CAMPFIRE_CONFIG = {
  COOKING_TIME: 10,              // 烤制时间（秒）
  LIGHT_LEVEL: 15,               // 光照等级
  SLOT_COUNT: 4,                 // 槽位数量
  EJECT_VELOCITY: 3              // 弹出速度
}
```

**Validation Rules**:
- `slots.length === 4`
- `cookingProgress` ∈ [0, 1]
- 当 `isLit === false` 时，不进行烤制

**State Transitions**:
```
EMPTY_SLOT → COOKING (放入生肉)
COOKING → DONE (烤制完成，弹出熟食)
DONE → EMPTY_SLOT (自动)
```

---

### 5. CookedFood (熟食物品)

```typescript
/**
 * 熟食类型枚举
 */
enum CookedFoodType {
  COOKED_BEEF = 'cooked_beef',
  COOKED_PORKCHOP = 'cooked_porkchop',
  COOKED_MUTTON = 'cooked_mutton',
  COOKED_CHICKEN = 'cooked_chicken',
  COOKED_RABBIT = 'cooked_rabbit'
}

/**
 * 熟食定义
 */
interface CookedFoodItem {
  type: CookedFoodType
  name: string
  nameEn: string
  hungerRestore: number
  blockType: BlockType
  rawEquivalent: FoodType        // 对应的生食
}

/**
 * 生食到熟食映射
 */
const RAW_TO_COOKED: Record<FoodType, CookedFoodType> = {
  [FoodType.RAW_BEEF]: CookedFoodType.COOKED_BEEF,
  [FoodType.RAW_PORKCHOP]: CookedFoodType.COOKED_PORKCHOP,
  [FoodType.RAW_MUTTON]: CookedFoodType.COOKED_MUTTON,
  [FoodType.RAW_CHICKEN]: CookedFoodType.COOKED_CHICKEN,
  [FoodType.RAW_RABBIT]: CookedFoodType.COOKED_RABBIT
}
```

**Validation Rules**:
- `hungerRestore` = 对应生食的 2 倍
- 每种熟食必须有对应的 `BlockType`

---

### 6. Particle (粒子)

```typescript
/**
 * 粒子类型
 */
enum ParticleType {
  BLOCK_BREAK = 'block_break',   // 方块破碎
  FIRE = 'fire',                 // 火焰
  SMOKE = 'smoke'                // 烟雾
}

/**
 * 粒子数据
 */
interface Particle {
  type: ParticleType
  position: THREE.Vector3
  velocity: THREE.Vector3
  color: THREE.Color
  size: number
  lifetime: number               // 总生命周期
  age: number                    // 当前年龄
  opacity: number                // 透明度
  gravity: number                // 重力影响
}

/**
 * 粒子发射器配置
 */
interface EmitterConfig {
  type: ParticleType
  position: THREE.Vector3
  spawnRate: number              // 每秒生成数量
  particleLifetime: number       // 粒子生命周期
  velocitySpread: THREE.Vector3  // 速度随机范围
  colorStart: THREE.Color
  colorEnd: THREE.Color
  sizeStart: number
  sizeEnd: number
}
```

**Validation Rules**:
- `age` <= `lifetime`
- `opacity` ∈ [0, 1]
- `size` > 0

---

## Entity Relationships

```
Animal (1) ─────── (1) AnimalAnimationData
   │
   └── uses AnimationConfig

Player (1) ─────── (1) HandItemState
   │                    │
   │                    └── references BlockType
   │
   └── (1) MiningState
            │
            └── references BlockMiningTime

World (1) ─────── (*) CampfireState
                       │
                       └── (4) CookingSlot
                              │
                              └── produces CookedFoodItem

ParticleSystem (1) ─── (*) Particle
                           │
                           └── spawned by EmitterConfig
```

---

## New BlockTypes

```typescript
// 添加到 BlockType 枚举
enum BlockType {
  // ... existing types ...
  
  // 篝火方块 (025-campfire)
  CAMPFIRE = 60,
  
  // 熟食物品 (025-campfire)
  COOKED_BEEF = 61,
  COOKED_PORKCHOP = 62,
  COOKED_MUTTON = 63,
  COOKED_CHICKEN = 64,
  COOKED_RABBIT = 65
}
```
