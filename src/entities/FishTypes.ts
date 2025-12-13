/**
 * Fish Types and Configurations
 * Feature: 009-ecosystem-flora-fauna
 */

/**
 * Fish type enumeration
 */
export enum FishType {
  COMMON = 0,
  TROPICAL = 1
}

/**
 * Fish configuration interface
 */
export interface FishConfig {
  type: FishType
  name: string
  nameEn: string
  bodyWidth: number
  bodyHeight: number
  bodyDepth: number
  tailWidth: number
  tailHeight: number
  colors: number[]      // Primary colors for the fish
  swimSpeed: number     // Blocks per second
  turnRate: number      // Radians per second
}

/**
 * Configuration for each fish type
 */
export const FISH_CONFIGS: Record<FishType, FishConfig> = {
  [FishType.COMMON]: {
    type: FishType.COMMON,
    name: '普通鱼',
    nameEn: 'Common Fish',
    bodyWidth: 0.25,    // Increased from 0.15
    bodyHeight: 0.35,   // Increased from 0.2
    bodyDepth: 0.6,     // Increased from 0.4
    tailWidth: 0.04,    // Increased from 0.02
    tailHeight: 0.25,   // Increased from 0.15
    colors: [0xc0c0c0], // Silver
    swimSpeed: 1.5,
    turnRate: 2.0
  },
  [FishType.TROPICAL]: {
    type: FishType.TROPICAL,
    name: '热带鱼',
    nameEn: 'Tropical Fish',
    bodyWidth: 0.2,     // Increased from 0.12
    bodyHeight: 0.4,    // Increased from 0.25
    bodyDepth: 0.5,     // Increased from 0.35
    tailWidth: 0.04,    // Increased from 0.02
    tailHeight: 0.3,    // Increased from 0.18
    colors: [0xff6600, 0x00ffff, 0xffff00], // Orange, Cyan, Yellow
    swimSpeed: 2.0,
    turnRate: 2.5
  }
}

/**
 * Get fish name by type
 */
export function getFishName(type: FishType): string {
  return FISH_CONFIGS[type]?.name ?? 'Unknown'
}

/**
 * Get fish config by type
 */
export function getFishConfig(type: FishType): FishConfig {
  return FISH_CONFIGS[type]
}
