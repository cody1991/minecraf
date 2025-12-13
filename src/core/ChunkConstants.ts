/**
 * Chunk System Constants and Types
 * Feature: 002-chunk-terrain-system
 */

// =============================================================================
// Chunk Dimensions
// =============================================================================

/** Size of a chunk in blocks (X, Y, Z dimensions are all equal) */
export const CHUNK_SIZE = 16

/** Total number of blocks in a chunk (16 * 16 * 16) */
export const CHUNK_VOLUME = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE // 4096

/** World height in blocks */
export const WORLD_HEIGHT = 128

/** Number of vertical chunks (WORLD_HEIGHT / CHUNK_SIZE) */
export const VERTICAL_CHUNKS = WORLD_HEIGHT / CHUNK_SIZE // 8

/** Minimum Y coordinate (bedrock level) */
export const WORLD_MIN_Y = 0

/** Maximum Y coordinate (build limit) */
export const WORLD_MAX_Y = WORLD_HEIGHT

// =============================================================================
// Chunk State
// =============================================================================

export enum ChunkState {
  UNLOADED = 0,
  LOADING = 1,
  LOADED = 2,
  UNLOADING = 3,
}

// =============================================================================
// Chunk Coordinate Types
// =============================================================================

export interface ChunkCoord {
  readonly x: number
  readonly y: number
  readonly z: number
}

// =============================================================================
// Chunk Loading Configuration
// =============================================================================

export interface ChunkLoadConfig {
  /** Load radius in chunks (default: 8) */
  loadRadius: number
  /** Unload radius in chunks (default: 10, should be > loadRadius) */
  unloadRadius: number
  /** Maximum chunks to load per frame (default: 2) */
  maxLoadsPerFrame: number
}

export const DEFAULT_CHUNK_LOAD_CONFIG: ChunkLoadConfig = {
  loadRadius: 8,
  unloadRadius: 10,
  maxLoadsPerFrame: 2,
}

// =============================================================================
// Terrain Generation Configuration
// =============================================================================

export interface TerrainConfig {
  /** Base terrain height (default: 64) */
  baseHeight: number
  /** Height variation range (default: 32) */
  heightVariation: number
  /** Number of noise octaves (default: 4) */
  octaves: number
  /** Amplitude decay per octave (default: 0.5) */
  persistence: number
  /** Frequency growth per octave (default: 2.0) */
  lacunarity: number
  /** Base noise scale (default: 0.01) */
  scale: number
  /** Stone layer depth from surface (default: 4) */
  stoneDepth: number
  /** Dirt layer thickness (default: 3) */
  dirtDepth: number
}

export const DEFAULT_TERRAIN_CONFIG: TerrainConfig = {
  baseHeight: 64,
  heightVariation: 32,
  octaves: 4,
  persistence: 0.5,
  lacunarity: 2.0,
  scale: 0.01,
  stoneDepth: 4,
  dirtDepth: 3,
}

// =============================================================================
// Biome Generation Configuration
// =============================================================================

/** Water level height (blocks below this and above terrain are water) */
export const WATER_LEVEL = 59 // baseHeight - 5

/** Biome noise sampling scale (larger = bigger biome regions) */
export const BIOME_SCALE = 0.005

/** Spawn safe radius - area around origin forced to PLAINS biome */
export const SPAWN_SAFE_RADIUS = 60

/** Colosseum protection radius - area with flat terrain for the structure */
export const COLOSSEUM_FLAT_RADIUS = 50

// =============================================================================
// Landmark Zone Configuration (011-ancient-landmarks)
// =============================================================================

/** Landmark zone radius - expanded flat area for all ancient landmarks */
export const LANDMARK_ZONE_RADIUS = 200

/** Building default positions */
export const PYRAMID_POSITION = { x: 100, z: 0 }
export const FORBIDDEN_CITY_POSITION = { x: -70, z: 80 }
export const CASTLE_POSITION = { x: -70, z: -80 }

/** Minimum spacing between landmarks */
export const MIN_LANDMARK_SPACING = 50

// =============================================================================
// Cave Generation Configuration
// =============================================================================

export interface CaveConfig {
  /** Noise threshold for carving (default: 0.6) */
  threshold: number
  /** Noise scale (default: 0.05) */
  scale: number
  /** Minimum height for caves (default: 8) */
  minHeight: number
  /** Maximum height for caves (default: 56) */
  maxHeight: number
}

export const DEFAULT_CAVE_CONFIG: CaveConfig = {
  threshold: 0.6,
  scale: 0.05,
  minHeight: 8,
  maxHeight: 56,
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Convert chunk coordinates to a string key for Map storage
 */
export function chunkKey(x: number, y: number, z: number): string {
  return `${x},${y},${z}`
}

/**
 * Parse a chunk key back to coordinates
 */
export function parseChunkKey(key: string): ChunkCoord {
  const [x, y, z] = key.split(',').map(Number)
  return { x: x!, y: y!, z: z! }
}

/**
 * Calculate block index within a chunk from local coordinates
 * Layout: Y-major (y * 256 + z * 16 + x)
 */
export function blockIndex(localX: number, localY: number, localZ: number): number {
  return localY * 256 + localZ * 16 + localX
}

/**
 * Convert block index back to local coordinates
 */
export function indexToLocal(index: number): { x: number; y: number; z: number } {
  const y = Math.floor(index / 256)
  const z = Math.floor((index % 256) / 16)
  const x = index % 16
  return { x, y, z }
}

/**
 * Convert world coordinates to chunk coordinates
 */
export function worldToChunk(worldX: number, worldY: number, worldZ: number): ChunkCoord {
  return {
    x: Math.floor(worldX / CHUNK_SIZE),
    y: Math.floor(worldY / CHUNK_SIZE),
    z: Math.floor(worldZ / CHUNK_SIZE),
  }
}

/**
 * Convert chunk coordinates to world coordinates (corner of chunk)
 */
export function chunkToWorld(cx: number, cy: number, cz: number): { x: number; y: number; z: number } {
  return {
    x: cx * CHUNK_SIZE,
    y: cy * CHUNK_SIZE,
    z: cz * CHUNK_SIZE,
  }
}

/**
 * Get local coordinates within a chunk from world coordinates
 */
export function worldToLocal(worldX: number, worldY: number, worldZ: number): { x: number; y: number; z: number } {
  // Handle negative coordinates correctly with modulo
  const mod = (n: number, m: number) => ((n % m) + m) % m
  return {
    x: mod(Math.floor(worldX), CHUNK_SIZE),
    y: mod(Math.floor(worldY), CHUNK_SIZE),
    z: mod(Math.floor(worldZ), CHUNK_SIZE),
  }
}

/**
 * Check if chunk Y coordinate is valid
 */
export function isValidChunkY(cy: number): boolean {
  return cy >= 0 && cy < VERTICAL_CHUNKS
}

/**
 * Check if world Y coordinate is valid
 */
export function isValidWorldY(worldY: number): boolean {
  return worldY >= WORLD_MIN_Y && worldY < WORLD_MAX_Y
}

// =============================================================================
// Underwater Effect Configuration
// =============================================================================

/** Underwater fog color (deep blue) */
export const UNDERWATER_FOG_COLOR = 0x1a3a5c

/** Underwater fog density (controls visibility falloff) */
export const UNDERWATER_FOG_DENSITY = 0.04

/** Underwater visibility in blocks */
export const UNDERWATER_VISIBILITY = 16

/** Normal sky background color */
export const SKY_BACKGROUND_COLOR = 0x87ceeb
