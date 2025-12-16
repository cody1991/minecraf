/**
 * Animation State System
 * Feature: 022-animal-animation-system
 * 
 * Defines animation states and configurations for animals
 */

/**
 * Animal animation state enumeration
 * Represents the visual animation state (separate from AI state)
 */
export enum AnimalAnimationState {
  IDLE = 'idle',           // Standing still, breathing animation
  WALKING = 'walking',     // Walking with leg swing
  RUNNING = 'running',     // Fast movement (fleeing)
  HURT = 'hurt',           // Taking damage, flash red
  DYING = 'dying',         // Death animation, falling over
  SWIMMING = 'swimming'    // In water, paddling
}

/**
 * Animation configuration for each state
 */
export interface AnimationConfig {
  state: AnimalAnimationState
  duration: number         // Animation cycle duration (seconds)
  loop: boolean           // Whether animation loops
  blendTime: number       // Transition blend time (seconds)
  priority: number        // Higher priority overrides lower
}

/**
 * Default animation configurations
 */
export const ANIMATION_CONFIGS: Record<AnimalAnimationState, AnimationConfig> = {
  [AnimalAnimationState.IDLE]: {
    state: AnimalAnimationState.IDLE,
    duration: 2.0,
    loop: true,
    blendTime: 0.2,
    priority: 0
  },
  [AnimalAnimationState.WALKING]: {
    state: AnimalAnimationState.WALKING,
    duration: 1.0,
    loop: true,
    blendTime: 0.15,
    priority: 1
  },
  [AnimalAnimationState.RUNNING]: {
    state: AnimalAnimationState.RUNNING,
    duration: 0.5,
    loop: true,
    blendTime: 0.1,
    priority: 2
  },
  [AnimalAnimationState.HURT]: {
    state: AnimalAnimationState.HURT,
    duration: 0.3,
    loop: false,
    blendTime: 0.05,
    priority: 5
  },
  [AnimalAnimationState.DYING]: {
    state: AnimalAnimationState.DYING,
    duration: 1.0,
    loop: false,
    blendTime: 0.1,
    priority: 10
  },
  [AnimalAnimationState.SWIMMING]: {
    state: AnimalAnimationState.SWIMMING,
    duration: 1.0,
    loop: true,
    blendTime: 0.2,
    priority: 3
  }
}

/**
 * Animation data for tracking current animation state
 */
export interface AnimalAnimationData {
  currentState: AnimalAnimationState
  previousState: AnimalAnimationState
  stateTime: number       // Time in current state
  blendProgress: number   // Blend transition progress 0-1
  legSwingAngle: number   // Current leg swing angle
  headYaw: number         // Head horizontal rotation (looking left/right)
  headPitch: number       // Head vertical rotation (looking up/down)
  bodyTilt: number        // Body tilt for dying animation
}

/**
 * Create default animation data
 */
export function createDefaultAnimationData(): AnimalAnimationData {
  return {
    currentState: AnimalAnimationState.IDLE,
    previousState: AnimalAnimationState.IDLE,
    stateTime: 0,
    blendProgress: 1,
    legSwingAngle: 0,
    headYaw: 0,
    headPitch: 0,
    bodyTilt: 0
  }
}

/**
 * Get animation config for a state
 */
export function getAnimationConfig(state: AnimalAnimationState): AnimationConfig {
  return ANIMATION_CONFIGS[state]
}

/**
 * Calculate leg swing angle based on animation state and time
 */
export function calculateLegSwing(
  animState: AnimalAnimationState,
  time: number,
  amplitude: number = 0.3
): number {
  switch (animState) {
    case AnimalAnimationState.WALKING:
      return Math.sin(time * 8) * amplitude
    case AnimalAnimationState.RUNNING:
      return Math.sin(time * 12) * amplitude * 1.3
    case AnimalAnimationState.SWIMMING:
      return Math.sin(time * 4) * amplitude * 0.5
    default:
      return 0
  }
}

/**
 * Calculate breathing scale for idle animation
 */
export function calculateBreathingScale(time: number): number {
  return 1 + Math.sin(time * 2) * 0.02
}

/**
 * Calculate head bob for walking/running
 */
export function calculateHeadBob(
  animState: AnimalAnimationState,
  time: number
): { x: number; y: number } {
  switch (animState) {
    case AnimalAnimationState.WALKING:
      return {
        x: Math.sin(time * 2) * 0.05,
        y: Math.abs(Math.sin(time * 8)) * 0.02
      }
    case AnimalAnimationState.RUNNING:
      return {
        x: Math.sin(time * 3) * 0.08,
        y: Math.abs(Math.sin(time * 12)) * 0.03
      }
    default:
      return { x: Math.sin(time * 1.5) * 0.03, y: 0 }
  }
}
