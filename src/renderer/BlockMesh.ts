import * as THREE from 'three'
import { World } from '../core/World'
import { BLOCK_COLORS } from '../core/Block'
import { TextureAtlas } from './TextureAtlas'

/**
 * BlockMesh - renders the world using InstancedMesh for performance
 */
export class BlockMesh {
  private mesh: THREE.InstancedMesh | null = null
  private world: World
  private textureAtlas: TextureAtlas
  private scene: THREE.Scene
  private maxInstances: number

  // Temporary objects for matrix calculations
  private readonly tempMatrix = new THREE.Matrix4()
  private readonly tempColor = new THREE.Color()

  constructor(world: World, scene: THREE.Scene) {
    this.world = world
    this.scene = scene
    this.textureAtlas = new TextureAtlas()

    // Calculate max instances (all blocks in world could potentially be visible)
    this.maxInstances = world.width * world.height * world.depth

    this.createMesh()
  }

  /**
   * Create the instanced mesh for blocks
   */
  private createMesh(): void {
    // Create box geometry for blocks
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // Create material - instance colors work automatically with InstancedMesh
    const material = new THREE.MeshLambertMaterial()

    // Create instanced mesh
    this.mesh = new THREE.InstancedMesh(geometry, material, this.maxInstances)
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.mesh.frustumCulled = false // We handle culling ourselves

    // Add color attribute for per-instance colors
    const colors = new Float32Array(this.maxInstances * 3)
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3)
    this.mesh.instanceColor.setUsage(THREE.DynamicDrawUsage)

    this.scene.add(this.mesh)

    // Initial update
    this.updateMesh()
  }

  /**
   * Update the mesh to reflect current world state
   */
  updateMesh(): void {
    if (!this.mesh) return

    let instanceIndex = 0

    this.world.forEachBlock((x, y, z, type) => {
      if (instanceIndex >= this.maxInstances) return

      // Set position matrix
      this.tempMatrix.setPosition(x + 0.5, y + 0.5, z + 0.5)
      this.mesh!.setMatrixAt(instanceIndex, this.tempMatrix)

      // Set color based on block type
      const color = BLOCK_COLORS[type]
      this.tempColor.setHex(color)
      this.mesh!.setColorAt(instanceIndex, this.tempColor)

      instanceIndex++
    })

    // Update instance count
    this.mesh.count = instanceIndex

    // Mark matrices and colors as needing update
    this.mesh.instanceMatrix.needsUpdate = true
    if (this.mesh.instanceColor) {
      this.mesh.instanceColor.needsUpdate = true
    }

    // Mark world as clean
    this.world.markClean()
  }

  /**
   * Check if mesh needs update and update if necessary
   */
  update(): void {
    if (this.world.isDirty()) {
      this.updateMesh()
    }
  }

  /**
   * Get the mesh for raycasting
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
    this.textureAtlas.dispose()
  }
}
