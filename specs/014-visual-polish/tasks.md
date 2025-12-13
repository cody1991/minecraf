# Tasks: 视觉效果优化

**Branch**: `014-visual-polish` | **Date**: 2025-12-13

## Task Overview

| ID | Task | Priority | Status | Est. Time |
|----|------|----------|--------|-----------|
| T1 | 太阳视觉优化 | P1 | completed | 30-45 min |
| T2 | 夜晚天空颜色修正 | P1 | completed | 10-15 min |
| T3 | 小地图美化 | P2 | completed | 20-30 min |

---

## T1: 太阳视觉优化

**Priority**: P1  
**Status**: completed  
**Files**: `src/weather/SkyRenderer.ts`, `src/weather/WeatherTypes.ts`

### Description

将太阳从纯黄色球体改为具有光晕效果的渐变圆形，边缘柔和过渡，颜色随时间变化。

### Implementation Steps

1. [x] 在 `SkyRenderer.ts` 中创建太阳着色器
   - 添加 `SUN_VERTEX_SHADER` 常量
   - 添加 `SUN_FRAGMENT_SHADER` 常量（径向渐变 + 柔和边缘）
   
2. [x] 创建 `createSunMaterial()` 方法
   - uniforms: `uCoreColor`, `uGlowColor`, `uGlowIntensity`
   - 透明材质，双面渲染

3. [x] 修改 `createSun()` 方法
   - 使用 `PlaneGeometry` 替代 `SphereGeometry`
   - 应用着色器材质
   - 设置 `lookAt` 使其始终面向相机

4. [x] 在 `WeatherTypes.ts` 中添加太阳颜色配置
   ```typescript
   export const SUN_COLORS = {
     [TimePeriod.SUNRISE]: { core: 0xff8c00, glow: 0xff6347 },
     [TimePeriod.DAY]: { core: 0xfffaf0, glow: 0xfff8dc },
     [TimePeriod.SUNSET]: { core: 0xff6b35, glow: 0xff4500 },
     [TimePeriod.NIGHT]: { core: 0xeeeeee, glow: 0xcccccc }
   }
   ```

5. [x] 在 `update()` 中更新太阳颜色和朝向

### Acceptance Criteria

- [x] 太阳具有可见的光晕效果
- [x] 边缘柔和过渡，无锐利边界
- [x] 日出/日落时呈橙红色
- [x] 正午时偏白/淡黄色
- [x] 太阳始终面向相机

---

## T2: 夜晚天空颜色修正

**Priority**: P1  
**Status**: completed  
**Files**: `src/weather/WeatherTypes.ts`

### Description

修正夜晚天空的血红色问题，改为自然的深蓝色/藏青色。

### Implementation Steps

1. [x] 修改 `SKY_COLORS[TimePeriod.SUNSET]`
   ```typescript
   [TimePeriod.SUNSET]: {
     top: 0x1a1a3a,     // 深紫蓝（原 0x2c3e50）
     horizon: 0xd4622b, // 柔和橙红（原 0xe74c3c 血红色）
     ambient: 0.5
   }
   ```

2. [x] 修改 `SKY_COLORS[TimePeriod.NIGHT]`
   ```typescript
   [TimePeriod.NIGHT]: {
     top: 0x0a0a1a,     // 深夜蓝（原 0x0a0a20）
     horizon: 0x0f1a2a, // 藏青色（原 0x1a1a40）
     ambient: 0.2
   }
   ```

3. [x] 验证日落到夜晚的过渡效果

### Acceptance Criteria

- [x] 夜晚天空呈自然的深蓝色/藏青色
- [x] 日落地平线为柔和橙红，非血红
- [x] 颜色过渡平滑，无突变

---

## T3: 小地图美化

**Priority**: P2  
**Status**: completed  
**Files**: `src/ui/MiniMap.ts`

### Description

优化小地图边框样式，添加指南针方向标识。

### Implementation Steps

1. [x] 优化容器边框样式
   ```css
   border: 2px solid rgba(180, 160, 120, 0.9);
   box-shadow: 
     inset 0 0 0 1px rgba(255, 255, 255, 0.2),
     0 0 0 2px rgba(60, 50, 40, 0.6),
     0 3px 15px rgba(0, 0, 0, 0.5);
   ```

2. [x] 在 `render()` 中添加指南针绘制方法 `drawCompass()`
   - 计算四个方向在小地图边缘的位置
   - 绘制 N/E/S/W 文字标识
   - N 使用红色，其他使用白色
   - 位置随玩家旋转更新

3. [x] 调用 `drawCompass()` 在地形渲染之后

### Acceptance Criteria

- [x] 边框更加精致，有层次感
- [x] 四个方向标识清晰可见
- [x] N（北）使用红色突出显示
- [x] 方向标识随玩家旋转正确更新

---

## Notes

- 所有任务可并行执行，无依赖关系
- 优先完成 P1 任务（T1、T2），再处理 P2（T3）
- 每个任务完成后进行视觉验证
