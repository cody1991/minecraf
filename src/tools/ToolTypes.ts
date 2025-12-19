/**
 * ToolTypes - Tool type definitions
 * Feature: 023-crafting-tools-system
 * 
 * Defines tool materials and types.
 */

/**
 * Tool material enum
 */
export enum ToolMaterial {
  WOOD = 'wood',
  STONE = 'stone',
  IRON = 'iron',
  DIAMOND = 'diamond'
}

/**
 * Tool type enum
 */
export enum ToolType {
  PICKAXE = 'pickaxe',
  AXE = 'axe',
  SHOVEL = 'shovel',
  SWORD = 'sword',
  HOE = 'hoe'
}

/**
 * Get material display name
 */
export function getMaterialName(material: ToolMaterial): string {
  const names: Record<ToolMaterial, string> = {
    [ToolMaterial.WOOD]: '木',
    [ToolMaterial.STONE]: '石',
    [ToolMaterial.IRON]: '铁',
    [ToolMaterial.DIAMOND]: '钻石'
  }
  return names[material]
}

/**
 * Get tool type display name
 */
export function getToolTypeName(type: ToolType): string {
  const names: Record<ToolType, string> = {
    [ToolType.PICKAXE]: '镐',
    [ToolType.AXE]: '斧',
    [ToolType.SHOVEL]: '锹',
    [ToolType.SWORD]: '剑',
    [ToolType.HOE]: '锄'
  }
  return names[type]
}

/**
 * Get full tool name
 */
export function getToolName(material: ToolMaterial, type: ToolType): string {
  return getMaterialName(material) + getToolTypeName(type)
}
