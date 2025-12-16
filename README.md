# WebCraft：在浏览器中重塑 Minecraft 的技术之旅

> 一个完全运行在浏览器中的 3D 体素沙盒游戏，使用 TypeScript + Three.js 从零构建

---

## 引言：当 Minecraft 遇见 Web

2009 年，Markus "Notch" Persson 创造了 Minecraft，这款看似简单的方块游戏彻底改变了游戏行业。它证明了一个道理：游戏的魅力不在于画面的精细程度，而在于它能给予玩家多大的创造自由。十五年后的今天，Minecraft 已经成为史上销量最高的电子游戏，累计销量超过 3 亿份。

那么，如果我们想在浏览器中重现这种体验，需要克服哪些技术挑战？这正是 WebCraft 项目要回答的问题。

WebCraft 是一个完全运行在浏览器中的 3D 体素沙盒游戏。它不需要任何后端服务器，不需要安装任何插件，只需要一个现代浏览器，就能让玩家在无限的方块世界中自由探索、建造和创造。这个项目展示了 Web 技术在游戏开发领域的巨大潜力，也是对"浏览器能做什么"这个问题的一次深度探索。

本文将带你深入 WebCraft 的技术内核，从渲染引擎到物理系统，从地形生成到生态模拟，从音频处理到数据持久化，全面解析这个项目的设计理念和实现细节。

---

## 第一章：技术架构全景

### 1.1 技术栈选型

在开始任何项目之前，技术栈的选择都是至关重要的决策。对于一个 3D 游戏来说，这个选择更加关键，因为它直接决定了项目的性能上限和开发效率。

**TypeScript 5.6** 作为主开发语言是一个经过深思熟虑的选择。JavaScript 虽然是 Web 的原生语言，但它的动态类型特性在大型项目中会带来严重的维护问题。TypeScript 的静态类型系统不仅能在编译期捕获大量错误，还能为 IDE 提供强大的智能提示支持。在 WebCraft 这样拥有超过 100 个源文件、涉及复杂 3D 数学运算的项目中，类型安全是保证代码质量的基石。

```typescript
// TypeScript 的类型系统让复杂的数据结构一目了然
interface IPhysicsBody {
  position: { x: number; y: number; z: number }
  velocity: { x: number; y: number; z: number }
  width: number
  height: number
  isGrounded: boolean
  isInWater: boolean
}
```

**Three.js 0.170** 是目前最成熟的 WebGL 3D 渲染库。它封装了底层的 WebGL API，提供了场景图、材质系统、光照模型等高级抽象，让开发者可以专注于游戏逻辑而不是图形学细节。

**Vite 6.0** 作为构建工具，提供了极快的开发服务器启动速度和热模块替换（HMR）功能。在开发过程中，修改代码后几乎可以立即看到效果，这对于需要频繁调试的游戏开发来说是巨大的效率提升。

除了这三个核心依赖，项目还充分利用了浏览器的原生 API：

- **Web Audio API**：用于实现 3D 空间音效和程序化音频合成
- **IndexedDB**：用于存储游戏存档，支持大容量数据持久化
- **LocalStorage**：用于保存用户偏好设置
- **requestAnimationFrame**：用于实现稳定的游戏主循环

### 1.2 项目架构设计

WebCraft 采用了模块化的架构设计，将游戏的各个子系统清晰地分离：

```
src/
├── main.ts              # 入口文件，初始化游戏
├── core/                # 核心模块
│   ├── Game.ts          # 游戏主循环
│   ├── World.ts         # 世界管理
│   ├── Chunk.ts         # 区块数据结构
│   └── Block.ts         # 方块定义（38种）
├── renderer/            # 渲染模块
│   ├── Renderer.ts      # Three.js 封装
│   ├── ChunkMesh.ts     # 区块网格生成
│   └── CameraController.ts # 相机控制
├── physics/             # 物理系统
│   ├── PhysicsSystem.ts # 物理主系统
│   └── Collision.ts     # 碰撞检测
├── terrain/             # 地形生成
│   ├── TerrainGenerator.ts  # 地形生成器
│   ├── BiomeGenerator.ts    # 生物群系
│   └── NoiseGenerator.ts    # Simplex 噪声
├── entities/            # 实体系统（9种动物）
├── audio/               # 音频系统
├── weather/             # 天气与昼夜系统
├── storage/             # 存档系统
└── ui/                  # UI 组件
```

这种架构遵循了**单一职责原则**：每个模块只负责一个特定的功能领域。例如，`PhysicsSystem` 只处理物理模拟，不关心渲染；`ChunkMesh` 只负责生成网格，不关心区块数据如何存储。

### 1.3 游戏主循环

游戏的心脏是主循环（Game Loop）。WebCraft 使用 `requestAnimationFrame` 实现了一个稳定的主循环：

```typescript
private gameLoop(): void {
  requestAnimationFrame(() => this.gameLoop())
  
  const now = performance.now()
  const deltaTime = Math.min((now - this.lastFrameTime) / 1000, 0.1)
  this.lastFrameTime = now
  
  // 1. 更新时间系统（昼夜循环）
  this.timeSystem.update(deltaTime)
  
  // 2. 更新天气系统
  this.weatherSystem.update(deltaTime)
  
  // 3. 更新物理系统
  this.physicsSystem.update(deltaTime)
  
  // 4. 更新实体（动物 AI）
  this.entityManager.update(deltaTime, playerPosition, world)
  
  // 5. 更新区块加载
  this.chunkManager.update(playerX, playerY, playerZ)
  
  // 6. 渲染场景
  this.renderer.render(this.scene, this.camera)
}
```

注意 `deltaTime` 的计算：我们限制最大值为 0.1 秒，防止页面失去焦点后恢复时出现"时间跳跃"导致的物理异常。

---

## 第二章：开发历程——21 次迭代的演进之路

WebCraft 的开发采用了规格驱动的迭代开发模式。每个功能都有完整的规格文档，定义了用户故事、验收标准和技术要求。以下是项目从零到一的完整演进历程：

### 迭代 001：基础 3D 方块世界

**目标**：创建一个可交互的 3D 方块世界原型

这是整个项目的起点。我们建立了游戏的基础框架：第一人称视角（WASD 移动 + 鼠标视角控制）、5 种基础方块类型（草地、泥土、石头、木头、沙子）、左键破坏/右键放置的交互机制，以及一个 32×32 的平坦方块地面。这个迭代验证了核心玩法的可行性——玩家可以在简单的世界中自由移动、破坏和建造。

### 迭代 002：区块与地形生成系统

**目标**：实现无限世界和程序化地形生成

平坦的世界很快就会让人感到无聊。这个迭代引入了两个关键系统：将世界划分为 16×16×16 的区块单元，支持按需加载和卸载；使用 Simplex 噪声算法生成起伏的自然地形，根据高度自动分布方块类型——表层草地、中层泥土、底层石头；使用 3D 噪声在地下雕刻出可探索的洞穴空间。区块系统是支撑大型世界的基础架构，通过只渲染玩家视野范围内的区块，实现了理论上无限大的世界。

### 迭代 003：物理与碰撞系统

**目标**：让玩家与世界产生真实的物理交互

没有物理系统，玩家会像幽灵一样穿过所有方块。这个迭代实现了：重力系统（玩家受到恒定的向下加速度）、AABB 碰撞检测（使用轴对齐包围盒检测玩家与方块的碰撞）、分轴解析（分别处理 X、Y、Z 轴的碰撞，实现沿墙滑动效果）、跳跃功能（按空格键跳跃，高度刚好能跳上一个方块）。碰撞检测的核心挑战在于处理玩家同时接触多个方块的情况，我们采用了分轴解析的方法避免了玩家被"卡"在角落的问题。

### 迭代 004：罗马斗兽场出生地图

**目标**：创建一个令人印象深刻的出生点

一个好的出生点能给玩家留下深刻的第一印象。我们选择了罗马斗兽场作为出生地标：使用参数方程生成 80×60 方块的椭圆形竞技场，3 层递进的阶梯式观众席，环绕建筑的标志性拱门，以及部分区域设计为坍塌状态的废墟效果。斗兽场不仅是视觉地标，也是玩家的重生点。

### 迭代 005：方块纹理系统

**目标**：用真实纹理替代纯色方块

纯色方块虽然能表达基本信息，但缺乏视觉吸引力。这个迭代引入了完整的纹理系统：将所有 16×16 像素的方块纹理合并为纹理图集优化渲染性能；草方块顶部是绿色草地、侧面是带草边的泥土、底部是纯泥土的多面纹理；新增圆石、砖块、玻璃、水、树叶、原木、木板、雪等 8 种方块；正确处理玻璃、水、树叶等透明/半透明方块的渲染顺序。纹理系统让游戏的视觉效果有了质的飞跃。

### 迭代 006：随机地形生成与冲刺移动

**目标**：让每次游戏都有不同的世界

固定的地图很快会失去新鲜感。这个迭代实现了：每次新游戏生成不同的世界种子确保地形的随机性；大片湖泊、连绵山脉、开阔平原，每种地形都有足够的规模感；不同地形类型之间有平滑的渐变过渡；按住 Shift 键以 1.5 倍速度移动的冲刺功能。地形生成使用了分形噪声技术——将多个不同频率和振幅的噪声叠加，创造出既有大尺度地貌又有小尺度细节的自然地形。

### 迭代 007：水下显示优化

**目标**：修复水体显示问题，增强水下体验

水是游戏中最复杂的元素之一。这个迭代解决了多个水相关的问题：确保水平面以下的所有空间都被水方块正确填充；相邻水方块之间的面不渲染避免视觉混乱；玩家潜入水下时屏幕呈现蓝色色调；水下 16 格以外的物体逐渐衰减不可见。水下效果使用了后处理着色器实现。

### 迭代 008：生物群系与天气系统

**目标**：让世界充满生机

一个空旷的世界是死寂的。这个迭代引入了动态元素：牛、羊、猪、鸡四种经典动物，具有随机移动、吃草、逃跑等 AI 行为；20 分钟一个游戏日的昼夜循环，太阳东升西落，月亮和星空在夜晚出现；日出橙红、正午湛蓝、日落温暖、夜晚深邃的天空变化；随机出现的降雨天气，雨滴粒子从天空落下。动物使用了简单但有效的状态机 AI，在"闲置"、"漫游"、"逃跑"三种状态之间切换。

### 迭代 009：生态系统完善

**目标**：扩展动植物种类，控制生成密度

基础生态系统建立后，我们进一步丰富了它：新增兔子、狼、狐狸三种陆地动物以及水中的鱼类；玫瑰、郁金香、雏菊、矢车菊等花卉，橡树、桦树、云杉等树木；每个区块最多 6 只动物、树木最小间距 8 格的密度控制；斗兽场周围 50 格内不生成动物的出生点保护。鱼类的 AI 与陆地动物不同，它们只能在水中移动，遇到水边界时会自动掉头。

### 迭代 010：罗马斗兽场视觉增强

**目标**：提升斗兽场的建筑精美程度

初版斗兽场过于简陋，这个迭代进行了全面的视觉升级：凸出的装饰性壁柱、水平檐口装饰带、顶层女儿墙的立体结构；拱形顶部装饰（拱券石效果）、两侧半圆柱装饰的拱门细节；观众席层次变化、走廊拱形天花板、竞技场地面图案的内部装饰；不规则断裂边缘、散落石块、植被点缀的废墟效果。我们使用了至少 3 种不同材质来区分结构柱、填充墙和装饰元素。

### 迭代 011：古代地标建筑群

**目标**：在出生点附近添加更多世界奇观

一座斗兽场不够，我们要打造一个"世界奇观"主题区域：埃及金字塔（经典四面体结构，底边 40 方块，内部有可探索的迷宫走廊和密室）；中国故宫（红墙黄瓦、对称布局、多进院落，展现中华古典建筑的庄严）；欧洲城堡（高耸塔楼、厚重城墙、护城河，中世纪风格的防御建筑）。金字塔内部的迷宫采用了"中等难度"策略——有死路增加探索感，但主路径用火把标记确保玩家不会完全迷失。

### 迭代 012：声音与地图系统

**目标**：增加听觉反馈和导航工具

沉默的游戏缺乏沉浸感。这个迭代引入了完整的音频和地图系统：循环播放的背景音乐，支持音量调节和静音；脚步声、摔落声、动物叫声，根据距离调整音量的音效系统；右上角圆形实时小地图，显示周围地形和玩家朝向；按 M 键打开全屏大地图，支持缩放查看；左上角实时显示 X、Y、Z 坐标。音频系统使用 Web Audio API 实现，采用程序化音频合成减少资源加载时间。

### 迭代 013：人物模型与视角切换

**目标**：让玩家能看到自己的角色

第一人称视角虽然沉浸，但玩家看不到自己的角色。这个迭代解决了这个问题：按 V 键在第一人称和第三人称之间切换；第三人称摄像机位于角色身后 5 米，自动避免穿墙；5 种方块人风格的预设角色模型，与游戏世界视觉一致；进入游戏前可预览和选择角色模型的角色选择界面。第三人称摄像机使用射线检测，当摄像机路径上有障碍物时自动拉近距离。

### 迭代 014：视觉效果优化

**目标**：修复视觉问题，提升整体美感

用户反馈指出了几个视觉问题，这个迭代进行了针对性修复：从简单黄色圆形升级为带柔和光晕的自然太阳；将不自然的血红色夜空改为深蓝色/藏青色；黄昏到夜晚的颜色平滑渐变；清晰边框、适中对比度、方向指示的小地图美化。这些看似小的改动，对整体游戏氛围有显著影响。

### 迭代 015：更新操作面板

**目标**：让操作说明与实际功能保持同步

随着功能的增加，操作面板已经过时。这个迭代更新了所有操作说明：WASD 移动、Space 跳跃、Shift 冲刺的移动控制；1-9,0 选择方块、Tab 循环切换的方块操作；M 地图、V 视角切换、C 角色选择的功能快捷键；Space 上浮、Shift 下潜的水中控制；按逻辑类别分组的操作说明。操作面板是新玩家的第一印象，清晰完整的操作说明能大大降低上手门槛。

### 迭代 016：修复动物浮空问题

**目标**：确保动物正确生成在地面上

玩家报告动物有时会悬浮在空中。这个迭代深入修复了生成逻辑：向下扫描实际方块数据确定真实地面位置，而非仅依赖理论高度图；检测水方块拒绝在水中生成陆地动物；忽略树叶和树干将它们视为非有效地面；确保动物头部上方有足够的非固体空间。问题的根源在于地形生成使用的高度图与实际方块数据可能不一致（如洞穴、树木等情况）。

### 迭代 017：方块音效系统

**目标**：为方块交互添加听觉反馈

建造和破坏是游戏的核心操作，却一直缺少音效反馈。这个迭代补齐了这块：将 38 种方块映射到 6 种音效类别（石头、木头、泥土、沙子、玻璃、植物）；方块被破坏时播放对应材质的破坏音效；方块被放置时播放对应材质的放置音效；快速连续操作时限制播放频率避免音频过载。音效使用程序化合成而非预录文件，通过调整频率、波形和包络用代码生成各种材质的音效。

### 迭代 018：世界存档系统

**目标**：让玩家的建造成果能够保存

没有存档功能，所有建造都会在刷新页面后消失。这是最后一个核心功能迭代：使用 IndexedDB 浏览器本地数据库持久化保存世界数据；支持 5 个手动存档槽位，可命名、重命名、删除；方块数据、玩家位置、世界种子全部保存；每 5 分钟自动保存到专用槽位防止意外丢失。存档系统只保存玩家修改过的区块，结合保存的世界种子，加载时可以重新生成未探索区域的地形，大大减少了存储空间需求。

### 迭代 019：物品栏系统

**目标**：实现完整的物品管理和快捷栏功能

一个完整的沙盒游戏需要物品管理系统。这个迭代实现了：破坏方块后掉落物品实体，物品在地面弹跳并受重力影响；玩家靠近时物品自动被吸引并拾取，伴随拾取音效；36 格背包系统（9 格快捷栏 + 27 格存储空间），支持物品堆叠（最多 64 个）；按 E 键打开/关闭背包界面，支持拖拽整理物品；底部快捷栏 UI 显示物品图标和数量，数字键 1-9 快速选择，鼠标滚轮切换当前物品；放置方块时从背包消耗物品。物品实体使用 Three.js 渲染，正确映射纹理图集的 UV 坐标显示对应方块颜色。

### 迭代 020：生存机制

**目标**：实现完整的生存玩法系统

沙盒游戏的核心魅力之一是生存挑战。这个迭代引入了完整的生存机制：10 颗心生命值系统，受伤时屏幕闪红并有 0.5 秒无敌时间；10 格饥饿值系统，跑步和跳跃消耗饥饿，饥饿值高于 18 时自动恢复生命；氧气系统，水下 10 秒氧气耗尽后开始溺水伤害；环境伤害系统，包括摔落伤害（超过 3 格高度）、岩浆伤害（每 0.5 秒 4 点）、仙人掌伤害（接触 1 点）；死亡与重生机制，生命值归零显示死亡画面，点击重生按钮传送回出生点并恢复满状态。UI 方面，生命值用红心显示在物品栏左上方，饥饿值用食物图标显示在右上方，水下时氧气泡泡显示在饥饿值上方。

### 迭代 021：食物系统

**目标**：实现完整的食物获取和进食机制

生存游戏需要食物来恢复饥饿值。这个迭代实现了完整的食物系统：5 种食物物品（生牛肉、生猪排、生羊肉、生鸡肉、生兔肉），每种对应一种动物；左键攻击动物的战斗系统，4 格攻击范围、0.4 秒攻击冷却、每次 2 点伤害；动物死亡后掉落对应食物物品实体，可拾取到背包；右键长按 1.6 秒进食，屏幕中央显示进食进度条；进食完成后恢复对应饥饿值（牛肉 3 点、猪排 3 点、羊肉 2 点、鸡肉 2 点、兔肉 3 点）；进食过程中松开右键或移动会取消进食。音效方面，攻击和进食都有对应的程序化合成音效。

---

## 第三章：渲染系统深度解析

### 3.1 Three.js 渲染器配置

WebCraft 的渲染系统建立在 Three.js 之上：

```typescript
export class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // 光照配置
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(100, 200, 100)
  }
}
```

关于 `setPixelRatio` 的设置：在高 DPI 屏幕上，我们将其限制在 2 以内，在视觉质量和性能之间取得平衡。

### 3.2 区块网格生成

区块网格生成是渲染系统中最复杂也最关键的部分。一个 16×16×16 的区块最多包含 4096 个方块，WebCraft 采用了多种优化策略：

**面剔除（Face Culling）**：只渲染暴露在空气中的方块面。如果一个方块的某一面被另一个实心方块遮挡，那么这个面就不需要渲染。这个优化可以将需要渲染的三角形数量减少 80% 以上。

```typescript
private shouldRenderFace(x: number, y: number, z: number, 
                         dx: number, dy: number, dz: number): boolean {
  const neighbor = this.getBlockAt(x + dx, y + dy, z + dz)
  // 如果相邻方块是空气或透明方块，需要渲染这个面
  if (neighbor === BlockType.AIR) return true
  if (isTransparent(neighbor)) return true
  return false
}
```

**三层渲染顺序**：为了正确处理透明物体：

1. **不透明层（renderOrder = 0）**：草地、石头等实心方块
2. **半透明层（renderOrder = 1）**：树叶、玻璃等
3. **水面层（renderOrder = 2）**：水面最后渲染以正确混合

**纹理图集（Texture Atlas）**：所有方块的纹理被打包到一张大图中，通过 UV 坐标选择不同纹理区域，避免频繁切换纹理。

### 3.3 植物渲染

花草等植物方块采用"X 形交叉面"的渲染方式：

```typescript
private addCrossPlanes(x: number, y: number, z: number): void {
  // 创建两个对角交叉的平面
  // 第一个对角面：从 (x, y, z) 到 (x+1, y+1, z+1)
  // 第二个对角面：从 (x+1, y, z) 到 (x, y+1, z+1)
}
```

这种渲染方式使得植物从任何角度看都有立体感，同时只需要 4 个三角形。

### 3.4 相机控制与视角切换

WebCraft 支持第一人称和第三人称两种视角，通过 V 键切换。第三人称视角有一个重要细节——相机碰撞检测：

```typescript
private updateThirdPersonCamera(): void {
  // 计算理想的相机位置（玩家身后 5 米）
  const idealPosition = this.player.position.clone()
    .add(new THREE.Vector3(0, 2, -5).applyQuaternion(this.player.quaternion))
  
  // 射线检测：从玩家到理想位置之间是否有障碍物
  const raycaster = new THREE.Raycaster(this.player.position, direction)
  const intersects = raycaster.intersectObjects(this.world.getCollidables())
  
  if (intersects.length > 0 && intersects[0].distance < 5) {
    // 有障碍物，将相机拉近
    this.camera.position.copy(this.player.position)
      .add(direction.multiplyScalar(intersects[0].distance - 0.5))
  }
}
```

### 3.5 天空渲染

WebCraft 的天空使用自定义 GLSL 着色器，根据片元在世界空间中的高度，在顶部颜色和底部颜色之间进行插值，创造出自然的天空渐变效果。天空系统还包括随时间移动的太阳、月亮，以及夜晚可见的星空粒子系统。

---

## 第四章：物理系统

### 4.1 物理系统概述

WebCraft 实现了一个简化但有效的物理系统：

```typescript
export class PhysicsSystem {
  private readonly GRAVITY = 20           // 重力加速度 (m/s²)
  private readonly WATER_GRAVITY = 8      // 水下重力
  private readonly JUMP_VELOCITY = 8      // 跳跃初速度 (m/s)
  private readonly TERMINAL_VELOCITY = 50 // 终端速度 (m/s)
  
  update(body: IPhysicsBody, world: ICollisionWorld, deltaTime: number): void {
    // 应用重力
    const gravity = body.isInWater ? this.WATER_GRAVITY : this.GRAVITY
    body.velocity.y -= gravity * deltaTime
    body.velocity.y = Math.max(body.velocity.y, -this.TERMINAL_VELOCITY)
    
    // 水中阻力
    if (body.isInWater) {
      body.velocity.x *= 0.8
      body.velocity.z *= 0.8
    }
    
    // 分轴碰撞检测与解析
    this.resolveCollisions(body, world, deltaX, deltaY, deltaZ)
  }
}
```

### 4.2 AABB 碰撞检测

AABB（Axis-Aligned Bounding Box，轴对齐包围盒）是游戏开发中最常用的碰撞检测方法：

```typescript
export function aabbIntersects(a: AABB, b: AABB): boolean {
  return (
    a.minX < b.maxX && a.maxX > b.minX &&
    a.minY < b.maxY && a.maxY > b.minY &&
    a.minZ < b.maxZ && a.maxZ > b.minZ
  )
}
```

### 4.3 分轴碰撞解析

碰撞检测按 Y → X → Z 的顺序解析，先处理垂直方向，确保玩家能正确站在地面上。每个轴独立处理，如果发生碰撞，将物体推到方块表面并清零该轴速度。

### 4.4 水下物理

当玩家进入水中时，物理行为发生明显变化：

- **降低重力**：从 20 m/s² 降到 8 m/s²，模拟浮力
- **增加阻力**：水平移动速度衰减
- **游泳控制**：空格键上浮，Shift 键下潜
- **视觉效果**：蓝色滤镜覆盖

---

## 第五章：地形生成系统

### 5.1 程序化生成的魅力

Minecraft 类游戏最吸引人的特性之一就是"无限世界"。程序化生成的核心思想是：使用数学函数根据位置坐标计算出地形数据。只要函数是确定性的（相同输入产生相同输出），就能保证世界的一致性。

### 5.2 Simplex 噪声

WebCraft 使用 Simplex 噪声生成地形。分形噪声（fBm）通过叠加不同频率和振幅的噪声来创造更自然的地形：

```typescript
fractalNoise2D(x: number, y: number, octaves: number = 4): number {
  let total = 0, amplitude = 1, frequency = 1, maxValue = 0
  
  for (let i = 0; i < octaves; i++) {
    total += this.noise2D(x * frequency, y * frequency) * amplitude
    maxValue += amplitude
    amplitude *= 0.5   // persistence
    frequency *= 2     // lacunarity
  }
  
  return total / maxValue
}
```

低频噪声决定大的地形起伏（山脉、平原），高频噪声添加细节（小丘、凹坑）。

### 5.3 地形生成器

```typescript
export class TerrainGenerator {
  private readonly BASE_HEIGHT = 64
  private readonly WATER_LEVEL = 62
  
  private getBlockAt(worldX: number, worldY: number, worldZ: number, 
                     surfaceHeight: number, biome: BiomeType): BlockType {
    // 地表以上
    if (worldY > surfaceHeight) {
      return worldY <= this.WATER_LEVEL ? BlockType.WATER : BlockType.AIR
    }
    
    // 检测洞穴（3D 噪声）
    if (this.isCave(worldX, worldY, worldZ)) return BlockType.AIR
    
    // 地表层
    if (worldY === surfaceHeight) return this.getSurfaceBlock(biome)
    
    // 次表层
    if (worldY >= surfaceHeight - 3) return this.getSubsurfaceBlock(biome)
    
    // 深层
    return BlockType.STONE
  }
}
```

### 5.4 生物群系系统

WebCraft 实现了五种生物群系：平原、湖泊、山地、沙漠、雪地。生物群系由两个噪声维度（湿度和温度）决定：

```typescript
getBiomeAt(worldX: number, worldZ: number): BiomeType {
  // 出生点保护区强制为平原
  if (Math.sqrt(worldX * worldX + worldZ * worldZ) < 100) {
    return BiomeType.PLAINS
  }
  
  const moisture = this.noise.noise2D(worldX * 0.005, worldZ * 0.005)
  const temperature = this.noise.noise2D(worldX * 0.005 + 1000, worldZ * 0.005 + 1000)
  
  if (moisture > 0.3) return BiomeType.LAKE
  if (temperature < -0.2) return BiomeType.MOUNTAIN
  if (temperature > 0.4 && moisture < -0.2) return BiomeType.DESERT
  
  return BiomeType.PLAINS
}
```

### 5.5 地标建筑生成

WebCraft 生成了四个标志性建筑：

- **罗马斗兽场**：位于出生点，椭圆形设计，四层拱门结构
- **金字塔**：位于东侧，可探索的内部迷宫结构
- **故宫**：位于西南侧，中式宫殿建筑群
- **城堡**：位于西北侧，欧式城堡风格

每个地标都有独立的生成器，根据世界坐标返回对应位置的方块类型。

---

## 第六章：生态系统

### 6.1 动物系统

WebCraft 实现了 9 种动物：7 种陆地动物（牛、猪、羊、鸡、兔子、狼、狐狸）和 2 种水生鱼类。

```typescript
export abstract class Animal {
  protected state: 'idle' | 'wandering' | 'fleeing' = 'idle'
  
  protected updateAI(deltaTime: number, playerPosition: THREE.Vector3): void {
    switch (this.state) {
      case 'idle':
        // 站立不动，偶尔转头
        break
      case 'wandering':
        // 向随机目标位置移动
        this.moveTowards(this.targetPosition, deltaTime)
        break
      case 'fleeing':
        // 远离玩家
        const awayFromPlayer = this.position.clone().sub(playerPosition).normalize()
        this.moveTowards(this.position.clone().add(awayFromPlayer.multiplyScalar(10)), deltaTime)
        break
    }
  }
}
```

动物由 `EntityManager` 统一管理，按区块分组，只有玩家附近的区块中的动物才会被更新。

### 6.2 昼夜循环

一个游戏日等于 24000 ticks，约 20 分钟现实时间：

```typescript
export class TimeSystem {
  getTimeOfDay(): 'dawn' | 'day' | 'dusk' | 'night' { ... }
  
  getLightLevel(): number {
    // 返回 0.2（夜间）到 1.0（白天）的光照强度
  }
  
  getSunAngle(): number {
    return (this.time / 24000) * Math.PI * 2
  }
}
```

### 6.3 天气系统

天气系统支持晴天和雨天，5-10 分钟随机切换，30 秒平滑过渡。雨效果使用粒子系统实现。

---

## 第七章：音频系统

### 7.1 Web Audio API

WebCraft 的音频系统完全基于 Web Audio API，支持背景音乐、音效和 3D 空间音效：

```typescript
export class AudioManager {
  private context: AudioContext
  private masterGain: GainNode
  private musicGain: GainNode
  private sfxGain: GainNode
  
  // 播放 3D 空间音效
  play3DSFX(buffer: AudioBuffer, position: THREE.Vector3, 
            listenerPosition: THREE.Vector3): void {
    const panner = this.context.createPanner()
    panner.panningModel = 'HRTF'
    panner.distanceModel = 'inverse'
    panner.refDistance = 1
    panner.maxDistance = 50
    // 设置位置...
  }
}
```

### 7.2 程序化音频合成

WebCraft 的一个特色是程序化音频合成。脚步声、动物叫声等音效在运行时使用 Web Audio API 合成：

```typescript
synthesizeFootstep(material: 'grass' | 'stone' | 'sand' | 'wood'): AudioBuffer {
  const buffer = this.context.createBuffer(1, sampleRate * 0.1, sampleRate)
  const data = buffer.getChannelData(0)
  
  for (let i = 0; i < data.length; i++) {
    let sample = (Math.random() - 0.5) * 2  // 基础噪声
    
    switch (material) {
      case 'grass': sample *= Math.exp(-t * 30) * 0.3; break
      case 'stone': sample *= Math.exp(-t * 50) * 0.5; break
      // ...
    }
    data[i] = sample
  }
  return buffer
}
```

程序化音频的优势：减小文件体积、无限变化、动态适应。

---

## 第八章：数据持久化

### 8.1 存档系统设计

WebCraft 使用 IndexedDB 实现存档系统，支持 5 个手动槽位和 1 个自动存档：

```typescript
export class SaveManager {
  async saveGame(slot: number, world: World, player: Player): Promise<void> {
    const saveData: SaveData = {
      slot,
      timestamp: Date.now(),
      worldSeed: world.getSeed(),
      playerPosition: { x, y, z },
      playerRotation: { x, y },
      timeOfDay: world.getTimeSystem().getTime(),
      weather: world.getWeatherSystem().getCurrentWeather()
    }
    
    // 保存主存档数据
    await saveStore.put(saveData)
    
    // 保存已修改的区块
    for (const chunk of world.getModifiedChunks()) {
      await chunkStore.put({
        id: `${slot}_${chunk.x}_${chunk.y}_${chunk.z}`,
        blocks: Array.from(chunk.getBlocks())
      })
    }
  }
}
```

### 8.2 自动存档

自动存档功能每 5 分钟在后台保存游戏进度，防止意外丢失。

---

## 第九章：物品栏系统

### 9.1 系统架构

物品栏系统是沙盒游戏的核心组件，WebCraft 实现了完整的物品管理功能：

```typescript
// 物品栏常量定义
export const INVENTORY_TOTAL_SLOTS = 36    // 总槽位数
export const HOTBAR_SLOTS = 9              // 快捷栏槽位
export const MAX_STACK_SIZE = 64           // 最大堆叠数量
export const ITEM_PICKUP_RANGE = 2         // 拾取范围（米）
export const ITEM_ATTRACTION_RANGE = 3     // 吸引范围（米）

// 物品槽数据结构
interface ItemSlot {
  blockType: BlockType    // 方块类型
  count: number           // 数量（1-64）
}
```

### 9.2 物品实体（ItemEntity）

当玩家破坏方块时，会生成一个 3D 物品实体掉落在世界中：

```typescript
export class ItemEntity {
  private mesh: THREE.Mesh
  private velocity: THREE.Vector3
  private readonly GRAVITY = 20
  private readonly BOUNCE_FACTOR = 0.4
  
  update(deltaTime: number, world: World, playerPos: THREE.Vector3): void {
    // 应用重力
    this.velocity.y -= this.GRAVITY * deltaTime
    
    // 地面碰撞检测与弹跳
    if (this.isOnGround(world)) {
      this.velocity.y = Math.abs(this.velocity.y) * this.BOUNCE_FACTOR
    }
    
    // 玩家吸引效果
    const distance = this.position.distanceTo(playerPos)
    if (distance < ITEM_ATTRACTION_RANGE) {
      const direction = playerPos.clone().sub(this.position).normalize()
      const strength = 1 - (distance / ITEM_ATTRACTION_RANGE)
      this.position.add(direction.multiplyScalar(strength * 8 * deltaTime))
    }
  }
}
```

物品实体的渲染使用了纹理图集的 UV 映射，确保每种方块显示正确的颜色：

```typescript
// UV 坐标计算 - 从纹理图集中获取正确的方块纹理
const uScale = 1 / config.columns
const vScale = 1 / config.rows
const u0 = tileIndex * uScale
const u1 = u0 + uScale
const v0 = (config.rows - 1) * vScale  // 纹理图集第一行
const v1 = 1.0
```

### 9.3 背包系统（Inventory）

背包类管理 36 个物品槽位，支持添加、移除、交换等操作：

```typescript
export class Inventory {
  private slots: (ItemSlot | null)[] = new Array(36).fill(null)
  
  addItem(blockType: BlockType, count: number = 1): number {
    // 优先堆叠到已有同类物品的槽位
    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i]
      if (slot?.blockType === blockType && slot.count < MAX_STACK_SIZE) {
        const canAdd = Math.min(count, MAX_STACK_SIZE - slot.count)
        slot.count += canAdd
        count -= canAdd
        if (count === 0) return 0
      }
    }
    
    // 放入空槽位
    for (let i = 0; i < this.slots.length; i++) {
      if (!this.slots[i]) {
        const canAdd = Math.min(count, MAX_STACK_SIZE)
        this.slots[i] = { blockType, count: canAdd }
        count -= canAdd
        if (count === 0) return 0
      }
    }
    
    return count  // 返回未能放入的数量
  }
  
  swapSlots(from: number, to: number): void {
    [this.slots[from], this.slots[to]] = [this.slots[to], this.slots[from]]
  }
}
```

### 9.4 快捷栏 UI（HotbarUI）

快捷栏显示在屏幕底部，支持多种交互方式：

```typescript
export class HotbarUI {
  private selectedIndex: number = 0
  
  constructor() {
    // 数字键 1-9 快速选择
    document.addEventListener('keydown', (e) => {
      const num = parseInt(e.key)
      if (num >= 1 && num <= 9) {
        this.selectSlot(num - 1)
      }
    })
    
    // 鼠标滚轮切换
    document.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        this.selectedIndex = (this.selectedIndex + 1) % 9
      } else {
        this.selectedIndex = (this.selectedIndex + 8) % 9
      }
      this.updateSelection()
    })
  }
}
```

### 9.5 背包界面（InventoryUI）

按 E 键打开的背包界面使用 HTML5 Drag and Drop API 实现物品拖拽：

```typescript
export class InventoryUI {
  private createSlotElement(index: number): HTMLElement {
    const slot = document.createElement('div')
    slot.draggable = true
    
    slot.addEventListener('dragstart', (e) => {
      e.dataTransfer?.setData('text/plain', index.toString())
      this.dragSourceIndex = index
    })
    
    slot.addEventListener('drop', (e) => {
      e.preventDefault()
      const fromIndex = parseInt(e.dataTransfer?.getData('text/plain') || '-1')
      if (fromIndex >= 0) {
        this.inventory.swapSlots(fromIndex, index)
        this.updateDisplay()
      }
    })
    
    return slot
  }
}
```

背包界面布局为 4 行 9 列，顶部 3 行是存储区，底部 1 行是快捷栏，与快捷栏 UI 同步显示。

---

## 第十章：性能优化

### 10.1 区块加载优化

- **视距控制**：只加载玩家视距范围内的区块（默认 8 个区块 = 128 米）
- **优先级队列**：距离玩家更近的区块优先加载
- **异步加载**：区块生成在后台进行，不阻塞主线程

### 10.2 渲染优化

- **视锥剔除**：只渲染在相机视锥内的区块
- **空区块跳过**：完全由空气组成的区块不渲染
- **网格缓存**：区块网格只在方块变化时重建

### 10.3 内存优化

- **类型化数组**：使用 `Uint8Array` 存储方块数据，每个方块仅 1 字节
- **对象池**：复用频繁创建的对象，减少 GC 压力
- **缓存策略**：生物群系查询结果缓存

---

## 第十一章：开发实践

### 11.1 规格驱动开发

WebCraft 采用规格驱动开发。每个功能在开发前都会编写详细的规格文档，包括用户故事、验收标准、功能需求和成功指标。项目共有 21 个完整的功能规格文档。

### 11.2 模块化开发

每个功能都是独立的模块，有清晰的接口定义，可以独立开发和测试。

---

## 第十二章：总结与展望

### 12.1 项目成就

WebCraft 展示了 Web 技术在游戏开发领域的强大能力：

- **无限世界**：基于程序化生成的无限可探索世界
- **完整的物理系统**：重力、碰撞、水下物理
- **丰富的生态系统**：9 种动物、多种植物、昼夜天气
- **沉浸式音频**：背景音乐、3D 音效、程序化合成
- **持久化存档**：5 个手动槽位 + 自动存档
- **物品管理**：36 格背包、物品堆叠、拖拽整理
- **生存机制**：生命值、饥饿值、氧气值、环境伤害、死亡重生
- **食物系统**：攻击动物获取食物、进食恢复饥饿值

### 12.2 技术亮点

1. **纯前端实现**：不依赖任何后端服务
2. **程序化生成**：噪声函数驱动的无限世界
3. **高效渲染**：面剔除、视锥剔除、区块管理
4. **程序化音频**：运行时合成音效
5. **规格驱动开发**：20 个完整的功能规格
6. **生存系统**：完整的生命/饥饿/氧气管理

### 12.3 未来方向

- **合成系统**：工作台、合成配方
- **工具系统**：镐/斧/锹/剑、工具等级、耐久度
- **多人游戏**：WebSocket/WebRTC 联机
- **更多方块类型**：红石系统、装饰方块
- **生物行为**：驯服、繁殖
- **地形特性**：更多生物群系、地下结构
- **性能优化**：Web Worker、WebGPU

### 12.4 结语

WebCraft 项目证明了：浏览器已经不再只是展示网页的工具，它是一个功能完整的应用平台。通过现代 Web API（WebGL、Web Audio、IndexedDB），我们可以构建出媲美原生应用的复杂游戏。

这个项目也是对"简单"的一次致敬。Minecraft 的成功告诉我们，游戏的魅力不在于技术的复杂程度，而在于它能否激发玩家的创造力。WebCraft 虽然在技术上做了大量工作，但最终目标始终是：给玩家一个可以自由创造的世界。

---

## 附录：操作指南

### 基础操作

| 按键 | 功能 |
|------|------|
| WASD / 方向键 | 移动 |
| 鼠标 | 视角控制 |
| 空格 | 跳跃 / 水中上浮 |
| Shift | 冲刺 / 水中下潜 |
| 左键 | 破坏方块 |
| 右键 | 放置方块 |

### 功能键

| 按键 | 功能 |
|------|------|
| 1-9 | 选择快捷栏物品 |
| 滚轮 | 切换快捷栏物品 |
| E | 打开/关闭背包 |
| M | 打开/关闭大地图 |
| V | 切换第一/三人称视角 |
| C | 角色选择 |
| ESC | 存档菜单 |

---

*本文约 10000 字，详细介绍了 WebCraft 项目的技术架构、核心系统和开发实践。*
