export type GetItems = {
  items: {
    name: string;
    id: string;
    gridImageLink: string;
    wikiLink: string;
    category: {
      parent: {
        name: string;
        id: string;
      } | null;
      name: string;
      id: string;
    };
    buyFor: {
      vendor: {
        name: string;
      };
      price: number;
      priceRUB: number;
    }[];
    sellFor: {
      vendor: {
        name: string;
      };
      price: number;
      priceRUB: number;
    }[];
    avg24hPrice: number;
    low24hPrice: number;
    high24hPrice: number;
  }[];
};

export type GetItemsSearchBar = {
  items: {
    id: string;
    name: string;
  }[];
};

export type GetItemById = {
  items: {
    id: string;
    name: string;
    shortName: string;
    description: string;
    basePrice: number;
    image8xLink: string;
    wikiLink: string;
    gridImageLink: string;
    bartersFor: Barter[];
    buyFor: VendorPrice[];
    sellFor: VendorPrice[];
  }[];
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
};

export type BarterItem = {
  item: {
    wikiLink: string;
    avg24hPrice: number;
    category: {
      name: string;
    };
    image8xLink: string;
    gridImageLink: string;
    name: string;
    id: string;
  };
  quantity: number;
  count: number;
};

export type VendorPrice = {
  vendor: {
    name: string;
  };
  price: number;
  priceRUB: number;
};

export type GetAmmoCaliber = {
  ammo: {
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
  }[];
};

export type GetOnlyWeapons = {
  items: (WeaponItem & {
    properties: WeaponProperties;
  })[];
};

export type WeaponItem = {
  id: string;
  name: string;
  shortName: string;
  category: {
    name: string;
    id: string;
  };
  types: string[];
  basePrice: number;
  image8xLink: string;
  gridImageLink: string;
  buyFor: VendorPrice[];
  sellFor: VendorPrice[];
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

export type GetWeaponById = {
  items: (WeaponItem & {
    shortName: string;
    description: string;
    wikiLink: string;
    properties: WeaponProperties;
  })[];
};

export type GetTraders = {
  traders: {
    image4xLink: string;
    id: string;
    name: string;
  }[];
};

export type GetBackpacks = {
  items: BackpackItem[];
};

export type GetBackpackById = {
  items: BackpackItem[];
};

export type BackpackItem = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  wikiLink: string;
  types: string[];
  basePrice: number;
  weight: number;
  image8xLink: string;
  iconLink: string;
  gridImageLink: string;
  buyFor: VendorPrice[];
  sellFor: VendorPrice[];
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

export type GetTasks = {
  tasks: {
    successMessageId: string;
    id: string;
    kappaRequired: boolean;
    taskImageLink: string;
    name: string;
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
    objectives: {
      maps: {
        name: string;
        id: string;
      }[];
      description: string;
      id: string;
      optional: boolean;
    }[];
    map: {
      name: string;
      id: string;
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
  }[];
};

export type RewardItem = {
  quantity: number;
  count: number;
  item: {
    id?: string;
    name: string;
  };
};

export type GetBarterItems = {
  items: BarterItemBase[];
};

export type GetContainerItems = {
  items: BarterItemBase[];
};

export type BarterItemBase = {
  id: string;
  name: string;
  shortName: string;
  category: {
    name: string;
    id: string;
    parent?: {
      name: string;
      id: string;
    };
  };
  types: string[];
  basePrice: number;
  image8xLink: string;
  gridImageLink: string;
  wikiLink: string;
  buyFor: VendorPrice[];
  sellFor: VendorPrice[];
  avg24hPrice: number;
};

export type GetBarters = {
  barters: Barter[];
};
