/**
 * Survival System Module
 * Feature: 020-survival-mechanics
 * 
 * Exports all survival-related classes and constants.
 */

// Constants
export * from './SurvivalConstants'

// Core Systems
export { PlayerStats, type PlayerStatsState, type PlayerStatsCallbacks } from './PlayerStats'
export { DamageSystem, getDamageSystem, type DamageEvent, type DamageEventListener } from './DamageSystem'
export { HungerSystem } from './HungerSystem'
export { HealthRegenSystem } from './HealthRegenSystem'
export { EnvironmentDamage, type IBlockWorld, type IPlayerState } from './EnvironmentDamage'
export { FoodRegistry, FoodType, FOOD_ITEMS, ANIMAL_FOOD_DROPS, type FoodItem } from './FoodRegistry'

// Manager
export { SurvivalManager, type SurvivalManagerConfig } from './SurvivalManager'
