# Data Model: 古代地标建筑群

**Feature**: 011-ancient-landmarks  
**Date**: 2025-12-13

## 1. 新方块类型

### BlockType 枚举扩展

```typescript
// 在 BlockType enum 中添加 (从 31 开始)
SANDSTONE = 31,        // 金字塔沙石
SANDSTONE_CARVED = 32, // 金字塔雕刻沙石
RED_BRICK = 33,        // 故宫红砖
GOLD_BLOCK = 34,       // 故宫金色装饰
DARK_STONE = 35,       // 城堡深色石头
MOSSY_STONE = 36,      // 城堡苔藓石头
TORCH = 37             // 火把照明
```

### 方块属性

| BlockType | name | color | transparent | solid |
|-----------|------|-------|-------------|-------|
| SANDSTONE | 沙石 | #d4b896 | false | true |
| SANDSTONE_CARVED | 雕刻沙石 | #c4a876 | false | true |
| RED_BRICK | 红砖 | #8b2323 | false | true |
| GOLD_BLOCK | 金块 | #ffd700 | false | true |
| DARK_STONE | 深色石头 | #4a4a4a | false | true |
| MOSSY_STONE | 苔藓石头 | #5a6b4a | false | true |
| TORCH | 火把 | #ffcc00 | true | false |

## 2. 建筑配置接口

### LandmarkConfig (基础配置)

```typescript
interface LandmarkConfig {
  centerX: number      // 建筑中心 X 坐标
  centerZ: number      // 建筑中心 Z 坐标
  baseHeight: number   // 建筑基础高度 (Y)
}
```

### PyramidConfig

```typescript
interface PyramidConfig extends LandmarkConfig {
  baseSize: number     // 底边长度 (default: 50)
  height: number       // 金字塔高度 (default: 35)
  entranceSide: 'north' | 'south' | 'east' | 'west'  // 入口方向
  
  // 内部迷宫配置
  corridorWidth: number   // 走廊宽度 (default: 3)
  roomCount: number       // 房间数量 (default: 4)
  deadEndCount: number    // 死路数量 (default: 3)
  torchSpacing: number    // 火把间距 (default: 5)
}
```

### ForbiddenCityConfig

```typescript
interface ForbiddenCityConfig extends LandmarkConfig {
  width: number        // 东西宽度 (default: 80)
  depth: number        // 南北深度 (default: 60)
  wallHeight: number   // 围墙高度 (default: 6)
  
  // 主殿配置
  mainHallWidth: number   // 主殿宽度 (default: 20)
  mainHallDepth: number   // 主殿深度 (default: 15)
  mainHallHeight: number  // 主殿高度 (default: 12)
  
  // 院落配置
  courtyardCount: number  // 院落数量 (default: 2)
}
```

### CastleConfig

```typescript
interface CastleConfig extends LandmarkConfig {
  size: number         // 城堡尺寸 (default: 60)
  wallHeight: number   // 城墙高度 (default: 10)
  wallThickness: number // 城墙厚度 (default: 3)
  
  // 塔楼配置
  towerCount: number      // 塔楼数量 (default: 4)
  towerRadius: number     // 塔楼半径 (default: 5)
  towerHeight: number     // 塔楼高度 (default: 18)
  
  // 内部配置
  hasGreatHall: boolean   // 是否有大厅 (default: true)
  hasMoat: boolean        // 是否有护城河 (default: true)
  moatWidth: number       // 护城河宽度 (default: 4)
}
```

## 3. 生成器接口

### LandmarkGenerator (抽象基类)

```typescript
abstract class LandmarkGenerator {
  protected config: LandmarkConfig
  
  constructor(config: LandmarkConfig)
  
  // 核心方法 - 返回该位置的方块类型，null 表示不属于此建筑
  abstract getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null
  
  // 检查世界坐标是否在建筑边界内
  abstract isInBounds(worldX: number, worldZ: number): boolean
  
  // 获取建筑的边界框
  abstract getBoundingBox(): { 
    minX: number, maxX: number, 
    minY: number, maxY: number, 
    minZ: number, maxZ: number 
  }
}
```

### LandmarkManager

```typescript
class LandmarkManager {
  private generators: LandmarkGenerator[] = []
  
  // 注册建筑生成器
  registerGenerator(generator: LandmarkGenerator): void
  
  // 获取指定位置的方块 (按注册顺序检查)
  getBlockAt(worldX: number, worldY: number, worldZ: number): BlockType | null
  
  // 检查位置是否在任何建筑区域内
  isInLandmarkZone(worldX: number, worldZ: number): boolean
  
  // 获取所有建筑的边界框
  getAllBoundingBoxes(): Array<{ name: string, box: BoundingBox }>
}
```

## 4. 金字塔内部结构

### 房间定义

```typescript
interface PyramidRoom {
  id: string           // 房间标识
  name: string         // 房间名称
  minX: number         // 相对于金字塔中心的边界
  maxX: number
  minY: number         // 相对于 baseHeight 的高度
  maxY: number
  minZ: number
  maxZ: number
  type: 'entrance' | 'corridor' | 'chamber' | 'treasure' | 'tomb'
}
```

### 走廊定义

```typescript
interface PyramidCorridor {
  id: string
  fromRoom: string     // 起始房间 ID
  toRoom: string | null // 终点房间 ID (null = 死路)
  path: Array<{x: number, y: number, z: number}>  // 走廊路径点
  hasTorches: boolean  // 是否有火把 (主路径 = true)
}
```

### 预定义布局

```typescript
const PYRAMID_LAYOUT = {
  rooms: [
    { id: 'entrance', name: '入口厅', type: 'entrance', ... },
    { id: 'descending', name: '下降走廊', type: 'corridor', ... },
    { id: 'grand_gallery', name: '大走廊', type: 'corridor', ... },
    { id: 'treasure', name: '宝藏室', type: 'treasure', ... },
    { id: 'tomb', name: '墓室', type: 'tomb', ... }
  ],
  corridors: [
    { id: 'main_1', fromRoom: 'entrance', toRoom: 'descending', hasTorches: true },
    { id: 'main_2', fromRoom: 'descending', toRoom: 'grand_gallery', hasTorches: true },
    { id: 'main_3', fromRoom: 'grand_gallery', toRoom: 'tomb', hasTorches: true },
    { id: 'branch_1', fromRoom: 'descending', toRoom: 'treasure', hasTorches: true },
    { id: 'dead_1', fromRoom: 'grand_gallery', toRoom: null, hasTorches: false },
    { id: 'dead_2', fromRoom: 'descending', toRoom: null, hasTorches: false }
  ]
}
```

## 5. 常量定义

### ChunkConstants 扩展

```typescript
// 地标区域半径 (平原区域)
export const LANDMARK_ZONE_RADIUS = 200

// 建筑默认位置
export const PYRAMID_POSITION = { x: 100, z: 0 }
export const FORBIDDEN_CITY_POSITION = { x: -70, z: 80 }
export const CASTLE_POSITION = { x: -70, z: -80 }

// 建筑间最小间距
export const MIN_LANDMARK_SPACING = 50
```

## 6. 状态与生命周期

建筑为静态结构，无状态变化：
- 在世界生成时创建
- 随区块加载/卸载
- 不支持动态修改

## 7. 验证规则

### 建筑放置验证

```typescript
function validateLandmarkPlacement(config: LandmarkConfig): boolean {
  // 1. 必须在地标区域内
  const distFromOrigin = Math.sqrt(config.centerX ** 2 + config.centerZ ** 2)
  if (distFromOrigin > LANDMARK_ZONE_RADIUS) return false
  
  // 2. 必须与斗兽场保持间距
  if (distFromOrigin < MIN_LANDMARK_SPACING) return false
  
  // 3. 必须与其他建筑保持间距
  for (const other of existingLandmarks) {
    const dist = Math.sqrt(
      (config.centerX - other.centerX) ** 2 + 
      (config.centerZ - other.centerZ) ** 2
    )
    if (dist < MIN_LANDMARK_SPACING) return false
  }
  
  return true
}
```
