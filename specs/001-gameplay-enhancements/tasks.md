# Tasks: 基础完善阶段 - 游戏体验增强

**Branch**: `001-gameplay-enhancements` | **Date**: 2025-12-16 | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Task Overview

| ID | Task | Priority | Est. | Dependencies | Status |
|----|------|----------|------|--------------|--------|
| T1 | 动物动画系统 | P1 | 4h | - | ⬜ |
| T2 | 手持物品与攻击动画 | P2 | 3h | - | ⬜ |
| T3 | 挖掘系统增强 | P3 | 4h | - | ⬜ |
| T4 | 篝火与熟食系统 | P4 | 5h | - | ⬜ |

**Total Estimated Time**: 16h

---

## T1: 动物动画系统 (P1)

**Goal**: 为所有7种动物实现行走/站立/受伤/死亡动画，让生物更加生动

**Requirements**: FR-001 ~ FR-005, SC-001, SC-002

### Subtasks

#### T1.1 创建动画状态枚举和接口
- 创建 `src/animation/AnimationState.ts`
- 定义 `AnimalAnimationState` 枚举 (IDLE, WALKING, HURT, DYING, SWIMMING)
- 定义 `AnimationConfig` 和 `AnimalAnimationData` 接口
- 参考 [data-model.md](./data-model.md) 中的定义

#### T1.2 实现动物动画控制器
- 创建 `src/animation/AnimalAnimator.ts`
- 实现程序化动画逻辑：
  - `updateWalkAnimation()`: 腿部摆动，使用 `Math.sin(time * speed) * amplitude`
  - `updateIdleAnimation()`: 轻微呼吸起伏
  - `updateHurtAnimation()`: 身体闪烁红色 + 后退
  - `updateDyingAnimation()`: 侧倒动画 (rotation.z 从 0 到 π/2)
- 实现状态过渡混合 (blendTime: 0.2s)

#### T1.3 实现头部朝向系统
- 在 `AnimalAnimator` 中添加 `updateHeadRotation()`
- 计算头部朝向目标（玩家或移动方向）
- 使用 `THREE.MathUtils.lerp` 平滑过渡
- 限制头部旋转角度 (yaw: ±60°, pitch: ±30°)

#### T1.4 集成到现有动物系统
- 修改 `src/entities/Animal.ts`
- 为每个动物实例创建 `AnimalAnimator`
- 在 `update()` 方法中调用动画更新
- 根据移动状态触发动画状态切换
- 在受伤/死亡时触发对应动画

**Acceptance Criteria**:
- [ ] 7种动物均有4种动画状态
- [ ] 动画过渡流畅，无跳帧
- [ ] 头部能转向玩家
- [ ] 死亡动画后动物消失

---

## T2: 手持物品与攻击动画 (P2)

**Goal**: 第一人称视角显示手持物品，攻击时播放挥动动画

**Requirements**: FR-006 ~ FR-009, SC-003, SC-004

### Subtasks

#### T2.1 创建手持物品渲染器
- 创建 `src/player/HandRenderer.ts`
- 创建手持物品的 Three.js 场景结构：
  - 作为相机子对象
  - 位置: (0.4, -0.3, -0.5) 相对于相机
  - 旋转: 略微倾斜显示
- 实现 `setItem(blockType: BlockType | null)` 方法

#### T2.2 实现物品显示逻辑
- 方块类型：创建小型方块 mesh (0.3 单位)
- 食物类型：创建扁平方块 mesh
- 空手：不显示或显示手臂 mesh
- 使用现有纹理系统获取方块纹理

#### T2.3 实现攻击挥动动画
- 创建 `src/animation/HandAnimator.ts`
- 实现挥动动画：
  - 持续时间: 0.3s
  - 动画曲线: 快速挥下 + 缓慢回位
  - rotation.x: 0 → -π/4 → 0
- 添加行走摆动效果 (bobOffset)

#### T2.4 集成到玩家系统
- 监听快捷栏切换事件，更新手持显示
- 监听攻击输入（左键），触发挥动动画
- 确保第一人称视角时显示，第三人称时隐藏

**Acceptance Criteria**:
- [ ] 快捷栏物品正确显示在右下角
- [ ] 攻击时手臂挥动，0.3s 内完成
- [ ] 切换物品时即时更新显示
- [ ] 空手时不显示物品

---

## T3: 挖掘系统增强 (P3)

**Goal**: 添加挖掘进度条、方块裂纹动画、挖掘粒子效果

**Requirements**: FR-010 ~ FR-014, SC-005 ~ SC-007

### Subtasks

#### T3.1 定义方块挖掘时间表
- 创建 `src/mining/MiningConstants.ts`
- 定义各方块基础挖掘时间：
  ```typescript
  DIRT: 0.5s, GRASS: 0.6s, SAND: 0.5s
  STONE: 1.5s, COBBLESTONE: 2.0s
  WOOD: 2.0s, LEAVES: 0.2s
  GLASS: 0.3s, BEDROCK: Infinity (不可挖掘)
  ```
- 确保最快与最慢相差至少3倍

#### T3.2 实现挖掘进度管理
- 创建 `src/mining/MiningProgress.ts`
- 实现 `MiningState` 接口
- 跟踪当前挖掘目标、进度、时间
- 实现 `startMining()`, `updateMining()`, `cancelMining()`, `completeMining()`

#### T3.3 实现裂纹纹理覆盖
- 创建 `src/mining/CrackOverlay.ts`
- 程序化生成3阶段裂纹纹理：
  - Stage 1 (0-33%): 轻微裂纹
  - Stage 2 (33-66%): 中等裂纹
  - Stage 3 (66-100%): 严重裂纹
- 使用透明叠加层显示在目标方块上

#### T3.4 实现挖掘粒子效果
- 创建 `src/particles/ParticlePool.ts` (对象池)
- 创建 `src/particles/BlockParticles.ts`
- 粒子属性：
  - 颜色：从方块纹理采样
  - 大小：0.05-0.1 单位
  - 生命周期：0.5-1s
  - 重力：向下掉落
- 每次挖掘产生 5-10 个粒子

#### T3.5 实现挖掘进度条 UI
- 创建 `src/ui/MiningProgressBar.ts`
- 显示在屏幕中央偏下
- 样式：横向进度条，显示百分比
- 挖掘时显示，停止时隐藏

#### T3.6 集成到方块交互系统
- 修改 `src/player/BlockInteraction.ts`
- 长按左键开始挖掘（替代即时破坏）
- 松开左键或移开视线取消挖掘
- 进度完成后破坏方块

**Acceptance Criteria**:
- [ ] 进度条准确显示挖掘进度
- [ ] 裂纹有3个可辨识阶段
- [ ] 不同方块挖掘时间差异明显
- [ ] 中断挖掘时进度重置
- [ ] 挖掘时产生粒子效果

---

## T4: 篝火与熟食系统 (P4)

**Goal**: 实现篝火方块，支持自动烤制生肉为熟食

**Requirements**: FR-015 ~ FR-020, SC-008 ~ SC-010

### Subtasks

#### T4.1 添加新方块和物品类型
- 修改 `src/core/Block.ts`
- 添加 `BlockType.CAMPFIRE` (60)
- 添加熟食类型：
  - `COOKED_BEEF` (61), `COOKED_PORKCHOP` (62)
  - `COOKED_MUTTON` (63), `COOKED_CHICKEN` (64), `COOKED_RABBIT` (65)
- 生成篝火和熟食的程序化纹理

#### T4.2 实现熟食定义
- 修改 `src/survival/FoodRegistry.ts`
- 添加5种熟食物品定义
- 饥饿值恢复：生食的2倍
  ```typescript
  COOKED_BEEF: 8 (生牛肉: 4)
  COOKED_PORKCHOP: 8 (生猪排: 4)
  COOKED_MUTTON: 6 (生羊肉: 3)
  COOKED_CHICKEN: 6 (生鸡肉: 3)
  COOKED_RABBIT: 5 (生兔肉: 2.5 → 3)
  ```

#### T4.3 实现篝火方块逻辑
- 创建 `src/blocks/CampfireBlock.ts`
- 实现 `CampfireState` 接口（4个烤制槽位）
- 实现烤制逻辑：
  - 烤制时间：10秒
  - 独立计时每个槽位
  - 完成后弹出熟食掉落物

#### T4.4 实现火焰粒子效果
- 创建 `src/particles/FireParticles.ts`
- 火焰粒子属性：
  - 颜色：橙黄色渐变
  - 向上飘动
  - 生命周期：0.5-1s
  - 生成速率：20/秒
- 添加烟雾粒子（灰色，更高飘动）

#### T4.5 实现篝火渲染
- 创建 `src/blocks/CampfireRenderer.ts`
- 篝火模型：底部木头 + 顶部火焰粒子
- 光照效果：lightLevel = 15
- 显示正在烤制的食物（小型 mesh）

#### T4.6 实现篝火交互
- 右键点击篝火：
  - 手持生肉时：放入烤制（如果有空槽位）
  - 槽位已满时：显示提示"篝火已满"
- 熟食弹出：
  - 创建掉落物实体
  - 弹出方向：随机水平方向
  - 弹出速度：3 单位/秒

#### T4.7 集成到世界系统
- 篝火状态保存到存档
- 区块加载时恢复篝火状态
- 区块卸载时保存篝火状态

**Acceptance Criteria**:
- [ ] 篝火可正常放置和破坏
- [ ] 火焰粒子持续稳定显示
- [ ] 最多同时烤制4个生肉
- [ ] 烤制10秒后自动弹出熟食
- [ ] 熟食饥饿值恢复为生食的2倍
- [ ] 篝火产生光照效果

---

## Implementation Order

```
T1 (动物动画) ──┐
               ├──→ T3 (挖掘系统) ──→ T4 (篝火熟食)
T2 (手持物品) ──┘
```

**推荐顺序**: T1 → T2 → T3 → T4

- T1 和 T2 可并行开发（无依赖）
- T3 依赖 T1/T2 中的粒子系统基础设施（可复用）
- T4 依赖 T3 中的粒子系统（FireParticles 复用 ParticlePool）

---

## Testing Checklist

### 动物动画系统
- [ ] 观察移动中的动物，腿部摆动自然
- [ ] 观察静止的动物，有呼吸起伏
- [ ] 攻击动物，受伤动画播放
- [ ] 击杀动物，死亡倒地动画播放
- [ ] 靠近动物，头部转向玩家

### 手持物品与攻击动画
- [ ] 切换快捷栏，手持物品更新
- [ ] 手持方块，显示小型方块
- [ ] 手持食物，显示食物
- [ ] 空手时不显示物品
- [ ] 左键攻击，挥动动画播放

### 挖掘系统增强
- [ ] 长按左键挖掘，进度条显示
- [ ] 挖掘过程中裂纹逐渐加深
- [ ] 挖掘时产生粒子
- [ ] 松开左键，进度重置
- [ ] 泥土挖掘快于石头

### 篝火与熟食系统
- [ ] 放置篝火，火焰粒子显示
- [ ] 手持生肉右键篝火，生肉放入
- [ ] 等待10秒，熟食弹出
- [ ] 最多放入4个生肉
- [ ] 食用熟食，恢复更多饥饿值
- [ ] 篝火周围变亮（光照效果）

---

## Notes

- 所有动画使用程序化实现，无需外部动画文件
- 粒子系统使用对象池避免 GC 开销
- 挖掘时间可在后续添加工具系统时调整（工具加速）
- 篝火状态需要与存档系统集成
