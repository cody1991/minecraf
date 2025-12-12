/**
 * FPS Counter UI component
 * Note: FPS display is already handled in Game.ts
 * This class provides additional control if needed
 */
export class FpsCounter {
  private element: HTMLElement | null

  constructor() {
    this.element = document.getElementById('fps-counter')
  }

  /**
   * Update the FPS display
   */
  update(fps: number): void {
    if (this.element) {
      this.element.textContent = `FPS: ${fps}`
    }
  }

  /**
   * Show the FPS counter
   */
  show(): void {
    if (this.element) {
      this.element.style.display = 'block'
    }
  }

  /**
   * Hide the FPS counter
   */
  hide(): void {
    if (this.element) {
      this.element.style.display = 'none'
    }
  }
}
