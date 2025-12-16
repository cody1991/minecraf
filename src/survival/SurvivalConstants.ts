/**
 * Survival Constants
 * Feature: 020-survival-mechanics
 * 
 * All constants for the survival system including health, hunger, and damage values.
 */

// ============================================================================
// Health Constants
// ============================================================================

/** Maximum health points (20 = 10 hearts) */
export const HEALTH_MAX = 20

/** Duration of invincibility after taking damage (seconds) */
export const INVINCIBILITY_DURATION = 0.5

/** Duration of damage overlay effect (seconds) */
export const DAMAGE_OVERLAY_DURATION = 0.5

/** Delay before damage overlay appears (seconds) */
export const DAMAGE_OVERLAY_DELAY = 0.3

// ============================================================================
// Hunger Constants
// ============================================================================

/** Maximum hunger points (20 = 10 food icons) */
export const HUNGER_MAX = 20

/** Exhaustion cost per block moved while sprinting */
export const HUNGER_SPRINT_COST = 0.1

/** Exhaustion cost per jump */
export const HUNGER_JUMP_COST = 0.2

/** Exhaustion cost per block moved while swimming */
export const HUNGER_SWIM_COST = 0.05

/** Exhaustion threshold to reduce hunger by 1 */
export const EXHAUSTION_THRESHOLD = 4.0

/** Hunger level required for health regeneration (>= 18) */
export const HUNGER_REGEN_THRESHOLD = 18

/** Health regeneration rate (points per second when hunger >= threshold) */
export const HEALTH_REGEN_RATE = 1.0

/** Starvation damage per tick */
export const STARVATION_DAMAGE = 1

/** Interval between starvation damage ticks (seconds) */
export const STARVATION_INTERVAL = 4

/** Minimum health when starving (starvation won't kill) */
export const STARVATION_MIN_HEALTH = 1

// ============================================================================
// Oxygen Constants
// ============================================================================

/** Maximum oxygen time underwater (seconds) */
export const OXYGEN_MAX = 10

/** Drowning damage per tick */
export const DROWNING_DAMAGE = 2

/** Interval between drowning damage ticks (seconds) */
export const DROWNING_INTERVAL = 1

// ============================================================================
// Environmental Damage Constants
// ============================================================================

/** Minimum fall height to take damage (blocks) */
export const FALL_DAMAGE_THRESHOLD = 3

/** Fall damage per block above threshold */
export const FALL_DAMAGE_PER_BLOCK = 1

/** Lava damage per tick */
export const LAVA_DAMAGE = 4

/** Interval between lava damage ticks (seconds) */
export const LAVA_DAMAGE_INTERVAL = 0.5

/** Cactus damage per touch */
export const CACTUS_DAMAGE = 1

/** Cooldown between cactus damage (seconds) */
export const CACTUS_DAMAGE_COOLDOWN = 0.5

// ============================================================================
// Animal Combat Constants
// ============================================================================

/** Damage dealt by player attack */
export const PLAYER_ATTACK_DAMAGE = 2

/** Animal health by type */
export const ANIMAL_HEALTH: Record<string, number> = {
  COW: 10,
  PIG: 10,
  SHEEP: 10,
  CHICKEN: 4,
  RABBIT: 4,
  WOLF: 10,
  FOX: 10
}

/** Animals that drop food when killed */
export const FOOD_DROPPING_ANIMALS = ['COW', 'PIG', 'SHEEP', 'CHICKEN', 'RABBIT']

// ============================================================================
// Damage Source Enum
// ============================================================================

/** Types of damage sources */
export enum DamageSource {
  FALL = 'fall',
  DROWNING = 'drowning',
  LAVA = 'lava',
  CACTUS = 'cactus',
  STARVATION = 'starvation',
  PLAYER_ATTACK = 'player_attack',
  GENERIC = 'generic'
}

/** Damage sources that ignore invincibility frames */
export const IGNORE_INVINCIBILITY_SOURCES: DamageSource[] = [
  DamageSource.DROWNING,
  DamageSource.STARVATION
]
