/**
 * DamageSystem - Unified damage handling
 * Feature: 020-survival-mechanics
 * 
 * Centralized system for processing all damage events.
 */

import { PlayerStats } from './PlayerStats'
import { DamageSource } from './SurvivalConstants'

/**
 * Damage event for processing
 */
export interface DamageEvent {
  target: PlayerStats
  amount: number
  source: DamageSource
  position?: { x: number; y: number; z: number }
}

/**
 * Damage event listener
 */
export type DamageEventListener = (event: DamageEvent, applied: boolean) => void

/**
 * Unified damage processing system
 */
export class DamageSystem {
  private listeners: DamageEventListener[] = []
  
  /**
   * Apply damage to a target
   * @returns true if damage was applied
   */
  applyDamage(event: DamageEvent): boolean {
    const applied = event.target.takeDamage(event.amount, event.source)
    
    // Notify listeners
    for (const listener of this.listeners) {
      listener(event, applied)
    }
    
    return applied
  }
  
  /**
   * Add a damage event listener
   */
  addListener(listener: DamageEventListener): void {
    this.listeners.push(listener)
  }
  
  /**
   * Remove a damage event listener
   */
  removeListener(listener: DamageEventListener): void {
    const index = this.listeners.indexOf(listener)
    if (index !== -1) {
      this.listeners.splice(index, 1)
    }
  }
  
  /**
   * Clear all listeners
   */
  clearListeners(): void {
    this.listeners = []
  }
}

// Singleton instance
let damageSystemInstance: DamageSystem | null = null

/**
 * Get the global damage system instance
 */
export function getDamageSystem(): DamageSystem {
  if (!damageSystemInstance) {
    damageSystemInstance = new DamageSystem()
  }
  return damageSystemInstance
}
