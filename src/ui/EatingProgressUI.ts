/**
 * EatingProgressUI - Eating progress bar UI component
 * Feature: 021-food-system
 * 
 * Displays a progress bar when the player is eating food.
 */

/**
 * Eating progress bar UI
 */
export class EatingProgressUI {
  private container: HTMLDivElement
  private progressBar: HTMLDivElement
  private progressFill: HTMLDivElement
  private isVisible: boolean = false

  constructor() {
    // Create container
    this.container = document.createElement('div')
    this.container.id = 'eating-progress-ui'
    this.container.style.cssText = `
      position: fixed;
      bottom: 120px;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 10px;
      background: rgba(0, 0, 0, 0.5);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      overflow: hidden;
      display: none;
      z-index: 100;
    `

    // Create progress bar background
    this.progressBar = document.createElement('div')
    this.progressBar.style.cssText = `
      width: 100%;
      height: 100%;
      background: rgba(50, 50, 50, 0.8);
      position: relative;
    `

    // Create progress fill
    this.progressFill = document.createElement('div')
    this.progressFill.style.cssText = `
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #8B4513, #D2691E);
      transition: width 0.05s linear;
      position: absolute;
      left: 0;
      top: 0;
    `

    this.progressBar.appendChild(this.progressFill)
    this.container.appendChild(this.progressBar)
  }

  /**
   * Get the DOM element
   */
  getElement(): HTMLDivElement {
    return this.container
  }

  /**
   * Show the progress bar
   */
  show(): void {
    if (this.isVisible) return
    this.isVisible = true
    this.container.style.display = 'block'
    this.progressFill.style.width = '0%'
  }

  /**
   * Hide the progress bar
   */
  hide(): void {
    if (!this.isVisible) return
    this.isVisible = false
    this.container.style.display = 'none'
    this.progressFill.style.width = '0%'
  }

  /**
   * Update progress (0.0 - 1.0)
   */
  setProgress(progress: number): void {
    const clampedProgress = Math.max(0, Math.min(1, progress))
    this.progressFill.style.width = `${clampedProgress * 100}%`
  }

  /**
   * Check if visible
   */
  get visible(): boolean {
    return this.isVisible
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
  }
}
