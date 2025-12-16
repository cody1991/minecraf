/**
 * Synthesized audio generator for placeholder sounds
 * Feature: 012-sound-map-system
 * Updated: 017-block-sound-effects - Added block sound generation
 * 
 * Generates simple synthesized sounds when audio files are not available.
 * This provides a fallback so the game still has audio feedback.
 */

import { BlockSoundCategory, BlockSoundAction, BLOCK_SOUND_PARAMS } from './AudioTypes'

/**
 * Generate block interaction sound (place or break)
 * Feature: 017-block-sound-effects
 * 
 * @param audioContext The Web Audio API context
 * @param category The block sound category
 * @param action The action (place or break)
 * @returns AudioBuffer with the generated sound
 */
export function generateBlockSound(
  audioContext: AudioContext,
  category: BlockSoundCategory,
  action: BlockSoundAction
): AudioBuffer {
  const params = BLOCK_SOUND_PARAMS[category]
  const sampleRate = audioContext.sampleRate
  const duration = params.duration
  const length = Math.floor(sampleRate * duration)
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  // Place sounds are higher pitched than break sounds
  const pitchMultiplier = action === 'place' ? 1.2 : 1.0
  const baseFreq = params.baseFrequency * pitchMultiplier

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    let sample = 0

    // Tonal component
    const freq = baseFreq + (Math.random() - 0.5) * params.frequencyRange * 0.1
    sample += Math.sin(2 * Math.PI * freq * t) * (1 - params.noiseMix)

    // Add harmonics for richness
    sample += Math.sin(2 * Math.PI * freq * 2 * t) * 0.3 * (1 - params.noiseMix)
    sample += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.2 * (1 - params.noiseMix)

    // Noise component
    sample += (Math.random() * 2 - 1) * params.noiseMix

    // Apply exponential decay envelope
    const envelope = Math.exp(-t * params.decayRate)

    // Apply attack for smoother start
    const attack = 0.005
    const attackEnv = t < attack ? t / attack : 1

    data[i] = sample * envelope * attackEnv * 0.5
  }

  return buffer
}

/**
 * Generate a simple tone as an AudioBuffer
 */
export function generateTone(
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  const length = Math.floor(sampleRate * duration)
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    let sample = 0

    switch (type) {
      case 'sine':
        sample = Math.sin(2 * Math.PI * frequency * t)
        break
      case 'square':
        sample = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1
        break
      case 'sawtooth':
        sample = 2 * ((frequency * t) % 1) - 1
        break
      case 'triangle':
        sample = 2 * Math.abs(2 * ((frequency * t) % 1) - 1) - 1
        break
    }

    // Apply envelope (fade in/out)
    const attack = 0.01
    const release = 0.1
    let envelope = 1
    if (t < attack) {
      envelope = t / attack
    } else if (t > duration - release) {
      envelope = (duration - t) / release
    }

    data[i] = sample * volume * envelope
  }

  return buffer
}

/**
 * Generate ambient music buffer (simple chord progression)
 */
export function generateAmbientMusic(audioContext: AudioContext): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  const duration = 30 // 30 seconds loop
  const length = Math.floor(sampleRate * duration)
  const buffer = audioContext.createBuffer(2, length, sampleRate)
  const left = buffer.getChannelData(0)
  const right = buffer.getChannelData(1)

  // Simple ambient pad with slow chord changes
  const chords = [
    [261.63, 329.63, 392.00], // C major
    [293.66, 349.23, 440.00], // D minor
    [329.63, 392.00, 493.88], // E minor
    [349.23, 440.00, 523.25], // F major
  ]

  const chordDuration = duration / chords.length

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    const chordIndex = Math.floor(t / chordDuration) % chords.length
    const chord = chords[chordIndex]!
    
    let sample = 0
    for (const freq of chord) {
      // Add slight detuning for richness
      sample += Math.sin(2 * Math.PI * freq * t) * 0.1
      sample += Math.sin(2 * Math.PI * freq * 1.003 * t) * 0.05
    }

    // Low frequency drone
    sample += Math.sin(2 * Math.PI * 65.41 * t) * 0.15

    // Slow amplitude modulation
    const lfo = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.1 * t)
    sample *= lfo * 0.3

    // Crossfade between chords
    const chordT = (t % chordDuration) / chordDuration
    let fade = 1
    if (chordT < 0.1) fade = chordT / 0.1
    if (chordT > 0.9) fade = (1 - chordT) / 0.1
    sample *= fade

    left[i] = sample
    right[i] = sample * 0.95 // Slight stereo difference
  }

  return buffer
}

/**
 * Generate footstep sound
 */
export function generateFootstep(
  audioContext: AudioContext,
  type: 'grass' | 'stone' | 'sand' | 'wood'
): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  const duration = 0.15
  const length = Math.floor(sampleRate * duration)
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    let sample = 0

    switch (type) {
      case 'grass':
        // Soft, muffled sound
        sample = (Math.random() * 2 - 1) * Math.exp(-t * 30)
        break
      case 'stone':
        // Sharp, clicky sound
        sample = (Math.random() * 2 - 1) * Math.exp(-t * 50)
        sample += Math.sin(2 * Math.PI * 200 * t) * Math.exp(-t * 40) * 0.5
        break
      case 'sand':
        // Soft, shuffling sound
        sample = (Math.random() * 2 - 1) * Math.exp(-t * 20) * 0.7
        break
      case 'wood':
        // Hollow, resonant sound
        sample = Math.sin(2 * Math.PI * 150 * t) * Math.exp(-t * 25)
        sample += Math.sin(2 * Math.PI * 300 * t) * Math.exp(-t * 35) * 0.3
        break
    }

    data[i] = sample * 0.4
  }

  return buffer
}

/**
 * Generate fall impact sound
 */
export function generateFallSound(
  audioContext: AudioContext,
  heavy: boolean
): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  const duration = heavy ? 0.5 : 0.3
  const length = Math.floor(sampleRate * duration)
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  const baseFreq = heavy ? 80 : 120
  const decay = heavy ? 8 : 15

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    let sample = 0

    // Impact thud
    sample += Math.sin(2 * Math.PI * baseFreq * t) * Math.exp(-t * decay)
    
    // Add some noise for texture
    sample += (Math.random() * 2 - 1) * Math.exp(-t * 20) * 0.3

    // Higher harmonics for heavy fall
    if (heavy) {
      sample += Math.sin(2 * Math.PI * baseFreq * 2 * t) * Math.exp(-t * 12) * 0.3
    }

    data[i] = sample * (heavy ? 0.6 : 0.4)
  }

  return buffer
}

/**
 * Generate item pickup sound
 * Feature: 019-inventory-system
 * 
 * Creates a short, rising "pop" sound similar to Minecraft's pickup sound.
 * Frequency sweeps from 800Hz to 1200Hz over 0.1 seconds.
 */
export function generatePickupSound(audioContext: AudioContext): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  const duration = 0.1
  const length = Math.floor(sampleRate * duration)
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  const startFreq = 800
  const endFreq = 1200

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    const progress = t / duration
    
    // Frequency sweep from start to end
    const freq = startFreq + (endFreq - startFreq) * progress
    
    // Main tone
    let sample = Math.sin(2 * Math.PI * freq * t)
    
    // Add a harmonic for brightness
    sample += Math.sin(2 * Math.PI * freq * 2 * t) * 0.3
    
    // Quick attack, exponential decay
    const attack = 0.01
    const attackEnv = t < attack ? t / attack : 1
    const decayEnv = Math.exp(-t * 30)
    
    data[i] = sample * attackEnv * decayEnv * 0.5
  }

  return buffer
}

/**
 * Generate animal sound
 */
export function generateAnimalSound(
  audioContext: AudioContext,
  type: 'cow' | 'pig' | 'sheep' | 'chicken' | 'wolf' | 'fox'
): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  let duration = 0.5
  const buffer = audioContext.createBuffer(1, Math.floor(sampleRate * duration), sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate
    let sample = 0

    switch (type) {
      case 'cow':
        // Low moo
        duration = 0.8
        sample = Math.sin(2 * Math.PI * 150 * t * (1 + 0.1 * Math.sin(5 * t)))
        sample *= Math.exp(-t * 2) * (t < 0.1 ? t / 0.1 : 1)
        break
      case 'pig':
        // Oink
        sample = Math.sin(2 * Math.PI * 300 * t * (1 + 0.3 * Math.sin(20 * t)))
        sample *= Math.exp(-t * 8)
        break
      case 'sheep':
        // Baa
        sample = Math.sin(2 * Math.PI * 400 * t * (1 + 0.2 * Math.sin(8 * t)))
        sample *= Math.exp(-t * 4) * (t < 0.05 ? t / 0.05 : 1)
        break
      case 'chicken':
        // Cluck
        sample = Math.sin(2 * Math.PI * 600 * t) * Math.exp(-t * 20)
        if (t > 0.1 && t < 0.2) {
          sample += Math.sin(2 * Math.PI * 500 * t) * Math.exp(-(t - 0.1) * 20)
        }
        break
      case 'wolf':
        // Bark
        sample = Math.sin(2 * Math.PI * 200 * t * (1 + 0.5 * Math.sin(15 * t)))
        sample *= Math.exp(-t * 6)
        break
      case 'fox':
        // Chirp
        sample = Math.sin(2 * Math.PI * 800 * t * (1 - 0.3 * t))
        sample *= Math.exp(-t * 10)
        break
    }

    data[i] = sample * 0.4
  }

  return buffer
}
