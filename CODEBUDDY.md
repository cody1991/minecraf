# minecraft Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-12-12

## Active Technologies
- TypeScript 5.6 (ES2020 target) + Three.js 0.170.0, Vite 6.0 (002-chunk-terrain-system)
- N/A（内存中，后续可扩展 IndexedDB） (002-chunk-terrain-system)
- N/A (内存中状态) (003-physics-collision)
- TypeScript 5.6 (ES2020 target) + Three.js 0.170, Vite 6.0 (004-colosseum-spawn-map)
- N/A (内存中的区块数据) (004-colosseum-spawn-map)
- TypeScript 5.6 + ES2020 + Three.js 0.170.0, Vite 6.0 (005-block-textures)
- 本地文件系统（public/textures/ 目录存放纹理资源） (005-block-textures)
- TypeScript 5.6 + Three.js 0.170, Vite 6.0 (006-random-terrain-generation)
- N/A (内存中生成，无持久化) (006-random-terrain-generation)
- TypeScript 5.6 + Three.js 0.170.0, Vite 6.0 (007-underwater-display)
- N/A（无持久化需求） (007-underwater-display)
- TypeScript 5.6.2 + Three.js 0.170.0, Vite 6.0.3 (008-biome-weather-system)
- N/A（内存状态，无持久化） (008-biome-weather-system)
- TypeScript 5.x + Three.js (WebGL 渲染), Vite (构建工具) (010-colosseum-enhancement)
- N/A (程序化生成，无持久化) (010-colosseum-enhancement)
- TypeScript 5.6 + ES2020 + Three.js 0.170.0, Vite 6.0, Web Audio API (原生) (012-sound-map-system)
- LocalStorage (音量设置持久化) (012-sound-map-system)
- LocalStorage（玩家偏好） (013-character-model-view)
- TypeScript + HTML/CSS (Vite 项目) + 无新增依赖（仅修改 HTML 内容） (001-update-controls-panel)

- TypeScript 5.x + Three.js (WebGL 2.0 渲染), Vite (构建工具) (001-basic-block-world)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x: Follow standard conventions

## Recent Changes
- 001-update-controls-panel: Added TypeScript + HTML/CSS (Vite 项目) + 无新增依赖（仅修改 HTML 内容）
- 013-character-model-view: Added TypeScript 5.6 + ES2020 + Three.js 0.170.0, Vite 6.0
- 012-sound-map-system: Added TypeScript 5.6 + ES2020 + Three.js 0.170.0, Vite 6.0, Web Audio API (原生)


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
