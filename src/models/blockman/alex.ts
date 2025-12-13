/**
 * Alex Character Model Definition
 * Feature: 013-character-model-view
 */

import { CharacterModelDefinition } from '../../player/CharacterTypes'

/**
 * Alex - Green shirt character
 */
export const alexCharacter: CharacterModelDefinition = {
  id: 'alex',
  name: 'Alex',
  style: 'blockman',
  isDefault: false,
  colors: {
    head: 0xe8c4a0,    // Lighter skin tone
    body: 0x5cb85c,    // Green shirt
    arms: 0xe8c4a0,    // Lighter skin tone
    legs: 0x5a4a3a,    // Brown pants
    eyes: 0x2e8b57     // Green eyes
  }
}
