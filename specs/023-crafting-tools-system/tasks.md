# Tasks: 合成与工具系统

**Input**: Design documents from `/specs/023-crafting-tools-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: 未请求自动化测试，采用手动测试 + 类型检查

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create `src/crafting/` directory structure for crafting system module
- [ ] T002 [P] Create `src/tools/` directory structure for tool system module
- [ ] T003 [P] Create `src/furnace/` directory structure for furnace system module

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Extend BlockType enum in `src/core/Block.ts` to add CRAFTING_TABLE, FURNACE, FURNACE_LIT, COAL, CHARCOAL, IRON_ORE, IRON_INGOT, DIAMOND, STICK
- [ ] T005 [P] Extend BlockType enum in `src/core/Block.ts` to add all 20 tool types (WOODEN_PICKAXE through DIAMOND_HOE)
- [ ] T006 [P] Add BlockProperties for new block types (CRAFTING_TABLE, FURNACE, materials) in `src/core/Block.ts`
- [ ] T007 [P] Extend ItemSlot interface in `src/player/InventoryConstants.ts` to add durability and maxDurability fields
- [ ] T008 Create CraftingRecipe interface in `src/crafting/CraftingRecipe.ts`
- [ ] T009 [P] Create RecipeRegistry class in `src/crafting/RecipeRegistry.ts` with register() and findMatch() methods
- [ ] T010 [P] Create CraftingMatcher class in `src/crafting/CraftingMatcher.ts` with normalized position matching algorithm
- [ ] T011 Add crafting table texture (top: tool pattern, sides: wood planks) in `src/renderer/TextureAtlas.ts`
- [ ] T012 [P] Add furnace texture (front: furnace opening, sides: stone bricks) in `src/renderer/TextureAtlas.ts`
- [ ] T013 [P] Add tool item icons (20 tools, simplified pixel icons) in `src/renderer/TextureAtlas.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 2×2 手持合成 (Priority: P1) 🎯 MVP

**Goal**: 玩家可以在物品栏界面中使用 2×2 合成格制作基础物品（木板、木棍、工作台）

**Independent Test**: 打开物品栏 → 放入原木到 2×2 合成格 → 获得木板

### Implementation for User Story 1

- [ ] T014 [US1] Create basic recipes (log→planks, planks→sticks, planks→crafting_table) in `src/crafting/recipes/BasicRecipes.ts`
- [ ] T015 [US1] Add 2×2 crafting grid slots (4 input + 1 output) to InventoryUI in `src/ui/InventoryUI.ts`
- [ ] T016 [US1] Implement crafting grid drag-and-drop interaction in `src/ui/InventoryUI.ts`
- [ ] T017 [US1] Connect crafting grid to RecipeRegistry for real-time recipe matching in `src/ui/InventoryUI.ts`
- [ ] T018 [US1] Implement output slot click handler to consume ingredients and add result to inventory in `src/ui/InventoryUI.ts`
- [ ] T019 [US1] Handle crafting grid item return on inventory close in `src/ui/InventoryUI.ts`

**Checkpoint**: 2×2 crafting functional - can craft planks, sticks, crafting table from inventory

---

## Phase 4: User Story 2 - 工作台放置与 3×3 合成 (Priority: P1)

**Goal**: 玩家可以放置工作台方块，右键打开 3×3 合成界面

**Independent Test**: 放置工作台 → 右键打开 → 使用 3×3 合成格制作木镐

### Implementation for User Story 2

- [ ] T020 [US2] Add CRAFTING_TABLE to PLACEABLE_BLOCKS array in `src/core/Block.ts`
- [ ] T021 [US2] Create CraftingTableUI class with 3×3 grid + output slot + player inventory in `src/ui/CraftingTableUI.ts`
- [ ] T022 [US2] Implement drag-and-drop between crafting grid and inventory in `src/ui/CraftingTableUI.ts`
- [ ] T023 [US2] Connect 3×3 grid to RecipeRegistry for recipe matching in `src/ui/CraftingTableUI.ts`
- [ ] T024 [US2] Add right-click detection for CRAFTING_TABLE block in `src/player/BlockInteraction.ts`
- [ ] T025 [US2] Integrate CraftingTableUI open/close with game state in `src/main.ts`
- [ ] T026 [US2] Handle ESC/E key to close crafting table and return items in `src/ui/CraftingTableUI.ts`
- [ ] T027 [US2] Handle item drop as ItemEntity when inventory full on close in `src/ui/CraftingTableUI.ts`

**Checkpoint**: Crafting table functional - can place, open, and use 3×3 crafting

---

## Phase 5: User Story 3 - 工具制作与使用 (Priority: P1)

**Goal**: 玩家可以制作工具，工具影响挖掘速度并有耐久度

**Independent Test**: 制作木镐 → 挖掘石头速度 2x → 耐久度减少 → 60 次后损坏

### Implementation for User Story 3

- [ ] T028 [P] [US3] Create ToolMaterial and ToolType enums in `src/tools/ToolTypes.ts`
- [ ] T029 [P] [US3] Create ToolProperties interface and TOOL_PROPERTIES map in `src/tools/ToolProperties.ts`
- [ ] T030 [US3] Create ToolSystem class with isTool(), getProperties(), getSpeedMultiplier(), useTool() in `src/tools/ToolSystem.ts`
- [ ] T031 [US3] Create tool recipes (4 materials × 5 tool types = 20 recipes) in `src/crafting/recipes/ToolRecipes.ts`
- [ ] T032 [US3] Modify Inventory.addItem() to set durability for tool items in `src/player/Inventory.ts`
- [ ] T033 [US3] Modify DiggingManager to query ToolSystem for speed multiplier in `src/player/DiggingManager.ts`
- [ ] T034 [US3] Modify DiggingManager to call useTool() and reduce durability on block break in `src/player/DiggingManager.ts`
- [ ] T035 [US3] Implement tool destruction when durability reaches 0 in `src/player/DiggingManager.ts`
- [ ] T036 [US3] Create DurabilityBar UI component for displaying tool durability in `src/ui/DurabilityBar.ts`
- [ ] T037 [US3] Integrate DurabilityBar with HotbarUI to show durability on selected tool in `src/ui/HotbarUI.ts`
- [ ] T038 [US3] Add tool break sound effect trigger in `src/player/DiggingManager.ts`

**Checkpoint**: Tool system functional - crafting, speed bonus, durability, and destruction work

---

## Phase 6: User Story 4 - 熔炉放置与冶炼 (Priority: P2)

**Goal**: 玩家可以放置熔炉，使用燃料冶炼物品，后台持续运行

**Independent Test**: 放置熔炉 → 添加煤炭和铁矿石 → 10 秒后获得铁锭

### Implementation for User Story 4

- [ ] T039 [P] [US4] Create SmeltingRecipe interface in `src/furnace/SmeltingRecipe.ts`
- [ ] T040 [P] [US4] Create FuelRegistry with burn times (coal 80s, charcoal 80s, planks 15s, logs 15s) in `src/furnace/FuelRegistry.ts`
- [ ] T041 [US4] Create FurnaceState interface and Furnace class in `src/furnace/Furnace.ts`
- [ ] T042 [US4] Create FurnaceManager class with createFurnace(), removeFurnace(), update() in `src/furnace/FurnaceManager.ts`
- [ ] T043 [US4] Implement smelting logic (fuel consumption, progress, output) in `src/furnace/FurnaceManager.ts`
- [ ] T044 [US4] Add FURNACE to PLACEABLE_BLOCKS and handle placement in `src/core/Block.ts`
- [ ] T045 [US4] Create FurnaceUI class with fuel/input/output slots and progress bar in `src/ui/FurnaceUI.ts`
- [ ] T046 [US4] Implement drag-and-drop for furnace slots in `src/ui/FurnaceUI.ts`
- [ ] T047 [US4] Add right-click detection for FURNACE block in `src/player/BlockInteraction.ts`
- [ ] T048 [US4] Integrate FurnaceUI open/close with game state in `src/main.ts`
- [ ] T049 [US4] Integrate FurnaceManager.update() into game loop in `src/main.ts`
- [ ] T050 [US4] Handle furnace destruction - drop all items as ItemEntity in `src/furnace/FurnaceManager.ts`
- [ ] T051 [US4] Create smelting recipes (iron_ore→iron_ingot, food items) in `src/furnace/SmeltingRecipe.ts`
- [ ] T052 [US4] Add furnace lit texture swap when burning in `src/furnace/FurnaceManager.ts`

**Checkpoint**: Furnace system functional - placement, smelting, background processing work

---

## Phase 7: User Story 5 - 配方系统完善 (Priority: P2)

**Goal**: 完善形状配方和无形状配方的匹配逻辑

**Independent Test**: 测试配方偏移匹配、无形状配方匹配

### Implementation for User Story 5

- [ ] T053 [US5] Implement pattern offset matching (recipe can be placed anywhere in grid) in `src/crafting/CraftingMatcher.ts`
- [ ] T054 [US5] Implement shapeless recipe matching (only check types and counts) in `src/crafting/CraftingMatcher.ts`
- [ ] T055 [US5] Add furnace recipe (8 cobblestone → furnace) in `src/crafting/recipes/FurnaceRecipes.ts`
- [ ] T056 [US5] Validate all 2×2 recipes work in 3×3 grid in `src/crafting/CraftingMatcher.ts`

**Checkpoint**: Recipe system complete - all matching patterns work correctly

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T057 [P] Add crafting/tool/furnace data to save system in `src/storage/SaveData.ts`
- [ ] T058 [P] Add crafting/tool/furnace data loading from save in `src/storage/SaveManager.ts`
- [ ] T059 Ensure single UI open at a time (close inventory when opening crafting table) in `src/main.ts`
- [ ] T060 Add inventory full warning message when cannot take crafting output in `src/ui/InventoryUI.ts`
- [ ] T061 [P] Run typecheck and fix any TypeScript errors
- [ ] T062 Manual testing: complete flow from log → planks → sticks → crafting table → wooden pickaxe
- [ ] T063 Manual testing: furnace smelting with background processing

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 (2×2 crafting) → US2 (crafting table) → US3 (tools) is recommended order
  - US4 (furnace) can start after US1
  - US5 (recipe polish) can start after US1
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies
- **User Story 2 (P1)**: Can start after US1 (needs basic recipe system)
- **User Story 3 (P1)**: Can start after US2 (needs 3×3 crafting for tool recipes)
- **User Story 4 (P2)**: Can start after US1 (needs basic crafting for furnace recipe)
- **User Story 5 (P2)**: Can start after US1 (enhances recipe matching)

### Parallel Opportunities

- T002, T003 can run in parallel with T001
- T005, T006, T007 can run in parallel with T004
- T009, T010 can run in parallel with T008
- T012, T013 can run in parallel with T011
- T028, T029 can run in parallel
- T039, T040 can run in parallel
- T057, T058 can run in parallel with T061

---

## Parallel Example: Foundational Phase

```bash
# Launch all BlockType extensions together:
Task: "Extend BlockType for CRAFTING_TABLE, FURNACE, materials in src/core/Block.ts"
Task: "Extend BlockType for 20 tool types in src/core/Block.ts"
Task: "Add BlockProperties for new blocks in src/core/Block.ts"
Task: "Extend ItemSlot interface in src/player/InventoryConstants.ts"

# Launch all texture tasks together:
Task: "Add crafting table texture in src/renderer/TextureAtlas.ts"
Task: "Add furnace texture in src/renderer/TextureAtlas.ts"
Task: "Add tool item icons in src/renderer/TextureAtlas.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (2×2 crafting)
4. **STOP and VALIDATE**: Can craft planks, sticks, crafting table from inventory
5. This is a functional MVP - player can progress from nothing to basic items

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test → **MVP: Basic crafting works**
3. Add User Story 2 → Test → **Can use crafting table for advanced recipes**
4. Add User Story 3 → Test → **Tools work with speed bonus and durability**
5. Add User Story 4 → Test → **Furnace smelting works**
6. Add User Story 5 → Test → **All recipe patterns work correctly**
7. Complete Polish → **Production ready**

### Recommended Order

```
Phase 1 → Phase 2 → US1 → US2 → US3 → US4 → US5 → Phase 8
```

This order ensures:
- Basic crafting (US1) enables crafting table creation
- Crafting table (US2) enables tool recipes
- Tool system (US3) uses 3×3 recipes from US2
- Furnace (US4) can be done in parallel with US3 if desired
- Recipe polish (US5) refines the system after core features work

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Manual testing is primary validation method (no automated tests requested)
