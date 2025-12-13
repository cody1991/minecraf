# Quickstart: 基础 3D 方块世界

**Feature**: 001-basic-block-world
**Date**: 2025-12-12

## Prerequisites

- Node.js 18+ 
- npm 9+
- 现代浏览器 (Chrome, Firefox, Safari, Edge)

## Setup

```bash
# 1. 初始化项目
npm create vite@latest . -- --template vanilla-ts

# 2. 安装依赖
npm install three
npm install -D @types/three

# 3. 启动开发服务器
npm run dev
```

## Project Structure

```
├── src/
│   ├── core/           # 游戏核心逻辑
│   ├── renderer/       # Three.js 渲染
│   ├── input/          # 输入处理
│   ├── player/         # 玩家控制
│   ├── ui/             # UI 组件
│   ├── utils/          # 工具函数
│   └── main.ts         # 入口
├── public/
│   └── textures/       # 纹理资源
├── tests/              # 测试文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Quick Verification

### Step 1: 验证渲染

启动后访问 `http://localhost:5173`，应看到：
- 一个由方块组成的平坦地形
- 屏幕中央的准星

### Step 2: 验证移动

1. 点击游戏画面锁定鼠标
2. 按 WASD 键移动
3. 移动鼠标旋转视角
4. 按 ESC 解锁鼠标

### Step 3: 验证方块交互

1. 瞄准一个方块
2. 左键点击 → 方块消失
3. 瞄准一个方块表面
4. 右键点击 → 新方块出现

### Step 4: 验证方块切换

1. 按数字键 1-5 切换方块类型
2. 观察 UI 显示当前选择
3. 放置方块验证类型正确

## Controls

| 操作 | 按键 |
|------|------|
| 前进 | W |
| 后退 | S |
| 左移 | A |
| 右移 | D |
| 视角 | 鼠标移动 |
| 破坏方块 | 左键点击 |
| 放置方块 | 右键点击 |
| 切换方块 | 数字键 1-5 |
| 解锁鼠标 | ESC |

## Troubleshooting

### 问题：画面黑屏
- 检查浏览器控制台是否有 WebGL 错误
- 确认浏览器支持 WebGL 2.0

### 问题：鼠标无法锁定
- 确保点击了游戏画面
- 某些浏览器需要用户交互才能锁定指针

### 问题：帧率低
- 检查是否使用了独立显卡
- 减少可见方块数量（调整世界大小）

## Development Commands

```bash
# 开发模式（热重载）
npm run dev

# 类型检查
npm run typecheck

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 运行测试
npm run test
```

## Next Steps

1. 完成 Phase 1 所有用户故事
2. 添加性能监控（FPS 显示）
3. 优化渲染性能
4. 扩展为区块化世界系统
