# Quickstart: 罗马斗兽场视觉增强

**Feature**: 010-colosseum-enhancement  
**Date**: 2025-12-13

## 开发环境设置

### 前置条件

- Node.js 18+
- npm 或 pnpm

### 安装依赖

```bash
cd /Users/cody/Desktop/tencent/minecraft
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看游戏。

## 关键文件

| 文件 | 说明 |
|------|------|
| `src/terrain/ColosseumGenerator.ts` | **主要修改文件** - 斗兽场生成器 |
| `src/core/Block.ts` | 方块类型定义（参考，可能无需修改） |
| `src/terrain/TerrainGenerator.ts` | 地形生成器（调用 ColosseumGenerator） |

## 核心代码结构

### ColosseumGenerator 类

```typescript
class ColosseumGenerator {
  // 配置
  config: ColosseumConfig
  
  // 主要方法
  getBlockAt(worldX, worldY, worldZ): BlockType | null  // 核心生成逻辑
  
  // 辅助方法
  isInOuterWall(relX, relZ): boolean      // 判断是否在外墙
  getArchPosition(angle): ArchPosition    // 获取拱门位置信息
  isInArchOpening(...): boolean           // 判断是否在拱门开口
  getTierIndex(relX, relZ): number        // 获取观众席层索引
  isInArena(relX, relZ): boolean          // 判断是否在竞技场
  isInRuins(angle, relY): boolean         // 判断是否在废墟区域
}
```

### 修改入口

所有视觉增强逻辑应在 `getBlockAt()` 方法中实现：

```typescript
getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null {
  // ... 现有逻辑 ...
  
  // === 新增: 外墙装饰 ===
  if (this.isInOuterWall(relX, relZ)) {
    // 壁柱、檐口、拱券石逻辑
  }
  
  // === 新增: 竞技场地面图案 ===
  if (this.isInArena(relX, relZ) && relY === 0) {
    // 中心圆形 + 放射线逻辑
  }
  
  // === 新增: 观众席材质变化 ===
  // 修改现有 getTierIndex 返回后的方块选择逻辑
  
  // === 新增: 废墟增强 ===
  // 扩展 isInRuins 逻辑，添加碎石和植被
}
```

## 测试验证

### 视觉验收

1. 启动游戏，出生在斗兽场中心
2. 绕斗兽场外墙一周，检查：
   - [ ] 每个拱门之间有凸出的壁柱
   - [ ] 各层之间有水平檐口
   - [ ] 顶层有雉堞
3. 进入走廊，检查：
   - [ ] 天花板为拱形
   - [ ] 地面为石质
4. 观察竞技场地面，检查：
   - [ ] 中心有圆形标记
   - [ ] 有放射状分区线
5. 观察废墟区域，检查：
   - [ ] 边缘不规则
   - [ ] 有散落碎石
   - [ ] 有植被点缀

### 性能验证

```bash
# 在浏览器开发者工具中监控帧率
# 目标: 桌面端 >= 54 FPS (60 FPS 的 90%)
```

## 常见问题

### Q: 如何调试特定位置的方块生成？

在 `getBlockAt()` 中添加条件日志：

```typescript
if (worldX === 0 && worldZ === 0) {
  console.log('Center block:', { relY, level, levelY })
}
```

### Q: 如何测试废墟区域？

废墟区域默认在角度 108°-216° 范围。可以在游戏中向该方向移动，或临时修改 `ruinsAngleStart/End` 配置。

### Q: 材质不显示怎么办？

确保使用的 `BlockType` 在 `BLOCK_PROPERTIES` 中有定义，且 `solid: true`（除非是装饰性植被）。
