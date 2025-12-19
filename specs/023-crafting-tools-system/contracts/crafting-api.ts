/**
 * Crafting System API Contracts
 * Feature: 023-crafting-tools-system
 * 
 * 这些接口定义了合成系统的公共 API，供其他模块调用。
 */

import { BlockType } from '../../../src/core/Block';

// ============================================================================
// 配方系统接口
// ============================================================================

export interface CraftingRecipe {
  id: string;
  type: 'shaped' | 'shapeless';
  pattern?: string[];
  ingredients: Record<string, BlockType>;
  result: {
    item: BlockType;
    count: number;
  };
  gridSize: 2 | 3;
}

export interface RecipeRegistry {
  /**
   * 注册一个新配方
   */
  register(recipe: CraftingRecipe): void;

  /**
   * 根据合成格内容查找匹配的配方
   * @param grid 合成格内容（2×2 或 3×3）
   * @returns 匹配的配方，无匹配返回 null
   */
  findMatch(grid: (BlockType | null)[][]): CraftingRecipe | null;

  /**
   * 获取所有已注册的配方
   */
  getAllRecipes(): CraftingRecipe[];
}

// ============================================================================
// 工具系统接口
// ============================================================================

export enum ToolMaterial {
  WOOD = 'wood',
  STONE = 'stone',
  IRON = 'iron',
  DIAMOND = 'diamond',
}

export enum ToolType {
  PICKAXE = 'pickaxe',
  AXE = 'axe',
  SHOVEL = 'shovel',
  SWORD = 'sword',
  HOE = 'hoe',
}

export interface ToolProperties {
  material: ToolMaterial;
  type: ToolType;
  durability: number;
  speedMultiplier: number;
  effectiveBlocks: BlockType[];
}

export interface ToolSystem {
  /**
   * 检查物品是否为工具
   */
  isTool(itemType: BlockType): boolean;

  /**
   * 获取工具属性
   */
  getProperties(toolType: BlockType): ToolProperties | null;

  /**
   * 计算工具对指定方块的挖掘速度倍率
   * @returns 倍率，如果工具不适用于该方块则返回 1
   */
  getSpeedMultiplier(toolType: BlockType, blockType: BlockType): number;

  /**
   * 消耗工具耐久度
   * @returns 工具是否损坏（耐久度归零）
   */
  useTool(toolType: BlockType, currentDurability: number): { 
    newDurability: number; 
    broken: boolean;
  };
}

// ============================================================================
// 熔炉系统接口
// ============================================================================

export interface SmeltingRecipe {
  id: string;
  input: BlockType;
  output: BlockType;
  outputCount: number;
  smeltTime: number;
}

export interface FuelItem {
  item: BlockType;
  burnTime: number;
}

export interface FurnaceState {
  position: { x: number; y: number; z: number };
  fuelSlot: { itemType: BlockType | null; count: number };
  inputSlot: { itemType: BlockType | null; count: number };
  outputSlot: { itemType: BlockType | null; count: number };
  burnTimeRemaining: number;
  burnTimeTotal: number;
  smeltProgress: number;
  currentRecipe: SmeltingRecipe | null;
}

export interface FurnaceManager {
  /**
   * 创建新熔炉
   */
  createFurnace(position: { x: number; y: number; z: number }): FurnaceState;

  /**
   * 移除熔炉
   * @returns 熔炉内的所有物品（用于掉落）
   */
  removeFurnace(position: { x: number; y: number; z: number }): {
    items: Array<{ itemType: BlockType; count: number }>;
  };

  /**
   * 获取指定位置的熔炉状态
   */
  getFurnace(position: { x: number; y: number; z: number }): FurnaceState | null;

  /**
   * 更新所有熔炉状态（每帧调用）
   */
  update(deltaTime: number): void;

  /**
   * 向熔炉添加燃料
   */
  addFuel(position: { x: number; y: number; z: number }, fuel: BlockType, count: number): boolean;

  /**
   * 向熔炉添加输入物品
   */
  addInput(position: { x: number; y: number; z: number }, input: BlockType, count: number): boolean;

  /**
   * 从熔炉取出输出物品
   */
  takeOutput(position: { x: number; y: number; z: number }): { itemType: BlockType; count: number } | null;
}

// ============================================================================
// UI 接口
// ============================================================================

export interface CraftingUI {
  /**
   * 打开 2×2 合成界面（物品栏内）
   */
  openInventoryCrafting(): void;

  /**
   * 打开 3×3 工作台合成界面
   */
  openCraftingTable(): void;

  /**
   * 关闭合成界面
   * @returns 需要返还到物品栏的物品
   */
  close(): Array<{ itemType: BlockType; count: number }>;

  /**
   * 检查合成界面是否打开
   */
  isOpen(): boolean;
}

export interface FurnaceUI {
  /**
   * 打开熔炉界面
   */
  open(furnaceState: FurnaceState): void;

  /**
   * 关闭熔炉界面
   */
  close(): void;

  /**
   * 更新熔炉界面显示
   */
  update(furnaceState: FurnaceState): void;

  /**
   * 检查熔炉界面是否打开
   */
  isOpen(): boolean;
}
