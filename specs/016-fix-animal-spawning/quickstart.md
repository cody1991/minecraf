# Quickstart: 修复动物浮空问题

**Feature**: 016-fix-animal-spawning  
**Date**: 2025-12-13

## 快速开始

### 1. 理解问题

当前 `AnimalSpawner.findSpawnPosition()` 使用 `world.getHeightAt()` 获取生成高度，但该方法返回的是**理论高度**（基于噪声计算），不考虑洞穴挖空。

### 2. 修改文件

**唯一需要修改的文件**: `src/entities/AnimalSpawner.ts`

### 3. 核心修改

#### 3.1 添加导入

```typescript
import { BlockType, isSolid, isTreeLog, isTreeLeaves } from '../core/Block'
```

#### 3.2 重写 findSpawnPosition 方法

```typescript
private findSpawnPosition(chunkX: number, chunkZ: number): THREE.Vector3 | null {
  const MAX_SCAN_DEPTH = 20
  
  for (let attempt = 0; attempt < 5; attempt++) {
    const localX = Math.floor(Math.random() * 16)
    const localZ = Math.floor(Math.random() * 16)
    const worldX = chunkX * 16 + localX
    const worldZ = chunkZ * 16 + localZ
    
    if (isInSpawnProtectionZone(worldX, worldZ)) continue
    
    // 获取理论高度作为扫描起点
    const terrainY = this.world.getHeightAt(worldX, worldZ)
    if (terrainY < this.config.minY) continue
    
    // 向下扫描找实际地面
    let groundY = -1
    for (let y = terrainY; y >= terrainY - MAX_SCAN_DEPTH; y--) {
      const block = this.world.getBlock(worldX, y, worldZ)
      
      // 遇水放弃
      if (block === BlockType.WATER) break
      
      // 找到有效地面
      if (isSolid(block) && !isTreeLog(block) && !isTreeLeaves(block)) {
        groundY = y
        break
      }
    }
    
    if (groundY < 0) continue
    
    // 检查空间
    const feetBlock = this.world.getBlock(worldX, groundY + 1, worldZ)
    const headBlock = this.world.getBlock(worldX, groundY + 2, worldZ)
    
    if (feetBlock === BlockType.WATER || isSolid(feetBlock)) continue
    if (headBlock === BlockType.WATER || isSolid(headBlock)) continue
    
    return new THREE.Vector3(worldX + 0.5, groundY + 1, worldZ + 0.5)
  }
  
  return null
}
```

### 4. 测试验证

```bash
# 启动开发服务器
npm run dev

# 测试场景
1. 在平原区域观察动物是否站在地面
2. 找到洞穴入口，观察附近动物是否正确生成
3. 在树林中观察动物是否在树下地面
4. 在湖边观察是否有动物在水中
```

### 5. 验收标准

- [ ] 所有动物站在地面上，无悬浮
- [ ] 无动物生成在水中
- [ ] 无动物卡在方块内
- [ ] 区块加载性能无明显下降

## 相关文件

| 文件 | 作用 |
|------|------|
| `src/entities/AnimalSpawner.ts` | 动物生成器 (修改) |
| `src/core/Block.ts` | 方块类型和辅助函数 (只读) |
| `src/core/World.ts` | 世界访问 API (只读) |

## 注意事项

1. **不要修改 `getHeightAt()`** - 它用于其他系统，改动影响范围大
2. **扫描深度限制** - 20 格足够覆盖大多数洞穴，更深会影响性能
3. **树木过滤** - 使用现有的 `isTreeLog()` 和 `isTreeLeaves()` 函数
