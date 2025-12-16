/**
 * Inventory Constants
 * Feature: 019-inventory-system
 * 
 * Defines constants for the inventory and item system.
 */

import { BlockType } from '../core/Block'

// ============================================================================
// Inventory Constants
// ============================================================================

/** Total number of inventory slots */
export const INVENTORY_TOTAL_SLOTS = 36

/** Number of hotbar slots */
export const HOTBAR_SLOTS = 9

/** Number of storage slots (non-hotbar) */
export const STORAGE_SLOTS = 27

/** Maximum stack size for items */
export const MAX_STACK_SIZE = 64

// ============================================================================
// Item Entity Constants
// ============================================================================

/** Item pickup range in blocks */
export const ITEM_PICKUP_RANGE = 2

/** Item attraction speed in blocks per second */
export const ITEM_PICKUP_SPEED = 8

/** Item despawn time in seconds (5 minutes) */
export const ITEM_DESPAWN_TIME = 300

/** Item entity size (fraction of a block) */
export const ITEM_ENTITY_SIZE = 0.25

/** Maximum number of bounces before item settles */
export const ITEM_MAX_BOUNCES = 3

/** Bounce coefficient (velocity retained after bounce) */
export const ITEM_BOUNCE_FACTOR = 0.4

/** Initial bounce velocity when item spawns */
export const ITEM_INITIAL_BOUNCE_VELOCITY = 0.15

/** Item rotation speed in radians per second */
export const ITEM_ROTATION_SPEED = Math.PI // 180 degrees per second

/** Gravity acceleration for items */
export const ITEM_GRAVITY = 20

/** Maximum item entities in the world */
export const MAX_ITEM_ENTITIES = 500

// ============================================================================
// Item Slot Interface
// ============================================================================

/**
 * Represents a single slot in the inventory
 */
export interface ItemSlot {
  /** Item type, null if slot is empty */
  itemType: BlockType | null
  /** Stack count (0-64), 0 if empty */
  count: number
}

/**
 * Serialized item slot for save data
 */
export interface ItemSlotSerialized {
  itemType: number | null
  count: number
}

/**
 * Inventory state for save/load
 */
export interface InventoryState {
  slots: ItemSlotSerialized[]
  selectedSlot: number
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create an empty item slot
 */
export function createEmptySlot(): ItemSlot {
  return { itemType: null, count: 0 }
}

/**
 * Check if a slot is empty
 */
export function isSlotEmpty(slot: ItemSlot): boolean {
  return slot.itemType === null || slot.count === 0
}

/**
 * Check if two slots have the same item type
 */
export function isSameItemType(slot1: ItemSlot, slot2: ItemSlot): boolean {
  return slot1.itemType !== null && slot1.itemType === slot2.itemType
}

/**
 * Check if a slot can accept more items of the given type
 */
export function canStackItem(slot: ItemSlot, itemType: BlockType): boolean {
  if (isSlotEmpty(slot)) return true
  return slot.itemType === itemType && slot.count < MAX_STACK_SIZE
}

/**
 * Get remaining capacity for a slot
 */
export function getSlotCapacity(slot: ItemSlot, itemType: BlockType): number {
  if (isSlotEmpty(slot)) return MAX_STACK_SIZE
  if (slot.itemType !== itemType) return 0
  return MAX_STACK_SIZE - slot.count
}
