# Research: 基础完善阶段 - 游戏体验增强

**Date**: 2025-12-16  
**Status**: Complete

## Research Tasks

### 1. Three.js 程序化骨骼动画

**Decision**: 使用程序化动画（Procedural Animation）而非骨骼动画系统

**Rationale**: 
- 现有动物模型由 THREE.Group 和基础几何体组成，无骨骼绑定
- 程序化动画通过直接操作 mesh.rotation 和 mesh.position 实现，性能开销小
- 符合项目"无外部资源依赖"的约束

**Alternatives Considered**:
- Three.js SkeletonHelper + AnimationMixer：需要重构所有动物模型，工作量大
- 外部动画文件 (glTF)：违反"程序化生成"原则

**Implementation Pattern**:
```typescript
// 腿部摆动示例
const legSwing = Math.sin(time * walkSpeed) * swingAmplitude
leftLeg.rotation.x = legSwing
rightLeg.rotation.x = -legSwing
```

---

### 2. 第一人称手持物品渲染

**Decision**: 使用独立的 Three.js Scene 或固定在相机前的 Group

**Rationale**:
- 手持物品需要固定在屏幕位置，不受世界相机影响
- 使用 camera.add(handGroup) 确保手持物品跟随视角
- 动画通过 requestAnimationFrame 驱动

**Alternatives Considered**:
- Overlay Canvas：需要额外渲染管线，性能开销大
- CSS 3D Transform：无法与 Three.js 场景无缝集成

**Implementation Pattern**:
```typescript
// 手持物品固定在相机前
const handGroup = new THREE.Group()
handGroup.position.set(0.5, -0.4, -0.8) // 右下角偏移
camera.add(handGroup)
```

---

### 3. 方块裂纹覆盖渲染

**Decision**: 使用透明纹理叠加 (Texture Overlay)

**Rationale**:
- Minecraft 原版使用 10 阶段裂纹纹理
- 本项目简化为 3 阶段（33%/66%/100%）
- 通过程序化生成裂纹纹理，无需外部资源

**Alternatives Considered**:
- Shader 动态裂纹：复杂度高，性能影响大
- 替换方块纹理：破坏原有纹理系统

**Implementation Pattern**:
```typescript
// 裂纹覆盖层
const crackMaterial = new THREE.MeshBasicMaterial({
  map: crackTexture,
  transparent: true,
  depthWrite: false,
  blending: THREE.MultiplyBlending
})
```

---

### 4. 粒子系统设计

**Decision**: 自定义粒子系统 + 对象池

**Rationale**:
- Three.js Points 适合大量粒子，但自定义粒子更灵活
- 对象池避免频繁 GC，符合性能约束
- 支持方块碎片和火焰两种粒子类型

**Alternatives Considered**:
- THREE.Points + ShaderMaterial：需要 GLSL 知识，调试困难
- 第三方粒子库 (three-nebula)：增加依赖

**Implementation Pattern**:
```typescript
class ParticlePool {
  private pool: Particle[] = []
  private active: Particle[] = []
  
  spawn(config: ParticleConfig): Particle {
    const particle = this.pool.pop() ?? new Particle()
    particle.reset(config)
    this.active.push(particle)
    return particle
  }
}
```

---

### 5. 方块挖掘时间平衡

**Decision**: 参考 Minecraft 原版挖掘时间，按比例缩放

**Rationale**:
- 原版挖掘时间经过平衡测试
- 本项目无工具系统，使用"徒手挖掘"时间
- 缩放因子 0.5x 加快节奏

**挖掘时间表** (秒):

| 方块类型 | 原版时间 | 本项目时间 |
|---------|---------|-----------|
| 泥土 Dirt | 0.75 | 0.4 |
| 沙子 Sand | 0.75 | 0.4 |
| 草地 Grass | 0.9 | 0.5 |
| 木板 Planks | 3.0 | 1.5 |
| 原木 Log | 3.0 | 1.5 |
| 圆石 Cobblestone | 10.0 | 5.0 |
| 石头 Stone | 7.5 | 3.75 |
| 砖块 Brick | 10.0 | 5.0 |
| 玻璃 Glass | 0.45 | 0.3 |
| 树叶 Leaves | 0.35 | 0.2 |

---

### 6. 篝火烤制机制

**Decision**: 篝火作为特殊方块，内部维护烤制槽位

**Rationale**:
- 最多 4 个槽位，每个独立计时
- 烤制时间 10 秒（规范要求 5-15 秒）
- 完成后自动弹出物品实体

**Data Model**:
```typescript
interface CampfireSlot {
  foodType: FoodType | null
  cookingTime: number      // 已烤制时间
  position: THREE.Vector3  // 显示位置（篝火上方）
}

interface CampfireState {
  slots: CampfireSlot[4]
  isLit: boolean
}
```

---

### 7. 熟食定义

**Decision**: 扩展 FoodRegistry，熟食恢复值为生食的 2 倍

**Rationale**:
- 规范要求"熟食恢复量比生食高至少 50%"
- 2 倍恢复值简单直观，符合 Minecraft 原版比例

**熟食定义**:

| 生食 | 恢复值 | 熟食 | 恢复值 |
|-----|-------|-----|-------|
| 生牛肉 | 3 | 熟牛肉 | 6 |
| 生猪排 | 3 | 熟猪排 | 6 |
| 生羊肉 | 2 | 熟羊肉 | 4 |
| 生鸡肉 | 2 | 熟鸡肉 | 4 |
| 生兔肉 | 3 | 熟兔肉 | 6 |

---

## Summary

所有技术决策已确定：
1. 程序化动画替代骨骼动画
2. 相机子对象实现手持物品
3. 透明纹理叠加实现裂纹
4. 对象池粒子系统
5. Minecraft 原版挖掘时间 × 0.5
6. 篝火 4 槽位独立计时
7. 熟食恢复值 = 生食 × 2
