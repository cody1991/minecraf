import { BlockType, BLOCK_NAMES, BLOCK_COLORS, PLACEABLE_BLOCKS } from '../core/Block'

/**
 * BlockSelector UI component - displays available blocks and current selection
 */
export class BlockSelector {
  private container: HTMLElement | null
  private slots: HTMLElement[] = []
  private selectedIndex: number = 0

  constructor() {
    this.container = document.getElementById('block-selector')
    if (this.container) {
      this.createSlots()
      this.updateSelection(BlockType.GRASS)
    }
  }

  /**
   * Create block slots in the UI
   */
  private createSlots(): void {
    if (!this.container) return

    // Clear existing content
    this.container.innerHTML = ''

    // Create a slot for each placeable block
    PLACEABLE_BLOCKS.forEach((blockType, index) => {
      const slot = document.createElement('div')
      slot.className = 'block-slot'
      slot.title = `${index + 1}: ${BLOCK_NAMES[blockType]}`

      // Set background color
      const color = BLOCK_COLORS[blockType]
      slot.style.backgroundColor = `#${color.toString(16).padStart(6, '0')}`

      // Add number indicator
      const number = document.createElement('span')
      number.textContent = String(index + 1)
      number.style.cssText = `
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 10px;
        color: white;
        text-shadow: 1px 1px 1px black;
      `
      slot.style.position = 'relative'
      slot.appendChild(number)

      this.container!.appendChild(slot)
      this.slots.push(slot)
    })
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
  }

  /**
   * Get the currently selected block type
   */
  getSelectedBlockType(): BlockType {
    return PLACEABLE_BLOCKS[this.selectedIndex] ?? BlockType.GRASS
  }
}
