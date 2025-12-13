/**
 * Knight Character Model Definition
 * Feature: 013-character-model-view
 */

import { CharacterModelDefinition } from '../../player/CharacterTypes'

/**
 * Knight - Silver armor character
 */
export const knightCharacter: CharacterModelDefinition = {
  id: 'knight',
  name: '骑士',
  style: 'blockman',
  isDefault: false,
  colors: {
    head: 0xc0c0c0,    // Silver helmet
    body: 0xa8a8a8,    // Silver armor
    arms: 0xb0b0b0,    // Silver gauntlets
    legs: 0x808080,    // Dark silver greaves
    eyes: 0x1a1a1a     // Dark visor
  }
}
