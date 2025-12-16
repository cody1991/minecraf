# Data Model: 物品与背包系统

**Feature**: 019-inventory-system  
**Date**: 2025-12-16

## Entities

### ItemEntity

掉落在世界中的物品实体，继承自 Entity 基类。

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识符（继承自 Entity） |
| position | Vector3 | 世界坐标位置（继承自 Entity） |
| velocity | Vector3 | 速度向量 |
| itemType | BlockType | 物品类型（对应方块类型） |
| count | number | 堆叠数量（1-64） |
| spawnTime | number | 生成时间戳（毫秒） |
| isBeingPickedUp | boolean | 是否正在被吸引拾取 |
| bounceCount | number | 已弹跳次数 |

**状态转换**:
```
[生成] → [下落] → [弹跳] → [静止] → [被吸引] → [拾取/消失]
                              ↓
                         [5分钟超时] → [消失]
                              ↓
                         [进入岩浆] → [销毁]
```

**验证规则**:
- count 必须在 1-64 范围内
- itemType 必须是有效的 BlockType
- spawnTime 必须是有效的时间戳

---

### ItemSlot

背包中的单个物品槽。

| 字段 | 类型 | 说明 |
|------|------|------|
| itemType | BlockType \| null | 物品类型，null 表示空槽 |
| count | number | 堆叠数量（0-64），空槽为 0 |

**验证规则**:
- 如果 itemType 为 null，count 必须为 0
- 如果 itemType 不为 null，count 必须在 1-64 范围内

---

### Inventory

玩家的背包容器。

| 字段 | 类型 | 说明 |
|------|------|------|
| slots | ItemSlot[36] | 36 个物品槽位 |
| selectedSlot | number | 当前选中的快捷栏槽位（0-8） |

**槽位布局**:
```
快捷栏: slots[0] - slots[8]   (底部显示)
存储格: slots[9] - slots[35]  (背包界面显示)

背包界面布局:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 9 │10 │11 │12 │13 │14 │15 │16 │17 │  Row 1
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│18 │19 │20 │21 │22 │23 │24 │25 │26 │  Row 2
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│27 │28 │29 │30 │31 │32 │33 │34 │35 │  Row 3
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │  Hotbar
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

**验证规则**:
- slots 长度必须为 36
- selectedSlot 必须在 0-8 范围内

---

### InventoryState (存档用)

背包的可序列化状态，用于存档。

| 字段 | 类型 | 说明 |
|------|------|------|
| slots | Array<{itemType: number \| null, count: number}> | 序列化的槽位数据 |
| selectedSlot | number | 当前选中槽位 |

---

## Relationships

```
Player ──1:1──> Inventory ──1:N──> ItemSlot
                    │
                    └── selectedSlot 指向 slots[0-8]

World ──1:N──> ItemEntity
  │
  └── EntityManager 管理 ItemEntity 生命周期

BlockInteraction ──触发──> ItemEntity 生成
                              │
                              └── 拾取时 ──> Inventory.addItem()
```

## State Transitions

### ItemEntity 生命周期

```
┌─────────┐    破坏方块    ┌─────────┐
│  无     │ ───────────> │  下落   │
└─────────┘               └────┬────┘
                               │ 触地
                               ▼
                         ┌─────────┐
                         │  弹跳   │ ◄─┐
                         └────┬────┘   │ bounceCount < 3
                               │ ──────┘
                               │ bounceCount >= 3
                               ▼
                         ┌─────────┐
                         │  静止   │
                         └────┬────┘
                    玩家靠近 │     │ 5分钟超时
                               ▼     ▼
                         ┌─────────┐  ┌─────────┐
                         │ 被吸引  │  │  消失   │
                         └────┬────┘  └─────────┘
                               │ 到达玩家
                               ▼
                         ┌─────────┐
                         │  拾取   │ ──> Inventory.addItem()
                         └─────────┘
```

### Inventory 操作

```
addItem(itemType, count):
  1. 搜索快捷栏(0-8)中同类物品且 count < 64
  2. 搜索存储格(9-35)中同类物品且 count < 64
  3. 搜索第一个空槽
  4. 返回实际添加的数量

removeItem(slotIndex, count):
  1. 验证 slotIndex 有效
  2. 减少 count，如果为 0 则清空槽位
  3. 返回实际移除的数量

swapSlots(fromIndex, toIndex):
  1. 如果两槽物品相同，尝试堆叠
  2. 否则交换两槽内容

splitStack(slotIndex):
  1. 取一半数量到鼠标光标
  2. 用于右键拖拽操作
```
