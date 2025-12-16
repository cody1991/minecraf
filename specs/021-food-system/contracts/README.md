# Contracts: 食物系统

**Feature**: 021-food-system  
**Date**: 2025-12-16

## 说明

本功能为纯前端 WebGL 游戏，无后端 API。所有交互均为本地游戏逻辑。

## 内部接口定义

### CombatSystem

```typescript
interface CombatSystem {
  /**
   * 执行攻击
   * @returns 攻击结果
   */
  attack(): CombatHit

  /**
   * 检查攻击冷却
   * @returns 是否可以攻击
   */
  canAttack(): boolean
}

interface CombatHit {
  hit: boolean
  target: Animal | null
  distance: number
  damage: number
}
```

### EatingSystem

```typescript
interface EatingSystem {
  /**
   * 开始进食
   * @param slotIndex 物品栏槽位
   * @returns 是否成功开始
   */
  startEating(slotIndex: number): boolean

  /**
   * 取消进食
   */
  cancelEating(): void

  /**
   * 更新进食状态
   * @param deltaTime 时间增量
   */
  update(deltaTime: number): void

  /**
   * 获取当前状态
   */
  getState(): EatingState

  /**
   * 获取进食进度 (0.0 - 1.0)
   */
  getProgress(): number
}
```

### FoodRegistry (扩展)

```typescript
interface FoodRegistry {
  /**
   * 通过 BlockType 获取食物信息
   * @param blockType 方块类型
   * @returns 食物信息或 null
   */
  static getFoodByBlockType(blockType: BlockType): FoodItem | null

  /**
   * 检查 BlockType 是否为食物
   * @param blockType 方块类型
   * @returns 是否为食物
   */
  static isFoodBlock(blockType: BlockType): boolean
}
```

## 事件流

### 攻击流程

```
InputManager.onLeftClick()
  → CombatSystem.attack()
    → Raycaster.castToAnimals()
    → Animal.takeDamage()
    → AudioManager.playAttackSound()
```

### 进食流程

```
InputManager.onRightMouseDown()
  → EatingSystem.startEating()
    → FoodRegistry.isFoodBlock()
    → PlayerStats.hunger < MAX_HUNGER
    → EatingProgressUI.show()

InputManager.onRightMouseUp()
  → EatingSystem.cancelEating()
    → EatingProgressUI.hide()

EatingSystem.update() [进度完成]
  → PlayerStats.addHunger()
  → Inventory.removeItem()
  → AudioManager.playEatCompleteSound()
  → EatingProgressUI.hide()
```
