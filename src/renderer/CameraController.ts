/**
 * CameraController - Manages first-person and third-person camera views
 * Feature: 013-character-model-view
 */

import * as THREE from 'three'
import { Player } from '../player/Player'
import { World } from '../core/World'
import { CharacterModel } from '../player/CharacterModel'
import { ViewMode } from '../player/CharacterTypes'
import {
  DEFAULT_THIRD_PERSON_DISTANCE,
  VIEW_TRANSITION_DURATION,
  MIN_CAMERA_DISTANCE,
  MAX_CAMERA_DISTANCE,
  CAMERA_HEIGHT_OFFSET,
  CAMERA_COLLISION_OFFSET
} from '../player/CharacterConstants'

/**
 * Easing function for smooth transitions
 */
function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t)
}

/**
 * CameraController - Handles view mode switching and camera positioning
 */
export class CameraController {
  private camera: THREE.PerspectiveCamera
  private player: Player
  private world: World
  private characterModel: CharacterModel | null = null
  
  /** Current view mode */
  private _currentMode: ViewMode = ViewMode.FIRST_PERSON
  
  /** Third-person camera distance */
  private _thirdPersonDistance: number = DEFAULT_THIRD_PERSON_DISTANCE
  
  /** Actual camera distance (after collision) - used for debugging */
  private _actualDistance: number = DEFAULT_THIRD_PERSON_DISTANCE
  
  /** Is currently transitioning between modes */
  private _isTransitioning: boolean = false
  
  /** Transition progress (0 to 1) */
  private transitionProgress: number = 0
  
  /** Start position for transition */
  private transitionStartPos: THREE.Vector3 = new THREE.Vector3()
  
  /** Raycaster for collision detection */
  private raycaster: THREE.Raycaster = new THREE.Raycaster()
  
  /** Third-person camera orbit angles */
  private orbitYaw: number = 0
  private orbitPitch: number = 0.3 // Slight downward angle
  
  /** Last frame's view toggle state to prevent rapid switching */
  private lastToggleTime: number = 0
  private readonly TOGGLE_COOLDOWN = 0.1 // 100ms cooldown
  
  constructor(camera: THREE.PerspectiveCamera, player: Player, world: World) {
    this.camera = camera
    this.player = player
    this.world = world
  }
  
  /**
   * Get current view mode
   */
  get currentMode(): ViewMode {
    return this._currentMode
  }
  
  /**
   * Get third-person distance
   */
  get thirdPersonDistance(): number {
    return this._thirdPersonDistance
  }
  
  /**
   * Set third-person distance
   */
  set thirdPersonDistance(value: number) {
    this._thirdPersonDistance = Math.max(MIN_CAMERA_DISTANCE, Math.min(MAX_CAMERA_DISTANCE, value))
  }
  
  /**
   * Get actual camera distance (after collision adjustment)
   */
  get actualDistance(): number {
    return this._actualDistance
  }
  
  /**
   * Is currently transitioning
   */
  get isTransitioning(): boolean {
    return this._isTransitioning
  }
  
  /**
   * Set the character model reference
   */
  setCharacterModel(model: CharacterModel | null): void {
    this.characterModel = model
    this.updateModelVisibility()
  }
  
  /**
   * Toggle between first and third person view
   */
  toggleViewMode(): void {
    const now = performance.now() / 1000
    if (now - this.lastToggleTime < this.TOGGLE_COOLDOWN) {
      return // Ignore rapid toggles
    }
    this.lastToggleTime = now
    
    if (this._currentMode === ViewMode.FIRST_PERSON) {
      this.setViewMode(ViewMode.THIRD_PERSON)
    } else {
      this.setViewMode(ViewMode.FIRST_PERSON)
    }
  }
  
  /**
   * Set view mode with transition
   */
  setViewMode(mode: ViewMode): void {
    if (mode === this._currentMode && !this._isTransitioning) {
      return
    }
    
    this._currentMode = mode
    this._isTransitioning = true
    this.transitionProgress = 0
    this.transitionStartPos.copy(this.camera.position)
    
    // Sync orbit angles with player rotation when switching to third person
    if (mode === ViewMode.THIRD_PERSON) {
      this.orbitYaw = this.player.rotation.y
    }
    
    this.updateModelVisibility()
  }
  
  /**
   * Update model visibility based on view mode
   */
  private updateModelVisibility(): void {
    if (this.characterModel) {
      this.characterModel.visible = this._currentMode === ViewMode.THIRD_PERSON
    }
  }
  
  /**
   * Update camera position and rotation
   */
  update(deltaTime: number): void {
    // Update transition
    if (this._isTransitioning) {
      this.transitionProgress += deltaTime / VIEW_TRANSITION_DURATION
      if (this.transitionProgress >= 1) {
        this.transitionProgress = 1
        this._isTransitioning = false
      }
    }
    
    // Calculate target position based on mode
    let targetPosition: THREE.Vector3
    let targetLookAt: THREE.Vector3
    
    if (this._currentMode === ViewMode.FIRST_PERSON) {
      targetPosition = this.getFirstPersonPosition()
      targetLookAt = this.getFirstPersonLookAt()
    } else {
      targetPosition = this.getThirdPersonPosition()
      targetLookAt = this.getThirdPersonLookAt()
    }
    
    // Apply transition interpolation
    if (this._isTransitioning) {
      const t = easeOutQuad(this.transitionProgress)
      this.camera.position.lerpVectors(this.transitionStartPos, targetPosition, t)
    } else {
      this.camera.position.copy(targetPosition)
    }
    
    // Update camera look direction
    if (this._currentMode === ViewMode.FIRST_PERSON) {
      // First person: use player rotation directly
      this.camera.rotation.copy(this.player.rotation)
    } else {
      // Third person: look at player
      this.camera.lookAt(targetLookAt)
    }
    
    // Update character model
    if (this.characterModel) {
      this.characterModel.updateTransform(this.player.position, this.player.rotation)
      
      // Update animation based on player movement
      const isMoving = this.player.velocity.lengthSq() > 0.1
      this.characterModel.updateAnimation(deltaTime, isMoving)
    }
  }
  
  /**
   * Get first-person camera position (at player eye level)
   */
  private getFirstPersonPosition(): THREE.Vector3 {
    return this.player.getEyePosition()
  }
  
  /**
   * Get first-person look-at target
   */
  private getFirstPersonLookAt(): THREE.Vector3 {
    const eyePos = this.player.getEyePosition()
    const forward = new THREE.Vector3(0, 0, -1)
    forward.applyEuler(this.player.rotation)
    return eyePos.clone().add(forward)
  }
  
  /**
   * Get third-person camera position (behind and above player)
   */
  private getThirdPersonPosition(): THREE.Vector3 {
    const playerPos = this.player.position.clone()
    playerPos.y += CAMERA_HEIGHT_OFFSET
    
    // Calculate offset - camera should be BEHIND the player (opposite of facing direction)
    // Player faces -Z in local space, rotation.y rotates around Y axis
    // We want camera behind player, so we use the OPPOSITE direction
    const behindAngle = this.orbitYaw + Math.PI // Add PI to get behind direction
    
    const offset = new THREE.Vector3()
    offset.x = Math.sin(behindAngle) * Math.cos(this.orbitPitch) * this._thirdPersonDistance
    offset.y = Math.sin(this.orbitPitch) * this._thirdPersonDistance
    offset.z = Math.cos(behindAngle) * Math.cos(this.orbitPitch) * this._thirdPersonDistance
    
    const targetPos = playerPos.clone().add(offset)
    
    // Apply collision detection
    return this.handleCameraCollision(playerPos, targetPos)
  }
  
  /**
   * Get third-person look-at target (player center)
   */
  private getThirdPersonLookAt(): THREE.Vector3 {
    const lookAt = this.player.position.clone()
    lookAt.y += CAMERA_HEIGHT_OFFSET * 0.5 // Look at upper body
    return lookAt
  }
  
  /**
   * Handle camera collision with world geometry
   */
  private handleCameraCollision(from: THREE.Vector3, to: THREE.Vector3): THREE.Vector3 {
    const direction = to.clone().sub(from).normalize()
    const maxDistance = from.distanceTo(to)
    
    // Cast ray from player to target camera position
    this.raycaster.set(from, direction)
    this.raycaster.far = maxDistance
    
    // Check for block collisions along the ray
    let closestHit = maxDistance
    
    // Sample points along the ray to check for solid blocks
    const steps = Math.ceil(maxDistance * 2) // 2 checks per unit
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const checkPos = from.clone().lerp(to, t)
      
      const blockX = Math.floor(checkPos.x)
      const blockY = Math.floor(checkPos.y)
      const blockZ = Math.floor(checkPos.z)
      
      const block = this.world.getBlock(blockX, blockY, blockZ)
      
      // Check if block is solid (not air, water, etc.)
      if (block !== null && block !== 0 && block !== 8 && block !== 9) {
        // Found a solid block, calculate hit distance
        const hitDistance = from.distanceTo(checkPos) - CAMERA_COLLISION_OFFSET
        if (hitDistance < closestHit && hitDistance > MIN_CAMERA_DISTANCE) {
          closestHit = hitDistance
        }
        break
      }
    }
    
    this._actualDistance = closestHit
    
    // Return adjusted position
    return from.clone().add(direction.multiplyScalar(closestHit))
  }
  
  /**
   * Handle mouse movement for third-person orbit
   * Called from input system when in third-person mode
   */
  handleMouseMove(_deltaX: number, deltaY: number): void {
    if (this._currentMode === ViewMode.THIRD_PERSON) {
      // In third person, mouse controls orbit around player
      // But we want the player to still rotate with mouse
      // So orbit follows player rotation
      this.orbitYaw = this.player.rotation.y
      
      // Pitch can be adjusted independently
      this.orbitPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.orbitPitch + deltaY * 0.002))
    }
  }
  
  /**
   * Get the look direction for raycasting (block interaction)
   */
  getLookDirection(): THREE.Vector3 {
    const direction = new THREE.Vector3(0, 0, -1)
    direction.applyQuaternion(this.camera.quaternion)
    return direction
  }
  
  /**
   * Get the underlying Three.js camera
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }
}
