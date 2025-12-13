/**
 * SaveManager API Contract
 * Feature: 018-world-save-system
 * 
 * 定义存档管理器的公共接口，供 Game 和 UI 组件调用。
 */

// ============================================================================
// Types
// ============================================================================

export interface SaveData {
  id: string
  name: string
  slotType: 'manual' | 'auto'
  slotNumber: number
  createdAt: number
  updatedAt: number
  seed: number
  playerState: PlayerState
  playTime?: number
}

export interface PlayerState {
  position: { x: number; y: number; z: number }
  rotation: { yaw: number; pitch: number }
  selectedBlockIndex?: number
  characterModel?: string
}

export interface ChunkData {
  saveId: string
  chunkKey: string
  blocks: Uint8Array
}

export interface SaveMetadata {
  id: string
  name: string
  slotType: 'manual' | 'auto'
  slotNumber: number
  updatedAt: number
  seed: number
}

export interface SaveResult {
  success: boolean
  saveId?: string
  error?: string
}

export interface LoadResult {
  success: boolean
  saveData?: SaveData
  chunks?: ChunkData[]
  error?: string
}

// ============================================================================
// SaveManager Interface
// ============================================================================

export interface ISaveManager {
  /**
   * 初始化存档系统
   * @returns Promise<boolean> 是否初始化成功
   */
  initialize(): Promise<boolean>

  /**
   * 检查浏览器是否支持存档功能
   */
  isSupported(): boolean

  /**
   * 获取所有存档的元数据列表
   * @returns Promise<SaveMetadata[]> 按更新时间降序排列
   */
  listSaves(): Promise<SaveMetadata[]>

  /**
   * 保存当前游戏状态到指定槽位
   * @param slotNumber 槽位编号（1-5 手动，0 自动）
   * @param name 存档名称
   * @param worldData 世界数据（种子、玩家状态、已修改区块）
   * @returns Promise<SaveResult>
   */
  save(
    slotNumber: number,
    name: string,
    worldData: {
      seed: number
      playerState: PlayerState
      modifiedChunks: Array<{ key: string; blocks: Uint8Array }>
    }
  ): Promise<SaveResult>

  /**
   * 加载指定存档
   * @param saveId 存档 ID
   * @returns Promise<LoadResult>
   */
  load(saveId: string): Promise<LoadResult>

  /**
   * 重命名存档
   * @param saveId 存档 ID
   * @param newName 新名称
   * @returns Promise<boolean>
   */
  rename(saveId: string, newName: string): Promise<boolean>

  /**
   * 删除存档
   * @param saveId 存档 ID
   * @returns Promise<boolean>
   */
  delete(saveId: string): Promise<boolean>

  /**
   * 获取指定槽位的存档（如果存在）
   * @param slotNumber 槽位编号
   * @returns Promise<SaveMetadata | null>
   */
  getSlot(slotNumber: number): Promise<SaveMetadata | null>

  /**
   * 检查是否有自动存档
   * @returns Promise<SaveMetadata | null>
   */
  getAutoSave(): Promise<SaveMetadata | null>
}

// ============================================================================
// AutoSave Interface
// ============================================================================

export interface IAutoSave {
  /**
   * 启动自动保存
   * @param intervalMs 保存间隔（毫秒），默认 300000（5分钟）
   */
  start(intervalMs?: number): void

  /**
   * 停止自动保存
   */
  stop(): void

  /**
   * 立即触发一次自动保存
   */
  saveNow(): Promise<SaveResult>

  /**
   * 检查自动保存是否正在运行
   */
  isRunning(): boolean

  /**
   * 设置保存回调（用于获取当前游戏状态）
   */
  setDataProvider(provider: () => {
    seed: number
    playerState: PlayerState
    modifiedChunks: Array<{ key: string; blocks: Uint8Array }>
  }): void

  /**
   * 设置保存完成回调
   */
  onSaveComplete(callback: (result: SaveResult) => void): void
}

// ============================================================================
// Events
// ============================================================================

export interface SaveEvents {
  /** 保存开始 */
  'save:start': { slotNumber: number }
  
  /** 保存完成 */
  'save:complete': { slotNumber: number; success: boolean; error?: string }
  
  /** 加载开始 */
  'load:start': { saveId: string }
  
  /** 加载完成 */
  'load:complete': { saveId: string; success: boolean; error?: string }
  
  /** 自动保存触发 */
  'autosave:trigger': { timestamp: number }
  
  /** 自动保存完成 */
  'autosave:complete': { success: boolean; error?: string }
}
