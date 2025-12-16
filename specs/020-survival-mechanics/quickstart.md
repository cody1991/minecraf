# Quickstart: 生存机制

**Feature**: 020-survival-mechanics  
**Date**: 2025-12-16

## 快速开始

### 1. 开发环境

```bash
# 克隆并切换分支
git checkout 020-survival-mechanics

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 核心文件结构

```
src/
├── survival/           # 新模块 - 生存机制
│   ├── index.ts
│   ├── PlayerStats.ts
│   ├── DamageSystem.ts
│   ├── HungerSystem.ts
│   ├── HealthRegenSystem.ts
│   ├── EnvironmentDamage.ts
│   └── FoodRegistry.ts
├── ui/
│   ├── HealthBar.ts    # 新增
│   ├── HungerBar.ts    # 新增
│   ├── DamageOverlay.ts # 新增
│   └── DeathScreen.ts  # 新增
├── entities/
│   └── Animal.ts       # 修改 - 添加生命值
└── player/
    └── Player.ts       # 修改 - 集成 PlayerStats
```

### 3. 实现顺序

按优先级顺序实现：

#### P1 - 生命值系统（必须首先完成）
1. `PlayerStats.ts` - 创建玩家状态类
2. `DamageSystem.ts` - 创建伤害处理系统
3. `HealthBar.ts` - 创建生命值 UI
4. `DamageOverlay.ts` - 创建受伤红屏效果
5. `DeathScreen.ts` - 创建死亡画面
6. 集成到 `Player.ts`

#### P2 - 饥饿值系统
1. `HungerSystem.ts` - 创建饥饿消耗逻辑
2. `HealthRegenSystem.ts` - 创建生命恢复逻辑
3. `HungerBar.ts` - 创建饥饿值 UI
4. 修改 `Movement.ts` - 触发饥饿消耗

#### P2 - 食物系统
1. `FoodRegistry.ts` - 创建食物注册表
2. 修改 `Animal.ts` - 添加生命值和死亡掉落
3. 修改 `Inventory.ts` - 添加食物使用

#### P3 - 环境伤害系统
1. `EnvironmentDamage.ts` - 创建环境伤害检测
2. 添加 `LAVA` 方块类型
3. 集成摔落、溺水、岩浆、仙人掌伤害

### 4. 关键代码示例

#### PlayerStats 基础结构

```typescript
// src/survival/PlayerStats.ts
export class PlayerStats {
  health = 20
  maxHealth = 20
  hunger = 20
  maxHunger = 20
  oxygen = 10
  maxOxygen = 10
  invincibilityTime = 0
  isDead = false

  takeDamage(amount: number, source: DamageSource): void {
    if (this.invincibilityTime > 0 && !this.shouldIgnoreInvincibility(source)) {
      return
    }
    this.health = Math.max(0, this.health - amount)
    this.invincibilityTime = 0.5
    if (this.health <= 0) {
      this.die()
    }
  }

  respawn(): void {
    this.health = this.maxHealth
    this.hunger = this.maxHunger
    this.oxygen = this.maxOxygen
    this.isDead = false
  }
}
```

#### 生命值 UI 示例

```typescript
// src/ui/HealthBar.ts
export class HealthBar {
  private container: HTMLElement

  constructor() {
    this.container = document.createElement('div')
    this.container.className = 'health-bar'
    // 创建 10 个心形图标
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('div')
      heart.className = 'heart full'
      this.container.appendChild(heart)
    }
  }

  update(health: number): void {
    const hearts = this.container.children
    for (let i = 0; i < 10; i++) {
      const heartValue = Math.min(2, Math.max(0, health - i * 2))
      hearts[i].className = `heart ${heartValue >= 2 ? 'full' : heartValue >= 1 ? 'half' : 'empty'}`
    }
  }
}
```

### 5. 测试验证

#### 生命值测试
```bash
# 在游戏中测试
1. 从高处跳下（>3 格）- 验证摔落伤害和红屏
2. 持续受伤直到死亡 - 验证死亡画面
3. 点击重生 - 验证重生机制
```

#### 饥饿值测试
```bash
1. 持续跑步 1 分钟 - 验证饥饿值下降
2. 连续跳跃 - 验证跳跃消耗
3. 饥饿值满时站立 - 验证生命恢复
4. 饥饿值为 0 - 验证饥饿伤害
```

#### 食物系统测试
```bash
1. 点击动物多次 - 验证动物受伤死亡
2. 拾取掉落的食物 - 验证物品拾取
3. 右键使用食物 - 验证饥饿值恢复
```

### 6. 常见问题

**Q: 如何调试生存系统？**
```typescript
// 在控制台中访问
window.game.player.stats.health = 5  // 设置生命值
window.game.player.stats.hunger = 0  // 设置饥饿值
```

**Q: 如何禁用生存机制进行测试？**
```typescript
// 在 PlayerStats 中添加
this.godMode = true  // 无敌模式
```

**Q: UI 不显示？**
- 检查 CSS 是否正确加载
- 确认 UI 容器已添加到 DOM
- 检查 z-index 是否被其他元素遮挡
