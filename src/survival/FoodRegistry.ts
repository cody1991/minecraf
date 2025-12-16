/**
 * FoodRegistry - Food item definitions
 * Feature: 020-survival-mechanics
 * 
 * Registry of all food items and their hunger restoration values.
 */

import { BlockType } from '../core/Block'
import { AnimalType } from '../entities/AnimalTypes'

/**
 * Food type enumeration
 */
export enum FoodType {
  RAW_BEEF = 'raw_beef',
  RAW_PORKCHOP = 'raw_porkchop',
  RAW_MUTTON = 'raw_mutton',
  RAW_CHICKEN = 'raw_chicken',
  RAW_RABBIT = 'raw_rabbit'
}

/**
 * Food item definition
 */
export interface FoodItem {
  type: FoodType
  name: string
  nameEn: string
  hungerRestore: number
  blockType: BlockType
}

/**
 * Food definitions
 */
export const FOOD_ITEMS: Record<FoodType, FoodItem> = {
  [FoodType.RAW_BEEF]: {
    type: FoodType.RAW_BEEF,
    name: '生牛肉',
    nameEn: 'Raw Beef',
    hungerRestore: 3,
    blockType: BlockType.RAW_BEEF
  },
  [FoodType.RAW_PORKCHOP]: {
    type: FoodType.RAW_PORKCHOP,
    name: '生猪排',
    nameEn: 'Raw Porkchop',
    hungerRestore: 3,
    blockType: BlockType.RAW_PORKCHOP
  },
  [FoodType.RAW_MUTTON]: {
    type: FoodType.RAW_MUTTON,
    name: '生羊肉',
    nameEn: 'Raw Mutton',
    hungerRestore: 2,
    blockType: BlockType.RAW_MUTTON
  },
  [FoodType.RAW_CHICKEN]: {
    type: FoodType.RAW_CHICKEN,
    name: '生鸡肉',
    nameEn: 'Raw Chicken',
    hungerRestore: 2,
    blockType: BlockType.RAW_CHICKEN
  },
  [FoodType.RAW_RABBIT]: {
    type: FoodType.RAW_RABBIT,
    name: '生兔肉',
    nameEn: 'Raw Rabbit',
    hungerRestore: 3,
    blockType: BlockType.RAW_RABBIT
  }
}

/**
 * Map animal type to food type
 */
export const ANIMAL_FOOD_DROPS: Partial<Record<AnimalType, FoodType>> = {
  [AnimalType.COW]: FoodType.RAW_BEEF,
  [AnimalType.PIG]: FoodType.RAW_PORKCHOP,
  [AnimalType.SHEEP]: FoodType.RAW_MUTTON,
  [AnimalType.CHICKEN]: FoodType.RAW_CHICKEN,
  [AnimalType.RABBIT]: FoodType.RAW_RABBIT
  // WOLF and FOX don't drop food
}

/**
 * Food registry class
 */
export class FoodRegistry {
  /**
   * Get food item by type
   */
  static getFood(type: FoodType): FoodItem | null {
    return FOOD_ITEMS[type] ?? null
  }

  /**
   * Get food drop for an animal type
   */
  static getFoodForAnimal(animalType: AnimalType): FoodType | null {
    return ANIMAL_FOOD_DROPS[animalType] ?? null
  }

  /**
   * Get BlockType for a FoodType (Feature: 021-food-system)
   */
  static getBlockTypeForFood(foodType: FoodType): BlockType | null {
    const food = FOOD_ITEMS[foodType]
    return food?.blockType ?? null
  }

  /**
   * Check if a block type is a food item (Feature: 021-food-system)
   */
  static isFoodBlock(blockType: BlockType): boolean {
    return blockType === BlockType.RAW_BEEF ||
           blockType === BlockType.RAW_PORKCHOP ||
           blockType === BlockType.RAW_MUTTON ||
           blockType === BlockType.RAW_CHICKEN ||
           blockType === BlockType.RAW_RABBIT
  }

  /**
   * Check if a block type is a food item (legacy method)
   */
  static isFood(blockType: BlockType): boolean {
    return FoodRegistry.isFoodBlock(blockType)
  }

  /**
   * Get FoodItem from BlockType (Feature: 021-food-system)
   */
  static getFoodFromBlockType(blockType: BlockType): FoodItem | null {
    for (const food of Object.values(FOOD_ITEMS)) {
      if (food.blockType === blockType) {
        return food
      }
    }
    return null
  }

  /**
   * Get hunger restoration for a food block type
   */
  static getHungerRestore(blockType: BlockType): number {
    const food = FoodRegistry.getFoodFromBlockType(blockType)
    return food?.hungerRestore ?? 0
  }

  /**
   * Get all food types
   */
  static getAllFoods(): FoodItem[] {
    return Object.values(FOOD_ITEMS)
  }
}
