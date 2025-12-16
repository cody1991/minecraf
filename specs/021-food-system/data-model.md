# Data Model: 食物系统

**Feature**: 021-food-system  
**Date**: 2025-12-16

## 实体定义

### 1. FoodType (食物类型枚举)

**位置**: `src/survival/FoodRegistry.ts`（已存在，需扩展）

```typescript
export enum FoodType {
  RAW_BEEF = 'raw_beef',
  RAW_PORKCHOP = 'raw_porkchop',
  RAW_MUTTON = 'raw_mutton',
  RAW_CHICKEN = 'raw_chicken',
  RAW_RABBIT = 'raw_rabbit'
}
```

**状态**: ✅ 已存在

---

### 2. FoodItem (食物物品定义)

**位置**: `src/survival/FoodRegistry.ts`（已存在）

| 属性 | 类型 | 描述 |
|------|------|------|
| type | FoodType | 食物类型标识 |
| name | string | 中文名称 |
| nameEn | string | 英文名称 |
| hungerRestore | number | 饥饿值恢复量（格数） |
| blockType | BlockType | 对应的方块类型（用于物品栏显示） |

**当前值**:
| 食物 | hungerRestore |
|------|---------------|
| 生牛肉 | 3 |
| 生猪排 | 3 |
| 生羊肉 | 2 |
| 生鸡肉 | 2 |
| 生兔肉 | 3 |

**状态**: ✅ 已存在，需更新 `blockType` 关联

---

### 3. BlockType (方块类型扩展)

**位置**: `src/core/Block.ts`

**需要添加**:
```typescript
// 食物类型 (Feature: 021-food-system)
RAW_BEEF = 50,
RAW_PORKCHOP = 51,
RAW_MUTTON = 52,
RAW_CHICKEN = 53,
RAW_RABBIT = 54
```

**状态**: ❌ 需要添加

---

### 4. EatingState (进食状态)

**位置**: `src/survival/EatingSystem.ts`（新建）

```typescript
export enum EatingState {
  IDLE = 'idle',           // 未进食
  EATING = 'eating',       // 正在进食
  COMPLETED = 'completed'  // 进食完成（瞬态）
}
```

**状态**: ❌ 需要创建

---

### 5. EatingContext (进食上下文)

**位置**: `src/survival/EatingSystem.ts`（新建）

| 属性 | 类型 | 描述 |
|------|------|------|
| state | EatingState | 当前进食状态 |
| progress | number | 进食进度 (0.0 - 1.0) |
| targetFood | FoodType \| null | 正在食用的食物类型 |
| inventorySlot | number | 食物所在的物品栏槽位 |

**状态**: ❌ 需要创建

---

### 6. CombatHit (攻击命中结果)

**位置**: `src/combat/CombatSystem.ts`（新建）

| 属性 | 类型 | 描述 |
|------|------|------|
| hit | boolean | 是否命中 |
| target | Animal \| null | 命中的动物 |
| distance | number | 命中距离 |
| damage | number | 造成的伤害 |

**状态**: ❌ 需要创建

---

## 关系图

```
┌─────────────────────────────────────────────────────────────────┐
│                         Player                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Inventory  │  │ PlayerStats │  │EatingSystem │              │
│  │  (食物堆叠) │  │  (饥饿值)   │  │  (进食状态) │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
          │                │                │ 进食完成
          │                │                ▼
          │                │         ┌─────────────┐
          │                └────────▶│ 恢复饥饿值  │
          │                          └─────────────┘
          │
          │ 拾取                            攻击
          ▼                                  │
┌─────────────────┐                          │
│   ItemEntity    │◀─────────────────────────┤
│  (食物掉落物)   │                          │
└────────┬────────┘                          │
         │                                   │
         │ 掉落                              ▼
         │                          ┌─────────────┐
         │                          │   Animal    │
         └──────────────────────────│  (动物)     │
                                    │ - takeDamage│
                                    │ - onDeath   │
                                    └─────────────┘
```

---

## 状态转换

### 进食状态机

```
                    ┌──────────────────────────────┐
                    │                              │
                    ▼                              │
              ┌──────────┐                         │
              │   IDLE   │◀────────────────────────┤
              └────┬─────┘                         │
                   │                               │
                   │ 按住右键 + 选中食物           │
                   │ + 饥饿值未满                  │
                   ▼                               │
              ┌──────────┐                         │
              │  EATING  │─────────────────────────┤
              └────┬─────┘  松开右键/移动          │
                   │        (取消进食)             │
                   │                               │
                   │ 进度 >= 1.0                   │
                   ▼                               │
              ┌──────────┐                         │
              │COMPLETED │─────────────────────────┘
              └──────────┘  消耗食物 + 恢复饥饿值
```

### 动物死亡流程

```
Animal.takeDamage(3)
    │
    ├─ health > 0 → 触发红色闪烁 → 继续存活
    │
    └─ health <= 0 → die()
                       │
                       ├─ 设置 isDead = true
                       │
                       ├─ 获取 foodType = FoodRegistry.getFoodForAnimal(animalType)
                       │
                       └─ 调用 onDeathCallback(animal, position, foodType)
                                │
                                └─ EntityManager 创建 ItemEntity(position, blockType)
```

---

## 验证规则

| 规则 | 描述 |
|------|------|
| 攻击距离 | distance <= 3.0 格 |
| 攻击伤害 | damage = 3 点 |
| 进食条件 | 选中食物 && 饥饿值 < 10 |
| 进食时间 | 1.5 秒 |
| 拾取范围 | distance <= 2.0 格 |
| 堆叠上限 | 64 个 |
| 掉落物存活时间 | 300 秒 (5 分钟) |
