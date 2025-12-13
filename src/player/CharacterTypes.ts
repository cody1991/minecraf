/**
 * Character Types - Shared type definitions for character model system
 * Feature: 013-character-model-view
 */

/**
 * View mode enumeration
 */
export enum ViewMode {
  FIRST_PERSON = 'first_person',
  THIRD_PERSON = 'third_person'
}

/**
 * Character animation types
 */
export type CharacterAnimation = 'idle' | 'walk' | 'jump'

/**
 * Model style types
 */
export type ModelStyle = 'blockman' | 'custom'

/**
 * Character colors configuration
 */
export interface CharacterColors {
  /** Head color (hex) */
  head: number
  /** Body color (hex) */
  body: number
  /** Arms color (hex) */
  arms: number
  /** Legs color (hex) */
  legs: number
  /** Eyes color (hex, optional) */
  eyes?: number
}

/**
 * Character model definition - metadata and appearance config
 */
export interface CharacterModelDefinition {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** Model style category */
  style: ModelStyle
  /** Whether this is the default model */
  isDefault: boolean
  /** Body part colors */
  colors: CharacterColors
  /** Thumbnail URL (optional, for UI display) */
  thumbnailUrl?: string
}

/**
 * Player preference settings
 */
export interface PlayerPreference {
  /** Selected character model ID */
  selectedModelId: string
  /** Last saved timestamp */
  savedAt: number
}
