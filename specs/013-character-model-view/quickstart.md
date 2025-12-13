# Quickstart: 人物模型与视角切换系统

**Feature**: 013-character-model-view  
**Date**: 2025-12-13

## 快速开始

### 1. 视角切换

游戏中按 **V 键** 切换第一人称/第三人称视角。

```typescript
// 在 InputManager 中添加 V 键监听
inputManager.onKeyDown('KeyV', () => {
  cameraController.toggleViewMode()
})
```

### 2. 创建角色模型

```typescript
import { ModelLibrary } from './player/CharacterModelLibrary'
import { CharacterModel } from './player/CharacterModel'

// 获取模型库实例
const library = ModelLibrary.getInstance()

// 获取所有可用模型
const models = library.getAvailableModels()
console.log('可用模型:', models.map(m => m.name))

// 创建模型实例
const model = library.createModelInstance('steve')

// 添加到场景
scene.add(model.mesh)

// 更新模型位置（每帧）
model.updateTransform(player.position, player.rotation)
```

### 3. 使用摄像机控制器

```typescript
import { CameraController, ViewMode } from './renderer/CameraController'

// 创建控制器
const cameraController = new CameraController(camera, player, world)

// 设置初始视角
cameraController.setViewMode(ViewMode.FIRST_PERSON)

// 游戏循环中更新
function gameLoop(deltaTime: number) {
  cameraController.update(deltaTime)
}

// 切换视角
cameraController.toggleViewMode()

// 检查当前模式
if (cameraController.currentMode === ViewMode.THIRD_PERSON) {
  // 显示角色模型
  characterModel.visible = true
}
```

### 4. 保存/加载玩家偏好

```typescript
import { PreferenceManager } from './player/PreferenceManager'

const prefManager = new PreferenceManager()

// 保存选择
prefManager.savePreference('knight')

// 加载选择
const pref = prefManager.getPreference()
if (pref) {
  const model = library.createModelInstance(pref.selectedModelId)
}
```

### 5. 显示角色选择界面

```typescript
import { CharacterSelectUI } from './ui/CharacterSelectUI'

const selectUI = new CharacterSelectUI(library)

selectUI.show({
  onConfirm: (modelId) => {
    console.log('选择了:', modelId)
    prefManager.savePreference(modelId)
    selectUI.hide()
  },
  onCancel: () => {
    selectUI.hide()
  }
})
```

## 文件结构

```
src/
├── player/
│   ├── CharacterModel.ts         # 角色模型类
│   ├── CharacterModelLibrary.ts  # 模型库管理
│   └── PreferenceManager.ts      # 偏好设置管理
├── renderer/
│   ├── CameraController.ts       # 摄像机控制器
│   └── ThirdPersonCamera.ts      # 第三人称摄像机逻辑
├── ui/
│   ├── CharacterSelectUI.ts      # 角色选择界面
│   └── CharacterPreview.ts       # 模型预览
└── models/
    └── blockman/                 # 方块人模型定义
        ├── default.ts
        ├── steve.ts
        ├── alex.ts
        ├── knight.ts
        └── wizard.ts
```

## 关键常量

| 常量 | 值 | 说明 |
|------|-----|------|
| `DEFAULT_THIRD_PERSON_DISTANCE` | 5 | 默认摄像机距离（米） |
| `VIEW_TRANSITION_DURATION` | 0.3 | 视角切换时间（秒） |
| `MIN_CAMERA_DISTANCE` | 1 | 最小摄像机距离（米） |
| `MAX_CAMERA_DISTANCE` | 10 | 最大摄像机距离（米） |
| `CAMERA_HEIGHT_OFFSET` | 2 | 摄像机高度偏移（米） |

## 测试验证

### 视角切换测试
1. 进入游戏，默认为第一人称视角
2. 按 V 键，摄像机平滑移动到角色身后 5 米
3. 角色模型可见
4. 再按 V 键，返回第一人称

### 摄像机碰撞测试
1. 第三人称视角下靠近墙壁
2. 摄像机自动拉近，不穿透墙壁
3. 离开墙壁后摄像机恢复正常距离

### 角色选择测试
1. 主菜单点击"选择角色"
2. 浏览 5 个预设模型
3. 点击模型查看预览
4. 确认选择，进入游戏后使用该模型
