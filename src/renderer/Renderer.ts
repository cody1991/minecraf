import * as THREE from 'three'

/**
 * Renderer class - wraps Three.js WebGLRenderer
 */
export class Renderer {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private container: HTMLElement

  constructor(container: HTMLElement) {
    this.container = container

    // Create scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x87ceeb) // Sky blue

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance'
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.renderer.domElement)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)

    // Add directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 100, 50)
    this.scene.add(directionalLight)

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
