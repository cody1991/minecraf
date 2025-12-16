/**
 * DiggingManager - Manages block digging progress
 * Feature: 023-digging-system
 */

import { BlockType, isSolid } from '../core/Block'
import { World } from '../core/World'
import { Player } from './Player'
import { Raycaster, INTERACTION_DISTANCE } from '../utils/Raycaster'
import { getBlockDiggingTime, getCrackStage } from './DiggingConfig'
import { AudioManager } from '../audio/AudioManager'
import { ItemEntity } from '../entities/ItemEntity'

/** Digging state */
interface DiggingState {
  /** Target block position */
  blockX: number
  blockY: number
  blockZ: number
  /** Block type being dug */
  blockType: BlockType
  /** Current progress (0-1) */
  progress: number
  /** Total time needed */
  totalTime: number
  /** Current crack stage (0-9) */
  crackStage: number
}

/** Digging callbacks */
export interface DiggingCallbacks {
  onProgressChange?: (progress: number, crackStage: number) => void
  onBlockBreak?: (x: number, y: number, z: number, blockType: BlockType) => void
  onDiggingStart?: (x: number, y: number, z: number) => void
  onDiggingStop?: () => void
  onItemDrop?: (item: ItemEntity) => void
}

/**
 * DiggingManager - Handles progressive block breaking
 */
export class DiggingManager {
  private world: World
  private player: Player
  private raycaster: Raycaster
  
  /** Current digging state */
  private diggingState: DiggingState | null = null
  
  /** Callbacks */
  private callbacks: DiggingCallbacks = {}
  
  /** Particle spawn timer */
  private particleTimer: number = 0
  private readonly PARTICLE_INTERVAL = 0.1
  
  /** Sound timer */
  private soundTimer: number = 0
  private readonly SOUND_INTERVAL = 0.25

  constructor(world: World, player: Player) {
    this.world = world
    this.player = player
    this.raycaster = new Raycaster(world)
  }

  /**
   * Set callbacks
   */
  setCallbacks(callbacks: DiggingCallbacks): void {
    this.callbacks = callbacks
  }

  /**
   * Get current digging progress (0-1)
   */
  getProgress(): number {
    return this.diggingState?.progress ?? 0
  }

  /**
   * Get current crack stage (0-9)
   */
  getCrackStage(): number {
    return this.diggingState?.crackStage ?? 0
  }

  /**
   * Check if currently digging
   */
  isDigging(): boolean {
    return this.diggingState !== null
  }

  /**
   * Get target block position
   */
  getTargetBlock(): { x: number, y: number, z: number } | null {
    if (!this.diggingState) return null
    return {
      x: this.diggingState.blockX,
      y: this.diggingState.blockY,
      z: this.diggingState.blockZ
    }
  }

  /**
   * Update digging state
   * @param deltaTime Time since last frame
   * @param isDigging Whether player is holding dig button
   * @returns true if a block was broken this frame
   */
  update(deltaTime: number, isDigging: boolean): boolean {
    if (!isDigging) {
      // Player released dig button
      if (this.diggingState) {
        this.stopDigging()
      }
      return false
    }

    // Get target block
    const hit = this.getTargetBlockHit()
    
    if (!hit || hit.distance > INTERACTION_DISTANCE) {
      // No valid target
      if (this.diggingState) {
        this.stopDigging()
      }
      return false
    }

    const blockType = this.world.getBlock(hit.blockX, hit.blockY, hit.blockZ)
    
    // Can't dig air or non-solid blocks
    if (blockType === BlockType.AIR || !isSolid(blockType)) {
      if (this.diggingState) {
        this.stopDigging()
      }
      return false
    }

    // Check if target changed
    if (this.diggingState) {
      if (this.diggingState.blockX !== hit.blockX ||
          this.diggingState.blockY !== hit.blockY ||
          this.diggingState.blockZ !== hit.blockZ) {
        // Target changed, reset
        this.stopDigging()
      }
    }

    // Start digging if not already
    if (!this.diggingState) {
      this.startDigging(hit.blockX, hit.blockY, hit.blockZ, blockType)
    }

    // Update progress
    this.diggingState!.progress += deltaTime / this.diggingState!.totalTime
    
    // Update crack stage
    const newCrackStage = getCrackStage(this.diggingState!.progress)
    if (newCrackStage !== this.diggingState!.crackStage) {
      this.diggingState!.crackStage = newCrackStage
      this.callbacks.onProgressChange?.(this.diggingState!.progress, newCrackStage)
    }

    // Play digging sound periodically
    this.soundTimer += deltaTime
    if (this.soundTimer >= this.SOUND_INTERVAL) {
      this.soundTimer = 0
      AudioManager.getInstance().playBlockSound(
        blockType,
        'dig',
        hit.blockX + 0.5,
        hit.blockY + 0.5,
        hit.blockZ + 0.5
      )
    }

    // Spawn particles periodically
    this.particleTimer += deltaTime
    if (this.particleTimer >= this.PARTICLE_INTERVAL) {
      this.particleTimer = 0
      // Particle spawning handled by callback
    }

    // Check if block is broken
    if (this.diggingState!.progress >= 1) {
      return this.breakBlock()
    }

    return false
  }

  /**
   * Start digging a block
   */
  private startDigging(x: number, y: number, z: number, blockType: BlockType): void {
    const totalTime = getBlockDiggingTime(blockType)
    
    this.diggingState = {
      blockX: x,
      blockY: y,
      blockZ: z,
      blockType,
      progress: 0,
      totalTime,
      crackStage: 0
    }
    
    this.particleTimer = 0
    this.soundTimer = 0
    
    this.callbacks.onDiggingStart?.(x, y, z)
    this.callbacks.onProgressChange?.(0, 0)
  }

  /**
   * Stop digging (reset progress)
   */
  private stopDigging(): void {
    this.diggingState = null
    this.particleTimer = 0
    this.soundTimer = 0
    this.callbacks.onDiggingStop?.()
  }

  /**
   * Break the current block
   */
  private breakBlock(): boolean {
    if (!this.diggingState) return false
    
    const { blockX, blockY, blockZ, blockType } = this.diggingState
    
    // Destroy the block
    const success = this.world.setBlock(blockX, blockY, blockZ, BlockType.AIR)
    
    if (success) {
      // Play break sound
      AudioManager.getInstance().playBlockSound(
        blockType,
        'break',
        blockX + 0.5,
        blockY + 0.5,
        blockZ + 0.5
      )
      
      // Create dropped item
      if (blockType !== BlockType.AIR && this.callbacks.onItemDrop) {
        const itemEntity = new ItemEntity(
          blockX + 0.5,
          blockY + 0.5,
          blockZ + 0.5,
          blockType,
          1
        )
        this.callbacks.onItemDrop(itemEntity)
      }
      
      this.callbacks.onBlockBreak?.(blockX, blockY, blockZ, blockType)
    }
    
    this.stopDigging()
    return success
  }

  /**
   * Get the block the player is looking at
   */
  private getTargetBlockHit() {
    const origin = this.player.getEyePosition()
    const direction = this.player.getLookDirection()
    return this.raycaster.cast(origin, direction)
  }

  /**
   * Force stop digging (e.g., when opening inventory)
   */
  forceStop(): void {
    if (this.diggingState) {
      this.stopDigging()
    }
  }
}
