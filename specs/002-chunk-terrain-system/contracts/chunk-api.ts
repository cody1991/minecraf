/**
 * Chunk System Internal API Contracts
 * Feature: 002-chunk-terrain-system
 * 
 * 这些接口定义了区块系统各模块之间的契约。
 * 实现时必须遵循这些接口签名。
 */

import type * as THREE from 'three'

// =============================================================================
// Block Types (扩展自现有 Block.ts)
// =============================================================================

export enum BlockType {
  AIR = 0,
  GRASS = 1,
  DIRT = 2,
  STONE = 3,
  WOOD = 4,
  SAND = 5,
}

// =============================================================================
// Chunk Core
// =============================================================================

export const CHUNK_SIZE = 16
export const CHUNK_HEIGHT = 16  // 单个区块高度
export const WORLD_HEIGHT = 128 // 世界总高度
export const VERTICAL_CHUNKS = 8 // WORLD_HEIGHT / CHUNK_HEIGHT

export enum ChunkState {
  UNLOADED = 0,
  LOADING = 1,
  LOADED = 2,
  UNLOADING = 3,
}

export interface ChunkCoord {
  readonly x: number
  readonly y: number
  readonly z: number
}

export interface IChunk {
  readonly coord: ChunkCoord
  readonly blocks: Uint8Array // 4096 elements
  state: ChunkState
  isDirty: boolean
  
  getBlock(localX: number, localY: number, localZ: number): BlockType
  setBlock(localX: number, localY: number, localZ: number, type: BlockType): void
  
  // 渲染相关
  readonly boundingBox: THREE.Box3
  mesh: THREE.Object3D | null
}

// =============================================================================
// World Interface
// =============================================================================

export interface IWorld {
  readonly seed: number
  
  // 方块操作（世界坐标）
  getBlock(x: number, y: number, z: number): BlockType
  setBlock(x: number, y: number, z: number, type: BlockType): boolean
  
  // 区块操作
  getChunk(cx: number, cy: number, cz: number): IChunk | undefined
  isChunkLoaded(cx: number, cy: number, cz: number): boolean
  
  // 坐标转换
  worldToChunkCoord(x: number, y: number, z: number): ChunkCoord
  chunkToWorldCoord(cx: number, cy: number, cz: number): { x: number; y: number; z: number }
  
  // 生命周期
  update(playerX: number, playerY: number, playerZ: number): void
  
  // 地形查询
  getHeightAt(worldX: number, worldZ: number): number
  getSpawnPosition(): { x: number; y: number; z: number }
}

// =============================================================================
// Chunk Manager Interface
// =============================================================================

export interface ChunkLoadConfig {
  loadRadius: number      // 加载半径（区块数），默认 8
  unloadRadius: number    // 卸载半径（区块数），默认 10
  maxLoadsPerFrame: number // 每帧最大加载数，默认 2
}

export interface IChunkManager {
  readonly config: ChunkLoadConfig
  readonly loadedCount: number
  
  // 更新（每帧调用）
  update(playerX: number, playerY: number, playerZ: number): void
  
  // 查询
  getLoadedChunks(): IChunk[]
  getVisibleChunks(frustum: THREE.Frustum): IChunk[]
  
  // 强制操作
  forceLoadChunk(cx: number, cy: number, cz: number): Promise<IChunk>
  forceUnloadChunk(cx: number, cy: number, cz: number): void
}

// =============================================================================
// Terrain Generation Interface
// =============================================================================

export interface TerrainConfig {
  baseHeight: number      // 基础高度，默认 64
  heightVariation: number // 高度变化，默认 32
  octaves: number         // 噪声层数，默认 4
  persistence: number     // 振幅衰减，默认 0.5
  lacunarity: number      // 频率增长，默认 2.0
  scale: number           // 缩放，默认 0.01
  stoneDepth: number      // 石头层深度，默认 4
  dirtDepth: number       // 泥土层厚度，默认 3
}

export interface ITerrainGenerator {
  readonly seed: number
  readonly config: TerrainConfig
  
  // 生成区块方块数据
  generateChunk(cx: number, cy: number, cz: number): Uint8Array
  
  // 查询地形高度（用于生成出生点等）
  getHeightAt(worldX: number, worldZ: number): number
}

// =============================================================================
// Cave Generation Interface
// =============================================================================

export interface CaveConfig {
  threshold: number   // 雕刻阈值，默认 0.6
  scale: number       // 噪声缩放，默认 0.05
  minHeight: number   // 最低高度，默认 8
  maxHeight: number   // 最高高度，默认 56
}

export interface ICaveGenerator {
  readonly seed: number
  readonly config: CaveConfig
  
  // 判断某位置是否应该被雕刻为空气
  shouldCarve(worldX: number, worldY: number, worldZ: number): boolean
}

// =============================================================================
// Noise Generation Interface
// =============================================================================

export interface INoiseGenerator {
  // 2D 噪声（地形高度图）
  noise2D(x: number, y: number): number // 返回 -1 到 1
  
  // 3D 噪声（洞穴）
  noise3D(x: number, y: number, z: number): number // 返回 -1 到 1
  
  // 多倍频噪声
  fractal2D(
    x: number,
    y: number,
    octaves: number,
    persistence: number,
    lacunarity: number
  ): number
  
  fractal3D(
    x: number,
    y: number,
    z: number,
    octaves: number,
    persistence: number,
    lacunarity: number
  ): number
}

// =============================================================================
// Chunk Renderer Interface
// =============================================================================

export interface IChunkRenderer {
  // 添加/移除区块网格
  addChunk(chunk: IChunk): void
  removeChunk(chunk: IChunk): void
  
  // 更新区块网格（当 isDirty 时）
  updateChunkMesh(chunk: IChunk): void
  
  // 每帧渲染更新
  update(camera: THREE.Camera): void
  
  // 资源清理
  dispose(): void
}

// =============================================================================
// Utility Functions (Signatures)
// =============================================================================

/**
 * 将区块坐标转换为字符串键
 */
export function chunkKey(x: number, y: number, z: number): string {
  return `${x},${y},${z}`
}

/**
 * 计算方块在区块内的索引
 */
export function blockIndex(localX: number, localY: number, localZ: number): number {
  return localY * 256 + localZ * 16 + localX
}

/**
 * 从索引反推局部坐标
 */
export function indexToLocal(index: number): { x: number; y: number; z: number } {
  const y = Math.floor(index / 256)
  const z = Math.floor((index % 256) / 16)
  const x = index % 16
  return { x, y, z }
}
