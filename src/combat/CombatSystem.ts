/**
 * CombatSystem - Player combat system
 * Feature: 021-food-system
 * 
 * Handles player attacks on animals using raycasting.
 */

import * as THREE from 'three'
import { Animal } from '../entities/Animal'
import { EntityManager } from '../entities/EntityManager'
import { AudioManager } from '../audio/AudioManager'
import { ATTACK_DAMAGE, ATTACK_RANGE, ATTACK_COOLDOWN } from './CombatConstants'

/**
 * Combat hit result
 */
export interface CombatHit {
  hit: boolean
  target: Animal | null
  distance: number
  damage: number
}

/**
 * Combat system for player attacks
 */
export class CombatSystem {
  private entityManager: EntityManager
  private attackCooldownTimer: number = 0
  private raycaster: THREE.Raycaster

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager
    this.raycaster = new THREE.Raycaster()
    this.raycaster.far = ATTACK_RANGE
  }

  /**
   * Check if player can attack (cooldown finished)
   */
  canAttack(): boolean {
    return this.attackCooldownTimer <= 0
  }

  /**
   * Update cooldown timer
   */
  update(deltaTime: number): void {
    if (this.attackCooldownTimer > 0) {
      this.attackCooldownTimer -= deltaTime
    }
  }

  /**
   * Perform an attack from player position in look direction
   * @param eyePosition Player eye position
   * @param lookDirection Normalized look direction
   * @returns Combat hit result
   */
  attack(eyePosition: THREE.Vector3, lookDirection: THREE.Vector3): CombatHit {
    const result: CombatHit = {
      hit: false,
      target: null,
      distance: 0,
      damage: 0
    }

    // Check cooldown
    if (!this.canAttack()) {
      return result
    }

    // Start cooldown
    this.attackCooldownTimer = ATTACK_COOLDOWN

    // Set up raycaster
    this.raycaster.set(eyePosition, lookDirection.normalize())

    // Get all animals and check for intersection
    const animals = this.entityManager.getAll().filter(
      (entity): entity is Animal => entity instanceof Animal && !entity.isDead
    )

    let closestAnimal: Animal | null = null
    let closestDistance = ATTACK_RANGE

    for (const animal of animals) {
      const mesh = animal.getMesh()
      if (!mesh) continue

      // Create bounding box for the animal
      const box = new THREE.Box3().setFromObject(mesh)
      const intersectionPoint = new THREE.Vector3()
      
      // Check ray intersection with bounding box
      if (this.raycaster.ray.intersectBox(box, intersectionPoint)) {
        const distance = eyePosition.distanceTo(intersectionPoint)
        if (distance <= ATTACK_RANGE && distance < closestDistance) {
          closestDistance = distance
          closestAnimal = animal
        }
      }
    }

    // Apply damage to closest hit animal
    if (closestAnimal) {
      const damageApplied = closestAnimal.takeDamage(ATTACK_DAMAGE)
      
      if (damageApplied) {
        result.hit = true
        result.target = closestAnimal
        result.distance = closestDistance
        result.damage = ATTACK_DAMAGE

        // Play attack hit sound
        this.playAttackSound(closestAnimal.position)
      }
    }

    return result
  }

  /**
   * Play attack hit sound
   */
  private playAttackSound(position: THREE.Vector3): void {
    const audioManager = AudioManager.getInstance()
    if (audioManager.initialized) {
      audioManager.playAttackSound(position.x, position.y, position.z)
    }
  }

  /**
   * Get remaining cooldown time
   */
  getCooldownRemaining(): number {
    return Math.max(0, this.attackCooldownTimer)
  }

  /**
   * Get cooldown progress (0 = ready, 1 = just attacked)
   */
  getCooldownProgress(): number {
    return Math.max(0, this.attackCooldownTimer / ATTACK_COOLDOWN)
  }
}
