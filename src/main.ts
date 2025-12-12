import { Game } from './core/Game'
import { Player } from './player/Player'
import { Movement } from './player/Movement'
import { Camera } from './renderer/Camera'
import { InputManager } from './input/InputManager'
import { Crosshair } from './ui/Crosshair'
import { BlockSelector } from './ui/BlockSelector'
import { BlockInteraction } from './player/BlockInteraction'

/**
 * WebCraft - Web 版我的世界
 * 入口文件
 * Feature: 002-chunk-terrain-system
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

  // Handle pointer lock changes
  inputManager.onPointerLockChange((locked) => {
    crosshair.setVisible(locked)
  })

  // Set up game update callback
  game.setUpdateCallback((deltaTime) => {
    // Only process input when pointer is locked
    if (inputManager.isPointerLocked()) {
      const input = inputManager.getState()

      // Update player movement
      movement.update(input, deltaTime)

      // Handle block type selection (1-5 keys)
      if (input.numberKey !== null) {
        player.setSelectedBlockIndex(input.numberKey)
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
  console.log('Press 1-5 to switch block types')
})
