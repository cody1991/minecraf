import { Game } from './core/Game'
import { Player } from './player/Player'
import { Movement } from './player/Movement'
import { CameraController } from './renderer/CameraController'
import { InputManager } from './input/InputManager'
import { Crosshair } from './ui/Crosshair'
import { HotbarUI } from './ui/HotbarUI'
import { InventoryUI } from './ui/InventoryUI'
import { TargetIndicator } from './ui/TargetIndicator'
import { BlockInteraction } from './player/BlockInteraction'
import { AudioManager } from './audio/AudioManager'
import { VolumeControl } from './ui/VolumeControl'
import { CoordinateDisplay } from './ui/CoordinateDisplay'
import { MiniMap } from './ui/MiniMap'
import { WorldMap } from './ui/WorldMap'
import { CharacterModelLibrary } from './player/CharacterModelLibrary'
import { PreferenceManager } from './player/PreferenceManager'
import { CharacterSelectUI } from './ui/CharacterSelectUI'
import { initializeModelLibrary } from './models'
import { ViewMode } from './player/CharacterTypes'
import { SaveManager } from './storage/SaveManager'
import { SavePanel } from './ui/SavePanel'
import { AutoSave } from './storage/AutoSave'

/**
 * WebCraft - Web 版我的世界
 * 入口文件
 * Feature: 002-chunk-terrain-system
 * Feature: 012-sound-map-system - Added audio and map systems
 * Feature: 013-character-model-view - Added character model and view switching
 * Feature: 018-world-save-system - Added save/load functionality
 * Feature: 019-inventory-system - Added inventory and hotbar
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container')
  if (!container) {
    console.error('Game container not found!')
    return
  }

  // Create game instance with optional seed
  const urlParams = new URLSearchParams(window.location.search)
  const seedParam = urlParams.get('seed')
  const seed = seedParam ? parseInt(seedParam, 10) : undefined

  const game = new Game(container, { seed })

  // Initialize model library
  initializeModelLibrary()
  const modelLibrary = CharacterModelLibrary.getInstance()
  const preferenceManager = PreferenceManager.getInstance()

  // Get spawn position
  const spawn = game.getWorld().getSpawnPosition()

  // Create player at spawn
  const player = new Player(spawn.x, spawn.y, spawn.z)

  // Register player with game for underwater effect
  game.setPlayer(player)

  // Create character model from saved preference or default
  const savedModelId = preferenceManager.getSelectedModelId('default')
  let characterModel = modelLibrary.createModelInstance(savedModelId)
  
  // Add character model to scene
  game.getRenderer().getScene().add(characterModel.mesh)
  
  // Create camera controller with view switching support
  const cameraController = new CameraController(game.getCamera(), player, game.getWorld())
  cameraController.setCharacterModel(characterModel)

  // Create character select UI
  const characterSelectUI = new CharacterSelectUI()
  characterSelectUI.setModels(modelLibrary.getAvailableModels())

  // Function to change character model
  const changeCharacterModel = (modelId: string) => {
    // Remove old model from scene
    game.getRenderer().getScene().remove(characterModel.mesh)
    characterModel.dispose()
    
    // Create new model
    characterModel = modelLibrary.createModelInstance(modelId)
    game.getRenderer().getScene().add(characterModel.mesh)
    cameraController.setCharacterModel(characterModel)
    
    console.log(`[Character] Changed to: ${modelId}`)
  }

  // Create movement controller
  const movement = new Movement(player, game.getWorld())

  // Create input manager
  const inputManager = new InputManager(game.getRenderer().getDomElement())

  // Create block interaction
  const blockInteraction = new BlockInteraction(
    game.getWorld(),
    player,
    game.getCamera()
  )

  // Connect item drop callback (Feature: 019-inventory-system)
  blockInteraction.setOnItemDrop((item) => {
    game.addItemEntity(item)
  })

  // Create UI components
  const crosshair = new Crosshair()
  
  // Create hotbar UI (Feature: 019-inventory-system)
  const hotbarUI = new HotbarUI()
  hotbarUI.setInventory(player.inventory)
  
  // Create inventory UI (Feature: 019-inventory-system)
  const inventoryUI = new InventoryUI()
  inventoryUI.setOnOpen(() => {
    inputManager.exitPointerLock()
  })
  inventoryUI.setOnClose(() => {
    inputManager.requestPointerLock()
  })
  
  // Create 3D target indicator for third-person view
  const targetIndicator = new TargetIndicator(
    game.getRenderer().getScene(),
    player,
    game.getWorld()
  )
  
  // Create audio manager
  const audioManager = AudioManager.getInstance()
  
  // Create volume control UI
  new VolumeControl()
  
  // Create coordinate display
  const coordinateDisplay = new CoordinateDisplay()
  
  // Create minimap
  const miniMap = new MiniMap()
  miniMap.setWorld(game.getWorld())
  
  // Create world map
  const worldMap = new WorldMap()
  worldMap.setWorld(game.getWorld())

  // ============================================================================
  // Save System Setup (Feature: 018-world-save-system)
  // ============================================================================
  
  // Create save manager
  const saveManager = new SaveManager()
  
  // Create save panel
  const savePanel = new SavePanel(saveManager)
  
  // Create auto-save manager
  const autoSave = new AutoSave(saveManager)
  
  // Initialize save system
  saveManager.initialize().then((success) => {
    if (success) {
      console.log('[SaveSystem] Initialized successfully')
      
      // Set up auto-save data provider
      autoSave.setDataProvider(() => ({
        seed: game.getWorld().getSeed(),
        playerState: player.getState(),
        modifiedChunks: game.getWorld().getModifiedChunks(),
      }))
      
      // Set up auto-save completion callback
      autoSave.onSaveComplete((result) => {
        if (result.success) {
          console.log('[AutoSave] Completed successfully')
        } else {
          console.error('[AutoSave] Failed:', result.error)
        }
      })
      
      // Start auto-save
      autoSave.start()
      
      // Check for auto-save on startup
      saveManager.getAutoSave().then((autoSaveData) => {
        if (autoSaveData) {
          console.log('[SaveSystem] Found auto-save from:', new Date(autoSaveData.updatedAt).toLocaleString())
        }
      })
    } else {
      console.warn('[SaveSystem] Not available - browser may not support IndexedDB')
    }
  })
  
  // Set up save panel callbacks
  savePanel.setCallbacks({
    onSave: async (slotNumber, name) => {
      return saveManager.save(slotNumber, name, {
        seed: game.getWorld().getSeed(),
        playerState: player.getState(),
        modifiedChunks: game.getWorld().getModifiedChunks(),
      })
    },
    onLoad: async (saveId) => {
      const result = await saveManager.load(saveId)
      if (!result.success || !result.saveData || !result.chunks) {
        throw new Error(result.error || 'Load failed')
      }
      
      // Reset world (clear all chunks)
      game.getWorld().resetWorld()
      game.getChunkManager().reset()
      
      // Restore player state first (so we know where to load chunks)
      player.restoreState(result.saveData.playerState)
      
      // Force load chunks around player immediately (prevents falling)
      game.getChunkManager().forceLoadRadius(
        player.position.x,
        player.position.y,
        player.position.z,
        3
      )
      
      // Now apply saved chunk modifications on top of regenerated terrain
      game.getWorld().restoreFromSave(result.chunks)
      
      // Update camera
      cameraController.update(0)
    },
    onDelete: async (saveId) => {
      return saveManager.delete(saveId)
    },
    onRename: async (saveId, newName) => {
      return saveManager.rename(saveId, newName)
    },
    onNewWorld: async () => {
      // Reset world with new seed
      game.getWorld().resetWorld()
      game.getChunkManager().reset()
      
      // Reset player to spawn
      const spawn = game.getWorld().getSpawnPosition()
      player.position.set(spawn.x, spawn.y, spawn.z)
      player.velocity.set(0, 0, 0)
      
      // Force load chunks around player immediately (prevents falling)
      game.getChunkManager().forceLoadRadius(spawn.x, spawn.y, spawn.z, 3)
    },
    getWorldData: () => ({
      seed: game.getWorld().getSeed(),
      playerState: player.getState(),
      modifiedChunks: game.getWorld().getModifiedChunks(),
    }),
  })

  // Footstep sound state
  let footstepTimer = 0
  const FOOTSTEP_WALK_INTERVAL = 0.4
  const FOOTSTEP_RUN_INTERVAL = 0.25
  
  // Fall detection state
  let fallStartY = 0
  let isFalling = false

  // Handle pointer lock changes
  inputManager.onPointerLockChange((locked) => {
    crosshair.setVisible(locked)
  })

  // Initialize audio on first user interaction
  const initAudioOnInteraction = async () => {
    await audioManager.init()
    // Start background music
    audioManager.playMusic('ambient')
    // Remove listener after first interaction
    document.removeEventListener('click', initAudioOnInteraction)
    document.removeEventListener('keydown', initAudioOnInteraction)
  }
  document.addEventListener('click', initAudioOnInteraction)
  document.addEventListener('keydown', initAudioOnInteraction)

  // Set up game update callback
  game.setUpdateCallback((deltaTime) => {
    // Update coordinate display
    coordinateDisplay.update(player.position.x, player.position.y, player.position.z)
    
    // Update minimap
    miniMap.update(
      player.position.x,
      player.position.y,
      player.position.z,
      player.rotation.y
    )
    
    // Update world map player position
    worldMap.updatePlayerPosition(player.position.x, player.position.y, player.position.z)
    
    // Update audio listener position
    const forward = player.getForwardDirection()
    audioManager.updateListenerPosition(
      player.position.x,
      player.position.y,
      player.position.z,
      forward.x,
      forward.z
    )

    // Only process input when pointer is locked and world map is closed
    if (inputManager.isPointerLocked() && !worldMap.opened && !inventoryUI.isOpen) {
      const input = inputManager.getState()

      // Update player movement
      movement.update(input, deltaTime)

      // Handle hotbar slot selection (1-9 keys) - Feature: 019-inventory-system
      if (input.numberKey !== null && input.numberKey < 9) {
        hotbarUI.selectSlot(input.numberKey)
      }

      // Handle Tab key to cycle to next hotbar slot
      if (input.tabCycle) {
        hotbarUI.selectNext()
      }

      // Handle block destruction (left click)
      if (input.leftClick) {
        blockInteraction.destroyBlock()
      }

      // Handle block placement (right click)
      if (input.rightClick) {
        blockInteraction.placeBlock()
      }

      // Handle inventory toggle (E key) - Feature: 019-inventory-system
      if (input.inventoryToggle) {
        inventoryUI.open(player.inventory)
      }

      // Handle map toggle (M key)
      if (input.mapToggle) {
        worldMap.toggle()
      }

      // Handle view toggle (V key)
      if (input.viewToggle) {
        cameraController.toggleViewMode()
        const isFirstPerson = cameraController.currentMode === ViewMode.FIRST_PERSON
        // First person: show 2D crosshair, hide 3D indicator
        // Third person: hide 2D crosshair, show 3D indicator
        crosshair.setVisible(isFirstPerson)
        targetIndicator.setVisible(!isFirstPerson)
      }

      // Handle character select (C key)
      if (input.characterSelect && !characterSelectUI.isVisible) {
        // Exit pointer lock and show character select UI
        inputManager.exitPointerLock()
        characterSelectUI.show({
          onConfirm: (modelId: string) => {
            changeCharacterModel(modelId)
            // Re-request pointer lock after selection
            inputManager.requestPointerLock()
          },
          onCancel: () => {
            // Re-request pointer lock on cancel
            inputManager.requestPointerLock()
          }
        })
      }

      // Handle mouse movement for third-person camera
      if (cameraController.currentMode === ViewMode.THIRD_PERSON) {
        cameraController.handleMouseMove(input.mouseX, input.mouseY)
      }

      // Footstep sounds
      const isMoving = input.forward || input.backward || input.left || input.right
      if (isMoving && player.isGrounded && !player.isInWater) {
        footstepTimer -= deltaTime
        if (footstepTimer <= 0) {
          // Get ground block type
          const groundY = Math.floor(player.position.y - player.height / 2 - 0.1)
          const groundBlock = game.getWorld().getBlock(
            Math.floor(player.position.x),
            groundY,
            Math.floor(player.position.z)
          )
          const footstepSound = audioManager.getFootstepSound(groundBlock)
          audioManager.playSfx(footstepSound, { 
            volume: 0.5,
            playbackRate: 0.9 + Math.random() * 0.2 // Slight variation
          })
          footstepTimer = input.sprint ? FOOTSTEP_RUN_INTERVAL : FOOTSTEP_WALK_INTERVAL
        }
      } else {
        footstepTimer = 0
      }

      // Fall detection and sound
      if (!player.isGrounded && !player.isInWater) {
        if (!isFalling) {
          isFalling = true
          fallStartY = player.position.y
        }
      } else if (isFalling) {
        // Just landed
        const fallDistance = fallStartY - player.position.y
        if (fallDistance > 3) {
          // Play fall sound based on distance
          const isHeavy = fallDistance > 7
          const soundName = isHeavy ? 'fall_heavy' : 'fall_light'
          const volume = Math.min(1, 0.3 + fallDistance * 0.1)
          audioManager.playSfx(soundName, { volume })
        }
        isFalling = false
      }
    } else {
      // Handle map toggle even when world map is open
      const input = inputManager.getState()
      if (input.mapToggle) {
        worldMap.toggle()
      }
    }

    // Handle save panel toggle (Escape key) - must be outside pointer lock check
    // because pressing ESC exits pointer lock automatically
    {
      const input = inputManager.getState()
      if (input.escapeMenu && !characterSelectUI.isVisible && !worldMap.opened) {
        savePanel.toggle()
      }
    }

    // Update camera to follow player
    cameraController.update(deltaTime)

    // Update 3D target indicator (for third-person view)
    targetIndicator.update()

    // Update player position for chunk loading
    game.setPlayerPosition(player.position.x, player.position.y, player.position.z)

    // Reset per-frame input state
    inputManager.resetFrameState()
  })

  // Start the game
  game.start()

  console.log('WebCraft initialized!')
  console.log('World seed:', game.getWorld().seed)
  console.log('Click to start, WASD to move, mouse to look around')
  console.log('Left click to destroy, right click to place blocks')
  console.log('Press 1-9 to switch hotbar slots, E to open inventory')
  console.log('Press M to open world map')
  console.log('Press V to toggle first/third person view')
})
