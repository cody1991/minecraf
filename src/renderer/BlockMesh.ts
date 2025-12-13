/**
 * BlockMesh - DEPRECATED
 * Feature: 002-chunk-terrain-system
 * 
 * This file is deprecated. Use ChunkMesh and ChunkRenderer instead.
 * Kept for backward compatibility during transition.
 */

import * as THREE from 'three'

/**
 * @deprecated Use ChunkMesh and ChunkRenderer instead
 */
export class BlockMesh {
  private mesh: THREE.InstancedMesh | null = null
  private scene: THREE.Scene

  constructor(_world: unknown, scene: THREE.Scene) {
    this.scene = scene
    console.warn('BlockMesh is deprecated. Use ChunkMesh and ChunkRenderer instead.')
  }

  /**
   * @deprecated No longer functional
   */
  updateMesh(): void {
    // No-op - deprecated
  }

  /**
   * @deprecated No longer functional
   */
  update(): void {
    // No-op - deprecated
  }

  /**
   * @deprecated Returns null
   */
  getMesh(): THREE.InstancedMesh | null {
    return this.mesh
  }

  /**
   * Dispose of mesh resources
   */
  dispose(): void {
    if (this.mesh) {
      this.mesh.geometry.dispose()
      if (Array.isArray(this.mesh.material)) {
        this.mesh.material.forEach(m => m.dispose())
      } else {
        this.mesh.material.dispose()
      }
      this.scene.remove(this.mesh)
    }
  }
}
