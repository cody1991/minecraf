/**
 * Collision Detection Module
 * Feature: 003-physics-collision
 * 
 * Handles collision detection between physics bodies and the voxel world.
 */

import { IPhysicsBody, ICollisionWorld, AxisCollisionResult } from './PhysicsTypes'
import { AABB, createAABB, createBlockAABB, aabbIntersects } from './AABB'
import { GROUND_CHECK_OFFSET, WORLD_MIN_Y } from './PhysicsConstants'
import { isSolid } from '../core/Block'

/**
 * Check if a physics body is standing on solid ground
 * 
 * @param body - The physics body to check
 * @param world - The collision world to query
 * @returns true if the body is grounded
 */
export function checkGrounded(body: IPhysicsBody, world: ICollisionWorld): boolean {
  const halfWidth = body.width / 2
  const halfHeight = body.height / 2
  
  // Check a thin box just below the player's feet
  const feetY = body.position.y - halfHeight - GROUND_CHECK_OFFSET
  
  // Check all blocks that could be under the player's feet
  const minBlockX = Math.floor(body.position.x - halfWidth)
  const maxBlockX = Math.floor(body.position.x + halfWidth)
  const minBlockZ = Math.floor(body.position.z - halfWidth)
  const maxBlockZ = Math.floor(body.position.z + halfWidth)
  const blockY = Math.floor(feetY)
  
  for (let bx = minBlockX; bx <= maxBlockX; bx++) {
    for (let bz = minBlockZ; bz <= maxBlockZ; bz++) {
      const blockType = world.getBlock(bx, blockY, bz)
      if (isSolid(blockType)) {
        // Check if player's foot area overlaps with block top
        const blockTop = blockY + 1
        const playerBottom = body.position.y - halfHeight
        
        // If player is very close to block top, they're grounded
        if (Math.abs(playerBottom - blockTop) <= GROUND_CHECK_OFFSET * 2) {
          return true
        }
      }
    }
  }
  
  // Also check world bottom boundary
  if (body.position.y - halfHeight <= WORLD_MIN_Y + GROUND_CHECK_OFFSET) {
    return true
  }
  
  return false
}

/**
 * Get the AABB for a physics body
 */
export function getBodyAABB(body: IPhysicsBody): AABB {
  return createAABB(
    body.position.x,
    body.position.y,
    body.position.z,
    body.width,
    body.height,
    body.width // depth = width for player
  )
}

/**
 * Check and resolve collision on the Y axis (vertical)
 * 
 * @param body - The physics body
 * @param world - The collision world
 * @param deltaY - The intended Y movement
 * @returns Collision result with adjusted position and velocity
 */
export function resolveYCollision(
  body: IPhysicsBody,
  world: ICollisionWorld,
  deltaY: number
): AxisCollisionResult {
  if (deltaY === 0) {
    return { collided: false, newPosition: body.position.y, newVelocity: body.velocity.y }
  }
  
  const halfWidth = body.width / 2
  const halfHeight = body.height / 2
  
  // Calculate new position
  let newY = body.position.y + deltaY
  let collided = false
  let newVelocity = body.velocity.y
  
  // Get blocks to check
  const minBlockX = Math.floor(body.position.x - halfWidth)
  const maxBlockX = Math.floor(body.position.x + halfWidth)
  const minBlockZ = Math.floor(body.position.z - halfWidth)
  const maxBlockZ = Math.floor(body.position.z + halfWidth)
  
  if (deltaY < 0) {
    // Moving down - check floor collision
    const newBottom = newY - halfHeight
    const minBlockY = Math.floor(newBottom)
    const maxBlockY = Math.floor(body.position.y - halfHeight)
    
    for (let by = maxBlockY; by >= minBlockY && !collided; by--) {
      for (let bx = minBlockX; bx <= maxBlockX && !collided; bx++) {
        for (let bz = minBlockZ; bz <= maxBlockZ && !collided; bz++) {
          if (isSolid(world.getBlock(bx, by, bz))) {
            // Check AABB intersection
            const bodyAABB = createAABB(body.position.x, newY, body.position.z, body.width, body.height, body.width)
            const blockAABB = createBlockAABB(bx, by, bz)
            
            if (aabbIntersects(bodyAABB, blockAABB)) {
              // Snap to top of block
              newY = by + 1 + halfHeight
              newVelocity = 0
              collided = true
            }
          }
        }
      }
    }
    
    // Check world bottom boundary
    if (newY - halfHeight < WORLD_MIN_Y) {
      newY = WORLD_MIN_Y + halfHeight
      newVelocity = 0
      collided = true
    }
  } else {
    // Moving up - check ceiling collision
    const newTop = newY + halfHeight
    const minBlockY = Math.floor(body.position.y + halfHeight)
    const maxBlockY = Math.floor(newTop)
    
    for (let by = minBlockY; by <= maxBlockY && !collided; by++) {
      for (let bx = minBlockX; bx <= maxBlockX && !collided; bx++) {
        for (let bz = minBlockZ; bz <= maxBlockZ && !collided; bz++) {
          if (isSolid(world.getBlock(bx, by, bz))) {
            const bodyAABB = createAABB(body.position.x, newY, body.position.z, body.width, body.height, body.width)
            const blockAABB = createBlockAABB(bx, by, bz)
            
            if (aabbIntersects(bodyAABB, blockAABB)) {
              // Snap to bottom of block
              newY = by - halfHeight
              newVelocity = 0
              collided = true
            }
          }
        }
      }
    }
  }
  
  return { collided, newPosition: newY, newVelocity }
}

/**
 * Check and resolve collision on the X axis
 */
export function resolveXCollision(
  body: IPhysicsBody,
  world: ICollisionWorld,
  deltaX: number
): AxisCollisionResult {
  if (deltaX === 0) {
    return { collided: false, newPosition: body.position.x, newVelocity: body.velocity.x }
  }
  
  const halfWidth = body.width / 2
  const halfHeight = body.height / 2
  
  let newX = body.position.x + deltaX
  let collided = false
  let newVelocity = body.velocity.x
  
  // Get blocks to check
  const minBlockY = Math.floor(body.position.y - halfHeight)
  const maxBlockY = Math.floor(body.position.y + halfHeight)
  const minBlockZ = Math.floor(body.position.z - halfWidth)
  const maxBlockZ = Math.floor(body.position.z + halfWidth)
  
  if (deltaX < 0) {
    // Moving left (-X)
    const newLeft = newX - halfWidth
    const minBlockX = Math.floor(newLeft)
    const maxBlockX = Math.floor(body.position.x - halfWidth)
    
    for (let bx = maxBlockX; bx >= minBlockX && !collided; bx--) {
      for (let by = minBlockY; by <= maxBlockY && !collided; by++) {
        for (let bz = minBlockZ; bz <= maxBlockZ && !collided; bz++) {
          if (isSolid(world.getBlock(bx, by, bz))) {
            const bodyAABB = createAABB(newX, body.position.y, body.position.z, body.width, body.height, body.width)
            const blockAABB = createBlockAABB(bx, by, bz)
            
            if (aabbIntersects(bodyAABB, blockAABB)) {
              newX = bx + 1 + halfWidth
              newVelocity = 0
              collided = true
            }
          }
        }
      }
    }
  } else {
    // Moving right (+X)
    const newRight = newX + halfWidth
    const minBlockX = Math.floor(body.position.x + halfWidth)
    const maxBlockX = Math.floor(newRight)
    
    for (let bx = minBlockX; bx <= maxBlockX && !collided; bx++) {
      for (let by = minBlockY; by <= maxBlockY && !collided; by++) {
        for (let bz = minBlockZ; bz <= maxBlockZ && !collided; bz++) {
          if (isSolid(world.getBlock(bx, by, bz))) {
            const bodyAABB = createAABB(newX, body.position.y, body.position.z, body.width, body.height, body.width)
            const blockAABB = createBlockAABB(bx, by, bz)
            
            if (aabbIntersects(bodyAABB, blockAABB)) {
              newX = bx - halfWidth
              newVelocity = 0
              collided = true
            }
          }
        }
      }
    }
  }
  
  return { collided, newPosition: newX, newVelocity }
}

/**
 * Check and resolve collision on the Z axis
 */
export function resolveZCollision(
  body: IPhysicsBody,
  world: ICollisionWorld,
  deltaZ: number
): AxisCollisionResult {
  if (deltaZ === 0) {
    return { collided: false, newPosition: body.position.z, newVelocity: body.velocity.z }
  }
  
  const halfWidth = body.width / 2
  const halfHeight = body.height / 2
  
  let newZ = body.position.z + deltaZ
  let collided = false
  let newVelocity = body.velocity.z
  
  // Get blocks to check
  const minBlockY = Math.floor(body.position.y - halfHeight)
  const maxBlockY = Math.floor(body.position.y + halfHeight)
  const minBlockX = Math.floor(body.position.x - halfWidth)
  const maxBlockX = Math.floor(body.position.x + halfWidth)
  
  if (deltaZ < 0) {
    // Moving backward (-Z)
    const newBack = newZ - halfWidth
    const minBlockZ = Math.floor(newBack)
    const maxBlockZ = Math.floor(body.position.z - halfWidth)
    
    for (let bz = maxBlockZ; bz >= minBlockZ && !collided; bz--) {
      for (let by = minBlockY; by <= maxBlockY && !collided; by++) {
        for (let bx = minBlockX; bx <= maxBlockX && !collided; bx++) {
          if (isSolid(world.getBlock(bx, by, bz))) {
            const bodyAABB = createAABB(body.position.x, body.position.y, newZ, body.width, body.height, body.width)
            const blockAABB = createBlockAABB(bx, by, bz)
            
            if (aabbIntersects(bodyAABB, blockAABB)) {
              newZ = bz + 1 + halfWidth
              newVelocity = 0
              collided = true
            }
          }
        }
      }
    }
  } else {
    // Moving forward (+Z)
    const newFront = newZ + halfWidth
    const minBlockZ = Math.floor(body.position.z + halfWidth)
    const maxBlockZ = Math.floor(newFront)
    
    for (let bz = minBlockZ; bz <= maxBlockZ && !collided; bz++) {
      for (let by = minBlockY; by <= maxBlockY && !collided; by++) {
        for (let bx = minBlockX; bx <= maxBlockX && !collided; bx++) {
          if (isSolid(world.getBlock(bx, by, bz))) {
            const bodyAABB = createAABB(body.position.x, body.position.y, newZ, body.width, body.height, body.width)
            const blockAABB = createBlockAABB(bx, by, bz)
            
            if (aabbIntersects(bodyAABB, blockAABB)) {
              newZ = bz - halfWidth
              newVelocity = 0
              collided = true
            }
          }
        }
      }
    }
  }
  
  return { collided, newPosition: newZ, newVelocity }
}
