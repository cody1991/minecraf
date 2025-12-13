import { Game } from './core/Game'
import { Player } from './player/Player'
import { Movement } from './player/Movement'
import { Camera } from './renderer/Camera'
import { InputManager } from './input/InputManager'
import { Crosshair } from './ui/Crosshair'
import { BlockSelector } from './ui/BlockSelector'
import { BlockInteraction } from './player/BlockInteraction'
import { AudioManager } from './audio/AudioManager'
import { VolumeControl } from './ui/VolumeControl'
import { CoordinateDisplay } from './ui/CoordinateDisplay'
import { MiniMap } from './ui/MiniMap'
import { WorldMap } from './ui/WorldMap'

/**
 * WebCraft - Web 版我的世界
 * 入口文件
 * Feature: 002-chunk-terrain-system
 * Feature: 012-sound-map-system - Added audio and map systems
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

  // Get spawn position
  const spawn = game.getWorld().getSpawnPosition()

  // Create player at spawn
  const player = new Player(spawn.x, spawn.y, spawn.z)

  // Register player with game for underwater effect
  game.setPlayer(player)

  // Create camera controller
  const cameraController = new Camera(game.getCamera(), player)

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
    cameraController.update()

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
})
