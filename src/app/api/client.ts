import {
  GET_ALL_WEAPONS,
  GET_AMMO,
  GET_ARMOR_PLATES,
  GET_ARMORED_RIGS,
  GET_ARMORED_VESTS,
  GET_AUXILIARIES,
  GET_BACKPACK_ID,
  GET_BACKPACKS,
  GET_BARRELS,
  GET_BARTER_ITEMS,
  GET_BARTERS,
  GET_BIPODS,
  GET_CHARGING_HANDLES,
  GET_CHEST_RIGS,
  GET_CONTAINERS_ITEMS,
  GET_DRINK,
  GET_FACE_COVERS,
  GET_FLASHLIGHTS,
  GET_FOOD,
  GET_FOREGRIPS,
  GET_GAS_BLOCKS,
  GET_GLASSES,
  GET_GRENADES,
  GET_HANDGUARD,
  GET_HEADSETS,
  GET_HELMETS,
  GET_ITEM_BASE_ID,
  GET_ITEM_ID_BARTERS,
  GET_ITEM_ID_CRAFTING,
  GET_ITEM_ID_NAME,
  GET_ITEM_ID_PRICES,
  GET_ITEM_ID_TASK,
  GET_ITEM_ID_TITLE,
  GET_ITEM_ID_VARIANTS,
  GET_ITEMS,
  GET_ITEMS_CATEGORIES,
  GET_ITEMS_SEARCH_BAR,
  GET_KEYS,
  GET_MAGAZINES,
  GET_MEDICAL_ITEMS,
  GET_MEDKITS,
  GET_MOUNTS,
  GET_MUZZLE_DEVICES,
  GET_PISTOL_GRIPS,
  GET_RECEIVERS,
  GET_SCOPES,
  GET_STOCKS,
  GET_TACTICAL_DEVICES,
  GET_TASK_ID_BASE,
  GET_TASK_ID_FAILURE,
  GET_TASK_ID_OBJECTIVES,
  GET_TASK_ID_REQUIREMENTS,
  GET_TASK_ID_REWARD,
  GET_TASK_ID_TITLE,
  GET_TASK_ID_TRADERS,
  GET_TASKS,
  GET_TRADERS,
  GET_UBGL,
  GET_WEAPON_ID,
} from "@/lib/queries";
import {
  GetAmmoCaliber,
  GetArmors,
  GetBackpackById,
  GetBackpacks,
  GetBarterItems,
  GetBarters,
  GetContainerItems,
  GetGrenade,
  GetHeadsets,
  GetHelmets,
  GetItemById,
  GetItemCategories,
  GetItemPropertiesGlasses,
  GetItemPropertiesWeaponMod,
  GetItems,
  GetItemsSearchBar,
  GetItemTask,
  GetKeys,
  GetMagazines,
  GetMedicalItem,
  GetMedkits,
  GetOnlyWeapons,
  GetProvisions,
  GetScopes,
  GetTasks,
  GetTraders,
  GetWeaponById,
} from "./types";
import { graphqlClient } from "@/lib/graphql-client";

export const client = {
  //server side
  async getItems(
    limit: number,
    offset: number,
    name?: string,
    categoryNames?: string[]
  ): Promise<GetItems["items"]> {
    const variables: {
      limit: number;
      offset: number;
      name?: string;
      categoryNames?: string[];
    } = {
      limit,
      offset,
    };

    if (name?.trim()) {
      variables.name = name;
    }

    if (categoryNames && categoryNames.length > 0) {
      variables.categoryNames = categoryNames;
    }

    const data = await graphqlClient.request<GetItems>(GET_ITEMS, variables);
    return data.items;
  },

  async getItemCategories(): Promise<GetItemCategories["itemCategories"]> {
    const data = await graphqlClient.request<GetItemCategories>(
      GET_ITEMS_CATEGORIES
    );

    return data.itemCategories;
  },

  async getItem(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_BASE_ID, {
      id: id,
    });
    return data.item;
  },

  //added for dynamic title: item/[id]
  async getItemIdTitle(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_ID_TITLE, {
      id: id,
    });
    return data.item;
  },
  //Aadded for dynamic title: task/[id]
  async getTaskIdTitle(id: string): Promise<GetTasks["task"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASK_ID_TITLE, {
      id: id,
    });
    return data.task;
  },

  //item/[id], ItemBase
  async getItemBaseId(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_BASE_ID, {
      id: id,
    });
    return data.item;
  },
  //item/[id], ItemVariants
  async getItemIdVariants(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(
      GET_ITEM_ID_VARIANTS,
      {
        id: id,
      }
    );
    return data.item;
  },

  //item/[id], ItemTask
  async getItemIdTask(id: string): Promise<GetItemTask["item"]> {
    const data = await graphqlClient.request<GetItemTask>(GET_ITEM_ID_TASK, {
      id: id,
    });
    return data.item;
  },
  //item/[id], ItemPrices
  async getItemIdPrices(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_ID_PRICES, {
      id: id,
    });
    return data.item;
  },
  //item/[id], ItemBarters
  async getItemIdBarters(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_ID_BARTERS, {
      id: id,
    });
    return data.item;
  },
  //item/[id], ItemCrafting
  async getItemIdCrafting(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(
      GET_ITEM_ID_CRAFTING,
      {
        id: id,
      }
    );
    return data.item;
  },

  async getItemIdName(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_ID_NAME, {
      ids: [id],
    });
    return data.item;
  },

  async getItemsSearchBar(name: string): Promise<GetItemsSearchBar["items"]> {
    const data = await graphqlClient.request<GetItemsSearchBar>(
      GET_ITEMS_SEARCH_BAR,
      {
        name: name,
      }
    );
    return data.items;
  },

  async getAmmo(): Promise<GetAmmoCaliber["ammo"]> {
    const data = await graphqlClient.request<GetAmmoCaliber>(GET_AMMO);
    return data.ammo;
  },

  async getWeapons(): Promise<GetOnlyWeapons["items"]> {
    const data = await graphqlClient.request<GetOnlyWeapons>(GET_ALL_WEAPONS);
    return data.items;
  },

  async getWeapon(id: string): Promise<GetWeaponById["items"]> {
    const data = await graphqlClient.request<GetWeaponById>(GET_WEAPON_ID, {
      ids: [id],
    });
    return data.items;
  },

  async getTraders(): Promise<GetTraders["traders"]> {
    const data = await graphqlClient.request<GetTraders>(GET_TRADERS);
    return data.traders;
  },

  async getBackpacks(): Promise<GetBackpacks["items"]> {
    const data = await graphqlClient.request<GetBackpacks>(GET_BACKPACKS);
    return data.items;
  },

  //items/body-armors, Armored Vests
  async getArmoredVests(): Promise<GetArmors["items"]> {
    const data = await graphqlClient.request<GetArmors>(GET_ARMORED_VESTS);
    return data.items;
  },

  //items/body-armors, Armored Rigs
  async getArmoredRigs(): Promise<GetArmors["items"]> {
    const data = await graphqlClient.request<GetArmors>(GET_ARMORED_RIGS);
    return data.items;
  },

  //items/chest-rigs, Chest Rigs
  async getChestRigs(): Promise<GetArmors["items"]> {
    const data = await graphqlClient.request<GetArmors>(GET_CHEST_RIGS);
    return data.items;
  },

  //items/armor-plates
  async getArmorPlates(): Promise<GetArmors["items"]> {
    const data = await graphqlClient.request<GetArmors>(GET_ARMOR_PLATES);
    return data.items;
  },

  //items/face-covers
  async getFaceCovers(): Promise<GetHelmets["items"]> {
    const data = await graphqlClient.request<GetHelmets>(GET_FACE_COVERS);
    return data.items;
  },

  //items/keys
  async getKeys(): Promise<GetKeys["items"]> {
    const data = await graphqlClient.request<GetKeys>(GET_KEYS);
    return data.items;
  },

  //items/medical  | Medkits
  async getMedkits(): Promise<GetMedkits["items"]> {
    const data = await graphqlClient.request<GetMedkits>(GET_MEDKITS);
    return data.items;
  },

  //items/medical  | Medicalitems
  async getMedicalItems(): Promise<GetMedicalItem["items"]> {
    const data = await graphqlClient.request<GetMedicalItem>(GET_MEDICAL_ITEMS);
    return data.items;
  },

  //items/scopes
  async getScopes(): Promise<GetScopes["items"]> {
    const data = await graphqlClient.request<GetScopes>(GET_SCOPES);
    return data.items;
  },

  //items/helmets
  async getHelmets(): Promise<GetHelmets["items"]> {
    const data = await graphqlClient.request<GetHelmets>(GET_HELMETS);
    return data.items;
  },
  //items/grenades
  async getGrenades(): Promise<GetGrenade["items"]> {
    const data = await graphqlClient.request<GetGrenade>(GET_GRENADES);
    return data.items;
  },
  //items/headsets
  async getHeadsets(): Promise<GetHeadsets["items"]> {
    const data = await graphqlClient.request<GetHeadsets>(GET_HEADSETS);
    return data.items;
  },

  //items/provisions | Drink
  async getDrink(): Promise<GetProvisions["items"]> {
    const data = await graphqlClient.request<GetProvisions>(GET_DRINK);
    return data.items;
  },

  //items/provisions | Food
  async getFood(): Promise<GetProvisions["items"]> {
    const data = await graphqlClient.request<GetProvisions>(GET_FOOD);
    return data.items;
  },

  //items/weapons-mod/vital-parts, Barrels
  async getBarrels(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_BARRELS
    );
    return data.items;
  },

  //items/weapons-mod/vital-parts, Gas Blocks
  async getGasBlocks(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_GAS_BLOCKS
    );
    return data.items;
  },

  //items/weapons-mod/vital-parts, Handguards
  async getHandguards(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_HANDGUARD
    );
    return data.items;
  },

  //items/weapons-mod/vital-parts, Pistol Grips
  async getPistolGrips(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_PISTOL_GRIPS
    );
    return data.items;
  },
  //items/weapons-mod/vital-parts, Receivers
  async getReceivers(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_RECEIVERS
    );
    return data.items;
  },

  //items/weapons-mod/gear-mods, Charging handles
  async getChargingHandles(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_CHARGING_HANDLES
    );
    return data.items;
  },

  //items/weapons-mod/gear-mods, Magazines
  async getMagazines(): Promise<GetMagazines["items"]> {
    const data = await graphqlClient.request<GetMagazines>(GET_MAGAZINES);
    return data.items;
  },

  //items/weapons-mod/gear-mods, Mounts
  async getMounts(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_MOUNTS
    );
    return data.items;
  },

  //items/weapons-mod/gear-mods, Stocks
  async getStocks(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_STOCKS
    );
    return data.items;
  },

  //items/weapons-mod/gear-mods, Stocks
  async getUBGL(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_UBGL
    );
    return data.items;
  },

  //items/weapons-mod/muzzle-devices, Muzzle-devices
  async getMuzzleDevices(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_MUZZLE_DEVICES
    );
    return data.items;
  },

  //items/weapons-mod/functional-mods, Bipods
  async getBipods(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_BIPODS
    );
    return data.items;
  },

  //items/weapons-mod/functional-mods, Foregrips
  async getForegrips(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_FOREGRIPS
    );
    return data.items;
  },

  //items/weapons-mod/functional-mods, Flashlights
  async getFlashlights(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_FLASHLIGHTS
    );
    return data.items;
  },

  //items/weapons-mod/functional-mods, TacticalDevices
  async getTacticalDevices(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_TACTICAL_DEVICES
    );
    return data.items;
  },

  //items/weapons-mod/functional-mods, TacticalDevices
  async getAuxiliaries(): Promise<GetItemPropertiesWeaponMod["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesWeaponMod>(
      GET_AUXILIARIES
    );
    return data.items;
  },

  //items/face-covers/ Glasses
  async getGlasses(): Promise<GetItemPropertiesGlasses["items"]> {
    const data = await graphqlClient.request<GetItemPropertiesGlasses>(
      GET_GLASSES
    );
    return data.items;
  },

  async getBackpack(id: string): Promise<GetBackpackById["items"]> {
    const data = await graphqlClient.request<GetBackpackById>(GET_BACKPACK_ID, {
      ids: [id],
    });
    return data.items;
  },

  async getTasks(): Promise<GetTasks["tasks"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASKS);
    return data.tasks;
  },

  //task/[id], Task Base
  async getTaskIdBase(id: string): Promise<GetTasks["task"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASK_ID_BASE, {
      id: id,
    });
    return data.task;
  },
  //task/[id], Task Failure
  async getTaskIdFailure(id: string): Promise<GetTasks["task"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASK_ID_FAILURE, {
      id: id,
    });
    return data.task;
  },
  //task/[id], Task Objectives
  async getTaskIdObjectives(id: string): Promise<GetTasks["task"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASK_ID_OBJECTIVES, {
      id: id,
    });
    return data.task;
  },
  //task/[id], Task Requirements
  async getTaskIdRequirements(id: string): Promise<GetTasks["task"]> {
    const data = await graphqlClient.request<GetTasks>(
      GET_TASK_ID_REQUIREMENTS,
      {
        id: id,
      }
    );
    return data.task;
  },
  //task/[id], Task Reward
  async getTaskIdReward(id: string): Promise<GetTasks["task"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASK_ID_REWARD, {
      id: id,
    });
    return data.task;
  },
  //task/[id], Task Traders
  async getTaskIdTraders(id: string): Promise<GetTasks["task"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASK_ID_TRADERS, {
      id: id,
    });
    return data.task;
  },

  async getBarterItems(): Promise<GetBarterItems["items"]> {
    const data = await graphqlClient.request<GetBarterItems>(GET_BARTER_ITEMS);
    return data.items;
  },

  async getContainersItems(): Promise<GetContainerItems["items"]> {
    const data = await graphqlClient.request<GetContainerItems>(
      GET_CONTAINERS_ITEMS
    );
    return data.items;
  },

  async getBarters(): Promise<GetBarters["barters"]> {
    const data = await graphqlClient.request<GetBarters>(GET_BARTERS);
    return data.barters;
  },
};
