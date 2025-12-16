/**
 * OxygenBar - Oxygen UI component
 * Feature: 020-survival-mechanics
 * 
 * Displays oxygen bubbles when player is underwater.
 * Only visible when oxygen is below maximum.
 */

import { OXYGEN_MAX } from '../survival/SurvivalConstants'

/** Number of bubble icons */
const BUBBLE_COUNT = 10

/**
 * Oxygen bar UI component
 */
export class OxygenBar {
  private container: HTMLElement
  private bubbles: HTMLElement[] = []
  private currentOxygen: number = OXYGEN_MAX
  private visible: boolean = false

  constructor() {
    this.container = this.createContainer()
    this.createBubbles()
    this.update(OXYGEN_MAX)
  }

  /**
   * Create the container element
   */
  private createContainer(): HTMLElement {
    const container = document.createElement('div')
    container.id = 'oxygen-bar'
    container.style.cssText = `
      position: fixed;
      bottom: 110px;
      right: calc(50% - 234px);
      display: none;
      flex-direction: row-reverse;
      gap: 2px;
      z-index: 100;
      pointer-events: none;
    `
    return container
  }

  /**
   * Create bubble elements
   */
  private createBubbles(): void {
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const bubble = document.createElement('div')
      bubble.className = 'bubble full'
      bubble.style.cssText = `
        width: 18px;
        height: 18px;
        font-size: 14px;
        text-align: center;
        line-height: 18px;
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
      `
      bubble.innerHTML = '🫧'
      this.bubbles.push(bubble)
      this.container.appendChild(bubble)
    }
  }

  /**
   * Set bubble visual state
   */
  private setBubbleState(bubble: HTMLElement, state: 'full' | 'empty'): void {
    bubble.innerHTML = state === 'empty' ? '💨' : '🫧'
    bubble.style.opacity = state === 'empty' ? '0.5' : '1'
    bubble.className = `bubble ${state}`
  }

  /**
   * Update oxygen display
   * @param oxygen Current oxygen (0-10 seconds)
   */
  update(oxygen: number): void {
    this.currentOxygen = Math.max(0, Math.min(OXYGEN_MAX, oxygen))
    
    // Show/hide based on oxygen level
    const shouldShow = this.currentOxygen < OXYGEN_MAX
    if (shouldShow !== this.visible) {
      this.visible = shouldShow
      this.container.style.display = shouldShow ? 'flex' : 'none'
    }
    
    if (!this.visible) return
    
    // Update bubbles (each bubble = 1 second of oxygen)
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const bubble = this.bubbles[i]
      if (i < Math.ceil(this.currentOxygen)) {
        this.setBubbleState(bubble!, 'full')
      } else {
        this.setBubbleState(bubble!, 'empty')
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
   * Force show the oxygen bar
   */
  show(): void {
    this.visible = true
    this.container.style.display = 'flex'
  }

  /**
   * Force hide the oxygen bar
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
    this.bubbles = []
  }
}
