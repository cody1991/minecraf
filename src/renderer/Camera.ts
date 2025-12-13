import * as THREE from 'three'
import { Player } from '../player/Player'

/**
 * Camera class - first-person camera that follows the player
 */
export class Camera {
  private camera: THREE.PerspectiveCamera
  private player: Player

  constructor(camera: THREE.PerspectiveCamera, player: Player) {
    this.camera = camera
    this.player = player
  }

  /**
   * Update camera position and rotation to match player
   */
  update(): void {
    // Set camera position to player eye position
    const eyePos = this.player.getEyePosition()
    this.camera.position.copy(eyePos)

    // Set camera rotation to match player rotation
    this.camera.rotation.copy(this.player.rotation)
  }

  /**
   * Get the Three.js camera
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  /**
   * Get the look direction
   */
  getLookDirection(): THREE.Vector3 {
    const direction = new THREE.Vector3(0, 0, -1)
    direction.applyQuaternion(this.camera.quaternion)
    return direction
  }
}
