# Data Model: 生物、植物与天气系统

**Feature**: 008-biome-weather-system  
**Date**: 2025-12-12

## Entities

### 1. Entity（基础实体）

所有游戏实体的基类。

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识符 |
| position | Vector3 | 世界坐标位置 |
| rotation | number | Y 轴旋转角度（弧度） |
| chunkX | number | 所在区块 X 坐标 |
| chunkZ | number | 所在区块 Z 坐标 |

### 2. Animal（动物）

继承自 Entity。

| 字段 | 类型 | 说明 |
|------|------|------|
| type | AnimalType | 动物类型（COW/SHEEP/PIG/CHICKEN） |
| state | AnimalState | 当前 AI 状态 |
| stateTimer | number | 当前状态剩余时间（秒） |
| targetPosition | Vector3 \| null | 移动目标位置 |
| moveSpeed | number | 移动速度（单位/秒） |
| mesh | THREE.Group | 渲染网格组 |

**AnimalType 枚举**:
```typescript
enum AnimalType {
  COW = 0,
  SHEEP = 1,
  PIG = 2,
  CHICKEN = 3
}
```

**AnimalState 枚举**:
```typescript
enum AnimalState {
  IDLE = 0,      // 静止
  WANDERING = 1, // 漫游
  FLEEING = 2    // 逃跑
}
```

### 3. PlantType（植物类型）

新增方块类型用于植物。

| 类型 | 值 | 说明 |
|------|-----|------|
| FLOWER_RED | 14 | 红色花朵 |
| FLOWER_YELLOW | 15 | 黄色花朵 |
| TALL_GRASS | 16 | 高草 |
| MUSHROOM_RED | 17 | 红蘑菇 |
| MUSHROOM_BROWN | 18 | 棕蘑菇 |
| DEAD_BUSH | 19 | 枯灌木 |
| CACTUS | 20 | 仙人掌 |

**植物方块属性**:
- transparent: true
- solid: false
- opacity: 1（完全不透明纹理，但不遮挡相邻面）

### 4. TimeOfDay（游戏时间）

| 字段 | 类型 | 说明 |
|------|------|------|
| ticks | number | 当前游戏刻（0-23999） |
| dayCount | number | 已过天数 |
| sunAngle | number | 太阳角度（弧度） |
| moonAngle | number | 月亮角度（弧度） |
| skyColor | Color | 当前天空颜色 |
| ambientIntensity | number | 环境光强度（0-1） |

**时间段定义**:
```typescript
enum TimePeriod {
  SUNRISE = 0,  // 0-2000 刻
  DAY = 1,      // 2000-10000 刻
  SUNSET = 2,   // 10000-12000 刻
  NIGHT = 3     // 12000-24000 刻
}
```

### 5. WeatherState（天气状态）

| 字段 | 类型 | 说明 |
|------|------|------|
| type | WeatherType | 当前天气类型 |
| duration | number | 剩余持续时间（秒） |
| transitionProgress | number | 过渡进度（0-1） |
| nextCheckTime | number | 下次天气变化检查时间 |

**WeatherType 枚举**:
```typescript
enum WeatherType {
  CLEAR = 0,  // 晴天
  RAIN = 1    // 下雨
}
```

## Relationships

```
World
├── TimeSystem (1:1) - 管理游戏时间
├── WeatherSystem (1:1) - 管理天气状态
├── EntityManager (1:1) - 管理所有实体
│   └── Animal (1:N) - 动物实例
└── Chunk (1:N)
    └── PlantBlocks (1:N) - 植物方块（作为方块数据存储）
```

## State Transitions

### Animal State Machine

```
┌─────────┐
│  IDLE   │◄────────────────────┐
└────┬────┘                     │
     │ 2-5秒后                  │
     ▼                          │
┌─────────┐    玩家靠近(<5格)   │
│WANDERING│─────────────────────┤
└────┬────┘                     │
     │ 3-8秒后                  │
     └──────────────────────────┘
     
┌─────────┐
│ FLEEING │ (任意状态 + 玩家靠近)
└────┬────┘
     │ 离开玩家(>10格)或5秒后
     ▼
┌─────────┐
│  IDLE   │
└─────────┘
```

### Weather State Machine

```
┌─────────┐
│  CLEAR  │◄───────────────────┐
└────┬────┘                    │
     │ 随机(5-10分钟后, 30%概率)│
     ▼                         │
┌─────────┐                    │
│  RAIN   │────────────────────┘
└─────────┘ 2-5分钟后
```

## Validation Rules

### Animal
- position.y 必须 >= 0（地面以上）
- stateTimer 必须 >= 0
- moveSpeed 范围：1.0-5.0 单位/秒
- 每区块最多 4 只动物

### Plant
- 只能放置在固体方块顶部
- 仙人掌只能放置在沙子上
- 蘑菇只能放置在低光照区域（简化：任意位置）

### Time
- ticks 范围：0-23999
- dayCount 必须 >= 0
- ambientIntensity 范围：0.2-1.0

### Weather
- duration 必须 > 0
- transitionProgress 范围：0-1
- 下雨时 ambientIntensity 降低 30%
