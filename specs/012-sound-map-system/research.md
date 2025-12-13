# Research: 声音与地图系统

**Feature**: 012-sound-map-system  
**Date**: 2025-12-13

## 1. Web Audio API 最佳实践

### Decision
使用原生 Web Audio API 实现音频系统，不引入第三方音频库。

### Rationale
- Web Audio API 是现代浏览器标准，兼容性好（Chrome, Firefox, Safari, Edge）
- 提供低延迟音频播放（<10ms）
- 内置 3D 空间音效支持（PannerNode）
- 支持多音频同时播放和混音
- 无需额外依赖，符合项目轻量化原则

### Alternatives Considered
- **Howler.js**: 功能丰富但增加 ~30KB 依赖，对于我们的需求过于复杂
- **Tone.js**: 专注于音乐合成，不适合游戏音效场景
- **原生 HTMLAudioElement**: 延迟高，不支持空间音效

### Implementation Notes
```typescript
// AudioContext 单例模式
const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// 用户交互后恢复 AudioContext（浏览器策略）
document.addEventListener('click', () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
}, { once: true })
```

## 2. 3D 空间音效实现

### Decision
使用 Web Audio API 的 PannerNode 实现基于距离的音量衰减。

### Rationale
- PannerNode 提供内置的距离衰减模型
- 支持线性、逆平方等多种衰减曲线
- 可与 Three.js 坐标系统直接集成

### Implementation Notes
```typescript
// 创建空间音效节点
const panner = audioContext.createPanner()
panner.distanceModel = 'inverse'
panner.refDistance = 1
panner.maxDistance = 50
panner.rolloffFactor = 1

// 更新位置（与 Three.js 坐标同步）
panner.setPosition(x, y, z)
```

## 3. 音频资源来源

### Decision
使用免费开源音效库，推荐来源：
- **freesound.org**: CC0/CC-BY 授权的高质量音效
- **OpenGameArt.org**: 专为游戏设计的免费资源
- **Pixabay**: 免版税音乐和音效

### Rationale
- 避免版权问题
- 丰富的资源选择
- 社区验证的质量

### Required Audio Assets
| 类型 | 文件 | 格式 | 预估大小 |
|------|------|------|----------|
| 背景音乐 | ambient_music.mp3 | MP3 | ~2MB |
| 脚步声-草地 | footstep_grass.mp3 | MP3 | ~50KB |
| 脚步声-石头 | footstep_stone.mp3 | MP3 | ~50KB |
| 脚步声-沙子 | footstep_sand.mp3 | MP3 | ~50KB |
| 摔落-轻 | fall_light.mp3 | MP3 | ~30KB |
| 摔落-重 | fall_heavy.mp3 | MP3 | ~30KB |
| 牛叫声 | cow_moo.mp3 | MP3 | ~100KB |
| 猪叫声 | pig_oink.mp3 | MP3 | ~80KB |
| 羊叫声 | sheep_baa.mp3 | MP3 | ~80KB |
| 鸡叫声 | chicken_cluck.mp3 | MP3 | ~60KB |

## 4. 小地图渲染技术

### Decision
使用 HTML5 Canvas 2D 渲染小地图，作为 DOM 叠加层显示。

### Rationale
- Canvas 2D 对于 2D 地图渲染性能优异
- 与 WebGL 渲染管线分离，不影响 3D 帧率
- 简单的 API，易于实现圆形裁剪
- 可独立刷新率（10 FPS 足够）

### Alternatives Considered
- **WebGL 渲染**: 过于复杂，小地图不需要 3D 功能
- **SVG**: 对于实时更新性能不佳
- **CSS 纯 DOM**: 无法高效渲染像素级地图

### Implementation Notes
```typescript
// 圆形裁剪
ctx.beginPath()
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
ctx.clip()

// 渲染地图内容
// ...

// 恢复裁剪区域
ctx.restore()
```

## 5. 地图数据获取策略

### Decision
从现有 ChunkManager 和 World 读取区块数据，生成地图颜色。

### Rationale
- 复用现有数据结构，无需额外存储
- 区块已加载时直接读取，未加载区块显示为灰色
- 根据玩家 Y 坐标确定显示层级（地表/地下）

### Implementation Notes
```typescript
// 获取方块颜色映射
function getBlockColor(blockType: number): string {
  const colorMap: Record<number, string> = {
    [BlockType.GRASS]: '#7CFC00',
    [BlockType.WATER]: '#4169E1',
    [BlockType.SAND]: '#F4A460',
    [BlockType.STONE]: '#808080',
    // ...
  }
  return colorMap[blockType] || '#000000'
}
```

## 6. 大地图缩放与平移

### Decision
大地图支持鼠标滚轮缩放和拖拽平移。

### Rationale
- 符合用户直觉的交互方式
- 允许查看更大范围或更精细的区域

### Implementation Notes
```typescript
// 缩放级别
let zoomLevel = 1.0 // 1.0 = 1 block = 1 pixel

// 滚轮缩放
canvas.addEventListener('wheel', (e) => {
  zoomLevel *= e.deltaY > 0 ? 0.9 : 1.1
  zoomLevel = Math.max(0.1, Math.min(4.0, zoomLevel))
})
```

## 7. 音量设置持久化

### Decision
使用 LocalStorage 存储用户音量设置。

### Rationale
- 简单可靠，无需后端
- 跨会话保持用户偏好
- 符合项目现有技术栈

### Implementation Notes
```typescript
const STORAGE_KEY = 'webcraft_audio_settings'

interface AudioSettings {
  masterVolume: number  // 0-1
  musicVolume: number   // 0-1
  sfxVolume: number     // 0-1
  muted: boolean
}

function saveSettings(settings: AudioSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

function loadSettings(): AudioSettings {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : defaultSettings
}
```

## 8. 背景音乐淡入淡出

### Decision
使用 GainNode 实现音量渐变过渡。

### Rationale
- Web Audio API 原生支持
- 可精确控制过渡时间
- 平滑的听觉体验

### Implementation Notes
```typescript
function fadeOut(gainNode: GainNode, duration: number): void {
  const now = audioContext.currentTime
  gainNode.gain.setValueAtTime(gainNode.gain.value, now)
  gainNode.gain.linearRampToValueAtTime(0, now + duration)
}

function fadeIn(gainNode: GainNode, targetVolume: number, duration: number): void {
  const now = audioContext.currentTime
  gainNode.gain.setValueAtTime(0, now)
  gainNode.gain.linearRampToValueAtTime(targetVolume, now + duration)
}
```

## 9. 浏览器音频自动播放策略

### Decision
在用户首次交互后启动音频系统，显示"点击开始游戏"提示。

### Rationale
- 现代浏览器阻止自动播放音频
- 需要用户手势触发 AudioContext.resume()
- 游戏通常需要点击开始，自然符合此要求

### Implementation Notes
```typescript
// 在 Game.start() 或首次点击时
async function initAudio(): Promise<void> {
  if (audioContext.state === 'suspended') {
    await audioContext.resume()
  }
  // 开始播放背景音乐
}
```

## 10. 性能优化策略

### Decision
- 音频：预加载常用音效，动态加载不常用音效
- 地图：使用离屏 Canvas 缓存，仅在区块变化时重绘

### Rationale
- 平衡内存使用和加载延迟
- 减少每帧渲染开销

### Implementation Notes
```typescript
// 离屏 Canvas 缓存
const offscreenCanvas = document.createElement('canvas')
const offscreenCtx = offscreenCanvas.getContext('2d')

// 仅在区块变化时更新缓存
function updateMapCache(): void {
  // 绘制到 offscreenCanvas
}

// 每帧只需复制缓存到显示 Canvas
function renderMiniMap(): void {
  ctx.drawImage(offscreenCanvas, 0, 0)
  // 绘制玩家标记等动态元素
}
```
