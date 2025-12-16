/**
 * HealthBar - Health UI component
 * Feature: 020-survival-mechanics
 * 
 * Displays 10 hearts representing player health (20 HP total).
 * Supports full, half, and empty heart states.
 */

import { HEALTH_MAX } from '../survival/SurvivalConstants'

/** Number of heart icons */
const HEART_COUNT = 10

/**
 * Health bar UI component
 */
export class HealthBar {
  private container: HTMLElement
  private hearts: HTMLElement[] = []
  private currentHealth: number = HEALTH_MAX
  private visible: boolean = true

  constructor() {
    this.container = this.createContainer()
    this.createHearts()
    this.update(HEALTH_MAX)
  }

  /**
   * Create the container element
   */
  private createContainer(): HTMLElement {
    const container = document.createElement('div')
    container.id = 'health-bar'
    container.style.cssText = `
      position: fixed;
      bottom: 90px;
      left: calc(50% - 234px);
      display: flex;
      gap: 2px;
      z-index: 100;
      pointer-events: none;
    `
    return container
  }

  /**
   * Create heart elements
   */
  private createHearts(): void {
    for (let i = 0; i < HEART_COUNT; i++) {
      const heart = document.createElement('div')
      heart.className = 'heart full'
      heart.style.cssText = `
        width: 18px;
        height: 18px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        image-rendering: pixelated;
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
      `
      this.setHeartState(heart, 'full')
      this.hearts.push(heart)
      this.container.appendChild(heart)
    }
  }

  /**
   * Set heart visual state
   */
  private setHeartState(heart: HTMLElement, state: 'full' | 'half' | 'empty'): void {
    // Use emoji for heart icons
    heart.innerHTML = state === 'empty' 
      ? '🖤' 
      : state === 'half' 
        ? '💔' 
        : '❤️'
    heart.style.fontSize = '16px'
    heart.style.textAlign = 'center'
    heart.style.lineHeight = '18px'
    heart.className = `heart ${state}`
  }

  /**
   * Update health display
   * @param health Current health (0-20)
   */
  update(health: number): void {
    this.currentHealth = Math.max(0, Math.min(HEALTH_MAX, health))
    
    for (let i = 0; i < HEART_COUNT; i++) {
      const heartValue = this.currentHealth - i * 2
      const heart = this.hearts[i]
      
      if (heartValue >= 2) {
        this.setHeartState(heart!, 'full')
      } else if (heartValue >= 1) {
        this.setHeartState(heart!, 'half')
      } else {
        this.setHeartState(heart!, 'empty')
      }
    }
  }

  /**
   * Get the container element
   */
  getElement(): HTMLElement {
    return this.container
  }

  /**
   * Show the health bar
   */
  show(): void {
    this.visible = true
    this.container.style.display = 'flex'
  }

  /**
   * Hide the health bar
   */
  hide(): void {
    this.visible = false
    this.container.style.display = 'none'
  }

  /**
   * Check if visible
   */
  isVisible(): boolean {
    return this.visible
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.container.remove()
    this.hearts = []
  }
}
