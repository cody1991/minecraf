# Research: 人物模型与视角切换系统

**Feature**: 013-character-model-view  
**Date**: 2025-12-13

## 1. 第三人称摄像机实现方案

### Decision
使用轨道摄像机（Orbital Camera）模式，摄像机围绕角色旋转，保持固定距离（默认 5 米），支持碰撞检测自动调整距离。

### Rationale
- Three.js 原生支持 OrbitControls，但需要自定义以适应游戏需求
- 轨道模式允许玩家自由旋转视角观察角色
- 碰撞检测通过射线检测实现，避免摄像机穿墙

### Alternatives Considered
1. **固定跟随摄像机**: 摄像机始终在角色正后方 - 拒绝，因为不够灵活
2. **肩部视角**: 摄像机偏移到角色肩膀 - 可作为未来扩展，初版使用居中后方

### Implementation Notes
```typescript
// 摄像机位置计算
const offset = new THREE.Vector3(0, 2, 5) // 高度偏移 + 后方距离
offset.applyQuaternion(player.quaternion)
camera.position.copy(player.position).add(offset)
camera.lookAt(player.position.add(new THREE.Vector3(0, 1, 0))) // 看向角色中心
```

## 2. 摄像机碰撞检测

### Decision
使用射线检测（Raycasting）从角色位置向摄像机目标位置发射射线，检测障碍物并调整摄像机距离。

### Rationale
- 项目已有 `utils/Raycaster.ts`，可复用射线检测逻辑
- 射线检测性能开销小，适合每帧执行
- 可以平滑过渡摄像机距离，避免突兀跳变

### Implementation Notes
```typescript
// 碰撞检测伪代码
const ray = new THREE.Raycaster(playerPos, cameraDirection, 0, maxDistance)
const intersects = ray.intersectObjects(world.getCollidableObjects())
if (intersects.length > 0) {
  actualDistance = Math.min(intersects[0].distance - 0.5, maxDistance)
}
```

## 3. 方块人模型构建方案

### Decision
使用 Three.js 几何体程序化生成方块人模型，不依赖外部模型文件（如 GLTF）。

### Rationale
- 方块人由简单的立方体组成（头、身体、四肢），程序化生成更轻量
- 避免外部模型加载延迟，确保 < 2s 加载时间
- 便于通过颜色/纹理变化创建不同角色
- 与游戏的方块世界视觉风格一致

### Alternatives Considered
1. **GLTF 模型加载**: 更灵活但增加加载时间和文件体积 - 拒绝
2. **精灵图（Sprite）**: 2D 表现 - 拒绝，不适合第三人称 3D 视角

### Model Structure
```
方块人结构:
- 头部: 8x8x8 单位
- 身体: 8x12x4 单位
- 手臂: 4x12x4 单位 x2
- 腿部: 4x12x4 单位 x2
总高度: 约 32 单位 (缩放后 ~1.8 米匹配 PLAYER_HEIGHT)
```

## 4. 视角切换动画

### Decision
使用 LERP（线性插值）实现摄像机位置平滑过渡，过渡时间 0.3 秒。

### Rationale
- 平滑过渡提升用户体验，避免突兀切换
- 0.3 秒符合 SC-001 成功标准
- LERP 计算简单，性能开销可忽略

### Implementation Notes
```typescript
// 视角切换插值
const t = Math.min(elapsedTime / TRANSITION_DURATION, 1)
camera.position.lerpVectors(startPos, targetPos, easeOutQuad(t))
```

## 5. 角色选择界面实现

### Decision
使用 HTML/CSS 覆盖层实现角色选择 UI，Three.js 渲染模型预览。

### Rationale
- HTML/CSS 更适合 UI 交互（按钮、列表）
- 模型预览使用独立的 Three.js 场景，不影响主游戏渲染
- 与现有 UI 组件（如 BlockSelector、VolumeControl）风格一致

### Alternatives Considered
1. **纯 Three.js UI**: 使用 3D 文字和平面 - 拒绝，交互实现复杂
2. **Canvas 2D**: 自定义绘制 - 拒绝，维护成本高

## 6. 玩家偏好存储

### Decision
使用 LocalStorage 存储玩家选择的角色模型 ID。

### Rationale
- 规格假设明确使用本地存储
- LocalStorage 简单可靠，无需后端支持
- 数据量小（仅存储模型 ID 字符串）

### Storage Key
```typescript
const STORAGE_KEY = 'webcraft_selected_character'
localStorage.setItem(STORAGE_KEY, modelId)
```

## 7. 第一人称模型隐藏策略

### Decision
第一人称视角下完全隐藏角色模型（不显示手臂）。

### Rationale
- 简化初版实现
- 现有第一人称游戏体验已完整
- 手臂渲染可作为后续增强功能

### Alternatives Considered
1. **显示第一人称手臂**: 需要额外的手臂模型和动画 - 延后实现

## Summary

所有技术决策已确定，无需进一步澄清。关键技术点：
1. 轨道摄像机 + 射线碰撞检测
2. 程序化方块人模型生成
3. LERP 平滑视角切换
4. HTML/CSS + Three.js 混合 UI
5. LocalStorage 偏好存储
