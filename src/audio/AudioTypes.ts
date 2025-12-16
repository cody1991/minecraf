/**
 * Audio system type definitions
 * Feature: 012-sound-map-system
 * Updated: 017-block-sound-effects
 */

import { BlockType } from '../core/Block'

/**
 * Audio settings interface - persisted to LocalStorage
 */
export interface AudioSettings {
  masterVolume: number   // 0.0 - 1.0
  musicVolume: number    // 0.0 - 1.0
  sfxVolume: number      // 0.0 - 1.0
  muted: boolean
}

/**
 * Default audio settings
 */
export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  masterVolume: 0.7,
  musicVolume: 0.5,
  sfxVolume: 0.8,
  muted: false
}

/**
 * Sound effect playback options
 */
export interface SfxOptions {
  volume?: number       // 0.0 - 1.0, default 1.0
  loop?: boolean        // default false
  playbackRate?: number // default 1.0
}

/**
 * 3D spatial sound effect options
 */
export interface Sfx3dOptions extends SfxOptions {
  refDistance?: number    // default 1
  maxDistance?: number    // default 50
  rolloffFactor?: number  // default 1
}

/**
 * Audio asset definition
 */
export interface AudioAsset {
  name: string
  path: string
  type: 'music' | 'sfx'
  preload: boolean
}

/**
 * Audio assets registry
 */
export const AUDIO_ASSETS: AudioAsset[] = [
  // Background music
  { name: 'ambient', path: 'audio/music/ambient.mp3', type: 'music', preload: true },
  
  // Footstep sounds
  { name: 'footstep_grass', path: 'audio/footsteps/grass.mp3', type: 'sfx', preload: true },
  { name: 'footstep_stone', path: 'audio/footsteps/stone.mp3', type: 'sfx', preload: true },
  { name: 'footstep_sand', path: 'audio/footsteps/sand.mp3', type: 'sfx', preload: true },
  { name: 'footstep_wood', path: 'audio/footsteps/wood.mp3', type: 'sfx', preload: true },
  
  // Fall sounds
  { name: 'fall_light', path: 'audio/effects/fall_light.mp3', type: 'sfx', preload: true },
  { name: 'fall_heavy', path: 'audio/effects/fall_heavy.mp3', type: 'sfx', preload: true },
  
  // Animal sounds (lazy loaded)
  { name: 'cow', path: 'audio/animals/cow.mp3', type: 'sfx', preload: false },
  { name: 'pig', path: 'audio/animals/pig.mp3', type: 'sfx', preload: false },
  { name: 'sheep', path: 'audio/animals/sheep.mp3', type: 'sfx', preload: false },
  { name: 'chicken', path: 'audio/animals/chicken.mp3', type: 'sfx', preload: false },
  { name: 'wolf', path: 'audio/animals/wolf.mp3', type: 'sfx', preload: false },
  { name: 'fox', path: 'audio/animals/fox.mp3', type: 'sfx', preload: false },
]

/**
 * Footstep sound mapping by block type category
 */
export type FootstepCategory = 'grass' | 'stone' | 'sand' | 'wood'

/**
 * Animal sound mapping
 */
export type AnimalSoundType = 'cow' | 'pig' | 'sheep' | 'chicken' | 'wolf' | 'fox'

/**
 * Block sound category - maps block types to sound categories
 * Feature: 017-block-sound-effects
 */
export type BlockSoundCategory = 'stone' | 'wood' | 'dirt' | 'sand' | 'glass' | 'plant'

/**
 * Block sound action type
 * Feature: 017-block-sound-effects
 * Feature: 023-digging-system - Added 'dig' action
 */
export type BlockSoundAction = 'place' | 'break' | 'dig'

/**
 * Block sound synthesis parameters
 * Feature: 017-block-sound-effects
 */
export interface BlockSoundParams {
  baseFrequency: number      // Base frequency (Hz)
  frequencyRange: number     // Random frequency variation range
  decayRate: number          // Decay rate for envelope
  noiseMix: number           // Noise mix ratio (0-1)
  duration: number           // Sound duration (seconds)
}

/**
 * Block sound parameters for each category
 * Feature: 017-block-sound-effects
 */
export const BLOCK_SOUND_PARAMS: Record<BlockSoundCategory, BlockSoundParams> = {
  stone: {
    baseFrequency: 300,
    frequencyRange: 100,
    decayRate: 50,
    noiseMix: 0.3,
    duration: 0.12
  },
  wood: {
    baseFrequency: 200,
    frequencyRange: 50,
    decayRate: 30,
    noiseMix: 0.2,
    duration: 0.15
  },
  dirt: {
    baseFrequency: 100,
    frequencyRange: 50,
    decayRate: 20,
    noiseMix: 0.5,
    duration: 0.18
  },
  sand: {
    baseFrequency: 150,
    frequencyRange: 50,
    decayRate: 25,
    noiseMix: 0.6,
    duration: 0.15
  },
  glass: {
    baseFrequency: 1000,
    frequencyRange: 200,
    decayRate: 60,
    noiseMix: 0.1,
    duration: 0.10
  },
  plant: {
    baseFrequency: 400,
    frequencyRange: 100,
    decayRate: 35,
    noiseMix: 0.4,
    duration: 0.12
  }
}

/**
 * Get block sound category for a block type
 * Maps all 38 block types to 6 sound categories
 * Feature: 017-block-sound-effects
 * 
 * @param blockType The block type to get the sound category for
 * @returns The sound category for the block type
 */
export function getBlockSoundCategory(blockType: BlockType): BlockSoundCategory {
  switch (blockType) {
    // Stone category
    case BlockType.STONE:
    case BlockType.COBBLESTONE:
    case BlockType.BRICK:
    case BlockType.SANDSTONE:
    case BlockType.SANDSTONE_CARVED:
    case BlockType.DARK_STONE:
    case BlockType.MOSSY_STONE:
    case BlockType.RED_BRICK:
    case BlockType.GOLD_BLOCK:
      return 'stone'

    // Wood category
    case BlockType.WOOD:
    case BlockType.LOG:
    case BlockType.PLANKS:
    case BlockType.OAK_LOG:
    case BlockType.BIRCH_LOG:
    case BlockType.SPRUCE_LOG:
      return 'wood'

    // Dirt category
    case BlockType.GRASS:
    case BlockType.DIRT:
      return 'dirt'

    // Sand category
    case BlockType.SAND:
    case BlockType.SNOW:
      return 'sand'

    // Glass category
    case BlockType.GLASS:
      return 'glass'

    // Plant category
    case BlockType.LEAVES:
    case BlockType.OAK_LEAVES:
    case BlockType.BIRCH_LEAVES:
    case BlockType.SPRUCE_LEAVES:
    case BlockType.FLOWER_RED:
    case BlockType.FLOWER_YELLOW:
    case BlockType.TALL_GRASS:
    case BlockType.MUSHROOM_RED:
    case BlockType.MUSHROOM_BROWN:
    case BlockType.DEAD_BUSH:
    case BlockType.CACTUS:
    case BlockType.ROSE:
    case BlockType.TULIP:
    case BlockType.DAISY:
    case BlockType.CORNFLOWER:
      return 'plant'

    // Water and special blocks - use dirt as default
    case BlockType.WATER:
    case BlockType.TORCH:
    case BlockType.AIR:
    default:
      return 'dirt'
  }
}
