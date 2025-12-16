/**
 * DiggingProgressUI - Shows digging progress bar
 * Feature: 023-digging-system
 */

/**
 * DiggingProgressUI - Displays digging progress bar in the center of screen
 */
export class DiggingProgressUI {
  private container: HTMLDivElement
  private progressBar: HTMLDivElement
  private progressFill: HTMLDivElement
  
  /** Whether UI is visible */
  private _visible: boolean = false

  constructor() {
    // Create container
    this.container = document.createElement('div')
    this.container.style.cssText = `
      position: fixed;
      top: 55%;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 8px;
      background: rgba(0, 0, 0, 0.5);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      overflow: hidden;
      display: none;
      z-index: 100;
    `
    
    // Create progress bar container
    this.progressBar = document.createElement('div')
    this.progressBar.style.cssText = `
      width: 100%;
      height: 100%;
      position: relative;
    `
    
    // Create progress fill
    this.progressFill = document.createElement('div')
    this.progressFill.style.cssText = `
      width: 0%;
      height: 100%;
      background: linear-gradient(to right, #4a9eff, #00d4ff);
      transition: width 0.05s linear;
      box-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
    `
    
    this.progressBar.appendChild(this.progressFill)
    this.container.appendChild(this.progressBar)
    document.body.appendChild(this.container)
  }

  /**
   * Set visibility
   */
  set visible(value: boolean) {
    this._visible = value
    this.container.style.display = value ? 'block' : 'none'
  }

  get visible(): boolean {
    return this._visible
  }

  /**
   * Set progress (0-1)
   */
  setProgress(progress: number): void {
    const clampedProgress = Math.max(0, Math.min(1, progress))
    this.progressFill.style.width = `${clampedProgress * 100}%`
    
    // Change color as progress increases
    if (clampedProgress < 0.5) {
      this.progressFill.style.background = 'linear-gradient(to right, #4a9eff, #00d4ff)'
    } else if (clampedProgress < 0.8) {
      this.progressFill.style.background = 'linear-gradient(to right, #00d4ff, #00ff88)'
    } else {
      this.progressFill.style.background = 'linear-gradient(to right, #00ff88, #ffff00)'
    }
  }

  /**
   * Show progress bar
   */
  show(): void {
    this.visible = true
  }

  /**
   * Hide progress bar
   */
  hide(): void {
    this.visible = false
    this.setProgress(0)
  }

  /**
   * Get the container element
   */
  getElement(): HTMLDivElement {
    return this.container
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
  }
}
