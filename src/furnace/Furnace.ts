/**
 * Furnace - Furnace entity state
 * Feature: 023-crafting-tools-system
 * 
 * Manages individual furnace state and smelting logic.
 */

import { BlockType } from '../core/Block'
import { SmeltingRecipe, getSmeltingRecipe } from './SmeltingRecipe'
import { getBurnTime } from './FuelRegistry'
import { ItemSlot, createEmptySlot, isSlotEmpty } from '../player/InventoryConstants'

/**
 * Furnace state interface
 */
export interface FurnaceState {
  /** World position */
  position: { x: number; y: number; z: number }
  /** Fuel slot */
  fuelSlot: ItemSlot
  /** Input slot (item to smelt) */
  inputSlot: ItemSlot
  /** Output slot (smelted result) */
  outputSlot: ItemSlot
  /** Remaining burn time of current fuel */
  burnTimeRemaining: number
  /** Total burn time of current fuel (for progress display) */
  burnTimeTotal: number
  /** Smelting progress (0-1) */
  smeltProgress: number
  /** Current smelting recipe */
  currentRecipe: SmeltingRecipe | null
}

/**
 * Create a new furnace state
 */
export function createFurnaceState(x: number, y: number, z: number): FurnaceState {
  return {
    position: { x, y, z },
    fuelSlot: createEmptySlot(),
    inputSlot: createEmptySlot(),
    outputSlot: createEmptySlot(),
    burnTimeRemaining: 0,
    burnTimeTotal: 0,
    smeltProgress: 0,
    currentRecipe: null
  }
}

/**
 * Furnace class for managing furnace logic
 */
export class Furnace {
  state: FurnaceState

  constructor(x: number, y: number, z: number) {
    this.state = createFurnaceState(x, y, z)
  }

  /**
   * Get position key for map storage
   */
  getPositionKey(): string {
    return `${this.state.position.x},${this.state.position.y},${this.state.position.z}`
  }

  /**
   * Check if furnace is burning
   */
  isBurning(): boolean {
    return this.state.burnTimeRemaining > 0
  }

  /**
   * Check if furnace can start burning
   */
  canStartBurning(): boolean {
    // Need fuel and valid input
    if (isSlotEmpty(this.state.fuelSlot)) return false
    if (isSlotEmpty(this.state.inputSlot)) return false

    // Check if input has a smelting recipe
    const recipe = getSmeltingRecipe(this.state.inputSlot.itemType!)
    if (!recipe) return false

    // Check if output slot can accept result
    if (!isSlotEmpty(this.state.outputSlot)) {
      if (this.state.outputSlot.itemType !== recipe.output) return false
      if (this.state.outputSlot.count >= 64) return false
    }

    return true
  }

  /**
   * Consume one fuel item and start burning
   */
  consumeFuel(): boolean {
    if (isSlotEmpty(this.state.fuelSlot)) return false

    const burnTime = getBurnTime(this.state.fuelSlot.itemType!)
    if (burnTime <= 0) return false

    // Consume fuel
    this.state.fuelSlot.count--
    if (this.state.fuelSlot.count <= 0) {
      this.state.fuelSlot = createEmptySlot()
    }

    // Set burn time
    this.state.burnTimeRemaining = burnTime
    this.state.burnTimeTotal = burnTime

    return true
  }

  /**
   * Update furnace state
   * @param deltaTime Time elapsed in seconds
   */
  update(deltaTime: number): void {
    // Update burn time
    if (this.state.burnTimeRemaining > 0) {
      this.state.burnTimeRemaining -= deltaTime
    }

    // Try to start burning if not already
    if (!this.isBurning() && this.canStartBurning()) {
      this.consumeFuel()
    }

    // Update smelting progress
    if (this.isBurning() && !isSlotEmpty(this.state.inputSlot)) {
      // Get or find recipe
      if (!this.state.currentRecipe) {
        this.state.currentRecipe = getSmeltingRecipe(this.state.inputSlot.itemType!)
      }

      if (this.state.currentRecipe) {
        // Check if output can accept result
        const canOutput = isSlotEmpty(this.state.outputSlot) ||
          (this.state.outputSlot.itemType === this.state.currentRecipe.output &&
           this.state.outputSlot.count < 64)

        if (canOutput) {
          // Progress smelting
          this.state.smeltProgress += deltaTime / this.state.currentRecipe.smeltTime

          // Check if smelting complete
          if (this.state.smeltProgress >= 1) {
            this.completeSmelting()
          }
        }
      }
    } else {
      // Reset progress if not smelting
      if (this.state.smeltProgress > 0 && !this.isBurning()) {
        this.state.smeltProgress = 0
        this.state.currentRecipe = null
      }
    }
  }

  /**
   * Complete smelting and produce output
   */
  private completeSmelting(): void {
    if (!this.state.currentRecipe) return

    // Consume input
    this.state.inputSlot.count--
    if (this.state.inputSlot.count <= 0) {
      this.state.inputSlot = createEmptySlot()
    }

    // Add output
    if (isSlotEmpty(this.state.outputSlot)) {
      this.state.outputSlot = {
        itemType: this.state.currentRecipe.output,
        count: this.state.currentRecipe.outputCount
      }
    } else {
      this.state.outputSlot.count += this.state.currentRecipe.outputCount
    }

    // Reset progress
    this.state.smeltProgress = 0

    // Check if can continue with same recipe
    if (isSlotEmpty(this.state.inputSlot) ||
        this.state.inputSlot.itemType !== this.state.currentRecipe.input) {
      this.state.currentRecipe = null
    }
  }

  /**
   * Add fuel to furnace
   * @returns true if fuel was added
   */
  addFuel(fuelType: BlockType, count: number): boolean {
    const burnTime = getBurnTime(fuelType)
    if (burnTime <= 0) return false

    if (isSlotEmpty(this.state.fuelSlot)) {
      this.state.fuelSlot = { itemType: fuelType, count }
      return true
    }

    if (this.state.fuelSlot.itemType === fuelType) {
      const spaceAvailable = 64 - this.state.fuelSlot.count
      if (spaceAvailable > 0) {
        const toAdd = Math.min(count, spaceAvailable)
        this.state.fuelSlot.count += toAdd
        return true
      }
    }

    return false
  }

  /**
   * Add input item to furnace
   * @returns true if input was added
   */
  addInput(inputType: BlockType, count: number): boolean {
    // Check if item can be smelted
    if (!getSmeltingRecipe(inputType)) return false

    if (isSlotEmpty(this.state.inputSlot)) {
      this.state.inputSlot = { itemType: inputType, count }
      return true
    }

    if (this.state.inputSlot.itemType === inputType) {
      const spaceAvailable = 64 - this.state.inputSlot.count
      if (spaceAvailable > 0) {
        const toAdd = Math.min(count, spaceAvailable)
        this.state.inputSlot.count += toAdd
        return true
      }
    }

    return false
  }

  /**
   * Take output from furnace
   * @returns Output item and count, or null if empty
   */
  takeOutput(): { itemType: BlockType; count: number } | null {
    if (isSlotEmpty(this.state.outputSlot)) return null

    const result = {
      itemType: this.state.outputSlot.itemType!,
      count: this.state.outputSlot.count
    }

    this.state.outputSlot = createEmptySlot()
    return result
  }

  /**
   * Get all items in furnace (for dropping when destroyed)
   */
  getAllItems(): Array<{ itemType: BlockType; count: number }> {
    const items: Array<{ itemType: BlockType; count: number }> = []

    if (!isSlotEmpty(this.state.fuelSlot)) {
      items.push({
        itemType: this.state.fuelSlot.itemType!,
        count: this.state.fuelSlot.count
      })
    }

    if (!isSlotEmpty(this.state.inputSlot)) {
      items.push({
        itemType: this.state.inputSlot.itemType!,
        count: this.state.inputSlot.count
      })
    }

    if (!isSlotEmpty(this.state.outputSlot)) {
      items.push({
        itemType: this.state.outputSlot.itemType!,
        count: this.state.outputSlot.count
      })
    }

    return items
  }
}
