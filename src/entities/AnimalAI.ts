/**
 * AnimalAI - Finite State Machine for animal behavior
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { AnimalState, AnimalConfig } from './AnimalTypes'

/**
 * AI state transition result
 */
export interface AIUpdateResult {
  newState: AnimalState | null
  targetPosition: THREE.Vector3 | null
}

/**
 * Update animal AI state
 */
export function updateAnimalAI(
  currentState: AnimalState,
  stateTimer: number,
  deltaTime: number,
  position: THREE.Vector3,
  playerPosition: THREE.Vector3,
  config: AnimalConfig
): AIUpdateResult {
  const distanceToPlayer = position.distanceTo(playerPosition)
  
  // Check for flee trigger (any state can transition to FLEEING)
  if (currentState !== AnimalState.FLEEING && distanceToPlayer < config.fleeDistance) {
    // Calculate flee direction (away from player)
    const fleeDir = new THREE.Vector3()
      .subVectors(position, playerPosition)
      .normalize()
    
    const fleeTarget = new THREE.Vector3()
      .copy(position)
      .add(fleeDir.multiplyScalar(config.safeDistance + 5))
    
    return {
      newState: AnimalState.FLEEING,
      targetPosition: fleeTarget
    }
  }
  
  // State-specific logic
  switch (currentState) {
    case AnimalState.IDLE:
      return handleIdleState(stateTimer, deltaTime, position, config)
    
    case AnimalState.WANDERING:
      return handleWanderingState(stateTimer, deltaTime, position, config)
    
    case AnimalState.FLEEING:
      return handleFleeingState(stateTimer, deltaTime, distanceToPlayer, config)
    
    default:
      return { newState: null, targetPosition: null }
  }
}

/**
 * Handle IDLE state
 */
function handleIdleState(
  stateTimer: number,
  deltaTime: number,
  position: THREE.Vector3,
  _config: AnimalConfig
): AIUpdateResult {
  const newTimer = stateTimer - deltaTime
  
  if (newTimer <= 0) {
    // Transition to WANDERING
    const wanderTarget = getRandomWanderTarget(position)
    return {
      newState: AnimalState.WANDERING,
      targetPosition: wanderTarget
    }
  }
  
  return { newState: null, targetPosition: null }
}

/**
 * Handle WANDERING state
 */
function handleWanderingState(
  stateTimer: number,
  deltaTime: number,
  _position: THREE.Vector3,
  _config: AnimalConfig
): AIUpdateResult {
  const newTimer = stateTimer - deltaTime
  
  if (newTimer <= 0) {
    // Transition to IDLE
    return {
      newState: AnimalState.IDLE,
      targetPosition: null
    }
  }
  
  return { newState: null, targetPosition: null }
}

/**
 * Handle FLEEING state
 */
function handleFleeingState(
  stateTimer: number,
  deltaTime: number,
  distanceToPlayer: number,
  config: AnimalConfig
): AIUpdateResult {
  const newTimer = stateTimer - deltaTime
  
  // Stop fleeing if far enough from player or timer expired
  if (distanceToPlayer > config.safeDistance || newTimer <= 0) {
    return {
      newState: AnimalState.IDLE,
      targetPosition: null
    }
  }
  
  return { newState: null, targetPosition: null }
}

/**
 * Get a random wander target position
 */
function getRandomWanderTarget(currentPosition: THREE.Vector3): THREE.Vector3 {
  const angle = Math.random() * Math.PI * 2
  const distance = 3 + Math.random() * 5 // 3-8 blocks
  
  return new THREE.Vector3(
    currentPosition.x + Math.cos(angle) * distance,
    currentPosition.y,
    currentPosition.z + Math.sin(angle) * distance
  )
}

/**
 * Get random state duration
 */
export function getRandomStateDuration(state: AnimalState, config: AnimalConfig): number {
  switch (state) {
    case AnimalState.IDLE:
      return config.idleTimeMin + Math.random() * (config.idleTimeMax - config.idleTimeMin)
    
    case AnimalState.WANDERING:
      return config.wanderTimeMin + Math.random() * (config.wanderTimeMax - config.wanderTimeMin)
    
    case AnimalState.FLEEING:
      return 5 // Fixed 5 seconds max flee time
    
    default:
      return 3
  }
}

/**
 * Get movement speed for current state
 */
export function getMovementSpeed(state: AnimalState, config: AnimalConfig): number {
  switch (state) {
    case AnimalState.WANDERING:
      return config.moveSpeed
    
    case AnimalState.FLEEING:
      return config.fleeSpeed
    
    default:
      return 0
  }
}
