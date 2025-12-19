# Quickstart: 合成与工具系统

**Feature**: 023-crafting-tools-system  
**Date**: 2025-12-19

## 快速开始

### 1. 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck
```

### 2. 核心文件位置

| 模块 | 路径 | 说明 |
|------|------|------|
| 合成系统 | `src/crafting/` | 配方注册、匹配逻辑 |
| 工具系统 | `src/tools/` | 工具属性、耐久度 |
| 熔炉系统 | `src/furnace/` | 熔炉状态、冶炼逻辑 |
| 合成 UI | `src/ui/CraftingTableUI.ts` | 3×3 合成界面 |
| 熔炉 UI | `src/ui/FurnaceUI.ts` | 熔炉界面 |
| 方块定义 | `src/core/Block.ts` | 新增方块/工具类型 |

### 3. 实现顺序

#### Phase 1: 基础合成 (P1)

1. **扩展 BlockType** - 添加工作台、工具、材料类型
2. **配方系统** - 实现 RecipeRegistry 和 CraftingMatcher
3. **2×2 合成格** - 修改 InventoryUI 添加合成区域
4. **基础配方** - 注册原木→木板、木板→木棍、木板→工作台

#### Phase 2: 工作台 (P1)

5. **工作台方块** - 添加纹理和放置逻辑
6. **右键交互** - 修改 BlockInteraction 检测工作台
7. **3×3 合成界面** - 创建 CraftingTableUI
8. **工具配方** - 注册所有工具配方

#### Phase 3: 工具系统 (P1)

9. **工具属性** - 实现 ToolProperties 和 ToolSystem
10. **耐久度** - 扩展 ItemSlot，添加耐久度显示
11. **挖掘加速** - 修改 DiggingManager 查询工具倍率
12. **工具损坏** - 实现耐久度归零销毁逻辑

#### Phase 4: 熔炉系统 (P2)

13. **熔炉方块** - 添加纹理和放置逻辑
14. **熔炉状态** - 实现 FurnaceState 和 FurnaceManager
15. **熔炉界面** - 创建 FurnaceUI
16. **冶炼逻辑** - 实现燃料消耗和冶炼进度

### 4. 关键代码示例

#### 注册配方

```typescript
// src/crafting/recipes/BasicRecipes.ts
import { RecipeRegistry } from '../RecipeRegistry';
import { BlockType } from '../../core/Block';

export function registerBasicRecipes(registry: RecipeRegistry): void {
  // 原木 → 木板 (无形状配方)
  registry.register({
    id: 'planks',
    type: 'shapeless',
    ingredients: { 'L': BlockType.LOG },
    result: { item: BlockType.PLANKS, count: 4 },
    gridSize: 2,
  });

  // 木板 → 木棍 (形状配方)
  registry.register({
    id: 'sticks',
    type: 'shaped',
    pattern: ['P', 'P'],
    ingredients: { 'P': BlockType.PLANKS },
    result: { item: BlockType.STICK, count: 4 },
    gridSize: 2,
  });

  // 木板 → 工作台 (形状配方)
  registry.register({
    id: 'crafting_table',
    type: 'shaped',
    pattern: ['PP', 'PP'],
    ingredients: { 'P': BlockType.PLANKS },
    result: { item: BlockType.CRAFTING_TABLE, count: 1 },
    gridSize: 2,
  });
}
```

#### 工具挖掘加速

```typescript
// src/player/DiggingManager.ts (修改)
import { ToolSystem } from '../tools/ToolSystem';

// 在计算挖掘时间时
const baseTime = DiggingConfig.getDigTime(blockType);
const heldItem = inventory.getSelectedItem();
const multiplier = heldItem 
  ? ToolSystem.getSpeedMultiplier(heldItem.itemType, blockType)
  : 1;
const effectiveTime = baseTime / multiplier;
```

#### 熔炉更新循环

```typescript
// src/furnace/FurnaceManager.ts
update(deltaTime: number): void {
  for (const furnace of this.furnaces.values()) {
    if (furnace.burnTimeRemaining > 0) {
      furnace.burnTimeRemaining -= deltaTime;
      
      if (furnace.currentRecipe) {
        furnace.smeltProgress += deltaTime / furnace.currentRecipe.smeltTime;
        
        if (furnace.smeltProgress >= 1) {
          // 冶炼完成
          this.completeSmelt(furnace);
        }
      }
    } else if (this.canStartBurning(furnace)) {
      this.consumeFuel(furnace);
    }
  }
}
```

### 5. 测试要点

| 功能 | 测试方法 |
|------|----------|
| 2×2 合成 | 打开物品栏，放入原木，检查木板输出 |
| 3×3 合成 | 放置工作台，右键打开，制作木镐 |
| 工具加速 | 用木镐挖石头，对比空手时间 |
| 耐久度 | 连续挖掘 60 次，检查木镐是否损坏 |
| 熔炉冶炼 | 放入煤炭和铁矿石，等待 10 秒获得铁锭 |
| 后台冶炼 | 关闭熔炉界面，等待后重新打开检查进度 |

### 6. 常见问题

**Q: 配方不匹配怎么调试？**
A: 在 `CraftingMatcher.findMatch()` 中添加 console.log 输出归一化后的网格内容。

**Q: 工具耐久度不减少？**
A: 检查 `DiggingManager.onBlockDestroyed()` 是否调用了 `ToolSystem.useTool()`。

**Q: 熔炉界面关闭后冶炼停止？**
A: 确保 `FurnaceManager.update()` 在 `main.ts` 的游戏循环中被调用。
