/**
 * CharacterModelLibrary - Manages all available character models
 * Feature: 013-character-model-view
 */

import { CharacterModelDefinition } from './CharacterTypes'
import { CharacterModel } from './CharacterModel'

/**
 * CharacterModelLibrary - Singleton that manages character model definitions
 */
export class CharacterModelLibrary {
  private static instance: CharacterModelLibrary | null = null
  
  /** All registered model definitions */
  private models: Map<string, CharacterModelDefinition> = new Map()
  
  /** Default model ID */
  private defaultModelId: string = 'default'
  
  private constructor() {}
  
  /**
   * Get singleton instance
   */
  static getInstance(): CharacterModelLibrary {
    if (!CharacterModelLibrary.instance) {
      CharacterModelLibrary.instance = new CharacterModelLibrary()
    }
    return CharacterModelLibrary.instance
  }
  
  /**
   * Register a model definition
   */
  registerModel(definition: CharacterModelDefinition): void {
    if (this.models.has(definition.id)) {
      console.warn(`[ModelLibrary] Model '${definition.id}' already registered, overwriting`)
    }
    
    this.models.set(definition.id, definition)
    
    // Update default if this is the default model
    if (definition.isDefault) {
      this.defaultModelId = definition.id
    }
    
    console.log(`[ModelLibrary] Registered model: ${definition.name} (${definition.id})`)
  }
  
  /**
   * Get all available model definitions
   */
  getAvailableModels(): CharacterModelDefinition[] {
    return Array.from(this.models.values())
  }
  
  /**
   * Get model definition by ID
   */
  getModelById(id: string): CharacterModelDefinition | undefined {
    return this.models.get(id)
  }
  
  /**
   * Get the default model definition
   */
  getDefaultModel(): CharacterModelDefinition {
    const defaultModel = this.models.get(this.defaultModelId)
    if (!defaultModel) {
      // Fallback: return first model or throw
      const first = this.models.values().next().value
      if (!first) {
        throw new Error('[ModelLibrary] No models registered')
      }
      return first
    }
    return defaultModel
  }
  
  /**
   * Create a model instance by ID
   * Falls back to default model if ID not found
   */
  createModelInstance(id: string): CharacterModel {
    let definition = this.models.get(id)
    
    if (!definition) {
      console.warn(`[ModelLibrary] Model '${id}' not found, using default`)
      definition = this.getDefaultModel()
    }
    
    return new CharacterModel(definition)
  }
  
  /**
   * Get the number of registered models
   */
  getModelCount(): number {
    return this.models.size
  }
  
  /**
   * Check if a model ID exists
   */
  hasModel(id: string): boolean {
    return this.models.has(id)
  }
  
  /**
   * Clear all registered models (for testing)
   */
  clear(): void {
    this.models.clear()
    this.defaultModelId = 'default'
  }
}
