# Research: 生态系统完善 - 动植物扩展

**Date**: 2025-12-12  
**Feature**: 009-ecosystem-flora-fauna

## 研究任务

### 1. 新动物类型实现方案

**Decision**: 继承现有 `Animal` 基类，复用 `AnimalAI` 状态机

**Rationale**:
- 现有架构已支持 4 种动物（牛、羊、猪、鸡），扩展性良好
- `AnimalAI` 状态机（IDLE、WANDERING、FLEEING）满足被动动物需求
- 每种动物只需定义外观模型和配置参数

**Alternatives considered**:
- 新建独立的动物系统 → 拒绝，重复造轮子
- 使用 ECS 架构重构 → 拒绝，改动过大，不符合增量开发原则

### 2. 鱼类水中移动逻辑

**Decision**: 新建 `Fish` 类继承 `Entity`，实现独立的水中移动逻辑

**Rationale**:
- 鱼类移动规则与陆地动物完全不同（无重力、3D 自由移动、水边界检测）
- 需要检测水方块边界，遇到边界时掉头
- 不需要复杂的 AI 状态，只需简单的随机游动

**Implementation approach**:
```typescript
// 伪代码
class Fish extends Entity {
  update(deltaTime: number) {
    // 1. 计算下一位置
    const nextPos = this.position + this.velocity * deltaTime;
    // 2. 检测下一位置是否仍在水中
    if (!world.isWaterAt(nextPos)) {
      // 3. 掉头
      this.velocity = -this.velocity + randomDeviation;
    }
    // 4. 更新位置
    this.position = nextPos;
  }
}
```

**Alternatives considered**:
- 继承 `Animal` 类 → 拒绝，Animal 包含陆地物理（重力、跳跃）不适用
- 使用粒子系统模拟 → 拒绝，无法实现个体行为

### 3. 树木生成最佳实践

**Decision**: 新建 `TreeGenerator` 类，在区块生成时放置树木结构

**Rationale**:
- 树木是多格结构（树干 + 树叶），需要专门的生成逻辑
- 需要检测间距（8 格最小）避免重叠
- 需要检测出生点保护区

**Tree structure patterns**:
| 树木类型 | 树干高度 | 树叶形状 | 总高度 |
|---------|---------|---------|-------|
| 橡树 | 4-5 格 | 球形 3x3x3 | 5-7 格 |
| 桦树 | 5-6 格 | 柱形 3x3x2 | 6-7 格 |
| 云杉 | 4-6 格 | 锥形多层 | 6-8 格 |

**Alternatives considered**:
- 在 `PlantGenerator` 中处理 → 拒绝，树木逻辑复杂度高，应独立模块
- 预制树木模型 → 拒绝，方块游戏应使用方块构建

### 4. 出生点保护区实现

**Decision**: 复用 `COLOSSEUM_FLAT_RADIUS` 常量（约 50 格），在生成器中检测

**Rationale**:
- 斗兽场已有明确的区域定义
- 动物生成器 `AnimalSpawner` 已有跳过斗兽场区域的逻辑
- 只需扩展到植物和树木生成器

**Implementation approach**:
```typescript
// 在生成前检测
const distanceFromSpawn = Math.sqrt(x*x + z*z);
if (distanceFromSpawn < SPAWN_PROTECTION_RADIUS) {
  return; // 跳过生成
}
```

**Alternatives considered**:
- 硬编码 50 格 → 拒绝，应复用现有常量保持一致性
- 使用配置文件 → 拒绝，过度设计

### 5. 密度控制策略

**Decision**: 
- 动物：每区块最多 6 只（通过 `AnimalSpawner.maxPerChunk` 配置）
- 树木：生成时检测周围 8 格内无其他树木

**Rationale**:
- 现有 `AnimalSpawner` 已有 `maxPerChunk: 4` 配置，调整为 6
- 树木间距检测需要记录已生成树木位置

**Implementation approach**:
```typescript
// 树木间距检测
class TreeGenerator {
  private treePositions: Set<string> = new Set();
  
  canPlaceTree(x: number, z: number): boolean {
    for (let dx = -8; dx <= 8; dx++) {
      for (let dz = -8; dz <= 8; dz++) {
        if (this.treePositions.has(`${x+dx},${z+dz}`)) {
          return false;
        }
      }
    }
    return true;
  }
}
```

**Alternatives considered**:
- 使用噪声函数控制密度 → 可选，但间距检测更精确
- 固定网格放置 → 拒绝，看起来不自然

### 6. 生物群系动物分配

**Decision**: 扩展现有 `BIOME_SPAWN_WEIGHTS` 配置

**Rationale**:
- 现有系统已按生物群系配置动物权重
- 只需添加新动物的权重配置

**Updated weights**:
```typescript
BIOME_SPAWN_WEIGHTS = {
  PLAINS: { 
    COW: 3, SHEEP: 3, PIG: 2, CHICKEN: 2, 
    RABBIT: 3, WOLF: 0, FOX: 1 
  },
  LAKE: { 
    COW: 0, SHEEP: 0, PIG: 1, CHICKEN: 2, 
    RABBIT: 1, WOLF: 0, FOX: 0 
  },
  MOUNTAIN: { 
    COW: 1, SHEEP: 3, PIG: 0, CHICKEN: 1, 
    RABBIT: 1, WOLF: 2, FOX: 2 
  }
}
```

## 总结

所有技术问题已解决，无 NEEDS CLARIFICATION 项。可进入 Phase 1 设计阶段。
