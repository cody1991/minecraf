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

    // Check for number keys 1-9 and 0
    // Maps: 1->0, 2->1, ..., 9->8, 0->9 (index in PLACEABLE_BLOCKS)
    if (event.code >= 'Digit1' && event.code <= 'Digit9') {
      this.numberKeyPressed = parseInt(event.code.replace('Digit', '')) - 1
    } else if (event.code === 'Digit0') {
      this.numberKeyPressed = 9
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
   * Get the number key that was pressed (returns index 0-9), or null if none
   * 1->0, 2->1, ..., 9->8, 0->9
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
