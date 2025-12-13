/**
 * SaveManager - Core save/load functionality
 * Feature: 018-world-save-system
 * 
 * Manages saving and loading game state to IndexedDB.
 */

import { IndexedDBStorage } from './IndexedDBStorage'
import {
  SaveData,
  SaveMetadata,
  ChunkData,
  PlayerState,
  SaveResult,
  LoadResult,
  generateUUID,
  toMetadata,
  MANUAL_SLOT_COUNT,
  AUTO_SAVE_SLOT,
} from './SaveData'

/**
 * World data required for saving
 */
export interface WorldSaveData {
  seed: number
  playerState: PlayerState
  modifiedChunks: Array<{ key: string; blocks: Uint8Array }>
}

/**
 * SaveManager - handles all save/load operations
 */
export class SaveManager {
  private storage: IndexedDBStorage
  private initialized: boolean = false
  private saveLock: boolean = false

  constructor() {
    this.storage = new IndexedDBStorage()
  }

  /**
   * Initialize the save system
   */
  async initialize(): Promise<boolean> {
    if (this.initialized) return true

    const success = await this.storage.initialize()
    this.initialized = success

    if (success) {
      console.log('[SaveManager] Initialized successfully')
    } else {
      console.error('[SaveManager] Failed to initialize')
    }

    return success
  }

  /**
   * Check if save system is supported
   */
  isSupported(): boolean {
    return IndexedDBStorage.isSupported()
  }

  /**
   * Check if save system is initialized
   */
  isInitialized(): boolean {
    return this.initialized
  }

  // ============================================================================
  // Save Operations
  // ============================================================================

  /**
   * Save current game state to a slot
   * @param slotNumber Slot number (1-5 for manual, 0 for auto)
   * @param name Save name
   * @param worldData World data to save
   */
  async save(
    slotNumber: number,
    name: string,
    worldData: WorldSaveData
  ): Promise<SaveResult> {
    if (!this.initialized) {
      return { success: false, error: 'Save system not initialized' }
    }

    // Validate slot number
    if (slotNumber < 0 || slotNumber > MANUAL_SLOT_COUNT) {
      return { success: false, error: `Invalid slot number: ${slotNumber}` }
    }

    // Validate name
    const trimmedName = name.trim()
    if (!trimmedName || trimmedName.length > 50) {
      return { success: false, error: 'Save name must be 1-50 characters' }
    }

    // Check save lock
    if (this.saveLock) {
      return { success: false, error: 'Another save operation is in progress' }
    }

    this.saveLock = true

    try {
      const slotType = slotNumber === AUTO_SAVE_SLOT ? 'auto' : 'manual'
      const now = Date.now()

      // Check if slot already has a save
      const existingSave = await this.storage.getSaveBySlot(slotNumber)
      
      let saveId: string
      let createdAt: number

      if (existingSave) {
        // Update existing save
        saveId = existingSave.id
        createdAt = existingSave.createdAt
        
        // Delete old chunks
        await this.storage.deleteChunksBySaveId(saveId)
      } else {
        // Create new save
        saveId = generateUUID()
        createdAt = now
      }

      // Create save data
      const saveData: SaveData = {
        id: saveId,
        name: trimmedName,
        slotType,
        slotNumber,
        createdAt,
        updatedAt: now,
        seed: worldData.seed,
        playerState: worldData.playerState,
      }

      // Store save data
      await this.storage.putSave(saveData)

      // Store chunks in batches
      const chunkBatchSize = 10
      const chunks: ChunkData[] = worldData.modifiedChunks.map((chunk) => ({
        saveId,
        chunkKey: chunk.key,
        blocks: chunk.blocks,
      }))

      for (let i = 0; i < chunks.length; i += chunkBatchSize) {
        const batch = chunks.slice(i, i + chunkBatchSize)
        await this.storage.putChunks(batch)
      }

      console.log(`[SaveManager] Saved to slot ${slotNumber}: "${trimmedName}" (${chunks.length} chunks)`)

      return { success: true, saveId }
    } catch (error) {
      console.error('[SaveManager] Save failed:', error)
      return { success: false, error: String(error) }
    } finally {
      this.saveLock = false
    }
  }

  // ============================================================================
  // Load Operations
  // ============================================================================

  /**
   * Load a save by ID
   */
  async load(saveId: string): Promise<LoadResult> {
    if (!this.initialized) {
      return { success: false, error: 'Save system not initialized' }
    }

    try {
      // Get save data
      const saveData = await this.storage.getSave(saveId)
      if (!saveData) {
        return { success: false, error: 'Save not found' }
      }

      // Get chunks
      const chunks = await this.storage.getChunksBySaveId(saveId)

      console.log(`[SaveManager] Loaded save: "${saveData.name}" (${chunks.length} chunks)`)

      return { success: true, saveData, chunks }
    } catch (error) {
      console.error('[SaveManager] Load failed:', error)
      return { success: false, error: String(error) }
    }
  }

  // ============================================================================
  // List Operations
  // ============================================================================

  /**
   * Get all saves as metadata (sorted by updatedAt descending)
   */
  async listSaves(): Promise<SaveMetadata[]> {
    if (!this.initialized) {
      return []
    }

    try {
      const saves = await this.storage.getAllSaves()
      const metadata = saves.map(toMetadata)
      
      // Sort by updatedAt descending
      metadata.sort((a, b) => b.updatedAt - a.updatedAt)
      
      return metadata
    } catch (error) {
      console.error('[SaveManager] Failed to list saves:', error)
      return []
    }
  }

  /**
   * Get save metadata by slot number
   */
  async getSlot(slotNumber: number): Promise<SaveMetadata | null> {
    if (!this.initialized) {
      return null
    }

    try {
      const save = await this.storage.getSaveBySlot(slotNumber)
      return save ? toMetadata(save) : null
    } catch (error) {
      console.error('[SaveManager] Failed to get slot:', error)
      return null
    }
  }

  /**
   * Get auto-save metadata
   */
  async getAutoSave(): Promise<SaveMetadata | null> {
    return this.getSlot(AUTO_SAVE_SLOT)
  }

  // ============================================================================
  // Management Operations
  // ============================================================================

  /**
   * Rename a save
   */
  async rename(saveId: string, newName: string): Promise<boolean> {
    if (!this.initialized) {
      return false
    }

    const trimmedName = newName.trim()
    if (!trimmedName || trimmedName.length > 50) {
      return false
    }

    try {
      const save = await this.storage.getSave(saveId)
      if (!save) {
        return false
      }

      save.name = trimmedName
      save.updatedAt = Date.now()
      await this.storage.putSave(save)

      console.log(`[SaveManager] Renamed save to: "${trimmedName}"`)
      return true
    } catch (error) {
      console.error('[SaveManager] Rename failed:', error)
      return false
    }
  }

  /**
   * Delete a save and its chunks
   */
  async delete(saveId: string): Promise<boolean> {
    if (!this.initialized) {
      return false
    }

    try {
      // Delete chunks first
      await this.storage.deleteChunksBySaveId(saveId)
      
      // Delete save data
      await this.storage.deleteSave(saveId)

      console.log(`[SaveManager] Deleted save: ${saveId}`)
      return true
    } catch (error) {
      console.error('[SaveManager] Delete failed:', error)
      return false
    }
  }

  // ============================================================================
  // Utility Operations
  // ============================================================================

  /**
   * Check if a save operation is in progress
   */
  isSaving(): boolean {
    return this.saveLock
  }

  /**
   * Get storage usage estimate
   */
  async getStorageEstimate(): Promise<{ usage: number; quota: number } | null> {
    return this.storage.getStorageEstimate()
  }

  /**
   * Close the save manager
   */
  close(): void {
    this.storage.close()
    this.initialized = false
  }
}
