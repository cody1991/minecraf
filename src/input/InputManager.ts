import { KeyboardInput } from './KeyboardInput'
import { MouseInput } from './MouseInput'

/**
 * Input state interface
 */
export interface InputState {
  // Movement keys
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean

  // Jump key
  jump: boolean

  // Mouse movement (delta since last frame)
  mouseX: number
  mouseY: number

  // Mouse buttons (true only on the frame they were clicked)
  leftClick: boolean
  rightClick: boolean

  // Number keys for block selection (1-9, 0)
  // Returns index 0-9 where 1->0, 2->1, ..., 9->8, 0->9
  numberKey: number | null
}

/**
 * InputManager - integrates keyboard and mouse input
 */
export class InputManager {
  private keyboardInput: KeyboardInput
  private mouseInput: MouseInput

  constructor(canvas: HTMLCanvasElement) {
    this.keyboardInput = new KeyboardInput()
    this.mouseInput = new MouseInput(canvas)
  }

  /**
   * Get current input state
   */
  getState(): InputState {
    return {
      forward: this.keyboardInput.isKeyDown('KeyW') || this.keyboardInput.isKeyDown('ArrowUp'),
      backward: this.keyboardInput.isKeyDown('KeyS') || this.keyboardInput.isKeyDown('ArrowDown'),
      left: this.keyboardInput.isKeyDown('KeyA') || this.keyboardInput.isKeyDown('ArrowLeft'),
      right: this.keyboardInput.isKeyDown('KeyD') || this.keyboardInput.isKeyDown('ArrowRight'),
      jump: this.keyboardInput.isKeyDown('Space'),
      mouseX: this.mouseInput.getMouseDeltaX(),
      mouseY: this.mouseInput.getMouseDeltaY(),
      leftClick: this.mouseInput.wasLeftClicked(),
      rightClick: this.mouseInput.wasRightClicked(),
      numberKey: this.keyboardInput.getNumberKeyPressed()
    }
  }

  /**
   * Reset per-frame input state (call at end of each frame)
   */
  resetFrameState(): void {
    this.mouseInput.resetDeltas()
    this.mouseInput.resetClicks()
    this.keyboardInput.resetNumberKey()
  }

  /**
   * Check if pointer is locked
   */
  isPointerLocked(): boolean {
    return this.mouseInput.isLocked()
  }

  /**
   * Request pointer lock
   */
  requestPointerLock(): void {
    this.mouseInput.requestLock()
  }

  /**
   * Exit pointer lock
   */
  exitPointerLock(): void {
    this.mouseInput.exitLock()
  }

  /**
   * Set callback for pointer lock change
   */
  onPointerLockChange(callback: (locked: boolean) => void): void {
    this.mouseInput.onLockChange(callback)
  }

  /**
   * Dispose of input handlers
   */
  dispose(): void {
    this.keyboardInput.dispose()
    this.mouseInput.dispose()
  }
}
