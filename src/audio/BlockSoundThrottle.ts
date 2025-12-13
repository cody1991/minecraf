/**
 * BlockSoundThrottle - Prevents audio overload from rapid block interactions
 * Feature: 017-block-sound-effects
 * 
 * Implements a per-category throttling mechanism to ensure sounds don't overlap
 * too quickly when players rapidly place or break blocks.
 */

import { BlockSoundCategory } from './AudioTypes'

/** Minimum time between sounds of the same category (milliseconds) */
const THROTTLE_MS = 50

/**
 * BlockSoundThrottle - Manages sound throttling for block interactions
 */
export class BlockSoundThrottle {
  private lastPlayTime: Map<BlockSoundCategory, number> = new Map()

  /**
   * Check if a sound for the given category can be played
   * @param category The block sound category to check
   * @returns true if enough time has passed since the last sound of this category
   */
  canPlay(category: BlockSoundCategory): boolean {
    const now = Date.now()
    const lastTime = this.lastPlayTime.get(category) ?? 0
    return now - lastTime >= THROTTLE_MS
  }

  /**
   * Record that a sound was played for the given category
   * @param category The block sound category that was played
   */
  recordPlay(category: BlockSoundCategory): void {
    this.lastPlayTime.set(category, Date.now())
  }

  /**
   * Check if sound can play and record it if so (combined operation)
   * @param category The block sound category
   * @returns true if the sound was allowed to play
   */
  tryPlay(category: BlockSoundCategory): boolean {
    if (this.canPlay(category)) {
      this.recordPlay(category)
      return true
    }
    return false
  }

  /**
   * Reset all throttle timers
   */
  reset(): void {
    this.lastPlayTime.clear()
  }
}
