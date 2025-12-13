# Quickstart: 物理与碰撞系统

**Feature**: 003-physics-collision  
**Date**: 2025-12-12

## 概述

本功能为 WebCraft 添加玩家物理系统，包括重力、碰撞检测和跳跃功能。

## 前置条件

- Node.js 18+
- 已完成 002-chunk-terrain-system 功能

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 核心用法

### 1. 物理系统初始化

```typescript
import { PhysicsSystem } from './physics/PhysicsSystem'
import { Player } from './player/Player'
import { World } from './core/World'

const world = new World()
const player = new Player(0, 50, 0)
const physics = new PhysicsSystem()

// 游戏循环中更新
function gameLoop(deltaTime: number) {
  physics.update(player, world, deltaTime)
}
```

### 2. 跳跃处理

```typescript
// 在输入处理中
if (input.jump && player.isGrounded) {
  physics.applyJump(player)
}
```

### 3. 自定义物理参数

```typescript
import { PhysicsConfig } from './physics/PhysicsSystem'

const customConfig: Partial<PhysicsConfig> = {
  gravity: 20,        // 降低重力
  jumpVelocity: 10,   // 增加跳跃高度
}

const physics = new PhysicsSystem(customConfig)
```

## 控制方式

| 按键 | 功能 |
|------|------|
| W/A/S/D | 移动 |
| 空格 | 跳跃 |
| 鼠标 | 视角控制 |

## 验证测试

1. **重力测试**: 玩家在空中会自动下落
2. **碰撞测试**: 玩家无法穿过方块
3. **跳跃测试**: 按空格可跳跃约 1 格高度
4. **墙壁滑动**: 斜向撞墙时沿墙滑动

## 文件结构

```
src/physics/
├── PhysicsSystem.ts   # 物理系统主类
├── Gravity.ts         # 重力计算
├── Collision.ts       # 碰撞检测
└── AABB.ts            # 包围盒工具
```

## 性能指标

- 目标帧率: 60 FPS
- 物理计算: < 2ms/帧
