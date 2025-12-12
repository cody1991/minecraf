import * as THREE from 'three'
import { BlockType, BLOCK_COLORS } from '../core/Block'

/**
 * Texture atlas for block textures
 * Creates a simple colored texture atlas procedurally
 */
export class TextureAtlas {
  private texture: THREE.Texture
  private readonly textureSize = 16
  private readonly atlasWidth = 5 // 5 block types
  private readonly atlasHeight = 1

  constructor() {
    this.texture = this.createAtlasTexture()
  }

  /**
   * Create a procedural texture atlas with colored blocks
   */
  private createAtlasTexture(): THREE.Texture {
    const canvas = document.createElement('canvas')
    canvas.width = this.textureSize * this.atlasWidth
    canvas.height = this.textureSize * this.atlasHeight

    const ctx = canvas.getContext('2d')!

    // Draw each block type
    const blockTypes = [
      BlockType.GRASS,
      BlockType.DIRT,
      BlockType.STONE,
      BlockType.WOOD,
      BlockType.SAND
    ]

    blockTypes.forEach((type, index) => {
      const color = BLOCK_COLORS[type]
      const x = index * this.textureSize

      // Fill base color
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`
      ctx.fillRect(x, 0, this.textureSize, this.textureSize)

      // Add some texture variation
      this.addNoisePattern(ctx, x, 0, this.textureSize, this.textureSize, color)

      // Add border for visual distinction
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.lineWidth = 1
      ctx.strokeRect(x + 0.5, 0.5, this.textureSize - 1, this.textureSize - 1)
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.colorSpace = THREE.SRGBColorSpace

    return texture
  }

  /**
   * Add noise pattern to make textures look more interesting
   */
  private addNoisePattern(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    baseColor: number
  ): void {
    const imageData = ctx.getImageData(x, y, width, height)
    const data = imageData.data

    const r = (baseColor >> 16) & 0xff
    const g = (baseColor >> 8) & 0xff
    const b = baseColor & 0xff

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 30
      data[i] = Math.max(0, Math.min(255, r + noise))
      data[i + 1] = Math.max(0, Math.min(255, g + noise))
      data[i + 2] = Math.max(0, Math.min(255, b + noise))
      data[i + 3] = 255
    }

    ctx.putImageData(imageData, x, y)
  }

  /**
   * Get the texture atlas
   */
  getTexture(): THREE.Texture {
    return this.texture
  }

  /**
   * Get UV coordinates for a block type
   * Returns [u1, v1, u2, v2] for the texture region
   */
  getUVs(type: BlockType): [number, number, number, number] {
    if (type === BlockType.AIR) {
      return [0, 0, 0, 0]
    }

    const index = type - 1 // GRASS=0, DIRT=1, etc.
    const u1 = index / this.atlasWidth
    const u2 = (index + 1) / this.atlasWidth
    const v1 = 0
    const v2 = 1

    return [u1, v1, u2, v2]
  }

  /**
   * Get the number of textures in the atlas
   */
  getTextureCount(): number {
    return this.atlasWidth
  }

  /**
   * Dispose of texture resources
   */
  dispose(): void {
    this.texture.dispose()
  }
}
