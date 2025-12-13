/**
 * Animal Types and States
 * Feature: 008-biome-weather-system
 */

/**
 * Animal type enumeration
 */
export enum AnimalType {
  COW = 0,
  SHEEP = 1,
  PIG = 2,
  CHICKEN = 3,
  // New animals (009-ecosystem-flora-fauna)
  RABBIT = 4,
  WOLF = 5,
  FOX = 6
}

/**
 * Animal AI state enumeration
 */
export enum AnimalState {
  IDLE = 0,      // Standing still
  WANDERING = 1, // Walking randomly
  FLEEING = 2    // Running away from player
}

/**
 * Animal configuration for each type
 */
export interface AnimalConfig {
  type: AnimalType
  name: string
  nameEn: string
  moveSpeed: number       // Blocks per second
  fleeSpeed: number       // Blocks per second when fleeing
  idleTimeMin: number     // Minimum idle time (seconds)
  idleTimeMax: number     // Maximum idle time (seconds)
  wanderTimeMin: number   // Minimum wander time (seconds)
  wanderTimeMax: number   // Maximum wander time (seconds)
  fleeDistance: number    // Distance to trigger flee (blocks)
  safeDistance: number    // Distance to stop fleeing (blocks)
}

/**
 * Configuration for each animal type
 */
export const ANIMAL_CONFIGS: Record<AnimalType, AnimalConfig> = {
  [AnimalType.COW]: {
    type: AnimalType.COW,
    name: '牛',
    nameEn: 'Cow',
    moveSpeed: 1.5,
    fleeSpeed: 3.0,
    idleTimeMin: 2,
    idleTimeMax: 5,
    wanderTimeMin: 3,
    wanderTimeMax: 8,
    fleeDistance: 5,
    safeDistance: 10
  },
  [AnimalType.SHEEP]: {
    type: AnimalType.SHEEP,
    name: '羊',
    nameEn: 'Sheep',
    moveSpeed: 1.5,
    fleeSpeed: 3.5,
    idleTimeMin: 2,
    idleTimeMax: 5,
    wanderTimeMin: 3,
    wanderTimeMax: 8,
    fleeDistance: 5,
    safeDistance: 10
  },
  [AnimalType.PIG]: {
    type: AnimalType.PIG,
    name: '猪',
    nameEn: 'Pig',
    moveSpeed: 1.5,
    fleeSpeed: 3.0,
    idleTimeMin: 2,
    idleTimeMax: 5,
    wanderTimeMin: 3,
    wanderTimeMax: 8,
    fleeDistance: 5,
    safeDistance: 10
  },
  [AnimalType.CHICKEN]: {
    type: AnimalType.CHICKEN,
    name: '鸡',
    nameEn: 'Chicken',
    moveSpeed: 2.0,
    fleeSpeed: 4.0,
    idleTimeMin: 1,
    idleTimeMax: 4,
    wanderTimeMin: 2,
    wanderTimeMax: 6,
    fleeDistance: 4,
    safeDistance: 8
  },
  // New animals (009-ecosystem-flora-fauna)
  [AnimalType.RABBIT]: {
    type: AnimalType.RABBIT,
    name: '兔子',
    nameEn: 'Rabbit',
    moveSpeed: 3.0,
    fleeSpeed: 6.0,
    idleTimeMin: 1,
    idleTimeMax: 3,
    wanderTimeMin: 2,
    wanderTimeMax: 5,
    fleeDistance: 5,
    safeDistance: 10
  },
  [AnimalType.WOLF]: {
    type: AnimalType.WOLF,
    name: '狼',
    nameEn: 'Wolf',
    moveSpeed: 2.5,
    fleeSpeed: 5.0,
    idleTimeMin: 2,
    idleTimeMax: 5,
    wanderTimeMin: 3,
    wanderTimeMax: 7,
    fleeDistance: 4,
    safeDistance: 8
  },
  [AnimalType.FOX]: {
    type: AnimalType.FOX,
    name: '狐狸',
    nameEn: 'Fox',
    moveSpeed: 2.8,
    fleeSpeed: 5.5,
    idleTimeMin: 1,
    idleTimeMax: 4,
    wanderTimeMin: 2,
    wanderTimeMax: 6,
    fleeDistance: 5,
    safeDistance: 10
  }
}

/**
 * Get animal name by type
 */
export function getAnimalName(type: AnimalType): string {
  return ANIMAL_CONFIGS[type]?.name ?? 'Unknown'
}

/**
 * Get animal config by type
 */
export function getAnimalConfig(type: AnimalType): AnimalConfig {
  return ANIMAL_CONFIGS[type]
}
