# Research: 更多方块与纹理

**Feature**: 005-block-textures  
**Date**: 2025-12-12

## 1. Three.js 纹理图集最佳实践

### Decision
使用单张 PNG 纹理图集，通过 UV 坐标映射不同方块纹理。

### Rationale
- Three.js 的 `Texture` 类原生支持纹理图集
- 单张纹理减少 GPU 状态切换和 Draw Call
- `NearestFilter` 保持像素风格不模糊
- 与现有 `TextureAtlas` 类设计一致，仅需从程序生成改为图片加载

### Alternatives Considered
1. **每个方块单独纹理文件** - 增加 HTTP 请求和 Draw Call，性能差
2. **WebGL 纹理数组** - 浏览器兼容性问题，实现复杂
3. **程序生成纹理（当前方案）** - 视觉效果有限，无法实现真实纹理

## 2. 多面纹理实现方案

### Decision
为每种方块定义 `BlockTextureMap` 接口，包含 top/bottom/side 三类纹理索引。

### Rationale
- Minecraft 原版使用相同模式（草方块顶/侧/底不同）
- 大多数方块只需 1-3 种纹理，内存开销小
- 渲染时根据面方向查找对应纹理 UV

### Alternatives Considered
1. **6 面独立定义** - 过度设计，大多数方块不需要
2. **单一纹理** - 无法实现草方块等差异化效果

## 3. 透明/半透明方块渲染

### Decision
采用双 Pass 渲染：先渲染不透明方块，再按距离排序渲染透明方块。

### Rationale
- WebGL 透明渲染需要正确的深度排序
- Three.js 的 `transparent: true` 和 `depthWrite: false` 配合使用
- 透明方块单独 InstancedMesh 便于排序控制

### Alternatives Considered
1. **Order-Independent Transparency (OIT)** - 实现复杂，性能开销大
2. **忽略排序** - 视觉伪影严重，不可接受

## 4. 纹理资源来源

### Decision
使用开源像素纹理资源或自制简化版 16x16 纹理。

### Rationale
- 16x16 像素纹理可快速手绘或使用开源资源
- 避免版权问题（不使用 Minecraft 原版纹理）
- 保持 Minecraft 风格的像素美学

### Alternatives Considered
1. **使用 Minecraft 原版纹理** - 版权问题
2. **高分辨率纹理** - 与像素风格不符，文件体积大

## 5. 纹理图集布局

### Decision
采用水平排列，每行一种纹理类型：
- 第 1 行：顶面纹理
- 第 2 行：侧面纹理  
- 第 3 行：底面纹理

### Rationale
- 简化 UV 计算逻辑
- 便于扩展新方块（只需追加列）
- 与现有 `getUVs()` 方法兼容

### Alternatives Considered
1. **网格布局** - UV 计算更复杂
2. **每方块独立图片拼接** - 需要额外构建步骤

## 6. 方块选择器 UI 纹理预览

### Decision
使用 Canvas 2D 从纹理图集裁剪对应区域作为 UI 背景。

### Rationale
- 复用已加载的纹理图集图片
- Canvas 2D 操作简单，性能足够
- 保持与 3D 渲染纹理一致

### Alternatives Considered
1. **单独的 UI 纹理图片** - 资源重复，维护成本高
2. **CSS 背景定位** - 需要精确计算，不够灵活

## 7. 纹理加载失败回退

### Decision
保留现有程序生成纯色纹理作为回退方案。

### Rationale
- 确保游戏在纹理加载失败时仍可运行
- 复用现有 `BLOCK_COLORS` 定义
- 用户体验降级但不中断

### Alternatives Considered
1. **显示错误提示** - 用户体验差
2. **使用占位符纹理** - 需要额外资源

## Summary

所有技术决策已确定，无 NEEDS CLARIFICATION 项。主要技术方案：
- 单张 PNG 纹理图集 + UV 映射
- BlockTextureMap 定义多面纹理
- 双 Pass 透明渲染
- Canvas 2D UI 预览
- 程序生成纯色回退
