# Contracts: 修复动物浮空问题

**Feature**: 016-fix-animal-spawning  
**Date**: 2025-12-13

## 概述

本功能不涉及外部 API 或服务接口。所有修改均为内部逻辑，使用现有的内部 API。

## 内部 API 依赖

### World API (只读使用)

```typescript
interface World {
  /**
   * 获取指定坐标的方块类型
   * @param x - 世界 X 坐标
   * @param y - 世界 Y 坐标
   * @param z - 世界 Z 坐标
   * @returns 方块类型，坐标无效时返回 AIR
   */
  getBlock(x: number, y: number, z: number): BlockType
  
  /**
   * 获取指定 X,Z 坐标的理论地形高度
   * @param worldX - 世界 X 坐标
   * @param worldZ - 世界 Z 坐标
   * @returns 基于噪声计算的地形高度
   */
  getHeightAt(worldX: number, worldZ: number): number
}
```

### Block 辅助函数 (只读使用)

```typescript
/**
 * 判断方块是否为固体（有碰撞）
 */
function isSolid(type: BlockType): boolean

/**
 * 判断方块是否为树干
 */
function isTreeLog(type: BlockType): boolean

/**
 * 判断方块是否为树叶
 */
function isTreeLeaves(type: BlockType): boolean
```

## 无新增接口

本功能修改 `AnimalSpawner` 的内部实现，不改变其公共接口：

```typescript
class AnimalSpawner {
  // 公共接口保持不变
  spawnInChunk(chunkX: number, chunkZ: number): void
  clearChunk(chunkX: number, chunkZ: number): void
  reset(): void
}
```
