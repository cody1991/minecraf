/**
 * TextureAtlas - Block texture atlas management
 * Feature: 005-block-textures
 * 
 * Manages loading and accessing block textures from a texture atlas.
 * Supports both image-based textures and procedural fallback.
 */

import * as THREE from 'three'
import { BlockType, BLOCK_COLORS } from '../core/Block'
import { getTextureIndexForFace, TextureIndex } from './BlockTextures'

/**
 * Texture atlas loading state
 */
export enum TextureLoadState {
  UNLOADED = 'unloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FALLBACK = 'fallback'
}

/**
 * Texture atlas configuration
 */
export interface TextureAtlasConfig {
  imagePath: string
  tileSize: number
  columns: number
  rows: number
}

/**
 * Default atlas configuration
 */
const DEFAULT_CONFIG: TextureAtlasConfig = {
  imagePath: 'textures/blocks.png',
  tileSize: 16,
  columns: 30,  // Expanded for crafting blocks
  rows: 3
}

/**
 * Texture atlas for block textures
 * Creates procedural textures with Minecraft-style pixel art
 */
export class TextureAtlas {
  private texture: THREE.Texture
  private loadState: TextureLoadState = TextureLoadState.UNLOADED
  private config: TextureAtlasConfig
  private canvas: HTMLCanvasElement

  constructor(config: Partial<TextureAtlasConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.canvas = document.createElement('canvas')
    this.texture = this.createProceduralAtlas()
    this.loadState = TextureLoadState.FALLBACK
    // 使用程序生成的纹理，不需要加载外部文件
  }

  /**
   * Create a procedural texture atlas with Minecraft-style pixel art
   */
  private createProceduralAtlas(): THREE.Texture {
    const { tileSize, columns, rows } = this.config
    this.canvas.width = tileSize * columns
    this.canvas.height = tileSize * rows

    const ctx = this.canvas.getContext('2d')!
    
    // Fill with magenta for debugging (should not be visible if UVs are correct)
    ctx.fillStyle = '#ff00ff'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    
    // Generate textures for each block type
    this.generateGrassTop(ctx, TextureIndex.GRASS_TOP, 0)
    this.generateGrassSide(ctx, TextureIndex.GRASS_SIDE, 0)
    this.generateSolidTexture(ctx, TextureIndex.DIRT, 0, BLOCK_COLORS[BlockType.DIRT], 'dirt')
    this.generateSolidTexture(ctx, TextureIndex.STONE, 0, BLOCK_COLORS[BlockType.STONE], 'stone')
    this.generateSolidTexture(ctx, TextureIndex.WOOD, 0, BLOCK_COLORS[BlockType.WOOD], 'planks')
    this.generateSolidTexture(ctx, TextureIndex.SAND, 0, BLOCK_COLORS[BlockType.SAND], 'sand')
    this.generateSolidTexture(ctx, TextureIndex.COBBLESTONE, 0, BLOCK_COLORS[BlockType.COBBLESTONE], 'cobble')
    this.generateBrickTexture(ctx, TextureIndex.BRICK, 0)
    this.generateGlassTexture(ctx, TextureIndex.GLASS, 0)
    this.generateWaterTexture(ctx, TextureIndex.WATER, 0)
    this.generateLeavesTexture(ctx, TextureIndex.LEAVES, 0)
    this.generateLogTop(ctx, TextureIndex.LOG_TOP, 0)
    this.generateLogSide(ctx, TextureIndex.LOG_SIDE, 0)
    this.generateSolidTexture(ctx, TextureIndex.PLANKS, 0, BLOCK_COLORS[BlockType.PLANKS], 'planks')
    this.generateSolidTexture(ctx, TextureIndex.SNOW, 0, BLOCK_COLORS[BlockType.SNOW], 'snow')
    // Ancient landmarks blocks (011-ancient-landmarks)
    this.generateSandstoneTexture(ctx, TextureIndex.SANDSTONE, 0)
    this.generateCarvedSandstoneTexture(ctx, TextureIndex.SANDSTONE_CARVED, 0)
    this.generateRedBrickTexture(ctx, TextureIndex.RED_BRICK, 0)
    this.generateGoldBlockTexture(ctx, TextureIndex.GOLD_BLOCK, 0)
    this.generateDarkStoneTexture(ctx, TextureIndex.DARK_STONE, 0)
    this.generateMossyStoneTexture(ctx, TextureIndex.MOSSY_STONE, 0)
    this.generateTorchTexture(ctx, TextureIndex.TORCH, 0)
    // Food items (021-food-system)
    this.generateRawBeefTexture(ctx, TextureIndex.RAW_BEEF, 0)
    this.generateRawPorkchopTexture(ctx, TextureIndex.RAW_PORKCHOP, 0)
    // Crafting & Tools System (023-crafting-tools-system)
    this.generateCraftingTableTopTexture(ctx, TextureIndex.CRAFTING_TABLE_TOP, 0)
    this.generateCraftingTableSideTexture(ctx, TextureIndex.CRAFTING_TABLE_SIDE, 0)
    this.generateFurnaceTopTexture(ctx, TextureIndex.FURNACE_TOP, 0)
    this.generateFurnaceFrontTexture(ctx, TextureIndex.FURNACE_FRONT, 0)
    this.generateFurnaceSideTexture(ctx, TextureIndex.FURNACE_SIDE, 0)
    this.generateFurnaceFrontLitTexture(ctx, TextureIndex.FURNACE_FRONT_LIT, 0)

    const texture = new THREE.CanvasTexture(this.canvas)
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true

    return texture
  }

  /**
   * Generate grass top texture (green with variation)
   */
  private generateGrassTop(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base green
    ctx.fillStyle = '#7cba3d'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add grass blade variation
    for (let i = 0; i < tileSize * tileSize / 4; i++) {
      const px = x + Math.floor(Math.random() * tileSize)
      const py = y + Math.floor(Math.random() * tileSize)
      const shade = Math.random() > 0.5 ? '#6aa32e' : '#8cc94d'
      ctx.fillStyle = shade
      ctx.fillRect(px, py, 1, 1)
    }
  }

  /**
   * Generate grass side texture (dirt with grass on top)
   */
  private generateGrassSide(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Dirt base
    ctx.fillStyle = '#8b5a2b'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add dirt variation
    for (let i = 0; i < tileSize * tileSize / 3; i++) {
      const px = x + Math.floor(Math.random() * tileSize)
      const py = y + Math.floor(Math.random() * tileSize)
      const shade = Math.random() > 0.5 ? '#7a4f26' : '#9c6530'
      ctx.fillStyle = shade
      ctx.fillRect(px, py, 1, 1)
    }

    // Grass top edge (2-3 pixels)
    ctx.fillStyle = '#7cba3d'
    for (let px = 0; px < tileSize; px++) {
      const height = 2 + Math.floor(Math.random() * 2)
      ctx.fillRect(x + px, y, 1, height)
    }
  }

  /**
   * Generate solid texture with noise
   */
  private generateSolidTexture(
    ctx: CanvasRenderingContext2D, 
    col: number, 
    row: number, 
    baseColor: number,
    type: string
  ): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    const r = (baseColor >> 16) & 0xff
    const g = (baseColor >> 8) & 0xff
    const b = baseColor & 0xff

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add noise variation
    const noiseAmount = type === 'snow' ? 10 : 20
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * noiseAmount
        const nr = Math.max(0, Math.min(255, r + noise))
        const ng = Math.max(0, Math.min(255, g + noise))
        const nb = Math.max(0, Math.min(255, b + noise))
        ctx.fillStyle = `rgb(${nr}, ${ng}, ${nb})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Add border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)
  }

  /**
   * Generate brick texture
   */
  private generateBrickTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Mortar background
    ctx.fillStyle = '#a0a0a0'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Brick pattern
    const brickHeight = 4
    const brickWidth = 8
    
    for (let row = 0; row < tileSize / brickHeight; row++) {
      const offset = (row % 2) * (brickWidth / 2)
      for (let col = 0; col < tileSize / brickWidth + 1; col++) {
        const bx = x + col * brickWidth - offset
        const by = y + row * brickHeight
        
        // Brick with slight color variation
        const shade = Math.random() > 0.5 ? '#8c3a2a' : '#ac5a4a'
        ctx.fillStyle = shade
        ctx.fillRect(
          Math.max(x, bx + 1), 
          by + 1, 
          Math.min(brickWidth - 1, x + tileSize - bx - 1), 
          brickHeight - 1
        )
      }
    }
  }

  /**
   * Generate glass texture (mostly transparent with frame)
   */
  private generateGlassTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Transparent center
    ctx.fillStyle = 'rgba(200, 232, 255, 0.3)'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Frame
    ctx.strokeStyle = 'rgba(150, 200, 230, 0.8)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.fillRect(x + 2, y + 2, 3, 3)
  }

  /**
   * Generate water texture
   */
  private generateWaterTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base water color
    ctx.fillStyle = 'rgba(51, 102, 204, 0.7)'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Wave pattern
    for (let py = 0; py < tileSize; py += 4) {
      ctx.fillStyle = 'rgba(80, 130, 220, 0.5)'
      for (let px = 0; px < tileSize; px++) {
        const wave = Math.sin((px + py) * 0.5) > 0
        if (wave) {
          ctx.fillRect(x + px, y + py, 1, 2)
        }
      }
    }
  }

  /**
   * Generate leaves texture
   */
  private generateLeavesTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base transparent
    ctx.clearRect(x, y, tileSize, tileSize)

    // Leaf pattern with gaps
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        if (Math.random() > 0.2) {
          const shade = Math.random() > 0.5 ? '#3d9140' : '#2d8130'
          ctx.fillStyle = shade
          ctx.fillRect(x + px, y + py, 1, 1)
        }
      }
    }
  }

  /**
   * Generate log top texture (rings)
   */
  private generateLogTop(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize
    const cx = x + tileSize / 2
    const cy = y + tileSize / 2

    // Bark outer
    ctx.fillStyle = '#6b4423'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Inner wood
    ctx.fillStyle = '#bc8f5a'
    ctx.beginPath()
    ctx.arc(cx, cy, tileSize / 2 - 2, 0, Math.PI * 2)
    ctx.fill()

    // Rings
    ctx.strokeStyle = '#a07848'
    ctx.lineWidth = 1
    for (let r = 2; r < tileSize / 2 - 2; r += 2) {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Center dot
    ctx.fillStyle = '#8b6538'
    ctx.beginPath()
    ctx.arc(cx, cy, 1, 0, Math.PI * 2)
    ctx.fill()
  }

  /**
   * Generate log side texture (bark)
   */
  private generateLogSide(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base bark color
    ctx.fillStyle = '#6b4423'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Bark lines
    ctx.strokeStyle = '#5a3818'
    ctx.lineWidth = 1
    for (let py = 0; py < tileSize; py += 3) {
      ctx.beginPath()
      ctx.moveTo(x, y + py + Math.random() * 2)
      for (let px = 0; px < tileSize; px += 4) {
        ctx.lineTo(x + px, y + py + Math.random() * 2)
      }
      ctx.stroke()
    }

    // Add some variation
    for (let i = 0; i < tileSize * 2; i++) {
      const px = x + Math.floor(Math.random() * tileSize)
      const py = y + Math.floor(Math.random() * tileSize)
      ctx.fillStyle = Math.random() > 0.5 ? '#7b5433' : '#5b3413'
      ctx.fillRect(px, py, 1, 1)
    }
  }

  /**
   * Generate sandstone texture (011-ancient-landmarks)
   */
  private generateSandstoneTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base sandstone color
    ctx.fillStyle = '#d4b896'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add sandy variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 25
        const r = Math.max(0, Math.min(255, 212 + noise))
        const g = Math.max(0, Math.min(255, 184 + noise))
        const b = Math.max(0, Math.min(255, 150 + noise))
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Horizontal lines for layered look
    ctx.strokeStyle = 'rgba(160, 130, 100, 0.3)'
    ctx.lineWidth = 1
    for (let py = 4; py < tileSize; py += 4) {
      ctx.beginPath()
      ctx.moveTo(x, y + py)
      ctx.lineTo(x + tileSize, y + py)
      ctx.stroke()
    }
  }

  /**
   * Generate carved sandstone texture (011-ancient-landmarks)
   */
  private generateCarvedSandstoneTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base carved sandstone color (slightly darker)
    ctx.fillStyle = '#c4a876'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 20
        const r = Math.max(0, Math.min(255, 196 + noise))
        const g = Math.max(0, Math.min(255, 168 + noise))
        const b = Math.max(0, Math.min(255, 118 + noise))
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Carved pattern (simple geometric)
    ctx.strokeStyle = 'rgba(100, 80, 50, 0.5)'
    ctx.lineWidth = 1
    // Border
    ctx.strokeRect(x + 2, y + 2, tileSize - 4, tileSize - 4)
    // Inner decoration
    ctx.strokeRect(x + 4, y + 4, tileSize - 8, tileSize - 8)
  }

  /**
   * Generate red brick texture for Forbidden City (011-ancient-landmarks)
   */
  private generateRedBrickTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Dark mortar background
    ctx.fillStyle = '#4a2020'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Red brick pattern
    const brickHeight = 4
    const brickWidth = 8
    
    for (let brickRow = 0; brickRow < tileSize / brickHeight; brickRow++) {
      const offset = (brickRow % 2) * (brickWidth / 2)
      for (let brickCol = 0; brickCol < tileSize / brickWidth + 1; brickCol++) {
        const bx = x + brickCol * brickWidth - offset
        const by = y + brickRow * brickHeight
        
        // Deep red brick with slight color variation
        const shade = Math.random() > 0.5 ? '#8b2323' : '#7a1f1f'
        ctx.fillStyle = shade
        ctx.fillRect(
          Math.max(x, bx + 1), 
          by + 1, 
          Math.min(brickWidth - 1, x + tileSize - bx - 1), 
          brickHeight - 1
        )
      }
    }
  }

  /**
   * Generate gold block texture (011-ancient-landmarks)
   */
  private generateGoldBlockTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base gold color
    ctx.fillStyle = '#ffd700'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add metallic variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 40
        const r = Math.max(0, Math.min(255, 255 + noise * 0.3))
        const g = Math.max(0, Math.min(255, 215 + noise))
        const b = Math.max(0, Math.min(255, 0 + Math.abs(noise) * 0.5))
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 200, 0.4)'
    ctx.fillRect(x + 2, y + 2, 4, 4)

    // Border
    ctx.strokeStyle = 'rgba(180, 150, 0, 0.5)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)
  }

  /**
   * Generate dark stone texture for Castle (011-ancient-landmarks)
   */
  private generateDarkStoneTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base dark stone color
    ctx.fillStyle = '#4a4a4a'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add stone variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 30
        const shade = Math.max(0, Math.min(255, 74 + noise))
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Stone block pattern
    ctx.strokeStyle = 'rgba(30, 30, 30, 0.4)'
    ctx.lineWidth = 1
    // Horizontal lines
    ctx.beginPath()
    ctx.moveTo(x, y + 8)
    ctx.lineTo(x + tileSize, y + 8)
    ctx.stroke()
    // Vertical lines (offset)
    ctx.beginPath()
    ctx.moveTo(x + 8, y)
    ctx.lineTo(x + 8, y + 8)
    ctx.moveTo(x + 4, y + 8)
    ctx.lineTo(x + 4, y + tileSize)
    ctx.moveTo(x + 12, y + 8)
    ctx.lineTo(x + 12, y + tileSize)
    ctx.stroke()
  }

  /**
   * Generate mossy stone texture (011-ancient-landmarks)
   */
  private generateMossyStoneTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base dark stone
    ctx.fillStyle = '#4a4a4a'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add stone variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 25
        const shade = Math.max(0, Math.min(255, 74 + noise))
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Add moss patches
    for (let i = 0; i < tileSize * 3; i++) {
      const px = x + Math.floor(Math.random() * tileSize)
      const py = y + Math.floor(Math.random() * tileSize)
      const shade = Math.random() > 0.5 ? '#5a6b4a' : '#4a5b3a'
      ctx.fillStyle = shade
      ctx.fillRect(px, py, 1 + Math.floor(Math.random() * 2), 1 + Math.floor(Math.random() * 2))
    }
  }

  /**
   * Generate torch texture (011-ancient-landmarks)
   */
  private generateTorchTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize
    const cx = x + tileSize / 2
    const cy = y + tileSize / 2

    // Transparent background
    ctx.clearRect(x, y, tileSize, tileSize)

    // Torch handle
    ctx.fillStyle = '#6b4423'
    ctx.fillRect(cx - 1, cy, 2, tileSize / 2)

    // Flame glow
    ctx.fillStyle = 'rgba(255, 200, 50, 0.6)'
    ctx.beginPath()
    ctx.arc(cx, cy - 2, 4, 0, Math.PI * 2)
    ctx.fill()

    // Flame core
    ctx.fillStyle = '#ffcc00'
    ctx.beginPath()
    ctx.ellipse(cx, cy - 2, 2, 3, 0, 0, Math.PI * 2)
    ctx.fill()

    // Flame tip
    ctx.fillStyle = '#ff6600'
    ctx.beginPath()
    ctx.ellipse(cx, cy - 4, 1, 2, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  /**
   * Generate raw beef texture (021-food-system)
   */
  private generateRawBeefTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base red meat color
    ctx.fillStyle = '#c41e3a'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add meat variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 30
        const r = Math.max(0, Math.min(255, 196 + noise))
        const g = Math.max(0, Math.min(255, 30 + noise * 0.5))
        const b = Math.max(0, Math.min(255, 58 + noise * 0.5))
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Add white fat marbling
    for (let i = 0; i < 8; i++) {
      const fx = x + 2 + Math.floor(Math.random() * (tileSize - 4))
      const fy = y + 2 + Math.floor(Math.random() * (tileSize - 4))
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.fillRect(fx, fy, 2, 1)
    }
  }

  /**
   * Generate raw porkchop texture (021-food-system)
   */
  private generateRawPorkchopTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base pink meat color
    ctx.fillStyle = '#ffb6c1'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add meat variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 25
        const r = Math.max(0, Math.min(255, 255 + noise * 0.3))
        const g = Math.max(0, Math.min(255, 182 + noise))
        const b = Math.max(0, Math.min(255, 193 + noise))
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Add bone (white strip)
    ctx.fillStyle = '#f5f5dc'
    ctx.fillRect(x + tileSize - 4, y + 4, 3, tileSize - 8)

    // Bone detail
    ctx.fillStyle = '#d4d4aa'
    ctx.fillRect(x + tileSize - 3, y + 4, 1, tileSize - 8)
  }

  /**
   * Generate crafting table top texture (023-crafting-tools-system)
   * Shows a 3x3 crafting grid pattern
   */
  private generateCraftingTableTopTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base wood color
    ctx.fillStyle = '#bc8f5a'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add wood grain variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 20
        const r = Math.max(0, Math.min(255, 188 + noise))
        const g = Math.max(0, Math.min(255, 143 + noise))
        const b = Math.max(0, Math.min(255, 90 + noise))
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Draw 3x3 crafting grid
    const gridSize = 10
    const gridStart = (tileSize - gridSize) / 2
    const cellSize = gridSize / 3

    // Grid background (darker)
    ctx.fillStyle = '#8b6914'
    ctx.fillRect(x + gridStart, y + gridStart, gridSize, gridSize)

    // Grid lines
    ctx.strokeStyle = '#5a4510'
    ctx.lineWidth = 1
    for (let i = 0; i <= 3; i++) {
      // Horizontal lines
      ctx.beginPath()
      ctx.moveTo(x + gridStart, y + gridStart + i * cellSize)
      ctx.lineTo(x + gridStart + gridSize, y + gridStart + i * cellSize)
      ctx.stroke()
      // Vertical lines
      ctx.beginPath()
      ctx.moveTo(x + gridStart + i * cellSize, y + gridStart)
      ctx.lineTo(x + gridStart + i * cellSize, y + gridStart + gridSize)
      ctx.stroke()
    }

    // Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)
  }

  /**
   * Generate crafting table side texture (023-crafting-tools-system)
   * Shows wood planks with tool icons
   */
  private generateCraftingTableSideTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base wood color
    ctx.fillStyle = '#bc8f5a'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add wood grain variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 20
        const r = Math.max(0, Math.min(255, 188 + noise))
        const g = Math.max(0, Math.min(255, 143 + noise))
        const b = Math.max(0, Math.min(255, 90 + noise))
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Draw saw icon (left side)
    ctx.fillStyle = '#808080'
    // Saw blade
    ctx.fillRect(x + 2, y + 6, 5, 1)
    ctx.fillRect(x + 2, y + 7, 5, 1)
    // Saw teeth
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(x + 2 + i, y + 8, 1, 1)
    }
    // Saw handle
    ctx.fillStyle = '#6b4423'
    ctx.fillRect(x + 1, y + 5, 2, 4)

    // Draw hammer icon (right side)
    ctx.fillStyle = '#808080'
    // Hammer head
    ctx.fillRect(x + 10, y + 5, 4, 2)
    // Hammer handle
    ctx.fillStyle = '#6b4423'
    ctx.fillRect(x + 11, y + 7, 2, 5)

    // Horizontal wood plank line
    ctx.strokeStyle = 'rgba(90, 70, 40, 0.5)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, y + tileSize / 2)
    ctx.lineTo(x + tileSize, y + tileSize / 2)
    ctx.stroke()

    // Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)
  }

  /**
   * Generate furnace top texture (023-crafting-tools-system)
   * Shows stone with air vents
   */
  private generateFurnaceTopTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base stone color
    ctx.fillStyle = '#808080'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add stone variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 25
        const shade = Math.max(0, Math.min(255, 128 + noise))
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Draw air vent pattern (darker squares in center)
    ctx.fillStyle = '#4a4a4a'
    ctx.fillRect(x + 5, y + 5, 2, 2)
    ctx.fillRect(x + 9, y + 5, 2, 2)
    ctx.fillRect(x + 5, y + 9, 2, 2)
    ctx.fillRect(x + 9, y + 9, 2, 2)

    // Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)
  }

  /**
   * Generate furnace front texture (023-crafting-tools-system)
   * Shows stone with furnace opening
   */
  private generateFurnaceFrontTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base stone color
    ctx.fillStyle = '#808080'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add stone variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 25
        const shade = Math.max(0, Math.min(255, 128 + noise))
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Draw furnace opening (dark rectangle)
    ctx.fillStyle = '#2a2a2a'
    ctx.fillRect(x + 4, y + 6, 8, 7)

    // Opening border (darker stone)
    ctx.strokeStyle = '#4a4a4a'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 3.5, y + 5.5, 9, 8)

    // Grate lines inside opening
    ctx.strokeStyle = '#1a1a1a'
    ctx.beginPath()
    ctx.moveTo(x + 4, y + 9)
    ctx.lineTo(x + 12, y + 9)
    ctx.moveTo(x + 4, y + 11)
    ctx.lineTo(x + 12, y + 11)
    ctx.stroke()

    // Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)
  }

  /**
   * Generate furnace side texture (023-crafting-tools-system)
   * Shows plain stone
   */
  private generateFurnaceSideTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base stone color
    ctx.fillStyle = '#808080'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add stone variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 25
        const shade = Math.max(0, Math.min(255, 128 + noise))
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Stone block pattern
    ctx.strokeStyle = 'rgba(60, 60, 60, 0.4)'
    ctx.lineWidth = 1
    // Horizontal line
    ctx.beginPath()
    ctx.moveTo(x, y + 8)
    ctx.lineTo(x + tileSize, y + 8)
    ctx.stroke()
    // Vertical lines (offset)
    ctx.beginPath()
    ctx.moveTo(x + 8, y)
    ctx.lineTo(x + 8, y + 8)
    ctx.moveTo(x + 4, y + 8)
    ctx.lineTo(x + 4, y + tileSize)
    ctx.moveTo(x + 12, y + 8)
    ctx.lineTo(x + 12, y + tileSize)
    ctx.stroke()

    // Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)
  }

  /**
   * Generate lit furnace front texture (023-crafting-tools-system)
   * Shows stone with glowing furnace opening
   */
  private generateFurnaceFrontLitTexture(ctx: CanvasRenderingContext2D, col: number, row: number): void {
    const { tileSize } = this.config
    const x = col * tileSize
    const y = row * tileSize

    // Base stone color
    ctx.fillStyle = '#808080'
    ctx.fillRect(x, y, tileSize, tileSize)

    // Add stone variation
    for (let px = 0; px < tileSize; px++) {
      for (let py = 0; py < tileSize; py++) {
        const noise = (Math.random() - 0.5) * 25
        const shade = Math.max(0, Math.min(255, 128 + noise))
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`
        ctx.fillRect(x + px, y + py, 1, 1)
      }
    }

    // Draw glowing furnace opening
    // Outer glow
    ctx.fillStyle = 'rgba(255, 100, 0, 0.3)'
    ctx.fillRect(x + 2, y + 4, 12, 10)

    // Fire/glow inside
    ctx.fillStyle = '#ff6600'
    ctx.fillRect(x + 4, y + 6, 8, 7)

    // Brighter center
    ctx.fillStyle = '#ff9933'
    ctx.fillRect(x + 5, y + 7, 6, 5)

    // Hottest center
    ctx.fillStyle = '#ffcc00'
    ctx.fillRect(x + 6, y + 8, 4, 3)

    // Opening border (darker stone)
    ctx.strokeStyle = '#4a4a4a'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 3.5, y + 5.5, 9, 8)

    // Grate lines inside opening
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.beginPath()
    ctx.moveTo(x + 4, y + 9)
    ctx.lineTo(x + 12, y + 9)
    ctx.moveTo(x + 4, y + 11)
    ctx.lineTo(x + 12, y + 11)
    ctx.stroke()

    // Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.lineWidth = 1
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)
  }

  /**
   * Get the texture atlas
   */
  getTexture(): THREE.Texture {
    return this.texture
  }

  /**
   * Get current load state
   */
  getLoadState(): TextureLoadState {
    return this.loadState
  }

  /**
   * Get UV coordinates for a block type (all faces same)
   * Returns [u1, v1, u2, v2] for the texture region
   */
  getUVs(type: BlockType): [number, number, number, number] {
    return this.getUVsForFace(type, 'side')
  }

  /**
   * Get UV coordinates for a specific block face
   * Returns [u1, v1, u2, v2] for the texture region
   */
  getUVsForFace(type: BlockType, face: string): [number, number, number, number] {
    if (type === BlockType.AIR) {
      return [0, 0, 0, 0]
    }

    const textureIndex = getTextureIndexForFace(type, face)
    return this.getUVsForIndex(textureIndex)
  }

  /**
   * Get UV coordinates for a texture index
   * Returns [u1, v1, u2, v2] for the texture region
   * Feature: 023-hand-item-attack-animation
   */
  getUVsForIndex(textureIndex: number): [number, number, number, number] {
    const { columns, rows } = this.config
    
    // Calculate UV based on column (all textures in row 0)
    const u1 = textureIndex / columns
    const u2 = (textureIndex + 1) / columns
    // Flip V coordinates: Canvas (0,0) is top-left, WebGL UV (0,0) is bottom-left
    // Textures are in row 0 of canvas, which is at the top
    // In UV space, that's at v = (rows-1)/rows to v = 1
    const v1 = (rows - 1) / rows  // Bottom of texture in UV
    const v2 = 1.0                 // Top of texture in UV

    return [u1, v1, u2, v2]
  }

  /**
   * Get the number of textures in the atlas
   */
  getTextureCount(): number {
    return this.config.columns
  }

  /**
   * Get atlas configuration
   */
  getConfig(): TextureAtlasConfig {
    return { ...this.config }
  }

  /**
   * Get canvas for UI preview
   */
  getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  /**
   * Dispose of texture resources
   */
  dispose(): void {
    this.texture.dispose()
  }
}
