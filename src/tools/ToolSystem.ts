/**
 * ToolSystem - Tool usage logic
 * Feature: 023-crafting-tools-system
 * 
 * Manages tool properties, speed multipliers, and durability.
 */

import { BlockType } from '../core/Block'
import { ToolMaterial, ToolType } from './ToolTypes'
import { 
  ToolProperties, 
  TOOL_PROPERTIES, 
  createToolProperties,
  MATERIAL_DURABILITY
} from './ToolProperties'

/**
 * Tool system singleton
 */
export class ToolSystem {
  private static instance: ToolSystem | null = null
  private initialized: boolean = false

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): ToolSystem {
    if (!ToolSystem.instance) {
      ToolSystem.instance = new ToolSystem()
    }
    return ToolSystem.instance
  }

  /**
   * Initialize tool properties
   * Must be called after BlockType enum is extended with tool types
   */
  initialize(): void {
    if (this.initialized) return

    // Register all tool properties
    const tools: Array<{ blockType: BlockType, material: ToolMaterial, type: ToolType }> = [
      // Wood tools
      { blockType: BlockType.WOODEN_PICKAXE, material: ToolMaterial.WOOD, type: ToolType.PICKAXE },
      { blockType: BlockType.WOODEN_AXE, material: ToolMaterial.WOOD, type: ToolType.AXE },
      { blockType: BlockType.WOODEN_SHOVEL, material: ToolMaterial.WOOD, type: ToolType.SHOVEL },
      { blockType: BlockType.WOODEN_SWORD, material: ToolMaterial.WOOD, type: ToolType.SWORD },
      { blockType: BlockType.WOODEN_HOE, material: ToolMaterial.WOOD, type: ToolType.HOE },
      // Stone tools
      { blockType: BlockType.STONE_PICKAXE, material: ToolMaterial.STONE, type: ToolType.PICKAXE },
      { blockType: BlockType.STONE_AXE, material: ToolMaterial.STONE, type: ToolType.AXE },
      { blockType: BlockType.STONE_SHOVEL, material: ToolMaterial.STONE, type: ToolType.SHOVEL },
      { blockType: BlockType.STONE_SWORD, material: ToolMaterial.STONE, type: ToolType.SWORD },
      { blockType: BlockType.STONE_HOE, material: ToolMaterial.STONE, type: ToolType.HOE },
      // Iron tools
      { blockType: BlockType.IRON_PICKAXE, material: ToolMaterial.IRON, type: ToolType.PICKAXE },
      { blockType: BlockType.IRON_AXE, material: ToolMaterial.IRON, type: ToolType.AXE },
      { blockType: BlockType.IRON_SHOVEL, material: ToolMaterial.IRON, type: ToolType.SHOVEL },
      { blockType: BlockType.IRON_SWORD, material: ToolMaterial.IRON, type: ToolType.SWORD },
      { blockType: BlockType.IRON_HOE, material: ToolMaterial.IRON, type: ToolType.HOE },
      // Diamond tools
      { blockType: BlockType.DIAMOND_PICKAXE, material: ToolMaterial.DIAMOND, type: ToolType.PICKAXE },
      { blockType: BlockType.DIAMOND_AXE, material: ToolMaterial.DIAMOND, type: ToolType.AXE },
      { blockType: BlockType.DIAMOND_SHOVEL, material: ToolMaterial.DIAMOND, type: ToolType.SHOVEL },
      { blockType: BlockType.DIAMOND_SWORD, material: ToolMaterial.DIAMOND, type: ToolType.SWORD },
      { blockType: BlockType.DIAMOND_HOE, material: ToolMaterial.DIAMOND, type: ToolType.HOE },
    ]

    for (const tool of tools) {
      TOOL_PROPERTIES.set(tool.blockType, createToolProperties(tool.material, tool.type))
    }

    this.initialized = true
    console.log(`[ToolSystem] Initialized with ${TOOL_PROPERTIES.size} tools`)
  }

  /**
   * Check if an item is a tool
   */
  isTool(itemType: BlockType): boolean {
    return TOOL_PROPERTIES.has(itemType)
  }

  /**
   * Get tool properties
   */
  getProperties(toolType: BlockType): ToolProperties | null {
    return TOOL_PROPERTIES.get(toolType) || null
  }

  /**
   * Get speed multiplier for a tool against a block
   * @returns Multiplier (1 if tool not effective)
   */
  getSpeedMultiplier(toolType: BlockType, blockType: BlockType): number {
    const props = TOOL_PROPERTIES.get(toolType)
    if (!props) return 1

    // Check if tool is effective against this block
    if (props.effectiveBlocks.includes(blockType)) {
      return props.speedMultiplier
    }

    return 1
  }

  /**
   * Use a tool (reduce durability)
   * @returns New durability and whether tool broke
   */
  useTool(_toolType: BlockType, currentDurability: number): { newDurability: number, broken: boolean } {
    const newDurability = currentDurability - 1
    return {
      newDurability,
      broken: newDurability <= 0
    }
  }

  /**
   * Get max durability for a tool
   */
  getMaxDurability(toolType: BlockType): number {
    const props = TOOL_PROPERTIES.get(toolType)
    if (!props) return 0
    return MATERIAL_DURABILITY[props.material]
  }

  /**
   * Check if item should have durability
   */
  hasDurability(itemType: BlockType): boolean {
    return this.isTool(itemType)
  }
}

// Export singleton getter for convenience
export function getToolSystem(): ToolSystem {
  return ToolSystem.getInstance()
}
