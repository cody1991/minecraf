# Quickstart: 生物、植物与天气系统

**Feature**: 008-biome-weather-system  
**Date**: 2025-12-12

## 开发环境设置

```bash
# 确保在正确分支
git checkout 008-biome-weather-system

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 核心模块创建顺序

### 1. 时间系统（基础依赖）

```typescript
// src/weather/TimeSystem.ts
export class TimeSystem {
  private ticks: number = 6000  // 从日出开始
  private readonly TICKS_PER_DAY = 24000
  private readonly MS_PER_TICK = 50  // 20分钟/天
  
  update(deltaMs: number): void {
    this.ticks = (this.ticks + deltaMs / this.MS_PER_TICK) % this.TICKS_PER_DAY
  }
  
  getSunAngle(): number {
    return (this.ticks / this.TICKS_PER_DAY) * Math.PI * 2
  }
  
  isDay(): boolean {
    return this.ticks >= 2000 && this.ticks < 12000
  }
}
```

### 2. 天气系统

```typescript
// src/weather/WeatherSystem.ts
export class WeatherSystem {
  private weather: WeatherType = WeatherType.CLEAR
  private duration: number = 300  // 秒
  
  update(deltaTime: number): void {
    this.duration -= deltaTime
    if (this.duration <= 0) {
      this.tryChangeWeather()
    }
  }
  
  isRaining(): boolean {
    return this.weather === WeatherType.RAIN
  }
}
```

### 3. 天空渲染器

```typescript
// src/weather/SkyRenderer.ts
export class SkyRenderer {
  private skyMesh: THREE.Mesh
  private sunMesh: THREE.Mesh
  private moonMesh: THREE.Mesh
  
  constructor(scene: THREE.Scene) {
    // 创建天空球
    const skyGeo = new THREE.SphereGeometry(500, 32, 32)
    const skyMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: SKY_VERTEX,
      fragmentShader: SKY_FRAGMENT,
      side: THREE.BackSide
    })
    this.skyMesh = new THREE.Mesh(skyGeo, skyMat)
    scene.add(this.skyMesh)
  }
  
  update(timeSystem: TimeSystem): void {
    // 更新天空颜色和太阳/月亮位置
  }
}
```

### 4. 雨滴效果

```typescript
// src/weather/RainEffect.ts
export class RainEffect {
  private particles: THREE.Points
  private readonly PARTICLE_COUNT = 8000
  
  constructor(scene: THREE.Scene) {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(this.PARTICLE_COUNT * 3)
    // 初始化粒子位置...
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const material = new THREE.PointsMaterial({
      color: 0xaaaaff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    })
    
    this.particles = new THREE.Points(geometry, material)
    scene.add(this.particles)
  }
  
  update(deltaTime: number, playerPos: THREE.Vector3, isUnderwater: boolean): void {
    if (isUnderwater) {
      this.particles.visible = false
      return
    }
    // 更新粒子位置...
  }
}
```

### 5. 动物基类

```typescript
// src/entities/Animal.ts
export abstract class Animal {
  protected position: THREE.Vector3
  protected rotation: number = 0
  protected state: AnimalState = AnimalState.IDLE
  protected mesh: THREE.Group
  
  abstract readonly type: AnimalType
  abstract readonly moveSpeed: number
  
  update(deltaTime: number, playerPos: THREE.Vector3): void {
    this.updateAI(deltaTime, playerPos)
    this.updatePosition(deltaTime)
    this.updateMesh()
  }
  
  protected updateAI(deltaTime: number, playerPos: THREE.Vector3): void {
    const distToPlayer = this.position.distanceTo(playerPos)
    
    if (distToPlayer < 5 && this.state !== AnimalState.FLEEING) {
      this.state = AnimalState.FLEEING
      this.stateTimer = 5
    }
    // FSM 逻辑...
  }
}
```

### 6. 植物生成器

```typescript
// src/terrain/PlantGenerator.ts
export class PlantGenerator {
  generate(chunk: Chunk, biome: BiomeType, random: () => number): void {
    const plantConfig = BIOME_PLANT_CONFIG[biome]
    if (!plantConfig) return
    
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        const surfaceY = this.findSurfaceY(chunk, x, z)
        if (surfaceY < 0) continue
        
        if (random() < plantConfig.density) {
          const plantType = this.selectPlant(plantConfig, random())
          chunk.setBlock(x, surfaceY + 1, z, plantType)
        }
      }
    }
  }
}
```

## 集成到 Game.ts

```typescript
// src/core/Game.ts 修改
import { TimeSystem } from '../weather/TimeSystem'
import { WeatherSystem } from '../weather/WeatherSystem'
import { SkyRenderer } from '../weather/SkyRenderer'
import { RainEffect } from '../weather/RainEffect'
import { EntityManager } from '../entities/EntityManager'

export class Game {
  private timeSystem: TimeSystem
  private weatherSystem: WeatherSystem
  private skyRenderer: SkyRenderer
  private rainEffect: RainEffect
  private entityManager: EntityManager
  
  constructor(container: HTMLElement) {
    // ... 现有初始化 ...
    
    this.timeSystem = new TimeSystem()
    this.weatherSystem = new WeatherSystem()
    this.skyRenderer = new SkyRenderer(this.renderer.getScene())
    this.rainEffect = new RainEffect(this.renderer.getScene())
    this.entityManager = new EntityManager(this.world)
  }
  
  private gameLoop(): void {
    // ... 现有逻辑 ...
    
    // 更新时间和天气
    this.timeSystem.update(deltaTime * 1000)
    this.weatherSystem.update(deltaTime)
    
    // 更新天空
    this.skyRenderer.update(this.timeSystem, this.weatherSystem)
    
    // 更新雨滴
    if (this.weatherSystem.isRaining()) {
      this.rainEffect.update(deltaTime, this.playerPosition, this.player?.isSubmerged ?? false)
    }
    
    // 更新动物
    this.entityManager.update(deltaTime, this.playerPosition)
  }
}
```

## 验证检查点

1. **时间系统**: 观察太阳从东到西移动，20 分钟完成一个周期
2. **天空颜色**: 日出橙红 → 正午天蓝 → 日落橙红 → 夜晚深蓝
3. **月亮和星星**: 夜间可见月亮和静态星空
4. **下雨效果**: 随机触发，雨滴从天空落下
5. **水下无雨**: 潜入水中时雨滴消失
6. **动物生成**: 草地区域可见牛、羊、猪、鸡
7. **动物行为**: 动物随机移动，靠近时逃跑
8. **植物分布**: 不同生物群系有不同植物

## 性能监控

```typescript
// 添加到 FPS 显示
const animalCount = this.entityManager.getAnimalCount()
fpsElement.textContent = `FPS: ${fps} | Animals: ${animalCount}`
```

目标：50 只动物时保持 30+ FPS
