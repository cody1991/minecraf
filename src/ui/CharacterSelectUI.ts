/**
 * CharacterSelectUI - Character selection interface
 * Feature: 013-character-model-view
 */

import { CharacterModelDefinition } from '../player/CharacterTypes'
import { CharacterPreview } from './CharacterPreview'
import { PreferenceManager } from '../player/PreferenceManager'

/**
 * Character selection events
 */
export interface CharacterSelectEvents {
  onConfirm: (modelId: string) => void
  onCancel: () => void
}

/**
 * CharacterSelectUI - UI for selecting character models
 */
export class CharacterSelectUI {
  private container: HTMLElement
  private overlay: HTMLElement | null = null
  private preview: CharacterPreview | null = null
  private models: CharacterModelDefinition[] = []
  private selectedModelId: string = 'default'
  private events: CharacterSelectEvents | null = null
  private _isVisible: boolean = false
  
  constructor() {
    this.container = document.body
  }
  
  /**
   * Set available models
   */
  setModels(models: CharacterModelDefinition[]): void {
    this.models = models
  }
  
  /**
   * Get visibility state
   */
  get isVisible(): boolean {
    return this._isVisible
  }
  
  /**
   * Show the character selection UI
   */
  show(events: CharacterSelectEvents): void {
    if (this._isVisible) return
    
    this.events = events
    this._isVisible = true
    
    // Load saved preference
    const pref = PreferenceManager.getInstance().getPreference()
    if (pref) {
      this.selectedModelId = pref.selectedModelId
    }
    
    // Create overlay
    this.overlay = document.createElement('div')
    this.overlay.id = 'character-select-overlay'
    this.overlay.innerHTML = `
      <style>
        #character-select-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        
        .character-select-panel {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 16px;
          padding: 30px;
          width: 600px;
          max-width: 90vw;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .character-select-title {
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .character-select-content {
          display: flex;
          gap: 20px;
        }
        
        .character-list {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .character-item {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid transparent;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }
        
        .character-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .character-item.selected {
          background: rgba(74, 144, 226, 0.3);
          border-color: #4a90e2;
        }
        
        .character-item-name {
          color: #fff;
          font-size: 14px;
          margin-top: 8px;
        }
        
        .character-item-color {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 0 auto;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .character-preview-container {
          width: 200px;
          height: 300px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .character-select-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 25px;
        }
        
        .character-select-btn {
          padding: 12px 30px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .character-select-btn.confirm {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
          color: #fff;
        }
        
        .character-select-btn.confirm:hover {
          background: linear-gradient(135deg, #5a9ff2 0%, #4589cd 100%);
          transform: translateY(-2px);
        }
        
        .character-select-btn.cancel {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .character-select-btn.cancel:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      </style>
      
      <div class="character-select-panel">
        <div class="character-select-title">选择角色</div>
        <div class="character-select-content">
          <div class="character-list" id="character-list"></div>
          <div class="character-preview-container" id="character-preview"></div>
        </div>
        <div class="character-select-buttons">
          <button class="character-select-btn cancel" id="btn-cancel">取消</button>
          <button class="character-select-btn confirm" id="btn-confirm">确认</button>
        </div>
      </div>
    `
    
    this.container.appendChild(this.overlay)
    
    // Create preview renderer
    const previewContainer = document.getElementById('character-preview')
    if (previewContainer) {
      this.preview = new CharacterPreview(previewContainer)
    }
    
    // Render model list
    this.renderModelList()
    
    // Setup button handlers
    const confirmBtn = document.getElementById('btn-confirm')
    const cancelBtn = document.getElementById('btn-cancel')
    
    confirmBtn?.addEventListener('click', () => this.handleConfirm())
    cancelBtn?.addEventListener('click', () => this.handleCancel())
  }
  
  /**
   * Render the model list
   */
  private renderModelList(): void {
    const listContainer = document.getElementById('character-list')
    if (!listContainer) return
    
    listContainer.innerHTML = ''
    
    for (const model of this.models) {
      const item = document.createElement('div')
      item.className = `character-item ${model.id === this.selectedModelId ? 'selected' : ''}`
      item.dataset.modelId = model.id
      
      item.innerHTML = `
        <div class="character-item-color" style="background-color: #${model.colors.body.toString(16).padStart(6, '0')}"></div>
        <div class="character-item-name">${model.name}</div>
      `
      
      item.addEventListener('click', () => this.selectModel(model))
      listContainer.appendChild(item)
    }
    
    // Show initial preview
    const initialModel = this.models.find(m => m.id === this.selectedModelId) || this.models[0]
    if (initialModel && this.preview) {
      this.preview.setModel(initialModel)
    }
  }
  
  /**
   * Select a model
   */
  private selectModel(model: CharacterModelDefinition): void {
    this.selectedModelId = model.id
    
    // Update selection UI
    const items = document.querySelectorAll('.character-item')
    items.forEach(item => {
      const element = item as HTMLElement
      element.classList.toggle('selected', element.dataset.modelId === model.id)
    })
    
    // Update preview
    if (this.preview) {
      this.preview.setModel(model)
    }
  }
  
  /**
   * Handle confirm button
   */
  private handleConfirm(): void {
    // Save preference
    PreferenceManager.getInstance().savePreference(this.selectedModelId)
    
    // Call event handler
    if (this.events) {
      this.events.onConfirm(this.selectedModelId)
    }
    
    this.hide()
  }
  
  /**
   * Handle cancel button
   */
  private handleCancel(): void {
    if (this.events) {
      this.events.onCancel()
    }
    
    this.hide()
  }
  
  /**
   * Hide the UI
   */
  hide(): void {
    if (!this._isVisible) return
    
    this._isVisible = false
    
    // Dispose preview
    if (this.preview) {
      this.preview.dispose()
      this.preview = null
    }
    
    // Remove overlay
    if (this.overlay && this.overlay.parentElement) {
      this.overlay.parentElement.removeChild(this.overlay)
      this.overlay = null
    }
    
    this.events = null
  }
  
  /**
   * Dispose of UI resources
   */
  dispose(): void {
    this.hide()
  }
}
