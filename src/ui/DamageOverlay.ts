/**
 * DamageOverlay - Damage screen effect
 * Feature: 020-survival-mechanics
 * 
 * Shows a red flash overlay when the player takes damage.
 */

import {
  DAMAGE_OVERLAY_DURATION,
  DAMAGE_OVERLAY_DELAY
} from '../survival/SurvivalConstants'

/**
 * Damage overlay UI component
 */
export class DamageOverlay {
  private overlay: HTMLElement
  private isActive: boolean = false
  private timer: number = 0
  private delayTimer: number = 0

  constructor() {
    this.overlay = this.createOverlay()
  }

  /**
   * Create the overlay element
   */
  private createOverlay(): HTMLElement {
    const overlay = document.createElement('div')
    overlay.id = 'damage-overlay'
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center, transparent 0%, rgba(255, 0, 0, 0.4) 100%);
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.1s ease-out;
    `
    return overlay
  }

  /**
   * Trigger the damage effect
   */
  trigger(): void {
    this.isActive = true
    this.delayTimer = DAMAGE_OVERLAY_DELAY
    this.timer = DAMAGE_OVERLAY_DURATION
  }

  /**
   * Update the overlay animation
   */
  update(deltaTime: number): void {
    if (!this.isActive) return

    // Handle delay before showing
    if (this.delayTimer > 0) {
      this.delayTimer -= deltaTime
      if (this.delayTimer <= 0) {
        // Start showing the overlay
        this.overlay.style.opacity = '1'
      }
      return
    }

    // Fade out the overlay
    this.timer -= deltaTime
    if (this.timer <= 0) {
      this.isActive = false
      this.overlay.style.opacity = '0'
    } else {
      // Fade based on remaining time
      const opacity = this.timer / DAMAGE_OVERLAY_DURATION
      this.overlay.style.opacity = String(opacity)
    }
  }

  /**
   * Get the overlay element
   */
  getElement(): HTMLElement {
    return this.overlay
  }

  /**
   * Force hide the overlay
   */
  hide(): void {
    this.isActive = false
    this.timer = 0
    this.delayTimer = 0
    this.overlay.style.opacity = '0'
  }

  /**
   * Check if currently active
   */
  isShowing(): boolean {
    return this.isActive
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.overlay.remove()
  }
}
