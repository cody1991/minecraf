/**
 * Audio system type definitions
 * Feature: 012-sound-map-system
 */

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
  { name: 'ambient', path: '/audio/music/ambient.mp3', type: 'music', preload: true },
  
  // Footstep sounds
  { name: 'footstep_grass', path: '/audio/footsteps/grass.mp3', type: 'sfx', preload: true },
  { name: 'footstep_stone', path: '/audio/footsteps/stone.mp3', type: 'sfx', preload: true },
  { name: 'footstep_sand', path: '/audio/footsteps/sand.mp3', type: 'sfx', preload: true },
  { name: 'footstep_wood', path: '/audio/footsteps/wood.mp3', type: 'sfx', preload: true },
  
  // Fall sounds
  { name: 'fall_light', path: '/audio/effects/fall_light.mp3', type: 'sfx', preload: true },
  { name: 'fall_heavy', path: '/audio/effects/fall_heavy.mp3', type: 'sfx', preload: true },
  
  // Animal sounds (lazy loaded)
  { name: 'cow', path: '/audio/animals/cow.mp3', type: 'sfx', preload: false },
  { name: 'pig', path: '/audio/animals/pig.mp3', type: 'sfx', preload: false },
  { name: 'sheep', path: '/audio/animals/sheep.mp3', type: 'sfx', preload: false },
  { name: 'chicken', path: '/audio/animals/chicken.mp3', type: 'sfx', preload: false },
  { name: 'wolf', path: '/audio/animals/wolf.mp3', type: 'sfx', preload: false },
  { name: 'fox', path: '/audio/animals/fox.mp3', type: 'sfx', preload: false },
]

/**
 * Footstep sound mapping by block type category
 */
export type FootstepCategory = 'grass' | 'stone' | 'sand' | 'wood'

/**
 * Animal sound mapping
 */
export type AnimalSoundType = 'cow' | 'pig' | 'sheep' | 'chicken' | 'wolf' | 'fox'
