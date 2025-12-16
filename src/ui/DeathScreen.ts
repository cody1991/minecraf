/**
 * DeathScreen - Death UI overlay
 * Feature: 020-survival-mechanics
 * 
 * Full-screen overlay shown when player dies with respawn button.
 */

/**
 * Callback for respawn button click
 */
export type RespawnCallback = () => void

/**
 * Death screen UI component
 */
export class DeathScreen {
  private overlay: HTMLElement
  private respawnButton: HTMLElement
  private onRespawn: RespawnCallback | null = null
  private visible: boolean = false

  constructor() {
    this.overlay = this.createOverlay()
    this.respawnButton = this.createRespawnButton()
    this.overlay.appendChild(this.respawnButton)
  }

  /**
   * Create the overlay element
   */
  private createOverlay(): HTMLElement {
    const overlay = document.createElement('div')
    overlay.id = 'death-screen'
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(128, 0, 0, 0.7);
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 2000;
    `

    // Title
    const title = document.createElement('div')
    title.textContent = '你死了!'
    title.style.cssText = `
      font-size: 48px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      margin-bottom: 40px;
      font-family: 'Arial', sans-serif;
    `
    overlay.appendChild(title)

    return overlay
  }

  /**
   * Create the respawn button
   */
  private createRespawnButton(): HTMLElement {
    const button = document.createElement('button')
    button.textContent = '重生'
    button.style.cssText = `
      padding: 15px 40px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(180deg, #5a5a5a 0%, #3a3a3a 100%);
      border: 3px solid #2a2a2a;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Arial', sans-serif;
      transition: all 0.2s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    `

    button.addEventListener('mouseenter', () => {
      button.style.background = 'linear-gradient(180deg, #6a6a6a 0%, #4a4a4a 100%)'
      button.style.transform = 'scale(1.05)'
    })

    button.addEventListener('mouseleave', () => {
      button.style.background = 'linear-gradient(180deg, #5a5a5a 0%, #3a3a3a 100%)'
      button.style.transform = 'scale(1)'
    })

    button.addEventListener('click', () => {
      if (this.onRespawn) {
        this.onRespawn()
      }
    })

    return button
  }

  /**
   * Set respawn callback
   */
  setOnRespawn(callback: RespawnCallback): void {
    this.onRespawn = callback
  }

  /**
   * Show the death screen
   */
  show(): void {
    this.visible = true
    this.overlay.style.display = 'flex'
    
    // Unlock pointer for button interaction
    if (document.pointerLockElement) {
      document.exitPointerLock()
    }
  }

  /**
   * Hide the death screen
   */
  hide(): void {
    this.visible = false
    this.overlay.style.display = 'none'
  }

  /**
   * Check if visible
   */
  isVisible(): boolean {
    return this.visible
  }

  /**
   * Get the overlay element
   */
  getElement(): HTMLElement {
    return this.overlay
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.overlay.remove()
  }
}
