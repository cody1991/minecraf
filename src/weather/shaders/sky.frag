// Sky fragment shader
// Feature: 008-biome-weather-system

uniform float uTime;           // Normalized time (0-1)
uniform vec3 uTopColor;        // Sky top color
uniform vec3 uHorizonColor;    // Horizon color
uniform float uSunIntensity;   // Sun glow intensity
uniform vec3 uSunDirection;    // Sun direction vector
uniform float uIsRaining;      // Rain darkening factor (0-1)

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  // Normalize the view direction
  vec3 viewDir = normalize(vWorldPosition);
  
  // Calculate height-based gradient (0 at horizon, 1 at zenith)
  float heightFactor = max(0.0, viewDir.y);
  heightFactor = pow(heightFactor, 0.6); // Adjust curve
  
  // Blend between horizon and top colors
  vec3 skyColor = mix(uHorizonColor, uTopColor, heightFactor);
  
  // Add sun glow
  float sunDot = max(0.0, dot(viewDir, uSunDirection));
  float sunGlow = pow(sunDot, 32.0) * uSunIntensity;
  float sunHalo = pow(sunDot, 8.0) * uSunIntensity * 0.3;
  
  skyColor += vec3(1.0, 0.9, 0.7) * sunGlow;
  skyColor += vec3(1.0, 0.8, 0.6) * sunHalo;
  
  // Apply rain darkening
  skyColor *= (1.0 - uIsRaining * 0.4);
  
  gl_FragColor = vec4(skyColor, 1.0);
}
