# Data Model: 声音与地图系统

**Feature**: 012-sound-map-system  
**Date**: 2025-12-13

## 1. 音频系统实体

### AudioManager

音频系统核心管理器，单例模式。

```typescript
interface AudioManager {
  // 状态
  audioContext: AudioContext
  masterGain: GainNode
  musicGain: GainNode
  sfxGain: GainNode
  
  // 设置
  settings: AudioSettings
  
  // 当前播放
  currentMusic: AudioBufferSourceNode | null
  activeSounds: Map<string, SoundInstance>
  
  // 方法
  init(): Promise<void>
  playMusic(name: string, fadeIn?: boolean): void
  stopMusic(fadeOut?: boolean): void
  playSfx(name: string, options?: SfxOptions): SoundInstance
  play3dSfx(name: string, position: Vector3, options?: Sfx3dOptions): SoundInstance
  setMasterVolume(volume: number): void
  setMusicVolume(volume: number): void
  setSfxVolume(volume: number): void
  mute(): void
  unmute(): void
  dispose(): void
}
```

### AudioSettings

音频设置，持久化到 LocalStorage。

```typescript
interface AudioSettings {
  masterVolume: number   // 0.0 - 1.0
  musicVolume: number    // 0.0 - 1.0
  sfxVolume: number      // 0.0 - 1.0
  muted: boolean
}

// 默认值
const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  masterVolume: 0.7,
  musicVolume: 0.5,
  sfxVolume: 0.8,
  muted: false
}
```

### SoundInstance

单个音效实例。

```typescript
interface SoundInstance {
  id: string
  source: AudioBufferSourceNode
  gainNode: GainNode
  pannerNode?: PannerNode  // 3D 音效时存在
  
  // 方法
  stop(): void
  setVolume(volume: number): void
  setPosition?(x: number, y: number, z: number): void
}
```

### SfxOptions

音效播放选项。

```typescript
interface SfxOptions {
  volume?: number      // 0.0 - 1.0, 默认 1.0
  loop?: boolean       // 默认 false
  playbackRate?: number // 默认 1.0
}

interface Sfx3dOptions extends SfxOptions {
  refDistance?: number   // 默认 1
  maxDistance?: number   // 默认 50
  rolloffFactor?: number // 默认 1
}
```

### AudioAsset

音频资源定义。

```typescript
interface AudioAsset {
  name: string
  path: string
  type: 'music' | 'sfx'
  preload: boolean
}

const AUDIO_ASSETS: AudioAsset[] = [
  // 背景音乐
  { name: 'ambient', path: '/audio/music/ambient.mp3', type: 'music', preload: true },
  
  // 脚步声
  { name: 'footstep_grass', path: '/audio/footsteps/grass.mp3', type: 'sfx', preload: true },
  { name: 'footstep_stone', path: '/audio/footsteps/stone.mp3', type: 'sfx', preload: true },
  { name: 'footstep_sand', path: '/audio/footsteps/sand.mp3', type: 'sfx', preload: true },
  { name: 'footstep_wood', path: '/audio/footsteps/wood.mp3', type: 'sfx', preload: true },
  
  // 摔落音效
  { name: 'fall_light', path: '/audio/effects/fall_light.mp3', type: 'sfx', preload: true },
  { name: 'fall_heavy', path: '/audio/effects/fall_heavy.mp3', type: 'sfx', preload: true },
  
  // 动物声音
  { name: 'cow_moo', path: '/audio/animals/cow.mp3', type: 'sfx', preload: false },
  { name: 'pig_oink', path: '/audio/animals/pig.mp3', type: 'sfx', preload: false },
  { name: 'sheep_baa', path: '/audio/animals/sheep.mp3', type: 'sfx', preload: false },
  { name: 'chicken_cluck', path: '/audio/animals/chicken.mp3', type: 'sfx', preload: false },
  { name: 'wolf_bark', path: '/audio/animals/wolf.mp3', type: 'sfx', preload: false },
  { name: 'fox_chirp', path: '/audio/animals/fox.mp3', type: 'sfx', preload: false },
]
```

## 2. 地图系统实体

### MiniMap

右上角小地图组件。

```typescript
interface MiniMap {
  // 配置
  size: number           // 直径像素，默认 150
  radius: number         // 半径
  viewRadius: number     // 显示范围（方块数），默认 32
  
  // 状态
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  cacheCanvas: HTMLCanvasElement
  cacheCtx: CanvasRenderingContext2D
  
  // 方法
  update(playerPos: Vector3, playerRotation: number): void
  render(): void
  setVisible(visible: boolean): void
  dispose(): void
}
```

### WorldMap

全屏大地图组件。

```typescript
interface WorldMap {
  // 配置
  minZoom: number        // 最小缩放，默认 0.1
  maxZoom: number        // 最大缩放，默认 4.0
  defaultZoom: number    // 默认缩放，默认 1.0
  
  // 状态
  isOpen: boolean
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  zoom: number
  panOffset: { x: number, y: number }
  
  // 方法
  open(): void
  close(): void
  toggle(): void
  update(playerPos: Vector3): void
  render(): void
  handleWheel(deltaY: number): void
  handleDrag(dx: number, dy: number): void
  dispose(): void
}
```

### CoordinateDisplay

左上角坐标显示组件。

```typescript
interface CoordinateDisplay {
  // 状态
  element: HTMLElement
  
  // 方法
  update(x: number, y: number, z: number): void
  setVisible(visible: boolean): void
  dispose(): void
}
```

### MapColorScheme

方块类型到地图颜色映射。

```typescript
const MAP_COLORS: Record<number, string> = {
  // 自然方块
  [BlockType.GRASS]: '#7CFC00',
  [BlockType.DIRT]: '#8B4513',
  [BlockType.STONE]: '#808080',
  [BlockType.SAND]: '#F4A460',
  [BlockType.WATER]: '#4169E1',
  [BlockType.SNOW]: '#FFFAFA',
  [BlockType.ICE]: '#ADD8E6',
  
  // 木材
  [BlockType.OAK_LOG]: '#8B4513',
  [BlockType.OAK_LEAVES]: '#228B22',
  [BlockType.BIRCH_LOG]: '#D2B48C',
  [BlockType.BIRCH_LEAVES]: '#90EE90',
  
  // 矿石
  [BlockType.COAL_ORE]: '#2F4F4F',
  [BlockType.IRON_ORE]: '#CD853F',
  [BlockType.GOLD_ORE]: '#FFD700',
  [BlockType.DIAMOND_ORE]: '#00CED1',
  
  // 建筑
  [BlockType.COBBLESTONE]: '#696969',
  [BlockType.BRICK]: '#B22222',
  [BlockType.WOOD_PLANKS]: '#DEB887',
  
  // 默认
  [BlockType.AIR]: 'transparent',
}

// 未知方块默认颜色
const DEFAULT_BLOCK_COLOR = '#404040'

// 未加载区块颜色
const UNLOADED_CHUNK_COLOR = '#1a1a1a'
```

## 3. 事件系统

### 音频事件

```typescript
// 玩家移动事件（触发脚步声）
interface PlayerMoveEvent {
  type: 'player_move'
  isMoving: boolean
  isRunning: boolean
  groundBlockType: number
}

// 玩家摔落事件
interface PlayerFallEvent {
  type: 'player_fall'
  fallDistance: number  // 摔落高度（方块数）
}

// 动物声音事件
interface AnimalSoundEvent {
  type: 'animal_sound'
  animalType: string
  position: Vector3
}
```

### 地图事件

```typescript
// 地图切换事件
interface MapToggleEvent {
  type: 'map_toggle'
  mapType: 'mini' | 'world'
  isOpen: boolean
}
```

## 4. 状态转换

### AudioManager 状态

```
[未初始化] --init()--> [已初始化/暂停] --resume()--> [播放中]
                              ^                         |
                              |                         |
                              +------- suspend() -------+
```

### WorldMap 状态

```
[关闭] --open()/toggle()--> [打开]
   ^                           |
   |                           |
   +--- close()/toggle() ------+
   +--- ESC/M 键 --------------+
```

## 5. 关系图

```
┌─────────────────────────────────────────────────────────────┐
│                         Game                                 │
│                           │                                  │
│    ┌──────────────────────┼──────────────────────┐          │
│    │                      │                      │          │
│    ▼                      ▼                      ▼          │
│ AudioManager          MiniMap              WorldMap         │
│    │                      │                      │          │
│    │                      └──────────┬───────────┘          │
│    │                                 │                      │
│    │                                 ▼                      │
│    │                        CoordinateDisplay               │
│    │                                                        │
│    ├── SoundInstance (0..*)                                 │
│    │      └── PannerNode (3D)                               │
│    │                                                        │
│    └── AudioSettings                                        │
│           └── LocalStorage                                  │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                    Event Sources                        │ │
│ │  Player ──► PlayerMoveEvent, PlayerFallEvent            │ │
│ │  Animal ──► AnimalSoundEvent                            │ │
│ │  InputManager ──► KeyPress('M')                         │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```
