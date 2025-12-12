/**
 * WeatherSystem - Manages weather state and transitions
 * Feature: 008-biome-weather-system
 */

import { WeatherType, WEATHER_CONFIG, getWeatherName } from './WeatherTypes'

/**
 * Manages weather state and transitions
 */
export class WeatherSystem {
  /** Current weather type */
  private type: WeatherType = WeatherType.CLEAR

  /** Duration remaining for current weather (seconds) */
  private duration: number

  /** Transition progress (0-1) for smooth weather changes */
  private transitionProgress: number = 1

  /** Target weather for transition */
  private targetType: WeatherType = WeatherType.CLEAR

  /** Is transitioning to new weather */
  private isTransitioning: boolean = false

  constructor() {
    // Start with clear weather
    this.duration = this.getRandomDuration(WeatherType.CLEAR)
  }

  /**
   * Update weather system
   */
  update(deltaTime: number): void {
    // Handle transition
    if (this.isTransitioning) {
      this.transitionProgress += deltaTime / WEATHER_CONFIG.TRANSITION_DURATION
      
      if (this.transitionProgress >= 1) {
        this.transitionProgress = 1
        this.isTransitioning = false
        this.type = this.targetType
        this.duration = this.getRandomDuration(this.type)
      }
      return
    }

    // Count down duration
    this.duration -= deltaTime

    if (this.duration <= 0) {
      // Time to change weather
      this.checkWeatherChange()
    }
  }

  /**
   * Check for weather change
   */
  private checkWeatherChange(): void {
    if (this.type === WeatherType.CLEAR) {
      // Chance to start raining
      if (Math.random() < WEATHER_CONFIG.RAIN_CHANCE) {
        this.startTransition(WeatherType.RAIN)
      } else {
        // Stay clear, reset duration
        this.duration = this.getRandomDuration(WeatherType.CLEAR)
      }
    } else {
      // Rain ends, go back to clear
      this.startTransition(WeatherType.CLEAR)
    }
  }

  /**
   * Start weather transition
   */
  private startTransition(newType: WeatherType): void {
    this.targetType = newType
    this.isTransitioning = true
    this.transitionProgress = 0
  }

  /**
   * Get random duration for weather type
   */
  private getRandomDuration(type: WeatherType): number {
    if (type === WeatherType.RAIN) {
      return WEATHER_CONFIG.RAIN_DURATION_MIN +
        Math.random() * (WEATHER_CONFIG.RAIN_DURATION_MAX - WEATHER_CONFIG.RAIN_DURATION_MIN)
    } else {
      return WEATHER_CONFIG.CLEAR_DURATION_MIN +
        Math.random() * (WEATHER_CONFIG.CLEAR_DURATION_MAX - WEATHER_CONFIG.CLEAR_DURATION_MIN)
    }
  }

  /**
   * Get current weather type
   */
  getType(): WeatherType {
    return this.type
  }

  /**
   * Get weather name
   */
  getWeatherName(): string {
    return getWeatherName(this.type)
  }

  /**
   * Check if it's raining
   */
  isRaining(): boolean {
    return this.type === WeatherType.RAIN ||
      (this.isTransitioning && this.targetType === WeatherType.RAIN && this.transitionProgress > 0.5)
  }

  /**
   * Get rain intensity (0-1, for smooth transitions)
   */
  getRainIntensity(): number {
    if (this.type === WeatherType.RAIN && !this.isTransitioning) {
      return 1
    }
    
    if (this.isTransitioning) {
      if (this.targetType === WeatherType.RAIN) {
        return this.transitionProgress
      } else {
        return 1 - this.transitionProgress
      }
    }
    
    return 0
  }

  /**
   * Get ambient dim factor for rain (0-0.3)
   */
  getAmbientDimFactor(): number {
    return this.getRainIntensity() * WEATHER_CONFIG.RAIN_AMBIENT_DIM
  }

  /**
   * Force weather change (for testing/debugging)
   */
  setWeather(type: WeatherType): void {
    this.startTransition(type)
  }

  /**
   * Toggle rain (for testing)
   */
  toggleRain(): void {
    if (this.isRaining()) {
      this.setWeather(WeatherType.CLEAR)
    } else {
      this.setWeather(WeatherType.RAIN)
    }
  }
}
