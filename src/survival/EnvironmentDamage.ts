/**
 * EnvironmentDamage - Environmental damage detection
 * Feature: 020-survival-mechanics
 * 
 * Handles fall damage, drowning, lava, and cactus damage.
 */

import * as THREE from 'three'
import { PlayerStats } from './PlayerStats'
import { getDamageSystem } from './DamageSystem'
import { BlockType } from '../core/Block'
import {
  FALL_DAMAGE_THRESHOLD,
  FALL_DAMAGE_PER_BLOCK,
  DROWNING_DAMAGE,
  DROWNING_INTERVAL,
  LAVA_DAMAGE,
  LAVA_DAMAGE_INTERVAL,
  CACTUS_DAMAGE,
  CACTUS_DAMAGE_COOLDOWN,
  OXYGEN_MAX,
  DamageSource
} from './SurvivalConstants'

/**
 * World interface for block queries
 */
export interface IBlockWorld {
  getBlock(x: number, y: number, z: number): BlockType
}

/**
 * Player state interface for environment checks
 */
export interface IPlayerState {
  position: THREE.Vector3
  velocity: THREE.Vector3
  isGrounded: boolean
  isInWater: boolean
  isSubmerged: boolean
  width: number
  height: number
}

/**
 * Environment damage system
 */
export class EnvironmentDamage {
  private stats: PlayerStats
  
  // Fall damage tracking
  private lastGroundedY: number = 0
  private wasGrounded: boolean = true
  
  // Drowning tracking
  private drowningTimer: number = 0
  
  // Lava damage tracking
  private lavaDamageTimer: number = 0
  
  // Cactus damage tracking
  private cactusCooldown: number = 0

  constructor(stats: PlayerStats) {
    this.stats = stats
  }

  /**
   * Update environment damage checks
   */
  update(
    deltaTime: number,
    player: IPlayerState,
    world: IBlockWorld
  ): void {
    // Update cooldowns
    if (this.cactusCooldown > 0) {
      this.cactusCooldown -= deltaTime
    }
    
    // Check each damage type
    this.checkFallDamage(player)
    this.checkDrowning(deltaTime, player)
    this.checkLavaDamage(deltaTime, player, world)
    this.checkCactusDamage(player, world)
  }

  /**
   * Check and apply fall damage
   */
  private checkFallDamage(player: IPlayerState): void {
    if (player.isGrounded) {
      if (!this.wasGrounded) {
        // Just landed - calculate fall damage
        const fallDistance = this.lastGroundedY - player.position.y
        
        if (fallDistance > FALL_DAMAGE_THRESHOLD) {
          const damage = Math.floor((fallDistance - FALL_DAMAGE_THRESHOLD) * FALL_DAMAGE_PER_BLOCK)
          
          if (damage > 0) {
            getDamageSystem().applyDamage({
              target: this.stats,
              amount: damage,
              source: DamageSource.FALL,
              position: {
                x: player.position.x,
                y: player.position.y,
                z: player.position.z
              }
            })
          }
        }
      }
      
      // Update last grounded position
      this.lastGroundedY = player.position.y
    } else if (this.wasGrounded) {
      // Just left ground - record starting height
      this.lastGroundedY = player.position.y
    }
    
    // Track if rising (jumping) to update fall start height
    if (!player.isGrounded && player.velocity.y > 0) {
      this.lastGroundedY = Math.max(this.lastGroundedY, player.position.y)
    }
    
    this.wasGrounded = player.isGrounded
  }

  /**
   * Check and apply drowning damage
   */
  private checkDrowning(deltaTime: number, player: IPlayerState): void {
    if (player.isSubmerged) {
      // Decrease oxygen
      const newOxygen = Math.max(0, this.stats.oxygen - deltaTime)
      this.stats.setOxygen(newOxygen)
      
      // Apply drowning damage when oxygen depleted
      if (this.stats.oxygen <= 0) {
        this.drowningTimer += deltaTime
        
        if (this.drowningTimer >= DROWNING_INTERVAL) {
          this.drowningTimer -= DROWNING_INTERVAL
          
          getDamageSystem().applyDamage({
            target: this.stats,
            amount: DROWNING_DAMAGE,
            source: DamageSource.DROWNING,
            position: {
              x: player.position.x,
              y: player.position.y,
              z: player.position.z
            }
          })
        }
      }
    } else {
      // Restore oxygen when not submerged
      if (this.stats.oxygen < OXYGEN_MAX) {
        const newOxygen = Math.min(OXYGEN_MAX, this.stats.oxygen + deltaTime * 2)
        this.stats.setOxygen(newOxygen)
      }
      this.drowningTimer = 0
    }
  }

  /**
   * Check and apply lava damage
   */
  private checkLavaDamage(
    deltaTime: number,
    player: IPlayerState,
    world: IBlockWorld
  ): void {
    // Check if player is touching lava
    const inLava = this.isInBlock(player, world, BlockType.LAVA)
    
    if (inLava) {
      this.lavaDamageTimer += deltaTime
      
      if (this.lavaDamageTimer >= LAVA_DAMAGE_INTERVAL) {
        this.lavaDamageTimer -= LAVA_DAMAGE_INTERVAL
        
        getDamageSystem().applyDamage({
          target: this.stats,
          amount: LAVA_DAMAGE,
          source: DamageSource.LAVA,
          position: {
            x: player.position.x,
            y: player.position.y,
            z: player.position.z
          }
        })
      }
    } else {
      this.lavaDamageTimer = 0
    }
  }

  /**
   * Check and apply cactus damage
   */
  private checkCactusDamage(
    player: IPlayerState,
    world: IBlockWorld
  ): void {
    if (this.cactusCooldown > 0) return
    
    // Check if player is touching cactus
    const touchingCactus = this.isTouchingBlock(player, world, BlockType.CACTUS)
    
    if (touchingCactus) {
      this.cactusCooldown = CACTUS_DAMAGE_COOLDOWN
      
      getDamageSystem().applyDamage({
        target: this.stats,
        amount: CACTUS_DAMAGE,
        source: DamageSource.CACTUS,
        position: {
          x: player.position.x,
          y: player.position.y,
          z: player.position.z
        }
      })
    }
  }

  /**
   * Check if player is inside a specific block type
   */
  private isInBlock(
    player: IPlayerState,
    world: IBlockWorld,
    blockType: BlockType
  ): boolean {
    const halfWidth = player.width / 2
    const halfHeight = player.height / 2
    
    // Check player bounding box
    const minX = Math.floor(player.position.x - halfWidth)
    const maxX = Math.floor(player.position.x + halfWidth)
    const minY = Math.floor(player.position.y - halfHeight)
    const maxY = Math.floor(player.position.y + halfHeight)
    const minZ = Math.floor(player.position.z - halfWidth)
    const maxZ = Math.floor(player.position.z + halfWidth)
    
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          if (world.getBlock(x, y, z) === blockType) {
            return true
          }
        }
      }
    }
    
    return false
  }

  /**
   * Check if player is touching (adjacent to) a specific block type
   */
  private isTouchingBlock(
    player: IPlayerState,
    world: IBlockWorld,
    blockType: BlockType
  ): boolean {
    const halfWidth = player.width / 2 + 0.1 // Slightly larger to detect touching
    const halfHeight = player.height / 2
    
    // Check slightly expanded bounding box
    const minX = Math.floor(player.position.x - halfWidth)
    const maxX = Math.floor(player.position.x + halfWidth)
    const minY = Math.floor(player.position.y - halfHeight)
    const maxY = Math.floor(player.position.y + halfHeight)
    const minZ = Math.floor(player.position.z - halfWidth)
    const maxZ = Math.floor(player.position.z + halfWidth)
    
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          if (world.getBlock(x, y, z) === blockType) {
            return true
          }
        }
      }
    }
    
    return false
  }

  /**
   * Reset state (e.g., on respawn)
   */
  reset(playerY: number): void {
    this.lastGroundedY = playerY
    this.wasGrounded = true
    this.drowningTimer = 0
    this.lavaDamageTimer = 0
    this.cactusCooldown = 0
  }
}
