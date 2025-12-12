/**
 * KeyboardInput - handles keyboard input
 */
export class KeyboardInput {
  private keysDown: Set<string> = new Set()
  private numberKeyPressed: number | null = null

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  /**
   * Handle key down event
   */
  private handleKeyDown(event: KeyboardEvent): void {
    this.keysDown.add(event.code)

    // Check for number keys 1-5
    if (event.code >= 'Digit1' && event.code <= 'Digit5') {
      this.numberKeyPressed = parseInt(event.code.replace('Digit', ''))
    }
  }

  /**
   * Handle key up event
   */
  private handleKeyUp(event: KeyboardEvent): void {
    this.keysDown.delete(event.code)
  }

  /**
   * Check if a key is currently down
   */
  isKeyDown(code: string): boolean {
    return this.keysDown.has(code)
  }

  /**
   * Get the number key that was pressed (1-5), or null if none
   */
  getNumberKeyPressed(): number | null {
    return this.numberKeyPressed
  }

  /**
   * Reset number key state (call at end of frame)
   */
  resetNumberKey(): void {
    this.numberKeyPressed = null
  }

  /**
   * Dispose of event listeners
   */
  dispose(): void {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
    window.removeEventListener('keyup', this.handleKeyUp.bind(this))
  }
}
