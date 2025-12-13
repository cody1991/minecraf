# Data Model: 方块音效系统

**Feature**: 017-block-sound-effects  
**Date**: 2025-12-13

## 实体定义

### BlockSoundCategory (枚举)

方块音效类别，用于将方块类型映射到音效。

```typescript
type BlockSoundCategory = 'stone' | 'wood' | 'dirt' | 'sand' | 'glass' | 'plant'
```

| 值 | 描述 | 对应方块 |
|----|------|----------|
| `stone` | 石质材料 | STONE, COBBLESTONE, BRICK, SANDSTONE, SANDSTONE_CARVED, DARK_STONE, MOSSY_STONE, RED_BRICK, GOLD_BLOCK |
| `wood` | 木质材料 | WOOD, LOG, PLANKS, OAK_LOG, BIRCH_LOG, SPRUCE_LOG |
| `dirt` | 泥土材料 | GRASS, DIRT |
| `sand` | 沙质材料 | SAND, SNOW |
| `glass` | 玻璃材料 | GLASS |
| `plant` | 植物材料 | LEAVES, OAK_LEAVES, BIRCH_LEAVES, SPRUCE_LEAVES, FLOWER_*, TALL_GRASS, MUSHROOM_*, DEAD_BUSH, CACTUS, ROSE, TULIP, DAISY, CORNFLOWER |

### BlockSoundAction (枚举)

方块音效动作类型。

```typescript
type BlockSoundAction = 'place' | 'break'
```

| 值 | 描述 | 音效特性 |
|----|------|----------|
| `place` | 放置方块 | 音调 × 1.2，衰减更快 |
| `break` | 破坏方块 | 音调 × 1.0，噪声更多 |

### BlockSoundParams (接口)

音效合成参数配置。

```typescript
interface BlockSoundParams {
  baseFrequency: number      // 基础频率 (Hz)
  frequencyRange: number     // 频率随机范围
  decayRate: number          // 衰减速率
  noiseMix: number           // 噪声混合比例 (0-1)
  duration: number           // 音效时长 (秒)
}
```

### BLOCK_SOUND_PARAMS (常量映射)

各类别的音效参数配置。

```typescript
const BLOCK_SOUND_PARAMS: Record<BlockSoundCategory, BlockSoundParams> = {
  stone: {
    baseFrequency: 300,
    frequencyRange: 100,
    decayRate: 50,
    noiseMix: 0.3,
    duration: 0.12
  },
  wood: {
    baseFrequency: 200,
    frequencyRange: 50,
    decayRate: 30,
    noiseMix: 0.2,
    duration: 0.15
  },
  dirt: {
    baseFrequency: 100,
    frequencyRange: 50,
    decayRate: 20,
    noiseMix: 0.5,
    duration: 0.18
  },
  sand: {
    baseFrequency: 150,
    frequencyRange: 50,
    decayRate: 25,
    noiseMix: 0.6,
    duration: 0.15
  },
  glass: {
    baseFrequency: 1000,
    frequencyRange: 200,
    decayRate: 60,
    noiseMix: 0.1,
    duration: 0.10
  },
  plant: {
    baseFrequency: 400,
    frequencyRange: 100,
    decayRate: 35,
    noiseMix: 0.4,
    duration: 0.12
  }
}
```

## 关系图

```
BlockType (38 types)
    │
    ▼ getBlockSoundCategory()
BlockSoundCategory (6 categories)
    │
    ├─► BLOCK_SOUND_PARAMS
    │       │
    │       ▼
    │   BlockSoundParams
    │       │
    │       ▼ generateBlockSound()
    │   AudioBuffer
    │
    └─► BlockSoundAction
            │
            ▼ pitch modifier
        Final Sound
```

## 状态管理

### BlockSoundThrottle

节流器状态，记录每类音效的最后播放时间。

```typescript
class BlockSoundThrottle {
  // 状态：类别 → 最后播放时间戳
  private lastPlayTime: Map<BlockSoundCategory, number>
  
  // 常量
  private readonly THROTTLE_MS: 50
  
  // 方法
  canPlay(category: BlockSoundCategory): boolean
  recordPlay(category: BlockSoundCategory): void
}
```

**状态转换**:
- 初始状态：Map 为空
- 播放音效：记录当前时间戳
- 查询可播放：检查时间差 >= 50ms

## 扩展现有实体

### AudioTypes.ts 扩展

```typescript
// 新增导出
export type BlockSoundCategory = 'stone' | 'wood' | 'dirt' | 'sand' | 'glass' | 'plant'
export type BlockSoundAction = 'place' | 'break'

// 扩展 AUDIO_ASSETS（可选，用于预加载）
export const BLOCK_SOUND_ASSETS: AudioAsset[] = [
  { name: 'block_stone_break', path: 'audio/blocks/stone_break.mp3', type: 'sfx', preload: false },
  { name: 'block_stone_place', path: 'audio/blocks/stone_place.mp3', type: 'sfx', preload: false },
  // ... 其他类别（实际使用合成音效，此处仅作预留）
]
```

### AudioManager.ts 扩展

```typescript
// 新增方法
playBlockSound(
  blockType: BlockType,
  action: BlockSoundAction,
  x?: number,
  y?: number,
  z?: number
): void

// 新增私有方法
private getBlockSoundCategory(blockType: BlockType): BlockSoundCategory
```

## 验证规则

| 规则 | 约束 |
|------|------|
| BlockType 有效性 | 必须是 BlockType 枚举值，AIR 不播放音效 |
| 音效类别映射 | 所有非 AIR 方块必须映射到一个类别 |
| 节流时间 | 同类别音效间隔 >= 50ms |
| 音量范围 | 0.0 - 1.0，受 sfxVolume 和 masterVolume 控制 |
