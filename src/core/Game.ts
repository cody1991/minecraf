/**
 * Game - Main game loop and system management
 * Feature: 002-chunk-terrain-system
 * 
 * Manages the game loop, world, and rendering with chunk-based architecture.
 */

import * as THREE from 'three'
import { World, WorldConfig } from './World'
import { Renderer } from '../renderer/Renderer'
import { ChunkRenderer } from '../renderer/ChunkRenderer'
import { ChunkManager } from './ChunkManager'

/**
 * Main Game class - manages game loop and core systems
 */
export class Game {
  private world: World
  private renderer: Renderer
  private chunkRenderer: ChunkRenderer
  private chunkManager: ChunkManager
  private camera: THREE.PerspectiveCamera

  private isRunning: boolean = false
  private lastTime: number = 0
  private frameCount: number = 0
  private fpsTime: number = 0
  private currentFps: number = 0

  // Player position for chunk loading (updated externally)
  private playerPosition: THREE.Vector3 = new THREE.Vector3()

  // Callbacks for external systems
  private updateCallback: ((deltaTime: number) => void) | null = null

  constructor(container: HTMLElement, worldConfig?: WorldConfig) {
    // Initialize world with chunk system
    this.world = new World(worldConfig)

    // Log world seed for debugging
    console.log(`[World] Seed: ${this.world.getSeed()}`)

    // Initialize renderer
    this.renderer = new Renderer(container)

    // Initialize chunk renderer
    this.chunkRenderer = new ChunkRenderer(this.renderer.getScene())

    // Initialize chunk manager
    this.chunkManager = new ChunkManager(this.world, this.chunkRenderer)

    // Initialize camera
    const { width, height } = this.renderer.getSize()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

    // Set initial camera position at spawn
    const spawn = this.world.getSpawnPosition()
    this.camera.position.set(spawn.x, spawn.y, spawn.z)
    this.playerPosition.copy(this.camera.position)

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this))

    // Initial chunk loading around spawn
    this.chunkManager.update(spawn.x, spawn.y, spawn.z)
  }

  /**
   * Handle window resize
   */
  private handleResize(): void {
    const { width, height } = this.renderer.getSize()
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  /**
   * Set update callback for external systems (player, input, etc.)
   */
  setUpdateCallback(callback: (deltaTime: number) => void): void {
    this.updateCallback = callback
  }

  /**
   * Update player position (called by player system)
   */
  setPlayerPosition(x: number, y: number, z: number): void {
    this.playerPosition.set(x, y, z)
  }

  /**
   * Start the game loop
   */
  start(): void {
    if (this.isRunning) return
    this.isRunning = true
    this.lastTime = performance.now()
    this.fpsTime = this.lastTime
    this.gameLoop()
  }

  /**
   * Stop the game loop
   */
  stop(): void {
    this.isRunning = false
  }

  /**
   * Main game loop
   */
  private gameLoop(): void {
    if (!this.isRunning) return

    requestAnimationFrame(() => this.gameLoop())

    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000 // Convert to seconds
    this.lastTime = currentTime

    // Update FPS counter
    this.frameCount++
    if (currentTime - this.fpsTime >= 1000) {
      this.currentFps = this.frameCount
      this.frameCount = 0
      this.fpsTime = currentTime
      this.updateFpsDisplay()
    }

    // Call update callback (for player, input, etc.)
    if (this.updateCallback) {
      this.updateCallback(deltaTime)
    }

    // Update chunk loading based on player position
    this.chunkManager.update(
      this.playerPosition.x,
      this.playerPosition.y,
      this.playerPosition.z
    )

    // Update dirty chunk meshes
    const dirtyChunks = this.world.getDirtyChunks()
    for (const chunk of dirtyChunks) {
      this.chunkRenderer.updateChunkMesh(chunk)
    }

    // Update chunk visibility (frustum culling)
    this.chunkRenderer.update(this.camera)

    // Render
    this.renderer.render(this.camera)
  }

  /**
   * Update FPS display
   */
  private updateFpsDisplay(): void {
    const fpsElement = document.getElementById('fps-counter')
    if (fpsElement) {
      const loadedChunks = this.chunkManager.getLoadedCount()
      const visibleChunks = this.chunkRenderer.getVisibleChunkCount()
      fpsElement.textContent = `FPS: ${this.currentFps} | Chunks: ${visibleChunks}/${loadedChunks}`
    }
  }

  /**
   * Get the camera
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  /**
   * Get the world
   */
  getWorld(): World {
    return this.world
  }

  /**
   * Get the renderer
   */
  getRenderer(): Renderer {
    return this.renderer
  }

  /**
   * Get the chunk renderer
   */
  getChunkRenderer(): ChunkRenderer {
    return this.chunkRenderer
  }

  /**
   * Get the chunk manager
   */
  getChunkManager(): ChunkManager {
    return this.chunkManager
  }

  /**
   * Get current FPS
   */
  getFps(): number {
    return this.currentFps
  }

  /**
   * Dispose of game resources
   */
  dispose(): void {
    this.stop()
    window.removeEventListener('resize', this.handleResize.bind(this))
    this.chunkRenderer.dispose()
    this.world.dispose()
    this.renderer.dispose()
  }
}
