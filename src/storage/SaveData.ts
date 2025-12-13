/**
 * Save Data Types
 * Feature: 018-world-save-system
 * 
 * Defines data structures for the world save system.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Player state to be saved
 */
export interface PlayerState {
  position: { x: number; y: number; z: number }
  rotation: { yaw: number; pitch: number }
  selectedBlockIndex?: number
  characterModel?: string
}

/**
 * Complete save data structure
 */
export interface SaveData {
  /** Unique identifier (UUID v4) */
  id: string
  
  /** User-defined save name */
  name: string
  
  /** Slot type: manual (user-triggered) or auto (system-triggered) */
  slotType: 'manual' | 'auto'
  
  /** Slot number: 1-5 for manual, 0 for auto */
  slotNumber: number
  
  /** Creation timestamp (milliseconds) */
  createdAt: number
  
  /** Last update timestamp (milliseconds) */
  updatedAt: number
  
  /** World seed for terrain generation */
  seed: number
  
  /** Player state */
  playerState: PlayerState
  
  /** Play time in seconds (optional) */
  playTime?: number
}

/**
 * Chunk data stored separately from SaveData
 */
export interface ChunkData {
  /** Associated save ID */
  saveId: string
  
  /** Chunk coordinate key "cx,cy,cz" */
  chunkKey: string
  
  /** Block data (4096 bytes) */
  blocks: Uint8Array
}

/**
 * Lightweight metadata for save list display
 */
export interface SaveMetadata {
  id: string
  name: string
  slotType: 'manual' | 'auto'
  slotNumber: number
  updatedAt: number
  seed: number
}

/**
 * Result of a save operation
 */
export interface SaveResult {
  success: boolean
  saveId?: string
  error?: string
}

/**
 * Result of a load operation
 */
export interface LoadResult {
  success: boolean
  saveData?: SaveData
  chunks?: ChunkData[]
  error?: string
}

// ============================================================================
// Constants
// ============================================================================

/** Number of manual save slots */
export const MANUAL_SLOT_COUNT = 5

/** Auto-save slot number */
export const AUTO_SAVE_SLOT = 0

/** Auto-save interval in milliseconds (5 minutes) */
export const AUTO_SAVE_INTERVAL = 5 * 60 * 1000

/** IndexedDB database name */
export const DB_NAME = 'webcraft-saves'

/** IndexedDB database version */
export const DB_VERSION = 1

// ============================================================================
// Utilities
// ============================================================================

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * Extract metadata from SaveData
 */
export function toMetadata(save: SaveData): SaveMetadata {
  return {
    id: save.id,
    name: save.name,
    slotType: save.slotType,
    slotNumber: save.slotNumber,
    updatedAt: save.updatedAt,
    seed: save.seed,
  }
}
