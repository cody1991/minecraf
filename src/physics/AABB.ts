/**
 * AABB (Axis-Aligned Bounding Box) utility class
 * Feature: 003-physics-collision
 * 
 * Provides collision detection primitives for the physics system.
 */

/**
 * AABB representation
 */
export interface AABB {
  minX: number
  maxX: number
  minY: number
  maxY: number
  minZ: number
  maxZ: number
}

/**
 * Create an AABB from center position and dimensions
 */
export function createAABB(
  centerX: number,
  centerY: number,
  centerZ: number,
  width: number,
  height: number,
  depth: number
): AABB {
  const halfWidth = width / 2
  const halfHeight = height / 2
  const halfDepth = depth / 2
  
  return {
    minX: centerX - halfWidth,
    maxX: centerX + halfWidth,
    minY: centerY - halfHeight,
    maxY: centerY + halfHeight,
    minZ: centerZ - halfDepth,
    maxZ: centerZ + halfDepth
  }
}

/**
 * Create an AABB for a block at given coordinates
 * Blocks occupy 1x1x1 unit space from (x,y,z) to (x+1,y+1,z+1)
 */
export function createBlockAABB(blockX: number, blockY: number, blockZ: number): AABB {
  return {
    minX: blockX,
    maxX: blockX + 1,
    minY: blockY,
    maxY: blockY + 1,
    minZ: blockZ,
    maxZ: blockZ + 1
  }
}

/**
 * Check if two AABBs intersect
 */
export function aabbIntersects(a: AABB, b: AABB): boolean {
  return (
    a.minX < b.maxX && a.maxX > b.minX &&
    a.minY < b.maxY && a.maxY > b.minY &&
    a.minZ < b.maxZ && a.maxZ > b.minZ
  )
}

/**
 * Check if AABB a fully contains AABB b
 */
export function aabbContains(a: AABB, b: AABB): boolean {
  return (
    a.minX <= b.minX && a.maxX >= b.maxX &&
    a.minY <= b.minY && a.maxY >= b.maxY &&
    a.minZ <= b.minZ && a.maxZ >= b.maxZ
  )
}

/**
 * Check if a point is inside an AABB
 */
export function aabbContainsPoint(aabb: AABB, x: number, y: number, z: number): boolean {
  return (
    x >= aabb.minX && x <= aabb.maxX &&
    y >= aabb.minY && y <= aabb.maxY &&
    z >= aabb.minZ && z <= aabb.maxZ
  )
}

/**
 * Get the center of an AABB
 */
export function aabbCenter(aabb: AABB): { x: number; y: number; z: number } {
  return {
    x: (aabb.minX + aabb.maxX) / 2,
    y: (aabb.minY + aabb.maxY) / 2,
    z: (aabb.minZ + aabb.maxZ) / 2
  }
}

/**
 * Get the dimensions of an AABB
 */
export function aabbDimensions(aabb: AABB): { width: number; height: number; depth: number } {
  return {
    width: aabb.maxX - aabb.minX,
    height: aabb.maxY - aabb.minY,
    depth: aabb.maxZ - aabb.minZ
  }
}

/**
 * Expand an AABB by a given amount in all directions
 */
export function aabbExpand(aabb: AABB, amount: number): AABB {
  return {
    minX: aabb.minX - amount,
    maxX: aabb.maxX + amount,
    minY: aabb.minY - amount,
    maxY: aabb.maxY + amount,
    minZ: aabb.minZ - amount,
    maxZ: aabb.maxZ + amount
  }
}

/**
 * Translate an AABB by a given offset
 */
export function aabbTranslate(aabb: AABB, dx: number, dy: number, dz: number): AABB {
  return {
    minX: aabb.minX + dx,
    maxX: aabb.maxX + dx,
    minY: aabb.minY + dy,
    maxY: aabb.maxY + dy,
    minZ: aabb.minZ + dz,
    maxZ: aabb.maxZ + dz
  }
}

/**
 * Calculate the penetration depth between two intersecting AABBs
 * Returns the minimum translation vector to separate them
 */
export function aabbPenetration(a: AABB, b: AABB): { axis: 'x' | 'y' | 'z'; depth: number; direction: number } | null {
  // Check if they actually intersect
  if (!aabbIntersects(a, b)) {
    return null
  }

  // Calculate overlap on each axis
  const overlapX = Math.min(a.maxX - b.minX, b.maxX - a.minX)
  const overlapY = Math.min(a.maxY - b.minY, b.maxY - a.minY)
  const overlapZ = Math.min(a.maxZ - b.minZ, b.maxZ - a.minZ)

  // Find the axis with minimum penetration
  if (overlapX <= overlapY && overlapX <= overlapZ) {
    const direction = (a.minX + a.maxX) / 2 < (b.minX + b.maxX) / 2 ? -1 : 1
    return { axis: 'x', depth: overlapX, direction }
  } else if (overlapY <= overlapZ) {
    const direction = (a.minY + a.maxY) / 2 < (b.minY + b.maxY) / 2 ? -1 : 1
    return { axis: 'y', depth: overlapY, direction }
  } else {
    const direction = (a.minZ + a.maxZ) / 2 < (b.minZ + b.maxZ) / 2 ? -1 : 1
    return { axis: 'z', depth: overlapZ, direction }
  }
}
