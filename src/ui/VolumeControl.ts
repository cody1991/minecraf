/**
 * VolumeControl - Audio volume control UI component
 * Feature: 012-sound-map-system
 */

import { AudioManager } from '../audio/AudioManager'

/**
 * Volume control UI with sliders and mute button
 */
export class VolumeControl {
  private container: HTMLElement
  private audioManager: AudioManager
  private isExpanded: boolean = false

  constructor() {
    this.audioManager = AudioManager.getInstance()
    this.container = this.createUI()
    document.body.appendChild(this.container)
  }

  /**
   * Create the volume control UI
   */
  private createUI(): HTMLElement {
    const container = document.createElement('div')
    container.id = 'volume-control'
    container.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 8px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1000;
      font-family: sans-serif;
      font-size: 12px;
      color: white;
      pointer-events: auto;
    `

    // Toggle button
    const toggleBtn = document.createElement('button')
    toggleBtn.id = 'volume-toggle'
    toggleBtn.innerHTML = '🔊'
    toggleBtn.style.cssText = `
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 4px;
      padding: 8px;
      cursor: pointer;
      font-size: 20px;
      transition: background 0.2s;
    `
    toggleBtn.addEventListener('click', () => this.toggleExpand())
    toggleBtn.addEventListener('mouseenter', () => {
      toggleBtn.style.background = 'rgba(255, 255, 255, 0.2)'
    })
    toggleBtn.addEventListener('mouseleave', () => {
      toggleBtn.style.background = 'rgba(255, 255, 255, 0.1)'
    })
    container.appendChild(toggleBtn)

    // Sliders container (hidden by default)
    const slidersContainer = document.createElement('div')
    slidersContainer.id = 'volume-sliders'
    slidersContainer.style.cssText = `
      display: none;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    `

    // Master volume
    slidersContainer.appendChild(this.createSlider('主音量', 'master', 
      this.audioManager.getSettings().masterVolume,
      (v) => this.audioManager.setMasterVolume(v)
    ))

    // Music volume
    slidersContainer.appendChild(this.createSlider('音乐', 'music',
      this.audioManager.getSettings().musicVolume,
      (v) => this.audioManager.setMusicVolume(v)
    ))

    // SFX volume
    slidersContainer.appendChild(this.createSlider('音效', 'sfx',
      this.audioManager.getSettings().sfxVolume,
      (v) => this.audioManager.setSfxVolume(v)
    ))

    // Mute button
    const muteBtn = document.createElement('button')
    muteBtn.id = 'mute-btn'
    muteBtn.textContent = this.audioManager.getSettings().muted ? '取消静音' : '静音'
    muteBtn.style.cssText = `
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      padding: 6px 12px;
      color: white;
      cursor: pointer;
      transition: background 0.2s;
    `
    muteBtn.addEventListener('click', () => {
      this.audioManager.toggleMute()
      muteBtn.textContent = this.audioManager.getSettings().muted ? '取消静音' : '静音'
      this.updateToggleIcon()
    })
    slidersContainer.appendChild(muteBtn)

    container.appendChild(slidersContainer)

    return container
  }

  /**
   * Create a volume slider
   */
  private createSlider(
    label: string,
    id: string,
    initialValue: number,
    onChange: (value: number) => void
  ): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
    `

    const labelEl = document.createElement('span')
    labelEl.textContent = label
    labelEl.style.cssText = `
      width: 50px;
      text-align: right;
    `
    wrapper.appendChild(labelEl)

    const slider = document.createElement('input')
    slider.type = 'range'
    slider.id = `volume-${id}`
    slider.min = '0'
    slider.max = '100'
    slider.value = String(Math.round(initialValue * 100))
    slider.style.cssText = `
      width: 100px;
      cursor: pointer;
    `
    slider.addEventListener('input', () => {
      onChange(parseInt(slider.value) / 100)
    })
    wrapper.appendChild(slider)

    const valueEl = document.createElement('span')
    valueEl.textContent = `${Math.round(initialValue * 100)}%`
    valueEl.style.width = '35px'
    slider.addEventListener('input', () => {
      valueEl.textContent = `${slider.value}%`
    })
    wrapper.appendChild(valueEl)

    return wrapper
  }

  /**
   * Toggle expanded state
   */
  private toggleExpand(): void {
    this.isExpanded = !this.isExpanded
    const sliders = document.getElementById('volume-sliders')
    if (sliders) {
      sliders.style.display = this.isExpanded ? 'flex' : 'none'
    }
  }

  /**
   * Update toggle button icon based on mute state
   */
  private updateToggleIcon(): void {
    const toggleBtn = document.getElementById('volume-toggle')
    if (toggleBtn) {
      toggleBtn.innerHTML = this.audioManager.getSettings().muted ? '🔇' : '🔊'
    }
  }

  /**
   * Show the volume control
   */
  show(): void {
    this.container.style.display = 'flex'
  }

  /**
   * Hide the volume control
   */
  hide(): void {
    this.container.style.display = 'none'
  }

  /**
   * Dispose of the component
   */
  dispose(): void {
    this.container.remove()
  }
}
