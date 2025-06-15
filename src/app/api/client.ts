import {
  GET_ALL_WEAPONS,
  GET_AMMO,
  GET_BACKPACK_ID,
  GET_BACKPACKS,
  GET_BARTER_ITEMS,
  GET_BARTERS,
  GET_CONTAINERS_ITEMS,
  GET_ITEM_BASE_ID,
  GET_ITEM_ID_BARTERS,
  GET_ITEM_ID_CRAFTING,
  GET_ITEM_ID_NAME,
  GET_ITEM_ID_PRICES,
  GET_ITEM_ID_TASK,
  GET_ITEM_ID_TITLE,
  GET_ITEM_ID_VARIANTS,
  GET_ITEMS,
  GET_ITEMS_SEARCH_BAR,
  GET_TASK_ID_BASE,
  GET_TASK_ID_FAILURE,
  GET_TASK_ID_OBJECTIVES,
  GET_TASK_ID_REQUIREMENTS,
  GET_TASK_ID_REWARD,
  GET_TASK_ID_TITLE,
  GET_TASK_ID_TRADERS,
  GET_TASKS,
  GET_TRADERS,
  GET_WEAPON_ID,
} from "@/lib/queries";
import {
  GetAmmoCaliber,
  GetBackpackById,
  GetBackpacks,
  GetBarterItems,
  GetBarters,
  GetContainerItems,
  GetItemById,
  GetItems,
  GetItemsSearchBar,
  GetItemTask,
  GetOnlyWeapons,
  GetTasks,
  GetTraders,
  GetWeaponById,
} from "./types";
import { graphqlClient } from "@/lib/graphql-client";

export const client = {
  async getItems(
    limit: number,
    offset: number,
    name?: string
  ): Promise<GetItems["items"]> {
    const variables: { limit: number; offset: number; name?: string } = {
      limit,
      offset,
    };

    if (name?.trim()) {
      variables.name = name;
    }

    const data = await graphqlClient.request<GetItems>(GET_ITEMS, variables);
    return data.items;
  },

  async getItem(id: string): Promise<GetItemById["item"]> {
    const data = await graphqlClient.request<GetItemById>(GET_ITEM_ID, {
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
  async getTask(id: string): Promise<GetTasks["task"]> {
    const data = await graphqlClient.request<GetTasks>(GET_TASK_ID, {
      id: id,
    });
    return data.task;
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
