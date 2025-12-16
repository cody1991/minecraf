# Research: 生存机制

**Feature**: 020-survival-mechanics  
**Date**: 2025-12-16

## 研究任务

### 1. 现有代码集成点

#### Player 类集成

**Decision**: 在 `Player` 类中添加 `PlayerStats` 实例引用

**Rationale**: 
- Player 类已有 `position`、`velocity`、`isGrounded`、`isInWater` 等状态
- PlayerStats 作为组合而非继承，保持单一职责
- 通过 Player 访问 PlayerStats，便于序列化和存档

**Alternatives considered**:
- 继承方式：会使 Player 类过于臃肿
- 全局单例：不利于未来多人游戏扩展

#### Animal 类击杀机制

**Decision**: 在 `Animal` 基类中添加 `health`、`takeDamage()`、`die()` 方法

**Rationale**:
- Animal 已有完整的物理和 AI 系统
- 在基类添加生命值逻辑，所有动物自动继承
- 死亡时通过 EntityManager 移除并生成 ItemEntity

**Alternatives considered**:
- 每个动物类单独实现：代码重复
- 创建 Damageable 接口：过度设计，当前只有动物需要

#### 物品栏食物使用

**Decision**: 在 `Inventory` 类添加 `useItem()` 方法，通过 `FoodRegistry` 判断是否为食物

**Rationale**:
- 物品栏已有完整的槽位管理
- 食物使用是物品使用的一种，未来可扩展为通用物品使用

**Alternatives considered**:
- 在 Player 中处理：违反单一职责
- 创建 ItemUseSystem：当前只有食物，过度设计

### 2. 方块类型检查

**Decision**: 检查 `Block.ts` 中是否存在 LAVA 和 CACTUS 类型

**Findings**:
- `CACTUS` 已存在于 BlockType 枚举
- `LAVA` 不存在，需要添加（或使用现有方块模拟）

**Action**: 
- 添加 `LAVA` 方块类型到 BlockType 枚举
- 配置 LAVA 为非固体、可伤害方块

### 3. UI 实现模式

**Decision**: 使用 HTML/CSS 叠加层实现生存 UI

**Rationale**:
- 现有 UI（HotbarUI、InventoryUI）均使用 HTML/CSS
- 保持一致的 UI 实现风格
- HTML/CSS 更易于样式调整和动画

**UI 布局设计**:
```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│  ♥♥♥♥♥♥♥♥♥♥          🍖🍖🍖🍖🍖🍖🍖🍖🍖🍖  │
│  [1][2][3][4][5][6][7][8][9]            │
└─────────────────────────────────────────┘
```
- 生命值：快捷栏上方左侧
- 饥饿值：快捷栏上方右侧
- 死亡画面：全屏遮罩层

### 4. 伤害系统设计

**Decision**: 创建统一的 `DamageSystem` 处理所有伤害来源

**Rationale**:
- 统一处理无敌时间
- 统一触发受伤效果（红屏、音效）
- 便于添加新伤害类型

**伤害来源枚举**:
```typescript
enum DamageSource {
  FALL,           // 摔落
  DROWNING,       // 溺水
  LAVA,           // 岩浆
  CACTUS,         // 仙人掌
  STARVATION,     // 饥饿
  PLAYER_ATTACK,  // 玩家攻击（用于动物）
}
```

### 5. 饥饿消耗触发

**Decision**: 在 `Movement` 模块中触发饥饿消耗事件

**Rationale**:
- Movement 已有跑步和跳跃检测
- 通过事件系统解耦，Movement 不直接依赖 HungerSystem

**消耗计算**:
- 跑步：每移动 1 格消耗 0.1 点饥饿值
- 跳跃：每次跳跃消耗 0.2 点饥饿值
- 游泳：视为跑步，相同消耗率

### 6. 存档系统集成

**Decision**: 在现有存档结构中添加 PlayerStats 数据

**Rationale**:
- 存档系统（Feature 018）已支持玩家位置和物品栏
- 添加 `playerStats` 字段保存生命值、饥饿值

**存档数据结构扩展**:
```typescript
interface SaveData {
  // 现有字段...
  playerStats: {
    health: number
    hunger: number
    oxygen: number
  }
}
```

### 7. 性能考量

**Decision**: 生存系统更新使用固定时间步长

**Rationale**:
- 饥饿恢复、饥饿伤害等需要稳定的时间间隔
- 使用 deltaTime 累加器实现固定步长更新

**更新频率**:
- 生命恢复检查：每 0.5 秒
- 饥饿伤害检查：每 4 秒
- 溺水伤害检查：每 1 秒
- 岩浆伤害检查：每 0.5 秒

## 技术决策总结

| 决策点 | 选择 | 理由 |
|--------|------|------|
| PlayerStats 集成 | 组合模式 | 保持 Player 类职责单一 |
| Animal 击杀 | 基类扩展 | 代码复用，所有动物继承 |
| 食物使用 | Inventory.useItem() | 与现有物品栏系统一致 |
| LAVA 方块 | 新增 BlockType | 岩浆伤害需要方块类型判断 |
| UI 实现 | HTML/CSS 叠加层 | 与现有 UI 风格一致 |
| 伤害处理 | 统一 DamageSystem | 集中管理无敌时间和效果 |
| 饥饿触发 | 事件系统 | 模块解耦 |
| 存档集成 | 扩展现有结构 | 最小改动 |
