/**
 * Weather Types and Time Periods
 * Feature: 008-biome-weather-system
 */

/**
 * Weather type enumeration
 */
export enum WeatherType {
  CLEAR = 0,  // Sunny/clear sky
  RAIN = 1    // Raining
}

/**
 * Time period enumeration
 */
export enum TimePeriod {
  SUNRISE = 0,  // 0-2000 ticks (dawn)
  DAY = 1,      // 2000-10000 ticks (daytime)
  SUNSET = 2,   // 10000-12000 ticks (dusk)
  NIGHT = 3     // 12000-24000 ticks (nighttime)
}

/**
 * Time constants
 */
export const TIME_CONSTANTS = {
  TICKS_PER_DAY: 24000,           // Total ticks in one day
  REAL_SECONDS_PER_DAY: 20 * 60,  // 20 minutes per day
  TICKS_PER_SECOND: 24000 / (20 * 60), // ~20 ticks per second
  
  // Time period boundaries
  SUNRISE_START: 0,
  SUNRISE_END: 2000,
  DAY_START: 2000,
  DAY_END: 10000,
  SUNSET_START: 10000,
  SUNSET_END: 12000,
  NIGHT_START: 12000,
  NIGHT_END: 24000
}

/**
 * Weather configuration
 */
export const WEATHER_CONFIG = {
  // Weather duration (seconds)
  RAIN_DURATION_MIN: 2 * 60,   // 2 minutes
  RAIN_DURATION_MAX: 5 * 60,   // 5 minutes
  CLEAR_DURATION_MIN: 5 * 60,  // 5 minutes
  CLEAR_DURATION_MAX: 10 * 60, // 10 minutes
  
  // Weather probability
  RAIN_CHANCE: 0.3,            // 30% chance of rain after clear
  
  // Transition time
  TRANSITION_DURATION: 5,      // 5 seconds for weather transition
  
  // Rain effect
  RAIN_PARTICLE_COUNT: 8000,
  RAIN_AMBIENT_DIM: 0.3        // Dim ambient light by 30% when raining
}

/**
 * Sky colors for different time periods
 */
export const SKY_COLORS = {
  [TimePeriod.SUNRISE]: {
    top: 0x1e3c72,    // Dark blue
    horizon: 0xff7e5f, // Orange-pink
    ambient: 0.5
  },
  [TimePeriod.DAY]: {
    top: 0x87ceeb,    // Sky blue
    horizon: 0xadd8e6, // Light blue
    ambient: 1.0
  },
  [TimePeriod.SUNSET]: {
    top: 0x1a1a3a,    // Deep purple-blue (was 0x2c3e50)
    horizon: 0xd4622b, // Soft orange-red (was 0xe74c3c blood red)
    ambient: 0.5
  },
  [TimePeriod.NIGHT]: {
    top: 0x0a0a1a,    // Deep night blue (was 0x0a0a20)
    horizon: 0x0f1a2a, // Teal/dark blue (was 0x1a1a40 purple)
    ambient: 0.2
  }
}

/**
 * Sun colors for different time periods
 */
export const SUN_COLORS = {
  [TimePeriod.SUNRISE]: { core: 0xff8c00, glow: 0xff6347 },  // Deep orange / Tomato
  [TimePeriod.DAY]: { core: 0xfffaf0, glow: 0xfff8dc },      // Floral white / Cornsilk
  [TimePeriod.SUNSET]: { core: 0xff6b35, glow: 0xff4500 },   // Orange-red / OrangeRed
  [TimePeriod.NIGHT]: { core: 0xeeeeee, glow: 0xcccccc }     // Light gray (moon-like)
}

/**
 * Get time period from ticks
 */
export function getTimePeriod(ticks: number): TimePeriod {
  const normalizedTicks = ticks % TIME_CONSTANTS.TICKS_PER_DAY
  
  if (normalizedTicks < TIME_CONSTANTS.SUNRISE_END) {
    return TimePeriod.SUNRISE
  } else if (normalizedTicks < TIME_CONSTANTS.DAY_END) {
    return TimePeriod.DAY
  } else if (normalizedTicks < TIME_CONSTANTS.SUNSET_END) {
    return TimePeriod.SUNSET
  } else {
    return TimePeriod.NIGHT
  }
}

/**
 * Check if it's daytime
 */
export function isDay(ticks: number): boolean {
  const period = getTimePeriod(ticks)
  return period === TimePeriod.DAY || period === TimePeriod.SUNRISE
}

/**
 * Get weather name
 */
export function getWeatherName(type: WeatherType): string {
  switch (type) {
    case WeatherType.CLEAR: return '晴天'
    case WeatherType.RAIN: return '下雨'
    default: return 'Unknown'
  }
}
