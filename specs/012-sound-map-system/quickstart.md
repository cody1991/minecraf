# Quickstart: 声音与地图系统

**Feature**: 012-sound-map-system  
**Date**: 2025-12-13

## 快速开始

### 1. 创建音频模块目录

```bash
mkdir -p src/audio
mkdir -p public/audio/{music,footsteps,effects,animals}
```

### 2. 实现 AudioManager

```typescript
// src/audio/AudioManager.ts
export class AudioManager {
  private static instance: AudioManager
  private audioContext: AudioContext
  private masterGain: GainNode
  private bufferCache: Map<string, AudioBuffer> = new Map()
  
  private constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    this.masterGain = this.audioContext.createGain()
    this.masterGain.connect(this.audioContext.destination)
  }
  
  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager()
    }
    return AudioManager.instance
  }
  
  async init(): Promise<void> {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
    // 预加载常用音效
    await this.preloadAssets()
  }
  
  async loadSound(path: string): Promise<AudioBuffer> {
    if (this.bufferCache.has(path)) {
      return this.bufferCache.get(path)!
    }
    const response = await fetch(path)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
    this.bufferCache.set(path, audioBuffer)
    return audioBuffer
  }
  
  playSfx(buffer: AudioBuffer, volume = 1.0): void {
    const source = this.audioContext.createBufferSource()
    const gain = this.audioContext.createGain()
    source.buffer = buffer
    gain.gain.value = volume
    source.connect(gain)
    gain.connect(this.masterGain)
    source.start()
  }
}
```

### 3. 实现 MiniMap

```typescript
// src/ui/MiniMap.ts
export class MiniMap {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private size = 150
  
  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.size
    this.canvas.height = this.size
    this.canvas.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.5);
    `
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')!
  }
  
  update(playerX: number, playerZ: number, world: World): void {
    const ctx = this.ctx
    const center = this.size / 2
    
    // 清空并裁剪为圆形
    ctx.clearRect(0, 0, this.size, this.size)
    ctx.save()
    ctx.beginPath()
    ctx.arc(center, center, center, 0, Math.PI * 2)
    ctx.clip()
    
    // 绘制地图内容
    // ... 从 world 读取方块数据并绘制颜色
    
    // 绘制玩家标记
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    ctx.arc(center, center, 4, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }
}
```

### 4. 实现 CoordinateDisplay

```typescript
// src/ui/CoordinateDisplay.ts
export class CoordinateDisplay {
  private element: HTMLElement
  
  constructor() {
    this.element = document.createElement('div')
    this.element.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      color: white;
      font-family: monospace;
      font-size: 14px;
      text-shadow: 1px 1px 2px black;
    `
    document.body.appendChild(this.element)
  }
  
  update(x: number, y: number, z: number): void {
    this.element.textContent = `X: ${x.toFixed(1)} Y: ${y.toFixed(1)} Z: ${z.toFixed(1)}`
  }
}
```

### 5. 集成到 Game.ts

```typescript
// 在 Game 构造函数中
import { AudioManager } from '../audio/AudioManager'
import { MiniMap } from '../ui/MiniMap'
import { CoordinateDisplay } from '../ui/CoordinateDisplay'

// 初始化
this.audioManager = AudioManager.getInstance()
this.miniMap = new MiniMap()
this.coordinateDisplay = new CoordinateDisplay()

// 在游戏循环中更新
this.miniMap.update(playerX, playerZ, this.world)
this.coordinateDisplay.update(playerX, playerY, playerZ)
```

### 6. 添加键盘快捷键

```typescript
// 在 InputManager 或 Game 中
document.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M') {
    this.worldMap.toggle()
  }
})
```

## 测试验证

1. **背景音乐**: 启动游戏后应自动播放
2. **脚步声**: WASD 移动时应播放
3. **小地图**: 右上角显示圆形地图
4. **坐标**: 左上角显示 X/Y/Z
5. **大地图**: 按 M 键打开/关闭

## 音频资源

从以下网站下载免费音效：
- https://freesound.org
- https://opengameart.org

放置到 `public/audio/` 对应目录。
