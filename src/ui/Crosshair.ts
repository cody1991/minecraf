/**
 * Crosshair UI component
 * The crosshair is defined in index.html CSS, this class manages visibility
 */
export class Crosshair {
  private element: HTMLElement | null

  constructor() {
    this.element = document.getElementById('crosshair')
  }

  /**
   * Show the crosshair
   */
  show(): void {
    if (this.element) {
      this.element.style.display = 'block'
    }
  }

  /**
   * Hide the crosshair
   */
  hide(): void {
    if (this.element) {
      this.element.style.display = 'none'
    }
  }

  /**
   * Set crosshair visibility based on pointer lock state
   */
  setVisible(visible: boolean): void {
    if (visible) {
      this.show()
    } else {
      this.hide()
    }
  }
}
