/**
 * IndexedDB Storage Layer
 * Feature: 018-world-save-system
 * 
 * Low-level wrapper for IndexedDB operations.
 */

import { SaveData, ChunkData, DB_NAME, DB_VERSION } from './SaveData'

/**
 * IndexedDB storage wrapper for save data
 */
export class IndexedDBStorage {
  private db: IDBDatabase | null = null
  private initPromise: Promise<boolean> | null = null

  /**
   * Check if IndexedDB is supported
   */
  static isSupported(): boolean {
    return 'indexedDB' in window && window.indexedDB !== null
  }

  /**
   * Initialize the database
   */
  async initialize(): Promise<boolean> {
    // Return existing promise if already initializing
    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = this.doInitialize()
    return this.initPromise
  }

  private async doInitialize(): Promise<boolean> {
    if (!IndexedDBStorage.isSupported()) {
      console.error('[IndexedDBStorage] IndexedDB not supported')
      return false
    }

    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.error('[IndexedDBStorage] Failed to open database:', request.error)
        resolve(false)
      }

      request.onsuccess = () => {
        this.db = request.result
        console.log('[IndexedDBStorage] Database opened successfully')
        resolve(true)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create saves object store
        if (!db.objectStoreNames.contains('saves')) {
          const savesStore = db.createObjectStore('saves', { keyPath: 'id' })
          savesStore.createIndex('slotType', 'slotType', { unique: false })
          savesStore.createIndex('slotNumber', 'slotNumber', { unique: false })
          savesStore.createIndex('updatedAt', 'updatedAt', { unique: false })
        }

        // Create chunks object store with composite key
        if (!db.objectStoreNames.contains('chunks')) {
          const chunksStore = db.createObjectStore('chunks', { keyPath: ['saveId', 'chunkKey'] })
          chunksStore.createIndex('saveId', 'saveId', { unique: false })
        }

        console.log('[IndexedDBStorage] Database schema created/upgraded')
      }
    })
  }

  /**
   * Ensure database is ready
   */
  private ensureDB(): IDBDatabase {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.')
    }
    return this.db
  }

  // ============================================================================
  // Save Operations
  // ============================================================================

  /**
   * Store save data
   */
  async putSave(save: SaveData): Promise<void> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['saves'], 'readwrite')
      const store = transaction.objectStore('saves')
      const request = store.put(save)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Get save data by ID
   */
  async getSave(id: string): Promise<SaveData | null> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['saves'], 'readonly')
      const store = transaction.objectStore('saves')
      const request = store.get(id)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Get all saves
   */
  async getAllSaves(): Promise<SaveData[]> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['saves'], 'readonly')
      const store = transaction.objectStore('saves')
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Get save by slot number
   */
  async getSaveBySlot(slotNumber: number): Promise<SaveData | null> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['saves'], 'readonly')
      const store = transaction.objectStore('saves')
      const index = store.index('slotNumber')
      const request = index.get(slotNumber)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Delete save by ID
   */
  async deleteSave(id: string): Promise<void> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['saves'], 'readwrite')
      const store = transaction.objectStore('saves')
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // ============================================================================
  // Chunk Operations
  // ============================================================================

  /**
   * Store chunk data
   */
  async putChunk(chunk: ChunkData): Promise<void> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['chunks'], 'readwrite')
      const store = transaction.objectStore('chunks')
      const request = store.put(chunk)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Store multiple chunks (batch operation)
   */
  async putChunks(chunks: ChunkData[]): Promise<void> {
    if (chunks.length === 0) return

    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['chunks'], 'readwrite')
      const store = transaction.objectStore('chunks')

      let completed = 0
      let hasError = false

      for (const chunk of chunks) {
        const request = store.put(chunk)
        
        request.onsuccess = () => {
          completed++
          if (completed === chunks.length && !hasError) {
            resolve()
          }
        }
        
        request.onerror = () => {
          if (!hasError) {
            hasError = true
            reject(request.error)
          }
        }
      }
    })
  }

  /**
   * Get all chunks for a save
   */
  async getChunksBySaveId(saveId: string): Promise<ChunkData[]> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['chunks'], 'readonly')
      const store = transaction.objectStore('chunks')
      const index = store.index('saveId')
      const request = index.getAll(saveId)

      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Delete all chunks for a save
   */
  async deleteChunksBySaveId(saveId: string): Promise<void> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['chunks'], 'readwrite')
      const store = transaction.objectStore('chunks')
      const index = store.index('saveId')
      const request = index.openCursor(IDBKeyRange.only(saveId))

      request.onsuccess = () => {
        const cursor = request.result
        if (cursor) {
          cursor.delete()
          cursor.continue()
        } else {
          resolve()
        }
      }

      request.onerror = () => reject(request.error)
    })
  }

  // ============================================================================
  // Utility Operations
  // ============================================================================

  /**
   * Clear all data (for testing/reset)
   */
  async clearAll(): Promise<void> {
    const db = this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['saves', 'chunks'], 'readwrite')
      
      const savesRequest = transaction.objectStore('saves').clear()
      const chunksRequest = transaction.objectStore('chunks').clear()

      let completed = 0
      const onComplete = () => {
        completed++
        if (completed === 2) resolve()
      }

      savesRequest.onsuccess = onComplete
      chunksRequest.onsuccess = onComplete
      
      transaction.onerror = () => reject(transaction.error)
    })
  }

  /**
   * Get storage estimate
   */
  async getStorageEstimate(): Promise<{ usage: number; quota: number } | null> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
      }
    }
    return null
  }

  /**
   * Close the database connection
   */
  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
      this.initPromise = null
    }
  }
}
