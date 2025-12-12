/**
 * BlockSelector UI component - displays available blocks with texture preview
 * Feature: 005-block-textures
 */

import { BlockType, BLOCK_NAMES, BLOCK_COLORS, PLACEABLE_BLOCKS } from '../core/Block'
import { getSharedTextureAtlas } from '../renderer/ChunkMesh'
import { getTextureIndexForFace } from '../renderer/BlockTextures'

/**
 * BlockSelector UI component - displays available blocks and current selection
 */
export class BlockSelector {
  private container: HTMLElement | null
  private slots: HTMLElement[] = []
  private selectedIndex: number = 0
  private texturePreviewsGenerated: boolean = false

  constructor() {
    this.container = document.getElementById('block-selector')
    if (this.container) {
      this.createSlots()
      this.updateSelection(BlockType.GRASS)
      // Generate texture previews after a short delay to ensure atlas is ready
      setTimeout(() => this.generateTexturePreviews(), 100)
    }
  }

  /**
   * Create block slots in the UI
   */
  private createSlots(): void {
    if (!this.container) return

    // Clear existing content
    this.container.innerHTML = ''
    this.slots = []

    // Create a slot for each placeable block
    PLACEABLE_BLOCKS.forEach((blockType, index) => {
      const slot = document.createElement('div')
      slot.className = 'block-slot'
      slot.title = `${this.getKeyLabel(index)}: ${BLOCK_NAMES[blockType]}`
      slot.dataset.blockType = String(blockType)

      // Set initial background color (fallback)
      const color = BLOCK_COLORS[blockType]
      slot.style.backgroundColor = `#${color.toString(16).padStart(6, '0')}`

      // Add number indicator
      const number = document.createElement('span')
      number.className = 'block-slot-number'
      number.textContent = this.getKeyLabel(index)
      number.style.cssText = `
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 10px;
        color: white;
        text-shadow: 1px 1px 1px black;
        pointer-events: none;
      `
      slot.style.position = 'relative'
      slot.appendChild(number)

      // Add click handler
      slot.addEventListener('click', () => {
        this.selectBlock(index)
      })

      this.container!.appendChild(slot)
      this.slots.push(slot)
    })

    // Add scroll handling if too many blocks
    this.setupScrollHandling()
  }

  /**
   * Get key label for block index
   */
  private getKeyLabel(index: number): string {
    if (index < 9) {
      return String(index + 1) // 1-9
    } else if (index === 9) {
      return '0' // 0 for 10th block
    } else {
      return '' // No key for blocks beyond 10
    }
  }

  /**
   * Setup scroll handling for many blocks
   */
  private setupScrollHandling(): void {
    if (!this.container) return

    // Add horizontal scroll on wheel
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault()
      this.container!.scrollLeft += e.deltaY
    })

    // Add scroll indicators if needed
    if (PLACEABLE_BLOCKS.length > 10) {
      this.container.style.overflowX = 'auto'
      this.container.style.maxWidth = '100%'
    }
  }

  /**
   * Generate texture previews from the texture atlas
   */
  private generateTexturePreviews(): void {
    if (this.texturePreviewsGenerated) return

    try {
      const atlas = getSharedTextureAtlas()
      const atlasCanvas = atlas.getCanvas()
      const config = atlas.getConfig()

      this.slots.forEach((slot, index) => {
        const blockType = PLACEABLE_BLOCKS[index]
        if (blockType === undefined) return

        // Get the texture index for the side face (most representative)
        const textureIndex = getTextureIndexForFace(blockType, 'side')
        
        // Create a small canvas for this block's texture preview
        const previewCanvas = document.createElement('canvas')
        previewCanvas.width = config.tileSize
        previewCanvas.height = config.tileSize
        const ctx = previewCanvas.getContext('2d')
        
        if (ctx) {
          // Copy the texture from the atlas
          const srcX = textureIndex * config.tileSize
          const srcY = 0
          
          ctx.drawImage(
            atlasCanvas,
            srcX, srcY, config.tileSize, config.tileSize,
            0, 0, config.tileSize, config.tileSize
          )

          // Set as background image
          slot.style.backgroundImage = `url(${previewCanvas.toDataURL()})`
          slot.style.backgroundSize = 'cover'
          slot.style.imageRendering = 'pixelated'
          // Remove solid color background
          slot.style.backgroundColor = 'transparent'
        }
      })

      this.texturePreviewsGenerated = true
    } catch (e) {
      console.warn('Could not generate texture previews, using fallback colors')
    }
  }

  /**
   * Select a block by index
   */
  private selectBlock(index: number): void {
    if (index >= 0 && index < PLACEABLE_BLOCKS.length) {
      const blockType = PLACEABLE_BLOCKS[index]
      if (blockType !== undefined) {
        this.updateSelection(blockType)
        // Dispatch custom event for player to pick up
        window.dispatchEvent(new CustomEvent('blockselected', { 
          detail: { blockType, index } 
        }))
      }
    }
  }

  /**
   * Update the selected block display
   */
  updateSelection(blockType: BlockType): void {
    // Find index of block type
    const index = PLACEABLE_BLOCKS.indexOf(blockType)
    if (index === -1) return

    // Update selected state
    this.selectedIndex = index
    this.slots.forEach((slot, i) => {
      slot.classList.toggle('selected', i === index)
    })

    // Scroll selected block into view
    const selectedSlot = this.slots[index]
    if (selectedSlot && this.container) {
      selectedSlot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  /**
   * Get the currently selected block type
   */
  getSelectedBlockType(): BlockType {
    return PLACEABLE_BLOCKS[this.selectedIndex] ?? BlockType.GRASS
  }

  /**
   * Refresh texture previews (call after texture atlas is fully loaded)
   */
  refreshTexturePreviews(): void {
    this.texturePreviewsGenerated = false
    this.generateTexturePreviews()
  }
}
