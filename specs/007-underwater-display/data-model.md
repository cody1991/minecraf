# Data Model: 水下显示优化

**Feature**: 007-underwater-display  
**Date**: 2025-12-12

## 实体定义

### 1. UnderwaterEffect（新增）

水下视觉效果管理器，负责在玩家进入/离开水下时切换视觉效果。

| 属性 | 类型 | 说明 |
|------|------|------|
| isActive | boolean | 当前是否启用水下效果 |
| fogColor | THREE.Color | 水下雾颜色 (0x1a3a5c) |
| fogDensity | number | 雾密度 (0.04) |
| normalBackground | THREE.Color | 正常背景色 (0x87ceeb) |
| underwaterBackground | THREE.Color | 水下背景色 (0x1a3a5c) |

**方法**:
- `update(isSubmerged: boolean)`: 根据玩家状态切换效果
- `enable()`: 启用水下效果
- `disable()`: 禁用水下效果

### 2. 修改：Chunk.isFaceExposed

增强面暴露判断逻辑，支持透明方块。

**新增参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| blockType | BlockType | 当前方块类型 |

**新逻辑**:
```
IF 当前方块是透明的:
  返回 相邻方块是AIR 或 相邻方块类型不同
ELSE:
  返回 相邻方块是AIR 或 相邻方块是透明的
```

### 3. 常量定义（ChunkConstants.ts 新增）

| 常量 | 值 | 说明 |
|------|------|------|
| UNDERWATER_FOG_COLOR | 0x1a3a5c | 水下雾颜色（深蓝色） |
| UNDERWATER_FOG_DENSITY | 0.04 | 水下雾密度 |
| UNDERWATER_VISIBILITY | 16 | 水下能见度（格） |

## 状态转换

### 水下效果状态机

```
┌─────────────┐                    ┌─────────────┐
│   Normal    │ ──isSubmerged───▶ │  Underwater │
│  (no fog)   │                    │  (fog on)   │
└─────────────┘ ◀──!isSubmerged── └─────────────┘
```

**触发条件**:
- Normal → Underwater: `player.isSubmerged === true`
- Underwater → Normal: `player.isSubmerged === false`

**效果变化**:
| 状态 | scene.fog | scene.background |
|------|-----------|------------------|
| Normal | null | 0x87ceeb (天蓝) |
| Underwater | FogExp2(0x1a3a5c, 0.04) | 0x1a3a5c (深蓝) |

## 关系图

```
┌─────────────────────────────────────────────────────────┐
│                         Game                             │
│  ┌─────────┐   ┌──────────┐   ┌───────────────────────┐ │
│  │ Player  │──▶│ Movement │──▶│ PhysicsSystem         │ │
│  │         │   │          │   │ - checkSubmerged()    │ │
│  │isSubmerged◀─┴──────────┴───┤                       │ │
│  └────┬────┘                   └───────────────────────┘ │
│       │                                                   │
│       ▼                                                   │
│  ┌─────────────────┐                                     │
│  │ UnderwaterEffect│──────▶ Renderer.scene              │
│  │ - update()      │        - fog                        │
│  │ - enable()      │        - background                 │
│  │ - disable()     │                                     │
│  └─────────────────┘                                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    Chunk Rendering                       │
│  ┌─────────┐   ┌───────────────┐   ┌─────────────────┐  │
│  │ Chunk   │──▶│ isFaceExposed │──▶│ ChunkMesh.build │  │
│  │         │   │ (enhanced)    │   │                 │  │
│  └─────────┘   └───────────────┘   └─────────────────┘  │
│                       │                                  │
│                       ▼                                  │
│              ┌─────────────────┐                        │
│              │ Block.isTransparent │                    │
│              └─────────────────┘                        │
└─────────────────────────────────────────────────────────┘
```

## 验证规则

1. **水下雾密度**: 0 < fogDensity < 1
2. **能见度**: UNDERWATER_VISIBILITY > 0
3. **颜色值**: 有效的十六进制颜色 (0x000000 - 0xFFFFFF)
4. **状态一致性**: isActive 必须与 scene.fog 状态同步
