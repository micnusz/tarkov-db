// ========== VENDOR ========== //
export type Vendor = {
  name: string;
};

export type VendorPrice = {
  vendor: Vendor;
  price: number;
  priceRUB: number;
};

// ========== CATEGORY ========== //
export type Category = {
  id: string;
  name: string;
  parent?: {
    id: string;
    name: string;
  } | null;
};

// ========== ITEM ========== //
export type BaseItem = {
  id: string;
  name: string;
  shortName?: string;
  description?: string;
  basePrice: number;
  types?: string[];
  weight?: number;
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
};

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

export type WeaponItem = BaseItem & {
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
};

// ========== ITEM COLLECTIONS ========== //
export type Item = BaseItem & {
  gridImageLink: string;
};

export type GetItems = {
  items: Item[];
};

export type GetItemsSearchBar = {
  items: Pick<Item, "id" | "name">[];
};

export type GetItemById = {
  items: (Item & {
    shortName: string;
    description: string;
    bartersFor: Barter[];
    usedInTasks: Barter[];
  })[];
};

// ========== BARTER ========== //
export type BarterItem = {
  item: Item & {
    category: Category;
  };
  quantity: number;
  count: number;
};

export type Barter = {
  buyLimit: number;
  taskUnlock: {
    name: string;
  } | null;
  level: number;
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

// ========== AMMO ========== //
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
  item: {
    id: string;
    name: string;
    basePrice: number;
    iconLink: string;
  };
};

export type GetAmmoCaliber = {
  ammo: Ammo[];
};

// ========== WEAPONS ========== //
export type GetOnlyWeapons = {
  items: (WeaponItem & {
    properties: WeaponProperties;
  })[];
};

export type GetWeaponById = {
  items: (WeaponItem & {
    shortName: string;
    description: string;
    wikiLink: string;
    properties: WeaponProperties;
  })[];
};

// ========== BACKPACKS ========== //
export type GetBackpacks = {
  items: BackpackItem[];
};

export type GetBackpackById = {
  items: BackpackItem[];
};

// ========== TRADERS ========== //
export type GetTraders = {
  traders: {
    id: string;
    name: string;
    image4xLink: string;
  }[];
};

// ========== TASKS ========== //
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

export type Task = {
  id: string;
  name: string;
  taskImageLink: string;
  successMessageId: string;
  kappaRequired: boolean;
  experience: number;
  minPlayerLevel: number;
  lightkeeperRequired: boolean;
  wikiLink: string;
  taskRequirements: {
    task: {
      id: string;
      name: string;
    };
  }[];
  startRewards: {
    items: RewardItem[];
  };
  finishRewards: {
    items: RewardItem[];
    skillLevelReward: {
      name: string;
      level: number;
    } | null;
  };
  objectives: TaskObjective[];
  map: {
    id: string;
    name: string;
  } | null;
  trader: {
    id: string;
    name: string;
    imageLink: string;
    image4xLink: string;
    reputationLevels: {
      __typename: string;
    }[];
  };
};

export type GetTasks = {
  tasks: Task[];
  task: Task;
};
