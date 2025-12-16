# Quickstart: 食物系统

**Feature**: 021-food-system  
**Date**: 2025-12-16

## 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck
```

## 文件结构

### 新建文件

| 文件 | 描述 |
|------|------|
| `src/combat/CombatSystem.ts` | 战斗系统核心逻辑 |
| `src/combat/CombatConstants.ts` | 战斗常量定义 |
| `src/survival/EatingSystem.ts` | 进食系统核心逻辑 |
| `src/survival/EatingConstants.ts` | 进食常量定义 |
| `src/ui/EatingProgressUI.ts` | 进食进度条 UI |

### 修改文件

| 文件 | 修改内容 |
|------|----------|
| `src/core/Block.ts` | 添加 5 种食物 BlockType |
| `src/survival/FoodRegistry.ts` | 关联 FoodType 到 BlockType |
| `src/survival/SurvivalManager.ts` | 集成 EatingSystem |
| `src/entities/EntityManager.ts` | 处理食物掉落物生成 |
| `src/renderer/TextureAtlas.ts` | 添加食物纹理 |
| `src/audio/AudioManager.ts` | 添加攻击/进食音效 |
| `src/core/Game.ts` | 集成 CombatSystem |
| `src/input/InputManager.ts` | 添加攻击/进食输入处理 |

## 实现顺序

### Phase 1: 基础设施

1. **添加食物 BlockType** (`Block.ts`)
   - 添加 RAW_BEEF, RAW_PORKCHOP, RAW_MUTTON, RAW_CHICKEN, RAW_RABBIT
   - 添加对应的颜色定义

2. **添加食物纹理** (`TextureAtlas.ts`)
   - 为每种食物生成程序化纹理
   - 使用鲜明的颜色区分

3. **更新 FoodRegistry** (`FoodRegistry.ts`)
   - 将 FoodType 关联到正确的 BlockType

### Phase 2: 攻击系统

4. **创建 CombatConstants** (`combat/CombatConstants.ts`)
   ```typescript
   export const ATTACK_DAMAGE = 3
   export const ATTACK_RANGE = 3.0
   export const ATTACK_COOLDOWN = 0.5
   ```

5. **创建 CombatSystem** (`combat/CombatSystem.ts`)
   - 射线检测动物
   - 调用 `animal.takeDamage()`
   - 播放攻击音效

6. **集成到 Game** (`Game.ts`)
   - 左键点击时调用 CombatSystem.attack()

### Phase 3: 食物掉落

7. **处理动物死亡** (`EntityManager.ts`)
   - 监听 animal.onDeathCallback
   - 创建 ItemEntity 掉落物
   - 使用正确的食物 BlockType

### Phase 4: 进食系统

8. **创建 EatingConstants** (`survival/EatingConstants.ts`)
   ```typescript
   export const EATING_DURATION = 1.5
   export const EATING_CANCEL_MOVE_THRESHOLD = 0.1
   ```

9. **创建 EatingSystem** (`survival/EatingSystem.ts`)
   - 状态机: IDLE → EATING → COMPLETED
   - 进度追踪
   - 中断检测

10. **创建 EatingProgressUI** (`ui/EatingProgressUI.ts`)
    - 进度条显示
    - 食物图标

11. **集成到 SurvivalManager** (`SurvivalManager.ts`)
    - 更新 EatingSystem
    - 处理饥饿值恢复

### Phase 5: 音效

12. **添加音效** (`AudioManager.ts`)
    - 攻击命中音效
    - 进食咀嚼音效
    - 进食完成音效

## 测试检查点

### 攻击动物
- [ ] 左键点击动物，动物显示红色闪烁
- [ ] 多次攻击后动物死亡
- [ ] 狼/狐狸死亡不掉落食物
- [ ] 牛/猪/羊/鸡/兔子死亡掉落对应食物

### 拾取食物
- [ ] 靠近食物自动拾取
- [ ] 食物添加到物品栏
- [ ] 同类型食物堆叠
- [ ] 物品栏满时不拾取

### 食用食物
- [ ] 选中食物按住右键开始进食
- [ ] 进度条显示
- [ ] 1.5 秒后完成进食
- [ ] 饥饿值恢复
- [ ] 食物数量减 1
- [ ] 松开右键取消进食
- [ ] 饥饿值满时无法进食

## 常见问题

### Q: 食物纹理不显示？
检查 `TextureAtlas.ts` 中是否正确添加了食物纹理生成逻辑。

### Q: 攻击无法命中动物？
检查射线检测是否正确获取动物的包围盒，以及攻击距离是否正确。

### Q: 进食无法恢复饥饿值？
检查 `PlayerStats.addHunger()` 方法是否被正确调用。
