# Implementation Plan: 视觉效果优化

**Branch**: `014-visual-polish` | **Date**: 2025-12-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/014-visual-polish/spec.md`

## Summary

优化游戏视觉效果，包括：(1) 太阳贴图添加光晕和柔和边缘；(2) 修正夜晚天空的血红色问题，改为自然的深蓝色调；(3) 美化小地图边框和添加指南针方向标识。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Three.js (WebGL 渲染)  
**Storage**: N/A  
**Testing**: 手动视觉验证  
**Target Platform**: Web 浏览器 (WebGL)  
**Project Type**: Single (游戏项目)  
**Performance Goals**: 保持 60 fps，无性能回退  
**Constraints**: 着色器需兼容 WebGL 1.0/2.0  
**Scale/Scope**: 3 个 UI/渲染组件优化

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ 无新增外部依赖
- ✅ 无新增数据模型
- ✅ 修改范围限于现有组件
- ✅ 符合项目架构模式

## Project Structure

### Documentation (this feature)

```text
specs/014-visual-polish/
├── plan.md              # This file
├── research.md          # 技术研究文档
├── spec.md              # 功能规格说明
└── checklists/
    └── requirements.md  # 规格质量检查清单
```

### Source Code (repository root)

```text
src/
├── weather/
│   ├── SkyRenderer.ts      # [修改] 太阳着色器、颜色更新
│   └── WeatherTypes.ts     # [修改] 天空颜色配置
└── ui/
    └── MiniMap.ts          # [修改] 边框样式、指南针
```

**Structure Decision**: 修改现有文件，无需新增文件

## Implementation Tasks

### Task 1: 太阳视觉优化 (P1)

**目标**: 将太阳从纯色球体改为具有光晕效果的渐变圆形

**修改文件**: `src/weather/SkyRenderer.ts`

**实现步骤**:
1. 创建太阳专用着色器材质 (`createSunMaterial()`)
   - 顶点着色器：传递 UV 坐标
   - 片段着色器：径向渐变 + 柔和边缘
2. 修改 `createSun()` 使用新材质
   - 改用 `PlaneGeometry` 或 `CircleGeometry` 面向相机
   - 应用着色器材质
3. 添加太阳颜色配置到 `WeatherTypes.ts`
   - 定义不同时段的太阳核心色和光晕色
4. 在 `update()` 中根据时间更新太阳颜色

**验收标准**:
- 太阳具有柔和的光晕效果
- 边缘自然过渡，无锐利边界
- 日出/日落时呈橙红色，正午偏白/淡黄

---

### Task 2: 夜晚天空颜色修正 (P1)

**目标**: 将血红色夜空改为自然的深蓝色/藏青色

**修改文件**: `src/weather/WeatherTypes.ts`

**实现步骤**:
1. 修改 `SKY_COLORS[TimePeriod.SUNSET]`
   - `horizon`: `0xe74c3c` → `0xd4622b` (柔和橙红)
   - `top`: 保持或微调
2. 修改 `SKY_COLORS[TimePeriod.NIGHT]`
   - `horizon`: `0x1a1a40` → `0x0f1a2a` (藏青色)
   - `top`: 保持深蓝
3. 验证过渡效果自然

**验收标准**:
- 夜晚天空呈深蓝色/藏青色
- 日落时地平线为柔和橙红，非血红
- 颜色过渡平滑自然

---

### Task 3: 小地图美化 (P2)

**目标**: 优化小地图边框样式，添加指南针方向标识

**修改文件**: `src/ui/MiniMap.ts`

**实现步骤**:
1. 优化容器边框样式
   - 使用更精致的边框颜色和阴影
   - 添加双层边框效果
2. 在 `render()` 中添加指南针绘制
   - 在小地图边缘绘制 N/E/S/W 标识
   - N 使用红色突出
   - 标识随玩家旋转（北方始终在正确方向）
3. 可选：优化地形颜色对比度

**验收标准**:
- 边框更加精致美观
- 指南针方向清晰可见
- 整体风格与游戏协调

---

## Task Dependencies

```
Task 1 (太阳) ──┐
               ├──→ 可并行执行
Task 2 (天空) ──┤
               │
Task 3 (地图) ──┘
```

所有任务相互独立，可并行开发。

## Complexity Tracking

无宪法检查违规，无需记录。

## Risk Mitigation

| 风险 | 缓解措施 |
|------|----------|
| 太阳着色器效果不理想 | 提供可调参数（光晕强度、颜色），便于微调 |
| 颜色选择主观性强 | 参考 Minecraft 原版和自然天空照片 |
| 性能影响 | 太阳着色器简单，小地图已有节流机制 |

## Estimated Effort

| Task | 预估时间 |
|------|----------|
| Task 1: 太阳优化 | 30-45 分钟 |
| Task 2: 天空颜色 | 10-15 分钟 |
| Task 3: 小地图 | 20-30 分钟 |
| **总计** | **60-90 分钟** |
