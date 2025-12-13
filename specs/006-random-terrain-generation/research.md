# Research: 随机地形生成与冲刺移动

**Feature**: 006-random-terrain-generation  
**Date**: 2025-12-12

## 1. 随机种子生成策略

**Decision**: 使用 `Date.now()` 作为默认随机种子

**Rationale**: 
- 简单可靠，每次启动产生不同值
- 现有 `NoiseGenerator` 已支持种子参数
- 无需引入额外依赖

**Alternatives considered**:
- `crypto.getRandomValues()`: 过于复杂，游戏不需要加密级随机性
- 固定种子 + 用户输入: 作为可选功能保留 (FR-008)

## 2. 生物群系生成算法

**Decision**: 使用大尺度 Simplex 噪声进行生物群系划分

**Rationale**:
- 现有 `NoiseGenerator` 已实现 Simplex 噪声
- 大尺度采样 (scale ~0.005) 产生大片连续区域
- 多层噪声叠加可控制温度/湿度维度

**Implementation approach**:
```
biomeScale = 0.005 (比地形 scale 0.02 更大)
temperatureNoise = noise2D(x * biomeScale, z * biomeScale)
moistureNoise = noise2D(x * biomeScale + 1000, z * biomeScale + 1000)

if moistureNoise > 0.3:
  biome = LAKE
elif temperatureNoise < -0.2:
  biome = MOUNTAIN  
else:
  biome = PLAINS
```

**Alternatives considered**:
- Voronoi 图: 实现复杂，边界过于锐利
- 预定义区域: 不支持无限世界

## 3. 湖泊/水域生成

**Decision**: 使用水平面高度 + 地形低洼区域

**Rationale**:
- 现有 `BlockType.WATER` 已定义
- 水平面设为 `baseHeight - 5`，低于此高度的区域填充水
- 湖泊生物群系降低地形高度，自然形成水域

**Implementation approach**:
```
WATER_LEVEL = baseHeight - 5

if biome == LAKE:
  heightVariation *= 0.3  // 降低变化
  baseHeight -= 10        // 降低基准

if worldY <= WATER_LEVEL && worldY > terrainHeight:
  blockType = WATER
```

**Alternatives considered**:
- 洪水填充算法: 计算成本高，不适合实时生成
- 预计算水体: 不支持无限世界

## 4. 山脉生成

**Decision**: 增加噪声振幅 + 提升基准高度

**Rationale**:
- 简单有效，利用现有噪声系统
- 山脉生物群系使用更大的 `heightVariation`
- 与其他生物群系自然过渡

**Implementation approach**:
```
if biome == MOUNTAIN:
  heightVariation *= 2.5  // 增加变化
  baseHeight += 15        // 提升基准
```

## 5. 地形过渡平滑

**Decision**: 使用插值混合相邻生物群系参数

**Rationale**:
- 避免生物群系边界的突兀变化
- 在边界区域混合两个生物群系的高度参数

**Implementation approach**:
```
// 采样周围点的生物群系
// 计算加权平均的高度参数
// 使用平滑的 smoothstep 函数过渡
```

## 6. 出生安全区保护

**Decision**: 斗兽场周围 50 方块内强制为陆地

**Rationale**:
- 现有 `ColosseumGenerator` 已在原点生成
- 在生物群系判断时，原点附近强制返回 PLAINS
- 确保玩家不会出生在水中

**Implementation approach**:
```
distanceFromOrigin = sqrt(x*x + z*z)
if distanceFromOrigin < 50:
  biome = PLAINS  // 强制平原
```

## 7. 冲刺移动实现

**Decision**: 扩展 InputState 添加 sprint 标志，Movement 中应用速度倍率

**Rationale**:
- 最小改动，符合现有架构
- `KeyboardInput` 已支持检测任意按键
- 速度倍率在 `Movement.updateHorizontalVelocity()` 中应用

**Implementation approach**:
```typescript
// InputManager.ts
sprint: this.keyboardInput.isKeyDown('ShiftLeft') || 
        this.keyboardInput.isKeyDown('ShiftRight')

// Movement.ts
const speed = input.sprint ? PLAYER_SPEED * SPRINT_MULTIPLIER : PLAYER_SPEED
moveDirection.multiplyScalar(speed)
```

**Constants**:
- `SPRINT_MULTIPLIER = 1.5`
- 响应时间: 即时（每帧检测）

## 8. 性能考虑

**Decision**: 生物群系结果缓存 + 现有高度缓存复用

**Rationale**:
- 生物群系计算相对轻量，但可缓存提升性能
- 现有 `TerrainGenerator.heightCache` 模式可复用
- 不需要 Web Worker（生物群系计算足够快）

**Implementation approach**:
- 添加 `biomeCache: Map<string, BiomeType>`
- 缓存策略与高度缓存一致（LRU，最大 10000 条）
