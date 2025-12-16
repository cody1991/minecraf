import { KeyboardInput } from './KeyboardInput'
import { MouseInput } from './MouseInput'

/**
 * Input state interface
 * Feature: 012-sound-map-system - Added mapToggle
 * Feature: 013-character-model-view - Added viewToggle
 * Feature: 018-world-save-system - Added escapeMenu
 * Feature: 019-inventory-system - Added inventoryToggle
 * Feature: 023-digging-system - Added leftMouseDown
 */
export interface InputState {
  // Movement keys
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean

  // Jump key
  jump: boolean

  // Sprint key (Shift)
  sprint: boolean

  // Mouse movement (delta since last frame)
  mouseX: number
  mouseY: number

  // Mouse buttons (true only on the frame they were clicked)
  leftClick: boolean
  rightClick: boolean
  
  // Left mouse button held state (Feature: 023-digging-system)
  leftMouseDown: boolean
  
  // Right mouse button held state (Feature: 021-food-system)
  rightMouseDown: boolean

  // Number keys for block selection (1-9, 0)
  // Returns index 0-9 where 1->0, 2->1, ..., 9->8, 0->9
  numberKey: number | null

  // Tab key for cycling to next block
  tabCycle: boolean

  // M key for map toggle
  mapToggle: boolean

  // V key for view toggle (first/third person)
  viewToggle: boolean

  // C key for character select
  characterSelect: boolean

  // Escape key for menu/save panel
  escapeMenu: boolean

  // E key for inventory toggle (Feature: 019-inventory-system)
  inventoryToggle: boolean
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
      sprint: this.keyboardInput.isKeyDown('ShiftLeft') || this.keyboardInput.isKeyDown('ShiftRight'),
      mouseX: this.mouseInput.getMouseDeltaX(),
      mouseY: this.mouseInput.getMouseDeltaY(),
      leftClick: this.mouseInput.wasLeftClicked(),
      rightClick: this.mouseInput.wasRightClicked(),
      leftMouseDown: this.mouseInput.isLeftMouseDown(),
      rightMouseDown: this.mouseInput.isRightMouseDown(),
      numberKey: this.keyboardInput.getNumberKeyPressed(),
      tabCycle: this.keyboardInput.wasTabPressed(),
      mapToggle: this.keyboardInput.wasMapKeyPressed(),
      viewToggle: this.keyboardInput.wasViewTogglePressed(),
      characterSelect: this.keyboardInput.wasCharacterSelectPressed(),
      escapeMenu: this.keyboardInput.wasEscapePressed(),
      inventoryToggle: this.keyboardInput.wasInventoryTogglePressed()
    }
  }

  /**
   * Reset per-frame input state (call at end of each frame)
   */
  resetFrameState(): void {
    this.mouseInput.resetDeltas()
    this.mouseInput.resetClicks()
    this.keyboardInput.resetNumberKey()
    this.keyboardInput.resetTab()
    this.keyboardInput.resetMapKey()
    this.keyboardInput.resetViewToggle()
    this.keyboardInput.resetCharacterSelect()
    this.keyboardInput.resetEscape()
    this.keyboardInput.resetInventoryToggle()
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
