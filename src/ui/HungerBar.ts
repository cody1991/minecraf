/**
 * HungerBar - Hunger UI component
 * Feature: 020-survival-mechanics
 * 
 * Displays 10 food icons representing player hunger (20 points total).
 * Supports full, half, and empty states.
 */

import { HUNGER_MAX } from '../survival/SurvivalConstants'

/** Number of food icons */
const FOOD_COUNT = 10

/**
 * Hunger bar UI component
 */
export class HungerBar {
  private container: HTMLElement
  private foodIcons: HTMLElement[] = []
  private currentHunger: number = HUNGER_MAX
  private visible: boolean = true

  constructor() {
    this.container = this.createContainer()
    this.createFoodIcons()
    this.update(HUNGER_MAX)
  }

  /**
   * Create the container element
   */
  private createContainer(): HTMLElement {
    const container = document.createElement('div')
    container.id = 'hunger-bar'
    container.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: calc(50% - 234px);
      display: flex;
      flex-direction: row-reverse;
      gap: 2px;
      z-index: 100;
      pointer-events: none;
    `
    return container
  }

  /**
   * Create food icon elements
   */
  private createFoodIcons(): void {
    for (let i = 0; i < FOOD_COUNT; i++) {
      const food = document.createElement('div')
      food.className = 'food full'
      food.style.cssText = `
        width: 18px;
        height: 18px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        image-rendering: pixelated;
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));
      `
      this.setFoodState(food, 'full')
      this.foodIcons.push(food)
      this.container.appendChild(food)
    }
  }

  /**
   * Set food icon visual state
   */
  private setFoodState(food: HTMLElement, state: 'full' | 'half' | 'empty'): void {
    // Use emoji for food icons
    food.innerHTML = state === 'empty' 
      ? '🦴' 
      : state === 'half' 
        ? '🍖' 
        : '🍗'
    food.style.fontSize = '16px'
    food.style.textAlign = 'center'
    food.style.lineHeight = '18px'
    food.className = `food ${state}`
  }

  /**
   * Update hunger display
   * @param hunger Current hunger (0-20)
   */
  update(hunger: number): void {
    this.currentHunger = Math.max(0, Math.min(HUNGER_MAX, hunger))
    
    for (let i = 0; i < FOOD_COUNT; i++) {
      const foodValue = this.currentHunger - i * 2
      const food = this.foodIcons[i]
      
      if (foodValue >= 2) {
        this.setFoodState(food!, 'full')
      } else if (foodValue >= 1) {
        this.setFoodState(food!, 'half')
      } else {
        this.setFoodState(food!, 'empty')
      }
    }
  }

  /**
   * Get the container element
   */
  getElement(): HTMLElement {
    return this.container
  }

  /**
   * Show the hunger bar
   */
  show(): void {
    this.visible = true
    this.container.style.display = 'flex'
  }

  /**
   * Hide the hunger bar
   */
  hide(): void {
    this.visible = false
    this.container.style.display = 'none'
  }

  /**
   * Check if visible
   */
  isVisible(): boolean {
    return this.visible
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.container.remove()
    this.foodIcons = []
  }
}
