/**
 * Save UI API Contract
 * Feature: 018-world-save-system
 * 
 * 定义存档 UI 组件的公共接口。
 */

import type { SaveMetadata, SaveResult } from './save-manager-api'

// ============================================================================
// SavePanel Interface
// ============================================================================

export interface ISavePanel {
  /**
   * 显示存档面板
   */
  show(): void

  /**
   * 隐藏存档面板
   */
  hide(): void

  /**
   * 切换面板显示状态
   */
  toggle(): void

  /**
   * 刷新存档列表
   */
  refresh(): Promise<void>

  /**
   * 销毁面板
   */
  dispose(): void

  /**
   * 设置保存回调
   */
  onSave(callback: (slotNumber: number, name: string) => Promise<SaveResult>): void

  /**
   * 设置加载回调
   */
  onLoad(callback: (saveId: string) => Promise<void>): void

  /**
   * 设置删除回调
   */
  onDelete(callback: (saveId: string) => Promise<boolean>): void

  /**
   * 设置重命名回调
   */
  onRename(callback: (saveId: string, newName: string) => Promise<boolean>): void
}

// ============================================================================
// SaveSlotItem Interface
// ============================================================================

export interface ISaveSlotItem {
  /** 槽位编号 */
  slotNumber: number

  /** 当前存档数据（如果有） */
  saveData: SaveMetadata | null

  /** 是否为自动存档槽位 */
  isAutoSlot: boolean

  /**
   * 更新显示数据
   */
  update(saveData: SaveMetadata | null): void

  /**
   * 获取 DOM 元素
   */
  getElement(): HTMLElement

  /**
   * 销毁组件
   */
  dispose(): void
}

// ============================================================================
// ConfirmDialog Interface
// ============================================================================

export interface IConfirmDialog {
  /**
   * 显示确认对话框
   * @param options 对话框选项
   * @returns Promise<boolean> 用户是否确认
   */
  show(options: ConfirmDialogOptions): Promise<boolean>

  /**
   * 关闭对话框
   */
  close(): void
}

export interface ConfirmDialogOptions {
  /** 标题 */
  title: string

  /** 消息内容 */
  message: string

  /** 确认按钮文本 */
  confirmText?: string

  /** 取消按钮文本 */
  cancelText?: string

  /** 是否为危险操作（删除等） */
  isDanger?: boolean
}

// ============================================================================
// Toast Notification Interface
// ============================================================================

export interface IToast {
  /**
   * 显示提示消息
   * @param message 消息内容
   * @param type 消息类型
   * @param duration 显示时长（毫秒）
   */
  show(message: string, type?: 'success' | 'error' | 'info', duration?: number): void
}

// ============================================================================
// UI State
// ============================================================================

export interface SavePanelState {
  /** 面板是否可见 */
  isVisible: boolean

  /** 是否正在加载 */
  isLoading: boolean

  /** 当前操作中的槽位 */
  activeSlot: number | null

  /** 存档列表 */
  saves: SaveMetadata[]

  /** 错误信息 */
  error: string | null
}

// ============================================================================
// UI Events
// ============================================================================

export interface SaveUIEvents {
  /** 面板打开 */
  'panel:open': void

  /** 面板关闭 */
  'panel:close': void

  /** 用户点击保存 */
  'slot:save': { slotNumber: number; name: string }

  /** 用户点击加载 */
  'slot:load': { saveId: string }

  /** 用户点击删除 */
  'slot:delete': { saveId: string }

  /** 用户点击重命名 */
  'slot:rename': { saveId: string; newName: string }
}
