/**
 * CharacterPreview - Renders character model preview in a separate scene
 * Feature: 013-character-model-view
 */

import * as THREE from 'three'
import { CharacterModelDefinition } from '../player/CharacterTypes'
import { BlockmanBuilder, BlockmanBuildResult } from '../models/blockman/BlockmanBuilder'

/**
 * CharacterPreview - Renders a rotating character model preview
 */
export class CharacterPreview {
  private container: HTMLElement
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private currentModel: BlockmanBuildResult | null = null
  private animationId: number | null = null
  
  /** Rotation state */
  private rotationY: number = 0
  private isDragging: boolean = false
  private lastMouseX: number = 0
  
  constructor(container: HTMLElement) {
    this.container = container
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0x000000, 0)
    
    // Create scene
    this.scene = new THREE.Scene()
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.set(0, 0.5, 3)
    this.camera.lookAt(0, 0, 0)
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(2, 3, 2)
    this.scene.add(directionalLight)
    
    // Setup container
    this.updateSize()
    container.appendChild(this.renderer.domElement)
    
    // Setup mouse interaction
    this.setupMouseInteraction()
    
    // Start render loop
    this.animate()
  }
  
  /**
   * Update renderer size based on container
   */
  private updateSize(): void {
    const width = this.container.clientWidth || 200
    const height = this.container.clientHeight || 200
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }
  
  /**
   * Setup mouse drag interaction for rotation
   */
  private setupMouseInteraction(): void {
    const canvas = this.renderer.domElement
    
    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true
      this.lastMouseX = e.clientX
    })
    
    canvas.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.lastMouseX
        this.rotationY += deltaX * 0.01
        this.lastMouseX = e.clientX
      }
    })
    
    canvas.addEventListener('mouseup', () => {
      this.isDragging = false
    })
    
    canvas.addEventListener('mouseleave', () => {
      this.isDragging = false
    })
  }
  
  /**
   * Set the model to preview
   */
  setModel(definition: CharacterModelDefinition): void {
    // Remove current model
    if (this.currentModel) {
      this.scene.remove(this.currentModel.mesh)
      BlockmanBuilder.dispose(this.currentModel)
    }
    
    // Build new model
    this.currentModel = BlockmanBuilder.build(definition.colors)
    this.scene.add(this.currentModel.mesh)
    
    // Reset rotation
    this.rotationY = 0
  }
  
  /**
   * Animation loop
   */
  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate)
    
    // Auto-rotate when not dragging
    if (!this.isDragging && this.currentModel) {
      this.rotationY += 0.005
    }
    
    // Apply rotation to model
    if (this.currentModel) {
      this.currentModel.mesh.rotation.y = this.rotationY
    }
    
    this.renderer.render(this.scene, this.camera)
  }
  
  /**
   * Dispose of preview resources
   */
  dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }
    
    if (this.currentModel) {
      BlockmanBuilder.dispose(this.currentModel)
    }
    
    this.renderer.dispose()
    
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)
    }
  }
}
