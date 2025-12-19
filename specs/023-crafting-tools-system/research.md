# Research: 合成与工具系统

**Feature**: 023-crafting-tools-system  
**Date**: 2025-12-19

## 研究任务

### 1. 配方匹配算法

**Decision**: 采用"归一化位置"匹配算法

**Rationale**: 
- 形状配方需要支持任意位置偏移（如木镐可以放在 3×3 格的任意位置，只要相对形状正确）
- 算法：将配方图案归一化到左上角，匹配时同样归一化输入，然后逐格比较
- 时间复杂度 O(n)，n 为合成格数量（最多 9 格），性能可接受

**Alternatives considered**:
- 暴力遍历所有偏移位置：复杂度 O(n²)，对于 9 格仍可接受但不优雅
- 哈希匹配：需要处理旋转/翻转变体，过于复杂

### 2. 工具与物品栏集成

**Decision**: 工具作为特殊 BlockType，附加耐久度元数据

**Rationale**:
- 现有 `ItemSlot` 结构为 `{ itemType: BlockType, count: number }`
- 扩展为 `{ itemType: BlockType, count: number, durability?: number }`
- 工具不可堆叠（count 始终为 1），通过 durability 字段区分
- 复用现有物品栏拖拽逻辑

**Alternatives considered**:
- 创建独立的 Tool 类：需要大量重构物品栏系统，风险高
- 使用 Map 存储工具元数据：增加复杂度，不如直接扩展 ItemSlot

### 3. 熔炉后台冶炼

**Decision**: 使用游戏主循环 update 驱动熔炉状态

**Rationale**:
- 现有 `CampfireManager` 已实现类似模式（篝火烹饪）
- 每帧检查所有活跃熔炉，更新冶炼进度
- 界面关闭后熔炉继续运行，通过 FurnaceManager 统一管理

**Alternatives considered**:
- Web Worker 后台处理：过度设计，熔炉数量有限
- setInterval 定时器：与游戏循环不同步，可能导致状态不一致

### 4. 方块交互机制

**Decision**: 扩展现有右键交互逻辑，添加方块类型检查

**Rationale**:
- `main.ts` 第 584-636 行已有右键交互分支（篝火、食物、放置）
- 添加工作台/熔炉检查分支，优先于方块放置
- 交互距离复用现有 `INTERACTION_DISTANCE = 5`

**Alternatives considered**:
- 创建独立的 InteractionManager：当前交互逻辑简单，无需抽象

### 5. UI 布局设计

**Decision**: 合成界面采用居中模态框，参考现有 InventoryUI 样式

**Rationale**:
- 现有 `InventoryUI` 已实现 36 格背包 + 拖拽交互
- 合成界面复用相同的槽位渲染和拖拽逻辑
- 2×2 合成格嵌入物品栏界面右上角
- 3×3 工作台界面独立显示，包含合成格 + 输出格 + 玩家背包

**Alternatives considered**:
- 使用 Canvas 渲染 UI：与现有 DOM 方案不一致，增加维护成本

### 6. 工具挖掘速度集成

**Decision**: 修改 DiggingManager，查询当前手持工具的速度倍率

**Rationale**:
- 现有 `DiggingManager` 使用 `DiggingConfig` 定义方块基础挖掘时间
- 添加工具倍率查询：`effectiveTime = baseTime / toolMultiplier`
- 工具类型与方块类型匹配检查在 `ToolSystem` 中实现

**Alternatives considered**:
- 在 DiggingConfig 中硬编码工具倍率：不够灵活，难以扩展

### 7. 纹理资源

**Decision**: 使用程序化生成的简化纹理

**Rationale**:
- 现有 `TextureAtlas` 使用程序化生成纹理（Canvas 绘制）
- 工作台：顶面工具图案 + 侧面木板图案
- 熔炉：前面炉口 + 侧面石砖图案
- 工具：简化的像素图标（用于物品栏显示）

**Alternatives considered**:
- 外部纹理文件：增加资源加载复杂度，与现有方案不一致

## 技术决策总结

| 领域 | 决策 | 依据 |
|------|------|------|
| 配方匹配 | 归一化位置算法 | 简单高效，支持偏移 |
| 工具存储 | 扩展 ItemSlot 添加 durability | 最小化改动 |
| 熔炉更新 | 游戏主循环驱动 | 与现有模式一致 |
| 方块交互 | 扩展右键分支 | 复用现有逻辑 |
| UI 实现 | DOM + 复用拖拽逻辑 | 与 InventoryUI 一致 |
| 挖掘速度 | DiggingManager 查询工具倍率 | 职责清晰 |
| 纹理 | 程序化生成 | 与现有方案一致 |
