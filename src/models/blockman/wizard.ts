/**
 * Wizard Character Model Definition
 * Feature: 013-character-model-view
 */

import { CharacterModelDefinition } from '../../player/CharacterTypes'

/**
 * Wizard - Purple robe character
 */
export const wizardCharacter: CharacterModelDefinition = {
  id: 'wizard',
  name: '法师',
  style: 'blockman',
  isDefault: false,
  colors: {
    head: 0xd4a574,    // Skin tone
    body: 0x6b3fa0,    // Purple robe
    arms: 0x7b4fb0,    // Purple sleeves
    legs: 0x5a2f90,    // Dark purple robe bottom
    eyes: 0x9370db     // Purple magical eyes
  }
}
