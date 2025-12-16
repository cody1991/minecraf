/**
 * Hand Animator - Controls first-person hand/item animations
 * Feature: 023-hand-item-attack-animation
 */

/**
 * Hand animation state
 */
export enum HandAnimState {
  IDLE = 'idle',
  SWINGING = 'swinging',
  PLACING = 'placing',
  EATING = 'eating'
}

/**
 * Hand animation data
 */
export interface HandAnimData {
  state: HandAnimState
  progress: number       // Animation progress 0-1
  bobTime: number        // Walking bob timer
  isMoving: boolean      // Whether player is moving
}

/** Swing animation duration in seconds */
const SWING_DURATION = 0.25

/** Place animation duration in seconds */
const PLACE_DURATION = 0.15

/** Eating animation cycle duration in seconds */
const EATING_CYCLE_DURATION = 0.3

/** Bob frequency when walking */
const BOB_FREQUENCY = 10

/** Bob amplitude */
const BOB_AMPLITUDE_X = 0.02
const BOB_AMPLITUDE_Y = 0.03

/**
 * HandAnimator - Manages first-person hand animations
 */
export class HandAnimator {
  private data: HandAnimData = {
    state: HandAnimState.IDLE,
    progress: 0,
    bobTime: 0,
    isMoving: false
  }
  
  /**
   * Update animation state
   */
  update(deltaTime: number, isMoving: boolean): void {
    this.data.isMoving = isMoving
    
    // Update bob time when moving
    if (isMoving) {
      this.data.bobTime += deltaTime * BOB_FREQUENCY
    } else {
      // Gradually reset bob
      this.data.bobTime *= 0.9
    }
    
    // Update animation progress
    if (this.data.state !== HandAnimState.IDLE) {
      const duration = this.getAnimationDuration()
      this.data.progress += deltaTime / duration
      
      if (this.data.progress >= 1) {
        if (this.data.state === HandAnimState.EATING) {
          // Eating loops
          this.data.progress = 0
        } else {
          // Other animations end
          this.data.progress = 0
          this.data.state = HandAnimState.IDLE
        }
      }
    }
  }
  
  /**
   * Get animation duration for current state
   */
  private getAnimationDuration(): number {
    switch (this.data.state) {
      case HandAnimState.SWINGING:
        return SWING_DURATION
      case HandAnimState.PLACING:
        return PLACE_DURATION
      case HandAnimState.EATING:
        return EATING_CYCLE_DURATION
      default:
        return 1
    }
  }
  
  /**
   * Start swing (attack) animation
   */
  startSwing(): void {
    console.log('[HandAnimator] startSwing(), current state:', this.data.state)
    // Allow starting swing even if not idle (for continuous digging)
    this.data.state = HandAnimState.SWINGING
    this.data.progress = 0
  }
  
  /**
   * Start eating animation (loops until stopped)
   */
  startEating(): void {
    console.log('[HandAnimator] startEating()')
    this.data.state = HandAnimState.EATING
    this.data.progress = 0
  }
  
  /**
   * Stop eating animation
   */
  stopEating(): void {
    console.log('[HandAnimator] stopEating()')
    if (this.data.state === HandAnimState.EATING) {
      this.data.state = HandAnimState.IDLE
      this.data.progress = 0
    }
  }
  
  /**
   * Start place animation
   */
  startPlace(): void {
    if (this.data.state === HandAnimState.IDLE) {
      this.data.state = HandAnimState.PLACING
      this.data.progress = 0
    }
  }
  
  /**
   * Get current animation state
   */
  getState(): HandAnimState {
    return this.data.state
  }
  
  /**
   * Check if currently animating
   */
  isAnimating(): boolean {
    return this.data.state !== HandAnimState.IDLE
  }
  
  /**
   * Get swing rotation (for attack animation)
   * Returns rotation in radians for X axis
   */
  getSwingRotation(): number {
    if (this.data.state !== HandAnimState.SWINGING) return 0
    
    // Swing down quickly, return slowly
    const t = this.data.progress
    if (t < 0.4) {
      // Swing down phase (0 to -90 degrees) - increased for visibility
      return -Math.PI / 2 * (t / 0.4)
    } else {
      // Return phase (-90 to 0 degrees)
      const returnT = (t - 0.4) / 0.6
      return -Math.PI / 2 * (1 - returnT)
    }
  }
  
  /**
   * Get swing position offset (for attack animation)
   * Returns { x, y } offset
   */
  getSwingOffset(): { x: number; y: number } {
    if (this.data.state !== HandAnimState.SWINGING) return { x: 0, y: 0 }
    
    const t = this.data.progress
    if (t < 0.4) {
      // Swing down phase - move down and forward
      const p = t / 0.4
      return { x: 0, y: -0.15 * p }
    } else {
      // Return phase
      const returnT = (t - 0.4) / 0.6
      return { x: 0, y: -0.15 * (1 - returnT) }
    }
  }
  
  /**
   * Get place offset (for place animation)
   * Returns Z offset
   */
  getPlaceOffset(): number {
    if (this.data.state !== HandAnimState.PLACING) return 0
    
    // Quick forward thrust
    const t = this.data.progress
    return Math.sin(t * Math.PI) * 0.1
  }
  
  /**
   * Get eating offset (for eating animation)
   * Returns { x, y, z, rotX } for eating motion toward mouth
   */
  getEatingOffset(): { x: number; y: number; z: number; rotX: number } {
    if (this.data.state !== HandAnimState.EATING) {
      return { x: 0, y: 0, z: 0, rotX: 0 }
    }
    
    // Eating motion: raise food toward mouth with slight bobbing
    const t = this.data.progress
    const cycle = Math.sin(t * Math.PI * 2)
    
    return {
      x: -0.1,                           // Move slightly left toward center
      y: 0.15 + cycle * 0.03,            // Raise up with small bob
      z: -0.15 + Math.abs(cycle) * 0.02, // Move toward camera (mouth)
      rotX: -0.5 + cycle * 0.1           // Tilt toward mouth
    }
  }
  
  /**
   * Get walking bob offset
   * Returns { x, y } offset
   */
  getBobOffset(): { x: number; y: number } {
    if (!this.data.isMoving && this.data.bobTime < 0.01) {
      return { x: 0, y: 0 }
    }
    
    return {
      x: Math.sin(this.data.bobTime) * BOB_AMPLITUDE_X,
      y: Math.abs(Math.sin(this.data.bobTime * 2)) * BOB_AMPLITUDE_Y
    }
  }
}
