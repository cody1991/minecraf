/**
 * TimeSystem - Manages game time and day/night cycle
 * Feature: 008-biome-weather-system
 */

import { TimePeriod, TIME_CONSTANTS, getTimePeriod, isDay } from './WeatherTypes'

/**
 * Manages the game's time system including day/night cycle
 */
export class TimeSystem {
  /** Current game ticks (0-23999) */
  private ticks: number = 0

  /** Number of days elapsed */
  private dayCount: number = 0

  /** Time scale multiplier (1.0 = normal speed) */
  private timeScale: number = 1.0

  /** Whether time is paused */
  private isPaused: boolean = false

  constructor(initialTicks: number = 6000) {
    // Start at 6000 ticks (morning, around 6 AM equivalent)
    this.ticks = initialTicks % TIME_CONSTANTS.TICKS_PER_DAY
  }

  /**
   * Update time system
   * @param deltaTime Time since last update in seconds
   */
  update(deltaTime: number): void {
    if (this.isPaused) return

    // Convert real seconds to game ticks
    const ticksToAdd = deltaTime * TIME_CONSTANTS.TICKS_PER_SECOND * this.timeScale

    this.ticks += ticksToAdd

    // Handle day rollover
    while (this.ticks >= TIME_CONSTANTS.TICKS_PER_DAY) {
      this.ticks -= TIME_CONSTANTS.TICKS_PER_DAY
      this.dayCount++
    }
  }

  /**
   * Get current ticks (0-23999)
   */
  getTicks(): number {
    return this.ticks
  }

  /**
   * Get number of days elapsed
   */
  getDayCount(): number {
    return this.dayCount
  }

  /**
   * Get current time period
   */
  getTimePeriod(): TimePeriod {
    return getTimePeriod(this.ticks)
  }

  /**
   * Check if it's currently daytime
   */
  isDay(): boolean {
    return isDay(this.ticks)
  }

  /**
   * Get sun angle in radians (0 = sunrise, PI = sunset, 2*PI = next sunrise)
   */
  getSunAngle(): number {
    // Sun rises at tick 0, sets at tick 12000
    return (this.ticks / TIME_CONSTANTS.TICKS_PER_DAY) * Math.PI * 2
  }

  /**
   * Get moon angle in radians (opposite to sun)
   */
  getMoonAngle(): number {
    return this.getSunAngle() + Math.PI
  }

  /**
   * Get normalized time of day (0-1)
   */
  getNormalizedTime(): number {
    return this.ticks / TIME_CONSTANTS.TICKS_PER_DAY
  }

  /**
   * Get ambient light intensity based on time (0.2-1.0)
   */
  getAmbientIntensity(): number {
    const period = this.getTimePeriod()
    const normalizedTicks = this.ticks % TIME_CONSTANTS.TICKS_PER_DAY

    switch (period) {
      case TimePeriod.DAY:
        return 1.0

      case TimePeriod.NIGHT:
        return 0.2

      case TimePeriod.SUNRISE: {
        // Fade from 0.2 to 1.0 during sunrise
        const progress = normalizedTicks / TIME_CONSTANTS.SUNRISE_END
        return 0.2 + progress * 0.8
      }

      case TimePeriod.SUNSET: {
        // Fade from 1.0 to 0.2 during sunset
        const progress = (normalizedTicks - TIME_CONSTANTS.SUNSET_START) /
          (TIME_CONSTANTS.SUNSET_END - TIME_CONSTANTS.SUNSET_START)
        return 1.0 - progress * 0.8
      }

      default:
        return 1.0
    }
  }

  /**
   * Set time directly (for debugging/testing)
   */
  setTime(ticks: number): void {
    this.ticks = ticks % TIME_CONSTANTS.TICKS_PER_DAY
  }

  /**
   * Set time scale
   */
  setTimeScale(scale: number): void {
    this.timeScale = Math.max(0, scale)
  }

  /**
   * Get time scale
   */
  getTimeScale(): number {
    return this.timeScale
  }

  /**
   * Pause time
   */
  pause(): void {
    this.isPaused = true
  }

  /**
   * Resume time
   */
  resume(): void {
    this.isPaused = false
  }

  /**
   * Toggle pause state
   */
  togglePause(): void {
    this.isPaused = !this.isPaused
  }

  /**
   * Check if time is paused
   */
  getIsPaused(): boolean {
    return this.isPaused
  }

  /**
   * Get formatted time string (HH:MM format)
   */
  getFormattedTime(): string {
    // Convert ticks to hours (0 ticks = 6:00 AM in Minecraft)
    const ticksPerHour = TIME_CONSTANTS.TICKS_PER_DAY / 24
    const hourOffset = 6 // Start at 6 AM
    const totalHours = (this.ticks / ticksPerHour + hourOffset) % 24
    const hours = Math.floor(totalHours)
    const minutes = Math.floor((totalHours - hours) * 60)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }
}
