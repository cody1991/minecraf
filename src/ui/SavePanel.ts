/**
 * SavePanel - Save/Load UI Component
 * Feature: 018-world-save-system
 * 
 * Provides UI for managing game saves.
 */

import { SaveManager, WorldSaveData } from '../storage/SaveManager'
import { SaveMetadata, SaveResult, formatTimestamp, MANUAL_SLOT_COUNT, AUTO_SAVE_SLOT } from '../storage/SaveData'

/**
 * Callbacks for save panel actions
 */
export interface SavePanelCallbacks {
  onSave: (slotNumber: number, name: string) => Promise<SaveResult>
  onLoad: (saveId: string) => Promise<void>
  onDelete: (saveId: string) => Promise<boolean>
  onRename: (saveId: string, newName: string) => Promise<boolean>
  onNewWorld: () => Promise<void>
  getWorldData: () => WorldSaveData
}

/**
 * SavePanel - UI for save/load operations
 */
export class SavePanel {
  private container: HTMLElement
  private saveManager: SaveManager
  private callbacks: SavePanelCallbacks | null = null
  private isVisible: boolean = false
  private isLoading: boolean = false
  private saves: SaveMetadata[] = []

  constructor(saveManager: SaveManager) {
    this.saveManager = saveManager
    this.container = this.createUI()
    document.body.appendChild(this.container)
  }

  /**
   * Set callbacks for panel actions
   */
  setCallbacks(callbacks: SavePanelCallbacks): void {
    this.callbacks = callbacks
  }

  /**
   * Create the panel UI
   */
  private createUI(): HTMLElement {
    const container = document.createElement('div')
    container.id = 'save-panel'
    container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      max-height: 80vh;
      background: rgba(0, 0, 0, 0.9);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      padding: 16px;
      display: none;
      flex-direction: column;
      gap: 12px;
      z-index: 2000;
      font-family: sans-serif;
      color: white;
      pointer-events: auto;
    `

    // Header
    const header = document.createElement('div')
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    `

    const title = document.createElement('h2')
    title.textContent = '存档管理'
    title.style.cssText = `
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    `
    header.appendChild(title)

    const closeBtn = document.createElement('button')
    closeBtn.textContent = '✕'
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
      opacity: 0.7;
      transition: opacity 0.2s;
    `
    closeBtn.addEventListener('click', () => this.hide())
    closeBtn.addEventListener('mouseenter', () => { closeBtn.style.opacity = '1' })
    closeBtn.addEventListener('mouseleave', () => { closeBtn.style.opacity = '0.7' })
    header.appendChild(closeBtn)

    container.appendChild(header)

    // Slots container
    const slotsContainer = document.createElement('div')
    slotsContainer.id = 'save-slots'
    slotsContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
      max-height: 400px;
    `
    container.appendChild(slotsContainer)

    // Actions container
    const actionsContainer = document.createElement('div')
    actionsContainer.style.cssText = `
      display: flex;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    `

    const newWorldBtn = this.createButton('新建世界', 'warning')
    newWorldBtn.addEventListener('click', () => this.handleNewWorld())
    actionsContainer.appendChild(newWorldBtn)

    container.appendChild(actionsContainer)

    return container
  }

  /**
   * Create a styled button
   */
  private createButton(text: string, type: 'primary' | 'secondary' | 'danger' | 'warning' = 'secondary'): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.textContent = text
    
    const colors = {
      primary: { bg: 'rgba(76, 175, 80, 0.8)', hover: 'rgba(76, 175, 80, 1)' },
      secondary: { bg: 'rgba(255, 255, 255, 0.1)', hover: 'rgba(255, 255, 255, 0.2)' },
      danger: { bg: 'rgba(244, 67, 54, 0.8)', hover: 'rgba(244, 67, 54, 1)' },
      warning: { bg: 'rgba(255, 152, 0, 0.8)', hover: 'rgba(255, 152, 0, 1)' },
    }
    
    const color = colors[type]
    
    btn.style.cssText = `
      background: ${color.bg};
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      color: white;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;
      flex: 1;
    `
    btn.addEventListener('mouseenter', () => { btn.style.background = color.hover })
    btn.addEventListener('mouseleave', () => { btn.style.background = color.bg })
    
    return btn
  }

  /**
   * Render save slots
   */
  private renderSlots(): void {
    const slotsContainer = document.getElementById('save-slots')
    if (!slotsContainer) return

    slotsContainer.innerHTML = ''

    // Auto-save slot
    const autoSave = this.saves.find(s => s.slotType === 'auto')
    slotsContainer.appendChild(this.createSlotElement(AUTO_SAVE_SLOT, autoSave, true))

    // Manual save slots
    for (let i = 1; i <= MANUAL_SLOT_COUNT; i++) {
      const save = this.saves.find(s => s.slotNumber === i && s.slotType === 'manual')
      slotsContainer.appendChild(this.createSlotElement(i, save, false))
    }
  }

  /**
   * Create a slot element
   */
  private createSlotElement(slotNumber: number, save: SaveMetadata | undefined, isAuto: boolean): HTMLElement {
    const slot = document.createElement('div')
    slot.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `

    // Slot header
    const header = document.createElement('div')
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
    `

    const slotLabel = document.createElement('span')
    slotLabel.textContent = isAuto ? '自动存档' : `槽位 ${slotNumber}`
    slotLabel.style.cssText = `
      font-weight: bold;
      color: ${isAuto ? '#FFA726' : '#90CAF9'};
    `
    header.appendChild(slotLabel)

    if (save) {
      const timestamp = document.createElement('span')
      timestamp.textContent = formatTimestamp(save.updatedAt)
      timestamp.style.cssText = `
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      `
      header.appendChild(timestamp)
    }

    slot.appendChild(header)

    if (save) {
      // Save info
      const info = document.createElement('div')
      info.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 4px;
      `

      const nameRow = document.createElement('div')
      nameRow.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
      `

      const nameSpan = document.createElement('span')
      nameSpan.textContent = save.name
      nameSpan.style.fontSize = '14px'
      nameRow.appendChild(nameSpan)

      if (!isAuto) {
        const renameBtn = document.createElement('button')
        renameBtn.textContent = '✏️'
        renameBtn.title = '重命名'
        renameBtn.style.cssText = `
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          padding: 2px;
          opacity: 0.7;
        `
        renameBtn.addEventListener('click', () => this.handleRename(save))
        nameRow.appendChild(renameBtn)
      }

      info.appendChild(nameRow)

      const seedSpan = document.createElement('span')
      seedSpan.textContent = `种子: ${save.seed}`
      seedSpan.style.cssText = `
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
      `
      info.appendChild(seedSpan)

      slot.appendChild(info)

      // Actions
      const actions = document.createElement('div')
      actions.style.cssText = `
        display: flex;
        gap: 8px;
        margin-top: 4px;
      `

      const loadBtn = this.createButton('加载', 'primary')
      loadBtn.addEventListener('click', () => this.handleLoad(save))
      actions.appendChild(loadBtn)

      if (!isAuto) {
        const saveBtn = this.createButton('覆盖保存', 'secondary')
        saveBtn.addEventListener('click', () => this.handleSave(slotNumber, save.name))
        actions.appendChild(saveBtn)

        const deleteBtn = this.createButton('删除', 'danger')
        deleteBtn.addEventListener('click', () => this.handleDelete(save))
        actions.appendChild(deleteBtn)
      }

      slot.appendChild(actions)
    } else {
      // Empty slot
      if (!isAuto) {
        const emptyLabel = document.createElement('span')
        emptyLabel.textContent = '空槽位'
        emptyLabel.style.cssText = `
          color: rgba(255, 255, 255, 0.4);
          font-style: italic;
        `
        slot.appendChild(emptyLabel)

        const saveBtn = this.createButton('保存到此槽位', 'primary')
        saveBtn.addEventListener('click', () => this.handleSaveNew(slotNumber))
        slot.appendChild(saveBtn)
      } else {
        const emptyLabel = document.createElement('span')
        emptyLabel.textContent = '暂无自动存档'
        emptyLabel.style.cssText = `
          color: rgba(255, 255, 255, 0.4);
          font-style: italic;
        `
        slot.appendChild(emptyLabel)
      }
    }

    return slot
  }

  // ============================================================================
  // Event Handlers
  // ============================================================================

  private async handleSaveNew(slotNumber: number): Promise<void> {
    const name = prompt('请输入存档名称:', `存档 ${slotNumber}`)
    if (!name) return

    await this.handleSave(slotNumber, name)
  }

  private async handleSave(slotNumber: number, defaultName: string): Promise<void> {
    if (!this.callbacks || this.isLoading) return

    const existingSave = this.saves.find(s => s.slotNumber === slotNumber && s.slotType === 'manual')
    
    if (existingSave) {
      const confirmed = confirm(`确定要覆盖存档 "${existingSave.name}" 吗？`)
      if (!confirmed) return
    }

    this.setLoading(true)

    try {
      const result = await this.callbacks.onSave(slotNumber, defaultName)
      if (result.success) {
        this.showToast('保存成功', 'success')
        await this.refresh()
      } else {
        this.showToast(`保存失败: ${result.error}`, 'error')
      }
    } catch (error) {
      this.showToast(`保存失败: ${error}`, 'error')
    } finally {
      this.setLoading(false)
    }
  }

  private async handleLoad(save: SaveMetadata): Promise<void> {
    if (!this.callbacks || this.isLoading) return

    const confirmed = confirm(`确定要加载存档 "${save.name}" 吗？\n当前未保存的进度将丢失。`)
    if (!confirmed) return

    this.setLoading(true)

    try {
      await this.callbacks.onLoad(save.id)
      this.showToast('加载成功', 'success')
      this.hide()
    } catch (error) {
      this.showToast(`加载失败: ${error}`, 'error')
    } finally {
      this.setLoading(false)
    }
  }

  private async handleDelete(save: SaveMetadata): Promise<void> {
    if (!this.callbacks || this.isLoading) return

    const confirmed = confirm(`确定要删除存档 "${save.name}" 吗？\n此操作无法撤销。`)
    if (!confirmed) return

    this.setLoading(true)

    try {
      const success = await this.callbacks.onDelete(save.id)
      if (success) {
        this.showToast('删除成功', 'success')
        await this.refresh()
      } else {
        this.showToast('删除失败', 'error')
      }
    } catch (error) {
      this.showToast(`删除失败: ${error}`, 'error')
    } finally {
      this.setLoading(false)
    }
  }

  private async handleRename(save: SaveMetadata): Promise<void> {
    if (!this.callbacks || this.isLoading) return

    const newName = prompt('请输入新名称:', save.name)
    if (!newName || newName === save.name) return

    this.setLoading(true)

    try {
      const success = await this.callbacks.onRename(save.id, newName)
      if (success) {
        this.showToast('重命名成功', 'success')
        await this.refresh()
      } else {
        this.showToast('重命名失败', 'error')
      }
    } catch (error) {
      this.showToast(`重命名失败: ${error}`, 'error')
    } finally {
      this.setLoading(false)
    }
  }

  private async handleNewWorld(): Promise<void> {
    if (!this.callbacks || this.isLoading) return

    const confirmed = confirm('确定要创建新世界吗？\n当前未保存的进度将丢失。')
    if (!confirmed) return

    this.setLoading(true)

    try {
      await this.callbacks.onNewWorld()
      this.showToast('新世界已创建', 'success')
      this.hide()
    } catch (error) {
      this.showToast(`创建失败: ${error}`, 'error')
    } finally {
      this.setLoading(false)
    }
  }

  // ============================================================================
  // UI State
  // ============================================================================

  private setLoading(loading: boolean): void {
    this.isLoading = loading
    this.container.style.opacity = loading ? '0.7' : '1'
    this.container.style.pointerEvents = loading ? 'none' : 'auto'
  }

  private showToast(message: string, type: 'success' | 'error' | 'info'): void {
    const toast = document.createElement('div')
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      border-radius: 4px;
      color: white;
      font-family: sans-serif;
      font-size: 14px;
      z-index: 3000;
      animation: fadeIn 0.3s ease;
      background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 
                   type === 'error' ? 'rgba(244, 67, 54, 0.9)' : 
                   'rgba(33, 150, 243, 0.9)'};
    `

    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.opacity = '0'
      toast.style.transition = 'opacity 0.3s'
      setTimeout(() => toast.remove(), 300)
    }, 2000)
  }

  // ============================================================================
  // Public API
  // ============================================================================

  /**
   * Show the panel
   */
  async show(): Promise<void> {
    if (this.isVisible) return

    this.isVisible = true
    this.container.style.display = 'flex'
    await this.refresh()
  }

  /**
   * Hide the panel
   */
  hide(): void {
    if (!this.isVisible) return

    this.isVisible = false
    this.container.style.display = 'none'
  }

  /**
   * Toggle panel visibility
   */
  async toggle(): Promise<void> {
    if (this.isVisible) {
      this.hide()
    } else {
      await this.show()
    }
  }

  /**
   * Check if panel is visible
   */
  isOpen(): boolean {
    return this.isVisible
  }

  /**
   * Refresh the save list
   */
  async refresh(): Promise<void> {
    this.saves = await this.saveManager.listSaves()
    this.renderSlots()
  }

  /**
   * Dispose of the panel
   */
  dispose(): void {
    this.container.remove()
  }
}
