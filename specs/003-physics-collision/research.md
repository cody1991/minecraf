# Research: 物理与碰撞系统

**Feature**: 003-physics-collision  
**Date**: 2025-12-12

## 研究任务

基于技术上下文分析，本功能无 NEEDS CLARIFICATION 项。以下为技术最佳实践研究。

---

## 1. 游戏物理引擎模式

### Decision: 自定义简化物理引擎

### Rationale
- Minecraft 类游戏的物理需求相对简单（无刚体旋转、无复杂约束）
- 现有代码已有 AABB 碰撞检测基础
- 引入完整物理引擎（如 Cannon.js、Rapier）会增加不必要的复杂度和包体积
- 自定义实现可精确控制行为，与 Minecraft 原版体验一致

### Alternatives Considered
| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| Cannon.js | 成熟、功能完整 | 包体积大、过度设计 | 拒绝 |
| Rapier (WASM) | 高性能、现代 | 额外依赖、学习曲线 | 拒绝 |
| 自定义实现 | 轻量、可控、与现有代码一致 | 需自行实现 | ✅ 采用 |

---

## 2. 碰撞检测算法

### Decision: 分离轴碰撞检测 + 扫掠体积

### Rationale
- AABB（轴对齐包围盒）是体素游戏的标准碰撞体积
- 分轴处理（X、Y、Z 分别检测）可实现墙壁滑动效果
- 扫掠体积（Swept AABB）可防止高速穿墙

### 实现策略
```
1. 计算预期移动向量
2. 分轴检测碰撞：
   - 先处理 Y 轴（重力/跳跃）
   - 再处理 X 轴
   - 最后处理 Z 轴
3. 对每个轴：
   - 检测碰撞
   - 如碰撞，调整位置到碰撞面
   - 更新速度分量
```

### Alternatives Considered
| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| 简单 AABB 检测 | 实现简单 | 高速穿墙风险 | 部分采用 |
| GJK/EPA | 支持复杂形状 | 过度设计 | 拒绝 |
| 分轴 + 扫掠 | 平衡性能与准确性 | 实现略复杂 | ✅ 采用 |

---

## 3. 重力与跳跃参数

### Decision: 采用 Minecraft 风格参数

### Rationale
- 参考 Minecraft 原版物理参数，确保熟悉的游戏手感
- 重力加速度约 32 blocks/s² (接近真实 2g，增强游戏感)
- 跳跃初速度约 8.4 blocks/s，可跳跃略高于 1 格

### 参数设定
| 参数 | 值 | 说明 |
|------|-----|------|
| GRAVITY | 32 blocks/s² | 向下加速度 |
| JUMP_VELOCITY | 8.5 blocks/s | 跳跃初速度 |
| TERMINAL_VELOCITY | 78 blocks/s | 最大下落速度 |
| PLAYER_WIDTH | 0.6 blocks | 玩家碰撞宽度 |
| PLAYER_HEIGHT | 1.8 blocks | 玩家碰撞高度 |

### 验证计算
- 跳跃高度 = v²/(2g) = 8.5²/(2×32) ≈ 1.13 blocks ✅ 可跳上 1 格
- 从 10 格下落时间 = √(2h/g) = √(20/32) ≈ 0.79s ✅ 符合 SC-001

---

## 4. 地面检测策略

### Decision: 向下射线检测 + 容差值

### Rationale
- 需要精确判断玩家是否"站在地面上"以允许跳跃
- 使用小容差值（0.01 blocks）避免浮点误差导致的误判

### 实现策略
```
isGrounded = 检测玩家 AABB 底部下方 0.01 blocks 范围内是否有固体方块
```

---

## 5. 性能优化策略

### Decision: 局部碰撞检测 + 早期退出

### Rationale
- 玩家 AABB 最多与 3×3×4 = 36 个方块相交
- 实际检测时使用早期退出，发现碰撞即停止
- 无需空间分区（如八叉树），区块系统已提供足够的空间局部性

### 性能预估
- 每帧最多检测 ~36 个方块
- 每次检测约 10 次浮点比较
- 总计 < 400 次操作/帧，远低于性能预算

---

## 6. 与现有代码集成

### Decision: 扩展 Movement 类 + 新增 PhysicsSystem

### Rationale
- 现有 `Movement` 类已有水平碰撞检测
- 新增 `PhysicsSystem` 封装物理计算，`Movement` 调用其接口
- 保持模块化，物理系统可独立测试

### 集成点
| 组件 | 修改内容 |
|------|---------|
| `Player.ts` | 添加 `isGrounded: boolean` 状态 |
| `Movement.ts` | 集成 PhysicsSystem，添加跳跃处理 |
| `InputManager.ts` | 添加 `jump: boolean` 输入状态 |
| `KeyboardInput.ts` | 映射空格键到跳跃 |

---

## 总结

所有技术决策已明确，无阻塞项。可进入 Phase 1 设计阶段。
