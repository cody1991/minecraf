/**
 * Default Character Model Definition
 * Feature: 013-character-model-view
 */

import { CharacterModelDefinition } from '../../player/CharacterTypes'

/**
 * Default blockman character - gray colored
 */
export const defaultCharacter: CharacterModelDefinition = {
  id: 'default',
  name: '默认角色',
  style: 'blockman',
  isDefault: true,
  colors: {
    head: 0xd4a574,    // Skin tone
    body: 0x808080,    // Gray shirt
    arms: 0xd4a574,    // Skin tone
    legs: 0x4a4a4a,    // Dark gray pants
    eyes: 0x000000     // Black eyes
  }
}
