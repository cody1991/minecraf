# Quickstart: 随机地形生成与冲刺移动

**Feature**: 006-random-terrain-generation  
**Date**: 2025-12-12

## 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck
```

## 核心改动概览

### 1. 随机种子 (World.ts)

```typescript
// 修改 World 构造函数
constructor(config?: Partial<WorldConfig>) {
  // 使用随机种子或用户指定种子
  const seed = config?.seed ?? Date.now()
  this.terrainGenerator = new TerrainGenerator(seed, terrainConfig)
}
```

### 2. 生物群系生成器 (BiomeGenerator.ts - 新文件)

```typescript
export class BiomeGenerator {
  private noise: NoiseGenerator
  private readonly biomeScale = 0.005
  private readonly spawnSafeRadius = 50

  constructor(seed: number) {
    this.noise = new NoiseGenerator(seed + 1000) // 偏移种子
  }

  getBiomeAt(worldX: number, worldZ: number): BiomeType {
    // 出生安全区
    const dist = Math.sqrt(worldX * worldX + worldZ * worldZ)
    if (dist < this.spawnSafeRadius) return BiomeType.PLAINS

    // 噪声采样
    const moisture = this.noise.noise2D(
      worldX * this.biomeScale,
      worldZ * this.biomeScale
    )
    const temperature = this.noise.noise2D(
      worldX * this.biomeScale + 1000,
      worldZ * this.biomeScale + 1000
    )

    if (moisture > 0.3) return BiomeType.LAKE
    if (temperature < -0.2) return BiomeType.MOUNTAIN
    return BiomeType.PLAINS
  }
}
```

### 3. 地形生成器集成 (TerrainGenerator.ts)

```typescript
// 添加生物群系生成器
private biomeGenerator: BiomeGenerator

constructor(seed: number, config: Partial<TerrainConfig> = {}) {
  this.seed = seed
  this.noise = new NoiseGenerator(seed)
  this.biomeGenerator = new BiomeGenerator(seed)
}

// 修改 getHeightAt 考虑生物群系
getHeightAt(worldX: number, worldZ: number): number {
  const biome = this.biomeGenerator.getBiomeAt(worldX, worldZ)
  const biomeConfig = BIOME_CONFIGS[biome]
  
  const adjustedBase = this.config.baseHeight + biomeConfig.baseHeightOffset
  const adjustedVariation = this.config.heightVariation * biomeConfig.heightVariationScale
  
  const noiseValue = this.noise.fractal2D(...)
  return Math.floor(adjustedBase + noiseValue * adjustedVariation)
}

// 修改 getBlockTypeAt 添加水生成
private getBlockTypeAt(...): BlockType {
  // 斗兽场优先
  if (this.colosseumGenerator) { ... }
  
  // 水面以下、地形以上 = 水
  if (worldY <= this.config.waterLevel && worldY > terrainHeight) {
    return BlockType.WATER
  }
  
  // 其余逻辑不变
}
```

### 4. 冲刺输入 (InputManager.ts)

```typescript
getState(): InputState {
  return {
    // ... 现有字段
    sprint: this.keyboardInput.isKeyDown('ShiftLeft') || 
            this.keyboardInput.isKeyDown('ShiftRight')
  }
}
```

### 5. 冲刺移动 (Movement.ts)

```typescript
import { PLAYER_SPEED, SPRINT_MULTIPLIER } from './Player'

private updateHorizontalVelocity(input: InputState): void {
  // ... 计算方向
  
  if (moveDirection.lengthSq() > 0) {
    moveDirection.normalize()
    
    // 应用速度（考虑冲刺）
    const speed = input.sprint ? PLAYER_SPEED * SPRINT_MULTIPLIER : PLAYER_SPEED
    moveDirection.multiplyScalar(speed)
    
    this.player.velocity.x = moveDirection.x
    this.player.velocity.z = moveDirection.z
  }
}
```

### 6. 常量定义 (Player.ts)

```typescript
export const SPRINT_MULTIPLIER = 1.5
```

## 测试验证

### 随机性测试

```typescript
// 启动两次游戏，检查种子不同
console.log('World seed:', world.getSeed())
```

### 生物群系测试

```typescript
// 向不同方向移动 500 方块，记录遇到的生物群系
const biomes = new Set<BiomeType>()
for (let x = -500; x <= 500; x += 50) {
  biomes.add(biomeGenerator.getBiomeAt(x, 0))
}
console.log('Found biomes:', biomes.size) // 应 >= 2
```

### 冲刺测试

```typescript
// 测量移动速度
const startPos = player.position.clone()
// 按住 Shift + W 移动 1 秒
const endPos = player.position.clone()
const distance = startPos.distanceTo(endPos)
console.log('Sprint speed:', distance) // 应约 7.5 方块/秒
```

## 文件改动清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/terrain/BiomeGenerator.ts` | 新增 | 生物群系生成器 |
| `src/terrain/TerrainGenerator.ts` | 修改 | 集成生物群系、水生成 |
| `src/core/World.ts` | 修改 | 随机种子初始化 |
| `src/core/ChunkConstants.ts` | 修改 | 新增配置常量 |
| `src/input/InputManager.ts` | 修改 | 添加 sprint 状态 |
| `src/player/Player.ts` | 修改 | 添加 SPRINT_MULTIPLIER |
| `src/player/Movement.ts` | 修改 | 冲刺速度逻辑 |
