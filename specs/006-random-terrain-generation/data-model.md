# Data Model: 随机地形生成与冲刺移动

**Feature**: 006-random-terrain-generation  
**Date**: 2025-12-12

## Entities

### BiomeType (新增枚举)

生物群系类型定义。

```typescript
enum BiomeType {
  PLAINS = 0,    // 平原 - 默认生物群系
  LAKE = 1,      // 湖泊 - 低洼水域
  MOUNTAIN = 2   // 山脉 - 高地
}
```

### BiomeConfig (新增接口)

生物群系配置参数。

```typescript
interface BiomeConfig {
  type: BiomeType
  baseHeightOffset: number    // 相对基准高度偏移
  heightVariationScale: number // 高度变化缩放因子
  surfaceBlock: BlockType     // 表面方块类型
}
```

**默认配置**:

| BiomeType | baseHeightOffset | heightVariationScale | surfaceBlock |
|-----------|------------------|---------------------|--------------|
| PLAINS    | 0                | 1.0                 | GRASS        |
| LAKE      | -10              | 0.3                 | SAND         |
| MOUNTAIN  | +15              | 2.5                 | STONE        |

### WorldConfig (扩展)

世界配置，新增种子字段。

```typescript
interface WorldConfig {
  seed: number              // 世界种子 (新增)
  renderDistance: number    // 渲染距离
  enableCaves: boolean      // 是否启用洞穴
  enableColosseum: boolean  // 是否启用斗兽场
}
```

### TerrainConfig (扩展)

地形配置，新增水平面高度。

```typescript
interface TerrainConfig {
  // 现有字段
  baseHeight: number
  heightVariation: number
  scale: number
  octaves: number
  persistence: number
  lacunarity: number
  dirtDepth: number
  // 新增字段
  waterLevel: number        // 水平面高度
  biomeScale: number        // 生物群系采样尺度
  spawnSafeRadius: number   // 出生安全区半径
}
```

**默认值**:
- `waterLevel`: `baseHeight - 5` (约 27)
- `biomeScale`: 0.005
- `spawnSafeRadius`: 50

### InputState (扩展)

输入状态，新增冲刺标志。

```typescript
interface InputState {
  // 现有字段
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
  mouseX: number
  mouseY: number
  leftClick: boolean
  rightClick: boolean
  numberKey: number | null
  // 新增字段
  sprint: boolean           // 冲刺状态
}
```

### Player Constants (扩展)

玩家常量，新增冲刺相关。

```typescript
// 现有
const PLAYER_SPEED = 5.0        // 方块/秒

// 新增
const SPRINT_MULTIPLIER = 1.5   // 冲刺速度倍率
const PLAYER_SPRINT_SPEED = PLAYER_SPEED * SPRINT_MULTIPLIER  // 7.5 方块/秒
```

## Relationships

```
World
  └── TerrainGenerator (1:1)
        ├── NoiseGenerator (1:1) - 使用种子初始化
        ├── BiomeGenerator (1:1) - 新增
        │     └── NoiseGenerator (1:1) - 共享或独立实例
        └── ColosseumGenerator (0:1) - 可选

Player
  └── Movement (1:1)
        └── uses InputState.sprint

InputManager
  └── produces InputState (含 sprint)
```

## State Transitions

### 生物群系确定流程

```
getBlockAt(x, y, z)
  │
  ├─ 检查斗兽场区域 → 返回斗兽场方块
  │
  ├─ 计算距原点距离
  │   └─ < spawnSafeRadius → 强制 PLAINS
  │
  ├─ 采样生物群系噪声
  │   ├─ moistureNoise > 0.3 → LAKE
  │   ├─ temperatureNoise < -0.2 → MOUNTAIN
  │   └─ else → PLAINS
  │
  ├─ 应用生物群系参数计算高度
  │
  └─ 确定方块类型
      ├─ y > terrainHeight && y <= waterLevel → WATER
      ├─ y > terrainHeight → AIR
      └─ else → 根据深度返回 GRASS/DIRT/STONE
```

### 冲刺状态流程

```
每帧更新:
  │
  ├─ InputManager.getState()
  │   └─ sprint = ShiftLeft || ShiftRight 按下
  │
  └─ Movement.updateHorizontalVelocity(input)
      └─ speed = input.sprint ? SPRINT_SPEED : NORMAL_SPEED
```

## Validation Rules

1. **种子有效性**: 任意数值均有效，包括负数
2. **生物群系边界**: 使用插值确保过渡平滑
3. **水平面约束**: `waterLevel < baseHeight`
4. **安全区约束**: `spawnSafeRadius >= ColosseumGenerator.outerRadius`
5. **冲刺速度**: `SPRINT_MULTIPLIER >= 1.0`
