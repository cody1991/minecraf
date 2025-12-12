/**
 * World - Chunk-based world management
 * Feature: 002-chunk-terrain-system
 * Updated: 004-colosseum-spawn-map - Added Colosseum spawn structure
 * 
 * Manages all chunks and provides block access via world coordinates.
 */

import { BlockType } from './Block'
import { Chunk } from './Chunk'
import {
  CHUNK_SIZE,
  WORLD_HEIGHT,
  WORLD_MIN_Y,
  VERTICAL_CHUNKS,
  ChunkCoord,
  chunkKey,
  worldToChunk,
  worldToLocal,
  isValidWorldY,
  isValidChunkY,
  DEFAULT_TERRAIN_CONFIG,
  TerrainConfig,
  CaveConfig,
  DEFAULT_CAVE_CONFIG,
} from './ChunkConstants'
import { TerrainGenerator } from '../terrain/TerrainGenerator'
import { CaveGenerator } from '../terrain/CaveGenerator'
import { ColosseumConfig } from '../terrain/ColosseumGenerator'

/**
 * World configuration
 */
export interface WorldConfig {
  seed?: number
  terrainConfig?: Partial<TerrainConfig>
  caveConfig?: Partial<CaveConfig>
  enableCaves?: boolean
  enableColosseum?: boolean
  colosseumConfig?: Partial<ColosseumConfig>
}

/**
 * World class - manages chunk-based infinite world
 */
export class World {
  /** World seed for terrain generation */
  public readonly seed: number

  /** Loaded chunks map (key: "x,y,z") */
  private chunks: Map<string, Chunk> = new Map()

  /** Terrain generator */
  private terrainGenerator: TerrainGenerator

  /** Cave generator */
  private caveGenerator: CaveGenerator | null = null

  /** Chunks that have been modified (need mesh update) */
  private dirtyChunks: Set<string> = new Set()

  /** Callback when a chunk is loaded */
  public onChunkLoaded: ((chunk: Chunk) => void) | null = null

  /** Callback when a chunk is unloaded */
  public onChunkUnloaded: ((chunk: Chunk) => void) | null = null

  constructor(config: WorldConfig = {}) {
    // Generate seed if not provided
    this.seed = config.seed ?? Math.floor(Math.random() * 2147483647)

    // Initialize terrain generator
    const terrainConfig = { ...DEFAULT_TERRAIN_CONFIG, ...config.terrainConfig }
    this.terrainGenerator = new TerrainGenerator(this.seed, terrainConfig)

    // Initialize cave generator if enabled (default: true)
    const enableCaves = config.enableCaves ?? true
    if (enableCaves) {
      const caveConfig = { ...DEFAULT_CAVE_CONFIG, ...config.caveConfig }
      this.caveGenerator = new CaveGenerator(this.seed, caveConfig)
      this.terrainGenerator.enableCaves(this.caveGenerator)
    }

    // Initialize Colosseum generator if enabled (default: true)
    const enableColosseum = config.enableColosseum ?? true
    if (enableColosseum) {
      this.terrainGenerator.enableColosseum(config.colosseumConfig)
    }
  }

  /**
   * Get block type at world coordinates
   */
  getBlock(x: number, y: number, z: number): BlockType {
    // Floor coordinates for block position
    const bx = Math.floor(x)
    const by = Math.floor(y)
    const bz = Math.floor(z)

    // Check Y bounds
    if (!isValidWorldY(by)) {
      return BlockType.AIR
    }

    // Get chunk coordinates
    const chunkCoord = worldToChunk(bx, by, bz)
    const chunk = this.getChunk(chunkCoord.x, chunkCoord.y, chunkCoord.z)

    if (!chunk) {
      return BlockType.AIR
    }

    // Get local coordinates within chunk
    const local = worldToLocal(bx, by, bz)
    return chunk.getBlock(local.x, local.y, local.z)
  }

  /**
   * Set block type at world coordinates
   */
  setBlock(x: number, y: number, z: number, type: BlockType): boolean {
    const bx = Math.floor(x)
    const by = Math.floor(y)
    const bz = Math.floor(z)

    if (!isValidWorldY(by)) {
      return false
    }

    const chunkCoord = worldToChunk(bx, by, bz)
    const chunk = this.getChunk(chunkCoord.x, chunkCoord.y, chunkCoord.z)

    if (!chunk) {
      return false
    }

    const local = worldToLocal(bx, by, bz)
    chunk.setBlock(local.x, local.y, local.z, type)

    // Mark chunk as dirty
    const key = chunkKey(chunkCoord.x, chunkCoord.y, chunkCoord.z)
    this.dirtyChunks.add(key)

    // Also mark adjacent chunks if block is on edge
    this.markAdjacentChunksDirty(local.x, local.y, local.z, chunkCoord)

    return true
  }

  /**
   * Mark adjacent chunks dirty if block is on chunk boundary
   */
  private markAdjacentChunksDirty(localX: number, localY: number, localZ: number, chunkCoord: ChunkCoord): void {
    const { x: cx, y: cy, z: cz } = chunkCoord

    if (localX === 0) this.dirtyChunks.add(chunkKey(cx - 1, cy, cz))
    if (localX === CHUNK_SIZE - 1) this.dirtyChunks.add(chunkKey(cx + 1, cy, cz))
    if (localY === 0 && cy > 0) this.dirtyChunks.add(chunkKey(cx, cy - 1, cz))
    if (localY === CHUNK_SIZE - 1 && cy < VERTICAL_CHUNKS - 1) this.dirtyChunks.add(chunkKey(cx, cy + 1, cz))
    if (localZ === 0) this.dirtyChunks.add(chunkKey(cx, cy, cz - 1))
    if (localZ === CHUNK_SIZE - 1) this.dirtyChunks.add(chunkKey(cx, cy, cz + 1))
  }

  /**
   * Get a chunk by chunk coordinates
   */
  getChunk(cx: number, cy: number, cz: number): Chunk | undefined {
    if (!isValidChunkY(cy)) {
      return undefined
    }
    return this.chunks.get(chunkKey(cx, cy, cz))
  }

  /**
   * Check if a chunk is loaded
   */
  isChunkLoaded(cx: number, cy: number, cz: number): boolean {
    return this.chunks.has(chunkKey(cx, cy, cz))
  }

  /**
   * Load a chunk (generates terrain if not already loaded)
   */
  loadChunk(cx: number, cy: number, cz: number): Chunk {
    const key = chunkKey(cx, cy, cz)

    // Return existing chunk if already loaded
    let chunk = this.chunks.get(key)
    if (chunk) {
      return chunk
    }

    // Validate Y coordinate
    if (!isValidChunkY(cy)) {
      throw new Error(`Invalid chunk Y coordinate: ${cy}`)
    }

    // Create new chunk
    chunk = new Chunk(cx, cy, cz)

    // Generate terrain
    const blockData = this.terrainGenerator.generateChunk(cx, cy, cz)
    chunk.fillBlocks(blockData)

    // Store chunk
    this.chunks.set(key, chunk)

    // Notify listeners
    if (this.onChunkLoaded) {
      this.onChunkLoaded(chunk)
    }

    return chunk
  }

  /**
   * Unload a chunk
   */
  unloadChunk(cx: number, cy: number, cz: number): void {
    const key = chunkKey(cx, cy, cz)
    const chunk = this.chunks.get(key)

    if (chunk) {
      // Notify listeners before removing
      if (this.onChunkUnloaded) {
        this.onChunkUnloaded(chunk)
      }

      chunk.dispose()
      this.chunks.delete(key)
      this.dirtyChunks.delete(key)
    }
  }

  /**
   * Get terrain height at world X,Z coordinates
   */
  getHeightAt(worldX: number, worldZ: number): number {
    return this.terrainGenerator.getHeightAt(worldX, worldZ)
  }

  /**
   * Get spawn position (center of Colosseum arena, or terrain origin)
   */
  getSpawnPosition(): { x: number; y: number; z: number } {
    const x = 0
    const z = 0
    
    // If Colosseum is enabled, spawn on the arena floor
    const colosseumGenerator = this.terrainGenerator.getColosseumGenerator()
    if (colosseumGenerator) {
      return {
        x: x + 0.5,
        y: colosseumGenerator.getSpawnHeight() + 0.8, // Player eye height above arena floor
        z: z + 0.5
      }
    }
    
    // Fallback to terrain height
    const groundHeight = this.getHeightAt(x, z)
    
    return {
      x: x + 0.5,
      y: groundHeight + 1.8, // Player eye height above ground
      z: z + 0.5
    }
  }

  /**
   * Get all loaded chunks
   */
  getLoadedChunks(): Chunk[] {
    return Array.from(this.chunks.values())
  }

  /**
   * Get number of loaded chunks
   */
  getLoadedChunkCount(): number {
    return this.chunks.size
  }

  /**
   * Get and clear dirty chunks
   */
  getDirtyChunks(): Chunk[] {
    const dirty: Chunk[] = []
    for (const key of this.dirtyChunks) {
      const chunk = this.chunks.get(key)
      if (chunk) {
        dirty.push(chunk)
      }
    }
    this.dirtyChunks.clear()
    return dirty
  }

  /**
   * Check if position is within world vertical bounds
   */
  isValidPosition(_x: number, y: number, _z: number): boolean {
    return isValidWorldY(Math.floor(y))
  }

  /**
   * Get terrain generator (for external access)
   */
  getTerrainGenerator(): TerrainGenerator {
    return this.terrainGenerator
  }

  /**
   * Dispose of all world resources
   */
  dispose(): void {
    for (const chunk of this.chunks.values()) {
      chunk.dispose()
    }
    this.chunks.clear()
    this.dirtyChunks.clear()
  }
}

// Legacy exports for backward compatibility
export const WORLD_HEIGHT_LEGACY = WORLD_HEIGHT
export const WORLD_MIN_Y_LEGACY = WORLD_MIN_Y
