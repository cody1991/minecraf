# Quickstart: 罗马斗兽场出生地图

**Feature**: 004-colosseum-spawn-map  
**Date**: 2025-12-12

## 快速开始

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 验证斗兽场生成

打开浏览器访问 `http://localhost:5173`，玩家应出生在斗兽场中心。

### 3. 探索斗兽场

- **WASD**: 移动
- **空格**: 跳跃
- **鼠标**: 视角控制
- **左键**: 破坏方块
- **右键**: 放置方块

## 核心文件

| 文件 | 说明 |
|------|------|
| `src/terrain/ColosseumGenerator.ts` | 斗兽场生成逻辑 |
| `src/terrain/TerrainGenerator.ts` | 地形生成器（集成斗兽场） |
| `src/core/World.ts` | 世界管理（出生点） |

## 配置调整

修改 `ColosseumGenerator` 中的默认配置：

```typescript
// src/terrain/ColosseumGenerator.ts
const DEFAULT_COLOSSEUM_CONFIG = {
  arenaRadiusX: 25,    // 调整竞技场大小
  arenaRadiusZ: 20,
  tierCount: 3,        // 调整看台层数
  archCount: 24,       // 调整拱门数量
  // ...
}
```

## 测试

```bash
npm run test
```

## 常见问题

### Q: 斗兽场没有生成？
检查 TerrainGenerator 是否正确调用 ColosseumGenerator。

### Q: 性能下降？
斗兽场区域方块较多，确保区块加载距离设置合理。

### Q: 材质显示异常？
确认 BlockType.STONE 和 BlockType.SAND 的纹理正确加载。
