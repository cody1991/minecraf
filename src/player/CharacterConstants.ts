/**
 * Character Constants - Shared constants for character model system
 * Feature: 013-character-model-view
 */

/**
 * Default third-person camera distance (meters)
 */
export const DEFAULT_THIRD_PERSON_DISTANCE = 5

/**
 * View transition duration (seconds)
 */
export const VIEW_TRANSITION_DURATION = 0.3

/**
 * Minimum camera distance (meters)
 */
export const MIN_CAMERA_DISTANCE = 1

/**
 * Maximum camera distance (meters)
 */
export const MAX_CAMERA_DISTANCE = 10

/**
 * Camera height offset above player center (meters)
 */
export const CAMERA_HEIGHT_OFFSET = 1.5

/**
 * Camera collision offset (meters) - prevents camera from clipping into walls
 */
export const CAMERA_COLLISION_OFFSET = 0.3

/**
 * Local storage key for character preference
 */
export const PREFERENCE_STORAGE_KEY = 'webcraft_selected_character'

/**
 * Blockman model dimensions (in game units, will be scaled to match player height)
 */
export const BLOCKMAN_DIMENSIONS = {
  /** Head size (cube) */
  HEAD_SIZE: 0.5,
  /** Body width */
  BODY_WIDTH: 0.5,
  /** Body height */
  BODY_HEIGHT: 0.75,
  /** Body depth */
  BODY_DEPTH: 0.25,
  /** Arm width */
  ARM_WIDTH: 0.25,
  /** Arm height */
  ARM_HEIGHT: 0.75,
  /** Arm depth */
  ARM_DEPTH: 0.25,
  /** Leg width */
  LEG_WIDTH: 0.25,
  /** Leg height */
  LEG_HEIGHT: 0.75,
  /** Leg depth */
  LEG_DEPTH: 0.25
}

/**
 * Total blockman height (sum of head + body + legs)
 */
export const BLOCKMAN_TOTAL_HEIGHT = 
  BLOCKMAN_DIMENSIONS.HEAD_SIZE + 
  BLOCKMAN_DIMENSIONS.BODY_HEIGHT + 
  BLOCKMAN_DIMENSIONS.LEG_HEIGHT
