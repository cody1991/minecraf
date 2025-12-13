/**
 * KeyboardInput - handles keyboard input
 * Feature: 012-sound-map-system - Added M key for map toggle
 * Feature: 013-character-model-view - Added V key for view toggle
 */
export class KeyboardInput {
  private keysDown: Set<string> = new Set()
  private numberKeyPressed: number | null = null
  private tabPressed: boolean = false
  private mapKeyPressed: boolean = false
  private viewTogglePressed: boolean = false
  private characterSelectPressed: boolean = false

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

    // Tab key for cycling blocks
    if (event.code === 'Tab') {
      event.preventDefault() // Prevent browser tab switching
      this.tabPressed = true
    }

    // M key for map toggle
    if (event.code === 'KeyM') {
      this.mapKeyPressed = true
    }

    // V key for view toggle
    if (event.code === 'KeyV') {
      this.viewTogglePressed = true
    }

    // C key for character select
    if (event.code === 'KeyC') {
      this.characterSelectPressed = true
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
   * Check if Tab was pressed this frame
   */
  wasTabPressed(): boolean {
    return this.tabPressed
  }

  /**
   * Reset Tab state (call at end of frame)
   */
  resetTab(): void {
    this.tabPressed = false
  }

  /**
   * Check if M (map) key was pressed this frame
   */
  wasMapKeyPressed(): boolean {
    return this.mapKeyPressed
  }

  /**
   * Reset map key state (call at end of frame)
   */
  resetMapKey(): void {
    this.mapKeyPressed = false
  }

  /**
   * Check if V (view toggle) key was pressed this frame
   */
  wasViewTogglePressed(): boolean {
    return this.viewTogglePressed
  }

  /**
   * Reset view toggle key state (call at end of frame)
   */
  resetViewToggle(): void {
    this.viewTogglePressed = false
  }

  /**
   * Check if C (character select) key was pressed this frame
   */
  wasCharacterSelectPressed(): boolean {
    return this.characterSelectPressed
  }

  /**
   * Reset character select key state (call at end of frame)
   */
  resetCharacterSelect(): void {
    this.characterSelectPressed = false
  }

  /**
   * Dispose of event listeners
   */
  dispose(): void {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
    window.removeEventListener('keyup', this.handleKeyUp.bind(this))
  }
}
