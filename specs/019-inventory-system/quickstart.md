# Quickstart: 物品与背包系统

**Feature**: 019-inventory-system  
**Date**: 2025-12-16

## 快速开始

### 1. 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm run test
```

### 2. 核心文件位置

| 文件 | 说明 |
|------|------|
| `src/entities/ItemEntity.ts` | 物品实体类 |
| `src/player/Inventory.ts` | 背包系统 |
| `src/ui/HotbarUI.ts` | 快捷栏 UI |
| `src/ui/InventoryUI.ts` | 背包界面 |

### 3. 关键接口

```typescript
// 添加物品到背包
const inventory = player.inventory;
const added = inventory.addItem(BlockType.DIRT, 10);

// 获取当前选中物品
const selectedItem = inventory.getSelectedItem();

// 切换快捷栏槽位
inventory.selectedSlot = 3; // 切换到第4格

// 生成物品实体
const itemEntity = new ItemEntity(
  position,
  BlockType.STONE,
  1
);
entityManager.addEntity(itemEntity);
```

### 4. 测试要点

**物品掉落测试**:
1. 破坏任意方块，观察物品实体生成
2. 确认物品有弹跳动画
3. 走近物品，确认自动拾取
4. 确认拾取音效播放

**背包测试**:
1. 按 E 键打开背包
2. 拖拽物品移动位置
3. 堆叠同类物品
4. 按 E 或 ESC 关闭背包

**快捷栏测试**:
1. 数字键 1-9 切换槽位
2. 滚轮切换槽位
3. 确认高亮显示正确

### 5. 存档验证

1. 收集一些物品
2. 按 ESC 打开存档面板，保存游戏
3. 刷新页面，加载存档
4. 确认背包物品正确恢复

## 实现顺序建议

1. **ItemEntity** - 物品实体基础类
2. **Inventory** - 背包数据结构
3. **BlockInteraction 修改** - 破坏方块生成物品
4. **拾取逻辑** - 玩家靠近自动拾取
5. **HotbarUI** - 快捷栏显示
6. **InventoryUI** - 背包界面
7. **存档集成** - 保存/加载背包数据
8. **音效** - 拾取音效

## 注意事项

- 物品实体需要加入 EntityManager 管理
- 背包 UI 打开时需要解锁鼠标指针
- 存档时需要序列化 BlockType 为数字
- 注意性能：限制同屏物品实体数量
