/**
 * CraftingTableUI - 3×3 crafting table interface
 * Feature: 023-crafting-tools-system
 * 
 * Displays 3×3 crafting grid with drag-and-drop support.
 * Opens when right-clicking a crafting table block.
 */

import { BlockType, BLOCK_COLORS, BLOCK_NAMES } from '../core/Block'
import { Inventory } from '../player/Inventory'
import { INVENTORY_TOTAL_SLOTS, HOTBAR_SLOTS, ItemSlot, isSlotEmpty, createEmptySlot } from '../player/InventoryConstants'
import { getSharedTextureAtlas } from '../renderer/ChunkMesh'
import { getTextureIndexForFace } from '../renderer/BlockTextures'
import { RecipeRegistry } from '../crafting/RecipeRegistry'
import { CraftingRecipe } from '../crafting/CraftingRecipe'
import { ToolSystem } from '../tools/ToolSystem'

// Crafting grid size for 3×3
const CRAFTING_GRID_SIZE = 9
const CRAFTING_OUTPUT_INDEX = -1

/**
 * Crafting Table UI component
 */
export class CraftingTableUI {
  private container: HTMLElement | null = null
  private overlay: HTMLElement | null = null
  private slotElements: HTMLElement[] = []
  private inventory: Inventory | null = null
  private _isOpen: boolean = false

  // Crafting grid state
  private craftingGrid: ItemSlot[] = []
  private craftingSlotElements: HTMLElement[] = []
  private craftingOutputElement: HTMLElement | null = null
  private currentRecipe: CraftingRecipe | null = null

  // Drag state
  private draggedSlotIndex: number = -1
  private draggedElement: HTMLElement | null = null
  private dragSource: 'inventory' | 'crafting' | 'output' = 'inventory'

  // Cursor item (for split stack feature)
  private cursorItem: ItemSlot = createEmptySlot()
  private cursorElement: HTMLElement | null = null

  // Tooltip element
  private tooltipElement: HTMLElement | null = null

  // Callbacks
  private onOpenCallback: (() => void) | null = null
  private onCloseCallback: (() => void) | null = null

  constructor() {
    // Initialize 3×3 crafting grid
    for (let i = 0; i < CRAFTING_GRID_SIZE; i++) {
      this.craftingGrid.push(createEmptySlot())
    }
    
    this.createUI()
    this.createTooltip()
    this.createCursorItem()
    this.setupKeyboardListener()
  }

  /**
   * Create the crafting table UI elements
   */
  private createUI(): void {
    // Create overlay
    this.overlay = document.createElement('div')
    this.overlay.id = 'crafting-table-overlay'
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
    this.container.id = 'crafting-table-container'
    this.container.style.cssText = `
      background: #8b8b8b;
      border: 4px solid #373737;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `

    // Create title
    const title = document.createElement('div')
    title.textContent = '工作台'
    title.style.cssText = `
      color: #404040;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
      text-align: center;
    `
    this.container.appendChild(title)

    // Create crafting area
    this.createCraftingArea()

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

    // Track mouse movement for cursor item
    this.overlay.addEventListener('mousemove', (e) => {
      this.updateCursorPosition(e.clientX, e.clientY)
    })
  }

  /**
   * Create tooltip element
   */
  private createTooltip(): void {
    this.tooltipElement = document.createElement('div')
    this.tooltipElement.id = 'crafting-tooltip'
    this.tooltipElement.style.cssText = `
      position: fixed;
      background: rgba(20, 0, 30, 0.94);
      border: 2px solid #28007a;
      border-radius: 4px;
      padding: 6px 10px;
      color: white;
      font-size: 14px;
      pointer-events: none;
      z-index: 1100;
      display: none;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    `
    document.body.appendChild(this.tooltipElement)
  }

  /**
   * Create cursor item element
   */
  private createCursorItem(): void {
    this.cursorElement = document.createElement('div')
    this.cursorElement.id = 'crafting-cursor-item'
    this.cursorElement.style.cssText = `
      position: fixed;
      width: 32px;
      height: 32px;
      pointer-events: none;
      z-index: 1200;
      display: none;
      image-rendering: pixelated;
    `
    
    const icon = document.createElement('div')
    icon.className = 'cursor-icon'
    icon.style.cssText = `
      width: 32px;
      height: 32px;
      background-size: cover;
      image-rendering: pixelated;
    `
    this.cursorElement.appendChild(icon)
    
    const count = document.createElement('span')
    count.className = 'cursor-count'
    count.style.cssText = `
      position: absolute;
      bottom: 0;
      right: 2px;
      font-size: 12px;
      color: white;
      text-shadow: 1px 1px 1px black, -1px -1px 1px black;
    `
    this.cursorElement.appendChild(count)
    
    document.body.appendChild(this.cursorElement)
  }

  /**
   * Update cursor position
   */
  private updateCursorPosition(x: number, y: number): void {
    if (this.cursorElement) {
      this.cursorElement.style.left = `${x - 16}px`
      this.cursorElement.style.top = `${y - 16}px`
    }
  }

  /**
   * Update cursor display
   */
  private updateCursorDisplay(): void {
    if (!this.cursorElement) return
    
    const icon = this.cursorElement.querySelector('.cursor-icon') as HTMLElement
    const countLabel = this.cursorElement.querySelector('.cursor-count') as HTMLElement
    
    if (isSlotEmpty(this.cursorItem)) {
      this.cursorElement.style.display = 'none'
    } else {
      this.cursorElement.style.display = 'block'
      if (icon && this.cursorItem.itemType !== null) {
        this.setSlotTexture(icon, this.cursorItem.itemType)
      }
      if (countLabel) {
        countLabel.textContent = this.cursorItem.count > 1 ? String(this.cursorItem.count) : ''
      }
    }
  }

  /**
   * Show tooltip
   */
  private showTooltip(slot: ItemSlot, x: number, y: number): void {
    if (!this.tooltipElement || isSlotEmpty(slot) || slot.itemType === null) {
      this.hideTooltip()
      return
    }
    
    const name = BLOCK_NAMES[slot.itemType] || `物品 #${slot.itemType}`
    let tooltipText = name
    
    if (slot.durability !== undefined && slot.maxDurability !== undefined) {
      tooltipText += `\n耐久度: ${slot.durability}/${slot.maxDurability}`
    }
    
    this.tooltipElement.innerHTML = tooltipText.replace('\n', '<br>')
    this.tooltipElement.style.display = 'block'
    this.tooltipElement.style.left = `${x + 12}px`
    this.tooltipElement.style.top = `${y + 12}px`
  }

  /**
   * Hide tooltip
   */
  private hideTooltip(): void {
    if (this.tooltipElement) {
      this.tooltipElement.style.display = 'none'
    }
  }

  /**
   * Create 3×3 crafting area
   */
  private createCraftingArea(): void {
    const craftingArea = document.createElement('div')
    craftingArea.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 16px;
      background: #6b6b6b;
      border-radius: 4px;
    `

    // 3×3 crafting grid
    const craftingGrid = document.createElement('div')
    craftingGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(3, 48px);
      gap: 4px;
    `

    for (let i = 0; i < CRAFTING_GRID_SIZE; i++) {
      const slot = this.createSlot(i, 'crafting')
      craftingGrid.appendChild(slot)
      this.craftingSlotElements[i] = slot
    }
    craftingArea.appendChild(craftingGrid)

    // Arrow
    const arrow = document.createElement('div')
    arrow.textContent = '→'
    arrow.style.cssText = `
      font-size: 32px;
      color: #404040;
    `
    craftingArea.appendChild(arrow)

    // Output slot
    this.craftingOutputElement = this.createSlot(CRAFTING_OUTPUT_INDEX, 'output')
    this.craftingOutputElement.style.cssText += `
      width: 56px;
      height: 56px;
      background: #a0a0a0;
      border-color: #505050;
      border-top-color: #d0d0d0;
      border-left-color: #d0d0d0;
    `
    craftingArea.appendChild(this.craftingOutputElement)

    this.container!.appendChild(craftingArea)
  }

  /**
   * Create a single slot element
   */
  private createSlot(index: number, source: 'inventory' | 'crafting' | 'output'): HTMLElement {
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

    // Durability bar
    const durabilityBar = document.createElement('div')
    durabilityBar.className = 'durability-bar'
    durabilityBar.style.cssText = `
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      height: 3px;
      background: #333;
      display: none;
    `
    const durabilityFill = document.createElement('div')
    durabilityFill.className = 'durability-fill'
    durabilityFill.style.cssText = `
      height: 100%;
      background: #4caf50;
      transition: width 0.1s;
    `
    durabilityBar.appendChild(durabilityFill)
    slot.appendChild(durabilityBar)

    // Drag and drop events
    slot.draggable = true
    slot.addEventListener('dragstart', (e) => this.handleDragStart(e, index, source))
    slot.addEventListener('dragover', (e) => this.handleDragOver(e))
    slot.addEventListener('drop', (e) => this.handleDrop(e, index, source))
    slot.addEventListener('dragend', () => this.handleDragEnd())

    // Click events
    slot.addEventListener('click', (e) => this.handleSlotClick(e, index, source))

    // Right-click for split stack
    slot.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this.handleRightClick(index, source)
    })

    // Hover for tooltip
    slot.addEventListener('mouseenter', (e) => {
      const slotData = this.getSlotData(index, source)
      if (slotData && !isSlotEmpty(slotData)) {
        this.showTooltip(slotData, e.clientX, e.clientY)
      }
    })
    
    slot.addEventListener('mousemove', (e) => {
      const slotData = this.getSlotData(index, source)
      if (slotData && !isSlotEmpty(slotData)) {
        this.showTooltip(slotData, e.clientX, e.clientY)
      }
    })
    
    slot.addEventListener('mouseleave', () => {
      this.hideTooltip()
    })

    return slot
  }

  /**
   * Get slot data
   */
  private getSlotData(index: number, source: 'inventory' | 'crafting' | 'output'): ItemSlot | null {
    if (source === 'inventory' && this.inventory) {
      return this.inventory.getSlot(index) ?? null
    } else if (source === 'crafting') {
      return this.craftingGrid[index] ?? null
    } else if (source === 'output' && this.currentRecipe) {
      return { itemType: this.currentRecipe.result.item, count: this.currentRecipe.result.count }
    }
    return null
  }

  /**
   * Handle slot click
   */
  private handleSlotClick(_e: MouseEvent, index: number, source: 'inventory' | 'crafting' | 'output'): void {
    if (source === 'output') {
      this.handleOutputClick()
      return
    }

    if (!isSlotEmpty(this.cursorItem)) {
      this.placeCursorItem(index, source)
    } else {
      this.pickupItem(index, source)
    }
  }

  /**
   * Handle right-click (split/place one)
   */
  private handleRightClick(index: number, source: 'inventory' | 'crafting' | 'output'): void {
    if (source === 'output') return

    if (!isSlotEmpty(this.cursorItem)) {
      this.placeOneItem(index, source)
      return
    }

    const slot = this.getSlotData(index, source)
    if (!slot || isSlotEmpty(slot)) return

    const halfCount = Math.ceil(slot.count / 2)
    const remainCount = slot.count - halfCount

    this.cursorItem = {
      itemType: slot.itemType,
      count: halfCount,
      durability: slot.durability,
      maxDurability: slot.maxDurability
    }

    if (remainCount > 0) {
      if (source === 'inventory' && this.inventory) {
        this.inventory.setSlot(index, { itemType: slot.itemType, count: remainCount, durability: slot.durability, maxDurability: slot.maxDurability })
      } else if (source === 'crafting') {
        this.craftingGrid[index] = { itemType: slot.itemType, count: remainCount, durability: slot.durability, maxDurability: slot.maxDurability }
      }
    } else {
      if (source === 'inventory' && this.inventory) {
        this.inventory.setSlot(index, createEmptySlot())
      } else if (source === 'crafting') {
        this.craftingGrid[index] = createEmptySlot()
      }
    }

    this.updateCursorDisplay()
    this.updateCraftingOutput()
    this.update()
  }

  /**
   * Pick up item
   */
  private pickupItem(index: number, source: 'inventory' | 'crafting'): void {
    const slot = this.getSlotData(index, source)
    if (!slot || isSlotEmpty(slot)) return

    this.cursorItem = { itemType: slot.itemType, count: slot.count, durability: slot.durability, maxDurability: slot.maxDurability }

    if (source === 'inventory' && this.inventory) {
      this.inventory.setSlot(index, createEmptySlot())
    } else if (source === 'crafting') {
      this.craftingGrid[index] = createEmptySlot()
    }

    this.updateCursorDisplay()
    this.updateCraftingOutput()
    this.update()
  }

  /**
   * Place cursor item
   */
  private placeCursorItem(index: number, source: 'inventory' | 'crafting'): void {
    if (isSlotEmpty(this.cursorItem)) return

    const targetSlot = this.getSlotData(index, source)

    if (!targetSlot || isSlotEmpty(targetSlot)) {
      if (source === 'inventory' && this.inventory) {
        this.inventory.setSlot(index, { itemType: this.cursorItem.itemType, count: this.cursorItem.count, durability: this.cursorItem.durability, maxDurability: this.cursorItem.maxDurability })
      } else if (source === 'crafting') {
        this.craftingGrid[index] = { itemType: this.cursorItem.itemType, count: this.cursorItem.count, durability: this.cursorItem.durability, maxDurability: this.cursorItem.maxDurability }
      }
      this.cursorItem = createEmptySlot()
    } else if (targetSlot.itemType === this.cursorItem.itemType && targetSlot.durability === undefined) {
      const maxStack = 64
      const canAdd = maxStack - targetSlot.count
      const toAdd = Math.min(canAdd, this.cursorItem.count)
      
      if (toAdd > 0) {
        if (source === 'inventory' && this.inventory) {
          this.inventory.setSlot(index, { itemType: targetSlot.itemType, count: targetSlot.count + toAdd })
        } else if (source === 'crafting') {
          this.craftingGrid[index] = { itemType: targetSlot.itemType, count: targetSlot.count + toAdd }
        }
        this.cursorItem.count -= toAdd
        if (this.cursorItem.count <= 0) this.cursorItem = createEmptySlot()
      }
    } else {
      const temp: ItemSlot = { itemType: targetSlot.itemType, count: targetSlot.count, durability: targetSlot.durability, maxDurability: targetSlot.maxDurability }
      if (source === 'inventory' && this.inventory) {
        this.inventory.setSlot(index, { itemType: this.cursorItem.itemType, count: this.cursorItem.count, durability: this.cursorItem.durability, maxDurability: this.cursorItem.maxDurability })
      } else if (source === 'crafting') {
        this.craftingGrid[index] = { itemType: this.cursorItem.itemType, count: this.cursorItem.count, durability: this.cursorItem.durability, maxDurability: this.cursorItem.maxDurability }
      }
      this.cursorItem = temp
    }

    this.updateCursorDisplay()
    this.updateCraftingOutput()
    this.update()
  }

  /**
   * Place one item
   */
  private placeOneItem(index: number, source: 'inventory' | 'crafting'): void {
    if (isSlotEmpty(this.cursorItem)) return

    const targetSlot = this.getSlotData(index, source)

    if (!targetSlot || isSlotEmpty(targetSlot)) {
      if (source === 'inventory' && this.inventory) {
        this.inventory.setSlot(index, { itemType: this.cursorItem.itemType, count: 1, durability: this.cursorItem.durability, maxDurability: this.cursorItem.maxDurability })
      } else if (source === 'crafting') {
        this.craftingGrid[index] = { itemType: this.cursorItem.itemType, count: 1, durability: this.cursorItem.durability, maxDurability: this.cursorItem.maxDurability }
      }
      this.cursorItem.count--
      if (this.cursorItem.count <= 0) this.cursorItem = createEmptySlot()
    } else if (targetSlot.itemType === this.cursorItem.itemType && targetSlot.count < 64 && targetSlot.durability === undefined) {
      if (source === 'inventory' && this.inventory) {
        this.inventory.setSlot(index, { itemType: targetSlot.itemType, count: targetSlot.count + 1 })
      } else if (source === 'crafting') {
        this.craftingGrid[index] = { itemType: targetSlot.itemType, count: targetSlot.count + 1 }
      }
      this.cursorItem.count--
      if (this.cursorItem.count <= 0) this.cursorItem = createEmptySlot()
    }

    this.updateCursorDisplay()
    this.updateCraftingOutput()
    this.update()
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
  private handleDragStart(e: DragEvent, index: number, source: 'inventory' | 'crafting' | 'output'): void {
    if (source === 'output') {
      e.preventDefault()
      return
    }

    let slot: ItemSlot | null = null
    
    if (source === 'inventory' && this.inventory) {
      slot = this.inventory.getSlot(index) ?? null
    } else if (source === 'crafting') {
      slot = this.craftingGrid[index] ?? null
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
  private handleDrop(e: DragEvent, targetIndex: number, targetSource: 'inventory' | 'crafting' | 'output'): void {
    e.preventDefault()
    
    if (targetSource === 'output') return
    if (this.draggedSlotIndex < 0) return
    if (this.dragSource === targetSource && this.draggedSlotIndex === targetIndex) return

    let sourceSlot: ItemSlot | null = null
    let targetSlot: ItemSlot | null = null

    if (this.dragSource === 'inventory' && this.inventory) {
      sourceSlot = this.inventory.getSlot(this.draggedSlotIndex) ?? null
    } else if (this.dragSource === 'crafting') {
      sourceSlot = this.craftingGrid[this.draggedSlotIndex] ?? null
    }

    if (targetSource === 'inventory' && this.inventory) {
      targetSlot = this.inventory.getSlot(targetIndex) ?? null
    } else if (targetSource === 'crafting') {
      targetSlot = this.craftingGrid[targetIndex] ?? null
    }

    if (!sourceSlot) return

    // Perform swap/move
    if (this.dragSource === 'inventory' && targetSource === 'inventory' && this.inventory) {
      this.inventory.swapSlots(this.draggedSlotIndex, targetIndex)
    } else if (this.dragSource === 'crafting' && targetSource === 'crafting') {
      const srcSlot = this.craftingGrid[this.draggedSlotIndex]
      const tgtSlot = this.craftingGrid[targetIndex]
      if (srcSlot && tgtSlot) {
        const temp: ItemSlot = { itemType: tgtSlot.itemType, count: tgtSlot.count, durability: tgtSlot.durability, maxDurability: tgtSlot.maxDurability }
        this.craftingGrid[targetIndex] = { itemType: srcSlot.itemType, count: srcSlot.count, durability: srcSlot.durability, maxDurability: srcSlot.maxDurability }
        this.craftingGrid[this.draggedSlotIndex] = temp
      }
    } else {
      if (this.dragSource === 'inventory' && targetSource === 'crafting' && this.inventory) {
        if (targetSlot && isSlotEmpty(targetSlot)) {
          this.craftingGrid[targetIndex] = { itemType: sourceSlot.itemType, count: sourceSlot.count, durability: sourceSlot.durability, maxDurability: sourceSlot.maxDurability }
          this.inventory.setSlot(this.draggedSlotIndex, createEmptySlot())
        } else if (targetSlot) {
          const temp: ItemSlot = { itemType: targetSlot.itemType, count: targetSlot.count, durability: targetSlot.durability, maxDurability: targetSlot.maxDurability }
          this.craftingGrid[targetIndex] = { itemType: sourceSlot.itemType, count: sourceSlot.count, durability: sourceSlot.durability, maxDurability: sourceSlot.maxDurability }
          this.inventory.setSlot(this.draggedSlotIndex, temp)
        }
      } else if (this.dragSource === 'crafting' && targetSource === 'inventory' && this.inventory) {
        if (targetSlot && isSlotEmpty(targetSlot)) {
          this.inventory.setSlot(targetIndex, { itemType: sourceSlot.itemType, count: sourceSlot.count, durability: sourceSlot.durability, maxDurability: sourceSlot.maxDurability })
          this.craftingGrid[this.draggedSlotIndex] = createEmptySlot()
        } else {
          const invSlot = this.inventory.getSlot(targetIndex)
          if (invSlot) {
            const temp: ItemSlot = { itemType: invSlot.itemType, count: invSlot.count, durability: invSlot.durability, maxDurability: invSlot.maxDurability }
            this.inventory.setSlot(targetIndex, { itemType: sourceSlot.itemType, count: sourceSlot.count, durability: sourceSlot.durability, maxDurability: sourceSlot.maxDurability })
            this.craftingGrid[this.draggedSlotIndex] = temp
          }
        }
      }
    }

    this.updateCraftingOutput()
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
    if (!this.currentRecipe || !this.inventory) return

    const result = this.currentRecipe.result

    const canAdd = this.inventory.canAddItem(result.item, result.count)
    if (!canAdd) {
      console.log('[CraftingTableUI] Inventory full')
      return
    }

    // Add result with durability for tools
    const toolSystem = ToolSystem.getInstance()
    if (toolSystem.isTool(result.item)) {
      const maxDurability = toolSystem.getMaxDurability(result.item)
      this.inventory.addItemWithDurability(result.item, result.count, maxDurability, maxDurability)
    } else {
      this.inventory.addItem(result.item, result.count)
    }

    this.consumeCraftingIngredients()
    this.updateCraftingOutput()
    this.update()
  }

  /**
   * Consume crafting ingredients
   */
  private consumeCraftingIngredients(): void {
    if (!this.currentRecipe) return

    if (this.currentRecipe.type === 'shaped' && this.currentRecipe.pattern) {
      const pattern = this.currentRecipe.pattern
      const ingredients = this.currentRecipe.ingredients

      // Find pattern offset in grid
      let startRow = -1
      let startCol = -1
      
      outer: for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const gridIndex = row * 3 + col
          const slot = this.craftingGrid[gridIndex]
          if (slot && !isSlotEmpty(slot)) {
            startRow = row
            startCol = col
            break outer
          }
        }
      }

      if (startRow >= 0 && startCol >= 0) {
        for (let py = 0; py < pattern.length; py++) {
          const patternRow = pattern[py]
          if (!patternRow) continue
          for (let px = 0; px < patternRow.length; px++) {
            const char = patternRow[px]
            if (char && char !== ' ' && ingredients[char]) {
              const gridRow = startRow + py
              const gridCol = startCol + px
              if (gridRow < 3 && gridCol < 3) {
                const idx = gridRow * 3 + gridCol
                const slot = this.craftingGrid[idx]
                if (slot && !isSlotEmpty(slot)) {
                  slot.count--
                  if (slot.count <= 0) {
                    this.craftingGrid[idx] = createEmptySlot()
                  }
                }
              }
            }
          }
        }
      }
    } else {
      // Shapeless - consume one from each non-empty slot
      for (let i = 0; i < CRAFTING_GRID_SIZE; i++) {
        const slot = this.craftingGrid[i]
        if (slot && !isSlotEmpty(slot)) {
          slot.count--
          if (slot.count <= 0) {
            this.craftingGrid[i] = createEmptySlot()
          }
        }
      }
    }
  }

  /**
   * Update crafting output
   */
  private updateCraftingOutput(): void {
    const registry = RecipeRegistry.getInstance()
    
    // Convert to 3×3 grid
    const grid: (BlockType | null)[][] = [
      [this.craftingGrid[0]?.itemType ?? null, this.craftingGrid[1]?.itemType ?? null, this.craftingGrid[2]?.itemType ?? null],
      [this.craftingGrid[3]?.itemType ?? null, this.craftingGrid[4]?.itemType ?? null, this.craftingGrid[5]?.itemType ?? null],
      [this.craftingGrid[6]?.itemType ?? null, this.craftingGrid[7]?.itemType ?? null, this.craftingGrid[8]?.itemType ?? null]
    ]

    this.currentRecipe = registry.findMatch(grid)

    if (this.craftingOutputElement) {
      if (this.currentRecipe) {
        const outputSlot: ItemSlot = {
          itemType: this.currentRecipe.result.item,
          count: this.currentRecipe.result.count
        }
        this.updateSlotDisplay(this.craftingOutputElement, outputSlot)
      } else {
        this.updateSlotDisplay(this.craftingOutputElement, createEmptySlot())
      }
    }
  }

  /**
   * Open the crafting table UI
   */
  open(inventory: Inventory): void {
    this.inventory = inventory
    this._isOpen = true
    
    if (this.overlay) {
      this.overlay.style.display = 'flex'
    }

    this.updateCraftingOutput()
    this.update()

    if (this.onOpenCallback) {
      this.onOpenCallback()
    }
  }

  /**
   * Close the crafting table UI
   */
  close(): void {
    this.returnCursorItem()
    this.returnCraftingItems()
    
    this._isOpen = false
    
    if (this.overlay) {
      this.overlay.style.display = 'none'
    }

    this.hideTooltip()
    if (this.cursorElement) {
      this.cursorElement.style.display = 'none'
    }

    if (this.onCloseCallback) {
      this.onCloseCallback()
    }
  }

  /**
   * Return cursor item to inventory
   */
  private returnCursorItem(): void {
    if (!this.inventory || isSlotEmpty(this.cursorItem)) return

    if (this.cursorItem.itemType !== null) {
      const added = this.inventory.addItem(this.cursorItem.itemType, this.cursorItem.count)
      if (added < this.cursorItem.count) {
        console.log(`[CraftingTableUI] Could not return ${this.cursorItem.count - added} cursor items`)
      }
    }
    this.cursorItem = createEmptySlot()
    this.updateCursorDisplay()
  }

  /**
   * Return items from crafting grid to inventory
   */
  private returnCraftingItems(): void {
    if (!this.inventory) return

    for (let i = 0; i < CRAFTING_GRID_SIZE; i++) {
      const slot = this.craftingGrid[i]
      if (slot && !isSlotEmpty(slot) && slot.itemType !== null) {
        const added = this.inventory.addItem(slot.itemType, slot.count)
        if (added < slot.count) {
          console.log(`[CraftingTableUI] Could not return ${slot.count - added} items`)
        }
        this.craftingGrid[i] = createEmptySlot()
      }
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
    if (!this.inventory) return

    for (let i = 0; i < INVENTORY_TOTAL_SLOTS; i++) {
      const slot = this.inventory.getSlot(i)
      const element = this.slotElements[i]
      if (slot && element) {
        this.updateSlotDisplay(element, slot)
      }
    }

    for (let i = 0; i < CRAFTING_GRID_SIZE; i++) {
      const element = this.craftingSlotElements[i]
      const slot = this.craftingGrid[i]
      if (element && slot) {
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
    const durabilityBar = element.querySelector('.durability-bar') as HTMLElement
    const durabilityFill = element.querySelector('.durability-fill') as HTMLElement

    if (isSlotEmpty(slot)) {
      if (icon) {
        icon.style.backgroundImage = ''
        icon.style.backgroundColor = 'transparent'
      }
      if (countLabel) {
        countLabel.textContent = ''
      }
      if (durabilityBar) {
        durabilityBar.style.display = 'none'
      }
    } else {
      if (icon && slot.itemType !== null) {
        this.setSlotTexture(icon, slot.itemType)
      }
      if (countLabel) {
        countLabel.textContent = slot.count > 1 ? String(slot.count) : ''
      }
      
      if (durabilityBar && durabilityFill && slot.durability !== undefined && slot.maxDurability !== undefined) {
        const percent = (slot.durability / slot.maxDurability) * 100
        durabilityBar.style.display = 'block'
        durabilityFill.style.width = `${percent}%`
        
        if (percent > 50) {
          durabilityFill.style.background = '#4caf50'
        } else if (percent > 25) {
          durabilityFill.style.background = '#ff9800'
        } else {
          durabilityFill.style.background = '#f44336'
        }
      } else if (durabilityBar) {
        durabilityBar.style.display = 'none'
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
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay)
    }
    if (this.tooltipElement && this.tooltipElement.parentNode) {
      this.tooltipElement.parentNode.removeChild(this.tooltipElement)
    }
    if (this.cursorElement && this.cursorElement.parentNode) {
      this.cursorElement.parentNode.removeChild(this.cursorElement)
    }
    this.overlay = null
    this.container = null
    this.tooltipElement = null
    this.cursorElement = null
    this.slotElements = []
    this.craftingSlotElements = []
    this.craftingOutputElement = null
  }
}
