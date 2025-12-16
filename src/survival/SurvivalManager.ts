/**
 * SurvivalManager - Central survival system manager
 * Feature: 020-survival-mechanics
 * 
 * Integrates all survival subsystems and UI components.
 */

import * as THREE from 'three'
import { Player } from '../player/Player'
import { PlayerStats } from './PlayerStats'
import { getDamageSystem } from './DamageSystem'
import { HungerSystem } from './HungerSystem'
import { HealthRegenSystem } from './HealthRegenSystem'
import { EnvironmentDamage, IBlockWorld } from './EnvironmentDamage'
import { HealthBar } from '../ui/HealthBar'
import { HungerBar } from '../ui/HungerBar'
import { OxygenBar } from '../ui/OxygenBar'
import { DamageOverlay } from '../ui/DamageOverlay'
import { DeathScreen } from '../ui/DeathScreen'
import { DamageSource, HUNGER_SPRINT_COST, HUNGER_JUMP_COST, HUNGER_SWIM_COST } from './SurvivalConstants'

/**
 * Survival manager configuration
 */
export interface SurvivalManagerConfig {
  player: Player
  world: IBlockWorld
  spawnPosition: THREE.Vector3
  onRespawn?: () => void
}

/**
 * Central manager for all survival systems
 */
export class SurvivalManager {
  private player: Player
  private world: IBlockWorld
  private spawnPosition: THREE.Vector3
  
  // Subsystems
  private hungerSystem: HungerSystem
  private healthRegenSystem: HealthRegenSystem
  private environmentDamage: EnvironmentDamage
  
  // UI Components
  private healthBar: HealthBar
  private hungerBar: HungerBar
  private oxygenBar: OxygenBar
  private damageOverlay: DamageOverlay
  private deathScreen: DeathScreen
  
  // State
  private initialized: boolean = false
  private onRespawnCallback?: () => void
  
  // Movement tracking for hunger
  private lastPosition: THREE.Vector3 = new THREE.Vector3()
  private wasJumping: boolean = false

  constructor(config: SurvivalManagerConfig) {
    this.player = config.player
    this.world = config.world
    this.spawnPosition = config.spawnPosition.clone()
    this.onRespawnCallback = config.onRespawn
    
    const stats = this.player.stats
    
    // Initialize subsystems
    this.hungerSystem = new HungerSystem(stats)
    this.healthRegenSystem = new HealthRegenSystem(stats)
    this.environmentDamage = new EnvironmentDamage(stats)
    
    // Initialize UI
    this.healthBar = new HealthBar()
    this.hungerBar = new HungerBar()
    this.oxygenBar = new OxygenBar()
    this.damageOverlay = new DamageOverlay()
    this.deathScreen = new DeathScreen()
    
    // Setup callbacks
    this.setupCallbacks(stats)
    
    // Track initial position
    this.lastPosition.copy(this.player.position)
  }

  /**
   * Setup event callbacks
   */
  private setupCallbacks(stats: PlayerStats): void {
    // Stats callbacks
    stats.setCallbacks({
      onDamage: () => {
        this.damageOverlay.trigger()
      },
      onDeath: () => {
        this.deathScreen.show()
      },
      onHealthChange: (health) => {
        this.healthBar.update(health)
      },
      onHungerChange: (hunger) => {
        this.hungerBar.update(hunger)
      },
      onOxygenChange: (oxygen) => {
        this.oxygenBar.update(oxygen)
      }
    })
    
    // Damage system listener
    getDamageSystem().addListener((event, applied) => {
      if (applied && event.source !== DamageSource.STARVATION) {
        this.damageOverlay.trigger()
      }
    })
    
    // Death screen respawn callback
    this.deathScreen.setOnRespawn(() => {
      this.respawn()
    })
  }

  /**
   * Initialize and attach UI to DOM
   */
  initialize(): void {
    if (this.initialized) return
    
    // Add UI elements to document
    document.body.appendChild(this.healthBar.getElement())
    document.body.appendChild(this.hungerBar.getElement())
    document.body.appendChild(this.oxygenBar.getElement())
    document.body.appendChild(this.damageOverlay.getElement())
    document.body.appendChild(this.deathScreen.getElement())
    
    // Initial UI update
    const stats = this.player.stats
    this.healthBar.update(stats.health)
    this.hungerBar.update(stats.hunger)
    this.oxygenBar.update(stats.oxygen)
    
    this.initialized = true
  }

  /**
   * Update all survival systems
   */
  update(deltaTime: number): void {
    if (!this.initialized) return
    if (this.player.stats.isDead) return
    
    const stats = this.player.stats
    
    // Update stats timer
    stats.update(deltaTime)
    
    // Track movement for hunger
    this.trackMovement(deltaTime)
    
    // Update subsystems
    this.hungerSystem.update(deltaTime)
    this.healthRegenSystem.update(deltaTime)
    this.environmentDamage.update(deltaTime, {
      position: this.player.position,
      velocity: this.player.velocity,
      isGrounded: this.player.isGrounded,
      isInWater: this.player.isInWater,
      isSubmerged: this.player.isSubmerged,
      width: this.player.width,
      height: this.player.height
    }, this.world)
    
    // Update UI animations
    this.damageOverlay.update(deltaTime)
  }

  /**
   * Track player movement for hunger consumption
   */
  private trackMovement(deltaTime: number): void {
    const stats = this.player.stats
    const pos = this.player.position
    
    // Calculate horizontal movement
    const dx = pos.x - this.lastPosition.x
    const dz = pos.z - this.lastPosition.z
    const horizontalDistance = Math.sqrt(dx * dx + dz * dz)
    
    // Check for sprinting (moving faster than walk speed)
    const isSprinting = horizontalDistance / deltaTime > 5.5 // Slightly above normal speed
    
    // Check for jumping (velocity going up and was grounded)
    const isJumping = this.player.velocity.y > 0 && !this.player.isGrounded
    
    // Apply exhaustion based on activity
    if (this.player.isInWater && horizontalDistance > 0.01) {
      // Swimming
      stats.addExhaustion(horizontalDistance * HUNGER_SWIM_COST)
    } else if (isSprinting && horizontalDistance > 0.01) {
      // Sprinting
      stats.addExhaustion(horizontalDistance * HUNGER_SPRINT_COST)
    }
    
    // Jumping exhaustion (only on jump start)
    if (isJumping && !this.wasJumping && this.player.isGrounded === false) {
      stats.addExhaustion(HUNGER_JUMP_COST)
    }
    
    // Update tracking
    this.lastPosition.copy(pos)
    this.wasJumping = isJumping
  }

  /**
   * Handle player respawn
   */
  respawn(): void {
    const stats = this.player.stats
    
    // Reset stats
    stats.respawn()
    
    // Reset subsystems
    this.hungerSystem.reset()
    this.healthRegenSystem.reset()
    this.environmentDamage.reset(this.spawnPosition.y)
    
    // Hide death screen
    this.deathScreen.hide()
    this.damageOverlay.hide()
    
    // Teleport to spawn
    this.player.position.copy(this.spawnPosition)
    this.player.velocity.set(0, 0, 0)
    this.lastPosition.copy(this.spawnPosition)
    
    // Callback
    if (this.onRespawnCallback) {
      this.onRespawnCallback()
    }
  }

  /**
   * Set spawn position
   */
  setSpawnPosition(position: THREE.Vector3): void {
    this.spawnPosition.copy(position)
  }

  /**
   * Check if player is dead
   */
  isPlayerDead(): boolean {
    return this.player.stats.isDead
  }

  /**
   * Get player stats
   */
  getStats(): PlayerStats {
    return this.player.stats
  }

  /**
   * Hide all UI (for menus, etc.)
   */
  hideUI(): void {
    this.healthBar.hide()
    this.hungerBar.hide()
    this.oxygenBar.hide()
  }

  /**
   * Show all UI
   */
  showUI(): void {
    this.healthBar.show()
    this.hungerBar.show()
    // Oxygen bar shows automatically when needed
  }

  /**
   * Dispose of all resources
   */
  dispose(): void {
    this.healthBar.dispose()
    this.hungerBar.dispose()
    this.oxygenBar.dispose()
    this.damageOverlay.dispose()
    this.deathScreen.dispose()
    getDamageSystem().clearListeners()
    this.initialized = false
  }
}
