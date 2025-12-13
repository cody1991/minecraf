/**
 * BiomeTypes - Biome type definitions and configurations
 * Feature: 006-random-terrain-generation
 * 
 * Defines biome types and their terrain generation parameters.
 */

import { BlockType } from '../core/Block'

/**
 * Biome type enumeration
 */
export enum BiomeType {
  PLAINS = 0,    // 平原 - 默认生物群系
  LAKE = 1,      // 湖泊 - 低洼水域
  MOUNTAIN = 2   // 山脉 - 高地
}

/**
 * Biome configuration interface
 */
export interface BiomeConfig {
  type: BiomeType
  baseHeightOffset: number      // 相对基准高度偏移
  heightVariationScale: number  // 高度变化缩放因子
  surfaceBlock: BlockType       // 表面方块类型
}

/**
 * Biome configuration lookup table
 */
export const BIOME_CONFIGS: Record<BiomeType, BiomeConfig> = {
  [BiomeType.PLAINS]: {
    type: BiomeType.PLAINS,
    baseHeightOffset: 0,
    heightVariationScale: 1.0,
    surfaceBlock: BlockType.GRASS
  },
  [BiomeType.LAKE]: {
    type: BiomeType.LAKE,
    baseHeightOffset: -10,
    heightVariationScale: 0.3,
    surfaceBlock: BlockType.SAND
  },
  [BiomeType.MOUNTAIN]: {
    type: BiomeType.MOUNTAIN,
    baseHeightOffset: 15,
    heightVariationScale: 2.5,
    surfaceBlock: BlockType.STONE
  }
}
