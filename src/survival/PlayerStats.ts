/**
 * PlayerStats - Player survival state management
 * Feature: 020-survival-mechanics
 * 
 * Manages health, hunger, oxygen, and invincibility state.
 */

import {
  HEALTH_MAX,
  HUNGER_MAX,
  OXYGEN_MAX,
  INVINCIBILITY_DURATION,
  DamageSource,
  IGNORE_INVINCIBILITY_SOURCES
} from './SurvivalConstants'

/**
 * Serializable player stats state
 */
export interface PlayerStatsState {
  health: number
  hunger: number
  oxygen: number
}

/**
 * Event callbacks for player stats changes
 */
export interface PlayerStatsCallbacks {
  onDamage?: (amount: number, source: DamageSource) => void
  onDeath?: () => void
  onHealthChange?: (health: number, maxHealth: number) => void
  onHungerChange?: (hunger: number, maxHunger: number) => void
  onOxygenChange?: (oxygen: number, maxOxygen: number) => void
}

/**
 * Player survival stats class
 */
export class PlayerStats {
  // Health
  private _health: number = HEALTH_MAX
  private _maxHealth: number = HEALTH_MAX
  
  // Hunger
  private _hunger: number = HUNGER_MAX
  private _maxHunger: number = HUNGER_MAX
  private _exhaustion: number = 0
  
  // Oxygen
  private _oxygen: number = OXYGEN_MAX
  private _maxOxygen: number = OXYGEN_MAX
  
  // State
  private _invincibilityTime: number = 0
  private _isDead: boolean = false
  
  // Callbacks
  private callbacks: PlayerStatsCallbacks = {}

  constructor() {
    this.reset()
  }

  // ============================================================================
  // Getters
  // ============================================================================

  get health(): number { return this._health }
  get maxHealth(): number { return this._maxHealth }
  get hunger(): number { return this._hunger }
  get maxHunger(): number { return this._maxHunger }
  get exhaustion(): number { return this._exhaustion }
  get oxygen(): number { return this._oxygen }
  get maxOxygen(): number { return this._maxOxygen }
  get invincibilityTime(): number { return this._invincibilityTime }
  get isDead(): boolean { return this._isDead }

  // ============================================================================
  // Setters (for internal use)
  // ============================================================================

  /**
   * Set health directly (clamped to valid range)
   */
  setHealth(value: number): void {
    const oldHealth = this._health
    this._health = Math.max(0, Math.min(this._maxHealth, value))
    
    if (this._health !== oldHealth) {
      this.callbacks.onHealthChange?.(this._health, this._maxHealth)
    }
    
    if (this._health <= 0 && !this._isDead) {
      this.die()
    }
  }

  /**
   * Set hunger directly (clamped to valid range)
   */
  setHunger(value: number): void {
    const oldHunger = this._hunger
    this._hunger = Math.max(0, Math.min(this._maxHunger, value))
    
    if (this._hunger !== oldHunger) {
      this.callbacks.onHungerChange?.(this._hunger, this._maxHunger)
    }
  }

  /**
   * Set oxygen directly (clamped to valid range)
   */
  setOxygen(value: number): void {
    const oldOxygen = this._oxygen
    this._oxygen = Math.max(0, Math.min(this._maxOxygen, value))
    
    if (this._oxygen !== oldOxygen) {
      this.callbacks.onOxygenChange?.(this._oxygen, this._maxOxygen)
    }
  }

  /**
   * Add exhaustion (for hunger system)
   */
  addExhaustion(amount: number): void {
    this._exhaustion += amount
  }

  /**
   * Get and reset exhaustion
   */
  consumeExhaustion(): number {
    const value = this._exhaustion
    this._exhaustion = 0
    return value
  }

  // ============================================================================
  // Damage System
  // ============================================================================

  /**
   * Take damage from a source
   * @returns true if damage was applied, false if blocked by invincibility
   */
  takeDamage(amount: number, source: DamageSource = DamageSource.GENERIC): boolean {
    if (this._isDead) return false
    if (amount <= 0) return false
    
    // Check invincibility (some sources ignore it)
    const ignoresInvincibility = IGNORE_INVINCIBILITY_SOURCES.includes(source)
    if (!ignoresInvincibility && this._invincibilityTime > 0) {
      return false
    }
    
    // Apply damage
    const oldHealth = this._health
    this._health = Math.max(0, this._health - amount)
    
    // Set invincibility (if source doesn't ignore it)
    if (!ignoresInvincibility) {
      this._invincibilityTime = INVINCIBILITY_DURATION
    }
    
    // Notify callbacks
    this.callbacks.onDamage?.(amount, source)
    this.callbacks.onHealthChange?.(this._health, this._maxHealth)
    
    // Check for death
    if (this._health <= 0 && oldHealth > 0) {
      this.die()
    }
    
    return true
  }

  /**
   * Heal the player
   */
  heal(amount: number): void {
    if (this._isDead) return
    if (amount <= 0) return
    
    const oldHealth = this._health
    this._health = Math.min(this._maxHealth, this._health + amount)
    
    if (this._health !== oldHealth) {
      this.callbacks.onHealthChange?.(this._health, this._maxHealth)
    }
  }

  // ============================================================================
  // Death and Respawn
  // ============================================================================

  /**
   * Trigger death
   */
  private die(): void {
    if (this._isDead) return
    
    this._isDead = true
    this._health = 0
    this.callbacks.onDeath?.()
  }

  /**
   * Respawn the player
   */
  respawn(): void {
    this._health = this._maxHealth
    this._hunger = this._maxHunger
    this._oxygen = this._maxOxygen
    this._exhaustion = 0
    this._invincibilityTime = 0
    this._isDead = false
    
    this.callbacks.onHealthChange?.(this._health, this._maxHealth)
    this.callbacks.onHungerChange?.(this._hunger, this._maxHunger)
    this.callbacks.onOxygenChange?.(this._oxygen, this._maxOxygen)
  }

  /**
   * Reset to initial state
   */
  reset(): void {
    this._health = HEALTH_MAX
    this._maxHealth = HEALTH_MAX
    this._hunger = HUNGER_MAX
    this._maxHunger = HUNGER_MAX
    this._oxygen = OXYGEN_MAX
    this._maxOxygen = OXYGEN_MAX
    this._exhaustion = 0
    this._invincibilityTime = 0
    this._isDead = false
  }

  // ============================================================================
  // Update
  // ============================================================================

  /**
   * Update invincibility timer
   */
  update(deltaTime: number): void {
    if (this._invincibilityTime > 0) {
      this._invincibilityTime = Math.max(0, this._invincibilityTime - deltaTime)
    }
  }

  // ============================================================================
  // Callbacks
  // ============================================================================

  /**
   * Set event callbacks
   */
  setCallbacks(callbacks: PlayerStatsCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  // ============================================================================
  // Serialization
  // ============================================================================

  /**
   * Serialize stats for saving
   */
  serialize(): PlayerStatsState {
    return {
      health: this._health,
      hunger: this._hunger,
      oxygen: this._oxygen
    }
  }

  /**
   * Deserialize stats from save data
   */
  deserialize(state: PlayerStatsState): void {
    if (state.health !== undefined) {
      this._health = Math.max(0, Math.min(this._maxHealth, state.health))
    }
    if (state.hunger !== undefined) {
      this._hunger = Math.max(0, Math.min(this._maxHunger, state.hunger))
    }
    if (state.oxygen !== undefined) {
      this._oxygen = Math.max(0, Math.min(this._maxOxygen, state.oxygen))
    }
    
    this._isDead = this._health <= 0
    this._exhaustion = 0
    this._invincibilityTime = 0
    
    // Notify callbacks
    this.callbacks.onHealthChange?.(this._health, this._maxHealth)
    this.callbacks.onHungerChange?.(this._hunger, this._maxHunger)
    this.callbacks.onOxygenChange?.(this._oxygen, this._maxOxygen)
  }
}
