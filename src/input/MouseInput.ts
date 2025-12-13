/**
 * MouseInput - handles mouse input with pointer lock
 */
export class MouseInput {
  private canvas: HTMLCanvasElement
  private deltaX: number = 0
  private deltaY: number = 0
  private leftClicked: boolean = false
  private rightClicked: boolean = false
  private locked: boolean = false
  private lockChangeCallback: ((locked: boolean) => void) | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas

    // Mouse movement
    document.addEventListener('mousemove', this.handleMouseMove.bind(this))

    // Mouse clicks
    canvas.addEventListener('mousedown', this.handleMouseDown.bind(this))

    // Pointer lock change
    document.addEventListener('pointerlockchange', this.handlePointerLockChange.bind(this))

    // Click to lock
    canvas.addEventListener('click', this.handleCanvasClick.bind(this))

    // Prevent context menu on right click
    canvas.addEventListener('contextmenu', (e) => e.preventDefault())
  }

  /**
   * Handle mouse movement
   */
  private handleMouseMove(event: MouseEvent): void {
    if (!this.locked) return

    this.deltaX += event.movementX
    this.deltaY += event.movementY
  }

  /**
   * Handle mouse button down
   */
  private handleMouseDown(event: MouseEvent): void {
    if (!this.locked) return

    if (event.button === 0) {
      this.leftClicked = true
    } else if (event.button === 2) {
      this.rightClicked = true
    }
  }

  /**
   * Handle canvas click (for pointer lock)
   */
  private handleCanvasClick(): void {
    if (!this.locked) {
      this.requestLock()
    }
  }

  /**
   * Handle pointer lock change
   */
  private handlePointerLockChange(): void {
    this.locked = document.pointerLockElement === this.canvas

    // Update UI
    const instructions = document.getElementById('instructions')
    if (instructions) {
      instructions.classList.toggle('hidden', this.locked)
    }

    if (this.lockChangeCallback) {
      this.lockChangeCallback(this.locked)
    }
  }

  /**
   * Request pointer lock
   */
  requestLock(): void {
    this.canvas.requestPointerLock()
  }

  /**
   * Exit pointer lock
   */
  exitLock(): void {
    document.exitPointerLock()
  }

  /**
   * Check if pointer is locked
   */
  isLocked(): boolean {
    return this.locked
  }

  /**
   * Get mouse X delta since last reset
   */
  getMouseDeltaX(): number {
    return this.deltaX
  }

  /**
   * Get mouse Y delta since last reset
   */
  getMouseDeltaY(): number {
    return this.deltaY
  }

  /**
   * Check if left mouse was clicked this frame
   */
  wasLeftClicked(): boolean {
    return this.leftClicked
  }

  /**
   * Check if right mouse was clicked this frame
   */
  wasRightClicked(): boolean {
    return this.rightClicked
  }

  /**
   * Reset mouse deltas (call at end of frame)
   */
  resetDeltas(): void {
    this.deltaX = 0
    this.deltaY = 0
  }

  /**
   * Reset click states (call at end of frame)
   */
  resetClicks(): void {
    this.leftClicked = false
    this.rightClicked = false
  }

  /**
   * Set callback for pointer lock change
   */
  onLockChange(callback: (locked: boolean) => void): void {
    this.lockChangeCallback = callback
  }

  /**
   * Dispose of event listeners
   */
  dispose(): void {
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this))
    this.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this))
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange.bind(this))
  }
}
