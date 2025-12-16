/**
 * InventoryUI - Full inventory management interface
 * Feature: 019-inventory-system
 * 
 * Displays 36-slot inventory grid with drag-and-drop support.
 * Opens with E key, closes with E or ESC.
 */

import { BlockType, BLOCK_COLORS } from '../core/Block'
import { Inventory } from '../player/Inventory'
import { INVENTORY_TOTAL_SLOTS, HOTBAR_SLOTS, ItemSlot, isSlotEmpty } from '../player/InventoryConstants'
import { getSharedTextureAtlas } from '../renderer/ChunkMesh'
import { getTextureIndexForFace } from '../renderer/BlockTextures'

/**
 * Inventory UI component
 */
export class InventoryUI {
  private container: HTMLElement | null = null
  private overlay: HTMLElement | null = null
  private slotElements: HTMLElement[] = []
  private inventory: Inventory | null = null
  private _isOpen: boolean = false

  // Drag state
  private draggedSlotIndex: number = -1
  private draggedElement: HTMLElement | null = null

  // Callbacks
  private onOpenCallback: (() => void) | null = null
  private onCloseCallback: (() => void) | null = null

  constructor() {
    this.createUI()
    this.setupKeyboardListener()
  }

  /**
   * Create the inventory UI elements
   */
  private createUI(): void {
    // Create overlay
    this.overlay = document.createElement('div')
    this.overlay.id = 'inventory-overlay'
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `

    // Create container
    this.container = document.createElement('div')
    this.container.id = 'inventory-container'
    this.container.style.cssText = `
      background: #8b8b8b;
      border: 4px solid #373737;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `

    // Create title
    const title = document.createElement('div')
    title.textContent = '背包'
    title.style.cssText = `
      color: #404040;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
      text-align: center;
    `
    this.container.appendChild(title)

    // Create storage grid (27 slots: 3 rows x 9 columns)
    const storageGrid = document.createElement('div')
    storageGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
      margin-bottom: 16px;
    `

    // Create storage slots (indices 9-35)
    for (let i = HOTBAR_SLOTS; i < INVENTORY_TOTAL_SLOTS; i++) {
      const slot = this.createSlot(i)
      storageGrid.appendChild(slot)
      this.slotElements[i] = slot
    }
    this.container.appendChild(storageGrid)

    // Create separator
    const separator = document.createElement('div')
    separator.style.cssText = `
      height: 2px;
      background: #555;
      margin: 8px 0;
    `
    this.container.appendChild(separator)

    // Create hotbar grid (9 slots)
    const hotbarGrid = document.createElement('div')
    hotbarGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
    `

    // Create hotbar slots (indices 0-8)
    for (let i = 0; i < HOTBAR_SLOTS; i++) {
      const slot = this.createSlot(i)
      hotbarGrid.appendChild(slot)
      this.slotElements[i] = slot
    }
    this.container.appendChild(hotbarGrid)

    // Create close hint
    const closeHint = document.createElement('div')
    closeHint.textContent = '按 E 或 ESC 关闭'
    closeHint.style.cssText = `
      color: #606060;
      font-size: 12px;
      margin-top: 12px;
      text-align: center;
    `
    this.container.appendChild(closeHint)

    this.overlay.appendChild(this.container)
    document.body.appendChild(this.overlay)

    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close()
      }
    })
  }

  /**
   * Create a single inventory slot element
   */
  private createSlot(index: number): HTMLElement {
    const slot = document.createElement('div')
    slot.className = 'inventory-slot'
    slot.dataset.slotIndex = String(index)
    slot.style.cssText = `
      width: 48px;
      height: 48px;
      background: #8b8b8b;
      border: 2px solid #373737;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      image-rendering: pixelated;
    `

    // Item icon container
    const icon = document.createElement('div')
    icon.className = 'slot-icon'
    icon.style.cssText = `
      width: 32px;
      height: 32px;
      background-size: cover;
      image-rendering: pixelated;
    `
    slot.appendChild(icon)

    // Count label
    const count = document.createElement('span')
    count.className = 'slot-count'
    count.style.cssText = `
      position: absolute;
      bottom: 2px;
      right: 4px;
      font-size: 12px;
      color: white;
      text-shadow: 1px 1px 1px black, -1px -1px 1px black;
      pointer-events: none;
    `
    slot.appendChild(count)

    // Drag and drop events
    slot.draggable = true
    slot.addEventListener('dragstart', (e) => this.handleDragStart(e, index))
    slot.addEventListener('dragover', (e) => this.handleDragOver(e))
    slot.addEventListener('drop', (e) => this.handleDrop(e, index))
    slot.addEventListener('dragend', () => this.handleDragEnd())

    // Right-click for split stack
    slot.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this.handleRightClick(index)
    })

    return slot
  }

  /**
   * Setup keyboard listener for E and ESC keys
   */
  private setupKeyboardListener(): void {
    document.addEventListener('keydown', (e) => {
      if (this._isOpen) {
        if (e.code === 'KeyE' || e.code === 'Escape') {
          e.preventDefault()
          this.close()
        }
      }
    })
  }

  /**
   * Handle drag start
   */
  private handleDragStart(e: DragEvent, index: number): void {
    if (!this.inventory) return
    
    const slot = this.inventory.getSlot(index)
    if (!slot || isSlotEmpty(slot)) {
      e.preventDefault()
      return
    }

    this.draggedSlotIndex = index
    this.draggedElement = e.target as HTMLElement
    
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', String(index))
    }

    // Visual feedback
    setTimeout(() => {
      if (this.draggedElement) {
        this.draggedElement.style.opacity = '0.5'
      }
    }, 0)
  }

  /**
   * Handle drag over
   */
  private handleDragOver(e: DragEvent): void {
    e.preventDefault()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move'
    }
  }

  /**
   * Handle drop
   */
  private handleDrop(e: DragEvent, targetIndex: number): void {
    e.preventDefault()
    
    if (!this.inventory || this.draggedSlotIndex < 0) return
    if (this.draggedSlotIndex === targetIndex) return

    // Swap slots
    this.inventory.swapSlots(this.draggedSlotIndex, targetIndex)
    this.update()
  }

  /**
   * Handle drag end
   */
  private handleDragEnd(): void {
    if (this.draggedElement) {
      this.draggedElement.style.opacity = '1'
    }
    this.draggedSlotIndex = -1
    this.draggedElement = null
  }

  /**
   * Handle right-click (split stack)
   */
  private handleRightClick(index: number): void {
    // For now, just log - full split implementation would need cursor item
    console.log(`[InventoryUI] Right-click on slot ${index}`)
  }

  /**
   * Open the inventory UI
   */
  open(inventory: Inventory): void {
    this.inventory = inventory
    this._isOpen = true
    
    if (this.overlay) {
      this.overlay.style.display = 'flex'
    }

    this.update()

    if (this.onOpenCallback) {
      this.onOpenCallback()
    }
  }

  /**
   * Close the inventory UI
   */
  close(): void {
    this._isOpen = false
    
    if (this.overlay) {
      this.overlay.style.display = 'none'
    }

    if (this.onCloseCallback) {
      this.onCloseCallback()
    }
  }

  /**
   * Toggle inventory open/close
   */
  toggle(inventory: Inventory): void {
    if (this._isOpen) {
      this.close()
    } else {
      this.open(inventory)
    }
  }

  /**
   * Check if inventory is open
   */
  get isOpen(): boolean {
    return this._isOpen
  }

  /**
   * Update all slot displays
   */
  update(): void {
    if (!this.inventory) return

    for (let i = 0; i < INVENTORY_TOTAL_SLOTS; i++) {
      const slot = this.inventory.getSlot(i)
      const element = this.slotElements[i]
      if (slot && element) {
        this.updateSlotDisplay(element, slot)
      }
    }
  }

  /**
   * Update a single slot's display
   */
  private updateSlotDisplay(element: HTMLElement, slot: ItemSlot): void {
    const icon = element.querySelector('.slot-icon') as HTMLElement
    const countLabel = element.querySelector('.slot-count') as HTMLElement

    if (isSlotEmpty(slot)) {
      // Empty slot
      if (icon) {
        icon.style.backgroundImage = ''
        icon.style.backgroundColor = 'transparent'
      }
      if (countLabel) {
        countLabel.textContent = ''
      }
    } else {
      // Filled slot
      if (icon && slot.itemType !== null) {
        this.setSlotTexture(icon, slot.itemType)
      }
      if (countLabel) {
        countLabel.textContent = slot.count > 1 ? String(slot.count) : ''
      }
    }
  }

  /**
   * Set slot texture from block type
   */
  private setSlotTexture(icon: HTMLElement, blockType: BlockType): void {
    try {
      const atlas = getSharedTextureAtlas()
      const atlasCanvas = atlas.getCanvas()
      const config = atlas.getConfig()

      const textureIndex = getTextureIndexForFace(blockType, 'side')
      
      // Create preview canvas
      const previewCanvas = document.createElement('canvas')
      previewCanvas.width = config.tileSize
      previewCanvas.height = config.tileSize
      const ctx = previewCanvas.getContext('2d')
      
      if (ctx) {
        const srcX = textureIndex * config.tileSize
        ctx.drawImage(
          atlasCanvas,
          srcX, 0, config.tileSize, config.tileSize,
          0, 0, config.tileSize, config.tileSize
        )

        icon.style.backgroundImage = `url(${previewCanvas.toDataURL()})`
        icon.style.backgroundColor = 'transparent'
      }
    } catch {
      // Fallback to solid color
      const color = BLOCK_COLORS[blockType] ?? 0x808080
      icon.style.backgroundImage = ''
      icon.style.backgroundColor = `#${color.toString(16).padStart(6, '0')}`
    }
  }

  /**
   * Set callbacks
   */
  setOnOpen(callback: () => void): void {
    this.onOpenCallback = callback
  }

  setOnClose(callback: () => void): void {
    this.onCloseCallback = callback
  }

  /**
   * Dispose of UI elements
   */
  dispose(): void {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay)
    }
    this.overlay = null
    this.container = null
    this.slotElements = []
  }
}
