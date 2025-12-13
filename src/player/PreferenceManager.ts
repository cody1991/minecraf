/**
 * PreferenceManager - Manages player preferences in LocalStorage
 * Feature: 013-character-model-view
 */

import { PlayerPreference } from './CharacterTypes'
import { PREFERENCE_STORAGE_KEY } from './CharacterConstants'

/**
 * PreferenceManager - Handles saving and loading player preferences
 */
export class PreferenceManager {
  private static instance: PreferenceManager | null = null
  
  /**
   * Get singleton instance
   */
  static getInstance(): PreferenceManager {
    if (!PreferenceManager.instance) {
      PreferenceManager.instance = new PreferenceManager()
    }
    return PreferenceManager.instance
  }
  
  /**
   * Get saved preference
   * @returns Preference object or null if not found
   */
  getPreference(): PlayerPreference | null {
    try {
      const stored = localStorage.getItem(PREFERENCE_STORAGE_KEY)
      if (!stored) {
        return null
      }
      
      const parsed = JSON.parse(stored) as PlayerPreference
      
      // Validate structure
      if (typeof parsed.selectedModelId !== 'string' || typeof parsed.savedAt !== 'number') {
        console.warn('[PreferenceManager] Invalid preference structure, clearing')
        this.clearPreference()
        return null
      }
      
      return parsed
    } catch (error) {
      console.error('[PreferenceManager] Error reading preference:', error)
      return null
    }
  }
  
  /**
   * Save preference
   * @param modelId Selected model ID
   */
  savePreference(modelId: string): void {
    try {
      const preference: PlayerPreference = {
        selectedModelId: modelId,
        savedAt: Date.now()
      }
      
      localStorage.setItem(PREFERENCE_STORAGE_KEY, JSON.stringify(preference))
      console.log(`[PreferenceManager] Saved preference: ${modelId}`)
    } catch (error) {
      console.error('[PreferenceManager] Error saving preference:', error)
    }
  }
  
  /**
   * Clear saved preference
   */
  clearPreference(): void {
    try {
      localStorage.removeItem(PREFERENCE_STORAGE_KEY)
      console.log('[PreferenceManager] Cleared preference')
    } catch (error) {
      console.error('[PreferenceManager] Error clearing preference:', error)
    }
  }
  
  /**
   * Get selected model ID or default
   * @param defaultId Default model ID if no preference saved
   */
  getSelectedModelId(defaultId: string = 'default'): string {
    const pref = this.getPreference()
    return pref?.selectedModelId ?? defaultId
  }
}
