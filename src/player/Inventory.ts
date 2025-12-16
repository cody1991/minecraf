/**
 * Inventory - Player inventory management
 * Feature: 019-inventory-system
 * 
 * Manages 36 inventory slots (9 hotbar + 27 storage).
 * Supports item stacking, swapping, and serialization.
 */

import { BlockType } from '../core/Block'
import {
  INVENTORY_TOTAL_SLOTS,
  HOTBAR_SLOTS,
  MAX_STACK_SIZE,
  ItemSlot,
  InventoryState,
  createEmptySlot,
  isSlotEmpty,
  canStackItem
} from './InventoryConstants'

/**
 * Player inventory class
 */
export class Inventory {
  /** 36 inventory slots */
  private _slots: ItemSlot[]
  
  /** Currently selected hotbar slot (0-8) */
  private _selectedSlot: number = 0

  /** Callback when inventory changes */
  private onChangeCallback: (() => void) | null = null
  
  /** Callback when selection changes (Feature: 023-hand-item-attack-animation) */
  private onSelectionChangeCallback: (() => void) | null = null
  
  /** Callback when inventory content changes (Feature: 023-hand-item-attack-animation) */
  private onInventoryChangeCallback: (() => void) | null = null

  constructor() {
    // Initialize all slots as empty
    this._slots = Array.from({ length: INVENTORY_TOTAL_SLOTS }, () => createEmptySlot())
  }

  /**
   * Get all slots (read-only)
   */
  get slots(): readonly ItemSlot[] {
    return this._slots
  }

  /**
   * Get selected hotbar slot index
   */
  get selectedSlot(): number {
    return this._selectedSlot
  }

  /**
   * Set selected hotbar slot index
   */
  set selectedSlot(index: number) {
    if (index >= 0 && index < HOTBAR_SLOTS) {
      this._selectedSlot = index
      this.notifyChange()
      this.notifySelectionChange()
    }
  }

  /**
   * Set change callback
   */
  setOnChange(callback: () => void): void {
    this.onChangeCallback = callback
  }
  
  /**
   * Set selection change callback (Feature: 023-hand-item-attack-animation)
   */
  setOnSelectionChange(callback: () => void): void {
    this.onSelectionChangeCallback = callback
  }
  
  /**
   * Set inventory change callback (Feature: 023-hand-item-attack-animation)
   */
  setOnInventoryChange(callback: () => void): void {
    this.onInventoryChangeCallback = callback
  }

  /**
   * Notify listeners of inventory change
   */
  private notifyChange(): void {
    if (this.onChangeCallback) {
      this.onChangeCallback()
    }
  }
  
  /**
   * Notify listeners of selection change (Feature: 023-hand-item-attack-animation)
   */
  private notifySelectionChange(): void {
    if (this.onSelectionChangeCallback) {
      this.onSelectionChangeCallback()
    }
  }
  
  /**
   * Notify listeners of inventory content change (Feature: 023-hand-item-attack-animation)
   */
  private notifyInventoryChange(): void {
    if (this.onInventoryChangeCallback) {
      this.onInventoryChangeCallback()
    }
  }

  /**
   * Add items to inventory
   * Prioritizes stacking with existing items, then fills empty slots
   * @param itemType Type of item to add
   * @param count Number of items to add
   * @returns Number of items actually added (may be less if inventory is full)
   */
  addItem(itemType: BlockType, count: number): number {
    if (count <= 0) return 0
    if (itemType === BlockType.AIR) return 0

    let remaining = count
    let added = 0

    // First pass: try to stack with existing items in hotbar (0-8)
    for (let i = 0; i < HOTBAR_SLOTS && remaining > 0; i++) {
      const slot = this._slots[i]!
      if (slot.itemType === itemType && slot.count < MAX_STACK_SIZE) {
        const canAdd = Math.min(remaining, MAX_STACK_SIZE - slot.count)
        slot.count += canAdd
        remaining -= canAdd
        added += canAdd
      }
    }

    // Second pass: try to stack with existing items in storage (9-35)
    for (let i = HOTBAR_SLOTS; i < INVENTORY_TOTAL_SLOTS && remaining > 0; i++) {
      const slot = this._slots[i]!
      if (slot.itemType === itemType && slot.count < MAX_STACK_SIZE) {
        const canAdd = Math.min(remaining, MAX_STACK_SIZE - slot.count)
        slot.count += canAdd
        remaining -= canAdd
        added += canAdd
      }
    }

    // Third pass: find empty slots in hotbar
    for (let i = 0; i < HOTBAR_SLOTS && remaining > 0; i++) {
      const slot = this._slots[i]!
      if (isSlotEmpty(slot)) {
        const canAdd = Math.min(remaining, MAX_STACK_SIZE)
        slot.itemType = itemType
        slot.count = canAdd
        remaining -= canAdd
        added += canAdd
      }
    }

    // Fourth pass: find empty slots in storage
    for (let i = HOTBAR_SLOTS; i < INVENTORY_TOTAL_SLOTS && remaining > 0; i++) {
      const slot = this._slots[i]!
      if (isSlotEmpty(slot)) {
        const canAdd = Math.min(remaining, MAX_STACK_SIZE)
        slot.itemType = itemType
        slot.count = canAdd
        remaining -= canAdd
        added += canAdd
      }
    }

    if (added > 0) {
      this.notifyChange()
      this.notifyInventoryChange()
    }

    return added
  }

  /**
   * Remove items from a specific slot
   * @param slotIndex Slot index (0-35)
   * @param count Number of items to remove
   * @returns Number of items actually removed
   */
  removeItem(slotIndex: number, count: number): number {
    if (slotIndex < 0 || slotIndex >= INVENTORY_TOTAL_SLOTS) return 0
    if (count <= 0) return 0

    const slot = this._slots[slotIndex]!
    if (isSlotEmpty(slot)) return 0

    const toRemove = Math.min(count, slot.count)
    slot.count -= toRemove

    // Clear slot if empty
    if (slot.count <= 0) {
      slot.itemType = null
      slot.count = 0
    }

    if (toRemove > 0) {
      this.notifyChange()
      this.notifyInventoryChange()
    }

    return toRemove
  }

  /**
   * Swap or stack items between two slots
   * @param fromIndex Source slot index
   * @param toIndex Destination slot index
   */
  swapSlots(fromIndex: number, toIndex: number): void {
    if (fromIndex < 0 || fromIndex >= INVENTORY_TOTAL_SLOTS) return
    if (toIndex < 0 || toIndex >= INVENTORY_TOTAL_SLOTS) return
    if (fromIndex === toIndex) return

    const fromSlot = this._slots[fromIndex]!
    const toSlot = this._slots[toIndex]!

    // If same item type and target has room, stack them
    if (fromSlot.itemType !== null && 
        fromSlot.itemType === toSlot.itemType && 
        toSlot.count < MAX_STACK_SIZE) {
      const canMove = Math.min(fromSlot.count, MAX_STACK_SIZE - toSlot.count)
      toSlot.count += canMove
      fromSlot.count -= canMove
      
      if (fromSlot.count <= 0) {
        fromSlot.itemType = null
        fromSlot.count = 0
      }
    } else {
      // Otherwise, swap the slots
      const tempType = fromSlot.itemType
      const tempCount = fromSlot.count
      
      fromSlot.itemType = toSlot.itemType
      fromSlot.count = toSlot.count
      
      toSlot.itemType = tempType
      toSlot.count = tempCount
    }

    this.notifyChange()
  }

  /**
   * Get a slot by index
   */
  getSlot(slotIndex: number): ItemSlot | null {
    if (slotIndex < 0 || slotIndex >= INVENTORY_TOTAL_SLOTS) return null
    return this._slots[slotIndex]!
  }

  /**
   * Get the currently selected item (from hotbar)
   */
  getSelectedItem(): ItemSlot {
    return this._slots[this._selectedSlot]!
  }

  /**
   * Check if inventory is completely full
   */
  isFull(): boolean {
    return this._slots.every(slot => 
      slot.itemType !== null && slot.count >= MAX_STACK_SIZE
    )
  }

  /**
   * Check if inventory can accept more of a specific item type
   */
  canAccept(itemType: BlockType): boolean {
    if (itemType === BlockType.AIR) return false
    
    return this._slots.some(slot => canStackItem(slot, itemType))
  }

  /**
   * Get total count of a specific item type in inventory
   */
  getItemCount(itemType: BlockType): number {
    return this._slots.reduce((total, slot) => {
      if (slot.itemType === itemType) {
        return total + slot.count
      }
      return total
    }, 0)
  }

  /**
   * Clear all inventory slots
   */
  clear(): void {
    this._slots.forEach(slot => {
      slot.itemType = null
      slot.count = 0
    })
    this.notifyChange()
  }

  /**
   * Serialize inventory to saveable format
   */
  serialize(): InventoryState {
    return {
      slots: this._slots.map(slot => ({
        itemType: slot.itemType,
        count: slot.count
      })),
      selectedSlot: this._selectedSlot
    }
  }

  /**
   * Deserialize inventory from saved data
   */
  deserialize(state: InventoryState): void {
    if (!state || !state.slots) return

    // Restore slots
    for (let i = 0; i < Math.min(state.slots.length, INVENTORY_TOTAL_SLOTS); i++) {
      const savedSlot = state.slots[i]
      if (savedSlot) {
        this._slots[i] = {
          itemType: savedSlot.itemType as BlockType | null,
          count: savedSlot.count
        }
      }
    }

    // Restore selected slot
    if (typeof state.selectedSlot === 'number' && 
        state.selectedSlot >= 0 && 
        state.selectedSlot < HOTBAR_SLOTS) {
      this._selectedSlot = state.selectedSlot
    }

    this.notifyChange()
  }
}
