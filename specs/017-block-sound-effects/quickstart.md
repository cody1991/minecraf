# Quickstart: 方块音效系统

**Feature**: 017-block-sound-effects  
**Date**: 2025-12-13

## 概述

本功能为方块的放置和破坏操作添加音效反馈。音效基于方块材质类型（石头、木头、泥土等）自动选择，使用程序化合成生成。

## 快速开始

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 测试方块音效

1. 打开浏览器访问 `http://localhost:5173`
2. 点击游戏画面以初始化音频系统
3. 使用鼠标左键破坏方块 → 听到破坏音效
4. 使用鼠标右键放置方块 → 听到放置音效
5. 尝试不同类型的方块，验证音效差异：
   - 石头类：清脆、硬质
   - 木头类：空心、共鸣
   - 泥土类：沉闷、柔软
   - 玻璃类：高音、清脆

### 3. 调整音量

- 按 `M` 键打开音量控制面板
- 调整"音效音量"滑块
- 验证方块音效音量相应变化

## 文件结构

```
src/audio/
├── AudioManager.ts      # 主入口：playBlockSound()
├── AudioTypes.ts        # 类型定义：BlockSoundCategory
├── SynthAudio.ts        # 音效合成：generateBlockSound()
└── BlockSoundThrottle.ts # 节流管理

src/player/
└── BlockInteraction.ts  # 集成点：触发音效
```

## API 使用

### 播放方块音效

```typescript
import { AudioManager } from './audio/AudioManager'
import { BlockType } from './core/Block'

const audio = AudioManager.getInstance()

// 播放破坏音效（2D）
audio.playBlockSound(BlockType.STONE, 'break')

// 播放放置音效（3D 空间）
audio.playBlockSound(BlockType.WOOD, 'place', 10, 64, 20)
```

### 获取方块音效类别

```typescript
import { getBlockSoundCategory } from './audio/AudioTypes'
import { BlockType } from './core/Block'

const category = getBlockSoundCategory(BlockType.COBBLESTONE)
// 返回: 'stone'
```

## 测试用例

### 手动测试清单

| 测试项 | 步骤 | 预期结果 |
|--------|------|----------|
| 破坏石头 | 左键点击石头方块 | 播放清脆的石头破坏音效 |
| 放置木板 | 右键放置木板方块 | 播放空心的木头放置音效 |
| 静音状态 | 静音后破坏方块 | 无音效播放 |
| 快速操作 | 连续快速破坏 | 音效正常，无爆音 |
| 音量调节 | 调整音效音量 | 方块音效音量相应变化 |

## 故障排除

### 无音效播放

1. 确认已点击游戏画面（浏览器自动播放策略）
2. 检查音效音量是否为 0
3. 检查是否处于静音状态
4. 打开控制台查看 `[AudioManager]` 日志

### 音效延迟

- 正常响应时间应 < 100ms
- 如延迟明显，检查浏览器 AudioContext 状态

### 音效过载

- 节流机制应防止爆音
- 如仍有问题，检查 `BlockSoundThrottle` 是否正常工作
