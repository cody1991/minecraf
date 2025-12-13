/**
 * SoundInstance - Wrapper for individual sound playback
 * Feature: 012-sound-map-system
 */

/**
 * Represents a single playing sound instance
 */
export class SoundInstance {
  private source: AudioBufferSourceNode
  private gainNode: GainNode
  private pannerNode: PannerNode | null
  private _isPlaying: boolean = true

  constructor(
    source: AudioBufferSourceNode,
    gainNode: GainNode,
    pannerNode: PannerNode | null = null
  ) {
    this.source = source
    this.gainNode = gainNode
    this.pannerNode = pannerNode

    // Track when playback ends
    this.source.onended = () => {
      this._isPlaying = false
    }
  }

  /**
   * Check if sound is still playing
   */
  get isPlaying(): boolean {
    return this._isPlaying
  }

  /**
   * Stop the sound
   */
  stop(): void {
    if (this._isPlaying) {
      try {
        this.source.stop()
      } catch {
        // Already stopped
      }
      this._isPlaying = false
    }
  }

  /**
   * Set volume (0.0 - 1.0)
   */
  setVolume(volume: number): void {
    this.gainNode.gain.value = Math.max(0, Math.min(1, volume))
  }

  /**
   * Set 3D position (only for spatial sounds)
   */
  setPosition(x: number, y: number, z: number): void {
    if (this.pannerNode) {
      this.pannerNode.positionX.value = x
      this.pannerNode.positionY.value = y
      this.pannerNode.positionZ.value = z
    }
  }

  /**
   * Fade out and stop
   */
  fadeOut(duration: number, audioContext: AudioContext): void {
    const now = audioContext.currentTime
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now)
    this.gainNode.gain.linearRampToValueAtTime(0, now + duration)
    
    setTimeout(() => {
      this.stop()
    }, duration * 1000)
  }
}
