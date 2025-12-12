# Quickstart: 水下显示优化

**Feature**: 007-underwater-display  
**Date**: 2025-12-12

## 快速开始

### 1. 启动开发服务器

```bash
cd /Users/cody/Desktop/tencent/minecraft
npm run dev
```

### 2. 测试水下效果

1. 打开浏览器访问 `http://localhost:5173`
2. 点击开始游戏
3. 使用 WASD 移动到水域附近
4. 按空格键跳入水中
5. 观察：
   - 水体应该完整填充，没有空洞
   - 进入水下后屏幕应呈现蓝色色调
   - 远处物体应该逐渐模糊消失

### 3. 验收检查清单

- [ ] 水体连续无空洞
- [ ] 水下蓝色色调效果
- [ ] 水下雾效果（16格能见度）
- [ ] 进出水面效果切换流畅
- [ ] 帧率无明显下降

## 核心修改文件

| 文件 | 修改类型 | 说明 |
|------|----------|------|
| `src/core/Chunk.ts` | 修改 | 增强 isFaceExposed 逻辑 |
| `src/core/ChunkConstants.ts` | 修改 | 添加水下效果常量 |
| `src/renderer/Renderer.ts` | 修改 | 添加水下效果切换方法 |
| `src/renderer/UnderwaterEffect.ts` | 新增 | 水下效果管理器 |
| `src/core/Game.ts` | 修改 | 集成水下效果更新 |

## 关键代码片段

### 1. 增强的面暴露判断 (Chunk.ts)

```typescript
isFaceExposed(
  localX: number, localY: number, localZ: number,
  face: 'top' | 'bottom' | 'left' | 'right' | 'front' | 'back'
): boolean {
  const currentType = this.getBlock(localX, localY, localZ)
  const neighborType = this.getBlock(nx, ny, nz)
  
  // 透明方块：相邻方块是AIR或不同类型时渲染面
  if (isTransparent(currentType)) {
    return neighborType === BlockType.AIR || neighborType !== currentType
  }
  
  // 不透明方块：相邻方块是AIR或透明时渲染面
  return neighborType === BlockType.AIR || isTransparent(neighborType)
}
```

### 2. 水下效果管理器 (UnderwaterEffect.ts)

```typescript
export class UnderwaterEffect {
  private scene: THREE.Scene
  private isActive: boolean = false
  
  update(isSubmerged: boolean): void {
    if (isSubmerged && !this.isActive) {
      this.enable()
    } else if (!isSubmerged && this.isActive) {
      this.disable()
    }
  }
  
  private enable(): void {
    this.scene.fog = new THREE.FogExp2(0x1a3a5c, 0.04)
    this.scene.background = new THREE.Color(0x1a3a5c)
    this.isActive = true
  }
  
  private disable(): void {
    this.scene.fog = null
    this.scene.background = new THREE.Color(0x87ceeb)
    this.isActive = false
  }
}
```

### 3. 游戏循环集成 (Game.ts)

```typescript
// 在 gameLoop 中
this.underwaterEffect.update(this.player.isSubmerged)
```

## 调试技巧

### 查看水下状态

在浏览器控制台输入：
```javascript
game.player.isSubmerged  // 查看是否在水下
game.player.isInWater    // 查看是否在水中
```

### 手动切换水下效果

```javascript
game.underwaterEffect.enable()   // 强制启用
game.underwaterEffect.disable()  // 强制禁用
```

### 调整雾密度

```javascript
game.renderer.getScene().fog.density = 0.08  // 更浓的雾
```
