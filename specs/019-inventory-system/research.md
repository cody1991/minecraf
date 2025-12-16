# Research: 物品与背包系统

**Feature**: 019-inventory-system  
**Date**: 2025-12-16

## 研究任务

### 1. 物品实体渲染方案

**Decision**: 使用缩小的方块网格作为物品实体的 3D 表示

**Rationale**: 
- 复用现有的方块纹理系统，无需额外资源
- 与 Minecraft 原版视觉效果一致
- 物品实体显示为 0.25x0.25x0.25 的小方块
- 添加缓慢旋转动画增强视觉效果

**Alternatives Considered**:
- 2D Sprite 面片：渲染简单但与 3D 世界风格不一致
- 完整方块尺寸：视觉上过大，不像"掉落物"

### 2. 物品实体物理实现

**Decision**: 继承现有 Entity 基类，实现简化物理

**Rationale**:
- 复用 EntityManager 的区块管理机制
- 物理效果：重力（与动物一致）+ 弹跳衰减
- 弹跳参数：初始 Y 速度 0.15，弹跳系数 0.4，3次弹跳后停止
- 拾取吸引：进入 2 格范围后，以 8 格/秒速度飞向玩家

**Alternatives Considered**:
- 使用完整物理引擎：过于复杂，性能开销大
- 无弹跳直接落地：视觉效果差

### 3. 背包数据结构设计

**Decision**: 使用固定长度数组存储 36 个物品槽

**Rationale**:
- 简单高效，O(1) 访问任意槽位
- 与 Minecraft 原版一致：slots[0-8] 为快捷栏，slots[9-35] 为存储格
- 每个槽位存储 { itemType: BlockType | null, count: number }
- 支持序列化到现有 SaveData 结构

**Alternatives Considered**:
- Map 结构：动态但序列化复杂
- 链表：不适合固定槽位场景

### 4. 物品堆叠逻辑

**Decision**: 拾取时优先堆叠到已有同类物品，其次放入空槽

**Rationale**:
- 先搜索快捷栏（0-8），再搜索存储格（9-35）
- 找到同类物品且数量 < 64 时堆叠
- 无法堆叠时寻找第一个空槽
- 背包满时返回 false，物品留在地面

**Alternatives Considered**:
- 只搜索存储格：快捷栏物品无法堆叠，体验差
- 随机槽位：不符合玩家预期

### 5. 背包 UI 实现方案

**Decision**: 使用原生 DOM 创建模态背包界面

**Rationale**:
- 与现有 UI 系统（SavePanel, BlockSelector）风格一致
- 使用 CSS Grid 布局 9 列网格
- 拖拽使用 HTML5 Drag and Drop API
- 打开时暂停游戏输入（解锁鼠标指针）

**Alternatives Considered**:
- Canvas 绘制：更灵活但实现复杂
- Three.js UI：与 DOM 混合渲染有层级问题

### 6. 快捷栏与方块选择器整合

**Decision**: 重构 BlockSelector 为 HotbarUI，显示背包前 9 格

**Rationale**:
- 现有 BlockSelector 显示所有方块类型，需改为显示背包物品
- 保留数字键 1-9 和滚轮切换功能
- 显示物品图标（使用方块纹理）和堆叠数量
- 当前选中槽位高亮显示

**Alternatives Considered**:
- 保留 BlockSelector 并新增 HotbarUI：两套系统冲突
- 完全移除方块选择：创造模式需要，暂时保留切换机制

### 7. 存档系统集成

**Decision**: 在 PlayerState 中添加 inventory 字段

**Rationale**:
- 现有 SaveData 结构包含 playerState
- 添加 inventory: Array<{itemType: number | null, count: number}>
- 自动存档和手动存档都会保存背包数据
- 加载存档时恢复背包状态

**Alternatives Considered**:
- 单独存储背包：增加存储复杂度
- 不保存背包：游戏体验差

### 8. 拾取音效实现

**Decision**: 在 SynthAudio 中添加程序化拾取音效

**Rationale**:
- 与现有音效系统一致（程序化合成）
- 音效特征：短促的上升音调（类似 Minecraft "pop" 声）
- 频率：800Hz → 1200Hz，持续 0.1 秒
- 通过 AudioManager.playSound('pickup') 调用

**Alternatives Considered**:
- 加载音频文件：增加资源体积
- 无音效：反馈不足

### 9. 物品实体生命周期

**Decision**: 5 分钟后自动消失，岩浆中立即销毁

**Rationale**:
- 每个 ItemEntity 记录 spawnTime
- update() 中检查存活时间，超过 300 秒则 dispose()
- 检测脚下方块，如果是岩浆则立即销毁
- 水中正常存在但下沉速度减慢

**Alternatives Considered**:
- 永不消失：内存泄漏风险
- 更短时间：玩家可能来不及拾取

### 10. 性能优化策略

**Decision**: 实例化渲染 + 区块卸载时清理

**Rationale**:
- 同类物品实体使用 InstancedMesh 批量渲染
- 区块卸载时，其中的物品实体一并移除
- 限制同屏物品实体数量（最多 500 个）
- 超出限制时移除最老的物品实体

**Alternatives Considered**:
- 每个物品单独 Mesh：Draw Call 过多
- 不限制数量：可能导致性能问题
