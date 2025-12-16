/**
 * Game - Main game loop and system management
 * Feature: 002-chunk-terrain-system
 * Feature: 007-underwater-display - Added underwater effect support
 * Feature: 008-biome-weather-system - Added TimeSystem and EntityManager
 * Feature: 019-inventory-system - Added item entity management
 * 
 * Manages the game loop, world, and rendering with chunk-based architecture.
 */

import * as THREE from 'three'
import { World, WorldConfig } from './World'
import { Renderer } from '../renderer/Renderer'
import { ChunkRenderer } from '../renderer/ChunkRenderer'
import { ChunkManager } from './ChunkManager'
import { UnderwaterEffect } from '../renderer/UnderwaterEffect'
import { Player } from '../player/Player'
import { TimeSystem } from '../weather/TimeSystem'
import { EntityManager } from '../entities/EntityManager'
import { AnimalSpawner } from '../entities/AnimalSpawner'
import { FishSpawner } from '../entities/FishSpawner'
import { SkyRenderer } from '../weather/SkyRenderer'
import { WeatherSystem } from '../weather/WeatherSystem'
import { RainEffect } from '../weather/RainEffect'
import { ItemEntity, ItemEntityState } from '../entities/ItemEntity'
import { AudioManager } from '../audio/AudioManager'
import { MAX_ITEM_ENTITIES } from '../player/InventoryConstants'

/**
 * Main Game class - manages game loop and core systems
 */
export class Game {
  private world: World
  private renderer: Renderer
  private chunkRenderer: ChunkRenderer
  private chunkManager: ChunkManager
  private underwaterEffect: UnderwaterEffect
  private timeSystem: TimeSystem
  private entityManager: EntityManager
  private animalSpawner: AnimalSpawner
  private fishSpawner: FishSpawner
  private skyRenderer: SkyRenderer
  private weatherSystem: WeatherSystem
  private rainEffect: RainEffect
  private camera: THREE.PerspectiveCamera

  private isRunning: boolean = false
  private lastTime: number = 0
  private frameCount: number = 0
  private fpsTime: number = 0
  private currentFps: number = 0

  // Player position for chunk loading (updated externally)
  private playerPosition: THREE.Vector3 = new THREE.Vector3()

  // Player reference for underwater effect
  private player: Player | null = null

  // Item entities (Feature: 019-inventory-system)
  private itemEntities: Map<string, ItemEntity> = new Map()

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

    // Set world block getter for cross-chunk transparent block rendering
    // Returns null if chunk is not loaded, allowing proper handling of chunk boundaries
    this.chunkRenderer.setWorldBlockGetter((x, y, z) => {
      const bx = Math.floor(x)
      const by = Math.floor(y)
      const bz = Math.floor(z)
      
      // Check if chunk is loaded
      const cx = Math.floor(bx / 16)
      const cy = Math.floor(by / 16)
      const cz = Math.floor(bz / 16)
      
      if (!this.world.isChunkLoaded(cx, cy, cz)) {
        return null // Chunk not loaded
      }
      
      return this.world.getBlock(x, y, z)
    })

    // Initialize chunk manager
    this.chunkManager = new ChunkManager(this.world, this.chunkRenderer)

    // Initialize underwater effect
    this.underwaterEffect = new UnderwaterEffect(this.renderer.getScene())

    // Initialize time system (start at morning)
    this.timeSystem = new TimeSystem(6000)

    // Initialize entity manager
    this.entityManager = new EntityManager(this.renderer.getScene())

    // Initialize animal spawner
    this.animalSpawner = new AnimalSpawner(this.entityManager, this.world)

    // Initialize fish spawner
    this.fishSpawner = new FishSpawner(this.entityManager, this.world)

    // Initialize sky renderer
    this.skyRenderer = new SkyRenderer(this.renderer.getScene())

    // Initialize weather system
    this.weatherSystem = new WeatherSystem()

    // Initialize rain effect
    this.rainEffect = new RainEffect(this.renderer.getScene())

    // Connect chunk events to animal spawner
    this.chunkManager.onChunkLoaded = (cx, cy, cz) => {
      // Only spawn animals on surface chunks (cy = 2 or 3 typically)
      if (cy >= 2) {
        this.animalSpawner.spawnInChunk(cx, cz)
        this.fishSpawner.spawnInChunk(cx, cz)
      }
    }
    this.chunkManager.onChunkUnloaded = (cx, cy, cz) => {
      // Remove entities when chunk is unloaded
      if (cy >= 2) {
        this.entityManager.removeChunk(cx, cz)
        this.animalSpawner.clearChunk(cx, cz)
        this.fishSpawner.clearChunk(cx, cz)
      }
    }

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
   * Set player reference for underwater effect
   */
  setPlayer(player: Player): void {
    this.player = player
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

    // Update time system
    this.timeSystem.update(deltaTime)

    // Update entities with collision world
    this.entityManager.update(deltaTime, this.playerPosition, this.world)

    // Update item entities and check for pickup (Feature: 019-inventory-system)
    this.updateItemEntities(deltaTime)

    // Update sky renderer
    this.skyRenderer.update(this.timeSystem, this.camera.position)

    // Update weather system
    this.weatherSystem.update(deltaTime)

    // Update rain effect
    this.rainEffect.setVisible(this.weatherSystem.isRaining())
    this.rainEffect.setIntensity(this.weatherSystem.getRainIntensity())
    this.rainEffect.setPlayerPosition(this.playerPosition)
    if (this.player) {
      this.rainEffect.setPlayerSubmerged(this.player.isSubmerged)
    }
    this.rainEffect.update(deltaTime)

    // Update sky renderer rain state
    this.skyRenderer.setRaining(this.weatherSystem.isRaining())

    // Update ambient light based on time and weather
    const timeAmbient = this.timeSystem.getAmbientIntensity()
    const weatherDim = 1 - this.weatherSystem.getAmbientDimFactor()
    this.renderer.setAmbientIntensity(timeAmbient * weatherDim)

    // Update underwater effect based on player state
    if (this.player) {
      this.underwaterEffect.update(this.player.isSubmerged)
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
      const entityCount = this.entityManager.getCount()
      const timeStr = this.timeSystem.getFormattedTime()
      const weather = this.weatherSystem.getWeatherName()
      fpsElement.textContent = `FPS: ${this.currentFps} | Chunks: ${visibleChunks}/${loadedChunks} | Entities: ${entityCount} | ${timeStr} | ${weather}`
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
   * Get the underwater effect manager
   */
  getUnderwaterEffect(): UnderwaterEffect {
    return this.underwaterEffect
  }

  /**
   * Get the time system
   */
  getTimeSystem(): TimeSystem {
    return this.timeSystem
  }

  /**
   * Get the entity manager
   */
  getEntityManager(): EntityManager {
    return this.entityManager
  }

  /**
   * Get the sky renderer
   */
  getSkyRenderer(): SkyRenderer {
    return this.skyRenderer
  }

  /**
   * Get the weather system
   */
  getWeatherSystem(): WeatherSystem {
    return this.weatherSystem
  }

  /**
   * Get current FPS
   */
  getFps(): number {
    return this.currentFps
  }

  // ============================================================================
  // Item Entity Management (Feature: 019-inventory-system)
  // ============================================================================

  /**
   * Add an item entity to the world
   */
  addItemEntity(item: ItemEntity): boolean {
    // Check limit
    if (this.itemEntities.size >= MAX_ITEM_ENTITIES) {
      // Remove oldest item entity
      const oldestId = this.itemEntities.keys().next().value
      if (oldestId) {
        this.removeItemEntity(oldestId)
      }
    }

    this.itemEntities.set(item.id, item)
    
    // Add mesh to scene
    const mesh = item.getMesh()
    if (mesh) {
      this.renderer.getScene().add(mesh)
    }

    return true
  }

  /**
   * Remove an item entity from the world
   */
  removeItemEntity(itemId: string): boolean {
    const item = this.itemEntities.get(itemId)
    if (!item) return false

    // Remove mesh from scene
    const mesh = item.getMesh()
    if (mesh) {
      this.renderer.getScene().remove(mesh)
    }

    // Dispose item
    item.dispose()
    this.itemEntities.delete(itemId)

    return true
  }

  /**
   * Update all item entities and check for pickup
   * Fixed: Items no longer destroyed when inventory is full (Feature: 021-food-system)
   */
  private updateItemEntities(deltaTime: number): void {
    if (!this.player) return

    const playerPos = this.playerPosition
    const itemsToRemove: string[] = []

    // Update each item entity
    for (const [id, item] of this.itemEntities) {
      item.update(deltaTime, playerPos, this.world)

      // Check if should be destroyed (despawn timeout or reached player)
      if (item.shouldDestroy()) {
        // Check if item was picked up (close to player)
        const distance = item.position.distanceTo(playerPos)
        if (distance < 0.5) {
          // Try to add to inventory
          const added = this.player.inventory.addItem(item.itemType, item.count)
          
          if (added > 0) {
            // Successfully picked up (at least partially)
            item.count -= added
            
            // Play pickup sound
            AudioManager.getInstance().playPickupSound(
              item.position.x,
              item.position.y,
              item.position.z
            )
            
            // Only remove if all items were picked up
            if (item.count <= 0) {
              itemsToRemove.push(id)
            } else {
              // Still has items, reset to resting state
              item.state = ItemEntityState.Resting
              item.resetDestruction()
            }
          } else {
            // Inventory full, don't destroy - reset to resting state
            item.state = ItemEntityState.Resting
            item.resetDestruction()
          }
        } else {
          // Not near player, remove (despawn timeout)
          itemsToRemove.push(id)
        }
      }
    }

    // Remove destroyed items
    for (const id of itemsToRemove) {
      this.removeItemEntity(id)
    }
  }

  /**
   * Get item entity count
   */
  getItemEntityCount(): number {
    return this.itemEntities.size
  }

  /**
   * Dispose of game resources
   */
  dispose(): void {
    this.stop()
    window.removeEventListener('resize', this.handleResize.bind(this))
    
    // Dispose item entities (Feature: 019-inventory-system)
    for (const [, item] of this.itemEntities) {
      const mesh = item.getMesh()
      if (mesh) {
        this.renderer.getScene().remove(mesh)
      }
      item.dispose()
    }
    this.itemEntities.clear()
    
    this.rainEffect.dispose()
    this.skyRenderer.dispose()
    this.entityManager.dispose()
    this.underwaterEffect.dispose()
    this.chunkRenderer.dispose()
    this.world.dispose()
    this.renderer.dispose()
  }
}
