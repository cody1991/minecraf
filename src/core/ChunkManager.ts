/**
 * ChunkManager - Manages chunk loading and unloading
 * Feature: 002-chunk-terrain-system
 * 
 * Handles dynamic chunk loading based on player position.
 */

import { World } from './World'
import { Chunk } from './Chunk'
import { ChunkRenderer } from '../renderer/ChunkRenderer'
import { PriorityQueue } from '../utils/PriorityQueue'
import {
  VERTICAL_CHUNKS,
  ChunkCoord,
  ChunkLoadConfig,
  DEFAULT_CHUNK_LOAD_CONFIG,
  chunkKey,
  worldToChunk,
} from './ChunkConstants'

/**
 * ChunkManager handles dynamic chunk loading/unloading
 */
export class ChunkManager {
  public readonly config: ChunkLoadConfig

  private world: World
  private chunkRenderer: ChunkRenderer

  // Loaded chunk keys
  private loadedChunks: Set<string> = new Set()

  // Queue for chunks to load (prioritized by distance)
  private loadQueue: PriorityQueue<ChunkCoord> = new PriorityQueue()

  // Last player chunk position (to detect movement)
  private lastPlayerChunkX: number = Infinity
  private lastPlayerChunkZ: number = Infinity

  // Callbacks for chunk events
  public onChunkLoaded: ((cx: number, cy: number, cz: number) => void) | null = null
  public onChunkUnloaded: ((cx: number, cy: number, cz: number) => void) | null = null

  constructor(
    world: World,
    chunkRenderer: ChunkRenderer,
    config: Partial<ChunkLoadConfig> = {}
  ) {
    this.world = world
    this.chunkRenderer = chunkRenderer
    this.config = { ...DEFAULT_CHUNK_LOAD_CONFIG, ...config }
  }

  /**
   * Update chunk loading based on player position
   * Called every frame
   */
  update(playerX: number, playerY: number, playerZ: number): void {
    // Get player's chunk coordinates
    const playerChunk = worldToChunk(playerX, playerY, playerZ)

    // Check if player moved to a new chunk column
    if (playerChunk.x !== this.lastPlayerChunkX || playerChunk.z !== this.lastPlayerChunkZ) {
      this.lastPlayerChunkX = playerChunk.x
      this.lastPlayerChunkZ = playerChunk.z

      // Recalculate which chunks need to be loaded/unloaded
      this.updateChunkQueues(playerChunk.x, playerChunk.z)
    }

    // Process load queue (limited per frame)
    this.processLoadQueue(playerX, playerZ)
  }

  /**
   * Update load/unload queues based on new player position
   */
  private updateChunkQueues(playerChunkX: number, playerChunkZ: number): void {
    const { loadRadius, unloadRadius } = this.config

    // Clear load queue and rebuild
    this.loadQueue.clear()

    // Find chunks that need to be loaded
    for (let dx = -loadRadius; dx <= loadRadius; dx++) {
      for (let dz = -loadRadius; dz <= loadRadius; dz++) {
        // Use circular loading area
        const distSq = dx * dx + dz * dz
        if (distSq > loadRadius * loadRadius) continue

        const cx = playerChunkX + dx
        const cz = playerChunkZ + dz

        // Load all vertical chunks in this column
        for (let cy = 0; cy < VERTICAL_CHUNKS; cy++) {
          const key = chunkKey(cx, cy, cz)
          if (!this.loadedChunks.has(key)) {
            // Priority based on distance (closer = lower priority value = higher priority)
            this.loadQueue.enqueue({ x: cx, y: cy, z: cz }, distSq)
          }
        }
      }
    }

    // Find chunks that need to be unloaded
    const chunksToUnload: string[] = []
    for (const key of this.loadedChunks) {
      const [cx, , cz] = key.split(',').map(Number)
      const dx = cx! - playerChunkX
      const dz = cz! - playerChunkZ
      const distSq = dx * dx + dz * dz

      if (distSq > unloadRadius * unloadRadius) {
        chunksToUnload.push(key)
      }
    }

    // Unload distant chunks
    for (const key of chunksToUnload) {
      const [cx, cy, cz] = key.split(',').map(Number)
      this.unloadChunk(cx!, cy!, cz!)
    }
  }

  /**
   * Process the load queue (limited chunks per frame)
   */
  private processLoadQueue(_playerX: number, _playerZ: number): void {
    let loaded = 0

    while (!this.loadQueue.isEmpty && loaded < this.config.maxLoadsPerFrame) {
      const coord = this.loadQueue.dequeue()
      if (!coord) break

      const key = chunkKey(coord.x, coord.y, coord.z)
      if (this.loadedChunks.has(key)) continue

      this.loadChunk(coord.x, coord.y, coord.z)
      loaded++
    }
  }

  /**
   * Load a single chunk
   */
  private loadChunk(cx: number, cy: number, cz: number): void {
    const key = chunkKey(cx, cy, cz)
    if (this.loadedChunks.has(key)) return

    // Load chunk in world (generates terrain)
    const chunk = this.world.loadChunk(cx, cy, cz)

    // Add to renderer
    this.chunkRenderer.addChunk(chunk)

    // Mark as loaded
    this.loadedChunks.add(key)

    // Notify listeners
    if (this.onChunkLoaded) {
      this.onChunkLoaded(cx, cy, cz)
    }
  }

  /**
   * Unload a single chunk
   */
  private unloadChunk(cx: number, cy: number, cz: number): void {
    const key = chunkKey(cx, cy, cz)
    if (!this.loadedChunks.has(key)) return

    // Notify listeners before unloading
    if (this.onChunkUnloaded) {
      this.onChunkUnloaded(cx, cy, cz)
    }

    // Get chunk from world
    const chunk = this.world.getChunk(cx, cy, cz)
    if (chunk) {
      // Remove from renderer
      this.chunkRenderer.removeChunk(chunk)
    }

    // Unload from world
    this.world.unloadChunk(cx, cy, cz)

    // Mark as unloaded
    this.loadedChunks.delete(key)
  }

  /**
   * Get number of loaded chunks
   */
  getLoadedCount(): number {
    return this.loadedChunks.size
  }

  /**
   * Get all loaded chunk coordinates
   */
  getLoadedChunkCoords(): ChunkCoord[] {
    return Array.from(this.loadedChunks).map(key => {
      const [x, y, z] = key.split(',').map(Number)
      return { x: x!, y: y!, z: z! }
    })
  }

  /**
   * Force load a specific chunk (for testing/debugging)
   */
  forceLoadChunk(cx: number, cy: number, cz: number): Chunk {
    this.loadChunk(cx, cy, cz)
    return this.world.getChunk(cx, cy, cz)!
  }

  /**
   * Force unload a specific chunk
   */
  forceUnloadChunk(cx: number, cy: number, cz: number): void {
    this.unloadChunk(cx, cy, cz)
  }

  /**
   * Check if a chunk is loaded
   */
  isChunkLoaded(cx: number, cy: number, cz: number): boolean {
    return this.loadedChunks.has(chunkKey(cx, cy, cz))
  }
}
