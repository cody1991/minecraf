/**
 * Chunk Data Structure
 * Feature: 002-chunk-terrain-system
 * 
 * A chunk is a 16x16x16 block of the world, the basic unit for loading/rendering.
 */

import * as THREE from 'three'
import { BlockType } from './Block'
import {
  CHUNK_SIZE,
  CHUNK_VOLUME,
  ChunkState,
  ChunkCoord,
  blockIndex,
  chunkToWorld,
} from './ChunkConstants'

/**
 * Chunk class - manages a 16x16x16 section of the world
 */
export class Chunk {
  /** Chunk coordinates (not world coordinates) */
  public readonly coord: ChunkCoord

  /** Block data stored as flat Uint8Array (4096 bytes) */
  public readonly blocks: Uint8Array

  /** Current loading state */
  public state: ChunkState = ChunkState.UNLOADED

  /** Whether the mesh needs to be rebuilt */
  public isDirty: boolean = true

  /** Bounding box for frustum culling */
  public readonly boundingBox: THREE.Box3

  /** Reference to the rendered mesh (managed by ChunkMesh) */
  public mesh: THREE.Object3D | null = null

  /** Number of non-air blocks (for optimization) */
  private solidBlockCount: number = 0

  constructor(x: number, y: number, z: number) {
    this.coord = { x, y, z }
    this.blocks = new Uint8Array(CHUNK_VOLUME)
    
    // Initialize bounding box
    const worldPos = chunkToWorld(x, y, z)
    this.boundingBox = new THREE.Box3(
      new THREE.Vector3(worldPos.x, worldPos.y, worldPos.z),
      new THREE.Vector3(
        worldPos.x + CHUNK_SIZE,
        worldPos.y + CHUNK_SIZE,
        worldPos.z + CHUNK_SIZE
      )
    )
  }

  /**
   * Get block type at local coordinates
   */
  getBlock(localX: number, localY: number, localZ: number): BlockType {
    if (!this.isValidLocal(localX, localY, localZ)) {
      return BlockType.AIR
    }
    return this.blocks[blockIndex(localX, localY, localZ)]! as BlockType
  }

  /**
   * Set block type at local coordinates
   */
  setBlock(localX: number, localY: number, localZ: number, type: BlockType): void {
    if (!this.isValidLocal(localX, localY, localZ)) {
      return
    }

    const index = blockIndex(localX, localY, localZ)
    const oldType = this.blocks[index]! as BlockType

    if (oldType === type) return

    // Update solid block count
    if (oldType === BlockType.AIR && type !== BlockType.AIR) {
      this.solidBlockCount++
    } else if (oldType !== BlockType.AIR && type === BlockType.AIR) {
      this.solidBlockCount--
    }

    this.blocks[index] = type
    this.isDirty = true
  }

  /**
   * Fill the entire chunk with block data
   * Used during terrain generation
   */
  fillBlocks(data: Uint8Array): void {
    if (data.length !== CHUNK_VOLUME) {
      throw new Error(`Invalid block data length: ${data.length}, expected ${CHUNK_VOLUME}`)
    }

    this.blocks.set(data)
    this.isDirty = true

    // Count solid blocks
    this.solidBlockCount = 0
    for (let i = 0; i < CHUNK_VOLUME; i++) {
      if (this.blocks[i] !== BlockType.AIR) {
        this.solidBlockCount++
      }
    }
  }

  /**
   * Check if local coordinates are valid
   */
  isValidLocal(localX: number, localY: number, localZ: number): boolean {
    return (
      localX >= 0 && localX < CHUNK_SIZE &&
      localY >= 0 && localY < CHUNK_SIZE &&
      localZ >= 0 && localZ < CHUNK_SIZE
    )
  }

  /**
   * Check if the chunk is empty (all air)
   */
  isEmpty(): boolean {
    return this.solidBlockCount === 0
  }

  /**
   * Get the number of solid (non-air) blocks
   */
  getSolidBlockCount(): number {
    return this.solidBlockCount
  }

  /**
   * Get world position of the chunk's corner (0,0,0 local)
   */
  getWorldPosition(): THREE.Vector3 {
    const pos = chunkToWorld(this.coord.x, this.coord.y, this.coord.z)
    return new THREE.Vector3(pos.x, pos.y, pos.z)
  }

  /**
   * Get world position of the chunk's center
   */
  getWorldCenter(): THREE.Vector3 {
    const pos = chunkToWorld(this.coord.x, this.coord.y, this.coord.z)
    const half = CHUNK_SIZE / 2
    return new THREE.Vector3(pos.x + half, pos.y + half, pos.z + half)
  }

  /**
   * Iterate over all non-air blocks
   */
  forEachSolidBlock(
    callback: (localX: number, localY: number, localZ: number, type: BlockType) => void
  ): void {
    for (let y = 0; y < CHUNK_SIZE; y++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        for (let x = 0; x < CHUNK_SIZE; x++) {
          const type = this.getBlock(x, y, z)
          if (type !== BlockType.AIR) {
            callback(x, y, z, type)
          }
        }
      }
    }
  }

  /**
   * Check if a block face is exposed (adjacent to air or chunk boundary)
   * Used for mesh optimization
   */
  isFaceExposed(
    localX: number,
    localY: number,
    localZ: number,
    face: 'top' | 'bottom' | 'left' | 'right' | 'front' | 'back'
  ): boolean {
    let nx = localX, ny = localY, nz = localZ

    switch (face) {
      case 'top': ny++; break
      case 'bottom': ny--; break
      case 'left': nx--; break
      case 'right': nx++; break
      case 'front': nz++; break
      case 'back': nz--; break
    }

    // If neighbor is outside chunk, consider it exposed (will be checked by ChunkRenderer)
    if (!this.isValidLocal(nx, ny, nz)) {
      return true
    }

    return this.getBlock(nx, ny, nz) === BlockType.AIR
  }

  /**
   * Dispose of chunk resources
   */
  dispose(): void {
    if (this.mesh) {
      // Mesh disposal is handled by ChunkRenderer
      this.mesh = null
    }
    this.state = ChunkState.UNLOADED
  }
}
