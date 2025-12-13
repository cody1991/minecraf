# Research: 世界存档系统

**Feature**: 018-world-save-system  
**Date**: 2025-12-13

## 1. IndexedDB 存储策略

### Decision
使用原生 IndexedDB API，不引入额外库（如 Dexie.js、idb）。

### Rationale
- 项目依赖极简（仅 Three.js），保持一致性
- IndexedDB API 足够满足需求（键值存储、事务支持）
- 避免增加包体积
- 现代浏览器支持良好

### Alternatives Considered
| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| Dexie.js | API 更友好 | 额外依赖 | 拒绝 |
| localStorage | 更简单 | 5MB 限制，不适合大数据 | 拒绝 |
| 原生 IndexedDB | 无依赖，容量大 | API 较繁琐 | ✅ 采用 |

## 2. 数据序列化格式

### Decision
使用 JSON 序列化存档元数据，使用 Uint8Array 直接存储区块数据。

### Rationale
- 区块数据已是 Uint8Array 格式（每个区块 4096 字节）
- IndexedDB 原生支持 ArrayBuffer/Uint8Array
- 避免 JSON 序列化大量二进制数据的性能开销
- 元数据（名称、时间、种子）使用 JSON 便于查询

### Data Structure
```typescript
interface SaveData {
  id: string                    // 唯一标识（UUID）
  name: string                  // 用户命名
  createdAt: number             // 创建时间戳
  updatedAt: number             // 最后更新时间戳
  seed: number                  // 世界种子
  playerState: PlayerState      // 玩家位置和朝向
  modifiedChunks: ChunkData[]   // 已修改区块列表
}

interface ChunkData {
  key: string                   // "cx,cy,cz" 格式
  blocks: Uint8Array            // 4096 字节区块数据
}
```

## 3. 已修改区块追踪

### Decision
在 Chunk 类中添加 `isModified` 标记，仅保存被玩家修改过的区块。

### Rationale
- 避免保存整个世界（可能有数百个区块）
- 未修改区块可通过种子重新生成
- 显著减少存储空间和保存/加载时间
- 符合 Minecraft 原版的存档策略

### Implementation
- `Chunk.isModified: boolean` - 默认 false
- `Chunk.setBlock()` 调用时设置为 true
- `World.getModifiedChunks()` - 返回所有 isModified=true 的区块

## 4. 自动保存策略

### Decision
使用 `setInterval` 定时触发，异步保存到专用自动存档槽位。

### Rationale
- 简单可靠
- 不阻塞游戏主循环
- 单独槽位避免覆盖用户手动存档

### Implementation
- 间隔：5 分钟（300000ms）
- 触发条件：游戏处于活动状态
- 保存过程：异步，显示简短提示
- 冲突处理：使用锁机制防止并发保存

## 5. UI 集成方案

### Decision
在现有设置面板（VolumeControl 模式）中添加存档标签页。

### Rationale
- 复用现有 UI 模式和样式
- 用户熟悉的交互方式
- 不引入新的 UI 入口点

### UI Components
1. **SavePanel** - 存档标签页容器
2. **SaveSlotList** - 存档槽位列表
3. **SaveSlotItem** - 单个存档项（名称、时间、操作按钮）
4. **ConfirmDialog** - 删除/覆盖确认对话框

## 6. 错误处理策略

### Decision
捕获所有 IndexedDB 错误，显示用户友好的错误提示。

### Error Cases
| 错误类型 | 处理方式 |
|----------|----------|
| 存储空间不足 | 提示删除旧存档 |
| 数据损坏 | 提示加载失败，建议删除 |
| 浏览器不支持 | 禁用存档功能，显示提示 |
| 并发冲突 | 队列化操作，防止重复保存 |

## 7. 性能优化

### Decision
使用异步操作 + 分批处理大量区块。

### Strategies
- 保存操作使用 `async/await`，不阻塞主线程
- 大量区块分批写入（每批 10 个区块）
- 加载时先恢复玩家位置，再逐步加载区块
- 自动保存在后台静默进行

## 8. 浏览器兼容性

### Decision
检测 IndexedDB 支持，不支持时优雅降级。

### Implementation
```typescript
function isIndexedDBSupported(): boolean {
  return 'indexedDB' in window && window.indexedDB !== null
}
```

### Fallback
- 显示提示：「您的浏览器不支持存档功能」
- 隐藏存档相关 UI
- 游戏仍可正常运行（无存档）
