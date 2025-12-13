# Quickstart: 世界存档系统

**Feature**: 018-world-save-system  
**Date**: 2025-12-13

## 概述

本功能为 WebCraft 添加世界存档系统，允许玩家保存和加载游戏进度。

## 核心组件

### 1. SaveManager

存档管理器，负责所有存档操作。

```typescript
import { SaveManager } from './storage/SaveManager'

// 初始化
const saveManager = new SaveManager()
await saveManager.initialize()

// 保存
const result = await saveManager.save(1, '我的世界', {
  seed: world.getSeed(),
  playerState: player.getState(),
  modifiedChunks: world.getModifiedChunks()
})

// 加载
const loadResult = await saveManager.load(saveId)
if (loadResult.success) {
  world.restore(loadResult.saveData, loadResult.chunks)
}

// 列表
const saves = await saveManager.listSaves()
```

### 2. AutoSave

自动保存管理器。

```typescript
import { AutoSave } from './storage/AutoSave'

const autoSave = new AutoSave(saveManager)

// 设置数据提供者
autoSave.setDataProvider(() => ({
  seed: world.getSeed(),
  playerState: player.getState(),
  modifiedChunks: world.getModifiedChunks()
}))

// 启动（默认 5 分钟间隔）
autoSave.start()

// 停止
autoSave.stop()
```

### 3. SavePanel

存档 UI 面板。

```typescript
import { SavePanel } from './ui/SavePanel'

const savePanel = new SavePanel(saveManager)

// 显示/隐藏
savePanel.toggle()

// 刷新列表
await savePanel.refresh()
```

## 数据流

```
用户操作 → SavePanel → SaveManager → IndexedDBStorage → IndexedDB
                ↑                           ↓
              Game ←── 加载数据 ←── 读取存档
```

## 关键接口

### World 扩展

```typescript
// 新增方法
class World {
  // 获取所有已修改的区块
  getModifiedChunks(): Array<{ key: string; blocks: Uint8Array }>
  
  // 从存档恢复世界
  restoreFromSave(seed: number, chunks: ChunkData[]): void
}
```

### Chunk 扩展

```typescript
class Chunk {
  // 新增属性
  isModified: boolean  // 是否被玩家修改过
}
```

### Player 扩展

```typescript
class Player {
  // 获取可序列化的状态
  getState(): PlayerState
  
  // 从状态恢复
  restoreState(state: PlayerState): void
}
```

## 测试场景

### 手动测试

1. **保存测试**
   - 放置几个方块
   - 打开存档面板，保存到槽位 1
   - 验证保存成功提示

2. **加载测试**
   - 刷新页面
   - 打开存档面板，加载槽位 1
   - 验证方块位置恢复

3. **自动保存测试**
   - 开始游戏，放置方块
   - 等待 5 分钟（或修改间隔为 10 秒测试）
   - 刷新页面，检查自动存档

4. **管理测试**
   - 重命名存档，验证名称更新
   - 删除存档，验证确认对话框和删除结果

## 错误处理

```typescript
// 检查支持
if (!saveManager.isSupported()) {
  showMessage('您的浏览器不支持存档功能')
  return
}

// 处理保存错误
const result = await saveManager.save(...)
if (!result.success) {
  showError(result.error)
}

// 处理加载错误
const loadResult = await saveManager.load(...)
if (!loadResult.success) {
  showError(loadResult.error)
}
```

## 配置

```typescript
// 自动保存间隔（毫秒）
const AUTO_SAVE_INTERVAL = 5 * 60 * 1000  // 5 分钟

// 手动存档槽位数量
const MANUAL_SLOT_COUNT = 5

// IndexedDB 数据库名称
const DB_NAME = 'webcraft-saves'
const DB_VERSION = 1
```
