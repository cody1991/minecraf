# Data Model: 人物模型与视角切换系统

**Feature**: 013-character-model-view  
**Date**: 2025-12-13

## Entities

### ViewMode (枚举)

视角模式状态。

```typescript
enum ViewMode {
  FIRST_PERSON = 'first_person',
  THIRD_PERSON = 'third_person'
}
```

### CharacterModelDefinition (接口)

角色模型定义，描述模型的元数据和外观配置。

```typescript
interface CharacterModelDefinition {
  /** 唯一标识符 */
  id: string
  
  /** 显示名称 */
  name: string
  
  /** 模型风格分类 */
  style: 'blockman' | 'custom'
  
  /** 是否为默认模型 */
  isDefault: boolean
  
  /** 身体部位颜色配置 */
  colors: CharacterColors
  
  /** 缩略图（可选，用于 UI 显示） */
  thumbnailUrl?: string
}

interface CharacterColors {
  head: number      // 头部颜色 (hex)
  body: number      // 身体颜色 (hex)
  arms: number      // 手臂颜色 (hex)
  legs: number      // 腿部颜色 (hex)
  eyes?: number     // 眼睛颜色 (hex, 可选)
}
```

### CharacterModel (类)

运行时角色模型实例，包含 Three.js 网格对象。

```typescript
class CharacterModel {
  /** 模型定义 */
  readonly definition: CharacterModelDefinition
  
  /** Three.js 组对象（包含所有身体部位） */
  readonly mesh: THREE.Group
  
  /** 身体部位引用 */
  readonly parts: {
    head: THREE.Mesh
    body: THREE.Mesh
    leftArm: THREE.Mesh
    rightArm: THREE.Mesh
    leftLeg: THREE.Mesh
    rightLeg: THREE.Mesh
  }
  
  /** 模型可见性 */
  visible: boolean
  
  /** 更新模型位置和旋转 */
  updateTransform(position: THREE.Vector3, rotation: THREE.Euler): void
  
  /** 播放动画（行走、待机等） */
  playAnimation(name: 'idle' | 'walk' | 'jump'): void
  
  /** 销毁模型资源 */
  dispose(): void
}
```

### ModelLibrary (类)

模型库管理器，管理所有可用角色模型。

```typescript
class ModelLibrary {
  /** 所有已注册的模型定义 */
  private models: Map<string, CharacterModelDefinition>
  
  /** 获取所有可用模型 */
  getAvailableModels(): CharacterModelDefinition[]
  
  /** 根据 ID 获取模型定义 */
  getModelById(id: string): CharacterModelDefinition | undefined
  
  /** 获取默认模型 */
  getDefaultModel(): CharacterModelDefinition
  
  /** 注册新模型 */
  registerModel(definition: CharacterModelDefinition): void
  
  /** 创建模型实例 */
  createModelInstance(id: string): CharacterModel
}
```

### PlayerPreference (接口)

玩家偏好设置。

```typescript
interface PlayerPreference {
  /** 选中的角色模型 ID */
  selectedModelId: string
  
  /** 上次保存时间 */
  savedAt: number
}
```

### CameraController (类)

摄像机控制器，管理视角切换。

```typescript
class CameraController {
  /** 当前视角模式 */
  currentMode: ViewMode
  
  /** 第三人称摄像机距离 */
  thirdPersonDistance: number  // 默认 5 米
  
  /** 是否正在过渡 */
  isTransitioning: boolean
  
  /** 切换视角 */
  toggleViewMode(): void
  
  /** 设置视角模式 */
  setViewMode(mode: ViewMode): void
  
  /** 更新摄像机（每帧调用） */
  update(deltaTime: number, player: Player, world: World): void
  
  /** 处理摄像机碰撞 */
  private handleCameraCollision(targetPos: THREE.Vector3): THREE.Vector3
}
```

## Relationships

```
┌─────────────────┐     1:N     ┌──────────────────────────┐
│  ModelLibrary   │────────────▶│ CharacterModelDefinition │
└─────────────────┘             └──────────────────────────┘
        │                                   │
        │ creates                           │ instantiates
        ▼                                   ▼
┌─────────────────┐             ┌──────────────────────────┐
│ CharacterModel  │◀────────────│         Player           │
└─────────────────┘   has one   └──────────────────────────┘
                                            │
                                            │ observed by
                                            ▼
                                ┌──────────────────────────┐
                                │    CameraController      │
                                └──────────────────────────┘
                                            │
                                            │ controls
                                            ▼
                                ┌──────────────────────────┐
                                │   THREE.PerspectiveCamera │
                                └──────────────────────────┘
```

## State Transitions

### ViewMode 状态转换

```
                    ┌─────────────────┐
                    │  FIRST_PERSON   │
                    └────────┬────────┘
                             │
                             │ V 键按下
                             │ (0.3s 过渡)
                             ▼
                    ┌─────────────────┐
                    │  THIRD_PERSON   │
                    └────────┬────────┘
                             │
                             │ V 键按下
                             │ (0.3s 过渡)
                             ▼
                    ┌─────────────────┐
                    │  FIRST_PERSON   │
                    └─────────────────┘
```

### 角色选择流程

```
┌──────────┐    点击选择角色    ┌────────────────┐
│ 主菜单   │──────────────────▶│ 角色选择界面   │
└──────────┘                   └───────┬────────┘
     ▲                                 │
     │                                 │ 点击模型
     │                                 ▼
     │                         ┌────────────────┐
     │                         │ 模型预览中     │
     │                         └───────┬────────┘
     │                                 │
     │ 取消                            │ 确认
     │◀────────────────────────────────┤
     │                                 │
     │                                 ▼
     │                         ┌────────────────┐
     └─────────────────────────│ 保存到本地存储 │
                               └────────────────┘
```

## Validation Rules

1. **模型 ID 唯一性**: 每个 CharacterModelDefinition 的 id 必须唯一
2. **默认模型存在**: ModelLibrary 必须至少包含一个 isDefault=true 的模型
3. **颜色值范围**: CharacterColors 的颜色值必须是有效的 hex 颜色 (0x000000 - 0xFFFFFF)
4. **距离范围**: thirdPersonDistance 必须在 1-10 米范围内
5. **过渡时间**: 视角切换过渡时间固定为 0.3 秒

## Preset Models (Initial)

| ID | 名称 | 风格 | 默认 | 主色调 |
|----|------|------|------|--------|
| `default` | 默认角色 | blockman | ✅ | 灰色 |
| `steve` | Steve | blockman | ❌ | 蓝色衬衫 |
| `alex` | Alex | blockman | ❌ | 绿色衬衫 |
| `knight` | 骑士 | blockman | ❌ | 银色盔甲 |
| `wizard` | 法师 | blockman | ❌ | 紫色长袍 |
