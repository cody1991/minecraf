import * as THREE from 'three'

/**
 * Renderer class - wraps Three.js WebGLRenderer
 * Feature: 008-biome-weather-system - Added dynamic lighting support
 */
export class Renderer {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private container: HTMLElement
  private ambientLight: THREE.AmbientLight
  private directionalLight: THREE.DirectionalLight

  // Base light intensities
  private readonly baseAmbientIntensity = 0.6
  private readonly baseDirectionalIntensity = 0.8

  constructor(container: HTMLElement) {
    this.container = container

    // Create scene
    this.scene = new THREE.Scene()
    // Background will be handled by SkyRenderer
    this.scene.background = null

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance'
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.renderer.domElement)

    // Add ambient light
    this.ambientLight = new THREE.AmbientLight(0xffffff, this.baseAmbientIntensity)
    this.scene.add(this.ambientLight)

    // Add directional light (sun)
    this.directionalLight = new THREE.DirectionalLight(0xffffff, this.baseDirectionalIntensity)
    this.directionalLight.position.set(50, 100, 50)
    this.scene.add(this.directionalLight)

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  /**
   * Handle window resize
   */
  private handleResize(): void {
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    this.renderer.setSize(width, height)
  }

  /**
   * Set ambient light intensity multiplier (0-1)
   */
  setAmbientIntensity(multiplier: number): void {
    this.ambientLight.intensity = this.baseAmbientIntensity * multiplier
    this.directionalLight.intensity = this.baseDirectionalIntensity * multiplier
  }

  /**
   * Set directional light position (for sun position)
   */
  setSunPosition(x: number, y: number, z: number): void {
    this.directionalLight.position.set(x, y, z)
  }

  /**
   * Get the Three.js scene
   */
  getScene(): THREE.Scene {
    return this.scene
  }

  /**
   * Get the renderer DOM element
   */
  getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement
  }

  /**
   * Render the scene with the given camera
   */
  render(camera: THREE.Camera): void {
    this.renderer.render(this.scene, camera)
  }

  /**
   * Add an object to the scene
   */
  add(object: THREE.Object3D): void {
    this.scene.add(object)
  }

  /**
   * Remove an object from the scene
   */
  remove(object: THREE.Object3D): void {
    this.scene.remove(object)
  }

  /**
   * Get current canvas size
   */
  getSize(): { width: number; height: number } {
    return {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    }
  }

  /**
   * Dispose of renderer resources
   */
  dispose(): void {
    window.removeEventListener('resize', this.handleResize.bind(this))
    this.renderer.dispose()
  }
}
