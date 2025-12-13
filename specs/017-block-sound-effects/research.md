# Research: 方块音效系统

**Feature**: 017-block-sound-effects  
**Date**: 2025-12-13

## 研究任务

### 1. 现有音频系统架构分析

**Decision**: 扩展现有 `AudioManager` 单例模式

**Rationale**: 
- 项目已有成熟的 `AudioManager` 单例，管理所有音频播放
- 已实现 `SynthAudio` 程序化音效生成（脚步声、动物声、摔落声）
- 已有音量控制集成（masterVolume、sfxVolume）
- 已有 `playSfx()` 和 `play3dSfx()` 方法可复用

**Alternatives considered**:
- 创建独立的 BlockAudioManager：增加复杂度，违反模块化原则
- 直接在 BlockInteraction 中创建音频：违反关注点分离

### 2. 方块音效分类策略

**Decision**: 基于材质将 38 种方块映射到 6 种音效类别

**Rationale**:
- 参考 Minecraft 原版的音效分类逻辑
- 6 种类别足以覆盖所有材质差异，同时保持简洁
- 复用现有 `getFootstepCategory()` 的分类逻辑，扩展到更多类别

**类别映射**:

| 音效类别 | 方块类型 |
|----------|----------|
| stone | STONE, COBBLESTONE, BRICK, SANDSTONE, SANDSTONE_CARVED, DARK_STONE, MOSSY_STONE, RED_BRICK, GOLD_BLOCK |
| wood | WOOD, LOG, PLANKS, OAK_LOG, BIRCH_LOG, SPRUCE_LOG |
| dirt | GRASS, DIRT |
| sand | SAND, SNOW |
| glass | GLASS |
| plant | LEAVES, OAK_LEAVES, BIRCH_LEAVES, SPRUCE_LEAVES, FLOWER_RED, FLOWER_YELLOW, TALL_GRASS, MUSHROOM_RED, MUSHROOM_BROWN, DEAD_BUSH, CACTUS, ROSE, TULIP, DAISY, CORNFLOWER |

**Alternatives considered**:
- 每种方块独立音效：资源浪费，38 种音效难以区分
- 3 种类别（硬/软/特殊）：区分度不够，体验差

### 3. 音效合成参数设计

**Decision**: 使用不同频率、衰减和噪声特性区分材质

**Rationale**:
- 现有 `SynthAudio.ts` 已有成熟的音效合成模式
- 程序化生成无需加载外部文件，启动更快
- 可通过音调变化区分放置/破坏（放置音调略高）

**音效参数设计**:

| 类别 | 基础频率 | 衰减速率 | 噪声比例 | 特性 |
|------|----------|----------|----------|------|
| stone | 200-400 Hz | 快速 (40-60) | 中 (0.3) | 清脆、硬质 |
| wood | 150-250 Hz | 中等 (25-35) | 低 (0.2) | 空心、共鸣 |
| dirt | 80-150 Hz | 慢速 (15-25) | 高 (0.5) | 沉闷、柔软 |
| sand | 100-200 Hz | 中等 (20-30) | 高 (0.6) | 沙沙声 |
| glass | 800-1200 Hz | 快速 (50-70) | 低 (0.1) | 清脆、高音 |
| plant | 300-500 Hz | 快速 (30-40) | 中 (0.4) | 沙沙、轻柔 |

**放置 vs 破坏区分**:
- 放置：基础音调 × 1.2，衰减更快
- 破坏：基础音调 × 1.0，衰减稍慢，噪声更多

### 4. 音效节流策略

**Decision**: 使用 Map 记录每类音效最后播放时间，50ms 内不重复

**Rationale**:
- 防止快速连续操作导致音频过载
- 50ms 阈值基于人耳对连续声音的感知阈值（约 30-50ms）
- 按音效类别节流，不同类别可同时播放

**Implementation**:
```typescript
class BlockSoundThrottle {
  private lastPlayTime: Map<string, number> = new Map()
  private readonly THROTTLE_MS = 50

  canPlay(category: string): boolean {
    const now = Date.now()
    const last = this.lastPlayTime.get(category) ?? 0
    if (now - last < this.THROTTLE_MS) return false
    this.lastPlayTime.set(category, now)
    return true
  }
}
```

**Alternatives considered**:
- 全局节流：不同材质无法同时发声，体验差
- 无节流：快速操作时音频叠加导致爆音
- 100ms 节流：间隔过长，响应感不足

### 5. 集成点分析

**Decision**: 在 `BlockInteraction.destroyBlock()` 和 `placeBlock()` 成功后触发音效

**Rationale**:
- 这两个方法是方块交互的唯一入口
- 只在操作成功后播放，符合规格要求
- 可获取被破坏方块类型（用于选择音效）和位置（用于 3D 音效）

**Integration Flow**:
```
BlockInteraction.destroyBlock()
  → 获取目标方块类型
  → world.setBlock(AIR) 成功
  → AudioManager.playBlockSound(blockType, 'break', position)

BlockInteraction.placeBlock()
  → world.setBlock(newBlock) 成功
  → AudioManager.playBlockSound(blockType, 'place', position)
```

## 技术风险

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 音效合成性能 | 低 | 预生成 AudioBuffer 缓存，不实时合成 |
| 音频上下文未初始化 | 低 | 复用现有 AudioManager 初始化逻辑 |
| 浏览器兼容性 | 低 | 现有系统已处理 WebKit 前缀 |

## 结论

所有技术问题已解决，无需额外澄清。可进入 Phase 1 设计阶段。
