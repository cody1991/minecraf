# Data Model: 生存机制

**Feature**: 020-survival-mechanics  
**Date**: 2025-12-16

## Entities

### PlayerStats

玩家生存状态，管理生命值、饥饿值、氧气值等。

```typescript
interface PlayerStats {
  // 生命值
  health: number           // 当前生命值 (0-20)
  maxHealth: number        // 最大生命值 (20)
  
  // 饥饿值
  hunger: number           // 当前饥饿值 (0-20)
  maxHunger: number        // 最大饥饿值 (20)
  exhaustion: number       // 疲劳累积值 (用于饥饿消耗计算)
  
  // 氧气值
  oxygen: number           // 当前氧气值 (0-10 秒)
  maxOxygen: number        // 最大氧气值 (10 秒)
  
  // 状态
  invincibilityTime: number  // 无敌时间剩余 (秒)
  isDead: boolean            // 是否死亡
}
```

**验证规则**:
- `health` 范围: 0 ≤ health ≤ maxHealth
- `hunger` 范围: 0 ≤ hunger ≤ maxHunger
- `oxygen` 范围: 0 ≤ oxygen ≤ maxOxygen
- `invincibilityTime` 范围: ≥ 0

**状态转换**:
```
[Alive] ---(health <= 0)---> [Dead]
[Dead] ---(respawn)---> [Alive, health=20, hunger=20]
```

### DamageEvent

伤害事件，用于统一处理各类伤害。

```typescript
interface DamageEvent {
  source: DamageSource      // 伤害来源
  amount: number            // 伤害数值
  ignoreInvincibility: boolean  // 是否忽略无敌时间
}

enum DamageSource {
  FALL = 'fall',
  DROWNING = 'drowning',
  LAVA = 'lava',
  CACTUS = 'cactus',
  STARVATION = 'starvation',
  PLAYER_ATTACK = 'player_attack',
}
```

### Food

食物物品定义。

```typescript
interface FoodItem {
  itemType: FoodType        // 食物类型
  hungerRestore: number     // 恢复饥饿值
}

enum FoodType {
  RAW_BEEF = 'raw_beef',         // 生牛肉
  RAW_PORKCHOP = 'raw_porkchop', // 生猪排
  RAW_MUTTON = 'raw_mutton',     // 生羊肉
  RAW_CHICKEN = 'raw_chicken',   // 生鸡肉
  RAW_RABBIT = 'raw_rabbit',     // 生兔肉
}
```

**食物恢复值表**:

| 食物类型 | 恢复饥饿值 | 掉落来源 |
|----------|-----------|----------|
| RAW_BEEF | 3 | 牛 |
| RAW_PORKCHOP | 3 | 猪 |
| RAW_MUTTON | 2 | 羊 |
| RAW_CHICKEN | 2 | 鸡 |
| RAW_RABBIT | 3 | 兔 |

### AnimalHealth

动物生命值扩展（添加到现有 Animal 类）。

```typescript
interface AnimalHealthData {
  health: number            // 当前生命值
  maxHealth: number         // 最大生命值
  isDead: boolean           // 是否死亡
}
```

**动物生命值配置**:

| 动物类型 | 最大生命值 | 掉落物 |
|----------|-----------|--------|
| COW | 10 | RAW_BEEF |
| PIG | 10 | RAW_PORKCHOP |
| SHEEP | 10 | RAW_MUTTON |
| CHICKEN | 4 | RAW_CHICKEN |
| RABBIT | 4 | RAW_RABBIT |
| WOLF | 10 | 无 |
| FOX | 10 | 无 |

## 常量定义

```typescript
// 生命值常量
const HEALTH_MAX = 20
const INVINCIBILITY_DURATION = 0.5  // 秒

// 饥饿值常量
const HUNGER_MAX = 20
const HUNGER_SPRINT_COST = 0.1      // 每格移动消耗
const HUNGER_JUMP_COST = 0.2        // 每次跳跃消耗
const HUNGER_REGEN_THRESHOLD = 18   // 饥饿值高于此值时恢复生命
const STARVATION_DAMAGE = 1         // 饥饿伤害
const STARVATION_INTERVAL = 4       // 饥饿伤害间隔（秒）

// 氧气常量
const OXYGEN_MAX = 10               // 秒
const DROWNING_DAMAGE = 2           // 溺水伤害
const DROWNING_INTERVAL = 1         // 溺水伤害间隔（秒）

// 环境伤害常量
const FALL_DAMAGE_THRESHOLD = 3     // 开始计算摔落伤害的高度
const LAVA_DAMAGE = 4               // 岩浆伤害
const LAVA_DAMAGE_INTERVAL = 0.5    // 岩浆伤害间隔（秒）
const CACTUS_DAMAGE = 1             // 仙人掌伤害

// 动物攻击常量
const PLAYER_ATTACK_DAMAGE = 2      // 玩家攻击伤害
```

## 存档数据扩展

扩展现有存档结构以包含生存数据：

```typescript
interface SaveData {
  // 现有字段...
  version: number
  timestamp: number
  player: {
    position: { x: number, y: number, z: number }
    rotation: { x: number, y: number }
    inventory: ItemSlot[]
    // 新增生存数据
    stats: {
      health: number
      hunger: number
      oxygen: number
    }
  }
  world: {
    // 现有世界数据...
  }
  entities: {
    // 现有实体数据...
    // 新增动物生命值
    animals: Array<{
      id: string
      type: string
      position: { x: number, y: number, z: number }
      health: number
    }>
  }
}
```

## 关系图

```
┌─────────────┐     ┌──────────────┐
│   Player    │────▶│ PlayerStats  │
└─────────────┘     └──────────────┘
       │                   │
       │                   ▼
       │            ┌──────────────┐
       │            │ DamageSystem │
       │            └──────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌──────────────┐
│  Inventory  │     │EnvironmentDmg│
└─────────────┘     └──────────────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐
│ FoodRegistry│     │    Animal    │
└─────────────┘     └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  ItemEntity  │
                    │  (Food Drop) │
                    └──────────────┘
```
