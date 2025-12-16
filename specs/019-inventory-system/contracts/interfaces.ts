/**
 * 物品与背包系统 - 接口定义
 * Feature: 019-inventory-system
 */

import { BlockType } from '../../../src/core/Block';
import { Vector3 } from 'three';

// ============================================================================
// Item Slot
// ============================================================================

/**
 * 物品槽接口
 */
export interface IItemSlot {
  /** 物品类型，null 表示空槽 */
  itemType: BlockType | null;
  /** 堆叠数量 (0-64) */
  count: number;
}

/**
 * 可序列化的物品槽（用于存档）
 */
export interface IItemSlotSerialized {
  itemType: number | null;
  count: number;
}

// ============================================================================
// Inventory
// ============================================================================

/**
 * 背包接口
 */
export interface IInventory {
  /** 36 个物品槽位 */
  readonly slots: readonly IItemSlot[];
  /** 当前选中的快捷栏槽位 (0-8) */
  selectedSlot: number;

  /**
   * 添加物品到背包
   * @param itemType 物品类型
   * @param count 数量
   * @returns 实际添加的数量（背包满时可能小于请求数量）
   */
  addItem(itemType: BlockType, count: number): number;

  /**
   * 从指定槽位移除物品
   * @param slotIndex 槽位索引
   * @param count 数量
   * @returns 实际移除的数量
   */
  removeItem(slotIndex: number, count: number): number;

  /**
   * 交换两个槽位的物品
   * @param fromIndex 源槽位
   * @param toIndex 目标槽位
   */
  swapSlots(fromIndex: number, toIndex: number): void;

  /**
   * 获取指定槽位的物品
   * @param slotIndex 槽位索引
   */
  getSlot(slotIndex: number): IItemSlot;

  /**
   * 检查背包是否已满
   */
  isFull(): boolean;

  /**
   * 获取当前选中槽位的物品
   */
  getSelectedItem(): IItemSlot;

  /**
   * 序列化为可存储格式
   */
  serialize(): IInventoryState;

  /**
   * 从存储格式恢复
   */
  deserialize(state: IInventoryState): void;
}

/**
 * 背包状态（用于存档）
 */
export interface IInventoryState {
  slots: IItemSlotSerialized[];
  selectedSlot: number;
}

// ============================================================================
// Item Entity
// ============================================================================

/**
 * 物品实体状态
 */
export enum ItemEntityState {
  Falling = 'falling',
  Bouncing = 'bouncing',
  Resting = 'resting',
  BeingPickedUp = 'beingPickedUp',
}

/**
 * 物品实体接口
 */
export interface IItemEntity {
  /** 唯一标识符 */
  readonly id: string;
  /** 世界坐标位置 */
  position: Vector3;
  /** 速度向量 */
  velocity: Vector3;
  /** 物品类型 */
  readonly itemType: BlockType;
  /** 堆叠数量 */
  count: number;
  /** 生成时间戳 */
  readonly spawnTime: number;
  /** 当前状态 */
  state: ItemEntityState;

  /**
   * 更新物品实体
   * @param deltaTime 帧间隔时间（秒）
   */
  update(deltaTime: number): void;

  /**
   * 开始被玩家吸引
   * @param playerPosition 玩家位置
   */
  startPickup(playerPosition: Vector3): void;

  /**
   * 检查是否应该被销毁
   */
  shouldDestroy(): boolean;

  /**
   * 获取 3D 网格对象
   */
  getMesh(): THREE.Object3D;

  /**
   * 销毁并清理资源
   */
  dispose(): void;
}

// ============================================================================
// Events
// ============================================================================

/**
 * 物品拾取事件
 */
export interface ItemPickupEvent {
  itemType: BlockType;
  count: number;
  position: Vector3;
}

/**
 * 背包变更事件
 */
export interface InventoryChangeEvent {
  slotIndex: number;
  oldItem: IItemSlot;
  newItem: IItemSlot;
}

/**
 * 快捷栏选择变更事件
 */
export interface HotbarSelectionEvent {
  oldSlot: number;
  newSlot: number;
}

// ============================================================================
// UI Interfaces
// ============================================================================

/**
 * 快捷栏 UI 接口
 */
export interface IHotbarUI {
  /**
   * 更新显示
   * @param inventory 背包实例
   */
  update(inventory: IInventory): void;

  /**
   * 设置选中槽位
   * @param slotIndex 槽位索引 (0-8)
   */
  setSelectedSlot(slotIndex: number): void;

  /**
   * 显示/隐藏
   */
  setVisible(visible: boolean): void;
}

/**
 * 背包 UI 接口
 */
export interface IInventoryUI {
  /**
   * 打开背包界面
   * @param inventory 背包实例
   */
  open(inventory: IInventory): void;

  /**
   * 关闭背包界面
   */
  close(): void;

  /**
   * 是否已打开
   */
  isOpen(): boolean;

  /**
   * 更新显示
   */
  update(): void;
}

// ============================================================================
// Constants
// ============================================================================

export const INVENTORY_CONSTANTS = {
  /** 背包总槽位数 */
  TOTAL_SLOTS: 36,
  /** 快捷栏槽位数 */
  HOTBAR_SLOTS: 9,
  /** 存储格槽位数 */
  STORAGE_SLOTS: 27,
  /** 最大堆叠数量 */
  MAX_STACK_SIZE: 64,
  /** 物品拾取范围（格） */
  PICKUP_RANGE: 2,
  /** 物品吸引速度（格/秒） */
  PICKUP_SPEED: 8,
  /** 物品消失时间（秒） */
  DESPAWN_TIME: 300,
  /** 物品实体尺寸 */
  ITEM_SIZE: 0.25,
  /** 最大弹跳次数 */
  MAX_BOUNCES: 3,
  /** 弹跳系数 */
  BOUNCE_FACTOR: 0.4,
  /** 初始弹跳速度 */
  INITIAL_BOUNCE_VELOCITY: 0.15,
} as const;
