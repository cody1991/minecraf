/**
 * HealthRegenSystem - Health regeneration logic
 * Feature: 020-survival-mechanics
 * 
 * Regenerates health when hunger is high enough.
 */

import { PlayerStats } from './PlayerStats'
import {
  HUNGER_REGEN_THRESHOLD,
  HEALTH_REGEN_RATE,
  EXHAUSTION_THRESHOLD
} from './SurvivalConstants'

/**
 * Health regeneration system
 */
export class HealthRegenSystem {
  private stats: PlayerStats
  private regenAccumulator: number = 0

  constructor(stats: PlayerStats) {
    this.stats = stats
  }

  /**
   * Update the health regeneration system
   * @param deltaTime Time since last update in seconds
   */
  update(deltaTime: number): void {
    // Don't regenerate if dead
    if (this.stats.isDead) {
      this.regenAccumulator = 0
      return
    }
    
    // Don't regenerate if health is full
    if (this.stats.health >= this.stats.maxHealth) {
      this.regenAccumulator = 0
      return
    }
    
    // Only regenerate if hunger is high enough
    if (this.stats.hunger < HUNGER_REGEN_THRESHOLD) {
      this.regenAccumulator = 0
      return
    }
    
    // Accumulate regeneration
    this.regenAccumulator += HEALTH_REGEN_RATE * deltaTime
    
    // Apply regeneration in whole points
    if (this.regenAccumulator >= 1) {
      const healAmount = Math.floor(this.regenAccumulator)
      this.regenAccumulator -= healAmount
      
      this.stats.heal(healAmount)
      
      // Health regeneration costs hunger (adds exhaustion)
      this.stats.addExhaustion(EXHAUSTION_THRESHOLD * healAmount * 0.5)
    }
  }

  /**
   * Reset accumulator
   */
  reset(): void {
    this.regenAccumulator = 0
  }
}
