/**
 * ChunkMesh - Renders a single chunk with textured blocks
 * Feature: 005-block-textures
 * 
 * Uses custom geometry with per-face UV mapping for texture support.
 * Supports multi-face textures (different textures for top/bottom/sides).
 */

import * as THREE from 'three'
import { Chunk } from '../core/Chunk'
import { BLOCK_COLORS, isTransparent } from '../core/Block'
import { TextureAtlas } from './TextureAtlas'

// Render face type (matches Chunk.isFaceExposed)
type RenderFace = 'top' | 'bottom' | 'front' | 'back' | 'left' | 'right'

// Shared texture atlas instance
let sharedTextureAtlas: TextureAtlas | null = null

export function getSharedTextureAtlas(): TextureAtlas {
  if (!sharedTextureAtlas) {
    sharedTextureAtlas = new TextureAtlas()
  }
  return sharedTextureAtlas
}

// Face vertex data (position offsets and normals)
// Vertices are ordered for counter-clockwise winding when viewed from outside the cube
// Each face: bottom-left, bottom-right, top-right, top-left (when looking at the face)
const FACE_DATA: Record<RenderFace, {
  vertices: number[][]
  normal: number[]
}> = {
  top: {
    // Looking down at top face from above (+Y)
    vertices: [
      [0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]
    ],
    normal: [0, 1, 0]
  },
  bottom: {
    // Looking up at bottom face from below (-Y)
    vertices: [
      [0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]
    ],
    normal: [0, -1, 0]
  },
  front: {
    // Looking at front face (+Z)
    vertices: [
      [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]
    ],
    normal: [0, 0, 1]
  },
  back: {
    // Looking at back face (-Z)
    vertices: [
      [1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]
    ],
    normal: [0, 0, -1]
  },
  left: {
    // Looking at left face (-X)
    vertices: [
      [0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]
    ],
    normal: [-1, 0, 0]
  },
  right: {
    // Looking at right face (+X)
    vertices: [
      [1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]
    ],
    normal: [1, 0, 0]
  }
}

// UV coordinates for a quad: bottom-left, bottom-right, top-right, top-left
const QUAD_UVS = [
  [0, 0], [1, 0], [1, 1], [0, 1]
]

// Triangle indices for a quad (two triangles, counter-clockwise)
const QUAD_INDICES = [0, 1, 2, 0, 2, 3]

/**
 * ChunkMesh manages the visual representation of a single chunk
 */
export class ChunkMesh {
  private chunk: Chunk
  private opaqueMesh: THREE.Mesh | null = null
  private transparentMesh: THREE.Mesh | null = null
  private scene: THREE.Scene
  private textureAtlas: TextureAtlas

  constructor(chunk: Chunk, scene: THREE.Scene) {
    this.chunk = chunk
    this.scene = scene
    this.textureAtlas = getSharedTextureAtlas()
  }

  /**
   * Build or rebuild the mesh for this chunk
   */
  build(): void {
    // Remove existing meshes
    this.dispose()

    // Skip empty chunks
    if (this.chunk.isEmpty()) {
      this.chunk.isDirty = false
      return
    }

    // Build geometry data
    const opaqueData = this.buildGeometryData(false)
    const transparentData = this.buildGeometryData(true)

    // Create opaque mesh
    if (opaqueData.positions.length > 0) {
      this.opaqueMesh = this.createMesh(opaqueData, false)
      this.scene.add(this.opaqueMesh)
    }

    // Create transparent mesh
    if (transparentData.positions.length > 0) {
      this.transparentMesh = this.createMesh(transparentData, true)
      this.scene.add(this.transparentMesh)
    }

    // Store reference in chunk (use opaque mesh as primary)
    this.chunk.mesh = this.opaqueMesh
    this.chunk.isDirty = false
  }

  /**
   * Build geometry data for visible faces
   */
  private buildGeometryData(transparentOnly: boolean): {
    positions: number[]
    normals: number[]
    uvs: number[]
    colors: number[]
    indices: number[]
  } {
    const positions: number[] = []
    const normals: number[] = []
    const uvs: number[] = []
    const colors: number[] = []
    const indices: number[] = []
    
    const worldPos = this.chunk.getWorldPosition()
    let vertexCount = 0

    this.chunk.forEachSolidBlock((localX, localY, localZ, type) => {
      // Filter by transparency
      const blockTransparent = isTransparent(type)
      if (blockTransparent !== transparentOnly) {
        return
      }

      const worldX = worldPos.x + localX
      const worldY = worldPos.y + localY
      const worldZ = worldPos.z + localZ

      // Check each face
      const faces: RenderFace[] = ['top', 'bottom', 'front', 'back', 'left', 'right']
      
      for (const face of faces) {
        if (!this.chunk.isFaceExposed(localX, localY, localZ, face)) {
          continue
        }

        const faceData = FACE_DATA[face]
        const [u1, v1, u2, v2] = this.textureAtlas.getUVsForFace(type, face)

        // Get fallback color for this block
        const color = BLOCK_COLORS[type] ?? 0xffffff
        const r = ((color >> 16) & 0xff) / 255
        const g = ((color >> 8) & 0xff) / 255
        const b = (color & 0xff) / 255

        // Add 4 vertices for this face
        for (let i = 0; i < 4; i++) {
          const vertex = faceData.vertices[i]
          if (!vertex || vertex.length < 3) continue
          const vx = vertex[0] ?? 0
          const vy = vertex[1] ?? 0
          const vz = vertex[2] ?? 0
          positions.push(worldX + vx, worldY + vy, worldZ + vz)
          normals.push(...faceData.normal)
          
          // Map UV coordinates
          const quadUV = QUAD_UVS[i]
          if (!quadUV || quadUV.length < 2) continue
          const qu = quadUV[0] ?? 0
          const qv = quadUV[1] ?? 0
          const u = u1 + (u2 - u1) * qu
          const v = v1 + (v2 - v1) * qv
          uvs.push(u, v)
          
          // Vertex color (used for fallback/tinting)
          colors.push(r, g, b)
        }

        // Add indices for two triangles
        for (const idx of QUAD_INDICES) {
          indices.push(vertexCount + idx)
        }
        
        vertexCount += 4
      }
    })

    return { positions, normals, uvs, colors, indices }
  }

  /**
   * Create a mesh from geometry data
   */
  private createMesh(
    data: { positions: number[]; normals: number[]; uvs: number[]; colors: number[]; indices: number[] },
    transparent: boolean
  ): THREE.Mesh {
    const geometry = new THREE.BufferGeometry()
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3))
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(data.uvs, 2))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(data.colors, 3))
    geometry.setIndex(data.indices)

    const material = new THREE.MeshLambertMaterial({
      map: this.textureAtlas.getTexture(),
      vertexColors: false, // Use texture colors, not vertex colors
      transparent: transparent,
      opacity: transparent ? 0.8 : 1.0,
      side: transparent ? THREE.DoubleSide : THREE.FrontSide,
      alphaTest: transparent ? 0.1 : 0,
      depthWrite: !transparent
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.frustumCulled = false // We do our own frustum culling at chunk level
    mesh.renderOrder = transparent ? 1 : 0 // Render transparent after opaque

    return mesh
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
   * Get the Three.js mesh object (opaque)
   */
  getMesh(): THREE.Mesh | null {
    return this.opaqueMesh
  }

  /**
   * Get the transparent mesh
   */
  getTransparentMesh(): THREE.Mesh | null {
    return this.transparentMesh
  }

  /**
   * Set visibility of the mesh
   */
  setVisible(visible: boolean): void {
    if (this.opaqueMesh) {
      this.opaqueMesh.visible = visible
    }
    if (this.transparentMesh) {
      this.transparentMesh.visible = visible
    }
  }

  /**
   * Check if mesh is visible
   */
  isVisible(): boolean {
    return this.opaqueMesh?.visible ?? false
  }

  /**
   * Dispose of mesh resources
   */
  dispose(): void {
    if (this.opaqueMesh) {
      this.scene.remove(this.opaqueMesh)
      this.opaqueMesh.geometry.dispose()
      if (this.opaqueMesh.material instanceof THREE.Material) {
        this.opaqueMesh.material.dispose()
      }
      this.opaqueMesh = null
    }
    if (this.transparentMesh) {
      this.scene.remove(this.transparentMesh)
      this.transparentMesh.geometry.dispose()
      if (this.transparentMesh.material instanceof THREE.Material) {
        this.transparentMesh.material.dispose()
      }
      this.transparentMesh = null
    }
    this.chunk.mesh = null
  }
}

/**
 * Dispose of shared resources (call on game shutdown)
 */
export function disposeSharedResources(): void {
  if (sharedTextureAtlas) {
    sharedTextureAtlas.dispose()
    sharedTextureAtlas = null
  }
}
