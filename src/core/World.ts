import { BlockType } from './Block'

/**
 * World constants
 */
export const WORLD_WIDTH = 64
export const WORLD_HEIGHT = 256
export const WORLD_DEPTH = 64
export const GROUND_HEIGHT = 3

/**
 * World class - manages all blocks in the game world
 */
export class World {
  public readonly width: number = WORLD_WIDTH
  public readonly height: number = WORLD_HEIGHT
  public readonly depth: number = WORLD_DEPTH

  private blocks: BlockType[][][]
  private dirty: boolean = true

  constructor() {
    // Initialize 3D array with AIR
    this.blocks = new Array(this.width)
    for (let x = 0; x < this.width; x++) {
      this.blocks[x] = new Array(this.height)
      for (let y = 0; y < this.height; y++) {
        this.blocks[x]![y] = new Array(this.depth).fill(BlockType.AIR)
      }
    }

    // Generate flat terrain
    this.generateFlatTerrain()
  }

  /**
   * Generate a flat terrain with grass on top, dirt below
   */
  private generateFlatTerrain(): void {
    for (let x = 0; x < this.width; x++) {
      for (let z = 0; z < this.depth; z++) {
        // Bottom layer: stone
        this.blocks[x]![0]![z] = BlockType.STONE

        // Middle layers: dirt
        for (let y = 1; y < GROUND_HEIGHT - 1; y++) {
          this.blocks[x]![y]![z] = BlockType.DIRT
        }

        // Top layer: grass
        this.blocks[x]![GROUND_HEIGHT - 1]![z] = BlockType.GRASS
      }
    }
    this.dirty = true
  }

  /**
   * Check if a position is within world bounds
   */
  isValidPosition(x: number, y: number, z: number): boolean {
    return (
      x >= 0 && x < this.width &&
      y >= 0 && y < this.height &&
      z >= 0 && z < this.depth
    )
  }

  /**
   * Get block type at position
   */
  getBlock(x: number, y: number, z: number): BlockType {
    if (!this.isValidPosition(x, y, z)) {
      return BlockType.AIR
    }
    return this.blocks[x]![y]![z]!
  }

  /**
   * Set block type at position
   */
  setBlock(x: number, y: number, z: number, type: BlockType): boolean {
    if (!this.isValidPosition(x, y, z)) {
      return false
    }
    this.blocks[x]![y]![z] = type
    this.dirty = true
    return true
  }

  /**
   * Check if the world has been modified since last render
   */
  isDirty(): boolean {
    return this.dirty
  }

  /**
   * Mark the world as clean (after rendering)
   */
  markClean(): void {
    this.dirty = false
  }

  /**
   * Iterate over all non-air blocks
   */
  forEachBlock(callback: (x: number, y: number, z: number, type: BlockType) => void): void {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        for (let z = 0; z < this.depth; z++) {
          const type = this.blocks[x]![y]![z]!
          if (type !== BlockType.AIR) {
            callback(x, y, z, type)
          }
        }
      }
    }
  }

  /**
   * Get the spawn position (center of world, above ground)
   */
  getSpawnPosition(): { x: number; y: number; z: number } {
    return {
      x: this.width / 2,
      y: GROUND_HEIGHT + 1.8, // Player height above ground
      z: this.depth / 2
    }
  }
}
