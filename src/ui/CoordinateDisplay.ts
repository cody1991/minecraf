/**
 * CoordinateDisplay - Shows player coordinates in top-left
 * Feature: 012-sound-map-system
 */

/**
 * Displays player X, Y, Z coordinates
 */
export class CoordinateDisplay {
  private element: HTMLElement

  constructor() {
    this.element = this.createUI()
    document.body.appendChild(this.element)
  }

  /**
   * Create the coordinate display UI
   */
  private createUI(): HTMLElement {
    const element = document.createElement('div')
    element.id = 'coordinate-display'
    element.style.cssText = `
      position: fixed;
      top: 40px;
      left: 10px;
      color: white;
      font-family: monospace;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.5);
      padding: 4px 8px;
      border-radius: 4px;
      text-shadow: 1px 1px 2px black;
      z-index: 100;
      pointer-events: none;
    `
    element.innerHTML = `
      <div>X: <span id="coord-x">0.0</span></div>
      <div>Y: <span id="coord-y">0.0</span></div>
      <div>Z: <span id="coord-z">0.0</span></div>
    `
    return element
  }

  /**
   * Update displayed coordinates
   */
  update(x: number, y: number, z: number): void {
    const xEl = document.getElementById('coord-x')
    const yEl = document.getElementById('coord-y')
    const zEl = document.getElementById('coord-z')
    
    if (xEl) xEl.textContent = x.toFixed(1)
    if (yEl) yEl.textContent = y.toFixed(1)
    if (zEl) zEl.textContent = z.toFixed(1)
  }

  /**
   * Show the coordinate display
   */
  show(): void {
    this.element.style.display = 'block'
  }

  /**
   * Hide the coordinate display
   */
  hide(): void {
    this.element.style.display = 'none'
  }

  /**
   * Set visibility
   */
  setVisible(visible: boolean): void {
    this.element.style.display = visible ? 'block' : 'none'
  }

  /**
   * Dispose of the component
   */
  dispose(): void {
    this.element.remove()
  }
}
