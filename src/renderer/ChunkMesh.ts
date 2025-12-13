/**
 * ChunkMesh - Renders a single chunk with textured blocks
 * Feature: 005-block-textures
 * Feature: 007-underwater-display - Enhanced transparent block rendering
 * 
 * Uses custom geometry with per-face UV mapping for texture support.
 * Supports multi-face textures (different textures for top/bottom/sides).
 */

import * as THREE from 'three'
import { Chunk } from '../core/Chunk'
import { BlockType, BLOCK_COLORS, isTransparent, isCrossPlant, isTreeLeaves } from '../core/Block'
import { TextureAtlas } from './TextureAtlas'

// Type for world block getter function
// Returns BlockType, or null if chunk is not loaded
type WorldBlockGetter = (x: number, y: number, z: number) => BlockType | null

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
  private waterMesh: THREE.Mesh | null = null
  private scene: THREE.Scene
  private textureAtlas: TextureAtlas
  private worldBlockGetter: WorldBlockGetter | null = null

  constructor(chunk: Chunk, scene: THREE.Scene, worldBlockGetter?: WorldBlockGetter) {
    this.chunk = chunk
    this.scene = scene
    this.textureAtlas = getSharedTextureAtlas()
    this.worldBlockGetter = worldBlockGetter ?? null
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

    // Build geometry data for different render passes
    const opaqueData = this.buildGeometryData('opaque')
    const transparentData = this.buildGeometryData('transparent')
    const waterData = this.buildGeometryData('water')

    // Create opaque mesh
    if (opaqueData.positions.length > 0) {
      this.opaqueMesh = this.createMesh(opaqueData, 'opaque')
      this.scene.add(this.opaqueMesh)
    }

    // Create transparent mesh (leaves, glass, plants)
    if (transparentData.positions.length > 0) {
      this.transparentMesh = this.createMesh(transparentData, 'transparent')
      this.scene.add(this.transparentMesh)
    }

    // Create water mesh (separate for better rendering)
    if (waterData.positions.length > 0) {
      this.waterMesh = this.createMesh(waterData, 'water')
      this.scene.add(this.waterMesh)
    }

    // Store reference in chunk (use opaque mesh as primary)
    this.chunk.mesh = this.opaqueMesh
    this.chunk.isDirty = false
  }

  /**
   * Build geometry data for visible faces
   */
  private buildGeometryData(renderPass: 'opaque' | 'transparent' | 'water'): {
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
      // Filter blocks by render pass
      const isWater = type === BlockType.WATER
      const blockTransparent = isTransparent(type)
      
      if (renderPass === 'water') {
        if (!isWater) return
      } else if (renderPass === 'transparent') {
        if (!blockTransparent || isWater) return
      } else { // opaque
        if (blockTransparent) return
      }

      const worldX = worldPos.x + localX
      const worldY = worldPos.y + localY
      const worldZ = worldPos.z + localZ

      // Handle cross-shaped plants (X pattern)
      if (isCrossPlant(type)) {
        vertexCount = this.addCrossPlant(
          positions, normals, uvs, colors, indices,
          worldX, worldY, worldZ, type, vertexCount
        )
        return
      }

      // Check each face for regular blocks
      const faces: RenderFace[] = ['top', 'bottom', 'front', 'back', 'left', 'right']
      
      for (const face of faces) {
        if (!this.isFaceExposed(localX, localY, localZ, worldX, worldY, worldZ, type, face)) {
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
   * Add cross-shaped plant geometry (X pattern with 4 faces)
   */
  private addCrossPlant(
    positions: number[],
    normals: number[],
    uvs: number[],
    colors: number[],
    indices: number[],
    worldX: number,
    worldY: number,
    worldZ: number,
    type: BlockType,
    vertexCount: number
  ): number {
    const [u1, v1, u2, v2] = this.textureAtlas.getUVsForFace(type, 'front')
    
    const color = BLOCK_COLORS[type] ?? 0xffffff
    const r = ((color >> 16) & 0xff) / 255
    const g = ((color >> 8) & 0xff) / 255
    const b = (color & 0xff) / 255

    // Cross pattern: two diagonal quads
    // Diagonal 1: from (0,0,0) to (1,1,1)
    // Diagonal 2: from (1,0,0) to (0,1,1)
    const crossFaces = [
      // Diagonal 1 - front side
      [[0, 0, 0], [1, 0, 1], [1, 1, 1], [0, 1, 0]],
      // Diagonal 1 - back side
      [[1, 0, 1], [0, 0, 0], [0, 1, 0], [1, 1, 1]],
      // Diagonal 2 - front side
      [[1, 0, 0], [0, 0, 1], [0, 1, 1], [1, 1, 0]],
      // Diagonal 2 - back side
      [[0, 0, 1], [1, 0, 0], [1, 1, 0], [0, 1, 1]]
    ]

    for (const faceVerts of crossFaces) {
      // Add 4 vertices
      for (let i = 0; i < 4; i++) {
        const v = faceVerts[i]
        if (!v || v.length < 3) continue
        positions.push(worldX + (v[0] ?? 0), worldY + (v[1] ?? 0), worldZ + (v[2] ?? 0))
        // Use upward normal for better lighting on plants
        normals.push(0, 1, 0)
        
        // UV mapping
        const quadUV = QUAD_UVS[i]
        if (!quadUV || quadUV.length < 2) continue
        const u = u1 + (u2 - u1) * (quadUV[0] ?? 0)
        const vCoord = v1 + (v2 - v1) * (quadUV[1] ?? 0)
        uvs.push(u, vCoord)
        
        colors.push(r, g, b)
      }

      // Add indices
      for (const idx of QUAD_INDICES) {
        indices.push(vertexCount + idx)
      }
      vertexCount += 4
    }

    return vertexCount
  }

  /**
   * Check if a block face should be rendered
   * Handles both intra-chunk and cross-chunk boundary cases
   */
  private isFaceExposed(
    localX: number, localY: number, localZ: number,
    worldX: number, worldY: number, worldZ: number,
    currentType: BlockType,
    face: RenderFace
  ): boolean {
    // Calculate neighbor world coordinates
    let nwx = worldX, nwy = worldY, nwz = worldZ
    switch (face) {
      case 'top': nwy++; break
      case 'bottom': nwy--; break
      case 'left': nwx--; break
      case 'right': nwx++; break
      case 'front': nwz++; break
      case 'back': nwz--; break
    }

    // Get neighbor block type
    let neighborType: BlockType

    // Check if neighbor is within this chunk
    let nlx = localX, nly = localY, nlz = localZ
    switch (face) {
      case 'top': nly++; break
      case 'bottom': nly--; break
      case 'left': nlx--; break
      case 'right': nlx++; break
      case 'front': nlz++; break
      case 'back': nlz--; break
    }

    if (this.chunk.isValidLocal(nlx, nly, nlz)) {
      // Neighbor is within this chunk
      neighborType = this.chunk.getBlock(nlx, nly, nlz)
    } else if (this.worldBlockGetter) {
      // Neighbor is in another chunk, use world getter
      const result = this.worldBlockGetter(nwx, nwy, nwz)
      
      // If neighbor chunk is not loaded (returns null)
      if (result === null) {
        // For transparent blocks, assume same type (don't render internal faces)
        // For opaque blocks, assume exposed (render face)
        return !isTransparent(currentType)
      }
      
      neighborType = result
    } else {
      // No world getter available
      // For transparent blocks, assume same type (don't render)
      // For opaque blocks, assume exposed (render)
      return !isTransparent(currentType)
    }

    // Neighbor is AIR - always render face
    if (neighborType === BlockType.AIR) {
      return true
    }

    const currentTransparent = isTransparent(currentType)
    const neighborTransparent = isTransparent(neighborType)

    if (currentTransparent) {
      // Transparent block: render face if neighbor is different type
      // Special case: all tree leaves types are treated as same type
      if (isTreeLeaves(currentType) && isTreeLeaves(neighborType)) {
        return false  // Don't render internal faces between any leaves types
      }
      return neighborType !== currentType
    } else {
      // Opaque block: render face if neighbor is transparent
      return neighborTransparent
    }
  }

  /**
   * Create a mesh from geometry data
   */
  private createMesh(
    data: { positions: number[]; normals: number[]; uvs: number[]; colors: number[]; indices: number[] },
    renderPass: 'opaque' | 'transparent' | 'water'
  ): THREE.Mesh {
    const geometry = new THREE.BufferGeometry()
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3))
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(data.uvs, 2))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(data.colors, 3))
    geometry.setIndex(data.indices)

    let material: THREE.MeshLambertMaterial

    if (renderPass === 'opaque') {
      material = new THREE.MeshLambertMaterial({
        map: this.textureAtlas.getTexture(),
        vertexColors: false,
        transparent: false,
        side: THREE.FrontSide
      })
    } else if (renderPass === 'water') {
      // Water: semi-transparent, write to depth buffer with polygon offset
      material = new THREE.MeshLambertMaterial({
        map: this.textureAtlas.getTexture(),
        vertexColors: false,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
        depthWrite: true,  // Write to depth to prevent z-fighting with other water
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
      })
    } else {
      // Transparent (leaves, glass, plants): use alpha test for cutout
      material = new THREE.MeshLambertMaterial({
        map: this.textureAtlas.getTexture(),
        vertexColors: false,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        alphaTest: 0.5,  // Higher alpha test for cleaner cutout
        depthWrite: true  // Enable depth write to prevent z-fighting
      })
    }

    const mesh = new THREE.Mesh(geometry, material)
    mesh.frustumCulled = false // We do our own frustum culling at chunk level
    
    // Set render order: opaque (0) -> transparent (1) -> water (2)
    if (renderPass === 'opaque') {
      mesh.renderOrder = 0
    } else if (renderPass === 'transparent') {
      mesh.renderOrder = 1
    } else {
      mesh.renderOrder = 2
    }

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
   * Get the water mesh
   */
  getWaterMesh(): THREE.Mesh | null {
    return this.waterMesh
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
    if (this.waterMesh) {
      this.waterMesh.visible = visible
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
    if (this.waterMesh) {
      this.scene.remove(this.waterMesh)
      this.waterMesh.geometry.dispose()
      if (this.waterMesh.material instanceof THREE.Material) {
        this.waterMesh.material.dispose()
      }
      this.waterMesh = null
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
