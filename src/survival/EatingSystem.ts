/**
 * EatingSystem - Player eating system
 * Feature: 021-food-system
 * 
 * Handles player eating food items with state machine.
 */

import * as THREE from 'three'
import { BlockType } from '../core/Block'
import { Inventory } from '../player/Inventory'
import { PlayerStats } from './PlayerStats'
import { FoodRegistry } from './FoodRegistry'
import { AudioManager } from '../audio/AudioManager'
import { EATING_DURATION, EATING_CANCEL_MOVE_THRESHOLD } from './EatingConstants'
import { HUNGER_MAX } from './SurvivalConstants'

/**
 * Eating state enumeration
 */
export enum EatingState {
  IDLE = 'idle',
  EATING = 'eating',
  COMPLETED = 'completed'
}

/**
 * Eating context
 */
export interface EatingContext {
  state: EatingState
  progress: number
  targetFood: BlockType | null
  inventorySlot: number
}

/**
 * Eating system callbacks
 */
export interface EatingCallbacks {
  onEatingStart?: (foodType: BlockType) => void
  onEatingProgress?: (progress: number) => void
  onEatingComplete?: (foodType: BlockType, hungerRestored: number) => void
  onEatingCancel?: () => void
}

/**
 * Eating system class
 */
export class EatingSystem {
  private inventory: Inventory
  private stats: PlayerStats
  private context: EatingContext
  private callbacks: EatingCallbacks = {}
  private lastPosition: THREE.Vector3 = new THREE.Vector3()
  private eatingTimer: number = 0

  constructor(inventory: Inventory, stats: PlayerStats) {
    this.inventory = inventory
    this.stats = stats
    this.context = {
      state: EatingState.IDLE,
      progress: 0,
      targetFood: null,
      inventorySlot: -1
    }
  }

  /**
   * Set callbacks
   */
  setCallbacks(callbacks: EatingCallbacks): void {
    this.callbacks = callbacks
  }

  /**
   * Get current eating state
   */
  getState(): EatingState {
    return this.context.state
  }

  /**
   * Get eating progress (0.0 - 1.0)
   */
  getProgress(): number {
    return this.context.progress
  }

  /**
   * Check if currently eating
   */
  isEating(): boolean {
    return this.context.state === EatingState.EATING
  }

  /**
   * Check if player can eat the selected item
   */
  canEat(): boolean {
    // Check if hunger is already full
    if (this.stats.hunger >= HUNGER_MAX) {
      return false
    }

    // Check if selected item is food
    const selectedSlot = this.inventory.getSelectedItem()
    if (!selectedSlot.itemType) {
      return false
    }

    return FoodRegistry.isFoodBlock(selectedSlot.itemType)
  }

  /**
   * Start eating the selected food item
   * @param playerPosition Current player position for movement tracking
   */
  startEating(playerPosition: THREE.Vector3): boolean {
    if (this.context.state !== EatingState.IDLE) {
      return false
    }

    if (!this.canEat()) {
      return false
    }

    const selectedSlot = this.inventory.getSelectedItem()
    if (!selectedSlot.itemType) {
      return false
    }

    // Start eating
    this.context.state = EatingState.EATING
    this.context.progress = 0
    this.context.targetFood = selectedSlot.itemType
    this.context.inventorySlot = this.inventory.selectedSlot
    this.eatingTimer = 0
    this.lastPosition.copy(playerPosition)

    // Play eating start sound
    this.playEatingSound()

    // Callback
    if (this.callbacks.onEatingStart) {
      this.callbacks.onEatingStart(selectedSlot.itemType)
    }

    return true
  }

  /**
   * Cancel eating
   */
  cancelEating(): void {
    if (this.context.state !== EatingState.EATING) {
      return
    }

    this.context.state = EatingState.IDLE
    this.context.progress = 0
    this.context.targetFood = null
    this.context.inventorySlot = -1
    this.eatingTimer = 0

    // Callback
    if (this.callbacks.onEatingCancel) {
      this.callbacks.onEatingCancel()
    }
  }

  /**
   * Update eating system
   * @param deltaTime Time since last update
   * @param playerPosition Current player position
   * @param isRightMouseDown Whether right mouse button is held
   */
  update(deltaTime: number, playerPosition: THREE.Vector3, isRightMouseDown: boolean): void {
    if (this.context.state !== EatingState.EATING) {
      return
    }

    // Check if right mouse released
    if (!isRightMouseDown) {
      this.cancelEating()
      return
    }

    // Check for movement (cancel if moved too much)
    const moveDistance = playerPosition.distanceTo(this.lastPosition)
    const moveSpeed = moveDistance / deltaTime
    if (moveSpeed > EATING_CANCEL_MOVE_THRESHOLD) {
      this.cancelEating()
      return
    }
    this.lastPosition.copy(playerPosition)

    // Check if food is still in inventory
    const slot = this.inventory.getSlot(this.context.inventorySlot)
    if (!slot || slot.itemType !== this.context.targetFood || slot.count <= 0) {
      this.cancelEating()
      return
    }

    // Update progress
    this.eatingTimer += deltaTime
    this.context.progress = Math.min(1.0, this.eatingTimer / EATING_DURATION)

    // Play eating sound periodically
    if (Math.floor(this.eatingTimer * 4) !== Math.floor((this.eatingTimer - deltaTime) * 4)) {
      this.playEatingSound()
    }

    // Callback for progress
    if (this.callbacks.onEatingProgress) {
      this.callbacks.onEatingProgress(this.context.progress)
    }

    // Check if eating complete
    if (this.context.progress >= 1.0) {
      this.completeEating()
    }
  }

  /**
   * Complete eating and restore hunger
   */
  private completeEating(): void {
    const foodType = this.context.targetFood
    if (!foodType) {
      this.cancelEating()
      return
    }

    // Get hunger restore amount
    const hungerRestore = FoodRegistry.getHungerRestore(foodType)

    // Restore hunger
    this.stats.setHunger(Math.min(HUNGER_MAX, this.stats.hunger + hungerRestore))

    // Consume food from inventory
    this.inventory.removeItem(this.context.inventorySlot, 1)

    // Play completion sound
    this.playEatingCompleteSound()

    // Set state to completed (will reset to idle)
    this.context.state = EatingState.COMPLETED

    // Callback
    if (this.callbacks.onEatingComplete) {
      this.callbacks.onEatingComplete(foodType, hungerRestore)
    }

    // Reset to idle
    this.context.state = EatingState.IDLE
    this.context.progress = 0
    this.context.targetFood = null
    this.context.inventorySlot = -1
    this.eatingTimer = 0
  }

  /**
   * Play eating sound
   */
  private playEatingSound(): void {
    const audioManager = AudioManager.getInstance()
    if (audioManager.initialized) {
      audioManager.playEatingSound()
    }
  }

  /**
   * Play eating complete sound
   */
  private playEatingCompleteSound(): void {
    const audioManager = AudioManager.getInstance()
    if (audioManager.initialized) {
      audioManager.playEatingCompleteSound()
    }
  }

  /**
   * Reset eating system
   */
  reset(): void {
    this.context.state = EatingState.IDLE
    this.context.progress = 0
    this.context.targetFood = null
    this.context.inventorySlot = -1
    this.eatingTimer = 0
  }
}
