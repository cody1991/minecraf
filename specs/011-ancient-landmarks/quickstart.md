# Quickstart: 古代地标建筑群

**Feature**: 011-ancient-landmarks  
**Date**: 2025-12-13

## 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck
```

## 核心文件

| 文件 | 用途 |
|------|------|
| `src/terrain/PyramidGenerator.ts` | 金字塔生成器 |
| `src/terrain/ForbiddenCityGenerator.ts` | 故宫生成器 |
| `src/terrain/CastleGenerator.ts` | 城堡生成器 |
| `src/terrain/LandmarkManager.ts` | 地标管理器 |
| `src/core/Block.ts` | 方块类型定义 |
| `src/terrain/TerrainGenerator.ts` | 地形生成集成 |

## 实现顺序

### Phase 1: 基础设施
1. 扩展 `Block.ts` 添加新方块类型
2. 更新 `ChunkConstants.ts` 添加地标区域常量
3. 创建 `LandmarkManager.ts` 管理器

### Phase 2: 金字塔 (P1)
1. 创建 `PyramidGenerator.ts`
2. 实现外部四面体结构
3. 实现内部迷宫和房间
4. 添加火把导航

### Phase 3: 故宫 (P2)
1. 创建 `ForbiddenCityGenerator.ts`
2. 实现围墙和大门
3. 实现主殿建筑
4. 实现院落空间

### Phase 4: 城堡 (P3)
1. 创建 `CastleGenerator.ts`
2. 实现城墙和塔楼
3. 实现内部大厅
4. 添加护城河

### Phase 5: 集成
1. 修改 `TerrainGenerator.ts` 集成所有生成器
2. 扩展平原区域
3. 测试和性能验证

## 代码模式

### 创建新生成器

```typescript
// src/terrain/PyramidGenerator.ts
import { BlockType } from '../core/Block'

export interface PyramidConfig {
  centerX: number
  centerZ: number
  baseHeight: number
  baseSize: number
  height: number
}

export class PyramidGenerator {
  public readonly config: PyramidConfig
  
  constructor(config: Partial<PyramidConfig> = {}) {
    this.config = { ...DEFAULT_PYRAMID_CONFIG, ...config }
  }
  
  getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null {
    // 检查是否在边界内
    if (!this.isInBounds(worldX, worldZ)) return null
    
    // 计算相对坐标
    const relX = worldX - this.config.centerX
    const relY = worldY - this.config.baseHeight
    const relZ = worldZ - this.config.centerZ
    
    // 生成方块逻辑...
    return BlockType.SANDSTONE
  }
  
  isInBounds(worldX: number, worldZ: number): boolean {
    const relX = Math.abs(worldX - this.config.centerX)
    const relZ = Math.abs(worldZ - this.config.centerZ)
    return relX <= this.config.baseSize / 2 && 
           relZ <= this.config.baseSize / 2
  }
}
```

### 集成到 TerrainGenerator

```typescript
// src/terrain/TerrainGenerator.ts
import { LandmarkManager } from './LandmarkManager'

export class TerrainGenerator {
  private landmarkManager: LandmarkManager | null = null
  
  enableLandmarks(): void {
    this.landmarkManager = new LandmarkManager(this.config.baseHeight)
  }
  
  private getBlockTypeAt(...): BlockType {
    // 先检查地标建筑
    if (this.landmarkManager) {
      const landmarkBlock = this.landmarkManager.getBlockAt(worldX, worldY, worldZ)
      if (landmarkBlock !== null) {
        return landmarkBlock
      }
    }
    
    // 继续原有地形生成...
  }
}
```

## 测试验证

### 手动测试清单

- [ ] 从斗兽场能看到三座建筑
- [ ] 金字塔入口可进入
- [ ] 金字塔内部有 3+ 个房间
- [ ] 金字塔主路径有火把
- [ ] 故宫有红墙黄瓦
- [ ] 故宫布局对称
- [ ] 城堡有塔楼和城墙
- [ ] 城堡内部可探索
- [ ] 所有建筑碰撞正确
- [ ] 帧率保持稳定

### 性能基准

```bash
# 在斗兽场区域测试帧率
# 目标: 桌面端 60 FPS, 移动端 30 FPS
```

## 参考资料

- `src/terrain/ColosseumGenerator.ts` - 建筑生成器参考实现
- `specs/004-colosseum-spawn-map/` - 斗兽场规范
- `specs/010-colosseum-enhancement/` - 斗兽场增强规范
