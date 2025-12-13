/**
 * WorldMap - Full-screen world map overlay
 * Feature: 012-sound-map-system
 */

import { World } from '../core/World'
import { BlockType } from '../core/Block'
import { getMapColor, UNLOADED_CHUNK_COLOR, PLAYER_COLOR } from './MapColors'

/** World map configuration */
const MIN_ZOOM = 0.1
const MAX_ZOOM = 4.0
const DEFAULT_ZOOM = 1.0
const ZOOM_SPEED = 0.1
const RENDER_RADIUS = 128 // Blocks to render from center

/**
 * Full-screen world map with zoom and pan
 */
export class WorldMap {
  private overlay: HTMLElement
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  
  private world: World | null = null
  private isOpen: boolean = false
  private zoom: number = DEFAULT_ZOOM
  private panOffset: { x: number; y: number } = { x: 0, y: 0 }
  
  private playerX: number = 0
  private playerY: number = 0
  private playerZ: number = 0
  
  private isDragging: boolean = false
  private dragStart: { x: number; y: number } = { x: 0, y: 0 }
  private panStart: { x: number; y: number } = { x: 0, y: 0 }

  constructor() {
    // Create overlay
    this.overlay = document.createElement('div')
    this.overlay.id = 'world-map-overlay'
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      z-index: 2000;
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    `

    // Create canvas
    this.canvas = document.createElement('canvas')
    this.canvas.style.cssText = `
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      cursor: grab;
    `
    this.overlay.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')!

    // Create controls hint
    const hint = document.createElement('div')
    hint.style.cssText = `
      color: white;
      font-family: sans-serif;
      font-size: 14px;
      margin-top: 16px;
      text-align: center;
      opacity: 0.7;
    `
    hint.innerHTML = '滚轮缩放 | 拖拽平移 | M 或 ESC 关闭'
    this.overlay.appendChild(hint)

    document.body.appendChild(this.overlay)

    // Set up event listeners
    this.setupEventListeners()
    this.resize()
    window.addEventListener('resize', () => this.resize())
  }

  /**
   * Set up mouse event listeners
   */
  private setupEventListeners(): void {
    // Wheel zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault()
      const zoomDelta = e.deltaY > 0 ? -ZOOM_SPEED : ZOOM_SPEED
      this.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, this.zoom + zoomDelta * this.zoom))
      this.render()
    })

    // Drag pan
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true
      this.dragStart = { x: e.clientX, y: e.clientY }
      this.panStart = { ...this.panOffset }
      this.canvas.style.cursor = 'grabbing'
    })

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.isOpen) return
      
      const dx = e.clientX - this.dragStart.x
      const dy = e.clientY - this.dragStart.y
      this.panOffset = {
        x: this.panStart.x + dx / this.zoom,
        y: this.panStart.y + dy / this.zoom
      }
      this.render()
    })

    window.addEventListener('mouseup', () => {
      this.isDragging = false
      this.canvas.style.cursor = 'grab'
    })

    // Keyboard close
    window.addEventListener('keydown', (e) => {
      if (this.isOpen && (e.key === 'm' || e.key === 'M' || e.key === 'Escape')) {
        this.close()
      }
    })

    // Click overlay to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close()
      }
    })
  }

  /**
   * Resize canvas to fit window
   */
  private resize(): void {
    const padding = 80
    this.canvas.width = window.innerWidth - padding * 2
    this.canvas.height = window.innerHeight - padding * 2
    
    if (this.isOpen) {
      this.render()
    }
  }

  /**
   * Set the world reference
   */
  setWorld(world: World): void {
    this.world = world
  }

  /**
   * Update player position
   */
  updatePlayerPosition(x: number, y: number, z: number): void {
    this.playerX = x
    this.playerY = y
    this.playerZ = z
    
    if (this.isOpen) {
      this.render()
    }
  }

  /**
   * Open the world map
   */
  open(): void {
    if (this.isOpen) return
    
    this.isOpen = true
    this.overlay.style.display = 'flex'
    this.panOffset = { x: 0, y: 0 }
    this.zoom = DEFAULT_ZOOM
    this.render()
  }

  /**
   * Close the world map
   */
  close(): void {
    if (!this.isOpen) return
    
    this.isOpen = false
    this.overlay.style.display = 'none'
  }

  /**
   * Toggle the world map
   */
  toggle(): void {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  /**
   * Check if map is open
   */
  get opened(): boolean {
    return this.isOpen
  }

  /**
   * Render the world map
   */
  private render(): void {
    if (!this.world) return

    const ctx = this.ctx
    const width = this.canvas.width
    const height = this.canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Clear
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, width, height)

    // Calculate visible area
    const blockSize = this.zoom * 2
    const visibleBlocksX = Math.ceil(width / blockSize / 2) + 1
    const visibleBlocksZ = Math.ceil(height / blockSize / 2) + 1
    const renderRadius = Math.min(RENDER_RADIUS, Math.max(visibleBlocksX, visibleBlocksZ))

    // Player position as center
    const mapCenterX = Math.floor(this.playerX) + this.panOffset.x
    const mapCenterZ = Math.floor(this.playerZ) + this.panOffset.y
    const displayY = Math.floor(this.playerY) - 1

    // Draw terrain
    for (let dx = -renderRadius; dx <= renderRadius; dx++) {
      for (let dz = -renderRadius; dz <= renderRadius; dz++) {
        const worldX = Math.floor(mapCenterX) + dx
        const worldZ = Math.floor(mapCenterZ) + dz

        const screenX = centerX + dx * blockSize
        const screenY = centerY + dz * blockSize

        // Skip if off screen
        if (screenX < -blockSize || screenX > width + blockSize ||
            screenY < -blockSize || screenY > height + blockSize) {
          continue
        }

        // Get block
        const blockType = this.getTopBlock(worldX, displayY, worldZ)
        
        if (blockType !== null) {
          ctx.fillStyle = getMapColor(blockType)
        } else {
          ctx.fillStyle = UNLOADED_CHUNK_COLOR
        }
        
        ctx.fillRect(
          Math.floor(screenX - blockSize / 2),
          Math.floor(screenY - blockSize / 2),
          Math.ceil(blockSize) + 1,
          Math.ceil(blockSize) + 1
        )
      }
    }

    // Draw player marker
    const playerScreenX = centerX - this.panOffset.x * blockSize
    const playerScreenY = centerY - this.panOffset.y * blockSize
    
    // Player glow
    const gradient = ctx.createRadialGradient(
      playerScreenX, playerScreenY, 0,
      playerScreenX, playerScreenY, 15
    )
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(playerScreenX, playerScreenY, 15, 0, Math.PI * 2)
    ctx.fill()

    // Player dot
    ctx.fillStyle = PLAYER_COLOR
    ctx.beginPath()
    ctx.arc(playerScreenX, playerScreenY, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw coordinates
    ctx.fillStyle = 'white'
    ctx.font = '14px monospace'
    ctx.textAlign = 'left'
    ctx.fillText(
      `X: ${Math.floor(this.playerX)} Y: ${Math.floor(this.playerY)} Z: ${Math.floor(this.playerZ)}`,
      10, 25
    )
    ctx.fillText(`缩放: ${(this.zoom * 100).toFixed(0)}%`, 10, 45)

    // Draw scale
    const scaleLength = 100
    const scaleBlocks = Math.round(scaleLength / blockSize)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width - 120, height - 20)
    ctx.lineTo(width - 120 + scaleLength, height - 20)
    ctx.stroke()
    ctx.fillText(`${scaleBlocks} 格`, width - 120, height - 30)
  }

  /**
   * Get the top visible block at a position
   */
  private getTopBlock(x: number, startY: number, z: number): BlockType | null {
    if (!this.world) return null

    const cx = Math.floor(x / 16)
    const cy = Math.floor(startY / 16)
    const cz = Math.floor(z / 16)
    
    if (!this.world.isChunkLoaded(cx, cy, cz)) {
      return null
    }

    for (let y = startY; y >= startY - 10; y--) {
      const block = this.world.getBlock(x, y, z)
      if (block !== BlockType.AIR && block !== BlockType.WATER) {
        return block
      }
      if (block === BlockType.WATER) {
        return BlockType.WATER
      }
    }

    for (let y = startY + 1; y <= startY + 20; y++) {
      const block = this.world.getBlock(x, y, z)
      if (block !== BlockType.AIR) {
        const below = this.world.getBlock(x, y - 1, z)
        return below !== BlockType.AIR ? below : block
      }
    }

    return null
  }

  /**
   * Dispose of the component
   */
  dispose(): void {
    this.overlay.remove()
  }
}
