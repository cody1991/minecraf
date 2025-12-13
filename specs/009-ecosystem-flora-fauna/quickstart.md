# Quickstart: 生态系统完善 - 动植物扩展

**Date**: 2025-12-12  
**Feature**: 009-ecosystem-flora-fauna

## 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck
```

## 关键文件位置

### 需要修改的文件

| 文件 | 修改内容 |
|------|---------|
| `src/entities/AnimalTypes.ts` | 添加 RABBIT, WOLF, FOX 枚举值 |
| `src/entities/AnimalSpawner.ts` | 更新生物群系权重，添加新动物生成逻辑 |
| `src/terrain/PlantTypes.ts` | 添加 ROSE, TULIP, DAISY, CORNFLOWER 枚举值 |
| `src/terrain/PlantGenerator.ts` | 更新生物群系植物配置 |

### 需要新建的文件

| 文件 | 说明 |
|------|------|
| `src/entities/Rabbit.ts` | 兔子动物类 |
| `src/entities/Wolf.ts` | 狼动物类 |
| `src/entities/Fox.ts` | 狐狸动物类 |
| `src/entities/Fish.ts` | 鱼类基类 |
| `src/entities/CommonFish.ts` | 普通鱼类 |
| `src/entities/TropicalFish.ts` | 热带鱼类 |
| `src/entities/FishSpawner.ts` | 鱼类生成器 |
| `src/terrain/TreeGenerator.ts` | 树木生成器 |
| `src/terrain/TreeTypes.ts` | 树木类型定义 |

## 实现顺序建议

### Phase 1: 新增陆地动物 (P1)

1. 扩展 `AnimalTypes.ts` 添加新枚举值
2. 创建 `Rabbit.ts`、`Wolf.ts`、`Fox.ts`（参考 `Cow.ts` 结构）
3. 更新 `AnimalSpawner.ts` 的生物群系权重
4. 测试：在不同生物群系观察新动物

### Phase 2: 新增花卉 (P1)

1. 扩展 `PlantTypes.ts` 添加新花卉枚举值
2. 更新 `PlantGenerator.ts` 的生物群系配置
3. 测试：在平原观察新花卉

### Phase 3: 新增树木 (P1)

1. 创建 `TreeTypes.ts` 定义树木类型
2. 创建 `TreeGenerator.ts` 实现树木生成逻辑
3. 在 `TerrainGenerator.ts` 中集成树木生成
4. 测试：观察树木分布和间距

### Phase 4: 水生动物 (P2)

1. 创建 `Fish.ts` 鱼类基类
2. 创建 `CommonFish.ts`、`TropicalFish.ts`
3. 创建 `FishSpawner.ts` 鱼类生成器
4. 在 `EntityManager.ts` 中集成鱼类管理
5. 测试：在湖泊观察鱼类游动

### Phase 5: 出生点保护 (P2)

1. 确认 `AnimalSpawner.ts` 已跳过斗兽场区域
2. 在 `TreeGenerator.ts` 添加出生点保护检测
3. 在 `PlantGenerator.ts` 添加出生点保护检测
4. 测试：确认出生点无动植物

## 代码模板

### 新动物类模板

```typescript
// src/entities/Rabbit.ts
import * as THREE from 'three';
import { Animal } from './Animal';
import { AnimalType, ANIMAL_CONFIGS } from './AnimalTypes';

export class Rabbit extends Animal {
  constructor(x: number, y: number, z: number) {
    super(AnimalType.RABBIT, x, y, z);
  }

  protected createMesh(): THREE.Group {
    const group = new THREE.Group();
    const config = ANIMAL_CONFIGS[AnimalType.RABBIT];
    
    // 创建身体
    const bodyGeometry = new THREE.BoxGeometry(
      config.bodySize.width,
      config.bodySize.height,
      config.bodySize.depth
    );
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: config.color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // 创建头部、耳朵、腿等...
    
    return group;
  }
}
```

### 鱼类基类模板

```typescript
// src/entities/Fish.ts
import * as THREE from 'three';
import { Entity } from './Entity';
import { FishType } from './FishTypes';

export abstract class Fish extends Entity {
  protected fishType: FishType;
  protected velocity: THREE.Vector3;
  protected swimSpeed: number;
  protected turnRate: number;

  constructor(type: FishType, x: number, y: number, z: number) {
    super(x, y, z);
    this.fishType = type;
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 2
    ).normalize().multiplyScalar(this.swimSpeed);
  }

  update(deltaTime: number, world: World): void {
    // 计算下一位置
    const nextPos = this.position.clone().add(
      this.velocity.clone().multiplyScalar(deltaTime)
    );
    
    // 检测水边界
    if (!world.isWaterAt(nextPos.x, nextPos.y, nextPos.z)) {
      this.turnAround();
    } else {
      this.position.copy(nextPos);
    }
    
    this.updateMesh();
  }

  protected turnAround(): void {
    // 反转方向并添加随机偏移
    this.velocity.negate();
    this.velocity.x += (Math.random() - 0.5) * 0.5;
    this.velocity.z += (Math.random() - 0.5) * 0.5;
    this.velocity.normalize().multiplyScalar(this.swimSpeed);
  }
}
```

### 树木生成器模板

```typescript
// src/terrain/TreeGenerator.ts
import { BlockType } from '../core/BlockTypes';
import { TreeType, TREE_CONFIGS } from './TreeTypes';
import { BiomeType } from './BiomeTypes';

export class TreeGenerator {
  private treePositions: Map<string, boolean> = new Map();
  
  canPlaceTree(x: number, z: number): boolean {
    // 检测出生点保护区
    const distFromSpawn = Math.sqrt(x * x + z * z);
    if (distFromSpawn < SPAWN_PROTECTION_RADIUS) {
      return false;
    }
    
    // 检测间距
    for (let dx = -MIN_TREE_SPACING; dx <= MIN_TREE_SPACING; dx++) {
      for (let dz = -MIN_TREE_SPACING; dz <= MIN_TREE_SPACING; dz++) {
        if (this.treePositions.has(`${x + dx},${z + dz}`)) {
          return false;
        }
      }
    }
    return true;
  }

  generateTree(
    x: number, 
    y: number, 
    z: number, 
    type: TreeType,
    setBlock: (x: number, y: number, z: number, type: BlockType) => void
  ): void {
    const config = TREE_CONFIGS[type];
    const trunkHeight = config.minHeight + 
      Math.floor(Math.random() * (config.maxHeight - config.minHeight));
    
    // 生成树干
    for (let dy = 0; dy < trunkHeight; dy++) {
      setBlock(x, y + dy, z, config.trunkBlock);
    }
    
    // 生成树叶
    for (const offset of config.leavesPattern) {
      setBlock(
        x + offset.x,
        y + trunkHeight + offset.y,
        z + offset.z,
        config.leavesBlock
      );
    }
    
    this.treePositions.set(`${x},${z}`, true);
  }
}
```

## 测试检查点

| 检查项 | 验收标准 |
|-------|---------|
| 新动物出现 | 在平原看到兔子，在山地看到狼和狐狸 |
| 动物行为正常 | 新动物能漫游和逃跑 |
| 新花卉出现 | 在平原看到玫瑰、郁金香、雏菊、矢车菊 |
| 树木生成 | 看到橡树、桦树、云杉 |
| 树木间距 | 树木之间至少 8 格 |
| 鱼类游动 | 在湖泊看到鱼在水中游动 |
| 鱼类边界 | 鱼不会游出水面 |
| 出生点保护 | 斗兽场内无动物和树木 |
| 性能 | 保持 60 FPS |
