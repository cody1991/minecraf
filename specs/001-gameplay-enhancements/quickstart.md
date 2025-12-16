# Quickstart: 基础完善阶段 - 游戏体验增强

**Date**: 2025-12-16

## 开发环境

```bash
# 克隆并安装
cd /Users/cody/Desktop/tencent/minecraft
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck

# 构建生产版本
npm run build
```

## 功能模块概览

### 1. 动物动画系统 (P1)

**入口文件**: `src/animation/AnimalAnimator.ts`

```typescript
import { AnimalAnimator } from './animation/AnimalAnimator'

// 在 Animal 类中集成
class Animal {
  private animator: AnimalAnimator
  
  constructor() {
    this.animator = new AnimalAnimator(this.mesh)
  }
  
  update(deltaTime: number) {
    this.animator.update(deltaTime, this.state, this.velocity)
  }
}
```

**关键方法**:
- `setAnimationState(state)` - 切换动画状态
- `updateLegSwing(speed)` - 更新腿部摆动
- `lookAt(target)` - 头部转向目标

---

### 2. 手持物品与攻击动画 (P2)

**入口文件**: `src/player/HandRenderer.ts`

```typescript
import { HandRenderer } from './player/HandRenderer'

// 在 Game 或 Player 中初始化
const handRenderer = new HandRenderer(camera)

// 更新手持物品
handRenderer.setHeldItem(blockType)

// 触发攻击动画
handRenderer.playSwingAnimation()

// 每帧更新
handRenderer.update(deltaTime)
```

**关键方法**:
- `setHeldItem(blockType)` - 设置手持物品
- `playSwingAnimation()` - 播放挥动动画
- `updateBob(isWalking)` - 更新行走摆动

---

### 3. 挖掘系统增强 (P3)

**入口文件**: `src/mining/MiningProgress.ts`

```typescript
import { MiningSystem } from './mining/MiningProgress'
import { BLOCK_MINING_TIMES } from './mining/MiningConstants'

// 初始化
const miningSystem = new MiningSystem(world, renderer)

// 开始挖掘
miningSystem.startMining(blockPosition, blockType)

// 每帧更新
const completed = miningSystem.update(deltaTime)
if (completed) {
  // 方块被挖掘
}

// 停止挖掘
miningSystem.stopMining()
```

**UI 集成**:
```typescript
import { MiningProgressBar } from './ui/MiningProgressBar'

const progressBar = new MiningProgressBar()
progressBar.show(miningSystem.progress)
progressBar.hide()
```

---

### 4. 篝火与熟食系统 (P4)

**入口文件**: `src/blocks/CampfireBlock.ts`

```typescript
import { CampfireManager } from './blocks/CampfireBlock'

// 初始化篝火管理器
const campfireManager = new CampfireManager(world)

// 放置篝火
campfireManager.placeCampfire(position)

// 放入生肉
const success = campfireManager.addFood(campfirePosition, rawFoodType)

// 每帧更新（处理烤制和弹出）
campfireManager.update(deltaTime)
```

**熟食注册**:
```typescript
import { FoodRegistry, CookedFoodType } from './survival/FoodRegistry'

// 获取熟食信息
const cookedBeef = FoodRegistry.getCookedFood(CookedFoodType.COOKED_BEEF)
console.log(cookedBeef.hungerRestore) // 6
```

---

## 测试流程

### 动物动画测试

1. 启动游戏 `npm run dev`
2. 找到任意动物
3. 观察：
   - 静止时有呼吸动画
   - 移动时腿部摆动
   - 攻击时闪烁受伤
   - 死亡时倒地动画

### 手持物品测试

1. 确保第一人称视角
2. 切换快捷栏物品
3. 观察右下角手持显示
4. 左键攻击，观察挥动动画

### 挖掘系统测试

1. 对准任意方块
2. 长按左键挖掘
3. 观察：
   - 进度条显示
   - 方块裂纹变化
   - 粒子效果
4. 中途松开，验证重置

### 篝火测试

1. 放置篝火方块
2. 手持生肉右键点击篝火
3. 等待 10 秒
4. 观察熟食弹出
5. 拾取并食用，验证恢复值

---

## 文件结构

```
src/
├── animation/
│   ├── AnimationState.ts      # 动画状态定义
│   ├── AnimalAnimator.ts      # 动物动画控制
│   └── HandAnimator.ts        # 手持动画控制
├── particles/
│   ├── ParticlePool.ts        # 粒子对象池
│   ├── ParticleEmitter.ts     # 粒子发射器
│   ├── BlockParticles.ts      # 方块粒子
│   └── FireParticles.ts       # 火焰粒子
├── mining/
│   ├── MiningConstants.ts     # 挖掘时间表
│   ├── MiningProgress.ts      # 挖掘进度
│   ├── CrackOverlay.ts        # 裂纹覆盖
│   └── MiningUI.ts            # 进度条 UI
├── blocks/
│   ├── CampfireBlock.ts       # 篝火逻辑
│   └── CampfireRenderer.ts    # 篝火渲染
└── ui/
    └── MiningProgressBar.ts   # 挖掘进度条
```

---

## 常见问题

**Q: 动画看起来不流畅？**
A: 检查 `deltaTime` 是否正确传递，确保使用 `requestAnimationFrame`

**Q: 手持物品位置不对？**
A: 调整 `HandRenderConfig.position`，默认值 `(0.5, -0.4, -0.8)`

**Q: 挖掘时间太长/太短？**
A: 修改 `MiningConstants.ts` 中的 `MINING_TIME_SCALE` 因子

**Q: 篝火粒子性能差？**
A: 减少 `FireParticles.SPAWN_RATE` 或增加 `ParticlePool` 大小
