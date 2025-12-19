/**
 * FurnaceUI - Furnace interface
 * Feature: 023-crafting-tools-system
 * 
 * Displays furnace with fuel, input, and output slots.
 */

import { BlockType, BLOCK_COLORS } from '../core/Block'
import { Inventory } from '../player/Inventory'
import { INVENTORY_TOTAL_SLOTS, HOTBAR_SLOTS, ItemSlot, isSlotEmpty, createEmptySlot } from '../player/InventoryConstants'
import { getSharedTextureAtlas } from '../renderer/ChunkMesh'
import { getTextureIndexForFace } from '../renderer/BlockTextures'
import { FurnaceManager } from '../furnace/FurnaceManager'

/**
 * Furnace UI component
 */
export class FurnaceUI {
  private container: HTMLElement | null = null
  private overlay: HTMLElement | null = null
  private slotElements: HTMLElement[] = []
  private inventory: Inventory | null = null
  private _isOpen: boolean = false

  // Furnace reference
  private furnacePosition: { x: number; y: number; z: number } | null = null

  // Furnace slot elements
  private fuelSlotElement: HTMLElement | null = null
  private inputSlotElement: HTMLElement | null = null
  private outputSlotElement: HTMLElement | null = null
  private burnProgressElement: HTMLElement | null = null
  private smeltProgressElement: HTMLElement | null = null

  // Drag state
  private draggedSlotIndex: number = -1
  private draggedElement: HTMLElement | null = null
  private dragSource: 'inventory' | 'fuel' | 'input' | 'output' = 'inventory'

  // Callbacks
  private onOpenCallback: (() => void) | null = null
  private onCloseCallback: (() => void) | null = null

  // Update interval
  private updateInterval: number | null = null

  constructor() {
    this.createUI()
    this.setupKeyboardListener()
  }

  /**
   * Create the furnace UI elements
   */
  private createUI(): void {
    // Create overlay
    this.overlay = document.createElement('div')
    this.overlay.id = 'furnace-overlay'
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
    this.container.id = 'furnace-container'
    this.container.style.cssText = `
      background: #8b8b8b;
      border: 4px solid #373737;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `

    // Create title
    const title = document.createElement('div')
    title.textContent = '熔炉'
    title.style.cssText = `
      color: #404040;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
      text-align: center;
    `
    this.container.appendChild(title)

    // Create furnace area
    this.createFurnaceArea()

    // Create separator
    const separator = document.createElement('div')
    separator.style.cssText = `
      height: 2px;
      background: #555;
      margin: 16px 0;
    `
    this.container.appendChild(separator)

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
      const slot = this.createSlot(i, 'inventory')
      storageGrid.appendChild(slot)
      this.slotElements[i] = slot
    }
    this.container.appendChild(storageGrid)

    // Create hotbar grid (9 slots)
    const hotbarGrid = document.createElement('div')
    hotbarGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(9, 48px);
      gap: 4px;
    `

    // Create hotbar slots (indices 0-8)
    for (let i = 0; i < HOTBAR_SLOTS; i++) {
      const slot = this.createSlot(i, 'inventory')
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
   * Create furnace area with slots and progress indicators
   */
  private createFurnaceArea(): void {
    const furnaceArea = document.createElement('div')
    furnaceArea.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 16px;
      background: #6b6b6b;
      border-radius: 4px;
    `

    // Left side: Input and Fuel slots
    const leftSide = document.createElement('div')
    leftSide.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    `

    // Input slot (top)
    this.inputSlotElement = this.createSlot(-1, 'input')
    leftSide.appendChild(this.inputSlotElement)

    // Burn progress (fire icon)
    const burnContainer = document.createElement('div')
    burnContainer.style.cssText = `
      width: 48px;
      height: 24px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    `
    this.burnProgressElement = document.createElement('div')
    this.burnProgressElement.style.cssText = `
      width: 20px;
      height: 20px;
      background: #333;
      clip-path: polygon(50% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
      position: relative;
      overflow: hidden;
    `
    const burnFill = document.createElement('div')
    burnFill.className = 'burn-fill'
    burnFill.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0%;
      background: #ff6600;
      transition: height 0.1s;
    `
    this.burnProgressElement.appendChild(burnFill)
    burnContainer.appendChild(this.burnProgressElement)
    leftSide.appendChild(burnContainer)

    // Fuel slot (bottom)
    this.fuelSlotElement = this.createSlot(-2, 'fuel')
    leftSide.appendChild(this.fuelSlotElement)

    furnaceArea.appendChild(leftSide)

    // Smelt progress arrow
    const arrowContainer = document.createElement('div')
    arrowContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    `
    this.smeltProgressElement = document.createElement('div')
    this.smeltProgressElement.style.cssText = `
      width: 48px;
      height: 24px;
      background: #555;
      position: relative;
      overflow: hidden;
    `
    const smeltFill = document.createElement('div')
    smeltFill.className = 'smelt-fill'
    smeltFill.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 0%;
      background: #4caf50;
      transition: width 0.1s;
    `
    this.smeltProgressElement.appendChild(smeltFill)
    
    const arrowText = document.createElement('div')
    arrowText.textContent = '→'
    arrowText.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      color: #888;
    `
    this.smeltProgressElement.appendChild(arrowText)
    arrowContainer.appendChild(this.smeltProgressElement)
    furnaceArea.appendChild(arrowContainer)

    // Output slot
    this.outputSlotElement = this.createSlot(-3, 'output')
    this.outputSlotElement.style.cssText += `
      width: 56px;
      height: 56px;
      background: #a0a0a0;
      border-color: #505050;
      border-top-color: #d0d0d0;
      border-left-color: #d0d0d0;
    `
    furnaceArea.appendChild(this.outputSlotElement)

    this.container!.appendChild(furnaceArea)
  }

  /**
   * Create a single slot element
   */
  private createSlot(index: number, source: 'inventory' | 'fuel' | 'input' | 'output'): HTMLElement {
    const slot = document.createElement('div')
    slot.className = `${source}-slot`
    slot.dataset.slotIndex = String(index)
    slot.dataset.source = source
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
    slot.addEventListener('dragstart', (e) => this.handleDragStart(e, index, source))
    slot.addEventListener('dragover', (e) => this.handleDragOver(e))
    slot.addEventListener('drop', (e) => this.handleDrop(e, index, source))
    slot.addEventListener('dragend', () => this.handleDragEnd())

    // Click for output slot
    if (source === 'output') {
      slot.addEventListener('click', () => this.handleOutputClick())
    }

    return slot
  }

  /**
   * Setup keyboard listener
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
  private handleDragStart(e: DragEvent, index: number, source: 'inventory' | 'fuel' | 'input' | 'output'): void {
    if (source === 'output') {
      e.preventDefault()
      return
    }

    let slot: ItemSlot | null = null
    
    if (source === 'inventory' && this.inventory) {
      slot = this.inventory.getSlot(index)
    } else if (this.furnacePosition) {
      const furnace = FurnaceManager.getInstance().getFurnace(
        this.furnacePosition.x, this.furnacePosition.y, this.furnacePosition.z
      )
      if (furnace) {
        if (source === 'fuel') slot = furnace.fuelSlot
        else if (source === 'input') slot = furnace.inputSlot
      }
    }

    if (!slot || isSlotEmpty(slot)) {
      e.preventDefault()
      return
    }

    this.draggedSlotIndex = index
    this.dragSource = source
    this.draggedElement = e.target as HTMLElement
    
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', `${source}:${index}`)
    }

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
  private handleDrop(e: DragEvent, targetIndex: number, targetSource: 'inventory' | 'fuel' | 'input' | 'output'): void {
    e.preventDefault()
    
    if (targetSource === 'output') return
    if (this.draggedSlotIndex < 0 && this.dragSource === 'inventory') return
    if (!this.furnacePosition || !this.inventory) return

    const furnaceInstance = FurnaceManager.getInstance().getFurnaceInstance(
      this.furnacePosition.x, this.furnacePosition.y, this.furnacePosition.z
    )
    if (!furnaceInstance) return

    // Get source slot
    let sourceSlot: ItemSlot | null = null
    if (this.dragSource === 'inventory') {
      sourceSlot = this.inventory.getSlot(this.draggedSlotIndex)
    } else if (this.dragSource === 'fuel') {
      sourceSlot = furnaceInstance.state.fuelSlot
    } else if (this.dragSource === 'input') {
      sourceSlot = furnaceInstance.state.inputSlot
    }

    if (!sourceSlot || isSlotEmpty(sourceSlot)) return

    // Perform transfer
    if (this.dragSource === 'inventory' && targetSource === 'inventory') {
      this.inventory.swapSlots(this.draggedSlotIndex, targetIndex)
    } else if (this.dragSource === 'inventory' && targetSource === 'fuel') {
      const added = furnaceInstance.addFuel(sourceSlot.itemType!, sourceSlot.count)
      if (added) {
        this.inventory.setSlot(this.draggedSlotIndex, createEmptySlot())
      }
    } else if (this.dragSource === 'inventory' && targetSource === 'input') {
      const added = furnaceInstance.addInput(sourceSlot.itemType!, sourceSlot.count)
      if (added) {
        this.inventory.setSlot(this.draggedSlotIndex, createEmptySlot())
      }
    } else if (this.dragSource === 'fuel' && targetSource === 'inventory') {
      const targetSlot = this.inventory.getSlot(targetIndex)
      if (isSlotEmpty(targetSlot!)) {
        this.inventory.setSlot(targetIndex, { ...sourceSlot })
        furnaceInstance.state.fuelSlot = createEmptySlot()
      }
    } else if (this.dragSource === 'input' && targetSource === 'inventory') {
      const targetSlot = this.inventory.getSlot(targetIndex)
      if (isSlotEmpty(targetSlot!)) {
        this.inventory.setSlot(targetIndex, { ...sourceSlot })
        furnaceInstance.state.inputSlot = createEmptySlot()
      }
    }

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
   * Handle output slot click
   */
  private handleOutputClick(): void {
    if (!this.furnacePosition || !this.inventory) return

    const output = FurnaceManager.getInstance().takeOutput(
      this.furnacePosition.x, this.furnacePosition.y, this.furnacePosition.z
    )
    
    if (output) {
      this.inventory.addItem(output.itemType, output.count)
      this.update()
    }
  }

  /**
   * Open the furnace UI
   */
  open(inventory: Inventory, x: number, y: number, z: number): void {
    this.inventory = inventory
    this.furnacePosition = { x, y, z }
    this._isOpen = true
    
    if (this.overlay) {
      this.overlay.style.display = 'flex'
    }

    // Start update interval
    this.updateInterval = window.setInterval(() => this.update(), 100)

    this.update()

    if (this.onOpenCallback) {
      this.onOpenCallback()
    }
  }

  /**
   * Close the furnace UI
   */
  close(): void {
    this._isOpen = false
    this.furnacePosition = null
    
    if (this.overlay) {
      this.overlay.style.display = 'none'
    }

    // Stop update interval
    if (this.updateInterval !== null) {
      window.clearInterval(this.updateInterval)
      this.updateInterval = null
    }

    if (this.onCloseCallback) {
      this.onCloseCallback()
    }
  }

  /**
   * Check if UI is open
   */
  get isOpen(): boolean {
    return this._isOpen
  }

  /**
   * Update all slot displays
   */
  update(): void {
    if (!this.inventory || !this.furnacePosition) return

    // Update inventory slots
    for (let i = 0; i < INVENTORY_TOTAL_SLOTS; i++) {
      const slot = this.inventory.getSlot(i)
      const element = this.slotElements[i]
      if (slot && element) {
        this.updateSlotDisplay(element, slot)
      }
    }

    // Update furnace slots
    const furnace = FurnaceManager.getInstance().getFurnace(
      this.furnacePosition.x, this.furnacePosition.y, this.furnacePosition.z
    )

    if (furnace) {
      if (this.fuelSlotElement) {
        this.updateSlotDisplay(this.fuelSlotElement, furnace.fuelSlot)
      }
      if (this.inputSlotElement) {
        this.updateSlotDisplay(this.inputSlotElement, furnace.inputSlot)
      }
      if (this.outputSlotElement) {
        this.updateSlotDisplay(this.outputSlotElement, furnace.outputSlot)
      }

      // Update burn progress
      if (this.burnProgressElement) {
        const burnFill = this.burnProgressElement.querySelector('.burn-fill') as HTMLElement
        if (burnFill) {
          const burnPercent = furnace.burnTimeTotal > 0 
            ? (furnace.burnTimeRemaining / furnace.burnTimeTotal) * 100 
            : 0
          burnFill.style.height = `${burnPercent}%`
        }
      }

      // Update smelt progress
      if (this.smeltProgressElement) {
        const smeltFill = this.smeltProgressElement.querySelector('.smelt-fill') as HTMLElement
        if (smeltFill) {
          const smeltPercent = furnace.smeltProgress * 100
          smeltFill.style.width = `${smeltPercent}%`
        }
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
      if (icon) {
        icon.style.backgroundImage = ''
        icon.style.backgroundColor = 'transparent'
      }
      if (countLabel) {
        countLabel.textContent = ''
      }
    } else {
      if (icon && slot.itemType !== null) {
        this.setSlotTexture(icon, slot.itemType)
      }
      if (countLabel) {
        countLabel.textContent = slot.count > 1 ? String(slot.count) : ''
      }
    }
  }

  /**
   * Set slot texture
   */
  private setSlotTexture(icon: HTMLElement, blockType: BlockType): void {
    try {
      const atlas = getSharedTextureAtlas()
      const atlasCanvas = atlas.getCanvas()
      const config = atlas.getConfig()

      const textureIndex = getTextureIndexForFace(blockType, 'side')
      
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
   * Dispose
   */
  dispose(): void {
    if (this.updateInterval !== null) {
      window.clearInterval(this.updateInterval)
    }
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay)
    }
    this.overlay = null
    this.container = null
    this.slotElements = []
  }
}
