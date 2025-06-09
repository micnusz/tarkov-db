export type Category = {
  id: string;
  name: string;
  parent: {
    name: string;
    id: string;
  };
};

export type Item = {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  basePrice: number;
  avg24hPrice?: number;
  low24hPrice?: number;
  high24hPrice?: number;
  image8xLink?: string;
  iconLink?: string;
  gridImageLink?: string;
  wikiLink: string;
  sellFor: VendorSell[];
  buyFor: VendorBuy[];
  category: Category | null;
  properties: ItemProperties | null;
};

export type GetItemsResponse = {
  items: Item[];
};

export type ItemProperties =
  | AmmoProperties
  | WeaponItemProperties
  | BackpackItemProperties
  | OtherProperties; // fallback for unknown types

export type GetItemCategoriesResponse = {
  items: Item[];
};

export type AmmoItem = {
  id: string;
  name: string;
  basePrice: number;
  iconLink: string;
};

export interface AmmoProperties {
  __typename: "ItemPropertiesAmmo";
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
  item: AmmoItem;
}

export type GetAmmoResponse = {
  ammo: AmmoProperties[];
};

export type Trader = {
  image4xLink: string;
  id: string;
  name: string;
  currency: string;
};

export type GetTradersResponse = {
  traders: Trader[];
};

export interface WeaponItem {
  id: string;
  name: string;
  shortName: string;
  types: string[];
  basePrice: number;
  description: string;
  category: {
    name: string;
    id: string;
  };
  wikiLink: string;
  image8xLink: string;
  sellFor: VendorSell[];
  buyFor: VendorBuy[];
  properties: WeaponItemProperties | null;
}

export interface WeaponItemProperties {
  __typename: "ItemPropertiesWeapon";
  caliber: string;
  fireRate: number;
  recoilVertical: number;
  recoilHorizontal: number;
  ergonomics: number;
  effectiveDistance: number;
}

export interface VendorSell {
  vendor: {
    name: string;
  };
  price: number;
  priceRUB: number;
}
export type VendorBuy = {
  vendor: {
    name: string;
  };
  price: number;
  priceRUB: number;
};

export type WeaponProperties = WeaponItemProperties | OtherProperties;

export type GetWeaponResponse = {
  items: WeaponItem[];
};

export interface OtherProperties {
  __typename: string;
}

export interface BackpackItem {
  id: string;
  name: string;
  shortName: string;
  types: string[];
  basePrice: number;
  weight: number;
  description: string;
  wikiLink: string;
  image8xLink: string;
  iconLink: string;
  gridImageLink: string;
  sellFor: VendorSell[];
  buyFor: VendorBuy[];
  properties: BackpackItemProperties | null;
}

export interface BackpackItemProperties {
  __typename: "ItemPropertiesBackpack";
  turnPenalty: number;
  ergoPenalty: number;
  speedPenalty: number;
  capacity: number;
  grids: BackpackGrid[];
}

export interface BackpackGrid {
  width: number;
  height: number;
}

export interface OtherProperties {
  __typename: string;
}

export interface GetBackpacksResponse {
  items: BackpackItem[];
}

export type GetTasksResponse = {
  tasks: Task[];
};

export type Task = {
  id: string;
  name: string;
  experience: number;
  kappaRequired: boolean;
  lightkeeperRequired: boolean;
  minPlayerLevel: number;
  taskImageLink: string;
  wikiLink: string;
  successMessageId?: string;
  taskRequirements: TaskRequirement[];
  startRewards: TaskRewards;
  finishRewards: TaskRewardsWithSkills;
  objectives: TaskObjective[];
  map: TaskMap | null;
  trader: TaskTrader;
};

export type TaskRequirement = {
  task: {
    id: string;
    name: string;
  };
};

export type TaskRewards = {
  items: TaskRewardItem[];
};

export type TaskRewardsWithSkills = TaskRewards & {
  skillLevelReward?: SkillLevelReward | null;
};

export type TaskRewardItem = {
  quantity?: number | null;
  count?: number | null;
  item: {
    id?: string;
    name: string;
  };
};

export type SkillLevelReward = {
  name: string;
  level: number;
};

export type TaskObjective = {
  id: string;
  description: string;
  optional?: boolean;
  maps?: TaskMap[];
};

export type TaskMap = {
  id: string;
  name: string;
};

export type TaskTrader = {
  id: string;
  name: string;
  imageLink: string;
  image4xLink: string;
  reputationLevels: {
    __typename: string;
  }[];
};

export type GetBartersResponse = {
  barters: Barter[];
};

export type Barter = {
  buyLimit?: number | null;
  taskUnlock?: TaskUnlock | null;
  level: number;
  requiredItems: BarterItem[];
  rewardItems: BarterItem[];
  trader: {
    name: string;
    imageLink: string;
  };
};

export type TaskUnlock = {
  name: string;
};

export type BarterItem = {
  item: {
    wikiLink: string;
    avg24hPrice: string;
    id: string;
    name: string;
    gridImageLink?: string;
    category?: CategoryBarter | null;
  };
  quantity?: number | null;
  count?: number | null;
};

export type CategoryBarter = {
  name: string;
};
