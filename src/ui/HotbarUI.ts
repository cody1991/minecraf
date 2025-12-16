/**
 * HotbarUI - Bottom hotbar displaying inventory items
 * Feature: 019-inventory-system
 * 
 * Displays 9 hotbar slots with item icons and counts.
 * Supports number key (1-9) and scroll wheel selection.
 */

import { BlockType, BLOCK_NAMES, BLOCK_COLORS } from '../core/Block'
import { Inventory } from '../player/Inventory'
import { HOTBAR_SLOTS, ItemSlot, isSlotEmpty } from '../player/InventoryConstants'
import { getSharedTextureAtlas } from '../renderer/ChunkMesh'
import { getTextureIndexForFace } from '../renderer/BlockTextures'

/**
 * Hotbar UI component
 */
export class HotbarUI {
  private container: HTMLElement | null = null
  private slotElements: HTMLElement[] = []
  private inventory: Inventory | null = null
  private selectedIndex: number = 0
  private texturePreviewsGenerated: boolean = false

  constructor() {
    this.container = document.getElementById('block-selector')
    if (this.container) {
      this.createSlots()
    }
  }

  /**
   * Set inventory reference
   */
  setInventory(inventory: Inventory): void {
    this.inventory = inventory
    this.selectedIndex = inventory.selectedSlot
    
    // Listen for inventory changes
    inventory.setOnChange(() => this.update())
    
    // Initial update
    this.update()
    
    // Generate texture previews after a short delay
    setTimeout(() => this.generateTexturePreviews(), 100)
  }

  /**
   * Create hotbar slot elements
   */
  private createSlots(): void {
    if (!this.container) return

    // Clear existing content
    this.container.innerHTML = ''
    this.slotElements = []

    // Create 9 hotbar slots
    for (let i = 0; i < HOTBAR_SLOTS; i++) {
      const slot = document.createElement('div')
      slot.className = 'block-slot'
      slot.dataset.slotIndex = String(i)
      slot.title = `${i + 1}: 空`
      slot.style.cssText = `
        position: relative;
        width: 48px;
        height: 48px;
        background: rgba(0, 0, 0, 0.5);
        border: 2px solid #555;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        image-rendering: pixelated;
      `

      // Item icon
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
        font-size: 11px;
        color: white;
        text-shadow: 1px 1px 1px black;
        pointer-events: none;
      `
      slot.appendChild(count)

      // Key number indicator
      const keyLabel = document.createElement('span')
      keyLabel.className = 'slot-key'
      keyLabel.textContent = String(i + 1)
      keyLabel.style.cssText = `
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 10px;
        color: #aaa;
        text-shadow: 1px 1px 1px black;
        pointer-events: none;
      `
      slot.appendChild(keyLabel)

      // Click handler
      slot.addEventListener('click', () => {
        this.selectSlot(i)
      })

      this.container.appendChild(slot)
      this.slotElements.push(slot)
    }
  }

  /**
   * Select a hotbar slot
   */
  selectSlot(index: number): void {
    if (index < 0 || index >= HOTBAR_SLOTS) return
    
    this.selectedIndex = index
    
    if (this.inventory) {
      this.inventory.selectedSlot = index
    }

    this.updateSelection()
  }

  /**
   * Select next slot (scroll down)
   */
  selectNext(): void {
    this.selectSlot((this.selectedIndex + 1) % HOTBAR_SLOTS)
  }

  /**
   * Select previous slot (scroll up)
   */
  selectPrevious(): void {
    this.selectSlot((this.selectedIndex - 1 + HOTBAR_SLOTS) % HOTBAR_SLOTS)
  }

  /**
   * Update the selection highlight
   */
  private updateSelection(): void {
    this.slotElements.forEach((slot, i) => {
      if (i === this.selectedIndex) {
        slot.style.borderColor = '#fff'
        slot.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.5)'
        slot.classList.add('selected')
      } else {
        slot.style.borderColor = '#555'
        slot.style.boxShadow = 'none'
        slot.classList.remove('selected')
      }
    })
  }

  /**
   * Update all slot displays from inventory
   */
  update(): void {
    if (!this.inventory) return

    for (let i = 0; i < HOTBAR_SLOTS; i++) {
      const slot = this.inventory.getSlot(i)
      const element = this.slotElements[i]
      if (slot && element) {
        this.updateSlotDisplay(element, slot, i)
      }
    }

    this.selectedIndex = this.inventory.selectedSlot
    this.updateSelection()
  }

  /**
   * Update a single slot's display
   */
  private updateSlotDisplay(element: HTMLElement, slot: ItemSlot, index: number): void {
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
      element.title = `${index + 1}: 空`
    } else {
      // Filled slot
      if (icon && slot.itemType !== null) {
        this.setSlotTexture(icon, slot.itemType)
        element.title = `${index + 1}: ${BLOCK_NAMES[slot.itemType]} x${slot.count}`
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
   * Generate texture previews (called after atlas is ready)
   */
  private generateTexturePreviews(): void {
    if (this.texturePreviewsGenerated) return
    this.update()
    this.texturePreviewsGenerated = true
  }

  /**
   * Get currently selected item type
   */
  getSelectedItemType(): BlockType | null {
    if (!this.inventory) return null
    const slot = this.inventory.getSelectedItem()
    return slot.itemType
  }

  /**
   * Get currently selected slot index
   */
  getSelectedIndex(): number {
    return this.selectedIndex
  }

  /**
   * Refresh display
   */
  refresh(): void {
    this.texturePreviewsGenerated = false
    this.generateTexturePreviews()
  }
}
