/**
 * RainEffect - Particle-based rain effect
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { WEATHER_CONFIG } from './WeatherTypes'

/**
 * Particle-based rain effect that follows the player
 */
export class RainEffect {
  private scene: THREE.Scene
  private particles: THREE.Points
  private geometry: THREE.BufferGeometry
  private material: THREE.PointsMaterial
  private positions: Float32Array
  private velocities: Float32Array

  // Rain area dimensions
  private readonly areaWidth = 60
  private readonly areaDepth = 60
  private readonly areaHeight = 40

  // Rain properties
  private readonly fallSpeed = 25
  private readonly particleCount: number

  // Visibility
  private isVisible: boolean = false
  private intensity: number = 0

  // Player reference
  private playerPosition: THREE.Vector3 = new THREE.Vector3()
  private isPlayerSubmerged: boolean = false

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.particleCount = WEATHER_CONFIG.RAIN_PARTICLE_COUNT

    // Create geometry
    this.geometry = new THREE.BufferGeometry()
    this.positions = new Float32Array(this.particleCount * 3)
    this.velocities = new Float32Array(this.particleCount)

    // Initialize particles
    this.initializeParticles()

    // Create material
    this.material = new THREE.PointsMaterial({
      color: 0xaaaaff,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false
    })

    // Create points
    this.particles = new THREE.Points(this.geometry, this.material)
    this.particles.visible = false
    this.particles.frustumCulled = false
    this.scene.add(this.particles)
  }

  /**
   * Initialize particle positions
   */
  private initializeParticles(): void {
    for (let i = 0; i < this.particleCount; i++) {
      this.resetParticle(i)
      // Randomize initial Y position
      this.positions[i * 3 + 1] = Math.random() * this.areaHeight
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
  }

  /**
   * Reset a single particle to top
   */
  private resetParticle(index: number): void {
    const i3 = index * 3

    // Random position in rain area
    this.positions[i3] = (Math.random() - 0.5) * this.areaWidth
    this.positions[i3 + 1] = this.areaHeight
    this.positions[i3 + 2] = (Math.random() - 0.5) * this.areaDepth

    // Random fall speed variation
    this.velocities[index] = this.fallSpeed * (0.8 + Math.random() * 0.4)
  }

  /**
   * Update rain effect
   */
  update(deltaTime: number): void {
    if (!this.isVisible || this.isPlayerSubmerged) {
      this.particles.visible = false
      return
    }

    this.particles.visible = true

    // Update particle positions
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3

      // Move particle down
      const vel = this.velocities[i] ?? this.fallSpeed
      this.positions[i3 + 1] = (this.positions[i3 + 1] ?? 0) - vel * deltaTime

      // Add slight horizontal drift
      this.positions[i3] = (this.positions[i3] ?? 0) + (Math.random() - 0.5) * 0.1
      this.positions[i3 + 2] = (this.positions[i3 + 2] ?? 0) + (Math.random() - 0.5) * 0.1

      // Reset if below ground
      if ((this.positions[i3 + 1] ?? 0) < 0) {
        this.resetParticle(i)
      }
    }

    // Update buffer
    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true

    // Update position to follow player
    this.particles.position.set(
      this.playerPosition.x,
      this.playerPosition.y,
      this.playerPosition.z
    )

    // Update opacity based on intensity
    this.material.opacity = 0.6 * this.intensity
  }

  /**
   * Set visibility
   */
  setVisible(visible: boolean): void {
    this.isVisible = visible
    if (!visible) {
      this.particles.visible = false
    }
  }

  /**
   * Set rain intensity (0-1)
   */
  setIntensity(intensity: number): void {
    this.intensity = Math.max(0, Math.min(1, intensity))
  }

  /**
   * Update player position
   */
  setPlayerPosition(position: THREE.Vector3): void {
    this.playerPosition.copy(position)
  }

  /**
   * Set player submerged state (hide rain when underwater)
   */
  setPlayerSubmerged(submerged: boolean): void {
    this.isPlayerSubmerged = submerged
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
    this.scene.remove(this.particles)
  }
}
