<!--
  ============================================================================
  SYNC IMPACT REPORT
  ============================================================================
  Version Change: N/A → 1.0.0 (Initial ratification)

  Modified Principles: None (initial version)

  Added Sections:
    - Core Principles (5 principles)
    - Technical Standards
    - Development Workflow
    - Governance

  Removed Sections: None (initial version)

  Templates Status:
    ✅ plan-template.md - Compatible (Constitution Check section aligns)
    ✅ spec-template.md - Compatible (User stories & requirements align)
    ✅ tasks-template.md - Compatible (Phase structure aligns)

  Deferred Items: None
  ============================================================================
-->

# WebCraft (Web 版我的世界) Constitution

## Core Principles

### I. WebGL 渲染优先

系统 MUST 使用 WebGL/Three.js 作为核心渲染引擎。所有 3D 渲染逻辑 MUST 封装在独立的渲染模块中，
确保与游戏逻辑解耦。渲染性能 MUST 达到 60 FPS（桌面端）和 30 FPS（移动端）的目标帧率。

**理由**: Web 平台的 3D 渲染依赖 WebGL，Three.js 提供成熟的抽象层，降低开发复杂度。

### II. 区块化世界管理

世界 MUST 采用区块（Chunk）系统进行管理，每个区块为 16×256×16 方块。系统 MUST 实现：
- 动态区块加载/卸载（基于玩家位置）
- 区块数据的高效序列化与反序列化
- 可见区块的视锥剔除优化

**理由**: 区块化是 Minecraft 类游戏的核心架构，确保无限世界的可扩展性和内存效率。

### III. 模块化游戏系统

每个游戏子系统（物理、背包、合成、生物 AI）MUST 作为独立模块实现，通过事件系统通信。
模块 MUST 可独立测试，不依赖其他模块的具体实现。

**理由**: 模块化设计支持增量开发、独立测试和未来扩展（如 Mod 支持）。

### IV. 响应式输入处理

输入系统 MUST 支持多种输入方式：
- 键盘 + 鼠标（桌面端）
- 触摸控制（移动端）
- 手柄支持（可选）

输入处理 MUST 与游戏逻辑分离，通过统一的输入抽象层传递事件。

**理由**: Web 平台需要适配多种设备，统一的输入抽象确保跨平台一致性。

### V. 渐进式加载与性能优化

系统 MUST 实现：
- 资源的按需加载（纹理、模型、音效）
- 纹理图集（Texture Atlas）减少 Draw Call
- 实例化渲染（Instanced Rendering）优化大量相同方块
- Web Worker 处理非渲染计算（地形生成、路径寻找）

**理由**: 浏览器环境资源有限，渐进式加载和优化策略确保流畅的用户体验。

## Technical Standards

### 技术栈要求

- **前端框架**: TypeScript + Vite
- **渲染引擎**: Three.js (WebGL 2.0)
- **状态管理**: 自定义 ECS (Entity-Component-System) 或轻量级状态库
- **构建工具**: Vite + ESBuild
- **测试框架**: Vitest + Playwright (E2E)

### 性能标准

| 指标 | 桌面端目标 | 移动端目标 |
|------|-----------|-----------|
| 帧率 | 60 FPS | 30 FPS |
| 首屏加载 | < 3s | < 5s |
| 内存占用 | < 512 MB | < 256 MB |
| 可见距离 | 16 区块 | 8 区块 |

### 代码规范

- 所有公共 API MUST 有 TypeScript 类型定义
- 复杂算法 MUST 有单元测试覆盖
- 渲染相关代码 MUST 有性能基准测试

## Development Workflow

### 开发流程

1. **功能规划**: 创建 spec.md 定义用户故事和验收标准
2. **技术设计**: 创建 plan.md 确定技术方案和项目结构
3. **任务分解**: 创建 tasks.md 按用户故事组织任务
4. **增量实现**: 按优先级完成用户故事，每个故事可独立测试
5. **性能验证**: 每个里程碑进行性能基准测试

### 质量门禁

- 代码 MUST 通过 ESLint + Prettier 检查
- 核心模块 MUST 有 > 80% 测试覆盖率
- 性能敏感代码 MUST 有基准测试
- PR MUST 经过代码审查

### 分支策略

- `main`: 稳定版本
- `develop`: 开发集成
- `feature/*`: 功能分支
- `hotfix/*`: 紧急修复

## Governance

### 修订流程

1. 提出修订提案（Issue 或 PR）
2. 团队讨论并达成共识
3. 更新宪法文档，递增版本号
4. 同步更新受影响的模板和文档

### 版本策略

- **MAJOR**: 核心原则变更或删除
- **MINOR**: 新增原则或重大扩展
- **PATCH**: 措辞优化、澄清、格式调整

### 合规审查

- 所有 PR MUST 验证是否符合宪法原则
- 复杂度偏离 MUST 在 plan.md 的 Complexity Tracking 中记录并说明理由
- 定期（每月）审查宪法与实际开发的一致性

**Version**: 1.0.0 | **Ratified**: 2025-12-12 | **Last Amended**: 2025-12-12
