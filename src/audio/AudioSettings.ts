/**
 * Audio settings persistence module
 * Feature: 012-sound-map-system
 */

import { AudioSettings, DEFAULT_AUDIO_SETTINGS } from './AudioTypes'

const STORAGE_KEY = 'webcraft_audio_settings'

/**
 * Load audio settings from LocalStorage
 */
export function loadAudioSettings(): AudioSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge with defaults to handle missing fields
      return {
        ...DEFAULT_AUDIO_SETTINGS,
        ...parsed
      }
    }
  } catch (e) {
    console.warn('[AudioSettings] Failed to load settings:', e)
  }
  return { ...DEFAULT_AUDIO_SETTINGS }
}

/**
 * Save audio settings to LocalStorage
 */
export function saveAudioSettings(settings: AudioSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.warn('[AudioSettings] Failed to save settings:', e)
  }
}

/**
 * Reset audio settings to defaults
 */
export function resetAudioSettings(): AudioSettings {
  const defaults = { ...DEFAULT_AUDIO_SETTINGS }
  saveAudioSettings(defaults)
  return defaults
}
