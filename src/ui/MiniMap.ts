/**
 * MiniMap - Circular minimap in top-right corner
 * Feature: 012-sound-map-system
 */

import { World } from '../core/World'
import { BlockType } from '../core/Block'
import { getMapColor, UNLOADED_CHUNK_COLOR, PLAYER_COLOR, PLAYER_DIRECTION_COLOR } from './MapColors'

/** Minimap configuration */
const MINIMAP_SIZE = 150
const MINIMAP_VIEW_RADIUS = 32 // Blocks visible in each direction
const MINIMAP_UPDATE_INTERVAL = 100 // ms between terrain updates

/**
 * Circular minimap showing player position and surrounding terrain
 */
export class MiniMap {
  private container: HTMLElement
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private cacheCanvas: HTMLCanvasElement
  private cacheCtx: CanvasRenderingContext2D
  
  private world: World | null = null
  private lastUpdateTime: number = 0
  private lastPlayerX: number = 0
  private lastPlayerZ: number = 0
  private lastPlayerY: number = 0

  constructor() {
    // Create container
    this.container = document.createElement('div')
    this.container.id = 'minimap-container'
    this.container.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: ${MINIMAP_SIZE}px;
      height: ${MINIMAP_SIZE}px;
      border-radius: 50%;
      border: 2px solid rgba(180, 160, 120, 0.9);
      box-shadow: 
        inset 0 0 0 1px rgba(255, 255, 255, 0.15),
        0 0 0 2px rgba(60, 50, 40, 0.7),
        0 3px 15px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      z-index: 100;
      pointer-events: none;
      background: rgba(20, 20, 30, 0.3);
    `

    // Create main canvas
    this.canvas = document.createElement('canvas')
    this.canvas.width = MINIMAP_SIZE
    this.canvas.height = MINIMAP_SIZE
    this.canvas.style.cssText = `
      width: 100%;
      height: 100%;
    `
    this.container.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')!

    // Create cache canvas for terrain
    this.cacheCanvas = document.createElement('canvas')
    this.cacheCanvas.width = MINIMAP_SIZE
    this.cacheCanvas.height = MINIMAP_SIZE
    this.cacheCtx = this.cacheCanvas.getContext('2d')!

    document.body.appendChild(this.container)
  }

  /**
   * Set the world reference
   */
  setWorld(world: World): void {
    this.world = world
  }

  /**
   * Update minimap with player position
   */
  update(playerX: number, playerY: number, playerZ: number, playerRotation: number): void {
    const now = performance.now()
    
    // Update terrain cache periodically or when player moves significantly
    const dx = playerX - this.lastPlayerX
    const dz = playerZ - this.lastPlayerZ
    const dy = playerY - this.lastPlayerY
    const moved = Math.sqrt(dx * dx + dz * dz) > 2 || Math.abs(dy) > 2
    
    if (now - this.lastUpdateTime > MINIMAP_UPDATE_INTERVAL || moved) {
      this.updateTerrainCache(playerX, playerY, playerZ)
      this.lastUpdateTime = now
      this.lastPlayerX = playerX
      this.lastPlayerZ = playerZ
      this.lastPlayerY = playerY
    }

    // Render frame
    this.render(playerRotation)
  }

  /**
   * Update terrain cache
   */
  private updateTerrainCache(playerX: number, playerY: number, playerZ: number): void {
    if (!this.world) return

    const ctx = this.cacheCtx
    const center = MINIMAP_SIZE / 2
    const scale = MINIMAP_SIZE / (MINIMAP_VIEW_RADIUS * 2)

    // Clear cache
    ctx.fillStyle = UNLOADED_CHUNK_COLOR
    ctx.fillRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE)

    // Determine Y level to display (surface or current level)
    const displayY = Math.floor(playerY) - 1

    // Draw terrain
    for (let dx = -MINIMAP_VIEW_RADIUS; dx <= MINIMAP_VIEW_RADIUS; dx++) {
      for (let dz = -MINIMAP_VIEW_RADIUS; dz <= MINIMAP_VIEW_RADIUS; dz++) {
        const worldX = Math.floor(playerX) + dx
        const worldZ = Math.floor(playerZ) + dz

        // Get top block at this position
        const blockType = this.getTopBlock(worldX, displayY, worldZ)
        
        if (blockType !== null && blockType !== BlockType.AIR) {
          const screenX = center + dx * scale
          const screenY = center + dz * scale
          
          ctx.fillStyle = getMapColor(blockType)
          ctx.fillRect(
            Math.floor(screenX),
            Math.floor(screenY),
            Math.ceil(scale) + 1,
            Math.ceil(scale) + 1
          )
        }
      }
    }
  }

  /**
   * Get the top visible block at a position
   */
  private getTopBlock(x: number, startY: number, z: number): BlockType | null {
    if (!this.world) return null

    // Check if chunk is loaded
    const cx = Math.floor(x / 16)
    const cy = Math.floor(startY / 16)
    const cz = Math.floor(z / 16)
    
    if (!this.world.isChunkLoaded(cx, cy, cz)) {
      return null
    }

    // Find top solid block from startY down
    for (let y = startY; y >= startY - 10; y--) {
      const block = this.world.getBlock(x, y, z)
      if (block !== BlockType.AIR && block !== BlockType.WATER) {
        return block
      }
      if (block === BlockType.WATER) {
        return BlockType.WATER
      }
    }

    // Check up from startY
    for (let y = startY + 1; y <= startY + 20; y++) {
      const block = this.world.getBlock(x, y, z)
      if (block !== BlockType.AIR) {
        // Found something above, return block below it
        const below = this.world.getBlock(x, y - 1, z)
        return below !== BlockType.AIR ? below : block
      }
    }

    return null
  }

  /**
   * Render the minimap
   */
  private render(playerRotation: number): void {
    const ctx = this.ctx
    const center = MINIMAP_SIZE / 2
    const radius = MINIMAP_SIZE / 2

    // Clear with circular clip
    ctx.save()
    ctx.beginPath()
    ctx.arc(center, center, radius, 0, Math.PI * 2)
    ctx.clip()

    // Draw cached terrain
    ctx.drawImage(this.cacheCanvas, 0, 0)

    // Draw compass directions
    this.drawCompass(ctx, center, radius, playerRotation)

    // Draw player marker (center)
    ctx.fillStyle = PLAYER_COLOR
    ctx.beginPath()
    ctx.arc(center, center, 4, 0, Math.PI * 2)
    ctx.fill()

    // Draw direction indicator
    const dirLength = 10
    const dirX = center + Math.sin(playerRotation) * dirLength
    const dirY = center - Math.cos(playerRotation) * dirLength
    
    ctx.strokeStyle = PLAYER_DIRECTION_COLOR
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.lineTo(dirX, dirY)
    ctx.stroke()

    // Draw direction arrow head
    const arrowSize = 4
    const angle = -playerRotation + Math.PI
    ctx.fillStyle = PLAYER_DIRECTION_COLOR
    ctx.beginPath()
    ctx.moveTo(dirX, dirY)
    ctx.lineTo(
      dirX + arrowSize * Math.cos(angle - 0.5),
      dirY + arrowSize * Math.sin(angle - 0.5)
    )
    ctx.lineTo(
      dirX + arrowSize * Math.cos(angle + 0.5),
      dirY + arrowSize * Math.sin(angle + 0.5)
    )
    ctx.closePath()
    ctx.fill()

    ctx.restore()

    // Draw decorative border ring
    ctx.strokeStyle = 'rgba(180, 160, 120, 0.6)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(center, center, radius - 2, 0, Math.PI * 2)
    ctx.stroke()
  }

  /**
   * Draw compass direction labels (N, E, S, W)
   */
  private drawCompass(ctx: CanvasRenderingContext2D, center: number, radius: number, playerRotation: number): void {
    const directions = [
      { label: 'N', angle: 0, color: '#ff4444' },           // North - red
      { label: 'E', angle: Math.PI / 2, color: '#ffffff' }, // East - white
      { label: 'S', angle: Math.PI, color: '#ffffff' },     // South - white
      { label: 'W', angle: -Math.PI / 2, color: '#ffffff' } // West - white
    ]

    const labelRadius = radius - 12
    ctx.font = 'bold 10px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (const dir of directions) {
      // Calculate position based on player rotation
      // When player faces north (rotation=0), N should be at top
      const adjustedAngle = dir.angle - playerRotation
      const x = center + Math.sin(adjustedAngle) * labelRadius
      const y = center - Math.cos(adjustedAngle) * labelRadius

      // Draw text shadow for better visibility
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillText(dir.label, x + 1, y + 1)
      
      // Draw text
      ctx.fillStyle = dir.color
      ctx.fillText(dir.label, x, y)
    }
  }

  /**
   * Show the minimap
   */
  show(): void {
    this.container.style.display = 'block'
  }

  /**
   * Hide the minimap
   */
  hide(): void {
    this.container.style.display = 'none'
  }

  /**
   * Set visibility
   */
  setVisible(visible: boolean): void {
    this.container.style.display = visible ? 'block' : 'none'
  }

  /**
   * Dispose of the component
   */
  dispose(): void {
    this.container.remove()
  }
}
