# Data Model: 更多方块与纹理

**Feature**: 005-block-textures  
**Date**: 2025-12-12

## Entities

### BlockType (扩展)

方块类型枚举，扩展现有定义。

```typescript
enum BlockType {
  // 现有类型
  AIR = 0,
  GRASS = 1,
  DIRT = 2,
  STONE = 3,
  WOOD = 4,      // 重命名为 PLANKS 更准确，但保持兼容
  SAND = 5,
  
  // 新增类型
  COBBLESTONE = 6,
  BRICK = 7,
  GLASS = 8,
  WATER = 9,
  LEAVES = 10,
  LOG = 11,
  PLANKS = 12,   // 木板（与 WOOD 区分）
  SNOW = 13
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| 枚举值 | number | 0-13，用于数组索引和序列化 |

### BlockProperties

方块属性定义。

```typescript
interface BlockProperties {
  name: string           // 显示名称（中文）
  nameEn: string         // 英文名称
  color: number          // 回退颜色（十六进制）
  transparent: boolean   // 是否透明
  opacity: number        // 不透明度 (0-1)
  solid: boolean         // 是否可碰撞
}
```

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| name | string | 非空 | UI 显示用中文名 |
| nameEn | string | 非空 | 日志/调试用英文名 |
| color | number | 0x000000-0xFFFFFF | 纹理加载失败时的回退颜色 |
| transparent | boolean | - | true 表示需要特殊透明渲染 |
| opacity | number | 0.0-1.0 | 1.0=不透明, 0.5=半透明 |
| solid | boolean | - | false 表示玩家可穿过（如水） |

### BlockTextureMap

方块纹理映射定义。

```typescript
interface BlockTextureMap {
  top: number      // 顶面纹理索引
  bottom: number   // 底面纹理索引
  side: number     // 侧面纹理索引（前后左右共用）
}
```

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| top | number | >= 0 | 纹理图集中的索引 |
| bottom | number | >= 0 | 纹理图集中的索引 |
| side | number | >= 0 | 纹理图集中的索引 |

### TextureAtlasConfig

纹理图集配置。

```typescript
interface TextureAtlasConfig {
  imagePath: string      // 图集图片路径
  tileSize: number       // 单个纹理尺寸（像素）
  columns: number        // 图集列数
  rows: number           // 图集行数
}
```

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| imagePath | string | 有效路径 | 相对于 public/ 的路径 |
| tileSize | number | 16 | 固定 16x16 像素 |
| columns | number | > 0 | 纹理图集列数 |
| rows | number | > 0 | 纹理图集行数 |

## Relationships

```
BlockType (1) ──────── (1) BlockProperties
    │
    └──────────────── (1) BlockTextureMap
                              │
                              └── references → TextureAtlas indices
```

## State Transitions

### TextureAtlas 加载状态

```
[UNLOADED] ──load()──> [LOADING] ──success──> [LOADED]
                           │
                           └──error──> [FALLBACK]
```

| 状态 | 说明 |
|------|------|
| UNLOADED | 初始状态，未开始加载 |
| LOADING | 正在加载纹理图片 |
| LOADED | 加载成功，可使用真实纹理 |
| FALLBACK | 加载失败，使用程序生成纯色纹理 |

## Validation Rules

1. **BlockType 唯一性**: 每个枚举值必须唯一且连续
2. **纹理索引有效性**: BlockTextureMap 中的索引必须 < (columns × rows)
3. **透明度一致性**: transparent=true 时 opacity 必须 < 1.0
4. **固体一致性**: WATER 和 AIR 的 solid 必须为 false

## Data Volume Assumptions

| 数据 | 预估规模 |
|------|---------|
| 方块类型数量 | 14 种（含 AIR） |
| 纹理图集尺寸 | 256x48 像素（16 列 × 3 行） |
| 纹理图集文件大小 | < 50 KB (PNG) |
| 内存占用（纹理） | < 1 MB |
