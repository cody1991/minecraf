/**
 * AutoSave - Automatic save functionality
 * Feature: 018-world-save-system
 * 
 * Handles automatic saving at regular intervals.
 */

import { SaveManager, WorldSaveData } from './SaveManager'
import { SaveResult, AUTO_SAVE_INTERVAL, AUTO_SAVE_SLOT } from './SaveData'

/**
 * AutoSave - manages automatic saving
 */
export class AutoSave {
  private saveManager: SaveManager
  private dataProvider: (() => WorldSaveData) | null = null
  private onComplete: ((result: SaveResult) => void) | null = null
  private intervalId: ReturnType<typeof setInterval> | null = null
  private running: boolean = false

  constructor(saveManager: SaveManager) {
    this.saveManager = saveManager
  }

  /**
   * Set the data provider function
   */
  setDataProvider(provider: () => WorldSaveData): void {
    this.dataProvider = provider
  }

  /**
   * Set callback for save completion
   */
  onSaveComplete(callback: (result: SaveResult) => void): void {
    this.onComplete = callback
  }

  /**
   * Start auto-save timer
   * @param intervalMs Interval in milliseconds (default: 5 minutes)
   */
  start(intervalMs: number = AUTO_SAVE_INTERVAL): void {
    if (this.running) {
      console.log('[AutoSave] Already running')
      return
    }

    this.running = true
    console.log(`[AutoSave] Started with interval: ${intervalMs / 1000}s`)

    this.intervalId = setInterval(() => {
      this.saveNow()
    }, intervalMs)
  }

  /**
   * Stop auto-save timer
   */
  stop(): void {
    if (!this.running) return

    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    this.running = false
    console.log('[AutoSave] Stopped')
  }

  /**
   * Check if auto-save is running
   */
  isRunning(): boolean {
    return this.running
  }

  /**
   * Trigger an immediate auto-save
   */
  async saveNow(): Promise<SaveResult> {
    if (!this.dataProvider) {
      const result: SaveResult = { success: false, error: 'No data provider set' }
      return result
    }

    if (this.saveManager.isSaving()) {
      const result: SaveResult = { success: false, error: 'Another save in progress' }
      return result
    }

    console.log('[AutoSave] Triggering auto-save...')

    try {
      const worldData = this.dataProvider()
      const result = await this.saveManager.save(AUTO_SAVE_SLOT, '自动存档', worldData)

      if (this.onComplete) {
        this.onComplete(result)
      }

      return result
    } catch (error) {
      const result: SaveResult = { success: false, error: String(error) }
      if (this.onComplete) {
        this.onComplete(result)
      }
      return result
    }
  }

  /**
   * Dispose of the auto-save manager
   */
  dispose(): void {
    this.stop()
    this.dataProvider = null
    this.onComplete = null
  }
}
