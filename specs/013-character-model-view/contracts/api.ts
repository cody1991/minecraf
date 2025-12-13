/**
 * API Contracts: 人物模型与视角切换系统
 * Feature: 013-character-model-view
 * 
 * 本文件定义模块间的接口契约，用于指导实现和测试。
 */

import * as THREE from 'three'

// ============================================================================
// 枚举与常量
// ============================================================================

/**
 * 视角模式
 */
export enum ViewMode {
  FIRST_PERSON = 'first_person',
  THIRD_PERSON = 'third_person'
}

/**
 * 角色动画类型
 */
export type CharacterAnimation = 'idle' | 'walk' | 'jump'

/**
 * 模型风格类型
 */
export type ModelStyle = 'blockman' | 'custom'

// ============================================================================
// 接口定义
// ============================================================================

/**
 * 角色颜色配置
 */
export interface CharacterColors {
  head: number
  body: number
  arms: number
  legs: number
  eyes?: number
}

/**
 * 角色模型定义
 */
export interface CharacterModelDefinition {
  id: string
  name: string
  style: ModelStyle
  isDefault: boolean
  colors: CharacterColors
  thumbnailUrl?: string
}

/**
 * 玩家偏好设置
 */
export interface PlayerPreference {
  selectedModelId: string
  savedAt: number
}

// ============================================================================
// 模型库接口
// ============================================================================

/**
 * 模型库接口
 */
export interface IModelLibrary {
  /**
   * 获取所有可用模型定义
   */
  getAvailableModels(): CharacterModelDefinition[]

  /**
   * 根据 ID 获取模型定义
   * @param id 模型 ID
   * @returns 模型定义，如果不存在返回 undefined
   */
  getModelById(id: string): CharacterModelDefinition | undefined

  /**
   * 获取默认模型定义
   */
  getDefaultModel(): CharacterModelDefinition

  /**
   * 创建模型实例
   * @param id 模型 ID
   * @returns 角色模型实例
   */
  createModelInstance(id: string): ICharacterModel
}

// ============================================================================
// 角色模型接口
// ============================================================================

/**
 * 角色模型接口
 */
export interface ICharacterModel {
  /**
   * 模型定义
   */
  readonly definition: CharacterModelDefinition

  /**
   * Three.js 网格组
   */
  readonly mesh: THREE.Group

  /**
   * 模型可见性
   */
  visible: boolean

  /**
   * 更新模型变换
   * @param position 世界位置
   * @param rotation 旋转
   */
  updateTransform(position: THREE.Vector3, rotation: THREE.Euler): void

  /**
   * 播放动画
   * @param name 动画名称
   */
  playAnimation(name: CharacterAnimation): void

  /**
   * 销毁模型资源
   */
  dispose(): void
}

// ============================================================================
// 摄像机控制器接口
// ============================================================================

/**
 * 摄像机控制器接口
 */
export interface ICameraController {
  /**
   * 当前视角模式
   */
  readonly currentMode: ViewMode

  /**
   * 第三人称摄像机距离（米）
   */
  thirdPersonDistance: number

  /**
   * 是否正在过渡中
   */
  readonly isTransitioning: boolean

  /**
   * 切换视角模式
   */
  toggleViewMode(): void

  /**
   * 设置视角模式
   * @param mode 目标视角模式
   */
  setViewMode(mode: ViewMode): void

  /**
   * 更新摄像机状态
   * @param deltaTime 帧间隔时间（秒）
   */
  update(deltaTime: number): void
}

// ============================================================================
// 偏好设置管理接口
// ============================================================================

/**
 * 偏好设置管理接口
 */
export interface IPreferenceManager {
  /**
   * 获取保存的偏好设置
   * @returns 偏好设置，如果不存在返回 null
   */
  getPreference(): PlayerPreference | null

  /**
   * 保存偏好设置
   * @param modelId 选中的模型 ID
   */
  savePreference(modelId: string): void

  /**
   * 清除偏好设置
   */
  clearPreference(): void
}

// ============================================================================
// 角色选择 UI 接口
// ============================================================================

/**
 * 角色选择 UI 事件
 */
export interface CharacterSelectEvents {
  /**
   * 模型选择确认
   * @param modelId 选中的模型 ID
   */
  onConfirm: (modelId: string) => void

  /**
   * 取消选择
   */
  onCancel: () => void
}

/**
 * 角色选择 UI 接口
 */
export interface ICharacterSelectUI {
  /**
   * 显示角色选择界面
   * @param events 事件回调
   */
  show(events: CharacterSelectEvents): void

  /**
   * 隐藏角色选择界面
   */
  hide(): void

  /**
   * 界面是否可见
   */
  readonly isVisible: boolean

  /**
   * 销毁 UI 资源
   */
  dispose(): void
}

// ============================================================================
// 常量
// ============================================================================

/**
 * 默认第三人称摄像机距离（米）
 */
export const DEFAULT_THIRD_PERSON_DISTANCE = 5

/**
 * 视角切换过渡时间（秒）
 */
export const VIEW_TRANSITION_DURATION = 0.3

/**
 * 摄像机最小距离（米）
 */
export const MIN_CAMERA_DISTANCE = 1

/**
 * 摄像机最大距离（米）
 */
export const MAX_CAMERA_DISTANCE = 10

/**
 * 摄像机高度偏移（米）
 */
export const CAMERA_HEIGHT_OFFSET = 2

/**
 * 本地存储键名
 */
export const PREFERENCE_STORAGE_KEY = 'webcraft_selected_character'
