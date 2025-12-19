/**
 * Tool System - Main entry point
 * Feature: 023-crafting-tools-system
 * 
 * Exports all tool system components.
 */

export { ToolMaterial, ToolType, getMaterialName, getToolTypeName, getToolName } from './ToolTypes'
export type { ToolProperties } from './ToolProperties'
export { 
  TOOL_PROPERTIES, 
  MATERIAL_DURABILITY, 
  MATERIAL_SPEED,
  PICKAXE_EFFECTIVE,
  AXE_EFFECTIVE,
  SHOVEL_EFFECTIVE,
  getEffectiveBlocks,
  createToolProperties
} from './ToolProperties'
export { ToolSystem, getToolSystem } from './ToolSystem'

import { ToolSystem } from './ToolSystem'

/**
 * Initialize the tool system
 */
export function initializeToolSystem(): void {
  console.log('[ToolSystem] Initializing...')
  ToolSystem.getInstance().initialize()
}
