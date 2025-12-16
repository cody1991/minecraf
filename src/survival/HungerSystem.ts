/**
 * HungerSystem - Hunger consumption and starvation logic
 * Feature: 020-survival-mechanics
 * 
 * Manages hunger consumption from activities and starvation damage.
 */

import { PlayerStats } from './PlayerStats'
import { getDamageSystem } from './DamageSystem'
import {
  EXHAUSTION_THRESHOLD,
  STARVATION_DAMAGE,
  STARVATION_INTERVAL,
  STARVATION_MIN_HEALTH,
  DamageSource
} from './SurvivalConstants'

/**
 * Hunger system for managing hunger consumption
 */
export class HungerSystem {
  private stats: PlayerStats
  private starvationTimer: number = 0

  constructor(stats: PlayerStats) {
    this.stats = stats
  }

  /**
   * Update the hunger system
   * @param deltaTime Time since last update in seconds
   */
  update(deltaTime: number): void {
    // Process exhaustion to reduce hunger
    this.processExhaustion()
    
    // Handle starvation damage
    this.processStarvation(deltaTime)
  }

  /**
   * Process accumulated exhaustion
   */
  private processExhaustion(): void {
    const exhaustion = this.stats.exhaustion
    
    if (exhaustion >= EXHAUSTION_THRESHOLD) {
      // Consume exhaustion and reduce hunger
      const hungerLoss = Math.floor(exhaustion / EXHAUSTION_THRESHOLD)
      this.stats.consumeExhaustion()
      
      const newHunger = Math.max(0, this.stats.hunger - hungerLoss)
      this.stats.setHunger(newHunger)
    }
  }

  /**
   * Process starvation damage when hunger is 0
   */
  private processStarvation(deltaTime: number): void {
    if (this.stats.hunger > 0) {
      this.starvationTimer = 0
      return
    }
    
    // Don't apply starvation if already at minimum health
    if (this.stats.health <= STARVATION_MIN_HEALTH) {
      return
    }
    
    this.starvationTimer += deltaTime
    
    if (this.starvationTimer >= STARVATION_INTERVAL) {
      this.starvationTimer -= STARVATION_INTERVAL
      
      // Apply starvation damage (but don't kill)
      const damageToApply = Math.min(
        STARVATION_DAMAGE,
        this.stats.health - STARVATION_MIN_HEALTH
      )
      
      if (damageToApply > 0) {
        getDamageSystem().applyDamage({
          target: this.stats,
          amount: damageToApply,
          source: DamageSource.STARVATION
        })
      }
    }
  }

  /**
   * Reset starvation timer
   */
  reset(): void {
    this.starvationTimer = 0
  }
}
