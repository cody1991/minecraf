/**
 * SkyRenderer - Renders sky dome with sun, moon, and stars
 * Feature: 008-biome-weather-system
 */

import * as THREE from 'three'
import { TimeSystem } from './TimeSystem'
import { TimePeriod, SKY_COLORS, SUN_COLORS } from './WeatherTypes'

// Inline shaders to avoid import issues
const SKY_VERTEX_SHADER = `
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const SKY_FRAGMENT_SHADER = `
uniform float uTime;
uniform vec3 uTopColor;
uniform vec3 uHorizonColor;
uniform float uSunIntensity;
uniform vec3 uSunDirection;
uniform float uIsRaining;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vec3 viewDir = normalize(vWorldPosition);
  float heightFactor = max(0.0, viewDir.y);
  heightFactor = pow(heightFactor, 0.6);
  
  vec3 skyColor = mix(uHorizonColor, uTopColor, heightFactor);
  
  float sunDot = max(0.0, dot(viewDir, uSunDirection));
  float sunGlow = pow(sunDot, 32.0) * uSunIntensity;
  float sunHalo = pow(sunDot, 8.0) * uSunIntensity * 0.3;
  
  skyColor += vec3(1.0, 0.9, 0.7) * sunGlow;
  skyColor += vec3(1.0, 0.8, 0.6) * sunHalo;
  
  skyColor *= (1.0 - uIsRaining * 0.4);
  
  gl_FragColor = vec4(skyColor, 1.0);
}
`

// Sun shader for glow effect
const SUN_VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const SUN_FRAGMENT_SHADER = `
uniform vec3 uCoreColor;
uniform vec3 uGlowColor;
uniform float uGlowIntensity;

varying vec2 vUv;

void main() {
  // Distance from center (0 at center, 1 at edge)
  float dist = length(vUv - 0.5) * 2.0;
  
  // Core: bright center with soft falloff
  float core = 1.0 - smoothstep(0.0, 0.4, dist);
  
  // Glow: extends beyond core with gradual falloff
  float glow = 1.0 - smoothstep(0.2, 1.0, dist);
  glow = pow(glow, 1.5) * uGlowIntensity;
  
  // Combine colors
  vec3 color = mix(uGlowColor, uCoreColor, core);
  
  // Alpha: solid core, fading glow
  float alpha = max(core, glow * 0.8);
  
  // Discard fully transparent pixels
  if (alpha < 0.01) discard;
  
  gl_FragColor = vec4(color, alpha);
}
`

/**
 * Renders the sky dome, sun, moon, and stars
 */
export class SkyRenderer {
  private scene: THREE.Scene
  private skyDome: THREE.Mesh
  private skyMaterial: THREE.ShaderMaterial
  private sun: THREE.Mesh
  private sunMaterial!: THREE.ShaderMaterial
  private moon: THREE.Mesh
  private stars: THREE.Points
  private celestialGroup: THREE.Group

  // Sky dome radius
  private readonly skyRadius = 500

  // Celestial body distance from center
  private readonly celestialDistance = 400

  // Is raining flag
  private isRaining: boolean = false

  constructor(scene: THREE.Scene) {
    this.scene = scene

    // Create celestial group (rotates with time)
    this.celestialGroup = new THREE.Group()
    this.scene.add(this.celestialGroup)

    // Create sky dome
    this.skyMaterial = this.createSkyMaterial()
    this.skyDome = this.createSkyDome()
    this.scene.add(this.skyDome)

    // Create sun
    this.sun = this.createSun()
    this.celestialGroup.add(this.sun)

    // Create moon
    this.moon = this.createMoon()
    this.celestialGroup.add(this.moon)

    // Create stars
    this.stars = this.createStars()
    this.scene.add(this.stars)
  }

  /**
   * Create sky shader material
   */
  private createSkyMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      vertexShader: SKY_VERTEX_SHADER,
      fragmentShader: SKY_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uTopColor: { value: new THREE.Color(0x87ceeb) },
        uHorizonColor: { value: new THREE.Color(0xadd8e6) },
        uSunIntensity: { value: 1.0 },
        uSunDirection: { value: new THREE.Vector3(0, 1, 0) },
        uIsRaining: { value: 0 }
      },
      side: THREE.BackSide,
      depthWrite: false
    })
  }

  /**
   * Create sky dome mesh
   */
  private createSkyDome(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(this.skyRadius, 32, 32)
    const mesh = new THREE.Mesh(geometry, this.skyMaterial)
    mesh.renderOrder = -1000 // Render first
    return mesh
  }

  /**
   * Create sun mesh with glow shader
   */
  private createSun(): THREE.Mesh {
    // Use PlaneGeometry for billboard effect
    const geometry = new THREE.PlaneGeometry(60, 60)
    this.sunMaterial = new THREE.ShaderMaterial({
      vertexShader: SUN_VERTEX_SHADER,
      fragmentShader: SUN_FRAGMENT_SHADER,
      uniforms: {
        uCoreColor: { value: new THREE.Color(0xfffaf0) },
        uGlowColor: { value: new THREE.Color(0xfff8dc) },
        uGlowIntensity: { value: 1.0 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
    const sun = new THREE.Mesh(geometry, this.sunMaterial)
    sun.position.set(0, 0, -this.celestialDistance)
    return sun
  }

  /**
   * Create moon mesh
   */
  private createMoon(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(15, 16, 16)
    const material = new THREE.MeshBasicMaterial({
      color: 0xeeeeee,
      fog: false
    })
    const moon = new THREE.Mesh(geometry, material)
    moon.position.set(0, 0, this.celestialDistance)
    return moon
  }

  /**
   * Create star field
   */
  private createStars(): THREE.Points {
    const starCount = 1000
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      // Random position on sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = this.skyRadius * 0.95

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      sizes[i] = 1 + Math.random() * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0
    })

    return new THREE.Points(geometry, material)
  }

  /**
   * Update sky based on time system
   */
  update(timeSystem: TimeSystem, cameraPosition: THREE.Vector3): void {
    // Update sky dome position to follow camera
    this.skyDome.position.copy(cameraPosition)
    this.celestialGroup.position.copy(cameraPosition)
    this.stars.position.copy(cameraPosition)

    // Get time values
    const sunAngle = timeSystem.getSunAngle()
    const timePeriod = timeSystem.getTimePeriod()
    const ambientIntensity = timeSystem.getAmbientIntensity()

    // Rotate celestial group (sun/moon orbit)
    this.celestialGroup.rotation.x = sunAngle

    // Make sun face camera (billboard effect)
    this.sun.lookAt(cameraPosition)

    // Update sun colors based on time period
    this.updateSunColors(timePeriod, timeSystem.getTicks())

    // Update sky colors based on time period
    this.updateSkyColors(timePeriod, timeSystem.getTicks())

    // Update sun direction for shader
    const sunDir = new THREE.Vector3(0, Math.sin(sunAngle), -Math.cos(sunAngle));
    (this.skyMaterial.uniforms.uSunDirection as { value: THREE.Vector3 }).value.copy(sunDir);
    (this.skyMaterial.uniforms.uSunIntensity as { value: number }).value = ambientIntensity

    // Update star visibility (only at night)
    let starOpacity = 0;
    if (timePeriod === TimePeriod.NIGHT) {
      starOpacity = 1.0;
    } else if (timePeriod === TimePeriod.SUNSET) {
      starOpacity = 0.5;
    }
    const starsMat = this.stars.material as THREE.PointsMaterial;
    starsMat.opacity = starOpacity;

    // Update rain uniform
    (this.skyMaterial.uniforms.uIsRaining as { value: number }).value = this.isRaining ? 1.0 : 0.0;
  }

  /**
   * Update sun colors based on time period
   */
  private updateSunColors(period: TimePeriod, ticks: number): void {
    const colors = SUN_COLORS[period]
    let nextColors = colors
    let blendFactor = 0

    const normalizedTicks = ticks % 24000

    // Calculate blend between periods
    if (period === TimePeriod.SUNRISE) {
      blendFactor = normalizedTicks / 2000
      nextColors = SUN_COLORS[TimePeriod.DAY]
    } else if (period === TimePeriod.SUNSET) {
      blendFactor = (normalizedTicks - 10000) / 2000
      nextColors = SUN_COLORS[TimePeriod.NIGHT]
    } else if (period === TimePeriod.NIGHT && normalizedTicks > 22000) {
      blendFactor = (normalizedTicks - 22000) / 2000
      nextColors = SUN_COLORS[TimePeriod.SUNRISE]
    }

    // Interpolate colors
    const coreColor = new THREE.Color(colors.core)
    const glowColor = new THREE.Color(colors.glow)

    if (blendFactor > 0) {
      coreColor.lerp(new THREE.Color(nextColors.core), blendFactor)
      glowColor.lerp(new THREE.Color(nextColors.glow), blendFactor)
    }

    (this.sunMaterial.uniforms.uCoreColor as { value: THREE.Color }).value.copy(coreColor);
    (this.sunMaterial.uniforms.uGlowColor as { value: THREE.Color }).value.copy(glowColor)

    // Adjust glow intensity based on time (dimmer at night)
    const glowIntensity = period === TimePeriod.NIGHT ? 0.3 : 1.0;
    (this.sunMaterial.uniforms.uGlowIntensity as { value: number }).value = glowIntensity
  }

  /**
   * Update sky colors based on time period
   */
  private updateSkyColors(period: TimePeriod, ticks: number): void {
    const colors = SKY_COLORS[period]
    
    // Get neighboring period for smooth transitions
    let blendFactor = 0
    let nextColors = colors

    const normalizedTicks = ticks % 24000

    // Calculate blend between periods
    if (period === TimePeriod.SUNRISE) {
      blendFactor = normalizedTicks / 2000
      nextColors = SKY_COLORS[TimePeriod.DAY]
    } else if (period === TimePeriod.SUNSET) {
      blendFactor = (normalizedTicks - 10000) / 2000
      nextColors = SKY_COLORS[TimePeriod.NIGHT]
    } else if (period === TimePeriod.NIGHT && normalizedTicks > 22000) {
      blendFactor = (normalizedTicks - 22000) / 2000
      nextColors = SKY_COLORS[TimePeriod.SUNRISE]
    }

    // Interpolate colors
    const topColor = new THREE.Color(colors.top)
    const horizonColor = new THREE.Color(colors.horizon)

    if (blendFactor > 0) {
      topColor.lerp(new THREE.Color(nextColors.top), blendFactor)
      horizonColor.lerp(new THREE.Color(nextColors.horizon), blendFactor)
    }

    (this.skyMaterial.uniforms.uTopColor as { value: THREE.Color }).value.copy(topColor);
    (this.skyMaterial.uniforms.uHorizonColor as { value: THREE.Color }).value.copy(horizonColor)
  }

  /**
   * Set rain state
   */
  setRaining(isRaining: boolean): void {
    this.isRaining = isRaining
  }

  /**
   * Get current ambient intensity for external use
   */
  getAmbientIntensity(): number {
    return (this.skyMaterial.uniforms.uSunIntensity as { value: number }).value
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.skyDome.geometry.dispose()
    this.skyMaterial.dispose()
    this.sun.geometry.dispose()
    this.sunMaterial.dispose()
    this.moon.geometry.dispose();
    (this.moon.material as THREE.Material).dispose()
    this.stars.geometry.dispose();
    (this.stars.material as THREE.Material).dispose()

    this.scene.remove(this.skyDome)
    this.scene.remove(this.celestialGroup)
    this.scene.remove(this.stars)
  }
}
