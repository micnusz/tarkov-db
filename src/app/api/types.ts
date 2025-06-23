// Vendors
export type Vendor = {
  name: string;
};

export type VendorPrice = {
  vendor: Vendor;
  price: number;
  priceRUB: number;
  currency?: string; // from GraphQL buyFor
};
// Categories
export type Category = {
  id: string;
  name: string;
  parent?: {
    name: string;
    id: string;
  };
  children?: {
    name: string;
    id: string;
  };
};

// Items
export type BaseItem = {
  id: string;
  name: string;
  shortName?: string;
  description?: string;
  basePrice: number;
  types?: string[];
  weight?: number;
  image512pxLink: string;
  image8xLink: string;
  gridImageLink: string;
  iconLink?: string;
  wikiLink: string;
  category?: Category;
  buyFor: VendorPrice[];
  sellFor: VendorPrice[];
  avg24hPrice?: number;
  low24hPrice?: number;
  high24hPrice?: number;
  properties: {
    __typename: string;
    baseItem: BaseItem;
    presets: string;
  };
};

// Backpack
export type BackpackItem = BaseItem & {
  properties: {
    __typename: string;
    turnPenalty: number;
    ergoPenalty: number;
    speedPenalty: number;
    capacity: number;
    grids: {
      width: number;
      height: number;
    }[];
  };
};

// Body Armors
export type ArmorsItem = BaseItem & {
  properties: {
    zones: string[];
    speedPenalty: number;
    class: number;
    ergoPenalty: number;
    ricochetY: number;
    blocksHeadset: boolean;
    material: {
      name: string;
      id: string;
    };
    durability: number;
    turnPenalty: number;
    armorType: string;
  };
};

export type KeyItem = BaseItem & {
  properties: {
    uses: number;
  };
};

export type ScopeItem = BaseItem & {
  properties: {
    ergonomics: number;
    zoomLevels: number[][];
    sightModes: number[];
    sightingRange: number;
  };
};

// ItemPropertiesWeaponMod
export type ItemPropertiesWeaponMod = BaseItem & {
  properties: {
    recoilModifier: number;
    ergonomics: number;
    accuracyModifier: number;
  };
};
// ItemPropertiesGlasses
export type ItemPropertiesGlasses = BaseItem & {
  properties: {
    material: {
      name: string;
    };
    blindnessProtection: number;
    class: number;
    durability: number;
  };
};
// ItemPropertiesMedKit
export type ItemPropertiesMedKit = BaseItem & {
  properties: {
    useTime: number;
    hitpoints: number;
    cures: string[];
    maxHealPerUse: number;
    hpCostLightBleeding: number;
    hpCostHeavyBleeding: number;
  };
};
// ItemPropertiesMedicalItem
export type ItemPropertiesMedicalItem = BaseItem & {
  properties: {
    useTime: number;
    uses: number;
    cures: string[];
  };
};
// ItemPropertiesFoodDrink
export type ItemPropertiesFoodDrink = BaseItem & {
  properties: {
    energy: number;
    hydration: number;
    units: number;
    stimEffects: {
      skill: {
        id: string;
      };
      skillName: string;
      duration: number;
      percent: boolean;
      delay: number;
      value: number;
      chance: number;
    }[];
  };
};
export type ItemPropertiesPreset = BaseItem & {
  __typename?: string;
};

// grenades
export type GrenadeItem = BaseItem & {
  properties: {
    type: string;
    fuse: number;
    fragments: number;
    minExplosionDistance: number;
    maxExplosionDistance: number;
    contusionRadius: number;
  };
};
// magazines
export type MagazineItem = BaseItem & {
  properties: {
    capacity: number;
    ergonomics: number;
    malfunctionChance: number;
    loadModifier: number;
    ammoCheckModifier: number;
  };
};
// headsets
export type HeadsetItem = BaseItem & {
  properties: {
    ambientVolume: number;
    distanceModifier: number;
    distortion: number;
  };
};

export type WeaponItem = BaseItem & {
  properties: WeaponProperties;
  category: Category;
};

export type WeaponProperties = {
  __typename: string;
  caliber: string;
  fireRate: number;
  recoilVertical: number;
  recoilHorizontal: number;
  ergonomics: number;
  effectiveDistance: number;
  moa: number;
  baseItem: {
    name: string;
    id: string;
    properties: WeaponProperties;
  };
};

// Item Collections
export type Item = BaseItem;

export type GetItems = {
  items: Item[];
  item: Item;
};

export type GetItemCategories = {
  itemCategories: Item[];
};

export type GetItemsSearchBar = {
  items: Pick<Item, "id" | "name">[];
};

export type GetItemById = BaseItem & {
  item: Item & {
    shortName: string;
    description: string;
    bartersFor: Barter[];
    bartersUsing: Barter[];
    usedInTasks: Task[];
    craftsFor: CraftingProperties[];
    craftsUsing: CraftingProperties[];
    receivedFromTasks: Task[];
  };
};
export type GetItemTask = {
  item: {
    id: string;
    receivedFromTasks: Task[];
    usedInTasks: Task[];
  };
};

export type CraftingProperties = {
  duration: number;
  level: number;
  taskUnlock: {
    name: string;
    id: string;
    trader: Trader;
  };
  station: CraftingStation;
  requiredItems: CraftingItems[];
  rewardItems: CraftingItems[];
};

export type CraftingItems = {
  quantity: number;
  count: number;
  item: Item;
};

export type CraftingStation = {
  id: number;
  name: string;
};

// Barters
export type BarterItem = {
  items: Item;
  item: Item & { category: Category };
  quantity: number;
  count: number;
};

export type Barter = {
  buyLimit: number;
  taskUnlock: {
    name: string;
    id: string;
  };
  level: number;
  finishRewards: BarterItem[];
  rewardItems: BarterItem[];
  requiredItems: BarterItem[];
  trader: {
    name: string;
    imageLink: string;
  };
  name: string;
  id: string;
};

export type GetBarters = {
  barters: Barter[];
};

export type GetBarterItems = {
  items: BaseItem[];
};

export type GetContainerItems = {
  items: BaseItem[];
};

// Ammo
export type Ammo = {
  __typename: string;
  caliber: string;
  penetrationPower: number;
  damage: number;
  armorDamage: number;
  accuracyModifier: number;
  recoilModifier: number;
  fragmentationChance: number;
  initialSpeed: number;
  ricochetChance: number;
  penetrationChance: number;
  penetrationPowerDeviation: number;
  item: Pick<Item, "id" | "name" | "basePrice" | "iconLink">;
};

export type GetAmmoCaliber = {
  ammo: Ammo[];
};

// Weapons
export type GetOnlyWeapons = {
  items: (WeaponItem & { properties: WeaponProperties })[];
};

export type GetWeaponById = {
  items: (WeaponItem & {
    shortName: string;
    description: string;
    wikiLink: string;
    properties: WeaponProperties;
  })[];
};

// Backpacks
export type GetBackpacks = {
  items: BackpackItem[];
};

export type GetArmors = {
  items: ArmorsItem[];
};

export type GetMedkits = {
  items: ItemPropertiesMedKit[];
};

export type GetMedicalItem = {
  items: ItemPropertiesMedicalItem[];
};

export type GetProvisions = {
  items: ItemPropertiesFoodDrink[];
};

export type GetHelmets = {
  items: ArmorsItem[];
};

export type GetKeys = {
  items: KeyItem[];
};

export type GetScopes = {
  items: ScopeItem[];
};

export type GetItemPropertiesWeaponMod = {
  items: ItemPropertiesWeaponMod[];
};

export type GetItemPropertiesGlasses = {
  items: ItemPropertiesGlasses[];
};

export type GetMagazines = {
  items: MagazineItem[];
};

export type GetGrenade = {
  items: GrenadeItem[];
};

export type GetHeadsets = {
  items: HeadsetItem[];
};

export type GetBackpackById = {
  items: BackpackItem[];
};

// Traders
export type Trader = {
  id: string;
  name: string;
  imageLink: string;
};

export type GetTraders = {
  traders: Trader[];
};

// Tasks
export type RewardItem = {
  quantity: number;
  count: number;
  item: {
    id?: string;
    name: string;
  };
};

export type TaskObjective = {
  maps: {
    id: string;
    name: string;
  }[];
  description: string;
  id: string;
  optional: boolean;
};

export type TaskRequirement = {
  task: {
    id: string;
    name: string;
    minPlayerLevel: number;
  };
};

export type CraftUnlock = {
  level: number;
  station: {
    id: string;
    name: string;
  };
};

export type OfferUnlock = {
  level: number;
  trader: Pick<Trader, "id" | "name">;
  item: {
    id: string;
    name: string;
    types: string;
    bartersFor: {
      trader: {
        name: string;
      };
    }[];
    buyFor: {
      price: number;
      currency: string;
      vendor: {
        name: string;
      };
    }[];
  };
};

export type FinishRewards = {
  craftUnlock?: CraftUnlock[];
  traderUnlock?: Pick<Trader, "id" | "name">[];
  offerUnlock?: OfferUnlock[];
  items?: RewardItem[];
  skillLevelReward: {
    name: string;
    level: number;
  }[];
  traderStanding?: {
    standing: number;
    trader: {
      name: string;
      id: string;
    };
  }[];
};

export type StartRewards = {
  items?: RewardItem[];
};

export type Task = {
  id: string;
  name: string;
  taskImageLink: string;
  kappaRequired: boolean;
  experience: number;
  minPlayerLevel: number;
  lightkeeperRequired: boolean;
  wikiLink: string;
  taskRequirements: TaskRequirement[];
  startRewards?: StartRewards;
  finishRewards: FinishRewards;
  failureOutcome?: {
    traderStanding?: {
      standing: number;
      trader: {
        name: string;
        id: string;
      };
    }[];
  };
  objectives: TaskObjective[];
  map: {
    id: string;
    name: string;
  } | null;
  trader: Trader & {
    imageLink: string;
    reputationLevels: {
      __typename: string;
    }[];
  };
};

export type GetTasks = {
  tasks: Task[];
  task: Task;
};
