/**
 * ECHO – DARK FANTASY REALM
 * RPG Progression, Inventory, Crafting, Equipment Tiers, Skill Upgrades & 120+ Quests
 */

export type HotbarSlotKind =
  | 'sword'
  | 'pickaxe'
  | 'axe'
  | 'bow'
  | 'wood'
  | 'stone'
  | 'food'
  | 'more';

export type VoxelBlockKind =
  | 'wood_plank'
  | 'cobblestone'
  | 'castle_brick'
  | 'glow_lantern'
  | 'glass'
  | 'roof_slate'
  | 'crystal_block'
  | 'door'
  | 'bed'
  | 'table'
  | 'chair'
  | 'chest'
  | 'workbench';

export interface DarkInventory {
  wood: number;
  stone: number;
  iron: number;
  gold: number;
  crystal: number;
  food: number;
  cookedFood: number;
  arrows: number;
  woodPlanks: number;
  cobbleBlocks: number;
  brickBlocks: number;
  lanternBlocks: number;
  glassBlocks: number;
  roofBlocks: number;
  crystalBlocks: number;
  doorBlocks: number;
  bedBlocks: number;
  tableBlocks: number;
  chairBlocks: number;
  chestBlocks: number;
  workbenchBlocks: number;
  potions: number;
  essence: number;
}

export interface CraftRecipe {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'building' | 'gear' | 'consumable';
  desc: string;
  costs: Partial<Record<keyof DarkInventory, number>>;
  grant?: Partial<Record<keyof DarkInventory, number>>;
  upgradeWeaponTier?: number;
  upgradeArmorTier?: number;
  upgradeBowTier?: number;
}

export type QuestCategory = 'main' | 'hunting' | 'gathering' | 'exploration';

export interface DarkQuest {
  id: string;
  index: number;
  category: QuestCategory;
  titleEn: string;
  titleAr: string;
  descEn: string;
  target: number;
  progress: number;
  completed: boolean;
  unlocked: boolean;
  xpReward: number;
  goldReward: number;
  crystalReward?: number;
  trackKey:
    | 'explore_distance'
    | 'visit_villages'
    | 'enter_caves'
    | 'visit_floating'
    | 'visit_castle'
    | 'gather_wood'
    | 'gather_stone'
    | 'gather_iron'
    | 'gather_crystal'
    | 'gather_food'
    | 'blocks_placed'
    | 'houses_built'
    | 'craft_count'
    | 'slay_total'
    | 'slay_skeleton'
    | 'slay_zombie'
    | 'slay_spider'
    | 'slay_creeper'
    | 'slay_golem'
    | 'slay_dragon'
    | 'chests_opened'
    | 'magic_casts'
    | 'player_level'
    | 'defeat_dark_boss';
}

export const WEAPON_TIERS = [
  { tier: 0, name: 'Frost Rune Blade', damage: 28, color: 0x38bdf8 },
  { tier: 1, name: 'Tempered Iron Greatsword', damage: 44, color: 0xe2e8f0 },
  { tier: 2, name: 'Amethyst Crystal Blade', damage: 68, color: 0xc084fc },
  { tier: 3, name: 'Eclipse Sovereign Blade', damage: 105, color: 0xf43f5e },
];

export const ARMOR_TIERS = [
  { tier: 0, name: 'Traveler Cloak', defense: 0.08, bonusHp: 0 },
  { tier: 1, name: 'Iron Warden Plate', defense: 0.22, bonusHp: 45 },
  { tier: 2, name: 'Crystal Battlemage Mail', defense: 0.38, bonusHp: 110 },
  { tier: 3, name: 'Shadow Overlord Aegis', defense: 0.54, bonusHp: 210 },
];

export const CRAFT_RECIPES: CraftRecipe[] = [
  {
    id: 'craft_planks',
    nameEn: 'Oak Planks (x6)',
    nameAr: 'ألواح خشبية للبناء (x6)',
    category: 'building',
    desc: 'Refine timber into 6 buildable wood blocks.',
    costs: { wood: 2 },
    grant: { woodPlanks: 6 },
  },
  {
    id: 'craft_cobble',
    nameEn: 'Stone Masonry (x6)',
    nameAr: 'أحجار بناء (x6)',
    category: 'building',
    desc: 'Cut raw stone into 6 cobblestone walls.',
    costs: { stone: 2 },
    grant: { cobbleBlocks: 6 },
  },
  {
    id: 'craft_castle_brick',
    nameEn: 'Dark Castle Brick (x6)',
    nameAr: 'طوب القلعة الداكن (x6)',
    category: 'building',
    desc: 'Fortified obsidian-slate blocks.',
    costs: { stone: 3, iron: 1 },
    grant: { brickBlocks: 6 },
  },
  {
    id: 'craft_roof',
    nameEn: 'Timber Roof Slate (x6)',
    nameAr: 'ألواح السقف (x6)',
    category: 'building',
    desc: 'Sturdy sloped roof tiles for your house.',
    costs: { wood: 2 },
    grant: { roofBlocks: 6 },
  },
  {
    id: 'craft_door',
    nameEn: 'Wooden House Door (x2)',
    nameAr: 'باب خشبي للمنزل (x2)',
    category: 'building',
    desc: 'Walk-through oak door for your house.',
    costs: { wood: 2 },
    grant: { doorBlocks: 2 },
  },
  {
    id: 'craft_windows_wood',
    nameEn: 'Framed Glass Windows (x4)',
    nameAr: 'نوافذ بإطار خشبي (x4)',
    category: 'building',
    desc: 'Craft house windows using timber.',
    costs: { wood: 2 },
    grant: { glassBlocks: 4 },
  },
  {
    id: 'craft_bed',
    nameEn: 'Cozy Bed (x1)',
    nameAr: 'سرير خشبي مريح (x1)',
    category: 'building',
    desc: 'Placeable wooden bed furniture.',
    costs: { wood: 3 },
    grant: { bedBlocks: 1 },
  },
  {
    id: 'craft_table',
    nameEn: 'Oak Table (x1)',
    nameAr: 'طاولة خشبية (x1)',
    category: 'building',
    desc: 'Sturdy dining & crafting table.',
    costs: { wood: 2 },
    grant: { tableBlocks: 1 },
  },
  {
    id: 'craft_chair',
    nameEn: 'Wooden Chairs (x2)',
    nameAr: 'كراسي خشبية (x2)',
    category: 'building',
    desc: 'Pair of carved oak chairs.',
    costs: { wood: 2 },
    grant: { chairBlocks: 2 },
  },
  {
    id: 'craft_chest',
    nameEn: 'Storage Chest (x1)',
    nameAr: 'صندوق تخزين (x1)',
    category: 'building',
    desc: 'House storage chest furniture.',
    costs: { wood: 3 },
    grant: { chestBlocks: 1 },
  },
  {
    id: 'craft_workbench',
    nameEn: 'Crafting Workbench (x1)',
    nameAr: 'طاولة العمل والصناعة (x1)',
    category: 'building',
    desc: 'House builder workbench.',
    costs: { wood: 2 },
    grant: { workbenchBlocks: 1 },
  },
  {
    id: 'craft_lantern',
    nameEn: 'Glow Lanterns (x4)',
    nameAr: 'فوانيس مضيئة (x4)',
    category: 'building',
    desc: 'Warm light blocks for homes & caves.',
    costs: { wood: 1, gold: 1 },
    grant: { lanternBlocks: 4 },
  },
  {
    id: 'craft_glass',
    nameEn: 'Crystal Windows (x4)',
    nameAr: 'نوافذ زجاجية (x4)',
    category: 'building',
    desc: 'Translucent glass panes for houses.',
    costs: { stone: 2, crystal: 1 },
    grant: { glassBlocks: 4 },
  },
  {
    id: 'craft_cooked_meat',
    nameEn: 'Roasted Feast (+45 HP)',
    nameAr: 'طعام مشوي (+45 صحة)',
    category: 'consumable',
    desc: 'Cook raw rations over wood embers.',
    costs: { food: 1, wood: 1 },
    grant: { cookedFood: 2 },
  },
  {
    id: 'craft_potion',
    nameEn: 'Crimson Elixir (x2)',
    nameAr: 'إكسير الشفاء والسحر (x2)',
    category: 'consumable',
    desc: 'Restores 70 HP & 40 Mana.',
    costs: { crystal: 1, food: 1 },
    grant: { potions: 2 },
  },
  {
    id: 'craft_arrows',
    nameEn: 'Shadow Arrows (x16)',
    nameAr: 'أسهم الظلال (x16)',
    category: 'consumable',
    desc: 'Fletched arrows for ranged hunting.',
    costs: { wood: 2, iron: 1 },
    grant: { arrows: 16 },
  },
  {
    id: 'upgrade_sword_1',
    nameEn: 'Forge Iron Greatsword',
    nameAr: 'ترقية السيف إلى الحديدي',
    category: 'gear',
    desc: 'Boosts base sword attack to 44 DMG.',
    costs: { iron: 5, wood: 4 },
    upgradeWeaponTier: 1,
  },
  {
    id: 'upgrade_sword_2',
    nameEn: 'Forge Amethyst Blade',
    nameAr: 'ترقية السيف إلى البلوري',
    category: 'gear',
    desc: 'Boosts base sword attack to 68 DMG.',
    costs: { crystal: 6, iron: 6, gold: 4 },
    upgradeWeaponTier: 2,
  },
  {
    id: 'upgrade_sword_3',
    nameEn: 'Forge Eclipse Sovereign Blade',
    nameAr: 'صياغة سيف الكسوف الأسطوري',
    category: 'gear',
    desc: 'Ultimate 105 DMG Dark Realm blade.',
    costs: { crystal: 12, gold: 10, essence: 5 },
    upgradeWeaponTier: 3,
  },
  {
    id: 'upgrade_armor_1',
    nameEn: 'Forge Iron Warden Plate',
    nameAr: 'درع الحارس الحديدي',
    category: 'gear',
    desc: '22% damage reduction & +45 Max HP.',
    costs: { iron: 6, stone: 4 },
    upgradeArmorTier: 1,
  },
  {
    id: 'upgrade_armor_2',
    nameEn: 'Forge Crystal Mail',
    nameAr: 'درع البلورات البنفسجية',
    category: 'gear',
    desc: '38% damage reduction & +110 Max HP.',
    costs: { crystal: 8, gold: 4, iron: 6 },
    upgradeArmorTier: 2,
  },
  {
    id: 'upgrade_armor_3',
    nameEn: 'Forge Shadow Sovereign Aegis',
    nameAr: 'درع سيد الظلال الأسطوري',
    category: 'gear',
    desc: '54% damage reduction & +210 Max HP.',
    costs: { crystal: 14, gold: 12, essence: 6 },
    upgradeArmorTier: 3,
  },
];

export class DarkRealmProgress {
  public level: number = 1;
  public xp: number = 0;
  public xpToNext: number = 120;
  public skillPoints: number = 1;

  // Player Upgrade Ranks
  public statRanks = {
    vitality: 0, // +25 Max HP per rank
    arcana: 0,   // +15 Max Mana per rank
    strength: 0, // +8 Attack per rank
    bastion: 0,  // +4% Defense per rank
    swiftness: 0,// +6% Move & Gather speed per rank
  };

  public weaponTier: number = 0;
  public armorTier: number = 0;

  public hp: number = 100;
  public maxHp: number = 100;
  public mana: number = 50;
  public maxMana: number = 50;
  public hunger: number = 100;

  public activeSlotIndex: number = 0;
  public activeBlockKind: VoxelBlockKind = 'wood_plank';
  public buildMode: boolean = false;
  public darkBossDefeated: boolean = false;

  public inventory: DarkInventory = {
    wood: 12,
    stone: 10,
    iron: 2,
    gold: 1,
    crystal: 2,
    food: 4,
    cookedFood: 16,
    arrows: 24,
    woodPlanks: 64,
    cobbleBlocks: 32,
    brickBlocks: 8,
    lanternBlocks: 6,
    glassBlocks: 6,
    roofBlocks: 12,
    crystalBlocks: 4,
    doorBlocks: 2,
    bedBlocks: 1,
    tableBlocks: 1,
    chairBlocks: 2,
    chestBlocks: 1,
    workbenchBlocks: 1,
    potions: 2,
    essence: 0,
  };

  public counters: Record<DarkQuest['trackKey'], number> = {
    explore_distance: 0,
    visit_villages: 0,
    enter_caves: 0,
    visit_floating: 0,
    visit_castle: 0,
    gather_wood: 0,
    gather_stone: 0,
    gather_iron: 0,
    gather_crystal: 0,
    gather_food: 0,
    blocks_placed: 0,
    houses_built: 0,
    craft_count: 0,
    slay_total: 0,
    slay_skeleton: 0,
    slay_zombie: 0,
    slay_spider: 0,
    slay_creeper: 0,
    slay_golem: 0,
    slay_dragon: 0,
    chests_opened: 0,
    magic_casts: 0,
    player_level: 1,
    defeat_dark_boss: 0,
  };

  public visitedZones = new Set<string>();
  public quests: DarkQuest[] = [];

  public onQuestCompleted?: (quest: DarkQuest) => void;
  public onLevelUp?: (newLevel: number) => void;
  public onStatsChanged?: () => void;

  constructor() {
    this.buildQuestCatalog();
    this.recomputeVitals(true);
  }

  private buildQuestCatalog(): void {
    const q: DarkQuest[] = [];
    let idx = 1;

    const pushMain = (
      id: string,
      titleEn: string,
      titleAr: string,
      descEn: string,
      trackKey: DarkQuest['trackKey'],
      target: number,
      xp: number,
      gold: number
    ) => {
      q.push({
        id,
        index: idx++,
        category: 'main',
        titleEn,
        titleAr,
        descEn,
        target,
        progress: 0,
        completed: false,
        unlocked: q.filter((x) => x.category === 'main').length === 0,
        xpReward: xp,
        goldReward: gold,
        trackKey,
      });
    };

    // 12 Main Story Chapters (from arrival to Final Dark Boss)
    pushMain('main_explore', 'Explore the new world', 'استكشف العالم الجديد', 'Venture into the Shadow Realm with your 3 companions.', 'explore_distance', 65, 80, 2);
    pushMain('main_gather_timber', 'Gather Timber & Stone', 'اجمع الخشب والأحجار', 'Chop trees and mine stone to prepare for survival.', 'gather_wood', 8, 100, 2);
    pushMain('main_build_shelter', 'Build Your Outpost', 'شيّد مأوىً آمناً', 'Enter Build Mode [B] and place 12 blocks to fortify your camp.', 'blocks_placed', 12, 140, 3);
    pushMain('main_village', 'Reach the Lantern Village', 'بلوغ القرية المسكونة', 'Investigate the haunted lantern village and talk to its ghosts.', 'visit_villages', 1, 150, 3);
    pushMain('main_cave', 'Brave the Torch Cave', 'اقتحام كهف المشاعل', 'Enter an underground cavern and defeat cave monsters.', 'enter_caves', 1, 180, 4);
    pushMain('main_crystals', 'Harvest Shadow Crystals', 'جمع بلورات الظل البنفسجية', 'Mine 6 glowing purple crystals from caves and outcrops.', 'gather_crystal', 6, 220, 4);
    pushMain('main_golem', 'Shatter the Stone Golem', 'تدمير عملاق الصخر البنفسجي', 'Defeat a towering Crystal Stone Golem.', 'slay_golem', 1, 280, 5);
    pushMain('main_floating', 'Ascend to a Floating Island', 'الصعود إلى الجزر الطائرة', 'Reach the floating sky ruins via bridges or built stairs.', 'visit_floating', 1, 320, 6);
    pushMain('main_dragon', 'Slay a Shadow Dragon', 'اصطياد تنين الظلال', 'Bring down one of the circling Shadow Dragons.', 'slay_dragon', 1, 450, 8);
    pushMain('main_castle', 'Breach the Giant Dark Castle', 'اقتحام القلعة الداكنة العملاقة', 'Cross the obsidian causeway into the Dark Citadel.', 'visit_castle', 1, 400, 8);
    pushMain('main_army', 'Purge the Citadel Guard', 'تطهير حرس القلعة', 'Defeat 25 monsters across the Shadow Realm.', 'slay_total', 25, 420, 10);
    pushMain('main_boss', 'Defeat the Dark Boss', 'اهزم زعيم الظلام النهائي', 'Slay Malakor, Lord of Eclipse inside the Giant Castle throne courtyard!', 'defeat_dark_boss', 1, 1500, 25);

    // Build 108 additional progressive Hunting, Gathering/Building & Exploration challenges (Total = 120 Quests!)
    const huntingSpecs: Array<{
      key: DarkQuest['trackKey'];
      labelEn: string;
      labelAr: string;
      targets: number[];
    }> = [
      { key: 'slay_total', labelEn: 'Monster Hunter', labelAr: 'صائد الوحوش', targets: [3, 8, 15, 30, 50, 75, 100, 150, 200] },
      { key: 'slay_skeleton', labelEn: 'Bone Breaker (Skeletons)', labelAr: 'محطم الهياكل', targets: [2, 5, 10, 18, 30, 45] },
      { key: 'slay_zombie', labelEn: 'Crypt Sweeper (Zombies)', labelAr: 'قاهر الموتى الأحياء', targets: [2, 6, 12, 20, 35, 50] },
      { key: 'slay_spider', labelEn: 'Arachnid Bane (Cave Spiders)', labelAr: 'قاهر عناكب الكهوف', targets: [2, 4, 8, 15, 25] },
      { key: 'slay_creeper', labelEn: 'Blast Defuser (Creepers)', labelAr: 'صائد المتفجرات', targets: [2, 4, 8, 12, 20] },
      { key: 'slay_golem', labelEn: 'Titan Crusher (Golems)', labelAr: 'قاهر العمالقة', targets: [1, 2, 4, 6, 10] },
      { key: 'slay_dragon', labelEn: 'Dragon Slayer', labelAr: 'قاتل التنانين', targets: [1, 2, 3, 5, 8] },
    ];

    for (const spec of huntingSpecs) {
      spec.targets.forEach((t, ti) => {
        q.push({
          id: `hunt_${spec.key}_${ti}`,
          index: idx++,
          category: 'hunting',
          titleEn: `${spec.labelEn} Tier ${ti + 1}`,
          titleAr: `${spec.labelAr} - المستوى ${ti + 1}`,
          descEn: `Defeat ${t} enemies of this type across the world.`,
          target: t,
          progress: 0,
          completed: false,
          unlocked: true,
          xpReward: 65 + ti * 55,
          goldReward: 1 + ti,
          trackKey: spec.key,
        });
      });
    }

    const gatherSpecs: Array<{
      key: DarkQuest['trackKey'];
      labelEn: string;
      labelAr: string;
      targets: number[];
    }> = [
      { key: 'gather_wood', labelEn: 'Darkwood Lumberjack', labelAr: 'حطاب الغابات المظلمة', targets: [5, 12, 25, 45, 80, 120] },
      { key: 'gather_stone', labelEn: 'Quarry Miner', labelAr: 'منقب الصخور', targets: [5, 12, 25, 45, 80, 120] },
      { key: 'gather_iron', labelEn: 'Iron Prospector', labelAr: 'مستخرج الحديد', targets: [3, 8, 15, 25, 40] },
      { key: 'gather_crystal', labelEn: 'Amethyst Seeker', labelAr: 'جامع البلورات', targets: [2, 5, 10, 18, 30] },
      { key: 'gather_food', labelEn: 'Wilderness Forager', labelAr: 'جامع المؤن والطعام', targets: [3, 8, 15, 25] },
      { key: 'blocks_placed', labelEn: 'Master Architect', labelAr: 'المعماري المبدع', targets: [5, 15, 35, 70, 120, 200] },
      { key: 'houses_built', labelEn: 'Homestead Builder', labelAr: 'باني المنازل', targets: [1, 2, 3, 5] },
      { key: 'craft_count', labelEn: 'Master Crafter', labelAr: 'الصانع الماهر', targets: [2, 5, 12, 24, 40] },
    ];

    for (const spec of gatherSpecs) {
      spec.targets.forEach((t, ti) => {
        q.push({
          id: `gath_${spec.key}_${ti}`,
          index: idx++,
          category: 'gathering',
          titleEn: `${spec.labelEn} Tier ${ti + 1}`,
          titleAr: `${spec.labelAr} - المستوى ${ti + 1}`,
          descEn: `Reach ${t} total progress for this survival discipline.`,
          target: t,
          progress: 0,
          completed: false,
          unlocked: true,
          xpReward: 55 + ti * 45,
          goldReward: 1 + ti,
          trackKey: spec.key,
        });
      });
    }

    const exploreSpecs: Array<{
      key: DarkQuest['trackKey'];
      labelEn: string;
      labelAr: string;
      targets: number[];
    }> = [
      { key: 'explore_distance', labelEn: 'Shadow Pathfinder', labelAr: 'مستكشف الآفاق', targets: [100, 300, 650, 1200, 2200, 3500, 5000] },
      { key: 'visit_villages', labelEn: 'Village Chronicler', labelAr: 'زائر القرى المهجورة', targets: [1, 2, 3, 4] },
      { key: 'enter_caves', labelEn: 'Spelunker of the Deep', labelAr: 'مكتشف الكهوف', targets: [1, 2, 3] },
      { key: 'visit_floating', labelEn: 'Skyward Climber', labelAr: 'متسلق الجزر الطائرة', targets: [1, 2, 4, 6] },
      { key: 'chests_opened', labelEn: 'Treasure Hunter', labelAr: 'صائد الكنوز المخفية', targets: [1, 3, 6, 10, 15] },
      { key: 'magic_casts', labelEn: 'Arcane Channeler', labelAr: 'مستخدم السحر', targets: [3, 10, 25, 50] },
      { key: 'player_level', labelEn: 'Ascendant Hero', labelAr: 'ترقية البطل', targets: [2, 4, 6, 8, 10, 12, 15] },
    ];

    for (const spec of exploreSpecs) {
      spec.targets.forEach((t, ti) => {
        q.push({
          id: `exp_${spec.key}_${ti}`,
          index: idx++,
          category: 'exploration',
          titleEn: `${spec.labelEn} Tier ${ti + 1}`,
          titleAr: `${spec.labelAr} - المستوى ${ti + 1}`,
          descEn: `Achieve milestone ${t} while exploring mysteries across the realm.`,
          target: t,
          progress: 0,
          completed: false,
          unlocked: true,
          xpReward: 70 + ti * 50,
          goldReward: 1 + ti,
          trackKey: spec.key,
        });
      });
    }

    // Ensure at least 120+ quests by adding regional bounty challenges if under 120
    while (q.length < 122) {
      const n = q.length + 1;
      q.push({
        id: `bounty_${n}`,
        index: idx++,
        category: 'hunting',
        titleEn: `Shadow Bounty #${n}`,
        titleAr: `مهمة مطاردة الظلال #${n}`,
        descEn: `Slay ${10 + (n % 20) * 5} monsters across the Shadow Realm.`,
        target: 10 + (n % 20) * 5,
        progress: 0,
        completed: false,
        unlocked: true,
        xpReward: 120,
        goldReward: 3,
        trackKey: 'slay_total',
      });
    }

    this.quests = q;
  }

  public getWeaponStats() {
    const base = WEAPON_TIERS[Math.min(WEAPON_TIERS.length - 1, this.weaponTier)];
    return {
      ...base,
      damage: base.damage + this.statRanks.strength * 8,
    };
  }

  public getArmorStats() {
    const base = ARMOR_TIERS[Math.min(ARMOR_TIERS.length - 1, this.armorTier)];
    return {
      ...base,
      defense: Math.min(0.75, base.defense + this.statRanks.bastion * 0.04),
    };
  }

  public getSpeedMultiplier(): number {
    return 1 + this.statRanks.swiftness * 0.06;
  }

  public recomputeVitals(refill: boolean = false): void {
    const armor = this.getArmorStats();
    const prevMaxHp = this.maxHp;
    const prevMaxMana = this.maxMana;
    this.maxHp = 100 + (this.level - 1) * 15 + this.statRanks.vitality * 25 + armor.bonusHp;
    this.maxMana = 50 + (this.level - 1) * 8 + this.statRanks.arcana * 15;
    if (refill) {
      this.hp = this.maxHp;
      this.mana = this.maxMana;
    } else {
      this.hp = Math.min(this.maxHp, this.hp + Math.max(0, this.maxHp - prevMaxHp));
      this.mana = Math.min(this.maxMana, this.mana + Math.max(0, this.maxMana - prevMaxMana));
    }
  }

  public addXp(amount: number): void {
    this.xp += amount;
    while (this.xp >= this.xpToNext) {
      this.xp -= this.xpToNext;
      this.level += 1;
      this.skillPoints += 1;
      this.xpToNext = Math.round(120 * Math.pow(1.22, this.level - 1));
      this.counters.player_level = this.level;
      this.recomputeVitals(true);
      this.syncQuestProgress();
      this.onLevelUp?.(this.level);
    }
    this.onStatsChanged?.();
  }

  public upgradeSkill(stat: keyof DarkRealmProgress['statRanks']): boolean {
    if (this.skillPoints <= 0 || this.statRanks[stat] >= 12) return false;
    this.skillPoints -= 1;
    this.statRanks[stat] += 1;
    this.recomputeVitals(false);
    this.onStatsChanged?.();
    return true;
  }

  public recordProgress(key: DarkQuest['trackKey'], delta: number, absolute: boolean = false): void {
    if (absolute) {
      this.counters[key] = Math.max(this.counters[key], delta);
    } else {
      this.counters[key] += delta;
    }
    if (key === 'defeat_dark_boss' && this.counters[key] >= 1) {
      this.darkBossDefeated = true;
    }
    this.syncQuestProgress();
    this.onStatsChanged?.();
  }

  public syncQuestProgress(): void {
    let unlockedNextMain = false;
    for (const quest of this.quests) {
      if (quest.completed) continue;
      if (quest.category === 'main' && !quest.unlocked) {
        if (unlockedNextMain) {
          quest.unlocked = true;
          unlockedNextMain = false;
        } else {
          continue;
        }
      }
      const val = this.counters[quest.trackKey] || 0;
      quest.progress = Math.min(quest.target, Math.floor(val));
      if (quest.progress >= quest.target && !quest.completed) {
        quest.completed = true;
        this.inventory.gold += quest.goldReward;
        if (quest.crystalReward) this.inventory.crystal += quest.crystalReward;
        this.addXp(quest.xpReward);
        if (quest.category === 'main') {
          unlockedNextMain = true;
        }
        this.onQuestCompleted?.(quest);
      }
    }
    // Ensure next main quest is unlocked if the current one completed in same pass
    const mainQuests = this.quests.filter((q) => q.category === 'main');
    for (let i = 0; i < mainQuests.length - 1; i++) {
      if (mainQuests[i].completed && !mainQuests[i + 1].unlocked) {
        mainQuests[i + 1].unlocked = true;
      }
    }
  }

  public getActiveMainQuest(): DarkQuest {
    return (
      this.quests.find((q) => q.category === 'main' && q.unlocked && !q.completed) ||
      this.quests.find((q) => q.id === 'main_boss') ||
      this.quests[0]
    );
  }

  public getHighlightedNewQuest(): DarkQuest {
    return this.quests.find((q) => q.id === 'main_boss')!;
  }

  public canCraft(recipe: CraftRecipe): boolean {
    if (recipe.upgradeWeaponTier !== undefined && this.weaponTier >= recipe.upgradeWeaponTier) return false;
    if (recipe.upgradeArmorTier !== undefined && this.armorTier >= recipe.upgradeArmorTier) return false;
    for (const [k, amt] of Object.entries(recipe.costs)) {
      if ((this.inventory[k as keyof DarkInventory] || 0) < (amt || 0)) return false;
    }
    return true;
  }

  public craft(recipe: CraftRecipe): boolean {
    if (!this.canCraft(recipe)) return false;
    for (const [k, amt] of Object.entries(recipe.costs)) {
      this.inventory[k as keyof DarkInventory] -= amt || 0;
    }
    if (recipe.grant) {
      for (const [k, amt] of Object.entries(recipe.grant)) {
        this.inventory[k as keyof DarkInventory] += amt || 0;
      }
    }
    if (recipe.upgradeWeaponTier !== undefined) {
      this.weaponTier = Math.max(this.weaponTier, recipe.upgradeWeaponTier);
    }
    if (recipe.upgradeArmorTier !== undefined) {
      this.armorTier = Math.max(this.armorTier, recipe.upgradeArmorTier);
      this.recomputeVitals(true);
    }
    this.recordProgress('craft_count', 1);
    return true;
  }

  public consumeFood(): boolean {
    if (this.inventory.cookedFood > 0) {
      this.inventory.cookedFood -= 1;
      this.hp = Math.min(this.maxHp, this.hp + 45);
      this.mana = Math.min(this.maxMana, this.mana + 15);
      this.hunger = Math.min(100, this.hunger + 35);
      this.onStatsChanged?.();
      return true;
    }
    if (this.inventory.food > 0) {
      this.inventory.food -= 1;
      this.hp = Math.min(this.maxHp, this.hp + 20);
      this.hunger = Math.min(100, this.hunger + 20);
      this.onStatsChanged?.();
      return true;
    }
    if (this.inventory.potions > 0) {
      this.inventory.potions -= 1;
      this.hp = Math.min(this.maxHp, this.hp + 70);
      this.mana = Math.min(this.maxMana, this.mana + 40);
      this.onStatsChanged?.();
      return true;
    }
    return false;
  }

  public getBlockInventoryKey(kind: VoxelBlockKind): keyof DarkInventory {
    switch (kind) {
      case 'wood_plank': return 'woodPlanks';
      case 'cobblestone': return 'cobbleBlocks';
      case 'castle_brick': return 'brickBlocks';
      case 'glow_lantern': return 'lanternBlocks';
      case 'glass': return 'glassBlocks';
      case 'roof_slate': return 'roofBlocks';
      case 'crystal_block': return 'crystalBlocks';
      case 'door': return 'doorBlocks';
      case 'bed': return 'bedBlocks';
      case 'table': return 'tableBlocks';
      case 'chair': return 'chairBlocks';
      case 'chest': return 'chestBlocks';
      case 'workbench': return 'workbenchBlocks';
    }
  }

  public serialize() {
    return {
      level: this.level,
      xp: this.xp,
      xpToNext: this.xpToNext,
      skillPoints: this.skillPoints,
      statRanks: { ...this.statRanks },
      weaponTier: this.weaponTier,
      armorTier: this.armorTier,
      hp: this.hp,
      mana: this.mana,
      hunger: this.hunger,
      darkBossDefeated: this.darkBossDefeated,
      inventory: { ...this.inventory },
      counters: { ...this.counters },
      visitedZones: Array.from(this.visitedZones),
    };
  }

  public deserialize(data: any): void {
    if (!data || typeof data !== 'object') return;
    if (typeof data.level === 'number') this.level = data.level;
    if (typeof data.xp === 'number') this.xp = data.xp;
    if (typeof data.xpToNext === 'number') this.xpToNext = data.xpToNext;
    if (typeof data.skillPoints === 'number') this.skillPoints = data.skillPoints;
    if (data.statRanks) Object.assign(this.statRanks, data.statRanks);
    if (typeof data.weaponTier === 'number') this.weaponTier = data.weaponTier;
    if (typeof data.armorTier === 'number') this.armorTier = data.armorTier;
    if (data.inventory) Object.assign(this.inventory, data.inventory);
    if (data.counters) Object.assign(this.counters, data.counters);
    if (Array.isArray(data.visitedZones)) this.visitedZones = new Set(data.visitedZones);
    this.darkBossDefeated = Boolean(data.darkBossDefeated);
    this.recomputeVitals(false);
    if (typeof data.hp === 'number') this.hp = Math.min(this.maxHp, data.hp);
    if (typeof data.mana === 'number') this.mana = Math.min(this.maxMana, data.mana);
    if (typeof data.hunger === 'number') this.hunger = data.hunger;
    this.syncQuestProgress();
  }
}
