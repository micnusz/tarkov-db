export type Category = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  name: string;
  shortName: string;
  basePrice: number;
  category: Category | null;
};
export type GetItemsResponse = {
  items: Item[];
};

export type GetItemCategoriesResponse = {
  items: Item[];
};

export type AmmoItem = {
  id: string;
  name: string;
  basePrice: number;
  iconLink: string;
};

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
  item: AmmoItem;
};
export type GetAmmoResponse = {
  ammo: Ammo[];
};

export type Trader = {
  image4xLink: string;
  id: string;
  name: string;
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

export interface GetBackpacksResponse {
  items: BackpackItem[];
}
