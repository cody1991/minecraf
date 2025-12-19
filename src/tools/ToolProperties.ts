/**
 * ToolProperties - Tool property definitions
 * Feature: 023-crafting-tools-system
 * 
 * Defines tool durability, speed multipliers, and effective blocks.
 */

import { BlockType } from '../core/Block'
import { ToolMaterial, ToolType } from './ToolTypes'

/**
 * Tool properties interface
 */
export interface ToolProperties {
  material: ToolMaterial
  type: ToolType
  durability: number
  speedMultiplier: number
  effectiveBlocks: BlockType[]
}

/**
 * Durability by material (Minecraft vanilla values)
 */
export const MATERIAL_DURABILITY: Record<ToolMaterial, number> = {
  [ToolMaterial.WOOD]: 60,
  [ToolMaterial.STONE]: 131,
  [ToolMaterial.IRON]: 250,
  [ToolMaterial.DIAMOND]: 1561
}

/**
 * Speed multiplier by material (Minecraft vanilla values)
 */
export const MATERIAL_SPEED: Record<ToolMaterial, number> = {
  [ToolMaterial.WOOD]: 2,
  [ToolMaterial.STONE]: 4,
  [ToolMaterial.IRON]: 6,
  [ToolMaterial.DIAMOND]: 8
}

/**
 * Blocks effective for pickaxe
 */
export const PICKAXE_EFFECTIVE: BlockType[] = [
  BlockType.STONE,
  BlockType.COBBLESTONE,
  BlockType.SANDSTONE,
  BlockType.SANDSTONE_CARVED,
  BlockType.BRICK,
  BlockType.DARK_STONE,
  BlockType.MOSSY_STONE,
  BlockType.GOLD_BLOCK,
  BlockType.RED_BRICK
]

/**
 * Blocks effective for axe
 */
export const AXE_EFFECTIVE: BlockType[] = [
  BlockType.LOG,
  BlockType.OAK_LOG,
  BlockType.BIRCH_LOG,
  BlockType.SPRUCE_LOG,
  BlockType.PLANKS,
  BlockType.WOOD
]

/**
 * Blocks effective for shovel
 */
export const SHOVEL_EFFECTIVE: BlockType[] = [
  BlockType.DIRT,
  BlockType.GRASS,
  BlockType.SAND,
  BlockType.SNOW
]

/**
 * Get effective blocks for a tool type
 */
export function getEffectiveBlocks(toolType: ToolType): BlockType[] {
  switch (toolType) {
    case ToolType.PICKAXE:
      return PICKAXE_EFFECTIVE
    case ToolType.AXE:
      return AXE_EFFECTIVE
    case ToolType.SHOVEL:
      return SHOVEL_EFFECTIVE
    case ToolType.SWORD:
      return [] // Sword is for combat, not mining
    case ToolType.HOE:
      return [] // Hoe is for farming
    default:
      return []
  }
}

/**
 * Tool properties map (populated by ToolSystem)
 */
export const TOOL_PROPERTIES: Map<BlockType, ToolProperties> = new Map()

/**
 * Initialize tool properties for a specific tool
 */
export function createToolProperties(
  material: ToolMaterial,
  type: ToolType
): ToolProperties {
  return {
    material,
    type,
    durability: MATERIAL_DURABILITY[material],
    speedMultiplier: MATERIAL_SPEED[material],
    effectiveBlocks: getEffectiveBlocks(type)
  }
}
