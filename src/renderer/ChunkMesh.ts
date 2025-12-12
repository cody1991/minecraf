/**
 * ChunkMesh - Renders a single chunk using InstancedMesh
 * Feature: 002-chunk-terrain-system
 * 
 * Optimized rendering with exposed face detection.
 */

import * as THREE from 'three'
import { Chunk } from '../core/Chunk'
import { BLOCK_COLORS } from '../core/Block'
import { CHUNK_SIZE } from '../core/ChunkConstants'

// Shared geometry for all chunks
let sharedGeometry: THREE.BoxGeometry | null = null

function getSharedGeometry(): THREE.BoxGeometry {
  if (!sharedGeometry) {
    sharedGeometry = new THREE.BoxGeometry(1, 1, 1)
  }
  return sharedGeometry
}

// Shared material
let sharedMaterial: THREE.MeshLambertMaterial | null = null

function getSharedMaterial(): THREE.MeshLambertMaterial {
  if (!sharedMaterial) {
    sharedMaterial = new THREE.MeshLambertMaterial()
  }
  return sharedMaterial
}

/**
 * ChunkMesh manages the visual representation of a single chunk
 */
export class ChunkMesh {
  private chunk: Chunk
  private mesh: THREE.InstancedMesh | null = null
  private scene: THREE.Scene

  // Reusable objects for matrix calculations
  private readonly tempMatrix = new THREE.Matrix4()
  private readonly tempColor = new THREE.Color()

  // Maximum instances (worst case: all blocks visible)
  private readonly maxInstances = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE

  constructor(chunk: Chunk, scene: THREE.Scene) {
    this.chunk = chunk
    this.scene = scene
  }

  /**
   * Build or rebuild the mesh for this chunk
   */
  build(): void {
    // Remove existing mesh if any
    this.dispose()

    // Skip empty chunks
    if (this.chunk.isEmpty()) {
      this.chunk.isDirty = false
      return
    }

    // Create instanced mesh
    this.mesh = new THREE.InstancedMesh(
      getSharedGeometry(),
      getSharedMaterial(),
      this.maxInstances
    )
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.mesh.frustumCulled = false // We do our own frustum culling at chunk level

    // Add color attribute
    const colors = new Float32Array(this.maxInstances * 3)
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3)
    this.mesh.instanceColor.setUsage(THREE.DynamicDrawUsage)

    // Build instances
    this.updateInstances()

    // Add to scene
    this.scene.add(this.mesh)

    // Store reference in chunk
    this.chunk.mesh = this.mesh
    this.chunk.isDirty = false
  }

  /**
   * Update instance data (positions and colors)
   */
  private updateInstances(): void {
    if (!this.mesh) return

    const worldPos = this.chunk.getWorldPosition()
    let instanceIndex = 0

    this.chunk.forEachSolidBlock((localX, localY, localZ, type) => {
      // Only render blocks with at least one exposed face
      if (!this.hasExposedFace(localX, localY, localZ)) {
        return
      }

      if (instanceIndex >= this.maxInstances) return

      // Set position (world coordinates, centered on block)
      this.tempMatrix.setPosition(
        worldPos.x + localX + 0.5,
        worldPos.y + localY + 0.5,
        worldPos.z + localZ + 0.5
      )
      this.mesh!.setMatrixAt(instanceIndex, this.tempMatrix)

      // Set color
      const color = BLOCK_COLORS[type] ?? 0xffffff
      this.tempColor.setHex(color)
      this.mesh!.setColorAt(instanceIndex, this.tempColor)

      instanceIndex++
    })

    // Update instance count
    this.mesh.count = instanceIndex

    // Mark for GPU update
    this.mesh.instanceMatrix.needsUpdate = true
    if (this.mesh.instanceColor) {
      this.mesh.instanceColor.needsUpdate = true
    }
  }

  /**
   * Check if a block has at least one exposed face
   */
  private hasExposedFace(localX: number, localY: number, localZ: number): boolean {
    // Check all 6 faces
    const faces: Array<'top' | 'bottom' | 'left' | 'right' | 'front' | 'back'> = [
      'top', 'bottom', 'left', 'right', 'front', 'back'
    ]

    for (const face of faces) {
      if (this.chunk.isFaceExposed(localX, localY, localZ, face)) {
        return true
      }
    }

    return false
  }

  /**
   * Update the mesh if the chunk is dirty
   */
  update(): void {
    if (this.chunk.isDirty) {
      this.build()
    }
  }

  /**
   * Get the Three.js mesh object
   */
  getMesh(): THREE.InstancedMesh | null {
    return this.mesh
  }

  /**
   * Set visibility of the mesh
   */
  setVisible(visible: boolean): void {
    if (this.mesh) {
      this.mesh.visible = visible
    }
  }

  /**
   * Check if mesh is visible
   */
  isVisible(): boolean {
    return this.mesh?.visible ?? false
  }

  /**
   * Dispose of mesh resources
   */
  dispose(): void {
    if (this.mesh) {
      this.scene.remove(this.mesh)
      // Don't dispose geometry/material as they're shared
      this.mesh = null
      this.chunk.mesh = null
    }
  }
}

/**
 * Dispose of shared resources (call on game shutdown)
 */
export function disposeSharedResources(): void {
  if (sharedGeometry) {
    sharedGeometry.dispose()
    sharedGeometry = null
  }
  if (sharedMaterial) {
    sharedMaterial.dispose()
    sharedMaterial = null
  }
}
