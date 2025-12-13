# Research: 视觉效果优化

**Branch**: `014-visual-polish` | **Date**: 2025-12-13

## 现有实现分析

### 1. 太阳渲染 (`src/weather/SkyRenderer.ts`)

**当前实现**:
- 太阳是一个简单的黄色球体 (`SphereGeometry` + `MeshBasicMaterial`)
- 颜色固定为 `0xffff00` (纯黄色)
- 无光晕效果（着色器中的 sunGlow/sunHalo 只影响天空背景，不影响太阳本体）
- 半径 20，16x16 分段

**问题**:
- 太阳本体是纯色圆形，缺乏真实感
- 边缘过于锐利，无柔和过渡
- 颜色不随时间变化

**优化方向**:
- 使用自定义着色器材质替代 `MeshBasicMaterial`
- 添加径向渐变实现柔和边缘
- 根据时间段动态调整颜色（正午偏白，日出日落偏橙红）
- 添加外发光效果

### 2. 夜晚天空颜色 (`src/weather/WeatherTypes.ts`)

**当前实现**:
```typescript
[TimePeriod.SUNSET]: {
  top: 0x2c3e50,    // Dark blue-gray
  horizon: 0xe74c3c, // Red-orange  ← 问题：这是血红色
  ambient: 0.5
},
[TimePeriod.NIGHT]: {
  top: 0x0a0a20,    // Very dark blue
  horizon: 0x1a1a40, // Dark purple-blue
  ambient: 0.2
}
```

**问题**:
- SUNSET 的 horizon 颜色 `0xe74c3c` 是鲜红色，过于刺眼
- 从 SUNSET 过渡到 NIGHT 时，红色渐变效果不自然
- 用户看到的"血红色夜晚"实际是 SUNSET 阶段的地平线颜色

**优化方向**:
- 将 SUNSET horizon 改为更柔和的橙红色（如 `0xff8c42` 或 `0xd4622b`）
- 调整 NIGHT horizon 为更自然的深蓝色
- 优化过渡曲线，避免红色残留过久

### 3. 小地图 (`src/ui/MiniMap.ts`)

**当前实现**:
- 150px 圆形 canvas
- 边框: `3px solid rgba(255, 255, 255, 0.5)` - 半透明白色
- 阴影: `box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5)`
- 玩家标记: 红色圆点 + 方向线

**问题**:
- 边框样式简单，缺乏质感
- 无指南针/方向标识（N/S/E/W）
- 地形颜色可能需要优化对比度

**优化方向**:
- 添加更精致的边框样式（渐变或多层边框）
- 添加指南针方向标识
- 优化地形颜色方案
- 可选：添加外圈刻度或装饰

## 技术方案

### Task 1: 太阳视觉优化

**方案**: 使用自定义 ShaderMaterial 替代 MeshBasicMaterial

```glsl
// 太阳片段着色器核心逻辑
uniform vec3 uCoreColor;      // 核心颜色
uniform vec3 uGlowColor;      // 光晕颜色
uniform float uGlowIntensity; // 光晕强度

void main() {
  float dist = length(vUv - 0.5) * 2.0;
  
  // 核心区域 (0-0.3)
  float core = 1.0 - smoothstep(0.0, 0.3, dist);
  
  // 光晕区域 (0.3-1.0)
  float glow = 1.0 - smoothstep(0.3, 1.0, dist);
  glow = pow(glow, 2.0);
  
  vec3 color = mix(uGlowColor, uCoreColor, core);
  float alpha = max(core, glow * uGlowIntensity);
  
  gl_FragColor = vec4(color, alpha);
}
```

**颜色配置**:
- 正午: 核心 `#fffaf0` (花白), 光晕 `#fff8dc` (玉米丝色)
- 日出/日落: 核心 `#ff8c00` (深橙), 光晕 `#ff6347` (番茄红)

### Task 2: 夜晚天空颜色修正

**修改 WeatherTypes.ts 中的 SKY_COLORS**:

```typescript
[TimePeriod.SUNSET]: {
  top: 0x1a1a3a,    // 深紫蓝
  horizon: 0xd4622b, // 柔和橙红（替代血红色）
  ambient: 0.5
},
[TimePeriod.NIGHT]: {
  top: 0x0a0a1a,    // 深夜蓝
  horizon: 0x0f1a2a, // 藏青色
  ambient: 0.2
}
```

**过渡优化**:
- 在 `SkyRenderer.updateSkyColors()` 中优化混合曲线
- 使用 easeInOut 缓动函数替代线性插值

### Task 3: 小地图美化

**边框优化**:
```css
border: 2px solid rgba(200, 180, 140, 0.8); /* 古铜色 */
box-shadow: 
  0 0 0 2px rgba(60, 50, 40, 0.6),  /* 内阴影 */
  0 2px 15px rgba(0, 0, 0, 0.6);    /* 外阴影 */
```

**指南针添加**:
- 在小地图边缘绘制 N/S/E/W 标识
- N 使用红色突出显示
- 标识随玩家旋转而旋转（或固定北方向上）

## 文件修改清单

| 文件 | 修改内容 |
|------|----------|
| `src/weather/SkyRenderer.ts` | 重写 `createSun()` 使用着色器材质，添加颜色动态更新 |
| `src/weather/WeatherTypes.ts` | 修改 SKY_COLORS 中 SUNSET 和 NIGHT 的颜色值 |
| `src/ui/MiniMap.ts` | 优化边框样式，添加指南针方向标识 |

## 风险评估

| 风险 | 等级 | 缓解措施 |
|------|------|----------|
| 着色器兼容性 | 低 | 使用简单的 GLSL 语法，Three.js 内置处理兼容性 |
| 性能影响 | 低 | 太阳着色器简单，小地图更新已有节流机制 |
| 视觉效果不满意 | 中 | 提供可调参数，便于后续微调 |
