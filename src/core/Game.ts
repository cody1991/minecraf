import * as THREE from 'three'
import { World } from './World'
import { Renderer } from '../renderer/Renderer'
import { BlockMesh } from '../renderer/BlockMesh'

/**
 * Main Game class - manages game loop and core systems
 */
export class Game {
  private world: World
  private renderer: Renderer
  private blockMesh: BlockMesh
  private camera: THREE.PerspectiveCamera

  private isRunning: boolean = false
  private lastTime: number = 0
  private frameCount: number = 0
  private fpsTime: number = 0
  private currentFps: number = 0

  // Callbacks for external systems
  private updateCallback: ((deltaTime: number) => void) | null = null

  constructor(container: HTMLElement) {
    // Initialize world
    this.world = new World()

    // Initialize renderer
    this.renderer = new Renderer(container)

    // Initialize camera
    const { width, height } = this.renderer.getSize()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

    // Set initial camera position at spawn
    const spawn = this.world.getSpawnPosition()
    this.camera.position.set(spawn.x, spawn.y, spawn.z)

    // Initialize block mesh
    this.blockMesh = new BlockMesh(this.world, this.renderer.getScene())

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this))
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

    // Update block mesh if world changed
    this.blockMesh.update()

    // Render
    this.renderer.render(this.camera)
  }

  /**
   * Update FPS display
   */
  private updateFpsDisplay(): void {
    const fpsElement = document.getElementById('fps-counter')
    if (fpsElement) {
      fpsElement.textContent = `FPS: ${this.currentFps}`
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
   * Get the block mesh
   */
  getBlockMesh(): BlockMesh {
    return this.blockMesh
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
    this.blockMesh.dispose()
    this.renderer.dispose()
  }
}
