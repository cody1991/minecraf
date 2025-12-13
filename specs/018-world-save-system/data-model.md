# Data Model: 世界存档系统

**Feature**: 018-world-save-system  
**Date**: 2025-12-13

## Entities

### 1. SaveData（存档数据）

主实体，代表一个完整的游戏存档。

```typescript
interface SaveData {
  /** 唯一标识符（UUID v4） */
  id: string
  
  /** 用户定义的存档名称 */
  name: string
  
  /** 槽位类型 */
  slotType: 'manual' | 'auto'
  
  /** 槽位编号（手动存档 1-5，自动存档 0） */
  slotNumber: number
  
  /** 创建时间戳（毫秒） */
  createdAt: number
  
  /** 最后更新时间戳（毫秒） */
  updatedAt: number
  
  /** 世界种子 */
  seed: number
  
  /** 玩家状态 */
  playerState: PlayerState
  
  /** 游戏时间（可选，用于显示） */
  playTime?: number
}
```

### 2. PlayerState（玩家状态）

嵌入在 SaveData 中的玩家信息。

```typescript
interface PlayerState {
  /** 玩家位置 */
  position: {
    x: number
    y: number
    z: number
  }
  
  /** 玩家朝向（欧拉角） */
  rotation: {
    yaw: number    // 水平旋转
    pitch: number  // 垂直旋转
  }
  
  /** 当前选择的方块类型索引（可选） */
  selectedBlockIndex?: number
  
  /** 当前角色模型（可选） */
  characterModel?: string
}
```

### 3. ChunkData（区块数据）

单独存储，通过 saveId 关联到 SaveData。

```typescript
interface ChunkData {
  /** 关联的存档 ID */
  saveId: string
  
  /** 区块坐标键 "cx,cy,cz" */
  chunkKey: string
  
  /** 区块方块数据（4096 字节） */
  blocks: Uint8Array
}
```

### 4. SaveMetadata（存档元数据）

用于列表显示的轻量级数据结构。

```typescript
interface SaveMetadata {
  id: string
  name: string
  slotType: 'manual' | 'auto'
  slotNumber: number
  updatedAt: number
  seed: number
}
```

## IndexedDB Schema

### Database: `webcraft-saves`

**Version**: 1

### Object Stores

#### 1. `saves`
存储 SaveData 实体。

| 字段 | 类型 | 索引 |
|------|------|------|
| id | string | ✅ keyPath |
| slotType | string | ✅ index |
| slotNumber | number | ✅ index |
| updatedAt | number | ✅ index |

#### 2. `chunks`
存储 ChunkData 实体。

| 字段 | 类型 | 索引 |
|------|------|------|
| [saveId, chunkKey] | composite | ✅ keyPath |
| saveId | string | ✅ index |

## Relationships

```
SaveData (1) ──────< ChunkData (N)
    │
    └── PlayerState (embedded)
```

- 一个 SaveData 关联多个 ChunkData（1:N）
- PlayerState 嵌入在 SaveData 中（1:1 嵌入）
- 删除 SaveData 时级联删除关联的 ChunkData

## State Transitions

### SaveData 生命周期

```
[不存在] ──创建──> [已保存] ──更新──> [已保存]
                     │
                     └──删除──> [不存在]
```

### 操作约束

| 操作 | 前置条件 | 后置条件 |
|------|----------|----------|
| 创建 | 槽位为空或用户确认覆盖 | 存档存在，时间戳更新 |
| 加载 | 存档存在且数据有效 | 游戏状态恢复 |
| 重命名 | 存档存在 | name 字段更新 |
| 删除 | 存档存在且用户确认 | 存档及关联区块删除 |

## Validation Rules

### SaveData
- `id`: 必须是有效的 UUID v4
- `name`: 1-50 字符，不能为空
- `slotNumber`: 手动存档 1-5，自动存档 0
- `seed`: 有效的数字
- `createdAt`, `updatedAt`: 有效的时间戳

### ChunkData
- `saveId`: 必须引用存在的 SaveData
- `chunkKey`: 格式为 "x,y,z"，x/y/z 为整数
- `blocks`: 长度必须为 4096

## Storage Estimates

| 项目 | 大小估算 |
|------|----------|
| SaveData（无区块） | ~500 bytes |
| 单个 ChunkData | ~4.1 KB |
| 100 个已修改区块 | ~410 KB |
| 单个完整存档（估算） | ~500 KB - 5 MB |
| 6 个存档槽位（最大） | ~30 MB |
