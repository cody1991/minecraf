# Data Model: 物理与碰撞系统

**Feature**: 003-physics-collision  
**Date**: 2025-12-12

## 实体定义

### 1. PhysicsBody (物理实体)

表示受物理系统影响的实体。

| 字段 | 类型 | 说明 |
|------|------|------|
| position | Vector3 | 实体中心位置 |
| velocity | Vector3 | 速度向量 (blocks/s) |
| width | number | 碰撞体宽度 (blocks) |
| height | number | 碰撞体高度 (blocks) |
| isGrounded | boolean | 是否站在地面上 |
| gravityScale | number | 重力缩放因子 (默认 1.0) |

**验证规则**:
- width > 0
- height > 0
- gravityScale >= 0

---

### 2. AABB (轴对齐包围盒)

碰撞检测的基本几何体。

| 字段 | 类型 | 说明 |
|------|------|------|
| minX | number | X 轴最小值 |
| maxX | number | X 轴最大值 |
| minY | number | Y 轴最小值 |
| maxY | number | Y 轴最大值 |
| minZ | number | Z 轴最小值 |
| maxZ | number | Z 轴最大值 |

**派生属性**:
- centerX = (minX + maxX) / 2
- centerY = (minY + maxY) / 2
- centerZ = (minZ + maxZ) / 2
- width = maxX - minX
- height = maxY - minY
- depth = maxZ - minZ

**验证规则**:
- minX < maxX
- minY < maxY
- minZ < maxZ

---

### 3. CollisionResult (碰撞结果)

碰撞检测的返回值。

| 字段 | 类型 | 说明 |
|------|------|------|
| collided | boolean | 是否发生碰撞 |
| normal | Vector3 | 碰撞法线 (指向实体外部) |
| penetration | number | 穿透深度 |
| blockPosition | Vector3 | 碰撞方块位置 |

---

### 4. PhysicsConfig (物理配置)

物理系统的可配置参数。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| gravity | number | 32 | 重力加速度 (blocks/s²) |
| jumpVelocity | number | 8.5 | 跳跃初速度 (blocks/s) |
| terminalVelocity | number | 78 | 最大下落速度 (blocks/s) |
| groundCheckOffset | number | 0.01 | 地面检测容差 (blocks) |

---

## 状态转换

### Player 地面状态

```
[空中] ←→ [地面]

触发条件:
- 空中 → 地面: 玩家 AABB 底部接触固体方块顶面
- 地面 → 空中: 玩家跳跃 或 脚下方块被移除
```

### 速度状态

```
[静止] → [加速] → [匀速/终端速度]
         ↓
      [碰撞归零]

触发条件:
- 静止 → 加速: 施加重力或跳跃
- 加速 → 终端速度: 速度达到 terminalVelocity
- 任意 → 碰撞归零: 碰撞检测返回 true
```

---

## 关系图

```
┌─────────────────┐
│     Player      │
│  (PhysicsBody)  │
└────────┬────────┘
         │ has
         ▼
┌─────────────────┐      queries      ┌─────────────────┐
│      AABB       │ ◄───────────────► │      World      │
│ (Collision Box) │                   │  (Block Data)   │
└────────┬────────┘                   └─────────────────┘
         │ produces
         ▼
┌─────────────────┐
│ CollisionResult │
└─────────────────┘
```

---

## 接口定义

### IPhysicsBody

```typescript
interface IPhysicsBody {
  position: THREE.Vector3
  velocity: THREE.Vector3
  width: number
  height: number
  isGrounded: boolean
  gravityScale: number
}
```

### ICollisionWorld

```typescript
interface ICollisionWorld {
  getBlock(x: number, y: number, z: number): BlockType
  isValidPosition(x: number, y: number, z: number): boolean
}
```

### IPhysicsSystem

```typescript
interface IPhysicsSystem {
  update(body: IPhysicsBody, world: ICollisionWorld, deltaTime: number): void
  applyJump(body: IPhysicsBody): boolean
  checkGrounded(body: IPhysicsBody, world: ICollisionWorld): boolean
}
```
