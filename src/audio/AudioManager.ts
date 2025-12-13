/**
 * AudioManager - Core audio system manager (Singleton)
 * Feature: 012-sound-map-system
 */

import { AudioSettings, SfxOptions, Sfx3dOptions, AUDIO_ASSETS, FootstepCategory, AnimalSoundType } from './AudioTypes'
import { loadAudioSettings, saveAudioSettings } from './AudioSettings'
import { SoundInstance } from './SoundInstance'
import { BlockType } from '../core/Block'
import { 
  generateAmbientMusic, 
  generateFootstep, 
  generateFallSound, 
  generateAnimalSound 
} from './SynthAudio'

/** Fade duration for music transitions (seconds) */
const MUSIC_FADE_DURATION = 2.0

/**
 * AudioManager - Singleton class for managing all game audio
 */
export class AudioManager {
  private static instance: AudioManager | null = null

  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private musicGain: GainNode | null = null
  private sfxGain: GainNode | null = null

  private settings: AudioSettings
  private bufferCache: Map<string, AudioBuffer> = new Map()
  private currentMusic: SoundInstance | null = null
  private activeSounds: Map<string, SoundInstance> = new Map()
  private soundIdCounter: number = 0

  private isInitialized: boolean = false
  private initPromise: Promise<void> | null = null

  private constructor() {
    this.settings = loadAudioSettings()
  }

  /**
   * Get singleton instance
   */
  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager()
    }
    return AudioManager.instance
  }

  /**
   * Initialize audio system (must be called after user interaction)
   */
  async init(): Promise<void> {
    if (this.isInitialized) return
    if (this.initPromise) return this.initPromise

    this.initPromise = this.doInit()
    return this.initPromise
  }

  private async doInit(): Promise<void> {
    try {
      // Create AudioContext
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) {
        console.warn('[AudioManager] Web Audio API not supported')
        return
      }

      this.audioContext = new AudioContextClass()

      // Resume if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }

      // Create gain nodes
      this.masterGain = this.audioContext.createGain()
      this.musicGain = this.audioContext.createGain()
      this.sfxGain = this.audioContext.createGain()

      // Connect: music/sfx -> master -> destination
      this.musicGain.connect(this.masterGain)
      this.sfxGain.connect(this.masterGain)
      this.masterGain.connect(this.audioContext.destination)

      // Apply initial settings
      this.applySettings()

      // Preload assets
      await this.preloadAssets()

      this.isInitialized = true
      console.log('[AudioManager] Initialized successfully')
    } catch (e) {
      console.warn('[AudioManager] Failed to initialize:', e)
    }
  }

  /**
   * Preload audio assets marked for preloading
   * Falls back to synthesized audio if files not available
   */
  private async preloadAssets(): Promise<void> {
    if (!this.audioContext) return

    // Try to load audio files, fall back to synthesized audio
    const preloadAssets = AUDIO_ASSETS.filter(a => a.preload)
    
    for (const asset of preloadAssets) {
      const buffer = await this.loadSound(asset.path)
      if (!buffer) {
        // Generate synthesized fallback
        const synthBuffer = this.generateSynthBuffer(asset.name)
        if (synthBuffer) {
          this.bufferCache.set(asset.path, synthBuffer)
          console.log(`[AudioManager] Using synthesized audio for: ${asset.name}`)
        }
      }
    }
    
    console.log(`[AudioManager] Preloaded ${preloadAssets.length} audio assets`)
  }

  /**
   * Generate synthesized audio buffer as fallback
   */
  private generateSynthBuffer(name: string): AudioBuffer | null {
    if (!this.audioContext) return null

    try {
      if (name === 'ambient') {
        return generateAmbientMusic(this.audioContext)
      }
      if (name.startsWith('footstep_')) {
        const type = name.replace('footstep_', '') as 'grass' | 'stone' | 'sand' | 'wood'
        return generateFootstep(this.audioContext, type)
      }
      if (name === 'fall_light') {
        return generateFallSound(this.audioContext, false)
      }
      if (name === 'fall_heavy') {
        return generateFallSound(this.audioContext, true)
      }
      if (['cow', 'pig', 'sheep', 'chicken', 'wolf', 'fox'].includes(name)) {
        return generateAnimalSound(this.audioContext, name as 'cow' | 'pig' | 'sheep' | 'chicken' | 'wolf' | 'fox')
      }
    } catch (e) {
      console.warn(`[AudioManager] Failed to generate synth audio for ${name}:`, e)
    }
    return null
  }

  /**
   * Load a sound file into buffer cache
   * Falls back to synthesized audio if file not available
   */
  async loadSound(path: string): Promise<AudioBuffer | null> {
    if (!this.audioContext) return null

    // Check cache
    if (this.bufferCache.has(path)) {
      return this.bufferCache.get(path)!
    }

    try {
      const response = await fetch(path)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      this.bufferCache.set(path, audioBuffer)
      console.log(`[AudioManager] Loaded audio file: ${path}`)
      return audioBuffer
    } catch (e) {
      console.log(`[AudioManager] Failed to load ${path}, generating synth fallback...`, e)
      // Try to generate synthesized fallback
      const asset = AUDIO_ASSETS.find(a => a.path === path)
      if (asset) {
        const synthBuffer = this.generateSynthBuffer(asset.name)
        if (synthBuffer) {
          this.bufferCache.set(path, synthBuffer)
          console.log(`[AudioManager] Generated synth audio for: ${asset.name}, duration: ${synthBuffer.duration}`)
          return synthBuffer
        }
      }
      console.warn(`[AudioManager] No fallback available for: ${path}`)
      return null
    }
  }

  /**
   * Play background music with optional fade-in
   */
  async playMusic(name: string, fadeIn: boolean = true): Promise<void> {
    console.log(`[AudioManager] playMusic called: ${name}`)
    console.log(`[AudioManager] audioContext: ${!!this.audioContext}, musicGain: ${!!this.musicGain}`)
    
    if (!this.audioContext || !this.musicGain) {
      console.warn('[AudioManager] Cannot play music - not initialized')
      return
    }

    const asset = AUDIO_ASSETS.find(a => a.name === name && a.type === 'music')
    if (!asset) {
      console.warn(`[AudioManager] Music not found: ${name}`)
      return
    }

    console.log(`[AudioManager] Loading music from: ${asset.path}`)
    const buffer = await this.loadSound(asset.path)
    console.log(`[AudioManager] Buffer loaded: ${!!buffer}, duration: ${buffer?.duration}`)
    if (!buffer) {
      console.warn('[AudioManager] Failed to load music buffer')
      return
    }

    // Fade out current music
    if (this.currentMusic && this.currentMusic.isPlaying) {
      this.currentMusic.fadeOut(MUSIC_FADE_DURATION, this.audioContext)
    }

    // Create new music source
    const source = this.audioContext.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const gainNode = this.audioContext.createGain()
    gainNode.connect(this.musicGain)

    if (fadeIn) {
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + MUSIC_FADE_DURATION)
    }

    source.connect(gainNode)
    source.start()

    this.currentMusic = new SoundInstance(source, gainNode)
  }

  /**
   * Stop background music with optional fade-out
   */
  stopMusic(fadeOut: boolean = true): void {
    if (!this.audioContext || !this.currentMusic) return

    if (fadeOut) {
      this.currentMusic.fadeOut(MUSIC_FADE_DURATION, this.audioContext)
    } else {
      this.currentMusic.stop()
    }
    this.currentMusic = null
  }

  /**
   * Play a sound effect
   */
  async playSfx(name: string, options: SfxOptions = {}): Promise<SoundInstance | null> {
    if (!this.audioContext || !this.sfxGain) return null

    const asset = AUDIO_ASSETS.find(a => a.name === name)
    if (!asset) {
      console.warn(`[AudioManager] Sound not found: ${name}`)
      return null
    }

    const buffer = await this.loadSound(asset.path)
    if (!buffer) return null

    const source = this.audioContext.createBufferSource()
    source.buffer = buffer
    source.loop = options.loop ?? false
    source.playbackRate.value = options.playbackRate ?? 1.0

    const gainNode = this.audioContext.createGain()
    gainNode.gain.value = options.volume ?? 1.0
    gainNode.connect(this.sfxGain)

    source.connect(gainNode)
    source.start()

    const instance = new SoundInstance(source, gainNode)
    const id = `sfx_${this.soundIdCounter++}`
    this.activeSounds.set(id, instance)

    // Clean up when done
    source.onended = () => {
      this.activeSounds.delete(id)
    }

    return instance
  }

  /**
   * Play a 3D spatial sound effect
   */
  async play3dSfx(
    name: string,
    x: number,
    y: number,
    z: number,
    options: Sfx3dOptions = {}
  ): Promise<SoundInstance | null> {
    if (!this.audioContext || !this.sfxGain) return null

    const asset = AUDIO_ASSETS.find(a => a.name === name)
    if (!asset) {
      console.warn(`[AudioManager] Sound not found: ${name}`)
      return null
    }

    const buffer = await this.loadSound(asset.path)
    if (!buffer) return null

    const source = this.audioContext.createBufferSource()
    source.buffer = buffer
    source.loop = options.loop ?? false
    source.playbackRate.value = options.playbackRate ?? 1.0

    // Create panner for 3D positioning
    const panner = this.audioContext.createPanner()
    panner.distanceModel = 'inverse'
    panner.refDistance = options.refDistance ?? 1
    panner.maxDistance = options.maxDistance ?? 50
    panner.rolloffFactor = options.rolloffFactor ?? 1
    panner.positionX.value = x
    panner.positionY.value = y
    panner.positionZ.value = z

    const gainNode = this.audioContext.createGain()
    gainNode.gain.value = options.volume ?? 1.0

    source.connect(panner)
    panner.connect(gainNode)
    gainNode.connect(this.sfxGain)

    source.start()

    const instance = new SoundInstance(source, gainNode, panner)
    const id = `sfx3d_${this.soundIdCounter++}`
    this.activeSounds.set(id, instance)

    source.onended = () => {
      this.activeSounds.delete(id)
    }

    return instance
  }

  /**
   * Get footstep sound name based on block type
   */
  getFootstepSound(blockType: BlockType): string {
    const category = this.getFootstepCategory(blockType)
    return `footstep_${category}`
  }

  /**
   * Get footstep category for a block type
   */
  private getFootstepCategory(blockType: BlockType): FootstepCategory {
    switch (blockType) {
      case BlockType.GRASS:
      case BlockType.DIRT:
      case BlockType.LEAVES:
      case BlockType.OAK_LEAVES:
      case BlockType.BIRCH_LEAVES:
      case BlockType.SPRUCE_LEAVES:
      case BlockType.SNOW:
        return 'grass'
      
      case BlockType.STONE:
      case BlockType.COBBLESTONE:
      case BlockType.BRICK:
      case BlockType.SANDSTONE:
      case BlockType.SANDSTONE_CARVED:
      case BlockType.DARK_STONE:
      case BlockType.MOSSY_STONE:
      case BlockType.RED_BRICK:
        return 'stone'
      
      case BlockType.SAND:
        return 'sand'
      
      case BlockType.WOOD:
      case BlockType.LOG:
      case BlockType.PLANKS:
      case BlockType.OAK_LOG:
      case BlockType.BIRCH_LOG:
      case BlockType.SPRUCE_LOG:
        return 'wood'
      
      default:
        return 'grass'
    }
  }

  /**
   * Get animal sound name
   */
  getAnimalSound(animalType: string): AnimalSoundType | null {
    const validTypes: AnimalSoundType[] = ['cow', 'pig', 'sheep', 'chicken', 'wolf', 'fox']
    const type = animalType.toLowerCase() as AnimalSoundType
    return validTypes.includes(type) ? type : null
  }

  /**
   * Update listener position for 3D audio
   */
  updateListenerPosition(x: number, y: number, z: number, forwardX: number, forwardZ: number): void {
    if (!this.audioContext) return

    const listener = this.audioContext.listener

    if (listener.positionX) {
      listener.positionX.value = x
      listener.positionY.value = y
      listener.positionZ.value = z
      listener.forwardX.value = forwardX
      listener.forwardY.value = 0
      listener.forwardZ.value = forwardZ
      listener.upX.value = 0
      listener.upY.value = 1
      listener.upZ.value = 0
    } else {
      // Fallback for older browsers
      listener.setPosition(x, y, z)
      listener.setOrientation(forwardX, 0, forwardZ, 0, 1, 0)
    }
  }

  /**
   * Apply current settings to gain nodes
   */
  private applySettings(): void {
    if (!this.masterGain || !this.musicGain || !this.sfxGain) return

    const masterVol = this.settings.muted ? 0 : this.settings.masterVolume
    this.masterGain.gain.value = masterVol
    this.musicGain.gain.value = this.settings.musicVolume
    this.sfxGain.gain.value = this.settings.sfxVolume
  }

  /**
   * Set master volume
   */
  setMasterVolume(volume: number): void {
    this.settings.masterVolume = Math.max(0, Math.min(1, volume))
    this.applySettings()
    saveAudioSettings(this.settings)
  }

  /**
   * Set music volume
   */
  setMusicVolume(volume: number): void {
    this.settings.musicVolume = Math.max(0, Math.min(1, volume))
    this.applySettings()
    saveAudioSettings(this.settings)
  }

  /**
   * Set SFX volume
   */
  setSfxVolume(volume: number): void {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume))
    this.applySettings()
    saveAudioSettings(this.settings)
  }

  /**
   * Toggle mute
   */
  toggleMute(): void {
    this.settings.muted = !this.settings.muted
    this.applySettings()
    saveAudioSettings(this.settings)
  }

  /**
   * Mute audio
   */
  mute(): void {
    this.settings.muted = true
    this.applySettings()
    saveAudioSettings(this.settings)
  }

  /**
   * Unmute audio
   */
  unmute(): void {
    this.settings.muted = false
    this.applySettings()
    saveAudioSettings(this.settings)
  }

  /**
   * Get current settings
   */
  getSettings(): AudioSettings {
    return { ...this.settings }
  }

  /**
   * Check if audio is initialized
   */
  get initialized(): boolean {
    return this.isInitialized
  }

  /**
   * Resume AudioContext (for browser autoplay policy)
   */
  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }

  /**
   * Dispose of all resources
   */
  dispose(): void {
    // Stop all sounds
    this.stopMusic(false)
    this.activeSounds.forEach(sound => sound.stop())
    this.activeSounds.clear()

    // Close audio context
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }

    // Clear cache
    this.bufferCache.clear()

    this.isInitialized = false
    this.initPromise = null
    AudioManager.instance = null
  }
}
