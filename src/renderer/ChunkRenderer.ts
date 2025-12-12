/**
 * ChunkRenderer - Manages rendering of multiple chunks
 * Feature: 002-chunk-terrain-system
 * Feature: 007-underwater-display - Cross-chunk transparent block rendering
 * 
 * Handles frustum culling and chunk mesh lifecycle.
 */

import * as THREE from 'three'
import { Chunk } from '../core/Chunk'
import { BlockType } from '../core/Block'
import { ChunkMesh, disposeSharedResources } from './ChunkMesh'
import { chunkKey } from '../core/ChunkConstants'

// Type for world block getter function
// Returns BlockType, or null if chunk is not loaded
type WorldBlockGetter = (x: number, y: number, z: number) => BlockType | null

/**
 * ChunkRenderer manages all chunk meshes and performs frustum culling
 */
export class ChunkRenderer {
  private scene: THREE.Scene
  private chunkMeshes: Map<string, ChunkMesh> = new Map()
  private frustum: THREE.Frustum = new THREE.Frustum()
  private projScreenMatrix: THREE.Matrix4 = new THREE.Matrix4()
  private worldBlockGetter: WorldBlockGetter | null = null

  // Stats
  private visibleChunkCount: number = 0
  private totalChunkCount: number = 0

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  /**
   * Set the world block getter function for cross-chunk rendering
   */
  setWorldBlockGetter(getter: WorldBlockGetter): void {
    this.worldBlockGetter = getter
  }

  /**
   * Add a chunk to be rendered
   */
  addChunk(chunk: Chunk): void {
    const key = chunkKey(chunk.coord.x, chunk.coord.y, chunk.coord.z)
    
    if (this.chunkMeshes.has(key)) {
      // Already exists, just mark for update
      this.chunkMeshes.get(key)!.update()
      return
    }

    const chunkMesh = new ChunkMesh(chunk, this.scene, this.worldBlockGetter ?? undefined)
    chunkMesh.build()
    this.chunkMeshes.set(key, chunkMesh)
    this.totalChunkCount++
  }

  /**
   * Remove a chunk from rendering
   */
  removeChunk(chunk: Chunk): void {
    const key = chunkKey(chunk.coord.x, chunk.coord.y, chunk.coord.z)
    const chunkMesh = this.chunkMeshes.get(key)
    
    if (chunkMesh) {
      chunkMesh.dispose()
      this.chunkMeshes.delete(key)
      this.totalChunkCount--
    }
  }

  /**
   * Update a chunk's mesh (when blocks change)
   */
  updateChunkMesh(chunk: Chunk): void {
    const key = chunkKey(chunk.coord.x, chunk.coord.y, chunk.coord.z)
    const chunkMesh = this.chunkMeshes.get(key)
    
    if (chunkMesh) {
      chunkMesh.update()
    }
  }

  /**
   * Update visibility based on camera frustum
   */
  update(camera: THREE.Camera): void {
    // Update frustum from camera
    this.projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    )
    this.frustum.setFromProjectionMatrix(this.projScreenMatrix)

    // Update visibility for all chunks
    this.visibleChunkCount = 0

    for (const [key, chunkMesh] of this.chunkMeshes) {
      // Get the chunk's bounding box from the mesh
      const mesh = chunkMesh.getMesh()
      if (!mesh) continue

      // Parse key to get chunk coordinates for bounding box check
      const [cx, cy, cz] = key.split(',').map(Number)
      const box = new THREE.Box3(
        new THREE.Vector3(cx! * 16, cy! * 16, cz! * 16),
        new THREE.Vector3((cx! + 1) * 16, (cy! + 1) * 16, (cz! + 1) * 16)
      )

      const isVisible = this.frustum.intersectsBox(box)
      chunkMesh.setVisible(isVisible)

      if (isVisible) {
        this.visibleChunkCount++
      }
    }
  }

  /**
   * Get the number of currently visible chunks
   */
  getVisibleChunkCount(): number {
    return this.visibleChunkCount
  }

  /**
   * Get the total number of loaded chunks
   */
  getTotalChunkCount(): number {
    return this.totalChunkCount
  }

  /**
   * Get all chunks that are currently visible
   */
  getVisibleChunks(): ChunkMesh[] {
    const visible: ChunkMesh[] = []
    for (const chunkMesh of this.chunkMeshes.values()) {
      if (chunkMesh.isVisible()) {
        visible.push(chunkMesh)
      }
    }
    return visible
  }

  /**
   * Check if a chunk is being rendered
   */
  hasChunk(cx: number, cy: number, cz: number): boolean {
    return this.chunkMeshes.has(chunkKey(cx, cy, cz))
  }

  /**
   * Force rebuild all chunk meshes
   */
  rebuildAll(): void {
    for (const chunkMesh of this.chunkMeshes.values()) {
      chunkMesh.build()
    }
  }

  /**
   * Dispose of all resources
   */
  dispose(): void {
    for (const chunkMesh of this.chunkMeshes.values()) {
      chunkMesh.dispose()
    }
    this.chunkMeshes.clear()
    this.totalChunkCount = 0
    this.visibleChunkCount = 0

    // Dispose shared resources
    disposeSharedResources()
  }
}
