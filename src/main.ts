import { Game } from './core/Game'
import { Player } from './player/Player'
import { Movement } from './player/Movement'
import { CameraController } from './renderer/CameraController'
import { InputManager } from './input/InputManager'
import { Crosshair } from './ui/Crosshair'
import { BlockSelector } from './ui/BlockSelector'
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

/**
 * WebCraft - Web 版我的世界
 * 入口文件
 * Feature: 002-chunk-terrain-system
 * Feature: 012-sound-map-system - Added audio and map systems
 * Feature: 013-character-model-view - Added character model and view switching
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

  // Create UI components
  const crosshair = new Crosshair()
  const blockSelector = new BlockSelector()
  
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
    if (inputManager.isPointerLocked() && !worldMap.opened) {
      const input = inputManager.getState()

      // Update player movement
      movement.update(input, deltaTime)

      // Handle block type selection (1-9, 0 keys)
      if (input.numberKey !== null) {
        if (player.setSelectedBlockIndex(input.numberKey)) {
          blockSelector.updateSelection(player.selectedBlockType)
        }
      }

      // Handle Tab key to cycle to next block
      if (input.tabCycle) {
        player.selectNextBlock()
        blockSelector.updateSelection(player.selectedBlockType)
      }

      // Handle block destruction (left click)
      if (input.leftClick) {
        blockInteraction.destroyBlock()
      }

      // Handle block placement (right click)
      if (input.rightClick) {
        blockInteraction.placeBlock()
      }

      // Handle map toggle (M key)
      if (input.mapToggle) {
        worldMap.toggle()
      }

      // Handle view toggle (V key)
      if (input.viewToggle) {
        cameraController.toggleViewMode()
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

    // Update camera to follow player
    cameraController.update(deltaTime)

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
  console.log('Press 1-9, 0 to switch block types (13 blocks available)')
  console.log('Press M to open world map')
  console.log('Press V to toggle first/third person view')
})
