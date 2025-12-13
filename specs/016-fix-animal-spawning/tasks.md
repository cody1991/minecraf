# Tasks: 修复动物浮空问题

**Input**: Design documents from `/specs/016-fix-animal-spawning/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: 未明确要求，本任务列表不包含测试任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Phase 1: Setup (准备工作)

- [x] T001 确认 `src/core/Block.ts` 已导出 `isSolid()`, `isTreeLog()`, `isTreeLeaves()` 函数
- [x] T002 确认 `src/core/World.ts` 的 `getBlock()` 方法可正常访问区块数据

---

## Phase 2: Foundational (基础修改)

- [x] T003 在 `src/entities/AnimalSpawner.ts` 中添加 `BlockType`, `isSolid`, `isTreeLog`, `isTreeLeaves` 的导入
- [x] T004 在 `src/entities/AnimalSpawner.ts` 中定义 `MAX_SCAN_DEPTH = 20` 常量

---

## Phase 3: User Story 1 - 动物正确生成在地面上 (Priority: P1) 🎯 MVP

- [x] T005 [US1] 重写 `findSpawnPosition()` 方法，实现向下扫描逻辑

---

## Phase 4: User Story 2 - 动物不在水中生成 (Priority: P1)

- [x] T006 [US2] 在扫描循环中检测 `BlockType.WATER` 并放弃该位置

---

## Phase 5: User Story 3 - 动物不卡在方块内 (Priority: P2)

- [x] T007 [US3] 检查地面上方 2 格空间是否为非固体、非水方块

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T008 在文件头部注释中添加 `Feature: 016-fix-animal-spawning` 标记
- [ ] T009 验证游戏中动物生成正确

---

## Implementation Summary

**Completed**: 2025-12-13

### Changes Made

1. **Added imports**: `BlockType`, `isSolid`, `isTreeLog`, `isTreeLeaves` from `../core/Block`
2. **Added constant**: `MAX_SCAN_DEPTH = 20`
3. **Rewrote `findSpawnPosition()`**:
   - Uses `getHeightAt()` as scan starting point (not final height)
   - Scans downward up to 20 blocks to find actual solid ground
   - Excludes tree logs and leaves as valid ground
   - Detects water and rejects position if found
   - Checks 2 blocks above ground for clearance (feet + head)
