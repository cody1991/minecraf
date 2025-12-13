import * as THREE from 'three'
import { Player } from '../player/Player'
import { Raycaster, INTERACTION_DISTANCE } from '../utils/Raycaster'
import { World } from '../core/World'

/**
 * TargetIndicator - 3D wireframe cube that shows the targeted block
 * Used in third-person view to show where the player is looking
 */
export class TargetIndicator {
  private mesh: THREE.LineSegments
  private scene: THREE.Scene
  private player: Player
  private raycaster: Raycaster
  private visible: boolean = false

  constructor(scene: THREE.Scene, player: Player, world: World) {
    this.scene = scene
    this.player = player
    this.raycaster = new Raycaster(world)

    // Create wireframe cube geometry (slightly larger than 1x1x1 to avoid z-fighting)
    const size = 1.002
    const geometry = new THREE.BoxGeometry(size, size, size)
    const edges = new THREE.EdgesGeometry(geometry)
    
    // Create line material with bright yellow color (like Minecraft)
    const material = new THREE.LineBasicMaterial({
      color: 0xffff00,
      linewidth: 2,
      transparent: true,
      opacity: 1.0
    })

    this.mesh = new THREE.LineSegments(edges, material)
    this.mesh.visible = false
    this.scene.add(this.mesh)
  }

  /**
   * Update the indicator position based on player's look direction
   */
  update(): void {
    if (!this.visible) {
      this.mesh.visible = false
      return
    }

    // Cast ray from player's eye position in look direction
    const origin = this.player.getEyePosition()
    const direction = this.player.getLookDirection()
    const hit = this.raycaster.cast(origin, direction)

    if (hit && hit.distance <= INTERACTION_DISTANCE) {
      // Position the wireframe at the center of the targeted block
      this.mesh.position.set(
        hit.blockX + 0.5,
        hit.blockY + 0.5,
        hit.blockZ + 0.5
      )
      this.mesh.visible = true
    } else {
      this.mesh.visible = false
    }
  }

  /**
   * Set visibility of the indicator
   */
  setVisible(visible: boolean): void {
    this.visible = visible
    if (!visible) {
      this.mesh.visible = false
    }
  }

  /**
   * Check if indicator is visible
   */
  isVisible(): boolean {
    return this.visible
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    ;(this.mesh.material as THREE.Material).dispose()
  }
}
