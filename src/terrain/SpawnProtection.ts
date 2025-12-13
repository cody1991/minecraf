/**
 * SpawnProtection - Spawn point protection constants and utilities
 * Feature: 009-ecosystem-flora-fauna
 * Feature: 016-fix-animal-spawning - Reduced protection radius
 */

/**
 * Radius around spawn point where animals should not spawn (in blocks)
 * Reduced to allow animals closer to spawn for easier testing
 * Feature: 016-fix-animal-spawning
 */
export const SPAWN_PROTECTION_RADIUS = 30

/**
 * Radius for reduced plant density near spawn (in blocks)
 */
export const SPAWN_PLANT_REDUCED_RADIUS = SPAWN_PROTECTION_RADIUS + 10

/**
 * Check if a position is within the spawn protection zone
 * @param worldX World X coordinate
 * @param worldZ World Z coordinate
 * @returns true if position is protected from animal spawning
 */
export function isInSpawnProtectionZone(worldX: number, worldZ: number): boolean {
  const distanceFromOrigin = Math.sqrt(worldX * worldX + worldZ * worldZ)
  return distanceFromOrigin < SPAWN_PROTECTION_RADIUS
}

/**
 * Check if a position is in the reduced plant density zone
 * @param worldX World X coordinate
 * @param worldZ World Z coordinate
 * @returns true if position should have reduced plant density
 */
export function isInReducedPlantZone(worldX: number, worldZ: number): boolean {
  const distanceFromOrigin = Math.sqrt(worldX * worldX + worldZ * worldZ)
  return distanceFromOrigin < SPAWN_PLANT_REDUCED_RADIUS
}

/**
 * Get plant spawn chance multiplier based on distance from spawn
 * @param worldX World X coordinate
 * @param worldZ World Z coordinate
 * @returns Multiplier for plant spawn chance (0-1)
 */
export function getPlantSpawnMultiplier(worldX: number, worldZ: number): number {
  const distanceFromOrigin = Math.sqrt(worldX * worldX + worldZ * worldZ)
  
  if (distanceFromOrigin < SPAWN_PROTECTION_RADIUS) {
    return 0 // No extra plants in core protection zone
  }
  
  if (distanceFromOrigin < SPAWN_PLANT_REDUCED_RADIUS) {
    // Gradual increase from 0 to 1
    const t = (distanceFromOrigin - SPAWN_PROTECTION_RADIUS) / 
              (SPAWN_PLANT_REDUCED_RADIUS - SPAWN_PROTECTION_RADIUS)
    return t * t // Quadratic ease-in
  }
  
  return 1 // Full spawn chance outside protection zone
}
