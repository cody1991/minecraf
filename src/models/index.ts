/**
 * Model Registration - Registers all character models with the library
 * Feature: 013-character-model-view
 */

import { CharacterModelLibrary } from '../player/CharacterModelLibrary'

// Import all model definitions
import { defaultCharacter } from './blockman/default'
import { steveCharacter } from './blockman/steve'
import { alexCharacter } from './blockman/alex'
import { knightCharacter } from './blockman/knight'
import { wizardCharacter } from './blockman/wizard'

/**
 * Initialize and register all character models
 * Call this once at game startup
 */
export function initializeModelLibrary(): void {
  const library = CharacterModelLibrary.getInstance()
  
  // Register all blockman models
  library.registerModel(defaultCharacter)
  library.registerModel(steveCharacter)
  library.registerModel(alexCharacter)
  library.registerModel(knightCharacter)
  library.registerModel(wizardCharacter)
  
  console.log(`[Models] Initialized ${library.getModelCount()} character models`)
}

// Re-export model definitions for direct access
export { defaultCharacter } from './blockman/default'
export { steveCharacter } from './blockman/steve'
export { alexCharacter } from './blockman/alex'
export { knightCharacter } from './blockman/knight'
export { wizardCharacter } from './blockman/wizard'
