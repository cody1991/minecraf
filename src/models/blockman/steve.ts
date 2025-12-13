/**
 * Steve Character Model Definition
 * Feature: 013-character-model-view
 */

import { CharacterModelDefinition } from '../../player/CharacterTypes'

/**
 * Steve - Classic blue shirt character
 */
export const steveCharacter: CharacterModelDefinition = {
  id: 'steve',
  name: 'Steve',
  style: 'blockman',
  isDefault: false,
  colors: {
    head: 0xd4a574,    // Skin tone
    body: 0x4a90d9,    // Blue shirt
    arms: 0xd4a574,    // Skin tone
    legs: 0x3d5a80,    // Blue jeans
    eyes: 0x000000     // Black eyes
  }
}
